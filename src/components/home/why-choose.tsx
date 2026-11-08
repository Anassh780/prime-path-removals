import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { Container, Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { whyChoose } from "@/content/company";

export function WhyChoose() {
  return (
    <Section
      id="why-choose"
      aria-labelledby="why-choose-heading"
      tone="subtle"
      className="border-y border-line/70"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow">
              <span className="h-px w-6 bg-royal-600/40" aria-hidden="true" />
              Why Prime House
            </span>

            <h2
              id="why-choose-heading"
              className="mt-5 max-w-sm font-display text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] text-ink sm:text-4xl lg:text-[2.6rem]"
            >
              What you can rely on.
            </h2>

            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-soft sm:text-base">
              The details that make a move feel calm — planned before the crew
              arrives rather than improvised on the day.
            </p>

            <Button
              asChild
              variant="link"
              className="group mt-6 text-sm font-semibold"
            >
              <Link href="/quote">
                Start with a free quote
                <ArrowRight className="u-arrow size-4" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>

          <Stagger delay={0.06} stagger={0.06}>
            <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {whyChoose.map((item) => {
                const Icon = item.icon;

                return (
                  <StaggerItem
                    key={item.title}
                    as="li"
                    className="group border-t border-line pt-6"
                  >
                    <div className="flex items-center gap-3">
                      <span className="u-icon-tile flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-navy-800 shadow-xs group-hover:border-navy-200 group-hover:bg-navy-50 group-hover:text-navy-900">
                        <Icon
                          className="size-4"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      </span>
                      <h3 className="text-lg font-semibold text-ink">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                      {item.description}
                    </p>
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
