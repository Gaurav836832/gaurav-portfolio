import { useState, type MouseEvent } from 'react';
import { 
  Globe, 
  Copy, 
  Check, 
  FileText, 
  Menu, 
  X, 
  ExternalLink,
  Code2
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenDomainModal: () => void;
}

export default function Navbar({ onOpenResume, onOpenDomainModal }: NavbarProps) {
  const [copiedDomain, setCopiedDomain] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCopyDomain = (e: MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.customDomain);
    setCopiedDomain(true);
    setTimeout(() => setCopiedDomain(false), 2000);
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-neutral-950/80 border-b border-neutral-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand & Custom URL Pill */}
        <div className="flex items-center gap-3">
          <a 
            href="#about" 
            className="flex items-center gap-2 group text-neutral-100 hover:text-emerald-400 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 group-hover:border-emerald-400 transition-all shadow-sm">
              GS
            </div>
            <div className="hidden sm:block">
              <span className="font-bold tracking-tight text-neutral-100 text-sm md:text-base">Gaurav Soni</span>
              <span className="block text-[11px] text-neutral-400 font-mono -mt-0.5">Full Stack Dev</span>
            </div>
          </a>

          {/* Inspired by portfolio.amanjag.dev custom URL pill */}
          <button
            onClick={onOpenDomainModal}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 hover:border-emerald-500/50 text-xs font-mono text-neutral-300 hover:text-emerald-300 transition-all shadow-inner group"
            title="Click for custom domain setup instructions"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Globe className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-400 transition-colors" />
            <span className="tracking-tight text-neutral-300 group-hover:text-neutral-100">
              portfolio.gauravsoni.dev
            </span>
            <span
              onClick={handleCopyDomain}
              className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-emerald-400 transition-colors ml-1"
              title="Copy URL"
            >
              {copiedDomain ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </span>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-neutral-400 hover:text-neutral-100 transition-colors hover:scale-105 transform duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Quick status badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/50 text-[11px] font-medium text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Available for Hire</span>
          </div>

          {/* Resume Button */}
          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-semibold text-xs sm:text-sm transition-all shadow-md shadow-emerald-950/40 hover:shadow-emerald-900/60 active:scale-95"
            id="nav-resume-btn"
          >
            <FileText className="w-4 h-4" />
            <span>Resume</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-800 bg-neutral-950/95 px-4 pt-3 pb-5 space-y-3 backdrop-blur-xl">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
            <button
              onClick={() => {
                onOpenDomainModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-mono text-emerald-400 hover:underline"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>portfolio.gauravsoni.dev</span>
            </button>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
              🟢 Ready for Hire
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-neutral-900/60 hover:bg-neutral-800 text-sm font-medium text-neutral-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                onOpenResume();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-semibold text-sm transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>View & Download Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
