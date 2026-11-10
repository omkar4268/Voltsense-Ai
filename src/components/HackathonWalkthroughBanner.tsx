import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  Cpu, 
  ShieldCheck, 
  Sun, 
  CloudRain, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  CheckCircle2,
  HelpCircle,
  Zap,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HackathonWalkthroughBannerProps {
  onTriggerChaos: () => void;
  onApplyScenario: (sc: 'sunny' | 'cloud' | 'night' | 'islanded') => void;
  onModeChange: (mode: 'autonomous' | 'legacy' | 'islanded') => void;
  isCloudChaosActive: boolean;
  controllerMode: string;
}

export const HackathonWalkthroughBanner: React.FC<HackathonWalkthroughBannerProps> = ({
  onTriggerChaos,
  onApplyScenario,
  onModeChange,
  isCloudChaosActive,
  controllerMode,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="glass-vibrant-card specular-rim rounded-3xl p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden font-sans border border-white/12">
      {/* Luminous ambient background accents */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#00F59B]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#22D3EE]/8 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar with expand/collapse */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-[#00F59B]/25 to-[#06B6D4]/20 border border-[#00F59B]/50 text-[#00F59B] shadow-[0_0_20px_rgba(0,245,155,0.35)] shrink-0">
            <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-[#00F59B]/15 border border-[#00F59B]/40 text-[10px] font-mono text-[#00F59B] font-semibold tracking-wider">
                HACKATHON QUICK GUIDE
              </span>
              <h2 className="text-base sm:text-lg font-medium text-white tracking-tight">
                How VoltSense Works: 60-Second Demo & Explanation
              </h2>
            </div>
            <p className="text-xs text-[#9da395] font-light mt-0.5">
              Clear, step-by-step walkthrough designed for hackathon judges, technical evaluators, and video demos
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#cbd0c5] hover:text-white transition-colors cursor-pointer self-start sm:self-center"
        >
          <span>{isExpanded ? 'Hide Guide' : 'Show Walkthrough Guide'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expandable Content Body */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 pt-5 mt-5 border-t border-white/10 relative z-10"
          >
            {/* 3 Clear Problem-Solution-Impact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Step 1: The Problem */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#080d09]/85 border border-amber-500/25 relative overflow-hidden group shadow-inner">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 font-semibold">
                    1. The Real-World Problem
                  </span>
                  <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400">
                    <Flame className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-white mb-1.5">
                  Solar Drops Trigger Dirty Diesel
                </h3>
                <p className="text-xs text-[#9da395] font-light leading-relaxed">
                  Passing clouds cause sudden 80% solar drops. Legacy industrial controllers can't forecast ahead, so they panic and ignite carbon-heavy diesel generators to avoid factory blackouts.
                </p>
                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-amber-300/90">
                  <span>Traditional Microgrids</span>
                  <span className="text-rose-400">High Fuel Burn</span>
                </div>
              </div>

              {/* Step 2: The Edge-AI Innovation */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#080d09]/85 border border-[#00F59B]/30 relative overflow-hidden group shadow-inner">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#00F59B]/15 border border-[#00F59B]/40 text-[#00F59B] font-semibold">
                    2. Edge-AI Breakthrough
                  </span>
                  <div className="p-2 rounded-xl bg-[#00F59B]/15 text-[#00F59B]">
                    <Cpu className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-white mb-1.5">
                  11.4ms Air-Gapped RTOS Dispatch
                </h3>
                <p className="text-xs text-[#9da395] font-light leading-relaxed">
                  VoltSense runs quantized ONNX neural models directly on an offline Raspberry Pi 5. It predicts cloud fronts 24h ahead and modulates battery slew rates in sub-seconds.
                </p>
                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#00F59B]">
                  <span>Zero Cloud Dependence</span>
                  <span>Pure Air-Gap</span>
                </div>
              </div>

              {/* Step 3: Verified Impact */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#080d09]/85 border border-[#22D3EE]/30 relative overflow-hidden group shadow-inner">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#22D3EE]/15 border border-[#22D3EE]/40 text-[#22D3EE] font-semibold">
                    3. Measurable Impact
                  </span>
                  <div className="p-2 rounded-xl bg-[#22D3EE]/15 text-[#22D3EE]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-white mb-1.5">
                  Diesel Suppressed & Battery Ext.
                </h3>
                <p className="text-xs text-[#9da395] font-light leading-relaxed">
                  Diesel backup remains 100% OFF during transient cloud cover. Lithium battery micro-cycling is eliminated, extending pack life by +15.2% (~3.2 extra operating years).
                </p>
                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#22D3EE]">
                  <span>+15.2% Life Extension</span>
                  <span className="text-[#00F59B]">Zero Diesel Used</span>
                </div>
              </div>

            </div>

            {/* Interactive Demo Action Strip (Click to demo live in video!) */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#00F59B]/10 via-[#22D3EE]/10 to-[#FBBF24]/10 border border-white/12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 shadow-inner">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#00F59B] animate-ping" />
                <span className="text-xs font-mono text-white font-medium">
                  Try These 3 Actions Live In Your Hackathon Video:
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Demo Action 1: Cloud Chaos */}
                <button
                  onClick={onTriggerChaos}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all border shadow-sm cursor-pointer ${
                    isCloudChaosActive
                      ? 'bg-amber-500 text-black font-bold border-amber-400 animate-pulse'
                      : 'bg-white/5 hover:bg-white/10 text-amber-300 border-amber-500/40'
                  }`}
                  title="Simulate sudden passing cloud bank (-80% solar)"
                >
                  <CloudRain className="w-3.5 h-3.5" />
                  <span>Demo 1: Trigger Cloud Drop (-80%)</span>
                </button>

                {/* Demo Action 2: Peak Noon Surplus */}
                <button
                  onClick={() => onApplyScenario('sunny')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-white/5 hover:bg-white/10 text-[#00F59B] border border-[#00F59B]/40 transition-all shadow-sm cursor-pointer"
                  title="Simulate full clear-sky solar generation"
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Demo 2: Peak Solar Surplus</span>
                </button>

                {/* Demo Action 3: Compare Legacy Mode */}
                <button
                  onClick={() => onModeChange(controllerMode === 'autonomous' ? 'legacy' : 'autonomous')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all border shadow-sm cursor-pointer ${
                    controllerMode === 'legacy'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                      : 'bg-white/5 hover:bg-white/10 text-[#cbd0c5] border-white/10'
                  }`}
                  title="Switch between Autonomous AI and high-wear Legacy PLC"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    Demo 3: {controllerMode === 'autonomous' ? 'Switch to Legacy PLC (High Wear)' : 'Switch to Autonomous AI'}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
