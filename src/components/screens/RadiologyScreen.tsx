import React, { useState } from 'react';
import {
  RadiologyScan,
  LanguageMode
} from '../../types';
import { mockRadiologyScans } from '../../data/mockData';
import {
  ScanEye,
  Sliders,
  Eye,
  EyeOff,
  Flame,
  ShieldCheck,
  AlertTriangle,
  Layers,
  FileCheck2,
  Activity,
  Maximize2
} from 'lucide-react';

interface RadiologyScreenProps {
  language: LanguageMode;
}

export const RadiologyScreen: React.FC<RadiologyScreenProps> = ({ language }) => {
  const [selectedScanIndex, setSelectedScanIndex] = useState(0);
  const currentScan = mockRadiologyScans[selectedScanIndex];

  // Visual filter toggles
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [isInverted, setIsInverted] = useState(false);
  const [contrastLevel, setContrastLevel] = useState(115);
  const [brightnessLevel, setBrightnessLevel] = useState(105);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="card-level-1 rounded-xl p-5 border-l-4 border-l-[#0EA5E9]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D4E6FF] text-[#005087]">
                DIAGNOSTIC VISION AI & NTEP
              </span>
              <span className="text-xs text-slate-500 font-mono">Deep Neural CAM Heatmaps</span>
            </div>
            <h2 className="text-2xl font-bold text-[#0B1C2E] mt-1 font-heading">
              {language === 'hi'
                ? 'रेडियोलॉजी एवं डायग्नोस्टिक विजन AI'
                : 'Radiology & Diagnostic Vision AI'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {language === 'hi'
                ? 'चेस्ट एक्स-रे एवं सीटी इमेजिंग में न्यूमोनिया, कार्डियोमेगाली एवं राष्ट्रीय क्षय रोग उन्मूलन (NTEP) संदिग्ध टीबी की स्वचालित पहचान'
                : 'Automated radiograph segmentation, cardiothoracic ratio calculation, and presumptive Tuberculosis (NTEP) screening'}
            </p>
          </div>

          {/* Scan Selector Tabs */}
          <div className="flex items-center gap-2 bg-[#F1F5F9] p-1 rounded-lg border border-[#CBD5E1]">
            {mockRadiologyScans.map((scan, idx) => (
              <button
                key={scan.id}
                onClick={() => setSelectedScanIndex(idx)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  selectedScanIndex === idx
                    ? 'bg-[#1769AA] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {scan.modality}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Radiology Workstation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (7 cols): Interactive DICOM Viewport with Heatmap & Bounding Boxes */}
        <div className="lg:col-span-7 space-y-3">
          <div className="bg-[#0B1C2E] rounded-xl border border-sky-900/40 p-4 text-white relative shadow-xl overflow-hidden">
            {/* Top Viewport Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono font-bold text-sky-300">
                  {currentScan.patientName} • {currentScan.patientUhid}
                </span>
              </div>
              <span className="text-slate-400 font-mono text-[11px]">{currentScan.date}</span>
            </div>

            {/* Interactive Image Canvas Area */}
            <div className="relative w-full aspect-4/3 rounded-lg overflow-hidden bg-black flex items-center justify-center border border-slate-800">
              {/* Radiograph SVG Representation */}
              <div
                className="w-full h-full relative"
                style={{
                  filter: `contrast(${contrastLevel}%) brightness(${brightnessLevel}%) ${
                    isInverted ? 'invert(1)' : ''
                  }`
                }}
              >
                {currentScan.sampleType === 'xray' ? (
                  /* High-contrast Simulated Chest Radiograph Anatomy */
                  <svg
                    viewBox="0 0 500 400"
                    className="w-full h-full object-cover"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <rect width="500" height="400" fill="#05080c" />
                    {/* Spine & Mediastinum */}
                    <path
                      d="M 250 20 L 250 380"
                      stroke="#8898aa"
                      strokeWidth="24"
                      strokeDasharray="12,4"
                      opacity="0.75"
                    />
                    {/* Ribcage arcs */}
                    {[50, 90, 130, 170, 210, 250, 290, 330].map((y, i) => (
                      <g key={i} opacity="0.45" stroke="#94a3b8" strokeWidth="8" fill="none">
                        <path d={`M 250 ${y} Q ${160 - i * 6} ${y + 20} ${90 - i * 4} ${y + 55}`} />
                        <path d={`M 250 ${y} Q ${340 + i * 6} ${y + 20} ${410 + i * 4} ${y + 55}`} />
                      </g>
                    ))}
                    {/* Left Lung Field (Dark Radiolucent with vascular markings) */}
                    <path
                      d="M 230 70 Q 150 90 120 180 Q 90 280 140 340 Q 210 330 230 300 Z"
                      fill="#0f172a"
                      stroke="#475569"
                      strokeWidth="2"
                      opacity="0.85"
                    />
                    {/* Right Lung Field */}
                    <path
                      d="M 270 70 Q 350 90 380 180 Q 410 280 360 340 Q 290 330 270 300 Z"
                      fill="#0f172a"
                      stroke="#475569"
                      strokeWidth="2"
                      opacity="0.85"
                    />
                    {/* Cardiac Silhouette (Enlarged for Cardiomegaly) */}
                    <path
                      d="M 240 160 Q 290 190 330 260 Q 310 320 240 330 Q 200 310 220 220 Z"
                      fill="#94a3b8"
                      opacity="0.7"
                    />
                    {/* Consolidation in Right Lower Lobe (Dense Radiopacity) */}
                    <ellipse
                      cx="330"
                      cy="260"
                      rx="52"
                      ry="45"
                      fill="#cbd5e1"
                      opacity="0.75"
                    />
                    <circle cx="345" cy="275" r="28" fill="#e2e8f0" opacity="0.6" />
                    {/* Diaphragmatic domes */}
                    <path
                      d="M 80 345 Q 160 310 240 335"
                      stroke="#94a3b8"
                      strokeWidth="6"
                      fill="none"
                      opacity="0.8"
                    />
                    <path
                      d="M 260 335 Q 340 315 420 350"
                      stroke="#94a3b8"
                      strokeWidth="6"
                      fill="none"
                      opacity="0.8"
                    />
                  </svg>
                ) : (
                  /* 12-Lead Diagnostic ECG Strip Display */
                  <div className="w-full h-full p-4 flex flex-col justify-around bg-[#071320] text-emerald-400 font-mono text-xs">
                    {['Lead I', 'Lead II', 'Lead V2 (Anterior ST Elevation > 3mm)', 'Lead V4 (ST Elevation)'].map((lead, idx) => (
                      <div key={idx} className="border-b border-emerald-900/40 pb-1">
                        <span className="text-[10px] text-slate-400">{lead}</span>
                        <div className="h-10 w-full relative">
                          <svg viewBox="0 0 400 40" className="w-full h-full">
                            <path
                              d="M 0 20 L 40 20 L 48 24 L 52 4 L 56 32 L 60 12 L 80 12 Q 95 6 110 20 L 160 20 L 168 24 L 172 4 L 176 32 L 180 12 L 200 12 Q 215 6 230 20 L 280 20 L 288 24 L 292 4 L 296 32 L 300 12 L 320 12 Q 335 6 350 20 L 400 20"
                              fill="none"
                              stroke="#34D399"
                              strokeWidth="2"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Heatmap Layer Overlay (Grad-CAM) */}
              {showHeatmap && currentScan.sampleType === 'xray' && (
                <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-75">
                  <svg viewBox="0 0 500 400" className="w-full h-full">
                    <defs>
                      <radialGradient id="camHeat" cx="66%" cy="65%" r="22%">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.95" />
                        <stop offset="40%" stopColor="#f97316" stopOpacity="0.8" />
                        <stop offset="70%" stopColor="#eab308" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient id="cardioHeat" cx="52%" cy="62%" r="20%">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.75" />
                        <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <circle cx="330" cy="260" r="85" fill="url(#camHeat)" />
                    <circle cx="260" cy="250" r="70" fill="url(#cardioHeat)" />
                  </svg>
                </div>
              )}

              {/* Bounding Box Layers */}
              {showBoundingBoxes && (
                <div className="absolute inset-0 pointer-events-none">
                  {currentScan.findings.map((f, i) => {
                    if (!f.bbox) return null;
                    return (
                      <div
                        key={i}
                        className="absolute border-2 border-dashed border-red-500 rounded bg-red-500/10"
                        style={{
                          left: `${f.bbox.x}%`,
                          top: `${f.bbox.y}%`,
                          width: `${f.bbox.w}%`,
                          height: `${f.bbox.h}%`
                        }}
                      >
                        <span className="absolute -top-5 left-0 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs whitespace-nowrap">
                          {f.condition.split(' ')[0]} ({f.confidence}%)
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Interactive Image Adjuster Controls */}
            <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowHeatmap(!showHeatmap)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                    showHeatmap
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  AI Heatmap: {showHeatmap ? 'ON' : 'OFF'}
                </button>

                <button
                  onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                    showBoundingBoxes
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-sky-400" />
                  Bounding Boxes
                </button>

                <button
                  onClick={() => setIsInverted(!isInverted)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold ${
                    isInverted
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Invert
                </button>
              </div>

              {/* Sliders for Contrast & Brightness */}
              <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span>Contrast:</span>
                  <input
                    type="range"
                    min="80"
                    max="180"
                    value={contrastLevel}
                    onChange={(e) => setContrastLevel(Number(e.target.value))}
                    className="w-16 accent-sky-400 cursor-pointer"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span>Brightness:</span>
                  <input
                    type="range"
                    min="70"
                    max="150"
                    value={brightnessLevel}
                    onChange={(e) => setBrightnessLevel(Number(e.target.value))}
                    className="w-16 accent-sky-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): AI Findings, NTEP TB Alert & Quantitative Differential */}
        <div className="lg:col-span-5 space-y-4">
          {/* NTEP TB Government Screening Badge */}
          {currentScan.ntepStatus && (
            <div className="p-3.5 rounded-xl border border-amber-300 bg-amber-50/90 text-amber-900 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs uppercase flex items-center gap-1.5 text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  NTEP National TB Elimination Program Notification
                </span>
                <span className="font-mono text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-bold">
                  {currentScan.ntepStatus.ntepRefCode}
                </span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                {language === 'hi'
                  ? 'दाएं फेफड़े में कन्सोलिडेशन एवं फुफ्फुसीय सूजन के कारण संभावित टीबी स्क्रीनिंग अनुशंसित है। तत्काल ट्रूनैट/सीबीएनएएटी (CBNAAT) स्पुटम जांच हेतु भेजा गया।'
                  : 'Right lower lobe opacification meets criteria for Presumptive TB under NTEP guidelines. Rapid molecular GeneXpert / Truenat sputum test triggered.'}
              </p>
            </div>
          )}

          {/* AI Pathology Detections List */}
          <div className="card-level-1 rounded-xl p-4">
            <h3 className="text-sm font-bold text-[#0B1C2E] uppercase tracking-wider mb-3 font-heading">
              {language === 'hi' ? 'एआई पैथोलॉजी पहचान एवं विश्वास स्कोर' : 'AI Pathology Segmentation & Confidence'}
            </h3>

            <div className="space-y-3">
              {currentScan.findings.map((finding, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-[#E2E8F0] bg-white">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-[#0B1C2E]">
                      {language === 'hi' ? finding.conditionHi : finding.condition}
                    </span>
                    <span
                      className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                        finding.confidence > 90
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-sky-50 text-sky-700 border border-sky-200'
                      }`}
                    >
                      {finding.confidence}%
                    </span>
                  </div>

                  {/* Visual Confidence Bar */}
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1.5">
                    <div
                      className={`h-full rounded-full ${
                        finding.confidence > 90 ? 'bg-red-500' : 'bg-[#1769AA]'
                      }`}
                      style={{ width: `${finding.confidence}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Location: {finding.location}</span>
                    <span className="capitalize font-semibold text-slate-700">
                      Severity: {finding.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Differential Diagnosis & Radiologist Recommendation */}
          <div className="glass-ai rounded-xl p-4 border border-sky-400/30">
            <h4 className="text-xs font-bold text-[#005087] uppercase tracking-wider mb-2 font-heading">
              Algorithmic Differential Diagnoses:
            </h4>
            <div className="space-y-1.5 text-xs text-slate-700 mb-3">
              {currentScan.aiDifferential.map((diff, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1769AA]" />
                  <span>{diff}</span>
                </div>
              ))}
            </div>

            <div className="pt-2.5 border-t border-slate-200 text-xs">
              <span className="font-bold text-slate-900 block mb-1">
                Radiologist & Tele-Consult Impression:
              </span>
              <p className="text-slate-600 italic leading-relaxed">
                "{currentScan.radiologistNote}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
