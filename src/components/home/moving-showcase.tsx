"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Reveal } from "@/components/shared/reveal";
import { Container, Section, SectionHeading } from "@/components/shared/section";
import { Button } from "@/components/ui/button";

export const showcaseItems = [
  {
    id: "packing",
    step: "01",
    service: "Fragile Packing & Protection",
    title: "Room by Room Delicate Packing",
    subtitle: "China, glassware, artwork and delicate furniture protected before transit.",
    description:
      "Trained packers wrap delicate china, crystal and porcelain in multi-layer bubble wrap, cushion with acid-free tissue paper, and pack into reinforced double-walled cartons with room-by-room colour-coded inventory labels.",
    image: "/images/service-packing.jpg",
    alt: "Prime House Removals team packing fragile china and porcelain with bubble wrap and tape in liveried navy polo shirts",
    icon: Boxes,
    href: "/services/packing-and-loading",
    specs: [
      "Quilted furniture blankets",
      "High-density bubble wrap",
      "Double-walled cartons",
      "Itemised room labelling",
    ],
  },
  {
    id: "loading",
    step: "02",
    service: "Fleet Loading & Transit",
    title: "Hydraulic Tail-Lift Van Loading",
    subtitle: "Dedicated Luton vans with hydraulic tail-lifts and load-securing systems.",
    description:
      "Every item is transferred via heavy-duty hydraulic tail-lift, protected by neoprene floor runners, and locked in position with calibrated ratchet straps so zero movement occurs across your entire UK transit.",
    image: "/images/service-loading.jpg",
    alt: "Prime House Removals 3-person removals crew loading Luton truck with hydraulic tail-lift in liveried navy polo shirts",
    icon: Truck,
    href: "/services/house-removals",
    specs: [
      "Hydraulic tail-lift",
      "Load-securing ratchet straps",
      "Heavy-duty floor runners",
      "2 to 3-person crew",
    ],
  },
  {
    id: "assembly",
    step: "03",
    service: "Furniture Dismantling & Assembly",
    title: "Precision Furniture Reconstruction",
    subtitle: "Bed frames, wardrobes, and modular units dismantled calmly and rebuilt on-site.",
    description:
      "Our technicians arrive equipped with cordless power tools and precision hardware organisers. Fixings are bagged, tagged and taped to their pieces, then reassembled and positioned strictly according to your floor plan.",
    image: "/images/service-assembly.jpg",
    alt: "Prime House Removals technicians assembling wooden bed frame and wardrobe with cordless power drill in branded navy polo shirts",
    icon: Wrench,
    href: "/services/furniture-moving",
    specs: [
      "Fixings bagged & tagged",
      "Cordless power tools on hand",
      "Positioned to your floorplan",
      "Felt floor pads applied",
    ],
  },
];

export function MovingShowcase() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  // Auto-advance showcase every 7 seconds when user is not hovering
  React.useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % showcaseItems.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const activeItem = showcaseItems[activeIndex];
  const Icon = activeItem.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(y * 7), y: x * 7 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % showcaseItems.length);
  };

  return (
    <Section id="moving-standards" tone="default" className="overflow-hidden">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Moving standards"
              title="Operational precision on every move."
              description="See our fully equipped removals crew in action. Every procedure is photographed and executed to our verified standard."
            />

            {/* Stage controls on desktop */}
            <div className="hidden items-center gap-2 md:flex">
              <span className="mr-3 font-mono text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Stage {activeItem.step} of 03
              </span>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous operational stage"
                className="flex size-10 items-center justify-center rounded-lg border border-line bg-surface text-ink transition-colors hover:border-accent-500 hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-500"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next operational stage"
                className="flex size-10 items-center justify-center rounded-lg border border-line bg-surface text-ink transition-colors hover:border-accent-500 hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-500"
              >
                <ChevronRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* 3D Interactive Tab Selector */}
        <Reveal delay={0.05} className="mt-8 lg:mt-10">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
            {showcaseItems.map((item, idx) => {
              const TabIcon = item.icon;
              const isActive = idx === activeIndex;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-500 sm:p-4 ${
                    isActive
                      ? "border-accent-500/80 bg-navy-950 text-white shadow-lift ring-1 ring-accent-500/40"
                      : "border-line bg-surface text-ink hover:border-line-strong hover:bg-surface-subtle"
                  }`}
                  aria-pressed={isActive}
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                      isActive
                        ? "border-white/20 bg-white/10 text-accent-300"
                        : "border-line bg-surface-subtle text-ink-soft group-hover:border-line-strong group-hover:text-ink"
                    }`}
                  >
                    <TabIcon className="size-4" aria-hidden="true" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-xs font-semibold tracking-wider ${
                          isActive ? "text-accent-300" : "text-ink-muted"
                        }`}
                      >
                        {item.step}
                      </span>
                      <span
                        className={`size-1 rounded-full ${
                          isActive ? "bg-accent-400" : "bg-neutral-300"
                        }`}
                      />
                      <span
                        className={`truncate text-xs font-semibold ${
                          isActive ? "text-white" : "text-ink"
                        }`}
                      >
                        {item.service}
                      </span>
                    </div>
                    <p
                      className={`truncate text-[13px] ${
                        isActive ? "text-navy-200" : "text-ink-muted"
                      }`}
                    >
                      {item.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* 3D Widescreen Landscape Stage Card */}
        <Reveal delay={0.08} className="mt-6 sm:mt-8">
          <div
            className="group relative w-full"
            style={{ perspective: "1200px" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-line bg-navy-950 shadow-card transition-transform duration-300 ease-out will-change-transform group-hover:border-accent-500/50 group-hover:shadow-lift"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Background Landscape Photograph with 3D Slide Transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 size-full"
                  style={{ transform: "translateZ(0px)" }}
                >
                  <Image
                    src={activeItem.image}
                    alt={activeItem.alt}
                    fill
                    sizes="(min-width: 1280px) 1216px, 100vw"
                    className="size-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Layer 1: Directional Cinematic Dark Gradient Scrim */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/20"
                style={{ transform: "translateZ(12px)" }}
              />
              <div
                className="absolute inset-0 bg-navy-950/15"
                style={{ transform: "translateZ(14px)" }}
              />

              {/* Layer 2: Top Floating Badge Bar */}
              <div
                className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-4 sm:p-6 md:p-8"
                style={{ transform: "translateZ(30px)" }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-navy-950/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md shadow-xs">
                  <span className="size-2 rounded-full bg-accent-400 shadow-[0_0_8px_rgba(31,111,77,0.8)]" />
                  <span className="font-mono text-white/70">STAGE {activeItem.step}</span>
                  <span className="text-white/30">·</span>
                  <span className="text-accent-300">{activeItem.service}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex size-9 items-center justify-center rounded-xl border border-white/20 bg-navy-950/75 text-white backdrop-blur-md transition-all duration-200 group-hover:border-accent-400/50 group-hover:bg-accent-600/40">
                    <Icon className="size-4 text-accent-300" aria-hidden="true" />
                  </span>
                </div>
              </div>

              {/* Layer 3: Bottom Layered SaaS Content Stack */}
              <div
                className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end p-5 sm:p-8 md:p-10"
                style={{ transform: "translateZ(45px)" }}
              >
                <div className="flex max-w-3xl flex-col gap-2.5 sm:gap-3">
                  <span className="inline-block font-mono text-[11px] font-semibold uppercase tracking-wider text-accent-300 sm:text-xs">
                    {activeItem.subtitle}
                  </span>

                  <h3 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl lg:text-4xl">
                    {activeItem.title}
                  </h3>

                  <p className="hidden max-w-2xl text-xs leading-relaxed text-navy-100/90 sm:block sm:text-sm md:text-[15px]">
                    {activeItem.description}
                  </p>

                  {/* Micro-Feature Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1 sm:gap-2">
                    {activeItem.specs.map((spec) => (
                      <span
                        key={spec}
                        className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-navy-950/75 px-2.5 py-1 text-[11px] font-medium text-white/95 backdrop-blur-md sm:text-xs"
                      >
                        <ShieldCheck className="size-3 text-accent-300" aria-hidden="true" />
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Action Link Row */}
                  <div className="mt-2 flex items-center justify-between border-t border-white/15 pt-3 sm:mt-3 sm:pt-4">
                    <Button asChild variant="accent" size="sm" className="group/btn shadow-lift">
                      <Link href={activeItem.href}>
                        Explore service details
                        <ArrowRight className="u-arrow size-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden="true" />
                      </Link>
                    </Button>

                    <span className="hidden font-mono text-[11px] text-white/60 sm:inline-block">
                      Standard procedure · Liveried crew
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 3D Landscape Preview Strips */}
        <Reveal delay={0.1} className="mt-4 sm:mt-6">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {showcaseItems.map((item, idx) => {
              const isActive = idx === activeIndex;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative aspect-[16/9] overflow-hidden rounded-xl border text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-500 ${
                    isActive
                      ? "border-accent-500 ring-2 ring-accent-500/50 shadow-lift scale-[1.01]"
                      : "border-line opacity-70 hover:opacity-100 hover:border-line-strong hover:scale-[1.01]"
                  }`}
                  aria-pressed={isActive}
                  aria-label={`Switch to stage ${item.step}: ${item.service}`}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 33vw"
                    className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 transition-opacity ${
                      isActive
                        ? "bg-gradient-to-t from-navy-950/85 via-navy-950/30 to-transparent"
                        : "bg-navy-950/50 group-hover:bg-navy-950/30"
                    }`}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] font-bold text-accent-300 sm:text-xs">
                        {item.step}
                      </span>
                      <span className="truncate text-[11px] font-semibold text-white sm:text-xs">
                        {item.service}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
