import type { Metadata } from "next";
import { Suspense } from "react";

import { RouteLine } from "@/components/brand/motifs";
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
      {/*
        Full-bleed navy band: the page's dark anchor before the light form
        section. The route motif is decorative only and sits behind the copy.
      */}
      <Section
        tone="navy"
        className="relative overflow-hidden border-b border-white/10"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-grid-inverse"
          aria-hidden="true"
        />
        <RouteLine className="pointer-events-none absolute -right-24 top-1/2 hidden w-[30rem] -translate-y-1/2 opacity-40 lg:block" />
        <Container className="relative">
          <Reveal immediate y={20} duration={0.6} className="max-w-3xl">
            <span className="eyebrow text-accent-300">
              <span className="h-px w-6 bg-accent-300/60" aria-hidden="true" />
              Live Quote &amp; Booking
            </span>
            <h1 className="mt-5 max-w-[20ch] font-display text-4xl leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
              Get your live quote
            </h1>
          </Reveal>
          <Reveal immediate delay={0.08} y={16} className="max-w-2xl">
            <p className="mt-6 text-[15px] leading-relaxed text-navy-300 sm:text-base">
              Enter your move details to see instant live pricing. We will
              confirm your guaranteed fixed price in writing.
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
