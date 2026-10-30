import React, { useState, useEffect, useMemo } from 'react';
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
  Award, 
  Radio, 
  RefreshCw, 
  Eye, 
  SlidersHorizontal,
  Building2,
  Factory,
  Hospital,
  Compass,
  Check,
  Percent,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SylvaLivingWorldScene } from '@designcodeio/threeui';
import { BioluminescentField } from './ui/BioluminescentField';
import { AuroraCurtain, PaletteName } from './ui/aurora-curtain';
import { MicrogridState } from '../types';

interface LandingPageProps {
  onLaunchConsole: (initialTab?: 'overview' | 'forecast' | 'battery' | 'sandbox' | 'ledger') => void;
  onOpenSpecs: () => void;
  state: MicrogridState;
  onApplyScenario: (sc: 'sunny' | 'cloud' | 'night' | 'islanded') => void;
  onUpdateState?: (updates: Partial<MicrogridState>) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchConsole,
  onOpenSpecs,
  state,
  onApplyScenario,
  onUpdateState,
}) => {
  const [activeScenario, setActiveScenario] = useState<'sunny' | 'cloud' | 'night' | 'islanded'>('sunny');
  const [benchmarkFilter, setBenchmarkFilter] = useState<'all' | 'latency' | 'resilience' | 'battery' | 'cost'>('all');
  const [show3dCurtain, setShow3dCurtain] = useState<boolean>(false);
  const [curtainPalette, setCurtainPalette] = useState<PaletteName>('aurora');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // ROI Calculator interactive state
  const [facilityType, setFacilityType] = useState<'hospital' | 'fab' | 'campus' | 'island'>('hospital');
  const [annualSpendK, setAnnualSpendK] = useState<number>(320); // $320,000 / year
  const [bessCapacityInput, setBessCapacityInput] = useState<number>(500); // 500 kWh

  // Track mouse coordinates for organic halo illumination
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScenarioClick = (sc: 'sunny' | 'cloud' | 'night' | 'islanded') => {
    setActiveScenario(sc);
    onApplyScenario(sc);
  };

  // Dynamic ROI calculation metrics
  const roiCalculations = useMemo(() => {
    const multipliers = {
      hospital: { savingsRate: 0.28, dieselAbatement: 82, co2Tons: 114, lifeExtYears: 3.4 },
      fab: { savingsRate: 0.35, dieselAbatement: 94, co2Tons: 148, lifeExtYears: 4.1 },
      campus: { savingsRate: 0.24, dieselAbatement: 76, co2Tons: 88, lifeExtYears: 3.0 },
      island: { savingsRate: 0.42, dieselAbatement: 98, co2Tons: 220, lifeExtYears: 4.8 },
    };
    const factor = multipliers[facilityType];
    const annualSavingsUSD = Math.round(annualSpendK * 1000 * factor.savingsRate);
    const co2Tonnes = Math.round((annualSpendK / 100) * factor.co2Tons);
    const dieselLitersAvoided = Math.round((annualSpendK * 1000 * 0.08) * (factor.dieselAbatement / 100));
    const batteryAssetAddedUSD = Math.round(bessCapacityInput * 320 * (factor.lifeExtYears / 10));

    return {
      annualSavingsUSD,
      co2Tonnes,
      dieselLitersAvoided,
      batteryAssetAddedUSD,
      lifeExtYears: factor.lifeExtYears,
    };
  }, [facilityType, annualSpendK, bessCapacityInput]);

  return (
    <div className="min-h-screen bg-[#0d110d] text-[#F2F3EF] selection:bg-[#00F59B]/30 selection:text-white font-sans overflow-x-hidden relative">
      
      {/* ── BACKGROUND LAYER 1: PERSISTENT 3D LIVING GREEN WORLD (FIXED) ── */}
      <div className="fixed inset-0 w-full h-screen pointer-events-none z-0 overflow-hidden opacity-60">
        <SylvaLivingWorldScene className="w-full h-full object-cover" />
      </div>

      {/* ── BACKGROUND LAYER 2: BIOLUMINESCENT SPORE PARTICLES CANVAS (FIXED) ── */}
      <BioluminescentField className="opacity-95" />

      {/* ── BACKGROUND LAYER 3: MOUSE-REACTIVE LIVING HALO ILLUMINATION ── */}
      <motion.div
        className="fixed w-[38rem] h-[38rem] rounded-full pointer-events-none z-0 blur-[140px] hidden md:block"
        animate={{
          x: mousePos.x - 304,
          y: mousePos.y - 304,
        }}
        transition={{
          type: "spring",
          damping: 32,
          stiffness: 120,
          mass: 0.6
        }}
        style={{
          background: "radial-gradient(circle, rgba(0,255,178,0.14) 0%, rgba(6,182,212,0.06) 40%, rgba(168,85,247,0.02) 65%, transparent 80%)"
        }}
      />

      {/* ── BACKGROUND LAYER 4: DYNAMIC LIVING ATMOSPHERIC LIGHT POOLS ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top Canopy Sunlit Mist */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[64rem] h-[38rem] bg-gradient-to-b from-[#00F59B]/18 via-[#34D399]/10 to-transparent rounded-full blur-[140px]" />
        
        {/* Mid Living Chlorophyll Glows */}
        <div className="absolute top-[26%] -left-32 w-[42rem] h-[42rem] bg-[#10b981]/15 rounded-full blur-[160px] animate-float-drift" />
        <div className="absolute top-[46%] -right-32 w-[45rem] h-[45rem] bg-[#06b6d4]/12 rounded-full blur-[170px] animate-float-drift-reverse" />
        
        {/* Lower Deep Roots Amber-Gold Warmth */}
        <div className="absolute bottom-[18%] left-1/4 w-[52rem] h-[34rem] bg-[#f59e0b]/8 rounded-full blur-[180px]" />
        
        {/* Global Cinematic Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d110d]/80 via-[#0d110d]/50 to-[#090c09]/95" />
      </div>

      {/* ── 1. GLOBAL FLOATING GLASS NAVIGATION DOCK ── */}
      <header className="fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="w-full max-w-5xl rounded-full bg-[#121813]/85 backdrop-blur-xl border border-white/12 shadow-[0_16px_45px_rgba(0,0,0,0.65)] px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between pointer-events-auto transition-all specular-rim">
          
          {/* Brand Logo & Edge Indicator */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00F59B]/25 to-[#06B6D4]/25 border border-[#34d399]/50 flex items-center justify-center text-[#00F59B] shadow-[0_0_20px_rgba(0,245,155,0.45)]">
              <Leaf className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium text-base tracking-tight">VoltSense AI</span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#18221a] border border-[#00F59B]/40 text-[10px] font-mono text-[#6EE7B7] shadow-[0_0_10px_rgba(0,245,155,0.2)]">
                v2.4 RTOS
              </span>
            </div>
          </div>

          {/* Center Navigation Shortcuts */}
          <div className="hidden md:flex items-center gap-1 text-xs text-[#a0a89b] font-light">
            <a 
              href="#twin-preview" 
              className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              Digital Twin
            </a>
            <a 
              href="#pillars" 
              className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              Architecture
            </a>
            <a 
              href="#roi-calculator" 
              className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              ROI Engine
            </a>
            <a 
              href="#comparison" 
              className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              Benchmark
            </a>
            <a 
              href="#impact" 
              className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              Impact
            </a>
            <button 
              onClick={onOpenSpecs}
              className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              Specs
            </button>
          </div>

          {/* Right Action: Launch SCADA Console */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#162018] border border-white/8 text-[11px] font-mono text-[#86efac]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B] animate-ping" />
              <span>11.4ms Edge</span>
            </div>
            
            <button
              onClick={() => onLaunchConsole('overview')}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-[#00F59B] via-[#34d399] to-[#22D3EE] text-[#09120c] hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(0,245,155,0.45)] flex items-center gap-1.5 sm:gap-2 cursor-pointer font-sans"
            >
              <span>Enter SCADA Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </nav>
      </header>

      {/* ── 2. HERO SECTION (LIVING WORLD CANOPY) ── */}
      <section className="relative min-h-[96vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-32 pb-16 z-10">
        
        {/* Subtle Botanical Leaf Silhouette Accents */}
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
          
          {/* Eyebrow Pill with Live Pulse */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#151d16]/85 backdrop-blur-md border border-[#00F59B]/40 text-xs font-mono text-[#86efac] shadow-[0_0_30px_rgba(0,245,155,0.22)] mb-6 iridescent-border"
          >
            <span className="w-2 h-2 rounded-full bg-[#00F59B] animate-ping" />
            <span>Autonomous Edge-AI Microgrid Operating System</span>
            <span className="text-[#a0a89b]">· 60.00 Hz Real-Time</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white leading-[1.08] max-w-4xl"
          >
            Intelligent Energy <br />
            <span className="text-gradient-vibrant font-normal drop-shadow-[0_0_40px_rgba(0,245,155,0.35)]">
              in Living Rhythm.
            </span>
          </motion.h1>

          {/* Lede Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-sm sm:text-lg md:text-xl text-[#c1c7bb] font-light leading-relaxed max-w-2xl"
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
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-sm font-medium bg-gradient-to-r from-[#00F59B] via-[#34d399] to-[#22D3EE] text-[#09120c] hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_35px_rgba(0,245,155,0.5)] flex items-center justify-center gap-2 cursor-pointer font-sans"
            >
              <span>Launch Live SCADA Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenSpecs}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-sm font-light bg-[#18221a]/80 hover:bg-[#202c22] backdrop-blur-md border border-white/12 hover:border-[#00F59B]/40 text-white transition-all flex items-center justify-center gap-2 cursor-pointer specular-rim"
            >
              <FileText className="w-4 h-4 text-[#34d399]" />
              <span>Technical Architecture & Specs</span>
            </button>
          </motion.div>

          {/* Edge Telemetry Proof Bar with Live Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl"
          >
            <div className="p-3.5 rounded-2xl bg-[#141c15]/80 backdrop-blur-md border border-white/6 flex flex-col items-center specular-rim hover:border-[#00F59B]/40 transition-colors">
              <span className="text-[11px] text-[#9da395] font-light">Inference Latency</span>
              <span className="text-base sm:text-lg font-mono font-medium text-[#6EE7B7]">11.4 ms</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#141c15]/80 backdrop-blur-md border border-white/6 flex flex-col items-center specular-rim hover:border-[#00F59B]/40 transition-colors">
              <span className="text-[11px] text-[#9da395] font-light">BESS State of Health</span>
              <span className="text-base sm:text-lg font-mono font-medium text-[#34d399]">{state.bessHealthPct.toFixed(1)}%</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#141c15]/80 backdrop-blur-md border border-white/6 flex flex-col items-center specular-rim hover:border-[#00F59B]/40 transition-colors">
              <span className="text-[11px] text-[#9da395] font-light">Clean Energy Ratio</span>
              <span className="text-base sm:text-lg font-mono font-medium text-[#6EE7B7]">100%</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#141c15]/80 backdrop-blur-md border border-white/6 flex flex-col items-center specular-rim hover:border-[#00F59B]/40 transition-colors">
              <span className="text-[11px] text-[#9da395] font-light">Cloud Dependency</span>
              <span className="text-base sm:text-lg font-mono font-medium text-[#22D3EE]">0% Air-Gapped</span>
            </div>
          </motion.div>

          {/* Industrial Standards & Protocol Trust Ticker */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] font-mono text-[#8a9284]">
            <span className="px-3 py-1 rounded-full bg-[#121813]/60 border border-white/5">IEC 61850 SUBSTATION BUS</span>
            <span className="px-3 py-1 rounded-full bg-[#121813]/60 border border-white/5">IEEE 2030.5 DER</span>
            <span className="px-3 py-1 rounded-full bg-[#121813]/60 border border-white/5">MODBUS RTU / TCP</span>
            <span className="px-3 py-1 rounded-full bg-[#121813]/60 border border-white/5">OPENADR 2.0B</span>
            <span className="px-3 py-1 rounded-full bg-[#121813]/60 border border-white/5">NREL BENCHMARKED</span>
          </div>

        </div>

      </section>

      {/* ── ORGANIC CONNECTOR VINE 1 ── */}
      <div className="flex flex-col items-center justify-center pointer-events-none relative z-10 -my-4">
        <div className="w-px h-16 bg-gradient-to-b from-[#00F59B] via-[#86efac]/40 to-transparent" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#00F59B] shadow-[0_0_15px_#00F59B] animate-ping my-1" />
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#86efac]/40 to-[#00F59B]" />
      </div>

      {/* ── 3. INTERACTIVE LIVE DIGITAL TWIN SANDBOX PREVIEW & CONNECTED CIRCUIT ── */}
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
          className="rounded-[36px] bg-[#141b15]/80 backdrop-blur-2xl border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.65)] p-6 sm:p-10 relative overflow-hidden group specular-rim"
        >
          {/* Subtle Ambient Emerald Glow inside card */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00F59B]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8 border-b border-white/10 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0e140f] border border-[#00F59B]/35 text-xs font-mono text-[#86efac] mb-2">
                <Activity className="w-3.5 h-3.5 text-[#00F59B] animate-pulse" />
                <span>Live Digital Twin Sandbox · Real-Time Simulation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                Simulate Microgrid Dynamics in Real Time
              </h2>
              <p className="text-xs sm:text-sm text-[#9da395] font-light mt-1">
                Drag irradiance or load sliders below to witness autonomous edge dispatch recalculating in 11.4ms.
              </p>
            </div>

            {/* 1-Click Interactive Scenarios */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleScenarioClick('sunny')}
                className={`px-3.5 py-2 rounded-xl text-xs font-light transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeScenario === 'sunny'
                    ? 'bg-[#00F59B]/25 border border-[#00F59B] text-[#86efac] shadow-[0_0_15px_rgba(0,245,155,0.35)]'
                    : 'bg-[#101611] border border-white/10 text-[#9da395] hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Sunny Peak</span>
              </button>

              <button
                onClick={() => handleScenarioClick('cloud')}
                className={`px-3.5 py-2 rounded-xl text-xs font-light transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeScenario === 'cloud'
                    ? 'bg-[#00F59B]/25 border border-[#00F59B] text-[#86efac] shadow-[0_0_15px_rgba(0,245,155,0.35)]'
                    : 'bg-[#101611] border border-white/10 text-[#9da395] hover:text-white'
                }`}
              >
                <CloudRain className="w-3.5 h-3.5 text-sky-400" />
                <span>Cloud Chaos</span>
              </button>

              <button
                onClick={() => handleScenarioClick('night')}
                className={`px-3.5 py-2 rounded-xl text-xs font-light transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeScenario === 'night'
                    ? 'bg-[#00F59B]/25 border border-[#00F59B] text-[#86efac] shadow-[0_0_15px_rgba(0,245,155,0.35)]'
                    : 'bg-[#101611] border border-white/10 text-[#9da395] hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span>Night Discharge</span>
              </button>

              <button
                onClick={() => handleScenarioClick('islanded')}
                className={`px-3.5 py-2 rounded-xl text-xs font-light transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeScenario === 'islanded'
                    ? 'bg-[#00F59B]/25 border border-[#00F59B] text-[#86efac] shadow-[0_0_15px_rgba(0,245,155,0.35)]'
                    : 'bg-[#101611] border border-white/10 text-[#9da395] hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-rose-400" />
                <span>Islanded Mode</span>
              </button>
            </div>
          </div>

          {/* Interactive Dynamic SVG Power Circuit Visualization */}
          <div className="mt-8 mb-6 p-4 rounded-2xl bg-[#101611]/90 border border-white/5 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#9da395] mb-2 font-mono gap-2">
              <span className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-[#00F59B] animate-pulse" />
                <span>ACTIVE POWER BUS FLOW · 60.00 Hz DETERMINISTIC DISPATCH</span>
              </span>
              <span className="text-[#86efac] font-medium">Net Power: {state.netKW >= 0 ? `+${state.netKW.toFixed(1)}` : state.netKW.toFixed(1)} kW</span>
            </div>

            {/* Circuit Line with Animated Flow Particles */}
            <div className="relative py-3">
              <div className="h-2 w-full bg-[#182219] rounded-full overflow-hidden relative shadow-inner">
                <div 
                  className={`h-full transition-all duration-700 ${
                    state.bessKW < 0 
                      ? 'bg-gradient-to-r from-amber-400 via-[#00F59B] to-[#22D3EE]' 
                      : 'bg-gradient-to-r from-purple-400 via-[#22D3EE] to-[#00F59B]'
                  }`}
                  style={{ width: '100%' }}
                />
              </div>

              {/* Node Indicators on the Bus */}
              <div className="flex justify-between items-center mt-3 text-xs">
                <div className="flex items-center gap-1.5 text-amber-300 font-mono">
                  <Sun className="w-3.5 h-3.5" />
                  <span>Solar PV ({state.solarKW.toFixed(1)} kW)</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-[#86efac] font-mono">
                  <Cpu className="w-3.5 h-3.5 text-[#00F59B]" />
                  <span>BiLSTM ONNX INT8</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#00F59B] font-mono">
                  <BatteryCharging className="w-3.5 h-3.5" />
                  <span>BESS ({state.bessKW < 0 ? `Charge ${Math.abs(state.bessKW).toFixed(1)} kW` : `Discharge ${state.bessKW.toFixed(1)} kW`})</span>
                </div>
                <div className="flex items-center gap-1.5 text-purple-300 font-mono">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Load ({state.facilityLoadKW.toFixed(1)} kW)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Live Sliders Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-2xl bg-[#0f1510]/80 border border-white/6 mb-6">
            
            {/* Slider 1: Solar Irradiance */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#a0a89b] font-light flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  Solar Irradiance
                </span>
                <span className="text-amber-300 font-mono">{state.irradiance} W/m²</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1000" 
                step="20"
                value={state.irradiance}
                onChange={(e) => onUpdateState && onUpdateState({ irradiance: Number(e.target.value) })}
                className="w-full accent-[#00F59B] h-1.5 bg-[#1e2a1f] rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 2: Facility Load Demand */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#a0a89b] font-light flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-purple-400" />
                  Facility Load Demand
                </span>
                <span className="text-purple-300 font-mono">{state.baseFacilityLoad} kW</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="120" 
                step="5"
                value={state.baseFacilityLoad}
                onChange={(e) => onUpdateState && onUpdateState({ baseFacilityLoad: Number(e.target.value) })}
                className="w-full accent-[#38BDF8] h-1.5 bg-[#1e2a1f] rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 3: Minimum BESS SoC Constraint */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#a0a89b] font-light flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00F59B]" />
                  Min Reserve Constraint
                </span>
                <span className="text-[#00F59B] font-mono">{state.minSocConstraint}% SoC</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="40" 
                step="5"
                value={state.minSocConstraint}
                onChange={(e) => onUpdateState && onUpdateState({ minSocConstraint: Number(e.target.value) })}
                className="w-full accent-[#00F59B] h-1.5 bg-[#1e2a1f] rounded-lg cursor-pointer"
              />
            </div>

          </div>

          {/* 4 Core Power Nodes Grid (Frosted Glass with Living Rims) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 relative z-10">
            
            {/* Node 1: Solar Generation */}
            <div className="p-5 rounded-2xl bg-[#0e140f]/80 backdrop-blur-md border border-white/6 hover:border-amber-500/40 hover:shadow-[0_8px_25px_-5px_rgba(245,158,11,0.25)] transition-all specular-rim">
              <div className="flex items-center justify-between text-xs text-[#a0a89b] mb-2 font-light">
                <span>Solar PV Generation</span>
                <Sun className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-medium text-white">
                {state.solarKW.toFixed(1)} <span className="text-sm font-light text-[#a0a89b]">kW</span>
              </div>
              <div className="text-[11px] font-mono text-[#86efac] mt-2 flex items-center gap-1">
                <span>Irradiance: {state.irradiance} W/m²</span>
              </div>
            </div>

            {/* Node 2: Neural Controller */}
            <div className="p-5 rounded-2xl bg-[#0e140f]/80 backdrop-blur-md border border-white/6 hover:border-[#00F59B]/40 hover:shadow-[0_8px_25px_-5px_rgba(0,245,155,0.25)] transition-all specular-rim">
              <div className="flex items-center justify-between text-xs text-[#a0a89b] mb-2 font-light">
                <span>AI Controller State</span>
                <Cpu className="w-4 h-4 text-[#00F59B]" />
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-medium text-[#00F59B] uppercase">
                {state.controllerMode}
              </div>
              <div className="text-[11px] font-mono text-[#86efac] mt-2 flex items-center gap-1">
                <span>Inference: 11.4ms · INT8 ONNX</span>
              </div>
            </div>

            {/* Node 3: BESS Storage */}
            <div className="p-5 rounded-2xl bg-[#0e140f]/80 backdrop-blur-md border border-white/6 hover:border-[#34d399]/40 hover:shadow-[0_8px_25px_-5px_rgba(52,211,153,0.25)] transition-all specular-rim">
              <div className="flex items-center justify-between text-xs text-[#a0a89b] mb-2 font-light">
                <span>Lithium BESS Buffer</span>
                <BatteryCharging className="w-4 h-4 text-[#34d399]" />
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-medium text-white">
                {state.bessKW > 0 ? `+${state.bessKW.toFixed(1)}` : state.bessKW.toFixed(1)} <span className="text-sm font-light text-[#a0a89b]">kW</span>
              </div>
              <div className="text-[11px] font-mono text-[#86efac] mt-2 flex items-center justify-between">
                <span>SoC: {state.bessSoC.toFixed(1)}%</span>
                <span>Temp: {state.bessTempC.toFixed(1)}°C</span>
              </div>
            </div>

            {/* Node 4: Facility Load */}
            <div className="p-5 rounded-2xl bg-[#0e140f]/80 backdrop-blur-md border border-white/6 hover:border-purple-500/40 hover:shadow-[0_8px_25px_-5px_rgba(168,85,247,0.25)] transition-all specular-rim">
              <div className="flex items-center justify-between text-xs text-[#a0a89b] mb-2 font-light">
                <span>Critical Facility Load</span>
                <Zap className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-medium text-white">
                {state.facilityLoadKW.toFixed(1)} <span className="text-sm font-light text-[#a0a89b]">kW</span>
              </div>
              <div className="text-[11px] font-mono text-[#86efac] mt-2 flex items-center gap-1">
                <span>Demand Met: 100.0% Clean</span>
              </div>
            </div>

          </div>

          {/* Console Launch Deep-Link */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-2 text-xs text-[#9da395] font-light">
              <span className="w-2 h-2 rounded-full bg-[#00F59B] animate-ping" />
              <span>Full bidirectional power circuit visualization and control sliders available in console.</span>
            </div>
            <button
              onClick={() => onLaunchConsole('overview')}
              className="px-5 py-2.5 rounded-xl text-xs font-medium bg-[#121813] hover:bg-[#1a241b] border border-[#00F59B]/40 text-[#6EE7B7] transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(0,245,155,0.25)]"
            >
              <span>Open Full Interactive SCADA Twin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </motion.div>
      </section>

      {/* ── ORGANIC CONNECTOR VINE 2 ── */}
      <div className="flex flex-col items-center justify-center pointer-events-none relative z-10 -my-4">
        <div className="w-px h-16 bg-gradient-to-b from-[#00F59B] via-[#86efac]/40 to-transparent" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#00F59B] shadow-[0_0_15px_#00F59B] animate-ping my-1" />
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#86efac]/40 to-[#00F59B]" />
      </div>

      {/* ── 4. SECTION 2: 6-PILLAR LUXURY ARCHITECTURAL BENTO GRID ── */}
      <section id="pillars" className="relative py-20 px-4 sm:px-8 max-w-6xl mx-auto z-20">
        
        {/* Botanical Margin Foliage Accent */}
        <img 
          src="/landing-pages/secret-pathways-assets/foreground/png/tall-grass.webp" 
          alt="" 
          className="hidden xl:block absolute -left-20 top-36 w-72 h-auto opacity-15 pointer-events-none select-none" 
        />

        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141c15]/85 border border-[#00F59B]/35 text-xs font-mono text-[#86efac] specular-rim">
            <Leaf className="w-3.5 h-3.5 text-[#00F59B]" />
            <span>VoltSense AI Living Green Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Built for Autonomy & Longevity
          </h2>
          <p className="text-[#a0a89b] text-sm sm:text-base font-light leading-relaxed">
            A high-efficiency microgrid operating system that pairs sub-second edge neural inference with electrochemical battery preservation.
          </p>

          {/* Interactive 3D Aurora Waveform Curtain Toggle */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setShow3dCurtain(!show3dCurtain)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-light bg-[#121813]/90 hover:bg-[#1a241b] border border-[#00F59B]/35 text-[#6EE7B7] hover:text-white transition-all shadow-sm specular-rim cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#00F59B]" />
              <span>{show3dCurtain ? "Hide 3D Aurora Waveform" : "Inspect 3D Electromagnetic Wave Curtain (Interactive)"}</span>
            </button>

            {show3dCurtain && (
              <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-[#101611] border border-white/10 text-xs">
                {(['aurora', 'ocean', 'ember', 'grape'] as PaletteName[]).map((pal) => (
                  <button
                    key={pal}
                    onClick={() => setCurtainPalette(pal)}
                    className={`px-2.5 py-1 rounded-lg capitalize transition-all cursor-pointer ${
                      curtainPalette === pal 
                        ? 'bg-[#00F59B]/20 text-[#6EE7B7] border border-[#00F59B]/40' 
                        : 'text-[#8a9284] hover:text-white'
                    }`}
                  >
                    {pal}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Expandable 3D Aurora Waveform Canvas */}
        <AnimatePresence>
          {show3dCurtain && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10 rounded-[32px] overflow-hidden border border-[#00F59B]/40 bg-[#121813]/90 backdrop-blur-2xl p-4 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 px-3 border-b border-white/10 text-xs font-mono text-[#86efac]">
                <span>3D ELECTROMAGNETIC WAVE HARMONIC ENGINE · DRAG TO ROTATE CAMERA</span>
                <span className="text-[#a0a89b] uppercase">{curtainPalette} Spectrum</span>
              </div>
              <div className="pt-3">
                <AuroraCurtain
                  height={240}
                  columns={48}
                  layers={3}
                  palette={curtainPalette}
                  autoRotate={0.2}
                  title="BiLSTM 3D Horizon Field"
                  subtitle="Electromagnetic power wave oscillation & turbulence damping"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 6 Luxury Bento Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Sub-Second Dispatch (Featured 2-Col Span) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onClick={() => onLaunchConsole('forecast')}
            className="md:col-span-2 p-8 rounded-[32px] bg-[#141b15]/80 backdrop-blur-2xl border border-white/10 hover:border-[#00F59B]/50 transition-all cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_60px_-10px_rgba(0,245,155,0.3)] flex flex-col justify-between relative overflow-hidden specular-rim"
          >
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#00F59B]/15 rounded-full blur-3xl group-hover:bg-[#00F59B]/25 transition-all pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#00F59B]/15 border border-[#00F59B]/35 flex items-center justify-center text-[#00F59B] group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,245,155,0.25)]">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="px-3 py-1 rounded-full bg-[#18241b] border border-[#00F59B]/30 text-xs font-mono text-[#6EE7B7]">
                  11.4ms BiLSTM Ensemble
                </div>
              </div>

              <h3 className="text-2xl font-light text-white group-hover:text-[#6EE7B7] transition-colors">
                Sub-Second Predictive Dispatch
              </h3>
              <p className="text-sm text-[#a0a89b] font-light leading-relaxed max-w-xl">
                96-interval BiLSTM ensemble forecasting with rolling horizons. Executes in 11.4ms locally to preemptively neutralize solar ramp fluctuations and eliminate voltage sags.
              </p>

              {/* Interactive SVG Sparkline Preview */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#86efac] mb-1">
                  <span>96-Interval Horizon · Real-Time Track</span>
                  <span>MAPE: 3.12% · High Determinism</span>
                </div>
                <div className="h-14 w-full bg-[#0d130e]/80 rounded-xl p-2 border border-white/6 flex items-end gap-1.5">
                  {[28, 38, 52, 68, 88, 96, 82, 69, 58, 48, 38, 28, 22, 18].map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-gradient-to-t from-[#00F59B]/30 via-[#34d399]/60 to-[#22D3EE] rounded-sm group-hover:opacity-100 opacity-75 transition-opacity"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-[#00F59B] font-medium relative z-10">
              <span>View Forecasting Twin Console</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 2: Electrochemical Battery Guardian */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onClick={() => onLaunchConsole('battery')}
            className="p-8 rounded-[32px] bg-[#141b15]/80 backdrop-blur-2xl border border-white/10 hover:border-[#34d399]/50 transition-all cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_60px_-10px_rgba(52,211,153,0.3)] flex flex-col justify-between relative overflow-hidden specular-rim"
          >
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#34d399]/15 rounded-full blur-2xl group-hover:bg-[#34d399]/25 transition-all pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#34d399]/15 border border-[#34d399]/35 flex items-center justify-center text-[#6EE7B7] group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(52,211,153,0.25)]">
                <BatteryCharging className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-light text-white group-hover:text-[#6EE7B7] transition-colors">
                Battery Life Guardian
              </h3>
              <p className="text-sm text-[#a0a89b] font-light leading-relaxed">
                Electrochemical stress dampening & Rainflow cycle counting. Slew-rate limiting protects multi-million dollar warranty (+15.2% life).
              </p>

              {/* Rainflow Stress Damping Bar */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#86efac] mb-1">
                  <span>Micro-Cycle Damping</span>
                  <span>+15.2% Life</span>
                </div>
                <div className="h-2 w-full bg-[#0d130e] rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-gradient-to-r from-[#00F59B] to-[#22D3EE] rounded-full w-[84%]" />
                </div>
                <div className="flex justify-between text-[10px] text-[#9da395] mt-1 font-mono">
                  <span>Rainflow Filter</span>
                  <span>Cell Stress 0.12 C</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-[#00F59B] font-medium relative z-10">
              <span>Inspect Degradation Model</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 3: Air-Gapped Hardware */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.15 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onClick={onOpenSpecs}
            className="p-8 rounded-[32px] bg-[#141b15]/80 backdrop-blur-2xl border border-white/10 hover:border-[#22D3EE]/50 transition-all cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_60px_-10px_rgba(34,211,238,0.25)] flex flex-col justify-between relative overflow-hidden specular-rim"
          >
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#06B6D4]/15 rounded-full blur-2xl group-hover:bg-[#06B6D4]/25 transition-all pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#06B6D4]/15 border border-[#22D3EE]/35 flex items-center justify-center text-[#22D3EE] group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-light text-white group-hover:text-[#22D3EE] transition-colors">
                Air-Gapped Hardware
              </h3>
              <p className="text-sm text-[#a0a89b] font-light leading-relaxed">
                100% cloud-independent local execution on Raspberry Pi 5 + dual ESP32 RTOS with Modbus RTU/TCP and IEC 61850 compliance.
              </p>

              <div className="p-2.5 rounded-xl bg-[#0d130e]/80 border border-white/6 flex items-center justify-between text-[11px] font-mono">
                <span className="text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B] animate-ping" />
                  RPi 5 + ESP32 Nodes
                </span>
                <span className="text-[#22D3EE]">0% Cloud</span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-[#22D3EE] font-medium relative z-10">
              <span>Read System Specs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 4: Sub-Cycle Synthetic Inertia (60.00 Hz) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onClick={() => onLaunchConsole('overview')}
            className="p-8 rounded-[32px] bg-[#141b15]/80 backdrop-blur-2xl border border-white/10 hover:border-[#00F59B]/50 transition-all cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_60px_-10px_rgba(0,245,155,0.25)] flex flex-col justify-between relative overflow-hidden specular-rim"
          >
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#00F59B]/15 rounded-full blur-2xl group-hover:bg-[#00F59B]/25 transition-all pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#00F59B]/15 border border-[#00F59B]/35 flex items-center justify-center text-[#00F59B] group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,245,155,0.25)]">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-light text-white group-hover:text-[#6EE7B7] transition-colors">
                60.00 Hz Synthetic Inertia
              </h3>
              <p className="text-sm text-[#a0a89b] font-light leading-relaxed">
                Virtual synchronous generator emulation dampens rapid microgrid frequency deviations within 8 milliseconds of load step events.
              </p>

              <div className="p-2.5 rounded-xl bg-[#0d130e]/80 border border-white/6 flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#a0a89b]">Grid Frequency</span>
                <span className="text-[#00F59B] font-bold">59.998 Hz (Stable)</span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-[#00F59B] font-medium relative z-10">
              <span>View Power Bus Twin</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 5: Automated Peak Tariff Arbitrage */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.25 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onClick={() => onLaunchConsole('sandbox')}
            className="p-8 rounded-[32px] bg-[#141b15]/80 backdrop-blur-2xl border border-white/10 hover:border-amber-500/50 transition-all cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_60px_-10px_rgba(245,158,11,0.25)] flex flex-col justify-between relative overflow-hidden specular-rim"
          >
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/15 rounded-full blur-2xl group-hover:bg-amber-500/25 transition-all pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/35 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-light text-white group-hover:text-amber-300 transition-colors">
                Tariff Shaving & Arbitrage
              </h3>
              <p className="text-sm text-[#a0a89b] font-light leading-relaxed">
                Automated demand-charge suppression charges during low-cost solar surplus and dispatches during extreme peak utility tariffs.
              </p>

              <div className="p-2.5 rounded-xl bg-[#0d130e]/80 border border-white/6 flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#a0a89b]">Real-Time Savings</span>
                <span className="text-amber-300 font-bold">${state.costSavingsUSD.toFixed(2)} active</span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-amber-400 font-medium relative z-10">
              <span>Open Economic Sandbox</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── ORGANIC CONNECTOR VINE 3 ── */}
      <div className="flex flex-col items-center justify-center pointer-events-none relative z-10 -my-4">
        <div className="w-px h-16 bg-gradient-to-b from-[#00F59B] via-[#86efac]/40 to-transparent" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#00F59B] shadow-[0_0_15px_#00F59B] animate-ping my-1" />
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#86efac]/40 to-[#00F59B]" />
      </div>

      {/* ── 5. SECTION 3: INTERACTIVE CLEAN ENERGY & FINANCIAL ROI CALCULATOR ── */}
      <section id="roi-calculator" className="relative py-20 px-4 sm:px-8 max-w-5xl mx-auto z-20">
        
        {/* Botanical Margin Foliage Accent */}
        <img 
          src="/landing-pages/meng-to-sketchbook/botany-left.png" 
          alt="" 
          className="hidden xl:block absolute -left-24 top-28 w-80 h-auto opacity-15 pointer-events-none select-none filter blur-[0.3px]" 
        />

        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141c15]/85 border border-[#00F59B]/35 text-xs font-mono text-[#86efac] specular-rim">
            <DollarSign className="w-3.5 h-3.5 text-[#00F59B]" />
            <span>Interactive Industrial ROI Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
            Calculate Your Clean Energy Yield
          </h2>
          <p className="text-xs sm:text-sm text-[#a0a89b] font-light">
            Select your facility archetype and annual electricity budget to calculate deterministic returns with VoltSense AI.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-10 rounded-[36px] bg-[#141b15]/85 backdrop-blur-2xl border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.6)] specular-rim"
        >
          {/* Facility Scale Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
            {[
              { id: 'hospital', label: 'Medical Center', icon: Hospital },
              { id: 'fab', label: 'Semiconductor Fab', icon: Factory },
              { id: 'campus', label: 'Commercial Campus', icon: Building2 },
              { id: 'island', label: 'Remote Island', icon: Compass },
            ].map((f) => {
              const IconComp = f.icon;
              return (
                <button
                  key={f.id}
                  onClick={() => setFacilityType(f.id as any)}
                  className={`p-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-medium transition-all cursor-pointer ${
                    facilityType === f.id
                      ? 'bg-gradient-to-r from-[#00F59B]/25 to-[#06B6D4]/25 border border-[#00F59B] text-[#6EE7B7] shadow-[0_0_15px_rgba(0,245,155,0.3)]'
                      : 'bg-[#0f1510] border border-white/6 text-[#a0a89b] hover:text-white'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-white/10">
            {/* Slider 1: Annual Energy Spend */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#a0a89b]">Current Annual Grid Electricity Spend</span>
                <span className="text-white font-mono font-medium">${annualSpendK.toLocaleString()},000 / yr</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="1000" 
                step="25"
                value={annualSpendK}
                onChange={(e) => setAnnualSpendK(Number(e.target.value))}
                className="w-full accent-[#00F59B] h-2 bg-[#1b261c] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#788072] font-mono">
                <span>$50k</span>
                <span>$500k</span>
                <span>$1,000k</span>
              </div>
            </div>

            {/* Slider 2: Planned BESS Storage */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#a0a89b]">Installed BESS Battery Capacity</span>
                <span className="text-white font-mono font-medium">{bessCapacityInput} kWh</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="2000" 
                step="50"
                value={bessCapacityInput}
                onChange={(e) => setBessCapacityInput(Number(e.target.value))}
                className="w-full accent-[#22D3EE] h-2 bg-[#1b261c] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#788072] font-mono">
                <span>100 kWh</span>
                <span>1,000 kWh</span>
                <span>2,000 kWh</span>
              </div>
            </div>
          </div>

          {/* Calculated Output Hologram Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="p-4 rounded-2xl bg-[#0f1510] border border-white/6 text-center hover:border-[#00F59B]/40 transition-colors">
              <span className="text-[11px] text-[#a0a89b] font-light">Projected Annual Savings</span>
              <div className="text-2xl sm:text-3xl font-mono font-medium text-[#00F59B] mt-1">
                ${roiCalculations.annualSavingsUSD.toLocaleString()}
              </div>
              <span className="text-[10px] text-[#86efac] font-mono">per calendar year</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0f1510] border border-white/6 text-center hover:border-[#22D3EE]/40 transition-colors">
              <span className="text-[11px] text-[#a0a89b] font-light">CO₂ Abated</span>
              <div className="text-2xl sm:text-3xl font-mono font-medium text-[#22D3EE] mt-1">
                {roiCalculations.co2Tonnes} t
              </div>
              <span className="text-[10px] text-[#86efac] font-mono">metric tonnes / yr</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0f1510] border border-white/6 text-center hover:border-amber-400/40 transition-colors">
              <span className="text-[11px] text-[#a0a89b] font-light">Diesel Fuel Displaced</span>
              <div className="text-2xl sm:text-3xl font-mono font-medium text-amber-300 mt-1">
                {roiCalculations.dieselLitersAvoided.toLocaleString()} L
              </div>
              <span className="text-[10px] text-[#86efac] font-mono">fossil liters saved</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0f1510] border border-white/6 text-center hover:border-purple-400/40 transition-colors">
              <span className="text-[11px] text-[#a0a89b] font-light">Battery Asset Life</span>
              <div className="text-2xl sm:text-3xl font-mono font-medium text-purple-300 mt-1">
                +{roiCalculations.lifeExtYears} Yrs
              </div>
              <span className="text-[10px] text-[#86efac] font-mono">+${roiCalculations.batteryAssetAddedUSD.toLocaleString()} equity</span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onLaunchConsole('overview')}
              className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-medium bg-gradient-to-r from-[#00F59B] via-[#34d399] to-[#22D3EE] text-[#09120c] hover:opacity-95 transition-all shadow-[0_0_25px_rgba(0,245,155,0.4)] inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Validate in SCADA Simulation Engine</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── ORGANIC CONNECTOR VINE 4 ── */}
      <div className="flex flex-col items-center justify-center pointer-events-none relative z-10 -my-4">
        <div className="w-px h-16 bg-gradient-to-b from-[#00F59B] via-[#86efac]/40 to-transparent" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#00F59B] shadow-[0_0_15px_#00F59B] animate-ping my-1" />
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#86efac]/40 to-[#00F59B]" />
      </div>

      {/* ── 6. SECTION 4: BENCHMARK COMPARISON MATRIX & INTERACTIVE FILTERS ── */}
      <section id="comparison" className="relative py-20 px-4 sm:px-8 max-w-5xl mx-auto z-20">
        
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
            Traditional SCADA vs. VoltSense AI
          </h2>
          <p className="text-xs sm:text-sm text-[#a0a89b] font-light">
            Why edge-native predictive control outperforms legacy cloud-dependent controllers.
          </p>

          {/* Interactive Benchmark Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: 'all', label: 'All Benchmarks' },
              { id: 'latency', label: 'Control Latency' },
              { id: 'resilience', label: 'Outage Survival' },
              { id: 'battery', label: 'Cell Longevity' },
              { id: 'cost', label: 'Economic ROI' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setBenchmarkFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                  benchmarkFilter === f.id
                    ? 'bg-[#00F59B]/25 border border-[#00F59B] text-[#86efac] shadow-[0_0_12px_rgba(0,245,155,0.3)]'
                    : 'bg-[#121813]/60 border border-white/5 text-[#a0a89b] hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-[#141b15]/80 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-2xl specular-rim"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 p-6 sm:p-8 border-b border-white/10 bg-[#0e140f]/60 text-xs font-mono text-[#a0a89b]">
            <div className="font-semibold text-white">CAPABILITY</div>
            <div className="mt-2 md:mt-0">LEGACY CLOUD SCADA</div>
            <div className="mt-2 md:mt-0 text-[#00F59B] flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#00F59B] animate-ping" />
              <span>VOLTSENSE EDGE-AI</span>
            </div>
          </div>

          <div className="divide-y divide-white/5 text-xs sm:text-sm">
            
            {/* Row 1: Latency */}
            {(benchmarkFilter === 'all' || benchmarkFilter === 'latency') && (
              <div className="grid grid-cols-1 md:grid-cols-3 p-6 sm:p-8 hover:bg-white/[0.02] transition-colors">
                <div className="font-medium text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#00F59B]" />
                  <span>Control Loop Latency</span>
                </div>
                <div className="text-[#a0a89b] mt-1 md:mt-0 font-light">
                  5,000 – 30,000 ms (Cloud roundtrip lag)
                </div>
                <div className="text-[#6EE7B7] font-mono mt-1 md:mt-0 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00F59B]" />
                  <span>11.4 ms (Local RTOS ONNX inference)</span>
                </div>
              </div>
            )}

            {/* Row 2: Resilience */}
            {(benchmarkFilter === 'all' || benchmarkFilter === 'resilience') && (
              <div className="grid grid-cols-1 md:grid-cols-3 p-6 sm:p-8 hover:bg-white/[0.02] transition-colors">
                <div className="font-medium text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#00F59B]" />
                  <span>Internet Outage Resilience</span>
                </div>
                <div className="text-[#a0a89b] mt-1 md:mt-0 font-light">
                  Falls back to fossil diesel generation
                </div>
                <div className="text-[#6EE7B7] font-mono mt-1 md:mt-0 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00F59B]" />
                  <span>100% Autonomous Air-Gapped Operation</span>
                </div>
              </div>
            )}

            {/* Row 3: Battery */}
            {(benchmarkFilter === 'all' || benchmarkFilter === 'battery') && (
              <div className="grid grid-cols-1 md:grid-cols-3 p-6 sm:p-8 hover:bg-white/[0.02] transition-colors">
                <div className="font-medium text-white flex items-center gap-2">
                  <BatteryCharging className="w-4 h-4 text-[#00F59B]" />
                  <span>Battery Cell Preservation</span>
                </div>
                <div className="text-[#a0a89b] mt-1 md:mt-0 font-light">
                  Crude hysteresis (damaging micro-cycles)
                </div>
                <div className="text-[#6EE7B7] font-mono mt-1 md:mt-0 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00F59B]" />
                  <span>Rainflow & Slew-Rate Limiter (+15.2% life)</span>
                </div>
              </div>
            )}

            {/* Row 4: Cost */}
            {(benchmarkFilter === 'all' || benchmarkFilter === 'cost') && (
              <div className="grid grid-cols-1 md:grid-cols-3 p-6 sm:p-8 hover:bg-white/[0.02] transition-colors">
                <div className="font-medium text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#00F59B]" />
                  <span>Recurring Cloud Infrastructure</span>
                </div>
                <div className="text-[#a0a89b] mt-1 md:mt-0 font-light">
                  $24,000+ / yr in cloud telemetry fees
                </div>
                <div className="text-[#6EE7B7] font-mono mt-1 md:mt-0 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00F59B]" />
                  <span>$0 / yr (Zero recurring cloud bill)</span>
                </div>
              </div>
            )}

          </div>
        </motion.div>
      </section>

      {/* ── ORGANIC CONNECTOR VINE 5 ── */}
      <div className="flex flex-col items-center justify-center pointer-events-none relative z-10 -my-4">
        <div className="w-px h-16 bg-gradient-to-b from-[#00F59B] via-[#86efac]/40 to-transparent" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#00F59B] shadow-[0_0_15px_#00F59B] animate-ping my-1" />
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#86efac]/40 to-[#00F59B]" />
      </div>

      {/* ── 7. SECTION 5: PLANETARY & GRID IMPACT IN LIVING MOTION ── */}
      <section id="impact" className="relative py-20 px-4 sm:px-8 max-w-6xl mx-auto z-20">
        
        {/* Botanical Margin Foliage Accent */}
        <img 
          src="/landing-pages/meng-to-sketchbook/botany-right.png" 
          alt="" 
          className="hidden xl:block absolute -right-20 top-20 w-88 h-auto opacity-15 pointer-events-none select-none filter blur-[0.3px]" 
        />

        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141b15]/85 border border-[#00F59B]/35 text-xs font-mono text-[#86efac] specular-rim">
            <Award className="w-3.5 h-3.5 text-[#00F59B]" />
            <span>Proven Industrial Benchmarks</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
            Planetary Impact Measured in Milliseconds
          </h2>
          <p className="text-xs sm:text-sm text-[#a0a89b] font-light">
            Quantifiable clean energy gains through hardware-accelerated deterministic dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Stat 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-3xl bg-[#141b15]/80 backdrop-blur-2xl border border-white/10 hover:border-[#00F59B]/40 transition-all text-center group specular-rim shadow-[0_15px_40px_rgba(0,0,0,0.35)]"
          >
            <div className="text-4xl sm:text-5xl font-light text-white font-mono group-hover:text-[#6EE7B7] transition-colors">
              +{state.batteryLifespanExtPct.toFixed(1)}%
            </div>
            <div className="text-xs text-[#00F59B] font-medium mt-2">BESS Longevity Extension</div>
            <p className="text-xs text-[#a0a89b] font-light mt-1">
              Rainflow cycle suppression shields multi-million-dollar warranty.
            </p>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-3xl bg-[#141b15]/80 backdrop-blur-2xl border border-white/10 hover:border-[#22D3EE]/40 transition-all text-center group specular-rim shadow-[0_15px_40px_rgba(0,0,0,0.35)]"
          >
            <div className="text-4xl sm:text-5xl font-light text-white font-mono group-hover:text-[#22D3EE] transition-colors">
              {state.inferenceLatencyMs.toFixed(1)} ms
            </div>
            <div className="text-xs text-[#22D3EE] font-medium mt-2">Edge Neural Latency</div>
            <p className="text-xs text-[#a0a89b] font-light mt-1">
              Deterministic ONNX INT8 execution eliminates cloud API delays.
            </p>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-3xl bg-[#141b15]/80 backdrop-blur-2xl border border-white/10 hover:border-[#00F59B]/40 transition-all text-center group specular-rim shadow-[0_15px_40px_rgba(0,0,0,0.35)]"
          >
            <div className="text-4xl sm:text-5xl font-light text-white font-mono group-hover:text-[#6EE7B7] transition-colors">
              {state.cumulativeCo2SavedKg.toFixed(1)} kg
            </div>
            <div className="text-xs text-[#00F59B] font-medium mt-2">CO₂ Abated Real-Time</div>
            <p className="text-xs text-[#a0a89b] font-light mt-1">
              Diesel emissions eliminated during rapid cloud intermittency.
            </p>
          </motion.div>

          {/* Stat 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-3xl bg-[#141b15]/80 backdrop-blur-2xl border border-white/10 hover:border-amber-400/40 transition-all text-center group specular-rim shadow-[0_15px_40px_rgba(0,0,0,0.35)]"
          >
            <div className="text-4xl sm:text-5xl font-light text-white font-mono group-hover:text-amber-300 transition-colors">
              ${state.costSavingsUSD.toFixed(2)}
            </div>
            <div className="text-xs text-amber-300 font-medium mt-2">Peak Tariff Shaving</div>
            <p className="text-xs text-[#a0a89b] font-light mt-1">
              Automated arbitrage and demand-charge curtailment.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ── 8. CONVERSION CALLOUT / LAUNCH GATEWAY ── */}
      <section className="relative py-20 px-4 sm:px-8 max-w-5xl mx-auto z-20">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-14 rounded-[40px] bg-gradient-to-b from-[#18241b]/90 to-[#101812]/95 backdrop-blur-2xl border border-[#00F59B]/40 shadow-[0_25px_80px_rgba(0,245,155,0.25)] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden specular-rim"
        >
          {/* Ambient Botanical Arch Light */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00F59B] to-transparent opacity-75" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#00F59B]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101812] border border-[#00F59B]/35 text-xs font-mono text-[#86efac] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#00F59B]" />
              <span>Edge SCADA Ready</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
              Ready to operate the microgrid?
            </h3>
            <p className="text-xs sm:text-sm text-[#a0a89b] font-light max-w-xl">
              Access the live digital twin, interactive sandbox, and telemetry ledger in the SCADA Console.
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <button
              onClick={onOpenSpecs}
              className="px-5 py-3 rounded-2xl text-xs font-light bg-[#121a14] hover:bg-[#1a261c] border border-white/12 hover:border-[#00F59B]/40 text-white transition-all flex items-center gap-2 cursor-pointer specular-rim"
            >
              <FileText className="w-4 h-4 text-[#34d399]" />
              <span>Specs</span>
            </button>
            <button
              onClick={() => onLaunchConsole('overview')}
              className="px-6 py-3.5 rounded-2xl text-xs font-medium bg-gradient-to-r from-[#00F59B] via-[#34d399] to-[#22D3EE] text-[#09120c] hover:opacity-95 transition-all shadow-[0_0_25px_rgba(0,245,155,0.45)] flex items-center gap-2 cursor-pointer"
            >
              <span>Enter SCADA Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── 9. PRO LIVING GREEN FOOTER ── */}
      <footer className="py-14 px-6 border-t border-white/10 text-center text-xs text-[#788274] font-light bg-[#0a0d0a]/90 backdrop-blur-xl relative z-20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#00F59B]/20 border border-[#00F59B]/40 flex items-center justify-center text-[#00F59B]">
              <Leaf className="w-3.5 h-3.5" />
            </div>
            <span className="text-white font-medium">VoltSense AI</span>
            <span className="text-[#a0a89b]">· Living Green Microgrid OS</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#a0a89b]">
            <button onClick={() => onLaunchConsole('overview')} className="hover:text-[#00F59B] transition-colors cursor-pointer">Topology Twin</button>
            <button onClick={() => onLaunchConsole('forecast')} className="hover:text-[#00F59B] transition-colors cursor-pointer">Neural Forecast</button>
            <button onClick={() => onLaunchConsole('battery')} className="hover:text-[#00F59B] transition-colors cursor-pointer">Battery Guardian</button>
            <button onClick={() => onLaunchConsole('sandbox')} className="hover:text-[#00F59B] transition-colors cursor-pointer">Sandbox</button>
            <button onClick={onOpenSpecs} className="hover:text-[#00F59B] transition-colors cursor-pointer">Architecture</button>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-[#86efac]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B] animate-ping" />
            <span>Modbus RTU / IEC 61850 Active</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
