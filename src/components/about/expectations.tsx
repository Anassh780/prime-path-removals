import { whyChoose } from "@/content/company";

import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { Container, Section, SectionHeading } from "@/components/shared/section";

/**
 * "What you can expect" — the six capability statements from company.ts as a
 * two-column hairline list. Deliberately not cards: these are standards, not
 * features. Azure-tinted icon tiles keep the white section from reading flat.
 */
export function Expectations() {
  return (
    <Section id="what-to-expect" tone="default">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What you can expect"
            title="The standard behind every job"
            description="None of these are extras or upgrades. They are how a move is run, whether it is a one-bedroom flat or a warehouse relocation."
          />
        </Reveal>

        <Stagger stagger={0.05} className="mt-12">
          <ul className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
            {whyChoose.map((item) => {
              const Icon = item.icon;

              return (
                <StaggerItem
                  key={item.title}
                  as="li"
                  className="border-t border-line pt-6"
                >
                  <div className="flex gap-4">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-royal-200 bg-royal-50 text-royal-700">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-ink sm:text-lg">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </ul>
        </Stagger>
      </Container>
    </Section>
  );
}
