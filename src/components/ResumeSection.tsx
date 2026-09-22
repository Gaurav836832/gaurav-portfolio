import { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  ExternalLink, 
  Eye, 
  CheckCircle2, 
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Github,
  Globe,
  Maximize2
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ResumeSectionProps {
  onOpenResume: () => void;
}

export default function ResumeSection({ onOpenResume }: ResumeSectionProps) {
  const [activePreviewPage, setActivePreviewPage] = useState<1 | 2>(1);

  return (
    <section id="resume" className="py-16 md:py-24 border-t border-neutral-800/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-emerald-400">
              <FileText className="w-3.5 h-3.5" />
              <span>Official Curriculum Vitae</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-100">
              Resume & Qualifications
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-2xl">
              Verified 2-page document detailing 2+ years of full-stack experience, 4 production-grade web applications, and verified technical competencies.
            </p>
          </div>

          {/* Direct CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenResume}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-sm transition-all shadow-lg shadow-emerald-950/60 hover:shadow-emerald-900/60 active:scale-95 cursor-pointer"
              id="resume-section-open-btn"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Open PDF Resume</span>
            </button>

            <button
              onClick={() => {
                onOpenResume();
                setTimeout(() => window.print(), 300);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-200 text-sm font-semibold transition-all cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Interactive PDF Document Preview Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive PDF Sheet Preview (Clickable to open) */}
          <div className="lg:col-span-8 group relative">
            {/* Top Toolbar for Preview */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-t-2xl px-4 py-3 flex items-center justify-between text-xs text-neutral-300 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-bold text-neutral-200">Gaurav_Soni_Resume.pdf</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-neutral-500 hidden sm:inline">Preview:</span>
                <button
                  onClick={() => setActivePreviewPage(1)}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activePreviewPage === 1 
                      ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30' 
                      : 'hover:bg-neutral-800 text-neutral-400'
                  }`}
                >
                  Page 1
                </button>
                <button
                  onClick={() => setActivePreviewPage(2)}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activePreviewPage === 2 
                      ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30' 
                      : 'hover:bg-neutral-800 text-neutral-400'
                  }`}
                >
                  Page 2
                </button>
              </div>
            </div>

            {/* Clickable Realistic Resume Paper Sheet */}
            <div 
              onClick={onOpenResume}
              className="relative cursor-pointer bg-white text-neutral-900 p-6 sm:p-10 rounded-b-2xl shadow-2xl border-x border-b border-neutral-800/60 font-serif min-h-[540px] select-none transition-all group-hover:ring-2 group-hover:ring-emerald-500/50"
            >
              {/* Hover overlay inviting user to click */}
              <div className="absolute inset-0 bg-neutral-950/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl flex items-center justify-center z-20">
                <div className="px-5 py-2.5 rounded-xl bg-neutral-950/90 border border-emerald-500/60 text-white font-sans text-sm font-semibold flex items-center gap-2 shadow-2xl transform group-hover:scale-105 transition-transform">
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span>Click to Read & Expand Full Resume PDF</span>
                </div>
              </div>

              {activePreviewPage === 1 ? (
                /* Page 1 Miniature Content */
                <div className="space-y-4 text-xs sm:text-[13px] leading-relaxed">
                  {/* Document Header */}
                  <div className="text-center space-y-1 border-b border-neutral-300 pb-3">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 uppercase">
                      Gaurav Soni
                    </h3>
                    <p className="text-xs text-neutral-700 font-medium">
                      Full Stack Developer — 2+ Years
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-x-3 text-[11px] text-neutral-600 pt-0.5">
                      <span>New Delhi, Delhi</span>
                      <span>•</span>
                      <span>08851415479</span>
                      <span>•</span>
                      <span>gsoni7424@gmail.com</span>
                      <span>•</span>
                      <span className="text-sky-700 underline">LinkedIn</span>
                      <span>•</span>
                      <span className="text-sky-700 underline">Github</span>
                      <span>•</span>
                      <span className="text-sky-700 underline">Portfolio</span>
                    </div>
                  </div>

                  {/* Profile Summary */}
                  <div>
                    <h4 className="font-bold text-neutral-900 uppercase text-xs tracking-wider border-b border-neutral-300 pb-0.5 mb-1">
                      Profile Summary
                    </h4>
                    <p className="text-neutral-700 text-xs leading-normal">
                      Full-Stack Developer with 3+ years of experience in building scalable and high-performing web applications. aiming to specialize in React and Node.js Full-stack development
                    </p>
                  </div>

                  {/* Experience */}
                  <div>
                    <h4 className="font-bold text-neutral-900 uppercase text-xs tracking-wider border-b border-neutral-300 pb-0.5 mb-1">
                      Experience
                    </h4>
                    <div className="flex justify-between font-bold text-xs text-neutral-900">
                      <span>People-Per-Hour <span className="font-normal text-neutral-600">(Freelancer Platform)</span></span>
                      <span>August 2025</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-neutral-600 italic mb-1">
                      <span>Full-Stack Developer</span>
                      <span>Remote-Job</span>
                    </div>
                    <ul className="list-disc ml-4 space-y-0.5 text-[11px] text-neutral-700">
                      <li>Developed and maintained <strong>20+ dynamic websites</strong> using <strong>React and Node.js</strong>, increasing client engagement by 30%.</li>
                      <li>Integrated and optimized <strong>RESTful APIs</strong> using React.js and Node.js, reducing overall data load time by 40%.</li>
                      <li>Streamlined deployment by introducing <strong>CI/CD automation</strong>, improving release efficiency and reducing manual deployment time by 60%.</li>
                    </ul>
                  </div>

                  {/* Projects Snapshot */}
                  <div>
                    <h4 className="font-bold text-neutral-900 uppercase text-xs tracking-wider border-b border-neutral-300 pb-0.5 mb-1">
                      Projects
                    </h4>
                    <div className="space-y-1.5 text-[11px]">
                      <div>
                        <div className="flex justify-between font-bold">
                          <span>Get-Me-A-Chai <span className="text-sky-700 font-normal">| GitHub |</span> <span className="font-normal text-neutral-600">Next.js, Express.js, MongoDB, Razorpay</span></span>
                          <span className="font-normal text-neutral-600">Sept 2025</span>
                        </div>
                        <p className="text-neutral-600">Crowdfunding creator platform inspired by Patreon with Razorpay micro-donations.</p>
                      </div>

                      <div>
                        <div className="flex justify-between font-bold">
                          <span>Todo-List WebApp <span className="text-sky-700 font-normal">| GitHub | View |</span> <span className="font-normal text-neutral-600">Vite+React.js, Tailwind, MongoDB</span></span>
                          <span className="font-normal text-neutral-600">Sept 2025</span>
                        </div>
                        <p className="text-neutral-600">Responsive task manager with full CRUD state and MongoDB persistence.</p>
                      </div>

                      <div>
                        <div className="flex justify-between font-bold">
                          <span>Restaurant-Order-Booking-Website <span className="text-sky-700 font-normal">| View |</span> <span className="font-normal text-neutral-600">HTML, CSS, JS</span></span>
                          <span className="font-normal text-neutral-600">Oct 2025</span>
                        </div>
                        <p className="text-neutral-600">Interactive dining menu, real-time cart, and table reservation booking system.</p>
                      </div>

                      <div>
                        <div className="flex justify-between font-bold">
                          <span>Spotify-Clone(Music-Player) <span className="text-sky-700 font-normal">| GitHub | View |</span> <span className="font-normal text-neutral-600">HTML, CSS, JS</span></span>
                          <span className="font-normal text-neutral-600">Nov 2025</span>
                        </div>
                        <p className="text-neutral-600">Audio streaming platform with track controls, playlist rendering, and offline local storage.</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills Snapshot */}
                  <div>
                    <h4 className="font-bold text-neutral-900 uppercase text-xs tracking-wider border-b border-neutral-300 pb-0.5 mb-1">
                      Technical Skills
                    </h4>
                    <div className="grid grid-cols-2 gap-1 text-[11px] text-neutral-700">
                      <div><strong>Languages:</strong> HTML/CSS, JavaScript</div>
                      <div><strong>Databases:</strong> MongoDB, Local-Storage</div>
                      <div><strong>Frameworks:</strong> Node.js, Express, Git, React.js</div>
                      <div><strong>Tools & Competencies:</strong> VS Code, OOPS</div>
                    </div>
                  </div>

                  <div className="pt-2 text-center text-[10px] text-neutral-400 font-sans">
                    — Page 1 of 2 • Click to view full high-resolution PDF document —
                  </div>
                </div>
              ) : (
                /* Page 2 Miniature Content */
                <div className="space-y-6 text-xs sm:text-[13px] leading-relaxed pt-4">
                  {/* Education */}
                  <div>
                    <h4 className="font-bold text-neutral-900 uppercase text-xs tracking-wider border-b border-neutral-300 pb-0.5 mb-2">
                      Education
                    </h4>
                    <div className="flex justify-between font-bold text-xs text-neutral-900">
                      <span>Zakir Hussain Delhi College (Percentage: 7.6 CGP)</span>
                      <span>2020 – 2023</span>
                    </div>
                    <div className="flex justify-between text-xs text-neutral-600 italic">
                      <span>Bachelor of Arts(Program)</span>
                      <span>Delhi</span>
                    </div>
                  </div>

                  {/* Trainings */}
                  <div>
                    <h4 className="font-bold text-neutral-900 uppercase text-xs tracking-wider border-b border-neutral-300 pb-0.5 mb-2">
                      Trainings
                    </h4>
                    <div className="flex justify-between font-bold text-xs text-neutral-900">
                      <span>Coding Ninjas</span>
                      <span>May 2025 – October 2025</span>
                    </div>
                    <div className="text-xs text-neutral-700 italic mb-2">
                      Full Stack Web Development
                    </div>
                    <ul className="list-disc ml-4 space-y-1 text-xs text-neutral-700">
                      <li>
                        <span className="text-sky-700 font-semibold">Backend</span> | <span className="text-sky-700 font-semibold">Frontend</span> | <span className="text-sky-700 font-semibold">Data Structure</span> |
                      </li>
                    </ul>
                  </div>

                  <div className="pt-24 text-center text-[10px] text-neutral-400 font-sans">
                    — Page 2 of 2 • Click to view full high-resolution PDF document —
                  </div>
                </div>
              )}
            </div>

            {/* Click to expand pill banner */}
            <div className="mt-3 flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Formatted to standard A4/Letter dimensions for ATS & recruiter review
              </span>
              <button
                onClick={onOpenResume}
                className="text-emerald-400 hover:text-emerald-300 underline flex items-center gap-1 font-semibold"
              >
                <span>Read in Fullscreen</span>
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right: Key Resume Highlights & Recruiter Fast-Facts */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Quick Action Card */}
            <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-4">
              <h3 className="text-base font-bold text-neutral-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Resume Highlights</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1">
                  <span className="font-mono text-emerald-400 block font-semibold">Experience</span>
                  <p className="text-neutral-300">
                    2+ Years in scalable web architecture, freelance production delivery, REST APIs, and CI/CD pipelines.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1">
                  <span className="font-mono text-cyan-400 block font-semibold">Verified Projects</span>
                  <p className="text-neutral-300">
                    Get-Me-A-Chai, Todo-List WebApp, Restaurant Booking, and Spotify Clone with live hosted deployments.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1">
                  <span className="font-mono text-amber-400 block font-semibold">Education & Training</span>
                  <p className="text-neutral-300">
                    University of Delhi (7.6 CGPA) & Coding Ninjas Full Stack & Data Structures specialization.
                  </p>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={onOpenResume}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
                >
                  <Eye className="w-4 h-4" />
                  <span>Open Full PDF Reader</span>
                </button>

                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}?subject=${encodeURIComponent("Interview Invitation / Full-Stack Role")}&body=${encodeURIComponent("Hi Gaurav,\n\nI reviewed your resume and would like to schedule an interview.")}`}
                  className="w-full py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Request Interview / Reference</span>
                </a>
              </div>
            </div>

            {/* Direct Contact Reference Card */}
            <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 space-y-3 text-xs">
              <span className="font-mono text-neutral-400 uppercase tracking-wider block text-[11px]">
                Resume Contact Info
              </span>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-neutral-300">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>New Delhi, Delhi, India</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>08851415479</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="font-mono">{PORTFOLIO_DATA.personal.email}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
