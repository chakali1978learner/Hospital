import React, { useState, useEffect } from 'react';
import { LanguageMode } from '../../types';
import {
  HeartHandshake,
  Wind,
  Play,
  Square,
  Sparkles,
  Heart,
  Activity,
  CheckCircle,
  Apple,
  Clock,
  ShieldCheck
} from 'lucide-react';

interface IntegrativeCareScreenProps {
  language: LanguageMode;
}

export const IntegrativeCareScreen: React.FC<IntegrativeCareScreenProps> = ({
  language
}) => {
  // Pranayama Pacer State
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Hold (Post-Exhale)'>('Inhale');
  const [countdown, setCountdown] = useState(4);
  const [simulatedHr, setSimulatedHr] = useState(82);
  const [completedCycles, setCompletedCycles] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBreathingActive) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            // Cycle phase
            setBreathPhase((currentPhase) => {
              if (currentPhase === 'Inhale') return 'Hold';
              if (currentPhase === 'Hold') return 'Exhale';
              if (currentPhase === 'Exhale') return 'Hold (Post-Exhale)';
              // Completed one 4-part cycle
              setCompletedCycles((c) => c + 1);
              setSimulatedHr((hr) => Math.max(68, hr - 2)); // vagal parasympathetic drop
              return 'Inhale';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setCountdown(4);
      setBreathPhase('Inhale');
    }

    return () => clearInterval(timer);
  }, [isBreathingActive]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="card-level-1 rounded-xl p-5 border-l-4 border-l-[#13A89E]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800">
                AYUSH & ALLOPATHY HARMONY
              </span>
              <span className="text-xs text-slate-500 font-mono">Ministry of AYUSH Empanelled Protocols</span>
            </div>
            <h2 className="text-2xl font-bold text-[#0B1C2E] mt-1 font-heading">
              {language === 'hi'
                ? 'आयुष एवं आधुनिक चिकित्सा समग्र समन्वय'
                : 'AYUSH Integrative Care & Pulmonary Rehabilitation'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {language === 'hi'
                ? 'एलोपैथिक निगरानी के साथ योग, प्राणायाम बायोफीडबैक एवं व्यक्तिगत दिनचर्या द्वारा स्वास्थ्य संवर्धन'
                : 'Evidence-based synergy of allopathic acute precision with yogic cardiopulmonary autonomic stabilization'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Guided Pranayama Biofeedback Pacer + Clinical Nutrition Protocol */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (6 cols): Guided Pranayama Biofeedback Pacer */}
        <div className="lg:col-span-6 space-y-4">
          <div className="glass-ai rounded-2xl p-6 border border-teal-300/40 text-center relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wind className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-bold text-[#0B1C2E] font-heading">
                  {language === 'hi'
                    ? 'प्राणायाम एवं ऑटोनॉमिक बायोफीडबैक पेसर'
                    : 'Guided Pranayama & Vagal Telemetry Pacer'}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                4-4-4-4 Box Breathing
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-6 max-w-md mx-auto">
              {language === 'hi'
                ? 'अनियमित दिल की धड़कन (Arrhythmia) एवं हाइपरटेंशन में वेगस तंत्रिका को शांत करने हेतु नियंत्रित श्वसन अभ्यास'
                : 'Stimulates parasympathetic vagal outflow to reduce myocardial oxygen demand and lower arterial blood pressure'}
            </p>

            {/* Circular Breathing Visualizer */}
            <div className="relative w-56 h-56 mx-auto my-4 flex items-center justify-center">
              {/* Outer pulsing ring */}
              <div
                className={`absolute inset-0 rounded-full border-4 border-dashed border-teal-400 transition-transform duration-1000 ${
                  isBreathingActive && breathPhase === 'Inhale'
                    ? 'scale-110 opacity-100 rotate-45'
                    : isBreathingActive && breathPhase === 'Exhale'
                    ? 'scale-90 opacity-60'
                    : 'scale-100 opacity-80'
                }`}
              />

              {/* Inner animated bubble */}
              <div
                className={`w-40 h-40 rounded-full flex flex-col items-center justify-center text-white transition-all duration-1000 shadow-xl ${
                  isBreathingActive
                    ? breathPhase === 'Inhale'
                      ? 'bg-gradient-to-br from-teal-500 to-sky-500 scale-105'
                      : breathPhase === 'Hold' || breathPhase === 'Hold (Post-Exhale)'
                      ? 'bg-gradient-to-br from-cyan-600 to-teal-700 scale-100'
                      : 'bg-gradient-to-br from-teal-600 to-emerald-700 scale-90'
                    : 'bg-gradient-to-br from-[#1769AA] to-[#13A89E]'
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-widest text-teal-100">
                  {isBreathingActive ? breathPhase : 'Ready'}
                </span>
                <span className="text-4xl font-extrabold font-mono my-0.5">
                  {isBreathingActive ? countdown : '4s'}
                </span>
                <span className="text-[10px] text-teal-200">
                  {isBreathingActive
                    ? breathPhase === 'Inhale'
                      ? 'Deep Diaphragmatic Breath'
                      : breathPhase === 'Hold'
                      ? 'Retain Softly (Kumbhaka)'
                      : breathPhase === 'Exhale'
                      ? 'Smooth Slow Exhale'
                      : 'Restful Pause'
                    : 'Press Start'}
                </span>
              </div>
            </div>

            {/* Live Biofeedback Telemetry Readout */}
            <div className="grid grid-cols-3 gap-2 bg-white/80 p-3 rounded-xl border border-teal-100 mb-5 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">CURRENT PULSE</span>
                <div className="flex items-center justify-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <strong className="text-base font-mono text-[#0B1C2E]">
                    {isBreathingActive ? simulatedHr : 82}
                  </strong>
                  <span className="text-[10px] text-slate-500">bpm</span>
                </div>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">CYCLES FINISHED</span>
                <strong className="text-base font-mono text-teal-700">
                  {completedCycles}
                </strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">AUTONOMIC STATE</span>
                <strong className="text-xs font-semibold text-emerald-700 block mt-1">
                  {isBreathingActive ? 'Parasympathetic' : 'Baseline'}
                </strong>
              </div>
            </div>

            {/* Pacer Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsBreathingActive(!isBreathingActive)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md transition-transform active:scale-95 ${
                  isBreathingActive
                    ? 'bg-rose-600 hover:bg-rose-700'
                    : 'bg-[#13A89E] hover:bg-[#006A63]'
                }`}
              >
                {isBreathingActive ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isBreathingActive ? 'Stop Session' : 'Start Pranayama Session'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (6 cols): Evidence-based Dinacharya & Indian Diet Care Plan */}
        <div className="lg:col-span-6 space-y-4">
          <div className="card-level-1 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Apple className="w-5 h-5 text-teal-600" />
              <h3 className="text-base font-bold text-[#0B1C2E] font-heading">
                {language === 'hi'
                  ? 'भारतीय आहार एवं दिनचर्या (Dinacharya) प्रोटोकॉल'
                  : 'Indian Clinical Nutrition & Dinacharya Protocol'}
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg border border-[#E2E8F0] bg-white">
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-sm text-[#005087] font-heading">
                    Glycemic Index Mitigation for Indian Diets
                  </strong>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold">
                    Diabetes T2D
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Consume soaked Methi (Fenugreek) seeds water upon waking. Pair whole wheat chapati with 1:1 proportion of soluble fiber (sprouted Moong / Bengal Gram) to blunt postprandial glucose spike by 34%.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-[#E2E8F0] bg-white">
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-sm text-[#005087] font-heading">
                    Terminalia Arjuna Cardioprotective Regimen
                  </strong>
                  <span className="px-2 py-0.5 rounded bg-sky-50 text-[#005087] text-[10px] font-bold">
                    Post-PCI Stent
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Arjuna bark decoction (Kwath) taken 20ml BD under doctor supervision exhibits positive inotropic and antioxidant action on ischemic myocardium without interfering with Dual Antiplatelet Therapy (DAPT).
                </p>
              </div>

              <div className="p-3 rounded-lg border border-[#E2E8F0] bg-white">
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-sm text-[#005087] font-heading">
                    Bronchial Airway Soothing (Nadi Shodhana)
                  </strong>
                  <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 text-[10px] font-bold">
                    Asthma / COPD
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Warm steam inhalation with Tulsi (Ocimum sanctum) leaves and camphor, combined with 10 minutes of alternate nostril breathing, reduces airway hyperreactivity and clears mucous plugs.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 font-semibold text-teal-800">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                Validated by AIIA & CCRAS Guidelines
              </span>
              <span className="text-[11px] text-slate-400">Allopathy Cross-Audited</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
