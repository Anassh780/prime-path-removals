import Link from "next/link";
import { ArrowRight, Check, Mail, Phone } from "lucide-react";

import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import { Reveal } from "@/components/shared/reveal";
import { processSteps } from "@/content/process";
import { hasEmail, hasPhone, hasWhatsApp, siteConfig } from "@/config/site";
import { formatPhoneHref, formatWhatsAppHref } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LiveEstimateCard } from "@/components/quote/live-estimate-card";
import { calculateQuoteEstimate, type QuoteEstimate } from "@/lib/quote-pricing";

type QuoteAsideProps = {
  estimate?: QuoteEstimate;
};

/**
 * Supporting rail beside the quote form.
 * Displays the real-time live estimated guide price, the process steps,
 * and contact fallback.
 */
export function QuoteAside({ estimate }: QuoteAsideProps) {
  // If no estimate is explicitly provided, show default initial guidance
  const activeEstimate = estimate ?? calculateQuoteEstimate({ propertyType: "house-1-2" });

  return (
    <aside
      aria-label="Quote estimate and process"
      className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start"
    >
      {/* Live Estimate Card placed prominently at the top */}
      <LiveEstimateCard estimate={activeEstimate} />

      {/* Process Steps */}
      <Reveal delay={0.05}>
        <div className="rounded-xl bg-navy-950 p-6 text-white sm:p-7">
          <h2 className="text-lg font-semibold tracking-[-0.01em] text-white sm:text-xl">
            What happens next
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/65">
            Four straightforward steps, from your instant estimate to move day.
          </p>

          <ol className="mt-6 flex flex-col gap-5">
            {processSteps.map((step) => (
              <li key={step.step} className="flex gap-3.5">
                <span
                  className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[11px] font-semibold tabular-nums text-white/75"
                  aria-hidden="true"
                >
                  {step.step}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/65">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      {/* Guarantees */}
      <Reveal delay={0.1}>
        <div className="rounded-xl border border-line bg-white p-6 shadow-card">
          <h2 className="text-sm font-semibold text-ink">What you can expect</h2>

          <ul className="mt-4 flex flex-col gap-3">
            {[
              "A written, itemised quote — no obligation to book.",
              "Your details used only to prepare and discuss your quotation.",
              "One point of contact from first enquiry through to move day.",
            ].map((point) => (
              <li
                key={point}
                className="flex gap-2.5 text-sm leading-relaxed text-ink-soft"
              >
                <Check
                  className="mt-0.5 size-4 shrink-0 text-royal-600"
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-5 border-t border-line pt-5">
            <h2 className="text-sm font-semibold text-ink">
              Prefer to talk it through?
            </h2>

            {hasPhone || hasWhatsApp || hasEmail ? (
              <div className="mt-3 flex flex-col gap-2.5">
                {hasPhone ? (
                  <a
                    href={formatPhoneHref(siteConfig.contact.phone)}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-royal-700 underline-offset-4 transition-colors duration-150 hover:text-royal-800 hover:underline"
                  >
                    <Phone
                      className="size-4 transition-colors duration-150"
                      aria-hidden="true"
                    />
                    Call: {siteConfig.contact.phone}
                  </a>
                ) : null}
                {hasWhatsApp ? (
                  <a
                    href={formatWhatsAppHref(
                      siteConfig.contact.whatsapp,
                      "Hello Prime House Removals, I would like to book or ask about a quote.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-emerald-700 underline-offset-4 transition-colors duration-150 hover:text-emerald-800 hover:underline"
                  >
                    <WhatsAppIcon className="size-4 text-emerald-600" aria-hidden="true" />
                    WhatsApp: {siteConfig.contact.whatsapp}
                  </a>
                ) : null}
                {hasEmail ? (
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="group inline-flex items-center gap-2 break-all text-sm font-medium text-royal-700 underline-offset-4 transition-colors duration-150 hover:text-royal-800 hover:underline"
                  >
                    <Mail className="size-4 shrink-0" aria-hidden="true" />
                    {siteConfig.contact.email}
                  </a>
                ) : null}
              </div>
            ) : (
              <>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Direct contact details are being finalised. Use the contact page
                  and your enquiry will reach the team.
                </p>
                <Button asChild variant="secondary" size="sm" className="mt-3">
                  <Link href="/contact" className="group">
                    Go to contact
                    <ArrowRight className="u-arrow size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </Reveal>
    </aside>
  );
}
