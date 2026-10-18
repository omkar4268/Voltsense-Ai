import React, { useState } from 'react';
import { ForecastPoint } from '../types';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Area, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  Cpu, 
  Eye, 
  Layers 
} from 'lucide-react';

interface ForecastChartModuleProps {
  forecast: ForecastPoint[];
  currentSimMinutes: number;
}

export const ForecastChartModule: React.FC<ForecastChartModuleProps> = ({
  forecast,
  currentSimMinutes,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'solar' | 'load' | 'soc'>('all');

  // Find current slot index (0 to 95)
  const currentSlotIndex = Math.min(95, Math.floor(currentSimMinutes / 15));
  const currentSlotTime = forecast[currentSlotIndex]?.timeStr || '12:00';

  return (
    <div className="glass-panel rounded-2xl p-4 xl:p-5 border border-slate-800 shadow-xl flex flex-col justify-between">
      
      {/* Module Header & Model Accuracy KPIs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-slate-100 flex items-center gap-2">
              24-Hour Predictive AI Forecast // 96 Epoch Intervals (15-Min)
            </h2>
            <p className="text-[11px] text-slate-400">
              Ensemble XGBoost + BiLSTM edge inference simulating 24h rolling horizon
            </p>
          </div>
        </div>

        {/* Model Accuracy KPI Badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">MAPE:</span>
            <span className="text-emerald-400 font-bold">3.12%</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            <span className="text-slate-400">RMSE:</span>
            <span className="text-cyan-400 font-bold">1.84 kW</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-slate-400">ONNX Quantized:</span>
            <span className="text-purple-300 font-bold">4.2 MB</span>
          </div>
        </div>
      </div>

      {/* Chart Filter & Cursor Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-mono text-slate-400">View Metric:</span>
          <div className="inline-flex p-0.5 bg-slate-950 rounded-lg border border-slate-800">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                filterMode === 'all'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Signals
            </button>
            <button
              onClick={() => setFilterMode('solar')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                filterMode === 'solar'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Solar Gen
            </button>
            <button
              onClick={() => setFilterMode('load')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                filterMode === 'load'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Facility Load
            </button>
            <button
              onClick={() => setFilterMode('soc')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                filterMode === 'soc'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Battery SoC
            </button>
          </div>
        </div>

        {/* Live Simulation Clock Tracker */}
        <div className="flex items-center gap-2 font-mono text-[11px] bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
          <span className="text-slate-400">Current Time Slot:</span>
          <span className="text-emerald-400 font-bold">{currentSlotTime} (Epoch #{currentSlotIndex + 1}/96)</span>
        </div>
      </div>

      {/* Main Multi-Axis Chart */}
      <div className="h-[260px] w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={forecast} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
            <XAxis 
              dataKey="timeStr" 
              stroke="#64748b" 
              fontSize={10} 
              tickLine={false} 
              interval={11} // Shows every 3 hours (12 intervals)
            />
            <YAxis 
              yAxisId="power"
              stroke="#64748b" 
              fontSize={10} 
              tickLine={false} 
              unit="kW"
              domain={[0, 160]}
            />
            <YAxis 
              yAxisId="soc" 
              orientation="right" 
              stroke="#06B6D4" 
              fontSize={10} 
              tickLine={false} 
              unit="%" 
              domain={[0, 100]}
            />

            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="p-3 bg-slate-950/95 border border-slate-800 rounded-xl shadow-2xl text-[11px] font-mono">
                      <div className="text-slate-400 font-bold border-b border-slate-800 pb-1 mb-1.5 flex justify-between">
                        <span>Horizon Time:</span>
                        <span className="text-white">{label}</span>
                      </div>
                      {payload.map((entry, idx) => (
                        <div key={idx} className="flex justify-between items-center gap-4 py-0.5">
                          <span className="flex items-center gap-1.5 text-slate-300">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                            {entry.name}:
                          </span>
                          <span className="font-bold" style={{ color: entry.color }}>
                            {entry.value} {entry.unit || ''}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* Solar Actual & Predicted */}
            {(filterMode === 'all' || filterMode === 'solar') && (
              <>
                <Area
                  yAxisId="power"
                  type="monotone"
                  dataKey="actualSolar"
                  name="Actual Solar"
                  stroke="#10B981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSolar)"
                  unit="kW"
                />
                <Line
                  yAxisId="power"
                  type="monotone"
                  dataKey="predictedSolar"
                  name="AI Predicted Solar"
                  stroke="#34D399"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  dot={false}
                  unit="kW"
                />
              </>
            )}

            {/* Load Actual & Predicted */}
            {(filterMode === 'all' || filterMode === 'load') && (
              <>
                <Area
                  yAxisId="power"
                  type="monotone"
                  dataKey="actualLoad"
                  name="Actual Load"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorLoad)"
                  unit="kW"
                />
                <Line
                  yAxisId="power"
                  type="monotone"
                  dataKey="predictedLoad"
                  name="AI Predicted Load"
                  stroke="#FBBF24"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  dot={false}
                  unit="kW"
                />
              </>
            )}

            {/* Battery SoC Curve */}
            {(filterMode === 'all' || filterMode === 'soc') && (
              <Line
                yAxisId="soc"
                type="monotone"
                dataKey="projectedSoc"
                name="Projected Battery SoC"
                stroke="#06B6D4"
                strokeWidth={2.5}
                dot={false}
                unit="%"
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Legend Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-emerald-400 rounded"></span>
            <span>Solar (kW)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-amber-400 rounded"></span>
            <span>Facility Load (kW)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-cyan-400 rounded"></span>
            <span>Projected SoC (%)</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <span className="w-3 h-0.5 border-t border-dashed border-slate-400"></span>
            <span>Dashed = AI Forecast</span>
          </div>
        </div>
        <span className="text-emerald-400 font-semibold">
          96 / 96 Quantized Intervals Synchronized
        </span>
      </div>

    </div>
  );
};
