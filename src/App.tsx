import React, { useState, useEffect, useCallback } from 'react';
import { ControllerMode, ForecastPoint, LedgerLog, MicrogridState } from './types';
import { generateInitialForecast, stepSimulation } from './utils/simulationEngine';
import { SidebarNavigation, NavTab } from './components/SidebarNavigation';
import { HeaderTelemetryBar } from './components/HeaderTelemetryBar';
import { PowerTopologyTwin } from './components/PowerTopologyTwin';
import { SandboxControlPanel } from './components/SandboxControlPanel';
import { ForecastChartModule } from './components/ForecastChartModule';
import { BatteryDegradationPanel } from './components/BatteryDegradationPanel';
import { AuditLedgerTerminal } from './components/AuditLedgerTerminal';
import { PitchDeckModal } from './components/PitchDeckModal';
import { AuroraCurtain } from './components/ui/aurora-curtain';
import { LandingPage } from './components/LandingPage';
import { SylvaLivingWorldScene } from '@designcodeio/threeui';
import { BioluminescentField } from './components/ui/BioluminescentField';
import { 
  Sun, 
  BatteryCharging, 
  Factory, 
  Leaf, 
  TrendingUp, 
  Sliders, 
  ChevronRight, 
  ShieldCheck, 
  FileText, 
  Activity, 
  Box, 
  Layers, 
  Sparkles, 
  DollarSign,
  Radio,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_STATE: MicrogridState = {
  irradiance: 780,
  baseFacilityLoad: 58,
  minSocConstraint: 20,
  weatherHorizon: 'clear',
  controllerMode: 'autonomous',
  isCloudCoverChaosActive: false,
  cloudChaosCountdown: 0,

  solarKW: 68.4,
  facilityLoadKW: 58.2,
  netKW: 10.2,
  bessKW: -10.2, // charging surplus
  gridKW: 0.0,
  dieselKW: 0.0,
  dieselStatus: 'SUPPRESSED',

  bessSoC: 68.4,
  bessCapacityKWh: 200,
  bessHealthPct: 99.4,
  bessDoD: 31.6,
  bessTempC: 26.2,
  bessMicroCycles: 142,
  bessCRate: 0.12,

  cumulativeCo2SavedKg: 14.82,
  dieselHoursReducedPct: 28.4,
  batteryLifespanExtPct: 15.2,
  costSavingsUSD: 18.64,
  cleanEnergyRatioPct: 100.0,

  inferenceLatencyMs: 11.4,
  modelJitterMs: 0.3,
  simulatedTimeMinutes: 720, // 12:00 PM
};

export const App: React.FC = () => {
  const [state, setState] = useState<MicrogridState>(INITIAL_STATE);
  const [forecast, setForecast] = useState<ForecastPoint[]>(() =>
    generateInitialForecast(780, 58, 20)
  );
  const [logs, setLogs] = useState<LedgerLog[]>([
    {
      id: 'init-1',
      timestamp: '12:00:00.114',
      type: 'ONNX-AGENT',
      message: 'VoltSense Edge-AI active on Raspberry Pi 5. ONNX INT8 Ensemble running in 11.4ms.',
      deltaCo2: 0.42,
      badgeColor: 'text-[#00F59B] bg-[#00F59B]/15 border-[#00F59B]/40',
    },
    {
      id: 'init-2',
      timestamp: '12:00:01.502',
      type: 'DISPATCH',
      message: 'Horizon synced. Solar surplus (+10.2kW) routed to BESS charge buffer.',
      deltaCo2: 0.12,
      badgeColor: 'text-[#22D3EE] bg-[#22D3EE]/15 border-[#22D3EE]/40',
    },
    {
      id: 'init-3',
      timestamp: '12:00:03.018',
      type: 'PROTECT',
      message: 'Slew-rate limit active (12.5 kW/s). Battery micro-cycling suppressed.',
      deltaCo2: 0.08,
      badgeColor: 'text-[#C084FC] bg-[#C084FC]/15 border-[#C084FC]/40',
    },
  ]);

  const [activeTab, setActiveTab] = useState<NavTab>('landing');
  const [overviewDisplay, setOverviewDisplay] = useState<'circuit' | 'aurora-3d'>('circuit');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSimulationRunning, setIsSimulationRunning] = useState<boolean>(true);
  const [isSpecsModalOpen, setIsSpecsModalOpen] = useState<boolean>(false);
  const [tickCounter, setTickCounter] = useState<number>(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse coordinates for organic halo illumination
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Recalculate 96-forecast when sliders change
  useEffect(() => {
    setForecast(generateInitialForecast(state.irradiance, state.baseFacilityLoad, state.minSocConstraint));
  }, [state.irradiance, state.baseFacilityLoad, state.minSocConstraint]);

  // Master 1.5-second simulation loop
  useEffect(() => {
    if (!isSimulationRunning) return;

    const interval = setInterval(() => {
      setTickCounter((prevCount) => {
        const nextCount = prevCount + 1;
        setState((prevState) => {
          const { nextState, newLog } = stepSimulation(prevState, nextCount);
          if (newLog) {
            setLogs((prevLogs) => [newLog, ...prevLogs.slice(0, 150)]);
          }
          return nextState;
        });
        return nextCount;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isSimulationRunning]);

  // Controller mode change
  const handleModeChange = useCallback((mode: ControllerMode) => {
    setState((prev) => ({ ...prev, controllerMode: mode }));
    const nowStr = new Date().toTimeString().split(' ')[0] + '.' + Math.floor(Math.random() * 899 + 100);
    const modeLog: LedgerLog = {
      id: `mode-${Date.now()}`,
      timestamp: nowStr,
      type: mode === 'autonomous' ? 'ONNX-AGENT' : mode === 'legacy' ? 'ALERT' : 'PROTECT',
      message: `[MODE SWITCH] Switched to ${mode.toUpperCase()} mode.`,
      deltaCo2: 0,
      badgeColor: mode === 'autonomous' 
        ? 'text-[#00F59B] bg-[#00F59B]/15 border-[#00F59B]/40'
        : mode === 'legacy'
        ? 'text-amber-400 bg-amber-950/60 border-amber-500/30'
        : 'text-rose-400 bg-rose-950/60 border-rose-500/30',
    };
    setLogs((prev) => [modeLog, ...prev]);
  }, []);

  // Chaos Stress-Test Trigger
  const handleTriggerChaos = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isCloudCoverChaosActive: true,
      cloudChaosCountdown: 8,
    }));
    const nowStr = new Date().toTimeString().split(' ')[0] + '.' + Math.floor(Math.random() * 899 + 100);
    const chaosLog: LedgerLog = {
      id: `chaos-${Date.now()}`,
      timestamp: nowStr,
      type: 'ALERT',
      message: '[CHAOS INJECTED] Cloud cover drop (-80%). Sub-second BESS ramp engaged.',
      deltaCo2: 0,
      badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-500/30',
    };
    setLogs((prev) => [chaosLog, ...prev]);
  }, []);

  // 1-Click Intuitive Scenarios
  const handleApplyScenario = useCallback((scenario: 'sunny' | 'cloud' | 'night' | 'islanded') => {
    const nowStr = new Date().toTimeString().split(' ')[0] + '.' + Math.floor(Math.random() * 899 + 100);
    if (scenario === 'sunny') {
      setState((prev) => ({
        ...prev,
        irradiance: 880,
        baseFacilityLoad: 52,
        controllerMode: 'autonomous',
        isCloudCoverChaosActive: false,
        cloudChaosCountdown: 0,
      }));
      setLogs((prev) => [{
        id: `sc-${Date.now()}`,
        timestamp: nowStr,
        type: 'ONNX-AGENT',
        message: '[SCENARIO: SUNNY PEAK] Irradiance 880 W/m². High solar surplus charging BESS buffer.',
        deltaCo2: 0.85,
        badgeColor: 'text-[#00F59B] bg-[#00F59B]/15 border-[#00F59B]/40',
      }, ...prev]);
    } else if (scenario === 'cloud') {
      setState((prev) => ({
        ...prev,
        irradiance: 160,
        baseFacilityLoad: 75,
        controllerMode: 'autonomous',
        isCloudCoverChaosActive: true,
        cloudChaosCountdown: 6,
      }));
      setLogs((prev) => [{
        id: `sc-${Date.now()}`,
        timestamp: nowStr,
        type: 'ALERT',
        message: '[SCENARIO: CLOUD STORM] Irradiance collapsed (-80%). Sub-second BESS discharge dispatched.',
        deltaCo2: 0.12,
        badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-500/30',
      }, ...prev]);
    } else if (scenario === 'night') {
      setState((prev) => ({
        ...prev,
        irradiance: 0,
        baseFacilityLoad: 68,
        controllerMode: 'autonomous',
        isCloudCoverChaosActive: false,
        cloudChaosCountdown: 0,
      }));
      setLogs((prev) => [{
        id: `sc-${Date.now()}`,
        timestamp: nowStr,
        type: 'DISPATCH',
        message: '[SCENARIO: NIGHT DISCHARGE] Zero solar. BESS discharging smoothly to power facility.',
        deltaCo2: 0.44,
        badgeColor: 'text-[#22D3EE] bg-[#22D3EE]/15 border-[#22D3EE]/40',
      }, ...prev]);
    } else if (scenario === 'islanded') {
      setState((prev) => ({
        ...prev,
        irradiance: 650,
        baseFacilityLoad: 54,
        controllerMode: 'islanded',
        isCloudCoverChaosActive: false,
        cloudChaosCountdown: 0,
      }));
      setLogs((prev) => [{
        id: `sc-${Date.now()}`,
        timestamp: nowStr,
        type: 'PROTECT',
        message: '[SCENARIO: GRID OUTAGE] Utility grid disconnected. Islanded microgrid stabilizing bus frequency.',
        deltaCo2: 0.52,
        badgeColor: 'text-rose-400 bg-rose-950/60 border-rose-500/30',
      }, ...prev]);
    }
  }, []);

  const handleUpdateState = useCallback((updates: Partial<MicrogridState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleResetDefaults = useCallback(() => {
    setState((prev) => ({
      ...prev,
      irradiance: 780,
      baseFacilityLoad: 58,
      minSocConstraint: 20,
      weatherHorizon: 'clear',
      isCloudCoverChaosActive: false,
      cloudChaosCountdown: 0,
    }));
  }, []);

  const handleClearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const handleTabSelect = (tab: NavTab) => {
    if (tab === 'specs') {
      setIsSpecsModalOpen(true);
    } else {
      setActiveTab(tab);
    }
  };

  const getTabTitle = (tab: NavTab) => {
    switch (tab) {
      case 'landing': return 'Commercial Home';
      case 'overview': return 'Power Topology Twin';
      case 'forecast': return 'AI Forecast';
      case 'battery': return 'Battery Life Engine';
      case 'sandbox': return 'Live Sandbox & Chaos';
      case 'ledger': return 'ESG Audit Log';
      case 'specs': return 'Technical Specs';
    }
  };

  const latestLog = logs[0] || {
    message: 'Edge-AI active on Raspberry Pi 5 · 100% clean autonomous dispatch',
    timestamp: '12:00:00'
  };

  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen bg-[#0d110d] text-[#F2F3EF] font-sans selection:bg-[#00F59B]/30 selection:text-white">
        <LandingPage
          onLaunchConsole={(initialTab) => setActiveTab(initialTab || 'overview')}
          onOpenSpecs={() => setIsSpecsModalOpen(true)}
          state={state}
          onApplyScenario={handleApplyScenario}
          onUpdateState={handleUpdateState}
        />
        <PitchDeckModal
          isOpen={isSpecsModalOpen}
          onClose={() => setIsSpecsModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d110d] text-[#F2F3EF] flex font-sans selection:bg-[#00F59B]/30 selection:text-white relative overflow-x-hidden">
      
      {/* ── BACKGROUND LAYER 1: PERSISTENT 3D LIVING GREEN WORLD (FIXED) ── */}
      <div className="fixed inset-0 w-full h-screen pointer-events-none z-0 overflow-hidden opacity-35">
        <SylvaLivingWorldScene className="w-full h-full object-cover" />
      </div>

      {/* ── BACKGROUND LAYER 2: BIOLUMINESCENT SPORE PARTICLES CANVAS (FIXED) ── */}
      <BioluminescentField className="opacity-90" />

      {/* ── BACKGROUND LAYER 3: MOUSE-REACTIVE LIVING HALO ILLUMINATION ── */}
      <motion.div
        className="fixed w-[36rem] h-[36rem] rounded-full pointer-events-none z-0 blur-[140px] hidden md:block"
        animate={{
          x: mousePos.x - 288,
          y: mousePos.y - 288,
        }}
        transition={{
          type: "spring",
          damping: 32,
          stiffness: 120,
          mass: 0.6
        }}
        style={{
          background: "radial-gradient(circle, rgba(0,255,178,0.12) 0%, rgba(6,182,212,0.06) 40%, rgba(168,85,247,0.02) 65%, transparent 80%)"
        }}
      />

      {/* ── BACKGROUND LAYER 4: DYNAMIC LIVING ATMOSPHERIC LIGHT POOLS ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[36rem] h-[36rem] bg-[#00F59B]/10 rounded-full blur-[150px] animate-float-drift" />
        <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-[#22D3EE]/8 rounded-full blur-[160px] animate-float-drift-reverse" />
        <div className="absolute top-[60%] left-1/3 w-[32rem] h-[32rem] bg-[#FBBF24]/6 rounded-full blur-[170px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d110d]/85 via-[#0d110d]/70 to-[#080c08]/95" />
      </div>

      {/* 1. Sidebar Navigation (Left Dock) */}
      <SidebarNavigation
        activeTab={activeTab}
        onTabChange={handleTabSelect}
        state={state}
        mobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        
        {/* Top Header Bar */}
        <HeaderTelemetryBar
          state={state}
          onModeChange={handleModeChange}
          onTriggerChaos={handleTriggerChaos}
          onOpenSpecsModal={() => setIsSpecsModalOpen(true)}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          activeTabTitle={getTabTitle(activeTab)}
          isSimRunning={isSimulationRunning}
          onToggleSim={() => setIsSimulationRunning(!isSimulationRunning)}
          onGoHome={() => setActiveTab('landing')}
        />

        {/* Main Canvas Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
          
          {/* TAB 1: OVERVIEW (Power Topology Twin Cockpit) */}
          {activeTab === 'overview' && (
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              
              {/* Executive 4-Card Jewel-Tone KPI Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Metric 1: Clean Solar Generation */}
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-5 rounded-2xl glass-vibrant-card specular-rim hover:border-[#00F59B]/50 hover:shadow-[0_15px_35px_rgba(0,245,155,0.22)] transition-all relative overflow-hidden group font-sans"
                >
                  <div className="absolute top-0 right-0 w-28 h-28 bg-[#00F59B]/8 rounded-full blur-xl group-hover:bg-[#00F59B]/15 transition-all pointer-events-none" />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#9da395] font-light">Solar Generation</span>
                    <div className="p-2.5 rounded-xl bg-[#00F59B]/15 text-[#00F59B] border border-[#00F59B]/30 shadow-[0_0_12px_rgba(0,245,155,0.3)]">
                      <Sun className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-light font-mono text-[#00F59B]">
                      {state.solarKW}
                    </span>
                    <span className="text-xs text-[#9da395] font-light">kW</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-[#9da395] border-t border-white/10 pt-2 font-mono">
                    <span>Irradiance: {state.irradiance} W/m²</span>
                    <span className="text-[#00F59B] font-semibold">100% Clean</span>
                  </div>
                </motion.div>

                {/* Metric 2: Smart Battery Storage */}
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-5 rounded-2xl glass-vibrant-card specular-rim hover:border-[#22D3EE]/50 hover:shadow-[0_15px_35px_rgba(34,211,238,0.22)] transition-all relative overflow-hidden group font-sans"
                >
                  <div className="absolute top-0 right-0 w-28 h-28 bg-[#22D3EE]/8 rounded-full blur-xl group-hover:bg-[#22D3EE]/15 transition-all pointer-events-none" />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#9da395] font-light">BESS Storage Bank</span>
                    <div className="p-2.5 rounded-xl bg-[#22D3EE]/15 text-[#22D3EE] border border-[#22D3EE]/30 shadow-[0_0_12px_rgba(34,211,238,0.3)]">
                      <BatteryCharging className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-light font-mono text-[#22D3EE]">
                      {state.bessSoC}%
                    </span>
                    <span className="text-xs text-[#00F59B] font-mono">
                      ({state.bessKW > 0 ? `+${state.bessKW}` : state.bessKW} kW)
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-[#9da395] border-t border-white/10 pt-2 font-mono">
                    <span>Health: {state.bessHealthPct}% SoH</span>
                    <span className="text-[#00F59B] font-semibold">+15.2% Life Ext.</span>
                  </div>
                </motion.div>

                {/* Metric 3: Facility Demand */}
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-5 rounded-2xl glass-vibrant-card specular-rim hover:border-[#FBBF24]/50 hover:shadow-[0_15px_35px_rgba(251,191,36,0.22)] transition-all relative overflow-hidden group font-sans"
                >
                  <div className="absolute top-0 right-0 w-28 h-28 bg-[#FBBF24]/8 rounded-full blur-xl group-hover:bg-[#FBBF24]/15 transition-all pointer-events-none" />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#9da395] font-light">Facility Consumption</span>
                    <div className="p-2.5 rounded-xl bg-[#FBBF24]/15 text-[#FBBF24] border border-[#FBBF24]/30 shadow-[0_0_12px_rgba(251,191,36,0.3)]">
                      <Factory className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-light font-mono text-[#FBBF24]">
                      {state.facilityLoadKW}
                    </span>
                    <span className="text-xs text-[#9da395] font-light">kW</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-[#9da395] border-t border-white/10 pt-2 font-mono">
                    <span>Diesel Generator:</span>
                    <span className="text-[#00F59B] font-semibold uppercase">{state.dieselStatus}</span>
                  </div>
                </motion.div>

                {/* Metric 4: Environmental & Cost Savings */}
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-5 rounded-2xl glass-vibrant-card specular-rim hover:border-[#C084FC]/50 hover:shadow-[0_15px_35px_rgba(192,132,252,0.22)] transition-all relative overflow-hidden group font-sans"
                >
                  <div className="absolute top-0 right-0 w-28 h-28 bg-[#C084FC]/8 rounded-full blur-xl group-hover:bg-[#C084FC]/15 transition-all pointer-events-none" />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#9da395] font-light">Avoided Carbon & Net Value</span>
                    <div className="p-2.5 rounded-xl bg-[#C084FC]/15 text-[#C084FC] border border-[#C084FC]/30 shadow-[0_0_12px_rgba(192,132,252,0.3)]">
                      <Leaf className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-light font-mono text-gradient-vibrant">
                      {state.cumulativeCo2SavedKg.toFixed(2)}
                    </span>
                    <span className="text-xs text-[#9da395] font-light">kg CO₂</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-[#9da395] border-t border-white/10 pt-2 font-mono">
                    <span>Saved: +${state.costSavingsUSD.toFixed(2)}</span>
                    <span className="text-[#00F59B] font-semibold">Zero Diesel Used</span>
                  </div>
                </motion.div>

              </div>

              {/* View Switcher: Interactive Circuit Topology vs 3D Solar Flux Curtain */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <div className="inline-flex p-1 bg-[#080d09]/90 rounded-2xl border border-white/10 relative text-xs shadow-inner">
                    <button
                      onClick={() => setOverviewDisplay('circuit')}
                      className={`relative px-4 py-2 rounded-xl font-light transition-all flex items-center gap-2 z-10 ${
                        overviewDisplay === 'circuit' ? 'text-white font-medium' : 'text-[#9da395] hover:text-[#f2f3ef]'
                      }`}
                    >
                      {overviewDisplay === 'circuit' && (
                        <motion.div
                          layoutId="overviewDisplayPill"
                          className="absolute inset-0 bg-gradient-to-r from-[#00F59B]/25 to-[#34D399]/20 rounded-xl -z-10 shadow-[0_0_15px_rgba(0,245,155,0.3)] border border-[#00F59B]/50"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <Layers className="w-3.5 h-3.5 text-[#00F59B]" />
                      <span>Live Power Grid Circuit</span>
                    </button>

                    <button
                      onClick={() => setOverviewDisplay('aurora-3d')}
                      className={`relative px-4 py-2 rounded-xl font-light transition-all flex items-center gap-2 z-10 ${
                        overviewDisplay === 'aurora-3d' ? 'text-white font-medium' : 'text-[#9da395] hover:text-[#f2f3ef]'
                      }`}
                    >
                      {overviewDisplay === 'aurora-3d' && (
                        <motion.div
                          layoutId="overviewDisplayPill"
                          className="absolute inset-0 bg-gradient-to-r from-[#22D3EE]/25 to-[#06B6D4]/20 rounded-xl -z-10 shadow-[0_0_15px_rgba(34,211,238,0.3)] border border-[#22D3EE]/50"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <Box className="w-3.5 h-3.5 text-[#22D3EE]" />
                      <span>3D Solar Flux Curtain</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B] animate-ping" />
                    </button>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#9da395]">
                  <span className="w-2 h-2 rounded-full bg-[#00F59B] animate-pulse" />
                  <span>Real-Time Closed-Loop Physics</span>
                </div>
              </div>

              {/* Main Visual Centerpiece */}
              <AnimatePresence mode="wait">
                {overviewDisplay === 'circuit' ? (
                  <motion.div
                    key="display-circuit"
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.2 }}
                    className="w-full"
                  >
                    <PowerTopologyTwin 
                      state={state} 
                      onApplyScenario={handleApplyScenario}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="display-aurora"
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.2 }}
                    className="glass-vibrant-card specular-rim rounded-3xl p-6 border border-white/10 shadow-2xl space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                      <div>
                        <h2 className="text-base font-light text-white flex items-center gap-2">
                          3D Solar Electromagnetic Wave Curtain
                        </h2>
                        <p className="text-xs text-[#9da395] font-light">
                          Rayleigh-Mie atmospheric scattering · 3 drifting layers of photon radiation
                        </p>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="px-3 py-1 rounded-xl bg-[#080d09]/90 border border-white/10 text-[#00F59B]">
                          Solar: {state.solarKW} kW
                        </span>
                        <span className="px-3 py-1 rounded-xl bg-[#080d09]/90 border border-white/10 text-[#22D3EE]">
                          GHI: {state.irradiance} W/m²
                        </span>
                      </div>
                    </div>

                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#080d09]/90 shadow-inner">
                      <AuroraCurtain
                        columns={56}
                        layers={3}
                        palette="aurora"
                        title="Solar Photon Radiance Field"
                        subtitle="Real-time atmospheric wave oscillation · Drag to orbit 3D camera"
                        hint="Drag to orbit · hover emitters to inspect photon density · click swatches"
                        height={400}
                        autoRotate={0.16}
                        className="bg-transparent border-0"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Real-Time Edge-AI Activity Ticker */}
              <div className="p-4 rounded-2xl glass-vibrant-card specular-rim flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-xl">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-[#00F59B]/20 border border-[#00F59B]/40 text-[#00F59B] shrink-0 shadow-[0_0_12px_rgba(0,245,155,0.3)]">
                    <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                  <div className="truncate">
                    <span className="text-[#9da395] font-mono mr-2">[{latestLog.timestamp}]</span>
                    <span className="text-[#f2f3ef] font-light">{latestLog.message}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('ledger')}
                  className="text-xs font-mono text-[#00F59B] hover:text-[#6EE7B7] flex items-center gap-1 shrink-0 self-end sm:self-center cursor-pointer transition-colors"
                >
                  <span>View Full Audit Log</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* 3 Quick Visual Navigation Shortcuts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.button
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  onClick={() => setActiveTab('forecast')}
                  className="p-5 rounded-2xl glass-vibrant-card specular-rim hover:border-[#22D3EE]/50 text-left transition-all flex items-center justify-between group shadow-xl cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-2xl bg-[#22D3EE]/15 border border-[#22D3EE]/30 text-[#22D3EE] group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(34,211,238,0.25)]">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-[#22D3EE] transition-colors">
                        24-Hour AI Forecast
                      </div>
                      <div className="text-xs text-[#9da395] font-light">
                        96 intervals · 3.12% MAPE
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#7c8177] group-hover:text-[#22D3EE] group-hover:translate-x-1 transition-all" />
                </motion.button>

                <motion.button
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  onClick={() => setActiveTab('battery')}
                  className="p-5 rounded-2xl glass-vibrant-card specular-rim hover:border-[#C084FC]/50 text-left transition-all flex items-center justify-between group shadow-xl cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-2xl bg-[#C084FC]/15 border border-[#C084FC]/30 text-[#C084FC] group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(192,132,252,0.25)]">
                      <BatteryCharging className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-[#C084FC] transition-colors">
                        Battery Degradation Model
                      </div>
                      <div className="text-xs text-[#9da395] font-light">
                        +15.2% life extension · 10-yr curves
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#7c8177] group-hover:text-[#C084FC] group-hover:translate-x-1 transition-all" />
                </motion.button>

                <motion.button
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  onClick={() => setActiveTab('sandbox')}
                  className="p-5 rounded-2xl glass-vibrant-card specular-rim hover:border-[#FBBF24]/50 text-left transition-all flex items-center justify-between group shadow-xl cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-2xl bg-[#FBBF24]/15 border border-[#FBBF24]/30 text-[#FBBF24] group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(251,191,36,0.25)]">
                      <Sliders className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-[#FBBF24] transition-colors">
                        Live Sandbox & Sliders
                      </div>
                      <div className="text-xs text-[#9da395] font-light">
                        Irradiance, facility loads & chaos
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#7c8177] group-hover:text-[#FBBF24] group-hover:translate-x-1 transition-all" />
                </motion.button>
              </div>

            </motion.div>
          )}

          {/* TAB 2: AI FORECAST */}
          {activeTab === 'forecast' && (
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <ForecastChartModule
                forecast={forecast}
                currentSimMinutes={state.simulatedTimeMinutes}
              />
            </motion.div>
          )}

          {/* TAB 3: BATTERY HEALTH */}
          {activeTab === 'battery' && (
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <BatteryDegradationPanel state={state} />
            </motion.div>
          )}

          {/* TAB 4: LIVE SANDBOX */}
          {activeTab === 'sandbox' && (
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 max-w-4xl mx-auto"
            >
              <SandboxControlPanel
                state={state}
                onUpdateState={handleUpdateState}
                onResetDefaults={handleResetDefaults}
              />
            </motion.div>
          )}

          {/* TAB 5: AUDIT LOG */}
          {activeTab === 'ledger' && (
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <AuditLedgerTerminal
                logs={logs}
                state={state}
                forecast={forecast}
                onClearLogs={handleClearLogs}
              />
            </motion.div>
          )}

        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-[#080d09]/80 backdrop-blur-xl px-6 py-4 text-xs font-mono text-[#7c8177] relative z-10">
          <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[#9da395] font-light">
              <span className="w-2 h-2 rounded-full bg-[#00F59B] animate-pulse" />
              <span className="text-white font-medium">VoltSense Edge-AI Dispatch Engine</span>
              <span>·</span>
              <span>Raspberry Pi 5 + ESP32 RTOS</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Ticks: {tickCounter}</span>
              <span className="text-[#00F59B] font-semibold">100% Offline Autonomous</span>
            </div>
          </div>
        </footer>

      </div>

      {/* Unified SPECS Modal */}
      <PitchDeckModal
        isOpen={isSpecsModalOpen}
        onClose={() => setIsSpecsModalOpen(false)}
      />

    </div>
  );
};

export default App;
