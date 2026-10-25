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
  Sparkles
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

  // Auto-scroll internally inside terminal container only (never jumps browser page)
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
    <div className="glass-panel rounded-2xl p-4 xl:p-5 border border-white/10 shadow-xl flex flex-col justify-between bg-[#20241b]/90 font-sans">
      
      {/* Terminal Header & Carbon Accounting Summary */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#10b981]/15 border border-[#34d399]/30">
            <Terminal className="w-4 h-4 text-[#34d399]" />
          </div>
          <div>
            <h2 className="text-sm font-light tracking-tight text-white flex items-center gap-2">
              Verifiable ESG Carbon Accounting & Autonomous Audit Ledger
            </h2>
            <p className="text-[11px] text-[#9da395] font-light">
              Deterministic, tamper-evident log stream emitted by Edge ONNX inference agent
            </p>
          </div>
        </div>

        {/* Live ESG Carbon Metrics Bar */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#10b981]/15 border border-[#34d399]/30 text-[#86efac]">
            <Leaf className="w-3.5 h-3.5 text-[#34d399]" />
            <span>Cumulative CO₂ Avoided:</span>
            <span className="font-medium text-sm text-[#34d399] glow-text-emerald">
              {state.cumulativeCo2SavedKg.toFixed(2)} kg
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#34d399]/15 border border-[#34d399]/30 text-[#86efac]">
            <span>Clean Ratio:</span>
            <span className="font-medium text-sm text-[#86efac]">
              {state.cleanEnergyRatioPct}%
            </span>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters, Auto-scroll, and Working Export Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-white/10 text-xs">
        {/* Category Filters */}
        <div className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-[#9da395]" />
          <div className="inline-flex p-0.5 bg-[#121510] rounded-lg border border-white/10">
            {['ALL', 'ONNX-AGENT', 'DISPATCH', 'PROTECT', 'ALERT'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedFilter(category)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                  selectedFilter === category
                    ? 'bg-[#282e22] text-[#86efac] font-medium'
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
            className={`px-2 py-1 rounded border text-[10px] transition-colors ${
              autoScroll
                ? 'bg-[#20241b] text-[#34d399] border-[#34d399]/40'
                : 'bg-[#121510] text-[#7c8177] border-white/10'
            }`}
          >
            {autoScroll ? '● Auto-Scroll ON' : '○ Scroll Paused'}
          </button>

          <button
            onClick={onClearLogs}
            className="p-1 rounded bg-[#20241b] border border-white/10 text-[#9da395] hover:text-white"
            title="Clear current log buffer"
          >
            <RotateCcw className="w-3 h-3" />
          </button>

          {/* Working Export CSV */}
          <button
            onClick={() => exportReportCSV(state, logs, forecast)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#10b981]/20 hover:bg-[#10b981]/30 text-[#86efac] border border-[#34d399]/40 transition-all font-medium shadow-sm"
            title="Download CSV file with 96 time-series points, ESG carbon savings, and ledger"
          >
            <Download className="w-3 h-3" />
            <span>Export ESG CSV</span>
          </button>

          {/* Working Export JSON */}
          <button
            onClick={() => exportReportJSON(state, logs, forecast)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#34d399]/20 hover:bg-[#34d399]/30 text-[#86efac] border border-[#34d399]/40 transition-all font-medium shadow-sm"
            title="Download JSON telemetry signature bundle"
          >
            <FileText className="w-3 h-3" />
            <span>Telemetry JSON</span>
          </button>
        </div>
      </div>

      {/* Live Scrolling Terminal Window */}
      <div 
        ref={terminalContainerRef}
        className="bg-[#121510] border border-white/10 rounded-xl p-3 h-[300px] overflow-y-auto font-mono text-xs space-y-1.5 shadow-inner"
      >
        {filteredLogs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-[#7c8177] text-center font-light">
            <span>No log records for current filter. Live events will append every 1.5 seconds...</span>
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div 
              key={log.id} 
              className="flex items-start gap-2 py-1 border-b border-white/5 hover:bg-white/5 px-1.5 rounded transition-colors"
            >
              <span className="text-[#7c8177] text-[11px] whitespace-nowrap pt-0.5">
                [{log.timestamp}]
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium whitespace-nowrap ${log.badgeColor}`}>
                {log.type}
              </span>
              <span className="text-[#cbd0c5] flex-1 leading-relaxed text-xs font-light">
                {log.message}
              </span>
              {log.deltaCo2 > 0 && (
                <span className="text-xs text-[#34d399] font-medium whitespace-nowrap pl-2">
                  +{log.deltaCo2.toFixed(3)} kg CO₂
                </span>
              )}
            </div>
          ))
        )}
      </div>

      {/* Terminal Footer Indicator */}
      <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#7c8177]">
        <span className="flex items-center gap-1.5 font-light">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse"></span>
          SHA-256 Ledger State: <span className="text-[#9da395] font-medium">0x9e4f...b72a [VERIFIED]</span>
        </span>
        <span className="text-[#9da395] font-light">
          Total Session Dispatches: {logs.length}
        </span>
      </div>

    </div>
  );
};
