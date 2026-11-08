import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Prime House Removals — Brand Mark:
 * Displays the company's emblem badge with precision framing,
 * calibrated contrast rings, and subtle elevation so it looks crisp
 * and vibrant on both light headers and dark navy surfaces.
 */
export function LogoMark({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "inverse";
}) {
  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl transition-all duration-200",
        tone === "inverse"
          ? "bg-navy-900/90 ring-1 ring-white/15 shadow-sm"
          : "bg-white ring-1 ring-navy-950/10 shadow-xs",
        className ?? "size-10",
      )}
    >
      <Image
        src={tone === "inverse" ? "/brand/logo-emblem-inverse.png" : "/brand/logo-emblem.png"}
        alt="Prime House Removals Emblem"
        width={96}
        height={96}
        className="size-full object-contain p-1"
        priority
      />
    </span>
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
    <span className={cn("inline-flex items-center select-none", className)}>
      <Image
        src={tone === "inverse" ? "/brand/logo-lockup-inverse.png" : "/brand/logo-lockup.png"}
        alt="Prime House Removals"
        width={280}
        height={70}
        className={cn(
          "w-auto object-contain transition-transform duration-200",
          compact ? "h-8 sm:h-8.5" : "h-9 sm:h-10",
        )}
        priority
      />
    </span>
  );
}
