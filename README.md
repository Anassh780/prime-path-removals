# Prime House Removals

The marketing website for Prime House Removals, a UK removals business offering
house, office, warehouse, furniture, packing, waste and property-clearance
services.

The site is a server-rendered Next.js 16 application with a small, honest
backend: quote requests and contact messages are validated on the server and
stored in Supabase when it is configured. There is no CMS, no authentication, no
ecommerce and no analytics.

The design and engineering rules that govern the codebase are in
[AGENTS.md](AGENTS.md). Read that before changing anything — it is the binding
contract for design tokens, shared component APIs, copy rules and file
ownership.

---

## Contents

- [What is in the site](#what-is-in-the-site)
- [Stack](#stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Supabase setup](#supabase-setup)
- [Project structure](#project-structure)
- [Routes](#routes)
- [Design and content integrity](#design-and-content-integrity)
- [Design system](#design-system)
- [SEO and metadata](#seo-and-metadata)
- [Deployment](#deployment)
- [Working on the codebase](#working-on-the-codebase)

---

## What is in the site

- **Home** — hero, service overview, process, customer-feedback empty state,
  coverage checker, FAQs and a closing call to action.
- **Services** — an index page plus seven service detail pages generated from a
  single content source.
- **About** — how the company works, its values and what customers can expect.
- **Quote** — a validated multi-field request form with a server-side API route.
- **Contact** — conditional contact channels and a validated enquiry form.
- **Platform files** — sitemap, robots, generated Open Graph image, web app
  manifest, favicon and designed 404/error states.

The forms are real. When the backend is not configured the API returns `503`
and the UI shows the error it received; the site never displays a fake
confirmation. See [Design and content integrity](#design-and-content-integrity).

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, React Server Components) |
| Runtime UI | React 19 |
| Language | TypeScript 5, `strict` mode |
| Styling | Tailwind CSS v4 — tokens live in `src/app/globals.css`, there is no `tailwind.config` |
| Components | shadcn/ui-style primitives on Radix (`src/components/ui/*`) |
| Motion | Motion for React (`motion/react`), reduced-motion aware |
| Icons | `lucide-react` only |
| Forms | React Hook Form + Zod |
| Toasts | Sonner |
| Persistence | Supabase, server-side only (`@supabase/supabase-js`) |
| Email (optional) | Resend REST API, called from `src/lib/leads.ts` |
| QA harness | Playwright scripts in `qa/` |

Dependencies are deliberately fixed: the project does not accept new packages
without a clear need. Everything listed above is already installed.

---

## Getting started

Requirements: **Node.js 20.9 or newer** (`next@16` declares `>=20.9.0`) and npm
10+. Node 22 LTS is recommended.

```bash
# install dependencies from the committed lockfile
npm install

# start the development server on http://localhost:3000
npm run dev
```

On Windows the same commands work with `npm.cmd`:

```bash
npm.cmd run dev
npm.cmd run typecheck
```

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the Next.js development server. |
| `npm run build` | Production build. Do not run this while `dev` is running — both write to `.next`. |
| `npm run start` | Serves the production build (run `build` first). |
| `npm run lint` | ESLint over the repository. |
| `npm run typecheck` | `tsc --noEmit`. The fastest correctness check during development. |
| `npm run shots` | Runs the Playwright QA harness in `qa/` against a running server. See `qa/` for the script and its output. |

The site builds and runs with **no environment variables at all**. Supabase,
Resend and the optional contact details are all switched on by configuration,
not required for a successful build.

---

## Environment variables

Copy `.env.example` to `.env.local` for local development. `.env.local` is
ignored by Git; never commit real keys.

| Variable | Required | Used by | Notes |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | `src/config/site.ts`, `src/lib/seo.ts` | Canonical origin with no trailing slash. Defaults to `https://primehouseremovals.co.uk` in code. Drives canonical links, Open Graph URLs, `sitemap.xml` and `robots.txt`. |
| `NEXT_PUBLIC_PHONE` | Optional | Header, footer, contact page | Phone channel is hidden unless set. |
| `NEXT_PUBLIC_EMAIL` | Optional | Header, footer, contact page | Email channel is hidden unless set. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional | Contact page | WhatsApp channel is hidden unless set. Digits with country code. |
| `NEXT_PUBLIC_BUSINESS_ADDRESS` | Optional | Footer, contact page | Address block is hidden unless set. |
| `NEXT_PUBLIC_BUSINESS_HOURS` | Optional | Footer, contact page | Opening hours are hidden unless set. |
| `NEXT_PUBLIC_SUPABASE_URL` | Optional | API routes | Supabase project URL. Storage is off when unset. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Optional | API routes | Fallback key when the service-role key is absent. |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional, recommended | API routes | Server-only. Bypasses row-level security; never expose it to the browser and never prefix it with `NEXT_PUBLIC_`. |
| `RESEND_API_KEY` | Optional | `src/lib/leads.ts` | Enables email notifications. Submissions are still stored without it. |
| `QUOTE_NOTIFICATION_EMAIL` | Optional | `src/lib/leads.ts` | Where notification emails are sent. No email is sent unless this and the API key are set. |
| `RESEND_FROM_EMAIL` | Optional | `src/lib/leads.ts` | Verified sender address in Resend. Defaults to `quotes@primehouseremovals.co.uk`. |

`NEXT_PUBLIC_*` values are inlined into the browser bundle. Never put a secret
in one.

### What happens when a variable is missing

- **No contact details** — every contact channel is hidden and the UI shows a
  short, honest note that direct details are being finalised, with the contact
  form as the route to take. No phone number, email or address is invented.
- **No Supabase** — `POST /api/quote` and `POST /api/contact` return `503` with
  a plain explanation; the form shows that message and keeps the entered data.
- **No Resend** — submissions are stored only. A failed notification email
  never fails the submission.

---

## Supabase setup

Both form endpoints write through `storeLead()` in `src/lib/leads.ts`. The API
routes validate the submission with the shared Zod schema, map it to the payload
keys below, and `storeLead()` inserts that object as-is, adding the system
fields (`kind`, `reference`, `status`, `created_at`) and returning the generated
reference (`PHR-Q-…` for quotes, `PHR-C-…` for contact messages).

Because the payload is inserted directly, **each database column name must match
the payload key used in the API route** (`src/app/api/quote/route.ts` and
`src/app/api/contact/route.ts`). The schema below reflects the current keys; if
you rename a payload field, rename the column in the same change.

Run this in the Supabase SQL editor:

```sql
-- ---------------------------------------------------------------------------
-- Prime House Removals — enquiry storage
-- Column names mirror the validated payloads inserted by src/lib/leads.ts.
-- Row-level security is enabled with no public policies: only the server-side
-- service-role key can read or write these tables.
-- ---------------------------------------------------------------------------

create extension if not exists "pgcrypto";

-- Quote requests -----------------------------------------------------------
create table if not exists public.quote_requests (
  id              uuid primary key default gen_random_uuid(),
  reference       text        not null unique,
  status          text        not null default 'new',
  kind            text        not null default 'quote',
  full_name       text        not null,
  email           text        not null,
  phone           text        not null,
  moving_from     text        not null,
  moving_to       text        not null,
  moving_date     date        not null,
  property_type   text        not null
    check (property_type in (
      'studio-flat', 'house-1-2', 'house-3-4', 'house-5-plus',
      'office-commercial', 'warehouse-industrial', 'other'
    )),
  services        text[]      not null
    check (cardinality(services) >= 1),
  additional_info text,
  referral_source text
    check (referral_source is null or referral_source in (
      'search', 'recommendation', 'social', 'advertising', 'returning', 'other'
    )),
  created_at      timestamptz not null default now()
);

create index if not exists quote_requests_created_at_idx
  on public.quote_requests (created_at desc);

create index if not exists quote_requests_status_idx
  on public.quote_requests (status);

-- Contact messages ---------------------------------------------------------
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  reference   text        not null unique,
  status      text        not null default 'new',
  kind        text        not null default 'contact',
  name        text        not null,
  email       text        not null,
  phone       text,
  subject     text        not null,
  message     text        not null,
  source      text,
  created_at  timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

create index if not exists contact_messages_status_idx
  on public.contact_messages (status);

-- Lock both tables down ----------------------------------------------------
alter table public.quote_requests   enable row level security;
alter table public.contact_messages enable row level security;

-- No policies are created on purpose. The API routes authenticate with the
-- service-role key, which bypasses RLS; the browser never talks to Supabase.
```

Notes:

- The server prefers `SUPABASE_SERVICE_ROLE_KEY` and falls back to the anon key.
  With the anon key alone, inserts fail unless you add an `INSERT` policy for the
  `anon` role — the service-role key is the recommended setup.
- `moving_date` is a `date`. The quote form sends a `YYYY-MM-DD` string, which
  PostgreSQL casts on insert, so the column stores a real date rather than a
  timestamp.
- `property_type` and `referral_source` store the form's internal values. The
  labels shown to visitors live in `src/lib/validations/quote.ts`
  (`PROPERTY_TYPES`, `REFERRAL_SOURCES`) and can change without a migration.
- `services` is a `text[]` of service slugs (`house-removals`,
  `packing-and-loading`, …), which keeps the data usable for reporting without
  duplicating the service titles.
- `contact_messages.subject` stores the human label ("General enquiry", "Quote
  request", …) — the labels are defined in `src/lib/validations/contact.ts` —
  and `source` records the form that produced the row.
- Enquiries contain personal data. Delete rows once the enquiry is handled and
  no longer needed, and keep Supabase backups enabled.

---

## Project structure

```text
.
├── src/
│   ├── app/                     # App Router
│   │   ├── layout.tsx           # Root layout: fonts, header, footer, toasts, metadata
│   │   ├── page.tsx             # Home page
│   │   ├── about/               # About page
│   │   ├── services/            # Services index + [slug] detail pages
│   │   ├── quote/               # Quote request page
│   │   ├── contact/             # Contact page
│   │   ├── api/                 # POST /api/quote, POST /api/contact
│   │   ├── globals.css          # Tailwind v4 theme tokens and base styles
│   │   ├── sitemap.ts           # Generated sitemap
│   │   ├── robots.ts            # Generated robots.txt
│   │   ├── manifest.ts          # Generated web app manifest
│   │   ├── opengraph-image.tsx  # Generated 1200x630 share card
│   │   ├── icon.svg             # Favicon / app icon
│   │   ├── not-found.tsx        # Designed 404
│   │   ├── error.tsx            # Route error boundary
│   │   └── global-error.tsx     # Root fallback error boundary
│   ├── components/
│   │   ├── layout/              # Header, mobile navigation, footer
│   │   ├── home/                # Home page sections
│   │   ├── services/            # Services page sections
│   │   ├── quote/               # Quote form and supporting panels
│   │   ├── contact/             # Contact channels and form
│   │   ├── about/               # About page sections
│   │   ├── brand/               # Logo, logo mark, hero illustration, motifs
│   │   ├── shared/              # Container, Section, SectionHeading, Reveal
│   │   └── ui/                  # Radix-based primitives (button, field, select…)
│   ├── config/site.ts           # Brand, navigation and contact configuration
│   ├── content/                 # Services, FAQs, process, company copy, testimonials
│   └── lib/
│       ├── seo.ts               # buildMetadata() and canonical base URL
│       ├── leads.ts             # Server-side persistence and notifications
│       ├── rate-limit.ts        # In-memory API rate limiter
│       ├── validations/         # Shared Zod schemas for both forms
│       ├── supabase/server.ts   # Server-only Supabase client factory
│       └── utils.ts             # cn(), phone/WhatsApp hrefs, date formatting
├── docs/                        # Operational documentation
├── qa/                          # Playwright screenshot and audit harness
├── AGENTS.md                    # Design and engineering contract
├── .env.example                 # Environment variable template
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home page |
| `/services` | Services index |
| `/services/house-removals` | House and residential removals |
| `/services/office-relocations` | Office and commercial relocations |
| `/services/warehouse-moving` | Warehouse moving and clearance |
| `/services/furniture-moving` | Furniture moving and transportation |
| `/services/packing-and-loading` | Professional packing and loading |
| `/services/waste-removal` | Waste and rubbish removal |
| `/services/property-clearance` | Property clearance and disposal |
| `/quote` | Quote request form. Accepts `?service=<slug>` to pre-select a service and `?postcode=<postcode>` to prefill the coverage checker result. |
| `/contact` | Contact channels and enquiry form |
| `/sitemap.xml` | Generated sitemap (static routes + every service page) |
| `/robots.txt` | Generated robots file (allows all, disallows `/api/`) |
| `/opengraph-image` | Generated 1200x630 Open Graph image |
| `/manifest.webmanifest` | Web app manifest |
| `/icon.svg` | Favicon / app icon |

Service detail routes are generated from `src/content/services.ts`. Adding an
entry there adds the page, the navigation entry, the sitemap entry and the
footer link together.

---

## Design and content integrity

This project treats honesty as a design constraint, not a copy preference. The
rules below are enforced in code and must survive future changes.

### No invented trust signals

The business has not supplied reviews, customer counts, years in business,
certifications, awards, insurance details or statistics. None are displayed.
Trust content describes **capability and process** instead — what is included in
a quote, how a crew is planned, what happens before move day.

### Testimonials are empty until real ones exist

`src/content/testimonials.ts` exports an empty `testimonials` array and
`testimonialsEnabled = false`. The home page renders a designed empty state
explaining that verified feedback is being collected, with an invitation for
past customers to get in touch. To publish a real testimonial, add an entry with
the customer's permission:

```ts
{ quote: "…", name: "First name", location: "Town", service: "House removal", rating: 5 }
```

The empty state disappears automatically once the array is populated. Never
paste invented quotes, names or ratings into that file.

### No stock photography

No photography has been supplied and no unverified stock imagery is used. The
visual language is crafted vector illustration and strong typography: the
isometric `HeroScene`, the `BoxStack`, `RouteLine` and `FloorPlan` motifs, and
Lucide icon tiles. This is deliberate art direction, not a placeholder, so do
not add `/images/*.jpg` references or generic stock photos.

### Contact details are conditional

`siteConfig.contact.*` reads from environment variables and may be empty. The UI
renders each channel only when the matching `hasPhone` / `hasEmail` /
`hasWhatsApp` / `hasAddress` / `hasHours` flag is true. When nothing is
configured, the site says direct details are being finalised and points to the
contact form. Never hardcode a phone number, address or email.

### Forms never fake success

The API routes return `503` when Supabase is not configured and the UI shows the
real error. There is no client-side "success" fallback, no optimistic
confirmation and no sample reference number. Rate limiting returns `429`;
invalid payloads return `400`.

### No dead controls

Every button, link, tab, dropdown and form control does something real. If a
feature is not implemented, it is not rendered. There are no `href="#"` links.

### Language and iconography

British English throughout (`organisation`, `recognised`, `enquiry`,
`colour`). No emojis anywhere in the UI or copy; icons come from
`lucide-react`.

---

## Design system

The design language is a calm, premium professional-service brand: deep navy,
royal blue for links and focus, one warm orange reserved for primary conversion
actions, and neutral surfaces separated by hairline borders.

- **Tokens** live in the `@theme` block of `src/app/globals.css`: navy, royal,
  accent, ink, surface, line, radius, shadow and motion variables. Use the
  tokens (`bg-navy-950`, `text-ink-soft`, `border-line`), never raw hex.
- **Typography** uses Inter for body and Plus Jakarta Sans for display, loaded
  in the root layout with `display: swap`.
- **Spacing and layout** come from `<Section>` and `<Container>` in
  `src/components/shared/section.tsx`; do not hand-roll max-widths or section
  padding.
- **Elevation** is subtle: `shadow-xs` for controls, `shadow-card` for static
  cards, `shadow-lift` on hover, `shadow-overlay` for popovers. Borders carry
  the structure.
- **Motion** is 150–250 ms, with `<Reveal>` for section entrances. It is
  reduced-motion aware and there are no parallax or auto-playing carousels.
- **Accessibility**: one `<h1>` per page, ordered headings, labelled form
  controls, visible focus rings, `aria-invalid` plus `aria-describedby` on
  errors, and body-text contrast of at least 4.5:1.
- **Responsive**: mobile-first, checked at 375px, 768px and 1280px. Two-column
  splits collapse below `lg`; grids step `1 → 2 → 3` columns.

Shared component APIs (Button, Field, Select, DatePicker, Dialog, Accordion,
Badge and the rest) are documented in [AGENTS.md](AGENTS.md). Use them rather
than rebuilding controls.

---

## SEO and metadata

- `src/lib/seo.ts` exports `buildMetadata()`, which produces a page title,
  description, canonical URL, Open Graph and Twitter card metadata from
  `NEXT_PUBLIC_SITE_URL`.
- `src/app/sitemap.ts` is generated from the same content source as the pages,
  so it cannot list a route that does not exist.
- `src/app/robots.ts` allows all crawlers, disallows `/api/` and advertises the
  sitemap.
- `src/app/opengraph-image.tsx` renders the share card at build time with
  `next/og` (`ImageResponse`). It uses the default bundled font and brand colour
  values only — it fetches no remote fonts or images, so it builds in an
  offline CI environment.
- `src/app/manifest.ts` and `src/app/icon.svg` provide the installable-app
  manifest and favicon.
- The home page emits `Organization` structured data containing only details the
  business has supplied (name, URL, description). No review, rating, price or
  address markup is added until those facts exist.
- `not-found.tsx`, `error.tsx` and `global-error.tsx` provide designed failure
  states: no stack traces are shown to visitors, and `global-error.tsx` uses
  inline styles because it replaces the root layout.

---

## Deployment

The project deploys as a standard Next.js application, most simply to Vercel.
The short version:

1. Set the environment variables from [Environment variables](#environment-variables)
   in the hosting platform, with `NEXT_PUBLIC_SITE_URL` pointing at the
   production origin.
2. Create the Supabase tables from [Supabase setup](#supabase-setup).
3. Deploy, then verify `/sitemap.xml`, `/robots.txt`, `/opengraph-image` and a
   real form submission.

The full runbook — prerequisites, Vercel and custom-domain steps, optional email
configuration, the post-deploy checklist and operational notes — is in
[docs/deployment.md](docs/deployment.md).

---

## Working on the codebase

1. Read [AGENTS.md](AGENTS.md) in full. It is binding, not advisory.
2. Stay inside the files you own; if a shared component or token needs to
   change, raise it rather than editing someone else's scope.
3. Run `npm run typecheck` before handing work over, and `npm run lint` when
   touching more than one file.
4. Never run `next build` and `next dev` at the same time — they share `.next`
   and corrupt each other's output.
5. Do not add dependencies, invented business facts, stock photography or
   placeholder links.

No licence has been declared for this repository; treat the code as proprietary
to the business.
