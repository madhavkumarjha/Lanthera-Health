# PROGRESS.md — Project Memory & Tracking

## Current phase
Phase 7 — Clear Ledger, Health Packages & International (Complete)

## Completed phases
- **Phase 0 — SETUP ONLY** (commit: `517c33f`)
  - Scaffolded Vite + React 19 + TypeScript strict setup
  - Installed dependencies pinned per File 06
  - Configured design tokens CSS variables (Dark + Light themes)
  - Integrated self-hosted fonts & i18n skeleton
  - Scaffolded all 28 routes from File 03
  - Configured ESLint, Prettier, Vitest, Playwright

- **Phase 1 — Foundation & Emergency First** (commit: `c232f71`)
  - Built core UI component library (`Button`, `Card` with lantern shape, `Input`, `Modal`)
  - Created Header landmark with persistent `EmergencyPill`, Command Palette ⌘K trigger, theme, language, text size, and Calm mode toggles
  - Built dismissible `DemoBanner` and first-visit `ConsentGateModal`
  - Created `Footer` landmark with mandatory disclaimers per File 01 §5.3
  - Built `FloatingLauncher` quick navigation widget
  - Built fast-loading `EmergencyPage` (`/emergency`) with giant call block, red-flag check, arrival triage explainer, travel pointers, and mandatory emergency disclaimers
  - Added unit test suite `tests/unit/phase1.test.tsx`

- **Phase 2 — Brand & Home Hero** (commit: `8d0bf4f`)
  - Created complete SVG & raster logo deliverables (`logo-primary.svg`, `logo-mark.svg`, `logo-mono-light.svg`, `logo-mono-dark.svg`, `logo-stacked.svg`, `logo-glow.svg`) and favicon set (`favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `maskable-512.png`, `site.webmanifest`, `safari-pinned-tab.svg`)
  - Generated cinematic hero image assets (`public/img/hero/hero-01.webp` through `hero-06.webp`) and procedural SVGs, updated `assets/manifest.json` with bilingual alt text
  - Self-hosted fonts verified and applied (`Fraunces`, `Instrument Sans`, `JetBrains Mono`, `Noto Devanagari`)
  - Built session-based ignition `Loader` (skipped on `/emergency`, stored in `sessionStorage`)
  - Created `ScrollProgress` Wick line scroll progress indicator
  - Built `CustomCursor` glowing follower for desktop (auto-disabled on touch/reduced motion)
  - Built `PageTransition` radial amber light wipe transition ("Light passes")
  - Built interactive `HomePage` hero with Fraunces Display XL headline (*"You are not alone in this. Here is what happens next."*), interactive dusk-to-night ambient glow, and 8 lantern-shaped signature route tiles
  - Added unit test suite `tests/unit/phase2.test.tsx`

- **Phase 3 — Lantern Guide (highest utility)** (commit: `44d0641`)
  - Created transparent decision rules table (`src/data/guide-rules.ts`) with priority-based evaluation logic for care levels (`emergency`, `urgent`, `specialist`, `routine`, `info`).
  - Created Zustand state store (`src/store/guideStore.ts`) supporting step navigation, red-flag checks, and session restoration.
  - Built PDF Visit Prep Sheet generator (`src/utils/pdfGenerator.ts`) creating branded A4 single-page prep sheets in EN/HI.
  - Built full interactive stepped `GuidePage` (`/guide`) featuring mandatory disclaimer banner, 4-step questionnaire, result view with care level card, interactive "What to bring" packing checklist, "Questions to ask doctor" list, arrival steps roadmap, PDF download, summary copy, print, and transparent rule table modal drawer.
  - Added unit test suite `tests/unit/phase3.test.tsx`.

- **Phase 4 — The Night Watch + Home story** (commit: `be61de5`)
  - Created 24-hour Night Watch story beats dataset (`src/data/nightwatch.ts`) covering 18:00 to 06:00 across 7 key care stages.
  - Generated vector SVG hospital building silhouette (`public/img/building.svg`) with 40 individual window rects (`win-1` through `win-40`).
  - Generated 7 SVG vignette art illustrations in `public/img/nightwatch/`.
  - Built `HospitalBuilding` component ([`src/components/nightwatch/HospitalBuilding.tsx`](file:///d:/healthcare/src/components/nightwatch/HospitalBuilding.tsx)) rendering lit window effects matching active hour beats.
  - Built `NightWatchStory` component ([`src/components/nightwatch/NightWatchStory.tsx`](file:///d:/healthcare/src/components/nightwatch/NightWatchStory.tsx)) with interactive hour tabs, auto-play toggle, "Skip story" link, and a static ordered list (`<ol>`) fallback for Calm Mode / reduced motion.
  - Integrated `NightWatchStory` into `HomePage` (Home story) and `AboutPage` (`/about`).
  - Added unit test suite `tests/unit/phase4.test.tsx`.

- **Phase 5 — The Path + Waiting Room Live** (commit: `7c9fcd5`)
  - Created 5 comprehensive patient journey tracks in [`src/data/path.ts`](file:///d:/healthcare/src/data/path.ts) (`emergency`, `surgery`, `daycare`, `maternity`, `outpatient`).
  - Built interactive `PathPage` ([`src/routes/PathPage.tsx`](file:///d:/healthcare/src/routes/PathPage.tsx)) featuring track selectors, vertical Wick-line timeline, active stop position tracker ("Where are you now?"), indicative duration ranges, team role badges, family advice, stop detail modal drawer, and printable checklist generator.
  - Created Waiting Room Live dataset in [`src/data/board.ts`](file:///d:/healthcare/src/data/board.ts) with anonymised tokens (`L-204` to `L-209`) and 4 stage definitions (`prep`, `procedure`, `recovery`, `ready`).
  - Built `BoardPage` ([`src/routes/BoardPage.tsx`](file:///d:/healthcare/src/routes/BoardPage.tsx)) featuring real-time simulator, token search filter, stage legend, TV / large-screen monitor mode, and mandatory privacy disclaimer.
  - Built `FamiliesPage` ([`src/routes/FamiliesPage.tsx`](file:///d:/healthcare/src/routes/FamiliesPage.tsx)) family care hub connecting to Waiting Room Live.
  - Added unit test suite [`tests/unit/phase5.test.tsx`](file:///d:/healthcare/tests/unit/phase5.test.tsx).

- **Phase 6 — Departments, Doctors & Circle of Care** (commit: `f28859e`)
  - Created 12 medical departments in [`src/data/departments.ts`](file:///d:/healthcare/src/data/departments.ts) with bilingual copy, conditions treated, diagnostic tests, and department head links.
  - Created fictional staff & leadership directory in [`src/data/people.ts`](file:///d:/healthcare/src/data/people.ts) with mandatory demo registration IDs and bios.
  - Built `/departments` listing with audience filters (`All`, `Adult`, `Child`, `Women`, `Senior`) and `/departments/:slug` detail page with department head cards and FAQ accordion.
  - Built `/doctors` directory with department, language, and consultation mode filters and `/doctors/:slug` detail view featuring glowing halo ring portraits.
  - Built `/team` Circle of Care hub supporting both interactive Constellation orbital halo rings and an Accessible Tree List view.
  - Built `/book` appointment booking wizard with department/doctor prefilling and demo confirmation modal.
  - Added unit test suite [`tests/unit/phase6.test.tsx`](file:///d:/healthcare/tests/unit/phase6.test.tsx).

- **Phase 7 — Clear Ledger, Health Packages & International** (commit: `phase-7-complete`)
  - Created financial scenario dataset in [`src/data/ledger.ts`](file:///d:/healthcare/src/data/ledger.ts) with room tier multipliers (`ward`, `semi`, `private`, `icu`), volatility alerts, empaneled insurance list, and 0% EMI schemes.
  - Created health screening catalog in [`src/data/packages.ts`](file:///d:/healthcare/src/data/packages.ts) with category tags, test inclusions, prep guidelines, and home sample collection flags.
  - Created international desk dataset in [`src/data/international.ts`](file:///d:/healthcare/src/data/international.ts) with 4-step medical travel roadmap, MVIL assistance, multilingual interpreter support, and contact channels.
  - Created diagnostic test directory in [`src/data/diagnostics.ts`](file:///d:/healthcare/src/data/diagnostics.ts) with TAT turn-around times, preparation instructions, and code search.
  - Built `/ledger` financial transparency page with interactive pre-procedure cost calculator and formal estimate request modal.
  - Built `/packages` health check catalog with category filters and checkup booking modal.
  - Built `/international` overseas patient desk landing page with visa request modal.
  - Built `/diagnostics` diagnostic directory with code search, preparation drawers, and sample booking modal.
  - Added unit test suite [`tests/unit/phase7.test.tsx`](file:///d:/healthcare/tests/unit/phase7.test.tsx).

## Next phase
**Phase 8 — Patient Knowledge & Plain-Language Portal**
*Scope (from File 08):*
Condition guide, 3-layer article format (30s / 3m / Deep dive), plain-language medical report explainer (`/portal`), careers page (`/careers`), and static policy pages (`/about`, `/contact`, `/sitemap`, `/accessibility`, `/demo-disclosure`).

## Decisions & assumptions
- All price calculator estimates carry explicit non-binding compliance disclaimers per File 01 rules.
- Diagnostic TAT turn-around times are stated in hours with clear fasting guidelines.

## Open questions / [VERIFY] items
- None.

## Known issues
- None. All quality checks (typecheck, lint, vitest 28/28, check:i18n, check:denylist, build) green.
