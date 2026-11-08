# Motion upgrade — independent QA audit

**Verdict: SHIPPABLE WITH NITS** — 0 blockers, 2 should-fix, 5 nits.

- Auditor: `qa-motion` (independent of the seven implementation agents).
- Working tree snapshot: 2026-11-07 20:44 local. The tree is live (Lead edited
  `src/app/globals.css` at 20:29 to shorten the sheet exits to 200 ms); all
  evidence below was re-read after that change.
- Commands run by me: `npm.cmd run typecheck` (exit 0, no output) and
  `npm.cmd run lint` (exit 0, 0 errors, 2 warnings) at 20:44. I did **not** run
  `next build` or `next dev`, and did not restart the server on :3000.
- No `.git` directory exists, so there is no VCS baseline for "pre-existing" or
  "unchanged" claims; those are reasoned from file timestamps and content.

## Check results

| # | Check | Result | Evidence |
|---|-------|--------|----------|
| 1 | Typecheck clean | **PASS** | `tsc --noEmit` exit 0, no output (20:44). |
| 2 | Lint 0 errors, warnings judged | **PASS** | `eslint .` exit 0: `0 errors, 2 warnings`, both `react-hooks/incompatible-library` on React Hook Form `watch()` — `contact-form.tsx:86`, `quote-form.tsx:175`. Motion-unrelated form-state lines; `package.json`/`package-lock.json` untouched since 11:07/09:40, before the motion pass (files edited 19:00+), consistent with the Lead's "pre-existing" claim. |
| 3 | No double reveals (`Reveal`/`whileInView`/`Stagger`) | **PASS** | 60 `motion.*`/`AnimatePresence` usages reviewed; `Reveal`/`Stagger` are only composed as siblings, never parent+child (e.g. `intro.tsx`, `why-choose.tsx`, `process.tsx`, `site-footer.tsx`). `HeroScene` is deliberately not wrapped in a `Reveal` — exactly one entrance, its internal CSS assembly (`hero.tsx:110-114`, `hero-scene.tsx:104-132`). No page wraps a self-revealing section in another `Reveal` (checked all 10 routes). The page-transition wrapper is a documented route entrance, excluded by convention. One non-API nested entrance noted as a nit (finding 3). |
| 4 | Reduced motion degrades safely; no markup branch on `useReducedMotion()` | **FAIL** | No component branches rendered markup on `useReducedMotion()` — the only use is inside an effect (`animated-number.tsx:36`). `MotionConfig reducedMotion="user"` is mounted once (`providers.tsx`), `process-steps.tsx:41` hides its scroll layer with `motion-reduce:hidden`, hero/motifs/skeleton use `motion-reduce:animate-none`. **But** `scroll-progress.tsx:27` has no reduced-motion handling, and CSS entrance delays survive the global reduce block — see findings 1 and 2. |
| 5 | Infinite animations justified | **PASS** | Only two: `animate-shimmer` skeleton (`ui/skeleton.tsx:7`, `quote-form-skeleton.tsx:23`, `globals.css:102`) and the button loading spinner (`ui/button.tsx:103`). Both are progress/loading affordances, not decoration; skeleton also carries `motion-reduce:animate-none`. No `animate-pulse|bounce|ping` anywhere. |
| 6 | Durations in band | **FAIL** | Controls are 150–260 ms and content entrances 400–600 ms almost everywhere (`globals.css:93-119`, `reveal.tsx`, `page-transition.tsx:20`, hero-scene 550 ms stages). Exceptions: mobile-nav item entrances 300/320 ms (`mobile-nav.tsx:32,187`) are below the 400 ms entrance floor, and `--animate-check-in: 0.34s` (`globals.css:108`) is outside both bands — findings 4 and 5. Arbitrary overlay values (`animate-[fade-in_0.2s_ease-out_both]` in sheet/dialog/tabs/button) are expected and in band. |
| 7 | No `fixed` element inside a transformed ancestor | **PASS** | `app/template.tsx` wraps page content in `PageTransition` (transform), but every fixed element lives outside it: `ScrollProgress` and `BookingBubble` are siblings of `<main>` in `layout.tsx`, the skip link is `focus:fixed`, and Radix overlays/sheets portal to `document.body`. No page-level component renders `position: fixed` (grep across `src/`). `ScrollProgress` transforms only itself (`scaleX`). |
| 8 | Accessibility of animated UI | **PASS** | Global `:focus-visible` outline (`globals.css:360-364`) plus primitive rings; every animated interactive surface keeps a ring (checked header, footer, bubble, checklist, calculator, date-picker). Icon-only buttons have `aria-label` (`sheet.tsx:59`, `dialog.tsx:74`, `booking-bubble.tsx:106,185`, `date-picker.tsx:200,208`). Decorative motion is `aria-hidden` (`scroll-progress.tsx:23`, `process-steps.tsx:37`, motifs). No `initial={{opacity:0}}` without `animate`/`whileInView` — all 60 motion usages have one. No-JS caveat: nit 6. |
| 9 | Honesty rules | **PASS** | Success UI only after a real API success with a reference: `quote-form.tsx:300-318` (returns error when no reference), contact form same pattern; API returns 503 when no backend (`leads.ts:33-40`) and never fakes success. Testimonials render an honest empty state (`content/testimonials.ts`: empty array, `testimonialsEnabled=false`). Coverage copy explicitly refuses to claim availability (`coverage.tsx:96-100,171-179`). `AnimatedNumber` only animates real computed values; no animation introduces statistics, ratings, years, certifications or counts not already in `src/content/*` (the how-we-work numerals come from `content/company.ts` and are rendered statically). |
| 10 | No new dependencies | **PASS** | `package.json` (mtime 11:07) predates every motion file (19:00+); `package-lock.json` 09:40. Dependency set matches the contract stack (Next 16, React 19, `motion`, Lucide, Radix, RHF, Zod, Sonner, Supabase, cva, clsx, date-fns, tailwind-merge; Tailwind v4 + Playwright dev). No motion-related package added. Limitation: no git baseline. |
| 11 | No emojis in `src/` | **PASS** | Codepoint scan of all 105 files under `src/`: zero emoji/pictographic hits. The WhatsApp glyph is the documented SVG component, not an emoji. |
| 12 | No `console.log`/`debugger`/TODO/FIXME | **PASS** | Grep across `src/`: none. The only `console.*` is intentional server-side error logging in `lib/leads.ts:53,64`. |

## Findings

### Should-fix

**1. `ScrollProgress` keeps spring animation under reduced motion.**
`src/components/shared/scroll-progress.tsx:21-31` drives `style={{ scaleX }}` from
`useScroll` + `useSpring` and has no `motion-reduce:` class. `MotionConfig` does
not affect MotionValue-driven styles, so the reading-progress hairline still
springs/eases when the user prefers reduced motion — inconsistent with
`process-steps.tsx:41`, which hides its scroll-linked layer.
*Fix:* add `motion-reduce:hidden` to the bar (matching process-steps), or set the
MotionValue directly instead of through the spring when reduced motion is on.

**2. CSS entrance delays survive the global reduced-motion block.**
`globals.css:379-390` zeroes `animation-duration` and
`transition-duration` but not `animation-delay`. The quote-form panels use
`animate-fade-up` with `animationDelay` 40–240 ms (`quote-form.tsx:469,578,683,769,779,851`).
With `animation-fill-mode: both` the panels stay at the `from` state (opacity 0)
for that delay, so under reduced motion they pop in up to 240 ms late.
*Fix:* add `animation-delay: 0ms !important;` to the existing
`@media (prefers-reduced-motion: reduce)` block. (Motion-driven `Reveal` opacity
delays are inherent to the chosen `MotionConfig` mechanism and accepted by the
motion spec; not counted as a defect.)

### Nits

**3. Nested parent + child entrance on the quote success panel.**
`quote-success.tsx:58` puts `animate-fade-up` on the panel while
`quote-success.tsx:124-146` staggers the same panel's list items with
`motion.ol`/`motion.li` (0.07 s stagger). The two opacities multiply, so items
fade in twice — contrary to motion-system rule 4 ("if a parent already reveals a
block, its children do not also reveal").
*Fix:* drop `animate-fade-up` from the section and keep the list stagger.

**4. Mobile-nav micro-entrances are below the entrance floor.**
`mobile-nav.tsx:32` (`itemEnter` duration 0.3) and `mobile-nav.tsx:187`
(bottom CTA duration 0.32) animate inside the sheet. They read as control-level
settles, but 300–320 ms is outside the 400–700 ms entrance band in the checklist.
*Fix:* either raise to 0.4 s or record them as sanctioned in-sheet micro-entrances
in `docs/motion-system.md`.

**5. `--animate-check-in` is outside both duration bands.**
`globals.css:108` defines 0.34 s, used for the success ticks in
`contact-form.tsx` and `quote-success.tsx`. The comment at `globals.css:88`
claims all durations sit inside the 150–250/400–600 ms bands, which is also
inaccurate for `--animate-slide-in-panel: 0.28s` (line 105).
*Fix:* shorten to 0.28 s and correct the comment (or widen the documented band).

**6. No-JS / pre-hydration: all page content is `opacity: 0` in the SSR HTML.**
The server HTML for `/` is `<main><div style="opacity:0;transform:translateY(8px)">…`
(`page-transition.tsx:16-22`), with 53 inline `opacity:0` elements in total
(`Reveal`/`Stagger`/`RevealText` initial states). Every one of these has an
`animate`/`whileInView` target, so it is not a broken animation, but if JS is
disabled or fails the main content never becomes visible.
*Fix (optional):* a `<noscript>` style in `layout.tsx` forcing
`main > div { opacity: 1 !important; transform: none !important; }`.

**7. Dead motion API / tokens.**
`RevealItem` (`reveal.tsx:90`) is exported but never imported; the `animated`
prop on `motifs.tsx` is never passed by any call site; `--animate-page-in`
(`globals.css:106`), `--animate-draw-line` (`:109`) and `--animate-slide-out-down`
(`:119`) are defined but unused (page entrance is JS-driven).
*Fix:* remove or wire up; harmless, but they invite drift.

## Not statically verifiable here

- Visual/browser behaviour and runtime reduced-motion rendering: I did not run a
  browser. The Lead's Playwright pass (30 page/viewport combos, 0 blockers,
  0 high, 1 medium since fixed) is external evidence, not re-run by me.
- `next build`: not run by me (forbidden during parallel work).
- "Pre-existing" for the two lint warnings and "no new dependencies": no VCS
  baseline; supported only by timestamps and the warning content (React Hook Form
  `watch()` memoisation, unrelated to motion).
- The sheet Escape-close timing: I only verified statically that exit keyframes
  are distinct and now 200 ms (`globals.css:115-119`); timing behaviour was
  verified by the Lead.
