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
  Home,
  Radio,
  Activity,
  ShieldCheck
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
      label: 'Living Green Home',
      subtitle: 'Commercial Website',
      icon: Home,
      color: 'text-[#00F59B]',
      activeGlow: 'bg-gradient-to-r from-[#00F59B]/20 via-[#34D399]/15 to-transparent border-[#00F59B]/50 text-white shadow-[0_0_25px_rgba(0,245,155,0.25)]',
      iconBg: 'bg-[#00F59B]/20 text-[#00F59B] shadow-[0_0_12px_rgba(0,245,155,0.4)]',
    },
    {
      id: 'overview' as NavTab,
      label: 'Power Topology Twin',
      subtitle: 'Live SCADA Flow',
      icon: Layers,
      color: 'text-[#00F59B]',
      activeGlow: 'bg-gradient-to-r from-[#00F59B]/20 via-[#10B981]/15 to-transparent border-[#00F59B]/50 text-white shadow-[0_0_25px_rgba(0,245,155,0.25)]',
      iconBg: 'bg-[#00F59B]/20 text-[#00F59B] shadow-[0_0_12px_rgba(0,245,155,0.4)]',
    },
    {
      id: 'forecast' as NavTab,
      label: 'AI Forecast',
      subtitle: '24h Horizon & MAPE',
      icon: TrendingUp,
      color: 'text-[#22D3EE]',
      activeGlow: 'bg-gradient-to-r from-[#22D3EE]/20 via-[#06B6D4]/15 to-transparent border-[#22D3EE]/50 text-white shadow-[0_0_25px_rgba(34,211,238,0.25)]',
      iconBg: 'bg-[#22D3EE]/20 text-[#22D3EE] shadow-[0_0_12px_rgba(34,211,238,0.4)]',
    },
    {
      id: 'battery' as NavTab,
      label: 'Battery Life Engine',
      subtitle: '+15.2% Lifespan & Wear',
      icon: BatteryCharging,
      color: 'text-[#C084FC]',
      activeGlow: 'bg-gradient-to-r from-[#C084FC]/20 via-[#A855F7]/15 to-transparent border-[#C084FC]/50 text-white shadow-[0_0_25px_rgba(192,132,252,0.25)]',
      iconBg: 'bg-[#C084FC]/20 text-[#C084FC] shadow-[0_0_12px_rgba(192,132,252,0.4)]',
    },
    {
      id: 'sandbox' as NavTab,
      label: 'Live Sandbox & Chaos',
      subtitle: 'Sliders & Stress Tests',
      icon: Sliders,
      color: 'text-[#FBBF24]',
      activeGlow: 'bg-gradient-to-r from-[#FBBF24]/20 via-[#F59E0B]/15 to-transparent border-[#FBBF24]/50 text-white shadow-[0_0_25px_rgba(251,191,36,0.25)]',
      iconBg: 'bg-[#FBBF24]/20 text-[#FBBF24] shadow-[0_0_12px_rgba(251,191,36,0.4)]',
    },
    {
      id: 'ledger' as NavTab,
      label: 'ESG Audit Log',
      subtitle: 'CSV / JSON Cryptographic Log',
      icon: Terminal,
      color: 'text-[#34D399]',
      activeGlow: 'bg-gradient-to-r from-[#34D399]/20 via-[#10B981]/15 to-transparent border-[#34D399]/50 text-white shadow-[0_0_25px_rgba(52,211,153,0.25)]',
      iconBg: 'bg-[#34D399]/20 text-[#34D399] shadow-[0_0_12px_rgba(52,211,153,0.4)]',
    },
    {
      id: 'specs' as NavTab,
      label: 'Technical Specs',
      subtitle: 'Hardware, Math & Whitepaper',
      icon: FileText,
      color: 'text-[#38BDF8]',
      activeGlow: 'bg-gradient-to-r from-[#38BDF8]/20 via-[#0284C7]/15 to-transparent border-[#38BDF8]/50 text-white shadow-[0_0_25px_rgba(56,189,248,0.25)]',
      iconBg: 'bg-[#38BDF8]/20 text-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.4)]',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-md"
        />
      )}

      {/* Main Sidebar Container - $10k Frosted Obsidian Cockpit Navigation */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-[#0c120e]/85 backdrop-blur-2xl border-r border-white/10 specular-rim shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-transform duration-300 flex flex-col justify-between select-none ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header with Glowing Emblem */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-[#00F59B]/25 via-[#06B6D4]/20 to-[#34D399]/10 border border-[#00F59B]/50 shadow-[0_0_25px_rgba(0,245,155,0.4)] text-[#00F59B]">
              <Zap className="w-5 h-5 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#00F59B] animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-light text-base tracking-tight text-white">
                  VoltSense <span className="text-[#00F59B] font-semibold text-gradient-vibrant">AI</span>
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#18221a] border border-[#00F59B]/40 text-[#6EE7B7] font-semibold shadow-[0_0_10px_rgba(0,245,155,0.3)]">
                  v2.4 RTOS
                </span>
              </div>
              <span className="text-[11px] text-[#9da395] flex items-center gap-1 font-light">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B] animate-pulse" />
                Living SCADA Operations
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items with Jewel Tones */}
        <nav className="p-3.5 space-y-2 flex-1 overflow-y-auto">
          <div className="px-3 pt-2 pb-1 text-[10px] font-mono uppercase tracking-widest text-[#7c8177] flex items-center justify-between">
            <span>Cockpit Modules</span>
            <span className="text-[#00F59B] font-semibold">ONLINE</span>
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
                className={`w-full flex items-center gap-3 p-2.5 rounded-2xl transition-all duration-200 border text-left group relative overflow-hidden ${
                  isActive
                    ? `${item.activeGlow} font-medium`
                    : 'border-transparent text-[#9da395] hover:text-[#f2f3ef] hover:bg-white/[0.04] hover:border-white/5'
                }`}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#00F59B] shadow-[0_0_12px_rgba(0,245,155,0.8)]" />
                )}

                <div className={`p-2.5 rounded-xl transition-all ${isActive ? item.iconBg : 'bg-white/[0.04] text-[#9da395] group-hover:text-white group-hover:bg-white/[0.08]'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 truncate">
                  <div className={`text-xs font-light transition-colors ${isActive ? 'text-white font-medium' : 'text-[#d7dcd2] group-hover:text-white'}`}>
                    {item.label}
                  </div>
                  <div className="text-[10px] text-[#7c8177] group-hover:text-[#9da395] truncate font-light">
                    {item.subtitle}
                  </div>
                </div>

                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00F59B] animate-ping mr-1" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Edge Hardware Status Widget at Bottom (Luxury Telemetry Pod) */}
        <div className="p-4 border-t border-white/10 bg-[#080d09]/60">
          <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#121813]/90 to-[#0c120e]/90 border border-white/10 specular-rim text-xs font-mono space-y-2 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00F59B]/5 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-white font-medium">
                <Cpu className="w-3.5 h-3.5 text-[#00F59B]" /> 
                <span>Edge Dispatch Node</span>
              </span>
              <span className="text-[#00F59B] font-semibold flex items-center gap-1.5 text-[10px] px-2 py-0.5 rounded-full bg-[#00F59B]/15 border border-[#00F59B]/30 shadow-[0_0_10px_rgba(0,245,155,0.25)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B] animate-ping" />
                AUTONOMOUS
              </span>
            </div>

            <div className="text-[11px] text-[#9da395] space-y-1.5 font-light pt-1 border-t border-white/5">
              <div className="flex justify-between items-center">
                <span>Hardware:</span>
                <span className="text-white font-mono text-[10px]">RPi 5 + ESP32</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Inference Latency:</span>
                <span className="text-[#00F59B] font-mono font-medium">{state.inferenceLatencyMs} ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Cloud Dependence:</span>
                <span className="text-[#22D3EE] font-mono font-medium">0% (Pure Air-Gap)</span>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between text-[10px] text-[#6b7280]">
              <span className="flex items-center gap-1">
                <Radio className="w-3 h-3 text-[#34D399] animate-pulse" />
                Deterministic RTOS
              </span>
              <span className="text-[#34D399]">100% SOH</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
