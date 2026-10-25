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
  AlertCircle
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
    <div className="glass-panel rounded-2xl p-4 xl:p-5 border border-white/10 shadow-xl flex flex-col justify-between bg-[#20241b]/90 font-sans">
      
      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#10b981]/15 border border-[#34d399]/30">
            <ShieldCheck className="w-4 h-4 text-[#34d399]" />
          </div>
          <div>
            <h2 className="text-sm font-light tracking-tight text-white flex items-center gap-2">
              BESS Cycle-Wear & Degradation Optimization Engine
            </h2>
            <p className="text-[11px] text-[#9da395] font-light">
              Rainflow cycle-counting & electrochemical stress mitigation algorithm
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex p-0.5 bg-[#121510] rounded-lg border border-white/10 text-xs">
          <button
            onClick={() => setActiveTab('kpi')}
            className={`px-3 py-1 rounded-md text-[11px] font-light transition-all ${
              activeTab === 'kpi'
                ? 'bg-[#10b981]/20 text-[#86efac] font-medium border border-[#34d399]/30'
                : 'text-[#9da395] hover:text-[#f2f3ef]'
            }`}
          >
            Core KPIs
          </button>
          <button
            onClick={() => setActiveTab('curve')}
            className={`px-3 py-1 rounded-md text-[11px] font-light transition-all ${
              activeTab === 'curve'
                ? 'bg-[#10b981]/20 text-[#86efac] font-medium border border-[#34d399]/30'
                : 'text-[#9da395] hover:text-[#f2f3ef]'
            }`}
          >
            Degradation Curves
          </button>
          <button
            onClick={() => setActiveTab('thermal')}
            className={`px-3 py-1 rounded-md text-[11px] font-light transition-all ${
              activeTab === 'thermal'
                ? 'bg-[#10b981]/20 text-[#86efac] font-medium border border-[#34d399]/30'
                : 'text-[#9da395] hover:text-[#f2f3ef]'
            }`}
          >
            Thermal & C-Rate
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'kpi' && (
        <div className="space-y-3">
          
          {/* Top 2 Primary Impact Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* KPI 1: Diesel Runtime Reduced */}
            <div className="p-3.5 rounded-xl bg-[#121510] border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#10b981]/5 rounded-full blur-xl group-hover:bg-[#10b981]/10 transition-all pointer-events-none" />
              <div className="flex items-center justify-between text-xs text-[#9da395] mb-1 font-light">
                <span className="flex items-center gap-1.5 font-normal">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  Diesel Runtime Reduced
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#10b981]/15 text-[#86efac] border border-[#34d399]/30">
                  Target: 20-30%
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-light font-mono text-[#34d399] glow-text-emerald">
                  {state.controllerMode === 'autonomous' ? '28.4%' : state.controllerMode === 'legacy' ? '4.1%' : '12.8%'}
                </span>
                <span className="text-xs text-[#9da395] font-mono">less generator runtime</span>
              </div>
              {/* Progress bar vs Target */}
              <div className="w-full bg-[#282e22] h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-[#34d399] h-full rounded-full transition-all duration-700"
                  style={{ width: state.controllerMode === 'autonomous' ? '94.6%' : '20%' }}
                />
              </div>
            </div>

            {/* KPI 2: Battery Lifespan Extension */}
            <div className="p-3.5 rounded-xl bg-[#121510] border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#34d399]/5 rounded-full blur-xl group-hover:bg-[#34d399]/10 transition-all pointer-events-none" />
              <div className="flex items-center justify-between text-xs text-[#9da395] mb-1 font-light">
                <span className="flex items-center gap-1.5 font-normal">
                  <Award className="w-3.5 h-3.5 text-[#34d399]" />
                  Battery Lifespan Extension
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#10b981]/15 text-[#86efac] border border-[#34d399]/30">
                  Verified Model
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-light font-mono text-[#86efac]">
                  {state.controllerMode === 'autonomous' ? '+15.2%' : state.controllerMode === 'legacy' ? '+0.0%' : '+6.4%'}
                </span>
                <span className="text-xs text-[#9da395] font-mono">(~3.2 Additional Years)</span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-[#282e22] h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-[#86efac] h-full rounded-full transition-all duration-700"
                  style={{ width: state.controllerMode === 'autonomous' ? '88%' : '15%' }}
                />
              </div>
            </div>

          </div>

          {/* Secondary Telemetry: Depth-of-Discharge (DoD) & Micro-Cycles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
            
            {/* Stress Gauge 1: Depth of Discharge */}
            <div className="p-2.5 rounded-xl bg-[#161913] border border-white/10 flex flex-col justify-between">
              <span className="text-[11px] text-[#9da395] flex items-center justify-between font-light">
                <span>Depth of Discharge (DoD):</span>
                <span className={state.bessDoD > 80 ? 'text-amber-400 font-medium' : 'text-[#cbd0c5]'}>
                  {state.bessDoD}%
                </span>
              </span>
              <div className="w-full bg-[#282e22] h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    state.bessDoD > 80 ? 'bg-amber-400' : 'bg-[#34d399]'
                  }`}
                  style={{ width: `${state.bessDoD}%` }}
                />
              </div>
              <span className="text-[10px] text-[#7c8177] mt-1 font-light">
                Safe Envelope: &lt; 80% DoD
              </span>
            </div>

            {/* Stress Gauge 2: Micro-Cycle Dampener */}
            <div className="p-2.5 rounded-xl bg-[#161913] border border-white/10 flex flex-col justify-between">
              <span className="text-[11px] text-[#9da395] flex items-center justify-between font-light">
                <span>Micro-Cycles Filtered:</span>
                <span className="text-[#34d399] font-medium">
                  {state.bessMicroCycles}
                </span>
              </span>
              <div className="w-full bg-[#282e22] h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="bg-[#34d399] h-full rounded-full transition-all"
                  style={{ width: '74%' }}
                />
              </div>
              <span className="text-[10px] text-[#7c8177] mt-1 font-light">
                Eliminates shallow reversals
              </span>
            </div>

            {/* Stress Gauge 3: Health Status */}
            <div className="p-2.5 rounded-xl bg-[#161913] border border-white/10 flex flex-col justify-between">
              <span className="text-[11px] text-[#9da395] flex items-center justify-between font-light">
                <span>State of Health (SoH):</span>
                <span className="text-[#86efac] font-medium">
                  {state.bessHealthPct}%
                </span>
              </span>
              <div className="w-full bg-[#282e22] h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="bg-[#86efac] h-full rounded-full transition-all"
                  style={{ width: `${state.bessHealthPct}%` }}
                />
              </div>
              <span className="text-[10px] text-[#7c8177] mt-1 font-light">
                200 kWh LFP Chemistry
              </span>
            </div>

          </div>

        </div>
      )}

      {/* Degradation Curves Visual Comparison Tab */}
      {activeTab === 'curve' && (
        <div className="p-3 bg-[#121510] rounded-xl border border-white/10 space-y-3 font-sans">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#cbd0c5] font-light">10-Year Projected Degradation Profile:</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[#34d399]">
                <span className="w-2.5 h-0.5 bg-[#34d399] rounded"></span> VoltSense Edge-AI
              </span>
              <span className="flex items-center gap-1 text-rose-400">
                <span className="w-2.5 h-0.5 bg-rose-400 rounded"></span> Legacy Static PLC
              </span>
            </div>
          </div>

          {/* Simple comparative SVG curve */}
          <div className="h-28 w-full relative">
            <svg viewBox="0 0 400 120" className="w-full h-full">
              {/* Grid lines */}
              <line x1="40" y1="20" x2="380" y2="20" stroke="#282e22" strokeDasharray="2 2" />
              <line x1="40" y1="60" x2="380" y2="60" stroke="#282e22" strokeDasharray="2 2" />
              <line x1="40" y1="100" x2="380" y2="100" stroke="#282e22" strokeDasharray="2 2" />

              {/* Labels */}
              <text x="5" y="24" fill="#7c8177" fontSize="9" fontFamily="monospace">100%</text>
              <text x="12" y="64" fill="#7c8177" fontSize="9" fontFamily="monospace">80%</text>
              <text x="12" y="104" fill="#7c8177" fontSize="9" fontFamily="monospace">60%</text>

              {/* Curve 1: VoltSense AI (Gentle slope, ends at 84% at Year 10) */}
              <path
                d="M 40 20 C 150 25, 260 40, 380 54"
                fill="none"
                stroke="#34D399"
                strokeWidth="2.5"
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
              <line x1="40" y1="60" x2="380" y2="60" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <text x="280" y="55" fill="#F59E0B" fontSize="8" fontFamily="monospace">EOL (80% SoH)</text>
            </svg>
          </div>

          <p className="text-[11px] text-[#9da395] font-light">
            VoltSense AI restricts high C-rate step pulses, preserving lithium-ion cathode lattice integrity and deferring multimillion-dollar BESS pack replacement by 3.2 years.
          </p>
        </div>
      )}

      {/* Thermal & C-Rate Tab */}
      {activeTab === 'thermal' && (
        <div className="p-3 bg-[#121510] rounded-xl border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
          <div className="space-y-1.5 font-mono">
            <span className="text-[#9da395] flex items-center gap-1.5 font-light">
              <Thermometer className="w-3.5 h-3.5 text-[#34d399]" />
              Pack Core Temperature:
            </span>
            <div className="text-xl font-light text-[#86efac]">
              {state.bessTempC} °C
            </div>
            <div className="w-full bg-[#282e22] h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${state.bessTempC > 35 ? 'bg-amber-400' : 'bg-[#34d399]'}`}
                style={{ width: `${(state.bessTempC / 50) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-[#7c8177] font-light">Thermal Envelope: 20°C - 35°C</span>
          </div>

          <div className="space-y-1.5 font-mono">
            <span className="text-[#9da395] flex items-center gap-1.5 font-light">
              <Zap className="w-3.5 h-3.5 text-[#34d399]" />
              Continuous C-Rate:
            </span>
            <div className="text-xl font-light text-[#34d399]">
              {state.bessCRate} C ({Math.abs(state.bessKW)} kW)
            </div>
            <div className="w-full bg-[#282e22] h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${state.bessCRate > 0.8 ? 'bg-rose-400' : 'bg-[#34d399]'}`}
                style={{ width: `${Math.min(100, (state.bessCRate / 1.0) * 100)}%` }}
              />
            </div>
            <span className="text-[10px] text-[#7c8177] font-light">Peak Rated: 0.8C continuous</span>
          </div>
        </div>
      )}

      {/* Footer Status */}
      <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#9da395]">
        <span className="flex items-center gap-1.5 font-light">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]"></span>
          Algorithm: <span className="text-[#cbd0c5]">Slew-Rate Controlled DOD Optimizer</span>
        </span>
        <span className="text-[#86efac] font-medium">
          {state.controllerMode === 'autonomous' ? 'ACTIVE PROTECTION ON' : 'LEGACY MODE (HIGH WEAR)'}
        </span>
      </div>

    </div>
  );
};
