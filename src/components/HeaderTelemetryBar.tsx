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
  Radio,
  ArrowLeft,
  Zap,
  Activity
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
    <header className="border-b border-white/10 bg-[#0c120e]/85 backdrop-blur-2xl sticky top-0 z-30 px-4 sm:px-6 py-3 transition-colors specular-rim shadow-xl">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 max-w-[1700px] mx-auto w-full">
        
        {/* Left: Mobile Menu & Clean Page Title */}
        <div className="flex items-center gap-3">
          {onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 rounded-xl bg-white/[0.05] border border-white/10 text-[#9da395] hover:text-white transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-base sm:text-lg font-light text-white tracking-tight flex items-center gap-2">
                  <span>{activeTabTitle}</span>
                </h1>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00F59B]/15 border border-[#00F59B]/40 text-[10px] font-mono text-[#00F59B] shadow-[0_0_12px_rgba(0,245,155,0.3)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B] animate-ping" />
                  <span className="font-semibold">Edge-AI Active</span>
                </div>
              </div>
              <p className="text-xs text-[#9da395] hidden sm:flex items-center gap-2 font-light">
                <span>Autonomous dispatch & electrochemical battery life protection</span>
                <span>·</span>
                <span className="text-[#34D399] font-mono text-[11px]">{state.simulatedClock}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right: Controller Mode Switcher + Chaos Test + SPECS Button */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-start lg:justify-end">
          
          {/* Mode Switcher with Framer Motion layout pill */}
          <div className="inline-flex p-1 bg-[#080d09] border border-white/10 rounded-2xl text-xs font-light relative shadow-inner">
            <button
              onClick={() => onModeChange('autonomous')}
              className={`relative px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 z-10 ${
                state.controllerMode === 'autonomous' ? 'text-white font-medium' : 'text-[#9da395] hover:text-white'
              }`}
            >
              {state.controllerMode === 'autonomous' && (
                <motion.div
                  layoutId="headerModePill"
                  className="absolute inset-0 bg-gradient-to-r from-[#00F59B]/25 to-[#34D399]/20 border border-[#00F59B]/60 rounded-xl -z-10 shadow-[0_0_20px_rgba(0,245,155,0.4)]"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <Sparkles className="w-3.5 h-3.5 text-[#00F59B]" />
              <span>Autonomous AI</span>
            </button>

            <button
              onClick={() => onModeChange('legacy')}
              className={`relative px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 z-10 ${
                state.controllerMode === 'legacy' ? 'text-amber-200 font-medium' : 'text-[#9da395] hover:text-white'
              }`}
            >
              {state.controllerMode === 'legacy' && (
                <motion.div
                  layoutId="headerModePill"
                  className="absolute inset-0 bg-gradient-to-r from-amber-500/25 to-yellow-500/20 border border-amber-500/60 rounded-xl -z-10 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Legacy Static</span>
            </button>

            <button
              onClick={() => onModeChange('islanded')}
              className={`relative px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 z-10 ${
                state.controllerMode === 'islanded' ? 'text-rose-200 font-medium' : 'text-[#9da395] hover:text-white'
              }`}
            >
              {state.controllerMode === 'islanded' && (
                <motion.div
                  layoutId="headerModePill"
                  className="absolute inset-0 bg-gradient-to-r from-rose-500/25 to-red-500/20 border border-rose-500/60 rounded-xl -z-10 shadow-[0_0_20px_rgba(244,63,94,0.4)]"
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
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all border shadow-sm ${
              state.isCloudCoverChaosActive
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-[#0c120e] border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.7)] animate-pulse font-bold'
                : 'bg-white/[0.04] hover:bg-white/[0.08] text-amber-300 border-amber-500/30 hover:border-amber-400/60 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]'
            }`}
          >
            <CloudRain className={`w-3.5 h-3.5 ${state.isCloudCoverChaosActive ? 'animate-bounce' : ''}`} />
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
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[#cbd0c5] hover:text-white transition-all shadow-sm"
              title={isSimRunning ? 'Pause Engine Simulation' : 'Resume Engine Simulation'}
            >
              {isSimRunning ? (
                <Pause className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Play className="w-3.5 h-3.5 text-[#00F59B]" />
              )}
            </button>
          )}

          {/* Return to Living Home Button */}
          {onGoHome && (
            <button
              onClick={onGoHome}
              className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-light bg-gradient-to-r from-[#00F59B]/15 to-[#06B6D4]/15 hover:from-[#00F59B]/25 hover:to-[#06B6D4]/25 border border-[#00F59B]/40 text-[#6EE7B7] hover:text-white transition-all shadow-[0_0_15px_rgba(0,245,155,0.2)] cursor-pointer group specular-rim"
              title="Return to Living Green Commercial Homepage"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#00F59B] group-hover:-translate-x-0.5 transition-transform" />
              <span>Living Home</span>
            </button>
          )}

          {/* Dedicated "Specs" Modal Button */}
          <button
            onClick={onOpenSpecsModal}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-medium bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/12 hover:border-[#00F59B]/50 transition-all shadow-sm group specular-rim"
          >
            <FileText className="w-3.5 h-3.5 text-[#00F59B] group-hover:scale-110 transition-transform" />
            <span>Specs</span>
          </button>

        </div>
      </div>
    </header>
  );
};
