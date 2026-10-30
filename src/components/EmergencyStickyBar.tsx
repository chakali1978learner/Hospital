import React from 'react';
import { PhoneCall, Video, Zap, Activity } from 'lucide-react';
import { LanguageMode } from '../types';

interface EmergencyStickyBarProps {
  language: LanguageMode;
  onCallAmbulance: () => void;
  onInstantTeleConsult: () => void;
  onTraumaTriage: () => void;
}

export const EmergencyStickyBar: React.FC<EmergencyStickyBarProps> = ({
  language,
  onCallAmbulance,
  onInstantTeleConsult,
  onTraumaTriage
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0B1C2E]/95 backdrop-blur-md border-t border-red-500/30 px-3 py-2 sm:py-2.5 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Telemetry Status Indicator */}
        <div className="hidden md:flex items-center gap-2 text-xs text-white">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping inline-block" />
          <span className="font-bold text-red-400 font-heading">
            {language === 'hi' ? 'आपातकालीन त्वरित हस्तक्षेप बार' : 'Trauma & Emergency Escalation Bar'}
          </span>
          <span className="text-slate-400 font-mono text-[11px]">| 108 Standby Active</span>
        </div>

        {/* 3 Core Emergency Action Buttons */}
        <div className="flex items-center justify-between w-full md:w-auto gap-2">
          {/* Action 1: Call Ambulance 108 */}
          <button
            onClick={onCallAmbulance}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-[#DC3545] hover:bg-[#b02130] text-white font-bold text-xs sm:text-sm shadow-md beacon-pulse transition-transform active:scale-95 whitespace-nowrap"
          >
            <PhoneCall className="w-4 h-4 text-white animate-bounce" />
            <span>{language === 'hi' ? 'एम्बुलेंस 108' : 'Call Ambulance 108'}</span>
          </button>

          {/* Action 2: Instant Tele-Consult */}
          <button
            onClick={onInstantTeleConsult}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-[#1769AA] hover:bg-[#005087] text-white font-bold text-xs sm:text-sm shadow-sm transition-transform active:scale-95 whitespace-nowrap"
          >
            <Video className="w-4 h-4 text-white" />
            <span>{language === 'hi' ? 'तत्काल टेली-कंसल्ट' : 'Instant Tele-Consult'}</span>
          </button>

          {/* Action 3: Trauma Triage */}
          <button
            onClick={onTraumaTriage}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-[#006A63] hover:bg-[#00504b] text-white font-bold text-xs sm:text-sm shadow-sm transition-transform active:scale-95 whitespace-nowrap"
          >
            <Zap className="w-4 h-4 text-teal-300" />
            <span>{language === 'hi' ? 'ट्रॉमा ट्राइएज' : 'Trauma Triage'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
