"use client";

import * as React from "react";
import { animate, useMotionValue, useReducedMotion } from "motion/react";

/**
 * Smoothly interpolates a *real* number between values when it changes.
 *
 * Used by the quote estimator and move calculator, where the figure shown is
 * always the value the app has actually computed — the animation only smooths
 * the transition between two honest numbers. The server renders the final
 * value, so there is no hydration mismatch.
 */
export function AnimatedNumber({
  value,
  format,
  className,
  duration = 0.6,
}: {
  value: number;
  format?: (value: number) => string;
  className?: string;
  duration?: number;
}) {
  const reducedMotion = useReducedMotion();
  const motionValue = useMotionValue(value);
  const [display, setDisplay] = React.useState(value);

  React.useEffect(() => {
    return motionValue.on("change", (next) => setDisplay(next));
  }, [motionValue]);

  React.useEffect(() => {
    if (reducedMotion) {
      motionValue.set(value);
      return;
    }

    const controls = animate(motionValue, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => controls.stop();
  }, [motionValue, value, duration, reducedMotion]);

  return (
    <span className={className}>
      {format ? format(display) : Math.round(display).toLocaleString("en-GB")}
    </span>
  );
}
