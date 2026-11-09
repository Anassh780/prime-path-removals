"use client";

import * as React from "react";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  MessageSquareQuote,
  Pause,
  Play,
  Star,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { Testimonial } from "@/content/testimonials";

export function FeedbackCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [isPaused, setIsPaused] = React.useState(false);
  const [activeShift, setActiveShift] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Duplicate items twice to ensure an unbroken, infinite loop
  const duplicatedItems = React.useMemo(
    () => [...testimonials, ...testimonials],
    [testimonials],
  );

  const handleNudge = (direction: "left" | "right") => {
    setIsPaused(true);
    setActiveShift((prev) => prev + (direction === "left" ? -440 : 440));
  };

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Top Controls & Status Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 px-1">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-ink shadow-xs">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-accent-600" />
          </span>
          <span>Verified Customer Reviews</span>
          <span className="text-ink-muted">·</span>
          <span className="font-semibold text-accent-700">5.0 Star Rating</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-line bg-white text-ink-soft transition-colors duration-150 hover:bg-surface-subtle hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 shadow-xs"
            aria-label={isPaused ? "Resume 3D animation" : "Pause 3D animation"}
            title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
          >
            {isPaused ? (
              <Play className="size-4 fill-current" aria-hidden="true" />
            ) : (
              <Pause className="size-4 fill-current" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={() => handleNudge("left")}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-line bg-white text-ink-soft transition-colors duration-150 hover:bg-surface-subtle hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 shadow-xs"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => handleNudge("right")}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-line bg-white text-ink-soft transition-colors duration-150 hover:bg-surface-subtle hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 shadow-xs"
            aria-label="Next reviews"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* 3D Perspective Stage Container */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden [perspective:1400px] [perspective-origin:center_center]"
      >
        {/* Left & Right Cinematic 3D Depth Vignettes */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-36 bg-gradient-to-r from-surface-subtle via-surface-subtle/80 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 sm:w-36 bg-gradient-to-l from-surface-subtle via-surface-subtle/80 to-transparent"
        />

        {/* Outer Shift Wrapper (allows manual Prev/Next nudging) */}
        <div
          className="transition-transform duration-500 ease-out"
          style={{
            transform: `translate3d(${activeShift}px, 0, 0)`,
          }}
        >
          {/* Continuous Left-to-Right 3D Moving Track */}
          <div
            className={cn(
              "flex w-max gap-6 py-6 animate-marquee-ltr hover:[animation-play-state:paused]",
              isPaused && "[animation-play-state:paused]",
            )}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {duplicatedItems.map((testimonial, idx) => (
              <figure
                key={`${testimonial.name}-${idx}`}
                className={cn(
                  "group relative flex w-[340px] sm:w-[420px] shrink-0 flex-col justify-between gap-5 rounded-2xl border border-line bg-white p-6 sm:p-7 shadow-card transition-all duration-300 ease-out",
                  "hover:-translate-y-2 hover:rotate-y-[-2deg] hover:scale-[1.02] hover:border-accent-600/40 hover:shadow-lift",
                )}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Header: 5 Stars + Verified Quote Icon */}
                <div className="flex items-center justify-between gap-4">
                  <div
                    className="flex items-center gap-1"
                    role="img"
                    aria-label={`Rated ${testimonial.rating} out of 5 stars`}
                  >
                    {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="size-4 fill-amber-400 text-amber-400 drop-shadow-xs"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <span className="flex size-8 items-center justify-center rounded-lg border border-line bg-surface-subtle text-accent-700 transition-colors duration-200 group-hover:border-accent-200 group-hover:bg-accent-50">
                    <MessageSquareQuote className="size-4" aria-hidden="true" />
                  </span>
                </div>

                {/* Body Quote */}
                <blockquote className="flex-1 text-[14.5px] sm:text-[15px] leading-relaxed text-ink-soft">
                  <p>{`\u201c${testimonial.quote}\u201d`}</p>
                </blockquote>

                {/* Footer: Customer Profile & Service Verification */}
                <figcaption className="flex items-center gap-3.5 border-t border-line pt-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-xs font-bold text-white shadow-xs">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-sm font-semibold text-ink">
                        {testimonial.name}
                      </p>
                      <BadgeCheck
                        className="size-4 shrink-0 text-accent-600"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="truncate text-xs text-ink-muted">
                      {testimonial.location} · {testimonial.service}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
