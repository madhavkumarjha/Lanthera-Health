import { CareerOption } from '../types';

export const careerListings: CareerOption[] = [
  {
    id: 'car-sn-icu-01',
    title: {
      en: 'Senior ICU Staff Nurse (Critical Care)',
      hi: 'वरिष्ठ आईसीयू स्टाफ नर्स (क्रिटिकल केयर)',
    },
    dept: 'nursing',
    location: 'Main Hospital Campus',
    type: 'Full-time',
    experience: '3–5 Years ICU Experience',
    reqs: [
      { en: 'B.Sc Nursing or GNM with active State Nursing Council registration', hi: 'राज्य नर्सिंग काउंसिल में सक्रिय पंजीकरण के साथ बी.एससी नर्सिंग या जीएनएम' },
      { en: 'Certified in ACLS & BLS emergency protocols', hi: 'एसीएलएस और बीएलएस आपातकालीन प्रोटोकॉल में प्रमाणित' },
      { en: 'Hands-on experience with mechanical ventilators and hemodialysis monitoring', hi: 'वेंटिलेटर एवं हेमोडायलिसिस निगरानी का व्यावहारिक अनुभव' },
    ],
  },
  {
    id: 'car-em-res-02',
    title: {
      en: 'Attending Emergency Medicine Physician',
      hi: 'आपातकालीन चिकित्सा विशेषज्ञ चिकित्सक',
    },
    dept: 'emergency',
    location: 'Emergency Care Block',
    type: 'Full-time',
    experience: '2+ Years Post-MD/DNB',
    reqs: [
      { en: 'MD / DNB / MEM in Emergency Medicine', hi: 'एमडी / डीएनबी / एमईएम आपातकालीन चिकित्सा में' },
      { en: 'Proven expertise in acute trauma resuscitation and FAST ultrasound triage', hi: 'ट्रॉमा रीससिटेशन और अल्ट्रासाउंड ट्राइएज में विशेषज्ञता' },
    ],
  },
  {
    id: 'car-rad-tech-03',
    title: {
      en: 'Senior MRI & CT Radiographer Technologist',
      hi: 'वरिष्ठ एमआरआई एवं सीटी रेडियोग्राफर टेक्नोलॉजिस्ट',
    },
    dept: 'diagnostics',
    location: 'Diagnostic Center Wing B',
    type: 'Full-time',
    experience: '4+ Years 3T MRI Operation',
    reqs: [
      { en: 'B.Sc / Diploma in Radiography & Imaging Technology', hi: 'रेडियोग्राफी और इमेजिंग टेक्नोलॉजी में बी.एससी / डिप्लोमा' },
      { en: 'Expertise in cardiac CT angiography and neuro spectroscopy protocols', hi: 'कार्डिएक सीटी एंजियोग्राफी और न्यूरो स्पेक्ट्रोस्कोपी में विशेषज्ञता' },
    ],
  },
];
