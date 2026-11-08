"use client";

import * as React from "react";
import {
  Clock,
  Package,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";

import { AnimatedNumber } from "@/components/shared/animated-number";
import type { QuoteEstimate } from "@/lib/quote-pricing";
import { cn } from "@/lib/utils";

type LiveEstimateCardProps = {
  estimate: QuoteEstimate;
  className?: string;
  isCompact?: boolean;
};

/** Keeps the existing ungrouped figure formatting (e.g. 1200, not 1,200). */
const formatAmount = (value: number) => String(Math.round(value));

export function LiveEstimateCard({
  estimate,
  className,
  isCompact = false,
}: LiveEstimateCardProps) {
  const [showBreakdown, setShowBreakdown] = React.useState(false);

  return (
    <div
      className={cn(
        "animate-fade-up overflow-hidden rounded-xl border border-line bg-white shadow-card",
        className,
      )}
    >
      {/* Header bar */}
      <div className="border-b border-line bg-surface-subtle px-5 py-3.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* Static marker: the figure below is a computed guide price, not a
                live connection — so there is no pulsing "live" state here. */}
            <span
              className="inline-block size-2 rounded-full bg-accent-500"
              aria-hidden="true"
            />
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-navy-900">
              Live Estimated Guide Price
            </span>
          </div>
          <span className="rounded-md border border-line bg-white px-2 py-0.5 text-[11px] font-medium text-navy-900">
            Instant guidance
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {/* Price headline — both figures are computed by calculateQuoteEstimate. */}
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="font-display text-3xl font-semibold leading-none tabular-nums tracking-[-0.04em] text-ink sm:text-4xl xl:text-[2.5rem]">
              £
              <AnimatedNumber value={estimate.minPrice} format={formatAmount} />{" "}
              to £
              <AnimatedNumber value={estimate.maxPrice} format={formatAmount} />
            </span>
            <span className="text-xs font-medium text-ink-muted">inc. VAT</span>
          </div>
          <p className="text-xs leading-relaxed text-ink-muted">
            Includes crew labour, loading, transit and equipment for your
            selected specifications.
          </p>
        </div>

        {/* Core move specifications */}
        <div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-line pt-4 text-left">
          <div className="flex items-start gap-2.5 rounded-lg border border-line bg-surface-subtle p-2.5">
            <Truck
              className="mt-0.5 size-4 shrink-0 text-accent-600"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <span className="block text-[11px] font-medium uppercase tracking-[0.06em] text-ink-muted">
                Vehicle
              </span>
              <span className="mt-0.5 block truncate text-xs font-semibold text-ink" title={estimate.recommendedVehicle}>
                {estimate.recommendedVehicle}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-lg border border-line bg-surface-subtle p-2.5">
            <Users
              className="mt-0.5 size-4 shrink-0 text-accent-600"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <span className="block text-[11px] font-medium uppercase tracking-[0.06em] text-ink-muted">
                Moving crew
              </span>
              <span className="mt-0.5 block truncate text-xs font-semibold text-ink" title={estimate.recommendedCrew}>
                {estimate.recommendedCrew}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-lg border border-line bg-surface-subtle p-2.5">
            <Clock
              className="mt-0.5 size-4 shrink-0 text-accent-600"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <span className="block text-[11px] font-medium uppercase tracking-[0.06em] text-ink-muted">
                Estimated time
              </span>
              <span className="mt-0.5 block truncate text-xs font-semibold text-ink">
                {estimate.estimatedHours}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-lg border border-line bg-surface-subtle p-2.5">
            <Package
              className="mt-0.5 size-4 shrink-0 text-accent-600"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <span className="block text-[11px] font-medium uppercase tracking-[0.06em] text-ink-muted">
                Est. volume
              </span>
              <span className="mt-0.5 block truncate text-xs font-semibold tabular-nums text-ink">
                ~<AnimatedNumber value={estimate.volumeCuFt} format={formatAmount} /> cu ft
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Toggle */}
        {!isCompact && (
          <div className="mt-4 border-t border-line pt-3">
            <button
              type="button"
              onClick={() => setShowBreakdown((prev) => !prev)}
              aria-expanded={showBreakdown}
              className="flex w-full items-center justify-between gap-3 py-1 text-left text-xs font-medium text-navy-900 transition-colors duration-150 hover:text-accent-600"
            >
              <span>{showBreakdown ? "Hide quote breakdown" : "View itemised breakdown"}</span>
              <span className="text-[11px] text-ink-muted">
                {estimate.breakdown.length} items
              </span>
            </button>

            {showBreakdown ? (
              <ul className="mt-3 flex animate-slide-down flex-col gap-2 rounded-lg border border-line/60 bg-surface-subtle p-3">
                {estimate.breakdown.map((item) => (
                  <li
                    key={item.label}
                    className="flex flex-col gap-0.5 border-b border-line/40 pb-2 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-ink">{item.label}</span>
                      <span className="font-semibold tabular-nums text-navy-900">
                        {item.amount}
                      </span>
                    </div>
                    {item.detail && (
                      <span className="text-[11px] leading-tight text-ink-muted">
                        {item.detail}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        )}

        {/* Assurance and process disclaimer */}
        <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-accent-200/80 bg-accent-50/70 p-3 text-xs leading-relaxed text-navy-950">
          <ShieldCheck
            className="mt-0.5 size-4 shrink-0 text-accent-600"
            aria-hidden="true"
          />
          <div>
            <span className="font-semibold">Guaranteed price in writing: </span>
            This instant guide price reflects typical requirements. We confirm
            your final fixed price in writing after verifying your route,
            parking and access.
          </div>
        </div>
      </div>
    </div>
  );
}
