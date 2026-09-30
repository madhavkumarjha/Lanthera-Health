# 06 · TECH ARCHITECTURE — Lanthera Health

## 1. Stack & Versions
> Pin exact versions in `package.json` at install time (use latest stable). Minimum majors below. **[VERIFY at install]**.
| Layer | Choice | Min major |
|---|---|---|
| Build | Vite | 6 |
| UI | React + TypeScript (strict) | React 19, TS 5.6 |
| Routing | React Router (data router) | 7 |
| Styling | Tailwind CSS + CSS variables (tokens from File 02) | 4 |
| Components | shadcn/ui (Radix primitives) | latest |
| Motion | `motion` (Framer Motion), GSAP + ScrollTrigger, Lenis | 12 / 3.12 / 1.x |
| 3D (optional, lazy) | three + @react-three/fiber + drei | r170+/9 |
| State | Zustand | 5 |
| i18n | i18next + react-i18next | 24+ |
| Search | Fuse.js | 7 |
| Command palette | cmdk | 1 |
| Forms | react-hook-form + zod | 7 / 3 |
| PDF (lazy) | @react-pdf/renderer (fallback jsPDF) | latest |
| Charts | custom SVG (preferred) or recharts | — |
| Testing | Vitest + Testing Library, Playwright (+ axe-core) | latest |
| Quality | ESLint (typescript-eslint, jsx-a11y), Prettier, Husky, lint-staged | latest |
| PWA | vite-plugin-pwa (Emergency page offline) | latest |
| Hosting target | Static (Vercel/Netlify/Cloudflare Pages) | — |
Overrides allowed only via INPUT BLOCK.

## 2. Folder Structure
```
/
├─ public/            fonts/, img/, og/, favicons/, manifest
├─ docs/              01…08 spec files, DEMO_SCRIPT.md
├─ src/
│  ├─ config/         site.ts, nav.ts, seo.ts, flags.ts
│  ├─ i18n/           index.ts, en/*.json, hi/*.json, ar-stub/*.json
│  ├─ data/           departments.ts, people.ts, packages.ts, ledger.ts, path.ts,
│  │                  guide-rules.ts, articles/*.mdx, portal.ts, glossary.ts, faq.ts
│  ├─ types.ts        shared contracts (see §3)
│  ├─ routes/         one file per page (lazy)
│  ├─ layouts/        RootLayout, PortalLayout
│  ├─ components/     ui/ (shadcn), shell/, motion/, features/<feature>/
│  ├─ hooks/          useMotionPref, useLocale, useTheme, useDeviceTier, useCommandPalette
│  ├─ lib/            utils.ts, seo.ts, pdf/, analytics-stub.ts, a11y.ts
│  ├─ store/          prefs.ts, guide.ts, booking.ts, board.ts
│  ├─ styles/         tokens.css, globals.css, print.css
│  └─ main.tsx, App.tsx
├─ tests/             unit/, e2e/ (playwright), a11y/
├─ assets/manifest.json   generated-asset registry
├─ PROGRESS.md · SOURCES.md · README.md
└─ vite.config.ts · tailwind.config.ts · tsconfig.json · playwright.config.ts
```

## 3. TypeScript Type Contracts (`src/types.ts`)
```ts
export type Locale = 'en' | 'hi';
export type I18n = { en: string; hi: string };

export interface SiteConfig { brandName: string; tagline: I18n; leadPersonId: string; city: string; country: string;
  emergencyNumber: string; locales: Locale[]; currency: string; demoBanner: boolean; indexable: boolean; }

export interface Department { slug: string; name: I18n; blurb: I18n; icon: string; image: string; conditions: I18n[];
  tests: string[]; headId: string; faq: { q: I18n; a: I18n }[]; audience: ('adult'|'child'|'women'|'senior')[]; }

export interface Person { id: string; name: string; role: I18n; kind: 'founder'|'head'|'doctor'|'nurse'|'diagnostics'|'resident';
  dept: string; reportsTo?: string; languages: string[]; regId: string; bio: I18n; portrait: string;
  qualifications: string[]; modes: ('in-person'|'tele')[]; demoSlots: string[]; }

export interface Package { id: string; name: I18n; includes: I18n[]; prep: I18n[]; durationMin: number; audience: string; }

export interface PathStop { id: string; title: I18n; who: string[]; durationRange: { minMin: number; maxMin: number };
  familyCan: I18n[]; bring: string[]; ask: I18n[]; related: string[]; }
export interface JourneyPath { id: 'emergency'|'surgery'|'daycare'|'maternity'|'outpatient'; title: I18n; stops: PathStop[]; }

export interface LedgerScenario { id: string; title: I18n; components: { key: string; min: number; max: number }[];
  roomMultipliers: Record<'ward'|'semi'|'private', number>; volatility: I18n[]; }

export interface GuideRule { id: string; when: (s: GuideState) => boolean; level: GuideResult['level']; priority: number; departments: string[]; }
export interface GuideState { redFlags: string[]; forWhom: 'self'|'child'|'older'|'pregnant'; duration: '<1d'|'1-7d'|'>1w';
  impact: 0|1|2|3; conditions: string[]; locale: Locale; }
export interface GuideResult { level: 'emergency'|'urgent'|'specialist'|'routine'|'info'; departments: string[];
  bring: string[]; ask: I18n[]; nextSteps: I18n[]; }

export interface Article { slug: string; dept: string; title: I18n; layers: { s30: I18n; m3: I18n; deep: I18n };
  glossary: string[]; askDoctor: I18n[]; sources: string[]; reviewedBy: string; reviewedOn: string; }

export interface Report { id: string; title: string; date: string; dept: string;
  values: { name: string; value: number; unit: string; refRange: [number, number] }[]; plainNotes: I18n; }

export interface WaitToken { id: string; stage: 'prep'|'procedure'|'recovery'|'ready'; updatedAt: string; note?: I18n; }
export interface AssetEntry { id: string; path: string; prompt?: string; size: string; status: 'generated'|'fallback'|'pending'; alt: I18n; }
```

## 4. Routing & Transition Mechanics
- Data-router with **lazy route modules** (`lazy: () => import(...)`), prefetch on hover/focus/idle for likely next routes.
- Locale prefix `/:locale/*`; redirect `/` → detected locale.
- Page transition wrapper (`AnimatePresence` + radial wipe overlay) keeps old page until new module is ready (max 700ms wait, then transition anyway).
- On route change: scroll to top (or hash), set `document.title`, move focus to `main h1`, announce via live region.
- `/emergency`, `/privacy`, `/terms` are **not lazy** (bundled in main, minimal deps).

## 5. Rendering & Loading Strategy
- SPA with **prerendering** (`vite-plugin-ssg` or `react-snap`-equivalent) for all static routes to improve SEO and LCP **[VERIFY tool at scaffold]**.
- Critical CSS inlined; fonts preloaded (Fraunces variable subset, Instrument Sans 400/600).
- Images: AVIF + WebP + fallback JPEG, `srcset` (480/768/1200/1920), blur-up LQIP, lazy below fold.
- Heavy libs (GSAP, three, react-pdf) dynamically imported per feature; R3F only on Home hero when Tier A and not reduced-motion.
- Service worker: precache shell + `/emergency` (stale-while-revalidate for the rest).

## 6. Theming & i18n Mechanics
- Tokens as CSS variables on `:root[data-theme="light|dark"]`; Tailwind maps to variables. "Auto" chooses by `prefers-color-scheme` **and** local time (dark 19:00–06:00) unless user overrides.
- i18n namespaces per page (`common`, `home`, `guide`, `ledger`, …); missing key → build-time failure in CI (script compares en/hi key sets).
- Logical CSS properties everywhere; `dir` attribute set from locale config.
- Font loading per locale (Devanagari fonts only loaded when `hi`).

## 7. State Management
| Store | Contents | Persistence |
|---|---|---|
| `prefs` | locale, theme, motion, textSize, consent | `localStorage` (only after consent; default in-memory) |
| `guide` | `GuideState`, step, result | `sessionStorage` |
| `booking` | mock booking draft | in-memory |
| `board` | simulated tokens | in-memory |
| `portal` | demo session flag | `sessionStorage` |
Server state: none. Data imported statically.

## 8. Security & Privacy Posture
- No third-party scripts/trackers; strict **CSP** (script-src 'self'; style-src 'self' 'unsafe-inline' only if needed; img-src 'self' data:; connect-src 'self'); `Referrer-Policy: no-referrer`; `Permissions-Policy` denies camera/mic/geolocation.
- Forms: client-side zod validation, no network calls, honeypot not needed. Show data notice.
- No PII in logs; analytics stub is a no-op interface (`track()`) for white-label swap.
- Dependency hygiene: `npm audit` in CI; lockfile committed; Renovate/Dependabot config stub.
- Demo data flagged `isDemo: true`; a build-time check fails if any string contains real-brand denylist terms (maintained in `scripts/denylist.txt`).

## 9. Scripts, README, White-Label Readiness
**npm scripts:** `dev`, `build`, `preview`, `typecheck`, `lint`, `format`, `test`, `test:e2e`, `test:a11y`, `lhci`, `check:i18n`, `check:denylist`, `assets:manifest`, `prerender`.
**README must include:** what this is (demo) · quick start · scripts table · folder map · how to change brand/config · how to add a department/doctor/article · i18n workflow · asset generation workflow · performance budgets · accessibility checklist · compliance disclaimer · licence notes for fonts/libs.
**White-label:** rebranding requires only: `config/site.ts`, `tokens.css`, `/public/img` + logos, and `i18n` JSON. No brand strings hard-coded in components (lint rule `no-restricted-syntax` + denylist test).
