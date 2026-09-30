# 02 · BRAND & DESIGN SYSTEM — Lanthera Health

## 1. Central Metaphor: **The Lantern** — "The light stays on."
A lantern is what you look for in the dark; it is small, human, warm, and never leaves. It maps to a 24×7 hospital, a guided journey, and calm authority.

**Recurring motifs (use all, with discipline):**
| # | Motif | Where it appears |
|---|---|---|
| 1 | **The Glow** (soft amber radial light) | Hover states, focus rings, active nav, section openers, loader |
| 2 | **The Wick line** (thin vertical amber line) | Scroll progress, timeline spines, The Path, section dividers |
| 3 | **Lit windows** (grid of small rooms/cells that light up) | Night Watch, department grid, Waiting Room Live board |
| 4 | **Paper-lantern folds** (subtle pleated texture) | Backgrounds of hero/footer, card edges (very low opacity) |
| 5 | **Halo rings** (concentric soft circles) | Circle of Care hierarchy, doctor portrait frames |
| 6 | **Hour marks** (clock-tick ornament) | 24×7 emphasis, Emergency page, timelines |

## 2. Colour Tokens
### 2.1 Dark theme ("Night Ward" — default on first load after 19:00 local, else light)
| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#161018` | Page background |
| `--surface` | `#211826` | Cards, panels |
| `--surface-2` | `#2C2033` | Raised/hover surfaces |
| `--text` | `#F4ECE1` | Body text (contrast on bg ≥ 13:1) |
| `--text-muted` | `#B9AAB8` | Secondary text (≥ 7:1) |
| `--line` | `#3A2C42` | Borders, dividers |
| `--accent` | `#F0B24A` | Lantern amber — primary accent/CTA |
| `--accent-ink` | `#2A1B05` | Text on accent buttons (≥ 9:1) |
| `--clay` | `#D9744E` | Secondary accent, warm highlights |
| `--sage` | `#8DB197` | Positive/calm states, success |
| `--plum` | `#B98AD1` | Tertiary, data-viz accent |
| `--emergency` | `#FF5A4F` | **Emergency only** (never decorative) |

### 2.2 Light theme ("Parchment Day")
| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#F7F0E6` | Page background |
| `--surface` | `#FFFBF5` | Cards |
| `--surface-2` | `#EFE5D6` | Raised/hover |
| `--text` | `#231A26` | Body (≥ 14:1) |
| `--text-muted` | `#5E4F60` | Secondary (≥ 7:1) |
| `--line` | `#DCCDB9` | Borders |
| `--accent` | `#B96A0E` | Amber (darkened for AA on light) |
| `--accent-ink` | `#FFF8EC` | Text on accent |
| `--clay` | `#B4472A` | Secondary accent |
| `--sage` | `#3F7A57` | Success/calm |
| `--plum` | `#7A3F9B` | Tertiary |
| `--emergency` | `#C21F1F` | Emergency only |

### 2.3 Contrast & usage rules
- Body text ≥ 4.5:1 (target 7:1); large text/UI ≥ 3:1; verify with automated axe + manual spot checks.
- Accent amber is never used for body text on light theme.
- Colour never carries meaning alone (pair with icon/label).
- `--emergency` appears only on: Emergency pill, Emergency page, red-flag alerts in Lantern Guide.
- Gradients: only `radial(accent → transparent)` glows, max 20% opacity on light, 35% on dark.

## 3. Typography (all self-hosted, WOFF2, `font-display: swap`, subset)
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | **Fraunces** (variable, SOFT axis ~50) | 300–700 | Warm serif, headlines |
| Text | **Instrument Sans** | 400, 500, 600 | UI + body |
| Mono | **JetBrains Mono** | 400, 500 | Numbers, IDs, hour marks, tokens |
| Hindi (Devanagari) | **Noto Serif Devanagari** (display), **Noto Sans Devanagari** (text) | 400–700 | Line-height +0.1 vs Latin |
| RTL-ready (future) | **Noto Naskh Arabic** | 400–700 | Loaded only if `ar` locale enabled |

**Scale (fluid, `clamp`)**
| Style | Size | Line-height | Tracking |
|---|---|---|---|
| Display XL | 56–120px | 1.02 | -0.02em |
| H1 | 40–72px | 1.08 | -0.015em |
| H2 | 30–48px | 1.15 | -0.01em |
| H3 | 22–30px | 1.25 | 0 |
| Body L | 18–20px | 1.6 | 0 |
| Body | 16–17px | 1.65 | 0 |
| Caption | 13–14px | 1.5 | 0.01em |
| Mono label | 12–13px, uppercase | 1.4 | 0.08em |

**Rules:** max line length 68ch; Text-size control scales root font 100% / 115% / 130%; no text below 14px on mobile except mono labels (≥ 12px, ≥ 4.5:1).

## 4. Layout, Spacing, Radius, Elevation
- **Grid:** 12-col desktop (max 1360px, 24px gutters), 8-col tablet, 4-col mobile; editorial asymmetry allowed (offset columns, oversized numerals).
- **Spacing scale (px):** 4, 8, 12, 16, 24, 32, 48, 72, 112, 168. Section padding: 112 desktop / 72 mobile.
- **Radius:** `sm 8`, `md 16`, `lg 28`, `pill 999`. Lantern-shaped card = `28px 28px 12px 12px`.
- **Elevation:** soft glow shadows only: `0 10px 40px -12px rgba(240,178,74,.25)` (dark) / `0 10px 40px -14px rgba(90,50,10,.25)` (light).
- **Focus ring:** 3px amber outline + 2px offset, always visible.

## 5. Component Inventory
Header (with Emergency pill) · Mega-menu · Footer · Consent gate modal · Demo banner · Command palette (⌘K) · Language/Theme/Calm/Text-size controls · Buttons (primary/secondary/ghost/emergency, magnetic) · Chips/filters · Cards (department, doctor, package, article, timeline stop) · Accordion/FAQ · Tabs · Stepper (Guide, Booking) · Range/estimate bar · Data table · Tooltip glossary term · Toast · Skeletons · Modal/Drawer · Timeline (Path) · Constellation (Circle of Care) · Status board (Waiting Room Live) · Portal shell (sidebar, cards, report viewer) · PDF summary template · Breadcrumbs · Form fields with plain-language help text.

## 6. Iconography
- Custom 1.5px stroke, rounded caps, 24px grid; 60 icons (departments, facilities, journey stops, tools). Built as SVG sprite with `currentColor`.
- Icons must have text alternatives or `aria-hidden` when decorative.

## 7. Imagery Direction
**Look:** Cinematic, warm, human, low-key lighting, amber practical lights, film-grain subtle, shallow depth of field. Hospital seen as *a place of care at all hours*, not a machine.

**Master image-prompt template**
```
[SUBJECT & ACTION], [SETTING], warm amber practical lighting with deep aubergine shadows,
cinematic editorial photography, 35mm, shallow depth of field, soft film grain,
natural diverse people (no faces recognisable as real individuals), calm and dignified mood,
no text, no logos, no watermarks, no stethoscope-on-white cliché, no blue-white clinical look,
composition: [rule-of-thirds / negative space left for text], aspect ratio [ratio]
```
**Forbidden imagery:** stock-style smiling doctor with arms crossed · stethoscope hero · blue/white sterile scenes · DNA helix · heartbeat line · gore/surgical close-ups · identifiable real people/celebrities · real brand equipment logos · before/after · children in distress · text baked into images.

**Required image set (minimum; full table with sizes in File 08)**
| Group | Count | Aspect | Subject examples |
|---|---|---|---|
| Hero/cinematic | 6 | 16:9 | Night corridor with lantern-like light; hands held in waiting room; early-morning ward rounds |
| Departments | 12 | 4:5 | One abstract-human scene per department (no procedures graphic) |
| People portraits (fictional, AI-generated) | 45 | 4:5 | Doctors/nurses, diverse, professional, warm light |
| Journey stops | 9 | 3:2 | Arrival, triage, ward, diagnostics, discharge |
| Facilities | 8 | 3:2 | Reception, ICU exterior corridor, pharmacy, lab, cafeteria, prayer/quiet room |
| Editorial/Understand | 20 | 3:2 & 1:1 | Illustrated (not photographic) explainer visuals |
| OG/social | 5 | 1200×630 | Brand-consistent cards |
**Procedural fallbacks** (if generation fails): SVG/CSS glow gradients + paper-fold pattern + duotone silhouettes; never show an empty box.

## 8. Logo Concept & Deliverables
**Concept:** A minimalist lantern whose flame is a rounded drop that doubles as the negative space of an "L". Wordmark "Lanthera" in Fraunces (SOFT 50), "Health" in Instrument Sans caps, tracking 0.2em.
**Deliverables:** `logo-primary.svg`, `logo-mark.svg`, `logo-mono-light.svg`, `logo-mono-dark.svg`, `logo-stacked.svg`, animated `logo-glow.svg` (CSS-only), 4 clear-space/min-size rules (mark min 20px, wordmark min 96px).
**Favicon set:** `favicon.ico`, `favicon.svg` (adaptive dark/light), `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`, `maskable-512.png`, `site.webmanifest`, `safari-pinned-tab.svg`.

## 9. Voice & Tone
- **Principles:** Plain words · Short sentences · Say what happens next · Acknowledge feelings without drama · Never boast.
- **Do:** "Here is what usually happens in the first hour." **Don't:** "World-class care you can trust!"
- **Sample H1:** *"You are not alone in this. Here is what happens next."*
- **Sample CTA labels:** "Find the right place to go" · "See what happens next" · "Understand your bill" · "Talk to us now".
- Reading level target: grade 7–8 (Flesch ≥ 60) for all patient-facing copy.
