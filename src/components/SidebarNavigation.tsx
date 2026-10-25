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
      label: 'Homepage & 3D Scene',
      subtitle: 'Sylva Living Green',
      icon: Sparkles,
      color: 'text-[#86efac]',
      activeBg: 'bg-[#10b981]/15 border-[#34d399]/40 text-[#86efac]',
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
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-[#161913] border-r border-white/10 transition-transform duration-300 flex flex-col justify-between select-none ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-white/10 flex items-center gap-3">
          <div className="relative flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-[#10b981]/25 to-[#34d399]/20 border border-[#34d399]/40 shadow-[0_0_15px_rgba(52,211,153,0.25)] text-[#34d399]">
            <Zap className="w-5 h-5 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#34d399] animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-light text-base tracking-tight text-white">
                VoltSense <span className="text-[#34d399] font-normal">AI</span>
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-[#10b981]/15 border border-[#34d399]/30 text-[#86efac] font-medium">
                v2.4
              </span>
            </div>
            <span className="text-[11px] text-[#9da395] font-light">
              Living Green SCADA
            </span>
          </div>
        </div>

        {/* Navigation Items with Clear Labels */}
        <nav className="p-3.5 space-y-1.5 flex-1 overflow-y-auto">
          <div className="px-3 pt-2 pb-1 text-[10px] font-mono uppercase tracking-wider text-[#7c8177]">
            System Modules
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
                    ? `${item.activeBg} font-medium shadow-sm`
                    : 'border-transparent text-[#9da395] hover:text-[#f2f3ef] hover:bg-[#20241b]'
                }`}
              >
                <div className={`p-2 rounded-lg ${isActive ? 'bg-[#121510]' : 'bg-[#20241b]'} ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 truncate">
                  <div className="text-xs font-light text-[#f2f3ef]">
                    {item.label}
                  </div>
                  <div className="text-[10px] text-[#7c8177] group-hover:text-[#9da395] truncate font-light">
                    {item.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Edge Hardware Status Widget at Bottom */}
        <div className="p-4 border-t border-white/10 bg-[#121510]">
          <div className="p-3 rounded-xl bg-[#161913] border border-white/10 text-xs font-mono space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[#cbd0c5] font-normal">
                <Cpu className="w-3.5 h-3.5 text-[#34d399]" /> Edge Node
              </span>
              <span className="text-[#86efac] font-medium flex items-center gap-1 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-ping" />
                ONLINE
              </span>
            </div>
            <div className="text-[11px] text-[#9da395] space-y-0.5 font-light">
              <div>RPi 5 + ESP32 RTOS</div>
              <div className="flex justify-between">
                <span>Latency:</span>
                <span className="text-[#34d399] font-normal">{state.inferenceLatencyMs} ms</span>
              </div>
              <div className="flex justify-between">
                <span>Cloud:</span>
                <span className="text-[#a7f3d0] font-normal">0% (Offline)</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
