import React from 'react';
import {
  Activity,
  Shield,
  PhoneCall,
  Languages,
  Building2,
  Bell,
  Sparkles,
  Wifi
} from 'lucide-react';
import { LanguageMode } from '../types';

interface HeaderProps {
  language: LanguageMode;
  setLanguage: (lang: LanguageMode) => void;
  selectedHospital: string;
  setSelectedHospital: (hosp: string) => void;
  onOpenEmergency: () => void;
  activePatientCount: number;
  criticalAlertCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  selectedHospital,
  setSelectedHospital,
  onOpenEmergency,
  activePatientCount,
  criticalAlertCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs">
      {/* Top Clinical Ticker / System Status */}
      <div className="bg-[#005087] text-white px-4 py-1.5 text-xs font-medium flex flex-wrap items-center justify-between gap-2 border-b border-[#1769AA]/30">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-300 font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <Wifi className="w-3.5 h-3.5 inline" />
            LIVE TELEMETRY ACTIVE
          </span>
          <span className="hidden md:inline text-white/70">|</span>
          <span className="hidden md:inline text-white/90">
            {language === 'hi'
              ? 'राष्ट्रीय स्वास्थ्य प्राधिकरण (NHA) एवं आयुष्मान भारत (ABDM) अनुपालित'
              : 'NHA & Ayushman Bharat Digital Mission (ABDM) Level 3 Certified Node'}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="bg-[#1769AA]/80 px-2.5 py-0.5 rounded-full text-white/90 border border-white/10 font-mono">
            ICU BEDS: 65/320 FREE (20%)
          </span>
          <span className="text-white/80 hidden sm:inline">
            SYSTEM LATENCY: <strong className="text-emerald-300 font-mono">18ms</strong>
          </span>
          <span className="bg-red-500/90 hover:bg-red-600 text-white px-2 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 cursor-pointer" onClick={onOpenEmergency}>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            108 EMERGENCY DISPATCH
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Authority Badge */}
          <div className="flex items-center gap-3.5">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#1769AA] to-[#005087] text-white shadow-md shadow-[#1769AA]/20 border border-sky-400/30">
              <Activity className="w-6 h-6 text-white" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-teal-400 border-2 border-white flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-slate-900" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B1C2E] font-heading leading-tight">
                  Clinical Precision <span className="text-[#1769AA]">AI</span>
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#E5EEFF] text-[#005087] border border-[#C1C7D2]/50">
                  v3.8 Clinical OS
                </span>
              </div>
              <p className="text-xs text-[#414750] flex items-center gap-1.5 font-medium">
                <span>संजीवनी डिजिटल हेल्थ</span>
                <span className="text-[#C1C7D2]">•</span>
                <span>Dual-Script Indian Healthcare Telemetry</span>
              </p>
            </div>
          </div>

          {/* Right Action Controls: Hospital Selector, Language Switcher & Emergency */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Hospital Node Selector */}
            <div className="hidden lg:flex items-center gap-2 bg-[#F5F9FC] border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 text-xs text-[#243447]">
              <Building2 className="w-4 h-4 text-[#1769AA]" />
              <select
                aria-label="Select Hospital Network Node"
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
                className="bg-transparent font-medium text-[#243447] focus:outline-none cursor-pointer"
              >
                <option value="All Connected Nodes">All Connected Tertiary Hubs</option>
                <option value="AIIMS Apex Trauma Centre">AIIMS Apex Trauma Centre, New Delhi</option>
                <option value="Safdarjung Hospital & VMMC">Safdarjung Hospital & VMMC</option>
                <option value="Apollo Hospitals Indraprastha">Apollo Hospitals Indraprastha</option>
                <option value="Fortis Escorts Heart Institute">Fortis Escorts Heart Institute</option>
                <option value="Max Super Speciality Saket">Max Super Speciality Saket</option>
              </select>
            </div>

            {/* Language Toggle (EN / हिन्दी / Dual) */}
            <div className="flex items-center bg-[#F1F5F9] border border-[#CBD5E1] rounded-lg p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  language === 'en'
                    ? 'bg-[#1769AA] text-white shadow-xs'
                    : 'text-[#414750] hover:text-[#0B1C2E]'
                }`}
                title="English Language"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  language === 'hi'
                    ? 'bg-[#1769AA] text-white shadow-xs'
                    : 'text-[#414750] hover:text-[#0B1C2E]'
                }`}
                title="हिंदी भाषा"
              >
                हिन्दी
              </button>
              <button
                type="button"
                onClick={() => setLanguage('dual')}
                className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 ${
                  language === 'dual'
                    ? 'bg-[#1769AA] text-white shadow-xs'
                    : 'text-[#414750] hover:text-[#0B1C2E]'
                }`}
                title="Bilingual View (English + हिन्दी)"
              >
                <Languages className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Dual</span>
              </button>
            </div>

            {/* Emergency SOS Button with Beacon Pulse */}
            <button
              onClick={onOpenEmergency}
              className="relative flex items-center gap-2 bg-[#DC3545] hover:bg-[#b02130] text-white font-bold px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm shadow-md shadow-[#DC3545]/20 beacon-pulse transition-transform active:scale-95"
            >
              <PhoneCall className="w-4 h-4 text-white animate-bounce" />
              <span className="hidden sm:inline">
                {language === 'hi' ? 'आपातकालीन 108' : 'Emergency 108'}
              </span>
              <span className="sm:hidden font-mono">108</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
