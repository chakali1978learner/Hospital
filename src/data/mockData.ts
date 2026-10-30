import {
  Patient,
  DrugInteraction,
  HospitalBedCapacity,
  AmbulanceDispatchUnit,
  RadiologyScan,
  SpecialistDoctor
} from '../types';

export const mockPatients: Patient[] = [
  {
    id: 'pt-1',
    uhid: 'AIIMS-DL-2026-9942',
    abhaId: '91-8842-1049-5501',
    name: 'Rameshwar Nath Sharma',
    nameHi: 'रामेश्वर नाथ शर्मा',
    age: 62,
    gender: 'M',
    bedNumber: 'ICU-04 (Cardiac CCU)',
    ward: 'ICU-Cardiac',
    admissionDate: '29 Oct 2026, 14:20 IST',
    admittingDiagnosis: 'Acute Anterolateral STEMI post-Primary PCI (DES to pLAD), Cardiogenic Pre-shock',
    admittingDiagnosisHi: 'तीव्र एंटेरोलेटरल स्टेमी (प्राइमरी पीसीआई स्टेंट पश्चात), कार्डियोजेनिक प्री-शॉक',
    primaryPhysician: 'Dr. Arvind Mukherjee (DM Cardiology)',
    status: 'critical',
    vitals: {
      heartRate: 114,
      spO2: 93,
      bloodPressure: { systolic: 88, diastolic: 54 },
      respRate: 24,
      temperature: 37.2,
      bloodGlucose: 218,
      news2Score: 9,
      gcsScore: 14
    },
    ecgRhythm: 'ST Elevation Anterolateral',
    troponinLevel: 8.4,
    lactateLevel: 3.2,
    allergies: ['Penicillin', 'Sulfa drugs'],
    activePrescriptions: [
      {
        id: 'rx-1',
        medicine: 'Noradrenaline Infusion',
        medicineHi: 'नोराड्रेनालाईन इन्फ्यूजन',
        dosage: '0.08 mcg/kg/min',
        frequency: 'Continuous IV Titrated',
        route: 'Central Line',
        type: 'allopathy',
        indication: 'Target MAP > 65 mmHg'
      },
      {
        id: 'rx-2',
        medicine: 'Ticagrelor',
        medicineHi: 'टिकाग्रेलर',
        dosage: '90 mg',
        frequency: '1 tab BD (Twice daily)',
        route: 'Oral / Ryle tube',
        type: 'allopathy',
        indication: 'Post-DES Dual Antiplatelet'
      },
      {
        id: 'rx-3',
        medicine: 'Aspirin (Enteric Coated)',
        medicineHi: 'एस्पिरिन',
        dosage: '75 mg',
        frequency: '1 tab OD',
        route: 'Oral',
        type: 'allopathy',
        indication: 'Antiplatelet therapy'
      },
      {
        id: 'rx-4',
        medicine: 'Arjuna Kwath (Terminalia arjuna extract)',
        medicineHi: 'अर्जुन क्वाथ',
        dosage: '20 ml',
        frequency: 'Twice daily with warm water',
        route: 'Oral',
        type: 'ayush',
        indication: 'Myocardial tonic & endothelial stabilization'
      }
    ],
    alerts: [
      {
        id: 'al-1',
        title: 'Hemodynamic Instability: MAP < 65 mmHg',
        titleHi: 'हेमोडायनामिक अस्थिरता: एमएपी < 65 mmHg',
        severity: 'critical',
        message: 'Current MAP is 65 mmHg on Noradrenaline 0.08 mcg/kg/min. Serum Lactate elevated at 3.2 mmol/L indicating hypoperfusion.',
        messageHi: 'वर्तमान एमएपी 65 mmHg है। लैक्टेट 3.2 mmol/L तक बढ़ा है जो हाइपोपरफ्यूजन का संकेत देता है।',
        suggestedAction: 'Titrate Noradrenaline to 0.12 mcg/kg/min; Evaluate IV fluid responsiveness via bedside IVC ultrasound.',
        suggestedActionHi: 'नोराड्रेनालाईन को 0.12 mcg/kg/min पर टिट्रेट करें; बेडसाइड IVC अल्ट्रासाउंड से तरल प्रतिक्रियाशीलता जांचें।',
        timestamp: '4 mins ago',
        category: 'cardiac'
      },
      {
        id: 'al-2',
        title: 'NEWS-2 High Risk Deterioration Forecast',
        titleHi: 'NEWS-2 उच्च जोखिम बिगड़ने का पूर्वानुमान',
        severity: 'warning',
        message: 'Algorithmic model predicts 74% likelihood of escalation to mechanical ventilation within 6 hours if Tachypnea persists.',
        messageHi: 'एल्गोरिथम मॉडल भविष्यवाणी करता है कि यदि तचीपनिया जारी रहा तो 6 घंटे में वेंटिलेशन की 74% संभावना है।',
        suggestedAction: 'Initiate High-Flow Nasal Cannula (HFNC) at 40 L/min, FiO2 45%.',
        suggestedActionHi: '40 L/min और FiO2 45% पर हाई-फ्लो नेज़ल कैनुला (HFNC) शुरू करें।',
        timestamp: '12 mins ago',
        category: 'respiratory'
      }
    ]
  },
  {
    id: 'pt-2',
    uhid: 'SAFD-DL-2026-3810',
    abhaId: '91-3419-7721-9032',
    name: 'Sunita Devi',
    nameHi: 'सुनीता देवी',
    age: 48,
    gender: 'F',
    bedNumber: 'ER-Triage Bed 02',
    ward: 'Emergency Triage',
    admissionDate: '29 Oct 2026, 17:45 IST',
    admittingDiagnosis: 'Diabetic Ketoacidosis (DKA) with Ketotic Breath, Urinary Tract Sepsis, Severe Dehydration',
    admittingDiagnosisHi: 'डायबिटिक कीटोएसिडोसिस (डीकेए), मूत्र संक्रमण सेप्सिस और गंभीर निर्जलीकरण',
    primaryPhysician: 'Dr. Sunita Kulkarni (Internal Medicine & ER)',
    status: 'urgent',
    vitals: {
      heartRate: 106,
      spO2: 97,
      bloodPressure: { systolic: 104, diastolic: 66 },
      respRate: 28,
      temperature: 38.3,
      bloodGlucose: 412,
      news2Score: 7,
      gcsScore: 13
    },
    ecgRhythm: 'Sinus Tachycardia',
    troponinLevel: 0.02,
    lactateLevel: 2.8,
    allergies: ['Ciprofloxacin'],
    activePrescriptions: [
      {
        id: 'rx-5',
        medicine: 'Regular Insulin IV Infusion',
        medicineHi: 'रेगुलर इंसुलिन आईवी',
        dosage: '0.1 units/kg/hr (6 units/hr)',
        frequency: 'Continuous Infusion with hourly blood sugar check',
        route: 'Intravenous',
        type: 'allopathy',
        indication: 'Glycemic and ketosis correction'
      },
      {
        id: 'rx-6',
        medicine: '0.9% Normal Saline',
        medicineHi: '0.9% सामान्य सेलाइन',
        dosage: '1000 ml over 1 hour',
        frequency: 'Stat IV',
        route: 'Intravenous',
        type: 'allopathy',
        indication: 'Intravascular volume repletion'
      },
      {
        id: 'rx-7',
        medicine: 'Giloy Ghan Vati (Tinospora cordifolia)',
        medicineHi: 'गिलोय घन वटी',
        dosage: '500 mg',
        frequency: '1 tab BD self-administered',
        route: 'Oral (Home Med)',
        type: 'ayush',
        indication: 'Traditional antipyretic / immunomodulator'
      }
    ],
    alerts: [
      {
        id: 'al-3',
        title: 'Drug-Herb Interaction Alert: Metformin + Giloy',
        titleHi: 'दवा-जड़ी बूटी अंतःक्रिया चेतावनी: मेटफॉर्मिन + गिलोय',
        severity: 'warning',
        message: 'Patient took Ayurvedic Giloy along with high-dose Metformin at home. Potential for profound synergistic hypoglycemia and lactic acid accumulation.',
        messageHi: 'मरीज ने घर पर मेटफॉर्मिन के साथ गिलोय लिया। अनियंत्रित हाइपोग्लाइसीमिया और लैक्टिक एसिड संचय का जोखिम।',
        suggestedAction: 'Hold home Ayurvedic formulations; monitor venous blood gas (VBG) every 2 hours until anion gap closes.',
        suggestedActionHi: 'घरेलू आयुर्वेदिक दवाएं रोकें; अनियन गैप सामान्य होने तक हर 2 घंटे में वीबीजी जांचें।',
        timestamp: '18 mins ago',
        category: 'medication'
      }
    ]
  },
  {
    id: 'pt-3',
    uhid: 'MAX-SKT-2026-7714',
    abhaId: '91-6632-4411-2290',
    name: 'Rajesh K. Patel',
    nameHi: 'राजेश के. पटेल',
    age: 36,
    gender: 'M',
    bedNumber: 'HDU-Bed 06',
    ward: 'Step-Down HDU',
    admissionDate: '27 Oct 2026, 09:10 IST',
    admittingDiagnosis: 'Resolving Acute Interstitial Edematous Pancreatitis, Post-laparoscopic Cholecystectomy',
    admittingDiagnosisHi: 'सुधरता हुआ तीव्र अग्नाशयशोथ (पैंक्रियाटाइटिस), पित्ताशय सर्जरी पश्चात',
    primaryPhysician: 'Dr. Priya Venkatraman (Gastroenterology)',
    status: 'stable',
    vitals: {
      heartRate: 74,
      spO2: 99,
      bloodPressure: { systolic: 122, diastolic: 76 },
      respRate: 16,
      temperature: 36.8,
      bloodGlucose: 114,
      news2Score: 0,
      gcsScore: 15
    },
    ecgRhythm: 'Normal Sinus Rhythm',
    allergies: [],
    activePrescriptions: [
      {
        id: 'rx-8',
        medicine: 'Pantoprazole',
        medicineHi: 'पेंटोप्राजोल',
        dosage: '40 mg',
        frequency: '1 tab OD before breakfast',
        route: 'Oral',
        type: 'allopathy',
        indication: 'Proton Pump Inhibitor for mucosal protection'
      },
      {
        id: 'rx-9',
        medicine: 'Tramadol (SOS)',
        medicineHi: 'ट्रामाडोल',
        dosage: '50 mg',
        frequency: 'SOS for severe abdominal pain',
        route: 'Intravenous',
        type: 'allopathy',
        indication: 'Post-op analgesia'
      }
    ],
    alerts: []
  },
  {
    id: 'pt-4',
    uhid: 'APOL-DEL-2026-5519',
    abhaId: '91-1120-9944-8831',
    name: 'Ananya Iyer',
    nameHi: 'अनन्या अय्यर',
    age: 29,
    gender: 'F',
    bedNumber: 'ICU-Bed 08',
    ward: 'ICU-Surgical',
    admissionDate: '29 Oct 2026, 11:30 IST',
    admittingDiagnosis: 'Severe Acute Bronchial Asthma Exacerbation with Pulsus Paradoxus, Type 1 Respiratory Stress',
    admittingDiagnosisHi: 'गंभीर तीव्र अस्थमा दौरा, पल्सस पैराडॉक्सस, श्वसन तनाव',
    primaryPhysician: 'Dr. Priya Venkatraman (Pulmonology)',
    status: 'urgent',
    vitals: {
      heartRate: 98,
      spO2: 94,
      bloodPressure: { systolic: 124, diastolic: 82 },
      respRate: 23,
      temperature: 37.0,
      bloodGlucose: 128,
      news2Score: 4,
      gcsScore: 15
    },
    ecgRhythm: 'Sinus Tachycardia',
    allergies: ['NSAIDs', 'Aspirin (Samter Triad)'],
    activePrescriptions: [
      {
        id: 'rx-10',
        medicine: 'Nebulized Levosalbutamol + Ipratropium',
        medicineHi: 'नेबुलाइज्ड लेवोसाल्बुटामोल + इप्राट्रोपियम',
        dosage: '1.25 mg / 500 mcg',
        frequency: 'Q4H nebulization',
        route: 'Inhalation',
        type: 'allopathy',
        indication: 'Bronchodilatation'
      },
      {
        id: 'rx-11',
        medicine: 'Hydrocortisone IV',
        medicineHi: 'हाइड्रोकार्टिसोन आईवी',
        dosage: '100 mg',
        frequency: 'TDS (Every 8 hours)',
        route: 'Intravenous',
        type: 'allopathy',
        indication: 'Systemic airway anti-inflammatory'
      },
      {
        id: 'rx-12',
        medicine: 'Vasavaleha (Adhatoda vasica jam)',
        medicineHi: 'वासावलेह',
        dosage: '5 grams',
        frequency: 'BD with honey and warm water',
        route: 'Oral',
        type: 'ayush',
        indication: 'Bronchodilatory expectorant'
      }
    ],
    alerts: [
      {
        id: 'al-4',
        title: 'Samter Triad Alert: Aspirin & NSAIDs Contraindicated',
        titleHi: 'सैम्प्टर ट्रायड चेतावनी: एस्पिरिन और दर्द निवारक वर्जित',
        severity: 'critical',
        message: 'Patient has Aspirin-Exacerbated Respiratory Disease (AERD). Avoid all Cox-1 inhibitors.',
        messageHi: 'मरीज को एस्पिरिन से अस्थमा बिगड़ने की समस्या है। सभी कॉक्स-1 पेनकिलर वर्जित हैं।',
        suggestedAction: 'Ensure allergy band secured; use Paracetamol strictly up to 650mg if analgesic required.',
        suggestedActionHi: 'एलर्जी बैंड सुनिश्चित करें; दर्द के लिए केवल पैरासिटामोल 650mg तक ही दें।',
        timestamp: '1 hour ago',
        category: 'medication'
      }
    ]
  }
];

export const mockDrugInteractions: DrugInteraction[] = [
  {
    id: 'int-1',
    drugA: 'Ramipril (ACE Inhibitor)',
    drugB: 'Spironolactone (Potassium-Sparing Diuretic)',
    type: 'allopathy-allopathy',
    severity: 'major',
    title: 'Severe Synergistic Hyperkalemia Risk',
    titleHi: 'गंभीर हाइपरकेलेमिया (पोटेशियम वृद्धि) का जोखिम',
    mechanism: 'Both agents inhibit aldosterone production or mineralocorticoid receptors, impairing renal potassium excretion, which can precipitate fatal cardiac arrhythmias.',
    mechanismHi: 'दोनों दवाएं एल्डोस्टेरोन को रोकती हैं, जिससे गुर्दे से पोटेशियम का उत्सर्जन कम हो जाता है और हृदय गति अनियमित होने का खतरा रहता है।',
    clinicalAction: 'Strict serum electrolyte (K+) checks at 48 hours and 7 days. Maintain K+ < 5.2 mEq/L. Dose reduce or withhold if eGFR < 30 mL/min.',
    clinicalActionHi: '48 घंटे और 7 दिनों में सीरम पोटेशियम की जांच करें। K+ को 5.2 mEq/L से कम रखें।'
  },
  {
    id: 'int-2',
    drugA: 'Metformin (Biguanide)',
    drugB: 'Giloy / Guduchi (Tinospora Cordifolia)',
    type: 'allopathy-ayush',
    severity: 'moderate',
    title: 'Synergistic Hypoglycemia & Glycemic Lability',
    titleHi: 'तीव्र हाइपोग्लाइसीमिया (शुगर अत्यधिक गिरना)',
    mechanism: 'Giloy enhances peripheral glucose utilization and stimulates insulin secretion, synergizing with Metformin to trigger abrupt, unmonitored nocturnal hypoglycemia.',
    mechanismHi: 'गिलोय शरीर में इंसुलिन संवेदनशीलता बढ़ाती है, जिससे मेटफॉर्मिन के साथ मिलकर ब्लड शुगर अचानक खतरनाक रूप से गिर सकता है।',
    clinicalAction: 'Intensify continuous blood glucose monitoring (CBGM). Dose-adjust Metformin or administer Giloy under certified integrative supervision only.',
    clinicalActionHi: 'ब्लड शुगर की नियमित जांच करें। मेटफॉर्मिन की खुराक समायोजित करें।'
  },
  {
    id: 'int-3',
    drugA: 'Warfarin (Vitamin K Antagonist)',
    drugB: 'Ashwagandha (Withania Somnifera)',
    type: 'allopathy-ayush',
    severity: 'major',
    title: 'Potentiation of Anticoagulant Effect (INR Spike & Hemorrhage)',
    titleHi: 'रक्त पतला करने वाली दवा का प्रभाव बढ़ना (रक्तस्राव का जोखिम)',
    mechanism: 'Withanolides may competitively inhibit hepatic CYP2C9 metabolic clearance of S-warfarin, escalating free plasma Warfarin and causing uncontrollable spontaneous hematomas.',
    mechanismHi: 'अश्वगंधा यकृत में वारफेरिन के मेटाबॉलिज्म को धीमा करता है, जिससे रक्त बहुत अधिक पतला हो सकता है और अंदरूनी ब्लीडिंग हो सकती है।',
    clinicalAction: 'Check baseline Prothrombin Time / INR immediately. Hold Ashwagandha if target INR is between 2.0 - 3.0.',
    clinicalActionHi: 'तुरंत पीटी/आईएनआर (INR) जांचें। यदि आईएनआर बढ़ रहा हो तो अश्वगंधा बंद करें।'
  },
  {
    id: 'int-4',
    drugA: 'Clopidogrel (Antiplatelet)',
    drugB: 'Omeprazole (Proton Pump Inhibitor)',
    type: 'allopathy-allopathy',
    severity: 'major',
    title: 'Diminished Antiplatelet Bioactivation (Stent Thrombosis Risk)',
    titleHi: 'स्टेंट थ्रोम्बोसिस (क्लॉट) का खतरा',
    mechanism: 'Omeprazole irreversibly inhibits hepatic CYP2C19, the primary enzyme required to transform Clopidogrel prodrug into its active thiol metabolite, reducing platelet inhibition.',
    mechanismHi: 'ओमेप्राजोल क्लोपिडोग्रेल को सक्रिय रूप में बदलने से रोकता है, जिससे दिल में स्टेंट ब्लॉक होने का खतरा बढ़ जाता है।',
    clinicalAction: 'Switch Omeprazole to Pantoprazole or Rabeprazole, which exhibit negligible CYP2C19 inhibitory affinity.',
    clinicalActionHi: 'ओमेप्राजोल की जगह पेंटोप्राजोल या रैबेप्राजोल का उपयोग करें।'
  },
  {
    id: 'int-5',
    drugA: 'Ciprofloxacin (Fluoroquinolone)',
    drugB: 'Triphala Churna (Ayurvedic Herbal Blend)',
    type: 'allopathy-ayush',
    severity: 'moderate',
    title: 'Multivalent Cation Chelation & Reduced Bioavailability',
    titleHi: 'एंटीबायोटिक का असर कम होना (अवशोषण में बाधा)',
    mechanism: 'The high tannin and divalent cation content (iron, magnesium) in Amla, Haritaki, and Bibhitaki forms insoluble chelates with Ciprofloxacin in the gut lumen.',
    mechanismHi: 'त्रिफला में मौजूद खनिज तत्व सिप्रोफ्लोक्सासिन एंटीबायोटिक को बांध लेते हैं जिससे दवा शरीर में अवशोषित नहीं हो पाती।',
    clinicalAction: 'Separate intake times by at least 3 to 4 hours between Ciprofloxacin and Triphala.',
    clinicalActionHi: 'सिप्रोफ्लोक्सासिन और त्रिफला के सेवन में कम से कम 3 से 4 घंटे का अंतर रखें।'
  }
];

export const mockHospitals: HospitalBedCapacity[] = [
  {
    id: 'hosp-1',
    hospitalName: 'AIIMS Apex Trauma Centre & Hospital',
    hospitalNameHi: 'एम्स एपेक्स ट्रॉमा सेंटर एवं अस्पताल',
    network: 'AIIMS Central',
    city: 'New Delhi (Ring Road)',
    totalBeds: 1250,
    icuTotal: 84,
    icuAvailable: 12,
    ventilatorAvailable: 7,
    oxygenReserveDays: 14.2,
    emergencyWaitMinutes: 0,
    traumaLevel: 'Level 1 Apex',
    traumaLevelHi: 'स्तर 1 सर्वोच्च ट्रॉमा',
    distanceKm: 4.2,
    ambulanceHelipad: true,
    phone: '+91-11-26588500',
    ayushmanEmpaneled: true
  },
  {
    id: 'hosp-2',
    hospitalName: 'Safdarjung Hospital & VMMC',
    hospitalNameHi: 'सफदरजंग अस्पताल एवं वीएमएमसी',
    network: 'Central Govt',
    city: 'New Delhi (Ansari Nagar)',
    totalBeds: 2800,
    icuTotal: 120,
    icuAvailable: 9,
    ventilatorAvailable: 4,
    oxygenReserveDays: 11.5,
    emergencyWaitMinutes: 15,
    traumaLevel: 'Level 1 Apex',
    traumaLevelHi: 'स्तर 1 सर्वोच्च ट्रॉमा',
    distanceKm: 4.8,
    ambulanceHelipad: false,
    phone: '+91-11-26707444',
    ayushmanEmpaneled: true
  },
  {
    id: 'hosp-3',
    hospitalName: 'Apollo Hospitals Indraprastha',
    hospitalNameHi: 'इंद्रप्रस्थ अपोलो अस्पताल',
    network: 'Apollo Healthcare',
    city: 'Sarita Vihar, Mathura Road, Delhi',
    totalBeds: 710,
    icuTotal: 65,
    icuAvailable: 19,
    ventilatorAvailable: 11,
    oxygenReserveDays: 20.0,
    emergencyWaitMinutes: 5,
    traumaLevel: 'Level 1 Apex',
    traumaLevelHi: 'स्तर 1 ट्रॉमा',
    distanceKm: 9.6,
    ambulanceHelipad: true,
    phone: '+91-11-26925858',
    ayushmanEmpaneled: true
  },
  {
    id: 'hosp-4',
    hospitalName: 'Fortis Escorts Heart Institute',
    hospitalNameHi: 'फोर्टिस एस्कॉर्ट्स हार्ट इंस्टीट्यूट',
    network: 'Fortis Health',
    city: 'Okhla Road, New Delhi',
    totalBeds: 310,
    icuTotal: 48,
    icuAvailable: 14,
    ventilatorAvailable: 8,
    oxygenReserveDays: 18.0,
    emergencyWaitMinutes: 4,
    traumaLevel: 'Level 2',
    traumaLevelHi: 'कार्डियक इमरजेंसी सेंटर',
    distanceKm: 8.1,
    ambulanceHelipad: false,
    phone: '+91-11-47135000',
    ayushmanEmpaneled: true
  },
  {
    id: 'hosp-5',
    hospitalName: 'Max Super Speciality Hospital Saket',
    hospitalNameHi: 'मैक्स सुपर स्पेशियलिटी अस्पताल साकेत',
    network: 'Max Healthcare',
    city: 'Press Enclave Road, Saket, New Delhi',
    totalBeds: 530,
    icuTotal: 52,
    icuAvailable: 11,
    ventilatorAvailable: 6,
    oxygenReserveDays: 16.5,
    emergencyWaitMinutes: 8,
    traumaLevel: 'Level 1 Apex',
    traumaLevelHi: 'स्तर 1 ट्रॉमा',
    distanceKm: 6.7,
    ambulanceHelipad: true,
    phone: '+91-11-26515050',
    ayushmanEmpaneled: true
  }
];

export const mockAmbulances: AmbulanceDispatchUnit[] = [
  {
    id: 'amb-1',
    callSign: '108-ALS-DEL-04',
    vehicleNumber: 'DL 1P B 4982',
    type: 'Advanced Life Support (ALS)',
    status: 'patient_transit',
    driverName: 'Sanjay Yadav',
    paramedicLead: 'Sister Preeti Thomas (Critical Care EMT)',
    patientName: 'Devendra Mehra (54M, RTA Head Trauma)',
    triageCategory: 'Red (Critical Trauma)',
    etaMinutes: 6,
    assignedHospital: 'Safdarjung Hospital & VMMC',
    liveVitals: {
      hr: 118,
      spo2: 91,
      bp: '86/52',
      ecg: 'Sinus Tachycardia with VPCs'
    },
    locationName: 'AIIMS Flyover southbound corridor',
    coordinates: { lat: 28.5672, lng: 77.2100 }
  },
  {
    id: 'amb-2',
    callSign: '108-ALS-DEL-19',
    vehicleNumber: 'DL 1G C 1042',
    type: 'Advanced Life Support (ALS)',
    status: 'responding_scene',
    driverName: 'Vikram Singh',
    paramedicLead: 'EMT Sandeep Rawat',
    patientName: 'Emergency SOS Call (Chest Pain & Diaphoresis)',
    triageCategory: 'Red (Critical Trauma)',
    etaMinutes: 4,
    assignedHospital: 'Apollo Hospitals Indraprastha',
    liveVitals: {
      hr: 94,
      spo2: 96,
      bp: '142/92',
      ecg: 'Normal Sinus Rhythm'
    },
    locationName: 'Lajpat Nagar IV Junction',
    coordinates: { lat: 28.5700, lng: 77.2400 }
  },
  {
    id: 'amb-3',
    callSign: '108-BLS-NCR-08',
    vehicleNumber: 'UP 16 AT 7731',
    type: 'Basic Life Support (BLS)',
    status: 'standby',
    driverName: 'Mohd. Imran',
    paramedicLead: 'EMT Pooja Sharma',
    triageCategory: 'Green (Delayed)',
    etaMinutes: 0,
    assignedHospital: 'AIIMS Apex Trauma Centre',
    liveVitals: {
      hr: 72,
      spo2: 99,
      bp: '120/80',
      ecg: 'Standby'
    },
    locationName: 'Base Station: Dhaula Kuan Hub',
    coordinates: { lat: 28.5921, lng: 77.1610 }
  }
];

export const mockRadiologyScans: RadiologyScan[] = [
  {
    id: 'rad-1',
    title: 'PA Chest Radiograph: Dense Right Lower Lobe Consolidation',
    titleHi: 'छाती का एक्स-रे: दाएँ फेफड़े में कन्सोलिडेशन (संक्रमण)',
    patientName: 'Rameshwar Nath Sharma',
    patientUhid: 'AIIMS-DL-2026-9942',
    date: '29 Oct 2026, 15:30 IST',
    modality: 'Chest Radiograph (PA)',
    sampleType: 'xray',
    findings: [
      {
        condition: 'Alveolar Consolidation with Air Bronchograms',
        conditionHi: 'वायुमार्ग ब्रोन्कोग्राम के साथ एल्वियोलर कन्सोलिडेशन',
        confidence: 96.4,
        severity: 'critical',
        location: 'Right Lower Lobe (RLL)',
        bbox: { x: 55, y: 52, w: 28, h: 32 }
      },
      {
        condition: 'Mild Left Costophrenic Angle Blunting (Reactive Effusion)',
        conditionHi: 'बाएं फुफ्फुस में हल्का तरल संचय',
        confidence: 84.1,
        severity: 'moderate',
        location: 'Left Costophrenic Sulcus',
        bbox: { x: 18, y: 72, w: 16, h: 18 }
      },
      {
        condition: 'Cardiomegaly (Cardiothoracic Ratio 0.58)',
        conditionHi: 'हृदय का आकार बढ़ना',
        confidence: 91.0,
        severity: 'moderate',
        location: 'Cardiac Silhouette',
        bbox: { x: 34, y: 46, w: 34, h: 36 }
      }
    ],
    ntepStatus: {
      tbSuspicion: 'Moderate',
      ntepRefCode: 'NTEP-DL-AIIMS-8840'
    },
    radiologistNote: 'AI-assisted detection confirms acute bacterial or aspiration pneumonia superimposed on cardiogenic pulmonary venous congestion. Sputum Gram stain & culture advised.',
    aiDifferential: [
      'Community-Acquired Lobar Pneumonia (Streptococcus pneumoniae) - 88%',
      'Post-PCI Cardiogenic Pulmonary Congestion - 64%',
      'Pulmonary Infarction / Secondary Thromboembolism - 18%'
    ]
  },
  {
    id: 'rad-2',
    title: '12-Lead Diagnostic ECG: Anterolateral ST-Elevation Infarction',
    titleHi: '12-लीड ईसीजी: एंटेरोलेटरल हार्ट अटैक (एसटी एलिवेशन)',
    patientName: 'Rameshwar Nath Sharma',
    patientUhid: 'AIIMS-DL-2026-9942',
    date: '29 Oct 2026, 14:15 IST',
    modality: '12-Lead Digital ECG',
    sampleType: 'ecg',
    findings: [
      {
        condition: 'ST Elevation > 2.5 mm in Leads V2-V5 (Tombstoning Pattern)',
        conditionHi: 'लीड V2-V5 में गंभीर एसटी एलिवेशन',
        confidence: 99.2,
        severity: 'critical',
        location: 'Anterior & Lateral Septum',
        bbox: { x: 30, y: 25, w: 45, h: 40 }
      },
      {
        condition: 'Reciprocal ST Depression in Inferior Leads (II, III, aVF)',
        conditionHi: 'इनफीरियर लीड में रेसिप्रोकल एसटी डिप्रेशन',
        confidence: 97.5,
        severity: 'critical',
        location: 'Inferior Wall Leads',
        bbox: { x: 10, y: 65, w: 40, h: 25 }
      }
    ],
    radiologistNote: 'Algorithmic telemetry triggered immediate catheterization lab activation. Primary lesion identified at proximal LAD (100% thrombotic occlusion).',
    aiDifferential: [
      'Proximal Left Anterior Descending Artery Occlusion (LAD) - 99%',
      'Left Main Coronary Equivalent - 42%'
    ]
  }
];

export const mockDoctors: SpecialistDoctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Arvind Mukherjee',
    nameHi: 'डॉ. अरविंद मुखर्जी',
    specialty: 'Cardiology & Interventional CCU',
    specialtyHi: 'हृदय रोग एवं इंटरवेंशनल सीसीयू',
    degrees: 'MBBS, MD (Medicine), DM (Cardiology - AIIMS New Delhi)',
    hospital: 'AIIMS Apex Cardiac Centre',
    experienceYears: 24,
    rating: 4.95,
    consultationFee: 800,
    nextAvailable: 'Today, 18:00 IST',
    languages: ['Hindi', 'English', 'Bengali'],
    opdType: 'Both',
    pmjayAccepted: true,
    photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'doc-2',
    name: 'Dr. Priya Venkatraman',
    nameHi: 'डॉ. प्रिया वेंकटरमन',
    specialty: 'Pulmonology & Critical Care Medicine',
    specialtyHi: 'श्वसन रोग एवं क्रिटिकल केयर विशेषज्ञ',
    degrees: 'MBBS, MD (Pulmonary Medicine), FCCN, FCCP (USA)',
    hospital: 'Apollo Hospitals Indraprastha',
    experienceYears: 18,
    rating: 4.91,
    consultationFee: 1000,
    nextAvailable: 'Tomorrow, 10:30 IST',
    languages: ['Hindi', 'English', 'Tamil'],
    opdType: 'Both',
    pmjayAccepted: true,
    photoUrl: 'https://images.unsplash.com/photo-1594824813576-47b864a781d4?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'doc-3',
    name: 'Dr. Harish Chandra Sharma',
    nameHi: 'डॉ. हरीश चंद्र शर्मा',
    specialty: 'AYUSH Integrative Medicine & Kayachikitsa',
    specialtyHi: 'आयुष एकीकृत चिकित्सा एवं कायचिकित्सा',
    degrees: 'BAMS (BHU), MD (Ayurveda), PhD (Integrative Pharmacognosy)',
    hospital: 'All India Institute of Ayurveda (AIIA)',
    experienceYears: 21,
    rating: 4.88,
    consultationFee: 500,
    nextAvailable: 'Today, 19:15 IST',
    languages: ['Hindi', 'English', 'Sanskrit'],
    opdType: 'Tele-Consult Video',
    pmjayAccepted: true,
    photoUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'doc-4',
    name: 'Dr. Sunita Kulkarni',
    nameHi: 'डॉ. सुनीता कुलकर्णी',
    specialty: 'Trauma Surgery & Emergency Resuscitation',
    specialtyHi: 'ट्रॉमा सर्जरी एवं आपातकालीन रिससिटेशन',
    degrees: 'MBBS, MS (General Surgery), MCh (Trauma Surgery)',
    hospital: 'Safdarjung Hospital Emergency Apex',
    experienceYears: 16,
    rating: 4.93,
    consultationFee: 600,
    nextAvailable: 'Tomorrow, 09:00 IST',
    languages: ['Hindi', 'English', 'Marathi'],
    opdType: 'In-Hospital OPD',
    pmjayAccepted: true,
    photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80'
  }
];

export const sampleClinicalDictations = [
  {
    title: 'Hindi Telemetry Dictation (कार्डियक समीक्षा)',
    audioText: 'मरीज रामेश्वर शर्मा, उम्र 62 वर्ष, बेड नंबर आईसीयू 04। पोस्ट-पीसीआई एंटेरोलेटरल स्टेमी। वर्तमान ब्लड प्रेशर 88/54 है, नॉराड्रेनालाइन इन्फ्यूजन 0.08 mcg/kg/min पर चल रहा है। सीरम लैक्टेट 3.2 mmol/L है। ईसीजी में अभी भी वी2 से वी4 तक एसटी एलिवेशन बना हुआ है। मरीज को छाती में हल्का भारीपन महसूस हो रहा है। नॉराड्रेनालाइन को 0.12 mcg तक बढ़ाएं और 200 मिलीग्राम सेलाइन तुरंत दें।',
    parsedSoap: {
      subjective: '62-year-old male post-PCI for Anterolateral STEMI reports persistent mild retrosternal chest heaviness.',
      objective: 'BP 88/54 mmHg, HR 114 bpm, SpO2 93% on 4L O2. ECG shows persistent ST elevations in V2-V5. Serum Lactate 3.2 mmol/L.',
      assessment: 'Cardiogenic pre-shock post-STEMI with persistent microvascular hypoperfusion.',
      plan: '1. Up-titrate Noradrenaline to 0.12 mcg/kg/min. 2. Stat 200 mL IV Normal Saline bolus over 15 mins. 3. Repeat ECG and Troponin I in 2 hours.'
    },
    icd10: ['I21.0 - Acute transmural myocardial infarction of anterior wall', 'R57.0 - Cardiogenic shock'],
    snomed: ['22298006 - Myocardial infarction', '89138009 - Cardiogenic shock']
  },
  {
    title: 'English Clinical Ward Round Dictation',
    audioText: 'Patient Sunita Devi, 48-year-old female, bed ER-02. Admitted with Diabetic Ketoacidosis. Capillary blood glucose 412 mg/dL with severe tachypnea and Kussmaul respirations. Urine dipstick 3+ ketones. Potassium 4.8 mEq/L. Stop oral metformin and home Giloy immediately. Continue IV Regular Insulin at 6 units per hour and complete first liter of 0.9% saline.',
    parsedSoap: {
      subjective: '48F presents with 3 days of polyuria, polydipsia, vomiting, and progressive lethargy. History of T2D.',
      objective: 'Glucose 412 mg/dL, RR 28/min, HR 106 bpm. Severe dehydration, Kussmaul respiration. Urine ketones 3+.',
      assessment: 'Uncontrolled Diabetic Ketoacidosis triggered by UTI with high risk of lactic acidosis due to concomitant Metformin and herbal intake.',
      plan: '1. Withhold all oral hypoglycemics and Ayurvedic home medicines. 2. Regular insulin infusion 0.1 U/kg/hr. 3. Hourly blood glucose and VBG monitoring.'
    },
    icd10: ['E11.10 - Type 2 diabetes with ketoacidosis without coma', 'N39.0 - Urinary tract infection'],
    snomed: ['420422005 - Diabetic ketoacidosis', '68566005 - Urinary tract infection']
  }
];
