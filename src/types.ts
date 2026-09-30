export type Locale = 'en' | 'hi';
export type I18n = { en: string; hi: string };

export interface SiteConfig {
  brandName: string;
  tagline: I18n;
  leadPersonId: string;
  city: string;
  country: string;
  emergencyNumber: string;
  locales: Locale[];
  currency: string;
  demoBanner: boolean;
  indexable: boolean;
}

export interface Department {
  slug: string;
  name: I18n;
  blurb: I18n;
  icon: string;
  image: string;
  conditions: I18n[];
  tests: string[];
  headId: string;
  faq: { q: I18n; a: I18n }[];
  audience: ('adult' | 'child' | 'women' | 'senior')[];
}

export interface Person {
  id: string;
  name: string;
  role: I18n;
  kind: 'founder' | 'head' | 'doctor' | 'nurse' | 'diagnostics' | 'resident';
  dept: string;
  reportsTo?: string;
  languages: string[];
  regId: string;
  bio: I18n;
  portrait: string;
  qualifications: string[];
  modes: ('in-person' | 'tele')[];
  demoSlots: string[];
}

export interface Package {
  id: string;
  name: I18n;
  category: 'preventive' | 'senior' | 'cardiac' | 'women' | 'comprehensive';
  includes: I18n[];
  prep: I18n[];
  durationMin: number;
  audience: string;
  price: number;
  sampleMode: I18n;
}

export interface PathStop {
  id: string;
  title: I18n;
  who: string[];
  durationRange: { minMin: number; maxMin: number };
  familyCan: I18n[];
  bring: string[];
  ask: I18n[];
  related: string[];
}

export interface JourneyPath {
  id: 'emergency' | 'surgery' | 'daycare' | 'maternity' | 'outpatient';
  title: I18n;
  stops: PathStop[];
}

export interface LedgerScenario {
  id: string;
  title: I18n;
  category: I18n;
  components: { key: I18n; min: number; max: number }[];
  roomMultipliers: Record<'ward' | 'semi' | 'private' | 'icu', number>;
  volatility: I18n[];
  financialAidEligible: boolean;
}

export interface InternationalService {
  id: string;
  title: I18n;
  desc: I18n;
  icon: string;
}

export interface InternationalDesk {
  visaSteps: { step: number; title: I18n; detail: I18n }[];
  services: InternationalService[];
  partnerships: string[];
  contact: { email: string; phone: string; whatsapp: string };
}

export interface DiagnosticItem {
  id: string;
  code: string;
  name: I18n;
  category: 'radiology' | 'pathology' | 'cardiac' | 'genomics';
  tatHours: number;
  prepInstructions: I18n[];
  homeSample: boolean;
  price: number;
}

export interface GuideRule {
  id: string;
  when: (s: GuideState) => boolean;
  level: GuideResult['level'];
  priority: number;
  departments: string[];
}

export interface GuideState {
  redFlags: string[];
  forWhom: 'self' | 'child' | 'older' | 'pregnant';
  duration: '<1d' | '1-7d' | '>1w';
  impact: 0 | 1 | 2 | 3;
  conditions: string[];
  locale: Locale;
}

export interface GuideResult {
  level: 'emergency' | 'urgent' | 'specialist' | 'routine' | 'info';
  departments: string[];
  bring: string[];
  ask: I18n[];
  nextSteps: I18n[];
}

export interface Article {
  slug: string;
  dept: string;
  title: I18n;
  summary: I18n;
  layers: { s30: I18n; m3: I18n; deep: I18n };
  glossary: { term: string; def: I18n }[];
  askDoctor: I18n[];
  sources: string[];
  reviewedBy: string;
  reviewedOn: string;
}

export interface Report {
  id: string;
  title: string;
  date: string;
  dept: string;
  patientName: string;
  values: { name: string; value: number; unit: string; refRange: [number, number]; status: 'normal' | 'low' | 'high'; plainExp: I18n }[];
  plainNotes: I18n;
}

export interface CareerOption {
  id: string;
  title: I18n;
  dept: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Shift';
  experience: string;
  reqs: I18n[];
}

export interface WaitToken {
  id: string;
  stage: 'prep' | 'procedure' | 'recovery' | 'ready';
  updatedAt: string;
  note?: I18n;
}

export interface AssetEntry {
  id: string;
  path: string;
  prompt?: string;
  size: string;
  status: 'generated' | 'fallback' | 'pending';
  alt: I18n;
}
