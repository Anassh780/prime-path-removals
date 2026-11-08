import { getSupabaseServerClient } from "@/lib/supabase/server";

export type LeadKind = "quote" | "contact";

export type LeadResult =
  | { ok: true; reference: string }
  | { ok: false; status: number; error: string };

const TABLES: Record<LeadKind, string> = {
  quote: "quote_requests",
  contact: "contact_messages",
};

function reference(kind: LeadKind) {
  const prefix = kind === "quote" ? "PHR-Q" : "PHR-C";
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `${prefix}-${stamp}${rand}`;
}

/**
 * Persist a form submission.
 *
 * Honest failure: when no backend is configured the caller receives a 503 and
 * the UI shows an error — the site never reports a fake success.
 */
export async function storeLead(
  kind: LeadKind,
  payload: Record<string, unknown>,
): Promise<LeadResult> {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return {
      ok: false,
      status: 503,
      error:
        "Online submissions are not connected yet, so this request has not been sent. Please try again shortly — or reach us through the contact page and we will pick it up from there.",
    };
  }

  const record = {
    ...payload,
    kind,
    reference: reference(kind),
    status: "new",
    created_at: new Date().toISOString(),
  };

  const { error } = await supabase.from(TABLES[kind]).insert(record);

  if (error) {
    console.error(`[leads] failed to store ${kind} submission:`, error.message);
    return {
      ok: false,
      status: 502,
      error:
        "We could not save your request just now. Please try again in a moment, or contact us by phone or email.",
    };
  }

  // Optional email notification — only fires when an email service is configured.
  void notifyByEmail(kind, record).catch((err) => {
    console.error("[leads] notification failed:", err);
  });

  return { ok: true, reference: record.reference };
}

async function notifyByEmail(
  kind: LeadKind,
  record: Record<string, unknown>,
) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_NOTIFICATION_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL ?? "quotes@primehouseremovals.co.uk";
  if (!apiKey || !to) return;

  const subject =
    kind === "quote"
      ? `New quote request — ${record.reference}`
      : `New contact message — ${record.reference}`;

  const body = Object.entries(record)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text: body,
    }),
  });

  if (!response.ok) {
    throw new Error(`Email provider responded ${response.status}`);
  }
}
