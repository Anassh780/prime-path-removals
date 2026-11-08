"use client";

import * as React from "react";
import Link from "next/link";
import {
  Armchair,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Home,
  Maximize,
  Minimize,
  Pause,
  PhoneCall,
  Play,
  Volume2,
  VolumeX,
  Warehouse,
} from "lucide-react";

import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { Container, Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { hasPhone, hasWhatsApp, siteConfig } from "@/config/site";
import { formatPhoneHref, formatWhatsAppHref } from "@/lib/utils";

const highlights = [
  {
    icon: Home,
    title: "Professional House Removals",
    href: "/services/house-removals",
    description:
      "Full-service packing, protected transit, and room-by-room placement by our trained and vetted moving crews.",
    features: [
      "Protective floor & banister coverings",
      "Itemised inventory check on arrival",
      "Punctual scheduling with direct driver contact",
    ],
  },
  {
    icon: Armchair,
    title: "Safe Furniture Transportation",
    href: "/services/furniture-moving",
    description:
      "Specialist quilted protection, mattress covers, and expert dismantling and reassembly for all large items.",
    features: [
      "Quilted transit blankets & tie-down strapping",
      "Disassembly & reassembly included on request",
      "Tail-lift vehicles for heavy or fragile pieces",
    ],
  },
  {
    icon: Warehouse,
    title: "Secure Storage Solutions",
    href: "/services/warehouse-moving",
    description:
      "Clean, CCTV-monitored, flexible short- and long-term storage facilities to hold your belongings between dates.",
    features: [
      "Climate-controlled, dry storage units",
      "Flexible weekly or monthly rental terms",
      "Direct transit from property into your unit",
    ],
  },
];

export function HeroVideoSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [userPaused, setUserPaused] = React.useState(false);

  // Play / Pause toggle
  const togglePlay = React.useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setUserPaused(false);
        })
        .catch(() => {
          setHasError(true);
        });
    } else {
      video.pause();
      setIsPlaying(false);
      setUserPaused(true);
    }
  }, []);

  // Mute / Unmute toggle
  const toggleMute = React.useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  }, []);

  // Fullscreen toggle
  const toggleFullscreen = React.useCallback(async () => {
    const container = containerRef.current;
    if (!container) return;

    try {
      if (!document.fullscreenElement) {
        await container.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // Fullscreen not supported or blocked by browser policy
    }
  }, []);

  // Sync fullscreen change events
  React.useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, []);

  // Intersection Observer for autoplay & pause on scroll off-screen
  React.useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // In viewport: start playing if user has not explicitly paused
          if (!userPaused && video.paused) {
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {
                // Autoplay policy or error; keep paused with poster
                setIsPlaying(false);
              });
          }
        } else {
          // Off-screen: pause to conserve battery and CPU
          if (!video.paused) {
            video.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(container);

    // Pause playback when tab is backgrounded
    const onVisibilityChange = () => {
      if (document.hidden && !video.paused) {
        video.pause();
        setIsPlaying(false);
      } else if (!document.hidden && !userPaused && !prefersReducedMotion) {
        video
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [userPaused]);

  return (
    <Section
      id="video-experience"
      tone="default"
      className="relative overflow-hidden border-b border-line bg-gradient-to-b from-surface to-surface-subtle/40 py-14 sm:py-16 md:py-20 lg:py-24"
    >
      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-royal-600/15 bg-royal-50/70 px-3.5 py-1 text-xs font-semibold text-royal-700 shadow-2xs">
              <span className="size-2 rounded-full bg-accent-600 animate-pulse" />
              <span>Real Moving Day Experience</span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.02em] text-navy-950 sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
              Moving Home? Let&apos;s Make It Simple.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft sm:text-lg">
              From carefully packing your belongings to transporting furniture
              and providing secure storage, we make every move straightforward,
              reliable and stress-free.
            </p>
          </Reveal>
        </div>

        {/* Cinematic Video Showcase Container */}
        <Reveal delay={0.14} className="mt-10 sm:mt-12 lg:mt-14">
          <div
            ref={containerRef}
            className="group relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-navy-950/15 bg-navy-950 shadow-2xl shadow-navy-950/20 sm:rounded-3xl"
          >
            {/* 16:9 Aspect Ratio Frame */}
            <div className="relative aspect-video w-full max-h-[580px] overflow-hidden bg-navy-950">
              <video
                ref={videoRef}
                src="/videos/movers-loading-van.mp4"
                poster="/videos/movers-loading-van-poster.webp"
                playsInline
                muted={isMuted}
                loop
                preload="metadata"
                aria-label="Prime House Removals professional team loading removal van"
                className="size-full object-cover object-center"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={() => setHasError(true)}
              />

              {/* Graceful Fallback if Video Error */}
              {hasError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy-950/90 p-6 text-center text-white">
                  <p className="font-display text-lg font-semibold">
                    Professional Removals in Action
                  </p>
                  <p className="mt-2 max-w-md text-sm text-white/70">
                    Our removals team is equipped with modern vehicles,
                    protective blankets and specialist loading equipment.
                  </p>
                </div>
              )}

              {/* Cinematic Vignette Overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-navy-950/20 transition-opacity duration-300 group-hover:opacity-80"
              />

              {/* Status Badge: Top Left */}
              <div className="absolute left-3 top-3 z-10 sm:left-5 sm:top-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-navy-950/80 px-3 py-1.5 text-[11px] font-medium text-white shadow-sm backdrop-blur-md sm:text-xs">
                  <span className="size-2 rounded-full bg-accent-300 animate-pulse" />
                  <span>On-Site Crew &amp; Loading Operations</span>
                </div>
              </div>

              {/* Center Play Button Overlay (when paused or stopped) */}
              {!isPlaying && !hasError && (
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label="Play video demonstration"
                  className="absolute inset-0 z-10 flex size-full items-center justify-center bg-navy-950/25 transition-colors hover:bg-navy-950/35 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-300"
                >
                  <span className="flex size-14 items-center justify-center rounded-full border-2 border-white/40 bg-navy-950/85 text-white shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-110 hover:border-white sm:size-18">
                    <Play className="ml-1 size-6 fill-white text-white sm:size-7" />
                  </span>
                </button>
              )}

              {/* Interactive Player Controls: Bottom Bar */}
              <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between p-3 sm:p-5">
                {/* Left: Play/Pause */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                    className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-navy-950/80 text-white shadow-md backdrop-blur-md transition-transform duration-150 hover:scale-105 hover:bg-navy-900 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 sm:size-10"
                  >
                    {isPlaying ? (
                      <Pause className="size-4" />
                    ) : (
                      <Play className="ml-0.5 size-4 fill-white" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                    className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-navy-950/80 text-white shadow-md backdrop-blur-md transition-transform duration-150 hover:scale-105 hover:bg-navy-900 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 sm:size-10"
                  >
                    {isMuted ? (
                      <VolumeX className="size-4" />
                    ) : (
                      <Volume2 className="size-4" />
                    )}
                  </button>
                </div>

                {/* Right: Caption + Fullscreen */}
                <div className="flex items-center gap-3">
                  <span className="hidden text-xs font-medium text-white/75 drop-shadow-sm sm:inline-block">
                    Prime House Removals Fleet in Action
                  </span>

                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    aria-label={
                      isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                    }
                    className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-navy-950/80 text-white shadow-md backdrop-blur-md transition-transform duration-150 hover:scale-105 hover:bg-navy-900 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 sm:size-10"
                  >
                    {isFullscreen ? (
                      <Minimize className="size-4" />
                    ) : (
                      <Maximize className="size-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Three Concise Service Highlights */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <Stagger stagger={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <div className="flex h-full flex-col rounded-xl border border-line bg-white p-6 shadow-xs transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-line-strong hover:shadow-card">
                    <div className="flex items-center gap-3.5">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-navy-950/10 bg-navy-950 text-white shadow-2xs">
                        <Icon className="size-5 text-accent-300" aria-hidden="true" />
                      </div>
                      <h3 className="font-display text-lg font-semibold tracking-tight text-navy-950">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
                      {item.description}
                    </p>

                    <ul className="mt-5 space-y-2 border-t border-line/60 pt-4 text-xs text-ink-muted">
                      {item.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle2
                            className="size-3.5 shrink-0 text-accent-600"
                            aria-hidden="true"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 pt-2">
                      <Link
                        href={item.href}
                        className="inline-flex items-center text-xs font-semibold text-royal-600 hover:text-royal-700 transition-colors py-1"
                      >
                        Explore service details
                        <ArrowRight className="ml-1 size-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        {/* High-Conversion Primary CTA Block */}
        <Reveal delay={0.2} className="mt-12 sm:mt-14">
          <div className="rounded-2xl border border-navy-950/10 bg-navy-950 p-6 text-white shadow-xl sm:p-8 lg:p-10">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-accent-300">
                  Ready To Plan Your Move?
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Get a clear, guaranteed fixed quote.
                </h3>
                <p className="mt-2 text-sm text-white/75 sm:text-base">
                  No hidden call-out fees or unexpected surcharges. Every quote
                  is confirmed in writing with crew, vehicle size, and schedule.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                <Button
                  asChild
                  variant="accent"
                  size="lg"
                  className="h-12 w-full px-8 text-base font-semibold shadow-md sm:w-auto"
                >
                  <Link href="/quote">
                    Get Your Free Quote
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="h-12 w-full px-6 text-base sm:w-auto"
                >
                  <Link href="/calculator">
                    <Calculator className="mr-2 size-4" />
                    Move Calculator
                  </Link>
                </Button>
              </div>
            </div>

            {/* Direct Contact Channels Support Row */}
            {(hasPhone || hasWhatsApp) && (
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-xs text-white/70">
                <span className="font-medium text-white/90">
                  Direct booking lines:
                </span>
                {hasPhone && (
                  <a
                    href={formatPhoneHref(siteConfig.contact.phone)}
                    className="inline-flex items-center gap-1.5 text-white/80 transition-colors hover:text-white"
                  >
                    <PhoneCall className="size-3.5 text-royal-300" />
                    <span>Call {siteConfig.contact.phone}</span>
                  </a>
                )}
                {hasWhatsApp && (
                  <a
                    href={formatWhatsAppHref(
                      siteConfig.contact.whatsapp,
                      "Hello Prime House Removals, I would like to enquire about moving services.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-white/80 transition-colors hover:text-white"
                  >
                    <WhatsAppIcon className="size-3.5 text-accent-300" />
                    <span>Chat on WhatsApp</span>
                  </a>
                )}
                <span className="text-white/40">•</span>
                <span>Written quotes provided within 24 hours</span>
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
