import { useState } from 'react';
import { 
  ArrowRight, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Check, 
  Copy,
  Sparkles,
  Layers,
  Zap,
  Gauge,
  Smartphone
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export default function Hero({ onOpenResume, onOpenContact }: HeroProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="about" className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tag & Status */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Full-Stack Developer • 2+ Years Experience</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/80 border border-neutral-800/80 text-xs text-neutral-400">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>{PORTFOLIO_DATA.personal.location}</span>
          </div>
        </div>

        {/* Main Grid: Headline & Profile Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left / Main Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-100 leading-[1.15]">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Gaurav Soni</span>
              </h1>
              <p className="text-lg sm:text-xl text-neutral-300 font-medium">
                Full-Stack Developer specializing in <span className="text-emerald-400 font-semibold">React</span>, <span className="text-cyan-400 font-semibold">Next.js</span>, and <span className="text-emerald-400 font-semibold">Node.js</span> ecosystems.
              </p>
            </div>

            <p className="text-base text-neutral-400 leading-relaxed max-w-2xl">
              {PORTFOLIO_DATA.personal.bio}
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-sm transition-all shadow-lg shadow-emerald-950/50 hover:shadow-emerald-900/60 active:scale-98"
                id="hero-view-projects-btn"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-200 font-semibold text-sm transition-all active:scale-98"
                id="hero-download-resume-btn"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Resume PDF</span>
              </button>

              <button
                onClick={onOpenContact}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 text-neutral-300 font-medium text-sm transition-all"
                id="hero-contact-btn"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Get in Touch</span>
              </button>
            </div>

            {/* Direct Contact Bar */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 border-t border-neutral-900">
              {/* Email Pill */}
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white transition-all group"
                title="Click to copy email"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>{PORTFOLIO_DATA.personal.email}</span>
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3 text-neutral-500 group-hover:text-neutral-300" />
                )}
              </button>

              {/* Phone Pill */}
              <button
                onClick={handleCopyPhone}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white transition-all group"
                title="Click to copy phone number"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PORTFOLIO_DATA.personal.phoneInternational}</span>
                {copiedPhone ? (
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                ) : (
                  <Copy className="w-3 h-3 text-neutral-500 group-hover:text-neutral-300" />
                )}
              </button>

              {/* Social Links */}
              <div className="flex items-center gap-2 ml-auto">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-cyan-400 hover:border-cyan-800/50 transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Key Metrics & Code Preview Card */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Quick Metrics Bento Card (From Resume Experience) */}
            <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800/80 backdrop-blur-sm shadow-xl space-y-5 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-300">
                    Production Impact
                  </span>
                </div>
                <span className="text-[11px] font-mono text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
                  People-Per-Hour
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 hover:border-emerald-500/40 transition-colors">
                  <div className="flex items-center gap-2 text-emerald-400 mb-1">
                    <Layers className="w-4 h-4" />
                    <span className="text-2xl font-bold font-mono">20+</span>
                  </div>
                  <p className="text-xs text-neutral-300 font-medium">Dynamic Websites</p>
                  <p className="text-[11px] text-neutral-400">+30% client engagement</p>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 hover:border-cyan-500/40 transition-colors">
                  <div className="flex items-center gap-2 text-cyan-400 mb-1">
                    <Gauge className="w-4 h-4" />
                    <span className="text-2xl font-bold font-mono">-40%</span>
                  </div>
                  <p className="text-xs text-neutral-300 font-medium">API Data Latency</p>
                  <p className="text-[11px] text-neutral-400">Node & React tuning</p>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 hover:border-emerald-500/40 transition-colors">
                  <div className="flex items-center gap-2 text-emerald-400 mb-1">
                    <Zap className="w-4 h-4" />
                    <span className="text-2xl font-bold font-mono">-60%</span>
                  </div>
                  <p className="text-xs text-neutral-300 font-medium">Release Overhead</p>
                  <p className="text-[11px] text-neutral-400">Automated CI/CD</p>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 hover:border-purple-500/40 transition-colors">
                  <div className="flex items-center gap-2 text-purple-400 mb-1">
                    <Smartphone className="w-4 h-4" />
                    <span className="text-2xl font-bold font-mono">+35%</span>
                  </div>
                  <p className="text-xs text-neutral-300 font-medium">Mobile Traffic</p>
                  <p className="text-[11px] text-neutral-400">Responsive UI polish</p>
                </div>
              </div>

              {/* Quick Quote / Focus Pill */}
              <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs text-neutral-300 flex items-center gap-2.5">
                <span className="text-lg">🎯</span>
                <span className="text-neutral-400">
                  <strong className="text-neutral-200">Current Focus:</strong> Scaling Next.js 15 apps, Razorpay payment flows & distributed Node.js microservices.
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
