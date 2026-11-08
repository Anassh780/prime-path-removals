"use client";

import * as React from "react";
import { motion } from "motion/react";

/**
 * Route-level entrance, mounted from app/template.tsx.
 *
 * A template gets a fresh key on every navigation, so this remounts and plays
 * once per route change. It only animates opacity and a 8px rise — no exit
 * animation, because App Router unmounts the old tree before the new one
 * mounts and a held exit would flash empty content.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      data-page-transition=""
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
