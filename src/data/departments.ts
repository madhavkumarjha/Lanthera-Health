import { Department } from '../types';

export const departments: Department[] = [
  {
    slug: 'cardiology',
    name: { en: 'Cardiology & Heart Care', hi: 'हृदय रोग विज्ञान (कार्डियोलॉजी)' },
    blurb: {
      en: 'Comprehensive 24×7 cardiac care including emergency angioplasty, heart failure clinic, and non-invasive diagnostics.',
      hi: '24×7 आपातकालीन एंजियोप्लास्टी, हार्ट फेलियर क्लिनिक और नॉन-इन्वेसिव डायग्नोस्टिक्स सहित संपूर्ण हृदय देखभाल।',
    },
    icon: 'HeartPulse',
    image: '/img/dept/cardiology.webp',
    conditions: [
      { en: 'Coronary Artery Disease', hi: 'कोरोनरी आर्टरी डिजीज' },
      { en: 'Heart Failure & Arrhythmia', hi: 'हार्ट फेलियर व अतालता' },
      { en: 'Hypertension & Lipid Disorders', hi: 'उच्च रक्तचाप व लिपिड विकार' },
    ],
    tests: ['ECG', 'Echocardiogram', 'Treadmill Test (TMT)', 'Coronary Angiography'],
    headId: 'doc-cardio-head',
    faq: [
      {
        q: { en: 'What should I do if I feel chest tightness at night?', hi: 'रात में सीने में जकड़न महसूस होने पर मुझे क्या करना चाहिए?' },
        a: {
          en: 'Immediately proceed to Emergency & Trauma or call 24×7 Helpline. Our Cardiac ER team is on site at all hours.',
          hi: 'तुरंत इमरजेंसी में जाएं या 24x7 हेल्पलाइन पर कॉल करें। हमारी कार्डियक ईआर टीम हर समय मौजूद है।',
        },
      },
    ],
    audience: ['adult', 'senior'],
  },
  {
    slug: 'neurology',
    name: { en: 'Neurology & Brain Sciences', hi: 'तंत्रिका विज्ञान (न्यूरोलॉजी)' },
    blurb: {
      en: 'Advanced care for stroke, epilepsy, movement disorders, and neuro-rehabilitation with 24×7 neuro-imaging.',
      hi: '24×7 न्यूरो-इमेजिंग के साथ स्ट्रोक, मिर्गी, मूवमेंट डिसऑर्डर और न्यूरो-पुनर्वास के लिए उन्नत देखभाल।',
    },
    icon: 'Brain',
    image: '/img/dept/neurology.webp',
    conditions: [
      { en: 'Acute Ischemic Stroke', hi: 'एक्यूट इस्केमिक स्ट्रोक' },
      { en: 'Epilepsy & Seizures', hi: 'मिर्गी व दौरे' },
      { en: 'Parkinsons & Tremors', hi: 'पार्किंसंस व कंपन' },
    ],
    tests: ['Brain MRI / MRA', 'EEG', 'Nerve Conduction Velocity (NCV)', 'CT Angiogram'],
    headId: 'doc-neuro-head',
    faq: [
      {
        q: { en: 'What are the warning signs of stroke?', hi: 'स्ट्रोक के चेतावनी संकेत क्या हैं?' },
        a: {
          en: 'Remember BE-FAST: Balance loss, Eyesight changes, Face drooping, Arm weakness, Speech difficulty, Time to call Emergency.',
          hi: 'BE-FAST याद रखें: संतुलन बिगड़ना, दृष्टि बदलना, चेहरा लटकना, बांह में कमजोरी, बोलने में कठिनाई, तुरंत इमरजेंसी कॉल करना।',
        },
      },
    ],
    audience: ['adult', 'senior'],
  },
  {
    slug: 'pediatrics',
    name: { en: 'Pediatrics & Child Health', hi: 'बाल रोग विज्ञान (पीडियाट्रिक्स)' },
    blurb: {
      en: 'Gentle, specialized care for infants, children, and adolescents with 24×7 Pediatric ICU (PICU) support.',
      hi: '24×7 पीडियाट्रिक आईसीयू (PICU) सहायता के साथ शिशुओं, बच्चों और किशोरों के लिए सौम्य, विशेष देखभाल।',
    },
    icon: 'Baby',
    image: '/img/dept/pediatrics.webp',
    conditions: [
      { en: 'Childhood Asthma & Respiratory Infections', hi: 'बाल अस्थमा व श्वास संक्रमण' },
      { en: 'High Fever & Dehydration', hi: 'तेज बुखार व निर्जलीकरण' },
      { en: 'Growth & Developmental Assessment', hi: 'विकास व संवर्द्धन मूल्यांकन' },
    ],
    tests: ['Pediatric Blood Panel', 'Growth Charting', 'Allergy Screen', 'Pediatric Ultrasound'],
    headId: 'doc-peds-head',
    faq: [
      {
        q: { en: 'Are pediatric emergency services open 24x7?', hi: 'क्या पीडियाट्रिक आपातकालीन सेवाएं 24x7 खुली हैं?' },
        a: {
          en: 'Yes, our child emergency bay and attending pediatricians are available on site 24 hours a day.',
          hi: 'हां, हमारा चाइल्ड इमरजेंसी बे और अटेंडिंग पीडियाट्रिशियन 24 घंटे उपलब्ध रहते हैं।',
        },
      },
    ],
    audience: ['child'],
  },
  {
    slug: 'obstetrics-gynecology',
    name: { en: 'Obstetrics & Women’s Health', hi: 'स्त्री व प्रसूति रोग (ऑब्स्टेट्रिक्स)' },
    blurb: {
      en: 'Compassionate maternity care, high-risk pregnancy management, and minimally invasive gynecological care.',
      hi: 'सहानुभूतिपूर्ण मातृत्व देखभाल, उच्च जोखिम गर्भावस्था प्रबंधन और न्यूनतम इनवेसिव स्त्री रोग देखभाल।',
    },
    icon: 'Heart',
    image: '/img/dept/maternity.webp',
    conditions: [
      { en: 'Antenatal & High-Risk Delivery', hi: 'प्रसवपूर्व व उच्च जोखिम प्रसव' },
      { en: 'PCOS & Hormonal Imbalance', hi: 'पीसीओएस व हार्मोनल असंतुलन' },
      { en: 'Uterine Fibroids & Endometriosis', hi: 'गर्भाशय फाइब्रॉएड व एंडोमेट्रियोसिस' },
    ],
    tests: ['Fetal Wellbeing Ultrasound', 'Pap Smear', 'Mammography', 'Hormone Panel'],
    headId: 'doc-obgyn-head',
    faq: [
      {
        q: { en: 'Do you have birthing suites for family stay?', hi: 'क्या आपके पास परिवार के रहने के लिए बर्थिंग सुइट हैं?' },
        a: {
          en: 'Yes, private birthing suites allow one family member to stay throughout labor and delivery.',
          hi: 'हां, प्राइवेट बर्थिंग सुइट्स एक परिजन को प्रसव के दौरान साथ रहने की अनुमति देते हैं।',
        },
      },
    ],
    audience: ['women'],
  },
  {
    slug: 'orthopedics',
    name: { en: 'Orthopedics & Joint Replacement', hi: 'अस्थि रोग विज्ञान (ऑर्थोपेडिक्स)' },
    blurb: {
      en: 'Expert trauma bone care, robotic knee/hip replacement, and sports injury rehabilitation.',
      hi: 'विशेषज्ञ ट्रॉमा बोन केयर, रोबोटिक घुटना/कूल्हा प्रत्यारोपण और स्पोर्ट्स इंजरी पुनर्वास।',
    },
    icon: 'Activity',
    image: '/img/dept/orthopedics.webp',
    conditions: [
      { en: 'Osteoarthritis & Joint Degeneration', hi: 'ऑस्टियोआर्थराइटिस व जोड़ों का घिसना' },
      { en: 'Fractures & Complex Trauma', hi: 'फ्रैक्चर व जटिल चोटें' },
      { en: 'Ligament Tear (ACL/Meniscus)', hi: 'लिगामेंट टूटना (एसीएल/मेनिस्कस)' },
    ],
    tests: ['Digital Bone X-Ray', 'Joint MRI', 'DEXA Bone Density Scan', 'CT Arthrogram'],
    headId: 'doc-ortho-head',
    faq: [
      {
        q: { en: 'How soon can patients walk after joint replacement?', hi: 'जोड़ प्रत्यारोपण के बाद मरीज कितनी जल्दी चल सकते हैं?' },
        a: {
          en: 'Most patients begin supported walking within 24 hours under our rapid-recovery physical therapy protocol.',
          hi: 'हमारे रैपिड-रिकवरी फिजियोथेरेपी प्रोटोकॉल के तहत अधिकांश मरीज 24 घंटे के भीतर चलना शुरू कर देते हैं।',
        },
      },
    ],
    audience: ['adult', 'senior'],
  },
  {
    slug: 'oncology',
    name: { en: 'Medical & Surgical Oncology', hi: 'कैंसर विज्ञान (ऑन्कोलॉजी)' },
    blurb: {
      en: 'Multidisciplinary tumor board care, targeted chemotherapy, immunotherapy, and surgical resection.',
      hi: 'बहुविषयक ट्यूमर बोर्ड देखभाल, लक्षित कीमोथेरेपी, इम्यूनोथेरेपी और सर्जिकल विच्छेदन।',
    },
    icon: 'ShieldAlert',
    image: '/img/dept/oncology.webp',
    conditions: [
      { en: 'Solid Organ Tumors', hi: 'ठोस अंग ट्यूमर' },
      { en: 'Hematological Malignancies', hi: 'रक्त संबंधी कैंसर' },
      { en: 'Preventive Cancer Screening', hi: 'निवारक कैंसर जांच' },
    ],
    tests: ['PET-CT Scan', 'Biopsy & Histopathology', 'Tumor Marker Blood Panel', 'Genomic Profiling'],
    headId: 'doc-onco-head',
    faq: [
      {
        q: { en: 'How are treatment decisions made in oncology?', hi: 'ऑन्कोलॉजी में इलाज के फैसले कैसे लिए जाते हैं?' },
        a: {
          en: 'Every case is presented at our weekly multidisciplinary Tumor Board involving medical, surgical, and radiation oncologists.',
          hi: 'हर मामले को हमारे साप्ताहिक मल्टीडिसिप्लिनरी ट्यूमर बोर्ड में प्रस्तुत किया जाता है।',
        },
      },
    ],
    audience: ['adult', 'senior'],
  },
  {
    slug: 'emergency-trauma',
    name: { en: 'Emergency & Level-1 Trauma', hi: 'इमरजेंसी व लेवल-1 ट्रॉमा' },
    blurb: {
      en: '24×7 rapid-response emergency bay with immediate access to blood bank, OT, and critical care units.',
      hi: 'ब्लड बैंक, ओटी और क्रिटिकल केयर यूनिट्स तक त्वरित पहुंच के साथ 24x7 रैपिड-रेस्पॉन्स इमरजेंसी बे।',
    },
    icon: 'PhoneCall',
    image: '/img/dept/emergency.webp',
    conditions: [
      { en: 'Accident & Severe Physical Trauma', hi: 'दुर्घटना व गंभीर शारीरिक चोट' },
      { en: 'Severe Respiratory Distress', hi: 'गंभीर सांस की तकलीफ' },
      { en: 'Acute Cardiac / Stroke Emergency', hi: 'एक्यूट कार्डियक / स्ट्रोक इमरजेंसी' },
    ],
    tests: ['FAST Ultrasound', 'Emergency CT Scan', 'ABG Blood Gas Analysis', 'ECG'],
    headId: 'doc-er-head',
    faq: [
      {
        q: { en: 'Do I need prior appointment for Emergency?', hi: 'क्या इमरजेंसी के लिए पूर्व अपॉइंटमेंट की आवश्यकता है?' },
        a: {
          en: 'No appointment is ever needed for emergency care. Walk in or call 24x7 helpline.',
          hi: 'इमरजेंसी देखभाल के लिए कभी अपॉइंटमेंट की आवश्यकता नहीं होती। सीधे आएं या 24x7 हेल्पलाइन पर कॉल करें।',
        },
      },
    ],
    audience: ['adult', 'child', 'women', 'senior'],
  },
  {
    slug: 'internal-medicine',
    name: { en: 'Internal Medicine & General Care', hi: 'इंटरनल मेडिसिन व सामान्य चिकित्सा' },
    blurb: {
      en: 'Primary diagnostic evaluation, chronic disease management, diabetes care, and adult immunization.',
      hi: 'प्राथमिक नैदानिक मूल्यांकन, पुरानी बीमारियों का प्रबंधन, मधुमेह देखभाल और वयस्क टीकाकरण।',
    },
    icon: 'Stethoscope',
    image: '/img/dept/internal.webp',
    conditions: [
      { en: 'Type-2 Diabetes & Metabolic Syndrome', hi: 'टाइप-2 डायबिटीज व मेटाबॉलिक सिंड्रोम' },
      { en: 'Unexplained Fever & Infections', hi: 'अज्ञात बुखार व संक्रमण' },
      { en: 'Hypertension & Kidney Health Check', hi: 'बीपी व गुर्दा स्वास्थ्य जांच' },
    ],
    tests: ['HbA1c & Fasting Glucose', 'Kidney Function Test (KFT)', 'Liver Function Test (LFT)', 'CBC Panel'],
    headId: 'doc-internal-head',
    faq: [
      {
        q: { en: 'What is included in an annual health review?', hi: 'वार्षिक स्वास्थ्य समीक्षा में क्या शामिल है?' },
        a: {
          en: 'Complete physical examination, blood chemistry panel, ECG, lipid profile, and preventive counseling.',
          hi: 'संपूर्ण शारीरिक परीक्षा, रक्त रसायन पैनल, ईसीजी, लिपिड प्रोफाइल और निवारक परामर्श।',
        },
      },
    ],
    audience: ['adult', 'senior'],
  },
  {
    slug: 'gastroenterology',
    name: { en: 'Gastroenterology & Digestive Health', hi: 'गैस्ट्रोएंटरोलॉजी (पाचन तंत्र)' },
    blurb: {
      en: 'Advanced GI endoscopy, liver disease management, and minimally invasive digestive surgeries.',
      hi: 'उन्नत जीआई एंडोस्कोपी, लिवर रोग प्रबंधन और न्यूनतम इनवेसिव पाचन सर्जरी।',
    },
    icon: 'Activity',
    image: '/img/dept/gastro.webp',
    conditions: [
      { en: 'GERD & Severe Acid Reflux', hi: 'जीईआरडी व एसिड रिफ्लक्स' },
      { en: 'Fatty Liver & Hepatitis', hi: 'फैटी लिवर व हेपेटाइटिस' },
      { en: 'Gallstones & Pancreatitis', hi: 'पित्त की पथरी व अग्न्याशयशोथ' },
    ],
    tests: ['Upper GI Endoscopy', 'Colonoscopy', 'FibroScan Liver Ultrasound', 'Abdominal CT'],
    headId: 'doc-gastro-head',
    faq: [
      {
        q: { en: 'Is endoscopy performed under sedation?', hi: 'क्या एंडोस्कोपी बेहोशी (एनेस्थीसिया) में की जाती है?' },
        a: {
          en: 'Yes, routine endoscopies are conducted under light conscious sedation for complete patient comfort.',
          hi: 'हां, पूर्ण रोगी आराम के लिए हल्की एनेस्थीसिया के तहत एंडोस्कोपी की जाती है।',
        },
      },
    ],
    audience: ['adult', 'senior'],
  },
  {
    slug: 'pulmonology',
    name: { en: 'Pulmonology & Respiratory Medicine', hi: 'पल्मोनोलॉजी (फेफड़े व श्वास)' },
    blurb: {
      en: 'Specialized management for COPD, asthma, sleep apnea, post-viral lung rehabilitation, and bronchoscopy.',
      hi: 'सीओपीडी, अस्थमा, स्लीप एप्निया, पोस्ट-वायरल लंग रिहैबिलिटेशन और ब्रोंकोस्कोपी के लिए विशेष प्रबंधन।',
    },
    icon: 'Wind',
    image: '/img/dept/pulmo.webp',
    conditions: [
      { en: 'Asthma & Bronchitis', hi: 'अस्थमा व ब्रोंकाइटिस' },
      { en: 'Chronic Obstructive Pulmonary Disease (COPD)', hi: 'सीओपीडी' },
      { en: 'Obstructive Sleep Apnea', hi: 'स्लीप एप्निया' },
    ],
    tests: ['Spirometry Pulmonary Function Test', 'Polysomnography Sleep Study', 'Bronchoscopy', 'HRCT Chest'],
    headId: 'doc-pulmo-head',
    faq: [
      {
        q: { en: 'How is a sleep apnea study conducted?', hi: 'स्लीप एप्निया अध्ययन कैसे किया जाता है?' },
        a: {
          en: 'An overnight sleep study (polysomnography) monitors breathing patterns, oxygen levels, and sleep stages.',
          hi: 'रातोंरात स्लीप स्टडी सांस लेने के पैटर्न, ऑक्सीजन के स्तर और नींद के चरणों की निगरानी करती है।',
        },
      },
    ],
    audience: ['adult', 'senior'],
  },
  {
    slug: 'dermatology',
    name: { en: 'Dermatology & Skin Health', hi: 'त्वचा रोग विज्ञान (डर्मेटोलॉजी)' },
    blurb: {
      en: 'Clinical skin care, psoriasis management, allergy testing, and procedural dermatologic care.',
      hi: 'क्लिनिकल स्किन केयर, सोरायसिस प्रबंधन, एलर्जी टेस्ट और प्रोसीजरल डर्मेटोलॉजिक केयर।',
    },
    icon: 'Sparkles',
    image: '/img/dept/derma.webp',
    conditions: [
      { en: 'Eczema & Psoriasis', hi: 'एक्जिमा व सोरायसिस' },
      { en: 'Severe Acne & Scarring', hi: 'मुंहासे व दाग-धब्बे' },
      { en: 'Allergic Dermatitis', hi: 'एलर्जिक डर्मेटाइटिस' },
    ],
    tests: ['Dermoscopy', 'Skin Biopsy', 'Patch Allergy Test', 'Trichoscopy'],
    headId: 'doc-derma-head',
    faq: [
      {
        q: { en: 'Do you offer tele-consultations for skin conditions?', hi: 'क्या आप त्वचा की स्थितियों के लिए टेली-परामर्श प्रदान करते हैं?' },
        a: {
          en: 'Yes, follow-ups and skin assessments can be scheduled via video tele-consultation.',
          hi: 'हां, वीडियो टेली-परामर्श के माध्यम से फॉलो-अप और त्वचा मूल्यांकन का समय निर्धारित किया जा सकता है।',
        },
      },
    ],
    audience: ['adult', 'child', 'women', 'senior'],
  },
  {
    slug: 'nephrology',
    name: { en: 'Nephrology & Kidney Care', hi: 'नेफ्रोलॉजी (गुर्दा रोग)' },
    blurb: {
      en: '24×7 hemodialysis, chronic kidney disease (CKD) clinic, kidney transplant evaluation, and electrolyte management.',
      hi: '24×7 हीमोडायलिसिस, क्रोनिक किडनी डिजीज क्लिनिक, गुर्दा प्रत्यारोपण मूल्यांकन और इलेक्ट्रोलाइट प्रबंधन।',
    },
    icon: 'Shield',
    image: '/img/dept/nephro.webp',
    conditions: [
      { en: 'Chronic Kidney Disease (CKD)', hi: 'क्रोनिक किडनी डिजीज' },
      { en: 'Kidney Stones & Proteinuria', hi: 'गुर्दे की पथरी व प्रोटीन्यूरिया' },
      { en: 'End-Stage Renal Disease (ESRD)', hi: 'एंड-स्टेज रीनल डिजीज' },
    ],
    tests: ['eGFR & Serum Creatinine', '24-Hour Urine Protein', 'Renal Doppler Ultrasound', 'Kidney Biopsy'],
    headId: 'doc-nephro-head',
    faq: [
      {
        q: { en: 'Are dialysis units operational 24x7?', hi: 'क्या डायलिसिस इकाइयां 24x7 चालू हैं?' },
        a: {
          en: 'Yes, our emergency hemodialysis unit operates around the clock for acute renal support.',
          hi: 'हां, हमारी आपातकालीन हीमोडायलिसिस इकाई 24 घंटे चालू रहती है।',
        },
      },
    ],
    audience: ['adult', 'senior'],
  },
];
