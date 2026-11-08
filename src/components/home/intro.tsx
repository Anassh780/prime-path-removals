import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { Container, Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { whyChoose } from "@/content/company";

/**
 * A compact preview of the commitments expanded in the Why Choose section —
 * titles only, so the two sections do not repeat the same copy.
 */
const introPoints = [whyChoose[0], whyChoose[2], whyChoose[5]];

export function Intro() {
  return (
    <Section
      id="who-we-are"
      aria-labelledby="intro-heading"
      tone="subtle"
      className="border-y border-line/70"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-accent-600/50" aria-hidden="true" />
              Who we are
            </span>

            <h2
              id="intro-heading"
              className="mt-5 max-w-md font-display text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] text-ink sm:text-4xl lg:text-[2.6rem]"
            >
              Careful removals, planned properly.
            </h2>

            <Button
              asChild
              variant="link"
              className="group mt-6 text-sm font-semibold"
            >
              <Link href="/about">
                More about Prime House
                <ArrowRight className="u-arrow size-4" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>

          <Reveal delay={0.08} className="flex max-w-2xl flex-col gap-5">
            <p className="text-[15px] leading-relaxed text-ink-soft sm:text-base">
              Prime House Removals handles house moves, office relocations,
              packing, furniture transport and property clearance. Every job
              begins with a conversation about your property, your dates and
              what needs moving, then a written quote that sets out the crew,
              vehicle and materials involved.
            </p>
            <p className="text-[15px] leading-relaxed text-ink-soft sm:text-base">
              On the day, a trained crew protects floors and doorways, works
              room by room and places everything where it belongs at the other
              end. No call centre handovers, no vague hourly estimates and no
              extras added after the fact.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 sm:mt-14">
          <Reveal delay={0.1}>
            <p className="eyebrow">What you can expect</p>
          </Reveal>

          <Stagger delay={0.14} stagger={0.06} className="mt-4">
            <ul className="grid divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {introPoints.map((point) => {
                const Icon = point.icon;

                return (
                  <StaggerItem
                    key={point.title}
                    as="li"
                    className="group flex items-center gap-3 py-4 sm:px-6 sm:py-5 sm:first:pl-0 sm:last:pr-0"
                  >
                    <span className="u-icon-tile flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-royal-700 shadow-xs group-hover:border-royal-100 group-hover:bg-royal-50">
                      <Icon
                        className="size-4"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-sm font-semibold text-ink">
                      {point.title}
                    </span>
                  </StaggerItem>
                );
              })}
            </ul>
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
