import React from 'react';
import { MicrogridState, WeatherHorizon } from '../types';
import { 
  Sliders, 
  Sun, 
  Battery, 
  Factory, 
  CloudSun, 
  CloudRain, 
  SunMedium, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface SandboxControlPanelProps {
  state: MicrogridState;
  onUpdateState: (updates: Partial<MicrogridState>) => void;
  onResetDefaults: () => void;
}

export const SandboxControlPanel: React.FC<SandboxControlPanelProps> = ({
  state,
  onUpdateState,
  onResetDefaults,
}) => {
  const setScenario = (preset: 'surplus' | 'evening' | 'storm' | 'balanced') => {
    switch (preset) {
      case 'surplus':
        onUpdateState({
          irradiance: 980,
          baseFacilityLoad: 32,
          weatherHorizon: 'clear',
          minSocConstraint: 20,
        });
        break;
      case 'evening':
        onUpdateState({
          irradiance: 50,
          baseFacilityLoad: 120,
          weatherHorizon: 'clear',
          minSocConstraint: 20,
        });
        break;
      case 'storm':
        onUpdateState({
          irradiance: 220,
          baseFacilityLoad: 95,
          weatherHorizon: 'storm',
          minSocConstraint: 25,
        });
        break;
      case 'balanced':
        onResetDefaults();
        break;
    }
  };

  return (
    <div className="glass-vibrant-card specular-rim rounded-3xl p-5 sm:p-7 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)] relative overflow-hidden font-sans">
      
      {/* Ambient background glow inside the card */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FBBF24]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#00F59B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Panel Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-[#FBBF24]/25 to-[#00F59B]/20 border border-[#FBBF24]/50 text-[#FBBF24] shadow-[0_0_20px_rgba(251,191,36,0.35)]">
              <Sliders className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-light tracking-tight text-white flex items-center gap-2">
                  Judge Sandbox // Real-Time Microgrid Controls
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FBBF24]/15 border border-[#FBBF24]/40 text-[10px] font-mono text-[#FBBF24] font-semibold">
                  Live Loop
                </span>
              </div>
              <p className="text-xs text-[#9da395] font-light">
                Manipulate physical parameters live to observe sub-second Edge-AI dispatch response
              </p>
            </div>
          </div>

          <button
            onClick={onResetDefaults}
            className="flex items-center gap-1.5 text-xs font-mono text-[#9da395] hover:text-white px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors shadow-sm cursor-pointer self-start sm:self-auto"
            title="Reset to default baseline conditions"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>
        </div>

        {/* Quick Scenario Preset Buttons */}
        <div className="mb-5">
          <span className="text-[11px] font-mono text-[#9da395] block mb-2 font-light">
            Quick Test Scenarios:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-light">
            <button
              onClick={() => setScenario('surplus')}
              className="p-3 rounded-2xl bg-gradient-to-br from-[#00F59B]/15 to-[#34D399]/10 hover:from-[#00F59B]/25 hover:to-[#34D399]/20 text-white border border-[#00F59B]/40 text-left transition-all shadow-sm group"
            >
              <div className="font-medium flex items-center gap-1.5 text-[#00F59B] mb-0.5">
                <Sun className="w-3.5 h-3.5" /> Noon Surplus
              </div>
              <div className="text-[10px] text-[#9da395] font-mono font-light">980 W/m² · 32kW Load</div>
            </button>

            <button
              onClick={() => setScenario('evening')}
              className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/15 to-yellow-500/10 hover:from-amber-500/25 hover:to-yellow-500/20 text-white border border-amber-500/40 text-left transition-all shadow-sm group"
            >
              <div className="font-medium flex items-center gap-1.5 text-amber-300 mb-0.5">
                <Factory className="w-3.5 h-3.5 text-amber-400" /> Evening EV Peak
              </div>
              <div className="text-[10px] text-[#9da395] font-mono font-light">50 W/m² · 120kW Load</div>
            </button>

            <button
              onClick={() => setScenario('storm')}
              className="p-3 rounded-2xl bg-gradient-to-br from-rose-500/15 to-red-500/10 hover:from-rose-500/25 hover:to-red-500/20 text-white border border-rose-500/40 text-left transition-all shadow-sm group"
            >
              <div className="font-medium flex items-center gap-1.5 text-rose-300 mb-0.5">
                <CloudRain className="w-3.5 h-3.5 text-rose-400" /> Severe Storm
              </div>
              <div className="text-[10px] text-[#9da395] font-mono font-light">220 W/m² · 95kW Load</div>
            </button>

            <button
              onClick={() => setScenario('balanced')}
              className="p-3 rounded-2xl bg-gradient-to-br from-[#22D3EE]/15 to-[#06B6D4]/10 hover:from-[#22D3EE]/25 hover:to-[#06B6D4]/20 text-white border border-[#22D3EE]/40 text-left transition-all shadow-sm group"
            >
              <div className="font-medium flex items-center gap-1.5 text-[#22D3EE] mb-0.5">
                <Sparkles className="w-3.5 h-3.5" /> Balanced Base
              </div>
              <div className="text-[10px] text-[#9da395] font-mono font-light">780 W/m² · 58kW Load</div>
            </button>
          </div>
        </div>

        {/* Live Interactive Sliders */}
        <div className="space-y-4">
          
          {/* Slider 1: Solar Irradiance */}
          <div className="bg-[#080d09]/90 border border-white/10 rounded-2xl p-4 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-light text-white flex items-center gap-2">
                <Sun className="w-4 h-4 text-[#00F59B]" />
                <span className="font-medium">Solar Irradiance (G)</span>
              </label>
              <span className="font-mono text-xs font-semibold text-[#00F59B] px-3 py-1 rounded-xl bg-[#00F59B]/15 border border-[#00F59B]/40 shadow-[0_0_10px_rgba(0,245,155,0.25)]">
                {state.irradiance} W/m²
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={state.irradiance}
              onChange={(e) => onUpdateState({ irradiance: Number(e.target.value) })}
              className="w-full h-2 bg-[#122017] rounded-lg appearance-none cursor-pointer accent-[#00F59B] focus:outline-none"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#7c8177] mt-1.5 font-light">
              <span>0 (Dark Night)</span>
              <span>500 (Moderate Overcast)</span>
              <span>1000 W/m² (Peak Solar Noon)</span>
            </div>
          </div>

          {/* Slider 2: Facility & EV Surge Load */}
          <div className="bg-[#080d09]/90 border border-white/10 rounded-2xl p-4 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-light text-white flex items-center gap-2">
                <Factory className="w-4 h-4 text-[#FBBF24]" />
                <span className="font-medium">Facility & EV Surge Load (P_L)</span>
              </label>
              <span className="font-mono text-xs font-semibold text-[#FBBF24] px-3 py-1 rounded-xl bg-[#FBBF24]/15 border border-[#FBBF24]/40 shadow-[0_0_10px_rgba(251,191,36,0.25)]">
                {state.baseFacilityLoad} kW
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="150"
              step="1"
              value={state.baseFacilityLoad}
              onChange={(e) => onUpdateState({ baseFacilityLoad: Number(e.target.value) })}
              className="w-full h-2 bg-[#251e0f] rounded-lg appearance-none cursor-pointer accent-[#FBBF24] focus:outline-none"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#7c8177] mt-1.5 font-light">
              <span>20 kW (Off-Peak Baseload)</span>
              <span>85 kW (Standard Operating Shift)</span>
              <span>150 kW (Heavy EV Rapid Charger Surge)</span>
            </div>
          </div>

          {/* Slider 3: Minimum Protected SoC Constraint */}
          <div className="bg-[#080d09]/90 border border-white/10 rounded-2xl p-4 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-light text-white flex items-center gap-2">
                <Battery className="w-4 h-4 text-[#22D3EE]" />
                <span className="font-medium">Battery Minimum SoC Constraint (SoC_min)</span>
              </label>
              <span className="font-mono text-xs font-semibold text-[#22D3EE] px-3 py-1 rounded-xl bg-[#22D3EE]/15 border border-[#22D3EE]/40 shadow-[0_0_10px_rgba(34,211,238,0.25)]">
                {state.minSocConstraint}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="30"
              step="1"
              value={state.minSocConstraint}
              onChange={(e) => onUpdateState({ minSocConstraint: Number(e.target.value) })}
              className="w-full h-2 bg-[#0d1f26] rounded-lg appearance-none cursor-pointer accent-[#22D3EE] focus:outline-none"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#7c8177] mt-1.5 font-light">
              <span>10% (High Stress)</span>
              <span>20% (Optimal +15% Life Extension)</span>
              <span>30% (High Reserve Margin)</span>
            </div>
          </div>

          {/* Weather Forecast Horizon 3-Way Selector */}
          <div className="bg-[#080d09]/90 border border-white/10 rounded-2xl p-4 shadow-inner">
            <label className="text-xs font-light text-white flex items-center gap-2 mb-2.5">
              <CloudSun className="w-4 h-4 text-[#00F59B]" />
              <span className="font-medium">Weather Forecast Horizon</span>
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={() => onUpdateState({ weatherHorizon: 'clear' })}
                className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-light transition-all ${
                  state.weatherHorizon === 'clear'
                    ? 'bg-[#00F59B]/25 text-white border border-[#00F59B]/60 shadow-[0_0_15px_rgba(0,245,155,0.3)] font-medium'
                    : 'bg-white/5 text-[#9da395] hover:text-white border border-white/10'
                }`}
              >
                <SunMedium className="w-3.5 h-3.5 text-[#00F59B]" />
                <span>Clear Sky</span>
              </button>
              <button
                onClick={() => onUpdateState({ weatherHorizon: 'intermittent' })}
                className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-light transition-all ${
                  state.weatherHorizon === 'intermittent'
                    ? 'bg-[#22D3EE]/25 text-white border border-[#22D3EE]/60 shadow-[0_0_15px_rgba(34,211,238,0.3)] font-medium'
                    : 'bg-white/5 text-[#9da395] hover:text-white border border-white/10'
                }`}
              >
                <CloudSun className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span>Passing Cumulus</span>
              </button>
              <button
                onClick={() => onUpdateState({ weatherHorizon: 'storm' })}
                className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-light transition-all ${
                  state.weatherHorizon === 'storm'
                    ? 'bg-rose-500/25 text-white border border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.3)] font-medium'
                    : 'bg-white/5 text-[#9da395] hover:text-white border border-white/10'
                }`}
              >
                <CloudRain className="w-3.5 h-3.5 text-rose-400" />
                <span>Severe Storm</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-[#9da395] flex items-center justify-between font-light relative z-10">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00F59B] animate-ping"></span>
          <span>Live Closed-Loop Physics:</span>
          <span className="font-mono text-[#00F59B] font-semibold">1.5s Cycle</span>
        </span>
        <span className="font-mono text-[#7c8177]">
          Δt = 90ms Edge Slew
        </span>
      </div>
    </div>
  );
};
