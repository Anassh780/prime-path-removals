"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  ClipboardList,
  Printer,
  RotateCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

/**
 * Revealed blocks must still print: the page has a Print button, and a block
 * whose scroll entrance never ran would otherwise print blank.
 */
const PRINT_SAFE_REVEAL = "print:opacity-100! print:transform-none!";

type ChecklistItem = {
  id: string;
  task: string;
  detail: string;
};

type ChecklistPhase = {
  phase: string;
  timeframe: string;
  items: ChecklistItem[];
};

const PHASES: ChecklistPhase[] = [
  {
    phase: "Phase 1",
    timeframe: "8 Weeks Before Move",
    items: [
      {
        id: "p1-1",
        task: "Declutter room by room",
        detail: "Sort items into keep, donate, sell, and recycle to reduce move volume and costs.",
      },
      {
        id: "p1-2",
        task: "Get removals quotes",
        detail: "Use our live quote calculator to benchmark costs and request your written quotation.",
      },
      {
        id: "p1-3",
        task: "Review tenancy or sale contracts",
        detail: "Check notice periods, completion schedules, and key handover timings.",
      },
      {
        id: "p1-4",
        task: "Create a moving folder or document",
        detail: "Keep all contacts, quotes, floor plans, and tenancy agreements in one accessible place.",
      },
    ],
  },
  {
    phase: "Phase 2",
    timeframe: "4 Weeks Before Move",
    items: [
      {
        id: "p2-1",
        task: "Lock in your moving date",
        detail: "Confirm your date with Prime House Removals and request packing materials if self-packing.",
      },
      {
        id: "p2-2",
        task: "Notify schools & GP surgery",
        detail: "Arrange transfer of medical records and register with new local services.",
      },
      {
        id: "p2-3",
        task: "Check parking & access restrictions",
        detail: "Verify if your local council requires a parking suspension permit for the removals vehicle.",
      },
      {
        id: "p2-4",
        task: "Begin packing non-essential items",
        detail: "Pack books, seasonal clothes, spare linen and decorative items into clearly labelled boxes.",
      },
    ],
  },
  {
    phase: "Phase 3",
    timeframe: "2 Weeks Before Move",
    items: [
      {
        id: "p3-1",
        task: "Set up Royal Mail postal redirection",
        detail: "Ensure important mail and bank statements are redirected to your new address.",
      },
      {
        id: "p3-2",
        task: "Notify utility suppliers & broadband",
        detail: "Schedule broadband switchover and notify council tax, electricity, gas, and water suppliers.",
      },
      {
        id: "p3-3",
        task: "Plan furniture layout at destination",
        detail: "Decide where large furniture (beds, sofas, wardrobes) will sit in each room.",
      },
      {
        id: "p3-4",
        task: "Arrange care for pets or young children",
        detail: "Having pets or toddlers looked after on moving day keeps everyone calm and safe.",
      },
    ],
  },
  {
    phase: "Phase 4",
    timeframe: "Moving Week (1–3 Days Before)",
    items: [
      {
        id: "p4-1",
        task: "Defrost and drain fridge-freezer",
        detail: "Empty, defrost and dry appliances 24–48 hours before transit to prevent leaks.",
      },
      {
        id: "p4-2",
        task: "Pack an essential 'First Night' box",
        detail: "Kettle, tea/coffee, snacks, toiletries, chargers, medication, bed linen and basic tools.",
      },
      {
        id: "p4-3",
        task: "Keep valuables & key documents with you",
        detail: "Passports, jewellery, deeds and cash should travel personally in your vehicle.",
      },
      {
        id: "p4-4",
        task: "Confirm arrival window with removal crew",
        detail: "Double check parking bay availability and access codes for gates or lifts.",
      },
    ],
  },
  {
    phase: "Phase 5",
    timeframe: "Moving Day & After",
    items: [
      {
        id: "p5-1",
        task: "Record final meter readings & photos",
        detail: "Take clear timestamped photos of gas, electric and water meters before departing.",
      },
      {
        id: "p5-2",
        task: "Walk through with the crew leader",
        detail: "Point out fragile items, items to stay behind, and priorities for the unload sequence.",
      },
      {
        id: "p5-3",
        task: "Final property check",
        detail: "Check all cupboards, loft, garage, shed and behind doors before locking up.",
      },
      {
        id: "p5-4",
        task: "New property meter readings & unpack essentials",
        detail: "Photograph incoming meters and set up the beds and kettle first.",
      },
    ],
  },
];

const STORAGE_KEY = "primehouse_checklist_completed_v1";

export function MovingChecklist() {
  const [completed, setCompleted] = React.useState<Record<string, boolean>>({});
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCompleted(JSON.parse(stored));
      }
    } catch {
      // Ignore localStorage errors
    }
    setMounted(true);
  }, []);

  function toggleItem(id: string) {
    const next = { ...completed, [id]: !completed[id] };
    setCompleted(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore
    }
  }

  function handleReset() {
    setCompleted({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }

  const allItems = PHASES.flatMap((p) => p.items);
  const totalCount = allItems.length;
  const completedCount = allItems.filter((i) => completed[i.id]).length;
  const percent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="flex flex-col gap-8">
      {/* Progress tracker bar */}
      <Reveal
        className={cn(
          "rounded-xl border border-line bg-white p-5 shadow-card sm:p-6",
          PRINT_SAFE_REVEAL,
        )}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ClipboardList className="size-4 text-royal-700" aria-hidden="true" />
              <h2 className="text-base font-semibold text-ink">
                Your Moving Progress
              </h2>
            </div>
            <p
              className="mt-1 text-xs text-ink-muted"
              aria-live="polite"
              aria-atomic="true"
            >
              {mounted ? (
                <span>
                  <strong>{completedCount}</strong> of <strong>{totalCount}</strong> tasks completed ({percent}% ready)
                </span>
              ) : (
                "Interactive moving progress tracker"
              )}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {completedCount > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="h-8 gap-1.5 px-2.5 text-xs text-ink-muted hover:text-red-700"
              >
                <RotateCcw className="size-3" aria-hidden="true" />
                Reset checklist
              </Button>
            )}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="h-8 gap-1.5 text-xs"
            >
              <Printer className="size-3.5" aria-hidden="true" />
              Print checklist
            </Button>
          </div>
        </div>

        {/* Progress track — scaleX only, so no layout is thrashed per toggle */}
        <div
          className="mt-4 h-2 w-full overflow-hidden rounded-full bg-surface-muted"
          role="progressbar"
          aria-label="Moving checklist progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-valuetext={`${completedCount} of ${totalCount} tasks completed`}
        >
          <div
            className="h-full origin-left rounded-full bg-royal-600 transition-transform duration-[250ms] ease-[var(--ease-out-soft)]"
            style={{ transform: `scaleX(${percent / 100})` }}
          />
        </div>
      </Reveal>

      {/* Checklist phases — the list container reveals once; rows never stagger */}
      <Reveal
        className={cn("flex flex-col gap-6", PRINT_SAFE_REVEAL)}
        y={12}
        amount={0.02}
      >
        {PHASES.map((phase) => {
          const phaseCompleted = phase.items.every((i) => completed[i.id]);

          return (
            <div
              key={phase.phase}
              className={cn(
                "u-card rounded-xl border border-line bg-white p-5 shadow-card sm:p-6",
                phaseCompleted && "border-emerald-200 bg-emerald-50/20",
              )}
            >
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="rounded-md border border-royal-200 bg-royal-50 px-2 py-0.5 text-xs font-semibold text-royal-700">
                    {phase.phase}
                  </span>
                  <h3 className="text-sm font-semibold text-navy-950 sm:text-base">
                    {phase.timeframe}
                  </h3>
                </div>

                {phaseCompleted && (
                  <span className="animate-pop-in inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                    <CheckCircle2 className="size-3.5" aria-hidden="true" />
                    Phase complete
                  </span>
                )}
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {phase.items.map((item) => {
                  const isChecked = Boolean(completed[item.id]);

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      aria-pressed={isChecked}
                      className={cn(
                        "u-card flex items-start gap-3 rounded-lg border p-3.5 text-left active:translate-y-px",
                        isChecked
                          ? "border-emerald-200 bg-emerald-50/50"
                          : "border-line bg-surface-subtle hover:border-line-strong hover:bg-white",
                      )}
                    >
                      <span className="mt-0.5 shrink-0">
                        {isChecked ? (
                          <CheckCircle2
                            className="animate-pop-in size-4 text-emerald-600"
                            aria-hidden="true"
                          />
                        ) : (
                          <Circle
                            className="size-4 text-ink-muted/50"
                            aria-hidden="true"
                          />
                        )}
                      </span>

                      <div className="min-w-0">
                        <span
                          className={cn(
                            "block text-xs font-semibold",
                            isChecked ? "text-emerald-950 line-through opacity-80" : "text-ink",
                          )}
                        >
                          {item.task}
                        </span>
                        <span className="mt-1 block text-[11px] leading-relaxed text-ink-muted">
                          {item.detail}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </Reveal>

      {/* Bottom CTA to get live quote */}
      <Reveal className={cn("rounded-xl bg-navy-950 p-6 text-white sm:p-8", PRINT_SAFE_REVEAL)}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
              Ready to secure your removal date?
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-white/70 sm:text-sm">
              Use our live price calculator to see instant pricing, or submit a
              written quote request with your addresses and date.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center shrink-0">
            <Button asChild variant="accent" size="lg">
              <Link href="/quote">
                Get a live quote
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/calculator">Cost calculator</Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
