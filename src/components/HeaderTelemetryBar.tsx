import React from 'react';
import { ControllerMode, MicrogridState } from '../types';
import { 
  CloudRain, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  Sparkles,
  Menu,
  Play,
  Pause
} from 'lucide-react';

interface HeaderTelemetryBarProps {
  state: MicrogridState;
  onModeChange: (mode: ControllerMode) => void;
  onTriggerChaos: () => void;
  onOpenSpecsModal: () => void;
  onToggleMobileMenu?: () => void;
  activeTabTitle?: string;
  isSimRunning?: boolean;
  onToggleSim?: () => void;
}

export const HeaderTelemetryBar: React.FC<HeaderTelemetryBarProps> = ({
  state,
  onModeChange,
  onTriggerChaos,
  onOpenSpecsModal,
  onToggleMobileMenu,
  activeTabTitle = 'Overview',
  isSimRunning = true,
  onToggleSim,
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-[#080D1A]/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 py-3">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        
        {/* Left: Mobile Toggle & Clean Title */}
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
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              {activeTabTitle}
            </h1>
            <p className="text-xs text-slate-400">
              Edge-AI autonomous microgrid predictive dispatch
            </p>
          </div>
        </div>

        {/* Right: Controller Mode + Chaos Test + SPECS Button */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-start md:justify-end">
          
          {/* Controller Mode 3-Way Switcher */}
          <div className="inline-flex p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium">
            <button
              onClick={() => onModeChange('autonomous')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                state.controllerMode === 'autonomous'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Autonomous AI</span>
            </button>
            <button
              onClick={() => onModeChange('legacy')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                state.controllerMode === 'legacy'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Legacy Static</span>
            </button>
            <button
              onClick={() => onModeChange('islanded')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                state.controllerMode === 'islanded'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              <span>Islanded</span>
            </button>
          </div>

          {/* Quick Chaos Stress-Test Button */}
          <button
            onClick={onTriggerChaos}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
              state.isCloudCoverChaosActive
                ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                : 'bg-slate-900 hover:bg-slate-800 text-amber-400 border-amber-500/40'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>
              {state.isCloudCoverChaosActive
                ? `CHAOS (-80%) [${state.cloudChaosCountdown}s]`
                : 'Chaos Test (-80%)'}
            </span>
          </button>

          {/* Simulation Pause / Resume */}
          {onToggleSim && (
            <button
              onClick={onToggleSim}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              title={isSimRunning ? 'Pause Engine' : 'Resume Engine'}
            >
              {isSimRunning ? (
                <Pause className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Play className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </button>
          )}

          {/* SPECS Button */}
          <button
            onClick={onOpenSpecsModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-950 to-blue-950 hover:from-cyan-900 hover:to-blue-900 text-cyan-200 border border-cyan-500/40 transition-all shadow-sm"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Specs</span>
          </button>

        </div>
      </div>
    </header>
  );
};
