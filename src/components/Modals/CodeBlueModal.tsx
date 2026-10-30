import React, { useState } from 'react';
import { LanguageMode } from '../../types';
import {
  AlertOctagon,
  PhoneCall,
  CheckCircle,
  X,
  Zap,
  Radio,
  Building,
  Users
} from 'lucide-react';

interface CodeBlueModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageMode;
}

export const CodeBlueModal: React.FC<CodeBlueModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [protocolTriggered, setProtocolTriggered] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState<'code_blue' | 'trauma_red' | 'ambulance_108'>('code_blue');

  if (!isOpen) return null;

  const handleConfirmTrigger = () => {
    setProtocolTriggered(true);
    setTimeout(() => {
      // Keep state showing success
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full border-2 border-red-500 shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-6 h-6 text-white animate-pulse" />
            <div>
              <h3 className="font-extrabold text-base font-heading">
                {language === 'hi' ? 'आपातकालीन कोड ब्लू एवं ट्रॉमा ट्रिगर' : 'Emergency Code Blue & Trauma Escalation'}
              </h3>
              <span className="text-[10px] text-red-100 font-mono">
                NATIONAL EMERGENCY TELEMETRY PROTOCOL
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {!protocolTriggered ? (
            <>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {language === 'hi'
                  ? 'तत्काल आपातकालीन प्रोटोकॉल चुनें। यह संबंधित अस्पताल के रिससिटेशन दल, एनेस्थेटिस्ट एवं 108 कंट्रोल रूम को तुरंत ऑटोमेटेड अलर्ट प्रेषित करेगा।'
                  : 'Select emergency escalation protocol. This immediately alerts the on-duty crash team, intubation specialists, cath lab, and 108 trauma command.'}
              </p>

              {/* Protocol Options */}
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedProtocol('code_blue')}
                  className={`w-full p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    selectedProtocol === 'code_blue'
                      ? 'bg-red-50 border-red-500 ring-2 ring-red-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    BLUE
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#0B1C2E]">
                      Code Blue (Cardiac / Respiratory Arrest)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Mobilizes crash cart, defibrillator, airway team to Bed ICU-04
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedProtocol('trauma_red')}
                  className={`w-full p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    selectedProtocol === 'trauma_red'
                      ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    TRAUMA
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#0B1C2E]">
                      Trauma Red Alert (Level 1 Apex Resuscitation)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Clears Trauma OT 2, alerts blood bank for 4 units O-negative PRBC
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedProtocol('ambulance_108')}
                  className={`w-full p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    selectedProtocol === 'ambulance_108'
                      ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#1769AA] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    108
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#0B1C2E]">
                      108 ALS Ambulance Nearest Dispatch
                    </h4>
                    <p className="text-xs text-slate-500">
                      Routes nearest ALS unit with ventilator & multipara monitor
                    </p>
                  </div>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmTrigger}
                  className="px-5 py-2.5 rounded-lg bg-[#DC3545] hover:bg-red-700 text-white text-xs font-bold shadow-md beacon-pulse flex items-center gap-1.5"
                >
                  <Zap className="w-4 h-4" />
                  {language === 'hi' ? 'पुष्टि करें एवं अलर्ट भेजें' : 'Confirm & Broadcast Code'}
                </button>
              </div>
            </>
          ) : (
            /* Triggered Confirmation */
            <div className="text-center py-4 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-[#0B1C2E] font-heading">
                {language === 'hi' ? 'अलर्ट सफलतापूर्वक सक्रिय किया गया!' : 'Emergency Protocol Broadcast Active!'}
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Crash team and Trauma ICU paged on priority frequency. Bed reserved at Safdarjung Trauma Apex.
              </p>
              <div className="p-3 bg-slate-50 rounded-lg text-left text-xs font-mono space-y-1">
                <div>• Priority Beacon: <span className="text-red-600 font-bold">ACTIVE</span></div>
                <div>• ICU Bed: Resuscitation Bay 01 Allocated</div>
                <div>• ETA Intensivist Team: &lt; 90 Seconds</div>
              </div>
              <button
                onClick={onClose}
                className="mt-3 px-6 py-2 bg-[#1769AA] text-white text-xs font-bold rounded-lg hover:bg-[#005087]"
              >
                Close Emergency Monitor
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
