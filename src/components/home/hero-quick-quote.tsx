"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Calculator } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PropertyType } from "@/lib/quote-pricing";
import { PROPERTY_TYPES } from "@/lib/validations/quote";

/** Same address at both ends is almost always a typo — catch it before the quote form. */
function normaliseAddress(value: string) {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

type QuickQuoteError = {
  field: "from" | "to";
  message: string;
};

/**
 * Compact hero estimate widget.
 *
 * Deliberately a 2x2 grid: the hero column is ~560px at desktop, so four
 * side-by-side controls left the select and the CTA cramped and clipped. Two
 * columns keep every control at a comfortable width on tablet and desktop, and
 * stack full-width on phones.
 */
export function HeroQuickQuote() {
  const router = useRouter();
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [propertyType, setPropertyType] =
    React.useState<PropertyType>("house-1-2");
  const [error, setError] = React.useState<QuickQuoteError | null>(null);
  const [isPending, startTransition] = React.useTransition();
  const toRef = React.useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fromValue = from.trim();
    const toValue = to.trim();

    if (
      fromValue &&
      toValue &&
      normaliseAddress(fromValue) === normaliseAddress(toValue)
    ) {
      setError({
        field: "to",
        message: "The collection and destination are the same. Check one of them.",
      });
      toRef.current?.focus();
      return;
    }

    setError(null);

    const params = new URLSearchParams();
    if (fromValue) params.set("from", fromValue);
    if (toValue) params.set("to", toValue);
    if (propertyType) params.set("propertyType", propertyType);

    startTransition(() => {
      router.push(`/quote?${params.toString()}`);
    });
  }

  const labelClass =
    "mb-1.5 block text-xs font-medium text-ink-soft transition-colors duration-150 group-focus-within/field:text-ink";
  const fieldClass = "group/field";
  const errorId = "quick-quote-error";

  return (
    <div className="rounded-xl border border-line bg-surface-subtle p-4 shadow-overlay transition-[border-color] duration-200 focus-within:border-royal-200 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/70 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-md bg-royal-100 text-royal-700">
            <Calculator className="size-3.5" aria-hidden="true" />
          </span>
          {/* The one continuous element in the hero: a slow 7s ping that reads
              as a live estimate. Purely decorative, and switched off under
              reduced motion by CSS, never by branching the render tree. */}
          <span className="relative flex size-2" aria-hidden="true">
            <span
              className="absolute inline-flex size-full animate-ping rounded-full bg-royal-500 opacity-60 motion-reduce:hidden"
              style={{ animationDuration: "7s" }}
            />
            <span className="relative inline-flex size-2 rounded-full bg-royal-500" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-navy-950">
            Instant Move Estimate
          </span>
        </div>
        <span className="text-xs font-medium text-ink-muted">
          No obligation
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className={fieldClass}>
          <label htmlFor="quick-from" className={labelClass}>
            Moving from
          </label>
          <Input
            id="quick-from"
            placeholder="Postcode"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              if (error) setError(null);
            }}
            className="h-11 text-sm"
          />
        </div>

        <div className={fieldClass}>
          <label htmlFor="quick-to" className={labelClass}>
            Moving to
          </label>
          <Input
            ref={toRef}
            id="quick-to"
            placeholder="Postcode"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              if (error) setError(null);
            }}
            className="h-11 text-sm"
            aria-invalid={error?.field === "to" ? true : undefined}
            aria-describedby={error?.field === "to" ? errorId : undefined}
          />
          {error?.field === "to" ? (
            <FieldError id={errorId} className="mt-1.5 animate-nudge-in">
              {error.message}
            </FieldError>
          ) : null}
        </div>

        <div className={fieldClass}>
          <label htmlFor="quick-property" className={labelClass}>
            Property size
          </label>
          <Select
            value={propertyType}
            onValueChange={(val) => setPropertyType(val as PropertyType)}
          >
            <SelectTrigger id="quick-property" className="h-11 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PROPERTY_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button
            type="submit"
            variant="accent"
            size="md"
            className="group h-11 w-full text-sm font-medium"
            loading={isPending}
            loadingText="Opening quote"
          >
            See live quote
            <ArrowRight className="u-arrow size-4" aria-hidden="true" />
          </Button>
        </div>
      </form>
    </div>
  );
}
