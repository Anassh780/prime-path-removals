"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Check,
  Maximize2,
  Truck,
  Wrench,
  X,
} from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

import { Container } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export const showcaseStages = [
  {
    id: "packing",
    step: "01",
    label: "01 / PROTECTION",
    tabTitle: "01. Packing",
    stageName: "Fragile Packing & Protection",
    headline: "Every item deserves careful handling.",
    description:
      "Our experienced crew wraps and protects your belongings before transit. Delicate items are cushioned and inventoried room by room.",
    highlights: [
      "Quilted blankets & furniture wrap",
      "High-density bubble wrap",
      "Double-walled removal cartons",
      "Room-by-room inventory labelling",
    ],
    image: "/images/service-packing.jpg",
    alt: "Prime House Removals team in liveried navy polo shirts packing fragile china and porcelain into branded cartons with bubble wrap",
    icon: Boxes,
    href: "/services/packing-and-loading",
    equipment: "Double-walled cartons · Bubble wrap",
  },
  {
    id: "loading",
    step: "02",
    label: "02 / TRANSPORTATION",
    tabTitle: "02. Transit",
    stageName: "Fleet Loading & Transportation",
    headline: "Every move, professionally managed.",
    description:
      "Our fully equipped Luton fleet and trained crew ensure secure transport. Items are anchored with ratchet rails, and floors are protected throughout.",
    highlights: [
      "500kg hydraulic tail-lift fleet",
      "Internal steel ratchet tie-downs",
      "Neoprene floor runners",
      "Liveried 2 to 3-person crew",
    ],
    image: "/images/service-loading.jpg",
    alt: "Prime House Removals 3-person removals crew in liveried navy polo shirts loading boxes into a Luton van with hydraulic tail-lift",
    icon: Truck,
    href: "/services/house-removals",
    equipment: "Luton body · 500kg tail-lift · Ratchet rails",
  },
  {
    id: "assembly",
    step: "03",
    label: "03 / REASSEMBLY",
    tabTitle: "03. Reassembly",
    stageName: "Furniture Dismantling & Assembly",
    headline: "Your new space, ready to feel like home.",
    description:
      "Technicians carefully reconstruct and place furniture in designated rooms. Fixings are tagged, with positioning checked against your floor plan.",
    highlights: [
      "Fixings bagged & tagged",
      "Cordless power tools on hand",
      "Floor protection pads applied",
      "Room-by-room positioning check",
    ],
    image: "/images/service-assembly.jpg",
    alt: "Prime House Removals technicians in branded navy polo shirts assembling wooden bed frame and wardrobe with cordless power drill",
    icon: Wrench,
    href: "/services/furniture-moving",
    equipment: "Power tools · Hardware tagged · Levelling kit",
  },
];

export function MovingShowcase() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = React.useState(0);
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  // Track scroll through the 350vh pinned storytelling section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Update active stage indicator based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) {
      setActiveStage(0);
    } else if (latest < 0.66) {
      setActiveStage(1);
    } else {
      setActiveStage(2);
    }
  });

  // Smooth scroll progress bar width (0% to 100%)
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // ===================== DESKTOP STAGE 1 TRANSFORMS =====================
  // Stage 1 is fully visible from 0 to 0.28, exits between 0.28 and 0.38
  const photo1Opacity = useTransform(scrollYProgress, [0, 0.28, 0.38], [1, 1, 0]);
  const photo1Scale = useTransform(scrollYProgress, [0, 0.28, 0.38], [1, 1, 0.96]);
  const text1Opacity = useTransform(scrollYProgress, [0, 0.26, 0.34], [1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.26, 0.34], [0, 0, -32]);

  // ===================== DESKTOP STAGE 2 TRANSFORMS =====================
  // Stage 2 enters between 0.28 and 0.38, stays until 0.62, exits by 0.72
  const photo2Opacity = useTransform(
    scrollYProgress,
    [0.28, 0.38, 0.62, 0.72],
    [0, 1, 1, 0]
  );
  const photo2Scale = useTransform(
    scrollYProgress,
    [0.28, 0.38, 0.62, 0.72],
    [1.04, 1, 1, 0.96]
  );
  const text2Opacity = useTransform(
    scrollYProgress,
    [0.30, 0.38, 0.60, 0.68],
    [0, 1, 1, 0]
  );
  const text2Y = useTransform(
    scrollYProgress,
    [0.30, 0.38, 0.60, 0.68],
    [32, 0, 0, -32]
  );

  // ===================== DESKTOP STAGE 3 TRANSFORMS =====================
  // Stage 3 enters between 0.62 and 0.72, stays through 1.0
  const photo3Opacity = useTransform(scrollYProgress, [0.62, 0.72, 1], [0, 1, 1]);
  const photo3Scale = useTransform(scrollYProgress, [0.62, 0.72, 1], [1.04, 1, 1]);
  const text3Opacity = useTransform(scrollYProgress, [0.64, 0.72, 1], [0, 1, 1]);
  const text3Y = useTransform(scrollYProgress, [0.64, 0.72, 1], [32, 0, 0]);

  // Jump to specific stage via desktop tab click
  const scrollToStage = (stageIndex: number) => {
    if (!containerRef.current) return;
    const containerTop =
      containerRef.current.getBoundingClientRect().top + window.scrollY;
    const containerHeight = containerRef.current.scrollHeight;
    const targetTargets = [0.08, 0.48, 0.88];
    const targetY = containerTop + containerHeight * targetTargets[stageIndex];
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <>
      {/* =========================================================================
          1. DESKTOP / LAPTOP PINNED CINEMATIC EXPERIENCE (lg:block, hidden on mobile)
          Takes 350vh scroll distance, pinned smoothly while the story unfolds.
         ========================================================================= */}
      <section
        ref={containerRef}
        id="moving-standards"
        className="relative hidden lg:block h-[350vh] bg-navy-950 text-white"
        aria-label="Prime House Removals Operational Standards"
      >
        {/* Sticky Viewport Stage (100vh) */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-10 xl:py-14">
          <Container className="relative flex flex-col justify-between h-full">
            {/* Top Navigation & Timeline Progress Header */}
            <header className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <span className="size-2 rounded-full bg-accent-400" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-accent-300">
                  Operational Standards · End-to-End Move Journey
                </span>
              </div>

              {/* Interactive Stage Jump Controls & Continuous Progress Bar */}
              <div className="flex flex-col items-end gap-2">
                <nav aria-label="Operational stages" className="flex items-center gap-1 sm:gap-2">
                  {showcaseStages.map((stage, idx) => {
                    const isActive = activeStage === idx;
                    return (
                      <button
                        key={stage.id}
                        type="button"
                        onClick={() => scrollToStage(idx)}
                        className={`flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold transition-all duration-300 ${
                          isActive
                            ? "bg-white/15 text-white ring-1 ring-white/20"
                            : "text-white/50 hover:text-white/80"
                        }`}
                        aria-pressed={isActive}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            isActive ? "bg-accent-400" : "bg-white/30"
                          }`}
                        />
                        <span>{stage.tabTitle}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Micro Progress Bar */}
                <div className="h-0.5 w-44 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full bg-accent-400"
                    style={{ width: progressWidth }}
                  />
                </div>
              </div>
            </header>

            {/* Central Pinned Storytelling Canvas (Asymmetric 2-Column Grid) */}
            <div className="my-auto grid grid-cols-12 gap-10 xl:gap-16 items-center">
              {/* Left Column: Progressive Text Narrative (5 Cols) */}
              <div className="relative col-span-5 min-h-[420px] flex items-center">
                {/* ----------------- Stage 01 Typography ----------------- */}
                <motion.div
                  className="absolute inset-0 flex flex-col justify-center"
                  style={{ opacity: text1Opacity, y: text1Y }}
                >
                  <div className="inline-flex items-center gap-2 text-accent-300">
                    <span className="font-mono text-xs font-bold tracking-widest uppercase">
                      {showcaseStages[0].label}
                    </span>
                  </div>

                  <h2 className="mt-3 font-display text-4xl xl:text-5xl font-bold tracking-tight text-white leading-[1.08]">
                    {showcaseStages[0].headline}
                  </h2>

                  <p className="mt-4 text-base xl:text-lg text-navy-200 leading-relaxed font-normal">
                    {showcaseStages[0].description}
                  </p>

                  <div className="mt-6 border-t border-white/10 pt-5">
                    <ul className="grid gap-2.5">
                      {showcaseStages[0].highlights.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-navy-100">
                          <Check className="size-4 shrink-0 text-accent-400" strokeWidth={2.5} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 flex items-center gap-4">
                    <Button asChild variant="accent" size="lg" className="group shadow-sm">
                      <Link href={showcaseStages[0].href}>
                        Explore fragile packing
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>

                {/* ----------------- Stage 02 Typography ----------------- */}
                <motion.div
                  className="absolute inset-0 flex flex-col justify-center pointer-events-auto"
                  style={{ opacity: text2Opacity, y: text2Y }}
                >
                  <div className="inline-flex items-center gap-2 text-accent-300">
                    <span className="font-mono text-xs font-bold tracking-widest uppercase">
                      {showcaseStages[1].label}
                    </span>
                  </div>

                  <h2 className="mt-3 font-display text-4xl xl:text-5xl font-bold tracking-tight text-white leading-[1.08]">
                    {showcaseStages[1].headline}
                  </h2>

                  <p className="mt-4 text-base xl:text-lg text-navy-200 leading-relaxed font-normal">
                    {showcaseStages[1].description}
                  </p>

                  <div className="mt-6 border-t border-white/10 pt-5">
                    <ul className="grid gap-2.5">
                      {showcaseStages[1].highlights.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-navy-100">
                          <Check className="size-4 shrink-0 text-accent-400" strokeWidth={2.5} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 flex items-center gap-4">
                    <Button asChild variant="accent" size="lg" className="group shadow-sm">
                      <Link href={showcaseStages[1].href}>
                        Explore fleet &amp; transit
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>

                {/* ----------------- Stage 03 Typography ----------------- */}
                <motion.div
                  className="absolute inset-0 flex flex-col justify-center pointer-events-auto"
                  style={{ opacity: text3Opacity, y: text3Y }}
                >
                  <div className="inline-flex items-center gap-2 text-accent-300">
                    <span className="font-mono text-xs font-bold tracking-widest uppercase">
                      {showcaseStages[2].label}
                    </span>
                  </div>

                  <h2 className="mt-3 font-display text-4xl xl:text-5xl font-bold tracking-tight text-white leading-[1.08]">
                    {showcaseStages[2].headline}
                  </h2>

                  <p className="mt-4 text-base xl:text-lg text-navy-200 leading-relaxed font-normal">
                    {showcaseStages[2].description}
                  </p>

                  <div className="mt-6 border-t border-white/10 pt-5">
                    <ul className="grid gap-2.5">
                      {showcaseStages[2].highlights.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-navy-100">
                          <Check className="size-4 shrink-0 text-accent-400" strokeWidth={2.5} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 flex items-center gap-4">
                    <Button asChild variant="accent" size="lg" className="group shadow-sm">
                      <Link href={showcaseStages[2].href}>
                        Explore furniture assembly
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: High-Resolution Photographic Canvas (7 Cols) */}
              <div className="col-span-7">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl">
                  {/* Photo 1: Fragile Packing */}
                  <motion.div
                    className="absolute inset-0 size-full"
                    style={{ opacity: photo1Opacity, scale: photo1Scale }}
                  >
                    <Image
                      src={showcaseStages[0].image}
                      alt={showcaseStages[0].alt}
                      fill
                      sizes="(min-width: 1280px) 760px, 60vw"
                      className="size-full object-cover object-center"
                      priority
                    />
                  </motion.div>

                  {/* Photo 2: Fleet Loading */}
                  <motion.div
                    className="absolute inset-0 size-full"
                    style={{ opacity: photo2Opacity, scale: photo2Scale }}
                  >
                    <Image
                      src={showcaseStages[1].image}
                      alt={showcaseStages[1].alt}
                      fill
                      sizes="(min-width: 1280px) 760px, 60vw"
                      className="size-full object-cover object-center"
                    />
                  </motion.div>

                  {/* Photo 3: Furniture Assembly */}
                  <motion.div
                    className="absolute inset-0 size-full"
                    style={{ opacity: photo3Opacity, scale: photo3Scale }}
                  >
                    <Image
                      src={showcaseStages[2].image}
                      alt={showcaseStages[2].alt}
                      fill
                      sizes="(min-width: 1280px) 760px, 60vw"
                      className="size-full object-cover object-center"
                    />
                  </motion.div>

                  {/* Top-Right Lightbox Inspection Button */}
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(activeStage)}
                    aria-label="View photograph in full resolution"
                    className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full border border-white/20 bg-navy-950/70 text-white backdrop-blur-md transition-colors hover:bg-navy-950 hover:text-accent-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-500"
                  >
                    <Maximize2 className="size-4" aria-hidden="true" />
                  </button>

                  {/* Bottom Micro Equipment Pill */}
                  <div className="absolute inset-x-4 bottom-4 z-20 flex items-center justify-between rounded-xl border border-white/15 bg-navy-950/80 px-4 py-2.5 text-xs text-white backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-accent-300">Procedure:</span>
                      <span className="text-navy-100">{showcaseStages[activeStage].equipment}</span>
                    </div>
                    <span className="font-mono text-[11px] text-white/50">
                      Standard Procedure · Liveried Crew
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer Indicator */}
            <footer className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/60">
              <span className="font-mono">
                Scroll to explore the moving sequence
              </span>
              <span className="font-mono">
                Prime House Removals · Certified Operations
              </span>
            </footer>
          </Container>
        </div>
      </section>

      {/* =========================================================================
          2. MOBILE & TABLET VERTICALLY FLOWING EXPERIENCE (<lg:block, hidden on desktop)
          Touch-friendly, continuous progressive reveals without scroll trapping.
         ========================================================================= */}
      <section
        className="block lg:hidden bg-navy-950 py-16 text-white"
        aria-label="Prime House Removals Operational Standards"
      >
        <Container>
          {/* Section Header */}
          <div className="border-b border-white/10 pb-6">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-300">
              Operational Standards
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white leading-tight">
              Moving day precision, captured on site.
            </h2>
            <p className="mt-3 text-sm text-navy-200 leading-relaxed">
              From packing to transit and complete reassembly, see our real crew and liveried fleet in action.
            </p>
          </div>

          {/* Sequential Mobile Stages with Natural Scroll Flow */}
          <div className="mt-10 flex flex-col gap-12 sm:gap-16">
            {showcaseStages.map((stage, idx) => {
              return (
                <article
                  key={stage.id}
                  className="flex flex-col gap-5 border-b border-white/10 pb-12 last:border-b-0 last:pb-0"
                >
                  {/* Stage Identifier & Headline */}
                  <div>
                    <span className="font-mono text-xs font-bold tracking-widest text-accent-300">
                      {stage.label}
                    </span>
                    <h3 className="mt-1.5 font-display text-2xl font-bold text-white tracking-tight leading-snug">
                      {stage.headline}
                    </h3>
                    <p className="mt-2.5 text-sm text-navy-200 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  {/* Full 16:9 Bright Natural Photograph */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/15 bg-black shadow-card">
                    <Image
                      src={stage.image}
                      alt={stage.alt}
                      fill
                      sizes="(min-width: 640px) 600px, 100vw"
                      className="size-full object-cover object-center"
                    />

                    {/* Lightbox button on mobile */}
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      aria-label={`View full resolution image for ${stage.stageName}`}
                      className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full border border-white/20 bg-navy-950/70 text-white backdrop-blur-md"
                    >
                      <Maximize2 className="size-3.5" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Highlights Checklist */}
                  <ul className="grid gap-2 pt-1">
                    {stage.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs text-navy-100">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-accent-400" strokeWidth={2.5} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Link */}
                  <div className="pt-2">
                    <Button asChild variant="accent" size="md" className="w-full sm:w-auto">
                      <Link href={stage.href}>
                        Explore service details
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          3. FULLSCREEN HIGH-RESOLUTION LIGHTBOX MODAL
         ========================================================================= */}
      <Dialog
        open={lightboxIndex !== null}
        onOpenChange={(open) => !open && setLightboxIndex(null)}
      >
        <DialogContent
          hideClose
          className="max-w-5xl overflow-hidden border-none bg-navy-950/95 p-0 text-white backdrop-blur-xl sm:rounded-2xl"
        >
          {lightboxIndex !== null && (
            <>
              <DialogTitle className="sr-only">
                {showcaseStages[lightboxIndex].stageName} — High Resolution
              </DialogTitle>

              <div className="relative flex flex-col">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-accent-300">
                      {showcaseStages[lightboxIndex].step}
                    </span>
                    <span className="text-white/40">·</span>
                    <span className="text-sm font-semibold text-white">
                      {showcaseStages[lightboxIndex].stageName}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setLightboxIndex(null)}
                    aria-label="Close dialog"
                    className="flex size-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-500"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </div>

                {/* Natural Image Canvas */}
                <div className="relative aspect-[16/9] w-full bg-black">
                  <Image
                    src={showcaseStages[lightboxIndex].image}
                    alt={showcaseStages[lightboxIndex].alt}
                    fill
                    sizes="100vw"
                    className="size-full object-contain object-center"
                    priority
                  />
                </div>

                {/* Modal Footer */}
                <div className="flex flex-col gap-2 border-t border-white/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {showcaseStages[lightboxIndex].headline}
                    </p>
                    <p className="text-xs text-white/70">
                      {showcaseStages[lightboxIndex].equipment}
                    </p>
                  </div>

                  <Button asChild variant="accent" size="sm" className="self-start sm:self-auto">
                    <Link href={showcaseStages[lightboxIndex].href}>
                      Explore full service
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
