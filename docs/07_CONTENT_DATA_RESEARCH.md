# 07 · CONTENT, DATA & RESEARCH — Lanthera Health

## 1. Research Mandate & Accuracy Rules
1. Maintain `SOURCES.md`: one row per factual, time-bound or procedural claim → `claim · source name · URL · date accessed · reviewer`.
2. **Verify every** clinical-education fact, process description (admission, discharge, insurance terms), and legal/compliance statement against reputable sources (public health agencies, professional bodies, peer-reviewed reviews, regulator sites). Prefer primary sources.
3. **No invented citations.** If a source can't be verified, rewrite the claim as general/non-specific or remove it, and mark `[VERIFY]` in the working draft (never in shipped UI).
4. Time-bound facts (rules, thresholds, guidelines) carry a "Reviewed on" date.
5. Numbers in Ledger/Path are **fictional demo ranges** and must show "Demo figures".
6. Clinical education content is written for lay readers, reviewed by a fictional reviewer name **plus** the note "Demo content — not reviewed by a real clinician." until a real clinician signs off.
7. Never copy text or visuals from other hospital sites; paraphrase and add original structure.

## 2. Departments (12) with Seeds
| Slug | Name | Plain-language blurb seed | Audience | Example educational topics |
|---|---|---|---|---|
| `cardiology` | Heart & Vascular | Care for heart rhythm, blood pressure, and circulation | adult, senior | Understanding an ECG; what a stress test involves |
| `neurology` | Brain & Nerves | Headache, seizures, movement and memory concerns | adult, senior | What an MRI scan feels like |
| `orthopaedics` | Bones, Joints & Sports | Fractures, joint pain, mobility | all | Getting ready for a knee replacement |
| `paediatrics` | Children's Care | Growth, infections, vaccinations, development | child | Fever in children — when to call |
| `womens-health` | Women's & Maternity | Pregnancy, delivery, gynaecology | women | What happens on the day of delivery |
| `general-medicine` | General & Internal Medicine | First point for adult health concerns, chronic care | adult, senior | Managing long-term conditions: what a review visit covers |
| `general-surgery` | General & Laparoscopic Surgery | Planned and urgent surgery | adult | What is keyhole surgery? |
| `gastro` | Digestive Health | Stomach, liver, bowel | adult | Preparing for an endoscopy |
| `pulmonology` | Lungs & Breathing | Asthma, chronic cough, sleep breathing | all | Lung function test explained |
| `nephro-uro` | Kidney & Urinary Care | Kidney health, stones, dialysis support | adult | Living with reduced kidney function |
| `emergency-critical` | Emergency & Critical Care | 24×7 emergency, ICU | all | How triage works |
| `diagnostics-imaging` | Diagnostics & Imaging | Laboratory, X-ray, ultrasound, CT, MRI | all | Getting ready for blood tests |
Additional clinic services (mentioned, not separate pages): physiotherapy, nutrition, mental well-being (counselling), palliative & supportive care, vaccination.

## 3. Team Roster Distribution (all fictional)
| Group | Count | Rules |
|---|---|---|
| Founder-consultant | 1 (Dr. Mira Alden) | Story and principles; no boasting |
| Department heads | 10 | One per department (Emergency & Diagnostics led jointly by heads of departments) |
| Doctors (consultants/specialists) | 40 total including heads | 3–5 per department; ≥ 40% women; ≥ 5 languages represented |
| Nursing leadership | 6 | Chief nurse + 5 unit leads |
| Diagnostics/pharmacy/allied | 8 | Lab, radiology, pharmacy, physio, nutrition |
| Residents/interns (displayed as groups) | 12 | First names + year only |
**Bio rules:** 60–90 words; qualifications generic (e.g., "MD, Internal Medicine", "DM, Cardiology") with fictional institutions or omitted; interests, not achievements; no awards, no rankings, no "renowned". **Name sanity check:** cross-check each generated name against a public-figure list (ask agent to web-check top hits) and re-roll if a match to a well-known doctor is found; use diverse, plausible name mixes; regId format `REG-DEMO-####`.

## 4. Domain Data Seeds
### 4.1 Facilities
Main hospital (fictional ~300 beds), Day-care centre, Outpatient pavilion, Diagnostics wing, Emergency block, Quiet & prayer room, Family lounge, Pharmacy, Cafeteria. Labelled "Demo numbers".

### 4.2 Journey stages (The Path)
- **Emergency admission:** Arrival → Triage (colour codes explained) → Assessment → Tests → Treatment → Admission decision → Ward/ICU → Discharge planning → Discharge.
- **Planned surgery:** Consultation → Pre-op tests → Anaesthesia review → Admission day → Pre-op preparation → Procedure → Recovery → Ward → Discharge & follow-up.
- **Day-care:** Booking → Prep instructions → Arrival → Procedure → Recovery → Discharge.
- **Maternity:** Antenatal visits → Birth plan → Admission → Labour/delivery → Postnatal care → Discharge & newborn check.
- **Outpatient:** Booking → Registration → Consultation → Tests → Review → Prescription → Follow-up.
Each stop: `who`, `durationRange` (e.g., triage 5–30 min), `familyCan`, `bring`, `ask`.

### 4.3 Lantern Guide red flags (generic)
Trouble breathing · chest pain/pressure · sudden weakness/numbness/face droop/speech trouble · severe bleeding · fainting/unconsciousness · seizure · severe allergic reaction (swelling/breathing trouble) · severe head injury · thoughts of self-harm → *route to emergency and to local crisis lines* (generic text, no numbers stored; instruct to call local emergency number).
Rule table: any red flag → emergency; child + impact ≥ 2 → urgent; pregnant + any concern + impact ≥ 2 → urgent; duration >1w + impact ≤ 1 → routine specialist; none → info + routine.

### 4.4 Clear Ledger seeds (fictional, currency-configurable)
| Scenario | Components (min–max, demo) |
|---|---|
| Day-care procedure | Room 40–90 · Fees 200–500 · Diagnostics 60–180 · Medicines 30–90 · Consumables 50–150 |
| 3-night ward stay | Room 300–900 · Fees 400–1,000 · Diagnostics 150–500 · Medicines 120–400 · Consumables 100–300 |
| Maternity — normal delivery | Room 500–1,200 · Fees 600–1,400 · Diagnostics 100–300 · Medicines 100–300 · Consumables 100–250 |
| Maternity — planned surgical | Room 900–2,000 · Fees 1,200–2,800 · Diagnostics 150–400 · Medicines 200–500 · Consumables 200–500 |
| Health screening | Fees 50–150 · Diagnostics 120–420 |
Volatility notes: complications, longer stay, ICU need, implants/consumable choice, policy limits.
Glossary: co-pay, deductible, pre-authorisation, cashless, reimbursement, room-rent cap, sub-limit, exclusion, waiting period, network/empanelled provider (generic definitions, sourced).

### 4.5 Explainer topics (20 Understand articles at launch)
Reading an ECG · What a CT vs MRI is · Preparing for blood tests · Fasting before procedures · Anaesthesia types · What is keyhole surgery · Pre-surgery checklist · Recovery at home · Blood pressure basics · Diabetes daily care overview · Vaccination schedule basics · Newborn care first week · Pregnancy check-ups overview · Understanding your discharge summary · How to read a lab report · Medicine safety at home · Falls prevention for older adults · Managing pain: what to ask · How triage works · Caring for a family member in hospital.

### 4.6 Demo portal data (patient **Alex Demo**, fictional)
Upcoming: General Medicine review (+7 days), Blood test (+3 days). Past: Cardiology consult, ECG. Reports: Blood panel (haemoglobin, glucose (fasting), cholesterol total, creatinine) with ranges; ECG summary (plain-language note). Bills: 2 items with status (Paid, Awaiting insurer). Messages: 2 canned threads. All flagged demo.

### 4.7 Top 20 questions customers ask (FAQ seed, answer in plain language)
Where do I go? · How do I book? · What do I bring? · Can I choose my doctor? · What are visiting hours? · Can someone stay with me? · How long will I wait? · What does it cost? · Do you accept my insurance? · How does cashless work? · Can I get a second opinion? · Are my records private? · How do I get my reports? · Do you offer telehealth? · Language help? · Accessibility support? · Food/diet in hospital? · What happens at discharge? · How do I raise a concern? · How can I reach emergency quickly?

## 5. Copy Requirements per Page (EN + HI)
- Each page needs: H1, intro (≤ 40 words), all section headings/body, CTA labels, meta title/description, alt text, form labels/errors, empty states.
- HI copy written natively (not literal); technical terms shown Hindi (English) on first use; keep sentences ≤ 18 words.
- Reading-level checks: EN Flesch ≥ 60; HI reviewed for simplicity.
- No superlatives, no promises of outcomes, no urgency manipulation.

## 6. Microcopy Deck (examples; agent extends in i18n files)
| Context | EN sample |
|---|---|
| Emergency pill | "Emergency 24×7" |
| Demo banner | "Demo website · All people, data and numbers are fictional." |
| Guide start | "Let's find the right place for you. This takes about 2 minutes." |
| Guide emergency | "Please call your local emergency number now." |
| Ledger disclaimer | "Demo figures. Real costs depend on your care and policy." |
| Empty search | "We couldn't find that. Try a simpler word, or call us." |
| Form success | "Demo submitted. Nothing was sent or stored." |
| 404 | "You seem lost. Let us light the way." |
| Consent | "Choose how you'd like this site to feel. You can change this any time." |
| Print button | "Print this checklist" |

## 7. SEO Meta Rules
- Title pattern: `{Page} · Lanthera Health` (≤ 60 chars). Description: benefit-led, plain words, ≤ 155 chars, no claims.
- One H1 per page; logical heading order; descriptive link text; alt text describes content and purpose.
- Structured data per File 03; `noindex` while demo; sitemap.xml + robots.txt generated; canonical + hreflang; social cards per page group.
