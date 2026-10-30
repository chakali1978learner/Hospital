import React, { useState } from 'react';
import {
  SpecialistDoctor,
  LanguageMode
} from '../../types';
import { mockDoctors } from '../../data/mockData';
import {
  QrCode,
  ShieldCheck,
  CheckCircle,
  Calendar,
  Clock,
  Star,
  Video,
  Building,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  User,
  HeartHandshake
} from 'lucide-react';

interface PatientPortalScreenProps {
  language: LanguageMode;
  onBookDoctor: (doctor: SpecialistDoctor) => void;
  onTriggerEmergency: () => void;
}

export const PatientPortalScreen: React.FC<PatientPortalScreenProps> = ({
  language,
  onBookDoctor,
  onTriggerEmergency
}) => {
  // Symptom Checker State
  const [symptomStep, setSymptomStep] = useState(1);
  const [selectedChiefComplaint, setSelectedChiefComplaint] = useState('Chest Pain & Discomfort');
  const [symptomDuration, setSymptomDuration] = useState('2 to 6 hours');
  const [hasRedFlags, setHasRedFlags] = useState(true); // e.g. Radiation to arm, cold sweats
  const [triageResult, setTriageResult] = useState<{
    urgency: 'critical' | 'urgent' | 'routine';
    title: string;
    titleHi: string;
    advice: string;
    adviceHi: string;
  } | null>(null);

  // Specialty Filter
  const [specialtyFilter, setSpecialtyFilter] = useState('all');

  const handleRunTriage = () => {
    if (selectedChiefComplaint.includes('Chest') && hasRedFlags) {
      setTriageResult({
        urgency: 'critical',
        title: 'High Risk Acute Coronary Syndrome (ACS / Heart Attack)',
        titleHi: 'उच्च जोखिम: संभावित तीव्र हृदय आघात (हार्ट अटैक)',
        advice: 'Immediate Emergency Care required. Do NOT drive yourself. Dispatch 108 Ambulance or proceed to nearest tertiary ER.',
        adviceHi: 'तत्काल आपातकालीन सहायता आवश्यक है। स्वयं वाहन न चलाएं। 108 एम्बुलेंस को कॉल करें।'
      });
    } else if (selectedChiefComplaint.includes('Breathing') || hasRedFlags) {
      setTriageResult({
        urgency: 'urgent',
        title: 'Moderate to High Respiratory / Systemic Stress',
        titleHi: 'मध्यम से उच्च श्वसन संकट',
        advice: 'Consult an on-call physician within 2 to 4 hours. Keep pulse oximeter monitoring SpO2.',
        adviceHi: '2 से 4 घंटे के भीतर डॉक्टर से परामर्श लें। पल्स ऑक्सीमीटर से ऑक्सीजन स्तर जांचें।'
      });
    } else {
      setTriageResult({
        urgency: 'routine',
        title: 'Mild Symptoms Suitable for OPD Tele-Consult',
        titleHi: 'सामान्य लक्षण: ओपीडी परामर्श उपयुक्त',
        advice: 'Book an appointment with an empanelled specialist today.',
        adviceHi: 'आज ही विशेषज्ञ डॉक्टर के साथ अपॉइंटमेंट बुक करें।'
      });
    }
  };

  const filteredDoctors = specialtyFilter === 'all'
    ? mockDoctors
    : mockDoctors.filter((doc) => doc.specialty.toLowerCase().includes(specialtyFilter.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="card-level-1 rounded-xl p-5 border-l-4 border-l-[#1769AA]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E5EEFF] text-[#005087]">
                AYUSHMAN BHARAT & PATIENT HUB
              </span>
              <span className="text-xs text-slate-500 font-mono">ABHA Health ID Verified</span>
            </div>
            <h2 className="text-2xl font-bold text-[#0B1C2E] mt-1 font-heading">
              {language === 'hi'
                ? 'मरीज एवं आभा (ABHA) डिजिटल स्वास्थ्य पोर्टल'
                : 'Patient Care & ABHA Digital Health Portal'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {language === 'hi'
                ? 'आयुष्मान भारत हेल्थ अकाउंट (ABHA) कार्ड, इंटरएक्टिव AI लक्षण ट्राइएज एवं विशेषज्ञ डॉक्टर परामर्श'
                : 'Access digital ABHA identity card, AI conversational symptom triaging, and PM-JAY empanelled specialist care'}
            </p>
          </div>
        </div>
      </div>

      {/* Top Split: Official Ayushman Bharat ABHA Card + AI Symptom Triaging Wizard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (5 cols): Official ABHA Card Representation */}
        <div className="lg:col-span-5">
          <div className="bg-gradient-to-br from-[#005087] via-[#1769AA] to-[#0EA5E9] rounded-2xl p-5 text-white shadow-xl relative overflow-hidden border border-sky-300/30">
            {/* Background Emblem watermark */}
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
              <ShieldCheck className="w-64 h-64 text-white" />
            </div>

            {/* Top Govt of India Header */}
            <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#005087] font-bold text-xs shadow-sm">
                  🇮🇳
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-wider uppercase font-heading">
                    National Health Authority (NHA)
                  </h4>
                  <p className="text-[10px] text-sky-200">
                    आयुष्मान भारत डिजिटल मिशन (ABDM)
                  </p>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400 text-slate-900 shadow-xs">
                ACTIVE & LINKED
              </span>
            </div>

            {/* User Profile & QR */}
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] text-sky-200 uppercase tracking-widest block font-mono">
                  ABHA NUMBER
                </span>
                <span className="text-lg sm:text-xl font-bold font-mono tracking-wider block text-white">
                  91-8842-1049-5501
                </span>

                <div className="pt-2">
                  <span className="text-[10px] text-sky-200 block">PATIENT NAME</span>
                  <span className="text-base font-bold text-white block">
                    Rameshwar Nath Sharma
                  </span>
                  <span className="text-xs text-sky-100 font-hindi">
                    रामेश्वर नाथ शर्मा (M / 62 Yrs)
                  </span>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-white/20 text-[11px] font-medium border border-white/30">
                    ABHA Address: rameshwar@abdm
                  </span>
                </div>
              </div>

              {/* Dynamic QR Code Box */}
              <div className="bg-white p-2.5 rounded-xl shadow-md shrink-0 flex flex-col items-center">
                <QrCode className="w-20 h-20 text-slate-900" />
                <span className="text-[9px] font-mono text-slate-700 font-bold mt-1">SCAN TO SYNC</span>
              </div>
            </div>

            {/* PM-JAY Insurance Details */}
            <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-sky-200 block">PM-JAY GOLD CARD COVERAGE</span>
                <span className="font-bold text-emerald-300">₹5,00,000 / Year • Zero Cashless Copay</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-sky-200 block">CONSENT LOCKER</span>
                <span className="text-white font-mono text-[11px]">HIP / HIU Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Interactive AI Symptom Triaging Wizard */}
        <div className="lg:col-span-7">
          <div className="card-level-1 rounded-2xl p-5 border border-sky-200 bg-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#1769AA]" />
                <h3 className="text-base font-bold text-[#0B1C2E] font-heading">
                  {language === 'hi'
                    ? 'AI द्विभाषी लक्षण जांच एवं ट्राइएज'
                    : 'AI Bilingual Symptom Triaging Wizard'}
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Step {symptomStep} of 2
              </span>
            </div>

            {symptomStep === 1 ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 font-heading">
                    {language === 'hi' ? '1. अपनी मुख्य तकलीफ चुनें:' : '1. Select Primary Chief Complaint:'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {[
                      'Chest Pain & Discomfort',
                      'Shortness of Breath',
                      'High Fever & Chills',
                      'Abdominal Pain',
                      'Severe Dizziness & Weakness',
                      'Diabetic Ketosis Symptoms'
                    ].map((symptom) => (
                      <button
                        key={symptom}
                        onClick={() => setSelectedChiefComplaint(symptom)}
                        className={`p-2.5 rounded-lg border text-left font-medium transition-all ${
                          selectedChiefComplaint === symptom
                            ? 'bg-[#1769AA] text-white border-[#1769AA] shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {symptom}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 font-heading">
                    {language === 'hi' ? '2. लक्षण कितने समय से हैं?' : '2. How long have you experienced this?'}
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {['Under 2 hours', '2 to 6 hours', 'More than 24 hours'].map((dur) => (
                      <button
                        key={dur}
                        onClick={() => setSymptomDuration(dur)}
                        className={`p-2 rounded-lg border text-center font-medium ${
                          symptomDuration === dur
                            ? 'bg-sky-100 text-[#005087] border-[#1769AA] font-bold'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {dur}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-red-50/70 border border-red-200 rounded-lg">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasRedFlags}
                      onChange={(e) => setHasRedFlags(e.target.checked)}
                      className="mt-0.5 accent-red-600 rounded"
                    />
                    <div className="text-xs text-red-900 leading-tight">
                      <strong>Check for Red Flags: </strong>
                      Cold sweating, pain radiating to left jaw or left arm, severe breathlessness at rest, or altered mental alertness.
                    </div>
                  </label>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      handleRunTriage();
                      setSymptomStep(2);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1769AA] hover:bg-[#005087] text-white text-xs font-bold shadow-xs transition-transform active:scale-95"
                  >
                    <span>{language === 'hi' ? 'ट्राइएज परिणाम देखें' : 'Compute AI Triage Result'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* Step 2: Triaging Result Display */
              <div className="space-y-4">
                {triageResult && (
                  <div
                    className={`p-4 rounded-xl border ${
                      triageResult.urgency === 'critical'
                        ? 'bg-red-50 border-red-300 text-red-900'
                        : triageResult.urgency === 'urgent'
                        ? 'bg-amber-50 border-amber-300 text-amber-900'
                        : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 shrink-0 text-red-600" />
                      <h4 className="text-base font-bold font-heading">
                        {language === 'hi' ? triageResult.titleHi : triageResult.title}
                      </h4>
                    </div>

                    <p className="text-xs leading-relaxed mb-3">
                      {language === 'hi' ? triageResult.adviceHi : triageResult.advice}
                    </p>

                    <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-red-200/60">
                      {triageResult.urgency === 'critical' ? (
                        <button
                          onClick={onTriggerEmergency}
                          className="flex items-center gap-1.5 px-4 py-2 bg-[#DC3545] hover:bg-red-700 text-white font-bold text-xs rounded-lg shadow-md beacon-pulse"
                        >
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {language === 'hi' ? '108 आपातकालीन एम्बुलेंस भेजें' : 'Dispatch 108 Emergency Ambulance'}
                        </button>
                      ) : (
                        <a
                          href="#doctors-roster"
                          className="px-4 py-2 bg-[#1769AA] text-white font-bold text-xs rounded-lg shadow-xs hover:bg-[#005087]"
                        >
                          Book On-Duty Specialist Below
                        </a>
                      )}

                      <button
                        onClick={() => setSymptomStep(1)}
                        className="px-3 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50"
                      >
                        Reset / Check Other Symptoms
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Specialist Consultation Booking Directory */}
      <div id="doctors-roster" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-[#0B1C2E] font-heading">
              {language === 'hi'
                ? 'विशेषज्ञ डॉक्टर टेली-परामर्श एवं ओपीडी'
                : 'Empanelled Specialist OPD & Video Tele-Consult'}
            </h3>
            <p className="text-xs text-slate-500">
              Verified clinicians accepting Ayushman Bharat PM-JAY & private insurance
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {['all', 'Cardiology', 'Pulmonology', 'AYUSH', 'Trauma'].map((spec) => (
              <button
                key={spec}
                onClick={() => setSpecialtyFilter(spec)}
                className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
                  specialtyFilter === spec
                    ? 'bg-[#1769AA] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-[#CBD5E1] hover:bg-slate-50'
                }`}
              >
                {spec === 'all' ? 'All Specialties' : spec}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="card-level-2 rounded-xl p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={doc.photoUrl}
                    alt={doc.name}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-200 shadow-xs shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-[#0B1C2E] font-heading leading-tight">
                      {doc.name}
                    </h4>
                    <span className="text-[11px] text-slate-600 block mt-0.5">
                      {language === 'hi' ? doc.specialtyHi : doc.specialty}
                    </span>
                    <div className="flex items-center gap-1 mt-1 text-[11px]">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-slate-800">{doc.rating}</span>
                      <span className="text-slate-400">({doc.experienceYears}+ yrs exp)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-600 mb-3 bg-[#F5F9FC] p-2.5 rounded-lg border border-[#E2E8F0]">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#1769AA] shrink-0" />
                    <span className="truncate">{doc.hospital}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>Next Slot: {doc.nextAvailable}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">CONSULT FEE</span>
                  <span className="font-bold text-sm text-[#0B1C2E]">₹{doc.consultationFee}</span>
                </div>

                <button
                  onClick={() => onBookDoctor(doc)}
                  className="px-3 py-1.5 rounded-lg bg-[#1769AA] hover:bg-[#005087] text-white text-xs font-bold shadow-xs transition-transform active:scale-95 flex items-center gap-1"
                >
                  <Calendar className="w-3 h-3" />
                  {language === 'hi' ? 'बुक करें' : 'Book Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
