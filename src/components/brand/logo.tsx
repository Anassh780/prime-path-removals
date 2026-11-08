import { cn } from "@/lib/utils";

/**
 * Brand mark: a navy tile with a white roofline and a warm orange door —
 * "home" plus a sense of forward movement. Drawn to sit crisply at 20–40px.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("size-10", className)}
      role="img"
      aria-label="Prime House Removals"
    >
      <rect width="40" height="40" rx="10" fill="#0d1a2b" />
      <path
        d="M10.5 20.4 20 12.6l9.5 7.8"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.2 19v8.6h13.6V19"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.6 27.6v-4.8h4.8v4.8"
        fill="none"
        stroke="#ea7a2f"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.4 10.4h4.2"
        stroke="#ea7a2f"
        strokeWidth="2.4"
        strokeLinecap="round"
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
      <LogoMark className={compact ? "size-8" : "size-9"} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-semibold tracking-[-0.02em]",
            compact ? "text-[15px]" : "text-[17px]",
            tone === "inverse" ? "text-white" : "text-ink",
          )}
        >
          Prime House
        </span>
        <span
          className={cn(
            "mt-1 font-sans text-[9px] font-semibold uppercase tracking-[0.26em]",
            tone === "inverse" ? "text-white/55" : "text-ink-muted",
          )}
        >
          Removals
        </span>
      </span>
    </span>
  );
}
