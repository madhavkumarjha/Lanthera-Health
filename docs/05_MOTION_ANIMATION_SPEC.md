# 05 · MOTION & ANIMATION SPEC — Lanthera Health

## 1. Motion Principles (metaphor-driven)
1. **Light, not machinery.** Motion behaves like light spreading through a room: soft, radial, eased, never mechanical or bouncy.
2. **Calm is the brand.** Slow-in, slower-out. No shaking, flashing, parallax that induces nausea, or looping distractions.
3. **Motion explains.** Every animation communicates state, hierarchy or progress; if it doesn't, remove it.
4. **Never block the exit.** Emergency pill, navigation and forms are never delayed by animation.
5. **Respect the person.** Reduced-motion and Calm Mode are first-class experiences, not degraded fallbacks.

## 2. Toolkit
| Tool | Use |
|---|---|
| Framer Motion (`motion`) | Component enter/exit, layout, hover, shared-element transitions |
| GSAP + ScrollTrigger | Pinned scroll stories (Night Watch), timeline scrubbing |
| Lenis | Smooth scrolling (desktop only, disabled for reduced-motion/Calm) |
| CSS (`@property`, `mask`, `clip-path`) | Glow, reveal masks, lit windows |
| React Three Fiber + drei | One hero light-particle scene (lazy, optional) |
| Canvas 2D | Waiting Room Live ambient glow, lightweight |
| Lottie | Not used (prefer CSS/SVG to save bytes) |

## 3. Easing & Duration Tokens
| Token | Value | Use |
|---|---|---|
| `ease-glow` | `cubic-bezier(0.22, 0.61, 0.36, 1)` | Default enter |
| `ease-settle` | `cubic-bezier(0.16, 1, 0.3, 1)` | Large reveals |
| `ease-out-soft` | `cubic-bezier(0.33, 1, 0.68, 1)` | Exits |
| `ease-inout-calm` | `cubic-bezier(0.65, 0, 0.35, 1)` | Page transitions |
| `dur-instant` | 90ms | Focus/press feedback |
| `dur-fast` | 180ms | Hover, toggles |
| `dur-base` | 320ms | Cards, drawers |
| `dur-slow` | 600ms | Section reveals |
| `dur-cine` | 1000–1400ms | Hero/night transitions (desktop only) |
Stagger: 60ms (lists), 90ms (grids). Max simultaneous animated elements per viewport: 12.

## 4. Global Choreography
| Moment | Spec |
|---|---|
| **Loader** | ≤ 900ms: a single lantern mark ignites (glow scale 0.6→1, opacity 0→1); removed as soon as fonts + first paint ready; **never shown on repeat visits in same session**; skipped on `/emergency`. |
| **Page transitions** | "Light passes": radial amber wipe from click point (or centre for keyboard) 450ms in / 450ms out; content fades under it; focus moved to `<h1>` on arrival; reduced-motion → 120ms crossfade. |
| **Scroll progress** | Wick line grows with scroll (`scaleY` via CSS scroll-timeline where supported; GSAP fallback). |
| **Cursor** | Soft glow follower (24→48px on interactive), lerp 0.18; disabled on touch/reduced-motion; `mix-blend-mode` avoided for performance. |
| **Image reveals** | Mask "curtain of light": `clip-path` inset from bottom, 700ms, slight scale 1.06→1. Lazy-loaded with blur-up placeholder. |
| **Text reveals** | Headlines: line-by-line rise (24px, 500ms, stagger 70ms) using split by line (no per-letter for Devanagari — animate whole words to avoid glyph breakage). |
| **Magnetic buttons** | Primary CTAs pull toward cursor max 8px, spring (stiffness 220, damping 22); off on touch. |
| **Card hovers** | Lift 4px + glow edge (`box-shadow`), image scale 1.03, 320ms. Focus-visible triggers same. |
| **Emergency pill** | Static (no pulsing) with a *very* slow, subtle 6s glow breathe only if motion allowed; never flashes. |

## 5. Page-by-Page Signature Moments
| Page | Signature moment | Tech | Mobile tier |
|---|---|---|---|
| Home | Dusk→night scroll, building windows light up; hero glow follows cursor | GSAP + CSS | Static gradient + windows fade-in |
| About | "One night" timeline drawing along Wick line | ScrollTrigger scrub | Simple reveal |
| Departments | Lit-window grid: hover lights a window and dims neighbours | CSS + FM | Tap highlights |
| Doctors | Portrait halo ring draws around image on hover/focus | SVG stroke-dash | No draw, static ring |
| Circle of Care | Halo rings expand outward; nodes ease along orbits into place | FM + SVG | Accordion tree |
| Lantern Guide | Question cards slide with lantern glow moving to next step; result "lights up" | FM | Same, reduced blur |
| Book | Stepper wick fills progressively | CSS | Same |
| Emergency | No decorative motion; only focus/press feedback | — | Same |
| The Path | Wick line draws as user scrolls; current stop glows | ScrollTrigger + FM | Vertical accordion |
| Families / Board | Tokens change stage with soft flip; ambient slow glow | Canvas + CSS | Static |
| Clear Ledger | Stacked bars animate to ranges (min→max fill) | FM | Same |
| Portal | Card stagger on load; values count-up (≤ 600ms) | FM | Same |
| Understand | Depth switch morphs content height smoothly; scroll-linked diagram | FM layout | Same |
| International | Route line drawn between two abstract nodes (journey) | SVG stroke | Static line |
| Careers | Roles hover reveals a small lit-window illustration | CSS | Tap |
| Contact | Cards fade-in; form focus glow | CSS | Same |

## 6. Performance Guardrails & Budgets
| Metric | Target (mobile, mid-tier device, 4G) | Hard fail |
|---|---|---|
| LCP | ≤ 2.0s (Emergency ≤ 1.2s) | > 2.5s |
| CLS | ≤ 0.02 | > 0.05 |
| INP | ≤ 150ms | > 200ms |
| TBT | ≤ 150ms | > 300ms |
| Initial JS (route, gz) | ≤ 170KB | > 220KB |
| 3D/GSAP heavy chunks | lazy, ≤ 250KB gz each | > 320KB |
| Fonts | ≤ 4 files preloaded, ≤ 140KB total above the fold | > 200KB |
| Hero image | ≤ 180KB (AVIF/WebP), `fetchpriority=high` | > 260KB |
**Rules:** animate only `transform`/`opacity` (and `clip-path` sparingly); avoid layout-thrashing; `will-change` set only during animation; IntersectionObserver-based activation; pause off-screen canvases; cap DPR at 2; test on a throttled CPU (4× slowdown) in CI (Lighthouse CI).

## 7. Mobile Tier
- **Tier A (high-end):** full choreography except cursor effects.
- **Tier B (mid/low, detected by `deviceMemory ≤ 4` or `hardwareConcurrency ≤ 4`):** no Lenis, no R3F, reduced GSAP pinning (converted to simple reveals), shorter durations (×0.7).
- **Tier C (data-saver / `Save-Data`):** no video/3D, static gradients, lower-res images.

## 8. Reduced-Motion & Manual Toggles
- Honour `prefers-reduced-motion: reduce` automatically; provide a manual **Motion: Full / Reduced / Off** control (consent gate + header settings) stored locally.
- **Reduced:** replace movement with opacity fades ≤ 150ms; no parallax, no pinning, no auto-advancing content.
- **Off / Calm Mode:** zero transitions except focus indicators; static imagery; Night Watch becomes an ordered list.
- Nothing may flash more than 3 times per second (WCAG 2.3.1); no auto-playing media with sound.

## 9. Accessibility of Animated Canvases
- Each canvas/SVG scene has `role="img"` + descriptive `aria-label`, or is `aria-hidden` if purely decorative with equivalent text nearby.
- Pinned scroll stories provide **skip links** and DOM order that matches reading order.
- Pause/Play control for any auto-advancing element (Waiting Room Live demo, ambient loops) — WCAG 2.2.2.
- Focus never trapped by animations; focus management on route change; announcements via `aria-live="polite"` for status changes.
- Test with keyboard-only, VoiceOver/TalkBack, and NVDA; include Playwright a11y checks (axe) per page.
