import Link from "next/link";
import { ArrowRight, CalendarCheck, FileText, Users } from "lucide-react";

import { HeroScene } from "@/components/brand/hero-scene";
import { HeroQuickQuote } from "@/components/home/hero-quick-quote";
import { Reveal, RevealText } from "@/components/shared/reveal";
import { Container } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

/**
 * Capability-based trust points only — no counts, ratings, years or claims.
 * Kept to one short line each so the hero stays calm.
 */
const trustPoints = [
  { icon: FileText, label: "Written, itemised quotes" },
  { icon: Users, label: "Trained moving crews" },
  { icon: CalendarCheck, label: "Dates confirmed in writing" },
];

/**
 * Orchestrated entrance — one step every ~0.06s:
 * eyebrow → headline → paragraph → calls to action → estimator → trust points,
 * with the HeroScene settling in alongside the paragraph. Every step is
 * `immediate` because all of it sits above the fold, and each block owns its
 * own entrance so nothing animates twice.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-white"
    >
      {/* Quiet dot-grid wash behind the top of the hero — decorative only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-grid [mask-image:linear-gradient(to_bottom,black,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:py-24">
          <div className="max-w-2xl">
            <Reveal immediate y={10} duration={0.45}>
              <span className="eyebrow">
                <span className="h-px w-6 bg-royal-600/40" aria-hidden="true" />
                House, office &amp; commercial removals
              </span>
            </Reveal>

            <h1
              id="hero-heading"
              className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl"
            >
              <RevealText text={siteConfig.tagline} delay={0.06} step={0.04} />
            </h1>

            <Reveal immediate delay={0.16} y={14} className="mt-6 max-w-xl">
              <p className="text-[15px] leading-relaxed text-ink-soft sm:text-base">
                From a single item to a full office relocation, we plan the day
                around your property, your timeline and a price you agree in
                writing before you commit.
              </p>
            </Reveal>

            <Reveal
              immediate
              delay={0.22}
              y={12}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button asChild variant="accent" size="lg" className="group">
                <Link href="/quote">
                  Get a free quote
                  <ArrowRight className="u-arrow size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/services">Explore our services</Link>
              </Button>
            </Reveal>

            <Reveal immediate delay={0.28} y={12} className="mt-8">
              <HeroQuickQuote />
            </Reveal>

            <Reveal immediate delay={0.34} y={12} className="mt-8">
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
                {trustPoints.map((point) => {
                  const Icon = point.icon;

                  return (
                    <li
                      key={point.label}
                      className="inline-flex items-center gap-2 text-sm text-ink-soft"
                    >
                      <Icon
                        className="size-4 text-royal-700"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      {point.label}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          {/* HeroScene is drawn as its own framed plate, so it is placed on an
              offset backing rather than inside a second frame — composed, not
              floating. The illustration owns its own scene-assembly entrance
              (see brand/hero-scene), so the figure is deliberately NOT wrapped
              in a second reveal — one entrance per element. */}
          <figure className="relative mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 hidden h-full w-full rounded-2xl border border-line bg-navy-950/5 sm:block"
              />
              <div className="relative">
                <HeroScene />
              </div>
            </div>

            <figcaption className="mt-5 flex items-start gap-3 text-[13px] leading-relaxed text-ink-muted">
              <span
                className="mt-2 h-px w-6 shrink-0 bg-line-strong"
                aria-hidden="true"
              />
              <span>
                Crew, vehicle and labelled boxes — planned room by room before
                the day.
              </span>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
