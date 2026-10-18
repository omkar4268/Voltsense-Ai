import React, { useState } from 'react';
import { MicrogridState } from '../types';
import { 
  Layers, 
  Sun, 
  BatteryCharging, 
  CloudRain, 
  Moon, 
  Zap, 
  ShieldAlert, 
  CheckCircle2, 
  HelpCircle,
  Activity,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PowerTopologyTwinProps {
  state: MicrogridState;
  onApplyScenario?: (scenario: 'sunny' | 'cloud' | 'night' | 'islanded') => void;
}

export const PowerTopologyTwin: React.FC<PowerTopologyTwinProps> = ({ 
  state, 
  onApplyScenario 
}) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [activeScenario, setActiveScenario] = useState<string>('sunny');

  // Status calculations
  const isSolarGenerating = state.solarKW > 0.5;
  const isBessDischarging = state.bessKW > 0.2;
  const isBessCharging = state.bessKW < -0.2;
  const isGridImporting = state.gridKW > 0.2;
  const isGridExporting = state.gridKW < -0.2;
  const isDieselActive = state.dieselStatus === 'ACTIVE' && state.dieselKW > 0;

  // Flow animation speeds based on power magnitude
  const solarFlowSpeed = Math.max(0.7, 2.4 - (state.solarKW / 100) * 1.7);
  const bessFlowSpeed = Math.max(0.7, 2.4 - (Math.abs(state.bessKW) / 80) * 1.7);
  const loadFlowSpeed = Math.max(0.7, 2.4 - (state.facilityLoadKW / 150) * 1.7);
  const gridFlowSpeed = Math.max(0.7, 2.4 - (Math.abs(state.gridKW) / 100) * 1.7);

  const handleScenarioClick = (sc: 'sunny' | 'cloud' | 'night' | 'islanded') => {
    setActiveScenario(sc);
    if (onApplyScenario) {
      onApplyScenario(sc);
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-2xl relative overflow-hidden bg-[#0A0F1D]/80">
      
      {/* Topology Header & 1-Click Interactive Scenarios Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="relative p-2.5 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <Layers className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Live Microgrid Power Topology
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 font-bold">
                100% Balanced
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Real-time vector flows between Solar PV, BESS Battery, Grid & Facility Load
            </p>
          </div>
        </div>

        {/* 1-Click Interactive Scenarios (Effortless Testing) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800/90 text-xs font-medium">
          <span className="text-[11px] font-mono text-slate-400 px-2 py-1 hidden sm:inline">
            Quick Scenarios:
          </span>

          <button
            onClick={() => handleScenarioClick('sunny')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activeScenario === 'sunny'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sunny Peak</span>
          </button>

          <button
            onClick={() => handleScenarioClick('cloud')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activeScenario === 'cloud'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5 text-amber-400" />
            <span>Cloud Storm</span>
          </button>

          <button
            onClick={() => handleScenarioClick('night')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activeScenario === 'night'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-cyan-400" />
            <span>Night Discharge</span>
          </button>

          <button
            onClick={() => handleScenarioClick('islanded')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activeScenario === 'islanded'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-rose-400" />
            <span>Grid Blackout</span>
          </button>
        </div>
      </div>

      {/* SVG Canvas - Unified Coordinates (1000 x 580) */}
      <div className="w-full aspect-[16/9] min-h-[420px] max-h-[580px] bg-[#060913] rounded-2xl border border-slate-800/90 relative overflow-hidden flex items-center justify-center p-2 shadow-inner">
        
        {/* Subtle dot matrix grid */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #475569 1px, transparent 0)`,
            backgroundSize: '28px 28px',
          }}
        />

        <svg 
          viewBox="0 0 1000 580" 
          className="w-full h-full select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Glow Filters */}
            <filter id="glow-emerald" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-cyan" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-amber" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-rose" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradient Fills for Station Cards */}
            <linearGradient id="card-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0F172A" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#070D1B" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="hub-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0C1B33" />
              <stop offset="100%" stopColor="#051020" />
            </linearGradient>
          </defs>

          {/* BUS WIRES: Connected directly from station centers to central hub */}

          {/* Wire 1: Solar (330, 140) -> Hub (450, 270) */}
          <line x1="330" y1="140" x2="450" y2="270" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
          {isSolarGenerating && (
            <line 
              x1="330" y1="140" x2="450" y2="270" 
              stroke="#10B981" strokeWidth="5" strokeDasharray="10 10" strokeLinecap="round"
              filter="url(#glow-emerald)"
              style={{ animation: `dash-flow ${solarFlowSpeed}s linear infinite` }}
            />
          )}

          {/* Wire 2: BESS (330, 440) <-> Hub (450, 310) */}
          <line x1="330" y1="440" x2="450" y2="310" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
          {(isBessCharging || isBessDischarging) && (
            <line 
              x1={isBessCharging ? "450" : "330"} y1={isBessCharging ? "310" : "440"} 
              x2={isBessCharging ? "330" : "450"} y2={isBessCharging ? "440" : "310"} 
              stroke={isBessDischarging ? "#06B6D4" : "#10B981"} 
              strokeWidth="5" strokeDasharray="10 10" strokeLinecap="round"
              filter="url(#glow-cyan)"
              style={{ animation: `dash-flow ${bessFlowSpeed}s linear infinite` }}
            />
          )}

          {/* Wire 3: Hub (550, 270) -> Grid & Diesel (670, 140) */}
          <line x1="550" y1="270" x2="670" y2="140" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
          {(isGridImporting || isGridExporting || isDieselActive) && (
            <line 
              x1={isGridExporting ? "550" : "670"} y1={isGridExporting ? "270" : "140"} 
              x2={isGridExporting ? "670" : "550"} y2={isGridExporting ? "140" : "270"} 
              stroke={isDieselActive ? "#EF4444" : isGridImporting ? "#F59E0B" : "#10B981"} 
              strokeWidth="5" strokeDasharray="10 10" strokeLinecap="round"
              filter={isDieselActive ? "url(#glow-rose)" : "url(#glow-amber)"}
              style={{ animation: `dash-flow ${gridFlowSpeed}s linear infinite` }}
            />
          )}

          {/* Wire 4: Hub (550, 310) -> Load (670, 440) */}
          <line x1="550" y1="310" x2="670" y2="440" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
          <line 
            x1="550" y1="310" x2="670" y2="440" 
            stroke="#F59E0B" strokeWidth="5" strokeDasharray="10 10" strokeLinecap="round"
            filter="url(#glow-amber)"
            style={{ animation: `dash-flow ${loadFlowSpeed}s linear infinite` }}
          />

          {/* CENTRAL AI BUS HUB (Center: 500, 290) */}
          <g transform="translate(435, 230)">
            {/* Animated Radar Pulse Ring */}
            <circle cx="65" cy="60" r="50" fill="none" stroke="#06B6D4" strokeWidth="1.5" opacity="0.3" className="animate-ping" style={{ transformOrigin: "65px 60px", animationDuration: "3s" }} />
            
            <rect 
              x="0" y="0" width="130" height="120" rx="24" 
              fill="url(#hub-grad)" 
              stroke="#06B6D4" 
              strokeWidth="2.5" 
              filter="url(#glow-cyan)" 
            />
            
            <circle cx="65" cy="42" r="20" fill="#06B6D4" fillOpacity="0.18" />
            <path d="M 63 30 L 56 44 L 64 44 L 60 54 L 73 40 L 65 40 Z" fill="#06B6D4" filter="url(#glow-cyan)" />
            
            <text x="65" y="78" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold" fontFamily="system-ui, sans-serif">
              EDGE-AI HUB
            </text>
            
            <rect x="22" y="88" width="86" height="20" rx="10" fill="#091426" stroke="#06B6D4" strokeWidth="1" strokeOpacity="0.4" />
            <text x="65" y="102" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">
              {state.controllerMode.toUpperCase()}
            </text>
          </g>

          {/* NODE 1: SOLAR PV ARRAY (Top-Left: x=60, y=60, width=270, height=160) */}
          <g 
            transform="translate(60, 60)" 
            className="cursor-pointer group"
            onClick={() => setSelectedNode(selectedNode === 'solar' ? null : 'solar')}
          >
            <rect 
              x="0" y="0" width="270" height="160" rx="20" 
              fill="url(#card-grad)" 
              stroke={selectedNode === 'solar' ? '#10B981' : '#1e293b'} 
              strokeWidth={selectedNode === 'solar' ? '3' : '1.5'} 
              filter={selectedNode === 'solar' ? 'url(#glow-emerald)' : undefined}
            />
            {/* Header Icon */}
            <circle cx="36" cy="36" r="18" fill="#10B981" fillOpacity="0.2" />
            <path d="M 36 25 L 36 28 M 36 44 L 36 47 M 25 36 L 28 36 M 44 36 L 47 36 M 28 28 L 30 30 M 42 42 L 44 44 M 28 44 L 30 42 M 42 28 L 44 30" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="36" cy="36" r="5" fill="#10B981" />
            
            <text x="66" y="34" fill="#ffffff" fontSize="15" fontWeight="bold" fontFamily="system-ui, sans-serif">Solar PV Array</text>
            <text x="66" y="48" fill="#94a3b8" fontSize="11" fontFamily="system-ui, sans-serif">Clean Generation</text>

            <rect x="180" y="24" width="76" height="22" rx="11" fill={isSolarGenerating ? "#064e3b" : "#1e293b"} />
            <text x="218" y="39" textAnchor="middle" fill={isSolarGenerating ? "#34d399" : "#64748b"} fontSize="10" fontWeight="bold" fontFamily="monospace">
              {isSolarGenerating ? "ACTIVE" : "IDLE"}
            </text>

            {/* Metrics */}
            <text x="24" y="86" fill="#94a3b8" fontSize="12" fontFamily="system-ui, sans-serif">Active Power Output</text>
            <text x="24" y="118" fill="#10B981" fontSize="28" fontWeight="bold" fontFamily="monospace">{state.solarKW} kW</text>

            <text x="246" y="116" textAnchor="end" fill="#cbd5e1" fontSize="12" fontFamily="monospace">{state.irradiance} W/m²</text>
            
            {/* Progress bar */}
            <rect x="24" y="132" width="222" height="6" rx="3" fill="#1e293b" />
            <rect x="24" y="132" width={Math.min(222, (state.solarKW / 95) * 222)} height="6" rx="3" fill="#10B981" />
          </g>

          {/* NODE 2: BESS STORAGE (Bottom-Left: x=60, y=360, width=270, height=160) */}
          <g 
            transform="translate(60, 360)" 
            className="cursor-pointer group"
            onClick={() => setSelectedNode(selectedNode === 'bess' ? null : 'bess')}
          >
            <rect 
              x="0" y="0" width="270" height="160" rx="20" 
              fill="url(#card-grad)" 
              stroke={selectedNode === 'bess' ? '#06B6D4' : '#1e293b'} 
              strokeWidth={selectedNode === 'bess' ? '3' : '1.5'} 
              filter={selectedNode === 'bess' ? 'url(#glow-cyan)' : undefined}
            />
            {/* Header Icon */}
            <circle cx="36" cy="36" r="18" fill="#06B6D4" fillOpacity="0.2" />
            <rect x="27" y="27" width="18" height="18" rx="4" fill="none" stroke="#06B6D4" strokeWidth="2" />
            <line x1="33" y1="24" x2="39" y2="24" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" />
            <rect x="31" y="32" width="10" height="8" rx="1.5" fill="#06B6D4" />

            <text x="66" y="34" fill="#ffffff" fontSize="15" fontWeight="bold" fontFamily="system-ui, sans-serif">BESS Storage</text>
            <text x="66" y="48" fill="#94a3b8" fontSize="11" fontFamily="system-ui, sans-serif">200 kWh LiFePO4</text>

            <rect x="175" y="24" width="81" height="22" rx="11" fill={isBessCharging ? "#064e3b" : isBessDischarging ? "#083344" : "#1e293b"} />
            <text x="215" y="39" textAnchor="middle" fill={isBessCharging ? "#34d399" : isBessDischarging ? "#38bdf8" : "#64748b"} fontSize="10" fontWeight="bold" fontFamily="monospace">
              {isBessCharging ? "CHARGING" : isBessDischarging ? "DISCHARGE" : "STANDBY"}
            </text>

            {/* Metrics */}
            <text x="24" y="86" fill="#94a3b8" fontSize="12" fontFamily="system-ui, sans-serif">State of Charge (SoC)</text>
            <text x="24" y="118" fill="#06B6D4" fontSize="28" fontWeight="bold" fontFamily="monospace">{state.bessSoC}%</text>

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
            className="cursor-pointer group"
            onClick={() => setSelectedNode(selectedNode === 'grid' ? null : 'grid')}
          >
            <rect 
              x="0" y="0" width="270" height="160" rx="20" 
              fill="url(#card-grad)" 
              stroke={selectedNode === 'grid' ? '#a855f7' : '#1e293b'} 
              strokeWidth={selectedNode === 'grid' ? '3' : '1.5'} 
              filter={selectedNode === 'grid' ? 'url(#glow-cyan)' : undefined}
            />
            {/* Header Icon */}
            <circle cx="36" cy="36" r="18" fill="#a855f7" fillOpacity="0.2" />
            <path d="M 33 26 C 36 29 42 34 38 43 C 37 45 35 46 33 46 C 30 46 28 44 28 41 C 28 35 32 30 33 26 Z" fill={isDieselActive ? "#ef4444" : "#a855f7"} />

            <text x="66" y="34" fill="#ffffff" fontSize="15" fontWeight="bold" fontFamily="system-ui, sans-serif">Grid & Backup</text>
            <text x="66" y="48" fill="#94a3b8" fontSize="11" fontFamily="system-ui, sans-serif">Diesel Generator</text>

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
            className="cursor-pointer group"
            onClick={() => setSelectedNode(selectedNode === 'load' ? null : 'load')}
          >
            <rect 
              x="0" y="0" width="270" height="160" rx="20" 
              fill="url(#card-grad)" 
              stroke={selectedNode === 'load' ? '#f59e0b' : '#1e293b'} 
              strokeWidth={selectedNode === 'load' ? '3' : '1.5'} 
              filter={selectedNode === 'load' ? 'url(#glow-amber)' : undefined}
            />
            {/* Header Icon */}
            <circle cx="36" cy="36" r="18" fill="#f59e0b" fillOpacity="0.2" />
            <path d="M 27 45 L 27 34 L 34 38 L 34 32 L 41 36 L 41 28 L 47 31 L 47 45 Z" fill="#f59e0b" />

            <text x="66" y="34" fill="#ffffff" fontSize="15" fontWeight="bold" fontFamily="system-ui, sans-serif">Facility & EV Load</text>
            <text x="66" y="48" fill="#94a3b8" fontSize="11" fontFamily="system-ui, sans-serif">Commercial Microgrid</text>

            <rect x="175" y="24" width="81" height="22" rx="11" fill="#451a03" />
            <text x="215" y="39" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">
              DEMAND
            </text>

            {/* Metrics */}
            <text x="24" y="86" fill="#94a3b8" fontSize="12" fontFamily="system-ui, sans-serif">Total Consumed Load</text>
            <text x="24" y="118" fill="#f59e0b" fontSize="28" fontWeight="bold" fontFamily="monospace">{state.facilityLoadKW} kW</text>

            <text x="246" y="116" textAnchor="end" fill="#cbd5e1" fontSize="12" fontFamily="monospace">
              Base: {state.baseFacilityLoad} kW
            </text>

            {/* Progress bar */}
            <rect x="24" y="132" width="222" height="6" rx="3" fill="#1e293b" />
            <rect x="24" y="132" width={Math.min(222, (state.facilityLoadKW / 150) * 222)} height="6" rx="3" fill="#f59e0b" />
          </g>

        </svg>

      </div>

      {/* Interactive Node Details Drawer (Clear plain-English explanation) */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="mt-4 p-4 rounded-2xl bg-slate-950/95 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-start sm:items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white uppercase tracking-wider block sm:inline mr-2">
                  Station Telemetry ({selectedNode}):
                </span>
                <span className="text-slate-300">
                  {selectedNode === 'solar' && `Real-time irradiance is ${state.irradiance} W/m². The array generates ${state.solarKW} kW of clean electricity, avoiding carbon emissions.`}
                  {selectedNode === 'bess' && `Capacity: 200 kWh LiFePO4. Protected minimum constraint is ${state.minSocConstraint}%. Battery temp: ${state.bessTempC}°C. Health: ${state.bessHealthPct}%.`}
                  {selectedNode === 'grid' && `Diesel backup is fully suppressed by Edge-AI. Grid interchange: ${state.gridKW} kW. Running in 100% clean autonomous mode.`}
                  {selectedNode === 'load' && `Supplying commercial buildings and high-speed EV chargers with ${state.facilityLoadKW} kW uninterrupted power.`}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setSelectedNode(null)}
              className="text-[11px] font-mono text-slate-400 hover:text-white px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors whitespace-nowrap self-end sm:self-center"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
