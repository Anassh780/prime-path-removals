import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
   Quiet supporting graphics. All decorative: hidden from assistive tech.

   Animation is opt-in (`animated`) and off by default, so the existing
   decorative usages keep rendering exactly as before. When enabled, each motif
   assembles in reading order with the house keyframes — opacity plus a short
   translate, 0.06–0.08 s apart, one pass only. Reduced motion is handled by
   `motion-reduce:animate-none`, which renders the finished graphic immediately.
   -------------------------------------------------------------------------- */

const RISE = "animate-fade-up motion-reduce:animate-none";
const FADE = "animate-fade-in motion-reduce:animate-none";

type MotifProps = {
  className?: string;
  /** Opt-in entrance. Defaults to off so existing usages are unchanged. */
  animated?: boolean;
};

type EntranceKind = "rise" | "fade";
type EntranceProps = { className?: string; style?: CSSProperties };

function entrance(
  animated: boolean,
  delay: string,
  kind: EntranceKind = "rise",
): EntranceProps {
  if (!animated) return {};

  return {
    className: kind === "rise" ? RISE : FADE,
    style: {
      animationDelay: delay,
      // Hide only during the delay, then hand the element back to its natural
      // styles — no residual transform or fill left on the finished graphic.
      animationFillMode: "backwards",
      ...(kind === "fade" ? { animationDuration: "0.55s" } : {}),
    },
  };
}

export function BoxStack({ className, animated = false }: MotifProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("h-auto w-full", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g
        stroke="#c7d7e9"
        strokeWidth="1.1"
        strokeLinejoin="round"
        {...entrance(animated, "0s")}
      >
        <polygon points="60,28 96,46 60,64 24,46" fill="#ffffff" />
        <polygon points="96,46 96,74 60,92 60,64" fill="#eef2f7" />
        <polygon points="24,46 60,64 60,92 24,74" fill="#dfe7f1" />
      </g>
      <g
        stroke="#c7d7e9"
        strokeWidth="1.1"
        strokeLinejoin="round"
        {...entrance(animated, "0.08s")}
      >
        <polygon points="46,20 74,34 46,48 18,34" fill="#ffffff" />
        <polygon points="74,34 74,54 46,68 46,48" fill="#eef2f7" />
        <polygon points="18,34 46,48 46,68 18,54" fill="#dfe7f1" />
      </g>
      <polygon
        points="46,20 74,34 46,48 18,34"
        fill="none"
        stroke="#ea7a2f"
        strokeWidth="1.4"
        opacity="0.55"
        {...entrance(animated, "0.16s", "fade")}
      />
    </svg>
  );
}

export function RouteLine({ className, animated = false }: MotifProps) {
  return (
    <svg
      viewBox="0 0 320 160"
      className={cn("h-auto w-full", className)}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M14 132c44 0 48-46 92-46s44 38 88 38 42-30 74-52"
        fill="none"
        stroke="#c7d7e9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 10"
        {...entrance(animated, "0s", "fade")}
      />
      <circle
        cx="14"
        cy="132"
        r="5"
        fill="#0d1a2b"
        {...entrance(animated, "0.24s", "fade")}
      />
      <circle
        cx="106"
        cy="86"
        r="4"
        fill="#93b4fd"
        {...entrance(animated, "0.3s", "fade")}
      />
      <circle
        cx="194"
        cy="124"
        r="4"
        fill="#93b4fd"
        {...entrance(animated, "0.36s", "fade")}
      />
      <g {...entrance(animated, "0.42s")}>
        <path
          d="M262 40c0-11 9-20 20-20s20 9 20 20c0 14-20 30-20 30s-20-16-20-30z"
          fill="#0d1a2b"
        />
        <circle cx="282" cy="40" r="7" fill="#ffffff" />
        <circle cx="282" cy="40" r="2.8" fill="#ea7a2f" />
      </g>
    </svg>
  );
}

export function FloorPlan({ className, animated = false }: MotifProps) {
  return (
    <svg
      viewBox="0 0 360 220"
      className={cn("h-auto w-full", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="#c7d7e9"
        strokeWidth="1.6"
        strokeLinejoin="round"
        {...entrance(animated, "0s", "fade")}
      >
        <rect x="12" y="12" width="336" height="196" rx="6" />
        <path d="M132 12v78M132 146v62M212 90h136M212 90V12" />
        <rect x="34" y="40" width="62" height="44" rx="3" />
        <rect x="34" y="128" width="62" height="52" rx="3" />
        <rect x="244" y="120" width="76" height="58" rx="3" />
      </g>
      <path
        d="M60 178c34-16 42-58 86-58s54 26 84-8 22-44 62-52"
        fill="none"
        stroke="#2559e0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 9"
        opacity="0.55"
        {...entrance(animated, "0.12s", "fade")}
      />
      <circle
        cx="60"
        cy="178"
        r="4.5"
        fill="#0d1a2b"
        {...entrance(animated, "0.3s", "fade")}
      />
      <circle
        cx="292"
        cy="60"
        r="5.5"
        fill="#ea7a2f"
        {...entrance(animated, "0.36s")}
      />
    </svg>
  );
}
