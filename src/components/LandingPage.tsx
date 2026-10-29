import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Activity, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  TrendingUp, 
  BatteryCharging,
  Leaf,
  Sun,
  CloudRain,
  Moon,
  Zap,
  CheckCircle2,
  BarChart3,
  Lock,
  Play,
  Sliders,
  ChevronRight,
  ExternalLink,
  Clock,
  Flame,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SylvaLivingWorldScene } from '@designcodeio/threeui';
import { BioluminescentField } from './ui/BioluminescentField';
import { MicrogridState } from '../types';

interface LandingPageProps {
  onLaunchConsole: (initialTab?: 'overview' | 'forecast' | 'battery' | 'sandbox' | 'ledger') => void;
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
  const [activeScenario, setActiveScenario] = useState<'sunny' | 'cloud' | 'night' | 'islanded'>('sunny');

  const handleScenarioClick = (sc: 'sunny' | 'cloud' | 'night' | 'islanded') => {
    setActiveScenario(sc);
    onApplyScenario(sc);
  };

  return (
    <div className="min-h-screen bg-[#141712] text-[#F2F3EF] selection:bg-[#34d399]/30 selection:text-white font-sans overflow-x-hidden relative">
      
      {/* ── BACKGROUND LAYER 1: PERSISTENT 3D LIVING GREEN WORLD (FIXED) ── */}
      <div className="fixed inset-0 w-full h-screen pointer-events-none z-0 overflow-hidden opacity-60">
        <SylvaLivingWorldScene className="w-full h-full object-cover" />
      </div>

      {/* ── BACKGROUND LAYER 2: BIOLUMINESCENT SPORE PARTICLES CANVAS (FIXED) ── */}
      <BioluminescentField className="opacity-95" />

      {/* ── BACKGROUND LAYER 3: DYNAMIC LIVING ATMOSPHERIC LIGHT POOLS (FIXED) ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top Canopy Sunlit Mist */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60rem] h-[36rem] bg-gradient-to-b from-[#10b981]/15 via-[#86efac]/8 to-transparent rounded-full blur-[140px]" />
        
        {/* Mid Living Chlorophyll Glows */}
        <div className="absolute top-[28%] -left-32 w-[38rem] h-[38rem] bg-[#10b981]/12 rounded-full blur-[150px] animate-float-drift" />
        <div className="absolute top-[48%] -right-32 w-[42rem] h-[42rem] bg-[#34d399]/10 rounded-full blur-[160px] animate-float-drift-reverse" />
        
        {/* Lower Deep Roots Amber-Gold Warmth */}
        <div className="absolute bottom-[20%] left-1/4 w-[48rem] h-[32rem] bg-[#eab308]/6 rounded-full blur-[170px]" />
        
        {/* Global Cinematic Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#141712]/75 via-[#141712]/45 to-[#10130e]/95" />
      </div>

      {/* ── 1. GLOBAL FLOATING GLASS NAVIGATION DOCK ── */}
      <header className="fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="w-full max-w-5xl rounded-full bg-[#161a13]/80 backdrop-blur-xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.55)] px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between pointer-events-auto transition-all specular-rim">
          
          {/* Brand Logo & Edge Indicator */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#10b981]/20 border border-[#34d399]/40 flex items-center justify-center text-[#34d399] shadow-[0_0_15px_rgba(52,211,153,0.35)]">
              <Leaf className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium text-base tracking-tight">VoltSense AI</span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#20251b] border border-[#34d399]/30 text-[10px] font-mono text-[#86efac]">
                v2.4 RTOS
              </span>
            </div>
          </div>

          {/* Center Navigation Shortcuts */}
          <div className="hidden md:flex items-center gap-1 text-xs text-[#9da395] font-light">
            <a 
              href="#twin-preview" 
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              Digital Twin
            </a>
            <a 
              href="#pillars" 
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              Architecture
            </a>
            <a 
              href="#comparison" 
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              Benchmark
            </a>
            <a 
              href="#impact" 
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              Impact
            </a>
            <button 
              onClick={onOpenSpecs}
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              Specs
            </button>
          </div>

          {/* Right Action: Launch SCADA Console */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#20251b] border border-white/5 text-[11px] font-mono text-[#86efac]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
              <span>11.4ms Edge</span>
            </div>
            
            <button
              onClick={() => onLaunchConsole('overview')}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#86efac] text-[#121510] hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(52,211,153,0.4)] flex items-center gap-1.5 sm:gap-2 cursor-pointer font-sans"
            >
              <span>Enter SCADA Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </nav>
      </header>

      {/* ── 2. HERO SECTION (LIVING WORLD CANOPY) ── */}
      <section className="relative min-h-[96vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-32 pb-16 z-10">
        
        {/* Subtle Botanical Leaf Silhouette Accents (Left & Right) */}
        <img 
          src="/landing-pages/meng-to-sketchbook/botany-left.png" 
          alt="" 
          className="hidden xl:block absolute -left-12 top-24 w-80 h-auto opacity-20 pointer-events-none select-none filter blur-[0.3px]" 
        />
        <img 
          src="/landing-pages/meng-to-sketchbook/botany-right.png" 
          alt="" 
          className="hidden xl:block absolute -right-16 top-32 w-88 h-auto opacity-20 pointer-events-none select-none filter blur-[0.3px]" 
        />

        {/* Hero Content Stack */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181d14]/85 backdrop-blur-md border border-[#34d399]/40 text-xs font-mono text-[#86efac] shadow-[0_0_25px_rgba(52,211,153,0.18)] mb-6 specular-rim"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#34d399]" />
            <span>Autonomous Edge-AI Microgrid Operating System</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white leading-[1.08] max-w-4xl"
          >
            Intelligent Energy <br />
            <span className="bg-gradient-to-r from-[#86efac] via-[#34d399] to-[#10b981] bg-clip-text text-transparent font-normal drop-shadow-[0_0_35px_rgba(52,211,153,0.25)]">
              in Living Rhythm.
            </span>
          </motion.h1>

          {/* Lede Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-sm sm:text-lg md:text-xl text-[#b4b9ad] font-light leading-relaxed max-w-2xl"
          >
            Sub-second neural power dispatch and electrochemical battery preservation executed 100% on edge microcontrollers. Zero cloud latency, zero unexpected cell degradation.
          </motion.p>

          {/* Hero Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
          >
            <button
              onClick={() => onLaunchConsole('overview')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-sm font-medium bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#86efac] text-[#121510] hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(52,211,153,0.45)] flex items-center justify-center gap-2 cursor-pointer font-sans"
            >
              <span>Launch Live SCADA Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenSpecs}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-sm font-light bg-[#181d14]/80 hover:bg-[#20251b] backdrop-blur-md border border-white/10 hover:border-[#34d399]/40 text-white transition-all flex items-center justify-center gap-2 cursor-pointer specular-rim"
            >
              <FileText className="w-4 h-4 text-[#34d399]" />
              <span>Technical Architecture & Specs</span>
            </button>
          </motion.div>

          {/* Edge Telemetry Proof Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl"
          >
            <div className="p-3.5 rounded-2xl bg-[#161a13]/70 backdrop-blur-md border border-white/5 flex flex-col items-center specular-rim">
              <span className="text-[11px] text-[#9da395] font-light">Inference Latency</span>
              <span className="text-base sm:text-lg font-mono font-medium text-[#86efac]">11.4 ms</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#161a13]/70 backdrop-blur-md border border-white/5 flex flex-col items-center specular-rim">
              <span className="text-[11px] text-[#9da395] font-light">BESS State of Health</span>
              <span className="text-base sm:text-lg font-mono font-medium text-[#34d399]">{state.bessHealthPct.toFixed(1)}%</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#161a13]/70 backdrop-blur-md border border-white/5 flex flex-col items-center specular-rim">
              <span className="text-[11px] text-[#9da395] font-light">Clean Energy Ratio</span>
              <span className="text-base sm:text-lg font-mono font-medium text-[#86efac]">100%</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#161a13]/70 backdrop-blur-md border border-white/5 flex flex-col items-center specular-rim">
              <span className="text-[11px] text-[#9da395] font-light">Cloud Dependency</span>
              <span className="text-base sm:text-lg font-mono font-medium text-emerald-400">0% Air-Gapped</span>
            </div>
          </motion.div>

        </div>

      </section>

      {/* ── ORGANIC CONNECTOR VINE 1 ── */}
      <div className="flex flex-col items-center justify-center pointer-events-none relative z-10 -my-4">
        <div className="w-px h-16 bg-gradient-to-b from-[#34d399] via-[#86efac]/40 to-transparent" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_12px_#34d399] animate-ping my-1" />
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#86efac]/40 to-[#34d399]" />
      </div>

      {/* ── 3. INTERACTIVE LIVE DIGITAL TWIN SANDBOX PREVIEW ── */}
      <section id="twin-preview" className="relative py-12 px-4 sm:px-8 max-w-6xl mx-auto z-20">
        
        {/* Botanical Margin Foliage Accent */}
        <img 
          src="/landing-pages/secret-pathways-assets/foreground/png/garden-bush.webp" 
          alt="" 
          className="hidden xl:block absolute -right-20 top-20 w-80 h-auto opacity-15 pointer-events-none select-none" 
        />

        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="rounded-[36px] bg-[#161a13]/75 backdrop-blur-2xl border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.65)] p-6 sm:p-10 relative overflow-hidden group specular-rim"
        >
          {/* Subtle Ambient Emerald Glow inside card */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#10b981]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8 border-b border-white/10 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141811] border border-[#34d399]/30 text-xs font-mono text-[#86efac] mb-2">
                <Activity className="w-3.5 h-3.5 text-[#34d399] animate-pulse" />
                <span>Live Digital Twin Sandbox</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                Simulate Microgrid Dynamics in Real Time
              </h2>
              <p className="text-xs sm:text-sm text-[#9da395] font-light mt-1">
                Trigger weather shifts or grid isolation to witness autonomous edge dispatch recalculating in 11.4ms.
              </p>
            </div>

            {/* 1-Click Interactive Scenarios */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleScenarioClick('sunny')}
                className={`px-3.5 py-2 rounded-xl text-xs font-light transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeScenario === 'sunny'
                    ? 'bg-[#10b981]/25 border border-[#34d399] text-[#86efac] shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                    : 'bg-[#141811] border border-white/10 text-[#9da395] hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Sunny Peak</span>
              </button>

              <button
                onClick={() => handleScenarioClick('cloud')}
                className={`px-3.5 py-2 rounded-xl text-xs font-light transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeScenario === 'cloud'
                    ? 'bg-[#10b981]/25 border border-[#34d399] text-[#86efac] shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                    : 'bg-[#141811] border border-white/10 text-[#9da395] hover:text-white'
                }`}
              >
                <CloudRain className="w-3.5 h-3.5 text-sky-400" />
                <span>Cloud Chaos</span>
              </button>

              <button
                onClick={() => handleScenarioClick('night')}
                className={`px-3.5 py-2 rounded-xl text-xs font-light transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeScenario === 'night'
                    ? 'bg-[#10b981]/25 border border-[#34d399] text-[#86efac] shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                    : 'bg-[#141811] border border-white/10 text-[#9da395] hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span>Night Discharge</span>
              </button>

              <button
                onClick={() => handleScenarioClick('islanded')}
                className={`px-3.5 py-2 rounded-xl text-xs font-light transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeScenario === 'islanded'
                    ? 'bg-[#10b981]/25 border border-[#34d399] text-[#86efac] shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                    : 'bg-[#141811] border border-white/10 text-[#9da395] hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-rose-400" />
                <span>Islanded Mode</span>
              </button>
            </div>
          </div>

          {/* 4 Core Power Nodes Grid (Frosted Glass with Living Rims) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 relative z-10">
            
            {/* Node 1: Solar Generation */}
            <div className="p-5 rounded-2xl bg-[#121610]/80 backdrop-blur-md border border-white/5 hover:border-amber-500/35 hover:shadow-[0_8px_25px_-5px_rgba(245,158,11,0.2)] transition-all specular-rim">
              <div className="flex items-center justify-between text-xs text-[#9da395] mb-2 font-light">
                <span>Solar PV Generation</span>
                <Sun className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-medium text-white">
                {state.solarKW.toFixed(1)} <span className="text-sm font-light text-[#9da395]">kW</span>
              </div>
              <div className="text-[11px] font-mono text-[#86efac] mt-2 flex items-center gap-1">
                <span>Irradiance: {state.irradiance} W/m²</span>
              </div>
            </div>

            {/* Node 2: Neural Controller */}
            <div className="p-5 rounded-2xl bg-[#121610]/80 backdrop-blur-md border border-white/5 hover:border-[#34d399]/40 hover:shadow-[0_8px_25px_-5px_rgba(52,211,153,0.25)] transition-all specular-rim">
              <div className="flex items-center justify-between text-xs text-[#9da395] mb-2 font-light">
                <span>AI Controller State</span>
                <Cpu className="w-4 h-4 text-[#34d399]" />
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-medium text-[#34d399] uppercase">
                {state.controllerMode}
              </div>
              <div className="text-[11px] font-mono text-[#86efac] mt-2 flex items-center gap-1">
                <span>Inference: 11.4ms · INT8 ONNX</span>
              </div>
            </div>

            {/* Node 3: BESS Storage */}
            <div className="p-5 rounded-2xl bg-[#121610]/80 backdrop-blur-md border border-white/5 hover:border-emerald-500/35 hover:shadow-[0_8px_25px_-5px_rgba(16,185,129,0.25)] transition-all specular-rim">
              <div className="flex items-center justify-between text-xs text-[#9da395] mb-2 font-light">
                <span>Lithium BESS Buffer</span>
                <BatteryCharging className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-medium text-white">
                {state.bessKW > 0 ? `+${state.bessKW.toFixed(1)}` : state.bessKW.toFixed(1)} <span className="text-sm font-light text-[#9da395]">kW</span>
              </div>
              <div className="text-[11px] font-mono text-[#86efac] mt-2 flex items-center justify-between">
                <span>SoC: {state.bessSoC.toFixed(1)}%</span>
                <span>Temp: {state.bessTempC.toFixed(1)}°C</span>
              </div>
            </div>

            {/* Node 4: Facility Load */}
            <div className="p-5 rounded-2xl bg-[#121610]/80 backdrop-blur-md border border-white/5 hover:border-purple-500/35 hover:shadow-[0_8px_25px_-5px_rgba(168,85,247,0.2)] transition-all specular-rim">
              <div className="flex items-center justify-between text-xs text-[#9da395] mb-2 font-light">
                <span>Critical Facility Load</span>
                <Zap className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-medium text-white">
                {state.facilityLoadKW.toFixed(1)} <span className="text-sm font-light text-[#9da395]">kW</span>
              </div>
              <div className="text-[11px] font-mono text-[#86efac] mt-2 flex items-center gap-1">
                <span>Demand Met: 100.0% Clean</span>
              </div>
            </div>

          </div>

          {/* Console Launch Deep-Link */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-2 text-xs text-[#9da395] font-light">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
              <span>Full bidirectional power circuit visualization and control sliders available in console.</span>
            </div>
            <button
              onClick={() => onLaunchConsole('overview')}
              className="px-5 py-2.5 rounded-xl text-xs font-medium bg-[#141811] hover:bg-[#1e2418] border border-[#34d399]/40 text-[#86efac] transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(52,211,153,0.2)]"
            >
              <span>Open Full Interactive SCADA Twin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </motion.div>
      </section>

      {/* ── ORGANIC CONNECTOR VINE 2 ── */}
      <div className="flex flex-col items-center justify-center pointer-events-none relative z-10 -my-4">
        <div className="w-px h-16 bg-gradient-to-b from-[#34d399] via-[#86efac]/40 to-transparent" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_12px_#34d399] animate-ping my-1" />
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#86efac]/40 to-[#34d399]" />
      </div>

      {/* ── 4. SECTION 2: 3-PILLAR TECHNOLOGICAL ARCHITECTURE ── */}
      <section id="pillars" className="relative py-20 px-4 sm:px-8 max-w-6xl mx-auto z-20">
        
        {/* Botanical Margin Foliage Accent */}
        <img 
          src="/landing-pages/secret-pathways-assets/foreground/png/tall-grass.webp" 
          alt="" 
          className="hidden xl:block absolute -left-20 top-36 w-72 h-auto opacity-15 pointer-events-none select-none" 
        />

        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181d14]/85 border border-[#34d399]/30 text-xs font-mono text-[#86efac] specular-rim">
            <Leaf className="w-3.5 h-3.5 text-[#34d399]" />
            <span>VoltSense AI Living Green Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Built for Autonomy & Longevity
          </h2>
          <p className="text-[#9da395] text-sm sm:text-base font-light leading-relaxed">
            A high-efficiency microgrid operating system that pairs sub-second edge neural inference with electrochemical battery preservation.
          </p>
        </div>

        {/* 3 Luxury Bento Cards (Frosted Glass with Botanical Micro-Gauges) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onClick={() => onLaunchConsole('forecast')}
            className="p-8 rounded-[32px] bg-[#161a13]/75 backdrop-blur-2xl border border-white/10 hover:border-[#34d399]/50 transition-all cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_60px_-10px_rgba(52,211,153,0.3)] flex flex-col justify-between relative overflow-hidden specular-rim"
          >
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#10b981]/10 rounded-full blur-2xl group-hover:bg-[#10b981]/25 transition-all pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#10b981]/15 border border-[#34d399]/30 flex items-center justify-center text-[#34d399] group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-light text-white group-hover:text-[#86efac] transition-colors">
                Sub-Second Dispatch
              </h3>
              <p className="text-sm text-[#9da395] font-light leading-relaxed">
                96-interval BiLSTM ensemble forecasting with rolling horizons. Executes in 11.4ms to eliminate solar fluctuation and prevent voltage sags.
              </p>

              {/* Mini Interactive SVG Sparkline */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#86efac] mb-1">
                  <span>96-Step Horizon</span>
                  <span>MAPE: 3.12%</span>
                </div>
                <div className="h-10 w-full bg-[#121610]/70 rounded-xl p-1.5 border border-white/5 flex items-end gap-1">
                  {[35, 48, 62, 85, 95, 78, 65, 50, 42, 38, 25, 20].map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-gradient-to-t from-[#10b981]/40 to-[#34d399] rounded-sm group-hover:opacity-100 opacity-70 transition-opacity"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-[#34d399] font-medium relative z-10">
              <span>View Forecasting Twin</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onClick={() => onLaunchConsole('battery')}
            className="p-8 rounded-[32px] bg-[#161a13]/75 backdrop-blur-2xl border border-white/10 hover:border-[#34d399]/50 transition-all cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_60px_-10px_rgba(52,211,153,0.3)] flex flex-col justify-between relative overflow-hidden specular-rim"
          >
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#34d399]/10 rounded-full blur-2xl group-hover:bg-[#34d399]/25 transition-all pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#34d399]/15 border border-[#34d399]/30 flex items-center justify-center text-[#86efac] group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                <BatteryCharging className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-light text-white group-hover:text-[#86efac] transition-colors">
                Battery Life Guardian
              </h3>
              <p className="text-sm text-[#9da395] font-light leading-relaxed">
                Electrochemical stress dampening and Rainflow cycle counting. Slew-rate limiting protects battery warranty and extends cell life by +15.2%.
              </p>

              {/* Rainflow Stress Damping Bar */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#86efac] mb-1">
                  <span>Micro-Cycle Damping</span>
                  <span>+15.2% Life</span>
                </div>
                <div className="h-2 w-full bg-[#121610] rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-gradient-to-r from-[#10b981] to-[#86efac] rounded-full w-[84%]" />
                </div>
                <div className="flex justify-between text-[10px] text-[#9da395] mt-1 font-mono">
                  <span>Rainflow Filter</span>
                  <span>Cell Stress 0.12 C</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-[#34d399] font-medium relative z-10">
              <span>Inspect Degradation Model</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onClick={onOpenSpecs}
            className="p-8 rounded-[32px] bg-[#161a13]/75 backdrop-blur-2xl border border-white/10 hover:border-[#34d399]/50 transition-all cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_60px_-10px_rgba(52,211,153,0.3)] flex flex-col justify-between relative overflow-hidden specular-rim"
          >
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#86efac]/10 rounded-full blur-2xl group-hover:bg-[#86efac]/25 transition-all pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#86efac]/15 border border-[#34d399]/30 flex items-center justify-center text-[#34d399] group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-light text-white group-hover:text-[#86efac] transition-colors">
                Air-Gapped Hardware
              </h3>
              <p className="text-sm text-[#9da395] font-light leading-relaxed">
                100% cloud-independent local RTOS execution on Raspberry Pi 5 + dual ESP32 nodes with Modbus RTU/TCP and IEC 61850 compliance.
              </p>

              {/* Hardware Execution Badge */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#86efac] mb-1">
                  <span>Dual Core RTOS</span>
                  <span>Modbus 500kbps</span>
                </div>
                <div className="p-2 rounded-xl bg-[#121610]/70 border border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
                    RPi 5 + ESP32
                  </span>
                  <span className="text-[#86efac]">0% Cloud</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-[#34d399] font-medium relative z-10">
              <span>Read System Specs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── ORGANIC CONNECTOR VINE 3 ── */}
      <div className="flex flex-col items-center justify-center pointer-events-none relative z-10 -my-4">
        <div className="w-px h-16 bg-gradient-to-b from-[#34d399] via-[#86efac]/40 to-transparent" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_12px_#34d399] animate-ping my-1" />
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#86efac]/40 to-[#34d399]" />
      </div>

      {/* ── 5. SECTION 3: BENCHMARK COMPARISON MATRIX ── */}
      <section id="comparison" className="relative py-20 px-4 sm:px-8 max-w-5xl mx-auto z-20">
        
        {/* Botanical Margin Foliage Accent */}
        <img 
          src="/landing-pages/meng-to-sketchbook/botany-left.png" 
          alt="" 
          className="hidden xl:block absolute -left-24 top-28 w-80 h-auto opacity-15 pointer-events-none select-none filter blur-[0.3px]" 
        />

        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
            Traditional SCADA vs. VoltSense AI
          </h2>
          <p className="text-xs sm:text-sm text-[#9da395] font-light">
            Why edge-native predictive control outperforms legacy cloud-dependent controllers.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-[#161a13]/75 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-2xl specular-rim"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 p-6 sm:p-8 border-b border-white/10 bg-[#121610]/60 text-xs font-mono text-[#9da395]">
            <div className="font-semibold text-white">CAPABILITY</div>
            <div className="mt-2 md:mt-0">LEGACY CLOUD SCADA</div>
            <div className="mt-2 md:mt-0 text-[#86efac] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
              <span>VOLTSENSE EDGE-AI</span>
            </div>
          </div>

          <div className="divide-y divide-white/5 text-xs sm:text-sm">
            
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 p-6 sm:p-8 hover:bg-white/[0.02] transition-colors">
              <div className="font-medium text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#34d399]" />
                <span>Control Loop Latency</span>
              </div>
              <div className="text-[#9da395] mt-1 md:mt-0 font-light">
                5,000 – 30,000 ms (Cloud roundtrip lag)
              </div>
              <div className="text-[#86efac] font-mono mt-1 md:mt-0 font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#34d399]" />
                <span>11.4 ms (Local RTOS ONNX inference)</span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 p-6 sm:p-8 hover:bg-white/[0.02] transition-colors">
              <div className="font-medium text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#34d399]" />
                <span>Internet Outage Resilience</span>
              </div>
              <div className="text-[#9da395] mt-1 md:mt-0 font-light">
                Falls back to fossil diesel generation
              </div>
              <div className="text-[#86efac] font-mono mt-1 md:mt-0 font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#34d399]" />
                <span>100% Autonomous Air-Gapped Operation</span>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 p-6 sm:p-8 hover:bg-white/[0.02] transition-colors">
              <div className="font-medium text-white flex items-center gap-2">
                <BatteryCharging className="w-4 h-4 text-[#34d399]" />
                <span>Battery Cell Preservation</span>
              </div>
              <div className="text-[#9da395] mt-1 md:mt-0 font-light">
                Crude hysteresis (damaging micro-cycles)
              </div>
              <div className="text-[#86efac] font-mono mt-1 md:mt-0 font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#34d399]" />
                <span>Rainflow & Slew-Rate Limiter (+15.2% life)</span>
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-3 p-6 sm:p-8 hover:bg-white/[0.02] transition-colors">
              <div className="font-medium text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#34d399]" />
                <span>Recurring Cloud Infrastructure</span>
              </div>
              <div className="text-[#9da395] mt-1 md:mt-0 font-light">
                $24,000+ / yr in cloud telemetry fees
              </div>
              <div className="text-[#86efac] font-mono mt-1 md:mt-0 font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#34d399]" />
                <span>$0 / yr (Zero recurring cloud bill)</span>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* ── ORGANIC CONNECTOR VINE 4 ── */}
      <div className="flex flex-col items-center justify-center pointer-events-none relative z-10 -my-4">
        <div className="w-px h-16 bg-gradient-to-b from-[#34d399] via-[#86efac]/40 to-transparent" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_12px_#34d399] animate-ping my-1" />
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#86efac]/40 to-[#34d399]" />
      </div>

      {/* ── 6. SECTION 4: PLANETARY & GRID IMPACT IN LIVING MOTION ── */}
      <section id="impact" className="relative py-20 px-4 sm:px-8 max-w-6xl mx-auto z-20">
        
        {/* Botanical Margin Foliage Accent */}
        <img 
          src="/landing-pages/meng-to-sketchbook/botany-right.png" 
          alt="" 
          className="hidden xl:block absolute -right-20 top-20 w-88 h-auto opacity-15 pointer-events-none select-none filter blur-[0.3px]" 
        />

        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181d14]/85 border border-[#34d399]/30 text-xs font-mono text-[#86efac] specular-rim">
            <Award className="w-3.5 h-3.5 text-[#34d399]" />
            <span>Proven Industrial Benchmarks</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
            Planetary Impact Measured in Milliseconds
          </h2>
          <p className="text-xs sm:text-sm text-[#9da395] font-light">
            Quantifiable clean energy gains through hardware-accelerated deterministic dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Stat 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-3xl bg-[#161a13]/75 backdrop-blur-2xl border border-white/10 hover:border-[#34d399]/40 transition-all text-center group specular-rim shadow-[0_15px_40px_rgba(0,0,0,0.35)]"
          >
            <div className="text-4xl sm:text-5xl font-light text-white font-mono group-hover:text-[#86efac] transition-colors">
              +15.2%
            </div>
            <div className="text-xs text-[#34d399] font-medium mt-2">BESS Longevity Extension</div>
            <p className="text-xs text-[#9da395] font-light mt-1">
              Rainflow cycle suppression shields multi-million-dollar warranty.
            </p>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-3xl bg-[#161a13]/75 backdrop-blur-2xl border border-white/10 hover:border-[#34d399]/40 transition-all text-center group specular-rim shadow-[0_15px_40px_rgba(0,0,0,0.35)]"
          >
            <div className="text-4xl sm:text-5xl font-light text-white font-mono group-hover:text-[#86efac] transition-colors">
              11.4 ms
            </div>
            <div className="text-xs text-[#34d399] font-medium mt-2">Edge Neural Latency</div>
            <p className="text-xs text-[#9da395] font-light mt-1">
              Deterministic ONNX INT8 execution eliminates cloud API delays.
            </p>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-3xl bg-[#161a13]/75 backdrop-blur-2xl border border-white/10 hover:border-[#34d399]/40 transition-all text-center group specular-rim shadow-[0_15px_40px_rgba(0,0,0,0.35)]"
          >
            <div className="text-4xl sm:text-5xl font-light text-white font-mono group-hover:text-[#86efac] transition-colors">
              28.4%
            </div>
            <div className="text-xs text-[#34d399] font-medium mt-2">Diesel Fuel Abated</div>
            <p className="text-xs text-[#9da395] font-light mt-1">
              Zero spinning reserve generator starts during solar cloud drops.
            </p>
          </motion.div>

          {/* Stat 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-3xl bg-[#161a13]/75 backdrop-blur-2xl border border-white/10 hover:border-[#34d399]/40 transition-all text-center group specular-rim shadow-[0_15px_40px_rgba(0,0,0,0.35)]"
          >
            <div className="text-4xl sm:text-5xl font-light text-white font-mono group-hover:text-[#86efac] transition-colors">
              100%
            </div>
            <div className="text-xs text-[#34d399] font-medium mt-2">Clean Grid Continuity</div>
            <p className="text-xs text-[#9da395] font-light mt-1">
              Full survival of complete wide-area telecommunication blackouts.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ── ORGANIC CONNECTOR VINE 5 ── */}
      <div className="flex flex-col items-center justify-center pointer-events-none relative z-10 -my-4">
        <div className="w-px h-16 bg-gradient-to-b from-[#34d399] via-[#86efac]/40 to-transparent" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_12px_#34d399] animate-ping my-1" />
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#86efac]/40 to-[#34d399]" />
      </div>

      {/* ── 7. CONVERSION CALLOUT / LAUNCH GATEWAY ── */}
      <section className="relative py-20 px-4 sm:px-8 max-w-5xl mx-auto z-20">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-14 rounded-[40px] bg-gradient-to-b from-[#181d14]/85 to-[#121510]/95 backdrop-blur-2xl border border-[#34d399]/40 shadow-[0_25px_80px_rgba(16,185,129,0.22)] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden specular-rim"
        >
          {/* Ambient Botanical Arch Light */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#86efac] to-transparent opacity-60" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#10b981]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141811] border border-[#34d399]/30 text-xs font-mono text-[#86efac] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#34d399]" />
              <span>Edge SCADA Ready</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
              Ready to operate the microgrid?
            </h3>
            <p className="text-xs sm:text-sm text-[#9da395] font-light max-w-xl">
              Access the live digital twin, interactive sandbox, and telemetry ledger in the SCADA Console.
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <button
              onClick={onOpenSpecs}
              className="px-5 py-3 rounded-2xl text-xs font-light bg-[#141811] hover:bg-[#20251b] border border-white/10 hover:border-[#34d399]/40 text-white transition-all flex items-center gap-2 cursor-pointer specular-rim"
            >
              <FileText className="w-4 h-4 text-[#34d399]" />
              <span>Specs</span>
            </button>
            <button
              onClick={() => onLaunchConsole('overview')}
              className="px-6 py-3.5 rounded-2xl text-xs font-medium bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#86efac] text-[#121510] hover:opacity-95 transition-all shadow-[0_0_25px_rgba(52,211,153,0.4)] flex items-center gap-2 cursor-pointer"
            >
              <span>Enter SCADA Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── 8. PRO LIVING GREEN FOOTER ── */}
      <footer className="py-14 px-6 border-t border-white/10 text-center text-xs text-[#7c8177] font-light bg-[#0e110c]/90 backdrop-blur-xl relative z-20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#10b981]/20 border border-[#34d399]/40 flex items-center justify-center text-[#34d399]">
              <Leaf className="w-3.5 h-3.5" />
            </div>
            <span className="text-white font-medium">VoltSense AI</span>
            <span className="text-[#9da395]">· Living Green Microgrid OS</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#9da395]">
            <button onClick={() => onLaunchConsole('overview')} className="hover:text-[#34d399] transition-colors cursor-pointer">Topology Twin</button>
            <button onClick={() => onLaunchConsole('forecast')} className="hover:text-[#34d399] transition-colors cursor-pointer">Neural Forecast</button>
            <button onClick={() => onLaunchConsole('battery')} className="hover:text-[#34d399] transition-colors cursor-pointer">Battery Guardian</button>
            <button onClick={() => onLaunchConsole('sandbox')} className="hover:text-[#34d399] transition-colors cursor-pointer">Sandbox</button>
            <button onClick={onOpenSpecs} className="hover:text-[#34d399] transition-colors cursor-pointer">Architecture</button>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-[#86efac]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
            <span>Modbus RTU / IEC 61850 Active</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
