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
  onGoHome?: () => void;
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
  onGoHome,
}) => {
  return (
    <header className="border-b border-white/10 bg-[#161913]/95 backdrop-blur-xl sticky top-0 z-30 px-4 sm:px-6 py-3 transition-colors">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        
        {/* Left: Mobile Menu & Clean Page Title */}
        <div className="flex items-center gap-3">
          {onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 rounded-xl bg-[#20241b] border border-white/10 text-[#9da395] hover:text-white transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-light text-white tracking-tight">
                  {activeTabTitle}
                </h1>
                <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#10b981]/15 border border-[#34d399]/30 text-[10px] font-mono text-[#86efac]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-ping" />
                  <span>Edge-AI Active</span>
                </div>
              </div>
              <p className="text-xs text-[#9da395] hidden sm:block font-light">
                Predictive microgrid power dispatch & electrochemical battery protection
              </p>
            </div>
          </div>
        </div>

        {/* Right: Controller Mode Switcher + Chaos Test + SPECS Button */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-start lg:justify-end">
          
          {/* Mode Switcher with Framer Motion layout pill */}
          <div className="inline-flex p-1 bg-[#121510] border border-white/10 rounded-xl text-xs font-light relative">
            <button
              onClick={() => onModeChange('autonomous')}
              className={`relative px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 z-10 ${
                state.controllerMode === 'autonomous' ? 'text-[#86efac] font-normal' : 'text-[#9da395] hover:text-white'
              }`}
            >
              {state.controllerMode === 'autonomous' && (
                <motion.div
                  layoutId="headerModePill"
                  className="absolute inset-0 bg-[#10b981]/20 border border-[#34d399]/40 rounded-lg -z-10 shadow-[0_0_12px_rgba(52,211,153,0.25)]"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <Sparkles className="w-3.5 h-3.5 text-[#34d399]" />
              <span>Autonomous AI</span>
            </button>

            <button
              onClick={() => onModeChange('legacy')}
              className={`relative px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 z-10 ${
                state.controllerMode === 'legacy' ? 'text-amber-300 font-normal' : 'text-[#9da395] hover:text-white'
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
                state.controllerMode === 'islanded' ? 'text-rose-300 font-normal' : 'text-[#9da395] hover:text-white'
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
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
              state.isCloudCoverChaosActive
                ? 'bg-amber-500 text-[#121510] border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)] animate-pulse font-bold'
                : 'bg-[#20241b] hover:bg-[#282e22] text-amber-300 border-amber-500/30 hover:border-amber-400/60 shadow-sm'
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
              className="p-2 rounded-xl bg-[#20241b] hover:bg-[#282e22] border border-white/10 text-[#cbd0c5] hover:text-white transition-all"
              title={isSimRunning ? 'Pause Engine Simulation' : 'Resume Engine Simulation'}
            >
              {isSimRunning ? (
                <Pause className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Play className="w-3.5 h-3.5 text-[#34d399]" />
              )}
            </button>
          )}

          {/* Commercial Home Button */}
          {onGoHome && (
            <button
              onClick={onGoHome}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-light bg-[#20241b] hover:bg-[#282e22] border border-[#34d399]/40 text-[#86efac] hover:text-white transition-all shadow-sm cursor-pointer"
              title="Return to Living Green Homepage"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#34d399]" />
              <span>← Living Green Home</span>
            </button>
          )}

          {/* Dedicated "Specs" Button */}
          <button
            onClick={onOpenSpecsModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-[#20241b] hover:bg-[#282e22] text-[#f2f3ef] border border-white/10 hover:border-[#34d399]/40 transition-all shadow-sm group"
          >
            <FileText className="w-4 h-4 text-[#34d399] group-hover:scale-110 transition-transform" />
            <span>Specs</span>
          </button>

        </div>
      </div>
    </header>
  );
};
