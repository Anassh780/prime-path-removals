# Motion system

The single source of truth for transitions, micro-interactions and scroll
animation across Prime House Removals. Every contributor works from this file.

The goal is the feel of a well-funded SaaS product: **calm, deliberate,
responsive**. Motion should make the interface feel alive and considered, never
busy. If an animation would be noticed before the content it decorates, it is
too much.

## House rules (non-negotiable)

1. **Subtle only.** Three duration bands, and nothing outside them:
   - controls (colour, icon, underline, focus) **150–250 ms**
   - overlay/panel contents and state confirmations **250–350 ms**
   - page and section entrances **400–600 ms**
   Nothing bounces, overshoots, blinks or loops forever (spinners and the
   shimmer skeleton are the only infinite animations).
2. **Reduced motion is handled once.** `<MotionConfig reducedMotion="user">` in
   `src/app/providers.tsx` plus the `prefers-reduced-motion` block in
   `globals.css`. **Never** branch rendered markup on `useReducedMotion()` — it
   desynchronises SSR and causes hydration errors. Using it to pick a numeric
   value inside an effect is fine.
3. **No layout thrash.** Animate `opacity` and `transform` (plus `filter` for
   the one hero blur). Never animate `width`, `height`, `top`, `left`, `margin`.
   The only exceptions are the existing Radix accordion height keyframes.
4. **Never animate the same element twice.** One entrance per element. If a
   parent already reveals a block, its children do not also reveal.
5. **No parallax, no auto-playing carousels, no hover scale above 1.02.**
   A 2 px lift (`-translate-y-0.5`) is the maximum hover displacement.
6. **Scroll animation is trigger-based, not scrubbed** — except the two
   explicitly approved scroll-linked indicators: the reading-progress hairline
   and the Process connector line. Both must be decorative (`aria-hidden`).
7. **No fake data.** Never animate a number that is not a real computed value.
8. **Server components stay server components.** Only add `"use client"` where
   an interaction genuinely needs it; wrap the smallest possible leaf.

## Tokens

Defined in `src/app/globals.css`:

| Token | Value | Use |
| --- | --- | --- |
| `--motion-fast` | 150 ms | colour/icon/underline changes |
| `--motion-base` | 200 ms | cards, lifts, shadows |
| `--motion-slow` | 260 ms | larger surface state changes |
| `--ease-out-soft` | `cubic-bezier(0.22, 1, 0.36, 1)` | the house curve — use everywhere |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | page entrance only |
| `--ease-in-out-soft` | `cubic-bezier(0.65, 0, 0.35, 1)` | symmetric moves |

Named animations available as Tailwind utilities:

`animate-fade-up`, `animate-fade-in`, `animate-scale-in`, `animate-slide-down`,
`animate-slide-in-panel`, `animate-pop-in`, `animate-check-in`,
`animate-nudge-in`, `animate-shimmer`, `animate-accordion-down` /
`animate-accordion-up`.

Exit animations (Radix Presence requires a *different* keyframe name from the
enter animation, otherwise the element unmounts with no exit): `animate-fade-out`,
`animate-scale-out`, `animate-slide-out-right`, `animate-slide-out-left`.

## Interaction utility classes

Use these instead of hand-writing transition declarations:

```css
.u-card       /* transition language for any hoverable surface */
.u-lift       /* 2px hover lift (hover-capable pointers only) */
.u-press      /* 1px active press */
.u-arrow      /* arrow inside a .group — slides 3px on hover */
.u-icon-tile  /* icon tile inside a .group — lifts 1px, colours transition */
.u-focus-ring /* focus-visible outline for non-primitive interactive surfaces */
```

Usage:

```tsx
<Link className="group u-card u-lift rounded-xl border border-line bg-white p-6 shadow-card hover:border-navy-200 hover:shadow-lift">
  <span className="u-icon-tile flex size-11 items-center justify-center rounded-lg border border-line bg-surface-subtle">
    <Icon className="size-5" />
  </span>
  <ArrowRight className="u-arrow size-4" />
</Link>
```

## React API — `@/components/shared/reveal`

```tsx
import { Reveal, Stagger, StaggerItem, RevealText } from "@/components/shared/reveal";
```

### `<Reveal>`

```tsx
<Reveal
  delay={0.05}      // seconds
  y={16}            // vertical travel in px (default 16)
  x={0}             // horizontal travel in px
  scale={0.97}      // optional starting scale
  blur              // optional 6px → 0 blur (hero headings only)
  duration={0.55}
  once              // default true
  amount={0.2}      // fraction visible before triggering
  immediate         // true = play on mount, for above-the-fold content
  className=""
>
```

### `<Stagger>` / `<StaggerItem>` — parent-owned stagger

Use this for any group whose children mount together (grids, lists, steps). No
child needs to know its own index.

```tsx
<Stagger stagger={0.06} delay={0.05} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <StaggerItem key={item.id} className="h-full">…</StaggerItem>
  ))}
</Stagger>
```

`<StaggerItem as="li">` renders a `motion.li` for lists.

### `<RevealText>` — word-by-word display heading

```tsx
<h1 className="…">
  <RevealText text={siteConfig.tagline} delay={0.1} />
</h1>
```

The text stays selectable and readable by screen readers. Use it **once per
page**, on the `<h1>` only. Not on navy sections where the words would flash.

## Other shared primitives

| Import | Purpose |
| --- | --- |
| `@/components/shared/scroll-progress` | top reading-progress hairline (already mounted in `layout.tsx`) |
| `@/components/shared/page-transition` | route entrance (already used by `app/template.tsx`) |
| `@/components/shared/animated-number` | smooths a real changing number, e.g. `<AnimatedNumber value={total} format={(n) => `£${Math.round(n)}`} />` |

## Motion patterns by area

### Sections (scroll)

- Section heading: `<Reveal>` around `<SectionHeading>`.
- Card grids: `<Stagger>` + `<StaggerItem>`, `stagger={0.06}`.
- Long lists (FAQ, checklist rows): reveal the container, not every row.
- Split layouts: text reveals first, visual `delay={0.1}`.
- Navy sections: same treatment — `opacity` + `y` only, no blur.

### Controls (action)

- Button: colour/shadow in 150 ms, `active:` 1 px press, arrow `u-arrow`.
- Link: underline grows (`.link-underline`), arrow slides 3 px.
- Input/textarea/select: border + ring colour in 150 ms; error text
  `animate-nudge-in`.
- Checkbox/radio: tick/scale in ~200 ms.
- Accordion: Radix height keyframes (already wired).
- Dialog/sheet/popover/dropdown/select/tooltip: enter *and* exit.
  Radix `data-[state=closed]:animate-*` must mirror the open animation.
- Toast: Sonner handles it — do not add custom motion.

### Page chrome

- Header: border + shadow fade in after 8 px of scroll (already), height
  transition 72→64 px on desktop, nav underline scaleX, services panel
  fade + 4 px rise.
- Mobile nav: sheet slides, items stagger in 0.04 s apart.
- Booking bubble: panel scales from 0.98 + 10 px rise, trigger chevron rotates.
- Footer: link colour + 3 px arrow travel only.

## Accessibility

- Never remove `outline` without a replacement ring.
- Animations must not move focus or block pointer events while running.
- Anything that conveys state (error, success, loading) needs a text/ARIA
  equivalent — motion is decoration.
- Decorative motion elements are `aria-hidden="true"`.

## Verification

```bash
npm.cmd run typecheck
npm.cmd run lint
```

Then check in a browser at 375 / 768 / 1440 px, and once with
**Settings → Accessibility → Reduce motion** enabled: content must appear
immediately, in the right place, with no hidden sections.
