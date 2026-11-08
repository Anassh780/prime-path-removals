# Prime House Removals — Build Contract

Read this before writing any code. It defines the design system, shared APIs,
copy rules and file ownership. Consistency across nine parallel contributors
depends on following it exactly.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript (strict)
- Tailwind CSS v4 (tokens in `src/app/globals.css`, no `tailwind.config`)
- shadcn/ui-style primitives built on Radix (`src/components/ui/*`)
- Motion for React (`motion/react`), Lucide icons, React Hook Form + Zod,
  Sonner toasts, Supabase (server-side only)

Commands (Windows, use `npm.cmd`):

```bash
npm.cmd run typecheck   # tsc --noEmit — the fastest correctness check
npm.cmd run build       # production build (Lead only, not during parallel work)
npm.cmd run dev         # Lead only — do not start your own dev server
```

Never run `next build` or `next dev` yourself; parallel runs corrupt `.next`.

## Non-negotiables

1. **Never invent trust signals.** No fake reviews, star ratings, statistics,
   years in business, certifications, awards, insurance claims, customer
   counts, or company details. Copy must describe capability and process only.
2. **Never fake a successful form submission.** If the backend is not
   configured, show the real error returned by the API.
3. **No dead controls.** Every button, link, dropdown, tab and form control must
   do something real. If a feature is not implemented, do not render it.
4. **No emojis.** Icons come from `lucide-react`. The one exception is the
   WhatsApp brand glyph (`@/components/brand/whatsapp-icon`), which Lucide does
   not ship.
5. British English in all copy (`organisation`, `recognised`, `enquiry`).
6. Do not add npm dependencies. Everything needed is installed.
7. Stay inside your assigned files. Never edit `globals.css`, `src/components/ui/*`,
   `src/components/shared/*`, `src/config/*`, `src/content/*`, `src/lib/*`, or
   `app/layout.tsx` unless your task explicitly owns them. If a shared change is
   needed, report it instead of making it.

## Design language

Premium professional service brand — closer to a well-funded SaaS site than a
local trades template. Calm, structured, confident. No gradients except the
occasional hairline, no glassmorphism, no glow, no oversized pills, no
dribbble-style floating blobs.

### Colour tokens (use these, never raw hex)

The palette is derived from the brand logo: deep navy `#021e40`, azure blue
`#2b95f5`, forest green `#11543b`.

| Purpose | Token |
| --- | --- |
| Primary brand / dark surfaces | `navy-950` `#04101f` · `navy-900` `#071a33` · `navy-800` `#0d2547` · `navy-700` `#163559` |
| Secondary / links / focus (azure) | `royal-600` `#1173d4` · `royal-700` `#0b5aa8` · `royal-500` `#2b95f5` · `royal-50` `#eef7ff` |
| Accent (primary CTA only, forest green) | `accent-600` `#11543b` (button fill, 8.9:1 with white text) · `accent-500` `#1f6f4d` (decorative) · `accent-300` `#7fb99b` (accents on dark) · `accent-50` `#eef6f1` |
| Text | `ink` (headings/body strong), `ink-soft` (body), `ink-muted` (meta) |
| Surfaces | `surface` (white), `surface-subtle`, `surface-muted` |
| Borders | `line` (hairline), `line-strong` (form controls) |

Forest green is for **primary conversion actions only** (quote CTA, key submit
buttons) and affirmative states. Azure is for links, focus rings and
informational accents. Navy carries dark surfaces and headings. The warm orange
that the first design used is retired — do not reintroduce it, and never put
`accent-300` on white (it fails contrast).

Dark bands are part of the design language: a full-bleed `navy-950` section
between white sections is what gives the pages rhythm. On `navy-950` use white
or `navy-300` for text and `azure-300` / `accent-300` for accents.

### Type scale

- Display/H1: `text-4xl sm:text-5xl lg:text-6xl` with `font-display`,
  `tracking-[-0.02em]`, `leading-[1.05]`
- H2: `text-3xl sm:text-4xl lg:text-[2.6rem]` (SectionHeading handles this)
- H3: `text-lg sm:text-xl font-semibold`
- Body: `text-[15px] sm:text-base leading-relaxed text-ink-soft`
- Small/meta: `text-sm` / `text-xs` — never use `text-xs` for paragraphs of copy

### Radius

Controls `rounded-lg` · cards/panels `rounded-xl` · large media `rounded-2xl` ·
avatars/dots `rounded-full`. Nothing above `rounded-2xl` for cards.

### Elevation

`shadow-xs` (controls) · `shadow-card` (static cards) · `shadow-lift` (hover
cards) · `shadow-overlay` (popovers/dialogs). Borders carry most of the
structure — shadows stay subtle.

### Spacing

Sections: `py-16 md:py-20 lg:py-24` (use `<Section>`). Container: `<Container>`
(max 1216px, responsive padding). Grid gaps: `gap-5`/`gap-6` for cards,
`gap-8`/`gap-12` for split layouts. Never hand-roll `max-w-[1200px] mx-auto px-*`.

### Motion

Subtle only: 150–250 ms control transitions, `<Reveal>` for section entrances.
Reduced motion is handled once, by `<MotionConfig reducedMotion="user">` in
`src/app/providers.tsx` — never branch the rendered tree on
`useReducedMotion()` (it desynchronises SSR and causes hydration errors).
No parallax, no auto-playing carousels, no bouncing, no hover scale above 1.02.

## Shared components — exact APIs

Import with `@/` alias.

### Layout primitives — `@/components/shared/section`

```tsx
<Container className="">…</Container>
<Section tone="default|subtle|navy" id="…" className="">…</Section>
<SectionHeading
  eyebrow="Our services"
  title={<>…</>}
  description="…"
  align="left|center"
  tone="default|inverse"
  action={<Button …/>}   // optional right-aligned action on md+
  as="h1|h2|h3"
/>
```

### Motion — `@/components/shared/reveal`

```tsx
<Reveal delay={0.05} className="">…</Reveal>
<Stagger stagger={0.06}>
  <StaggerItem>…</StaggerItem>
</Stagger>
<RevealText text="…" />
```

### Brand — `@/components/brand/logo`

```tsx
<Logo />                       // default dark tone
<Logo tone="inverse" />        // for navy footer
<LogoMark className="size-8" />
<WhatsAppIcon className="size-4" />   // from @/components/brand/whatsapp-icon
```

Lucide has no brand icons, so every WhatsApp affordance uses `WhatsAppIcon`,
never `MessageCircle`. It inherits `currentColor` and sizes from `className`.

### Booking action — `@/components/layout/booking-bubble`

`<BookingBubble />` is mounted **once** in `src/app/layout.tsx`. It is the single
place the phone and WhatsApp numbers are surfaced: a fixed "Book now" button
that expands to Call and WhatsApp rows. Do not add phone or WhatsApp controls to
the header or the mobile sheet — that is what the bubble replaced.

### UI — `@/components/ui/*`

```tsx
<Button variant="primary|accent|secondary|outline|ghost|link"
        size="sm|md|lg|icon" loading loadingText asChild>…</Button>

<Input />  <Textarea />                       // native elements, styled
<Label htmlFor="…" />
<Field> <FieldLabel required> <FieldHint> <FieldError>{msg}</FieldError> <OptionalTag />
<Select><SelectTrigger><SelectValue placeholder="…"/></SelectTrigger>
  <SelectContent><SelectItem value="…">…</SelectItem></SelectContent></Select>
<Checkbox /> <RadioGroup><RadioGroupItem value="…" /></RadioGroup>
<Accordion type="single" collapsible><AccordionItem value="…">
  <AccordionTrigger>…</AccordionTrigger><AccordionContent>…</AccordionContent></AccordionItem></Accordion>
<Dialog><DialogTrigger/><DialogContent><DialogHeader><DialogTitle/><DialogDescription/></DialogHeader></DialogContent></Dialog>
<Sheet><SheetTrigger/><SheetContent side="right" title="Menu">…</SheetContent></Sheet>
<Popover> <PopoverTrigger/> <PopoverContent/> </Popover>
<DropdownMenu> <DropdownMenuTrigger/> <DropdownMenuContent> <DropdownMenuItem/> </DropdownMenuContent> </DropdownMenu>
<Tabs> <TabsList> <TabsTrigger/> </TabsList> <TabsContent/> </Tabs>
<Badge variant="neutral|navy|royal|accent|outline|inverse" />
<Skeleton /> <Separator />
<DatePicker value onChange placeholder invalid minDate />   // custom calendar, no native date input
```

Toast: `import { toast } from "sonner"` — the `<Toaster />` is mounted in the root
layout. Use `toast.success` / `toast.error` with a `description`.

`cn()` from `@/lib/utils` merges classes.

## Content sources — do not duplicate copy

```ts
import { siteConfig, mainNav, footerNav, hasPhone, hasEmail, hasWhatsApp,
         hasAddress, hasHours } from "@/config/site";
import { services, getService, serviceIcons } from "@/content/services";
import { faqs } from "@/content/faqs";
import { processSteps } from "@/content/process";
import { whyChoose, values, highlights } from "@/content/company";
import { testimonials, testimonialsEnabled } from "@/content/testimonials";
```

`services` entries carry `slug, title, navLabel, icon, summary, description,
benefits[], includes[], metaTitle, metaDescription`.

## Honesty rules for contact details

`siteConfig.contact.*` may be empty strings. Render a channel **only** when the
corresponding `hasPhone` / `hasEmail` / `hasWhatsApp` / `hasAddress` /
`hasHours` flag is true. When nothing is configured, show the contact form and a
short, professional note that direct contact details are being finalised — never
invent a phone number, address or email.

Use `formatPhoneHref`, `formatWhatsAppHref`, `formatDate`, `cn` from `@/lib/utils`.

Phone and WhatsApp are presented to visitors through `<BookingBubble />` (fixed
bottom-right on every page) rather than the navigation, so the header stays
calm. In-content links to those channels are still allowed, but they must meet
the 24px pointer-target rule (`py-1 -my-1`).

## Imagery — illustration-led, not stock photography

The business has not supplied photography, and we do not use unverified stock
images. The visual language is therefore **crafted vector illustration + strong
typography**, which is a deliberate, premium art direction — not a gap.

- Hero visual: `<HeroScene />` from `@/components/brand/hero-scene` — a custom
  isometric "moving day" illustration in brand colours. Do not replace it with
  a photo or a generic 3D blob.
- Supporting graphics: `@/components/brand/motifs` (`BoxStack`, `RouteLine`,
  `FloorPlan`). Use them as quiet background/foreground accents, never as a
  substitute for content.
- Service visuals: icon tiles using `serviceIcons[service.icon]` from
  `@/content/services` — not photographs.
- Do **not** reference `/images/*.jpg` files. They do not exist.
- Decorative SVG must be `aria-hidden` or given an accessible name.

If you must show a large visual panel, build it from brand colour blocks,
hairline rules, and an illustration — no `background-image` stock photos.

## Accessibility

- One `<h1>` per page; headings in order.
- Every input has a `<label>` or `aria-label`; errors use `aria-invalid` +
  `aria-describedby`.
- Interactive elements are real `<button>` / `<a>`; no clickable divs.
- Focus states come from the primitives — never remove `outline` without a
  replacement ring.
- Decorative images `alt=""`; icon-only buttons need `aria-label`.
- Colour contrast ≥ 4.5:1 for body text. Accent buttons use `accent-600`
  (`#11543b`, 8.9:1 with white) — never `accent-500` as a text background with
  white on it at small sizes.
- Standalone text links get a 24px+ pointer target; `globals.css` adds vertical
  padding to `a.inline-flex` / `a.link-underline` without shifting layout.

## Responsive

Mobile-first. Verify mentally at 375px, 768px, 1280px. Two-column splits become
single column below `lg`. Grids: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.
No horizontal overflow from fixed widths; long words/emails wrap.

## Definition of done

- TypeScript clean (`npm.cmd run typecheck`) for the files you own.
- No `any`, no unused imports, no `console.log` left behind.
- Copy reads like a real business wrote it — specific, calm, no marketing fluff.
- All interactive states covered: hover, focus-visible, active, disabled, loading.
- Empty and error states designed, not left blank.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
