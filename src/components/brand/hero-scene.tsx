import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
   Isometric "moving day" illustration.
   Drawn to scale in brand colours so it stays crisp at every size and never
   depends on stock photography. Geometry is computed with a single projection
   helper, which keeps the boxes visually consistent.
   -------------------------------------------------------------------------- */

const CX = 300;
const CY = 280;
const KX = 0.866;
const KY = 0.5;

function pt(x: number, y: number, z: number) {
  const sx = CX + (x - y) * KX;
  const sy = CY + (x + y) * KY - z;
  return `${sx.toFixed(1)},${sy.toFixed(1)}`;
}

function face(points: Array<[number, number, number]>) {
  return points.map(([x, y, z]) => pt(x, y, z)).join(" ");
}

type BoxProps = {
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  h: number;
  top?: string;
  right?: string;
  left?: string;
  stroke?: string;
};

function IsoBox({
  x,
  y,
  z,
  w,
  d,
  h,
  top = "#ffffff",
  right = "#eef2f7",
  left = "#dfe7f1",
  stroke = "#c7d7e9",
}: BoxProps) {
  return (
    <g strokeLinejoin="round">
      {/* right face */}
      <polygon
        points={face([
          [x + w, y, z],
          [x + w, y + d, z],
          [x + w, y + d, z + h],
          [x + w, y, z + h],
        ])}
        fill={right}
        stroke={stroke}
        strokeWidth={1.1}
      />
      {/* left face */}
      <polygon
        points={face([
          [x, y + d, z],
          [x + w, y + d, z],
          [x + w, y + d, z + h],
          [x, y + d, z + h],
        ])}
        fill={left}
        stroke={stroke}
        strokeWidth={1.1}
      />
      {/* top face */}
      <polygon
        points={face([
          [x, y, z + h],
          [x + w, y, z + h],
          [x + w, y + d, z + h],
          [x, y + d, z + h],
        ])}
        fill={top}
        stroke={stroke}
        strokeWidth={1.1}
      />
    </g>
  );
}

/* --------------------------------------------------------------------------
   Scene assembly.

   The framed plate is the stage and stays put, then the drawing is built up
   in the order the day is packed: floor plate → boxes → tape and labels →
   paperwork → route. Each stage is one group, starting 0.06 s after the
   previous one and running for ~0.55 s, using opacity and a short translate
   only — so it reads as the scene being assembled, not a single fade.

   Pure CSS keyframes from globals.css keep this a server component. Every
   animated group carries `motion-reduce:animate-none`, so a reduced-motion
   visitor gets the finished scene immediately rather than a half-built one.
   All delays are fixed strings: SSR and hydration render identical styles.
   -------------------------------------------------------------------------- */

const RISE = "animate-fade-up motion-reduce:animate-none";
const FADE = "animate-fade-in motion-reduce:animate-none";

type EntranceKind = "rise" | "fade";
type EntranceProps = { className?: string; style?: CSSProperties };

/** Stage start times in seconds — fixed so server and client match exactly. */
const STAGE = {
  floor: "0s",
  largeBox: "0.06s",
  stackedBox: "0.12s",
  smallBox: "0.18s",
  tape: "0.24s",
  fragileLabel: "0.3s",
  checklist: "0.36s",
  pin: "0.42s",
  route: "0.48s",
} as const;

function entrance(delay: string, kind: EntranceKind = "rise"): EntranceProps {
  return {
    className: kind === "rise" ? RISE : FADE,
    style: {
      animationDelay: delay,
      // Hide only during the delay, then hand the element back to its natural
      // styles — no residual transform or fill left on the finished drawing.
      animationFillMode: "backwards",
      ...(kind === "fade" ? { animationDuration: "0.55s" } : {}),
    },
  };
}

export type HeroSceneProps = {
  className?: string;
  /** Scene-assembly entrance. On by default; the static drawing is the fallback. */
  animated?: boolean;
};

export function HeroScene({ className, animated = true }: HeroSceneProps) {
  const enter = (delay: string, kind: EntranceKind = "rise"): EntranceProps =>
    animated ? entrance(delay, kind) : {};

  return (
    <svg
      viewBox="0 0 560 520"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Illustration of packed moving boxes with a fragile label, a moving checklist and a delivery route pin"
    >
      <defs>
        <pattern
          id="hero-dots"
          width="22"
          height="22"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.4" cy="1.4" r="1.2" fill="#0d1a2b" opacity="0.08" />
        </pattern>
        <filter id="hero-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow
            dx="0"
            dy="10"
            stdDeviation="14"
            floodColor="#0d1a2b"
            floodOpacity="0.12"
          />
        </filter>
        <filter id="hero-card-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="10"
            floodColor="#0d1a2b"
            floodOpacity="0.1"
          />
        </filter>
        <linearGradient id="hero-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f7f8fa" />
          <stop offset="100%" stopColor="#eef2f8" />
        </linearGradient>
      </defs>

      {/* panel — the stage itself, always present */}
      <rect width="560" height="520" rx="24" fill="url(#hero-panel)" />
      <rect width="560" height="520" rx="24" fill="url(#hero-dots)" />

      {/* hairline frame detail */}
      <rect
        x="0.5"
        y="0.5"
        width="559"
        height="519"
        rx="23.5"
        fill="none"
        stroke="#dfe7f1"
      />

      {/* floor plate — the ground the scene is built on */}
      <g {...enter(STAGE.floor, "fade")}>
        <ellipse cx="300" cy="418" rx="176" ry="34" fill="#0d1a2b" opacity="0.07" />
        <ellipse cx="300" cy="418" rx="118" ry="22" fill="#0d1a2b" opacity="0.05" />
      </g>

      {/* large box */}
      <g {...enter(STAGE.largeBox)}>
        <IsoBox x={0} y={0} z={0} w={140} d={140} h={95} />
      </g>

      {/* tape over the large box */}
      <g {...enter(STAGE.tape)}>
        <polygon
          points={face([
            [0, 58, 95],
            [140, 58, 95],
            [140, 80, 95],
            [0, 80, 95],
          ])}
          fill="#ea7a2f"
          opacity="0.92"
        />
        <polygon
          points={face([
            [52, 140, 0],
            [74, 140, 0],
            [74, 140, 95],
            [52, 140, 95],
          ])}
          fill="#ea7a2f"
          opacity="0.92"
        />
      </g>

      {/* fragile label */}
      <g {...enter(STAGE.fragileLabel)}>
        <polygon
          points={face([
            [24, 140, 34],
            [68, 140, 34],
            [68, 140, 70],
            [24, 140, 70],
          ])}
          fill="#ffffff"
          stroke="#ea7a2f"
          strokeWidth="1.4"
        />
        <line
          x1={pt(31, 140, 52).split(",")[0]}
          y1={pt(31, 140, 52).split(",")[1]}
          x2={pt(61, 140, 52).split(",")[0]}
          y2={pt(61, 140, 52).split(",")[1]}
          stroke="#ea7a2f"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <line
          x1={pt(31, 140, 61).split(",")[0]}
          y1={pt(31, 140, 61).split(",")[1]}
          x2={pt(52, 140, 61).split(",")[0]}
          y2={pt(52, 140, 61).split(",")[1]}
          stroke="#ea7a2f"
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.55"
        />
      </g>

      {/* medium box stacked on top */}
      <g {...enter(STAGE.stackedBox)}>
        <IsoBox x={22} y={22} z={95} w={88} d={88} h={72} />
      </g>
      <g {...enter(STAGE.tape)}>
        <polygon
          points={face([
            [22, 60, 167],
            [110, 60, 167],
            [110, 74, 167],
            [22, 74, 167],
          ])}
          fill="#ea7a2f"
          opacity="0.9"
        />
        <polygon
          points={face([
            [56, 110, 95],
            [70, 110, 95],
            [70, 110, 167],
            [56, 110, 167],
          ])}
          fill="#ea7a2f"
          opacity="0.9"
        />
      </g>

      {/* small box on the floor */}
      <g {...enter(STAGE.smallBox)}>
        <IsoBox x={168} y={16} z={0} w={72} d={72} h={58} />
      </g>
      <g {...enter(STAGE.tape)}>
        <polygon
          points={face([
            [168, 44, 58],
            [240, 44, 58],
            [240, 54, 58],
            [168, 54, 58],
          ])}
          fill="#2559e0"
          opacity="0.16"
        />
      </g>

      {/* moving checklist card */}
      <g {...enter(STAGE.checklist)}>
        <g
          transform="rotate(-5 168 168)"
          filter="url(#hero-card-shadow)"
          strokeLinejoin="round"
        >
          <rect
            x="108"
            y="108"
            width="124"
            height="140"
            rx="12"
            fill="#ffffff"
            stroke="#dfe7f1"
          />
          <rect x="108" y="108" width="124" height="34" rx="12" fill="#0d1a2b" />
          <rect x="108" y="130" width="124" height="12" fill="#0d1a2b" />
          <rect x="124" y="119" width="52" height="6" rx="3" fill="#ffffff" opacity="0.85" />
          <rect x="124" y="158" width="10" height="10" rx="3" fill="#dbe6fe" />
          <rect x="142" y="160" width="64" height="6" rx="3" fill="#c7d7e9" />
          <rect x="124" y="180" width="10" height="10" rx="3" fill="#dbe6fe" />
          <rect x="142" y="182" width="52" height="6" rx="3" fill="#c7d7e9" />
          <rect x="124" y="202" width="10" height="10" rx="3" fill="#dbe6fe" />
          <rect x="142" y="204" width="58" height="6" rx="3" fill="#c7d7e9" />
          <circle cx="129" cy="230" r="7" fill="#ea7a2f" opacity="0.16" />
          <path
            d="M125.5 230l2.6 2.6 4.4-4.6"
            fill="none"
            stroke="#ea7a2f"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect x="144" y="227" width="56" height="6" rx="3" fill="#c7d7e9" />
        </g>
      </g>

      {/* route pin */}
      <g {...enter(STAGE.pin)}>
        <g filter="url(#hero-shadow)">
          <path
            d="M470 126c0-17.7 14.3-32 32-32s32 14.3 32 32c0 22-32 46-32 46s-32-24-32-46z"
            fill="#0d1a2b"
          />
          <circle cx="502" cy="125" r="11" fill="#ffffff" />
          <circle cx="502" cy="125" r="4.5" fill="#ea7a2f" />
        </g>
      </g>
      <path
        {...enter(STAGE.route, "fade")}
        d="M470 190c-26 22-52 30-84 30"
        fill="none"
        stroke="#93b4fd"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="2 9"
      />

      {/* small floor marks */}
      <path
        {...enter(STAGE.floor, "fade")}
        d="M96 402h44M404 356h56"
        stroke="#c7d7e9"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
