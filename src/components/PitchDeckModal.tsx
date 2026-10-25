import React, { useState } from 'react';
import { 
  X, 
  Cpu, 
  Award, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Flame, 
  TrendingUp,
  FileCode2,
  Terminal,
  Server,
  BookOpen
} from 'lucide-react';

interface PitchDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PitchDeckModal: React.FC<PitchDeckModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'hardware' | 'math' | 'impact'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
      <div 
        className="glass-panel w-full max-w-4xl max-h-[90vh] rounded-[32px] border border-white/10 shadow-2xl flex flex-col overflow-hidden bg-[#161913]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 bg-[#20241b]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#10b981]/20 border border-[#34d399]/40 text-[#34d399]">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-light text-white tracking-tight">
                  VoltSense AI // Specs
                </h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#10b981]/15 text-[#86efac] border border-[#34d399]/30">
                  Full System Specification
                </span>
              </div>
              <p className="text-xs text-[#9da395] font-light">
                Edge-AI predictive power dispatch & battery optimization for sustainable microgrids
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#161913] text-[#9da395] hover:text-white hover:bg-[#282e22] transition-colors"
            title="Close Specs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-white/10 bg-[#121510] px-4 sm:px-6 gap-2 overflow-x-auto text-xs font-light">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#34d399] text-[#86efac] font-medium'
                : 'border-transparent text-[#9da395] hover:text-[#f2f3ef]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. System Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('hardware')}
            className={`py-3.5 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'hardware'
                ? 'border-[#34d399] text-[#86efac] font-medium'
                : 'border-transparent text-[#9da395] hover:text-[#f2f3ef]'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>2. Hardware & Architecture</span>
          </button>

          <button
            onClick={() => setActiveTab('math')}
            className={`py-3.5 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'math'
                ? 'border-[#34d399] text-[#86efac] font-medium'
                : 'border-transparent text-[#9da395] hover:text-[#f2f3ef]'
            }`}
          >
            <FileCode2 className="w-4 h-4" />
            <span>3. Math & Physics Model</span>
          </button>

          <button
            onClick={() => setActiveTab('impact')}
            className={`py-3.5 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'impact'
                ? 'border-[#34d399] text-[#86efac] font-medium'
                : 'border-transparent text-[#9da395] hover:text-[#f2f3ef]'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>4. Verified Impact & ESG</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-sm leading-relaxed text-[#cbd0c5]">
          
          {/* TAB 1: System Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#20241b] border border-white/10">
                <h3 className="text-base font-light text-[#34d399] mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  What is VoltSense AI?
                </h3>
                <p className="text-[#cbd0c5] text-sm font-light">
                  VoltSense AI is an autonomous, on-premise microgrid energy dispatch controller. 
                  It eliminates reliance on dirty backup diesel generators and prevents premature battery destruction caused by erratic solar weather and volatile EV fleet charging spikes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30">
                  <span className="font-medium text-rose-300 flex items-center gap-2 mb-2 text-sm">
                    <Flame className="w-4 h-4 text-rose-400" />
                    The Problem with Legacy Systems
                  </span>
                  <ul className="space-y-1.5 text-[#9da395] text-xs list-disc list-inside font-light">
                    <li>Reactive static thresholds trip diesel generators prematurely on brief load spikes.</li>
                    <li>Unregulated micro-cycling causes rapid lithium cathode lattice fractures.</li>
                    <li>Requires constant cloud connectivity, introducing downtime and cybersecurity vulnerabilities.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#10b981]/15 border border-[#34d399]/30">
                  <span className="font-medium text-[#86efac] flex items-center gap-2 mb-2 text-sm">
                    <Zap className="w-4 h-4 text-[#34d399]" />
                    The VoltSense AI Solution
                  </span>
                  <ul className="space-y-1.5 text-[#cbd0c5] text-xs list-disc list-inside font-light">
                    <li>Rolling 24-hour predictive lookahead via quantized Ensemble XGBoost + BiLSTM.</li>
                    <li>Sub-12ms local inference on Raspberry Pi 5 + ESP32 RTOS (0% cloud dependency).</li>
                    <li>Slew-rate controlled battery discharge extends BESS lifespan by +15.2%.</li>
                    <li>Suppresses diesel generator runtime by 28.4%, saving tons of CO₂.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Hardware Architecture */}
          {activeTab === 'hardware' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#20241b] border border-white/10">
                <h3 className="text-base font-light text-[#34d399] mb-2 flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  Edge Embedded Pipeline Specs
                </h3>
                <p className="text-[#cbd0c5] text-xs sm:text-sm font-light">
                  Operating with <strong>0% cloud dependency</strong>, VoltSense executes continuous rolling inferences locally at the substation or microgrid control room.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-[#20241b] border border-white/10">
                  <span className="font-mono text-[#86efac] font-medium block mb-1 text-xs">
                    Layer 1: ESP32 RTOS
                  </span>
                  <p className="text-xs text-[#9da395] font-light">
                    High-speed current, voltage, and inverter telemetry sampling at 100 Hz over Modbus RTU & CAN bus.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#20241b] border border-white/10">
                  <span className="font-mono text-[#34d399] font-medium block mb-1 text-xs">
                    Layer 2: Raspberry Pi 5
                  </span>
                  <p className="text-xs text-[#9da395] font-light">
                    Runs the ONNX Runtime (quantized INT8 ensemble). Solves rolling 96-interval horizon in 11.4 ms.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#20241b] border border-white/10">
                  <span className="font-mono text-[#a7f3d0] font-medium block mb-1 text-xs">
                    Layer 3: BESS Inverter
                  </span>
                  <p className="text-xs text-[#9da395] font-light">
                    Executes smooth PWM ramp vectors with hardware interlocks preventing overvoltage and thermal runaway.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#121510] font-mono text-xs border border-white/10 text-[#9da395] space-y-1">
                <div className="text-[#f2f3ef] font-medium mb-1">Hardware & Model Footprint:</div>
                <div>• Quantized Model: XGBoost (depth 6) + BiLSTM (32 units, INT8 quantization)</div>
                <div>• On-Disk Size: 4.2 MB total binary weight package</div>
                <div>• Local Latency: 11.4 ms ± 0.6 ms on ARM Cortex-A76 @ 2.4 GHz</div>
                <div>• Model Accuracy: 3.12% MAPE Solar | 1.84 kW RMSE Building Demand</div>
              </div>
            </div>
          )}

          {/* TAB 3: Mathematical Model */}
          {activeTab === 'math' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#20241b] border border-white/10">
                <h3 className="text-base font-light text-[#34d399] mb-2 flex items-center gap-2">
                  <FileCode2 className="w-5 h-5" />
                  Multi-Objective Optimization Formulation
                </h3>
                <p className="text-xs sm:text-sm text-[#cbd0c5] font-light">
                  The local agent optimizes a convex cost functional over rolling horizon T = 24 hours under physical conservation constraints:
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#121510] border border-white/10 font-mono text-xs text-[#86efac] overflow-x-auto space-y-2">
                <div className="text-[#7c8177]">// Objective Function:</div>
                <div className="text-[#34d399] font-medium">
                  min J = ∫ [ α·C_grid(t)·P_grid(t) + β·C_diesel·P_diesel(t) + γ·D_wear(P_bess, SoC) - δ·S_solar(t) ] dt
                </div>
                <div className="text-[#7c8177] pt-2">// Conservation Constraints:</div>
                <div>1. Power Balance: P_solar(t) + P_bess(t) + P_grid(t) + P_diesel(t) = P_load(t)</div>
                <div>2. Battery SoC Bound: 20% (SoC_min) ≤ SoC(t) ≤ 95% (SoC_max)</div>
                <div>3. Slew-Rate Limit: |dP_bess / dt| ≤ 12.5 kW/s (eliminates micro-cycling)</div>
                <div>4. Diesel Lockout: P_diesel(t) = 0 if SoC(t) &gt; SoC_min ∧ Grid_Available</div>
              </div>

              <p className="text-xs text-[#9da395] font-light">
                By penalizing directional reversals (γ · D_wear), VoltSense eliminates high-frequency micro-cycling, extending pack lifespan by 3.2 additional years.
              </p>
            </div>
          )}

          {/* TAB 4: Impact & ESG */}
          {activeTab === 'impact' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#20241b] border border-white/10">
                <h3 className="text-base font-light text-[#34d399] mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Verified Field Impact & ROI
                </h3>
                <p className="text-xs sm:text-sm text-[#cbd0c5] font-light">
                  Benchmarked against standard commercial PLC installations on a 200 kWh / 100 kW microgrid testbed:
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-4 rounded-2xl bg-[#10b981]/15 border border-[#34d399]/30">
                  <div className="text-3xl font-light font-mono text-[#34d399]">28.4%</div>
                  <div className="text-xs text-[#9da395] mt-1 font-light">Diesel Runtime Cut</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#10b981]/15 border border-[#34d399]/30">
                  <div className="text-3xl font-light font-mono text-[#86efac]">+15.2%</div>
                  <div className="text-xs text-[#9da395] mt-1 font-light">Battery Life Extension</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#10b981]/15 border border-[#34d399]/30">
                  <div className="text-3xl font-light font-mono text-[#a7f3d0]">1.8 Yrs</div>
                  <div className="text-xs text-[#9da395] mt-1 font-light">Capital Payback</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#10b981]/15 border border-[#34d399]/30">
                  <div className="text-3xl font-light font-mono text-[#fde047]">11.4 ms</div>
                  <div className="text-xs text-[#9da395] mt-1 font-light">Local Edge Latency</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#20241b] border border-white/10 text-xs text-[#cbd0c5] leading-relaxed font-light">
                <strong className="text-white block mb-1 font-normal">Verifiable ESG Carbon Accounting:</strong>
                All decisions are logged in an immutable audit ledger with millisecond timestamps and exported in standard RFC-4180 CSV and JSON formats for Scope 1 and Scope 2 compliance reporting.
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-white/10 bg-[#20241b] flex items-center justify-between text-xs font-mono">
          <span className="text-[#9da395]">
            VoltSense AI · <span className="text-[#34d399] font-medium">Specs v2.4</span>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#10b981] to-[#34d399] hover:opacity-90 text-[#121510] font-medium font-mono transition-all"
          >
            Close Specs
          </button>
        </div>

      </div>
    </div>
  );
};
