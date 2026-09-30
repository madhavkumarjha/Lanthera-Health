# 03 · SITEMAP, PAGES & CONTENT — Lanthera Health

## 1. Global Elements
| Element | Spec |
|---|---|
| **Header** | Logo · primary nav (Care ▾, Doctors, The Path, Clear Ledger, Understand, International) · **Emergency pill** (always visible, emergency colour, 1-click to `/emergency`) · ⌘K search · language · theme · Calm Mode · text size. Hides on scroll-down, returns on scroll-up (never hides Emergency pill). |
| **Mega-menu** | Care ▾ shows departments grid with lit-window icons + "Find the right place" (Lantern Guide) link. |
| **Footer** | Sitemap · emergency block ("If this is an emergency, call your local emergency number") · demo disclosure · legal links · language switch · accessibility statement · "Made as a demo" note. |
| **Demo banner** | Slim top bar, dismissible per session, reappears on new session. |
| **Consent gate** | First visit modal: language, motion, text size, local-storage consent. |
| **Cursor** | Custom soft-glow cursor on fine-pointer devices only; disabled on touch and reduced-motion; native cursor over inputs/links text. |
| **Page transitions** | "Light passes" — a warm glow wipe (400–600ms) between routes; skipped under reduced-motion (instant fade). |
| **Floating launcher** | Bottom-right: opens quick menu → Emergency · Find where to go · Book · Language. Keyboard reachable (`g` then `l`). |
| **Scroll progress** | Vertical Wick line at left edge (desktop), thin top bar (mobile). |

## 2. Pages (each: purpose · ordered sections · signature moment · content rules)

### 2.1 Home `/`
- **Purpose:** Orient and reassure in 30 seconds; route to the right journey.
- **Sections:** (1) Hero: H1 + "What do you need right now?" 4 large route tiles (Emergency · Find where to go · Book · Visit someone) (2) Night Watch scroll story (3) Lantern Guide teaser (4) The Path teaser (5) Circle of Care preview (6) Clear Ledger teaser (7) Understand featured (8) International strip (9) Closing: "The light stays on" + contact.
- **Signature moment:** Hero lantern glow follows cursor; scrolling turns dusk to night, lighting windows in a building silhouette.
- **Rules:** No superlatives; no stats about outcomes; numbers (beds, departments) labelled "demo".

### 2.2 About / Our Story `/about`
- Sections: founder note (fictional Dr. Mira Alden) · principles (Clarity before care) · facilities gallery · accreditations placeholders (clearly fictional, no real logos) · leadership hierarchy preview · community & ethics (patient rights, grievance process).
- Signature: timeline of "one night at Lanthera" (shorter Night Watch variant).

### 2.3 Departments `/departments` and `/departments/:slug`
- List: 12 departments as lit-window grid; filters by "I'm looking for: adult / child / women / senior".
- Detail: what we care for (plain language) · conditions treated (educational list) · common tests/procedures explained (link to Understand) · team (link to doctors) · what to bring · what to expect (mini-Path) · FAQ · related articles.
- Rules: No outcome/success claims; procedures explained neutrally with "your doctor will advise" language.

### 2.4 Doctors `/doctors` and `/doctors/:slug`
- Directory: search + filters (department, language spoken, gender, availability window (demo), telehealth). Cards show name, role, qualifications, languages, "next demo slot".
- Profile: portrait (fictional AI-generated, labelled), bio (education, training, areas of interest), registration ID placeholder `REG-DEMO-0000`, languages, consultation modes, "Book" button, reports-to line.
- Rules: No ratings/testimonials/"best doctor" language; no fabricated publications attributed to real journals.

### 2.5 Circle of Care `/team`
- Interactive constellation: Founder → Department heads → Doctors → Nursing/Diagnostics/Residents. Click a node → side panel with role, responsibilities, "you will meet them when…".
- Signature: halo rings expand/collapse; keyboard navigable list alternative always available.

### 2.6 Lantern Guide `/guide`
- See File 04, Feature 2. Page sections: intro + disclaimer · guided flow · result + downloadable Visit Prep Sheet · "Not sure? Call us" · privacy note.

### 2.7 Book Appointment `/book` (mock)
- 4-step stepper: Choose need (department or "Not sure → Guide") · Choose doctor/time (demo slots) · Your details (minimal) · Confirmation (mock reference + .ics download + prep checklist).
- Rules: Every step shows data notice; no real transmission; success page says "Demo booking".

### 2.8 Emergency 24×7 `/emergency`
- Sections: giant call block (fake number labelled) · "Signs to act now" (generic red-flag list, not diagnostic) · "What to do while you travel" (general first-aid pointers: stay calm, bring ID/medicines list) · what we do on arrival (triage colours explained) · directions/arrival map (illustrative) · accessibility/ambulance info · disclaimer.
- Rules: Must load < 1.2s LCP on 4G; zero animation blocking content; works with JS-light fallback.

### 2.9 The Path `/path`
- See File 04, Feature 3. Sections: pick a path (Emergency admission · Planned surgery · Day-care · Maternity · Outpatient) · interactive timeline · "who you'll meet" · "what to bring" · discharge checklist.

### 2.10 For Families / Waiting Room Live `/families`
- Sections: visiting hours & rules (demo) · how status boards work · **Waiting Room Live** demo (File 04, Feature 8) · quiet spaces · support services (counselling, chaplaincy/spiritual care, social work — described factually) · practical guide (parking, food, lodging near hospital, demo).

### 2.11 Clear Ledger (Billing & Insurance) `/ledger`
- See File 04, Feature 4. Sections: how billing works · estimate explorer · insurance glossary · cashless process steps · financial-assistance policy (demo text) · dispute/grievance route.

### 2.12 Health Packages `/packages`
- Preventive screening packages (e.g., "Essential Check", "Heart-Aware Check", "Women's Wellness", "Healthy Ageing") — described factually: what tests, prep instructions, duration. **No discounts, no "save X%".** Compare view (2–3 packages). Book (mock).

### 2.13 Diagnostics & Portal `/diagnostics`, `/portal`
- Diagnostics: labs/imaging list, prep instructions, turnaround times labelled *indicative*, sample-collection explainer.
- Portal (demo): see File 04, Feature 6. Login screen offers "Enter demo as Alex Demo" only.

### 2.14 Understand (Knowledge Hub) `/understand`, `/understand/:slug`
- Hub: topic cards, search, filters by department/format. Article: 3-layer format (30-sec / 3-min / Deep), glossary tooltips, "questions to ask your doctor", sources list, reviewed-by (fictional) + review date.
- Rules: Every factual claim traceable in `SOURCES.md`; no treatment recommendations.

### 2.15 International Patients `/international`
- Sections: how it works (enquiry → medical records review → opinion → travel → care → follow-up) · teleconsultation (demo) · translation & interpreter services · visa/letters (generic guidance, **[VERIFY]** per country) · travel & stay support · cost estimate route (Clear Ledger) · remote follow-up.

### 2.16 Careers & Residency `/careers`
- Sections: culture ("Why the light stays on") · roles (clinical, nursing, allied, admin, tech) · residency/fellowship overview · a day in the life (Night Watch link) · mock application form.

### 2.17 Contact `/contact`
- Contact cards (general, emergency, referrals, international, media, grievance) · form with department routing (mock) · location illustration · accessibility contact options (relay, text-only line placeholder).

### 2.18 Legal & Utility
- `/privacy`, `/terms`, `/demo-disclosure`, `/accessibility`, `/sitemap` (human-readable), `/404` (lantern "You seem lost. Let us light the way." + search + Emergency link).

## 3. SEO / Meta / JSON-LD per Page
| Page | JSON-LD types |
|---|---|
| Home | `Hospital`, `WebSite` (with SearchAction), `Organization` |
| About | `Hospital`, `AboutPage` |
| Departments | `MedicalSpecialty` list via `ItemList`; detail: `MedicalClinic`/`Hospital` `department` |
| Doctors | `Physician` (fictional; include `isPartOf` Hospital) |
| Emergency | `EmergencyService` |
| Packages | `MedicalProcedure`/`Service` (no price offers) |
| Understand | `MedicalWebPage`, `FAQPage` where applicable |
| Contact | `ContactPage`, `ContactPoint` |
| Careers | `JobPosting` (demo, `validThrough` set) |
- **Meta:** unique `<title>` ≤ 60 chars, description ≤ 155 chars, canonical, `hreflang` en/hi, OG + Twitter cards, `noindex` on all demo pages by default (config flag `indexable=false`).

## 4. Language Parity Rules
1. Every route, label, error, alt text, meta tag and PDF output exists in **EN and HI**.
2. No machine-translated leftovers: HI copy is written natively in plain Hindi (Devanagari), medical terms shown in Hindi with English in parentheses on first use.
3. Layout tested for +25% text expansion; Devanagari line-height adjustments applied.
4. Locale-aware formats (dates, numbers, currency).
5. RTL readiness: use logical CSS properties (`margin-inline`, `padding-inline`); a `dir` switch works for a stub `ar` locale in tests.
6. URL scheme: `/en/...` and `/hi/...` (default redirect by browser language, user override remembered locally).
