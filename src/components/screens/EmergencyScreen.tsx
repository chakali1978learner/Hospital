import React, { useState } from 'react';
import {
  AmbulanceDispatchUnit,
  HospitalBedCapacity,
  LanguageMode
} from '../../types';
import {
  mockAmbulances,
  mockHospitals
} from '../../data/mockData';
import {
  PhoneCall,
  Ambulance,
  Building2,
  Navigation,
  Wind,
  Bed,
  CheckCircle,
  AlertTriangle,
  Clock,
  Radio,
  Zap,
  ShieldAlert,
  Send
} from 'lucide-react';

interface EmergencyScreenProps {
  language: LanguageMode;
  onTriggerCodeBlue: () => void;
}

export const EmergencyScreen: React.FC<EmergencyScreenProps> = ({
  language,
  onTriggerCodeBlue
}) => {
  const [selectedAmbulanceId, setSelectedAmbulanceId] = useState(mockAmbulances[0].id);
  const currentAmbulance =
    mockAmbulances.find((a) => a.id === selectedAmbulanceId) || mockAmbulances[0];

  const [reservedHospitalId, setReservedHospitalId] = useState<string | null>(null);
  const [filterVentilatorOnly, setFilterVentilatorOnly] = useState(false);

  const handleReserveBed = (hospitalId: string) => {
    setReservedHospitalId(hospitalId);
    setTimeout(() => {
      setReservedHospitalId(null);
    }, 5000);
  };

  const filteredHospitals = filterVentilatorOnly
    ? mockHospitals.filter((h) => h.ventilatorAvailable > 5)
    : mockHospitals;

  return (
    <div className="space-y-6">
      {/* High-priority Emergency Header Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-white text-red-700 beacon-pulse tracking-wider">
                108 / 112 NATIONAL EMERGENCY RESPONSE
              </span>
              <span className="text-xs text-white/80 font-mono">
                Golden-Hour Trauma Telemetry Corridor
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight">
              {language === 'hi'
                ? 'आपातकालीन ट्रॉमा एवं 108 एम्बुलेंस कमांड सेंटर'
                : 'Emergency Trauma & 108 Ambulance Dispatch Center'}
            </h2>
            <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-2xl">
              {language === 'hi'
                ? 'सड़क दुर्घटना एवं गंभीर कार्डियक मरीजों हेतु प्री-हॉस्पिटल लाइव टेलीमेट्री, जीपीएस एम्बुलेंस ट्रैकिंग एवं रीजनल आईसीयू बेड उपलब्धता'
                : 'Real-time pre-hospital telemetry streaming, ambulance GPS routing, and automated ER ventilator bed reservation'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onTriggerCodeBlue}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-red-700 font-extrabold text-sm shadow-lg hover:bg-red-50 transition-transform active:scale-95"
            >
              <Zap className="w-5 h-5 text-red-600 animate-bounce" />
              {language === 'hi' ? 'कोड ब्लू / ट्रॉमा अलर्ट ट्रिगर करें' : 'Trigger Code Blue Alert'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Ambulance GPS & Pre-Hospital Live Telemetry (7 cols) + Hospital ICU Matrix (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (7 cols): Ambulance GPS Tracking & Pre-Hospital Vitals Stream */}
        <div className="lg:col-span-7 space-y-4">
          {/* Active Ambulances Selector */}
          <div className="card-level-1 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-red-600 animate-pulse" />
                <h3 className="text-sm font-bold text-[#0B1C2E] uppercase tracking-wider font-heading">
                  Active 108 Fleet Dispatched
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                3 Units Operational
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {mockAmbulances.map((amb) => {
                const isSelected = amb.id === currentAmbulance.id;
                return (
                  <button
                    key={amb.id}
                    onClick={() => setSelectedAmbulanceId(amb.id)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'bg-red-50 border-red-500 ring-2 ring-red-500/20 shadow-xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-red-700">
                        {amb.callSign}
                      </span>
                      <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
                        ETA: {amb.etaMinutes}m
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-800 truncate">
                      {amb.patientName || 'Standby Ready'}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 truncate">
                      Dest: {amb.assignedHospital.split(' ')[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Simulated GPS Road Corridor Map Canvas */}
          <div className="bg-[#0B1C2E] rounded-xl border border-red-900/40 p-4 text-white relative shadow-lg overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-xs">
              <div className="flex items-center gap-2 font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="font-bold text-red-400">
                  {currentAmbulance.callSign} • {currentAmbulance.type}
                </span>
              </div>
              <span className="text-slate-400 font-mono text-[11px]">
                Target Hospital: <strong className="text-white">{currentAmbulance.assignedHospital}</strong>
              </span>
            </div>

            {/* Simulated Road Map SVG Canvas */}
            <div className="relative h-60 w-full rounded-lg bg-[#071320] border border-slate-800 overflow-hidden flex items-center justify-center">
              {/* Map grid lines */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle, rgba(56, 189, 248, 0.4) 1px, transparent 1px)`,
                  backgroundSize: '24px 24px'
                }}
              />

              <svg viewBox="0 0 500 240" className="w-full h-full">
                {/* Major Highway Corridors (Ring Road Delhi simulation) */}
                <path
                  d="M 50 190 Q 150 180 230 140 T 380 90 L 460 70"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="20"
                  strokeLinecap="round"
                />
                <path
                  d="M 50 190 Q 150 180 230 140 T 380 90 L 460 70"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="4"
                  strokeDasharray="8,6"
                  opacity="0.8"
                />

                {/* Secondary arterial roads */}
                <path
                  d="M 120 40 L 230 140 L 290 220"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="12"
                />

                {/* Hospital Destination Pin */}
                <g transform="translate(440, 60)">
                  <circle cx="0" cy="0" r="16" fill="#1769AA" />
                  <text x="0" y="4" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">H</text>
                  <text x="0" y="24" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold">Safdarjung ER</text>
                </g>

                {/* Ambulance Live Location Marker with pulse */}
                <g transform="translate(260, 125)">
                  <circle cx="0" cy="0" r="22" fill="#ef4444" opacity="0.25" className="animate-ping" />
                  <circle cx="0" cy="0" r="14" fill="#dc2626" />
                  <text x="0" y="4" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">108</text>
                  <text x="0" y="-18" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold">
                    ETA 6 MINS
                  </text>
                </g>
              </svg>

              {/* Float Map Overlay Stats */}
              <div className="absolute bottom-2 left-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-[11px] text-slate-300">
                <span>Location: </span>
                <strong className="text-white">{currentAmbulance.locationName}</strong>
              </div>
            </div>

            {/* Pre-Hospital Golden-Hour Vitals Stream (Direct from ambulance monitor) */}
            <div className="mt-3 p-3 bg-red-950/40 rounded-xl border border-red-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-red-300 flex items-center gap-1.5 uppercase font-heading">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                  Live Pre-Hospital Telemetry Stream (Golden Hour)
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  DIRECT MONITOR SYNC
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 rounded bg-slate-900/80 border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">PULSE / HR</span>
                  <span className="text-lg font-bold font-mono text-white">
                    {currentAmbulance.liveVitals.hr} <span className="text-xs">BPM</span>
                  </span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">OXYGEN SpO2</span>
                  <span className="text-lg font-bold font-mono text-rose-400">
                    {currentAmbulance.liveVitals.spo2}%
                  </span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">NIBP BLOOD PRESS</span>
                  <span className="text-lg font-bold font-mono text-white">
                    {currentAmbulance.liveVitals.bp}
                  </span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">TRIAGE TAG</span>
                  <span className="text-xs font-bold text-red-400 block mt-1">
                    RED (CRITICAL)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Regional Hospital Bed & Ventilator Matrix */}
        <div className="lg:col-span-5 space-y-4">
          <div className="card-level-1 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#1769AA]" />
                <h3 className="text-sm font-bold text-[#0B1C2E] uppercase tracking-wider font-heading">
                  {language === 'hi' ? 'रीजनल आईसीयू व वेंटिलेटर बेड मैट्रिक्स' : 'Regional ICU & Ventilator Matrix'}
                </h3>
              </div>

              <button
                onClick={() => setFilterVentilatorOnly(!filterVentilatorOnly)}
                className={`text-[11px] px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  filterVentilatorOnly
                    ? 'bg-[#1769AA] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Ventilators &gt; 5
              </button>
            </div>

            {reservedHospitalId && (
              <div className="p-3 mb-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                ICU Bed Reserved at selected hospital! Trauma team standing by.
              </div>
            )}

            <div className="space-y-3">
              {filteredHospitals.map((hosp) => (
                <div
                  key={hosp.id}
                  className="p-3.5 rounded-xl border border-[#E2E8F0] bg-white hover:border-slate-300 transition-all shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#0B1C2E] font-heading">
                        {language === 'hi' ? hosp.hospitalNameHi : hosp.hospitalName}
                      </h4>
                      <span className="text-[11px] text-slate-500 block">
                        {hosp.city} • {hosp.distanceKm} km away
                      </span>
                    </div>

                    <span className="px-2 py-0.5 rounded bg-sky-50 text-[#005087] text-[10px] font-bold border border-sky-200 shrink-0">
                      {hosp.traumaLevel}
                    </span>
                  </div>

                  {/* Bed counts */}
                  <div className="grid grid-cols-3 gap-2 bg-[#F5F9FC] p-2 rounded-lg text-center text-xs mb-2.5">
                    <div>
                      <span className="text-slate-400 block text-[10px]">ICU Free</span>
                      <strong className="text-[#1769AA] font-mono text-sm">
                        {hosp.icuAvailable}
                      </strong>
                      <span className="text-[10px] text-slate-500"> / {hosp.icuTotal}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Ventilators</span>
                      <strong className="text-emerald-700 font-mono text-sm">
                        {hosp.ventilatorAvailable} Free
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">O₂ Reserves</span>
                      <strong className="text-slate-700 font-mono text-xs">
                        {hosp.oxygenReserveDays} Days
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Wait: <strong className="text-slate-800">{hosp.emergencyWaitMinutes} mins</strong>
                    </span>

                    <button
                      onClick={() => handleReserveBed(hosp.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#1769AA] hover:bg-[#005087] text-white text-xs font-semibold shadow-xs transition-transform active:scale-95"
                    >
                      {reservedHospitalId === hosp.id ? 'Reserved!' : 'Reserve ICU Bed'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
