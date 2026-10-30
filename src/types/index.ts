export type LanguageMode = 'en' | 'hi' | 'dual';

export interface VitalsData {
  heartRate: number; // bpm
  spO2: number; // %
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  respRate: number; // breaths/min
  temperature: number; // °C
  bloodGlucose: number; // mg/dL
  news2Score: number; // National Early Warning Score 2 (0-20)
  gcsScore: number; // Glasgow Coma Scale (3-15)
}

export interface PrescriptionItem {
  id: string;
  medicine: string;
  medicineHi: string;
  dosage: string;
  frequency: string;
  route: string;
  type: 'allopathy' | 'ayush';
  indication: string;
}

export interface AIClinicalAlert {
  id: string;
  title: string;
  titleHi: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  messageHi: string;
  suggestedAction: string;
  suggestedActionHi: string;
  timestamp: string;
  category: 'cardiac' | 'respiratory' | 'sepsis' | 'medication' | 'lab';
}

export interface Patient {
  id: string;
  uhid: string; // Unique Health ID (e.g., AIIMS-2026-9942)
  abhaId: string; // Ayushman Bharat Health Account ID
  name: string;
  nameHi: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  bedNumber: string;
  ward: 'ICU-Cardiac' | 'ICU-Surgical' | 'Emergency Triage' | 'Step-Down HDU' | 'Day Care OPD';
  admissionDate: string;
  admittingDiagnosis: string;
  admittingDiagnosisHi: string;
  primaryPhysician: string;
  status: 'critical' | 'urgent' | 'stable' | 'observation';
  vitals: VitalsData;
  ecgRhythm: 'Normal Sinus Rhythm' | 'Sinus Tachycardia' | 'Atrial Fibrillation with RVR' | 'ST Elevation Anterolateral';
  allergies: string[];
  activePrescriptions: PrescriptionItem[];
  alerts: AIClinicalAlert[];
  troponinLevel?: number; // ng/mL
  lactateLevel?: number; // mmol/L
}

export interface DrugInteraction {
  id: string;
  drugA: string;
  drugB: string;
  type: 'allopathy-allopathy' | 'allopathy-ayush' | 'ayush-ayush';
  severity: 'contraindicated' | 'major' | 'moderate' | 'minor';
  title: string;
  titleHi: string;
  mechanism: string;
  mechanismHi: string;
  clinicalAction: string;
  clinicalActionHi: string;
}

export interface HospitalBedCapacity {
  id: string;
  hospitalName: string;
  hospitalNameHi: string;
  network: string;
  city: string;
  totalBeds: number;
  icuTotal: number;
  icuAvailable: number;
  ventilatorAvailable: number;
  oxygenReserveDays: number;
  emergencyWaitMinutes: number;
  traumaLevel: 'Level 1 Apex' | 'Level 2' | 'Level 3';
  traumaLevelHi: string;
  distanceKm: number;
  ambulanceHelipad: boolean;
  phone: string;
  ayushmanEmpaneled: boolean;
}

export interface AmbulanceDispatchUnit {
  id: string;
  callSign: string;
  vehicleNumber: string;
  type: 'Advanced Life Support (ALS)' | 'Basic Life Support (BLS)' | 'Neonatal Intensive Care (NICU)';
  status: 'responding_scene' | 'patient_transit' | 'at_hospital_er' | 'standby';
  driverName: string;
  paramedicLead: string;
  patientName?: string;
  triageCategory: 'Red (Critical Trauma)' | 'Yellow (Urgent)' | 'Green (Delayed)';
  etaMinutes: number;
  assignedHospital: string;
  liveVitals: {
    hr: number;
    spo2: number;
    bp: string;
    ecg: string;
  };
  locationName: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface RadiologyScan {
  id: string;
  title: string;
  titleHi: string;
  patientName: string;
  patientUhid: string;
  date: string;
  modality: 'Chest Radiograph (PA)' | '12-Lead Digital ECG' | 'HRCT Chest (Parenchymal)' | 'Brain NCCT';
  sampleType: 'xray' | 'ecg' | 'ct';
  findings: {
    condition: string;
    conditionHi: string;
    confidence: number;
    severity: 'critical' | 'moderate' | 'benign';
    location: string;
    bbox?: { x: number; y: number; w: number; h: number }; // percentage coords
  }[];
  ntepStatus?: {
    tbSuspicion: 'High (Immediate Sputum NAAT)' | 'Moderate' | 'None';
    ntepRefCode: string;
  };
  radiologistNote: string;
  aiDifferential: string[];
}

export interface SpecialistDoctor {
  id: string;
  name: string;
  nameHi: string;
  specialty: string;
  specialtyHi: string;
  degrees: string;
  hospital: string;
  experienceYears: number;
  rating: number;
  consultationFee: number;
  nextAvailable: string;
  languages: string[];
  opdType: 'In-Hospital OPD' | 'Tele-Consult Video' | 'Both';
  pmjayAccepted: boolean;
  photoUrl: string;
}
