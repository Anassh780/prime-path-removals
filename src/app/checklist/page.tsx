import type { Metadata } from "next";

import { MovingChecklist } from "@/components/checklist/moving-checklist";
import { Container, Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
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
      <Section className="pb-8 pt-14 md:pb-12 md:pt-20 lg:pt-24">
        <Container>
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
              <p className="mt-6 text-[15px] leading-relaxed text-ink-soft sm:text-base">
                A stress-free move starts with clear planning. Track your
                milestones from 8 weeks out through to moving day, key handovers,
                and utility meter readings. Your progress is saved automatically.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="subtle" className="pt-0">
        <Container>
          <MovingChecklist />
        </Container>
      </Section>
    </>
  );
}
