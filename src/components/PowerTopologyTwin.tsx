import React, { useState } from 'react';
import { MicrogridState } from '../types';
import { 
  Sun, 
  BatteryCharging, 
  Battery, 
  Factory, 
  Flame, 
  Zap, 
  Activity, 
  HelpCircle,
  Shield,
  Layers
} from 'lucide-react';

interface PowerTopologyTwinProps {
  state: MicrogridState;
}

export const PowerTopologyTwin: React.FC<PowerTopologyTwinProps> = ({ state }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Flow directions and active status
  const isSolarGenerating = state.solarKW > 0.5;
  const isBessDischarging = state.bessKW > 0.2;
  const isBessCharging = state.bessKW < -0.2;
  const isGridImporting = state.gridKW > 0.2;
  const isGridExporting = state.gridKW < -0.2;
  const isDieselActive = state.dieselStatus === 'ACTIVE' && state.dieselKW > 0;

  // Particle flow speed calculation (higher kW = faster flow)
  const solarFlowDuration = Math.max(0.6, 2.5 - (state.solarKW / 100) * 1.8);
  const bessFlowDuration = Math.max(0.6, 2.5 - (Math.abs(state.bessKW) / 80) * 1.8);
  const loadFlowDuration = Math.max(0.6, 2.5 - (state.facilityLoadKW / 150) * 1.8);
  const gridFlowDuration = Math.max(0.6, 2.5 - (Math.abs(state.gridKW) / 100) * 1.8);

  return (
    <div className="glass-panel rounded-2xl p-4 xl:p-5 relative overflow-hidden border border-slate-800 shadow-2xl flex flex-col justify-between">
      
      {/* Topology Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <Layers className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-slate-100 flex items-center gap-2">
              Microgrid Digital Twin // Power Flow Topology
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                100Hz Bus Sync
              </span>
            </h2>
            <p className="text-[11px] text-slate-400">
              Interactive bi-directional energy transfer topology with live particle vectors
            </p>
          </div>
        </div>

        {/* Real-time Conservation of Energy Indicator */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="text-slate-400">Power Balance (Σ P):</span>
          <span className="text-emerald-300 font-semibold">
            {(state.solarKW + Math.max(0, state.bessKW) + Math.max(0, state.gridKW) + state.dieselKW).toFixed(1)} kW in = {(state.facilityLoadKW + Math.max(0, -state.bessKW) + Math.max(0, -state.gridKW)).toFixed(1)} kW out
          </span>
        </div>
      </div>

      {/* SVG Interactive Canvas with 4 Nodes and Directional Particle Wires */}
      <div className="relative w-full aspect-[16/9] min-h-[360px] max-h-[460px] flex items-center justify-center bg-[#05070E]/80 rounded-xl border border-slate-800/80 p-2 overflow-hidden">
        
        {/* Subtle Background Grid */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #334155 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* SVG Interconnecting Bus Lines & Animated Flow */}
        <svg 
          viewBox="0 0 800 480" 
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <defs>
            <linearGradient id="wireGradientSolar" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="wireGradientBess" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="wireGradientDiesel" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8" />
            </linearGradient>

            {/* Glowing filter */}
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Central Bus Junction Crossbar */}
          <rect x="360" y="210" width="80" height="60" rx="10" fill="#0b1329" stroke="#1e293b" strokeWidth="2" />

          {/* Wire 1: Solar (Top-Left: 160, 110) -> Central Bus (370, 220) */}
          <path
            d="M 230 130 L 370 220"
            fill="none"
            stroke="#1e293b"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {isSolarGenerating && (
            <path
              d="M 230 130 L 370 220"
              fill="none"
              stroke="#10B981"
              strokeWidth="3.5"
              strokeDasharray="6 8"
              strokeLinecap="round"
              filter="url(#glowFilter)"
              style={{
                animation: `dash-flow ${solarFlowDuration}s linear infinite`,
              }}
            />
          )}

          {/* Wire 2: BESS (Bottom-Left: 160, 370) <-> Central Bus (370, 260) */}
          <path
            d="M 230 350 L 370 260"
            fill="none"
            stroke="#1e293b"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {(isBessCharging || isBessDischarging) && (
            <path
              d={isBessCharging ? "M 370 260 L 230 350" : "M 230 350 L 370 260"}
              fill="none"
              stroke={isBessDischarging ? "#06B6D4" : "#10B981"}
              strokeWidth="3.5"
              strokeDasharray="6 8"
              strokeLinecap="round"
              filter="url(#glowFilter)"
              style={{
                animation: `dash-flow ${bessFlowDuration}s linear infinite`,
              }}
            />
          )}

          {/* Wire 3: Central Bus (430, 260) -> Facility Load (Bottom-Right: 640, 350) */}
          <path
            d="M 430 260 L 570 350"
            fill="none"
            stroke="#1e293b"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 430 260 L 570 350"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="3.5"
            strokeDasharray="6 8"
            strokeLinecap="round"
            filter="url(#glowFilter)"
            style={{
              animation: `dash-flow ${loadFlowDuration}s linear infinite`,
            }}
          />

          {/* Wire 4: Grid & Diesel (Top-Right: 640, 130) <-> Central Bus (430, 220) */}
          <path
            d="M 570 130 L 430 220"
            fill="none"
            stroke="#1e293b"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {(isGridImporting || isGridExporting || isDieselActive) && (
            <path
              d={isGridExporting ? "M 430 220 L 570 130" : "M 570 130 L 430 220"}
              fill="none"
              stroke={isDieselActive ? "#EF4444" : isGridImporting ? "#F59E0B" : "#10B981"}
              strokeWidth="3.5"
              strokeDasharray="6 8"
              strokeLinecap="round"
              filter="url(#glowFilter)"
              style={{
                animation: `dash-flow ${gridFlowDuration}s linear infinite`,
              }}
            />
          )}
        </svg>

        {/* Central Edge Dispatch Hub Node */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          <div className="p-3 rounded-2xl bg-slate-900 border-2 border-cyan-500/60 shadow-[0_0_25px_rgba(6,182,212,0.3)] flex flex-col items-center gap-1">
            <Zap className="w-6 h-6 text-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-300">
              AI BUS HUB
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300">
              {state.controllerMode.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Node 1: Solar PV Array (Top-Left) */}
        <div 
          onClick={() => setSelectedNode('solar')}
          className={`absolute top-[6%] left-[3%] sm:left-[6%] z-10 w-52 sm:w-64 p-4 rounded-2xl bg-slate-900/95 border transition-all cursor-pointer backdrop-blur-md ${
            selectedNode === 'solar'
              ? 'border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.4)] scale-105'
              : 'border-slate-800 hover:border-emerald-500/50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Sun className="w-5 h-5 animate-spin-slow" />
              </div>
              <span className="text-sm font-bold text-white">Solar PV Array</span>
            </div>
            <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${
              isSolarGenerating ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
            }`}>
              {isSolarGenerating ? 'GENERATING' : 'IDLE'}
            </span>
          </div>

          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex justify-between items-baseline">
              <span className="text-slate-400">Active Output:</span>
              <span className="text-emerald-400 text-base sm:text-lg font-extrabold glow-text-emerald">
                {state.solarKW} kW
              </span>
            </div>
            <div className="flex justify-between text-slate-300 text-[11px]">
              <span>Irradiance:</span>
              <span className="font-semibold text-white">{state.irradiance} W/m²</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
              <div 
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (state.solarKW / 95) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Node 2: BESS Energy Storage (Bottom-Left) */}
        <div 
          onClick={() => setSelectedNode('bess')}
          className={`absolute bottom-[6%] left-[3%] sm:left-[6%] z-10 w-52 sm:w-64 p-4 rounded-2xl bg-slate-900/95 border transition-all cursor-pointer backdrop-blur-md ${
            selectedNode === 'bess'
              ? 'border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.4)] scale-105'
              : 'border-slate-800 hover:border-cyan-500/50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                {isBessCharging ? (
                  <BatteryCharging className="w-5 h-5 animate-bounce" />
                ) : (
                  <Battery className="w-5 h-5" />
                )}
              </div>
              <span className="text-sm font-bold text-white">BESS Storage</span>
            </div>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold ${
              isBessDischarging 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                : isBessCharging 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                : 'bg-slate-800 text-slate-400'
            }`}>
              {isBessDischarging ? 'DISCHARGE' : isBessCharging ? 'CHARGING' : 'STANDBY'}
            </span>
          </div>

          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex justify-between items-baseline">
              <span className="text-slate-400">SoC / Rate:</span>
              <span className="text-cyan-300 text-base sm:text-lg font-extrabold glow-text-cyan">
                {state.bessSoC}% ({state.bessKW > 0 ? `+${state.bessKW}` : state.bessKW} kW)
              </span>
            </div>
            <div className="flex justify-between text-slate-300 text-[11px]">
              <span>Health / DoD:</span>
              <span className="font-semibold text-white">{state.bessHealthPct}% | {state.bessDoD}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  state.bessSoC <= state.minSocConstraint ? 'bg-amber-500' : 'bg-cyan-400'
                }`}
                style={{ width: `${state.bessSoC}%` }}
              />
            </div>
          </div>
        </div>

        {/* Node 3: Grid & Backup Diesel Generator (Top-Right) */}
        <div 
          onClick={() => setSelectedNode('grid')}
          className={`absolute top-[6%] right-[3%] sm:right-[6%] z-10 w-52 sm:w-64 p-4 rounded-2xl bg-slate-900/95 border transition-all cursor-pointer backdrop-blur-md ${
            selectedNode === 'grid'
              ? 'border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.4)] scale-105'
              : 'border-slate-800 hover:border-purple-500/50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                <Flame className={`w-5 h-5 ${isDieselActive ? 'text-rose-400 animate-pulse' : 'text-slate-400'}`} />
              </div>
              <span className="text-sm font-bold text-white">Grid & Diesel</span>
            </div>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold ${
              state.dieselStatus === 'ACTIVE'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
            }`}>
              DIESEL: {state.dieselStatus}
            </span>
          </div>

          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex justify-between items-baseline">
              <span className="text-slate-400">Grid Flow:</span>
              <span className={`text-base sm:text-lg font-extrabold ${
                isGridImporting ? 'text-amber-400' : isGridExporting ? 'text-emerald-400' : 'text-slate-400'
              }`}>
                {state.gridKW > 0 ? `+${state.gridKW} kW Imp` : state.gridKW < 0 ? `${state.gridKW} kW Exp` : '0 kW (Islanded)'}
              </span>
            </div>
            <div className="flex justify-between text-slate-300 text-[11px]">
              <span>Diesel Gen:</span>
              <span className={state.dieselKW > 0 ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                {state.dieselKW} kW
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  isDieselActive ? 'bg-rose-500' : 'bg-purple-400'
                }`}
                style={{ width: `${Math.min(100, (Math.abs(state.gridKW) / 100) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Node 4: Facility & EV Microgrid Load (Bottom-Right) */}
        <div 
          onClick={() => setSelectedNode('load')}
          className={`absolute bottom-[6%] right-[3%] sm:right-[6%] z-10 w-52 sm:w-64 p-4 rounded-2xl bg-slate-900/95 border transition-all cursor-pointer backdrop-blur-md ${
            selectedNode === 'load'
              ? 'border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.4)] scale-105'
              : 'border-slate-800 hover:border-amber-500/50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <Factory className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-white">Facility Demand</span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
              DEMAND
            </span>
          </div>

          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex justify-between items-baseline">
              <span className="text-slate-400">Total Load:</span>
              <span className="text-amber-400 text-base sm:text-lg font-extrabold glow-text-amber">
                {state.facilityLoadKW} kW
              </span>
            </div>
            <div className="flex justify-between text-slate-300 text-[11px]">
              <span>Base / Fleet:</span>
              <span className="font-semibold text-white">{state.baseFacilityLoad} kW + EV</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
              <div 
                className="bg-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (state.facilityLoadKW / 150) * 100)}%` }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Node Inspector Drawer on Selection */}
      {selectedNode && (
        <div className="mt-3 p-3 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200 uppercase">{selectedNode} Telemetry Inspector:</span>
            <span className="text-slate-400">
              {selectedNode === 'solar' && `Real-time irradiance ${state.irradiance} W/m² with ${state.weatherHorizon} sky model.`}
              {selectedNode === 'bess' && `Capacity 200 kWh. Min protected SoC constraint set at ${state.minSocConstraint}%. Temp: ${state.bessTempC}°C.`}
              {selectedNode === 'grid' && `Diesel backup suppressed by AI. Carbon intensity baseline: 0.68 kg CO2/kWh.`}
              {selectedNode === 'load' && `Microgrid consumer combining 3-phase building load and fast DC EV chargers.`}
            </span>
          </div>
          <button 
            onClick={() => setSelectedNode(null)}
            className="text-[11px] font-mono text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-800"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};
