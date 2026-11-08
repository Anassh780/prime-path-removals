"use client";

import * as React from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Motion primitives for scroll-triggered entrances.
 *
 * The element tree is identical on the server and the client — reduced-motion
 * handling lives in <MotionConfig> (see app/providers.tsx), so none of these
 * components branch their markup on the user's preference and none of them can
 * cause a hydration mismatch.
 *
 * Motion language (see docs/motion-system.md):
 *   distance 12–20px · duration 0.5–0.6s · ease cubic-bezier(0.22, 1, 0.36, 1)
 *   stagger 0.05–0.08s · one reveal per element, once per page visit
 */

const EASE = [0.22, 1, 0.36, 1] as const;

export type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds. */
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  /** Horizontal travel in px. */
  x?: number;
  /** Starting scale, e.g. 0.97 for a soft settle. */
  scale?: number;
  /** Animate a 6px blur away. Use for hero-scale headings only. */
  blur?: boolean;
  /** Seconds. */
  duration?: number;
  /** Reveal once (default) or every time it enters the viewport. */
  once?: boolean;
  /** Fraction of the element that must be visible. */
  amount?: number;
  /** Play on mount instead of on scroll — for above-the-fold content. */
  immediate?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  x = 0,
  scale,
  blur = false,
  duration = 0.55,
  once = true,
  amount = 0.2,
  immediate = false,
}: RevealProps) {
  const hidden = {
    opacity: 0,
    ...(y !== 0 ? { y } : {}),
    ...(x !== 0 ? { x } : {}),
    ...(scale !== undefined ? { scale } : {}),
    ...(blur ? { filter: "blur(6px)" } : {}),
  };

  const shown = {
    opacity: 1,
    y: 0,
    x: 0,
    ...(scale !== undefined ? { scale: 1 } : {}),
    ...(blur ? { filter: "blur(0px)" } : {}),
  };

  return (
    <motion.div
      data-reveal=""
      className={cn(className)}
      initial={hidden}
      {...(immediate
        ? { animate: shown }
        : { whileInView: shown, viewport: { once, amount, margin: "-60px" } })}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------
   Variant-based stagger
   Use these when a group's children mount together (grids, lists, steps).
   The parent owns the timing, so no child needs to know its own index.
   ------------------------------------------------------------------------- */

export function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.06,
  once = true,
  amount = 0.15,
  immediate = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  amount?: number;
  immediate?: boolean;
}) {
  return (
    <motion.div
      data-reveal=""
      className={cn(className)}
      initial="hidden"
      variants={{
        hidden: {},
        shown: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      {...(immediate
        ? { animate: "shown" }
        : {
            whileInView: "shown",
            viewport: { once, amount, margin: "-60px" },
          })}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 16,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li";
}) {
  const Component = as === "li" ? motion.li : motion.div;

  return (
    <Component
      data-reveal-item=""
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y },
        shown: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: EASE },
        },
      }}
    >
      {children}
    </Component>
  );
}

/* -------------------------------------------------------------------------
   Word reveal for display headings
   Each word sits in an overflow-hidden span and rises into place. Keeps the
   real text in the DOM (selectable, searchable, screen-reader friendly).
   ------------------------------------------------------------------------- */

export function RevealText({
  text,
  className,
  wordClassName,
  delay = 0,
  step = 0.045,
  duration = 0.6,
  immediate = true,
  once = true,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  step?: number;
  duration?: number;
  immediate?: boolean;
  once?: boolean;
}) {
  const words = text.split(" ");

  return (
    <motion.span
      data-reveal-text=""
      className={cn("inline", className)}
      initial="hidden"
      {...(immediate
        ? { animate: "shown" }
        : { whileInView: "shown", viewport: { once, amount: 0.4 } })}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: step, delayChildren: delay } },
      }}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <motion.span
            data-reveal-word=""
            className={cn("inline-block", wordClassName)}
            variants={{
              hidden: { y: "105%", opacity: 0 },
              shown: {
                y: "0%",
                opacity: 1,
                transition: { duration, ease: EASE },
              },
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : null}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
