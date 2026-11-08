import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProcessSteps } from "@/components/home/process-steps";
import { Reveal } from "@/components/shared/reveal";
import { Container, Section, SectionHeading } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { processSteps } from "@/content/process";

/**
 * How a move works, from first enquiry to move day.
 * Copy comes from @/content/process — no invented claims or statistics.
 *
 * The step grid and its scroll-linked connector live in a small client leaf so
 * this section stays a server component.
 */
export function Process() {
  return (
    <Section id="process" tone="default">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="Four steps from first enquiry to move day"
            description="A clear sequence, one point of contact and nothing confirmed until you have it in writing."
          />
        </Reveal>

        <ProcessSteps steps={processSteps} />

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-ink-soft">
              Start with the addresses, your date and what needs moving. We will
              take it from there.
            </p>
            <Button
              variant="link"
              size="md"
              asChild
              className="group self-start sm:self-auto"
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
