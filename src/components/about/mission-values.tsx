import { values } from "@/content/company";

import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { Container, Section, SectionHeading } from "@/components/shared/section";

/**
 * Mission and values — the four values from company.ts as a refined 2x2 grid
 * beside a plain statement of what the business is trying to get right.
 */
export function MissionValues() {
  return (
    <Section id="values" tone="subtle">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Mission and values"
              title="What we are trying to get right"
              description="Our aim is simple: a move that happens on the day and at the price we agreed, with your property treated as carefully as the things inside it."
            />
          </Reveal>

          <Stagger stagger={0.06} className="grid gap-5 sm:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <StaggerItem key={value.title} className="h-full">
                  <div className="group u-card u-lift h-full rounded-xl border border-line bg-white p-6 shadow-card hover:border-navy-200 hover:shadow-lift">
                    <span className="u-icon-tile inline-flex size-10 items-center justify-center rounded-lg border border-line bg-surface-subtle text-navy-700 group-hover:border-royal-200 group-hover:bg-royal-50 group-hover:text-royal-700">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-ink">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {value.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
