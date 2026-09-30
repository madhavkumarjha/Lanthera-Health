import { I18n } from '../types';

export interface NightWatchBeat {
  hour: string;
  roomId: string;
  role: I18n;
  department: I18n;
  story: I18n;
  art: string;
  activeWindows: number[];
}

export const nightWatchBeats: NightWatchBeat[] = [
  {
    hour: '18:00',
    roomId: 'triage',
    role: { en: 'Evening Triage Lead', hi: 'संध्या ट्राइएज प्रमुख' },
    department: { en: 'Emergency & Trauma', hi: 'इमरजेंसी व ट्रॉमा' },
    story: {
      en: 'Shift handover begins as day turns to evening. Triage nurses review incoming cases, ensuring every patient arriving at dusk is greeted within 90 seconds.',
      hi: 'शाम ढलते ही शिफ्ट हैंडओवर शुरू होता है। ट्राइएज नर्स आने वाले मामलों की समीक्षा करती हैं और सुनिश्चित करती हैं कि हर मरीज को 90 सेकंड में अटेंड किया जाए।',
    },
    art: '/img/nightwatch/18.svg',
    activeWindows: [1, 2, 3, 4, 11, 12],
  },
  {
    hour: '20:00',
    roomId: 'pharmacy',
    role: { en: 'Night Pharmacist', hi: 'नाइट फार्मासिस्ट' },
    department: { en: 'Central Pharmacy', hi: 'सेंट्रल फार्मेसी' },
    story: {
      en: 'Verifying emergency medication orders and filling ward requisitions for the night wards, keeping statutory stocks verified and accessible.',
      hi: 'आपातकालीन दवा के आदेशों का सत्यापन और रात के वार्डों के लिए आवश्यकताओं को पूरा करना, ताकि जीवन रक्षक दवाएं तुरंत उपलब्ध रहें।',
    },
    art: '/img/nightwatch/20.svg',
    activeWindows: [5, 6, 7, 15, 16],
  },
  {
    hour: '22:00',
    roomId: 'diagnostics',
    role: { en: 'On-Call Radiologist & Tech', hi: 'ऑन-कॉल रेडियोलॉजिस्ट व तकनीशियन' },
    department: { en: 'Imaging & Diagnostics', hi: 'इमेजिंग व डायग्नोस्टिक्स' },
    story: {
      en: 'Processing urgent CT scans and X-rays for emergency arrivals, providing immediate preliminary reads to trauma surgeons.',
      hi: 'इमरजेंसी में आने वाले मरीजों के सीटी स्कैन और एक्स-रे की प्रोसेसिंग, ट्रॉमा सर्जनों को तुरंत प्राथमिक रिपोर्ट देना।',
    },
    art: '/img/nightwatch/22.svg',
    activeWindows: [8, 9, 10, 18, 19, 20],
  },
  {
    hour: '00:00',
    roomId: 'icu',
    role: { en: 'ICU Intensivist', hi: 'आईसीयू इंटेंसिविस्ट' },
    department: { en: 'Critical Care (ICU)', hi: 'गहन चिकित्सा इकाई (ICU)' },
    story: {
      en: 'Midnight rounds across critical care units. Adjusting ventilator settings and monitoring hemodynamics for stability.',
      hi: 'क्रिटिकल केयर यूनिट में मध्यरात्रि के राउंड। वेंटिलेटर सेटिंग्स को समायोजित करना और वाइटल्स की निरंतर निगरानी करना।',
    },
    art: '/img/nightwatch/00.svg',
    activeWindows: [21, 22, 23, 24, 25, 26],
  },
  {
    hour: '02:00',
    roomId: 'surgery',
    role: { en: 'Emergency Surgical Team', hi: 'इमरजेंसी सर्जिकल टीम' },
    department: { en: 'Operation Theatre', hi: 'ऑपरेशन थियेटर' },
    story: {
      en: 'A quiet focus in OT-3 for an emergency appendectomy. Surgical lights shine as the team works steadily through the quietest hour.',
      hi: 'आपातकालीन अपेंडेक्टॉमी के लिए ओटी-3 में शांत एकाग्रता। रात के सबसे शांत पहर में सर्जिकल लाइटें जलती रहती हैं।',
    },
    art: '/img/nightwatch/02.svg',
    activeWindows: [27, 28, 29, 30],
  },
  {
    hour: '04:00',
    roomId: 'nursing',
    role: { en: 'Ward Night Charge Nurse', hi: 'वार्ड नाइट चार्ज नर्स' },
    department: { en: 'Inpatient Wards', hi: 'इनपेशेंट वार्ड' },
    story: {
      en: 'Conducting quiet hourly checks, monitoring IV drips, and ensuring patients rest comfortably before dawn.',
      hi: 'प्रति घंटा शांत मुआयना करना, ड्रिप मॉनिटर करना और यह सुनिश्चित करना कि मरीज भोर होने से पहले आराम से सो सकें।',
    },
    art: '/img/nightwatch/04.svg',
    activeWindows: [31, 32, 33, 34, 35, 36],
  },
  {
    hour: '06:00',
    roomId: 'reception',
    role: { en: 'Morning Shift Coordinator', hi: 'सुबह की शिफ्ट समन्वयक' },
    department: { en: 'Outpatient & Reception', hi: 'आउटपेशेंट व रिसेप्शन' },
    story: {
      en: 'As dawn lights the courtyard, morning shift handovers complete and the hospital prepares for day clinics with continuous care.',
      hi: 'जैसे ही प्रांगण में भोर की किरणें खिलती हैं, सुबह की शिफ्ट का हैंडओवर पूरा होता है और निरंतर देखभाल के साथ दिन के क्लिनिक शुरू होते हैं।',
    },
    art: '/img/nightwatch/06.svg',
    activeWindows: [37, 38, 39, 40, 1, 2, 3, 4],
  },
];
