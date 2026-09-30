import { JourneyPath } from '../types';

export const journeyPaths: JourneyPath[] = [
  {
    id: 'emergency',
    title: { en: 'Emergency & Trauma Journey', hi: 'आपातकालीन व ट्रॉमा मार्ग' },
    stops: [
      {
        id: 'arrival-triage',
        title: { en: '1. Arrival & Immediate Triage', hi: '1. आगमन व त्वरित ट्राइएज' },
        who: ['Triage Nurse', 'Security Lead'],
        durationRange: { minMin: 2, maxMin: 5 },
        familyCan: [
          { en: 'Provide patient ID or Aadhaar details at front desk', hi: 'रिसेप्शन पर मरीज का आईडी या आधार विवरण दें' },
          { en: 'Wait in quiet primary lounge while triage is performed', hi: 'ट्राइएज होने तक शांत प्राइमरी लाउंज में प्रतीक्षा करें' },
        ],
        bring: ['Government ID', 'Previous health records'],
        ask: [
          { en: 'Which trauma bay has my family member been assigned to?', hi: 'मेरे परिजन को किस ट्रॉमा बे में शिफ्ट किया गया है?' },
        ],
        related: ['emergency', 'trauma-care'],
      },
      {
        id: 'vital-assessment',
        title: { en: '2. Vitals & Medical Stabilization', hi: '2. वाइटल्स व मेडिकल स्थिरता' },
        who: ['Emergency Physician', 'Trauma Care Nurse'],
        durationRange: { minMin: 15, maxMin: 30 },
        familyCan: [
          { en: 'One adult family member can remain by patient side', hi: 'एक वयस्क परिजन मरीज के पास रह सकता है' },
          { en: 'Inform nurse of any known drug allergies or chronic conditions', hi: 'नर्स को दवाओं की एलर्जि या पुरानी बीमारी की जानकारी दें' },
        ],
        bring: ['Current medication list'],
        ask: [
          { en: 'Are vitals stable right now?', hi: 'क्या वाइटल्स इस समय स्थिर हैं?' },
        ],
        related: ['internal-medicine'],
      },
      {
        id: 'emergency-diagnostics',
        title: { en: '3. Urgent Diagnostics & Imaging', hi: '3. त्वरित डायग्नोस्टिक्स व इमेजिंग' },
        who: ['Radiologist', 'Lab Tech'],
        durationRange: { minMin: 30, maxMin: 60 },
        familyCan: [
          { en: 'Track status on Waiting Room Live board', hi: 'वेटिंग रूम लाइव बोर्ड पर स्थिति ट्रैक करें' },
          { en: 'Access tea/coffee station in family lounge', hi: 'फैमिली लाउंज में चाय/कॉफी स्टेशन का उपयोग करें' },
        ],
        bring: ['Insurance card'],
        ask: [
          { en: 'How long until CT scan results are ready?', hi: 'सीटी स्कैन रिपोर्ट तैयार होने में कितना समय लगेगा?' },
        ],
        related: ['imaging-diagnostics'],
      },
      {
        id: 'treatment-plan',
        title: { en: '4. Treatment Decision & Admission', hi: '4. उपचार निर्णय व प्रवेश' },
        who: ['Attending Specialist', 'Admission Coordinator'],
        durationRange: { minMin: 20, maxMin: 40 },
        familyCan: [
          { en: 'Review clear ledger cost estimates with billing advisor', hi: 'बिलिंग सलाहकार के साथ लागत अनुमानों की समीक्षा करें' },
          { en: 'Complete room preference form', hi: 'कमरे की वरीयता फॉर्म पूरा करें' },
        ],
        bring: ['Payment card / Insurance pre-auth form'],
        ask: [
          { en: 'Will inpatient admission or daycare observation be required?', hi: 'क्या इनपेशेंट प्रवेश या डेकेयर अवलोकन की आवश्यकता होगी?' },
        ],
        related: ['clear-ledger'],
      },
    ],
  },
  {
    id: 'surgery',
    title: { en: 'Planned Surgical Admission', hi: 'योजनाबद्ध शल्य चिकित्सा (सर्जरी)' },
    stops: [
      {
        id: 'pre-op-checkin',
        title: { en: '1. Pre-Op Registration & Nursing Check', hi: '1. प्री-ऑप पंजीकरण व नर्स मुआयना' },
        who: ['Pre-Op Nurse', 'Admission Executive'],
        durationRange: { minMin: 20, maxMin: 35 },
        familyCan: [
          { en: 'Help patient hand over personal valuables for safe storage', hi: 'कीमती सामान सुरक्षित जमा कराने में मदद करें' },
          { en: 'Confirm pre-surgery fasting hours', hi: 'सर्जरी पूर्व उपवास के घंटों की पुष्टि करें' },
        ],
        bring: ['Admission slip', 'Pre-op clearance report'],
        ask: [
          { en: 'What time is patient scheduled to enter operating theatre?', hi: 'मरीज का ओटी में जाने का समय क्या है?' },
        ],
        related: ['surgery-dept'],
      },
      {
        id: 'anaesthesia-eval',
        title: { en: '2. Anaesthesia Evaluation', hi: '2. एनेस्थीसिया मूल्यांकन' },
        who: ['Consultant Anaesthetist'],
        durationRange: { minMin: 15, maxMin: 25 },
        familyCan: [
          { en: 'Accompany patient during pre-anaesthesia brief', hi: 'एनेस्थीसिया ब्रीफ के दौरान मरीज के साथ रहें' },
        ],
        bring: ['Allergy history'],
        ask: [
          { en: 'What type of anaesthesia will be administered?', hi: 'किस प्रकार का एनेस्थीसिया दिया जाएगा?' },
        ],
        related: ['anaesthesia'],
      },
      {
        id: 'procedure-time',
        title: { en: '3. Operating Theatre Procedure', hi: '3. ऑपरेशन थियेटर प्रक्रिया' },
        who: ['Lead Surgeon', 'Scrub Nurse'],
        durationRange: { minMin: 60, maxMin: 180 },
        familyCan: [
          { en: 'Track live surgical status via Token L-XXX on Board', hi: 'बोर्ड पर टोकन द्वारा लाइव स्थिति ट्रैक करें' },
        ],
        bring: ['Quiet lounge checklist'],
        ask: [
          { en: 'Will the surgeon speak with us immediately after procedure?', hi: 'क्या डॉक्टर प्रक्रिया के तुरंत बाद हमसे बात करेंगे?' },
        ],
        related: ['surgical-care'],
      },
      {
        id: 'pacu-recovery',
        title: { en: '4. Post-Anaesthesia Recovery (PACU)', hi: '4. रिकवरी कक्ष (PACU)' },
        who: ['PACU Specialist Nurse'],
        durationRange: { minMin: 45, maxMin: 90 },
        familyCan: [
          { en: 'Wait for nurse call when patient wakes up', hi: 'मरीज के होश में आने पर नर्स की कॉल का इंतजार करें' },
        ],
        bring: ['Comfort blanket'],
        ask: [
          { en: 'When can family visit in the recovery ward?', hi: 'परिवार रिकवरी वार्ड में कब मिल सकता है?' },
        ],
        related: ['recovery'],
      },
    ],
  },
  {
    id: 'daycare',
    title: { en: 'Day Care & Minor Procedure', hi: 'डे केयर व छोटी प्रक्रिया' },
    stops: [
      {
        id: 'daycare-arrival',
        title: { en: '1. Day Care Desk Reception', hi: '1. डे केयर डेस्क रिसेप्शन' },
        who: ['Day Care Coordinator'],
        durationRange: { minMin: 10, maxMin: 20 },
        familyCan: [
          { en: 'Confirm discharge timing for same-day departure', hi: 'उसी दिन डिस्चार्ज के समय की पुष्टि करें' },
        ],
        bring: ['Doctor referral note'],
        ask: [
          { en: 'What is the expected total duration of stay today?', hi: 'आज कुल रुकने का अनुमानित समय क्या है?' },
        ],
        related: ['daycare-dept'],
      },
      {
        id: 'daycare-procedure',
        title: { en: '2. Procedure & Short Observation', hi: '2. प्रक्रिया व लघु अवलोकन' },
        who: ['Attending Doctor', 'Staff Nurse'],
        durationRange: { minMin: 30, maxMin: 90 },
        familyCan: [
          { en: 'Wait in Day Care family seating area', hi: 'डे केयर फैमिली वेटिंग एरिया में प्रतीक्षा करें' },
        ],
        bring: ['Comfortable clothing'],
        ask: [
          { en: 'Are post-procedure instructions written down?', hi: 'क्या प्रक्रिया के बाद के निर्देश लिखित में उपलब्ध हैं?' },
        ],
        related: ['minor-ops'],
      },
      {
        id: 'daycare-discharge',
        title: { en: '3. Discharge & Home Care Brief', hi: '3. डिस्चार्ज व गृह देखभाल ब्रीफ' },
        who: ['Discharge Nurse', 'Pharmacist'],
        durationRange: { minMin: 20, maxMin: 30 },
        familyCan: [
          { en: 'Receive prescription & home care sheet', hi: 'प्रिस्क्रिप्शन और होम केयर शीट प्राप्त करें' },
        ],
        bring: ['Transport vehicle ready'],
        ask: [
          { en: 'What emergency signs require calling back?', hi: 'किन आपातकालीन संकेतों पर तुरंत वापस कॉल करना चाहिए?' },
        ],
        related: ['home-care'],
      },
    ],
  },
  {
    id: 'maternity',
    title: { en: 'Maternity & Newborn Care', hi: 'मातृत्व व नवजात देखभाल' },
    stops: [
      {
        id: 'maternity-triage',
        title: { en: '1. Birthing Suite Triage & Assessment', hi: '1. बर्थिंग सुइट ट्राइएज व मूल्यांकन' },
        who: ['Obstetrician', 'Midwife'],
        durationRange: { minMin: 15, maxMin: 30 },
        familyCan: [
          { en: 'Accompany mother to birthing room', hi: 'माता के साथ बर्थिंग रूम में रहें' },
        ],
        bring: ['Mother ID', 'Antenatal file & scans'],
        ask: [
          { en: 'Is birthing partner permitted in the room?', hi: 'क्या बर्थिंग पार्टनर कमरे में रह सकता है?' },
        ],
        related: ['maternity-dept'],
      },
      {
        id: 'delivery-stage',
        title: { en: '2. Delivery & Immediate Newborn Care', hi: '2. प्रसव व नवजात शिशु देखभाल' },
        who: ['Obstetric Team', 'Pediatrician'],
        durationRange: { minMin: 60, maxMin: 240 },
        familyCan: [
          { en: 'Partner supports mother through active delivery', hi: 'पार्टनर सक्रिय प्रसव के दौरान सहायता करे' },
        ],
        bring: ['Baby clothes & wrap'],
        ask: [
          { en: 'Will skin-to-skin contact happen immediately?', hi: 'क्या त्वचा से त्वचा संपर्क तुरंत होगा?' },
        ],
        related: ['pediatrics'],
      },
      {
        id: 'postnatal-ward',
        title: { en: '3. Postnatal Ward & Lactation Brief', hi: '3. प्रसवोत्तर वार्ड व स्तनपान ब्रीफ' },
        who: ['Lactation Consultant', 'Postnatal Nurse'],
        durationRange: { minMin: 24, maxMin: 48 },
        familyCan: [
          { en: 'Assist mother during lactation guidance session', hi: 'स्तनपान मार्गदर्शन सत्र के दौरान माता की सहायता करें' },
        ],
        bring: ['Postnatal essentials'],
        ask: [
          { en: 'When is newborn vaccination scheduled?', hi: 'नवजात शिशु का टीकाकरण कब निर्धारित है?' },
        ],
        related: ['lactation-support'],
      },
    ],
  },
  {
    id: 'outpatient',
    title: { en: 'Outpatient Specialist Visit', hi: 'आउटपेशेंट विशेषज्ञ परामर्श' },
    stops: [
      {
        id: 'opd-checkin',
        title: { en: '1. OPD Desk & Token Confirmation', hi: '1. ओपीडी डेस्क व टोकन पुष्टि' },
        who: ['OPD Executive'],
        durationRange: { minMin: 5, maxMin: 10 },
        familyCan: [
          { en: 'Check token call display outside doctor consultation room', hi: 'डॉक्टर परामर्श कक्ष के बाहर टोकन डिस्प्ले देखें' },
        ],
        bring: ['Appointment booking barcode / SMS'],
        ask: [
          { en: 'How many patients are ahead in line?', hi: 'कतार में आगे कितने मरीज हैं?' },
        ],
        related: ['opd-services'],
      },
      {
        id: 'opd-consultation',
        title: { en: '2. Specialist Consultation & Prescription', hi: '2. विशेषज्ञ परामर्श व प्रिस्क्रिप्शन' },
        who: ['Consultant Physician'],
        durationRange: { minMin: 15, maxMin: 30 },
        familyCan: [
          { en: 'Take notes on prescribed tests and follow-up date', hi: 'अनुशंसित जांच और अगली तारीख के नोट बनाएं' },
        ],
        bring: ['Previous lab test reports'],
        ask: [
          { en: 'When should these tests be performed?', hi: 'ये जांच कब कराई जानी चाहिए?' },
        ],
        related: ['specialist-clinics'],
      },
      {
        id: 'opd-billing-pharmacy',
        title: { en: '3. Pharmacy & Follow-Up Booking', hi: '3. फार्मेसी व फॉलो-अप बुकिंग' },
        who: ['OPD Pharmacist'],
        durationRange: { minMin: 10, maxMin: 20 },
        familyCan: [
          { en: 'Collect medicines with dosage explanation from pharmacist', hi: 'दवाइयां और खुराक का स्पष्टीकरण लें' },
        ],
        bring: ['Doctor prescription'],
        ask: [
          { en: 'Are there dietary instructions with these medicines?', hi: 'क्या इन दवाओं के साथ खान-पान के निर्देश हैं?' },
        ],
        related: ['pharmacy'],
      },
    ],
  },
];
