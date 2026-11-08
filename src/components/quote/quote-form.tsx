"use client";

import * as React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, startOfDay } from "date-fns";
import { AlertCircle, ArrowRight, Clock, Truck, Users } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Controller, useForm, type DefaultValues } from "react-hook-form";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";

import { getService, services } from "@/content/services";
import { QuoteSuccess } from "@/components/quote/quote-success";
import { InventoryCalculator } from "@/components/quote/inventory-calculator";
import { AnimatedNumber } from "@/components/shared/animated-number";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Field,
  FieldError,
  FieldHint,
  FieldLabel,
  OptionalTag,
} from "@/components/ui/field";
import { Input, Textarea } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  PROPERTY_TYPES,
  REFERRAL_SOURCES,
  quoteFormSchema,
  type PropertyType,
  type QuoteFormValues,
} from "@/lib/validations/quote";
import {
  DISTANCE_TIERS,
  FLOOR_ACCESS_OPTIONS,
  calculateQuoteEstimate,
  type DistanceTier,
  type InventoryCounts,
  type QuoteEstimate,
} from "@/lib/quote-pricing";

/** House curve — shared with the motion primitives. */
const EASE = [0.22, 1, 0.36, 1] as const;

/** Keeps the existing ungrouped figure formatting (e.g. 1200, not 1,200). */
const formatAmount = (value: number) => String(Math.round(value));

/** Field wrapper is the group; its label reacts when the control takes focus. */
const FIELD_GROUP = "group";
const LABEL_FOCUS =
  "transition-colors duration-150 group-focus-within:text-royal-700";

/**
 * Numbered section panel. Each panel fades up once on mount with a short
 * stagger (max 200 ms, well inside the form-critical budget) and tints its
 * border while a control inside it has focus — no height animation anywhere.
 */
const PANEL =
  "animate-fade-up rounded-lg border border-line/70 bg-surface-subtle p-4 transition-colors duration-200 focus-within:border-royal-200 sm:p-5";

function readMessage(body: unknown): string | null {
  if (typeof body === "object" && body !== null && "error" in body) {
    const value = (body as { error?: unknown }).error;
    if (typeof value === "string" && value.trim().length > 0) return value;
  }
  return null;
}

function readReference(body: unknown): string | null {
  if (typeof body === "object" && body !== null && "reference" in body) {
    const value = (body as { reference?: unknown }).reference;
    if (typeof value === "string" && value.trim().length > 0) return value;
  }
  return null;
}

function readFieldErrors(body: unknown): Record<string, string> {
  if (typeof body !== "object" || body === null || !("fields" in body)) {
    return {};
  }

  const value = (body as { fields?: unknown }).fields;
  if (typeof value !== "object" || value === null) return {};

  const fields: Record<string, string> = {};
  for (const [key, message] of Object.entries(value)) {
    if (typeof message === "string" && message.trim().length > 0) {
      fields[key] = message;
    }
  }
  return fields;
}

function fallbackMessage(status: number): string {
  if (status === 429) {
    return "You have sent several requests in a short space of time. Please wait a minute and try again.";
  }
  if (status === 503) {
    return "Submissions are not connected yet. Please try again later or contact us directly.";
  }
  if (status === 400) {
    return "Some of the details need checking. Please review the highlighted fields.";
  }
  return "We could not send your request just now. Please try again in a moment.";
}

type QuoteFormProps = {
  onEstimateChange?: (estimate: QuoteEstimate) => void;
};

export function QuoteForm({ onEstimateChange }: QuoteFormProps) {
  const searchParams = useSearchParams();
  const requestedService = searchParams.get("service");
  const requestedPostcode =
    searchParams.get("from")?.trim() ||
    searchParams.get("movingFrom")?.trim() ||
    searchParams.get("postcode")?.trim() ||
    "";
  const requestedTo =
    searchParams.get("to")?.trim() ||
    searchParams.get("movingTo")?.trim() ||
    "";
  const requestedProperty = searchParams.get("propertyType")?.trim() as
    | PropertyType
    | undefined;
  const requestedDistance = searchParams.get("distance")?.trim() as
    | DistanceTier
    | undefined;

  const [inventoryCounts, setInventoryCounts] = React.useState<InventoryCounts>(
    {},
  );

  const [defaultValues] = React.useState<DefaultValues<QuoteFormValues>>(() => ({
    fullName: "",
    email: "",
    phone: "",
    movingFrom: "",
    movingTo: "",
    propertyType: "house-1-2",
    services: ["house-removals"],
    distanceTier: "local",
    collectionFloor: "ground",
    destinationFloor: "ground",
    additionalInfo: "",
    referral: undefined,
  }));

  const {
    control,
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    mode: "onTouched",
    defaultValues,
  });

  const watchedProperty = watch("propertyType");
  const watchedServices = watch("services");
  const watchedDistance = watch("distanceTier");
  const watchedCollectionFloor = watch("collectionFloor");
  const watchedDestinationFloor = watch("destinationFloor");

  const currentEstimate = React.useMemo(() => {
    return calculateQuoteEstimate({
      propertyType: watchedProperty,
      services: watchedServices,
      distanceTier: watchedDistance,
      collectionFloor: watchedCollectionFloor,
      destinationFloor: watchedDestinationFloor,
      inventoryCounts,
    });
  }, [
    watchedProperty,
    watchedServices,
    watchedDistance,
    watchedCollectionFloor,
    watchedDestinationFloor,
    inventoryCounts,
  ]);

  React.useEffect(() => {
    onEstimateChange?.(currentEstimate);
  }, [currentEstimate, onEstimateChange]);

  // Query-string context is applied after mount
  React.useEffect(() => {
    const preselectedService =
      requestedService && getService(requestedService)
        ? requestedService
        : null;

    if (preselectedService) {
      setValue("services", [preselectedService], { shouldValidate: false });
    }

    if (requestedPostcode && !getValues("movingFrom")) {
      setValue("movingFrom", requestedPostcode, { shouldValidate: false });
    }

    if (requestedTo && !getValues("movingTo")) {
      setValue("movingTo", requestedTo, { shouldValidate: false });
    }

    if (
      requestedProperty &&
      PROPERTY_TYPES.some((pt) => pt.value === requestedProperty)
    ) {
      setValue("propertyType", requestedProperty, { shouldValidate: false });
    }

    if (
      requestedDistance &&
      DISTANCE_TIERS.some((dt) => dt.value === requestedDistance)
    ) {
      setValue("distanceTier", requestedDistance, { shouldValidate: false });
    }
  }, [
    requestedService,
    requestedPostcode,
    requestedTo,
    requestedProperty,
    requestedDistance,
    setValue,
    getValues,
  ]);

  const [reference, setReference] = React.useState<string | null>(null);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const formHeadingRef = React.useRef<HTMLHeadingElement>(null);
  const hadSuccess = React.useRef(false);

  const today = React.useMemo(() => startOfDay(new Date()), []);

  React.useEffect(() => {
    if (reference) {
      hadSuccess.current = true;
      return;
    }

    if (hadSuccess.current) {
      hadSuccess.current = false;
      formHeadingRef.current?.focus();
    }
  }, [reference]);

  function applyServerIssues(body: unknown) {
    const fields = readFieldErrors(body);

    for (const [field, message] of Object.entries(fields)) {
      if (field in quoteFormSchema.shape) {
        setError(field as keyof QuoteFormValues, {
          type: "server",
          message,
        });
      }
    }
  }

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);

    const inventorySummary = Object.entries(inventoryCounts)
      .filter(([, count]) => typeof count === "number" && count > 0)
      .map(([key, count]) => `${key}: ${count}`)
      .join(", ");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          movingDate: format(values.movingDate, "yyyy-MM-dd"),
          estimatedPriceRange: currentEstimate.priceFormatted,
          inventorySummary: inventorySummary || undefined,
        }),
      });

      const body: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const message = readMessage(body) ?? fallbackMessage(response.status);
        applyServerIssues(body);
        setSubmitError(message);
        toast.error("Your request was not sent", { description: message });
        return;
      }

      const newReference = readReference(body);

      if (!newReference) {
        const message =
          "We could not confirm your request. Please try again, or contact us directly.";
        setSubmitError(message);
        toast.error("Your request was not sent", { description: message });
        return;
      }

      setReference(newReference);
      toast.success("Quote request sent", {
        description: `Your reference is ${newReference}. We will be in touch about your move.`,
      });
    } catch {
      const message =
        "We could not reach the server. Check your connection and try again.";
      setSubmitError(message);
      toast.error("Your request was not sent", { description: message });
    }
  });

  if (reference) {
    const fullName = getValues("fullName").trim();
    const firstName = fullName ? fullName.split(/\s+/)[0] : "";

    return (
      <QuoteSuccess
        reference={reference}
        firstName={firstName}
        onReset={() => {
          reset(defaultValues);
          setInventoryCounts({});
          setSubmitError(null);
          setReference(null);
        }}
      />
    );
  }

  return (
    <section
      aria-labelledby="quote-form-heading"
      className="rounded-xl border border-line border-t-4 border-t-accent-600 bg-white p-5 shadow-card sm:p-7 lg:p-8"
    >
      <div className="flex flex-col gap-1.5">
        <h2
          id="quote-form-heading"
          ref={formHeadingRef}
          tabIndex={-1}
          className="text-2xl font-semibold tracking-[-0.02em] text-ink outline-none sm:text-3xl"
        >
          Tell us about your move
        </h2>
        <p className="text-sm leading-relaxed text-ink-soft">
          Complete your move details to see your live estimated guide price in
          real time. Fields marked with an asterisk are required.
        </p>
      </div>

      <AnimatePresence initial={false}>
        {submitError ? (
          <motion.div
            key="quote-submit-error"
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="mt-5 flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4"
          >
            <AlertCircle
              className="mt-0.5 size-4 shrink-0 text-red-600"
              aria-hidden="true"
            />
            <div className="text-sm leading-relaxed text-red-800">
              <p className="font-semibold">Your request was not sent</p>
              <p className="mt-1">{submitError}</p>
              <p className="mt-1.5">
                You can try again, or{" "}
                <Link
                  href="/contact"
                  className="font-medium text-red-900 underline underline-offset-2 hover:text-red-950"
                >
                  use the contact page
                </Link>
                . Your answers are still here.
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <form noValidate onSubmit={onSubmit} className="mt-6 flex flex-col gap-6">
        {/* Section 1: Contact Details */}
        <div className={PANEL}>
          <div className="flex items-center gap-2.5">
            <span
              className="flex size-6 shrink-0 items-center justify-center rounded-md bg-navy-900 font-display text-[11px] font-semibold tabular-nums text-white"
              aria-hidden="true"
            >
              1
            </span>
            <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-navy-900">
              Contact details
            </h3>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field className={cn(FIELD_GROUP, "sm:col-span-2")}>
              <FieldLabel htmlFor="fullName" required className={LABEL_FOCUS}>
                Full name
              </FieldLabel>
              <Input
                id="fullName"
                autoComplete="name"
                placeholder="e.g. Alex Morgan"
                aria-required="true"
                aria-invalid={errors.fullName ? true : undefined}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                {...register("fullName")}
              />
              <FieldError id="fullName-error" className="animate-nudge-in">
                {errors.fullName?.message}
              </FieldError>
            </Field>

            <Field className={FIELD_GROUP}>
              <FieldLabel htmlFor="email" required className={LABEL_FOCUS}>
                Email address
              </FieldLabel>
              <Input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-required="true"
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
              />
              <FieldError id="email-error" className="animate-nudge-in">
                {errors.email?.message}
              </FieldError>
            </Field>

            <Field className={FIELD_GROUP}>
              <FieldLabel htmlFor="phone" required className={LABEL_FOCUS}>
                Phone number
              </FieldLabel>
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="Best number to reach you"
                aria-required="true"
                aria-invalid={errors.phone ? true : undefined}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                {...register("phone")}
              />
              <FieldError id="phone-error" className="animate-nudge-in">
                {errors.phone?.message}
              </FieldError>
            </Field>
          </div>
        </div>

        {/* Section 2: Move Locations & Timeline */}
        <div className={PANEL} style={{ animationDelay: "40ms" }}>
          <div className="flex items-center gap-2.5">
            <span
              className="flex size-6 shrink-0 items-center justify-center rounded-md bg-navy-900 font-display text-[11px] font-semibold tabular-nums text-white"
              aria-hidden="true"
            >
              2
            </span>
            <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-navy-900">
              Locations &amp; date
            </h3>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field className={FIELD_GROUP}>
              <FieldLabel htmlFor="movingFrom" required className={LABEL_FOCUS}>
                Moving from
              </FieldLabel>
              <Input
                id="movingFrom"
                autoComplete="postal-code"
                placeholder="Postcode or collection address"
                aria-required="true"
                aria-invalid={errors.movingFrom ? true : undefined}
                aria-describedby={
                  errors.movingFrom ? "movingFrom-error" : undefined
                }
                {...register("movingFrom")}
              />
              <FieldError id="movingFrom-error" className="animate-nudge-in">
                {errors.movingFrom?.message}
              </FieldError>
            </Field>

            <Field className={FIELD_GROUP}>
              <FieldLabel htmlFor="movingTo" required className={LABEL_FOCUS}>
                Moving to
              </FieldLabel>
              <Input
                id="movingTo"
                autoComplete="postal-code"
                placeholder="Postcode or destination address"
                aria-required="true"
                aria-invalid={errors.movingTo ? true : undefined}
                aria-describedby={
                  errors.movingTo ? "movingTo-error" : undefined
                }
                {...register("movingTo")}
              />
              <FieldError id="movingTo-error" className="animate-nudge-in">
                {errors.movingTo?.message}
              </FieldError>
            </Field>

            <Field className={FIELD_GROUP}>
              <FieldLabel htmlFor="movingDate" required className={LABEL_FOCUS}>
                Moving date
              </FieldLabel>
              <Controller
                control={control}
                name="movingDate"
                render={({ field }) => (
                  <DatePicker
                    id="movingDate"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select your moving date"
                    minDate={today}
                    invalid={Boolean(errors.movingDate)}
                    aria-describedby={
                      errors.movingDate
                        ? "movingDate-hint movingDate-error"
                        : "movingDate-hint"
                    }
                  />
                )}
              />
              <FieldHint id="movingDate-hint">
                Choose a date from today onwards. Availability confirmed in
                writing.
              </FieldHint>
              <FieldError id="movingDate-error" className="animate-nudge-in">
                {errors.movingDate?.message}
              </FieldError>
            </Field>

            <Field className={FIELD_GROUP}>
              <FieldLabel htmlFor="distanceTier" className={LABEL_FOCUS}>
                Estimated distance
                <OptionalTag />
              </FieldLabel>
              <Controller
                control={control}
                name="distanceTier"
                render={({ field }) => (
                  <Select
                    value={field.value ?? "local"}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="distanceTier">
                      <SelectValue placeholder="Choose distance" />
                    </SelectTrigger>
                    <SelectContent>
                      {DISTANCE_TIERS.map((tier) => (
                        <SelectItem key={tier.value} value={tier.value}>
                          {tier.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldHint>Helps calculate fuel and transit time.</FieldHint>
            </Field>
          </div>
        </div>

        {/* Section 3: Property Type & Access Specifications */}
        <div className={PANEL} style={{ animationDelay: "80ms" }}>
          <div className="flex items-center gap-2.5">
            <span
              className="flex size-6 shrink-0 items-center justify-center rounded-md bg-navy-900 font-display text-[11px] font-semibold tabular-nums text-white"
              aria-hidden="true"
            >
              3
            </span>
            <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-navy-900">
              Property &amp; access details
            </h3>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field className={cn(FIELD_GROUP, "sm:col-span-2")}>
              <FieldLabel htmlFor="propertyType" required className={LABEL_FOCUS}>
                Property type &amp; size
              </FieldLabel>
              <Controller
                control={control}
                name="propertyType"
                render={({ field }) => (
                  <Select
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="propertyType"
                      ref={field.ref}
                      onBlur={field.onBlur}
                      aria-required="true"
                      aria-invalid={errors.propertyType ? true : undefined}
                      aria-describedby={
                        errors.propertyType ? "propertyType-error" : undefined
                      }
                    >
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROPERTY_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError id="propertyType-error" className="animate-nudge-in">
                {errors.propertyType?.message}
              </FieldError>
            </Field>

            <Field className={FIELD_GROUP}>
              <FieldLabel htmlFor="collectionFloor" className={LABEL_FOCUS}>
                Collection access / floor
                <OptionalTag />
              </FieldLabel>
              <Controller
                control={control}
                name="collectionFloor"
                render={({ field }) => (
                  <Select
                    value={field.value ?? "ground"}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="collectionFloor">
                      <SelectValue placeholder="Access at collection" />
                    </SelectTrigger>
                    <SelectContent>
                      {FLOOR_ACCESS_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field className={FIELD_GROUP}>
              <FieldLabel htmlFor="destinationFloor" className={LABEL_FOCUS}>
                Destination access / floor
                <OptionalTag />
              </FieldLabel>
              <Controller
                control={control}
                name="destinationFloor"
                render={({ field }) => (
                  <Select
                    value={field.value ?? "ground"}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="destinationFloor">
                      <SelectValue placeholder="Access at destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {FLOOR_ACCESS_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
          </div>
        </div>

        {/* Section 4: Services Needed */}
        <Field
          className={cn(FIELD_GROUP, "animate-fade-up")}
          style={{ animationDelay: "120ms" }}
        >
          <FieldLabel id="services-label" required className={LABEL_FOCUS}>
            Services needed
          </FieldLabel>
          <Controller
            control={control}
            name="services"
            render={({ field }) => {
              const selected = field.value ?? [];

              return (
                <div
                  role="group"
                  aria-labelledby="services-label"
                  aria-describedby={
                    errors.services
                      ? "services-hint services-error"
                      : "services-hint"
                  }
                  className="grid gap-2.5 sm:grid-cols-2"
                >
                  {services.map((service) => {
                    const checked = selected.includes(service.slug);

                    return (
                      <label
                        key={service.slug}
                        htmlFor={`service-${service.slug}`}
                        className={cn(
                          "u-card u-press flex cursor-pointer items-start gap-3 rounded-lg border p-3",
                          checked
                            ? "border-navy-900/25 bg-navy-50"
                            : "border-line bg-white hover:border-navy-300 hover:bg-surface-subtle",
                        )}
                      >
                        <Checkbox
                          id={`service-${service.slug}`}
                          className="mt-0.5"
                          checked={checked}
                          onCheckedChange={(state) => {
                            const next =
                              state === true
                                ? Array.from(
                                    new Set([...selected, service.slug]),
                                  )
                                : selected.filter(
                                    (slug) => slug !== service.slug,
                                  );
                            field.onChange(next);
                          }}
                          aria-invalid={errors.services ? true : undefined}
                          aria-describedby={
                            errors.services ? "services-error" : undefined
                          }
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium leading-snug text-ink">
                            {service.navLabel}
                          </span>
                          <span className="text-xs text-ink-muted leading-tight mt-0.5">
                            {service.slug === "packing-and-loading"
                              ? "Includes cartons, tape & full packing"
                              : service.slug === "furniture-moving"
                              ? "Heavy items & dismantling/reassembly"
                              : service.slug === "property-clearance"
                              ? "Sorting & responsible eco-disposal"
                              : service.summary.slice(0, 50) + "…"}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              );
            }}
          />
          <FieldHint id="services-hint">
            Selecting services updates your live estimate breakdown instantly.
          </FieldHint>
          <FieldError id="services-error" className="animate-nudge-in">
            {errors.services?.message}
          </FieldError>
        </Field>

        {/* Section 5: Optional Move Inventory Volume Estimator */}
        <div className="animate-fade-up" style={{ animationDelay: "160ms" }}>
          <InventoryCalculator
            counts={inventoryCounts}
            onChange={setInventoryCounts}
          />
        </div>

        {/* Section 6: Additional Information & Referral */}
        <div
          className="grid animate-fade-up gap-4 sm:grid-cols-2"
          style={{ animationDelay: "200ms" }}
        >
          <Field className={cn(FIELD_GROUP, "sm:col-span-2")}>
            <FieldLabel htmlFor="additionalInfo" className={LABEL_FOCUS}>
              Special instructions or awkward items?
              <OptionalTag />
            </FieldLabel>
            <Textarea
              id="additionalInfo"
              rows={3}
              maxLength={2000}
              placeholder="Parking bay suspensions, narrow staircases, piano, safe, storage stopover…"
              aria-invalid={errors.additionalInfo ? true : undefined}
              aria-describedby={
                errors.additionalInfo
                  ? "additionalInfo-hint additionalInfo-error"
                  : "additionalInfo-hint"
              }
              {...register("additionalInfo")}
            />
            <FieldHint id="additionalInfo-hint">
              Access notes or heavy items help us verify and guarantee your
              quote.
            </FieldHint>
            <FieldError id="additionalInfo-error" className="animate-nudge-in">
              {errors.additionalInfo?.message}
            </FieldError>
          </Field>

          <Field className={cn(FIELD_GROUP, "sm:col-span-2")}>
            <FieldLabel htmlFor="referral" className={LABEL_FOCUS}>
              How did you hear about us?
              <OptionalTag />
            </FieldLabel>
            <Controller
              control={control}
              name="referral"
              render={({ field }) => (
                <Select
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="referral"
                    ref={field.ref}
                    onBlur={field.onBlur}
                    aria-invalid={errors.referral ? true : undefined}
                    aria-describedby={
                      errors.referral ? "referral-error" : undefined
                    }
                  >
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {REFERRAL_SOURCES.map((source) => (
                      <SelectItem key={source.value} value={source.value}>
                        {source.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError id="referral-error" className="animate-nudge-in">
              {errors.referral?.message}
            </FieldError>
          </Field>
        </div>

        {/* Mobile / Inline Live Estimate Banner */}
        <div
          className="animate-fade-up rounded-xl border border-royal-200 bg-royal-50/80 p-4 lg:hidden"
          style={{ animationDelay: "240ms" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-royal-800">
              Your live estimate
            </span>
            <span className="font-display text-xl font-bold tabular-nums text-navy-950">
              £
              <AnimatedNumber
                value={currentEstimate.minPrice}
                format={formatAmount}
                duration={0.45}
              />{" "}
              – £
              <AnimatedNumber
                value={currentEstimate.maxPrice}
                format={formatAmount}
                duration={0.45}
              />
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-soft">
            <span className="inline-flex items-center gap-1">
              <Truck className="size-3 text-royal-700" aria-hidden="true" />
              {currentEstimate.recommendedVehicle}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="size-3 text-royal-700" aria-hidden="true" />
              {currentEstimate.recommendedCrew}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3 text-royal-700" aria-hidden="true" />
              {currentEstimate.estimatedHours}
            </span>
          </div>
        </div>

        {/* Form Footer */}
        <div className="flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xs text-sm leading-relaxed text-ink-muted">
            We use your details only to prepare and discuss your quote. They are
            never added to marketing lists.
          </p>
          <Button
            type="submit"
            variant="accent"
            size="lg"
            loading={isSubmitting}
            loadingText="Sending your request…"
            className="w-full shrink-0 sm:w-auto"
          >
            Request my quote
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </form>
    </section>
  );
}
