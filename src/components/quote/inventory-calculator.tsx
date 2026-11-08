"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Minus, Plus, RotateCcw, Package } from "lucide-react";

import {
  INVENTORY_ITEMS,
  type InventoryCounts,
  type InventoryItemKey,
} from "@/lib/quote-pricing";
import { AnimatedNumber } from "@/components/shared/animated-number";
import { Button } from "@/components/ui/button";

type InventoryCalculatorProps = {
  counts: InventoryCounts;
  onChange: (counts: InventoryCounts) => void;
};

/** Short enough to feel like a direct response to the stepper press. */
const TOTAL_DURATION = 0.35;

/** Keeps the existing ungrouped totals (e.g. 1200, not 1,200). */
const formatAmount = (value: number) => String(Math.round(value));

export function InventoryCalculator({
  counts,
  onChange,
}: InventoryCalculatorProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const totalItems = Object.values(counts).reduce(
    (acc, val) => acc + (val ?? 0),
    0,
  );

  const totalVolume = INVENTORY_ITEMS.reduce((acc, item) => {
    const qty = counts[item.key] ?? 0;
    return acc + qty * item.cuFt;
  }, 0);

  function updateCount(key: InventoryItemKey, delta: number) {
    const current = counts[key] ?? 0;
    const next = Math.max(0, current + delta);
    onChange({
      ...counts,
      [key]: next,
    });
  }

  function handleReset() {
    onChange({});
  }

  return (
    <div className="rounded-xl border border-line bg-surface-subtle p-4 sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Package className="size-4 text-accent-600" aria-hidden="true" />
            <h3 className="text-sm font-semibold text-ink">
              Move inventory & volume calculator (optional)
            </h3>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">
            {totalItems > 0 ? (
              <>
                <AnimatedNumber
                  value={totalItems}
                  format={formatAmount}
                  duration={TOTAL_DURATION}
                />{" "}
                items selected (
                <AnimatedNumber
                  value={totalVolume}
                  format={formatAmount}
                  duration={TOTAL_DURATION}
                />{" "}
                cu ft calculated). This refines your live quote.
              </>
            ) : (
              "Standard volume is calculated from property size automatically. Add specific items here for an exact volume estimate."
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          {totalItems > 0 ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-8 animate-fade-in gap-1 px-2.5 text-xs text-ink-muted hover:text-red-700"
            >
              <RotateCcw className="size-3" aria-hidden="true" />
              Reset
            </Button>
          ) : null}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            className="h-8 text-xs font-medium"
          >
            {isOpen ? "Close inventory" : totalItems > 0 ? "Edit items" : "Itemise belongings"}
          </Button>
        </div>
      </div>

      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 border-t border-line pt-4"
        >
          <div className="grid gap-2.5 sm:grid-cols-2">
            {INVENTORY_ITEMS.map((item) => {
              const count = counts[item.key] ?? 0;

              return (
                <div
                  key={item.key}
                  className="flex items-center justify-between rounded-lg border border-line bg-white p-2.5 shadow-xs transition-colors"
                >
                  <div className="min-w-0 pr-2">
                    <span className="block truncate text-xs font-medium text-ink">
                      {item.label}
                    </span>
                    <span className="block text-[11px] text-ink-muted">
                      ~{item.cuFt} cu ft
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center gap-1.5">
                    <button
                      type="button"
                      disabled={count === 0}
                      onClick={() => updateCount(item.key, -1)}
                      aria-label={`Decrease ${item.label}`}
                      className="u-press flex size-7 items-center justify-center rounded-md border border-line bg-surface-subtle text-ink-soft transition hover:border-line-strong hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Minus className="size-3" aria-hidden="true" />
                    </button>

                    <span
                      key={count}
                      className="w-6 animate-pop-in text-center text-xs font-semibold tabular-nums text-ink"
                    >
                      {count}
                    </span>

                    <button
                      type="button"
                      onClick={() => updateCount(item.key, 1)}
                      aria-label={`Increase ${item.label}`}
                      className="u-press flex size-7 items-center justify-center rounded-md border border-line bg-surface-subtle text-ink-soft transition hover:border-line-strong hover:bg-white"
                    >
                      <Plus className="size-3" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-royal-200 bg-white px-3.5 py-2.5 text-xs text-navy-900">
            <span className="font-medium">
              Calculated moving volume:{" "}
              <strong className="font-semibold tabular-nums text-royal-700">
                <AnimatedNumber
                  value={totalVolume}
                  format={formatAmount}
                  duration={TOTAL_DURATION}
                />{" "}
                cubic feet
              </strong>
            </span>
            <span className="text-[11px] text-ink-muted">
              Live quote updates automatically above
            </span>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}
