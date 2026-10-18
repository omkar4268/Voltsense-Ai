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
import { 
  Sun, 
  BatteryCharging, 
  Factory, 
  Leaf, 
  Flame, 
  Cpu, 
  TrendingUp, 
  Sliders, 
  Layers,
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

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
      message: 'VoltSense Edge-AI initialized on Raspberry Pi 5. ONNX INT8 Ensemble loaded in 11.4ms.',
      deltaCo2: 0.42,
      badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30',
    },
    {
      id: 'init-2',
      timestamp: '12:00:01.502',
      type: 'DISPATCH',
      message: 'Rolling 96-interval horizon synced. Solar surplus (+10.2kW) routed to BESS charge buffer.',
      deltaCo2: 0.12,
      badgeColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30',
    },
    {
      id: 'init-3',
      timestamp: '12:00:03.018',
      type: 'PROTECT',
      message: 'Slew-rate limiter active (12.5 kW/s max). Battery micro-cycling suppressed. Degradation minimal.',
      deltaCo2: 0.08,
      badgeColor: 'text-purple-400 bg-purple-950/60 border-purple-500/30',
    },
  ]);

  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSimulationRunning, setIsSimulationRunning] = useState<boolean>(true);
  const [isPitchModalOpen, setIsPitchModalOpen] = useState<boolean>(false);
  const [tickCounter, setTickCounter] = useState<number>(0);

  // Recalculate 96-forecast whenever user edits base sliders
  useEffect(() => {
    setForecast(generateInitialForecast(state.irradiance, state.baseFacilityLoad, state.minSocConstraint));
  }, [state.irradiance, state.baseFacilityLoad, state.minSocConstraint]);

  // Master 1.5-second closed-loop physics & dispatch simulation interval
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

  // Controller mode change handler
  const handleModeChange = useCallback((mode: ControllerMode) => {
    setState((prev) => ({
      ...prev,
      controllerMode: mode,
    }));
    const nowStr = new Date().toTimeString().split(' ')[0] + '.' + Math.floor(Math.random() * 899 + 100);
    const modeLog: LedgerLog = {
      id: `mode-${Date.now()}`,
      timestamp: nowStr,
      type: mode === 'autonomous' ? 'ONNX-AGENT' : mode === 'legacy' ? 'ALERT' : 'PROTECT',
      message: `[MODE SWITCH] Controller switched to ${mode.toUpperCase()} mode by operator.`,
      deltaCo2: 0,
      badgeColor: mode === 'autonomous' 
        ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30'
        : mode === 'legacy'
        ? 'text-amber-400 bg-amber-950/60 border-amber-500/30'
        : 'text-rose-400 bg-rose-950/60 border-rose-500/30',
    };
    setLogs((prev) => [modeLog, ...prev]);
  }, []);

  // Quick Chaos Stress-Test Trigger (-80% Irradiance for 12 seconds)
  const handleTriggerChaos = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isCloudCoverChaosActive: true,
      cloudChaosCountdown: 8, // 8 ticks = 12 seconds
    }));
    const nowStr = new Date().toTimeString().split(' ')[0] + '.' + Math.floor(Math.random() * 899 + 100);
    const chaosLog: LedgerLog = {
      id: `chaos-${Date.now()}`,
      timestamp: nowStr,
      type: 'ALERT',
      message: '[CHAOS INJECTED] Sudden cloud cover (-80% Irradiance). Testing edge sub-second BESS response...',
      deltaCo2: 0,
      badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-500/30',
    };
    setLogs((prev) => [chaosLog, ...prev]);
  }, []);

  // Update sandbox state from sliders
  const handleUpdateState = useCallback((updates: Partial<MicrogridState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  // Reset to default baseline parameters
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

  // Clear log buffer
  const handleClearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const getTabTitle = (tab: NavTab) => {
    switch (tab) {
      case 'overview': return 'Microgrid Digital Twin & Power Topology';
      case 'forecast': return '24-Hour Predictive AI Horizon';
      case 'battery': return 'BESS Electrochemical Health & Wear';
      case 'sandbox': return 'Judge Sandbox & Chaos Simulator';
      case 'ledger': return 'Verifiable ESG Carbon Audit Ledger';
      case 'pitch': return 'Hackathon Pitch Deck & Architecture';
    }
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* 1. Responsive Sidebar Navigation */}
      <SidebarNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        state={state}
        mobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* 2. Main Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Executive Header Bar */}
        <HeaderTelemetryBar
          state={state}
          onModeChange={handleModeChange}
          onTriggerChaos={handleTriggerChaos}
          onOpenPitchModal={() => setIsPitchModalOpen(true)}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          activeTabTitle={getTabTitle(activeTab)}
          isSimRunning={isSimulationRunning}
          onToggleSim={() => setIsSimulationRunning(!isSimulationRunning)}
        />

        {/* Tabbed Content Body with Breathable Spacing */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
          
          {/* TAB 1: OVERVIEW (Clean Digital Twin + 4 High-Level KPI Cards) */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* 4 Spacious Primary KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* KPI 1: Solar */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-lg relative overflow-hidden group">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold flex items-center gap-1.5 text-slate-300">
                      <Sun className="w-4 h-4 text-emerald-400" /> Solar PV Output
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      {state.irradiance} W/m²
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold font-mono text-emerald-400 glow-text-emerald">
                      {state.solarKW}
                    </span>
                    <span className="text-sm text-slate-400 font-mono">kW Active</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2 flex justify-between font-mono">
                    <span>Weather: {state.weatherHorizon}</span>
                    <span className="text-emerald-400 font-bold">100% Zero-Carbon</span>
                  </div>
                </div>

                {/* KPI 2: Battery Storage */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-lg relative overflow-hidden group">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold flex items-center gap-1.5 text-slate-300">
                      <BatteryCharging className="w-4 h-4 text-cyan-400" /> BESS Storage
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      {state.bessHealthPct}% SoH
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold font-mono text-cyan-300 glow-text-cyan">
                      {state.bessSoC}%
                    </span>
                    <span className="text-sm font-mono text-cyan-400">
                      ({state.bessKW > 0 ? `+${state.bessKW}` : state.bessKW} kW)
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2 flex justify-between font-mono">
                    <span>Constraint: ≥{state.minSocConstraint}%</span>
                    <span className="text-cyan-300 font-bold">DoD: {state.bessDoD}%</span>
                  </div>
                </div>

                {/* KPI 3: Facility Demand */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-lg relative overflow-hidden group">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold flex items-center gap-1.5 text-slate-300">
                      <Factory className="w-4 h-4 text-amber-400" /> Facility & EV Load
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      Live Metered
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold font-mono text-amber-400 glow-text-amber">
                      {state.facilityLoadKW}
                    </span>
                    <span className="text-sm text-slate-400 font-mono">kW Demand</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2 flex justify-between font-mono">
                    <span>Base: {state.baseFacilityLoad} kW</span>
                    <span className="text-amber-300 font-bold">+ EV Fleet Surge</span>
                  </div>
                </div>

                {/* KPI 4: Carbon & Diesel Suppression */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-lg relative overflow-hidden group">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold flex items-center gap-1.5 text-slate-300">
                      <Leaf className="w-4 h-4 text-emerald-400" /> Avoided Emissions
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      state.dieselStatus === 'ACTIVE' 
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                        : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      DIESEL: {state.dieselStatus}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold font-mono text-emerald-400 glow-text-emerald">
                      {state.cumulativeCo2SavedKg.toFixed(2)}
                    </span>
                    <span className="text-sm text-slate-400 font-mono">kg CO₂</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2 flex justify-between font-mono">
                    <span>Clean: {state.cleanEnergyRatioPct}%</span>
                    <span className="text-emerald-300 font-bold">Saved: ${state.costSavingsUSD}</span>
                  </div>
                </div>

              </div>

              {/* Main Spacious Microgrid Digital Twin Topology Canvas */}
              <div className="w-full">
                <PowerTopologyTwin state={state} />
              </div>

              {/* Quick Navigation Cards to Deep Dive */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div 
                  onClick={() => setActiveTab('forecast')}
                  className="p-4 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-200 group-hover:text-cyan-300">
                        24-Hour Predictive AI Horizon
                      </div>
                      <div className="text-xs text-slate-400">
                        View 96 intervals & XGBoost/LSTM MAPE
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
                </div>

                <div 
                  onClick={() => setActiveTab('battery')}
                  className="p-4 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/40 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400">
                      <BatteryCharging className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-200 group-hover:text-purple-300">
                        Battery Health & Degradation
                      </div>
                      <div className="text-xs text-slate-400">
                        Explore +15.2% life & 10-yr wear curves
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400" />
                </div>

                <div 
                  onClick={() => setActiveTab('sandbox')}
                  className="p-4 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
                      <Sliders className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-200 group-hover:text-amber-300">
                        Judge Sandbox & Sliders
                      </div>
                      <div className="text-xs text-slate-400">
                        Inject chaos & manipulate physics live
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400" />
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: 24-HOUR AI FORECAST */}
          {activeTab === 'forecast' && (
            <div className="space-y-6 animate-fade-in">
              <ForecastChartModule
                forecast={forecast}
                currentSimMinutes={state.simulatedTimeMinutes}
              />
            </div>
          )}

          {/* TAB 3: BATTERY HEALTH & WEAR */}
          {activeTab === 'battery' && (
            <div className="space-y-6 animate-fade-in">
              <BatteryDegradationPanel state={state} />
            </div>
          )}

          {/* TAB 4: JUDGE SANDBOX & CHAOS */}
          {activeTab === 'sandbox' && (
            <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
              <SandboxControlPanel
                state={state}
                onUpdateState={handleUpdateState}
                onResetDefaults={handleResetDefaults}
              />
            </div>
          )}

          {/* TAB 5: ESG CARBON LEDGER */}
          {activeTab === 'ledger' && (
            <div className="space-y-6 animate-fade-in">
              <AuditLedgerTerminal
                logs={logs}
                state={state}
                forecast={forecast}
                onClearLogs={handleClearLogs}
              />
            </div>
          )}

          {/* TAB 6: PITCH & SPECS */}
          {activeTab === 'pitch' && (
            <div className="animate-fade-in">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center max-w-2xl mx-auto space-y-4">
                <Sparkles className="w-10 h-10 text-cyan-400 mx-auto" />
                <h2 className="text-xl font-bold text-white">
                  VoltSense AI Pitch Deck & Specifications
                </h2>
                <p className="text-sm text-slate-300">
                  Open the full modal to review the problem abstract, edge hardware specs (RPi 5 + ESP32 RTOS), mathematical formulation, and verified hackathon impact metrics.
                </p>
                <button
                  onClick={() => setIsPitchModalOpen(true)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono transition-all"
                >
                  Open Full Pitch Deck Modal
                </button>
              </div>
            </div>
          )}

        </main>

        {/* Executive SCADA Footer */}
        <footer className="border-t border-slate-800/80 bg-[#070A14] px-6 py-3 text-xs font-mono text-slate-500">
          <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                VoltSense AI Dispatch Engine Active
              </span>
              <span>|</span>
              <span>Target: ARM64 Cortex-A76 / ESP-IDF</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Ticks: {tickCounter}</span>
              <span className="text-emerald-400 font-bold">100% Offline Autonomous</span>
            </div>
          </div>
        </footer>

      </div>

      {/* Pitch Deck Modal */}
      <PitchDeckModal
        isOpen={isPitchModalOpen}
        onClose={() => setIsPitchModalOpen(false)}
      />

    </div>
  );
};

export default App;
