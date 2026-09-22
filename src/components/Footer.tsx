import { ArrowUp, Github, Linkedin, Mail, Heart, Globe, FileText } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface FooterProps {
  onOpenResume: () => void;
  onOpenDomainModal: () => void;
}

export default function Footer({ onOpenResume, onOpenDomainModal }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-800/80 bg-neutral-950 py-12 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 text-xs">
              GS
            </div>
            <div>
              <p className="font-bold text-neutral-200 text-sm">{PORTFOLIO_DATA.personal.name}</p>
              <p className="text-neutral-500 font-mono text-[11px]">{PORTFOLIO_DATA.personal.role} • New Delhi, India</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-neutral-300 text-xs">
            <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
            <a href="#experience" className="hover:text-emerald-400 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-emerald-400 transition-colors">Skills</a>
            <a href="#education" className="hover:text-emerald-400 transition-colors">Education</a>
            <button onClick={onOpenResume} className="hover:text-emerald-400 transition-colors flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
            <button onClick={onOpenDomainModal} className="text-emerald-400 hover:underline flex items-center gap-1 font-mono">
              <Globe className="w-3.5 h-3.5" />
              <span>portfolio.gauravsoni.dev</span>
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white transition-colors"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px] font-mono">
          <p>© {new Date().getFullYear()} Gaurav Soni. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with React, Vite & Tailwind CSS</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
