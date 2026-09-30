import { DiagnosticItem } from '../types';

export const diagnosticTests: DiagnosticItem[] = [
  {
    id: 'mri-3t-brain',
    code: 'RAD-MRI-3T-01',
    name: {
      en: '3T High-Definition Brain MRI (with Spectroscopy)',
      hi: '3टी हाई-डेफिनिशन मस्तिष्क एमआरआई',
    },
    category: 'radiology',
    tatHours: 4,
    homeSample: false,
    price: 6500,
    prepInstructions: [
      { en: 'Remove all metallic objects, jewelry, and hairpins', hi: 'सभी धातु के गहने एवं पिन हटा दें' },
      { en: 'Inform technologist if you have a cardiac pacemaker or metallic implants', hi: 'पेसमेकर या मेटल इंप्लांट होने पर पहले सूचित करें' },
      { en: 'Fasting 4 hours if contrast dye injection is advised', hi: 'कंट्रास्ट डाई होने पर 4 घंटे का उपवास रखें' },
    ],
  },
  {
    id: 'ct-coronary-angiogram',
    code: 'RAD-CT-ANGIO-02',
    name: {
      en: '128-Slice Cardiac CT Coronary Angiogram',
      hi: '128-स्लाइस कार्डिएक सीटी एंजियोग्राम',
    },
    category: 'radiology',
    tatHours: 6,
    homeSample: false,
    price: 8900,
    prepInstructions: [
      { en: 'Fasting for 6 hours prior to the scan', hi: 'स्कैन से 6 घंटे पहले उपवास आवश्यक है' },
      { en: 'Serum Creatinine report required before IV contrast', hi: 'कंट्रास्ट डाई से पहले सीरम क्रिएटिनिन रिपोर्ट आवश्यक' },
      { en: 'Avoid caffeinated beverages 12 hours before test', hi: '12 घंटे पहले कैफीन युक्त पेय न लें' },
    ],
  },
  {
    id: 'path-hba1c-extended',
    code: 'PATH-GLYC-03',
    name: {
      en: 'Glycated Hemoglobin (HbA1c) & Average Blood Glucose',
      hi: 'एचबीए1सी (HbA1c) एवं औसत रक्त शर्करा जांच',
    },
    category: 'pathology',
    tatHours: 2,
    homeSample: true,
    price: 450,
    prepInstructions: [
      { en: 'No fasting required; can be taken any time of the day', hi: 'उपवास की आवश्यकता नहीं; दिन में कभी भी ली जा सकती है' },
    ],
  },
  {
    id: 'path-thyroid-ultra',
    code: 'PATH-THYR-04',
    name: {
      en: 'Ultra-Sensitive TSH & Free T3/T4 Thyroid Panel',
      hi: 'अल्ट्रा-सेंसिटिव टीएसएच एवं फ्री टी3/टी4 थायरॉइड पैनल',
    },
    category: 'pathology',
    tatHours: 3,
    homeSample: true,
    price: 650,
    prepInstructions: [
      { en: 'Morning fasting blood sample recommended before daily thyroid medication', hi: 'सुबह थायरॉइड दवा लेने से पहले खाली पेट सैंपल दें' },
    ],
  },
  {
    id: 'card-holter-24h',
    code: 'CARD-HOLT-05',
    name: {
      en: '24-Hour Continuous Holter ECG Monitor',
      hi: '24-घंटे का होलटर ईसीजी मॉनिटर',
    },
    category: 'cardiac',
    tatHours: 24,
    homeSample: false,
    price: 3200,
    prepInstructions: [
      { en: 'Wear loose-fitting front-buttoned shirt for sensor placement', hi: 'बटन वाली ढीली शर्ट पहनें' },
      { en: 'Do not bathe or submerge monitor box during the 24-hour recording period', hi: '24 घंटे के दौरान नहाने या मॉनिटर को पानी से बचाएं' },
    ],
  },
  {
    id: 'geno-hereditary-panel',
    code: 'GENO-ONCO-06',
    name: {
      en: 'Hereditary Cancer Susceptibility Genomic Panel (BRCA1/2)',
      hi: 'आनुवंशिक कैंसर जोखिम जीनोमिक पैनल (BRCA1/2)',
    },
    category: 'genomics',
    tatHours: 120,
    homeSample: true,
    price: 18500,
    prepInstructions: [
      { en: 'Genetic counseling session required prior to sample submission', hi: 'सैंपल जमा करने से पहले जेनेटिक काउंसलिंग अनिवार्य है' },
      { en: 'Saliva or peripheral blood sample option available', hi: 'लार या ब्लड सैंपल का विकल्प उपलब्ध' },
    ],
  },
];
