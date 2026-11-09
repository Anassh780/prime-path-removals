"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Truck,
  Wrench,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Reveal } from "@/components/shared/reveal";
import { Container, Section, SectionHeading } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export const showcaseItems = [
  {
    id: "packing",
    step: "01",
    tabLabel: "Fragile Packing",
    eyebrow: "Stage 01 · Pre-Move Preparation",
    service: "Fragile Packing & Protection",
    title: "Room by room fragile protection.",
    tagline: "China, glassware, artwork and delicate furniture protected before transit.",
    narrative:
      "Trained packers wrap delicate china, crystal and porcelain in multi-layer bubble wrap, cushion with acid-free tissue paper, and pack into reinforced double-walled cartons with colour-coded room and inventory labelling.",
    deliverables: [
      "Double-walled reinforced removal cartons",
      "Quilted furniture blankets & bubble wrap",
      "Room-by-room colour-coded inventory labelling",
      "Custom padding for mirrors, artwork & glassware",
    ],
    image: "/images/service-packing.jpg",
    alt: "Prime House Removals team in liveried navy polo shirts packing fragile china and porcelain into branded cartons with bubble wrap",
    icon: Boxes,
    href: "/services/packing-and-loading",
    badge: "Specialist Packing",
    equipment: "Double-walled cartons · High-density bubble wrap",
  },
  {
    id: "loading",
    step: "02",
    tabLabel: "Fleet Loading",
    eyebrow: "Stage 02 · Fleet & Transit",
    service: "Fleet Loading & Transportation",
    title: "Hydraulic tail-lift van transport.",
    tagline: "Dedicated Luton vans with hydraulic tail-lifts and internal load securing.",
    narrative:
      "Heavy furniture and boxed inventory are loaded via heavy-duty hydraulic tail-lifts, avoiding manual strain and accidental drops. Items are systematically secured to internal steel ratchet rails using calibrated straps, with neoprene floor runners protecting your property entrance throughout.",
    deliverables: [
      "500kg hydraulic tail-lift Luton van fleet",
      "Calibrated internal ratchet tie-down straps",
      "Neoprene hallway and doorway protection",
      "Trained 2 to 3-person crew in liveried uniform",
    ],
    image: "/images/service-loading.jpg",
    alt: "Prime House Removals 3-person removals crew in liveried navy polo shirts loading boxes into a Luton van with hydraulic tail-lift",
    icon: Truck,
    href: "/services/house-removals",
    badge: "Hydraulic Tail-Lift",
    equipment: "Luton body · 500kg tail-lift · Ratchet rails",
  },
  {
    id: "assembly",
    step: "03",
    tabLabel: "Furniture Assembly",
    eyebrow: "Stage 03 · Set-Up & Placement",
    service: "Furniture Dismantling & Assembly",
    title: "Precision furniture reconstruction.",
    tagline: "Bed frames, wardrobes, and modular units dismantled calmly and rebuilt on-site.",
    narrative:
      "Awkward furniture is carefully dismantled prior to transit, with all screws, bolts and brackets bagged, tagged and taped to their pieces. At your new property, our technicians rebuild each item in your chosen room, level them accurately, and position them exactly according to your floor plan.",
    deliverables: [
      "Hardware bagged, tagged and secured to pieces",
      "Cordless power tools and precision assembly hand kits",
      "Protective felt floor pads applied upon request",
      "Final positioning check against your floor plan",
    ],
    image: "/images/service-assembly.jpg",
    alt: "Prime House Removals technicians in branded navy polo shirts assembling wooden bed frame and wardrobe with cordless power drill",
    icon: Wrench,
    href: "/services/furniture-moving",
    badge: "Assembly Included",
    equipment: "Cordless power tools · Hardware tagged · Levelling kit",
  },
];

export function MovingShowcase() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);

  // Touch swipe support for mobile
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

  const activeItem = showcaseItems[activeIndex];

  // Auto-advance showcase every 8 seconds when user is not hovering or in lightbox
  React.useEffect(() => {
    if (isHovered || isLightboxOpen) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % showcaseItems.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isHovered, isLightboxOpen]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % showcaseItems.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(y * 5), y: x * 5 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <Section id="moving-standards" tone="subtle" className="overflow-hidden">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Operational Standards"
              title="Moving day precision, captured on site."
              description="See how our trained crews prepare, load and rebuild your home. Every photograph shows our real team, liveried vans and protective equipment in action."
            />

            {/* Stage Counter & Controls for Desktop */}
            <div className="hidden items-center gap-3 lg:flex">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Stage {activeItem.step} / 03
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous operational stage"
                  className="flex size-9 items-center justify-center rounded-lg border border-line bg-surface text-ink transition-colors hover:border-line-strong hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-500"
                >
                  <ChevronLeft className="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next operational stage"
                  className="flex size-9 items-center justify-center rounded-lg border border-line bg-surface text-ink transition-colors hover:border-line-strong hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-500"
                >
                  <ChevronRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Mobile Horizontal Stage Selector Chips (< 1024px) */}
        <div className="mt-8 flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {showcaseItems.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-500 ${
                  isActive
                    ? "bg-navy-950 text-white shadow-xs"
                    : "border border-line bg-surface text-ink hover:bg-surface-muted"
                }`}
                aria-pressed={isActive}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    isActive ? "bg-accent-400" : "bg-neutral-400"
                  }`}
                />
                <span className="font-mono">{item.step}</span>
                <span>{item.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Main Editorial Showcase Stage */}
        <div className="mt-6 grid gap-8 lg:mt-12 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16">
          {/* Left Column: Narrative & Service Selector (5 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Desktop Vertical Service Selector */}
            <div className="hidden flex-col gap-2 lg:flex">
              {showcaseItems.map((item, idx) => {
                const ItemIcon = item.icon;
                const isActive = idx === activeIndex;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`group relative flex items-start gap-4 rounded-xl p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-500 ${
                      isActive
                        ? "border border-line-strong bg-surface shadow-card ring-1 ring-accent-600/20"
                        : "border border-transparent bg-transparent hover:border-line hover:bg-surface/60"
                    }`}
                    aria-pressed={isActive}
                  >
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                        isActive
                          ? "border-accent-600/30 bg-accent-50 text-accent-600"
                          : "border-line bg-surface text-ink-soft group-hover:text-ink"
                      }`}
                    >
                      <ItemIcon className="size-5" aria-hidden="true" />
                    </span>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-xs font-semibold ${
                            isActive ? "text-accent-600" : "text-ink-muted"
                          }`}
                        >
                          {item.step}
                        </span>
                        <span className="text-ink-muted">·</span>
                        <span
                          className={`text-sm font-semibold tracking-tight ${
                            isActive ? "text-ink" : "text-ink-soft"
                          }`}
                        >
                          {item.service}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-1 text-xs text-ink-muted">
                        {item.tagline}
                      </p>
                    </div>

                    {isActive && (
                      <span
                        className="absolute right-4 top-1/2 size-2 -translate-y-1/2 rounded-full bg-accent-600"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Editorial Story Box */}
            <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
              <div className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full bg-accent-600" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-600">
                  {activeItem.eyebrow}
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  {activeItem.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-[15px]">
                  {activeItem.narrative}
                </p>
              </div>

              {/* Verified Deliverables List */}
              <div className="mt-2 border-t border-line pt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Standards &amp; Equipment
                </p>
                <ul className="mt-3 grid gap-2.5">
                  {activeItem.deliverables.map((deliverable) => (
                    <li
                      key={deliverable}
                      className="flex items-start gap-2.5 text-xs text-ink-soft sm:text-[13.5px]"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-accent-600"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Conversion CTA Link */}
              <div className="mt-4 flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <Button asChild variant="accent" size="md" className="group shadow-xs">
                  <Link href={activeItem.href}>
                    Explore service details
                    <ArrowRight
                      className="u-arrow size-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>

                <span className="text-xs text-ink-muted">
                  Quoted in writing · Fixed price
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Resolution Photographic Hero Stage (7 cols) */}
          <div className="flex flex-col gap-4 lg:col-span-7">
            {/* Main Stage with 3D Parallax Tilt */}
            <div
              className="relative w-full"
              style={{ perspective: "1000px" }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="group relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-line bg-surface-subtle shadow-lift transition-transform duration-300 ease-out will-change-transform hover:border-line-strong"
                style={{
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Natural, Bright High-Resolution Photograph */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 size-full"
                  >
                    <Image
                      src={activeItem.image}
                      alt={activeItem.alt}
                      fill
                      sizes="(min-width: 1280px) 760px, (min-width: 1024px) 60vw, 100vw"
                      className="size-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Top Subtle Floating Badge */}
                <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-line/80 bg-white/90 px-3 py-1 text-xs font-semibold text-ink shadow-xs backdrop-blur-md">
                  <span className="size-1.5 rounded-full bg-accent-600" />
                  <span>{activeItem.badge}</span>
                </div>

                {/* Top Right Lightbox Expand Button */}
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  aria-label="View photograph in full resolution"
                  className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full border border-line/80 bg-white/90 text-ink shadow-xs backdrop-blur-md transition-colors hover:bg-white hover:text-royal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-500"
                >
                  <Maximize2 className="size-4" aria-hidden="true" />
                </button>

                {/* Bottom Clean Equipment Caption Pill */}
                <div className="absolute inset-x-4 bottom-4 z-10 flex items-center justify-between rounded-xl border border-white/60 bg-white/95 px-4 py-2.5 text-xs shadow-xs backdrop-blur-md">
                  <div className="flex items-center gap-2 text-ink">
                    <span className="font-semibold text-accent-600">Equipment:</span>
                    <span className="truncate text-ink-soft">{activeItem.equipment}</span>
                  </div>
                  <span className="hidden font-mono text-[11px] text-ink-muted sm:inline-block">
                    Prime House Removals
                  </span>
                </div>
              </div>
            </div>

            {/* 3-Thumbnail Gallery Bar in Clean Natural Colors */}
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
                        ? "border-accent-600 ring-2 ring-accent-600/40 shadow-card"
                        : "border-line opacity-80 hover:opacity-100 hover:border-line-strong hover:shadow-xs"
                    }`}
                    aria-pressed={isActive}
                    aria-label={`View stage ${item.step}: ${item.service}`}
                  >
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 250px, 33vw"
                      className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Active Border Overlay */}
                    <div
                      className={`absolute inset-0 transition-colors ${
                        isActive
                          ? "bg-accent-600/10 ring-1 ring-inset ring-accent-600"
                          : "bg-navy-950/5 group-hover:bg-transparent"
                      }`}
                    />

                    {/* Bottom Label Tag */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/70 to-transparent p-2 text-white">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] font-bold text-accent-300">
                          {item.step}
                        </span>
                        <span className="truncate text-[11px] font-medium">
                          {item.tabLabel}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Fullscreen High-Resolution Lightbox Modal */}
        <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
          <DialogContent
            hideClose
            className="max-w-5xl overflow-hidden border-none bg-navy-950/95 p-0 text-white backdrop-blur-xl sm:rounded-2xl"
          >
            <DialogTitle className="sr-only">
              {activeItem.service} — Operational Photograph
            </DialogTitle>

            <div className="relative flex flex-col">
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-accent-300">
                    Stage {activeItem.step}
                  </span>
                  <span className="text-white/40">·</span>
                  <span className="text-sm font-semibold text-white">
                    {activeItem.service}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous photograph"
                    className="flex size-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-500"
                  >
                    <ChevronLeft className="size-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next photograph"
                    className="flex size-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-500"
                  >
                    <ChevronRight className="size-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(false)}
                    aria-label="Close dialog"
                    className="flex size-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-500"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Natural High-Res Photograph in Full 16:9 Display */}
              <div className="relative aspect-[16/9] w-full bg-black">
                <Image
                  src={activeItem.image}
                  alt={activeItem.alt}
                  fill
                  sizes="100vw"
                  className="size-full object-contain object-center"
                  priority
                />
              </div>

              {/* Modal Bottom Bar */}
              <div className="flex flex-col gap-2 border-t border-white/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {activeItem.tagline}
                  </p>
                  <p className="text-xs text-white/70">
                    {activeItem.equipment}
                  </p>
                </div>

                <Button asChild variant="accent" size="sm" className="self-start sm:self-auto">
                  <Link href={activeItem.href}>
                    View full service specifications
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Container>
    </Section>
  );
}
