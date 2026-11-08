import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Container, Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";

type ServicesCtaProps = {
  eyebrow?: string;
  title: ReactNode;
  description: ReactNode;
  quoteHref?: string;
  quoteLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

/**
 * Closing conversion band shared by the services listing and service detail
 * pages. Navy surface with a faint inverse dot grid, one accent action and one
 * neutral action.
 */
export function ServicesCta({
  eyebrow = "Next step",
  title,
  description,
  quoteHref = "/quote",
  quoteLabel = "Get a free quote",
  secondaryHref = "/contact",
  secondaryLabel = "Contact us",
}: ServicesCtaProps) {
  return (
    <Section
      tone="navy"
      className="relative overflow-hidden border-t border-navy-800"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-inverse opacity-40"
      />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <Reveal className="lg:col-span-8">
            <span className="eyebrow text-accent-300">
              <span
                className="h-px w-6 bg-accent-300/60"
                aria-hidden="true"
              />
              {eyebrow}
            </span>

            <h2 className="mt-5 font-display text-3xl leading-[1.1] tracking-[-0.02em] text-white sm:text-4xl lg:text-[2.6rem]">
              {title}
            </h2>

            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-base">
              {description}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4 lg:justify-self-end">
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <Button asChild variant="accent" size="lg" className="group">
                <Link href={quoteHref}>
                  {quoteLabel}
                  <ArrowRight className="u-arrow size-4" aria-hidden="true" />
                </Link>
              </Button>

              <Button asChild variant="secondary" size="lg">
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-white/50 lg:text-right">
              Written, itemised quotes — no obligation.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
