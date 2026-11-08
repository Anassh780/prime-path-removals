"use client";

import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2, PhoneCall, ShieldCheck } from "lucide-react";

import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import { HeroQuickQuote } from "@/components/home/hero-quick-quote";
import { Reveal } from "@/components/shared/reveal";
import { Container, Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { hasPhone, hasWhatsApp, siteConfig } from "@/config/site";
import { formatPhoneHref, formatWhatsAppHref } from "@/lib/utils";

const commitments = [
  "Fixed written quotes with zero hidden extras",
  "Trained moving crew with protective floor runners & furniture covers",
  "Dedicated vehicle size & guaranteed date confirmation",
];

export function HeroEstimateSection() {
  return (
    <Section
      id="quick-estimate-section"
      tone="subtle"
      className="relative border-b border-line bg-gradient-to-b from-surface to-surface-subtle py-14 sm:py-16 md:py-20"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          {/* Left Column: Context, Value Proposition & Trust */}
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-royal-600/15 bg-royal-50/70 px-3.5 py-1 text-xs font-semibold text-royal-700">
                <ShieldCheck className="size-3.5 text-royal-600" />
                <span>Instant Removals Estimator</span>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl lg:text-[2.6rem] lg:leading-[1.14]">
                Plan Your Move with Clear, Upfront Pricing.
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft sm:text-base">
                Get an immediate price guide and recommended vehicle size for your
                move in seconds. No obligation, no sales calls, just a
                transparent estimate tailored to your properties.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <ul className="mt-6 space-y-3">
                {commitments.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink-soft">
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-accent-600"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild variant="outline" size="sm">
                  <Link href="/calculator">
                    <Calculator className="mr-2 size-4 text-royal-600" />
                    Try Room by Room Calculator
                    <ArrowRight className="ml-1.5 size-3.5" />
                  </Link>
                </Button>

                {hasPhone && (
                  <a
                    href={formatPhoneHref(siteConfig.contact.phone)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-royal-600 hover:text-royal-700 transition-colors py-1"
                  >
                    <PhoneCall className="size-3.5 text-royal-600" />
                    <span>Call {siteConfig.contact.phone}</span>
                  </a>
                )}

                {hasWhatsApp && (
                  <a
                    href={formatWhatsAppHref(
                      siteConfig.contact.whatsapp,
                      "Hello Prime House Removals, I would like to enquire about a removal quote.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-600 hover:text-accent-700 transition-colors py-1"
                  >
                    <WhatsAppIcon className="size-3.5 text-accent-600" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </Reveal>
          </div>

          {/* Right Column: Relocated Quick Quote Calculator */}
          <Reveal delay={0.14}>
            <div className="rounded-2xl border border-navy-950/10 bg-white p-2 shadow-card sm:p-3">
              <HeroQuickQuote />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
