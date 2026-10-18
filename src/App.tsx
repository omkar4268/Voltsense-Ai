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
  TrendingUp, 
  Sliders, 
  ChevronRight,
  ShieldCheck,
  FileText
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

  const [activeTab, setActiveTab] = useState<NavTab>('overview');
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
      case 'overview': return 'Overview';
      case 'forecast': return 'AI Forecast';
      case 'battery': return 'Battery Life';
      case 'sandbox': return 'Live Sandbox';
      case 'ledger': return 'Audit Log';
      case 'specs': return 'Specs';
    }
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* 1. Sidebar Navigation (Expanded with clear labels) */}
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
        />

        {/* Main Canvas Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1500px] w-full mx-auto">
          
          {/* TAB 1: OVERVIEW (Clean, uncrowded, digital twin takes center stage) */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Clean 4-Metric Summary Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Solar Generation</span>
                    <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                      {state.solarKW} <span className="text-xs font-normal text-slate-400">kW</span>
                    </span>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400">
                    <BatteryCharging className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Battery SoC</span>
                    <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-300">
                      {state.bessSoC}% <span className="text-xs font-normal text-cyan-400">({state.bessKW > 0 ? `+${state.bessKW}` : state.bessKW} kW)</span>
                    </span>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400">
                    <Factory className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Facility Demand</span>
                    <span className="text-xl sm:text-2xl font-bold font-mono text-amber-400">
                      {state.facilityLoadKW} <span className="text-xs font-normal text-slate-400">kW</span>
                    </span>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Avoided CO₂</span>
                    <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                      {state.cumulativeCo2SavedKg.toFixed(2)} <span className="text-xs font-normal text-slate-400">kg</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Connected, High-Resolution Microgrid Digital Twin */}
              <div className="w-full">
                <PowerTopologyTwin state={state} />
              </div>

              {/* 3 Quick Navigation Shortcuts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <button
                  onClick={() => setActiveTab('forecast')}
                  className="p-4 rounded-2xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-left transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
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
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
                </button>

                <button
                  onClick={() => setActiveTab('battery')}
                  className="p-4 rounded-2xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-left transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
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
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400" />
                </button>

                <button
                  onClick={() => setActiveTab('sandbox')}
                  className="p-4 rounded-2xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-left transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
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
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400" />
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: AI FORECAST */}
          {activeTab === 'forecast' && (
            <div className="space-y-6 animate-fade-in">
              <ForecastChartModule
                forecast={forecast}
                currentSimMinutes={state.simulatedTimeMinutes}
              />
            </div>
          )}

          {/* TAB 3: BATTERY HEALTH */}
          {activeTab === 'battery' && (
            <div className="space-y-6 animate-fade-in">
              <BatteryDegradationPanel state={state} />
            </div>
          )}

          {/* TAB 4: LIVE SANDBOX */}
          {activeTab === 'sandbox' && (
            <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
              <SandboxControlPanel
                state={state}
                onUpdateState={handleUpdateState}
                onResetDefaults={handleResetDefaults}
              />
            </div>
          )}

          {/* TAB 5: AUDIT LOG */}
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

        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800/80 bg-[#070A14] px-6 py-3 text-xs font-mono text-slate-500">
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
