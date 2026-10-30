import React from 'react';
import {
  Activity,
  FileText,
  ScanEye,
  UserCheck,
  Ambulance,
  HeartHandshake
} from 'lucide-react';
import { LanguageMode } from '../types';

export type ScreenId =
  | 'command-center'
  | 'prescription-scribe'
  | 'radiology'
  | 'patient-portal'
  | 'emergency'
  | 'integrative';

interface NavigationProps {
  activeScreen: ScreenId;
  setActiveScreen: (screen: ScreenId) => void;
  language: LanguageMode;
  criticalAlertCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeScreen,
  setActiveScreen,
  language,
  criticalAlertCount
}) => {
  const tabs = [
    {
      id: 'command-center' as ScreenId,
      icon: Activity,
      labelEn: 'Clinical Command',
      labelHi: 'कमांड सेंटर',
      badge: criticalAlertCount > 0 ? `${criticalAlertCount} Alert` : undefined,
      badgeColor: 'bg-red-500 text-white'
    },
    {
      id: 'prescription-scribe' as ScreenId,
      icon: FileText,
      labelEn: 'Prescription & Scribe',
      labelHi: 'प्रिस्क्रिप्शन व स्क्राइब',
      badge: 'AI Audit',
      badgeColor: 'bg-sky-100 text-sky-800'
    },
    {
      id: 'radiology' as ScreenId,
      icon: ScanEye,
      labelEn: 'Radiology & Lab AI',
      labelHi: 'रेडियोलॉजी व जांच',
      badge: 'NTEP-TB',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'patient-portal' as ScreenId,
      icon: UserCheck,
      labelEn: 'Patient & ABHA Portal',
      labelHi: 'आभा व मरीज पोर्टल',
      badge: 'PM-JAY',
      badgeColor: 'bg-amber-100 text-amber-900'
    },
    {
      id: 'emergency' as ScreenId,
      icon: Ambulance,
      labelEn: 'Emergency & 108 Dispatch',
      labelHi: '108 एम्बुलेंस व आपातकालीन',
      badge: 'Live GPS',
      badgeColor: 'bg-rose-100 text-rose-700'
    },
    {
      id: 'integrative' as ScreenId,
      icon: HeartHandshake,
      labelEn: 'AYUSH Integrative Care',
      labelHi: 'आयुष एवं समग्र स्वास्थ्य',
      badge: 'Biofeedback',
      badgeColor: 'bg-teal-100 text-teal-800'
    }
  ];

  return (
    <nav className="bg-white border-b border-[#E2E8F0] shadow-xs sticky top-[89px] z-30 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 sm:space-x-2 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeScreen === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveScreen(tab.id)}
                className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#1769AA] text-white shadow-sm shadow-[#1769AA]/30'
                    : 'text-[#414750] hover:text-[#0B1C2E] hover:bg-[#F5F9FC]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-white' : 'text-[#1769AA] group-hover:text-[#005087]'
                  }`}
                />

                <span className="flex items-center gap-1.5">
                  {language === 'en' && <span>{tab.labelEn}</span>}
                  {language === 'hi' && <span className="bilingual-hindi">{tab.labelHi}</span>}
                  {language === 'dual' && (
                    <span className="flex items-center gap-1">
                      <span>{tab.labelEn}</span>
                      <span className="opacity-70 text-[11px] font-normal">| {tab.labelHi}</span>
                    </span>
                  )}
                </span>

                {tab.badge && (
                  <span
                    className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : tab.badgeColor
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
