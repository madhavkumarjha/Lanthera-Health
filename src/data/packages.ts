import { Package } from '../types';

export const healthPackages: Package[] = [
  {
    id: 'preventive-vital',
    name: {
      en: 'Lanthera Vital Shield Check',
      hi: 'लैंथेरा वाइटल शील्ड जांच',
    },
    category: 'preventive',
    price: 2499,
    durationMin: 120,
    audience: 'Adults 18–45 years seeking routine annual wellness',
    sampleMode: {
      en: 'Home Sample Collection or Hospital Walk-in',
      hi: 'घर से सैंपल कलेक्शन या अस्पताल वाॉक-इन',
    },
    includes: [
      { en: 'Complete Blood Count (CBC) with ESR', hi: 'सीबीसी एवं ईएसआर रक्त जांच' },
      { en: 'Fasting Blood Sugar & HbA1c', hi: 'फास्टिंग ब्लड शुगर एवं एचबीए1सी' },
      { en: 'Lipid Profile (Cholesterol, Triglycerides, HDL/LDL)', hi: 'लिपिड प्रोफाइल (कोलेस्ट्रॉल जांच)' },
      { en: 'Kidney Function Test (Serum Creatinine, Urea)', hi: 'किडनी फंक्शन टेस्ट' },
      { en: 'Liver Function Test (SGOT, SGPT, Bilirubin)', hi: 'लिवर फंक्शन टेस्ट' },
      { en: 'Physician Consultation & BMI Assessment', hi: 'फिजिशियन परामर्श एवं बीएमआई विश्लेषण' },
    ],
    prep: [
      { en: '10–12 hours overnight fasting required before blood test', hi: 'ब्लड टेस्ट से पहले 10-12 घंटे का उपवास आवश्यक है' },
      { en: 'Drink plain water only in the morning', hi: 'सुबह केवल सादा पानी पिएं' },
    ],
  },
  {
    id: 'senior-care-comprehensive',
    name: {
      en: 'Senior Citizen Care & Mobility Screening',
      hi: 'वरिष्ठ नागरिक देखभाल एवं गतिशीलता जांच',
    },
    category: 'senior',
    price: 4999,
    durationMin: 180,
    audience: 'Adults aged 60+ requiring joint, cardiac & metabolic evaluation',
    sampleMode: {
      en: 'Priority Senior Hospital Lounge Visit',
      hi: 'वरिष्ठ नागरिक प्राथमिकता अस्पताल लाउंज',
    },
    includes: [
      { en: 'Comprehensive Metabolic Panel & Electrolytes', hi: 'मेटाबॉलिक पैनल एवं इलेक्ट्रोलाइट्स' },
      { en: 'DEXA Bone Density Scan (Spine & Hip)', hi: 'डेक्सा बोन डेंसिटी स्कैन' },
      { en: 'Resting ECG & ECHO Color Doppler', hi: 'ईसीजी एवं इको कलर डॉप्लर' },
      { en: 'Vitamin D3 & Vitamin B12 Levels', hi: 'विटामिन डी3 एवं बी12 का स्तर' },
      { en: 'Geriatric Physician & Physiotherapy Evaluation', hi: 'बाल्यावस्था/वरिष्ठ रोग विशेषज्ञ परामर्श' },
      { en: 'Ophthalmology Vision & Glaucoma Check', hi: 'आंखों की जांच एवं मोतियाबिंद/ग्लूकोमा स्क्रीन' },
    ],
    prep: [
      { en: 'Fasting 10 hours; carry all current daily medication strip wrappers', hi: '10 घंटे उपवास रखें; अपनी वर्तमान दवाएं साथ लाएं' },
      { en: 'Wear comfortable slip-on shoes for bone scan', hi: 'आरामदायक जूते पहनें' },
    ],
  },
  {
    id: 'cardiac-heart-shield',
    name: {
      en: 'Advanced Cardiac & Vascular Health Package',
      hi: 'उन्नत कार्डिएक एवं संवहनी स्वास्थ्य पैकेज',
    },
    category: 'cardiac',
    price: 5999,
    durationMin: 240,
    audience: 'Individuals with family history of heart disease, hypertension, or high stress',
    sampleMode: {
      en: 'Dedicated Cardiology Wing Visit',
      hi: 'विशेष कार्डियोलॉजी विंग विजिट',
    },
    includes: [
      { en: 'Treadmill Stress Test (TMT) / Stress ECHO', hi: 'ट्रेडमिल स्ट्रेस टेस्ट (टीएमटी)' },
      { en: '2-D Echocardiogram with Tissue Doppler', hi: '2-डी इकोकार्डियोग्राम' },
      { en: 'High-Sensitivity CRP (hs-CRP) & Homocysteine', hi: 'एचएस-सीआरपी एवं होमोसिस्टीन' },
      { en: 'Extended Lipid Sub-fractions', hi: 'विस्तृत लिपिड जांच' },
      { en: 'Senior Consultant Cardiologist Consultation', hi: 'वरिष्ठ कार्डियोलॉजिस्ट परामर्श' },
      { en: 'Dietary & Lifestyle Modification Plan', hi: 'आहार एवं जीवनशैली मार्गदर्शन' },
    ],
    prep: [
      { en: 'Do not consume caffeine 12 hours prior to stress test', hi: 'स्ट्रेस टेस्ट से 12 घंटे पहले कैफीन का सेवन न करें' },
      { en: 'Wear comfortable sports clothing and running shoes', hi: 'दौड़ने के जूते और आरामदायक कपड़े पहनें' },
    ],
  },
  {
    id: 'women-wellness',
    name: {
      en: 'Women’s Holistic Health & Hormonal Screen',
      hi: 'महिला समग्र स्वास्थ्य एवं हार्मोनल जांच',
    },
    category: 'women',
    price: 3999,
    durationMin: 150,
    audience: 'Women 25+ years for reproductive, thyroid, and breast wellness',
    sampleMode: {
      en: 'Home Sample or Women’s Center Visit',
      hi: 'होम सैंपल या महिला स्वास्थ्य केंद्र',
    },
    includes: [
      { en: 'Thyroid Profile (T3, T4, TSH)', hi: 'थायरॉइड प्रोफाइल जांच' },
      { en: 'Pap Smear / Cytology Screening', hi: 'पैप स्मीयर / साइटोलॉजी जांच' },
      { en: 'Sono-Mammography / Breast Ultrasound', hi: 'स्तन अल्ट्रासाउंड / सोनो-मैमोग्राफी' },
      { en: 'Iron Profile & Ferritin Levels', hi: 'आयरन प्रोफाइल एवं फेरिटिन' },
      { en: 'Gynecologist & Wellness Consultation', hi: 'गायनेकोलॉजिस्ट एवं वेलनेस परामर्श' },
    ],
    prep: [
      { en: 'Schedule Pap smear test 5 days clear of menstrual flow', hi: 'पीरियड्स खत्म होने के 5 दिन बाद टेस्ट शेड्यूल करें' },
      { en: 'Fasting 8–10 hours for metabolic panel', hi: '8-10 घंटे का उपवास रखें' },
    ],
  },
];
