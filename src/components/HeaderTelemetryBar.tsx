import React from 'react';
import { ControllerMode, MicrogridState } from '../types';
import { 
  Cpu, 
  Zap, 
  CloudRain, 
  AlertTriangle, 
  ShieldCheck, 
  BookOpen, 
  WifiOff, 
  Radio, 
  Sparkles 
} from 'lucide-react';

interface HeaderTelemetryBarProps {
  state: MicrogridState;
  onModeChange: (mode: ControllerMode) => void;
  onTriggerChaos: () => void;
  onOpenPitchModal: () => void;
}

export const HeaderTelemetryBar: React.FC<HeaderTelemetryBarProps> = ({
  state,
  onModeChange,
  onTriggerChaos,
  onOpenPitchModal,
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-[#070A12]/95 backdrop-blur-md sticky top-0 z-40 px-4 py-2.5">
      <div className="max-w-[1720px] mx-auto flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                VoltSense <span className="text-emerald-400 font-mono">AI</span>
              </h1>
              <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                SCADA v2.4
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Edge-AI predictive power dispatch & battery optimization for sustainable microgrids
            </p>
          </div>
        </div>

        {/* Live Hardware & Edge Telemetry Pill */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-1.5 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold text-slate-200">Edge Node:</span>
            <span className="text-cyan-300">RPi 5 + ESP32</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>Runtime:</span>
            <span className="text-emerald-400 font-medium">ONNX (XGBoost/LSTM)</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Latency:</span>
            <span className="text-emerald-300 font-bold">{state.inferenceLatencyMs}ms</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <WifiOff className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-purple-300">Cloud Dep: 0% (Autonomous)</span>
          </div>
        </div>

        {/* Action Controls & Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2.5 w-full xl:w-auto justify-end">
          
          {/* Controller Mode 3-Way Switcher */}
          <div className="inline-flex p-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-medium">
            <button
              onClick={() => onModeChange('autonomous')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                state.controllerMode === 'autonomous'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Dynamic predictive routing + cycle-wear protection"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Autonomous Edge-AI</span>
            </button>
            <button
              onClick={() => onModeChange('legacy')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                state.controllerMode === 'legacy'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Reactive rules that trigger diesel late and wear out battery"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Legacy Static</span>
            </button>
            <button
              onClick={() => onModeChange('islanded')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                state.controllerMode === 'islanded'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Disconnects from main grid, prioritizes emergency loads"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              <span>Islanded Grid</span>
            </button>
          </div>

          {/* Quick Chaos Stress-Test Button */}
          <button
            onClick={onTriggerChaos}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border ${
              state.isCloudCoverChaosActive
                ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse shadow-[0_0_20px_rgba(245,158,11,0.5)]'
                : 'bg-slate-900 hover:bg-slate-800 text-amber-400 border-amber-500/40 hover:border-amber-400 shadow-sm'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>
              {state.isCloudCoverChaosActive
                ? `CHAOS ACTIVE (-80% Solar) [${state.cloudChaosCountdown}s]`
                : 'Cloud Cover Chaos (-80%)'}
            </span>
          </button>

          {/* Pitch Deck / Architecture Specs Modal Button */}
          <button
            onClick={onOpenPitchModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-900/60 to-blue-900/60 hover:from-cyan-800/80 hover:to-blue-800/80 text-cyan-200 border border-cyan-500/40 transition-all shadow-[0_0_12px_rgba(6,182,212,0.2)]"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Pitch & Architecture</span>
          </button>

        </div>
      </div>
    </header>
  );
};
