import { startOfDay } from "date-fns";
import { z } from "zod";

import { services } from "@/content/services";

/**
 * Single source of truth for the quote form.
 *
 * The same schema validates the browser form (React Hook Form + zodResolver)
 * and the API payload in `src/app/api/quote/route.ts`, so the two can never
 * drift apart. Option labels live here too so the form and server agree on
 * exactly which values are accepted.
 */

export const PROPERTY_TYPES = [
  { value: "studio-flat", label: "Studio or flat" },
  { value: "house-1-2", label: "1 to 2 bedroom house" },
  { value: "house-3-4", label: "3 to 4 bedroom house" },
  { value: "house-5-plus", label: "5+ bedroom house" },
  { value: "office-commercial", label: "Office or commercial premises" },
  { value: "warehouse-industrial", label: "Warehouse or industrial unit" },
  { value: "other", label: "Other" },
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number]["value"];

const propertyTypeValues = PROPERTY_TYPES.map((type) => type.value) as [
  PropertyType,
  ...PropertyType[],
];

export const REFERRAL_SOURCES = [
  { value: "search", label: "Search engine" },
  { value: "recommendation", label: "Recommendation or word of mouth" },
  { value: "social", label: "Social media" },
  { value: "advertising", label: "Local advertising" },
  { value: "returning", label: "Used Prime House before" },
  { value: "other", label: "Other" },
] as const;

export type ReferralSource = (typeof REFERRAL_SOURCES)[number]["value"];

const referralValues = REFERRAL_SOURCES.map((source) => source.value) as [
  ReferralSource,
  ...ReferralSource[],
];

const serviceSlugSet = new Set(services.map((service) => service.slug));

export const quoteFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(120, "Please keep your name under 120 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .pipe(z.email("Enter a valid email address.")),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a contact number we can reach you on.")
    .max(30, "Please keep your phone number under 30 characters.")
    .regex(/^[+()\d\s-]+$/, "Enter a valid phone number."),
  movingFrom: z
    .string()
    .trim()
    .min(2, "Enter the postcode or address you are moving from.")
    .max(160, "Please keep this under 160 characters."),
  movingTo: z
    .string()
    .trim()
    .min(2, "Enter the postcode or address you are moving to.")
    .max(160, "Please keep this under 160 characters."),
  movingDate: z
    .date("Choose your moving date.")
    .refine(
      (date) => date.getTime() >= startOfDay(new Date()).getTime(),
      "Choose today or a later date.",
    ),
  propertyType: z.enum(propertyTypeValues, "Choose the property type."),
  services: z
    .array(z.string().trim().min(1))
    .min(1, "Select at least one service.")
    .refine(
      (values) => values.every((value) => serviceSlugSet.has(value)),
      "Select a valid service.",
    ),
  additionalInfo: z
    .string()
    .trim()
    .max(2000, "Please keep this under 2,000 characters.")
    .optional(),
  referral: z.enum(referralValues, "Choose an option from the list.").optional(),
  distanceTier: z
    .enum(["local", "regional", "long-distance", "nationwide"])
    .optional(),
  collectionFloor: z
    .enum(["ground", "lift", "stairs-1-2", "stairs-3-plus"])
    .optional(),
  destinationFloor: z
    .enum(["ground", "lift", "stairs-1-2", "stairs-3-plus"])
    .optional(),
  inventorySummary: z
    .string()
    .trim()
    .max(1000, "Please keep this under 1,000 characters.")
    .optional(),
  estimatedPriceRange: z
    .string()
    .trim()
    .max(100, "Please keep this under 100 characters.")
    .optional(),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;

/**
 * The browser sends the moving date as a plain calendar date (`YYYY-MM-DD`),
 * so the API rehydrates it before running the exact same schema. Sending a
 * calendar date rather than an ISO timestamp keeps the stored date correct
 * regardless of the timezone the server runs in.
 */
export function parseQuotePayload(payload: unknown) {
  if (payload === null || typeof payload !== "object" || Array.isArray(payload)) {
    return quoteFormSchema.safeParse(payload);
  }

  const record = payload as Record<string, unknown>;
  const rawDate = record.movingDate;
  let movingDate = rawDate;

  if (typeof rawDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
    movingDate = new Date(`${rawDate}T00:00:00`);
  } else if (typeof rawDate === "string" || typeof rawDate === "number") {
    movingDate = new Date(rawDate);
  }

  return quoteFormSchema.safeParse({ ...record, movingDate });
}
