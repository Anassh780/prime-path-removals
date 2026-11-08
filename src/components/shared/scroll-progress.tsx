"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Hairline reading-progress indicator pinned to the very top of the viewport.
 *
 * Mounted once in app/layout.tsx — deliberately outside app/template.tsx, so
 * it is never inside a transformed ancestor (a transform would turn `fixed`
 * into `absolute` and detach the bar from the viewport).
 *
 * Decorative: the scroll position is already exposed by the scrollbar, so this
 * is hidden from assistive technology — and hidden entirely under
 * prefers-reduced-motion, because MotionConfig does not govern MotionValue
 * styles (a spring-driven bar is exactly the continuous motion that setting
 * asks us to stop).
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-royal-600 motion-reduce:hidden"
    />
  );
}
