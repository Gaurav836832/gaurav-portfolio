import { useState } from 'react';
import { X, Globe, Copy, Check, ArrowRight, ShieldCheck, Sparkles, Server } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface DomainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DomainModal({ isOpen, onClose }: DomainModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const domain = PORTFOLIO_DATA.personal.customDomain;

  const handleCopy = () => {
    navigator.clipboard.writeText(domain);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold text-neutral-100">Custom Domain Configuration</h3>
              <p className="text-xs text-neutral-400 font-mono">How to connect {domain}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs text-neutral-300">
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="text-[11px] text-neutral-400 font-mono block">Target Custom Subdomain:</span>
                <span className="text-sm font-bold font-mono text-emerald-400">{domain}</span>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <p className="text-sm text-neutral-300 leading-relaxed">
            Just like <code className="text-cyan-300 font-mono px-1 py-0.5 rounded bg-neutral-950">portfolio.amanjag.dev</code>, you can host this portfolio under your own branded domain:
          </p>

          {/* Steps */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-1">
              <span className="font-bold text-neutral-200 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-neutral-950 text-xs flex items-center justify-center font-bold">1</span>
                <span>Get your personal domain</span>
              </span>
              <p className="text-neutral-400 pl-6 text-xs">
                Register <code className="text-neutral-300">gauravsoni.dev</code> or <code className="text-neutral-300">gsoni.dev</code> on Namecheap, Cloudflare, or Google Domains.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-1">
              <span className="font-bold text-neutral-200 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-neutral-950 text-xs flex items-center justify-center font-bold">2</span>
                <span>Deploy with 1-Click</span>
              </span>
              <p className="text-neutral-400 pl-6 text-xs">
                Export to GitHub via the AI Studio Settings menu, or deploy directly to Cloud Run, Vercel, or Netlify.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-1">
              <span className="font-bold text-neutral-200 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-neutral-950 text-xs flex items-center justify-center font-bold">3</span>
                <span>Add CNAME DNS Record</span>
              </span>
              <div className="pl-6 pt-1 font-mono text-[11px] space-y-1 text-neutral-400">
                <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                  Type: <strong className="text-emerald-400">CNAME</strong> | Name: <strong className="text-cyan-400">portfolio</strong> | Target: <strong className="text-neutral-200">cname.vercel-dns.com</strong> (or your host)
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-emerald-300 text-xs">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Automatic SSL / HTTPS certificates will be issued immediately upon DNS propagation!</span>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs transition-all shadow"
          >
            Got it, Return to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
