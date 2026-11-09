import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FloorPlan } from "@/components/brand/motifs";
import { ProcessSteps } from "@/components/home/process-steps";
import { Reveal } from "@/components/shared/reveal";
import { Container, Section, SectionHeading } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { processSteps } from "@/content/process";

/**
 * How a move works, from first enquiry to move day.
 * Copy comes from @/content/process — no invented claims or statistics.
 *
 * This is one of the home page's dark bands: navy-950 with white headings,
 * navy-300 body copy and an azure connector, so the sequence reads as a
 * deliberate pause between the light sections around it.
 *
 * The step grid and its scroll-linked connector live in a small client leaf so
 * this section stays a server component.
 */
export function Process() {
  return (
    <Section id="process" tone="navy" className="relative overflow-hidden">
      {/* Floor-plan motif — quiet depth behind the heading, decorative only. */}
      <FloorPlan className="pointer-events-none absolute -right-24 top-10 hidden w-[34rem] opacity-[0.1] xl:block" />

      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="How your move works"
            description="A four-step process with written confirmation at every stage."
            tone="inverse"
          />
        </Reveal>

        <ProcessSteps steps={processSteps} />

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-navy-300">
              Start with your addresses and inventory. We will take care of the
              rest.
            </p>
            <Button
              variant="link"
              size="md"
              asChild
              className="self-start text-accent-300 hover:text-white sm:self-auto"
            >
              <Link href="/quote">
                Start a quote
                <ArrowRight className="u-arrow size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
