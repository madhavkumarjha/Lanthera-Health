# PROGRESS.md — Project Memory & Tracking

## Current phase
Phase 2 — Brand & Home Hero (Complete)

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

- **Phase 2 — Brand & Home Hero** (commit: `phase-2-complete`)
  - Created complete SVG & raster logo deliverables (`logo-primary.svg`, `logo-mark.svg`, `logo-mono-light.svg`, `logo-mono-dark.svg`, `logo-stacked.svg`, `logo-glow.svg`) and favicon set (`favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `maskable-512.png`, `site.webmanifest`, `safari-pinned-tab.svg`)
  - Generated cinematic hero image assets (`public/img/hero/hero-01.webp` through `hero-06.webp`) and procedural SVGs, updated `assets/manifest.json` with bilingual alt text
  - Self-hosted fonts verified and applied (`Fraunces`, `Instrument Sans`, `JetBrains Mono`, `Noto Devanagari`)
  - Built session-based ignition `Loader` (skipped on `/emergency`, stored in `sessionStorage`)
  - Created `ScrollProgress` Wick line scroll progress indicator
  - Built `CustomCursor` glowing follower for desktop (auto-disabled on touch/reduced motion)
  - Built `PageTransition` radial amber light wipe transition ("Light passes")
  - Built interactive `HomePage` hero with Fraunces Display XL headline (*"You are not alone in this. Here is what happens next."*), interactive dusk-to-night ambient glow, and 8 lantern-shaped signature route tiles (`Lantern Guide`, `The Path`, `The Night Watch`, `Waiting Room Live`, `Clear Ledger`, `Circle of Care`, `Lantern Portal & Diagnostics`, `Understand Hub`)
  - Added unit test suite `tests/unit/phase2.test.tsx`

## Next phase
**Phase 3 — Lantern Guide (highest utility)**
*Scope (from File 08):*
Rule table, flow, result, PDF prep sheet (EN/HI), tests for red-flag logic.

## Decisions & assumptions
- Logo ignition animation is capped at ≤ 850ms to meet LCP performance budget.
- Custom cursor is strictly disabled on touch devices and when prefers-reduced-motion is true.
- Home hero imagery uses WebP primary with procedural SVG fallback to guarantee zero broken images.

## Open questions / [VERIFY] items
- None.

## Known issues
- None. All quality checks (typecheck, lint, test, i18n, denylist, build) green.
