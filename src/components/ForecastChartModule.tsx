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
  TrendingUp, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Sun,
  Flame,
  Droplets,
  RotateCw,
  Sparkles,
  BarChart2,
  Box as BoxIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuroraCurtain, PaletteName } from './ui/aurora-curtain';

interface ForecastChartModuleProps {
  forecast: ForecastPoint[];
  currentSimMinutes: number;
}

export const ForecastChartModule: React.FC<ForecastChartModuleProps> = ({
  forecast,
  currentSimMinutes,
}) => {
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');
  const [filterMode, setFilterMode] = useState<'all' | 'solar' | 'load' | 'soc'>('all');
  const [curtainPalette, setCurtainPalette] = useState<PaletteName>('aurora');
  const [autoRotateSpeed, setAutoRotateSpeed] = useState<number>(0.16);

  // Find current slot index (0 to 95)
  const currentSlotIndex = Math.min(95, Math.floor(currentSimMinutes / 15));
  const currentSlot = forecast[currentSlotIndex] || {
    timeStr: '12:00',
    actualSolar: 68.4,
    predictedSolar: 67.2,
    actualLoad: 58.2,
    predictedLoad: 59.1,
    projectedSoc: 68.4
  };

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xl flex flex-col justify-between">
      
      {/* Module Header & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-slate-100 flex items-center gap-2">
              Predictive Telemetry & Solar Flux Model
            </h2>
            <p className="text-[11px] text-slate-400">
              Ensemble XGBoost + BiLSTM edge inference simulating 24h rolling horizon
            </p>
          </div>
        </div>

        {/* View Mode Switcher (2D Multi-Horizon vs 3D Aurora Curtain) */}
        <div className="flex items-center gap-2">
          <div className="inline-flex p-1 bg-slate-950 rounded-xl border border-slate-800 relative">
            <button
              onClick={() => setViewMode('2d')}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 z-10 ${
                viewMode === '2d' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {viewMode === '2d' && (
                <motion.div
                  layoutId="activeChartTab"
                  className="absolute inset-0 bg-slate-800 rounded-lg -z-10 shadow-sm border border-slate-700"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>2D Forecast Curve</span>
            </button>

            <button
              onClick={() => setViewMode('3d')}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 z-10 ${
                viewMode === '3d' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {viewMode === '3d' && (
                <motion.div
                  layoutId="activeChartTab"
                  className="absolute inset-0 bg-slate-800 rounded-lg -z-10 shadow-sm border border-slate-700"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <BoxIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>3D Solar Flux Curtain</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Visualizer Body (Animated with Framer Motion) */}
      <AnimatePresence mode="wait">
        {viewMode === '2d' ? (
          <motion.div
            key="2d-chart"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="space-y-3"
          >
            {/* Filter Buttons & Slot Clock */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 text-xs">
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

              {/* Accuracy & Sync Badges */}
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span className="text-slate-400">MAPE:</span>
                  <span className="text-emerald-400 font-bold">3.12%</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                  <span className="text-slate-400">Epoch:</span>
                  <span className="text-cyan-400 font-bold">{currentSlot.timeStr} (#{currentSlotIndex + 1}/96)</span>
                </div>
              </div>
            </div>

            {/* 2D Multi-Axis Chart */}
            <div className="h-[280px] w-full pt-1">
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
                    interval={11}
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

            {/* 2D Legend */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
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
                96 Epochs Synchronized
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="3d-curtain"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            {/* 3D Telemetry Stats & Spectral Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-slate-800/60 text-xs">
              
              {/* Spectral Palette Switcher */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-mono text-slate-400">Spectrum:</span>
                <div className="inline-flex p-0.5 bg-slate-950 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setCurtainPalette('aurora')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 ${
                      curtainPalette === 'aurora'
                        ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Sun className="w-3 h-3 text-emerald-400" />
                    <span>Solar Radiance</span>
                  </button>

                  <button
                    onClick={() => setCurtainPalette('ember')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 ${
                      curtainPalette === 'ember'
                        ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Flame className="w-3 h-3 text-amber-400" />
                    <span>Infrared Surge</span>
                  </button>

                  <button
                    onClick={() => setCurtainPalette('ocean')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 ${
                      curtainPalette === 'ocean'
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Droplets className="w-3 h-3 text-cyan-400" />
                    <span>Atmosphere Influx</span>
                  </button>
                </div>
              </div>

              {/* Real-time Photon / Solar stats */}
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                  <span className="text-slate-400">Solar Power:</span>
                  <span className="text-emerald-400 font-bold">{currentSlot.actualSolar} kW</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                  <span className="text-slate-400">Cloud Extinction:</span>
                  <span className="text-cyan-400 font-bold">0.14 τ</span>
                </div>
                <button
                  onClick={() => setAutoRotateSpeed(speed => (speed > 0 ? 0 : 0.16))}
                  className={`px-2 py-1 rounded-lg border text-[11px] flex items-center gap-1 transition-all ${
                    autoRotateSpeed > 0
                      ? 'bg-slate-800 border-slate-700 text-slate-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                  title="Toggle 3D Orbit Auto-Rotation"
                >
                  <RotateCw className={`w-3 h-3 ${autoRotateSpeed > 0 ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                  <span>{autoRotateSpeed > 0 ? 'Orbiting' : 'Paused'}</span>
                </button>
              </div>

            </div>

            {/* Embedded Realistic 3D Aurora Curtain Component */}
            <div className="rounded-xl overflow-hidden border border-slate-800/80 bg-slate-950/60 shadow-inner">
              <AuroraCurtain
                columns={56}
                layers={3}
                palette={curtainPalette}
                title="3D Atmospheric Electromagnetic Solar Flux"
                subtitle="Rayleigh-Mie wave oscillation · 3-layer ionosphere & cloud scatter model"
                hint="Drag with mouse or touch to orbit 3D camera · Hover emitters to inspect intensity · Click swatches to filter"
                height={320}
                autoRotate={autoRotateSpeed}
                className="bg-transparent border-0"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
