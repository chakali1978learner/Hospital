import React, { useState } from 'react';
import {
  Patient,
  LanguageMode,
  AIClinicalAlert
} from '../../types';
import { EcgWaveform } from '../telemetry/EcgWaveform';
import { VitalsDisplay } from '../telemetry/VitalsDisplay';
import {
  User,
  AlertTriangle,
  Pill,
  CheckCircle,
  FileBadge,
  Sparkles,
  ArrowRight,
  Send,
  Bed,
  Stethoscope,
  Clock,
  Zap
} from 'lucide-react';

interface CommandCenterScreenProps {
  patients: Patient[];
  selectedPatientId: string;
  setSelectedPatientId: (id: string) => void;
  language: LanguageMode;
  onNavigateToScribe: () => void;
  onNavigateToRadiology: () => void;
}

export const CommandCenterScreen: React.FC<CommandCenterScreenProps> = ({
  patients,
  selectedPatientId,
  setSelectedPatientId,
  language,
  onNavigateToScribe,
  onNavigateToRadiology
}) => {
  const currentPatient =
    patients.find((p) => p.id === selectedPatientId) || patients[0];

  // Local state for actions executed by clinician
  const [resolvedAlerts, setResolvedAlerts] = useState<string[]>([]);
  const [interventionFeedback, setInterventionFeedback] = useState<string | null>(null);

  const handleExecuteAction = (alert: AIClinicalAlert) => {
    setResolvedAlerts((prev) => [...prev, alert.id]);
    setInterventionFeedback(
      language === 'hi'
        ? `आदेश निष्पादित: "${alert.suggestedActionHi}". नर्सिंग स्टेशन को सतर्क किया गया।`
        : `Order Executed: "${alert.suggestedAction}". Nursing telemetry alerted.`
    );
    setTimeout(() => {
      setInterventionFeedback(null);
    }, 4000);
  };

  const getStatusBadge = (status: Patient['status']) => {
    switch (status) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'urgent':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'stable':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="space-y-5">
      {/* Clinician Notification Feedback Toast */}
      {interventionFeedback && (
        <div className="bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-between transition-all animate-bounce">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-200" />
            <span className="text-sm font-semibold">{interventionFeedback}</span>
          </div>
          <button
            onClick={() => setInterventionFeedback(null)}
            className="text-xs bg-emerald-700 hover:bg-emerald-800 px-2.5 py-1 rounded-md text-white font-medium"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Ward & Patient Selector Ribbon */}
      <div className="card-level-1 rounded-xl p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bed className="w-4 h-4 text-[#1769AA]" />
            <h3 className="text-sm font-bold text-[#0B1C2E] uppercase tracking-wider font-heading">
              {language === 'hi' ? 'आईसीयू एवं इमरजेंसी वार्ड टेलीमेट्री रोस्टर' : 'ICU & Emergency Telemetry Roster'}
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            4 Monitored Beds • Real-time Sync
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {patients.map((pt) => {
            const isSelected = pt.id === currentPatient.id;
            return (
              <button
                key={pt.id}
                onClick={() => setSelectedPatientId(pt.id)}
                className={`p-3 rounded-lg border text-left transition-all relative ${
                  isSelected
                    ? 'bg-[#E5EEFF] border-[#1769AA] ring-2 ring-[#1769AA]/20 shadow-xs'
                    : 'bg-white border-[#E2E8F0] hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-[#005087] bg-white px-1.5 py-0.5 rounded border border-[#C1C7D2]/40">
                    {pt.bedNumber.split(' ')[0]}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getStatusBadge(
                      pt.status
                    )}`}
                  >
                    {pt.status}
                  </span>
                </div>

                <div className="font-bold text-sm text-[#0B1C2E] truncate font-heading">
                  {language === 'hi' ? pt.nameHi : pt.name}
                </div>

                <div className="text-xs text-slate-500 flex items-center justify-between mt-1">
                  <span>
                    {pt.age}y / {pt.gender}
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-[#1769AA]">
                    HR {pt.vitals.heartRate} • {pt.vitals.spO2}%
                  </span>
                </div>

                {pt.alerts.length > 0 && (
                  <div className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-red-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    <span>{pt.alerts.length} AI Alert{pt.alerts.length > 1 ? 's' : ''}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Patient Identity Card & Diagnosis */}
      <div className="card-level-1 rounded-xl p-4 sm:p-5 border-l-4 border-l-[#1769AA]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-[#1769AA] text-white text-xs font-bold font-mono">
                {currentPatient.bedNumber}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1C2E] font-heading">
                {currentPatient.name}
              </h2>
              {language !== 'en' && (
                <span className="text-base text-slate-600 font-hindi font-medium">
                  ({currentPatient.nameHi})
                </span>
              )}
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase border ${getStatusBadge(
                  currentPatient.status
                )}`}
              >
                {currentPatient.status}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <FileBadge className="w-3.5 h-3.5 text-[#1769AA]" />
                UHID: <strong className="font-mono text-slate-800">{currentPatient.uhid}</strong>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                ABHA ID: <strong className="font-mono text-slate-800">{currentPatient.abhaId}</strong>
              </span>
              <span className="flex items-center gap-1">
                <Stethoscope className="w-3.5 h-3.5 text-[#13A89E]" />
                {currentPatient.primaryPhysician}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Admitted: {currentPatient.admissionDate}
              </span>
            </div>

            <div className="mt-2 text-xs sm:text-sm text-slate-800 bg-[#F5F9FC] p-2.5 rounded-lg border border-[#E2E8F0]">
              <strong className="text-[#005087] font-semibold">
                {language === 'hi' ? 'प्राथमिक निदान: ' : 'Admitting Diagnosis: '}
              </strong>
              {language === 'hi' ? currentPatient.admittingDiagnosisHi : currentPatient.admittingDiagnosis}
            </div>
          </div>

          {/* Quick Doctor Station Actions */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={onNavigateToScribe}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-[#CBD5E1] text-[#243447] text-xs font-semibold hover:bg-slate-50 shadow-xs"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              {language === 'hi' ? 'AI स्क्राइब खोलें' : 'Open AI Scribe'}
            </button>
            <button
              onClick={onNavigateToRadiology}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1769AA] text-white text-xs font-semibold hover:bg-[#005087] shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              {language === 'hi' ? 'रेडियोलॉजी व एक्स-रे देखें' : 'View AI Radiology'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Dual-Column Telemetry Stream: Live Waveforms & Critical AI Triage Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (8 cols): ECG Waveform + 6-parameter Vitals Monitor */}
        <div className="lg:col-span-8 space-y-4">
          <EcgWaveform
            heartRate={currentPatient.vitals.heartRate}
            rhythm={currentPatient.ecgRhythm}
            isStElevated={currentPatient.ecgRhythm.includes('ST Elevation')}
          />

          <VitalsDisplay
            vitals={currentPatient.vitals}
            language={language}
            troponin={currentPatient.troponinLevel}
            lactate={currentPatient.lactateLevel}
          />

          {/* Active Prescriptions Table with Allopathy / AYUSH Badges */}
          <div className="card-level-1 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Pill className="w-4 h-4 text-[#1769AA]" />
                <h3 className="text-sm font-bold text-[#0B1C2E] font-heading">
                  {language === 'hi' ? 'सक्रिय दवाइयाँ एवं फार्माकोविजिलेंस' : 'Active Prescriptions & Pharmacovigilance'}
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                {currentPatient.activePrescriptions.length} Active Orders
              </span>
            </div>

            <div className="divide-y divide-[#E2E8F0]">
              {currentPatient.activePrescriptions.map((rx) => (
                <div key={rx.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0B1C2E] text-sm">
                        {rx.medicine}
                      </span>
                      {rx.type === 'ayush' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                          AYUSH Herbal
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                          Allopathy
                        </span>
                      )}
                    </div>
                    <div className="text-slate-500 mt-0.5">
                      Indication: <span className="text-slate-700">{rx.indication}</span> • Route: {rx.route}
                    </div>
                  </div>

                  <div className="text-right sm:text-right shrink-0">
                    <span className="font-mono font-bold text-[#1769AA] block">
                      {rx.dosage}
                    </span>
                    <span className="text-slate-500 text-[11px]">{rx.frequency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Algorithmic AI Triage Alert Stream & Clinical Interventions */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-ai rounded-xl p-4 border border-sky-400/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <h3 className="text-sm font-bold text-[#0B1C2E] font-heading">
                  {language === 'hi' ? 'AI क्लिनिकल अलर्ट एवं हस्तक्षेप' : 'AI Clinical Alerts & Interventions'}
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold">
                REAL-TIME
              </span>
            </div>

            <div className="space-y-3">
              {currentPatient.alerts.length === 0 ? (
                <div className="text-center py-6 text-slate-500 text-xs">
                  <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
                  No critical telemetry threshold breaches at this moment.
                </div>
              ) : (
                currentPatient.alerts.map((alert) => {
                  const isResolved = resolvedAlerts.includes(alert.id);
                  return (
                    <div
                      key={alert.id}
                      className={`p-3.5 rounded-xl border transition-all ${
                        isResolved
                          ? 'bg-slate-50 border-slate-200 opacity-60'
                          : alert.severity === 'critical'
                          ? 'bg-red-50/90 border-red-200 shadow-xs'
                          : 'bg-amber-50/90 border-amber-200 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <AlertTriangle
                            className={`w-4 h-4 ${
                              alert.severity === 'critical' ? 'text-red-600' : 'text-amber-600'
                            }`}
                          />
                          <span className="font-bold text-xs text-[#0B1C2E]">
                            {language === 'hi' ? alert.titleHi : alert.title}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {alert.timestamp}
                        </span>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed">
                        {language === 'hi' ? alert.messageHi : alert.message}
                      </p>

                      <div className="mt-2.5 p-2 rounded-lg bg-white/90 border border-slate-200 text-xs">
                        <span className="font-bold text-[#005087] block mb-0.5">
                          {language === 'hi' ? 'अनुशंसित क्लिनिकल कार्रवाई:' : 'Recommended Clinical Action:'}
                        </span>
                        <span className="text-slate-800">
                          {language === 'hi' ? alert.suggestedActionHi : alert.suggestedAction}
                        </span>
                      </div>

                      <div className="mt-2.5 flex items-center justify-end">
                        {isResolved ? (
                          <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" />
                            {language === 'hi' ? 'आदेश दिया गया' : 'Order Placed'}
                          </span>
                        ) : (
                          <button
                            onClick={() => handleExecuteAction(alert)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1769AA] hover:bg-[#005087] text-white text-xs font-semibold shadow-xs transition-transform active:scale-95"
                          >
                            <Send className="w-3 h-3" />
                            {language === 'hi' ? 'आदेश निष्पादित करें' : 'Execute Order'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Rapid Clinical Orders Quick Pad */}
          <div className="card-level-1 rounded-xl p-4">
            <h4 className="text-xs font-bold text-[#0B1C2E] uppercase tracking-wider mb-2 font-heading">
              {language === 'hi' ? 'त्वरित क्लिनिकल प्रोटोकॉल' : 'Rapid Telemetry Protocols'}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() =>
                  setInterventionFeedback(
                    language === 'hi'
                      ? 'स्टैट 12-लीड ईसीजी एवं कार्डियोलॉजी समीक्षा मंगाई गई।'
                      : 'Stat 12-Lead ECG & Cardiology Review ordered.'
                  )
                }
                className="p-2.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-slate-50 text-slate-700 font-medium text-left"
              >
                12-Lead Stat ECG
              </button>
              <button
                onClick={() =>
                  setInterventionFeedback(
                    language === 'hi'
                      ? 'सीरम इलेक्ट्रोलाइट्स एवं वीबीजी का आदेश दिया गया।'
                      : 'VBG & Serum Electrolytes Panel ordered.'
                  )
                }
                className="p-2.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-slate-50 text-slate-700 font-medium text-left"
              >
                Stat VBG & Lactate
              </button>
              <button
                onClick={() =>
                  setInterventionFeedback(
                    language === 'hi'
                      ? 'ट्रॉमा एवं इमरजेंसी कोड ब्लू टीम को सतर्क किया गया।'
                      : 'Code Blue Trauma Team Paged.'
                  )
                }
                className="p-2.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-800 font-medium text-left"
              >
                Page Medical Team
              </button>
              <button
                onClick={() =>
                  setInterventionFeedback(
                    language === 'hi'
                      ? '200ml IV सेलाइन बोलस आदेशित।'
                      : '200ml Normal Saline Bolus ordered.'
                  )
                }
                className="p-2.5 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-800 font-medium text-left"
              >
                IV Fluid Bolus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
