import React, { useEffect } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Activity, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  TrendingUp, 
  BatteryCharging,
  Leaf
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SylvaHero } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";
import { MicrogridState } from '../types';

interface LandingPageProps {
  onLaunchConsole: (initialTab?: 'overview' | 'forecast' | 'battery' | 'sandbox' | 'ledger') => void;
  onOpenSpecs: () => void;
  state: MicrogridState;
  onApplyScenario: (sc: 'sunny' | 'cloud' | 'night' | 'islanded') => void;
}

/**
 * Living Green 3D Shader Scene from DesignCode ThreeUI
 * Customized for VoltSense AI with zero inner overflow
 */
export function Scene() {
  return (
    <div className="shader-frame w-full h-screen min-h-screen relative overflow-hidden bg-[#383b34]">
      <SylvaHero
        variant="living-green"
        headingFont="lexend"
        bodyFont="lexend"
        headingWeight="300"
        bodyWeight="300"
        primaryColor="#ffffff"
        headingSize={63}
        bodySize={16.5}
        headingLetterSpacing={-0.006}
      />
    </div>
  );
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchConsole,
  onOpenSpecs,
  state,
}) => {
  // Listen for navigation messages dispatched from inside the 3D scene iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'VOLTSENSE_NAV') {
        const tab = event.data.tab;
        if (tab === 'specs') {
          onOpenSpecs();
        } else if (tab === 'landing') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          onLaunchConsole(tab || 'overview');
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onLaunchConsole, onOpenSpecs]);

  return (
    <div className="min-h-screen bg-[#161913] text-[#F2F3EF] selection:bg-[#34d399]/30 selection:text-white font-sans overflow-x-hidden">
      
      {/* ── IMMERSIVE 3D LIVING GREEN HERO (SYLVA LIVING WORLD) ── */}
      <section className="relative w-full h-screen overflow-hidden">
        <Scene />
      </section>

      {/* ── SECTION 2: CLEAN 3-PILLAR ARCHITECTURAL SYSTEM ── */}
      <section id="pillars" className="relative py-24 px-6 sm:px-12 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#20241b] border border-[#34d399]/30 text-xs font-mono text-[#86efac]">
            <Leaf className="w-3.5 h-3.5 text-[#34d399]" />
            <span>VoltSense AI Living Green Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Built for Autonomy & Longevity
          </h2>
          <p className="text-[#9da395] text-sm sm:text-base font-light leading-relaxed">
            A high-efficiency microgrid operating system that pairs sub-second edge neural inference with electrochemical battery preservation.
          </p>
        </div>

        {/* 3 Minimalist Luxury Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1 */}
          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            onClick={() => onLaunchConsole('forecast')}
            className="p-8 rounded-[32px] bg-[#20241b]/90 border border-white/10 hover:border-[#34d399]/40 transition-all cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#10b981]/15 border border-[#34d399]/30 flex items-center justify-center text-[#34d399] group-hover:scale-105 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-light text-white group-hover:text-[#86efac] transition-colors">
                Sub-Second Dispatch
              </h3>
              <p className="text-sm text-[#9da395] font-light leading-relaxed">
                96-interval BiLSTM ensemble forecasting with rolling horizons. Executes in 11.4ms to eliminate solar fluctuation and prevent voltage sags.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-[#34d399] font-medium">
              <span>View Forecasting Twin</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            onClick={() => onLaunchConsole('battery')}
            className="p-8 rounded-[32px] bg-[#20241b]/90 border border-white/10 hover:border-[#34d399]/40 transition-all cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#34d399]/15 border border-[#34d399]/30 flex items-center justify-center text-[#86efac] group-hover:scale-105 transition-transform">
                <BatteryCharging className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-light text-white group-hover:text-[#86efac] transition-colors">
                Battery Life Guardian
              </h3>
              <p className="text-sm text-[#9da395] font-light leading-relaxed">
                Electrochemical stress dampening and Rainflow cycle counting. Slew-rate limiting protects battery warranty and extends cell life by +15.2%.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-[#34d399] font-medium">
              <span>Inspect Degradation Model</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            onClick={onOpenSpecs}
            className="p-8 rounded-[32px] bg-[#20241b]/90 border border-white/10 hover:border-[#34d399]/40 transition-all cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#86efac]/15 border border-[#34d399]/30 flex items-center justify-center text-[#34d399] group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-light text-white group-hover:text-[#86efac] transition-colors">
                Air-Gapped Hardware
              </h3>
              <p className="text-sm text-[#9da395] font-light leading-relaxed">
                100% cloud-independent local RTOS execution on Raspberry Pi 5 + dual ESP32 nodes with Modbus RTU/TCP and IEC 61850 compliance.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-[#34d399] font-medium">
              <span>Read System Specs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

        </div>

        {/* Clean Launch Action Strip */}
        <div className="mt-16 p-8 rounded-[36px] bg-gradient-to-r from-[#20241b] via-[#282e22] to-[#20241b] border border-[#34d399]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_20px_60px_rgba(16,185,129,0.1)]">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-light text-white">Ready to operate the microgrid?</h4>
            <p className="text-xs text-[#9da395] font-light">
              Access the live digital twin, interactive sandbox, and telemetry ledger in the SCADA Console.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSpecs}
              className="px-5 py-3 rounded-2xl text-xs font-light bg-[#161913] hover:bg-[#20241b] border border-white/10 text-white transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#34d399]" />
              <span>Specs</span>
            </button>
            <button
              onClick={() => onLaunchConsole('overview')}
              className="px-6 py-3 rounded-2xl text-xs font-medium bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#86efac] text-[#121510] hover:opacity-95 transition-all shadow-[0_0_25px_rgba(52,211,153,0.3)] flex items-center gap-2"
            >
              <span>Enter SCADA Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </section>

      {/* ── CLEAN MINIMALIST FOOTER ── */}
      <footer className="py-12 px-6 border-t border-white/10 text-center text-xs text-[#7c8177] font-light">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-[#34d399]" />
            <span className="text-white font-normal">VoltSense AI</span>
            <span className="text-[#9da395]">· Living Green Microgrid OS</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onLaunchConsole('overview')} className="hover:text-[#34d399] transition-colors">Topology</button>
            <button onClick={() => onLaunchConsole('forecast')} className="hover:text-[#34d399] transition-colors">Forecast</button>
            <button onClick={() => onLaunchConsole('battery')} className="hover:text-[#34d399] transition-colors">Battery</button>
            <button onClick={onOpenSpecs} className="hover:text-[#34d399] transition-colors">Specs</button>
          </div>
          <p>© 2026 VoltSense AI. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};
