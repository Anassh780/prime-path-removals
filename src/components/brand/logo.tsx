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
        src={tone === "inverse" ? "/brand/logo-inverse.png" : "/brand/logo-mark.png"}
        alt="Prime House Removals Logo"
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
    <span className={cn("inline-flex items-center gap-2.5 sm:gap-3", className)}>
      <LogoMark
        tone={tone}
        className={compact ? "size-9 rounded-lg" : "size-10 sm:size-11 rounded-xl"}
      />
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-display font-bold tracking-[-0.02em]",
            compact ? "text-[15.5px]" : "text-[17px] sm:text-[18.5px]",
            tone === "inverse" ? "text-white" : "text-navy-950",
          )}
        >
          Prime House
        </span>
        <span
          className={cn(
            "mt-0.5 font-sans text-[8.5px] sm:text-[9px] font-bold uppercase tracking-[0.24em]",
            tone === "inverse" ? "text-accent-300" : "text-accent-600",
          )}
        >
          Removals
        </span>
      </span>
    </span>
  );
}
