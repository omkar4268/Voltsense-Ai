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
    <div className="glass-vibrant-card specular-rim rounded-3xl p-5 sm:p-7 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)] relative overflow-hidden font-sans">
      
      {/* Ambient background glow inside the card */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#22D3EE]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#00F59B]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Module Header & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-[#22D3EE]/25 to-[#00F59B]/20 border border-[#22D3EE]/50 text-[#22D3EE] shadow-[0_0_20px_rgba(34,211,238,0.35)]">
            <TrendingUp className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-light tracking-tight text-white flex items-center gap-2">
                Predictive Telemetry & Solar Flux Model
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#22D3EE]/15 border border-[#22D3EE]/40 text-[10px] font-mono text-[#22D3EE] font-semibold">
                3.12% MAPE
              </span>
            </div>
            <p className="text-xs text-[#9da395] font-light">
              Ensemble XGBoost + BiLSTM edge inference simulating 24h rolling horizon (96 intervals)
            </p>
          </div>
        </div>

        {/* View Mode Switcher (2D Multi-Horizon vs 3D Aurora Curtain) */}
        <div className="flex items-center gap-2">
          <div className="inline-flex p-1 bg-[#080d09]/90 rounded-2xl border border-white/10 relative shadow-inner">
            <button
              onClick={() => setViewMode('2d')}
              className={`relative px-3.5 py-1.5 rounded-xl text-xs font-light transition-all flex items-center gap-1.5 z-10 ${
                viewMode === '2d' ? 'text-white font-medium' : 'text-[#9da395] hover:text-[#f2f3ef]'
              }`}
            >
              {viewMode === '2d' && (
                <motion.div
                  layoutId="activeChartTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#22D3EE]/25 to-[#00F59B]/20 border border-[#22D3EE]/50 rounded-xl -z-10 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <BarChart2 className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>2D Forecast Curve</span>
            </button>

            <button
              onClick={() => setViewMode('3d')}
              className={`relative px-3.5 py-1.5 rounded-xl text-xs font-light transition-all flex items-center gap-1.5 z-10 ${
                viewMode === '3d' ? 'text-white font-medium' : 'text-[#9da395] hover:text-[#f2f3ef]'
              }`}
            >
              {viewMode === '3d' && (
                <motion.div
                  layoutId="activeChartTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#00F59B]/25 to-[#34D399]/20 border border-[#00F59B]/50 rounded-xl -z-10 shadow-[0_0_15px_rgba(0,245,155,0.3)]"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <BoxIcon className="w-3.5 h-3.5 text-[#00F59B]" />
              <span>3D Solar Flux Curtain</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B] animate-ping" />
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
            className="space-y-4 relative z-10"
          >
            {/* Filter Buttons & Slot Clock */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-mono text-[#9da395]">Filter Signal:</span>
                <div className="inline-flex p-1 bg-[#080d09]/90 rounded-xl border border-white/10 shadow-inner">
                  <button
                    onClick={() => setFilterMode('all')}
                    className={`px-3 py-1 rounded-lg text-[11px] font-light transition-all ${
                      filterMode === 'all'
                        ? 'bg-white/10 text-white font-medium border border-white/10'
                        : 'text-[#9da395] hover:text-[#f2f3ef]'
                    }`}
                  >
                    All Signals
                  </button>
                  <button
                    onClick={() => setFilterMode('solar')}
                    className={`px-3 py-1 rounded-lg text-[11px] font-light transition-all ${
                      filterMode === 'solar'
                        ? 'bg-[#00F59B]/20 text-[#00F59B] font-medium border border-[#00F59B]/40'
                        : 'text-[#9da395] hover:text-[#f2f3ef]'
                    }`}
                  >
                    Solar PV
                  </button>
                  <button
                    onClick={() => setFilterMode('load')}
                    className={`px-3 py-1 rounded-lg text-[11px] font-light transition-all ${
                      filterMode === 'load'
                        ? 'bg-[#FBBF24]/20 text-[#FBBF24] font-medium border border-[#FBBF24]/40'
                        : 'text-[#9da395] hover:text-[#f2f3ef]'
                    }`}
                  >
                    Facility Demand
                  </button>
                  <button
                    onClick={() => setFilterMode('soc')}
                    className={`px-3 py-1 rounded-lg text-[11px] font-light transition-all ${
                      filterMode === 'soc'
                        ? 'bg-[#22D3EE]/20 text-[#22D3EE] font-medium border border-[#22D3EE]/40'
                        : 'text-[#9da395] hover:text-[#f2f3ef]'
                    }`}
                  >
                    BESS SoC
                  </button>
                </div>
              </div>

              {/* Slot Clock & Accuracy telemetry */}
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <div className="px-3 py-1 rounded-xl bg-[#080d09]/90 border border-white/10 text-[#cbd0c5] shadow-inner">
                  <span className="text-[#9da395] mr-1.5">Horizon Slot:</span>
                  <span className="text-white font-semibold">{currentSlot.timeStr}</span>
                </div>
                <div className="px-3 py-1 rounded-xl bg-[#00F59B]/10 border border-[#00F59B]/30 text-[#00F59B]">
                  <span>MAE: 1.48 kW</span>
                </div>
              </div>
            </div>

            {/* Recharts Container */}
            <div className="h-80 sm:h-96 w-full bg-[#080d09]/90 rounded-2xl p-4 border border-white/10 shadow-inner">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={forecast} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="solar-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00F59B" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#00F59B" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="load-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#FBBF24" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  
                  <XAxis 
                    dataKey="timeStr" 
                    stroke="#9da395" 
                    fontSize={11}
                    tickLine={false}
                    interval={11}
                  />
                  <YAxis 
                    stroke="#9da395" 
                    fontSize={11}
                    tickLine={false}
                    domain={[0, 'auto']}
                  />

                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(12, 18, 14, 0.95)', 
                      borderColor: 'rgba(0, 245, 155, 0.4)',
                      borderRadius: '16px',
                      color: '#fff',
                      fontSize: '12px',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.8)'
                    }} 
                  />

                  {(filterMode === 'all' || filterMode === 'solar') && (
                    <Area
                      type="monotone"
                      dataKey="actualSolar"
                      name="Solar Actual (kW)"
                      stroke="#00F59B"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#solar-gradient)"
                      unit=" kW"
                    />
                  )}

                  {(filterMode === 'all' || filterMode === 'solar') && (
                    <Line
                      type="monotone"
                      dataKey="predictedSolar"
                      name="Solar AI Predicted (kW)"
                      stroke="#6EE7B7"
                      strokeWidth={1.8}
                      strokeDasharray="4 4"
                      dot={false}
                      unit=" kW"
                    />
                  )}

                  {(filterMode === 'all' || filterMode === 'load') && (
                    <Area
                      type="monotone"
                      dataKey="actualLoad"
                      name="Facility Actual (kW)"
                      stroke="#FBBF24"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#load-gradient)"
                      unit=" kW"
                    />
                  )}

                  {(filterMode === 'all' || filterMode === 'load') && (
                    <Line
                      type="monotone"
                      dataKey="predictedLoad"
                      name="Facility AI Predicted (kW)"
                      stroke="#FDE047"
                      strokeWidth={1.8}
                      strokeDasharray="4 4"
                      dot={false}
                      unit=" kW"
                    />
                  )}

                  {(filterMode === 'all' || filterMode === 'soc') && (
                    <Line
                      type="monotone"
                      dataKey="projectedSoc"
                      name="Projected BESS SoC (%)"
                      stroke="#22D3EE"
                      strokeWidth={2.5}
                      dot={false}
                      unit="%"
                    />
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* 2D Legend */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10 text-[11px] font-mono text-[#9da395]">
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-[#00F59B] rounded-full shadow-[0_0_8px_rgba(0,245,155,0.8)]"></span>
                  <span className="text-white">Solar Generation (kW)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-[#FBBF24] rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>
                  <span className="text-white">Facility Demand (kW)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-[#22D3EE] rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                  <span className="text-white">Projected BESS SoC (%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#7c8177]">
                  <span className="w-3 h-0.5 border-t-2 border-dashed border-[#9da395]"></span>
                  <span>Dashed = AI Inference</span>
                </div>
              </div>
              <span className="text-[#00F59B] font-semibold">
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
            className="space-y-4 relative z-10"
          >
            {/* 3D Telemetry Stats & Spectral Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-white/10 text-xs">
              
              {/* Spectral Palette Switcher */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-mono text-[#9da395]">Spectrum:</span>
                <div className="inline-flex p-1 bg-[#080d09]/90 rounded-xl border border-white/10 shadow-inner">
                  <button
                    onClick={() => setCurtainPalette('aurora')}
                    className={`px-3 py-1 rounded-lg text-[11px] font-light transition-all flex items-center gap-1.5 ${
                      curtainPalette === 'aurora'
                        ? 'bg-[#00F59B]/25 text-[#00F59B] font-medium border border-[#00F59B]/40 shadow-[0_0_12px_rgba(0,245,155,0.25)]'
                        : 'text-[#9da395] hover:text-[#f2f3ef]'
                    }`}
                  >
                    <Sun className="w-3 h-3 text-[#00F59B]" />
                    <span>Solar Radiance</span>
                  </button>

                  <button
                    onClick={() => setCurtainPalette('ember')}
                    className={`px-3 py-1 rounded-lg text-[11px] font-light transition-all flex items-center gap-1.5 ${
                      curtainPalette === 'ember'
                        ? 'bg-amber-500/25 text-amber-300 font-medium border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                        : 'text-[#9da395] hover:text-[#f2f3ef]'
                    }`}
                  >
                    <Flame className="w-3 h-3 text-amber-400" />
                    <span>Infrared Surge</span>
                  </button>

                  <button
                    onClick={() => setCurtainPalette('ocean')}
                    className={`px-3 py-1 rounded-lg text-[11px] font-light transition-all flex items-center gap-1.5 ${
                      curtainPalette === 'ocean'
                        ? 'bg-[#22D3EE]/25 text-cyan-200 font-medium border border-[#22D3EE]/40 shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                        : 'text-[#9da395] hover:text-[#f2f3ef]'
                    }`}
                  >
                    <Droplets className="w-3 h-3 text-[#22D3EE]" />
                    <span>Atmosphere Influx</span>
                  </button>
                </div>
              </div>

              {/* Real-time Photon / Solar stats */}
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#080d09]/90 border border-white/10 text-[#cbd0c5] shadow-inner">
                  <span className="text-[#9da395]">Solar Power:</span>
                  <span className="text-[#00F59B] font-semibold">{currentSlot.actualSolar} kW</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#080d09]/90 border border-white/10 text-[#cbd0c5] shadow-inner">
                  <span className="text-[#9da395]">Cloud Extinction:</span>
                  <span className="text-[#22D3EE] font-semibold">0.14 τ</span>
                </div>
                <button
                  onClick={() => setAutoRotateSpeed(speed => (speed > 0 ? 0 : 0.16))}
                  className={`px-3 py-1 rounded-xl border text-[11px] flex items-center gap-1.5 transition-all shadow-sm ${
                    autoRotateSpeed > 0
                      ? 'bg-white/10 border-white/20 text-white font-medium'
                      : 'bg-[#080d09]/90 border-white/10 text-[#9da395]'
                  }`}
                  title="Toggle 3D Orbit Auto-Rotation"
                >
                  <RotateCw className={`w-3 h-3 ${autoRotateSpeed > 0 ? 'animate-spin text-[#00F59B]' : ''}`} style={{ animationDuration: '6s' }} />
                  <span>{autoRotateSpeed > 0 ? 'Orbiting' : 'Paused'}</span>
                </button>
              </div>

            </div>

            {/* Embedded Realistic 3D Aurora Curtain Component */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#080d09]/90 shadow-inner">
              <AuroraCurtain
                columns={56}
                layers={3}
                palette={curtainPalette}
                title="3D Atmospheric Electromagnetic Solar Flux"
                subtitle="Rayleigh-Mie wave oscillation · 3-layer ionosphere & cloud scatter model"
                hint="Drag with mouse or touch to orbit 3D camera · Hover emitters to inspect intensity · Click swatches to filter"
                height={340}
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
