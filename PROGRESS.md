# PROGRESS.md — Project Memory & Tracking

## Current phase
Phase 1 — Foundation & Emergency First (Complete)

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

## Next phase
**Phase 2 — Brand & Home Hero**
*Scope (from File 08):*
Logo/favicons, fonts applied, hero imagery, Home hero + route tiles, page transitions ("Light passes"), loader, cursor, scroll progress. Exit criteria: Home hero interactive, dusk-to-night story working, route transitions smooth.

## Decisions & assumptions
- Emergency pill is styled with `--emergency` color and pinned to header/floating menu.
- First visit consent gate stores preferences locally only; default posture is minimum storage.
- All 28 routes wrapped in RootLayout with responsive mobile navigation drawer.

## Open questions / [VERIFY] items
- Confirm exact favicon assets set generation for Phase 2.

## Known issues
- None. All quality checks (typecheck, lint, test, i18n, denylist, build) green.
