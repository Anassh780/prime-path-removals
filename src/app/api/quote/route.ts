import { format } from "date-fns";
import { NextResponse } from "next/server";

import { storeLead } from "@/lib/leads";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { parseQuotePayload } from "@/lib/validations/quote";

/**
 * POST /api/quote
 *
 * Validates the submission with the same schema the browser form uses, applies
 * a small rate limit, then persists the lead through `storeLead`.
 *
 * Honest failure by design:
 *   400 — payload fails validation
 *   429 — too many requests from this client
 *   503 — Supabase is not configured, so nothing was stored
 *   502 — the database rejected the write
 *   200 — `{ reference }` for a stored request
 *
 * No personal data is written to the server logs.
 */

const RATE_LIMIT = { limit: 5, windowMs: 60_000 } as const;

const MESSAGES = {
  unreadable:
    "We could not read that request. Please refresh the page and try again.",
  invalid:
    "Some of the details need checking. Please review the highlighted fields.",
};

function json(
  body: Record<string, unknown>,
  status: number,
  headers?: HeadersInit,
) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

export async function POST(request: Request) {
  const limit = rateLimit(`quote:${clientKey(request.headers)}`, RATE_LIMIT);

  if (!limit.ok) {
    const seconds = Math.max(1, limit.retryAfter);

    return json(
      {
        error: `Too many quote requests from this connection. Please try again in ${seconds} seconds.`,
        retryAfter: seconds,
      },
      429,
      { "Retry-After": String(seconds) },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return json({ error: MESSAGES.unreadable }, 400);
  }

  const parsed = parseQuotePayload(payload);

  if (!parsed.success) {
    const fields: Record<string, string> = {};

    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !(field in fields)) {
        fields[field] = issue.message;
      }
    }

    return json({ error: MESSAGES.invalid, fields }, 400);
  }

  const values = parsed.data;

  // Compile detailed moving specifications into the notes so nothing is lost,
  // even if the database table schema only has an additional_info column.
  const extraDetails = [
    values.estimatedPriceRange ? `Live estimate displayed: ${values.estimatedPriceRange}` : null,
    values.distanceTier ? `Distance tier: ${values.distanceTier}` : null,
    values.collectionFloor ? `Collection access: ${values.collectionFloor}` : null,
    values.destinationFloor ? `Destination access: ${values.destinationFloor}` : null,
    values.inventorySummary ? `Inventory: ${values.inventorySummary}` : null,
  ].filter(Boolean);

  const combinedNotes = [
    values.additionalInfo?.trim() || null,
    extraDetails.length > 0 ? `[Move Specifications]\n${extraDetails.join("\n")}` : null,
  ]
    .filter(Boolean)
    .join("\n\n");

  const result = await storeLead("quote", {
    full_name: values.fullName,
    email: values.email,
    phone: values.phone,
    moving_from: values.movingFrom,
    moving_to: values.movingTo,
    moving_date: format(values.movingDate, "yyyy-MM-dd"),
    property_type: values.propertyType,
    services: values.services,
    additional_info: combinedNotes || null,
    referral_source: values.referral ?? null,
  });

  if (!result.ok) {
    return json({ error: result.error }, result.status);
  }

  return json({ reference: result.reference }, 200);
}
