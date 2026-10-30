import React from 'react';
import {
  Heart,
  Activity,
  Wind,
  Thermometer,
  Droplets,
  AlertOctagon,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { VitalsData, LanguageMode } from '../../types';

interface VitalsDisplayProps {
  vitals: VitalsData;
  language: LanguageMode;
  troponin?: number;
  lactate?: number;
}

export const VitalsDisplay: React.FC<VitalsDisplayProps> = ({
  vitals,
  language,
  troponin,
  lactate
}) => {
  // Mean Arterial Pressure (MAP) calculation: (2*Diastolic + Systolic) / 3
  const mapValue = Math.round((2 * vitals.bloodPressure.diastolic + vitals.bloodPressure.systolic) / 3);
  const isMapCritical = mapValue < 65;
  const isHrElevated = vitals.heartRate > 100 || vitals.heartRate < 55;
  const isSpo2Low = vitals.spO2 < 95;
  const isRrElevated = vitals.respRate > 20 || vitals.respRate < 12;

  // News-2 severity label
  const getNewsBadge = (score: number) => {
    if (score >= 7) {
      return {
        bg: 'bg-red-500/10 text-red-700 border-red-300',
        label: language === 'hi' ? 'उच्च जोखिम (तत्काल समीक्षा)' : 'High Risk (Stat Medical Review)',
        color: 'text-red-600'
      };
    }
    if (score >= 5) {
      return {
        bg: 'bg-amber-500/10 text-amber-700 border-amber-300',
        label: language === 'hi' ? 'मध्यम जोखिम (निरंतर निगरानी)' : 'Medium Risk (Ward Escalation)',
        color: 'text-amber-600'
      };
    }
    return {
      bg: 'bg-emerald-500/10 text-emerald-700 border-emerald-300',
      label: language === 'hi' ? 'सामान्य / स्थिर' : 'Low Risk (Routine Monitoring)',
      color: 'text-emerald-600'
    };
  };

  const newsConfig = getNewsBadge(vitals.news2Score);

  return (
    <div className="space-y-3">
      {/* 6-Grid Vitals Monitored Values */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {/* Heart Rate */}
        <div
          className={`p-3 rounded-xl border transition-all ${
            isHrElevated
              ? 'bg-red-50/70 border-red-200 shadow-xs'
              : 'bg-white border-[#E2E8F0]'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-[#414750] mb-1">
            <span className="font-semibold flex items-center gap-1">
              <Heart className={`w-3.5 h-3.5 ${isHrElevated ? 'text-red-500 animate-pulse' : 'text-[#1769AA]'}`} />
              {language === 'hi' ? 'हृदय गति' : 'Heart Rate'}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">BPM</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className={`text-2xl font-bold font-mono tracking-tight ${isHrElevated ? 'text-red-600' : 'text-[#0B1C2E]'}`}>
              {vitals.heartRate}
            </span>
            <span className="text-[10px] text-slate-500">60-100</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500 flex items-center justify-between">
            <span>{isHrElevated ? (vitals.heartRate > 100 ? 'Tachycardia' : 'Bradycardia') : 'Normal Sinus'}</span>
            {isHrElevated && <TrendingUp className="w-3 h-3 text-red-500" />}
          </div>
        </div>

        {/* SpO2 */}
        <div
          className={`p-3 rounded-xl border transition-all ${
            isSpo2Low
              ? 'bg-rose-50/70 border-rose-200 shadow-xs'
              : 'bg-white border-[#E2E8F0]'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-[#414750] mb-1">
            <span className="font-semibold flex items-center gap-1">
              <Activity className={`w-3.5 h-3.5 ${isSpo2Low ? 'text-rose-600' : 'text-[#13A89E]'}`} />
              SpO₂
            </span>
            <span className="text-[10px] text-slate-400 font-mono">%</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className={`text-2xl font-bold font-mono tracking-tight ${isSpo2Low ? 'text-rose-600' : 'text-[#0B1C2E]'}`}>
              {vitals.spO2}%
            </span>
            <span className="text-[10px] text-slate-500">&gt;95%</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500 flex items-center justify-between">
            <span>{isSpo2Low ? 'Hypoxia Alert' : 'Optimal'}</span>
            {isSpo2Low && <TrendingDown className="w-3 h-3 text-rose-600" />}
          </div>
        </div>

        {/* NIBP Blood Pressure */}
        <div
          className={`p-3 rounded-xl border transition-all ${
            isMapCritical
              ? 'bg-red-50/70 border-red-200 shadow-xs'
              : 'bg-white border-[#E2E8F0]'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-[#414750] mb-1">
            <span className="font-semibold flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-[#1769AA]" />
              {language === 'hi' ? 'रक्तचाप (NIBP)' : 'NIBP'}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">mmHg</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className={`text-xl font-bold font-mono tracking-tight ${isMapCritical ? 'text-red-600' : 'text-[#0B1C2E]'}`}>
              {vitals.bloodPressure.systolic}/{vitals.bloodPressure.diastolic}
            </span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500 flex items-center justify-between">
            <span className="font-mono">
              MAP: <strong className={isMapCritical ? 'text-red-600' : 'text-slate-700'}>{mapValue}</strong>
            </span>
            <span className="text-[10px] text-slate-400">{isMapCritical ? '<65 Crit' : 'Adequate'}</span>
          </div>
        </div>

        {/* Respiratory Rate */}
        <div
          className={`p-3 rounded-xl border transition-all ${
            isRrElevated
              ? 'bg-amber-50/70 border-amber-200 shadow-xs'
              : 'bg-white border-[#E2E8F0]'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-[#414750] mb-1">
            <span className="font-semibold flex items-center gap-1">
              <Wind className="w-3.5 h-3.5 text-sky-600" />
              {language === 'hi' ? 'श्वसन दर' : 'Resp Rate'}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">/min</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className={`text-2xl font-bold font-mono tracking-tight ${isRrElevated ? 'text-amber-600' : 'text-[#0B1C2E]'}`}>
              {vitals.respRate}
            </span>
            <span className="text-[10px] text-slate-500">12-20</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500 flex items-center justify-between">
            <span>{isRrElevated ? 'Tachypneic' : 'Eupneic'}</span>
            {isRrElevated && <TrendingUp className="w-3 h-3 text-amber-600" />}
          </div>
        </div>

        {/* Body Temperature */}
        <div className="p-3 rounded-xl border bg-white border-[#E2E8F0]">
          <div className="flex items-center justify-between text-xs text-[#414750] mb-1">
            <span className="font-semibold flex items-center gap-1">
              <Thermometer className="w-3.5 h-3.5 text-orange-500" />
              {language === 'hi' ? 'तापमान' : 'Body Temp'}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">°C</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono tracking-tight text-[#0B1C2E]">
              {vitals.temperature}°
            </span>
            <span className="text-[10px] text-slate-500">36.5-37.5</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            <span>{vitals.temperature > 37.8 ? 'Febrile' : 'Normothermic'}</span>
          </div>
        </div>

        {/* Blood Glucose */}
        <div
          className={`p-3 rounded-xl border transition-all ${
            vitals.bloodGlucose > 180
              ? 'bg-purple-50/70 border-purple-200'
              : 'bg-white border-[#E2E8F0]'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-[#414750] mb-1">
            <span className="font-semibold flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-purple-600" />
              {language === 'hi' ? 'ग्लूकोज' : 'Glucose'}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">mg/dL</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className={`text-2xl font-bold font-mono tracking-tight ${vitals.bloodGlucose > 180 ? 'text-purple-700' : 'text-[#0B1C2E]'}`}>
              {vitals.bloodGlucose}
            </span>
            <span className="text-[10px] text-slate-500">70-140</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            <span>{vitals.bloodGlucose > 180 ? 'Hyperglycemic' : 'Euglycemic'}</span>
          </div>
        </div>
      </div>

      {/* Glassmorphic AI NEWS-2 & Predictive Biomarker Row */}
      <div className="glass-ai rounded-xl p-3 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 border border-sky-400/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1769AA] to-[#0EA5E9] flex items-center justify-center text-white shrink-0 shadow-xs">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-[#0B1C2E] font-heading">
                {language === 'hi' ? 'NEWS-2 अर्ली वार्निंग स्कोर' : 'NEWS-2 Early Warning System'}
              </h4>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${newsConfig.bg}`}>
                Score: {vitals.news2Score}/20 • {newsConfig.label}
              </span>
            </div>
            <p className="text-xs text-[#414750] mt-0.5">
              {language === 'hi'
                ? 'एल्गोरिथमिक अर्ली डिटेक्शन: अगले 4 घंटों में आईसीयू एस्केलेशन की संभावना 72%'
                : 'Predictive Deterioration: Algorithmic trajectory projects 72% likelihood of respiratory escalation if tachypnea uncorrected'}
            </p>
          </div>
        </div>

        {/* High-sensitivity Biomarkers if available */}
        <div className="flex items-center gap-4 text-xs font-mono border-t md:border-t-0 md:border-l border-slate-200 pt-2 md:pt-0 md:pl-4">
          {troponin !== undefined && (
            <div>
              <span className="text-slate-500 block text-[10px]">TROPONIN I (STAT)</span>
              <span className="font-bold text-red-600 text-sm">{troponin} ng/mL</span>
              <span className="text-[10px] text-slate-400 block">&lt;0.04 normal</span>
            </div>
          )}
          {lactate !== undefined && (
            <div>
              <span className="text-slate-500 block text-[10px]">SERUM LACTATE</span>
              <span className="font-bold text-amber-600 text-sm">{lactate} mmol/L</span>
              <span className="text-[10px] text-slate-400 block">&lt;2.0 normal</span>
            </div>
          )}
          <div>
            <span className="text-slate-500 block text-[10px]">GLASGOW COMA</span>
            <span className="font-bold text-[#0B1C2E] text-sm">GCS {vitals.gcsScore}/15</span>
            <span className="text-[10px] text-slate-400 block">Eye 4, V 4, M 6</span>
          </div>
        </div>
      </div>
    </div>
  );
};
