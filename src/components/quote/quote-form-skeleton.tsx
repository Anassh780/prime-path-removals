import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

/**
 * Shimmer placeholder for the quote page while the client bundle hydrates.
 *
 * Uses the house `animate-shimmer` keyframes over a token-based gradient rather
 * than the default pulse, and mirrors the real two-column layout (form + live
 * estimate rail) so the swap to the loaded container does not shift the page.
 */
const SHIMMER_STYLE: CSSProperties = {
  backgroundImage:
    "linear-gradient(90deg, var(--color-surface-muted) 0%, var(--color-surface-subtle) 45%, var(--color-surface-muted) 100%)",
  backgroundSize: "200% 100%",
};

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      style={SHIMMER_STYLE}
      className={cn("animate-shimmer rounded-md", className)}
    />
  );
}

export function QuoteFormSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10"
      aria-busy="true"
    >
      <span className="sr-only">Loading the quote form and live estimate</span>

      <div className="lg:col-span-2">
        <div className="rounded-xl border border-line bg-white p-5 shadow-card sm:p-7 lg:p-8">
          <Shimmer className="h-7 w-56" />
          <Shimmer className="mt-3 h-4 w-full max-w-sm" />

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Shimmer className="h-3.5 w-24" />
              <Shimmer className="h-11 w-full" />
            </div>
            <div className="flex flex-col gap-2">
              <Shimmer className="h-3.5 w-28" />
              <Shimmer className="h-11 w-full" />
            </div>
            <div className="flex flex-col gap-2">
              <Shimmer className="h-3.5 w-28" />
              <Shimmer className="h-11 w-full" />
            </div>
            <div className="flex flex-col gap-2">
              <Shimmer className="h-3.5 w-24" />
              <Shimmer className="h-11 w-full" />
            </div>
            <div className="flex flex-col gap-2">
              <Shimmer className="h-3.5 w-24" />
              <Shimmer className="h-11 w-full" />
            </div>
            <div className="flex flex-col gap-2">
              <Shimmer className="h-3.5 w-24" />
              <Shimmer className="h-11 w-full" />
            </div>
            <div className="flex flex-col gap-2">
              <Shimmer className="h-3.5 w-28" />
              <Shimmer className="h-11 w-full" />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Shimmer className="h-3.5 w-36" />
              <Shimmer className="h-24 w-full" />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Shimmer className="h-3.5 w-40" />
              <Shimmer className="h-11 w-full" />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
            <Shimmer className="h-3.5 w-64 max-w-full" />
            <Shimmer className="h-12 w-full rounded-lg sm:w-44" />
          </div>
        </div>
      </div>

      {/* Live estimate rail — same proportions as QuoteAside */}
      <div className="flex flex-col gap-5">
        <div className="rounded-xl border border-line bg-white p-5 shadow-card sm:p-6">
          <div className="flex items-center justify-between gap-3 border-b border-line/80 pb-3.5">
            <Shimmer className="h-3 w-36" />
            <Shimmer className="h-5 w-24" />
          </div>
          <Shimmer className="mt-5 h-9 w-40" />
          <Shimmer className="mt-2.5 h-3 w-full max-w-[220px]" />
          <div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-line pt-4">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="flex items-start gap-2.5 rounded-lg border border-line/70 bg-surface-subtle p-2.5"
              >
                <Shimmer className="mt-0.5 size-4 shrink-0" />
                <div className="min-w-0 flex-1">
                  <Shimmer className="h-2.5 w-14" />
                  <Shimmer className="mt-1.5 h-2.5 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-navy-950 p-6 sm:p-7">
          <div className="h-5 w-40 rounded-md bg-white/10" aria-hidden="true" />
          <div
            className="mt-3 h-3 w-full max-w-[240px] rounded-md bg-white/10"
            aria-hidden="true"
          />
          <div className="mt-6 flex flex-col gap-5">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="flex gap-3.5">
                <div
                  className="size-7 shrink-0 rounded-full bg-white/10"
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <div
                    className="h-3 w-32 rounded-md bg-white/15"
                    aria-hidden="true"
                  />
                  <div
                    className="mt-2 h-2.5 w-full rounded-md bg-white/10"
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
