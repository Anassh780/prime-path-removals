import { Skeleton } from "@/components/ui/skeleton";

/**
 * Shimmer placeholder for the quote page while the client bundle hydrates.
 *
 * Mirrors the real two-column layout (form + live estimate rail) so the swap to
 * the loaded container does not shift the page. Each block is given a negative
 * `animation-delay` in reading order, so the highlight travels down the form as
 * a slow wave — the placeholder reads as "still loading" rather than "broken".
 */
const WAVE_STEP = 0.11;
const WAVE_LENGTH = 10;

/** Placeholder for the white text blocks inside the navy-950 rail card. */
const ON_NAVY = "bg-white/10 bg-linear-to-r from-white/5 via-white/20 to-white/5";

function waveDelay(step: number) {
  const delay = -((step % WAVE_LENGTH) * WAVE_STEP);
  return `${delay.toFixed(3)}s`;
}

/**
 * A single placeholder block. `step` is its position in the reading order; the
 * wave wraps every `WAVE_LENGTH` blocks so the delay never exceeds one sweep.
 */
function Block({ step, className }: { step: number; className?: string }) {
  return (
    <Skeleton className={className} style={{ animationDelay: waveDelay(step) }} />
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
          <Block step={0} className="h-7 w-56" />
          <Block step={1} className="mt-3 h-4 w-full max-w-sm" />

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Block step={2} className="h-3.5 w-24" />
              <Block step={3} className="h-11 w-full rounded-lg" />
            </div>
            <div className="flex flex-col gap-2">
              <Block step={4} className="h-3.5 w-28" />
              <Block step={5} className="h-11 w-full rounded-lg" />
            </div>
            <div className="flex flex-col gap-2">
              <Block step={6} className="h-3.5 w-28" />
              <Block step={7} className="h-11 w-full rounded-lg" />
            </div>
            <div className="flex flex-col gap-2">
              <Block step={8} className="h-3.5 w-24" />
              <Block step={9} className="h-11 w-full rounded-lg" />
            </div>
            <div className="flex flex-col gap-2">
              <Block step={10} className="h-3.5 w-24" />
              <Block step={11} className="h-11 w-full rounded-lg" />
            </div>
            <div className="flex flex-col gap-2">
              <Block step={12} className="h-3.5 w-24" />
              <Block step={13} className="h-11 w-full rounded-lg" />
            </div>
            <div className="flex flex-col gap-2">
              <Block step={14} className="h-3.5 w-28" />
              <Block step={15} className="h-11 w-full rounded-lg" />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Block step={16} className="h-3.5 w-36" />
              <Block step={17} className="h-24 w-full rounded-lg" />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Block step={18} className="h-3.5 w-40" />
              <Block step={19} className="h-11 w-full rounded-lg" />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
            <Block step={20} className="h-3.5 w-64 max-w-full" />
            <Block step={21} className="h-12 w-full rounded-lg sm:w-44" />
          </div>
        </div>
      </div>

      {/* Live estimate rail — same proportions as QuoteAside */}
      <div className="flex flex-col gap-5">
        <div className="rounded-xl border border-line bg-white p-5 shadow-card sm:p-6">
          <div className="flex items-center justify-between gap-3 border-b border-line/80 pb-3.5">
            <Block step={22} className="h-3 w-36" />
            <Block step={23} className="h-5 w-24" />
          </div>
          <Block step={24} className="mt-5 h-9 w-40" />
          <Block step={25} className="mt-2.5 h-3 w-full max-w-[220px]" />
          <div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-line pt-4">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="flex items-start gap-2.5 rounded-lg border border-line/70 bg-surface-subtle p-2.5"
              >
                <Block
                  step={26 + index * 3}
                  className="mt-0.5 size-4 shrink-0 rounded-full"
                />
                <div className="min-w-0 flex-1">
                  <Block step={27 + index * 3} className="h-2.5 w-14" />
                  <Block step={28 + index * 3} className="mt-1.5 h-2.5 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-navy-950 p-6 sm:p-7">
          <Block step={38} className={`h-5 w-40 ${ON_NAVY}`} />
          <Block step={39} className={`mt-3 h-3 w-full max-w-[240px] ${ON_NAVY}`} />
          <div className="mt-6 flex flex-col gap-5">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="flex gap-3.5">
                <Block
                  step={40 + index * 3}
                  className={`size-7 shrink-0 rounded-full ${ON_NAVY}`}
                />
                <div className="min-w-0 flex-1">
                  <Block
                    step={41 + index * 3}
                    className="h-3 w-32 bg-white/15 bg-linear-to-r from-white/5 via-white/25 to-white/5"
                  />
                  <Block
                    step={42 + index * 3}
                    className={`mt-2 h-2.5 w-full ${ON_NAVY}`}
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
