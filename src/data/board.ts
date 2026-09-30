import { WaitToken, I18n } from '../types';

export interface StageInfo {
  id: WaitToken['stage'];
  label: I18n;
  description: I18n;
  typicalDuration: I18n;
  accentColor: string;
}

export const boardStages: Record<WaitToken['stage'], StageInfo> = {
  prep: {
    id: 'prep',
    label: { en: 'In Preparation', hi: 'तैयारी प्रक्रिया में' },
    description: {
      en: 'Patient is changing into gown, vitals are being checked, and nursing staff are preparing care supplies.',
      hi: 'मरीज की वाइटल्स जांच की जा रही है और नर्सिंग स्टाफ तैयारी कर रहा है।',
    },
    typicalDuration: { en: '15–30 minutes', hi: '15-30 मिनट' },
    accentColor: 'var(--accent)',
  },
  procedure: {
    id: 'procedure',
    label: { en: 'In Procedure / Surgery', hi: 'प्रक्रिया / सर्जरी जारी' },
    description: {
      en: 'Procedure is actively underway under specialist care team.',
      hi: 'विशेषज्ञ टीम की देखरेख में प्रक्रिया/सर्जरी चालू है।',
    },
    typicalDuration: { en: '45–180 minutes', hi: '45-180 मिनट' },
    accentColor: 'var(--clay)',
  },
  recovery: {
    id: 'recovery',
    label: { en: 'In Recovery (PACU)', hi: 'रिकवरी कक्ष में' },
    description: {
      en: 'Procedure is complete. Patient is resting comfortably as anaesthesia wears off under nurse monitoring.',
      hi: 'प्रक्रिया पूरी हो चुकी है। नर्स की देखरेख में मरीज विश्राम कर रहा है।',
    },
    typicalDuration: { en: '30–60 minutes', hi: '30-60 मिनट' },
    accentColor: 'var(--plum)',
  },
  ready: {
    id: 'ready',
    label: { en: 'Ready to Meet Family', hi: 'परिजनों से मिलने हेतु तैयार' },
    description: {
      en: 'Patient is ready in private room or ward. Family can enter for visiting.',
      hi: 'मरीज कमरे में पहुंच चुका है। परिजन मिलने के लिए आ सकते हैं।',
    },
    typicalDuration: { en: 'Immediate', hi: 'तत्काल' },
    accentColor: 'var(--sage)',
  },
};

export const initialWaitTokens: WaitToken[] = [
  {
    id: 'L-204',
    stage: 'prep',
    updatedAt: new Date(Date.now() - 10 * 60000).toISOString(),
    note: { en: 'Vitals stable. Pre-op briefing complete.', hi: 'वाइटल्स स्थिर। प्री-ऑप ब्रीफिंग पूर्ण।' },
  },
  {
    id: 'L-205',
    stage: 'procedure',
    updatedAt: new Date(Date.now() - 35 * 60000).toISOString(),
    note: { en: 'Surgical procedure underway in OT-2.', hi: 'ओटी-2 में शल्य प्रक्रिया जारी।' },
  },
  {
    id: 'L-206',
    stage: 'recovery',
    updatedAt: new Date(Date.now() - 15 * 60000).toISOString(),
    note: { en: 'Awake in PACU. Vital checks normal.', hi: 'रिकवरी कक्ष में होश में। वाइटल्स सामान्य।' },
  },
  {
    id: 'L-207',
    stage: 'ready',
    updatedAt: new Date(Date.now() - 5 * 60000).toISOString(),
    note: { en: 'Moved to Room 304. Family welcome.', hi: 'कमरा 304 में स्थानांतरित। परिजनों का स्वागत।' },
  },
  {
    id: 'L-208',
    stage: 'procedure',
    updatedAt: new Date(Date.now() - 50 * 60000).toISOString(),
    note: { en: 'Endoscopy scan in progress.', hi: 'एंडोस्कोपी स्कैन जारी।' },
  },
  {
    id: 'L-209',
    stage: 'prep',
    updatedAt: new Date(Date.now() - 2 * 60000).toISOString(),
    note: { en: 'Day Care admission checked in.', hi: 'डे केयर प्रवेश चेक-इन पूर्ण।' },
  },
];
