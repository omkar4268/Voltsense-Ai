import React from 'react';
import { 
  Zap, 
  TrendingUp, 
  BatteryCharging, 
  Sliders, 
  Terminal, 
  FileText, 
  Cpu, 
  Layers,
  Sparkles,
  Home
} from 'lucide-react';
import { MicrogridState } from '../types';

export type NavTab = 'landing' | 'overview' | 'forecast' | 'battery' | 'sandbox' | 'ledger' | 'specs';

interface SidebarNavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  state: MicrogridState;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  activeTab,
  onTabChange,
  state,
  mobileOpen,
  onCloseMobile,
}) => {
  const navItems = [
    {
      id: 'landing' as NavTab,
      label: 'Commercial Home',
      subtitle: 'Product Showcase & ROI',
      icon: Sparkles,
      color: 'text-amber-400',
      activeBg: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
    },
    {
      id: 'overview' as NavTab,
      label: 'Overview',
      subtitle: 'Live Power Topology',
      icon: Layers,
      color: 'text-emerald-400',
      activeBg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
    },
    {
      id: 'forecast' as NavTab,
      label: 'AI Forecast',
      subtitle: '24h Horizon & MAPE',
      icon: TrendingUp,
      color: 'text-cyan-400',
      activeBg: 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300',
    },
    {
      id: 'battery' as NavTab,
      label: 'Battery Life',
      subtitle: '+15.2% Lifespan & Wear',
      icon: BatteryCharging,
      color: 'text-purple-400',
      activeBg: 'bg-purple-500/15 border-purple-500/40 text-purple-300',
    },
    {
      id: 'sandbox' as NavTab,
      label: 'Live Sandbox',
      subtitle: 'Sliders & Chaos Test',
      icon: Sliders,
      color: 'text-amber-400',
      activeBg: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
    },
    {
      id: 'ledger' as NavTab,
      label: 'Audit Log',
      subtitle: 'ESG CSV / JSON Export',
      icon: Terminal,
      color: 'text-emerald-400',
      activeBg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
    },
    {
      id: 'specs' as NavTab,
      label: 'Specs',
      subtitle: 'Full System Specs & Math',
      icon: FileText,
      color: 'text-blue-400',
      activeBg: 'bg-blue-500/15 border-blue-500/40 text-blue-300',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Main Sidebar Container - Clean, Readable, and Expanded by Default */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-[#080D1A] border-r border-slate-800/80 transition-transform duration-300 flex flex-col justify-between select-none ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center gap-3">
          <div className="relative flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)] text-emerald-400">
            <Zap className="w-5 h-5 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-white">
                VoltSense <span className="text-emerald-400 font-mono">AI</span>
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold">
                v2.4
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              Edge Microgrid SCADA
            </span>
          </div>
        </div>

        {/* Navigation Items with Clear Labels */}
        <nav className="p-3.5 space-y-1.5 flex-1 overflow-y-auto">
          <div className="px-3 pt-2 pb-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
            Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all border text-left group ${
                  isActive
                    ? `${item.activeBg} font-semibold shadow-sm`
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className={`p-2 rounded-lg ${isActive ? 'bg-slate-950/80' : 'bg-slate-900/80'} ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 truncate">
                  <div className="text-xs font-bold text-slate-200">
                    {item.label}
                  </div>
                  <div className="text-[10px] text-slate-500 group-hover:text-slate-400 truncate">
                    {item.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Edge Hardware Status Widget at Bottom */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/70">
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-300 font-bold">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Edge Node
              </span>
              <span className="text-emerald-400 font-bold flex items-center gap-1 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                ONLINE
              </span>
            </div>
            <div className="text-[11px] text-slate-400 space-y-0.5">
              <div>RPi 5 + ESP32 RTOS</div>
              <div className="flex justify-between">
                <span>Latency:</span>
                <span className="text-cyan-300 font-bold">{state.inferenceLatencyMs} ms</span>
              </div>
              <div className="flex justify-between">
                <span>Cloud:</span>
                <span className="text-purple-300 font-bold">0% (Offline)</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
