import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { Container, Section, SectionHeading } from "@/components/shared/section";

const approachSteps = [
  {
    number: "01",
    title: "Establish the details",
    description:
      "We start with the addresses, the date and what is actually being moved. Access, parking, lifts, stairs and awkward items are recorded before a price is set.",
  },
  {
    number: "02",
    title: "Price the whole job",
    description:
      "Your quotation lists crew size, vehicle, packing materials, dismantling and any access requirements. Anything not included is stated as clearly as what is.",
  },
  {
    number: "03",
    title: "Agree the plan",
    description:
      "When you accept, the date is confirmed in writing and the crew is briefed on the property, the route and the order rooms will be cleared in.",
  },
  {
    number: "04",
    title: "Deliver and check",
    description:
      "Floors and doorways are protected, rooms are cleared in sequence, and at the other end everything is placed where you want it before we leave.",
  },
];

/**
 * "Our approach" — how a move is planned and delivered, as a numbered sequence
 * beside a sticky heading rather than a row of identical cards.
 */
export function Approach() {
  return (
    <Section id="our-approach" tone="default">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionHeading
              eyebrow="Our approach"
              title="How a move is planned and delivered"
              description="Every job runs through the same four stages. The scale changes; the order does not."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <div className="rounded-xl border border-line bg-surface-subtle p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                Working principle
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                We would rather ask a second question than discover a problem on
                the day. A move that is planned in detail is a move that takes
                less time, not more.
              </p>
            </div>
          </Reveal>
        </div>

        <Stagger stagger={0.06}>
          <ol className="divide-y divide-line border-y border-line">
            {approachSteps.map((step) => (
              <StaggerItem
                key={step.number}
                as="li"
                className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-5 py-7"
              >
                <span
                  className="pt-0.5 font-display text-sm font-semibold tabular-nums text-royal-700"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ink sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </ol>
        </Stagger>
      </Container>
    </Section>
  );
}
