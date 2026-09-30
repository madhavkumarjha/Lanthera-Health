import { GuideRule, GuideState, GuideResult } from '../types';

export const RED_FLAG_OPTIONS = [
  { id: 'breathing', en: 'Severe trouble breathing or gasping', hi: 'सांस लेने में भारी तकलीफ या घबराहट' },
  { id: 'chest_pain', en: 'Chest pain or pressure extending to arm/jaw', hi: 'सीने में दर्द या दबाव जो बांह/जबड़े तक फैले' },
  { id: 'weakness', en: 'Sudden weakness, numbness, or face drooping', hi: 'अचानक कमजोरी, सुन्नता या चेहरे का लटकना' },
  { id: 'bleeding', en: 'Uncontrolled or severe bleeding', hi: 'अनियंत्रित या गंभीर रक्तस्राव' },
  { id: 'unconscious', en: 'Loss of consciousness or severe confusion', hi: 'बेहोशी या अत्यधिक मानसिक भ्रम' },
  { id: 'seizure', en: 'Seizure or convulsion', hi: 'दौरा पड़ना या ऐंठन' },
  { id: 'allergy', en: 'Severe allergic reaction (swelling of lips/throat)', hi: 'गंभीर एलर्जिक रिएक्शन (होंठ/गले में सूजन)' },
];

export const CONDITION_OPTIONS = [
  { id: 'diabetes', en: 'Diabetes', hi: 'मधुमेह (डायबिटीज)' },
  { id: 'hypertension', en: 'High Blood Pressure', hi: 'उच्च रक्तचाप (बीपी)' },
  { id: 'heart', en: 'Heart Condition', hi: 'हृदय संबंधी स्थिति' },
  { id: 'asthma', en: 'Asthma / Respiratory', hi: 'अस्थमा / श्वास संबंधी' },
  { id: 'immuno', en: 'Immunocompromised', hi: 'कमजोर इम्युनिटी' },
];

export const guideRules: GuideRule[] = [
  {
    id: 'red-flag-rule',
    priority: 100,
    when: (s: GuideState) => s.redFlags.length > 0,
    level: 'emergency',
    departments: ['Emergency & Trauma'],
  },
  {
    id: 'child-urgent-rule',
    priority: 80,
    when: (s: GuideState) => s.forWhom === 'child' && s.impact >= 2,
    level: 'urgent',
    departments: ['Pediatrics', 'Emergency & Trauma'],
  },
  {
    id: 'pregnant-urgent-rule',
    priority: 80,
    when: (s: GuideState) => s.forWhom === 'pregnant' && s.impact >= 2,
    level: 'urgent',
    departments: ['Obstetrics & Gynecology', 'Emergency & Trauma'],
  },
  {
    id: 'severe-impact-rule',
    priority: 70,
    when: (s: GuideState) => s.impact === 3 || s.duration === '<1d',
    level: 'urgent',
    departments: ['Urgent Care', 'Internal Medicine'],
  },
  {
    id: 'older-specialist-rule',
    priority: 60,
    when: (s: GuideState) => s.forWhom === 'older' || s.duration === '>1w',
    level: 'specialist',
    departments: ['Internal Medicine', 'Geriatrics'],
  },
  {
    id: 'moderate-impact-rule',
    priority: 50,
    when: (s: GuideState) => s.impact === 2,
    level: 'specialist',
    departments: ['Internal Medicine'],
  },
  {
    id: 'default-routine-rule',
    priority: 10,
    when: (_s: GuideState) => true,
    level: 'routine',
    departments: ['General Outpatient'],
  },
];

export function evaluateGuideState(state: GuideState): GuideResult {
  const sortedRules = [...guideRules].sort((a, b) => b.priority - a.priority);
  const foundRule = sortedRules.find((rule) => rule.when(state));
  const level = foundRule ? foundRule.level : 'routine';
  const departments = foundRule ? foundRule.departments : ['General Outpatient'];

  const bringListEn = [
    'Government ID or Aadhaar card',
    'Previous medical records & test reports',
    'List of current medications & dosages',
    'Insurance card / policy details',
  ];

  const bringListHi = [
    'सरकारी पहचान पत्र या आधार कार्ड',
    'पुराने मेडिकल रिकॉर्ड व जांच रिपोर्ट',
    'वर्तमान दवाओं व खुराक की सूची',
    'स्वास्थ्य बीमा कार्ड व पॉलिसी विवरण',
  ];

  const askList = [
    {
      en: 'What is the suspected cause of these symptoms?',
      hi: 'इन लक्षणों का संभावित कारण क्या है?',
    },
    {
      en: 'What diagnostic tests are recommended today?',
      hi: 'आज कौन से परीक्षण या जांच कराने की सलाह दी जाती है?',
    },
    {
      en: 'Are there any warning signs I should watch for at home?',
      hi: 'घर पर रहते हुए किन चेतावनी संकेतों पर मुझे ध्यान देना चाहिए?',
    },
    {
      en: 'When should I follow up or seek emergency care?',
      hi: 'मुझे फॉलो-अप कब करना चाहिए या आपातकालीन सहायता कब लेनी चाहिए?',
    },
  ];

  const nextStepsList = [
    {
      en: 'Arrival & Triage: Present your prep sheet at reception for priority guidance.',
      hi: 'आगमन व ट्राइएज: प्राथमिकता मार्गदर्शन के लिए रिसेप्शन पर अपनी शीट दिखाएं।',
    },
    {
      en: 'Initial Assessment: A triage nurse will check your vitals and symptoms.',
      hi: 'प्रारंभिक मूल्यांकन: ट्राइएज नर्स आपके वाइटल्स और लक्षणों की जांच करेगी।',
    },
    {
      en: 'Specialist Consultation: Meet with the attending doctor to review symptoms.',
      hi: 'विशेषज्ञ परामर्श: लक्षणों की समीक्षा के लिए उपस्थित डॉक्टर से मिलें।',
    },
  ];

  const isHi = state.locale === 'hi';

  return {
    level,
    departments,
    bring: isHi ? bringListHi : bringListEn,
    ask: askList,
    nextSteps: nextStepsList,
  };
}
