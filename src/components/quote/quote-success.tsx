"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Check, Phone } from "lucide-react";

import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import { processSteps } from "@/content/process";
import { hasPhone, hasWhatsApp, siteConfig } from "@/config/site";
import { formatPhoneHref, formatWhatsAppHref } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Parent-owned stagger so the confirmation reads top-to-bottom. */
const STEP_LIST = {
  hidden: {},
  shown: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const STEP_ITEM = {
  hidden: { opacity: 0, y: 8 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

/**
 * Confirmation panel shown in place of the form once the API has stored the
 * request and returned a reference. The reference is the real value returned
 * by `POST /api/quote` — nothing here is generated in the browser.
 */
export function QuoteSuccess({
  reference,
  firstName,
  onReset,
}: {
  reference: string;
  firstName?: string;
  onReset: () => void;
}) {
  const headingRef = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const nextSteps = processSteps.slice(1);

  return (
    <section
      aria-labelledby="quote-success-heading"
      className="rounded-xl border border-line bg-white p-6 shadow-card sm:p-8"
    >
      <span className="inline-flex size-11 animate-pop-in items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <Check
          className="size-6 animate-check-in [stroke-dasharray:24]"
          strokeWidth={2.5}
          aria-hidden="true"
        />
      </span>

      <h2
        id="quote-success-heading"
        ref={headingRef}
        tabIndex={-1}
        className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-ink outline-none sm:text-[1.7rem]"
      >
        {firstName ? `Thank you, ${firstName} — your request is in.` : "Thank you — your request is in."}
      </h2>

      <p className="mt-3 text-[15px] leading-relaxed text-ink-soft sm:text-base">
        We have received your quote request and your details are with the team.
        If anything is unclear, we will ask before quoting.
      </p>

      <div className="mt-6 rounded-lg border border-line bg-surface-subtle p-4 sm:p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
          Your reference
        </p>
        <p className="mt-1.5 font-display text-xl font-semibold tracking-[0.04em] text-ink">
          {reference}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          Keep this reference to hand if you need to follow up about your move.
        </p>

        {hasPhone || hasWhatsApp ? (
          <div className="mt-4 flex flex-wrap gap-2.5 border-t border-line/60 pt-3.5">
            {hasPhone ? (
              <a
                href={formatPhoneHref(siteConfig.contact.phone)}
                className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-3 py-1.5 text-xs font-medium text-navy-900 shadow-xs transition-colors duration-150 hover:bg-surface-subtle"
              >
                <Phone className="size-3.5 text-royal-700" aria-hidden="true" />
                Call {siteConfig.contact.phone}
              </a>
            ) : null}
            {hasWhatsApp ? (
              <a
                href={formatWhatsAppHref(
                  siteConfig.contact.whatsapp,
                  `Hello Prime House Removals, I have just submitted a quote request (Ref: ${reference}).`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800 shadow-xs transition-colors duration-150 hover:bg-emerald-100"
              >
                <WhatsAppIcon className="size-3.5 text-emerald-600" aria-hidden="true" />
                WhatsApp us
              </a>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="mt-7">
        <h3 className="text-sm font-semibold text-ink">What happens next</h3>
        <motion.ol
          initial="hidden"
          animate="shown"
          variants={STEP_LIST}
          className="mt-4 flex flex-col gap-4"
        >
          {nextSteps.map((step) => (
            <motion.li key={step.step} variants={STEP_ITEM} className="flex gap-3.5">
              <span
                className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line bg-surface-subtle text-[11px] font-semibold tabular-nums text-ink-soft"
                aria-hidden="true"
              >
                {step.step}
              </span>
              <div>
                <p className="text-sm font-medium text-ink">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {step.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>

      <div className="mt-7 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
        <Button type="button" variant="secondary" onClick={onReset}>
          Send another request
        </Button>
        <Button asChild variant="ghost">
          <Link href="/contact" className="group">
            Contact us
            <ArrowRight className="u-arrow size-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
