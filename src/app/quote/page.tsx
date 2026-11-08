import type { Metadata } from "next";
import { Suspense } from "react";

import { QuoteContainer } from "@/components/quote/quote-container";
import { QuoteFormSkeleton } from "@/components/quote/quote-form-skeleton";
import { Container, Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Get a live removals quote & price estimate",
  description:
    "See your live price estimate in real time and request a written, itemised quotation. Share your addresses, moving date, property type and required services.",
  path: "/quote",
});

export default function QuotePage() {
  return (
    <>
      <Section className="pb-10 pt-14 md:pb-14 md:pt-20 lg:pt-24">
        <Container>
          <Reveal className="max-w-3xl">
            <span className="eyebrow">
              <span className="h-px w-6 bg-royal-600/40" aria-hidden="true" />
              Live Quote &amp; Booking
            </span>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl">
              Live quote &amp; pricing, built around your move
            </h1>
          </Reveal>
          <Reveal delay={0.08} className="max-w-3xl">
            <p className="mt-6 text-[15px] leading-relaxed text-ink-soft sm:text-base">
              Enter your property size, locations and services below to view an
              instant live estimated guide price. Submit when ready and we will
              confirm your guaranteed fixed price in writing. No obligation to book.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="subtle">
        <Container>
          <Suspense fallback={<QuoteFormSkeleton />}>
            <QuoteContainer />
          </Suspense>
        </Container>
      </Section>
    </>
  );
}
