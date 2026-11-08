import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FloorPlan, RouteLine } from "@/components/brand/motifs";
import { MovingChecklist } from "@/components/checklist/moving-checklist";
import { Reveal } from "@/components/shared/reveal";
import { Container, Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Moving House Checklist & Moving Day Planner",
  description:
    "Interactive moving house checklist from 8 weeks before move day to unpacking in your new home. Keep your move organised with step-by-step task tracking.",
  path: "/checklist",
});

export default function ChecklistPage() {
  return (
    <>
      {/* Page top — white band lifted by the dot-grid wash and a quiet
          floor-plan motif on wide screens. */}
      <Section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[440px] bg-grid opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
        <FloorPlan className="pointer-events-none absolute -right-28 -bottom-16 hidden w-[34rem] opacity-[0.18] lg:block" />

        <Container className="relative">
          <div className="max-w-3xl">
            <Reveal immediate>
              <span className="eyebrow">
                <span className="h-px w-6 bg-royal-600/40" aria-hidden="true" />
                Moving Planner
              </span>
              <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl">
                Moving house checklist &amp; timeline
              </h1>
            </Reveal>
            <Reveal immediate delay={0.08}>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-soft sm:text-base">
                A stress-free move starts with clear planning. Track your
                milestones from 8 weeks out through to moving day, key handovers,
                and utility meter readings. Your progress is saved automatically.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="subtle" className="pt-12 md:pt-16 lg:pt-20">
        <Container>
          <MovingChecklist />
        </Container>
      </Section>

      {/* Page footer band — the single full-bleed navy-950 block on this page.
          Hidden in print so the checklist prints as clean task content. */}
      <Section tone="navy" className="relative overflow-hidden print:hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-inverse opacity-30"
        />
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
                Ready to secure your removal date?
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-navy-300 sm:text-base">
                Use our live price calculator to see instant pricing, or submit a
                written quote request with your addresses and date.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
                <Button variant="accent" size="lg" asChild className="group">
                  <Link href="/quote">
                    Get a live quote
                    <ArrowRight className="u-arrow size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/calculator">Cost calculator</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
