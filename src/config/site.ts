/**
 * Single source of truth for brand + business information.
 *
 * IMPORTANT — honesty policy:
 * Every value here is either provided by the business or intentionally empty.
 * The UI only renders a contact channel when it is configured, so the site
 * never displays invented phone numbers, addresses, statistics or claims.
 * Fill the empty values in `.env.local` (see `.env.example`) to switch the
 * corresponding UI on.
 */

const env = {
  phone: process.env.NEXT_PUBLIC_PHONE || "07386 502 195",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "07386 502 195",
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ?? "",
  hours: process.env.NEXT_PUBLIC_BUSINESS_HOURS ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://primehouseremovals.co.uk",
};

export const siteConfig = {
  name: "Prime House Removals",
  shortName: "Prime House",
  legalName: "Prime House Removals",
  tagline: "Moving Made Simple. Removals You Can Rely On.",
  description:
    "Prime House Removals provides house, office and commercial removals, packing, furniture transport and property clearance. Request a free, no obligation quote for your move.",
  url: env.siteUrl,
  locale: "en_GB",
  contact: {
    phone: env.phone,
    email: env.email,
    whatsapp: env.whatsapp,
    address: env.address,
    hours: env.hours,
  },
  /** Coverage is confirmed at quote stage — no invented service-area claims. */
  coverage: {
    headline: "Coverage confirmed before you book",
    description:
      "Tell us the postcodes at each end of your move and we will confirm availability, crew size and timing in your written quote. Local moves, long distance moves and moves with storage in between are all quoted individually.",
    notes: [
      "Local and regional moves quoted individually",
      "Long distance and single item moves available on request",
      "Timing confirmed in writing before you commit",
    ],
  },
} as const;

/** True when at least one direct contact channel is configured. */
export const hasDirectContact = Boolean(
  env.phone || env.email || env.whatsapp || env.address || env.hours,
);

export const hasPhone = Boolean(env.phone);
export const hasEmail = Boolean(env.email);
export const hasWhatsApp = Boolean(env.whatsapp);
export const hasAddress = Boolean(env.address);
export const hasHours = Boolean(env.hours);

/** Primary navigation — mirrors the site architecture. */
export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Calculator", href: "/calculator" },
  { label: "Checklist", href: "/checklist" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  company: [
    { label: "About us", href: "/about" },
    { label: "Our services", href: "/services" },
    { label: "Cost calculator", href: "/calculator" },
    { label: "Moving checklist", href: "/checklist" },
    { label: "Get a live quote", href: "/quote" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "House removals", href: "/services/house-removals" },
    { label: "Office relocations", href: "/services/office-relocations" },
    { label: "Packing & loading", href: "/services/packing-and-loading" },
    { label: "Furniture moving", href: "/services/furniture-moving" },
    { label: "Property clearance", href: "/services/property-clearance" },
  ],
} as const;
