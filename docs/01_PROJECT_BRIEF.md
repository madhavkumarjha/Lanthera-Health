# 01 · PROJECT BRIEF — Lanthera Health (Demo Website)

> **Priority rule: File 01 wins on any conflict with files 02–08.**
> This is a **frontend-only, fictional, clearly-labelled DEMO** for a multi-speciality hospital network. No real people, brands, clinical claims, or patient data.

## 1. Vision & Reaction Target
**Vision:** A hospital website that feels like *warm, calm authority* — and answers, within 30 seconds, the question every anxious family is silently asking: **"What happens next, and who is looking after us?"**

**Reaction target (prospective client says):** *"I have never seen a hospital website like this — this is what my patients need."*

**Emotional arc for the visitor:** Anxious → Oriented → Reassured → Confident → Ready to act.

## 2. Config-Driven Placeholders (all live in `src/config/site.ts`)
| Key | Demo value | Notes |
|---|---|---|
| `brandName` | Lanthera Health | Fictional; trademark check **[VERIFY]** before any real use |
| `tagline` | The light stays on. | EN + HI variants in i18n |
| `leadPerson.name` | Dr. Mira Alden | Fictional founder-consultant |
| `leadPerson.title` | Founder & Senior Consultant | |
| `city` / `country` | Configurable (default: "Demo City, International") | Never a real hospital address |
| `emergencyNumber` | `+00 000 000 000` (visibly fake) | Must be swapped for a real one at white-label time |
| `locales` | `en`, `hi` (RTL-ready for `ar`) | |
| `currency` | Configurable (default USD, display-only) | Clear Ledger uses it |
| `demoBanner` | true | Always-on "Demo — fictional data" label |
| `theme` | tokens from File 02 | White-label swap = config + assets only |

## 3. Positioning
- **Category:** Multi-speciality hospital & clinic network (1 founder-consultant, ~10 department heads, ~40 doctors, nursing & diagnostics teams, residents/interns).
- **Promise:** *Clarity before care.* We explain what is happening, what will happen, what it may cost, and who is responsible — in plain language.
- **Tone:** Human, unhurried, precise. Never salesy, never clinical-cold.
- **Differentiator:** Utility over decoration — every innovative feature gives the visitor understanding they did not have before.

## 4. Audiences (what each needs in 30 seconds)
| Audience | Need in 30 seconds | Primary entry point |
|---|---|---|
| Patient (non-urgent) | Right specialist, how to book, what to bring | Doctors, Lantern Guide |
| Family of patient (often urgent/anxious) | Emergency access, visiting rules, what happens next | Emergency pill, The Path, Waiting Room Live |
| Referring doctor | Referral route, specialities, contact for case discussion | Departments, Contact (Referrals) |
| Corporate / insurance desk | Empanelment info, cashless process, contact | Clear Ledger, International & Insurance |
| International patient | Visa/teleconsult/translation/travel support overview | International page |
| Medical student / resident | Training, residency, culture | Careers & Residency |
| Accessibility-dependent user | Fully usable site, plain-language mode | Global (text size, Calm Mode, reduced motion) |

## 5. HARD COMPLIANCE RULES (design rules, not suggestions)
> All items **[VERIFY with client's compliance counsel]** per jurisdiction before real launch. Demo must behave as if the strictest rule applies everywhere.

**5.1 What the site MAY show**
- Factual, verifiable info: departments, facilities, doctor names/qualifications/registration-number *placeholders*, timings, contact details, accreditation *placeholders* clearly marked fictional.
- Educational content labelled "General information — not medical advice."
- Process explanations (admission, discharge, billing) with **indicative** ranges only.

**5.2 What the site must NEVER show**
| Forbidden | Reason (typical regimes: US FTC/state boards, UK ASA/CAP & GMC guidance, EU national rules, AHPRA-type regimes, India NMC/CEA/consumer rules, GCC health-authority ad rules) |
|---|---|
| Patient testimonials / reviews / star ratings | Prohibited or restricted in many regimes |
| Before/after imagery or outcome stories | Misleading-claim risk |
| Success rates, survival %, "best/No.1/leading/guaranteed" superlatives | Unsubstantiated comparative claims |
| Online diagnosis, prescriptions, dosage advice, or "AI doctor" claims | Unlicensed practice / patient-safety risk |
| Fear-based or urgency-manipulating marketing copy | Ethical advertising rules |
| Discounts/inducements on clinical procedures | Restricted in many regimes (Health Packages = wellness screening only, described factually) |
| Real doctor photos, real brand logos (insurers, accreditors, equipment) | IP & impersonation risk |
| Any claim attributed to a real organisation | Fake-endorsement risk |

**5.3 Mandatory disclaimers (exact placement)**
1. **Demo banner** — persistent, dismissible-per-session slim bar: *"Demo website · All people, data and numbers are fictional."*
2. **Emergency disclaimer** — footer + Emergency page + Lantern Guide: *"If you think this is an emergency, call your local emergency number now. This website cannot assess emergencies."*
3. **Not-advice label** — every tool/explainer/estimator: *"Indicative · General information · Not medical, legal or financial advice."*
4. **Data notice** — every form: *"Demo only — nothing you type is sent or stored on a server."*

**5.4 Consent gate (first visit, before analytics-like or preference storage)**
- Modal with: language choice, motion preference, text size, storage consent (local preferences only). Default = **minimum** (no non-essential storage). No third-party trackers exist in the demo.

**5.5 Data-protection posture (design as if HIPAA + GDPR + India DPDP Act all apply)**
- Frontend-only: no network calls with user input; forms validate locally and show a success state.
- Collect minimum; no health data persisted beyond `sessionStorage` (cleared on tab close); the Lantern Guide keeps **no server copy** and offers "Clear my session" button.
- Portal demo uses a **fictional demo patient** only; never accepts real login.

## 6. Success Criteria
- Prospective client can navigate the entire demo unaided in 7 minutes (see DEMO_SCRIPT in File 08).
- ≥ 6 features rated "never seen before on a hospital site" in internal review.
- Lighthouse (mobile, mid-tier profile): Performance ≥ 90, Accessibility ≥ 98, Best Practices ≥ 95, SEO ≥ 95.
- Emergency info reachable in **1 click/tap from every page** (verified by Playwright test).
- Full EN/HI parity on every page.
- Zero lorem ipsum, zero "TBD", zero real names.

## 7. Sitemap Summary (detail in File 03)
Home · About (Our Story) · Departments (+ detail) · Doctors (+ profile) · Circle of Care · Lantern Guide · Book Appointment (mock) · Emergency 24×7 · The Path · Waiting Room Live (For Families) · Clear Ledger (Billing & Insurance) · Health Packages · Diagnostics & Lantern Portal (demo) · Understand (Knowledge Hub + article) · International Patients · Careers & Residency · Contact · Legal (Privacy, Terms, Demo Disclosure, Accessibility) · 404.

## 8. Non-Goals
- No backend, database, auth, payments, real email/SMS, or real scheduling.
- No real clinical decision support; no symptom-to-diagnosis mapping.
- No stock-photo dependency; no third-party embeds/trackers.
- No CMS in v1 (data lives in typed JSON/TS files).

## 9. Guiding Principles
1. **Reassure before you impress.** Motion is calm and purposeful.
2. **Explain everything.** Jargon always gets a plain-language layer.
3. **Never hide the exit.** Emergency + language + text-size controls are always visible.
4. **Honest by design.** Every estimate is a range; every tool says what it is not.
5. **One metaphor, used with discipline.** The Lantern shapes everything (see File 02).
