import React from 'react';
import { 
  Zap, 
  Activity, 
  TrendingUp, 
  BatteryCharging, 
  Sliders, 
  Terminal, 
  BookOpen, 
  Cpu, 
  WifiOff, 
  Radio, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Flame,
  Layers
} from 'lucide-react';
import { MicrogridState } from '../types';

export type NavTab = 'overview' | 'forecast' | 'battery' | 'sandbox' | 'ledger' | 'pitch';

interface SidebarNavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  state: MicrogridState;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  activeTab,
  onTabChange,
  isCollapsed,
  onToggleCollapse,
  state,
  mobileOpen,
  onCloseMobile,
}) => {
  const navItems = [
    {
      id: 'overview' as NavTab,
      label: 'Microgrid Overview',
      subtitle: 'Digital Twin & Power Flow',
      icon: Layers,
      color: 'text-emerald-400',
      activeBg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
    },
    {
      id: 'forecast' as NavTab,
      label: '24-Hour AI Forecast',
      subtitle: '96 Epoch Horizon & MAPE',
      icon: TrendingUp,
      color: 'text-cyan-400',
      activeBg: 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300',
    },
    {
      id: 'battery' as NavTab,
      label: 'Battery & Degradation',
      subtitle: '+15.2% Life & Rainflow DoD',
      icon: BatteryCharging,
      color: 'text-purple-400',
      activeBg: 'bg-purple-500/15 border-purple-500/40 text-purple-300',
    },
    {
      id: 'sandbox' as NavTab,
      label: 'Judge Sandbox',
      subtitle: 'Live Sliders & Chaos Test',
      icon: Sliders,
      color: 'text-amber-400',
      activeBg: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
    },
    {
      id: 'ledger' as NavTab,
      label: 'ESG Carbon Ledger',
      subtitle: 'Verifiable Audit & CSV Export',
      icon: Terminal,
      color: 'text-emerald-400',
      activeBg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
    },
    {
      id: 'pitch' as NavTab,
      label: 'Pitch & Architecture',
      subtitle: 'Specs, Math & ROI Model',
      icon: BookOpen,
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

      {/* Main Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen bg-[#070A14] border-r border-slate-800/80 transition-all duration-300 flex flex-col justify-between select-none ${
          isCollapsed ? 'w-20' : 'w-72'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
              <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            {!isCollapsed && (
              <div className="leading-tight">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base tracking-tight text-white">
                    VoltSense <span className="text-emerald-400 font-mono">AI</span>
                  </span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold">
                    v2.4
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 block truncate font-medium">
                  Smart Microgrid Command
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle Button */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1.5 flex-1 overflow-y-auto">
          {!isCollapsed && (
            <div className="px-3 pt-2 pb-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
              Operations Center
            </div>
          )}

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
                className={`w-full flex items-center gap-3.5 p-3 rounded-xl transition-all border text-left group ${
                  isActive
                    ? `${item.activeBg} font-semibold shadow-md`
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
                title={item.label}
              >
                <div className={`p-2 rounded-lg ${isActive ? 'bg-slate-950/80 shadow-inner' : 'bg-slate-900/80'} ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                {!isCollapsed && (
                  <div className="flex-1 truncate">
                    <div className="text-xs font-bold tracking-tight text-slate-200">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-slate-500 group-hover:text-slate-400 truncate">
                      {item.subtitle}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Edge Hardware Status Widget at Bottom */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60">
          {!isCollapsed ? (
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-300 font-bold">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Edge Node
                </span>
                <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
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
                  <span>Cloud Dep:</span>
                  <span className="text-purple-300 font-bold">0% (Offline)</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center" title="Edge Node Online (11.4ms)">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
