"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { Stagger, StaggerItem } from "@/components/shared/reveal";
import type { ProcessStep } from "@/content/process";

/**
 * The step grid and its scroll-linked connector.
 *
 * The connector is the one approved scroll-scrubbed element on the page
 * (docs/motion-system.md): a decorative hairline that fills left-to-right as
 * the steps move through the viewport. It exists only on `lg`, where the four
 * steps sit on one row and the rule actually connects them; below that it is
 * not rendered visually at all.
 *
 * Reduced motion is handled in CSS, not in the render path: the scroll-driven
 * layer is `motion-reduce:hidden`, leaving the static hairline drawn in full.
 * That keeps the server and client markup identical (no hydration mismatch).
 */
export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative mt-12 lg:mt-16">
      {/* Connector hairline behind the step numbers on wide screens. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-5 hidden h-px lg:block"
      >
        <div className="absolute inset-0 bg-line-strong/40" />
        <motion.div
          className="absolute inset-0 origin-left bg-navy-800/60 motion-reduce:hidden"
          style={{ scaleX: lineScale }}
        />
      </div>

      <Stagger stagger={0.06}>
        <ol className="relative grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <StaggerItem
              key={step.step}
              as="li"
              className="relative flex h-full flex-col gap-4"
            >
              <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-lg bg-navy-900 font-display text-sm font-semibold tracking-wide text-white shadow-xs">
                {step.step}
              </span>
              <h3 className="text-lg font-semibold text-ink sm:text-xl">
                {step.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-ink-soft">
                {step.description}
              </p>
            </StaggerItem>
          ))}
        </ol>
      </Stagger>
    </div>
  );
}
