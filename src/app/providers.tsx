"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/**
 * Client providers.
 *
 * MotionConfig honours the OS "reduce motion" preference without changing the
 * rendered tree, which keeps server and client markup identical (no hydration
 * mismatch) while still disabling transform animations for those who ask.
 *
 * The default transition is the house curve and duration; individual motion
 * components override it when a different rhythm is needed.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionConfig>
  );
}
