import { Report } from '../types';

export const demoReports: Report[] = [
  {
    id: 'report-blood-metabolic',
    title: 'Comprehensive Blood Metabolic & Kidney Panel',
    date: '2026-09-28',
    dept: 'Nephrology & General Medicine',
    patientName: 'Alex Morgan (Patient ID #LAN-8910)',
    values: [
      {
        name: 'Serum Creatinine',
        value: 1.7,
        unit: 'mg/dL',
        refRange: [0.7, 1.2],
        status: 'high',
        plainExp: {
          en: 'Slightly elevated. Creatinine is a natural waste product cleared by kidneys. A higher value means kidneys are working harder to filter waste.',
          hi: 'थोड़ा बढ़ा हुआ। क्रिएटिनिन गुर्दों द्वारा साफ किया जाने वाला अपशिष्ट उत्पाद है। उच्च मान का अर्थ है कि गुर्दे छानने में अधिक मेहनत कर रहे हैं।',
        },
      },
      {
        name: 'Fasting Blood Glucose',
        value: 95,
        unit: 'mg/dL',
        refRange: [70, 99],
        status: 'normal',
        plainExp: {
          en: 'Optimal range. Your overnight fasting sugar level is healthy and balanced.',
          hi: 'उत्कृष्ट दायरा। आपका खाली पेट ब्लड शुगर स्तर संतुलित और सामान्य है।',
        },
      },
      {
        name: 'Blood Urea Nitrogen (BUN)',
        value: 24,
        unit: 'mg/dL',
        refRange: [7, 20],
        status: 'high',
        plainExp: {
          en: 'Mild elevation. Often related to hydration status or high protein intake. Ensure adequate daily water intake.',
          hi: 'हल्की वृद्धि। अक्सर पर्याप्त पानी न पीने या प्रोटीन सेवन से संबंधित होती है। भरपूर पानी पिएं।',
        },
      },
      {
        name: 'Serum Potassium (K+)',
        value: 4.2,
        unit: 'mEq/L',
        refRange: [3.5, 5.0],
        status: 'normal',
        plainExp: {
          en: 'Normal. Essential electrolyte level responsible for steady cardiac rhythm is stable.',
          hi: 'सामान्य। दिल की धड़कन को स्थिर रखने वाला महत्वपूर्ण इलेक्ट्रोलाइट स्तर सामान्य है।',
        },
      },
    ],
    plainNotes: {
      en: 'Overall, your blood sugar is perfectly balanced. Kidney filtration markers (Creatinine and BUN) show mild elevation, which is frequently seen with mild dehydration or recent heavy physical exertion. Drink 2–3 liters of water daily and repeat test in 2 weeks as recommended by your physician.',
      hi: 'कुल मिलाकर आपका ब्लड शुगर पूरी तरह से संतुलित है। किडनी फ़िल्टरिंग मार्कर (क्रिएटिनिन और BUN) में हल्की बढ़त दिखाई देती है, जो डिहाइड्रेशन के कारण हो सकती है। रोजाना 2-3 लीटर पानी पिएं और 2 सप्ताह बाद दोबारा जांच कराएं।',
    },
  },
  {
    id: 'report-lipid-cardiac',
    title: 'Lipid Profile & Coronary Risk Markers',
    date: '2026-09-20',
    dept: 'Cardiology',
    patientName: 'Alex Morgan (Patient ID #LAN-8910)',
    values: [
      {
        name: 'Total Cholesterol',
        value: 215,
        unit: 'mg/dL',
        refRange: [125, 200],
        status: 'high',
        plainExp: {
          en: 'Mildly elevated total circulating blood lipids. Lifestyle adjustments recommended.',
          hi: 'रक्त में कुल कोलेस्ट्रॉल का स्तर थोड़ा बढ़ा हुआ है। आहार में सुधार की सलाह दी जाती है।',
        },
      },
      {
        name: 'HDL (Good Cholesterol)',
        value: 52,
        unit: 'mg/dL',
        refRange: [40, 60],
        status: 'normal',
        plainExp: {
          en: 'Healthy level. Protective cholesterol that cleans arterial walls.',
          hi: 'अच्छा स्तर। सुरक्षात्मक कोलेस्ट्रॉल जो धमनियों की सफाई में मदद करता है।',
        },
      },
      {
        name: 'LDL (Bad Cholesterol)',
        value: 138,
        unit: 'mg/dL',
        refRange: [50, 100],
        status: 'high',
        plainExp: {
          en: 'Elevated. Higher LDL carries cholesterol into arteries. Reduce saturated fat and increase dietary fiber.',
          hi: 'बढ़ा हुआ। उच्च एलडीएल धमनियों में कोलेस्ट्रॉल जमा कर सकता है। फाइबर युक्त भोजन बढ़ाएं।',
        },
      },
    ],
    plainNotes: {
      en: 'Your HDL ("good") cholesterol is strong and protective. Mild LDL elevation suggests dietary modifications (reducing fried foods, increasing oats and green vegetables) will yield positive results.',
      hi: 'आपका एचडीएल ("अच्छा") कोलेस्ट्रॉल काफी मजबूत और सुरक्षात्मक है। एलडीएल में सुधार के लिए तली हुई चीजों से बचें और हरी सब्जियों का सेवन बढ़ाएं।',
    },
  },
];
