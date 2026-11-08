import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { RouteLine } from "@/components/brand/motifs";
import { Reveal } from "@/components/shared/reveal";
import { Container, Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";

/**
 * Closing call to action for the About page. Navy band with the route motif as
 * a quiet accent, pointing at the two real next steps: quote and contact.
 */
export function AboutCta() {
  return (
    <Section id="next-step" tone="navy" className="relative overflow-hidden">
      <RouteLine className="pointer-events-none absolute -right-28 top-1/2 hidden w-[34rem] -translate-y-1/2 opacity-20 lg:block" />
      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <Reveal className="max-w-2xl">
            <span className="eyebrow text-accent-300">
              <span
                className="h-px w-6 bg-accent-300/60"
                aria-hidden="true"
              />
              Next step
            </span>
            <h2 className="mt-5 font-display text-3xl leading-[1.1] tracking-[-0.02em] text-white sm:text-4xl lg:text-[2.6rem]">
              Tell us about the move. We will put the plan in writing.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/70 sm:text-base">
              Share the addresses, your date and what needs moving. You will
              receive an itemised quotation, and there is no obligation to book.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <Button variant="accent" size="lg" asChild className="group">
                <Link href="/quote">
                  Get a free quote
                  <ArrowRight className="u-arrow size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact">Contact us</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
