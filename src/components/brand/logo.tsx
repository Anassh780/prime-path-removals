import { cn } from "@/lib/utils";

/**
 * Prime House Removals — Bespoke Vector Brand Mark:
 * An engineered vector SVG emblem translating the brand identity:
 * - Architectural white roofline and chimney (home & safety)
 * - Modern removals truck cab (specialist transport capability)
 * - Dual azure LED headlights & sleek windshield reflection
 * - Dynamic emerald-green aerodynamic swooshes (forward movement & speed)
 * - Rendered 100% in pure vector SVG code: mathematically sharp at 16px, 32px, 48px,
 *   or 4K displays — never dull, pixelated, or compressed.
 */
export function LogoMark({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "inverse";
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-10 shrink-0", className)}
      role="img"
      aria-label="Prime House Removals emblem"
    >
      <defs>
        <linearGradient
          id={tone === "inverse" ? "phr-bg-inv" : "phr-bg"}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#0b2447" />
          <stop offset="100%" stopColor="#04101f" />
        </linearGradient>
        <linearGradient id="phr-green" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#11543b" />
        </linearGradient>
        <linearGradient id="phr-blue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#1173d4" />
        </linearGradient>
      </defs>

      {/* Outer rounded badge */}
      <rect
        width="48"
        height="48"
        rx="12"
        fill={`url(#${tone === "inverse" ? "phr-bg-inv" : "phr-bg"})`}
      />
      <rect
        x="0.75"
        y="0.75"
        width="46.5"
        height="46.5"
        rx="11.25"
        stroke={tone === "inverse" ? "#7fb99b" : "#2b95f5"}
        strokeOpacity={tone === "inverse" ? "0.45" : "0.35"}
        strokeWidth="1.5"
      />

      {/* House roofline in background */}
      <path
        d="M10 21L24 9.5L38 21"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Chimney */}
      <path
        d="M31 11.5V7H34.5V14.5"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Attic window accent */}
      <rect
        x="22"
        y="12.5"
        width="4"
        height="3"
        rx="0.75"
        fill="#facc15"
        fillOpacity="0.9"
      />

      {/* Removals Truck cab */}
      <path
        d="M16 20C16 18.3 17.3 17 19 17H29C30.7 17 32 18.3 32 20V32H16V20Z"
        fill="#0d2547"
        stroke="#ffffff"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* Windshield */}
      <path
        d="M18 19C18 18.4 18.4 18 19 18H29C29.6 18 30 18.4 30 19V24H18V19Z"
        fill="url(#phr-blue)"
      />
      {/* Windshield sheen */}
      <path
        d="M20 18.5L18.5 23.5H20.5L22 18.5H20Z"
        fill="#ffffff"
        fillOpacity="0.45"
      />

      {/* Grille */}
      <rect
        x="20"
        y="26"
        width="8"
        height="4"
        rx="1"
        fill="#071a33"
        stroke="#2b95f5"
        strokeWidth="0.8"
      />
      <line
        x1="21.5"
        y1="27.3"
        x2="26.5"
        y2="27.3"
        stroke="#2b95f5"
        strokeWidth="0.6"
        strokeOpacity="0.8"
      />
      <line
        x1="21.5"
        y1="28.7"
        x2="26.5"
        y2="28.7"
        stroke="#2b95f5"
        strokeWidth="0.6"
        strokeOpacity="0.8"
      />

      {/* Headlights */}
      <circle cx="17.5" cy="27.5" r="1.5" fill="#38bdf8" />
      <circle cx="30.5" cy="27.5" r="1.5" fill="#38bdf8" />

      {/* Side mirrors */}
      <rect x="13.8" y="20.5" width="1.6" height="3.5" rx="0.8" fill="#ffffff" />
      <rect x="32.6" y="20.5" width="1.6" height="3.5" rx="0.8" fill="#ffffff" />

      {/* Wheels/bumper */}
      <rect
        x="16.5"
        y="32"
        width="4"
        height="2"
        rx="1"
        fill="#04101f"
        stroke="#ffffff"
        strokeWidth="0.8"
      />
      <rect
        x="27.5"
        y="32"
        width="4"
        height="2"
        rx="1"
        fill="#04101f"
        stroke="#ffffff"
        strokeWidth="0.8"
      />

      {/* Dynamic green aerodynamic swooshes */}
      <path
        d="M4 38C12 36 21 34.2 28 31.8C35 29.5 40 27.8 44 26C39.5 29.5 32.5 33 24 35.5C16.5 37.8 9.5 39.5 4 38Z"
        fill="url(#phr-green)"
      />
      <path
        d="M8 41.5C15 40.5 23 39 30 37C37 35 41 33.5 44 32C40 34 33 36.5 26 38.5C18 40.5 12 41.7 8 41.5Z"
        fill="#10b981"
        fillOpacity="0.85"
      />
    </svg>
  );
}

export function Logo({
  className,
  tone = "default",
  compact = false,
}: {
  className?: string;
  tone?: "default" | "inverse";
  compact?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark
        tone={tone}
        className={compact ? "size-9 rounded-lg" : "size-10 rounded-xl"}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-bold tracking-[-0.02em]",
            compact ? "text-[15.5px]" : "text-[18px]",
            tone === "inverse" ? "text-white" : "text-navy-950",
          )}
        >
          Prime House
        </span>
        <span
          className={cn(
            "mt-1 font-sans text-[8.5px] font-bold uppercase tracking-[0.24em] flex items-center gap-1",
            tone === "inverse" ? "text-accent-300" : "text-accent-600",
          )}
        >
          <span>Removals</span>
          <span
            aria-hidden="true"
            className={cn(
              "text-[7px] font-black tracking-normal transition-transform duration-150 group-hover:translate-x-0.5",
              tone === "inverse" ? "text-royal-300" : "text-royal-600",
            )}
          >
            &raquo;
          </span>
        </span>
      </span>
    </span>
  );
}
