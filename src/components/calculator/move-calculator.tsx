"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Building,
  Check,
  Clock,
  PackagePlus,
  Phone,
  RotateCcw,
  Route,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";

import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import { AnimatedNumber } from "@/components/shared/animated-number";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  calculateQuoteEstimate,
  DISTANCE_TIERS,
  FLOOR_ACCESS_OPTIONS,
  INVENTORY_ITEMS,
  type DistanceTier,
  type FloorAccess,
  type InventoryCounts,
  type InventoryItemKey,
} from "@/lib/quote-pricing";
import { PROPERTY_TYPES, type PropertyType } from "@/lib/validations/quote";
import { cn, formatPhoneHref, formatWhatsAppHref } from "@/lib/utils";
import { hasPhone, hasWhatsApp, siteConfig } from "@/config/site";

/** Every figure in the calculator is a whole number (pounds or cubic feet). */
const formatWholeNumber = (value: number) => String(Math.round(value));

export function MoveCalculator() {
  const [propertyType, setPropertyType] =
    React.useState<PropertyType>("house-1-2");
  const [distanceTier, setDistanceTier] = React.useState<DistanceTier>("local");
  const [collectionFloor, setCollectionFloor] =
    React.useState<FloorAccess>("ground");
  const [destinationFloor, setDestinationFloor] =
    React.useState<FloorAccess>("ground");
  const [includePacking, setIncludePacking] = React.useState(false);
  const [includeDismantling, setIncludeDismantling] = React.useState(false);
  const [includeClearance, setIncludeClearance] = React.useState(false);
  const [inventoryCounts, setInventoryCounts] = React.useState<InventoryCounts>(
    {},
  );
  const [activeTab, setActiveTab] = React.useState<"property" | "inventory">(
    "property",
  );
  // Panel transitions play only after a real tab switch, so the panel never
  // receives a second entrance on top of the route transition.
  const [panelAnimated, setPanelAnimated] = React.useState(false);

  const selectedServices = React.useMemo(() => {
    const list = ["house-removals"];
    if (includePacking) list.push("packing-and-loading");
    if (includeDismantling) list.push("furniture-moving");
    if (includeClearance) list.push("property-clearance");
    return list;
  }, [includePacking, includeDismantling, includeClearance]);

  const estimate = React.useMemo(() => {
    return calculateQuoteEstimate({
      propertyType,
      services: selectedServices,
      distanceTier,
      collectionFloor,
      destinationFloor,
      inventoryCounts,
    });
  }, [
    propertyType,
    selectedServices,
    distanceTier,
    collectionFloor,
    destinationFloor,
    inventoryCounts,
  ]);

  const totalInventoryCount = Object.values(inventoryCounts).reduce(
    (acc, val) => acc + (val ?? 0),
    0,
  );

  function updateInventoryItem(key: InventoryItemKey, delta: number) {
    const current = inventoryCounts[key] ?? 0;
    setInventoryCounts({
      ...inventoryCounts,
      [key]: Math.max(0, current + delta),
    });
  }

  function handleReset() {
    setPropertyType("house-1-2");
    setDistanceTier("local");
    setCollectionFloor("ground");
    setDestinationFloor("ground");
    setIncludePacking(false);
    setIncludeDismantling(false);
    setIncludeClearance(false);
    setInventoryCounts({});
  }

  const quoteHref = React.useMemo(() => {
    const params = new URLSearchParams();
    params.set("propertyType", propertyType);
    params.set("distance", distanceTier);
    if (includePacking) params.set("service", "packing-and-loading");
    return `/quote?${params.toString()}`;
  }, [propertyType, distanceTier, includePacking]);

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      {/* Configuration Column */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        {/* Step 1: Mode selector (Property vs Itemised Inventory) */}
        <div className="rounded-xl border border-line bg-white p-5 shadow-card sm:p-6">
          <div className="flex flex-col gap-4 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span
                className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-royal-200 bg-royal-50 text-royal-700"
                aria-hidden="true"
              >
                <Boxes className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-semibold text-ink">
                  1. What are you moving?
                </h2>
                <p className="mt-0.5 text-xs text-ink-muted">
                  Choose standard property size or itemise your specific furniture.
                </p>
              </div>
            </div>

            <div className="flex rounded-lg border border-line bg-surface-subtle p-1 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("property");
                  setPanelAnimated(true);
                }}
                aria-pressed={activeTab === "property"}
                className={cn(
                  "u-card rounded-md px-3 py-1 text-xs font-medium active:translate-y-px",
                  activeTab === "property"
                    ? "bg-white text-navy-950 shadow-xs"
                    : "text-ink-muted hover:text-ink",
                )}
              >
                Property type
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("inventory");
                  setPanelAnimated(true);
                }}
                aria-pressed={activeTab === "inventory"}
                className={cn(
                  "u-card rounded-md px-3 py-1 text-xs font-medium active:translate-y-px",
                  activeTab === "inventory"
                    ? "bg-white text-navy-950 shadow-xs"
                    : "text-ink-muted hover:text-ink",
                )}
              >
                Item inventory {totalInventoryCount > 0 && `(${totalInventoryCount})`}
              </button>
            </div>
          </div>

          <div className="mt-4">
            <div
              key={activeTab}
              className={panelAnimated ? "animate-scale-in" : undefined}
            >
              {activeTab === "property" ? (
                <div className="grid gap-2 sm:grid-cols-2">
                  {PROPERTY_TYPES.map((type) => {
                    const isSelected = propertyType === type.value;
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setPropertyType(type.value)}
                        aria-pressed={isSelected}
                        className={cn(
                          "u-card flex items-center justify-between rounded-lg border p-3 text-left active:translate-y-px",
                          isSelected
                            ? "border-royal-600 bg-royal-50/70 text-navy-950 ring-1 ring-royal-600"
                            : "border-line bg-surface-subtle text-ink-soft hover:border-line-strong hover:bg-white",
                        )}
                      >
                        <span className="text-xs font-medium">{type.label}</span>
                        {isSelected && (
                          <span className="animate-pop-in flex size-4 shrink-0 items-center justify-center rounded-full bg-royal-700 text-white">
                            <Check className="size-2.5" aria-hidden="true" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <p className="text-xs text-ink-muted">
                    Add large furniture and box quantities to calculate your exact
                    moving volume:
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {INVENTORY_ITEMS.map((item) => {
                      const count = inventoryCounts[item.key] ?? 0;
                      return (
                        <div
                          key={item.key}
                          className={cn(
                            "u-card flex items-center justify-between rounded-lg border p-2.5",
                            count > 0
                              ? "border-royal-600/40 bg-white"
                              : "border-line bg-surface-subtle",
                          )}
                        >
                          <div className="min-w-0 pr-2">
                            <span className="block truncate text-xs font-medium text-ink">
                              {item.label}
                            </span>
                            <span className="block text-[11px] text-ink-muted">
                              ~{item.cuFt} cu ft
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              disabled={count === 0}
                              onClick={() => updateInventoryItem(item.key, -1)}
                              aria-label={`Decrease ${item.label}`}
                              className="u-card flex size-6 items-center justify-center rounded border border-line bg-white text-ink text-xs hover:border-line-strong hover:bg-surface-subtle active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              -
                            </button>
                            <span className="w-5 text-center text-xs font-semibold tabular-nums">
                              {count}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateInventoryItem(item.key, 1)}
                              aria-label={`Increase ${item.label}`}
                              className="u-card flex size-6 items-center justify-center rounded border border-line bg-white text-ink text-xs hover:border-line-strong hover:bg-surface-subtle active:translate-y-px"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step 2: Distance Tier */}
        <div className="rounded-xl border border-line bg-white p-5 shadow-card sm:p-6">
          <div className="flex items-start gap-3">
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-royal-200 bg-royal-50 text-royal-700"
              aria-hidden="true"
            >
              <Route className="size-5" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-ink">
                2. Estimated moving distance
              </h2>
              <p className="mt-0.5 text-xs text-ink-muted">
                Distance between collection and delivery addresses.
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {DISTANCE_TIERS.map((tier) => {
              const isSelected = distanceTier === tier.value;
              return (
                <button
                  key={tier.value}
                  type="button"
                  onClick={() => setDistanceTier(tier.value)}
                  aria-pressed={isSelected}
                  className={cn(
                    "u-card flex flex-col rounded-lg border p-3 text-left active:translate-y-px",
                    isSelected
                      ? "border-royal-600 bg-royal-50/70 text-navy-950 ring-1 ring-royal-600"
                      : "border-line bg-surface-subtle text-ink-soft hover:border-line-strong hover:bg-white",
                  )}
                >
                  <span className="text-xs font-semibold text-ink">
                    {tier.label}
                  </span>
                  <span className="mt-0.5 text-[11px] text-ink-muted">
                    {tier.extraMin === 0
                      ? "Included in base price"
                      : `+£${tier.extraMin} – £${tier.extraMax} transit allowance`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Access & Stairs */}
        <div className="rounded-xl border border-line bg-white p-5 shadow-card sm:p-6">
          <div className="flex items-start gap-3">
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-royal-200 bg-royal-50 text-royal-700"
              aria-hidden="true"
            >
              <Building className="size-5" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-ink">
                3. Property access &amp; floor levels
              </h2>
              <p className="mt-0.5 text-xs text-ink-muted">
                Stairs and lift availability affect carrying time and crew sizing.
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="collection-floor"
                className="block text-xs font-medium text-ink mb-1.5"
              >
                Collection property access
              </label>
              <Select
                value={collectionFloor}
                onValueChange={(value) =>
                  setCollectionFloor(value as FloorAccess)
                }
              >
                <SelectTrigger id="collection-floor" className="h-10 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FLOOR_ACCESS_OPTIONS.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="text-xs"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label
                htmlFor="destination-floor"
                className="block text-xs font-medium text-ink mb-1.5"
              >
                Destination property access
              </label>
              <Select
                value={destinationFloor}
                onValueChange={(value) =>
                  setDestinationFloor(value as FloorAccess)
                }
              >
                <SelectTrigger id="destination-floor" className="h-10 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FLOOR_ACCESS_OPTIONS.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="text-xs"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Step 4: Optional Add-on Services */}
        <div className="rounded-xl border border-line bg-white p-5 shadow-card sm:p-6">
          <div className="flex items-start gap-3">
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-royal-200 bg-royal-50 text-royal-700"
              aria-hidden="true"
            >
              <PackagePlus className="size-5" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-ink">
                4. Additional moving services
              </h2>
              <p className="mt-0.5 text-xs text-ink-muted">
                Add packing, furniture assembly, or clearance to your live estimate.
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2.5">
            <label
              className={cn(
                "u-card flex cursor-pointer items-start gap-3 rounded-lg border p-3",
                includePacking
                  ? "border-royal-600 bg-royal-50/70"
                  : "border-line bg-surface-subtle hover:bg-white",
              )}
            >
              <Checkbox
                checked={includePacking}
                onCheckedChange={(c) => setIncludePacking(c === true)}
                className="mt-0.5 [&>span]:animate-pop-in"
              />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-ink">
                  Full packing service &amp; protective materials
                </span>
                <span className="text-[11px] text-ink-muted">
                  Double-walled cartons, bubble wrap, wardrobe boxes, packing tape &amp; professional packing crew.
                </span>
              </div>
            </label>

            <label
              className={cn(
                "u-card flex cursor-pointer items-start gap-3 rounded-lg border p-3",
                includeDismantling
                  ? "border-royal-600 bg-royal-50/70"
                  : "border-line bg-surface-subtle hover:bg-white",
              )}
            >
              <Checkbox
                checked={includeDismantling}
                onCheckedChange={(c) => setIncludeDismantling(c === true)}
                className="mt-0.5 [&>span]:animate-pop-in"
              />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-ink">
                  Furniture dismantling &amp; reassembly
                </span>
                <span className="text-[11px] text-ink-muted">
                  Beds, wardrobes and large tables taken down and reassembled in your new home.
                </span>
              </div>
            </label>

            <label
              className={cn(
                "u-card flex cursor-pointer items-start gap-3 rounded-lg border p-3",
                includeClearance
                  ? "border-royal-600 bg-royal-50/70"
                  : "border-line bg-surface-subtle hover:bg-white",
              )}
            >
              <Checkbox
                checked={includeClearance}
                onCheckedChange={(c) => setIncludeClearance(c === true)}
                className="mt-0.5 [&>span]:animate-pop-in"
              />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-ink">
                  Property clearance / unwanted item removal
                </span>
                <span className="text-[11px] text-ink-muted">
                  Responsible eco-disposal, recycling sorting and licensed clearance.
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Live Quote Summary Column */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-24 flex flex-col gap-5">
          <div className="overflow-hidden rounded-2xl border border-royal-200 bg-royal-50 p-5 shadow-card sm:p-6">
            {/* Dark rail header — this panel is the page's focal point. */}
            <div className="-mx-5 -mt-5 mb-5 flex items-center justify-between gap-3 bg-navy-950 px-5 py-4 sm:-mx-6 sm:-mt-6 sm:px-6">
              <div className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full bg-accent-300"
                  aria-hidden="true"
                />
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                  Live Price Estimate
                </span>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="u-card -my-1 flex shrink-0 items-center gap-1 py-1 text-[11px] font-medium text-navy-300 hover:text-white active:translate-y-px"
              >
                <RotateCcw className="size-3" />
                Reset
              </button>
            </div>

            <div>
              <span
                className="block font-display text-4xl font-semibold leading-none tracking-[-0.03em] text-navy-950 tabular-nums sm:text-5xl"
                aria-hidden="true"
              >
                £
                <AnimatedNumber
                  value={estimate.minPrice}
                  format={formatWholeNumber}
                />{" "}
                – £<AnimatedNumber value={estimate.maxPrice} format={formatWholeNumber} />
              </span>
              {/* The animated figure is decorative; the exact value is announced
                  here so assistive tech never hears intermediate numbers. */}
              <span className="sr-only" aria-live="polite" aria-atomic="true">
                Estimated price {estimate.priceFormatted}
              </span>
              <span className="mt-2.5 block text-xs text-ink-soft">
                Indicative guidance price inc. VAT &amp; standard equipment.
              </span>
            </div>

            {/* Spec tags */}
            <div className="mt-5 grid grid-cols-2 gap-2 border-t border-royal-200 pt-4 text-xs">
              <div className="rounded-lg border border-royal-100 bg-white p-2.5">
                <div className="flex items-center gap-1.5 text-royal-700 font-semibold">
                  <Truck className="size-3.5" />
                  Vehicle
                </div>
                <span className="mt-1 block text-[11px] font-medium text-ink truncate" title={estimate.recommendedVehicle}>
                  {estimate.recommendedVehicle}
                </span>
              </div>

              <div className="rounded-lg border border-royal-100 bg-white p-2.5">
                <div className="flex items-center gap-1.5 text-royal-700 font-semibold">
                  <Users className="size-3.5" />
                  Moving crew
                </div>
                <span className="mt-1 block text-[11px] font-medium text-ink truncate" title={estimate.recommendedCrew}>
                  {estimate.recommendedCrew}
                </span>
              </div>

              <div className="rounded-lg border border-royal-100 bg-white p-2.5">
                <div className="flex items-center gap-1.5 text-royal-700 font-semibold">
                  <Clock className="size-3.5" />
                  Est. duration
                </div>
                <span className="mt-1 block text-[11px] font-medium text-ink">
                  {estimate.estimatedHours}
                </span>
              </div>

              <div className="rounded-lg border border-royal-100 bg-white p-2.5">
                <div className="flex items-center gap-1.5 text-royal-700 font-semibold">
                  <Boxes className="size-3.5" />
                  Est. volume
                </div>
                <span className="mt-1 block text-[11px] font-medium text-ink tabular-nums">
                  ~<AnimatedNumber
                    value={estimate.volumeCuFt}
                    format={formatWholeNumber}
                  />{" "}
                  cu ft
                </span>
              </div>
            </div>

            {/* Itemised Breakdown */}
            <div className="mt-5 border-t border-royal-200 pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-royal-700">
                Itemised estimate breakdown
              </h3>
              <ul className="mt-2.5 flex flex-col gap-2 rounded-lg border border-royal-100 bg-white p-3">
                {estimate.breakdown.map((item) => (
                  <li key={item.label} className="flex flex-col gap-0.5 border-b border-line/40 pb-2 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-ink">{item.label}</span>
                      <span className="font-semibold tabular-nums text-navy-950">
                        {item.amount}
                      </span>
                    </div>
                    {item.detail && (
                      <span className="text-[11px] text-ink-muted leading-tight">
                        {item.detail}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA to lock in quote */}
            <div className="mt-6 border-t border-royal-200 pt-5">
              <Button asChild variant="accent" size="lg" className="w-full">
                <Link href={quoteHref}>
                  Lock in this quote &amp; choose date
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <p className="mt-2.5 text-center text-xs leading-relaxed text-ink-soft">
                Transfers these specifications directly into your quote request.
              </p>

              {(hasPhone || hasWhatsApp) && (
                <div className="mt-4 flex flex-col gap-2 rounded-lg border border-royal-200 bg-white p-3 text-xs text-ink-soft">
                  <span className="font-semibold text-ink">Prefer to book directly?</span>
                  <div className="flex flex-wrap items-center gap-3">
                    {hasPhone && (
                      <a
                        href={formatPhoneHref(siteConfig.contact.phone)}
                        className="-my-1 inline-flex items-center gap-1.5 py-1 font-medium text-royal-700 hover:underline"
                      >
                        <Phone className="size-3.5 text-royal-700" aria-hidden="true" />
                        Call {siteConfig.contact.phone}
                      </a>
                    )}
                    {hasWhatsApp && (
                      <a
                        href={formatWhatsAppHref(
                          siteConfig.contact.whatsapp,
                          `Hello Prime House Removals, I calculated a quote for a ${propertyType} move and would like to book.`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="-my-1 inline-flex items-center gap-1.5 py-1 font-medium text-emerald-700 hover:underline"
                      >
                        <WhatsAppIcon className="size-3.5 text-emerald-600" aria-hidden="true" />
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pricing Factors Explanation Card */}
          <div className="rounded-xl border border-line bg-white p-5 text-xs shadow-card">
            <div className="flex items-center gap-2 text-ink font-semibold">
              <ShieldCheck className="size-4 text-royal-700" />
              How we calculate removals pricing
            </div>
            <ul className="mt-3 flex flex-col gap-2 text-ink-soft">
              <li className="flex items-start gap-2">
                <span className="size-1.5 rounded-full bg-royal-600 mt-1.5 shrink-0" />
                <span>
                  <strong>Volume &amp; van capacity:</strong> We match the correct vehicle so all items travel safely in a single trip without overloading.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="size-1.5 rounded-full bg-royal-600 mt-1.5 shrink-0" />
                <span>
                  <strong>Crew sizing:</strong> Multiple movers ensure safe lifting of heavy items and speed up loading and unloading.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="size-1.5 rounded-full bg-royal-600 mt-1.5 shrink-0" />
                <span>
                  <strong>Guaranteed written quote:</strong> Our online calculator provides transparent instant guidance; your written quote fixes the price before booking.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
