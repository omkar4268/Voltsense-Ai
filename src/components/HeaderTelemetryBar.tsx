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
  Pause,
  Cpu,
  Radio
} from 'lucide-react';
import { motion } from 'framer-motion';

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
    <header className="border-b border-slate-800/80 bg-[#080D1A]/95 backdrop-blur-xl sticky top-0 z-30 px-4 sm:px-6 py-3 transition-colors">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        
        {/* Left: Mobile Menu & Clean Page Title */}
        <div className="flex items-center gap-3">
          {onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {activeTabTitle}
                </h1>
                <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Edge-AI Active</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Predictive microgrid power dispatch & electrochemical battery protection
              </p>
            </div>
          </div>
        </div>

        {/* Right: Controller Mode Switcher + Chaos Test + SPECS Button */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-start lg:justify-end">
          
          {/* Mode Switcher with Framer Motion layout pill */}
          <div className="inline-flex p-1 bg-slate-950/90 border border-slate-800 rounded-xl text-xs font-medium relative">
            <button
              onClick={() => onModeChange('autonomous')}
              className={`relative px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 z-10 ${
                state.controllerMode === 'autonomous' ? 'text-emerald-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {state.controllerMode === 'autonomous' && (
                <motion.div
                  layoutId="headerModePill"
                  className="absolute inset-0 bg-emerald-500/20 border border-emerald-500/40 rounded-lg -z-10 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Autonomous AI</span>
            </button>

            <button
              onClick={() => onModeChange('legacy')}
              className={`relative px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 z-10 ${
                state.controllerMode === 'legacy' ? 'text-amber-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {state.controllerMode === 'legacy' && (
                <motion.div
                  layoutId="headerModePill"
                  className="absolute inset-0 bg-amber-500/20 border border-amber-500/40 rounded-lg -z-10 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Legacy Static</span>
            </button>

            <button
              onClick={() => onModeChange('islanded')}
              className={`relative px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 z-10 ${
                state.controllerMode === 'islanded' ? 'text-rose-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {state.controllerMode === 'islanded' && (
                <motion.div
                  layoutId="headerModePill"
                  className="absolute inset-0 bg-rose-500/20 border border-rose-500/40 rounded-lg -z-10 shadow-[0_0_12px_rgba(239,68,68,0.25)]"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              <span>Islanded</span>
            </button>
          </div>

          {/* Quick Chaos Stress-Test Trigger */}
          <button
            onClick={onTriggerChaos}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
              state.isCloudCoverChaosActive
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)] animate-pulse'
                : 'bg-slate-900/80 hover:bg-slate-900 text-amber-400 border-amber-500/30 hover:border-amber-400/60 shadow-sm'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>
              {state.isCloudCoverChaosActive
                ? `CLOUD CHAOS (-80%) [${state.cloudChaosCountdown}s]`
                : 'Cloud Drop (-80%)'}
            </span>
          </button>

          {/* Simulation Play / Pause Button */}
          {onToggleSim && (
            <button
              onClick={onToggleSim}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-all"
              title={isSimRunning ? 'Pause Engine Simulation' : 'Resume Engine Simulation'}
            >
              {isSimRunning ? (
                <Pause className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Play className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </button>
          )}

          {/* Dedicated "Specs" Button */}
          <button
            onClick={onOpenSpecsModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 hover:from-cyan-900 hover:to-blue-900 text-cyan-200 border border-cyan-500/40 hover:border-cyan-400/80 transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] group"
          >
            <FileText className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Specs</span>
          </button>

        </div>
      </div>
    </header>
  );
};
