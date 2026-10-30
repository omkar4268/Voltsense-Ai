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
  ArrowRight,
  Sparkles,
  Info
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
  const solarFlowSpeed = Math.max(0.6, 2.2 - (state.solarKW / 100) * 1.6);
  const bessFlowSpeed = Math.max(0.6, 2.2 - (Math.abs(state.bessKW) / 80) * 1.6);
  const loadFlowSpeed = Math.max(0.6, 2.2 - (state.facilityLoadKW / 150) * 1.6);
  const gridFlowSpeed = Math.max(0.6, 2.2 - (Math.abs(state.gridKW) / 100) * 1.6);

  const handleScenarioClick = (sc: 'sunny' | 'cloud' | 'night' | 'islanded') => {
    setActiveScenario(sc);
    if (onApplyScenario) {
      onApplyScenario(sc);
    }
  };

  return (
    <div className="glass-vibrant-card specular-rim rounded-3xl p-5 sm:p-7 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)] relative overflow-hidden font-sans">
      
      {/* Ambient background glow inside the card */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00F59B]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#22D3EE]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Topology Header & 1-Click Interactive Scenarios Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5 pb-5 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative p-3 rounded-2xl bg-gradient-to-br from-[#00F59B]/25 to-[#06B6D4]/20 border border-[#00F59B]/50 text-[#00F59B] shadow-[0_0_25px_rgba(0,245,155,0.35)]">
            <Layers className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#00F59B] animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-light text-white tracking-tight">
                Live Microgrid Power Topology Twin
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#00F59B]/15 border border-[#00F59B]/40 text-[10px] font-mono text-[#00F59B] font-semibold shadow-[0_0_12px_rgba(0,245,155,0.25)]">
                100% Balanced
              </span>
            </div>
            <p className="text-xs text-[#9da395] font-light">
              Bi-directional power vector dispatch between Solar PV, Lithium BESS, Utility Grid & Facility Loads
            </p>
          </div>
        </div>

        {/* 1-Click Interactive Scenarios (Effortless Testing) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#080d09]/90 rounded-2xl border border-white/10 text-xs font-light shadow-inner">
          <span className="text-[11px] font-mono text-[#9da395] px-2.5 py-1 hidden sm:inline">
            Quick Scenarios:
          </span>

          <button
            onClick={() => handleScenarioClick('sunny')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activeScenario === 'sunny'
                ? 'bg-gradient-to-r from-[#00F59B]/25 to-[#34D399]/20 text-white border border-[#00F59B]/60 font-medium shadow-[0_0_15px_rgba(0,245,155,0.3)]'
                : 'text-[#9da395] hover:text-[#f2f3ef] hover:bg-white/5'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-[#00F59B]" />
            <span>Sunny Peak</span>
          </button>

          <button
            onClick={() => handleScenarioClick('cloud')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activeScenario === 'cloud'
                ? 'bg-gradient-to-r from-amber-500/25 to-yellow-500/20 text-amber-200 border border-amber-500/60 font-medium shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'text-[#9da395] hover:text-[#f2f3ef] hover:bg-white/5'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5 text-amber-400" />
            <span>Cloud Storm</span>
          </button>

          <button
            onClick={() => handleScenarioClick('night')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activeScenario === 'night'
                ? 'bg-gradient-to-r from-[#22D3EE]/25 to-[#06B6D4]/20 text-cyan-200 border border-[#22D3EE]/60 font-medium shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                : 'text-[#9da395] hover:text-[#f2f3ef] hover:bg-white/5'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>Night Discharge</span>
          </button>

          <button
            onClick={() => handleScenarioClick('islanded')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activeScenario === 'islanded'
                ? 'bg-gradient-to-r from-rose-500/25 to-red-500/20 text-rose-200 border border-rose-500/60 font-medium shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                : 'text-[#9da395] hover:text-[#f2f3ef] hover:bg-white/5'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-rose-400" />
            <span>Grid Blackout</span>
          </button>
        </div>
      </div>

      {/* SVG Canvas - High-End SCADA HUD Coordinates (1000 x 580) */}
      <div className="w-full aspect-[16/9] min-h-[420px] max-h-[580px] bg-[#070b08]/90 rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center p-2 shadow-inner">
        
        {/* Subtle Cybernetic Blueprint Grid */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #00F59B 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        <svg 
          viewBox="0 0 1000 580" 
          className="w-full h-full select-none relative z-10"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* High-Fidelity Glow Filters */}
            <filter id="glow-mint" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-cyan" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-gold" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-rose" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-purple" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradient Fills for Station Cards */}
            <linearGradient id="card-grad-solar" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0d1811" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#080e0a" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="card-grad-bess" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0a171c" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#060e12" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="card-grad-grid" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#150f1c" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0c0711" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="card-grad-load" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1c160b" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#100b05" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="hub-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#08221b" />
              <stop offset="50%" stopColor="#0b1b26" />
              <stop offset="100%" stopColor="#040b10" />
            </linearGradient>
          </defs>

          {/* BUS WIRES: Connected directly from station centers to central hub */}

          {/* Wire 1: Solar (330, 140) -> Hub (450, 270) */}
          <line x1="330" y1="140" x2="450" y2="270" stroke="#17221a" strokeWidth="6" strokeLinecap="round" />
          {isSolarGenerating && (
            <line 
              x1="330" y1="140" x2="450" y2="270" 
              stroke="#00F59B" strokeWidth="6" strokeDasharray="12 12" strokeLinecap="round"
              filter="url(#glow-mint)"
              style={{ animation: `dash-flow ${solarFlowSpeed}s linear infinite` }}
            />
          )}

          {/* Wire 2: BESS (330, 440) <-> Hub (450, 310) */}
          <line x1="330" y1="440" x2="450" y2="310" stroke="#17221a" strokeWidth="6" strokeLinecap="round" />
          {(isBessCharging || isBessDischarging) && (
            <line 
              x1={isBessCharging ? "450" : "330"} y1={isBessCharging ? "310" : "440"} 
              x2={isBessCharging ? "330" : "450"} y2={isBessCharging ? "440" : "310"} 
              stroke={isBessDischarging ? "#22D3EE" : "#00F59B"} 
              strokeWidth="6" strokeDasharray="12 12" strokeLinecap="round"
              filter={isBessDischarging ? "url(#glow-cyan)" : "url(#glow-mint)"}
              style={{ animation: `dash-flow ${bessFlowSpeed}s linear infinite` }}
            />
          )}

          {/* Wire 3: Hub (550, 270) -> Grid & Diesel (670, 140) */}
          <line x1="550" y1="270" x2="670" y2="140" stroke="#17221a" strokeWidth="6" strokeLinecap="round" />
          {(isGridImporting || isGridExporting || isDieselActive) && (
            <line 
              x1={isGridExporting ? "550" : "670"} y1={isGridExporting ? "270" : "140"} 
              x2={isGridExporting ? "670" : "550"} y2={isGridExporting ? "140" : "270"} 
              stroke={isDieselActive ? "#EF4444" : isGridImporting ? "#FBBF24" : "#00F59B"} 
              strokeWidth="6" strokeDasharray="12 12" strokeLinecap="round"
              filter={isDieselActive ? "url(#glow-rose)" : "url(#glow-gold)"}
              style={{ animation: `dash-flow ${gridFlowSpeed}s linear infinite` }}
            />
          )}

          {/* Wire 4: Hub (550, 310) -> Load (670, 440) */}
          <line x1="550" y1="310" x2="670" y2="440" stroke="#17221a" strokeWidth="6" strokeLinecap="round" />
          <line 
            x1="550" y1="310" x2="670" y2="440" 
            stroke="#FBBF24" strokeWidth="6" strokeDasharray="12 12" strokeLinecap="round"
            filter="url(#glow-gold)"
            style={{ animation: `dash-flow ${loadFlowSpeed}s linear infinite` }}
          />

          {/* CENTRAL AI BUS HUB (Center: 500, 290) */}
          <g transform="translate(430, 225)">
            {/* Animated Multi-Ring Radar Waves */}
            <circle cx="70" cy="65" r="58" fill="none" stroke="#00F59B" strokeWidth="1.5" opacity="0.4" className="animate-ping" style={{ transformOrigin: "70px 65px", animationDuration: "3.5s" }} />
            <circle cx="70" cy="65" r="42" fill="none" stroke="#22D3EE" strokeWidth="1" opacity="0.3" className="animate-ping" style={{ transformOrigin: "70px 65px", animationDuration: "2.2s" }} />
            
            <rect 
              x="0" y="0" width="140" height="130" rx="26" 
              fill="url(#hub-grad)" 
              stroke="#00F59B" 
              strokeWidth="2.5" 
              filter="url(#glow-mint)" 
            />
            
            {/* Center Emblem */}
            <circle cx="70" cy="46" r="22" fill="#00F59B" fillOpacity="0.15" />
            <path d="M 68 33 L 60 48 L 69 48 L 65 59 L 80 44 L 71 44 Z" fill="#00F59B" filter="url(#glow-mint)" />
            
            <text x="70" y="85" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="600" fontFamily="system-ui, sans-serif" letterSpacing="0.5">
              EDGE-AI HUB
            </text>
            
            <rect x="22" y="96" width="96" height="22" rx="11" fill="#06120e" stroke="#00F59B" strokeWidth="1" strokeOpacity="0.5" />
            <text x="70" y="111" textAnchor="middle" fill="#6EE7B7" fontSize="10" fontWeight="bold" fontFamily="monospace" letterSpacing="1">
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
              x="0" y="0" width="270" height="160" rx="22" 
              fill="url(#card-grad-solar)" 
              stroke={selectedNode === 'solar' ? '#00F59B' : '#00F59B'} 
              strokeOpacity={selectedNode === 'solar' ? '1' : '0.4'}
              strokeWidth={selectedNode === 'solar' ? '3' : '1.5'} 
              filter={selectedNode === 'solar' ? 'url(#glow-mint)' : undefined}
            />
            {/* Header Icon */}
            <circle cx="36" cy="36" r="18" fill="#00F59B" fillOpacity="0.2" />
            <path d="M 36 24 L 36 28 M 36 44 L 36 48 M 24 36 L 28 36 M 44 36 L 48 36 M 27 27 L 30 30 M 42 42 L 45 45 M 27 45 L 30 42 M 42 27 L 45 30" stroke="#00F59B" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="36" cy="36" r="5" fill="#00F59B" />
            
            <text x="66" y="34" fill="#ffffff" fontSize="15" fontWeight="500" fontFamily="system-ui, sans-serif">Solar PV Array</text>
            <text x="66" y="49" fill="#9da395" fontSize="11" fontFamily="system-ui, sans-serif">Clean Photon Harvest</text>

            <rect x="180" y="24" width="76" height="22" rx="11" fill={isSolarGenerating ? "#00F59B15" : "#ffffff10"} stroke={isSolarGenerating ? "#00F59B50" : "#ffffff20"} strokeWidth="1" />
            <text x="218" y="39" textAnchor="middle" fill={isSolarGenerating ? "#00F59B" : "#9da395"} fontSize="10" fontWeight="bold" fontFamily="monospace">
              {isSolarGenerating ? "ACTIVE" : "IDLE"}
            </text>

            {/* Metrics */}
            <text x="24" y="86" fill="#9da395" fontSize="12" fontFamily="system-ui, sans-serif">Active Power Output</text>
            <text x="24" y="118" fill="#00F59B" fontSize="28" fontWeight="600" fontFamily="monospace">{state.solarKW} kW</text>

            <text x="246" y="116" textAnchor="end" fill="#d1fae5" fontSize="12" fontFamily="monospace">{state.irradiance} W/m²</text>
            
            {/* Progress bar */}
            <rect x="24" y="132" width="222" height="6" rx="3" fill="#122017" />
            <rect x="24" y="132" width={Math.min(222, (state.solarKW / 95) * 222)} height="6" rx="3" fill="#00F59B" />
          </g>

          {/* NODE 2: BESS STORAGE (Bottom-Left: x=60, y=360, width=270, height=160) */}
          <g 
            transform="translate(60, 360)" 
            className="cursor-pointer group"
            onClick={() => setSelectedNode(selectedNode === 'bess' ? null : 'bess')}
          >
            <rect 
              x="0" y="0" width="270" height="160" rx="22" 
              fill="url(#card-grad-bess)" 
              stroke={selectedNode === 'bess' ? '#22D3EE' : '#22D3EE'} 
              strokeOpacity={selectedNode === 'bess' ? '1' : '0.4'}
              strokeWidth={selectedNode === 'bess' ? '3' : '1.5'} 
              filter={selectedNode === 'bess' ? 'url(#glow-cyan)' : undefined}
            />
            {/* Header Icon */}
            <circle cx="36" cy="36" r="18" fill="#22D3EE" fillOpacity="0.2" />
            <rect x="27" y="27" width="18" height="18" rx="4" fill="none" stroke="#22D3EE" strokeWidth="2" />
            <line x1="33" y1="24" x2="39" y2="24" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />
            <rect x="31" y="32" width="10" height="8" rx="1.5" fill="#22D3EE" />

            <text x="66" y="34" fill="#ffffff" fontSize="15" fontWeight="500" fontFamily="system-ui, sans-serif">BESS Storage</text>
            <text x="66" y="49" fill="#9da395" fontSize="11" fontFamily="system-ui, sans-serif">200 kWh LiFePO4</text>

            <rect x="175" y="24" width="81" height="22" rx="11" fill={isBessCharging ? "#00F59B15" : isBessDischarging ? "#22D3EE15" : "#ffffff10"} stroke={isBessCharging ? "#00F59B50" : isBessDischarging ? "#22D3EE50" : "#ffffff20"} strokeWidth="1" />
            <text x="215" y="39" textAnchor="middle" fill={isBessCharging ? "#00F59B" : isBessDischarging ? "#22D3EE" : "#9da395"} fontSize="10" fontWeight="bold" fontFamily="monospace">
              {isBessCharging ? "CHARGING" : isBessDischarging ? "DISCHARGE" : "STANDBY"}
            </text>

            {/* Metrics */}
            <text x="24" y="86" fill="#9da395" fontSize="12" fontFamily="system-ui, sans-serif">State of Charge (SoC)</text>
            <text x="24" y="118" fill="#22D3EE" fontSize="28" fontWeight="600" fontFamily="monospace">{state.bessSoC}%</text>

            <text x="246" y="116" textAnchor="end" fill="#cffafe" fontSize="12" fontFamily="monospace">
              {state.bessKW > 0 ? `+${state.bessKW}` : state.bessKW} kW
            </text>

            {/* Progress bar */}
            <rect x="24" y="132" width="222" height="6" rx="3" fill="#0d1f26" />
            <rect x="24" y="132" width={Math.min(222, (state.bessSoC / 100) * 222)} height="6" rx="3" fill={state.bessSoC <= state.minSocConstraint ? "#FBBF24" : "#22D3EE"} />
          </g>

          {/* NODE 3: GRID & BACKUP DIESEL (Top-Right: x=670, y=60, width=270, height=160) */}
          <g 
            transform="translate(670, 60)" 
            className="cursor-pointer group"
            onClick={() => setSelectedNode(selectedNode === 'grid' ? null : 'grid')}
          >
            <rect 
              x="0" y="0" width="270" height="160" rx="22" 
              fill="url(#card-grad-grid)" 
              stroke={selectedNode === 'grid' ? '#C084FC' : '#C084FC'} 
              strokeOpacity={selectedNode === 'grid' ? '1' : '0.4'}
              strokeWidth={selectedNode === 'grid' ? '3' : '1.5'} 
              filter={selectedNode === 'grid' ? 'url(#glow-purple)' : undefined}
            />
            {/* Header Icon */}
            <circle cx="36" cy="36" r="18" fill="#C084FC" fillOpacity="0.2" />
            <path d="M 33 26 C 36 29 42 34 38 43 C 37 45 35 46 33 46 C 30 46 28 44 28 41 C 28 35 32 30 33 26 Z" fill={isDieselActive ? "#EF4444" : "#C084FC"} />

            <text x="66" y="34" fill="#ffffff" fontSize="15" fontWeight="500" fontFamily="system-ui, sans-serif">Grid & Backup</text>
            <text x="66" y="49" fill="#9da395" fontSize="11" fontFamily="system-ui, sans-serif">Diesel Generator Intertie</text>

            <rect x="156" y="24" width="100" height="22" rx="11" fill={isDieselActive ? "#ef444415" : "#00F59B15"} stroke={isDieselActive ? "#ef444450" : "#00F59B50"} strokeWidth="1" />
            <text x="206" y="39" textAnchor="middle" fill={isDieselActive ? "#F87171" : "#00F59B"} fontSize="10" fontWeight="bold" fontFamily="monospace">
              {isDieselActive ? "GEN ACTIVE" : "SUPPRESSED"}
            </text>

            {/* Metrics */}
            <text x="24" y="86" fill="#9da395" fontSize="12" fontFamily="system-ui, sans-serif">Grid Import / Export</text>
            <text x="24" y="118" fill={isGridImporting ? "#FBBF24" : isGridExporting ? "#00F59B" : "#9da395"} fontSize="24" fontWeight="600" fontFamily="monospace">
              {state.gridKW > 0 ? `+${state.gridKW} kW` : state.gridKW < 0 ? `${state.gridKW} kW` : "0 kW (Island)"}
            </text>

            <text x="246" y="116" textAnchor="end" fill={state.dieselKW > 0 ? "#F87171" : "#64748b"} fontSize="12" fontFamily="monospace">
              Gen: {state.dieselKW} kW
            </text>

            {/* Progress bar */}
            <rect x="24" y="132" width="222" height="6" rx="3" fill="#1e1627" />
            <rect x="24" y="132" width={Math.min(222, (Math.abs(state.gridKW) / 100) * 222)} height="6" rx="3" fill={isDieselActive ? "#EF4444" : "#C084FC"} />
          </g>

          {/* NODE 4: FACILITY DEMAND (Bottom-Right: x=670, y=360, width=270, height=160) */}
          <g 
            transform="translate(670, 360)" 
            className="cursor-pointer group"
            onClick={() => setSelectedNode(selectedNode === 'load' ? null : 'load')}
          >
            <rect 
              x="0" y="0" width="270" height="160" rx="22" 
              fill="url(#card-grad-load)" 
              stroke={selectedNode === 'load' ? '#FBBF24' : '#FBBF24'} 
              strokeOpacity={selectedNode === 'load' ? '1' : '0.4'}
              strokeWidth={selectedNode === 'load' ? '3' : '1.5'} 
              filter={selectedNode === 'load' ? 'url(#glow-gold)' : undefined}
            />
            {/* Header Icon */}
            <circle cx="36" cy="36" r="18" fill="#FBBF24" fillOpacity="0.2" />
            <path d="M 27 45 L 27 34 L 34 38 L 34 32 L 41 36 L 41 28 L 47 31 L 47 45 Z" fill="#FBBF24" />

            <text x="66" y="34" fill="#ffffff" fontSize="15" fontWeight="500" fontFamily="system-ui, sans-serif">Facility & EV Load</text>
            <text x="66" y="49" fill="#9da395" fontSize="11" fontFamily="system-ui, sans-serif">Commercial Microgrid</text>

            <rect x="175" y="24" width="81" height="22" rx="11" fill="#fbbf2415" stroke="#fbbf2450" strokeWidth="1" />
            <text x="215" y="39" textAnchor="middle" fill="#FBBF24" fontSize="10" fontWeight="bold" fontFamily="monospace">
              DEMAND
            </text>

            {/* Metrics */}
            <text x="24" y="86" fill="#9da395" fontSize="12" fontFamily="system-ui, sans-serif">Total Consumed Load</text>
            <text x="24" y="118" fill="#FBBF24" fontSize="28" fontWeight="600" fontFamily="monospace">{state.facilityLoadKW} kW</text>

            <text x="246" y="116" textAnchor="end" fill="#fef08a" fontSize="12" fontFamily="monospace">
              Base: {state.baseFacilityLoad} kW
            </text>

            {/* Progress bar */}
            <rect x="24" y="132" width="222" height="6" rx="3" fill="#251e0f" />
            <rect x="24" y="132" width={Math.min(222, (state.facilityLoadKW / 150) * 222)} height="6" rx="3" fill="#FBBF24" />
          </g>

        </svg>

      </div>

      {/* Interactive Node Details Drawer (Clear plain-English explanation) */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2 }}
            className="mt-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#121813]/95 via-[#0e1410]/95 to-[#080d09]/95 border border-white/10 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs specular-rim"
          >
            <div className="flex items-start sm:items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#00F59B]/20 border border-[#00F59B]/40 text-[#00F59B] shadow-[0_0_15px_rgba(0,245,155,0.3)]">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="font-semibold text-white uppercase tracking-wider block sm:inline mr-2 text-[13px]">
                  Station Telemetry Insight ({selectedNode.toUpperCase()}):
                </span>
                <span className="text-[#cbd0c5] font-light leading-relaxed">
                  {selectedNode === 'solar' && `Real-time irradiance is ${state.irradiance} W/m². The array generates ${state.solarKW} kW of clean electricity, avoiding carbon emissions.`}
                  {selectedNode === 'bess' && `Capacity: 200 kWh LiFePO4. Protected minimum constraint is ${state.minSocConstraint}%. Battery temp: ${state.bessTempC}°C. Health: ${state.bessHealthPct}%.`}
                  {selectedNode === 'grid' && `Diesel backup is fully suppressed by Edge-AI. Grid interchange: ${state.gridKW} kW. Running in 100% clean autonomous mode.`}
                  {selectedNode === 'load' && `Supplying commercial buildings and high-speed EV chargers with ${state.facilityLoadKW} kW uninterrupted power.`}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setSelectedNode(null)}
              className="text-[11px] font-mono text-[#9da395] hover:text-white px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors whitespace-nowrap self-end sm:self-center cursor-pointer"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
