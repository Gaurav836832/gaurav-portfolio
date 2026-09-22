import { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Github, 
  Play, 
  Sparkles, 
  Code2, 
  Edit3,
  Check,
  X,
  Globe,
  Star
} from 'lucide-react';
import { PORTFOLIO_DATA, ProjectItem } from '../data/portfolioData';

interface ProjectsProps {
  onOpenProjectDemo: (type: 'chai' | 'todo' | 'restaurant' | 'spotify') => void;
}

export default function Projects({ onOpenProjectDemo }: ProjectsProps) {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Full Stack' | 'Frontend' | 'Web Application'>('All');
  
  // Dynamic links customizable by user (persisted in localStorage)
  const [projectLinks, setProjectLinks] = useState<Record<string, { liveUrl: string; githubUrl: string }>>({});
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ liveUrl: '', githubUrl: '' });
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Initialize links with priority to current portfolioData
  useEffect(() => {
    const initial: Record<string, { liveUrl: string; githubUrl: string }> = {};
    PORTFOLIO_DATA.projects.forEach(p => {
      initial[p.id] = { liveUrl: p.liveUrl, githubUrl: p.githubUrl };
    });

    try {
      const saved = localStorage.getItem('gaurav_project_links_v3');
      if (saved) {
        setProjectLinks({ ...initial, ...JSON.parse(saved) });
      } else {
        setProjectLinks(initial);
      }
    } catch (e) {
      setProjectLinks(initial);
    }
  }, []);

  const handleStartEdit = (project: ProjectItem) => {
    const current = projectLinks[project.id] || { liveUrl: project.liveUrl, githubUrl: project.githubUrl };
    setEditForm({ liveUrl: current.liveUrl, githubUrl: current.githubUrl });
    setEditingProjectId(project.id);
  };

  const handleSaveEdit = (projectId: string) => {
    const updated = {
      ...projectLinks,
      [projectId]: {
        liveUrl: editForm.liveUrl.trim(),
        githubUrl: editForm.githubUrl.trim()
      }
    };
    setProjectLinks(updated);
    try {
      localStorage.setItem('gaurav_project_links_v3', JSON.stringify(updated));
    } catch (e) {}
    setEditingProjectId(null);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const filteredProjects = selectedFilter === 'All'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === selectedFilter);

  return (
    <section id="projects" className="py-16 md:py-24 border-t border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-emerald-400">
              <Code2 className="w-3.5 h-3.5" />
              <span>Engineered Systems & Web Apps</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-100">
              Featured Projects
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
              Specialized web applications featuring the <strong className="text-emerald-400">Spotify Clone</strong> and the <strong className="text-cyan-400">Restaurant Order & Booking Website</strong>, complete with direct live links, GitHub source repositories, and in-browser interactive simulators.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-900 border border-neutral-800 self-start md:self-end">
            {(['All', 'Frontend', 'Web Application', 'Full Stack'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedFilter === filter
                    ? 'bg-emerald-600 text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {savedSuccess && (
          <div className="mb-6 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Project URLs updated successfully!</span>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => {
            const currentLiveUrl = projectLinks[project.id]?.liveUrl || project.liveUrl;
            const currentGithubUrl = projectLinks[project.id]?.githubUrl || project.githubUrl;
            const isFeatured = project.id === 'spotify-clone' || project.id === 'restaurant-order-booking';

            return (
              <div
                key={project.id}
                className={`group rounded-2xl bg-neutral-900/60 border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/20 relative ${
                  isFeatured ? 'border-emerald-500/30 ring-1 ring-emerald-500/20' : 'border-neutral-800/90 hover:border-neutral-700'
                }`}
              >
                {/* Top Badge Section */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                        {project.category}
                      </span>
                      {isFeatured && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Edit URL button */}
                      <button
                        onClick={() => handleStartEdit(project)}
                        className="p-1 rounded-md text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
                        title="Customize Project URLs"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[11px] font-mono text-neutral-400">
                        {project.date}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-neutral-100 group-hover:text-emerald-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5 mb-4 line-clamp-2">
                    {project.tagline}
                  </p>

                  <p className="text-sm text-neutral-300 leading-relaxed mb-4 text-pretty">
                    {project.description}
                  </p>

                  {/* Resume Bullets */}
                  <div className="space-y-2 mb-6">
                    {project.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-400">
                        <span className="text-emerald-400 text-xs mt-0.5 shrink-0">▹</span>
                        <span className="leading-snug">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-4 border-t border-neutral-800/80 space-y-4">
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-neutral-950 text-neutral-300 font-mono text-[11px] border border-neutral-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Link Buttons */}
                  <div className="space-y-2.5 pt-1">
                    {/* Live Domain URL Badge */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-neutral-400 truncate">
                      <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate select-all text-neutral-300">
                        {currentLiveUrl.replace(/^https?:\/\//, '')}
                      </span>
                    </div>

                    {/* Primary Row: Live Link & GitHub */}
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={currentLiveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs transition-colors shadow-sm"
                        title="Open Live Application"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>

                      <a
                        href={currentGithubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-200 font-semibold text-xs transition-colors"
                        title="View GitHub Source Code"
                      >
                        <Github className="w-3.5 h-3.5 text-neutral-400" />
                        <span>GitHub</span>
                      </a>
                    </div>

                    {/* Secondary Action: In-Browser Live Simulation */}
                    <button
                      onClick={() => onOpenProjectDemo(project.demoType as 'chai' | 'todo' | 'restaurant' | 'spotify')}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-neutral-950/80 hover:bg-emerald-950/30 border border-neutral-800 hover:border-emerald-500/40 text-emerald-400 hover:text-emerald-300 text-xs font-semibold transition-all group/sim"
                    >
                      <Play className="w-3.5 h-3.5 fill-current transition-transform group-hover/sim:scale-110" />
                      <span>Test Interactive Simulation</span>
                    </button>
                  </div>
                </div>

                {/* Quick Edit Dialog overlay if active */}
                {editingProjectId === project.id && (
                  <div className="absolute inset-0 bg-neutral-950/95 backdrop-blur-md rounded-2xl p-5 z-20 flex flex-col justify-between border border-emerald-500/50 animate-in fade-in">
                    <div>
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-800">
                        <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit Project Links</span>
                        </span>
                        <button
                          onClick={() => setEditingProjectId(null)}
                          className="p-1 rounded text-neutral-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="block text-neutral-300 font-mono text-[11px] mb-1">
                            Live App / Deployment URL
                          </label>
                          <input
                            type="url"
                            value={editForm.liveUrl}
                            onChange={(e) => setEditForm({ ...editForm, liveUrl: e.target.value })}
                            placeholder="https://..."
                            className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-emerald-400"
                          />
                        </div>

                        <div>
                          <label className="block text-neutral-300 font-mono text-[11px] mb-1">
                            GitHub Repository URL
                          </label>
                          <input
                            type="url"
                            value={editForm.githubUrl}
                            onChange={(e) => setEditForm({ ...editForm, githubUrl: e.target.value })}
                            placeholder="https://github.com/..."
                            className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-emerald-400"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-neutral-800">
                      <button
                        onClick={() => handleSaveEdit(project.id)}
                        className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs transition-colors flex items-center justify-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Save URLs</span>
                      </button>
                      <button
                        onClick={() => setEditingProjectId(null)}
                        className="px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
