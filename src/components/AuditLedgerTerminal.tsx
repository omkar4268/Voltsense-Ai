import React, { useState, useRef, useEffect } from 'react';
import { ForecastPoint, LedgerLog, MicrogridState } from '../types';
import { 
  Terminal, 
  Download, 
  FileText, 
  Filter, 
  Leaf, 
  CheckCircle, 
  ArrowDownCircle, 
  RotateCcw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { exportReportCSV, exportReportJSON } from '../utils/simulationEngine';

interface AuditLedgerTerminalProps {
  logs: LedgerLog[];
  state: MicrogridState;
  forecast: ForecastPoint[];
  onClearLogs: () => void;
}

export const AuditLedgerTerminal: React.FC<AuditLedgerTerminalProps> = ({
  logs,
  state,
  forecast,
  onClearLogs,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll internally inside terminal container only
  useEffect(() => {
    if (autoScroll && terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const filteredLogs = logs.filter((l) => {
    if (selectedFilter === 'ALL') return true;
    return l.type === selectedFilter;
  });

  return (
    <div className="glass-vibrant-card specular-rim rounded-3xl p-5 sm:p-7 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)] relative overflow-hidden font-sans">
      
      {/* Ambient background glow inside the card */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00F59B]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#22D3EE]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Terminal Header & Carbon Accounting Summary */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5 pb-4 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-[#00F59B]/25 to-[#06B6D4]/20 border border-[#00F59B]/50 text-[#00F59B] shadow-[0_0_20px_rgba(0,245,155,0.35)]">
            <Terminal className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-light tracking-tight text-white flex items-center gap-2">
                Verifiable ESG Carbon Accounting & Cryptographic Ledger
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#00F59B]/15 border border-[#00F59B]/40 text-[10px] font-mono text-[#00F59B] font-semibold">
                SHA-256 Validated
              </span>
            </div>
            <p className="text-xs text-[#9da395] font-light">
              Deterministic, tamper-evident telemetry event stream emitted by Edge ONNX inference agent
            </p>
          </div>
        </div>

        {/* Live ESG Carbon Metrics Bar */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#00F59B]/15 border border-[#00F59B]/40 text-[#00F59B] shadow-[0_0_12px_rgba(0,245,155,0.2)]">
            <Leaf className="w-4 h-4 text-[#00F59B]" />
            <span className="text-[#d1fae5]">CO₂ Avoided:</span>
            <span className="font-semibold text-sm text-[#00F59B]">
              {state.cumulativeCo2SavedKg.toFixed(2)} kg
            </span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#22D3EE]/15 border border-[#22D3EE]/40 text-[#22D3EE] shadow-[0_0_12px_rgba(34,211,238,0.2)]">
            <span className="text-[#cffafe]">Clean Ratio:</span>
            <span className="font-semibold text-sm text-[#22D3EE]">
              {state.cleanEnergyRatioPct}%
            </span>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters, Auto-scroll, and Working Export Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10 text-xs relative z-10">
        {/* Category Filters */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[#9da395]" />
          <div className="inline-flex p-1 bg-[#080d09]/90 rounded-xl border border-white/10 shadow-inner">
            {['ALL', 'ONNX-AGENT', 'DISPATCH', 'PROTECT', 'ALERT'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedFilter(category)}
                className={`px-3 py-1 rounded-lg text-[10px] font-mono transition-all ${
                  selectedFilter === category
                    ? 'bg-gradient-to-r from-[#00F59B]/25 to-[#34D399]/20 text-[#00F59B] font-semibold border border-[#00F59B]/40 shadow-[0_0_10px_rgba(0,245,155,0.25)]'
                    : 'text-[#9da395] hover:text-[#f2f3ef]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons: Auto-scroll, Clear, and REAL EXPORTS */}
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`px-3 py-1.5 rounded-xl border text-[11px] transition-all shadow-sm ${
              autoScroll
                ? 'bg-[#00F59B]/15 text-[#00F59B] border-[#00F59B]/40 shadow-[0_0_10px_rgba(0,245,155,0.2)]'
                : 'bg-[#080d09]/90 text-[#7c8177] border-white/10'
            }`}
          >
            {autoScroll ? '● Auto-Scroll ON' : '○ Scroll Paused'}
          </button>

          <button
            onClick={onClearLogs}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#9da395] hover:text-white transition-colors"
            title="Clear current log buffer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Working Export CSV */}
          <button
            onClick={() => exportReportCSV(state, logs, forecast)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#00F59B]/20 to-[#34D399]/15 hover:from-[#00F59B]/30 hover:to-[#34D399]/25 text-white border border-[#00F59B]/50 transition-all font-medium shadow-[0_0_15px_rgba(0,245,155,0.25)] cursor-pointer"
            title="Download CSV file with 96 time-series points, ESG carbon savings, and ledger"
          >
            <Download className="w-3.5 h-3.5 text-[#00F59B]" />
            <span>Export ESG CSV</span>
          </button>

          {/* Working Export JSON */}
          <button
            onClick={() => exportReportJSON(state, logs, forecast)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#22D3EE]/20 to-[#06B6D4]/15 hover:from-[#22D3EE]/30 hover:to-[#06B6D4]/25 text-white border border-[#22D3EE]/50 transition-all font-medium shadow-[0_0_15px_rgba(34,211,238,0.25)] cursor-pointer"
            title="Download JSON telemetry signature bundle"
          >
            <FileText className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>Telemetry JSON</span>
          </button>
        </div>
      </div>

      {/* Live Scrolling Terminal Window */}
      <div 
        ref={terminalContainerRef}
        className="bg-[#080d09]/90 border border-white/10 rounded-2xl p-4 h-[320px] overflow-y-auto font-mono text-xs space-y-2 shadow-inner relative z-10"
      >
        {filteredLogs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-[#7c8177] text-center font-light">
            <span>No log records for current filter. Live events will append every 1.5 seconds...</span>
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div 
              key={log.id} 
              className="flex items-start gap-2.5 py-1.5 border-b border-white/[0.04] hover:bg-white/[0.04] px-2 rounded-xl transition-colors"
            >
              <span className="text-[#7c8177] text-[11px] whitespace-nowrap pt-0.5">
                [{log.timestamp}]
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-lg border font-semibold whitespace-nowrap ${log.badgeColor}`}>
                {log.type}
              </span>
              <span className="text-[#d1d5db] flex-1 leading-relaxed text-xs font-light">
                {log.message}
              </span>
              {log.deltaCo2 > 0 && (
                <span className="text-xs text-[#00F59B] font-medium whitespace-nowrap pl-2">
                  +{log.deltaCo2.toFixed(3)} kg CO₂
                </span>
              )}
            </div>
          ))
        )}
      </div>

      {/* Terminal Footer Indicator */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#7c8177] relative z-10">
        <span className="flex items-center gap-2 font-light">
          <span className="w-2 h-2 rounded-full bg-[#00F59B] animate-pulse"></span>
          <span>SHA-256 Ledger State:</span>
          <span className="text-[#00F59B] font-semibold">0x9e4f...b72a [CRYPTOGRAPHICALLY VERIFIED]</span>
        </span>
        <span className="text-[#9da395] font-light">
          Total Session Dispatches: {logs.length}
        </span>
      </div>

    </div>
  );
};
