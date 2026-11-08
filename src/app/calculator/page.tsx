import type { Metadata } from "next";

import { MoveCalculator } from "@/components/calculator/move-calculator";
import { Container, Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Removal Cost Calculator — Live Price Estimator",
  description:
    "Calculate your house removal cost instantly. Select your property size, moving distance, access and services to see a transparent live price estimate and recommended crew plan.",
  path: "/calculator",
});

export default function CalculatorPage() {
  return (
    <>
      <Section className="pb-8 pt-14 md:pb-12 md:pt-20 lg:pt-24">
        <Container>
          <div className="max-w-3xl">
            <Reveal immediate>
              <span className="eyebrow">
                <span className="h-px w-6 bg-royal-600/40" aria-hidden="true" />
                Live Price Calculator
              </span>
              <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl">
                Calculate your house removal cost
              </h1>
            </Reveal>
            <Reveal immediate delay={0.08}>
              <p className="mt-6 text-[15px] leading-relaxed text-ink-soft sm:text-base">
                Use our live removals cost estimator to explore typical pricing
                for your move. Adjust your property size, estimated travel
                distance, property access and optional packing services to see an
                instant itemised estimate and recommended vehicle plan.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="subtle" className="pt-0">
        <Container>
          <MoveCalculator />
        </Container>
      </Section>
    </>
  );
}
