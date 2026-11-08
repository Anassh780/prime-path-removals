import type { Metadata } from "next";

import { RouteLine } from "@/components/brand/motifs";
import { MoveCalculator } from "@/components/calculator/move-calculator";
import { Reveal } from "@/components/shared/reveal";
import { Container, Section } from "@/components/shared/section";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Removal Cost Calculator | Live Price Estimator",
  description:
    "Calculate your house removal cost instantly. Select your property size, moving distance, access and services to see a transparent live price estimate and recommended crew plan.",
  path: "/calculator",
});

export default function CalculatorPage() {
  return (
    <>
      {/* Page top — the page's single full-bleed navy band: inverse dot grid,
          route motif and white display heading instead of a plain white intro. */}
      <Section tone="navy" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-inverse opacity-40"
        />
        <RouteLine className="pointer-events-none absolute -right-32 top-1/2 hidden w-[40rem] -translate-y-1/2 opacity-20 lg:block" />

        <Container className="relative">
          <div className="max-w-3xl">
            <Reveal immediate>
              <span className="eyebrow text-accent-300">
                <span className="h-px w-6 bg-accent-300/60" aria-hidden="true" />
                Live Price Calculator
              </span>
              <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
                Calculate your house removal cost
              </h1>
            </Reveal>
            <Reveal immediate delay={0.08}>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-navy-300 sm:text-base">
                Use our live removals cost estimator to explore typical pricing
                for your move. Adjust your property size, estimated travel
                distance, property access and optional packing services to see an
                instant itemised estimate and recommended vehicle plan.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="subtle" className="pt-12 md:pt-16 lg:pt-20">
        <Container>
          <MoveCalculator />
        </Container>
      </Section>
    </>
  );
}
