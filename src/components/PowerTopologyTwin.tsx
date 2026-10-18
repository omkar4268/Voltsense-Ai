import React, { useState } from 'react';
import { MicrogridState } from '../types';
import { Layers } from 'lucide-react';

interface PowerTopologyTwinProps {
  state: MicrogridState;
}

export const PowerTopologyTwin: React.FC<PowerTopologyTwinProps> = ({ state }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Status flags
  const isSolarGenerating = state.solarKW > 0.5;
  const isBessDischarging = state.bessKW > 0.2;
  const isBessCharging = state.bessKW < -0.2;
  const isGridImporting = state.gridKW > 0.2;
  const isGridExporting = state.gridKW < -0.2;
  const isDieselActive = state.dieselStatus === 'ACTIVE' && state.dieselKW > 0;

  // Particle flow speed (seconds per cycle)
  const solarFlowSpeed = Math.max(0.8, 2.5 - (state.solarKW / 100) * 1.7);
  const bessFlowSpeed = Math.max(0.8, 2.5 - (Math.abs(state.bessKW) / 80) * 1.7);
  const loadFlowSpeed = Math.max(0.8, 2.5 - (state.facilityLoadKW / 150) * 1.7);
  const gridFlowSpeed = Math.max(0.8, 2.5 - (Math.abs(state.gridKW) / 100) * 1.7);

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-2xl relative overflow-hidden bg-[#0A0F1D]/80">
      
      {/* Topology Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              Live Microgrid Power Topology
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                Synchronized
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Interactive 4-station energy balance diagram with real-time vector flows
            </p>
          </div>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-3 font-mono text-xs bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800 text-slate-300">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Mode: <strong className="text-emerald-400">{state.controllerMode.toUpperCase()}</strong>
          </span>
          <span>|</span>
          <span>
            Clean Energy: <strong className="text-cyan-300">{state.cleanEnergyRatioPct}%</strong>
          </span>
        </div>
      </div>

      {/* SVG Canvas - Unified Coordinates (1000 x 600) */}
      <div className="w-full aspect-[16/9] min-h-[420px] max-h-[580px] bg-[#060913] rounded-2xl border border-slate-800/90 relative overflow-hidden flex items-center justify-center p-2">
        
        {/* Subtle dot matrix grid */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #64748b 1px, transparent 0)`,
            backgroundSize: '28px 28px',
          }}
        />

        <svg 
          viewBox="0 0 1000 580" 
          className="w-full h-full select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-amber" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-rose" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* BUS WIRES: Connected directly from station centers to central hub */}

          {/* Wire 1: Solar (330, 140) -> Hub (450, 270) */}
          <line x1="330" y1="140" x2="450" y2="270" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
          {isSolarGenerating && (
            <line 
              x1="330" y1="140" x2="450" y2="270" 
              stroke="#10B981" strokeWidth="4" strokeDasharray="8 8" strokeLinecap="round"
              filter="url(#glow-emerald)"
              style={{ animation: `dash-flow ${solarFlowSpeed}s linear infinite` }}
            />
          )}

          {/* Wire 2: BESS (330, 440) <-> Hub (450, 310) */}
          <line x1="330" y1="440" x2="450" y2="310" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
          {(isBessCharging || isBessDischarging) && (
            <line 
              x1={isBessCharging ? "450" : "330"} y1={isBessCharging ? "310" : "440"} 
              x2={isBessCharging ? "330" : "450"} y2={isBessCharging ? "440" : "310"} 
              stroke={isBessDischarging ? "#06B6D4" : "#10B981"} 
              strokeWidth="4" strokeDasharray="8 8" strokeLinecap="round"
              filter="url(#glow-cyan)"
              style={{ animation: `dash-flow ${bessFlowSpeed}s linear infinite` }}
            />
          )}

          {/* Wire 3: Hub (550, 270) -> Grid & Diesel (670, 140) */}
          <line x1="550" y1="270" x2="670" y2="140" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
          {(isGridImporting || isGridExporting || isDieselActive) && (
            <line 
              x1={isGridExporting ? "550" : "670"} y1={isGridExporting ? "270" : "140"} 
              x2={isGridExporting ? "670" : "550"} y2={isGridExporting ? "140" : "270"} 
              stroke={isDieselActive ? "#EF4444" : isGridImporting ? "#F59E0B" : "#10B981"} 
              strokeWidth="4" strokeDasharray="8 8" strokeLinecap="round"
              filter={isDieselActive ? "url(#glow-rose)" : "url(#glow-amber)"}
              style={{ animation: `dash-flow ${gridFlowSpeed}s linear infinite` }}
            />
          )}

          {/* Wire 4: Hub (550, 310) -> Load (670, 440) */}
          <line x1="550" y1="310" x2="670" y2="440" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
          <line 
            x1="550" y1="310" x2="670" y2="440" 
            stroke="#F59E0B" strokeWidth="4" strokeDasharray="8 8" strokeLinecap="round"
            filter="url(#glow-amber)"
            style={{ animation: `dash-flow ${loadFlowSpeed}s linear infinite` }}
          />

          {/* CENTRAL AI BUS HUB */}
          <g transform="translate(440, 235)">
            <rect x="0" y="0" width="120" height="110" rx="20" fill="#0c1326" stroke="#06B6D4" strokeWidth="2.5" filter="url(#glow-cyan)" />
            <circle cx="60" cy="40" r="18" fill="#06B6D4" fillOpacity="0.15" />
            <path d="M 58 30 L 52 42 L 59 42 L 56 50 L 67 38 L 60 38 Z" fill="#06B6D4" />
            <text x="60" y="72" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">AI BUS HUB</text>
            <rect x="20" y="80" width="80" height="20" rx="10" fill="#1e293b" />
            <text x="60" y="94" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">
              {state.controllerMode.toUpperCase()}
            </text>
          </g>

          {/* NODE 1: SOLAR PV ARRAY (Top-Left: x=60, y=60, width=270, height=160) */}
          <g 
            transform="translate(60, 60)" 
            className="cursor-pointer"
            onClick={() => setSelectedNode('solar')}
          >
            <rect 
              x="0" y="0" width="270" height="160" rx="18" 
              fill="#0d1527" 
              stroke={selectedNode === 'solar' ? '#10B981' : '#1e293b'} 
              strokeWidth={selectedNode === 'solar' ? '3' : '1.5'} 
            />
            {/* Header */}
            <circle cx="36" cy="36" r="16" fill="#10B981" fillOpacity="0.2" />
            <path d="M 36 26 L 36 29 M 36 43 L 36 46 M 26 36 L 29 36 M 43 36 L 46 36 M 29 29 L 31 31 M 41 41 L 43 43 M 29 43 L 31 41 M 41 31 L 43 29" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
            <circle cx="36" cy="36" r="5" fill="#10B981" />
            
            <text x="64" y="34" fill="#ffffff" fontSize="15" fontWeight="bold" fontFamily="system-ui, sans-serif">Solar PV Array</text>
            <text x="64" y="48" fill="#94a3b8" fontSize="11" fontFamily="system-ui, sans-serif">Clean Generation</text>

            <rect x="180" y="24" width="76" height="22" rx="11" fill={isSolarGenerating ? "#064e3b" : "#1e293b"} />
            <text x="218" y="39" textAnchor="middle" fill={isSolarGenerating ? "#34d399" : "#64748b"} fontSize="10" fontWeight="bold" fontFamily="monospace">
              {isSolarGenerating ? "ACTIVE" : "IDLE"}
            </text>

            {/* Metrics */}
            <text x="24" y="86" fill="#94a3b8" fontSize="12" fontFamily="system-ui, sans-serif">Active Power Output</text>
            <text x="24" y="118" fill="#10B981" fontSize="26" fontWeight="bold" fontFamily="monospace">{state.solarKW} kW</text>

            <text x="246" y="116" textAnchor="end" fill="#cbd5e1" fontSize="12" fontFamily="monospace">{state.irradiance} W/m²</text>
            
            {/* Progress bar */}
            <rect x="24" y="132" width="222" height="6" rx="3" fill="#1e293b" />
            <rect x="24" y="132" width={Math.min(222, (state.solarKW / 95) * 222)} height="6" rx="3" fill="#10B981" />
          </g>

          {/* NODE 2: BESS STORAGE (Bottom-Left: x=60, y=360, width=270, height=160) */}
          <g 
            transform="translate(60, 360)" 
            className="cursor-pointer"
            onClick={() => setSelectedNode('bess')}
          >
            <rect 
              x="0" y="0" width="270" height="160" rx="18" 
              fill="#0d1527" 
              stroke={selectedNode === 'bess' ? '#06B6D4' : '#1e293b'} 
              strokeWidth={selectedNode === 'bess' ? '3' : '1.5'} 
            />
            {/* Header */}
            <circle cx="36" cy="36" r="16" fill="#06B6D4" fillOpacity="0.2" />
            <rect x="28" y="28" width="16" height="16" rx="3" fill="none" stroke="#06B6D4" strokeWidth="2" />
            <line x1="33" y1="25" x2="39" y2="25" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" />
            <rect x="31" y="32" width="10" height="8" rx="1" fill="#06B6D4" />

            <text x="64" y="34" fill="#ffffff" fontSize="15" fontWeight="bold" fontFamily="system-ui, sans-serif">BESS Storage</text>
            <text x="64" y="48" fill="#94a3b8" fontSize="11" fontFamily="system-ui, sans-serif">200 kWh LiFePO4</text>

            <rect x="175" y="24" width="81" height="22" rx="11" fill={isBessCharging ? "#064e3b" : isBessDischarging ? "#083344" : "#1e293b"} />
            <text x="215" y="39" textAnchor="middle" fill={isBessCharging ? "#34d399" : isBessDischarging ? "#38bdf8" : "#64748b"} fontSize="10" fontWeight="bold" fontFamily="monospace">
              {isBessCharging ? "CHARGING" : isBessDischarging ? "DISCHARGE" : "STANDBY"}
            </text>

            {/* Metrics */}
            <text x="24" y="86" fill="#94a3b8" fontSize="12" fontFamily="system-ui, sans-serif">State of Charge (SoC)</text>
            <text x="24" y="118" fill="#06B6D4" fontSize="26" fontWeight="bold" fontFamily="monospace">{state.bessSoC}%</text>

            <text x="246" y="116" textAnchor="end" fill="#cbd5e1" fontSize="12" fontFamily="monospace">
              {state.bessKW > 0 ? `+${state.bessKW}` : state.bessKW} kW
            </text>

            {/* Progress bar */}
            <rect x="24" y="132" width="222" height="6" rx="3" fill="#1e293b" />
            <rect x="24" y="132" width={Math.min(222, (state.bessSoC / 100) * 222)} height="6" rx="3" fill={state.bessSoC <= state.minSocConstraint ? "#f59e0b" : "#06B6D4"} />
          </g>

          {/* NODE 3: GRID & BACKUP DIESEL (Top-Right: x=670, y=60, width=270, height=160) */}
          <g 
            transform="translate(670, 60)" 
            className="cursor-pointer"
            onClick={() => setSelectedNode('grid')}
          >
            <rect 
              x="0" y="0" width="270" height="160" rx="18" 
              fill="#0d1527" 
              stroke={selectedNode === 'grid' ? '#a855f7' : '#1e293b'} 
              strokeWidth={selectedNode === 'grid' ? '3' : '1.5'} 
            />
            {/* Header */}
            <circle cx="36" cy="36" r="16" fill="#a855f7" fillOpacity="0.2" />
            <path d="M 33 26 C 36 29 42 34 38 43 C 37 45 35 46 33 46 C 30 46 28 44 28 41 C 28 35 32 30 33 26 Z" fill={isDieselActive ? "#ef4444" : "#a855f7"} />

            <text x="64" y="34" fill="#ffffff" fontSize="15" fontWeight="bold" fontFamily="system-ui, sans-serif">Grid & Backup</text>
            <text x="64" y="48" fill="#94a3b8" fontSize="11" fontFamily="system-ui, sans-serif">Diesel Generator</text>

            <rect x="160" y="24" width="96" height="22" rx="11" fill={isDieselActive ? "#450a0a" : "#064e3b"} />
            <text x="208" y="39" textAnchor="middle" fill={isDieselActive ? "#f87171" : "#34d399"} fontSize="10" fontWeight="bold" fontFamily="monospace">
              {isDieselActive ? "GEN ACTIVE" : "SUPPRESSED"}
            </text>

            {/* Metrics */}
            <text x="24" y="86" fill="#94a3b8" fontSize="12" fontFamily="system-ui, sans-serif">Grid Import / Export</text>
            <text x="24" y="118" fill={isGridImporting ? "#f59e0b" : isGridExporting ? "#10b981" : "#94a3b8"} fontSize="24" fontWeight="bold" fontFamily="monospace">
              {state.gridKW > 0 ? `+${state.gridKW} kW` : state.gridKW < 0 ? `${state.gridKW} kW` : "0 kW (Island)"}
            </text>

            <text x="246" y="116" textAnchor="end" fill={state.dieselKW > 0 ? "#f87171" : "#64748b"} fontSize="12" fontFamily="monospace">
              Gen: {state.dieselKW} kW
            </text>

            {/* Progress bar */}
            <rect x="24" y="132" width="222" height="6" rx="3" fill="#1e293b" />
            <rect x="24" y="132" width={Math.min(222, (Math.abs(state.gridKW) / 100) * 222)} height="6" rx="3" fill={isDieselActive ? "#ef4444" : "#a855f7"} />
          </g>

          {/* NODE 4: FACILITY DEMAND (Bottom-Right: x=670, y=360, width=270, height=160) */}
          <g 
            transform="translate(670, 360)" 
            className="cursor-pointer"
            onClick={() => setSelectedNode('load')}
          >
            <rect 
              x="0" y="0" width="270" height="160" rx="18" 
              fill="#0d1527" 
              stroke={selectedNode === 'load' ? '#f59e0b' : '#1e293b'} 
              strokeWidth={selectedNode === 'load' ? '3' : '1.5'} 
            />
            {/* Header */}
            <circle cx="36" cy="36" r="16" fill="#f59e0b" fillOpacity="0.2" />
            <path d="M 27 45 L 27 34 L 34 38 L 34 32 L 41 36 L 41 28 L 47 31 L 47 45 Z" fill="#f59e0b" />

            <text x="64" y="34" fill="#ffffff" fontSize="15" fontWeight="bold" fontFamily="system-ui, sans-serif">Facility & EV Load</text>
            <text x="64" y="48" fill="#94a3b8" fontSize="11" fontFamily="system-ui, sans-serif">Commercial Microgrid</text>

            <rect x="175" y="24" width="81" height="22" rx="11" fill="#451a03" />
            <text x="215" y="39" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">
              DEMAND
            </text>

            {/* Metrics */}
            <text x="24" y="86" fill="#94a3b8" fontSize="12" fontFamily="system-ui, sans-serif">Total Consumed Load</text>
            <text x="24" y="118" fill="#f59e0b" fontSize="26" fontWeight="bold" fontFamily="monospace">{state.facilityLoadKW} kW</text>

            <text x="246" y="116" textAnchor="end" fill="#cbd5e1" fontSize="12" fontFamily="monospace">
              Base: {state.baseFacilityLoad} kW
            </text>

            {/* Progress bar */}
            <rect x="24" y="132" width="222" height="6" rx="3" fill="#1e293b" />
            <rect x="24" y="132" width={Math.min(222, (state.facilityLoadKW / 150) * 222)} height="6" rx="3" fill="#f59e0b" />
          </g>

        </svg>

      </div>

      {/* Node Inspector Drawer */}
      {selectedNode && (
        <div className="mt-4 p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center justify-between text-xs animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white uppercase">{selectedNode} Details:</span>
            <span className="text-slate-300">
              {selectedNode === 'solar' && `Real-time irradiance ${state.irradiance} W/m². Clean zero-carbon solar output supplying ${state.solarKW} kW.`}
              {selectedNode === 'bess' && `Capacity: 200 kWh. Minimum protected constraint: ${state.minSocConstraint}%. Battery temp: ${state.bessTempC}°C.`}
              {selectedNode === 'grid' && `Diesel backup suppressed by AI. Grid flow: ${state.gridKW} kW. Emission reduction target: 28.4%.`}
              {selectedNode === 'load' && `Combined 3-phase building load + high-speed EV chargers totaling ${state.facilityLoadKW} kW.`}
            </span>
          </div>
          <button 
            onClick={() => setSelectedNode(null)}
            className="text-[11px] font-mono text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800"
          >
            Close
          </button>
        </div>
      )}

    </div>
  );
};
