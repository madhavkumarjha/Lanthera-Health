# AGENT_START.md — Bootstrap Protocol for the Coding Agent

> **Trigger:** The user attached this file and said "let's go".
> **Your job right now:** read the docs → complete **Phase 0 (SETUP ONLY)** → **STOP** and wait.
> **You must NOT start Phase 1 or build any real feature, design, copy, image or animation in this run.**

---
## Step 1 — Locate & verify the docs
- Look in `/docs` (or the folder containing these files). Required, in this order:
  `01_PROJECT_BRIEF.md`, `02_BRAND_DESIGN_SYSTEM.md`, `03_SITEMAP_PAGES_CONTENT.md`, `04_SIGNATURE_FEATURES.md`, `05_MOTION_ANIMATION_SPEC.md`, `06_TECH_ARCHITECTURE.md`, `07_CONTENT_DATA_RESEARCH.md`, `08_ASSETS_BUILD_PHASES_QA.md`
- If any file is missing → list what's missing and **STOP** (do not guess).
- If a `PROGRESS.md` already exists → this is a resumed project: read it first, tell the user the current phase, and **STOP** asking what to do next (don't redo Phase 0).

## Step 2 — Read everything, then summarise (in chat, ≤ 15 lines)
Read all 8 files fully. Then post: project name & client type · reaction target · compliance rules you will obey · the signature features (names only) · pages count · chosen stack · the phase list from file 08 · any conflicts/ambiguities you found and the assumption you'll make (file 01 wins on conflicts).

## Step 3 — Execute Phase 0 (SETUP ONLY)
Follow file 08's Phase 0 if defined; otherwise do exactly this:
1. Scaffold the project with the stack in file 06 (default: Vite + React + TypeScript strict).
2. Install all dependencies listed in file 06 (routing, Tailwind, shadcn/Radix, Framer Motion, GSAP, Lenis, R3F/drei, Zustand, i18next, react-hook-form + zod, fuse.js, cmdk, jspdf, d3-geo, helmet, etc.). Pin versions.
3. Configure Tailwind + shadcn; create `tokens.css` with the **colour/type/spacing/easing tokens from file 02 and 05** (dark + light).
4. Self-host the fonts named in file 02 (`@fontsource`, subsets incl. regional script).
5. Create the folder structure from file 06.
6. Create `src/config/site.ts` filled from file 01 (name, tagline, lead person, contact placeholders, feature flags).
7. Create `src/types.ts` from the type contracts in file 06.
8. i18n skeleton: `en` + regional language namespaces (empty keys are fine), language store, `lang`/`data-theme` attributes on `<html>`.
9. Router with **every route from file 03** as a **minimal placeholder page** (page title + route name only). Minimal layout shell (empty header/footer containers). Lazy-loaded routes.
10. Tooling: ESLint, Prettier, Vitest, Playwright (one smoke test that visits every route), scripts from file 06.
11. Stubs: `README.md`, `PROGRESS.md`, `SOURCES.md`, `assets/manifest.json`, `.gitignore`, `.env.example` (if needed).
12. `git init` + first commit: `chore: phase 0 setup`.
13. **Verify** and fix until all pass: install ✔ · typecheck ✔ · lint ✔ · build ✔ · dev server boots ✔ · tests run ✔.

## Step 4 — Write `PROGRESS.md`
Sections: **Current phase** · **Completed phases** (with commit hash) · **Next phase** (name + 5-line scope from file 08) · **Decisions & assumptions** · **Open questions / [VERIFY] items** · **Known issues**. This file is your memory across sessions — always update it at the end of every phase.

## Step 5 — STOP. Report using this exact format
```
✅ PHASE 0 COMPLETE — SETUP ONLY
Stack: …
Routes scaffolded: N
Checks: install ✔ typecheck ✔ lint ✔ build ✔ dev ✔ tests ✔
Assumptions made: …
Risks / things I need from you: …
Next: Phase 1 — <name from file 08>
Reply "continue" to start Phase 1. I will not proceed until you do.
```
**Then send nothing else and do no further work.**

---
## HARD RULES (apply for the entire project)
1. **One phase per run.** After finishing a phase: update `PROGRESS.md`, commit, report, **STOP**. Proceed only when the user says "continue" (or "go all" — then run remaining phases sequentially, still committing and updating PROGRESS.md after each, and stopping on any failure).
2. Never modify the 8 spec files without asking. If you find an error in them, report it and propose a fix.
3. Do not generate images, write final copy, or build animations before the phase in file 08 that owns them.
4. Ask questions only when truly blocked. Otherwise assume, log the assumption in `PROGRESS.md`, and proceed.
5. Compliance rules in file 01 are absolute. Never invent facts, citations, or real-person claims. Log every research source in `SOURCES.md`.
6. Quality gates before ending any phase: typecheck + lint + build pass, no console errors, reduced-motion respected for anything animated, and the phase's items in file 08's checklist ticked.
7. Keep commits small and conventional (`feat:`, `fix:`, `chore:`, `docs:`).
8. If context is running out or a new session starts: read `PROGRESS.md` first, then the relevant spec files, then continue from "Next phase".
