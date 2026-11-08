import Link from "next/link";

import { FloorPlan } from "@/components/brand/motifs";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/shared/section";
import { Button } from "@/components/ui/button";

const planningNotes = [
  {
    label: "Access",
    text: "Parking, lifts, stairs and doorway widths at both addresses.",
  },
  {
    label: "Volume",
    text: "Inventory, fragile items and anything that needs dismantling.",
  },
  {
    label: "Timeline",
    text: "Dates, key handover times and any deadline you are working to.",
  },
];

/**
 * About page hero. Illustration-led rather than photographic: a navy planning
 * panel carrying the floor-plan motif, next to an honest introduction.
 */
export function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-white">
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-50"
        aria-hidden="true"
      />
      <Container className="relative py-16 md:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <Reveal immediate y={20} duration={0.6}>
            <span className="eyebrow">
              <span
                className="h-px w-6 bg-royal-600/40"
                aria-hidden="true"
              />
              About us
            </span>
            <h1 className="mt-5 max-w-[18ch] font-display text-4xl leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl">
              One team, from first quote to final check
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-soft sm:text-base">
              Prime House Removals is a moving company for house moves, office
              relocations, packing, furniture transport and property clearance.
              We keep the operation deliberately joined-up: the person who works
              out your quote is the person who plans the crew, the vehicle and
              the running order of the day.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft sm:text-base">
              Most of a good move is decided before the front door opens —
              access and parking, what fits in one load, which items need
              protecting, and when the keys are handed over. We settle those
              details in advance, so move day follows a schedule rather than a
              scramble.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button variant="accent" size="lg" asChild>
                <Link href="/quote">Get a free quote</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact">Talk to us</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal immediate delay={0.12} y={16}>
            <div className="relative overflow-hidden rounded-2xl border border-navy-800 bg-navy-950 p-7 sm:p-9">
              <FloorPlan className="pointer-events-none absolute -right-20 -bottom-12 w-[26rem] opacity-20" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                  Planning notes
                </p>
                <h2 className="mt-4 font-display text-2xl tracking-[-0.02em] text-white sm:text-[1.75rem]">
                  What every quote starts with
                </h2>
                <dl className="mt-6 divide-y divide-white/10 border-t border-white/10">
                  {planningNotes.map((note) => (
                    <div key={note.label} className="py-3.5">
                      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-royal-300">
                        {note.label}
                      </dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-white/70">
                        {note.text}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-sm leading-relaxed text-white/55">
                  These three notes are agreed before a price is set, so the
                  quotation reflects the actual job rather than an average one.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
