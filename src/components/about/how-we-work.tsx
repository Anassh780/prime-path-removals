import { highlights } from "@/content/company";

import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { Container, Section, SectionHeading } from "@/components/shared/section";

/**
 * "How we work" band. The four highlights from company.ts are process facts,
 * not trust badges — presented as oversized numerals with their scope
 * explained, on a navy-950 surface with a faint inverse dot grid.
 */
export function HowWeWork() {
  return (
    <Section
      id="how-we-work"
      tone="navy"
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-inverse opacity-40"
      />
      <Container className="relative">
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
                  <p className="font-display text-5xl tracking-[-0.02em] tabular-nums text-white lg:text-6xl xl:text-7xl">
                    {item.value}
                  </p>
                  <h3 className="mt-4 text-[15px] font-semibold text-white">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-300">
                    {item.description}
                  </p>
                </StaggerItem>
              </div>
            ))}
          </div>
        </Stagger>

        <Reveal delay={0.1} className="mt-6">
          <p className="max-w-3xl text-sm leading-relaxed text-navy-300/80">
            Turnaround is measured from the point we have complete move details,
            not from your first enquiry, so the figure reflects the job rather
            than the queue.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
