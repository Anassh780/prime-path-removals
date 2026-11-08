import { highlights } from "@/content/company";

import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { Container, Section, SectionHeading } from "@/components/shared/section";

/**
 * "How we work" band. The four highlights from company.ts are process facts,
 * not trust badges — presented as large numerals with their scope explained.
 */
export function HowWeWork() {
  return (
    <Section id="how-we-work" tone="navy">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Working with us"
            title="How we work"
            description="A quotation from Prime House Removals is the start of a plan, not the end of a sales call. These four facts describe what that means in practice."
            tone="inverse"
          />
        </Reveal>

        <Stagger stagger={0.06} className="mt-12">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <div key={item.label} className="bg-navy-950 p-6 lg:p-7">
                <StaggerItem>
                  <p className="font-display text-5xl tracking-[-0.02em] tabular-nums text-white lg:text-6xl">
                    {item.value}
                  </p>
                  <h3 className="mt-4 text-[15px] font-semibold text-white">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {item.description}
                  </p>
                </StaggerItem>
              </div>
            ))}
          </div>
        </Stagger>

        <Reveal delay={0.1} className="mt-6">
          <p className="max-w-3xl text-sm leading-relaxed text-white/55">
            Turnaround is measured from the point we have complete move details,
            not from your first enquiry — so the figure reflects the job rather
            than the queue.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
