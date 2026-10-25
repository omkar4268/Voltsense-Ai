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
    <div className="glass-panel rounded-2xl p-4 xl:p-5 border border-white/10 shadow-xl flex flex-col justify-between bg-[#20241b]/90 font-sans">
      <div>
        {/* Panel Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#10b981]/15 border border-[#34d399]/30">
              <Sliders className="w-4 h-4 text-[#34d399]" />
            </div>
            <div>
              <h2 className="text-sm font-light tracking-tight text-white flex items-center gap-1.5">
                Judge Sandbox // Real-Time Microgrid Controls
              </h2>
              <p className="text-[11px] text-[#9da395] font-light">
                Manipulate physics parameters live to observe sub-second Edge-AI response
              </p>
            </div>
          </div>

          <button
            onClick={onResetDefaults}
            className="flex items-center gap-1 text-[11px] font-mono text-[#9da395] hover:text-[#f2f3ef] px-2 py-1 rounded bg-[#161913] border border-white/10 transition-colors"
            title="Reset to default baseline conditions"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Baseline</span>
          </button>
        </div>

        {/* Quick Scenario Preset Buttons */}
        <div className="mb-4">
          <span className="text-[11px] font-mono text-[#9da395] block mb-1.5 font-light">
            Quick Test Scenarios:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs font-light">
            <button
              onClick={() => setScenario('surplus')}
              className="px-2 py-1.5 rounded-lg bg-[#10b981]/15 hover:bg-[#10b981]/25 text-[#86efac] border border-[#34d399]/30 text-left transition-all"
            >
              <div className="font-normal flex items-center gap-1">
                <Sun className="w-3 h-3 text-[#34d399]" /> Noon Surplus
              </div>
              <div className="text-[10px] text-[#34d399] font-mono font-light">980 W/m² · 32kW Load</div>
            </button>

            <button
              onClick={() => setScenario('evening')}
              className="px-2 py-1.5 rounded-lg bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 border border-amber-500/30 text-left transition-all"
            >
              <div className="font-normal flex items-center gap-1">
                <Factory className="w-3 h-3 text-amber-400" /> Evening EV Peak
              </div>
              <div className="text-[10px] text-amber-400/80 font-mono font-light">50 W/m² · 120kW Load</div>
            </button>

            <button
              onClick={() => setScenario('storm')}
              className="px-2 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 text-left transition-all"
            >
              <div className="font-normal flex items-center gap-1">
                <CloudRain className="w-3 h-3 text-rose-400" /> Severe Storm
              </div>
              <div className="text-[10px] text-rose-400/80 font-mono font-light">220 W/m² · 95kW Load</div>
            </button>

            <button
              onClick={() => setScenario('balanced')}
              className="px-2 py-1.5 rounded-lg bg-[#34d399]/15 hover:bg-[#34d399]/25 text-[#86efac] border border-[#34d399]/30 text-left transition-all"
            >
              <div className="font-normal flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#34d399]" /> Balanced Base
              </div>
              <div className="text-[10px] text-[#86efac] font-mono font-light">780 W/m² · 58kW Load</div>
            </button>
          </div>
        </div>

        {/* Live Interactive Sliders */}
        <div className="space-y-4">
          
          {/* Slider 1: Solar Irradiance */}
          <div className="bg-[#121510] border border-white/10 rounded-xl p-3">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-light text-[#f2f3ef] flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-[#34d399]" />
                <span>Solar Irradiance (G)</span>
              </label>
              <span className="font-mono text-xs font-normal text-[#86efac] px-2 py-0.5 rounded bg-[#161913] border border-[#34d399]/30">
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
              className="w-full h-1.5 bg-[#282e22] rounded-lg appearance-none cursor-pointer accent-[#34d399] focus:outline-none"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#7c8177] mt-1 font-light">
              <span>0 (Dark Night)</span>
              <span>500 (Moderate)</span>
              <span>1000 W/m² (Peak Noon)</span>
            </div>
          </div>

          {/* Slider 2: Facility & EV Surge Load */}
          <div className="bg-[#121510] border border-white/10 rounded-xl p-3">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-light text-[#f2f3ef] flex items-center gap-1.5">
                <Factory className="w-3.5 h-3.5 text-amber-400" />
                <span>Facility & EV Surge Load (P_L)</span>
              </label>
              <span className="font-mono text-xs font-normal text-amber-400 px-2 py-0.5 rounded bg-[#161913] border border-amber-500/30">
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
              className="w-full h-1.5 bg-[#282e22] rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#7c8177] mt-1 font-light">
              <span>20 kW (Off-Peak)</span>
              <span>85 kW (Standard Shift)</span>
              <span>150 kW (Heavy EV Surge)</span>
            </div>
          </div>

          {/* Slider 3: Minimum Protected SoC Constraint */}
          <div className="bg-[#121510] border border-white/10 rounded-xl p-3">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-light text-[#f2f3ef] flex items-center gap-1.5">
                <Battery className="w-3.5 h-3.5 text-[#34d399]" />
                <span>Battery Minimum SoC Constraint (SoC_min)</span>
              </label>
              <span className="font-mono text-xs font-normal text-[#86efac] px-2 py-0.5 rounded bg-[#161913] border border-[#34d399]/30">
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
              className="w-full h-1.5 bg-[#282e22] rounded-lg appearance-none cursor-pointer accent-[#34d399] focus:outline-none"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#7c8177] mt-1 font-light">
              <span>10% (High Stress)</span>
              <span>20% (Optimal +15% Life)</span>
              <span>30% (High Reserve)</span>
            </div>
          </div>

          {/* Weather Forecast Horizon 3-Way Selector */}
          <div className="bg-[#121510] border border-white/10 rounded-xl p-3">
            <label className="text-xs font-light text-[#f2f3ef] flex items-center gap-1.5 mb-2">
              <CloudSun className="w-3.5 h-3.5 text-[#86efac]" />
              <span>Weather Forecast Horizon</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onUpdateState({ weatherHorizon: 'clear' })}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-light transition-all ${
                  state.weatherHorizon === 'clear'
                    ? 'bg-[#10b981]/20 text-[#86efac] border border-[#34d399]/40 shadow-sm font-normal'
                    : 'bg-[#20241b] text-[#9da395] hover:text-[#f2f3ef] border border-white/10'
                }`}
              >
                <SunMedium className="w-3.5 h-3.5 text-[#34d399]" />
                <span>Clear Sky</span>
              </button>
              <button
                onClick={() => onUpdateState({ weatherHorizon: 'intermittent' })}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-light transition-all ${
                  state.weatherHorizon === 'intermittent'
                    ? 'bg-[#34d399]/20 text-[#86efac] border border-[#34d399]/40 shadow-sm font-normal'
                    : 'bg-[#20241b] text-[#9da395] hover:text-[#f2f3ef] border border-white/10'
                }`}
              >
                <CloudSun className="w-3.5 h-3.5 text-[#34d399]" />
                <span>Passing Cumulus</span>
              </button>
              <button
                onClick={() => onUpdateState({ weatherHorizon: 'storm' })}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-light transition-all ${
                  state.weatherHorizon === 'storm'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm font-normal'
                    : 'bg-[#20241b] text-[#9da395] hover:text-[#f2f3ef] border border-white/10'
                }`}
              >
                <CloudRain className="w-3.5 h-3.5 text-rose-400" />
                <span>Severe Storm</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-white/10 text-[11px] text-[#9da395] flex items-center justify-between font-light">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#34d399] animate-ping"></span>
          Live Closed-Loop Physics: <span className="font-mono text-[#86efac]">1.5s Cycle</span>
        </span>
        <span className="font-mono text-[#7c8177]">
          Δt = 90ms Edge Slew
        </span>
      </div>
    </div>
  );
};
