# 04 · SIGNATURE FEATURES — Lanthera Health

> Each feature: **Idea · Customer benefit · UX flow · Data shape · Edge cases · Build notes · Compliance guardrails**.
> All tools carry the label: **"Indicative · General information · Not medical, legal or financial advice."**

---
## Feature 1 — The Night Watch (scroll-told story)
**Idea:** One 24-hour cycle at the hospital told through scroll. As the visitor scrolls from dusk to dawn, windows of a building silhouette light up and each "hour" reveals who is awake and what they are doing (triage nurse, lab technician, night pharmacist, surgeon, housekeeping, chaplain).
**Customer benefit:** Shows that care continues at 3 a.m. and demystifies who is behind the doors — reassurance without claims.
**UX flow:**
1. Pinned scene (GSAP ScrollTrigger, desktop) / vertical cards (mobile): 18:00 → 06:00, 12 "hour beats".
2. Each beat: hour mark (mono), lit window, 40-word story, tiny illustrated vignette.
3. Skip link "Skip story" and a static list alternative (`<ol>`) for a11y.
4. End: CTA "See what happens when you arrive" → The Path.
**Data shape:**
```json
{ "beats": [{ "hour": "03:00", "role": "Night pharmacist", "roomId": "pharmacy",
  "story": { "en": "...", "hi": "..." }, "art": "/img/nightwatch/03.webp" }] }
```
**Edge cases:** Reduced motion → static ordered list with same content; slow devices → no pinning; very short viewport → cards.
**Build notes:** GSAP + ScrollTrigger; SVG building with 40 window `<rect>`s toggled via CSS class; Lenis smooth scroll disabled in reduced-motion.
**Compliance:** Roles are fictional and generic; no claims of "best staffing".

---
## Feature 2 — Lantern Guide (interactive "where should I go?" guide)
**Idea:** A calm 6–8 question guide that helps a visitor choose the **right level of care** (emergency now / urgent same-day / book a specialist / routine or preventive / self-care information) and outputs a **downloadable one-page Visit Prep Sheet** (what to bring, questions to ask, which department, what will happen).
**Customer benefit:** Reduces "should I go? where? what do I bring?" anxiety; produces something useful even offline.
**UX flow:**
1. Screen 0: disclaimer + emergency shortcut ("Call now" always pinned).
2. Screen 1 — **Red-flag check first** (checkbox list of generic danger signs, e.g., trouble breathing, chest pressure, sudden weakness, severe bleeding, unconsciousness, seizure, severe allergic reaction). Any tick → **immediate Emergency result** (skip rest).
3. Screens 2–6: who is it for (self / child / older adult / pregnant), how long, how much it affects daily life (slider), existing conditions (multi-select, optional), preferred language.
4. Result: care-level card + suggested department(s) + "questions to ask" + "what to bring" + "what happens next" mini-Path.
5. Actions: **Download PDF**, Copy text, Print, Book (mock) prefilled, Clear session.
**Data shape:**
```ts
type GuideState = { redFlags: string[]; forWhom: 'self'|'child'|'older'|'pregnant';
  duration: '<1d'|'1-7d'|'>1w'; impact: 0|1|2|3; conditions: string[]; locale: 'en'|'hi' };
type GuideResult = { level: 'emergency'|'urgent'|'specialist'|'routine'|'info';
  departments: string[]; bring: string[]; ask: string[]; nextSteps: string[]; disclaimerId: string };
```
Rules live in `data/guide-rules.ts` as a **transparent rule table** (visible on "How this works" drawer).
**Edge cases:** Any red flag = emergency; child + high impact = urgent minimum; unknown/none selected → "call us" fallback; user goes back → state preserved; refresh → sessionStorage restore.
**Build notes:** Zustand store; `@react-pdf/renderer` (lazy) or `jsPDF`; PDF in EN/HI (embed Devanagari font); ARIA live region for step changes.
**Compliance:** **No diagnosis, no condition names as outputs, no medication advice.** Output is *care-setting routing only*. Persistent statement: "This guide cannot assess emergencies." No data leaves browser.

---
## Feature 3 — The Path (patient journey map)
**Idea:** Interactive timeline of admission → discharge for 5 journey types, answering "what happens next?" at each stop with who you'll meet, typical duration ranges, what to bring, and what to ask.
**Customer benefit:** Turns an unknown, frightening process into a visible map.
**UX flow:** Select path → vertical Wick-line timeline with stops (icon, title, indicative duration, "you may be asked", "family can…"). Click a stop → drawer with details + related Understand articles. "Print checklist" button. Progress toggle "Where are you now?" highlights current stop and shows the next one.
**Data shape:**
```ts
type PathStop = { id: string; title: I18n; who: string[]; durationRange: {minMin:number;maxMin:number};
  familyCan: I18n[]; bring: string[]; ask: I18n[]; related: string[] };
type JourneyPath = { id: 'emergency'|'surgery'|'daycare'|'maternity'|'outpatient'; stops: PathStop[] };
```
**Edge cases:** Duration ranges must show "varies by situation"; no promise of wait time; mobile uses accordion.
**Build notes:** Framer Motion layout animations; keyboard-navigable; deep-linkable stop (`/path/surgery#anaesthesia`).
**Compliance:** Durations labelled *indicative*; no clinical promises.

---
## Feature 4 — Clear Ledger (billing & insurance transparency)
**Idea:** An **estimate explorer** that shows a **range** for typical stays/procedures with a visual breakdown (room, professional fees, diagnostics, medicines, consumables) and an insurance glossary that explains terms (co-pay, deductible, pre-authorisation, exclusions, sub-limits, room-rent cap).
**Customer benefit:** Removes billing fear; families know what questions to ask before admission.
**UX flow:** Choose scenario (e.g., "Planned day-care procedure", "3-night ward stay", "Maternity - normal delivery", "Maternity - planned surgical delivery", "Health screening") → choose room type → toggle insurance (yes/no + cover type) → see min–max range with stacked bar + "what can change this" list → download **Cost Conversation Sheet** (questions to ask billing desk).
**Data shape:**
```ts
type LedgerScenario = { id: string; title: I18n; components: { key: 'room'|'fees'|'diagnostics'|'medicines'|'consumables'|'other';
  min: number; max: number }[]; roomMultipliers: Record<'ward'|'semi'|'private', number>;
  volatility: I18n[]; currency: string };
```
**Edge cases:** All numbers are fictional and must display "Demo figures"; no exact totals; if insurance chosen, show "coverage depends on your policy — ask your insurer".
**Build notes:** Pure client calculation; recharts or custom SVG; PDF export.
**Compliance:** No promotions, no price comparisons with other hospitals, no claims of cheapest.

---
## Feature 5 — Circle of Care (team hierarchy showcase)
**Idea:** A constellation of halo rings: Founder at centre → department heads → doctors → nursing/diagnostics/residents. Choose a department to see who leads whom and "who you'll meet at each stage".
**Customer benefit:** Makes accountability visible; helps families know whom to ask.
**UX flow:** Overview constellation → hover/focus reveals name/role → click opens panel (bio, reports-to, team) → toggle "List view" (accessible tree) → filter by language spoken.
**Data shape:**
```ts
type Person = { id: string; name: string; role: string; dept: string; reportsTo?: string;
  languages: string[]; regId: string; bio: I18n; portrait: string; kind: 'founder'|'head'|'doctor'|'nurse'|'diagnostics'|'resident' };
```
**Edge cases:** 60+ nodes on mobile → collapse to department accordion tree; missing portrait → initials on glow.
**Build notes:** d3-force (static layout precomputed) or hand-authored positions; canvas/SVG hybrid; aria-tree fallback.
**Compliance:** No "top doctor" labels; fictional names; registration placeholders.

---
## Feature 6 — Lantern Portal (demo dashboard)
**Idea:** A full demo of the patient portal for a fictional patient (**Alex Demo**): appointments, reports with plain-language explanations, bills, medicines list, timeline of care, secure-message mock.
**Customer benefit (for client & visitors):** Shows how information will feel *after* care — organised and understandable.
**UX flow:** Landing → "Enter demo" → Dashboard (next appointment, latest report, outstanding bill) → Reports (list, viewer with **"What this term means"** glossary chips) → Appointments (upcoming/past, reschedule mock) → Bills (itemised, insurer status mock) → Care timeline (Wick line) → Messages (canned demo threads).
**Data shape:**
```ts
type Report = { id: string; title: string; date: string; dept: string; values: { name:string; value:number; unit:string; refRange:[number,number] }[];
  plainNotes: I18n; disclaimer: I18n };
```
**Edge cases:** Out-of-range values shown neutrally ("outside the usual range — your doctor will explain"); no colour-only signalling.
**Build notes:** Route-level code-split; mock data in TS; no auth.
**Compliance:** Values are fictional; **no interpretation beyond glossary**; banner "Demo data".

---
## Feature 7 — Understand (three-layer explainers)
**Idea:** Every health topic exists in three depths: **30-second** (plain summary), **3-minute** (what/why/what to expect), **Deep** (terminology, process, questions to ask). Plus illustrated process walkthroughs and a **glossary tooltip layer**.
**Customer benefit:** Fits anxious, rushed and curious readers alike.
**UX flow:** Depth switch (segmented control) persists across articles; scroll-linked illustration for process; "Questions to ask your doctor" checklist (printable); reading-time estimate; "Explain simply" toggle swaps jargon for plain terms.
**Data shape:**
```ts
type Article = { slug: string; dept: string; title: I18n; layers: { s30: I18n; m3: I18n; deep: I18n };
  glossary: string[]; askDoctor: I18n[]; sources: string[]; reviewedBy: string; reviewedOn: string };
```
**Edge cases:** Missing HI translation blocks publishing (build-time check).
**Build notes:** MDX or typed content; Fuse.js search; JSON-LD `MedicalWebPage`.
**Compliance:** Educational only; every claim cited in `SOURCES.md`; no treatment recommendations.

---
## Feature 8 — Waiting Room Live (family status board)
**Idea:** An airport-style board showing **anonymised tokens** (e.g., "Token L-204") with generic stage labels ("In preparation", "In procedure", "Recovery", "Ready to meet family"). Families know something is moving.
**Customer benefit:** Cuts the uncertainty of waiting hours.
**UX flow:** Demo board auto-advances a few fictional tokens; user can "Track a demo token"; each stage has a plain-language explanation and typical duration range; optional calm ambient mode (slow lantern glow, large type).
**Data shape:**
```ts
type Token = { id: string; stage: 'prep'|'procedure'|'recovery'|'ready'; updatedAt: string; note?: I18n };
```
**Edge cases:** Never show names or diagnoses; if network offline → stale banner; text-size respected; reduced-motion = no auto-scroll.
**Build notes:** `setInterval` simulator; aria-live polite updates; large-screen (TV) layout at `/families/board`.
**Compliance:** Privacy by design — token-only, no PII; explains real-world implementation would need consent.

---
## Supporting Delights
| Delight | Detail |
|---|---|
| Command palette (⌘K) | Search pages, doctors, departments, articles; quick actions (Emergency, Book, Guide, toggle theme/language). |
| Language toggle | EN/HI instant, remembers choice locally. |
| Theme toggle | Light/Dark/Auto (Auto = time-of-day aware). |
| Calm Mode | Reduces motion, mutes glow, larger text, simplified layout. |
| Text-size control | 100/115/130%. |
| Reading ruler | Optional focus band for long articles. |
| Print stylesheets | Clean printouts for Path, Guide, Ledger. |
| Easter egg | Long-press the logo → the whole site dims and lantern glows ("Lights low"). |
| Offline-friendly Emergency page | Cached via service worker. |
