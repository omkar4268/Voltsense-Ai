import React, { useState, useEffect, useCallback } from 'react';
import { ControllerMode, ForecastPoint, LedgerLog, MicrogridState } from './types';
import { generateInitialForecast, stepSimulation } from './utils/simulationEngine';
import { HeaderTelemetryBar } from './components/HeaderTelemetryBar';
import { PowerTopologyTwin } from './components/PowerTopologyTwin';
import { SandboxControlPanel } from './components/SandboxControlPanel';
import { ForecastChartModule } from './components/ForecastChartModule';
import { BatteryDegradationPanel } from './components/BatteryDegradationPanel';
import { AuditLedgerTerminal } from './components/AuditLedgerTerminal';
import { PitchDeckModal } from './components/PitchDeckModal';
import { Play, Pause, RefreshCw, Zap, Shield, Sparkles } from 'lucide-react';

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
            setLogs((prevLogs) => [newLog, ...prevLogs.slice(0, 120)]); // Keep last 120 logs
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

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Top Hardware & Edge Telemetry Bar */}
      <HeaderTelemetryBar
        state={state}
        onModeChange={handleModeChange}
        onTriggerChaos={handleTriggerChaos}
        onOpenPitchModal={() => setIsPitchModalOpen(true)}
      />

      {/* Main SCADA Command Center Body */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto p-3 sm:p-5 space-y-4 sm:space-y-5">
        
        {/* ROW 1: Digital Twin Topology (Left 60%) + Judge Sandbox Sliders (Right 40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col">
            <PowerTopologyTwin state={state} />
          </div>
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col">
            <SandboxControlPanel
              state={state}
              onUpdateState={handleUpdateState}
              onResetDefaults={handleResetDefaults}
            />
          </div>
        </div>

        {/* ROW 2: 24-Hour Predictive AI Forecast (Left 60%) + BESS Degradation Optimizer (Right 40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col">
            <ForecastChartModule
              forecast={forecast}
              currentSimMinutes={state.simulatedTimeMinutes}
            />
          </div>
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col">
            <BatteryDegradationPanel state={state} />
          </div>
        </div>

        {/* ROW 3: Verifiable ESG Carbon Accounting & Autonomous Audit Ledger (Full Width) */}
        <div className="w-full">
          <AuditLedgerTerminal
            logs={logs}
            state={state}
            forecast={forecast}
            onClearLogs={handleClearLogs}
          />
        </div>

      </main>

      {/* Industrial SCADA Footer Bar */}
      <footer className="border-t border-slate-800/80 bg-[#070A12] px-4 py-2 text-[11px] font-mono text-slate-500">
        <div className="max-w-[1720px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              VoltSense AI Edge Dispatch Kernel
            </span>
            <span>|</span>
            <span>Target Platform: ARM64 Linux / ESP-IDF RTOS</span>
            <span>|</span>
            <span>Deterministic ONNX Engine: v1.17</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSimulationRunning(!isSimulationRunning)}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 hover:text-slate-200 transition-colors"
            >
              {isSimulationRunning ? (
                <>
                  <Pause className="w-3 h-3 text-amber-400" />
                  <span>Pause Engine</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-emerald-400" />
                  <span>Resume Engine</span>
                </>
              )}
            </button>

            <span>Session Ticks: {tickCounter}</span>
            <span className="text-emerald-400 font-bold">100% Client-Side Simulation Active</span>
          </div>
        </div>
      </footer>

      {/* Interactive Hackathon Pitch & Architecture Modal */}
      <PitchDeckModal
        isOpen={isPitchModalOpen}
        onClose={() => setIsPitchModalOpen(false)}
      />

    </div>
  );
};

export default App;
