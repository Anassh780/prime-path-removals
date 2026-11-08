import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a UK phone number for display while keeping the tel: href machine-safe. */
export function formatPhoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function formatWhatsAppHref(phone: string, message?: string) {
  const digits = phone.replace(/[^\d]/g, "");
  const internationalDigits = digits.startsWith("0") ? `44${digits.slice(1)}` : digits;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${internationalDigits}${text}`;
}

/** Human-readable date, e.g. "14 March 2026". */
export function formatDate(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
