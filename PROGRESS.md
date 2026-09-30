# PROGRESS.md — Project Memory & Tracking

## Current phase
Phase 3 — Lantern Guide (highest utility) (Complete)

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

- **Phase 3 — Lantern Guide (highest utility)** (commit: `phase-3-complete`)
  - Created transparent decision rules table (`src/data/guide-rules.ts`) with priority-based evaluation logic for care levels (`emergency`, `urgent`, `specialist`, `routine`, `info`).
  - Created Zustand state store (`src/store/guideStore.ts`) supporting step navigation, red-flag checks, and session restoration.
  - Built PDF Visit Prep Sheet generator (`src/utils/pdfGenerator.ts`) creating branded A4 single-page prep sheets in EN/HI.
  - Built full interactive stepped `GuidePage` (`/guide`) featuring mandatory disclaimer banner, 4-step questionnaire (Step 0: Red flags, Step 1: Target audience, Step 2: Duration & impact, Step 3: Conditions), result view with care level card, interactive "What to bring" packing checklist, "Questions to ask doctor" list, arrival steps roadmap, PDF download, summary copy, print, and transparent rule table modal drawer.
  - Added unit test suite `tests/unit/phase3.test.tsx` for red-flag routing, priority logic, store state resets, and disclaimer rendering.

## Next phase
**Phase 4 — The Night Watch + Home story**
*Scope (from File 08):*
SVG building, GSAP story, static fallback, mobile tier. Exit criteria: Night Watch scroll story interactive, lit windows working, static fallback for reduced motion/mobile.

## Decisions & assumptions
- Any red flag checked immediately routes to Emergency care level, skipping remaining questions.
- PDF Visit Prep Sheet generator uses client-side `jspdf` for zero backend dependency.
- All 7 rules are transparently inspectable via the "How this works" drawer modal.

## Open questions / [VERIFY] items
- None.

## Known issues
- None. All quality checks (typecheck, lint, vitest 9/9, check:i18n, check:denylist, build) green.
