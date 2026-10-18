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
  Clock, 
  Server,
  CloudRain,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuroraCurtain } from './ui/aurora-curtain';
import { MicrogridState } from '../types';
import { PowerTopologyTwin } from './PowerTopologyTwin';

interface LandingPageProps {
  onLaunchConsole: () => void;
  onOpenSpecs: () => void;
  state: MicrogridState;
  onApplyScenario: (sc: 'sunny' | 'cloud' | 'night' | 'islanded') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchConsole,
  onOpenSpecs,
  state,
  onApplyScenario,
}) => {
  // ROI Calculator state
  const [facilitySizeKW, setFacilitySizeKW] = useState<number>(150);
  const [heroTab, setHeroTab] = useState<'3d-aurora' | 'grid-twin'>('3d-aurora');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Derived ROI metrics based on facility load
  const annualDieselSavedUSD = Math.round(facilitySizeKW * 280);
  const annualBatterySavingsUSD = Math.round(facilitySizeKW * 190);
  const annualTotalSavingsUSD = annualDieselSavedUSD + annualBatterySavingsUSD;
  const annualCo2SavedTons = Math.round(facilitySizeKW * 1.45);
  const paybackMonths = Math.max(4.2, (8.5 - (facilitySizeKW / 300) * 2)).toFixed(1);

  const faqs = [
    {
      q: "Does VoltSense AI require an active internet or cloud connection?",
      a: "No. VoltSense AI is engineered for mission-critical, 100% air-gapped environments. The ONNX-quantized BiLSTM model and RTOS controller execute entirely on local Raspberry Pi 5 + ESP32 edge hardware with sub-12ms latency, ensuring zero cloud dependency or vulnerability."
    },
    {
      q: "How does the system prevent battery degradation and protect warranties?",
      a: "VoltSense AI embeds Rainflow cycle-counting and dynamic slew-rate limiting (12.5 kW/s). It eliminates destructive high-frequency micro-cycling, clamps thermal runaways, and keeps Depth of Discharge (DoD) in the optimal buffer, extending LFP/NMC battery life by +15.2%."
    },
    {
      q: "Can VoltSense AI operate with existing PLC and SCADA infrastructure?",
      a: "Yes. VoltSense AI communicates via standard Modbus TCP/RTU, DNP3, and IEC 61850 protocols. It acts as an intelligent setpoint coprocessor for existing inverters (SMA, Schneider, Sungrow, Tesla Megapack) without requiring replacement of power electronics."
    },
    {
      q: "What happens during a sudden cloud storm or grid blackout?",
      a: "The ensemble inference engine detects solar irradiance collapse within 11.4ms. It preemptively ramps BESS inverter dispatch before bus frequency deviates, preventing voltage sags and keeping diesel generators suppressed."
    }
  ];

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-hidden">
      
      {/* Mind-Boggling Ambient Glowing Orbs / Cosmic Grid Background */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[35rem] bg-gradient-to-b from-emerald-500/15 via-cyan-500/10 to-transparent rounded-full blur-[160px] pointer-events-none -z-10 animate-float-drift" />
      <div className="fixed top-1/3 right-0 w-[40rem] h-[40rem] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none -z-10 animate-float-drift-reverse" />
      <div className="fixed bottom-0 left-0 w-[45rem] h-[30rem] bg-purple-500/10 rounded-full blur-[170px] pointer-events-none -z-10" />

      {/* Subtle Matrix Grid Texture */}
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      {/* TOP COMMERCIAL NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#060913]/85 border-b border-slate-800/80 px-4 sm:px-8 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)] text-emerald-400">
              <Zap className="w-5 h-5 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white">
                  VoltSense <span className="text-emerald-400 font-mono">AI</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold">
                  v2.4
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Autonomous Microgrid Operating System
              </span>
            </div>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-300">
            <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
            <a href="#interactive-demo" className="hover:text-cyan-400 transition-colors">Interactive Demo</a>
            <a href="#roi-calculator" className="hover:text-amber-400 transition-colors">ROI Calculator</a>
            <a href="#architecture" className="hover:text-purple-400 transition-colors">Edge Hardware</a>
            <a href="#faq" className="hover:text-slate-200 transition-colors">FAQ</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSpecs}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Specs</span>
            </button>

            <button
              onClick={onLaunchConsole}
              className="relative group overflow-hidden px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 transition-all shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] flex items-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Launch Live SCADA</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* SECTION 1: HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
        
        {/* Floating Release Pill */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs font-medium text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Next-Gen Edge-AI Power Dispatch · 100% Offline Autonomous</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </motion.div>
        </div>

        {/* Hero Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12]"
          >
            The Autonomous Brain for{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Clean Microgrids & BESS
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Eliminate costly diesel generator runtime, extend battery lifespan by <strong className="text-cyan-300">+15.2%</strong>, and dispatch megawatts of clean solar with <strong className="text-emerald-400">11.4ms</strong> edge inference on Raspberry Pi 5 hardware.
          </motion.p>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3"
          >
            <button
              onClick={onLaunchConsole}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 transition-all shadow-[0_0_30px_rgba(16,185,129,0.45)] hover:shadow-[0_0_45px_rgba(16,185,129,0.7)] flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current text-slate-950" />
              <span>Launch Live SCADA Console</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#interactive-demo"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl text-sm font-bold bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-slate-200 transition-all flex items-center justify-center gap-2"
            >
              <Box className="w-4 h-4 text-cyan-400" />
              <span>Explore 3D Demo</span>
            </a>
          </motion.div>

          {/* 4 Hero Credibility Tickers */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80 max-w-3xl mx-auto font-mono text-left"
          >
            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Inference Speed</span>
              <span className="text-xl sm:text-2xl font-bold text-emerald-400">11.4 ms</span>
              <span className="text-[10px] text-slate-500 block">Sub-second local</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Forecast Error</span>
              <span className="text-xl sm:text-2xl font-bold text-cyan-400">3.12%</span>
              <span className="text-[10px] text-slate-500 block">96-interval MAPE</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Battery Life</span>
              <span className="text-xl sm:text-2xl font-bold text-purple-400">+15.2%</span>
              <span className="text-[10px] text-slate-500 block">Rainflow dampened</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Diesel Reduced</span>
              <span className="text-xl sm:text-2xl font-bold text-amber-400">28.4%</span>
              <span className="text-[10px] text-slate-500 block">Auto-suppression</span>
            </div>
          </motion.div>

        </div>

        {/* HERO INTERACTIVE SHOWCASE CONTAINER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-12 sm:mt-16 rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-slate-800/60 via-slate-900/70 to-[#070A14] border border-slate-700/60 shadow-[0_20px_70px_-10px_rgba(6,182,212,0.18)] relative overflow-hidden"
        >
          {/* Top Window Bar */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-slate-400 text-[11px] ml-2 hidden sm:inline">
                voltsense-edge-node-01.local // live telemetry viewport
              </span>
            </div>

            {/* Display Switcher */}
            <div className="inline-flex p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setHeroTab('3d-aurora')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                  heroTab === '3d-aurora'
                    ? 'bg-slate-800 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Box className="w-3.5 h-3.5 text-cyan-400" />
                <span>3D Solar Curtain</span>
              </button>
              <button
                onClick={() => setHeroTab('grid-twin')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                  heroTab === 'grid-twin'
                    ? 'bg-slate-800 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Live Power Grid</span>
              </button>
            </div>
          </div>

          {/* Embedded Showcase Content */}
          <AnimatePresence mode="wait">
            {heroTab === '3d-aurora' ? (
              <motion.div
                key="hero-aurora"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950/70"
              >
                <AuroraCurtain
                  columns={60}
                  layers={3}
                  palette="aurora"
                  title="3D Atmospheric Electromagnetic Solar Flux"
                  subtitle="Rayleigh-Mie wave oscillation · Drag to orbit 3D camera"
                  hint="Interactive 3D Stage · Drag to orbit · Hover emitters to inspect intensity · Click swatches to filter"
                  height={420}
                  autoRotate={0.18}
                  className="bg-transparent border-0"
                />
              </motion.div>
            ) : (
              <motion.div
                key="hero-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <PowerTopologyTwin state={state} onApplyScenario={onApplyScenario} />
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>

      </section>

      {/* SECTION 2: BENTO GRID VALUE PROPOSITIONS */}
      <section id="features" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            Engineered For Critical Infrastructure
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Why Modern Microgrids Choose VoltSense AI
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Conventional PLC controllers rely on crude static thresholds. VoltSense AI models physics, weather forecasts, and electrochemistry in real time.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Item 1: Large Span */}
          <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/90 hover:border-emerald-500/40 hover:shadow-[0_15px_40px_-10px_rgba(16,185,129,0.2)] transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 w-fit">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                Sub-Second BiLSTM Predictive Dispatch
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                Traditional SCADA takes 15 minutes to adjust setpoints. VoltSense AI’s quantized ONNX ensemble calculates power demand across 96 future intervals and dispatches in <strong>11.4 milliseconds</strong>, instantly stabilizing voltage.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-mono">
              <div>
                <span className="text-slate-500 block">Latency</span>
                <span className="text-emerald-400 font-bold text-base">11.4 ms</span>
              </div>
              <div>
                <span className="text-slate-500 block">Jitter</span>
                <span className="text-cyan-400 font-bold text-base">±0.3 ms</span>
              </div>
              <div>
                <span className="text-slate-500 block">Model Size</span>
                <span className="text-purple-400 font-bold text-base">4.2 MB INT8</span>
              </div>
            </div>
          </div>

          {/* Bento Item 2: Battery Wear Protection */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/90 hover:border-cyan-500/40 hover:shadow-[0_15px_40px_-10px_rgba(6,182,212,0.2)] transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                Electrochemical Battery Guardian
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Rainflow cycle-counting dampens destructive shallow reversals and enforces strict slew-rate limits (12.5 kW/s), extending battery asset lifespan by <strong>+15.2%</strong>.
              </p>
            </div>

            <div className="mt-8 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Micro-Cycles Suppressed:</span>
              <span className="text-cyan-400 font-bold text-sm">142 today</span>
            </div>
          </div>

          {/* Bento Item 3: 100% Offline Air-Gapped */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/90 hover:border-purple-500/40 hover:shadow-[0_15px_40px_-10px_rgba(168,85,247,0.2)] transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-400 w-fit">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                100% Air-Gapped & Offline
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Zero cloud dependencies. No recurring API tokens, no vendor lock-in, and zero external attack surface for mission-critical industrial substations.
              </p>
            </div>

            <div className="mt-8 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Target Hardware:</span>
              <span className="text-purple-300 font-bold text-sm">RPi 5 + ESP32</span>
            </div>
          </div>

          {/* Bento Item 4: Large Span (Diesel Suppression & ESG) */}
          <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/90 hover:border-amber-500/40 hover:shadow-[0_15px_40px_-10px_rgba(245,158,11,0.2)] transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 w-fit">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                Automated Diesel Generator Suppression & ESG Ledger
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                Instead of running diesel generators as a blunt buffer, VoltSense AI uses battery ramp margins to keep generators off. Generates cryptographically verifiable CSV & JSON emissions ledgers.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">28.4% Diesel Hours Reduced</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-300">Scope 1 & 2 Automated Audit Export</span>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* SECTION 3: INTERACTIVE DEMO SCENARIOS */}
      <section id="interactive-demo" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            Live Interactive Simulator
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Test the System With 1-Click
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Click any scenario button below to see how VoltSense AI automatically balances power flow and protects the grid in real-time.
          </p>
        </div>

        {/* Embedded Interactive Topology Twin */}
        <div className="max-w-5xl mx-auto">
          <PowerTopologyTwin state={state} onApplyScenario={onApplyScenario} />
        </div>

      </section>

      {/* SECTION 4: INTERACTIVE ENTERPRISE ROI CALCULATOR */}
      <section id="roi-calculator" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
          
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
              Commercial Viability & Payback
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Calculate Your Facility Savings
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Adjust the slider to match your microgrid scale and see real financial and carbon dividends.
            </p>
          </div>

          {/* Slider */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/90 mb-8 space-y-4">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-300">Microgrid Facility Capacity:</span>
              <span className="text-xl font-bold font-mono text-emerald-400 bg-slate-900 px-3 py-1 rounded-xl border border-emerald-500/30">
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
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />

            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>50 kW (Small Commercial)</span>
              <span>500 kW (Campus / Resort)</span>
              <span>1,000 kW (Industrial Substation)</span>
            </div>
          </div>

          {/* Computed ROI Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/90 text-center">
              <span className="text-xs text-slate-400 block mb-1">Annual Total Savings</span>
              <span className="text-3xl font-extrabold font-mono text-emerald-400 glow-text-emerald">
                ${annualTotalSavingsUSD.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-500 block mt-1">Diesel fuel + battery wear</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/90 text-center">
              <span className="text-xs text-slate-400 block mb-1">Avoided Carbon Emitted</span>
              <span className="text-3xl font-extrabold font-mono text-cyan-300 glow-text-cyan">
                {annualCo2SavedTons} Tons
              </span>
              <span className="text-[11px] text-slate-500 block mt-1">Annual CO₂ equivalent</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/90 text-center">
              <span className="text-xs text-slate-400 block mb-1">Estimated Payback Period</span>
              <span className="text-3xl font-extrabold font-mono text-amber-400 glow-text-amber">
                {paybackMonths} Mo.
              </span>
              <span className="text-[11px] text-slate-500 block mt-1">Full software ROI</span>
            </div>

          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={onLaunchConsole}
              className="px-8 py-3.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-[0_0_25px_rgba(16,185,129,0.4)] inline-flex items-center gap-2 group cursor-pointer"
            >
              <span>Test This Load in the Live SCADA Sandbox</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </section>

      {/* SECTION 5: EDGE HARDWARE ARCHITECTURE */}
      <section id="architecture" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30">
            Hardware Stack
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built for Industrial Ruggedization
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Runs on cost-effective, off-the-shelf single-board hardware capable of operating continuously in -20°C to +70°C environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-purple-500/15 text-purple-400 w-fit">
              <Server className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white">Raspberry Pi 5 (8GB)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Quad-core Arm Cortex-A76 @ 2.4GHz. Runs the Linux container runtime, ONNX Quantized INT8 BiLSTM neural network, and web SCADA server.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400 w-fit">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white">ESP32 Dual-Core RTOS</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dedicated deterministic FreeRTOS microcontroller executing emergency hardware-level circuit isolation and watchdog heartbeat protection in 1.2ms.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 w-fit">
              <Radio className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white">Modbus TCP / RTU Bus</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Industrial galvanic-isolated RS485 transceiver connecting directly to commercial battery inverters, revenue meters, and solar irradiance sensors.
            </p>
          </div>

        </div>

      </section>

      {/* SECTION 6: FAQ ACCORDION */}
      <section id="faq" className="py-20 px-4 sm:px-8 max-w-4xl mx-auto border-t border-slate-800/80">
        
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Everything you need to know about deploying VoltSense AI in production.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div 
                key={index}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-slate-200 hover:text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-emerald-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

      {/* SECTION 7: FINAL HIGH-CONVERTING BOTTOM CTA */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-emerald-950/60 via-slate-900/90 to-cyan-950/60 border border-emerald-500/30 text-center relative overflow-hidden shadow-[0_0_80px_rgba(16,185,129,0.15)]">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Ready to Modernize Your Clean Microgrid?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Explore the full interactive SCADA operating system live in your browser. No sign-up or credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={onLaunchConsole}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 transition-all shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Launch Live SCADA Console</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onOpenSpecs}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl text-sm font-bold bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-slate-200 transition-all"
              >
                Inspect Technical Specs
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-[#040710] px-6 py-8 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>VoltSense AI Microgrid OS</span>
            <span>·</span>
            <span>Raspberry Pi 5 + ESP32 RTOS</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={onOpenSpecs} className="hover:text-white transition-colors">Documentation</button>
            <span>·</span>
            <button onClick={onLaunchConsole} className="text-emerald-400 hover:underline">SCADA Console</button>
            <span>·</span>
            <span>Apache 2.0 / MIT</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
