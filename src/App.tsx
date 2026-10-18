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
  DollarSign
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
      badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30',
    },
    {
      id: 'init-2',
      timestamp: '12:00:01.502',
      type: 'DISPATCH',
      message: 'Horizon synced. Solar surplus (+10.2kW) routed to BESS charge buffer.',
      deltaCo2: 0.12,
      badgeColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30',
    },
    {
      id: 'init-3',
      timestamp: '12:00:03.018',
      type: 'PROTECT',
      message: 'Slew-rate limit active (12.5 kW/s). Battery micro-cycling suppressed.',
      deltaCo2: 0.08,
      badgeColor: 'text-purple-400 bg-purple-950/60 border-purple-500/30',
    },
  ]);

  const [activeTab, setActiveTab] = useState<NavTab>('landing');
  const [overviewDisplay, setOverviewDisplay] = useState<'circuit' | 'aurora-3d'>('circuit');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSimulationRunning, setIsSimulationRunning] = useState<boolean>(true);
  const [isSpecsModalOpen, setIsSpecsModalOpen] = useState<boolean>(false);
  const [tickCounter, setTickCounter] = useState<number>(0);

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
        ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30'
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
        badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30',
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
        badgeColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30',
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
      case 'overview': return 'Overview';
      case 'forecast': return 'AI Forecast';
      case 'battery': return 'Battery Life';
      case 'sandbox': return 'Live Sandbox';
      case 'ledger': return 'Audit Log';
      case 'specs': return 'Specs';
    }
  };

  const latestLog = logs[0] || {
    message: 'Edge-AI active on Raspberry Pi 5 · 100% clean autonomous dispatch',
    timestamp: '12:00:00'
  };

  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen bg-[#060913] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
        <LandingPage
          onLaunchConsole={() => setActiveTab('overview')}
          onOpenSpecs={() => setIsSpecsModalOpen(true)}
          state={state}
          onApplyScenario={handleApplyScenario}
        />
        <PitchDeckModal
          isOpen={isSpecsModalOpen}
          onClose={() => setIsSpecsModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex font-sans selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-x-hidden">
      
      {/* Ambient Animated Atmospheric Glow Orbs (Subtle Depth) */}
      <div className="fixed top-1/4 left-1/4 w-[32rem] h-[32rem] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none animate-float-drift -z-10" />
      <div className="fixed bottom-1/4 right-1/4 w-[36rem] h-[36rem] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none animate-float-drift-reverse -z-10" />

      {/* 1. Sidebar Navigation */}
      <SidebarNavigation
        activeTab={activeTab}
        onTabChange={handleTabSelect}
        state={state}
        mobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
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
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1500px] w-full mx-auto">
          
          {/* TAB 1: OVERVIEW (Clean, User-Friendly & Visually Engaging) */}
          {activeTab === 'overview' && (
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              
              {/* Executive 4-Card KPI Impact Bar (With Framer Motion Hover Lift) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Metric 1: Clean Solar Generation */}
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-emerald-500/50 hover:shadow-[0_10px_25px_-5px_rgba(16,185,129,0.2)] transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all pointer-events-none" />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400 font-medium">Solar Generation</span>
                    <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
                      <Sun className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
                      {state.solarKW}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">kW</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 font-mono">
                    <span>Irradiance: {state.irradiance} W/m²</span>
                    <span className="text-emerald-400 font-bold">100% Clean</span>
                  </div>
                </motion.div>

                {/* Metric 2: Smart Battery Storage */}
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/50 hover:shadow-[0_10px_25px_-5px_rgba(6,182,212,0.2)] transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/10 transition-all pointer-events-none" />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400 font-medium">Battery Energy Storage</span>
                    <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400">
                      <BatteryCharging className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-300">
                      {state.bessSoC}%
                    </span>
                    <span className="text-xs text-cyan-400 font-mono">
                      ({state.bessKW > 0 ? `+${state.bessKW}` : state.bessKW} kW)
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 font-mono">
                    <span>Health: {state.bessHealthPct}% SoH</span>
                    <span className="text-cyan-300 font-bold">+15.2% Life Ext.</span>
                  </div>
                </motion.div>

                {/* Metric 3: Facility Demand */}
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-amber-500/50 hover:shadow-[0_10px_25px_-5px_rgba(245,158,11,0.2)] transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-all pointer-events-none" />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400 font-medium">Facility Consumption</span>
                    <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400">
                      <Factory className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">
                      {state.facilityLoadKW}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">kW</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 font-mono">
                    <span>Diesel Generator:</span>
                    <span className="text-emerald-400 font-bold uppercase">{state.dieselStatus}</span>
                  </div>
                </motion.div>

                {/* Metric 4: Environmental & Cost Savings */}
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-emerald-500/50 hover:shadow-[0_10px_25px_-5px_rgba(16,185,129,0.2)] transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all pointer-events-none" />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400 font-medium">Avoided Carbon & Cost</span>
                    <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
                      <Leaf className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
                      {state.cumulativeCo2SavedKg.toFixed(2)}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">kg CO₂</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 font-mono">
                    <span>Saved: +${state.costSavingsUSD.toFixed(2)}</span>
                    <span className="text-emerald-400 font-bold">Zero Diesel Used</span>
                  </div>
                </motion.div>

              </div>

              {/* View Switcher: Interactive Circuit Topology vs 3D Solar Flux Curtain */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <div className="inline-flex p-1 bg-slate-950 rounded-xl border border-slate-800 relative text-xs">
                    <button
                      onClick={() => setOverviewDisplay('circuit')}
                      className={`relative px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 z-10 ${
                        overviewDisplay === 'circuit' ? 'text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {overviewDisplay === 'circuit' && (
                        <motion.div
                          layoutId="overviewDisplayPill"
                          className="absolute inset-0 bg-slate-800 rounded-lg -z-10 shadow-sm border border-slate-700"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <Layers className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Live Power Grid Circuit</span>
                    </button>

                    <button
                      onClick={() => setOverviewDisplay('aurora-3d')}
                      className={`relative px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 z-10 ${
                        overviewDisplay === 'aurora-3d' ? 'text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {overviewDisplay === 'aurora-3d' && (
                        <motion.div
                          layoutId="overviewDisplayPill"
                          className="absolute inset-0 bg-slate-800 rounded-lg -z-10 shadow-sm border border-slate-700"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <Box className="w-3.5 h-3.5 text-cyan-400" />
                      <span>3D Solar Flux Curtain</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    </button>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Interactive Real-Time Mode</span>
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
                    className="glass-panel rounded-3xl p-5 border border-slate-800 shadow-2xl space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                      <div>
                        <h2 className="text-sm font-bold text-white flex items-center gap-2">
                          3D Solar Electromagnetic Wave Curtain
                        </h2>
                        <p className="text-xs text-slate-400">
                          Rayleigh-Mie atmospheric scattering · 3 drifting layers of photon radiation
                        </p>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-bold">
                          Solar: {state.solarKW} kW
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 font-bold">
                          GHI: {state.irradiance} W/m²
                        </span>
                      </div>
                    </div>

                    <div className="rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950/60">
                      <AuroraCurtain
                        columns={56}
                        layers={3}
                        palette="aurora"
                        title="Solar Photon Radiance Field"
                        subtitle="Real-time atmospheric wave oscillation · Drag to orbit 3D camera"
                        hint="Drag to orbit · hover emitters to inspect photon density · click swatches"
                        height={380}
                        autoRotate={0.16}
                        className="bg-transparent border-0"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Real-Time Edge-AI Activity Ticker (Customer-Friendly Live Action) */}
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-inner">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 shrink-0">
                    <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                  <div className="truncate">
                    <span className="text-slate-400 font-mono mr-2">[{latestLog.timestamp}]</span>
                    <span className="text-slate-200 font-medium">{latestLog.message}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('ledger')}
                  className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 shrink-0 self-end sm:self-center"
                >
                  <span>View Full Audit Log</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 3 Quick Visual Navigation Shortcuts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.button
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  onClick={() => setActiveTab('forecast')}
                  className="p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-left transition-all flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-200 group-hover:text-cyan-300">
                        24-Hour AI Forecast
                      </div>
                      <div className="text-xs text-slate-400">
                        96 intervals · 3.12% MAPE
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                </motion.button>

                <motion.button
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  onClick={() => setActiveTab('battery')}
                  className="p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-left transition-all flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                      <BatteryCharging className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-200 group-hover:text-purple-300">
                        Battery Degradation Model
                      </div>
                      <div className="text-xs text-slate-400">
                        +15.2% life extension · 10-yr curves
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all" />
                </motion.button>

                <motion.button
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  onClick={() => setActiveTab('sandbox')}
                  className="p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-left transition-all flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                      <Sliders className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-200 group-hover:text-amber-300">
                        Live Sandbox & Sliders
                      </div>
                      <div className="text-xs text-slate-400">
                        Change irradiance, load & storm fronts
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
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
        <footer className="border-t border-slate-800/80 bg-[#070A14] px-6 py-3.5 text-xs font-mono text-slate-500">
          <div className="max-w-[1500px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>VoltSense Edge-AI Dispatch Engine</span>
              <span>·</span>
              <span>Raspberry Pi 5 + ESP32 RTOS</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Ticks: {tickCounter}</span>
              <span className="text-emerald-400 font-bold">100% Offline Autonomous</span>
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
