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
  Sparkles,
  Menu,
  Activity,
  Play,
  Pause
} from 'lucide-react';

interface HeaderTelemetryBarProps {
  state: MicrogridState;
  onModeChange: (mode: ControllerMode) => void;
  onTriggerChaos: () => void;
  onOpenPitchModal: () => void;
  onToggleMobileMenu?: () => void;
  activeTabTitle?: string;
  isSimRunning?: boolean;
  onToggleSim?: () => void;
}

export const HeaderTelemetryBar: React.FC<HeaderTelemetryBarProps> = ({
  state,
  onModeChange,
  onTriggerChaos,
  onOpenPitchModal,
  onToggleMobileMenu,
  activeTabTitle = 'Microgrid Overview',
  isSimRunning = true,
  onToggleSim,
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-[#070A14]/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 py-3">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        
        {/* Left: Mobile Menu Button + Page Title Breadcrumb */}
        <div className="flex items-center gap-3">
          {onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>VoltSense Edge-AI</span>
              <span>/</span>
              <span className="text-emerald-400 font-bold">{activeTabTitle}</span>
            </div>
            <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
              {activeTabTitle}
              <span className="text-[11px] font-mono font-normal px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Live 1.5s Closed-Loop
              </span>
            </h1>
          </div>
        </div>

        {/* Right: Controller Mode Switcher + Chaos Test + Simulation Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-start lg:justify-end">
          
          {/* Controller Mode 3-Way Switcher */}
          <div className="inline-flex p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium">
            <button
              onClick={() => onModeChange('autonomous')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                state.controllerMode === 'autonomous'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Predictive dynamic routing with cycle-wear dampening"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Autonomous AI</span>
            </button>
            <button
              onClick={() => onModeChange('legacy')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                state.controllerMode === 'legacy'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Reactive threshold rules (benchmark comparisons)"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Legacy Static</span>
            </button>
            <button
              onClick={() => onModeChange('islanded')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                state.controllerMode === 'islanded'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Grid breaker open, isolated microgrid"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              <span>Islanded</span>
            </button>
          </div>

          {/* Quick Chaos Stress-Test Button */}
          <button
            onClick={onTriggerChaos}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
              state.isCloudCoverChaosActive
                ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse shadow-[0_0_20px_rgba(245,158,11,0.5)]'
                : 'bg-slate-900/90 hover:bg-slate-800 text-amber-400 border-amber-500/40 hover:border-amber-400'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>
              {state.isCloudCoverChaosActive
                ? `CHAOS ACTIVE (-80%) [${state.cloudChaosCountdown}s]`
                : 'Cloud Chaos (-80%)'}
            </span>
          </button>

          {/* Simulation Pause / Resume */}
          {onToggleSim && (
            <button
              onClick={onToggleSim}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              title={isSimRunning ? 'Pause Live Simulation' : 'Resume Live Simulation'}
            >
              {isSimRunning ? (
                <Pause className="w-4 h-4 text-amber-400" />
              ) : (
                <Play className="w-4 h-4 text-emerald-400" />
              )}
            </button>
          )}

          {/* Pitch & Specs Modal Button */}
          <button
            onClick={onOpenPitchModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-950/80 to-blue-950/80 hover:from-cyan-900 hover:to-blue-900 text-cyan-200 border border-cyan-500/40 transition-all shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Pitch Specs</span>
          </button>

        </div>
      </div>
    </header>
  );
};
