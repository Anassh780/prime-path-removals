import { NextResponse } from "next/server";

import { storeLead } from "@/lib/leads";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import {
  contactSchema,
  contactSubjects,
  type ContactSubject,
} from "@/lib/validations/contact";

/**
 * POST /api/contact
 *
 * Validates the submission with the same schema the browser form uses, applies
 * a small rate limit, then persists the message through `storeLead`.
 *
 * Honest failure by design:
 *   400 — payload fails server-side validation
 *   429 — too many requests from this client
 *   503 — Supabase is not configured, so nothing was stored
 *   502 — the database rejected the write
 *   200 — `{ reference }` for a stored message
 *
 * No personal data is written to the server logs.
 */

const RATE_LIMIT = { limit: 5, windowMs: 60_000 } as const;

const MESSAGES = {
  unreadable:
    "We could not read that request. Please refresh the page and try again.",
  invalid:
    "Some of the details need checking. Please review the highlighted fields.",
  rateLimited:
    "You have sent several messages in a short space of time. Please wait a minute and try again.",
};

function subjectLabel(value: ContactSubject) {
  return (
    contactSubjects.find((subject) => subject.value === value)?.label ?? value
  );
}

export async function POST(request: Request) {
  const limit = rateLimit(`contact:${clientKey(request.headers)}`, RATE_LIMIT);

  if (!limit.ok) {
    return NextResponse.json(
      { error: MESSAGES.rateLimited },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.max(limit.retryAfter, 1)),
        },
      },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: MESSAGES.unreadable }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    const issues: Record<string, string> = {};

    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !(field in issues)) {
        issues[field] = issue.message;
      }
    }

    return NextResponse.json(
      { error: MESSAGES.invalid, issues },
      { status: 400 },
    );
  }

  const { name, email, phone, subject, message } = parsed.data;

  const result = await storeLead("contact", {
    name,
    email,
    phone: phone || null,
    subject: subjectLabel(subject),
    message,
    source: "contact-page",
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ reference: result.reference }, { status: 200 });
}
