import { LedgerScenario } from '../types';

export const ledgerScenarios: LedgerScenario[] = [
  {
    id: 'normal-delivery',
    title: {
      en: 'Normal Vaginal Delivery (2-Day Stay)',
      hi: 'सामान्य प्रसव (2-दिवसीय प्रवास)',
    },
    category: {
      en: 'Maternity & Obstetrics',
      hi: 'प्रसूति एवं स्त्री रोग',
    },
    components: [
      { key: { en: 'Obstetrician & Nursing Charges', hi: 'प्रसूति रोग विशेषज्ञ एवं नर्सिंग शुल्क' }, min: 25000, max: 35000 },
      { key: { en: 'Labor Room & Delivery Suite', hi: 'लेबर रूम एवं प्रसव कक्ष' }, min: 15000, max: 22000 },
      { key: { en: 'Neonatal Care & Pediatric Exam', hi: 'नवजात शिशु देखभाल एवं बाल रोग जांच' }, min: 8000, max: 12000 },
      { key: { en: 'Medications & Consumables', hi: 'दवाएं एवं उपभोग्य वस्तुएं' }, min: 7000, max: 11000 },
    ],
    roomMultipliers: {
      ward: 1.0,
      semi: 1.25,
      private: 1.5,
      icu: 2.2,
    },
    volatility: [
      { en: 'Epidural analgesia add-on', hi: 'एपिड्यूरल दर्द निवारक अतिरिक्त शुल्क' },
      { en: 'Extended neonatal observation', hi: 'नवजात शिशु की विस्तारित निगरानी' },
      { en: 'Emergency conversion to C-section', hi: 'आपातकालीन सी-सेक्शन परिवर्तन' },
    ],
    financialAidEligible: true,
  },
  {
    id: 'total-knee-replacement',
    title: {
      en: 'Total Knee Replacement (Unilateral)',
      hi: 'टोटल नी रिप्लेसमेंट (एक तरफा)',
    },
    category: {
      en: 'Orthopedics & Joint Surgery',
      hi: 'अस्थि रोग एवं जोड़ प्रत्यारोपण',
    },
    components: [
      { key: { en: 'High-grade Knee Implant', hi: 'उच्च गुणवत्ता वाला घुटने का इंप्लांट' }, min: 65000, max: 85000 },
      { key: { en: 'Surgical Team & Anesthesia', hi: 'सर्जिकल टीम एवं एनेस्थीसिया' }, min: 45000, max: 60000 },
      { key: { en: 'Modular OT & Laminar Flow', hi: 'मॉड्यूलर ओटी एवं लैमिनार फ्लो' }, min: 20000, max: 30000 },
      { key: { en: 'In-patient Physiotherapy (4 Days)', hi: 'अस्पताल में फिजियोथेरेपी (4 दिन)' }, min: 6000, max: 10000 },
    ],
    roomMultipliers: {
      ward: 1.0,
      semi: 1.3,
      private: 1.6,
      icu: 2.5,
    },
    volatility: [
      { en: 'Custom robotic-assisted alignment option', hi: 'रोबोटिक सहायता प्राप्त अलाइनमेंट विकल्प' },
      { en: 'Pre-existing cardiac clearance requirement', hi: 'कार्डिएक क्लीयरेंस आवश्यकता' },
    ],
    financialAidEligible: true,
  },
  {
    id: 'laparoscopic-cholecystectomy',
    title: {
      en: 'Laparoscopic Gallbladder Removal',
      hi: 'लैप्रोस्कोपिक गॉलब्लैडर सर्जरी',
    },
    category: {
      en: 'General & Minimal Access Surgery',
      hi: 'सामान्य एवं न्यूनतम पहुंच शल्य चिकित्सा',
    },
    components: [
      { key: { en: 'Surgeon & Anesthesiologist Fee', hi: 'सर्जन एवं एनेस्थेटिस्ट शुल्क' }, min: 28000, max: 38000 },
      { key: { en: 'Laparoscopic OT Tower Setup', hi: 'लैप्रोस्कोपिक ओटी टावर सेटअप' }, min: 14000, max: 20000 },
      { key: { en: 'Biopsy & Histopathology', hi: 'बायोप्सी एवं हिस्टोपैथोलॉजी' }, min: 3500, max: 5500 },
      { key: { en: '24-Hour Recovery Room Stay', hi: '24 घंटे का रिकवरी रूम प्रवास' }, min: 6000, max: 9500 },
    ],
    roomMultipliers: {
      ward: 1.0,
      semi: 1.2,
      private: 1.45,
      icu: 2.0,
    },
    volatility: [
      { en: 'Severe acute inflammation or adhesions', hi: 'गंभीर सूजन या चिपकने की स्थिति' },
      { en: 'Post-op bile duct cholangiogram', hi: 'सर्जरी के बाद पित्त नली की जांच' },
    ],
    financialAidEligible: true,
  },
  {
    id: 'coronary-angioplasty',
    title: {
      en: 'Coronary Angioplasty (Single Stent)',
      hi: 'कोरोनरी एंजियोप्लास्टी (सिंगल स्टेंट)',
    },
    category: {
      en: 'Cardiology & Cath Lab',
      hi: 'हृदय रोग एवं कैथ लैब',
    },
    components: [
      { key: { en: 'Drug-Eluting Stent (DES - NPPA Capped)', hi: 'ड्रग-इल्यूटिंग स्टेंट (एनपीपीए सीमित)' }, min: 30000, max: 30000 },
      { key: { en: 'Cath Lab Procedure & Balloon Catheter', hi: 'कैथ लैब प्रक्रिया एवं बलून कैथेटर' }, min: 40000, max: 55000 },
      { key: { en: 'Interventional Cardiologist Fee', hi: 'इंटरवेंशनल कार्डियोलॉजिस्ट शुल्क' }, min: 35000, max: 48000 },
      { key: { en: 'ICU / CCU Monitoring (24h)', hi: 'आईसीयू / सीसीयू निगरानी (24 घंटे)' }, min: 12000, max: 18000 },
    ],
    roomMultipliers: {
      ward: 1.0,
      semi: 1.25,
      private: 1.5,
      icu: 2.2,
    },
    volatility: [
      { en: 'Multi-vessel involvement requiring 2nd stent', hi: 'अतिरिक्त स्टेंट की आवश्यकता' },
      { en: 'IVUS / OCT intravascular imaging setup', hi: 'इंट्रावैस्कुलर इमेजिंग सेटअप' },
    ],
    financialAidEligible: true,
  },
];

export const insurancePartners = [
  'Star Health & Allied Insurance',
  'ICICI Lombard General Insurance',
  'Niva Bupa Health Insurance',
  'HDFC ERGO General Insurance',
  'Ayushman Bharat PM-JAY (Government Empaneled)',
  'CGHS & ECHS Beneficiary Desk',
  'SBI General Insurance',
  'Care Health Insurance (Religare)',
];

export const financialAidSchemes = [
  {
    title: { en: '0% Interest Monthly EMI Option', hi: '0% ब्याज दर वाली मासिक ईएमआई सुविधा' },
    desc: {
      en: 'Flexible payment plans up to 12 months with zero hidden processing charges.',
      hi: 'बिना किसी छिपे शुल्क के 12 महीने तक की लचीली भुगतान योजना।',
    },
  },
  {
    title: { en: 'Ayushman Bharat PM-JAY Desk', hi: 'आयुष्मान भारत पीएम-जय डेस्क' },
    desc: {
      en: 'Cashless treatment up to ₹5 Lakhs for eligible cardholders.',
      hi: 'पात्र कार्डधारकों के लिए ₹5 लाख तक का कैशलेस इलाज।',
    },
  },
  {
    title: { en: 'Lanthera Compassion Trust Support', hi: 'लैंथेरा करुणा ट्रस्ट सहायता' },
    desc: {
      en: 'Partial subsidy for low-income patients requiring life-saving emergency care.',
      hi: 'कम आय वाले मरीजों के लिए आपातकालीन स्थिति में आंशिक वित्तीय सहायता।',
    },
  },
];
