import { Article } from '../types';

export const articles: Article[] = [
  {
    slug: 'understanding-hypertension-guidelines',
    dept: 'cardiology',
    title: {
      en: 'Understanding High Blood Pressure (Hypertension) & Home Tracking',
      hi: 'उच्च रक्तचाप (हाइपरटेंशन) को समझें एवं घर पर बीपी ट्रैकिंग',
    },
    summary: {
      en: 'What systolic & diastolic readings mean, when to seek immediate medical review, and daily monitoring tips.',
      hi: 'सिस्टोलिक व डायस्टोलिक रीडिंग का अर्थ, तुरंत डॉक्टर को कब दिखाएं और दैनिक निगरानी टिप्स।',
    },
    layers: {
      s30: {
        en: 'Blood pressure measures how hard blood pushes against artery walls. A normal target reading is below 120/80 mmHg. Consistent readings above 140/90 require medical evaluation.',
        hi: 'रक्तचाप यह मापता है कि रक्त धमनी की दीवारों पर कितना दबाव डालता है। सामान्य लक्ष्य रीडिंग 120/80 mmHg से कम है। 140/90 से ऊपर लगातार रीडिंग आने पर चिकित्सकीय परामर्श की आवश्यकता होती है।',
      },
      m3: {
        en: `High blood pressure often has zero physical symptoms, earning it the clinical name "silent condition." 

Primary Management Pillars:
1. Dietary Salt Reduction: Aim for under 5g (approx. 1 teaspoon) of total salt daily.
2. Daily Physical Activity: 30 minutes of brisk walking 5 days a week.
3. Proper Home Cuff Technique: Rest for 5 minutes before reading, sit upright with feet flat on the floor, and position cuff at heart level.`,
        hi: `उच्च रक्तचाप के अक्सर कोई शारीरिक लक्षण नहीं होते, इसलिए इसे "साइलेंट कंडीशन" कहा जाता है।

मुख्य प्रबंधन स्तंभ:
1. नमक की खपत में कमी: प्रतिदिन 5 ग्राम (लगभग 1 चम्मच) से कम नमक का सेवन करें।
2. दैनिक शारीरिक गतिविधि: सप्ताह में 5 दिन 30 मिनट तेज चाल से टहलें।
3. घर पर बीपी नापने का सही तरीका: रीडिंग से पहले 5 मिनट आराम करें, सीधे बैठें और कफ को दिल के स्तर पर रखें।`,
      },
      deep: {
        en: `Physiological Mechanism & Long-term Cardiovascular Risks:

Vascular Resistance & Arterial Stiffening: Chronic elevated intravascular pressure causes micro-tears in endothelial lining, predisposing vessels to atherosclerotic plaque accumulation. Left ventricular hypertrophy (LVH) develops as the myocardium pumps against elevated systemic vascular resistance.

Clinical Guidelines (ACC/AHA 2017 & ESC 2024 Criteria):
• Normal: <120/80 mmHg
• Elevated: 120-129 / <80 mmHg
• Stage 1 Hypertension: 130-139 / 80-89 mmHg
• Stage 2 Hypertension: ≥140 / ≥90 mmHg
• Hypertensive Urgency/Crisis: >180 / >120 mmHg (Requires emergency triage if accompanied by chest pressure, severe headache, or dyspnea).`,
        hi: `शरीर क्रिया विज्ञान एवं दीर्घकालिक हृदय संबंधी जोखिम:

संवहनी प्रतिरोध एवं धमनियों का सख्त होना: निरंतर बढ़ा हुआ रक्तचाप धमनियों की आंतरिक परत को प्रभावित करता है, जिससे एथेरोस्क्लेरोसिस की संभावना बढ़ जाती है। हृदय की मांसपेशियों को अधिक जोर लगाना पड़ता है।

नैदानिक दिशा-निर्देश (ACC/AHA 2017 एवं ESC 2024 मानदंड):
• सामान्य: <120/80 mmHg
• एलिवेटेड: 120-129 / <80 mmHg
• स्टेज 1 हाइपरटेंशन: 130-139 / 80-89 mmHg
• स्टेज 2 हाइपरटेंशन: ≥140 / ≥90 mmHg
• हाइपरटेंसिव इमरजेंसी: >180 / >120 mmHg (सीने में दर्द या सिरदर्द होने पर तत्काल आपातकालीन सहायता लें)।`,
      },
    },
    glossary: [
      {
        term: 'Systolic Pressure',
        def: {
          en: 'The upper number indicating arterial pressure when heart contracts.',
          hi: 'ऊपर की संख्या जो हृदय संकुचन के दौरान धमनियों के दबाव को दर्शाती है।',
        },
      },
      {
        term: 'Diastolic Pressure',
        def: {
          en: 'The lower number indicating arterial pressure when heart rests between beats.',
          hi: 'नीचे की संख्या जो धड़कनों के बीच हृदय के आराम के समय के दबाव को दर्शाती है।',
        },
      },
    ],
    askDoctor: [
      { en: 'What is my specific target blood pressure range?', hi: 'मेरा विशिष्ट लक्षित रक्तचाप दायरा क्या होना चाहिए?' },
      { en: 'Do any of my current medications require morning vs evening dosage adjustment?', hi: 'क्या मेरी दवाओं की खुराक सुबह या शाम लेने में बदलाव की आवश्यकता है?' },
    ],
    sources: [
      'American College of Cardiology (ACC) / AHA Hypertension Guidelines',
      'European Society of Cardiology (ESC) Arterial Hypertension Guidelines 2024',
    ],
    reviewedBy: 'Dr. Ananya Roy (Reg: WB-MC-48201)',
    reviewedOn: '2026-08-15',
  },
  {
    slug: 'preparing-for-laparoscopic-surgery',
    dept: 'general-surgery',
    title: {
      en: 'What to Expect Before and After Laparoscopic Minimal-Access Surgery',
      hi: 'लैप्रोस्कोपिक (की-होल) सर्जरी से पहले और बाद में क्या ध्यान रखें',
    },
    summary: {
      en: 'Key advantages of keyhole surgery, fasting windows, post-op shoulder tip pain explanation, and recovery timelines.',
      hi: 'की-होल सर्जरी के फायदे, उपवास के नियम, सर्जरी के बाद कंधे में दर्द का कारण और रिकवरी टाइमलाइन।',
    },
    layers: {
      s30: {
        en: 'Laparoscopic surgery uses 3–4 tiny incisions (<1cm) rather than a large open incision. Recovery is faster with minimal hospital stay (1–2 days). Follow fasting instructions strictly before anesthesia.',
        hi: 'लैप्रोस्कोपिक सर्जरी में बड़े चीरे के बजाय 3-4 छोटे चीरे (<1 सेमी) लगाए जाते हैं। रिकवरी तेज होती है और अस्पताल में 1-2 दिन रुकना पड़ता है। एनेस्थीसिया से पहले उपवास के नियमों का सख्ती से पालन करें।',
      },
      m3: {
        en: `Pre-Surgery Fasting Rule (NPO):
• No solid food for 8 hours prior to procedure time.
• Plain water allowed up to 2 hours before arrival unless instructed otherwise.

Post-Op Shoulder Pain Note:
It is common to feel mild pain near your right shoulder after laparoscopic procedures. This happens because carbon dioxide gas used to expand your abdominal cavity can temporarily irritate the diaphragm nerve.`,
        hi: `सर्जरी पूर्व उपवास का नियम (NPO):
• प्रक्रिया समय से 8 घंटे पहले तक ठोस भोजन न लें।
• निर्देशानुसार अस्पताल आगमन से 2 घंटे पहले तक सादा पानी लिया जा सकता है।

सर्जरी के बाद कंधे के दर्द की जानकारी:
लैप्रोस्कोपिक प्रक्रिया के बाद दाहिने कंधे के पास हल्का दर्द महसूस होना सामान्य है। ऐसा पेट को फुलाने के लिए इस्तेमाल की जाने वाली कार्बन डाइऑक्साइड गैस के कारण होता है।`,
      },
      deep: {
        en: `Surgical Technique & CO2 Pneumoperitoneum Clearance:

Incisions & Port Placement: Multi-port trocars (5mm and 10mm) are inserted under direct visualization. A high-definition laparoscope connects to an optical tower.

Pneumoperitoneum & Diaphragmatic Reflex: Intrabdominal pressure is maintained at 12-14 mmHg using medical-grade CO2 gas. Residual CO2 is evacuated at closure, but minor residual gas causes transient phrenic nerve irritation, referred to the C3-C5 dermatome (shoulder tip).`,
        hi: `सर्जिकल तकनीक एवं CO2 न्यूमोपेरिटोनियम निकास:

चीरे व पोर्ट प्लेसमेंट: 5 मिमी और 10 मिमी के ट्रॉकार स्थापित किए जाते हैं। एचडी लैप्रोस्कोप से स्पष्ट दृश्य दिखाई देता है।

न्यूमोपेरिटोनियम व डायाफ्रामिक रिफ्लेक्स: पेट का दबाव 12-14 mmHg CO2 गैस द्वारा बनाए रखा जाता है। सर्जरी के अंत में गैस निकाल दी जाती है।`,
      },
    },
    glossary: [
      {
        term: 'NPO (Nil Per Os)',
        def: {
          en: 'Medical directive indicating nothing by mouth (no food or drinks).',
          hi: 'चिकित्सकीय निर्देश जिसका अर्थ है मुंह से कुछ भी न लेना (खाना या पानी)।',
        },
      },
    ],
    askDoctor: [
      { en: 'When can I resume driving and normal light office work?', hi: 'मैं कब से ड्राइविंग और हल्का ऑफिस काम शुरू कर सकता हूँ?' },
      { en: 'What signs of wound infection should I monitor at home?', hi: 'घर पर मुझे घाव के संक्रमण के कौन से लक्षणों पर नज़र रखनी चाहिए?' },
    ],
    sources: [
      'Society of American Gastrointestinal and Endoscopic Surgeons (SAGES)',
      'Association of Surgeons of India (ASI) Minimal Access Guidelines',
    ],
    reviewedBy: 'Dr. Siddharth Menon (Reg: MH-MC-99412)',
    reviewedOn: '2026-09-01',
  },
];
