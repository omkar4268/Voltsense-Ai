import React, { useState } from 'react';
import { 
  Zap, 
  Sun, 
  BatteryCharging, 
  ShieldCheck, 
  TrendingUp, 
  Leaf, 
  DollarSign, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Radio, 
  FileText, 
  ChevronRight, 
  Play, 
  Sliders, 
  Globe, 
  Lock, 
  Activity, 
  Box, 
  ChevronDown, 
  Server,
  CloudRain,
  Moon,
  Compass,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SylvaHero } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";
import { MicrogridState } from '../types';
import { PowerTopologyTwin } from './PowerTopologyTwin';

interface LandingPageProps {
  onLaunchConsole: (initialTab?: 'overview' | 'forecast' | 'battery' | 'sandbox' | 'ledger') => void;
  onOpenSpecs: () => void;
  state: MicrogridState;
  onApplyScenario: (sc: 'sunny' | 'cloud' | 'night' | 'islanded') => void;
}

/**
 * Living Green 3D Shader Scene using DesignCode ThreeUI SylvaHero
 */
export function Scene() {
  return (
    <div className="shader-frame">
      <SylvaHero
        variant="living-green"
        headingFont="lexend"
        bodyFont="lexend"
        headingWeight="300"
        bodyWeight="300"
        primaryColor="#ffffff"
        headingSize={63}
        bodySize={16.5}
        headingLetterSpacing={-0.006}
      />
    </div>
  );
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchConsole,
  onOpenSpecs,
  state,
  onApplyScenario,
}) => {
  // ROI Calculator state
  const [facilitySizeKW, setFacilitySizeKW] = useState<number>(150);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Derived ROI metrics based on facility load
  const annualDieselSavedUSD = Math.round(facilitySizeKW * 280);
  const annualBatterySavingsUSD = Math.round(facilitySizeKW * 190);
  const annualTotalSavingsUSD = annualDieselSavedUSD + annualBatterySavingsUSD;
  const annualCo2SavedTons = Math.round(facilitySizeKW * 1.45);
  const paybackMonths = Math.max(4.2, (8.5 - (facilitySizeKW / 300) * 2)).toFixed(1);

  const faqs = [
    {
      q: "Does VoltSense AI require an active internet connection?",
      a: "No. VoltSense AI is engineered for mission-critical, 100% air-gapped environments. The ONNX-quantized BiLSTM model and RTOS controller execute entirely on local Raspberry Pi 5 + ESP32 edge hardware with sub-12ms latency, ensuring zero cloud dependency or vulnerability."
    },
    {
      q: "How does the Living Green algorithm protect battery warranties?",
      a: "VoltSense AI embeds Rainflow cycle-counting and dynamic slew-rate limiting (12.5 kW/s). It dampens destructive shallow reversals, prevents thermal hotspots, and keeps Depth of Discharge in the optimal buffer, extending LFP/NMC battery life by +15.2%."
    },
    {
      q: "Can VoltSense AI interface with legacy microgrid inverters and PLCs?",
      a: "Yes. VoltSense AI communicates via standard industrial Modbus TCP/RTU, DNP3, and IEC 61850 protocols. It functions as an intelligent dispatch coprocessor for existing inverters (SMA, Schneider, Sungrow, Tesla Megapack) without requiring hardware replacements."
    },
    {
      q: "What happens during severe cloud transient drops or grid blackouts?",
      a: "The ensemble inference engine detects solar irradiance collapse within 11.4ms. It preemptively ramps battery inverter dispatch before bus frequency deviates, preventing voltage sags and keeping diesel generators suppressed."
    }
  ];

  const functionalModules = [
    {
      id: 'overview' as const,
      title: 'Power Topology Twin',
      desc: 'Interactive 4-station real-time vector flows between Solar, BESS, Grid & Facility.',
      icon: Layers,
      tag: 'Real-Time Vector',
      color: 'text-emerald-400',
      bgGlow: 'hover:border-emerald-500/50 hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]',
    },
    {
      id: 'forecast' as const,
      title: '24-Hour AI Forecast',
      desc: '96-epoch rolling forecast with BiLSTM ensemble and 3D solar flux visualization.',
      icon: TrendingUp,
      tag: '3.12% MAPE Accuracy',
      color: 'text-teal-400',
      bgGlow: 'hover:border-teal-500/50 hover:shadow-[0_10px_30px_rgba(45,212,191,0.2)]',
    },
    {
      id: 'battery' as const,
      title: 'Battery Longevity Model',
      desc: 'Rainflow cycle-wear mitigation, thermal buffering, and 10-year degradation curves.',
      icon: BatteryCharging,
      tag: '+15.2% Asset Life',
      color: 'text-green-300',
      bgGlow: 'hover:border-green-400/50 hover:shadow-[0_10px_30px_rgba(74,222,128,0.2)]',
    },
    {
      id: 'sandbox' as const,
      title: 'Live Sandbox & Chaos Lab',
      desc: 'Stress-test irradiance collapse (-80%), facility peak surges, and storm horizons.',
      icon: Sliders,
      tag: 'Instant Simulation',
      color: 'text-amber-400',
      bgGlow: 'hover:border-amber-500/50 hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]',
    },
    {
      id: 'ledger' as const,
      title: 'Carbon & ESG Audit Log',
      desc: 'Cryptographically verifiable ledger of avoided fuel, carbon credits, and CSV exports.',
      icon: Database,
      tag: 'Scope 1 & 2 Auditable',
      color: 'text-emerald-300',
      bgGlow: 'hover:border-emerald-400/50 hover:shadow-[0_10px_30px_rgba(52,211,153,0.2)]',
    },
    {
      id: 'specs' as const,
      title: 'Full Engineering Specs',
      desc: 'Hardware BOM, mathematical formulation, Modbus register maps, and system schematics.',
      icon: FileText,
      tag: 'Complete Math & BOM',
      color: 'text-slate-200',
      bgGlow: 'hover:border-slate-400/50 hover:shadow-[0_10px_30px_rgba(255,255,255,0.15)]',
    },
  ];

  return (
    <div className="min-h-screen bg-[#161913] text-[#F2F3EF] font-sans selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-hidden">
      
      {/* ── LIVING GREEN AMBIENT LIGHT POOLS & TEXTURES ── */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[70rem] h-[35rem] bg-gradient-to-b from-[#34d399]/12 via-[#10b981]/8 to-transparent rounded-full blur-[180px] pointer-events-none -z-10 animate-float-drift" />
      <div className="fixed top-1/3 right-0 w-[42rem] h-[42rem] bg-[#86efac]/8 rounded-full blur-[190px] pointer-events-none -z-10 animate-float-drift-reverse" />
      <div className="fixed bottom-0 left-0 w-[45rem] h-[30rem] bg-[#22c55e]/8 rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Subtle living-green grid rule */}
      <div 
        className="fixed inset-0 opacity-[0.06] pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(to right, #86efac 1px, transparent 1px), linear-gradient(to bottom, #86efac 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
        }}
      />

      {/* ── TOP LIVING-GREEN FLOATING NAVBAR ── */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#161913]/90 border-b border-white/10 px-4 sm:px-8 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo in Lexend Living Green */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-[#10b981]/30 to-[#34d399]/20 border border-[#34d399]/40 shadow-[0_0_20px_rgba(52,211,153,0.3)] text-[#34d399]">
              <Leaf className="w-5 h-5 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#34d399] animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-light text-xl tracking-tight text-white font-sans">
                  VoltSense <span className="text-[#34d399] font-normal">AI</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#10b981]/15 border border-[#34d399]/30 text-[#86efac] font-medium">
                  Sylva Living Green
                </span>
              </div>
              <span className="text-[11px] text-[#9da395] font-light hidden sm:block">
                Autonomous Clean Energy Microgrid Operating System
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-light text-[#cbd0c5]">
            <a href="#living-world" className="hover:text-[#34d399] transition-colors">3D Living World</a>
            <a href="#navigation-hub" className="hover:text-[#86efac] transition-colors">Navigation Hub</a>
            <a href="#features" className="hover:text-[#34d399] transition-colors">Core Systems</a>
            <a href="#simulator" className="hover:text-[#a7f3d0] transition-colors">Simulator</a>
            <a href="#roi-yield" className="hover:text-[#fde047] transition-colors">Clean Yield</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSpecs}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-light bg-[#20241b] hover:bg-[#2a3024] border border-white/10 text-[#f2f3ef] transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-[#34d399]" />
              <span>Specs</span>
            </button>

            <button
              onClick={() => onLaunchConsole('overview')}
              className="relative group overflow-hidden px-4 sm:px-5 py-2.5 rounded-xl text-xs font-medium bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#86efac] hover:opacity-95 text-[#121510] transition-all shadow-[0_0_25px_rgba(52,211,153,0.35)] flex items-center gap-2 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-1.5 font-medium">
                <span>Enter SCADA Console</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* ── SECTION 1: LIVING GREEN 3D HERO (DESIGNCODE THREEUI SYLVA HERO) ── */}
      <section id="living-world" className="relative pt-10 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
        
        {/* Floating Release Pill */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#20241b]/90 border border-[#34d399]/30 text-xs font-light text-[#86efac] shadow-[0_0_25px_rgba(52,211,153,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#34d399]" />
            <span>Living Green Variant · ThreeUI 3D Shader Architecture</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
          </motion.div>
        </div>

        {/* Hero Title & Ethos */}
        <div className="text-center max-w-4xl mx-auto space-y-5 mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.12]"
          >
            Into the{' '}
            <span className="bg-gradient-to-r from-[#86efac] via-[#34d399] to-[#10b981] bg-clip-text text-transparent font-normal">
              Living World
            </span>{' '}
            of Clean Power
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-xl text-[#cbd0c5] max-w-2xl mx-auto font-light leading-relaxed"
          >
            Restoring energy independence through patient edge design, autonomous solar dispatch, and intelligent battery longevity on air-gapped hardware.
          </motion.p>

          {/* Quick Hero CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <button
              onClick={() => onLaunchConsole('overview')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-medium bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#86efac] hover:opacity-95 text-[#121510] transition-all shadow-[0_0_30px_rgba(52,211,153,0.35)] flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current text-[#121510]" />
              <span>Enter SCADA Console</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#navigation-hub"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl text-sm font-light bg-[#20241b] hover:bg-[#2a3024] border border-white/10 hover:border-[#34d399]/40 text-[#f2f3ef] transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#34d399]" />
              <span>Explore Functional Modules</span>
            </a>
          </motion.div>
        </div>

        {/* ── THE EXACT SYLVA HERO 3D SCENE COMPONENT ── */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="relative w-full"
        >
          <Scene />
        </motion.div>

        {/* 4 Living-Green Credibility Tickers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto font-mono text-left">
          <div className="p-4 rounded-2xl bg-[#20241b]/70 border border-white/10">
            <span className="text-[11px] text-[#9da395] block">Local Edge Latency</span>
            <span className="text-xl sm:text-2xl font-light text-[#34d399]">11.4 ms</span>
            <span className="text-[10px] text-[#7c8177] block font-sans">Raspberry Pi 5 RTOS</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#20241b]/70 border border-white/10">
            <span className="text-[11px] text-[#9da395] block">Horizon Forecast</span>
            <span className="text-xl sm:text-2xl font-light text-[#86efac]">3.12% MAPE</span>
            <span className="text-[10px] text-[#7c8177] block font-sans">96-interval BiLSTM</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#20241b]/70 border border-white/10">
            <span className="text-[11px] text-[#9da395] block">Battery Life Guard</span>
            <span className="text-xl sm:text-2xl font-light text-[#a7f3d0]">+15.2%</span>
            <span className="text-[10px] text-[#7c8177] block font-sans">Rainflow dampened</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#20241b]/70 border border-white/10">
            <span className="text-[11px] text-[#9da395] block">Diesel Suppression</span>
            <span className="text-xl sm:text-2xl font-light text-[#fde047]">28.4%</span>
            <span className="text-[10px] text-[#7c8177] block font-sans">Zero idle runtime</span>
          </div>
        </div>

      </section>

      {/* ── SECTION 2: SEPARATE FRONT PAGE NAVIGATION HUB ── */}
      <section id="navigation-hub" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-[#34d399] px-3 py-1 rounded-full bg-[#10b981]/15 border border-[#34d399]/30">
            Interactive Navigation Hub
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Explore All Functional Systems
          </h2>
          <p className="text-[#9da395] text-sm sm:text-base font-light">
            VoltSense AI divides microgrid operations into specialized modules. Select any system below to launch directly into its dedicated functional page.
          </p>
        </div>

        {/* 6 High-Fidelity Living Green Module Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {functionalModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.id}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => {
                  if (mod.id === 'specs') {
                    onOpenSpecs();
                  } else {
                    onLaunchConsole(mod.id);
                  }
                }}
                className={`p-6 sm:p-7 rounded-3xl bg-[#20241b]/80 border border-white/10 ${mod.bgGlow} transition-all flex flex-col justify-between group cursor-pointer`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-2xl bg-[#2a3024] border border-white/10 ${mod.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#161913] border border-white/10 text-[#9da395]">
                      {mod.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-normal text-white group-hover:text-[#34d399] transition-colors">
                    {mod.title}
                  </h3>

                  <p className="text-[#9da395] text-xs sm:text-sm font-light leading-relaxed">
                    {mod.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#cbd0c5] group-hover:text-white transition-colors">
                  <span className="font-light">Launch Operational Interface</span>
                  <ArrowRight className="w-4 h-4 text-[#34d399] group-hover:translate-x-1.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </section>

      {/* ── SECTION 3: LIVING GREEN BENTO GRID SHOWCASE ── */}
      <section id="features" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-[#86efac] px-3 py-1 rounded-full bg-[#10b981]/15 border border-[#34d399]/30">
            Architectural Excellence
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Engineered for Ecological Stewardship
          </h2>
          <p className="text-[#9da395] text-sm sm:text-base font-light">
            Traditional industrial controllers use crude, fossil-first relays. VoltSense AI models electrochemistry, thermodynamics, and atmospheric photons in real-time.
          </p>
        </div>

        {/* Bento Grid in Living Green palette */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Item 1: Large Span */}
          <div className="md:col-span-2 p-7 sm:p-9 rounded-3xl bg-[#20241b]/80 border border-white/10 hover:border-[#34d399]/40 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-[#2a3024] border border-white/10 text-[#34d399] w-fit">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-normal text-white group-hover:text-[#34d399] transition-colors">
                Sub-Second BiLSTM Predictive Dispatch
              </h3>
              <p className="text-[#9da395] text-sm font-light leading-relaxed max-w-xl">
                Traditional SCADA takes 15 minutes to adjust setpoints. VoltSense AI’s quantized ONNX ensemble calculates power demand across 96 future intervals and dispatches in <strong>11.4 milliseconds</strong>, instantly stabilizing voltage.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#161913] border border-white/10 text-xs font-mono">
              <div>
                <span className="text-[#7c8177] block">Latency</span>
                <span className="text-[#34d399] font-light text-base">11.4 ms</span>
              </div>
              <div>
                <span className="text-[#7c8177] block">Jitter</span>
                <span className="text-[#86efac] font-light text-base">±0.3 ms</span>
              </div>
              <div>
                <span className="text-[#7c8177] block">Model Size</span>
                <span className="text-[#f2f3ef] font-light text-base">4.2 MB INT8</span>
              </div>
            </div>
          </div>

          {/* Bento Item 2: Battery Wear Protection */}
          <div className="p-7 sm:p-9 rounded-3xl bg-[#20241b]/80 border border-white/10 hover:border-[#34d399]/40 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-[#2a3024] border border-white/10 text-[#86efac] w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-normal text-white group-hover:text-[#86efac] transition-colors">
                Electrochemical Battery Guardian
              </h3>
              <p className="text-[#9da395] text-sm font-light leading-relaxed">
                Rainflow cycle-counting dampens destructive shallow reversals and enforces strict slew-rate limits (12.5 kW/s), extending battery asset lifespan by <strong>+15.2%</strong>.
              </p>
            </div>

            <div className="mt-8 p-3 rounded-2xl bg-[#161913] border border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-[#9da395]">Micro-Cycles Suppressed:</span>
              <span className="text-[#34d399] font-light text-sm">142 today</span>
            </div>
          </div>

          {/* Bento Item 3: 100% Offline Air-Gapped */}
          <div className="p-7 sm:p-9 rounded-3xl bg-[#20241b]/80 border border-white/10 hover:border-[#34d399]/40 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-[#2a3024] border border-white/10 text-[#a7f3d0] w-fit">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-normal text-white group-hover:text-[#a7f3d0] transition-colors">
                100% Air-Gapped & Offline
              </h3>
              <p className="text-[#9da395] text-sm font-light leading-relaxed">
                Zero cloud dependencies. No recurring API tokens, no vendor lock-in, and zero external attack surface for mission-critical industrial substations.
              </p>
            </div>

            <div className="mt-8 p-3 rounded-2xl bg-[#161913] border border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-[#9da395]">Hardware:</span>
              <span className="text-[#86efac] font-light text-sm">RPi 5 + ESP32 RTOS</span>
            </div>
          </div>

          {/* Bento Item 4: Large Span (Diesel Suppression & ESG) */}
          <div className="md:col-span-2 p-7 sm:p-9 rounded-3xl bg-[#20241b]/80 border border-white/10 hover:border-[#34d399]/40 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-[#2a3024] border border-white/10 text-[#fde047] w-fit">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-normal text-white group-hover:text-[#fde047] transition-colors">
                Automated Diesel Generator Suppression & Carbon Accounting
              </h3>
              <p className="text-[#9da395] text-sm font-light leading-relaxed max-w-xl">
                Instead of running diesel generators as a blunt buffer, VoltSense AI uses battery ramp margins to keep generators off. Generates cryptographically verifiable CSV & JSON emissions ledgers.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#161913] border border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#34d399]" />
                <span className="text-[#cbd0c5]">28.4% Diesel Hours Reduced</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#86efac]" />
                <span className="text-[#cbd0c5]">Scope 1 & 2 Automated Audit Export</span>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* ── SECTION 4: INTERACTIVE 1-CLICK SIMULATOR ── */}
      <section id="simulator" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/10">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-[#34d399] px-3 py-1 rounded-full bg-[#10b981]/15 border border-[#34d399]/30">
            Live Interactive Simulator
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Witness the Living Grid in Motion
          </h2>
          <p className="text-[#9da395] text-sm sm:text-base font-light">
            Trigger sunny peaks, storm cloud transient drops, or grid blackouts. See how the sub-second controller routes power.
          </p>
        </div>

        {/* Embedded Interactive Topology Twin */}
        <div className="max-w-5xl mx-auto">
          <PowerTopologyTwin state={state} onApplyScenario={onApplyScenario} />
        </div>

      </section>

      {/* ── SECTION 5: CLEAN YIELD & FINANCIAL CALCULATOR ── */}
      <section id="roi-yield" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/10">
        
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-7 sm:p-11 border border-white/10 shadow-2xl relative overflow-hidden">
          
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-[#fde047] px-3 py-1 rounded-full bg-[#fde047]/15 border border-[#fde047]/30">
              Commercial Viability & Stewardship
            </span>
            <h2 className="text-2xl sm:text-4xl font-light text-white">
              Calculate Your Facility Clean Yield
            </h2>
            <p className="text-[#9da395] text-xs sm:text-sm font-light">
              Adjust the microgrid load slider to calculate your estimated annual carbon and fiscal dividends.
            </p>
          </div>

          {/* Slider */}
          <div className="p-6 rounded-2xl bg-[#161913] border border-white/10 mb-8 space-y-4">
            <div className="flex justify-between items-center text-sm font-light">
              <span className="text-[#cbd0c5]">Microgrid Peak Capacity:</span>
              <span className="text-xl font-normal font-mono text-[#34d399] bg-[#20241b] px-3 py-1 rounded-xl border border-[#34d399]/30">
                {facilitySizeKW} kW
              </span>
            </div>

            <input
              type="range"
              min="50"
              max="1000"
              step="25"
              value={facilitySizeKW}
              onChange={(e) => setFacilitySizeKW(Number(e.target.value))}
              className="w-full h-2.5 bg-[#2a3024] rounded-lg appearance-none cursor-pointer accent-[#10b981]"
            />

            <div className="flex justify-between text-[11px] font-mono text-[#7c8177]">
              <span>50 kW (Commercial)</span>
              <span>500 kW (Campus / Resort)</span>
              <span>1,000 kW (Industrial Island)</span>
            </div>
          </div>

          {/* Computed ROI Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            
            <div className="p-5 rounded-2xl bg-[#20241b]/80 border border-white/10 text-center">
              <span className="text-xs text-[#9da395] block mb-1">Annual Operational Savings</span>
              <span className="text-3xl font-light font-mono text-[#34d399] glow-text-emerald">
                ${annualTotalSavingsUSD.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#7c8177] block mt-1">Diesel fuel + battery wear</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#20241b]/80 border border-white/10 text-center">
              <span className="text-xs text-[#9da395] block mb-1">Avoided Carbon Emitted</span>
              <span className="text-3xl font-light font-mono text-[#86efac] glow-text-cyan">
                {annualCo2SavedTons} Tons
              </span>
              <span className="text-[11px] text-[#7c8177] block mt-1">Annual CO₂ offset</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#20241b]/80 border border-white/10 text-center">
              <span className="text-xs text-[#9da395] block mb-1">Estimated Payback Period</span>
              <span className="text-3xl font-light font-mono text-[#fde047] glow-text-amber">
                {paybackMonths} Mo.
              </span>
              <span className="text-[11px] text-[#7c8177] block mt-1">Full software ROI</span>
            </div>

          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={() => onLaunchConsole('sandbox')}
              className="px-8 py-3.5 rounded-xl text-xs font-medium bg-[#10b981] hover:bg-[#34d399] text-[#121510] transition-all shadow-[0_0_25px_rgba(52,211,153,0.35)] inline-flex items-center gap-2 group cursor-pointer"
            >
              <span>Test This Load in the Functional SCADA Sandbox</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </section>

      {/* ── SECTION 6: FREQUENTLY ASKED QUESTIONS ── */}
      <section id="faq" className="py-20 px-4 sm:px-8 max-w-4xl mx-auto border-t border-white/10">
        
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-light text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-[#9da395] text-xs sm:text-sm font-light">
            Everything you need to know about deploying VoltSense AI in the field.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div 
                key={index}
                className="rounded-2xl bg-[#20241b]/80 border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-light text-[#f2f3ef] hover:text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#9da395] transition-transform ${isOpen ? 'rotate-180 text-[#34d399]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#9da395] font-light leading-relaxed border-t border-white/10 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

      {/* ── SECTION 7: FINAL BOTTOM CTA ── */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/10">
        
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-[#1b261b] via-[#20241b] to-[#16241b] border border-[#34d399]/30 text-center relative overflow-hidden shadow-[0_0_80px_rgba(52,211,153,0.15)]">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
              Ready to Modernize Your Microgrid?
            </h2>
            <p className="text-[#cbd0c5] text-sm sm:text-base font-light">
              Transition seamlessly into the live operational SCADA operating system. Zero sign-up required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onLaunchConsole('overview')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-medium bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#86efac] hover:opacity-95 text-[#121510] transition-all shadow-[0_0_30px_rgba(52,211,153,0.4)] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Enter SCADA Console</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onOpenSpecs}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl text-sm font-light bg-[#161913] border border-white/10 hover:border-[#34d399]/40 text-[#f2f3ef] transition-all"
              >
                Inspect Technical Specs
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* ── FOOTER IN LIVING GREEN THEME ── */}
      <footer className="border-t border-white/10 bg-[#121510] px-6 py-8 text-xs font-mono text-[#7c8177]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-[#9da395]">
            <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
            <span>VoltSense AI Living Green OS</span>
            <span>·</span>
            <span>Raspberry Pi 5 + ESP32 RTOS</span>
          </div>
          <div className="flex items-center gap-4 text-[#9da395]">
            <button onClick={onOpenSpecs} className="hover:text-white transition-colors">Documentation</button>
            <span>·</span>
            <button onClick={() => onLaunchConsole('overview')} className="text-[#34d399] hover:underline">SCADA Console</button>
            <span>·</span>
            <span>Apache 2.0 / MIT</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
