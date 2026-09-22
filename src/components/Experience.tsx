import { Briefcase, CheckCircle2, TrendingUp, Cpu, Zap, Smartphone, RefreshCw } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Experience() {
  const exp = PORTFOLIO_DATA.experience[0];

  return (
    <section id="experience" className="py-16 md:py-20 border-t border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-emerald-400">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Career History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-100">
            Work Experience
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
            Delivering high-value full-stack web solutions, API optimization, and CI/CD automation for clients worldwide.
          </p>
        </div>

        {/* Experience Timeline Card */}
        <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800/90 p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-2xl font-bold text-neutral-100">
                  {exp.company}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
                  {exp.type}
                </span>
              </div>
              <p className="text-base text-emerald-400 font-medium mt-1">
                {exp.role}
              </p>
            </div>

            <div className="text-left lg:text-right">
              <span className="inline-block px-3 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-300">
                {exp.period}
              </span>
              <span className="block text-xs text-neutral-400 mt-1">
                Remote Engagements • Global Clients
              </span>
            </div>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 my-6">
            {exp.metrics.map((m, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800/70">
                <span className="text-2xl font-extrabold font-mono text-emerald-400 block">
                  {m.value}
                </span>
                <span className="text-xs text-neutral-300 font-medium mt-0.5 block">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Responsibilities & Achievements List */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              Key Contributions & Engineering Impact:
            </h4>
            
            <div className="space-y-3">
              {exp.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                  <div className="mt-1 w-4 h-4 rounded-full bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="leading-relaxed">{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used in Role */}
          <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-neutral-400 mr-2">Core Tools in Engagement:</span>
            {['React.js', 'Next.js', 'Node.js', 'Express.js', 'REST APIs', 'CI/CD Pipelines', 'Tailwind CSS', 'Git'].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-neutral-950 text-neutral-300 font-mono text-xs border border-neutral-800"
              >
                {tech}
              </span>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
