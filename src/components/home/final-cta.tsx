import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import { BoxStack, RouteLine } from "@/components/brand/motifs";
import { Reveal } from "@/components/shared/reveal";
import { Container, Section, SectionHeading } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { hasPhone, hasWhatsApp, siteConfig } from "@/config/site";
import { formatPhoneHref, formatWhatsAppHref } from "@/lib/utils";

/**
 * Closing conversion band. Navy surface, one accent CTA, no invented claims —
 * the copy only describes how the quote process works.
 */
export function FinalCta() {
  return (
    <Section id="get-a-quote" tone="navy" className="relative overflow-hidden">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Get a quote"
              title="Tell us about the move. We will put it in writing."
              description="Share the addresses, your date and what needs moving. We will review the details, confirm availability and send an itemised quotation with the crew and vehicle plan with no obligation to book."
              tone="inverse"
            />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                variant="accent"
                size="lg"
                asChild
                className="group"
              >
                <Link href="/quote">
                  Request a quote
                  <ArrowRight className="u-arrow size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                asChild
                className="border-white/25 bg-white/5 text-white hover:border-white/40 hover:bg-white/10"
              >
                <Link href="/contact">Contact us</Link>
              </Button>
            </div>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60">
              No account needed. Checking availability is free and does not
              commit you to booking.
            </p>

            {hasPhone || hasWhatsApp ? (
              <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/10 pt-4 text-xs sm:text-sm text-white/80">
                <span className="text-white/60">Direct booking line:</span>
                {hasPhone ? (
                  <a
                    href={formatPhoneHref(siteConfig.contact.phone)}
                    className="-my-1 inline-flex items-center gap-1.5 py-1 font-medium text-white hover:text-accent-300"
                  >
                    <Phone className="size-3.5 text-royal-300" aria-hidden="true" />
                    {siteConfig.contact.phone}
                  </a>
                ) : null}
                {hasWhatsApp ? (
                  <a
                    href={formatWhatsAppHref(
                      siteConfig.contact.whatsapp,
                      "Hello Prime House Removals, I would like to book a move.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-my-1 inline-flex items-center gap-1.5 py-1 font-medium text-accent-300 hover:text-white"
                  >
                    <WhatsAppIcon className="size-3.5" aria-hidden="true" />
                    WhatsApp chat
                  </a>
                ) : null}
              </div>
            ) : null}
          </Reveal>

          <Reveal delay={0.12} y={18}>
            <div
              className="relative mx-auto w-full max-w-md lg:max-w-none"
              aria-hidden="true"
            >
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-2.5 sm:p-3">
                <div className="rounded-xl bg-white p-6 shadow-overlay sm:p-8">
                  <RouteLine className="w-full" />
                </div>
              </div>
              <div className="absolute -bottom-5 -left-3 w-28 rounded-xl border border-line bg-surface-subtle p-3 shadow-lift sm:-left-5 sm:w-32">
                <BoxStack className="w-full" />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
