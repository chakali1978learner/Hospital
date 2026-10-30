import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface EcgWaveformProps {
  heartRate: number;
  rhythm: string;
  isStElevated?: boolean;
}

export const EcgWaveform: React.FC<EcgWaveformProps> = ({
  heartRate,
  rhythm,
  isStElevated = false
}) => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [sweepPos, setSweepPos] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play subtle medical monitor beep on QRS peak
  const playBeep = () => {
    if (!soundEnabled) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(isStElevated ? 880 : 700, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Audio not permitted or interrupted
    }
  };

  useEffect(() => {
    let animId: number;
    let lastBeatTime = 0;
    const intervalMs = (60 / Math.max(heartRate, 40)) * 1000;

    const animate = (time: number) => {
      setSweepPos((prev) => (prev + 1.2) % 400);

      if (time - lastBeatTime > intervalMs) {
        lastBeatTime = time;
        playBeep();
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [heartRate, soundEnabled, isStElevated]);

  // Generate realistic ECG path
  // Standard baseline around Y=35.
  // P wave: bump up to 28
  // Q wave: small dip to 38
  // R wave: sharp spike to 6
  // S wave: dip to 48
  // ST segment: elevated if isStElevated, otherwise flat
  // T wave: broad wave up to 22
  const buildComplex = (xOffset: number, stElev: boolean) => {
    const stY = stElev ? '24' : '35';
    return `M ${xOffset} 35 
      L ${xOffset + 10} 35 
      Q ${xOffset + 15} 27 ${xOffset + 20} 35 
      L ${xOffset + 26} 35 
      L ${xOffset + 28} 39 
      L ${xOffset + 32} 7 
      L ${xOffset + 36} 47 
      L ${xOffset + 40} ${stY} 
      L ${xOffset + 50} ${stY} 
      Q ${xOffset + 60} ${stElev ? '16' : '23'} ${xOffset + 70} 35 
      L ${xOffset + 85} 35`;
  };

  // Build full repeating ECG trace across 400px width
  const ecgPath = [
    buildComplex(0, isStElevated),
    buildComplex(85, isStElevated),
    buildComplex(170, isStElevated),
    buildComplex(255, isStElevated),
    buildComplex(340, isStElevated)
  ].join(' ');

  return (
    <div className="bg-[#0B1C2E] rounded-xl p-3.5 border border-sky-900/50 relative overflow-hidden shadow-inner text-white">
      {/* Background medical grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(14, 165, 233, 0.4) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(14, 165, 233, 0.4) 1px, transparent 1px)`,
          backgroundSize: '16px 16px'
        }}
      />

      {/* Header bar */}
      <div className="flex items-center justify-between relative z-10 mb-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs font-bold text-emerald-400 tracking-wider">
            LEAD II • CONTINUOUS ECG TELEMETRY
          </span>
          <span className="text-[11px] text-sky-200/70 font-mono hidden sm:inline">
            25 mm/s • 10 mm/mV • Filter: 0.05-150Hz
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1 rounded text-xs flex items-center gap-1 transition-colors ${
              soundEnabled
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
            }`}
            title={soundEnabled ? 'Mute QRS beep' : 'Enable QRS beep sound'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="text-[10px] hidden sm:inline">{soundEnabled ? 'BEEP ON' : 'MUTE'}</span>
          </button>
        </div>
      </div>

      {/* Waveform Area */}
      <div className="relative h-20 w-full overflow-hidden my-1">
        <svg
          viewBox="0 0 400 60"
          className="w-full h-full preserve-3d"
          preserveAspectRatio="none"
        >
          {/* Main glowing ECG trace line */}
          <path
            d={ecgPath}
            fill="none"
            stroke={isStElevated ? '#F87171' : '#34D399'}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]"
          />

          {/* Sweeper cursor */}
          <line
            x1={sweepPos}
            y1="0"
            x2={sweepPos}
            y2="60"
            stroke="#38BDF8"
            strokeWidth="2"
            opacity="0.8"
          />
          {/* Sweeper shadow mask to simulate oscilloscope persistence */}
          <rect
            x={sweepPos}
            y="0"
            width="35"
            height="60"
            fill="url(#fadeGradient)"
          />

          <defs>
            <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B1C2E" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0B1C2E" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Rhythm Info Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
        <div className="flex items-center gap-2">
          {isStElevated ? (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-500/40 text-[11px] font-bold tracking-wide">
              <AlertTriangle className="w-3 h-3 text-red-400 animate-pulse" />
              CRITICAL: {rhythm}
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-[11px] font-medium">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              {rhythm}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-slate-400">
            PR: <strong className="text-white">162ms</strong>
          </span>
          <span className="text-slate-400">
            QRS: <strong className="text-white">88ms</strong>
          </span>
          <span className="text-slate-400">
            QTc: <strong className={isStElevated ? 'text-amber-400' : 'text-white'}>
              {isStElevated ? '478ms (Prolonged)' : '412ms'}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
};
