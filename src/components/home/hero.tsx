"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/shared/section";
import { Button } from "@/components/ui/button";

export function Hero() {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Play video on mount if not reduced motion
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!prefersReducedMotion) {
      video.play().catch(() => {
        // Autoplay policy or low power mode fallback
      });
    }
  }, []);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[620px] w-full items-center overflow-hidden bg-navy-950 text-white sm:min-h-[680px] lg:min-h-[740px]"
    >
      {/* 1. Full-Width Background Video (100vw Landscape Cinematic) */}
      <div className="absolute inset-0 size-full overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/movers-loading-van.mp4"
          poster="/videos/movers-loading-van-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="size-full object-cover object-center pointer-events-none"
        />

        {/* 2. Sophisticated Dark Navy Left-to-Right Overlay:
            Left: Strong contrast for maximum headline readability.
            Right: Reveals the actual removals van and movers footage. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/35 sm:via-navy-950/75 sm:to-navy-950/25"
        />

        {/* 3. Subtle Vertical Edge Vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-navy-950/40"
        />
      </div>

      {/* 4. Left-Aligned Cinematic Hero Content */}
      <Container className="relative z-10 w-full py-20 sm:py-24 lg:py-28">
        <div className="max-w-2xl text-left">
          {/* Small Introductory Label */}
          <Reveal immediate y={10} duration={0.4}>
            <div className="inline-flex items-center gap-2.5">
              <span className="h-0.5 w-6 rounded-full bg-accent-300" aria-hidden="true" />
              <span className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] text-accent-300">
                Professional House Removals &amp; Storage
              </span>
            </div>
          </Reveal>

          {/* Main Headline */}
          <Reveal immediate delay={0.08} y={12} duration={0.45}>
            <h1
              id="hero-heading"
              className="mt-5 font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-bold tracking-[-0.02em] leading-[1.08] text-white"
            >
              Moving Made Simple.
              <span className="block text-white/95 sm:mt-1.5">
                Removals You Can Rely On.
              </span>
            </h1>
          </Reveal>

          {/* Supporting Text */}
          <Reveal immediate delay={0.16} y={12} duration={0.45}>
            <p className="mt-6 max-w-xl text-[16px] sm:text-lg leading-relaxed text-navy-100/90 drop-shadow-xs">
              From careful packing to safe transportation and secure storage, we
              make every move straightforward and stress free.
            </p>
          </Reveal>

          {/* Conversion Calls to Action */}
          <Reveal immediate delay={0.24} y={12} duration={0.45}>
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <Button
                asChild
                variant="accent"
                size="lg"
                className="h-12 px-8 text-base font-semibold shadow-lg transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Link href="/quote">
                  Get a Free Quote
                  <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                </Link>
              </Button>

              <Button
                asChild
                variant="secondary"
                size="lg"
                className="h-12 border-white/30 bg-white/10 px-7 text-base text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/20 active:translate-y-px"
              >
                <Link href="/services">
                  Explore Our Services
                  <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
