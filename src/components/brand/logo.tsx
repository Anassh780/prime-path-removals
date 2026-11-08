import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Prime House Removals — Brand Mark:
 * High-definition brand emblem badge framed cleanly for light and dark surfaces
 * without visual distortion or dullness.
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
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border transition-all duration-150",
        tone === "inverse"
          ? "border-white/25 bg-white shadow-sm ring-1 ring-white/20"
          : "border-navy-950/15 bg-white shadow-xs",
        className ?? "size-10",
      )}
    >
      <Image
        src="/brand/logo.png"
        alt="Prime House Removals Logo"
        width={96}
        height={96}
        className="size-full object-cover object-center"
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
            "mt-1 font-sans text-[8.5px] font-bold uppercase tracking-[0.24em]",
            tone === "inverse" ? "text-accent-300" : "text-accent-600",
          )}
        >
          Removals
        </span>
      </span>
    </span>
  );
}
