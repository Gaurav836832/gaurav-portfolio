import { useState, useRef, useEffect, type ReactNode, type KeyboardEvent } from 'react';
import { Terminal, Code, Cpu, Sparkles, CornerDownLeft, Play, RefreshCw, Copy, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface InteractiveTerminalProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export default function InteractiveTerminal({ onOpenResume, onOpenContact }: InteractiveTerminalProps) {
  const [activeTab, setActiveTab] = useState<'terminal' | 'config' | 'impact'>('terminal');
  const [inputCommand, setInputCommand] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Terminal history
  const [history, setHistory] = useState<Array<{ command: string; output: string | ReactNode }>>([
    {
      command: 'gaurav --version',
      output: 'Gaurav Soni v2.5.0 (x86_64-fullstack-dev) • New Delhi, IN'
    },
    {
      command: 'cat status.txt',
      output: '🟢 Active & Ready for New Opportunities | Specializing in React, Next.js & Node.js'
    }
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === 'terminal') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, activeTab]);

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    let response: string | ReactNode = '';

    switch (trimmed) {
      case 'help':
        response = (
          <div className="space-y-1 text-xs">
            <p className="text-emerald-400 font-semibold">Available commands:</p>
            <p><span className="text-cyan-400">skills</span> - List core frontend, backend & database technologies</p>
            <p><span className="text-cyan-400">projects</span> - View featured projects (Get-Me-A-Chai, Todo, Spotify...)</p>
            <p><span className="text-cyan-400">experience</span> - View freelance & full-stack development metrics</p>
            <p><span className="text-cyan-400">education</span> - Zakir Husain Delhi College & Coding Ninjas</p>
            <p><span className="text-cyan-400">contact</span> - Display email, phone, location & profiles</p>
            <p><span className="text-cyan-400">inbox</span> - View messages submitted through the portfolio</p>
            <p><span className="text-cyan-400">resume</span> - Open printable resume modal</p>
            <p><span className="text-cyan-400">hire</span> - Quick prompt to send an offer/inquiry</p>
            <p><span className="text-cyan-400">clear</span> - Clear terminal output history</p>
          </div>
        );
        break;

      case 'skills':
        response = (
          <div className="space-y-1.5 text-xs">
            <p className="text-emerald-400 font-semibold">🛠️ Technical Stack:</p>
            <p><span className="text-neutral-400">Frontend:</span> React.js, Next.js, Tailwind CSS, Vite, HTML5/CSS3</p>
            <p><span className="text-neutral-400">Backend:</span> Node.js, Express.js, RESTful APIs, NextAuth.js, Razorpay</p>
            <p><span className="text-neutral-400">Databases:</span> MongoDB, Mongoose, LocalStorage</p>
            <p><span className="text-neutral-400">Tools:</span> Git, GitHub, VS Code, CI/CD Automation, Postman</p>
          </div>
        );
        break;

      case 'projects':
        response = (
          <div className="space-y-1 text-xs">
            <p className="text-emerald-400 font-semibold">🚀 Key Projects:</p>
            <p>1. <strong className="text-cyan-300">Spotify Clone (Music Player):</strong> <a href="https://spotify-clone-mus.netlify.app" target="_blank" rel="noreferrer" className="text-emerald-400 underline">spotify-clone-mus.netlify.app</a> • Web Audio API, real-time playback & local storage</p>
            <p>2. <strong className="text-cyan-300">Restaurant Order & Booking:</strong> <a href="https://restaurent-order-booking.netlify.app" target="_blank" rel="noreferrer" className="text-emerald-400 underline">restaurent-order-booking.netlify.app</a> • Interactive menu, cart & table reservation system</p>
            <p>3. <strong className="text-cyan-300">Get-Me-A-Chai:</strong> Patreon-style creator patronage with Razorpay payment webhooks & NextAuth.js</p>
            <p>4. <strong className="text-cyan-300">Todo-List WebApp:</strong> <a href="https://todo-list-1-8web.onrender.com/" target="_blank" rel="noreferrer" className="text-emerald-400 underline">todo-list-1-8web.onrender.com</a> • Vite + React + Tailwind + MongoDB real-time task manager</p>
            <p className="text-neutral-400 mt-1">💡 Tip: Explore the Projects section below to test interactive live simulations or visit repository links!</p>
          </div>
        );
        break;

      case 'experience':
        response = (
          <div className="space-y-1 text-xs">
            <p className="text-emerald-400 font-semibold">💼 Freelance & Industry Experience:</p>
            <p><strong className="text-neutral-200">People-Per-Hour</strong> (Remote Full-Stack Developer • Aug 2025 – Present)</p>
            <p>• Delivered 20+ dynamic websites using React and Node.js (+30% client engagement)</p>
            <p>• Optimized REST APIs cutting data load times by 40%</p>
            <p>• Setup CI/CD pipelines boosting release efficiency by 60%</p>
            <p>• Boosted mobile traffic by 35% through modern responsive design</p>
          </div>
        );
        break;

      case 'education':
        response = (
          <div className="space-y-1 text-xs">
            <p className="text-emerald-400 font-semibold">🎓 Education & Training:</p>
            <p>• <strong>Zakir Husain Delhi College</strong> (University of Delhi) — Bachelor of Arts, 7.6 CGPA (2020 – 2023)</p>
            <p>• <strong>Coding Ninjas</strong> — Full Stack Web Development (Backend, Frontend, Data Structures) (2025)</p>
          </div>
        );
        break;

      case 'contact':
        response = (
          <div className="space-y-1 text-xs">
            <p className="text-emerald-400 font-semibold">📬 Contact Coordinates:</p>
            <p>Email: <a href="mailto:gsoni7424@gmail.com" className="text-cyan-300 underline">gsoni7424@gmail.com</a></p>
            <p>Phone: <a href="tel:08851415479" className="text-cyan-300 underline">+91 08851415479</a></p>
            <p>Location: New Delhi, Delhi, India</p>
            <p>Portfolio: <span className="text-emerald-300 font-mono">portfolio.gauravsoni.dev</span></p>
          </div>
        );
        break;

      case 'resume':
      case 'cv':
        onOpenResume();
        response = 'Opening interactive printable resume modal...';
        break;

      case 'inbox':
      case 'messages':
        try {
          const raw = localStorage.getItem('gaurav_portfolio_messages');
          const storedMsgs = raw ? JSON.parse(raw) : [];
          if (storedMsgs.length === 0) {
            response = (
              <div className="space-y-1 text-xs">
                <p className="text-emerald-400 font-semibold">📥 Portfolio Message Inbox (0 messages)</p>
                <p className="text-neutral-400">No messages logged yet. Use the Contact form below to send an inquiry!</p>
              </div>
            );
          } else {
            response = (
              <div className="space-y-2 text-xs">
                <p className="text-emerald-400 font-semibold">📥 Stored Messages ({storedMsgs.length}):</p>
                {storedMsgs.slice(0, 5).map((m: any, idx: number) => (
                  <div key={idx} className="p-2 rounded bg-neutral-900 border border-neutral-800 space-y-0.5">
                    <div className="flex justify-between text-[11px] text-neutral-400">
                      <strong className="text-neutral-200">{m.name}</strong> ({m.email})
                      <span className="font-mono text-[10px]">{m.timestamp}</span>
                    </div>
                    <p className="text-neutral-300 font-medium">{m.subject}</p>
                    <p className="text-neutral-400 italic">"{m.message}"</p>
                  </div>
                ))}
              </div>
            );
          }
        } catch (e) {
          response = 'Unable to load messages from local storage.';
        }
        break;

      case 'hire':
      case 'sudo hire':
        onOpenContact();
        response = '🎉 Thank you! Opening the contact drawer to begin our conversation.';
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInputCommand('');
        return;

      default:
        response = `Command not recognized: "${trimmed}". Type 'help' to see valid commands.`;
        break;
    }

    setHistory((prev) => [...prev, { command: cmdText, output: response }]);
    setInputCommand('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputCommand);
    }
  };

  const configJson = JSON.stringify(
    {
      developer: {
        name: PORTFOLIO_DATA.personal.name,
        role: PORTFOLIO_DATA.personal.role,
        experience: PORTFOLIO_DATA.personal.yearsOfExperience,
        location: PORTFOLIO_DATA.personal.location,
        status: "Open to Full-Time & Freelance Roles",
        primaryStack: ["React", "Next.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
        metrics: {
          websitesDelivered: "20+",
          apiLatencyReduction: "40%",
          ciCdEfficiencyBoost: "60%",
          mobileTrafficGrowth: "35%"
        },
        contact: {
          email: PORTFOLIO_DATA.personal.email,
          phone: PORTFOLIO_DATA.personal.phoneInternational,
          domain: PORTFOLIO_DATA.personal.customDomain
        }
      }
    },
    null,
    2
  );

  const copyConfig = () => {
    navigator.clipboard.writeText(configJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Terminal Window Container */}
        <div className="rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden font-mono text-sm">
          
          {/* Header Bar */}
          <div className="bg-neutral-900/90 px-4 py-3 border-b border-neutral-800 flex items-center justify-between flex-wrap gap-2">
            
            {/* Window Controls */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs text-neutral-400 ml-2 hidden sm:inline-block">
                gaurav@portfolio: ~
              </span>
            </div>

            {/* Tab Switcher */}
            <div className="flex items-center gap-1 bg-neutral-950/80 p-1 rounded-lg border border-neutral-800">
              <button
                onClick={() => setActiveTab('terminal')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-all ${
                  activeTab === 'terminal'
                    ? 'bg-emerald-600 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>terminal.sh</span>
              </button>

              <button
                onClick={() => setActiveTab('config')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-all ${
                  activeTab === 'config'
                    ? 'bg-emerald-600 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>profile.json</span>
              </button>

              <button
                onClick={() => setActiveTab('impact')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-all ${
                  activeTab === 'impact'
                    ? 'bg-emerald-600 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>impact.log</span>
              </button>
            </div>

            {/* Copy button for config */}
            {activeTab === 'config' && (
              <button
                onClick={copyConfig}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy JSON'}</span>
              </button>
            )}
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-6 min-h-[320px] max-h-[460px] overflow-y-auto bg-neutral-950/95 text-neutral-300">
            
            {/* Terminal Tab */}
            {activeTab === 'terminal' && (
              <div className="space-y-4">
                <div className="text-neutral-400 text-xs pb-2 border-b border-neutral-900 flex items-center justify-between">
                  <span>Welcome to Gaurav Soni's interactive shell. Type <span className="text-emerald-400 font-bold">help</span> or click command tags below:</span>
                  <button
                    onClick={() => setHistory([])}
                    className="text-neutral-400 hover:text-neutral-300 flex items-center gap-1"
                    title="Clear history"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                </div>

                {/* Quick Command Chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {['skills', 'projects', 'experience', 'education', 'contact', 'resume', 'hire'].map((cmd) => (
                    <button
                      key={cmd}
                      onClick={() => handleCommand(cmd)}
                      className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 hover:text-emerald-300 text-neutral-400 text-xs transition-colors flex items-center gap-1"
                    >
                      <Play className="w-2.5 h-2.5 text-emerald-400" />
                      <span>{cmd}</span>
                    </button>
                  ))}
                </div>

                {/* Terminal History */}
                <div className="space-y-3 pt-2">
                  {history.map((item, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center gap-2 text-neutral-400">
                        <span className="text-emerald-400 font-bold">➜</span>
                        <span className="text-cyan-400">gaurav@portfolio:~$</span>
                        <span className="text-neutral-100 font-semibold">{item.command}</span>
                      </div>
                      <div className="pl-6 text-neutral-300">
                        {item.output}
                      </div>
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>

                {/* Command Input Prompt */}
                <div className="flex items-center gap-2 pt-3 border-t border-neutral-900">
                  <span className="text-emerald-400 font-bold">➜</span>
                  <span className="text-cyan-400 hidden sm:inline">gaurav@portfolio:~$</span>
                  <input
                    type="text"
                    value={inputCommand}
                    onChange={(e) => setInputCommand(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="type a command (e.g. skills, projects, contact, hire)..."
                    className="flex-1 bg-transparent border-none outline-none text-neutral-100 placeholder-neutral-400 text-sm focus:ring-0"
                    autoFocus
                  />
                  <button
                    onClick={() => handleCommand(inputCommand)}
                    className="p-1.5 rounded bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-400 transition-colors"
                  >
                    <CornerDownLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Config JSON Tab */}
            {activeTab === 'config' && (
              <pre className="text-xs text-neutral-300 leading-relaxed overflow-x-auto whitespace-pre font-mono">
                {configJson}
              </pre>
            )}

            {/* Impact Log Tab */}
            {activeTab === 'impact' && (
              <div className="space-y-4 text-xs font-mono">
                <div className="text-emerald-400 font-bold flex items-center gap-2 border-b border-neutral-900 pb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>PRODUCTION BENCHMARKS & METRICS (PEOPLE-PER-HOUR)</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
                    <p className="text-emerald-300 font-semibold">[DEPLOYMENT IMPACT] 20+ Dynamic Web Applications</p>
                    <p className="text-neutral-400 mt-1">Built with React.js & Node.js resulting in verified +30% improvement in user interaction and client retention.</p>
                  </div>

                  <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
                    <p className="text-cyan-300 font-semibold">[LATENCY OPTIMIZATION] -40% API Data Load Time</p>
                    <p className="text-neutral-400 mt-1">Overhauled RESTful API payload structures and Node.js route logic to optimize client fetching times.</p>
                  </div>

                  <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
                    <p className="text-emerald-300 font-semibold">[CI/CD WORKFLOW] -60% Manual Deployment Time</p>
                    <p className="text-neutral-400 mt-1">Configured automated test and build verification pipelines for continuous releases.</p>
                  </div>

                  <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
                    <p className="text-purple-300 font-semibold">[MOBILE ARCHITECTURE] +35% Mobile Traffic Expansion</p>
                    <p className="text-neutral-400 mt-1">Refactored layout systems for fluid responsive viewport adjustments across all modern devices.</p>
                  </div>

                  <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
                    <p className="text-amber-300 font-semibold">[MODERNIZATION] -20% Ongoing Maintenance Costs</p>
                    <p className="text-neutral-400 mt-1">Migrated legacy codebases to Next.js / modern React component architectures.</p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
