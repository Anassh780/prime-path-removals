"use client";

import * as React from "react";
import { format, isValid } from "date-fns";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type DatePickerProps = {
  id?: string;
  value?: Date;
  onChange: (value: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  minDate?: Date;
  className?: string;
  "aria-describedby"?: string;
};

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export function DatePicker({
  id,
  value,
  onChange,
  placeholder = "Select a date",
  disabled = false,
  invalid = false,
  minDate,
  className,
  "aria-describedby": describedBy,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date>(value ?? new Date());

  const floor = React.useMemo(
    () => startOfDay(minDate ?? new Date()),
    [minDate],
  );

  const days = React.useMemo(() => {
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [month]);

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        // Opening the calendar on an existing value should land on that month.
        if (next && value && isValid(value)) setMonth(value);
      }}
    >
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          disabled={disabled}
          data-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={cn(
            "group flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-line-strong bg-white px-3.5 text-left text-sm shadow-xs",
            "transition-[border-color,box-shadow] duration-150 ease-out hover:border-navy-300",
            "focus:border-royal-500 focus:outline-none focus:ring-4 focus:ring-royal-600/15",
            "data-[state=open]:border-royal-500 data-[state=open]:ring-4 data-[state=open]:ring-royal-600/15",
            "disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:opacity-70",
            "data-[invalid]:border-red-400 data-[invalid]:hover:border-red-500 data-[invalid]:focus:border-red-500 data-[invalid]:focus:ring-red-500/15",
            !value && "text-ink-muted/80",
            className,
          )}
        >
          <span className="truncate">
            {value && isValid(value) ? format(value, "d MMMM yyyy") : placeholder}
          </span>
          <CalendarDays
            className="size-4 shrink-0 text-ink-muted transition-colors duration-150 group-hover:text-navy-700"
            aria-hidden="true"
          />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-[19.5rem] p-3" align="start">
        <div className="flex items-center justify-between pb-2">
          <button
            type="button"
            onClick={() => setMonth((current) => subMonths(current, 1))}
            className="flex size-8 items-center justify-center rounded-md text-ink-soft transition-[color,background-color,scale] duration-150 ease-out hover:bg-surface-muted hover:text-ink active:scale-[0.94] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-royal-600/15"
            aria-label="Previous month"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div className="text-[13px] font-semibold text-ink" aria-live="polite">
            {format(month, "MMMM yyyy")}
          </div>
          <button
            type="button"
            onClick={() => setMonth((current) => addMonths(current, 1))}
            className="flex size-8 items-center justify-center rounded-md text-ink-soft transition-[color,background-color,scale] duration-150 ease-out hover:bg-surface-muted hover:text-ink active:scale-[0.94] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-royal-600/15"
            aria-label="Next month"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 pb-1">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="flex h-8 items-center justify-center text-[11px] font-medium uppercase tracking-wide text-ink-muted"
              aria-hidden="true"
            >
              {day}
            </div>
          ))}
        </div>

        <div
          key={`${month.getFullYear()}-${month.getMonth()}`}
          className="grid grid-cols-7 gap-1 animate-[fade-in_0.16s_var(--ease-out-soft)_both]"
        >
          {days.map((day) => {
            const outside = !isSameMonth(day, month);
            const disabledDay = isBefore(day, floor);
            const selected = value ? isSameDay(day, value) : false;
            const today = isToday(day);

            return (
              <button
                key={day.toISOString()}
                type="button"
                disabled={disabledDay}
                onClick={() => {
                  onChange(day);
                  setOpen(false);
                }}
                aria-label={format(day, "EEEE d MMMM yyyy")}
                aria-current={selected ? "date" : undefined}
                className={cn(
                  "flex size-9 items-center justify-center rounded-md text-[13px] tabular-nums",
                  "transition-[background-color,color,scale] duration-150 ease-out",
                  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-royal-600/15",
                  outside ? "text-ink-muted/45" : "text-ink-soft",
                  !selected && !disabledDay && "hover:bg-navy-50 hover:text-navy-900 active:scale-[0.96]",
                  today && !selected && "font-semibold text-royal-700 ring-1 ring-inset ring-royal-200",
                  selected &&
                    "animate-scale-in bg-navy-900 font-semibold text-white hover:bg-navy-900",
                  disabledDay &&
                    "cursor-not-allowed text-ink-muted/35 line-through hover:bg-transparent",
                )}
              >
                {format(day, "d")}
              </button>
            );
          })}
        </div>

        <div className="mt-2 flex items-center justify-between border-t border-line pt-2">
          <button
            type="button"
            onClick={() => {
              onChange(undefined);
              setOpen(false);
            }}
            className="rounded-md px-2 py-1.5 text-[12px] font-medium text-ink-muted transition-[color,background-color,scale] duration-150 ease-out hover:bg-surface-muted hover:text-ink active:scale-[0.97]"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => {
              const today = startOfDay(new Date());
              if (!isBefore(today, floor)) {
                onChange(today);
                setOpen(false);
              }
            }}
            className="rounded-md px-2 py-1.5 text-[12px] font-medium text-royal-700 transition-[color,background-color,scale] duration-150 ease-out hover:bg-royal-50 active:scale-[0.97]"
          >
            Today
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
