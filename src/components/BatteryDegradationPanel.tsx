import React, { useState } from 'react';
import { MicrogridState } from '../types';
import { 
  ShieldCheck, 
  Battery, 
  TrendingUp, 
  Flame, 
  Thermometer, 
  Zap, 
  Activity, 
  Award,
  AlertCircle,
  Sparkles
} from 'lucide-react';

interface BatteryDegradationPanelProps {
  state: MicrogridState;
}

export const BatteryDegradationPanel: React.FC<BatteryDegradationPanelProps> = ({ state }) => {
  const [activeTab, setActiveTab] = useState<'kpi' | 'curve' | 'thermal'>('kpi');

  // Degradation calculation metrics
  const isOptimalRange = state.bessSoC >= state.minSocConstraint && state.bessSoC <= 90;
  const cRateSafe = state.bessCRate <= 0.5;

  return (
    <div className="glass-vibrant-card specular-rim rounded-3xl p-5 sm:p-7 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)] relative overflow-hidden font-sans">
      
      {/* Ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C084FC]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#00F59B]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-[#C084FC]/25 to-[#00F59B]/20 border border-[#C084FC]/50 text-[#C084FC] shadow-[0_0_20px_rgba(192,132,252,0.35)]">
            <ShieldCheck className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-light tracking-tight text-white flex items-center gap-2">
                BESS Cycle-Wear & Degradation Optimization Engine
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#00F59B]/15 border border-[#00F59B]/40 text-[10px] font-mono text-[#00F59B] font-semibold">
                +15.2% Life Ext.
              </span>
            </div>
            <p className="text-xs text-[#9da395] font-light">
              Rainflow cycle-counting & electrochemical stress mitigation algorithm (LiFePO4 Chemistry)
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex p-1 bg-[#080d09]/90 rounded-2xl border border-white/10 text-xs shadow-inner">
          <button
            onClick={() => setActiveTab('kpi')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-light transition-all ${
              activeTab === 'kpi'
                ? 'bg-[#00F59B]/25 text-[#00F59B] font-medium border border-[#00F59B]/40 shadow-[0_0_12px_rgba(0,245,155,0.25)]'
                : 'text-[#9da395] hover:text-[#f2f3ef]'
            }`}
          >
            Core KPIs
          </button>
          <button
            onClick={() => setActiveTab('curve')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-light transition-all ${
              activeTab === 'curve'
                ? 'bg-[#C084FC]/25 text-[#C084FC] font-medium border border-[#C084FC]/40 shadow-[0_0_12px_rgba(192,132,252,0.25)]'
                : 'text-[#9da395] hover:text-[#f2f3ef]'
            }`}
          >
            Degradation Curves
          </button>
          <button
            onClick={() => setActiveTab('thermal')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-light transition-all ${
              activeTab === 'thermal'
                ? 'bg-[#22D3EE]/25 text-[#22D3EE] font-medium border border-[#22D3EE]/40 shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                : 'text-[#9da395] hover:text-[#f2f3ef]'
            }`}
          >
            Thermal & C-Rate
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'kpi' && (
        <div className="space-y-4 relative z-10">
          
          {/* Top 2 Primary Impact Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* KPI 1: Diesel Runtime Reduced */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#080d09]/90 border border-white/10 relative overflow-hidden group shadow-inner">
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#00F59B]/5 rounded-full blur-xl group-hover:bg-[#00F59B]/10 transition-all pointer-events-none" />
              <div className="flex items-center justify-between text-xs text-[#9da395] mb-2 font-light">
                <span className="flex items-center gap-2 font-normal text-white">
                  <Flame className="w-4 h-4 text-rose-400" />
                  <span>Diesel Runtime Abatement</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00F59B]/15 text-[#00F59B] border border-[#00F59B]/40 font-semibold">
                  Target: 20-30%
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-light font-mono text-[#00F59B] text-gradient-vibrant">
                  {state.controllerMode === 'autonomous' ? '28.4%' : state.controllerMode === 'legacy' ? '4.1%' : '12.8%'}
                </span>
                <span className="text-xs text-[#9da395] font-mono">less generator runtime</span>
              </div>
              {/* Progress bar vs Target */}
              <div className="w-full bg-[#122017] h-2 rounded-full mt-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#00F59B] to-[#34D399] h-full rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(0,245,155,0.6)]"
                  style={{ width: state.controllerMode === 'autonomous' ? '94.6%' : '20%' }}
                />
              </div>
            </div>

            {/* KPI 2: Battery Lifespan Extension */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#080d09]/90 border border-white/10 relative overflow-hidden group shadow-inner">
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#C084FC]/5 rounded-full blur-xl group-hover:bg-[#C084FC]/10 transition-all pointer-events-none" />
              <div className="flex items-center justify-between text-xs text-[#9da395] mb-2 font-light">
                <span className="flex items-center gap-2 font-normal text-white">
                  <Award className="w-4 h-4 text-[#C084FC]" />
                  <span>BESS Lifespan Extension</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#C084FC]/15 text-[#C084FC] border border-[#C084FC]/40 font-semibold">
                  Verified Rainflow
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-light font-mono text-[#C084FC]">
                  {state.controllerMode === 'autonomous' ? '+15.2%' : state.controllerMode === 'legacy' ? '+0.0%' : '+6.4%'}
                </span>
                <span className="text-xs text-[#9da395] font-mono">(~3.2 Additional Operating Years)</span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-[#1e1528] h-2 rounded-full mt-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#C084FC] to-[#A855F7] h-full rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(192,132,252,0.6)]"
                  style={{ width: state.controllerMode === 'autonomous' ? '88%' : '15%' }}
                />
              </div>
            </div>

          </div>

          {/* Secondary Telemetry: Depth-of-Discharge (DoD) & Micro-Cycles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            
            {/* Stress Gauge 1: Depth of Discharge */}
            <div className="p-3.5 rounded-2xl bg-[#080d09]/90 border border-white/10 flex flex-col justify-between shadow-inner">
              <span className="text-[11px] text-[#9da395] flex items-center justify-between font-light">
                <span>Depth of Discharge (DoD):</span>
                <span className={state.bessDoD > 80 ? 'text-amber-400 font-semibold' : 'text-white'}>
                  {state.bessDoD}%
                </span>
              </span>
              <div className="w-full bg-[#122017] h-2 rounded-full mt-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    state.bessDoD > 80 ? 'bg-amber-400' : 'bg-[#00F59B]'
                  }`}
                  style={{ width: `${state.bessDoD}%` }}
                />
              </div>
              <span className="text-[10px] text-[#7c8177] mt-1.5 font-light">
                Safe Envelope: &lt; 80% DoD
              </span>
            </div>

            {/* Stress Gauge 2: Micro-Cycle Dampener */}
            <div className="p-3.5 rounded-2xl bg-[#080d09]/90 border border-white/10 flex flex-col justify-between shadow-inner">
              <span className="text-[11px] text-[#9da395] flex items-center justify-between font-light">
                <span>Micro-Cycles Filtered:</span>
                <span className="text-[#00F59B] font-semibold">
                  {state.bessMicroCycles}
                </span>
              </span>
              <div className="w-full bg-[#122017] h-2 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-[#00F59B] h-full rounded-full transition-all shadow-[0_0_8px_rgba(0,245,155,0.6)]"
                  style={{ width: '74%' }}
                />
              </div>
              <span className="text-[10px] text-[#7c8177] mt-1.5 font-light">
                Eliminates micro-reversals
              </span>
            </div>

            {/* Stress Gauge 3: Health Status */}
            <div className="p-3.5 rounded-2xl bg-[#080d09]/90 border border-white/10 flex flex-col justify-between shadow-inner">
              <span className="text-[11px] text-[#9da395] flex items-center justify-between font-light">
                <span>State of Health (SoH):</span>
                <span className="text-[#22D3EE] font-semibold">
                  {state.bessHealthPct}%
                </span>
              </span>
              <div className="w-full bg-[#0d1f26] h-2 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-[#22D3EE] h-full rounded-full transition-all shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                  style={{ width: `${state.bessHealthPct}%` }}
                />
              </div>
              <span className="text-[10px] text-[#7c8177] mt-1.5 font-light">
                200 kWh LiFePO4 Pack
              </span>
            </div>

          </div>

        </div>
      )}

      {/* Degradation Curves Visual Comparison Tab */}
      {activeTab === 'curve' && (
        <div className="p-4 sm:p-5 bg-[#080d09]/90 rounded-2xl border border-white/10 space-y-4 font-sans relative z-10 shadow-inner">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-white font-medium">10-Year Projected Degradation Profile:</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[#00F59B]">
                <span className="w-3 h-1 bg-[#00F59B] rounded-full shadow-[0_0_8px_rgba(0,245,155,0.8)]"></span> VoltSense Edge-AI
              </span>
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-3 h-1 bg-rose-400 rounded-full"></span> Legacy Static PLC
              </span>
            </div>
          </div>

          {/* Comparative SVG curve */}
          <div className="h-36 w-full relative">
            <svg viewBox="0 0 400 120" className="w-full h-full">
              {/* Grid lines */}
              <line x1="40" y1="20" x2="380" y2="20" stroke="#ffffff15" strokeDasharray="3 3" />
              <line x1="40" y1="60" x2="380" y2="60" stroke="#ffffff15" strokeDasharray="3 3" />
              <line x1="40" y1="100" x2="380" y2="100" stroke="#ffffff15" strokeDasharray="3 3" />

              {/* Labels */}
              <text x="5" y="24" fill="#9da395" fontSize="9" fontFamily="monospace">100%</text>
              <text x="12" y="64" fill="#9da395" fontSize="9" fontFamily="monospace">80%</text>
              <text x="12" y="104" fill="#9da395" fontSize="9" fontFamily="monospace">60%</text>

              {/* Curve 1: VoltSense AI (Gentle slope, ends at 84% at Year 10) */}
              <path
                d="M 40 20 C 150 25, 260 40, 380 54"
                fill="none"
                stroke="#00F59B"
                strokeWidth="3"
                filter="drop-shadow(0 0 6px rgba(0,245,155,0.7))"
              />

              {/* Curve 2: Legacy Static */}
              <path
                d="M 40 20 C 140 45, 240 75, 380 98"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
                strokeDasharray="4 3"
              />

              {/* 80% End of Life (EOL) Threshold Marker */}
              <line x1="40" y1="60" x2="380" y2="60" stroke="#FBBF24" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <text x="280" y="55" fill="#FBBF24" fontSize="8" fontFamily="monospace">EOL Threshold (80% SoH)</text>
            </svg>
          </div>

          <p className="text-xs text-[#9da395] font-light leading-relaxed">
            VoltSense AI restricts high C-rate step pulses and micro-cycling, preserving lithium-ion cathode lattice integrity and deferring multimillion-dollar BESS pack replacement by 3.2 years.
          </p>
        </div>
      )}

      {/* Thermal & C-Rate Tab */}
      {activeTab === 'thermal' && (
        <div className="p-4 sm:p-5 bg-[#080d09]/90 rounded-2xl border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans relative z-10 shadow-inner">
          <div className="space-y-2 font-mono">
            <span className="text-[#9da395] flex items-center gap-2 font-light">
              <Thermometer className="w-4 h-4 text-[#00F59B]" />
              <span className="text-white">Pack Core Temperature:</span>
            </span>
            <div className="text-2xl font-light text-[#00F59B]">
              {state.bessTempC} °C
            </div>
            <div className="w-full bg-[#122017] h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all ${state.bessTempC > 35 ? 'bg-amber-400' : 'bg-[#00F59B]'}`}
                style={{ width: `${(state.bessTempC / 50) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-[#7c8177] font-light">Optimal Thermal Range: 20°C - 35°C</span>
          </div>

          <div className="space-y-2 font-mono">
            <span className="text-[#9da395] flex items-center gap-2 font-light">
              <Zap className="w-4 h-4 text-[#22D3EE]" />
              <span className="text-white">Continuous C-Rate:</span>
            </span>
            <div className="text-2xl font-light text-[#22D3EE]">
              {state.bessCRate} C ({Math.abs(state.bessKW)} kW)
            </div>
            <div className="w-full bg-[#0d1f26] h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all ${state.bessCRate > 0.8 ? 'bg-rose-400' : 'bg-[#22D3EE]'}`}
                style={{ width: `${Math.min(100, (state.bessCRate / 1.0) * 100)}%` }}
              />
            </div>
            <span className="text-[10px] text-[#7c8177] font-light">Peak Rated: 0.8C continuous safety limit</span>
          </div>
        </div>
      )}

      {/* Footer Status */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#9da395] relative z-10">
        <span className="flex items-center gap-2 font-light">
          <span className="w-2 h-2 rounded-full bg-[#00F59B] animate-pulse"></span>
          <span>Algorithm:</span>
          <span className="text-white font-medium">Slew-Rate Controlled DoD Optimizer</span>
        </span>
        <span className="text-[#00F59B] font-semibold">
          {state.controllerMode === 'autonomous' ? 'ACTIVE PROTECTION ENGAGED' : 'LEGACY MODE (HIGH WEAR)'}
        </span>
      </div>

    </div>
  );
};
