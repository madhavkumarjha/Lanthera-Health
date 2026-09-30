import { InternationalDesk } from '../types';

export const internationalDeskData: InternationalDesk = {
  visaSteps: [
    {
      step: 1,
      title: {
        en: 'Clinical Dossier & Passport Review',
        hi: 'मेडिकल फाइल्स एवं पासपोर्ट समीक्षा',
      },
      detail: {
        en: 'Send your recent medical reports and passport copy via secure portal or encrypted email to our international team.',
        hi: 'अपने हालिया मेडिकल रिपोर्ट और पासपोर्ट की प्रति हमारे अंतरराष्ट्रीय डेस्क पर सुरक्षित पोर्टल या ईमेल के माध्यम से भेजें।',
      },
    },
    {
      step: 2,
      title: {
        en: 'Pre-flight Video Consultation & Cost Estimate',
        hi: 'यात्रा पूर्व वीडियो परामर्श एवं लागत अनुमान',
      },
      detail: {
        en: 'Consult with the chief specialist over secure tele-health to receive a tentative treatment plan and transparent estimate letter.',
        hi: 'मुख्य विशेषज्ञ से वीडियो परामर्श करें तथा उपचार योजना व पारदर्शी लागत पत्र प्राप्त करें।',
      },
    },
    {
      step: 3,
      title: {
        en: 'Official Medical Visa Invitation Letter (MVIL)',
        hi: 'आधिकारिक मेडिकल वीजा आमंत्रण पत्र',
      },
      detail: {
        en: 'We issue an official hospital invitation letter stamped by the Ministry of External Affairs for expedited medical visa processing.',
        hi: 'हम तेजी से वीजा प्रक्रिया के लिए आधिकारिक अस्पताल आमंत्रण पत्र जारी करते हैं।',
      },
    },
    {
      step: 4,
      title: {
        en: 'Airport Reception & Dedicated Liaison',
        hi: 'हवाई अड्डा स्वागत एवं समर्पित संपर्क अधिकारी',
      },
      detail: {
        en: 'Chauffeur pickup from the airport, currency exchange assistance, local SIM card setup, and private suite check-in.',
        hi: 'एयरपोर्ट से पिकअप, मुद्रा विनिमय सहायता, लोकल सिम कार्ड एवं प्राइवेट सुइट चेक-इन।',
      },
    },
  ],
  services: [
    {
      id: 'language',
      title: { en: 'Multi-lingual Interpreters', hi: 'बहुभाषी अनुवादक' },
      desc: {
        en: 'Dedicated full-time language translators (Arabic, Russian, French, Bengali, Swahili).',
        hi: 'समर्पित पूर्णकालिक अनुवादक (अरबी, रूसी, फ्रेंच, बंगाली, स्वाहिली)।',
      },
      icon: 'Languages',
    },
    {
      id: 'stay',
      title: { en: 'Partner Guest Houses & Hotels', hi: 'गेस्ट हाउस एवं होटल साझेदार' },
      desc: {
        en: 'Curated 3-star to 5-star long-stay accommodations within 2km of the medical campus.',
        hi: 'अस्पताल परिसर से 2 किमी के दायरे में सुविधाजनक आवास व्यवस्था।',
      },
      icon: 'Hotel',
    },
    {
      id: 'diet',
      title: { en: 'Custom Culinary & Dietary Support', hi: 'अनुकूलित आहार व्यवस्था' },
      desc: {
        en: 'Halal, Kosher, Vegetarian, and International cuisine menus prepared by clinical nutritionists.',
        hi: 'हलाल, शाकाहारी एवं अंतरराष्ट्रीय आहार मेनू विशेषज्ञ न्यूट्रिशनिस्ट द्वारा तैयार।',
      },
      icon: 'Utensils',
    },
    {
      id: 'tele-followup',
      title: { en: 'Post-discharge Remote Follow-up', hi: 'डिस्चार्ज के बाद रिमोट फॉलो-अप' },
      desc: {
        en: 'Continuous 12-month post-surgery video follow-ups upon returning to your home country.',
        hi: 'स्वदेश लौटने पर 12 महीने तक निरंतर वीडियो फॉलो-अप।',
      },
      icon: 'Video',
    },
  ],
  partnerships: [
    'International SOS Global Assistance',
    'Cigna Global Medical Coverage',
    'Bupa International Direct Billing',
    'Allianz Care Worldwide',
  ],
  contact: {
    email: 'international@lantherahealth.org',
    phone: '+91 11 4982 7000',
    whatsapp: '+91 98100 12345',
  },
};
