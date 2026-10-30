import React, { useState } from 'react';
import {
  DrugInteraction,
  LanguageMode
} from '../../types';
import {
  mockDrugInteractions,
  sampleClinicalDictations
} from '../../data/mockData';
import {
  FileText,
  Mic,
  MicOff,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Copy,
  Plus,
  Trash2,
  QrCode,
  ShieldAlert,
  Play,
  RotateCcw,
  Languages
} from 'lucide-react';

interface PrescriptionScribeScreenProps {
  language: LanguageMode;
}

export const PrescriptionScribeScreen: React.FC<PrescriptionScribeScreenProps> = ({
  language
}) => {
  // Prescription Audit State
  const [selectedMeds, setSelectedMeds] = useState<string[]>([
    'Ramipril (ACE Inhibitor)',
    'Spironolactone (Potassium-Sparing Diuretic)',
    'Metformin (Biguanide)',
    'Giloy / Guduchi (Tinospora Cordifolia)'
  ]);
  const [customMed, setCustomMed] = useState('');
  const [copiedState, setCopiedState] = useState(false);

  // Scribe State
  const [isRecording, setIsRecording] = useState(false);
  const [dictationText, setDictationText] = useState(sampleClinicalDictations[0].audioText);
  const [selectedDictationSample, setSelectedDictationSample] = useState(0);
  const [generatedSoap, setGeneratedSoap] = useState(sampleClinicalDictations[0].parsedSoap);
  const [icd10Tags, setIcd10Tags] = useState(sampleClinicalDictations[0].icd10);
  const [snomedTags, setSnomedTags] = useState(sampleClinicalDictations[0].snomed);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Available medicines to add
  const availableDrugOptions = [
    'Ramipril (ACE Inhibitor)',
    'Spironolactone (Potassium-Sparing Diuretic)',
    'Metformin (Biguanide)',
    'Giloy / Guduchi (Tinospora Cordifolia)',
    'Warfarin (Vitamin K Antagonist)',
    'Ashwagandha (Withania Somnifera)',
    'Clopidogrel (Antiplatelet)',
    'Omeprazole (Proton Pump Inhibitor)',
    'Ciprofloxacin (Fluoroquinolone)',
    'Triphala Churna (Ayurvedic Herbal Blend)',
    'Atorvastatin 80mg',
    'Aspirin 75mg'
  ];

  const handleAddMed = (med: string) => {
    if (med && !selectedMeds.includes(med)) {
      setSelectedMeds([...selectedMeds, med]);
    }
  };

  const handleRemoveMed = (med: string) => {
    setSelectedMeds(selectedMeds.filter((m) => m !== med));
  };

  // Find interactions among current selected medications
  const detectedInteractions = mockDrugInteractions.filter((interaction) => {
    const hasDrugA = selectedMeds.some((m) => m.toLowerCase().includes(interaction.drugA.split(' ')[0].toLowerCase()));
    const hasDrugB = selectedMeds.some((m) => m.toLowerCase().includes(interaction.drugB.split(' ')[0].toLowerCase()));
    return hasDrugA && hasDrugB;
  });

  const handleLoadSample = (index: number) => {
    setSelectedDictationSample(index);
    const sample = sampleClinicalDictations[index];
    setDictationText(sample.audioText);
    setGeneratedSoap(sample.parsedSoap);
    setIcd10Tags(sample.icd10);
    setSnomedTags(sample.snomed);
  };

  const handleSimulateRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setDictationText('Listening... (ध्वनि पहचान सक्रिय)...');
      setTimeout(() => {
        setIsRecording(false);
        const sample = sampleClinicalDictations[selectedDictationSample];
        setDictationText(sample.audioText);
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  const handleReanalyzeDictation = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      const sample = sampleClinicalDictations[selectedDictationSample];
      setGeneratedSoap(sample.parsedSoap);
      setIcd10Tags(sample.icd10);
      setSnomedTags(sample.snomed);
    }, 1200);
  };

  const copySoapNote = () => {
    const noteText = `SOAP CLINICAL NOTE:
Subjective: ${generatedSoap.subjective}
Objective: ${generatedSoap.objective}
Assessment: ${generatedSoap.assessment}
Plan: ${generatedSoap.plan}

ICD-10: ${icd10Tags.join(', ')}
SNOMED CT: ${snomedTags.join(', ')}`;
    navigator.clipboard.writeText(noteText);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="card-level-1 rounded-xl p-5 border-l-4 border-l-[#13A89E]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#79F3E8] text-[#006A63]">
                PHARMACOVIGILANCE & AI SCRIBE
              </span>
              <span className="text-xs text-slate-500 font-mono">Bilingual ICD-10 & SNOMED CT</span>
            </div>
            <h2 className="text-2xl font-bold text-[#0B1C2E] mt-1 font-heading">
              {language === 'hi'
                ? 'AI प्रिस्क्रिप्शन ऑडिट एवं क्लिनिकल स्क्राइब'
                : 'AI Prescription Audit & Clinical Scribe'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {language === 'hi'
                ? 'एलोपैथिक एवं आयुर्वेदिक दवाओं के पारस्परिक प्रभाव (Drug-Herb Interactions) की त्वरित जांच एवं बहुभाषी वॉयस-टू-एसओएपी (SOAP) नोट जनरेटर'
                : 'Automated Allopathy & Ayurvedic drug-herb interaction checks with bilingual medical voice-to-SOAP documentation'}
            </p>
          </div>
        </div>
      </div>

      {/* Module 1: AI Prescription Audit & Drug-Herb Interaction Checker */}
      <div className="card-level-1 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#13A89E] flex items-center justify-center font-bold">
              Rx
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B1C2E] font-heading">
                {language === 'hi' ? 'दवा अंतःक्रिया एवं सुरक्षा विश्लेषण' : 'Pharmacological Safety & Interaction Matrix'}
              </h3>
              <p className="text-xs text-slate-500">
                Cross-checking Allopathic drugs against AYUSH Indian Herbal formulations
              </p>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              detectedInteractions.length > 0
                ? 'bg-red-100 text-red-800 border border-red-300'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            }`}
          >
            {detectedInteractions.length} Contradiction{detectedInteractions.length !== 1 ? 's' : ''} Flagged
          </span>
        </div>

        {/* Selected Drugs Pill Cloud */}
        <div className="mb-4">
          <label className="text-xs font-bold text-slate-600 uppercase block mb-2 font-heading">
            Currently Monitored Regimen ({selectedMeds.length} Agents):
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {selectedMeds.map((med) => {
              const isAyush = med.toLowerCase().includes('giloy') ||
                              med.toLowerCase().includes('ashwagandha') ||
                              med.toLowerCase().includes('triphala') ||
                              med.toLowerCase().includes('arjuna');
              return (
                <span
                  key={med}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                    isAyush
                      ? 'bg-teal-50 text-teal-800 border-teal-200'
                      : 'bg-blue-50 text-blue-800 border-blue-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isAyush ? 'bg-teal-500' : 'bg-blue-500'}`} />
                  {med}
                  <button
                    onClick={() => handleRemoveMed(med)}
                    className="hover:text-red-600 transition-colors ml-1"
                    title="Remove medicine"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>

        {/* Quick Add Medicine Selector */}
        <div className="flex flex-wrap items-center gap-2 p-3 bg-[#F5F9FC] rounded-lg border border-[#E2E8F0] mb-5">
          <span className="text-xs font-semibold text-slate-700">Add Agent to Test:</span>
          <select
            aria-label="Add Medication to Test"
            onChange={(e) => {
              handleAddMed(e.target.value);
              e.target.value = '';
            }}
            className="text-xs bg-white border border-[#CBD5E1] rounded-md px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none"
          >
            <option value="">Select an Allopathic or AYUSH drug...</option>
            {availableDrugOptions
              .filter((d) => !selectedMeds.includes(d))
              .map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
          </select>

          <div className="flex items-center gap-1.5 ml-auto">
            <input
              type="text"
              placeholder="Or type custom agent..."
              value={customMed}
              onChange={(e) => setCustomMed(e.target.value)}
              className="text-xs bg-white border border-[#CBD5E1] rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none w-44"
            />
            <button
              onClick={() => {
                if (customMed.trim()) {
                  handleAddMed(customMed.trim());
                  setCustomMed('');
                }
              }}
              className="px-2.5 py-1.5 bg-[#1769AA] text-white rounded-md text-xs font-semibold hover:bg-[#005087] flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add
            </button>
          </div>
        </div>

        {/* Flagged Interactions Details */}
        <div className="space-y-3">
          {detectedInteractions.length === 0 ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <strong>No hazardous interactions detected.</strong> All selected medications are pharmacokinetically compatible under standard dosing schedules.
              </div>
            </div>
          ) : (
            detectedInteractions.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-red-200 bg-red-50/70 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
                    <span className="font-bold text-sm text-[#0B1C2E]">
                      {item.drugA} <span className="text-red-500 font-normal">↔</span> {item.drugB}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-red-200 text-red-900 border border-red-300">
                      {item.severity}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-slate-700 border border-slate-300">
                      {item.type}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-red-900 font-semibold mb-1">
                  {language === 'hi' ? item.titleHi : item.title}
                </div>

                <p className="text-xs text-slate-700 leading-relaxed mb-2.5">
                  <strong className="text-slate-800">Mechanism: </strong>
                  {language === 'hi' ? item.mechanismHi : item.mechanism}
                </p>

                <div className="p-2.5 rounded-lg bg-white border border-red-100 text-xs">
                  <span className="font-bold text-[#1769AA] block mb-0.5">
                    {language === 'hi' ? 'क्लिनिकल सिफारिश:' : 'Clinical Action Plan:'}
                  </span>
                  <span className="text-slate-800">
                    {language === 'hi' ? item.clinicalActionHi : item.clinicalAction}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Module 2: Bilingual Clinical Scribe & Automated SOAP Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (5 cols): Voice/Text Audio Dictation Pad */}
        <div className="lg:col-span-5 space-y-4">
          <div className="card-level-1 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-[#1769AA]" />
                <h3 className="text-sm font-bold text-[#0B1C2E] font-heading">
                  {language === 'hi' ? 'चिकित्सक वॉयस डिक्टेशन' : 'Clinician Voice & Text Dictation'}
                </h3>
              </div>
              <span className="text-[10px] font-mono bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-bold">
                Hindi / English AI Scribe
              </span>
            </div>

            {/* Presets */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-slate-500 font-medium">Load Clinician Preset:</span>
              <button
                onClick={() => handleLoadSample(0)}
                className={`text-xs px-2.5 py-1 rounded-md border font-medium ${
                  selectedDictationSample === 0
                    ? 'bg-[#1769AA] text-white border-[#1769AA]'
                    : 'bg-white text-slate-700 border-[#CBD5E1] hover:bg-slate-50'
                }`}
              >
                1. Hindi CCU Round
              </button>
              <button
                onClick={() => handleLoadSample(1)}
                className={`text-xs px-2.5 py-1 rounded-md border font-medium ${
                  selectedDictationSample === 1
                    ? 'bg-[#1769AA] text-white border-[#1769AA]'
                    : 'bg-white text-slate-700 border-[#CBD5E1] hover:bg-slate-50'
                }`}
              >
                2. English ER DKA
              </button>
            </div>

            {/* Dictation Input Area */}
            <div className="relative">
              <textarea
                value={dictationText}
                onChange={(e) => setDictationText(e.target.value)}
                rows={6}
                className="w-full text-xs sm:text-sm p-3 rounded-lg border border-[#CBD5E1] focus:ring-2 focus:ring-[#1769AA]/30 focus:outline-none bg-[#F8F9FF] text-slate-800 leading-relaxed font-sans"
                placeholder="Speak in Hindi, English or Hinglish; or type doctor's clinical notes..."
              />

              {isRecording && (
                <div className="absolute inset-0 bg-red-950/20 backdrop-blur-xs rounded-lg flex items-center justify-center border-2 border-red-500">
                  <div className="flex items-center gap-2 text-red-600 font-bold text-sm bg-white px-4 py-2 rounded-full shadow-lg">
                    <span className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
                    Recording Hindi/English Dictation...
                  </div>
                </div>
              )}
            </div>

            {/* Audio Scribe Controls */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={handleSimulateRecording}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-xs ${
                  isRecording
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-[#1769AA] hover:bg-[#005087] text-white'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                {isRecording ? 'Stop Recording' : 'Start Voice Dictation'}
              </button>

              <button
                onClick={handleReanalyzeDictation}
                disabled={isAnalyzing}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isAnalyzing ? 'Extracting Medical Entities...' : 'Parse & Generate SOAP'}
              </button>
            </div>
          </div>

          {/* ICD-10 & SNOMED CT Codes Card */}
          <div className="card-level-1 rounded-xl p-4">
            <h4 className="text-xs font-bold text-[#0B1C2E] uppercase tracking-wider mb-2 font-heading">
              AI Standardized Medical Coding (ICD-10 & SNOMED CT)
            </h4>
            <div className="space-y-2">
              <div>
                <span className="text-[11px] font-bold text-slate-500 block mb-1">ICD-10-CM:</span>
                <div className="flex flex-wrap gap-1.5">
                  {icd10Tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded bg-[#E5EEFF] text-[#005087] text-[11px] font-mono font-medium border border-sky-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 block mb-1">SNOMED CT:</span>
                <div className="flex flex-wrap gap-1.5">
                  {snomedTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded bg-teal-50 text-teal-800 text-[11px] font-mono font-medium border border-teal-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Generated SOAP Note & E-Prescription */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-ai rounded-xl p-5 border border-sky-400/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#1769AA]" />
                <h3 className="text-base font-bold text-[#0B1C2E] font-heading">
                  {language === 'hi' ? 'स्वचालित संरचित एसओएपी (SOAP) नोट' : 'Automated Structured SOAP Clinical Note'}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copySoapNote}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-xs"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  {copiedState ? 'Copied!' : 'Copy Note'}
                </button>
              </div>
            </div>

            {/* SOAP Segments */}
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="p-3 rounded-lg bg-white border border-[#E2E8F0]">
                <div className="font-bold text-[#1769AA] uppercase text-xs mb-1 tracking-wider">
                  S — Subjective (रोगी की शिकायत)
                </div>
                <p className="text-slate-800 leading-relaxed">{generatedSoap.subjective}</p>
              </div>

              <div className="p-3 rounded-lg bg-white border border-[#E2E8F0]">
                <div className="font-bold text-[#1769AA] uppercase text-xs mb-1 tracking-wider">
                  O — Objective (जांच एवं टेलीमेट्री निष्कर्ष)
                </div>
                <p className="text-slate-800 leading-relaxed font-mono text-xs">{generatedSoap.objective}</p>
              </div>

              <div className="p-3 rounded-lg bg-white border border-[#E2E8F0]">
                <div className="font-bold text-[#1769AA] uppercase text-xs mb-1 tracking-wider">
                  A — Assessment (नैदानिक मूल्यांकन)
                </div>
                <p className="text-slate-800 leading-relaxed font-semibold">{generatedSoap.assessment}</p>
              </div>

              <div className="p-3 rounded-lg bg-white border border-[#E2E8F0]">
                <div className="font-bold text-[#1769AA] uppercase text-xs mb-1 tracking-wider">
                  P — Plan & Orders (उपचार योजना एवं निर्देश)
                </div>
                <p className="text-slate-800 leading-relaxed whitespace-pre-line">{generatedSoap.plan}</p>
              </div>
            </div>

            {/* Official Indian ABDM Prescription Footer */}
            <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <QrCode className="w-8 h-8 text-slate-800" />
                <div>
                  <span className="font-bold text-slate-800 block">ABDM Health Locker Verified</span>
                  <span className="text-[10px] text-slate-500">Ref: ABDM-PRES-2026-991823</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-semibold text-slate-700 block">Digitally Signed via Doctor Token</span>
                <span className="text-[10px] text-emerald-600 font-bold">NMC Registration Validated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
