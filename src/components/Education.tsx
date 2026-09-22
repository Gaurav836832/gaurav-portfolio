import { GraduationCap, Award, Calendar, MapPin, CheckCircle, BookOpen } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Education() {
  const edu = PORTFOLIO_DATA.education[0];
  const training = PORTFOLIO_DATA.trainings[0];

  return (
    <section id="education" className="py-16 md:py-20 border-t border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-emerald-400">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background & Intensive Training</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-100">
            Education & Certifications
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
            Formal university degree combined with rigorous specialization in full-stack web engineering and algorithms.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Degree Card */}
          <div className="p-7 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 flex flex-col justify-between space-y-5 hover:border-emerald-500/40 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 font-mono text-xs font-bold border border-emerald-800/60">
                  CGPA: {edu.score}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-neutral-100">
                  {edu.institution}
                </h3>
                <p className="text-emerald-400 font-medium text-sm mt-0.5">
                  {edu.degree}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{edu.period}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{edu.location}</span>
                </span>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed">
                Completed university program at Zakir Husain Delhi College (University of Delhi) with a 7.6 cumulative CGPA, cultivating strong analytical, problem-solving, and communication fundamentals.
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center gap-2 text-xs font-mono text-neutral-400">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Verified Academic Credential • Delhi University</span>
            </div>
          </div>

          {/* Training / Specialization Card */}
          <div className="p-7 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 flex flex-col justify-between space-y-5 hover:border-cyan-500/40 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 font-mono text-xs font-bold border border-cyan-800/60">
                  Specialization
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-neutral-100">
                  {training.organization}
                </h3>
                <p className="text-cyan-400 font-medium text-sm mt-0.5">
                  {training.program}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{training.period}</span>
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-neutral-400 block font-semibold uppercase">
                  Curriculum Mastery:
                </span>
                {training.topics.map((topic, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                    <span className="text-cyan-400 mt-0.5">▹</span>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center gap-2 text-xs font-mono text-neutral-400">
              <Award className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Full Stack Web Development & DSA Graduate</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
