import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  Key,
  Users,
  Server
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
      <div 
        className="glass-vibrant-card specular-rim w-full max-w-lg rounded-[32px] border border-white/12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden bg-[#0d120e]/95 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F59B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#22D3EE]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-[#00F59B]/25 to-[#06B6D4]/20 border border-[#00F59B]/50 text-[#00F59B] shadow-[0_0_20px_rgba(0,245,155,0.35)]">
              <Lock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-light text-white tracking-tight">
                  Operator Login & Cloud SSO
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-[10px] font-mono text-amber-300 font-semibold shadow-[0_0_10px_rgba(245,158,11,0.25)]">
                  COMING SOON
                </span>
              </div>
              <p className="text-xs text-[#9da395] font-light">
                Enterprise Multi-Facility Fleet Access & SCADA RBAC
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#9da395] hover:text-white transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6 relative z-10 overflow-y-auto max-h-[75vh]">
          
          {/* Hackathon Notice Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 text-xs text-[#d7dcd2] space-y-1.5">
            <div className="flex items-center gap-2 font-medium text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Hackathon Prototype Mode Active</span>
            </div>
            <p className="text-[#a0a89b] font-light leading-relaxed">
              You are currently viewing the fully functional, air-gapped <strong>Edge-AI dispatch cockpit</strong> running autonomous inference. Cloud user accounts, multi-tenant SCADA fleet logins, and SSO are scheduled for our Phase 2 release.
            </p>
          </div>

          {/* Cloud SSO Preview Options (Disabled with Coming Soon tags) */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-[#9da395] uppercase tracking-wider block">
              Enterprise Single Sign-On (SSO)
            </span>

            <div className="space-y-2">
              <button
                disabled
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/8 text-left text-xs opacity-75 cursor-not-allowed group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                    <Key className="w-4 h-4 text-[#00F59B]" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Continue with Okta SSO</div>
                    <div className="text-[10px] text-[#7c8177]">SAML 2.0 / OIDC Enterprise Federation</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#9da395]">
                  Coming Soon
                </span>
              </button>

              <button
                disabled
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/8 text-left text-xs opacity-75 cursor-not-allowed group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                    <Users className="w-4 h-4 text-[#22D3EE]" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Google Workspace Enterprise</div>
                    <div className="text-[10px] text-[#7c8177]">Directory sync & 2FA enforcement</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#9da395]">
                  Coming Soon
                </span>
              </button>

              <button
                disabled
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/8 text-left text-xs opacity-75 cursor-not-allowed group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                    <Server className="w-4 h-4 text-[#C084FC]" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Microsoft Azure Active Directory</div>
                    <div className="text-[10px] text-[#7c8177]">Conditional access & RBAC policy sync</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#9da395]">
                  Coming Soon
                </span>
              </button>
            </div>
          </div>

          {/* Join Pilot Waitlist Form */}
          <div className="p-5 rounded-2xl bg-[#080d09]/90 border border-white/10 space-y-3 shadow-inner">
            <div className="flex items-center gap-2 text-xs font-medium text-white">
              <Mail className="w-4 h-4 text-[#00F59B]" />
              <span>Want Early Cloud Fleet Access?</span>
            </div>
            <p className="text-[11px] text-[#9da395] font-light leading-relaxed">
              Enter your email to receive early access when enterprise cloud SCADA fleet management and remote telemetry synchronization go live.
            </p>

            {submitted ? (
              <div className="p-3.5 rounded-xl bg-[#00F59B]/15 border border-[#00F59B]/40 flex items-center gap-2.5 text-xs text-[#00F59B]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You're on the priority list! We'll notify you as soon as cloud sign-in is unlocked.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="operator@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-[#7c8177] focus:outline-none focus:border-[#00F59B]/60 transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#00F59B] to-[#34D399] text-[#09120c] hover:opacity-95 transition-all shadow-[0_0_15px_rgba(0,245,155,0.3)] flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Notify Me</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-[#080d09]/60 flex items-center justify-between text-[11px] font-mono text-[#7c8177] relative z-10">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00F59B]" />
            Pure Offline Autonomous Hardware Active
          </span>
          <button
            onClick={onClose}
            className="text-white hover:text-[#00F59B] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
