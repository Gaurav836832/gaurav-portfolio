import { useState } from 'react';
import { 
  Code2, 
  Layout, 
  Server, 
  Database, 
  Wrench, 
  CheckCircle2, 
  Award,
  Terminal,
  Cpu
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'database' | 'tools'>('all');

  const { languages, frontend, backend, databases, tools, competencies } = PORTFOLIO_DATA.skills;

  return (
    <section id="skills" className="py-16 md:py-24 border-t border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-emerald-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>Tech Stack & Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-100">
            Skills & Technologies
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
            A comprehensive overview of my technical capabilities spanning frontend engineering, backend API services, database administration, and workflow tools.
          </p>
        </div>

        {/* Skills Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          {/* 1. Frontend & Client */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-800">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Layout className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-100">Frontend Engineering</h3>
                <span className="text-xs text-neutral-400 font-mono">UI/UX & Reactive State</span>
              </div>
            </div>

            <div className="space-y-3">
              {frontend.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-200 font-semibold">{item.name}</span>
                    <span className="text-emerald-400">{item.badge}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-neutral-950 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Backend & APIs */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-800">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-100">Backend & APIs</h3>
                <span className="text-xs text-neutral-400 font-mono">Server Logic & Integrations</span>
              </div>
            </div>

            <div className="space-y-3">
              {backend.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-200 font-semibold">{item.name}</span>
                    <span className="text-cyan-400">{item.badge}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-neutral-950 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full"
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Databases & State */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-800">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-100">Databases & Storage</h3>
                <span className="text-xs text-neutral-400 font-mono">Persistence & Modeling</span>
              </div>
            </div>

            <div className="space-y-3">
              {databases.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-200 font-semibold">{item.name}</span>
                    <span className="text-emerald-400">{item.badge}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-neutral-950 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                </div>
              ))}

              <div className="pt-2 border-t border-neutral-800">
                <span className="text-xs font-mono text-neutral-400 block mb-2">Languages:</span>
                <div className="flex flex-wrap gap-1.5">
                  {languages.map((l) => (
                    <span
                      key={l.name}
                      className="px-2.5 py-1 rounded bg-neutral-950 text-neutral-300 font-mono text-xs border border-neutral-800"
                    >
                      {l.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Developer Tools & Core Competencies Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Tools & Workflow */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-300 uppercase tracking-wider font-semibold">
              <Wrench className="w-4 h-4 text-emerald-400" />
              <span>Developer Tools & Environment</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {tools.map((t) => (
                <div key={t.name} className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800/80">
                  <span className="text-xs font-bold text-neutral-200 block">{t.name}</span>
                  <span className="text-[11px] font-mono text-neutral-400">{t.badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Competencies & Soft Skills */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-300 uppercase tracking-wider font-semibold">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>Core Architecture & Professional Skills</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {competencies.map((comp, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-950/50 border border-neutral-800/60 text-xs text-neutral-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{comp}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
