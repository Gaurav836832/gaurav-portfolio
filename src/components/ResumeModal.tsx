import { useState, useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Copy, 
  Check, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Github,
  Linkedin,
  FileText,
  Globe,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Share2
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [pageView, setPageView] = useState<'all' | 'page1' | 'page2'>('all');
  const [themeMode, setThemeMode] = useState<'paper' | 'dark'>('paper');
  const documentRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShareLink = () => {
    const url = window.location.origin + '#resume';
    navigator.clipboard.writeText(url);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handleCopyText = () => {
    const text = `
GAURAV SONI
Full Stack Developer — 2+ Years
New Delhi, Delhi | 08851415479 | gsoni7424@gmail.com | LinkedIn: https://linkedin.com | Github: https://github.com/gsoni7424 | Portfolio: https://portfolio.gauravsoni.dev

PROFILE SUMMARY:
Full-Stack Developer with 3+ years of experience in building scalable and high-performing web applications. aiming to specialize in React and Node.js Full-stack development

EXPERIENCE:
People-Per-Hour (Freelancer Platform)                     August 2025
Full-Stack Developer                                      Remote-Job
• Developed and maintained 20+ dynamic websites using React and Node.js, increasing client engagement by 30%.
• Integrated and optimized RESTful APIs using React.js and Node.js, reducing overall data load time by 40%
• Streamlined deployment by introducing CI/CD automation, improving release efficiency and reducing manual deployment time by 60%.
• Enhanced user experience by designing responsive UIs, boosting mobile traffic by 35%
• Migrated legacy systems to modern React/Next.js frameworks, reducing maintenance costs by 20%.

PROJECTS:
1. Get-Me-A-Chai | GitHub | Next.js, Exprss.js, MongoDB, Razorpay-Integration | September 2025
• Developed a crowdfunding platform inspired by Patreon, allowing creators to receive financial support ("buy a chai") from their audience.
• Integrated RESTful APIs to manage transactions, user profiles, and campaign data efficiently.
• Implemented secure authentication with NextAuth.js.,dynamic form handling using iForm
• Implemented secure authentication, real-time payment handling, and dynamic user dashboards for both creators and supporters.
• Implemented CRUD functionality for user and review management.

2. Todo-List WebApp | GitHub | View | Vite+React.js, Tailwind CSS, MongoDB | September 2025
• Built a responsive To-Do List web app using React.js with the Vite build tool for fast development and optimized performance.
• Implemented CRUD operations to add, update, and delete tasks, with all todos stored securely in MongoDB.
• Utilized Tailwind CSS to design a clean, modern, and fully responsive UI experience.
• Focused on smooth user experience with efficient state management and real-time task updates.

3. Restaurant-Order-Booking-Website | View | HTML, CSS, Javascript | October 2025
• Developed a responsive restaurant order booking website using HTML, CSS, and JavaScript, ensuring seamless usability across all devices.
• Designed an interactive menu system allowing users to browse and add food items to the cart dynamically.
• Implemented a cart functionality where users can view, update, and remove selected items before checkout.
• Integrated a "Proceed to Payment" feature that redirects users to a dedicated payment page for order completion.
• Added a table booking option enabling customers to reserve seats conveniently through an interactive form.

4. Spotify-Clone(Music-Player) | GitHub | View | HTML, CSS, JavaScript | November 2025
• Built a Spotify Clone web app using HTML, CSS, and JavaScript, replicating the core functionality of a music streaming platform.
• Integrated play, pause, and next song controls, offering users an engaging and interactive playback experience.
• Fetched and managed songs using JavaScript APIs and local storage to enable quick loading and offline playback.
• Implemented dynamic song rendering and active track highlighting for a realistic player interface.
• Focused on delivering a Spotify-like user experience, combining clean visuals with smooth functionality

TECHNICAL SKILLS:
Programming Languages: HTML/CSS, JavaScript
Databases: MongoDB, Local-Storage
Developer Tools: VS Code
Frameworks: Node.js, Express, Git, React.js
Core Competencies: OOPS
Soft Skills: Communication, teamwork

EDUCATION:
Zakir Hussain Delhi College (Percentage: 7.6 CGP)         2020 – 2023
Bachelor of Arts(Program)                                 Delhi

TRAININGS:
Coding Ninjas                                             May 2025 – October 2025
Full Stack Web Development
• Backend | Frontend | Data Structure |
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-hidden animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Print styles to ensure only the resume pages print cleanly */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-resume-container, #printable-resume-container * {
            visibility: visible !important;
          }
          #printable-resume-container {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            color: black !important;
          }
          .resume-page-sheet {
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            padding: 20mm !important;
            page-break-after: always !important;
            break-after: page !important;
          }
        }
      `}</style>

      <div 
        className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* PDF Reader Toolbar */}
        <div className="px-4 py-3 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between flex-wrap gap-2 text-xs font-mono select-none">
          
          {/* File Name & Document Status */}
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-neutral-200">Gaurav_Soni_Resume.pdf</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] bg-neutral-800 text-neutral-400 font-sans">
                  2 Pages
                </span>
              </div>
              <span className="text-[10px] text-neutral-500 hidden sm:inline">
                Verified Full-Stack Engineer Profile
              </span>
            </div>
          </div>

          {/* Center: Page Selection & View Controls */}
          <div className="flex items-center gap-1.5 bg-neutral-900 px-2 py-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => setPageView('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                pageView === 'all' ? 'bg-emerald-600 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Pages
            </button>
            <button
              onClick={() => setPageView('page1')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                pageView === 'page1' ? 'bg-emerald-600 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Page 1
            </button>
            <button
              onClick={() => setPageView('page2')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                pageView === 'page2' ? 'bg-emerald-600 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Page 2
            </button>

            {/* Zoom Controls */}
            <div className="h-4 w-px bg-neutral-700 mx-1 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-1">
              <button
                onClick={() => setZoomLevel((z) => Math.max(75, z - 10))}
                className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] text-neutral-300 w-9 text-center">
                {zoomLevel}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
                className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel(100)}
                className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            {/* Theme toggle: Paper white vs Dark */}
            <button
              onClick={() => setThemeMode(themeMode === 'paper' ? 'dark' : 'paper')}
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
              title={themeMode === 'paper' ? 'Switch to Dark Mode' : 'Switch to Paper View'}
            >
              {themeMode === 'paper' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
            </button>

            {/* Copy Text */}
            <button
              onClick={handleCopyText}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs transition-colors"
              title="Copy plain text formatted"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            {/* Print or Save as PDF */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs transition-all shadow-md active:scale-95"
              title="Print to printer or save as vector PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable PDF Document Canvas */}
        <div 
          ref={documentRef}
          className="flex-1 overflow-y-auto p-4 sm:p-8 bg-neutral-950/90 flex flex-col items-center gap-8 selection:bg-sky-200 selection:text-neutral-900"
        >
          <div 
            id="printable-resume-container"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="transition-transform duration-150 flex flex-col gap-8 w-full max-w-[820px]"
          >
            {/* ========================================================================= */}
            {/* PAGE 1                                                                    */}
            {/* ========================================================================= */}
            {(pageView === 'all' || pageView === 'page1') && (
              <div 
                className={`resume-page-sheet relative w-full rounded-sm p-8 sm:p-12 shadow-2xl transition-colors font-serif ${
                  themeMode === 'paper' 
                    ? 'bg-white text-[#111827] border border-neutral-200' 
                    : 'bg-neutral-900 text-neutral-100 border border-neutral-800'
                }`}
              >
                {/* Page Number Indicator Tag */}
                <div className="absolute top-3 right-4 font-sans text-[10px] text-neutral-400 print:hidden font-mono">
                  Page 1 of 2
                </div>

                {/* Header: Name, Title, Contact Line */}
                <div className="text-center space-y-1 pb-2">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-normal uppercase font-serif">
                    Gaurav Soni
                  </h1>
                  <p className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Full Stack Developer — 2+ Years
                  </p>
                  
                  {/* Contact Line matching the exact OCR & screenshot */}
                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-neutral-700 dark:text-neutral-300 pt-1 font-sans">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-neutral-600 dark:text-neutral-400" />
                      <span>New Delhi, Delhi</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-neutral-600 dark:text-neutral-400" />
                      <a href="tel:08851415479" className="hover:underline">08851415479</a>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-neutral-600 dark:text-neutral-400" />
                      <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="hover:underline text-sky-700 dark:text-sky-400">
                        gsoni7424@gmail.com
                      </a>
                    </span>
                    <span>•</span>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-sky-700 dark:text-sky-400 hover:underline flex items-center gap-0.5"
                    >
                      <Linkedin className="w-3 h-3" />
                      <span>LinkedIn</span>
                    </a>
                    <span>•</span>
                    <a 
                      href="https://github.com/gsoni7424" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-sky-700 dark:text-sky-400 hover:underline flex items-center gap-0.5"
                    >
                      <Github className="w-3 h-3" />
                      <span>Github</span>
                    </a>
                    <span>•</span>
                    <a 
                      href={PORTFOLIO_DATA.personal.portfolioUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-sky-700 dark:text-sky-400 hover:underline flex items-center gap-0.5"
                    >
                      <Globe className="w-3 h-3" />
                      <span>Portfolio</span>
                    </a>
                  </div>
                </div>

                {/* Section: Profile Summary */}
                <div className="mt-4 space-y-1">
                  <h2 className="text-sm font-bold uppercase tracking-wide border-b border-neutral-900 dark:border-neutral-300 pb-0.5">
                    Profile Summary
                  </h2>
                  <p className="text-xs leading-relaxed text-neutral-800 dark:text-neutral-200">
                    Full-Stack Developer with 3+ years of experience in building scalable and high-performing web applications. aiming to specialize in <strong>React and Node.js</strong> Full-stack development
                  </p>
                </div>

                {/* Section: Experience */}
                <div className="mt-4 space-y-2">
                  <h2 className="text-sm font-bold uppercase tracking-wide border-b border-neutral-900 dark:border-neutral-300 pb-0.5">
                    Experience
                  </h2>

                  <div>
                    <div className="flex justify-between items-baseline text-xs">
                      <div>
                        <strong className="text-sky-800 dark:text-sky-400">People-Per-Hour</strong>{' '}
                        <span className="text-neutral-700 dark:text-neutral-300 italic">(Freelancer Platform)</span>
                      </div>
                      <span className="font-bold text-neutral-900 dark:text-neutral-100">August 2025</span>
                    </div>
                    <div className="flex justify-between items-baseline text-[11px] text-neutral-700 dark:text-neutral-300 italic mb-1">
                      <span>Full-Stack Developer</span>
                      <span>Remote-Job</span>
                    </div>
                    <ul className="list-disc ml-5 space-y-1 text-xs text-neutral-800 dark:text-neutral-200 leading-normal">
                      <li>
                        Developed and maintained <strong>20+ dynamic websites</strong> using <strong>React and Node.js</strong>, increasing client engagement by 30%.
                      </li>
                      <li>
                        Integrated and optimized <strong>RESTful APIs</strong> using React.js and Node.js, reducing overall data load time by 40%
                      </li>
                      <li>
                        Streamlined deployment by introducing <strong>CI/CD automation</strong>, improving release efficiency and reducing manual deployment time by 60%.
                      </li>
                      <li>
                        Enhanced user experience by designing <strong>responsive UIs</strong>, boosting mobile traffic by 35%
                      </li>
                      <li>
                        Migrated legacy systems to modern <strong>React/Next.js frameworks</strong>, reducing maintenance costs by <strong>20%</strong>.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Section: Projects */}
                <div className="mt-4 space-y-3">
                  <h2 className="text-sm font-bold uppercase tracking-wide border-b border-neutral-900 dark:border-neutral-300 pb-0.5">
                    Projects
                  </h2>

                  {/* 1. Get-Me-A-Chai */}
                  <div className="space-y-0.5">
                    <div className="flex justify-between items-baseline text-xs">
                      <div className="flex items-center flex-wrap gap-1 font-bold">
                        <span>Get-Me-A-Chai</span>
                        <span>|</span>
                        <a 
                          href="https://github.com/gsoni7424/get-me-a-chai" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-sky-700 dark:text-sky-400 underline font-normal"
                        >
                          GitHub
                        </a>
                        <span>|</span>
                        <span className="font-normal italic text-neutral-700 dark:text-neutral-300">
                          Next.js, Exprss.js, MongoDB, Razorpay-Integration
                        </span>
                      </div>
                      <span className="font-bold text-neutral-900 dark:text-neutral-100 shrink-0 ml-2">
                        September 2025
                      </span>
                    </div>
                    <ul className="list-disc ml-5 space-y-0.5 text-xs text-neutral-800 dark:text-neutral-200 leading-normal">
                      <li>
                        Developed a crowdfunding platform inspired by Patreon, allowing creators to receive financial support (“buy a chai”) from their audience.
                      </li>
                      <li>
                        Integrated <strong>RESTful APIs</strong> to manage transactions, user profiles, and campaign data efficiently.
                      </li>
                      <li>
                        Implemented secure authentication with <strong>NextAuth.js.</strong>,dynamic form handling using <strong>iForm</strong>
                      </li>
                      <li>
                        Implemented secure authentication, real-time payment handling, and dynamic user dashboards for both creators and supporters.
                      </li>
                      <li>
                        Implemented <strong>CRUD functionality</strong> for user and review management.
                      </li>
                    </ul>
                  </div>

                  {/* 2. Todo-List WebApp */}
                  <div className="space-y-0.5">
                    <div className="flex justify-between items-baseline text-xs">
                      <div className="flex items-center flex-wrap gap-1 font-bold">
                        <span>Todo-List WebApp</span>
                        <span>|</span>
                        <a 
                          href="https://github.com/gsoni7424/todo-list-webapp" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-sky-700 dark:text-sky-400 underline font-normal"
                        >
                          GitHub
                        </a>
                        <span>|</span>
                        <a 
                          href="https://todo-list-1-8web.onrender.com/" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-sky-700 dark:text-sky-400 underline font-normal"
                        >
                          View
                        </a>
                        <span>|</span>
                        <span className="font-normal italic text-neutral-700 dark:text-neutral-300">
                          Vite+React.js,Tailwind CSS, MongoDB
                        </span>
                      </div>
                      <span className="font-bold text-neutral-900 dark:text-neutral-100 shrink-0 ml-2">
                        September 2025
                      </span>
                    </div>
                    <ul className="list-disc ml-5 space-y-0.5 text-xs text-neutral-800 dark:text-neutral-200 leading-normal">
                      <li>
                        Built a responsive <strong>To-Do List web app</strong> using <strong>React.js</strong> with the Vite build tool for fast development and optimized performance.
                      </li>
                      <li>
                        Implemented <strong>CRUD operations</strong> to add, update, and delete tasks, with all todos stored securely in <strong>MongoDB</strong>.
                      </li>
                      <li>
                        Utilized <strong>Tailwind CSS</strong> to design a clean, modern, and fully responsive UI experience.
                      </li>
                      <li>
                        Focused on smooth user experience with efficient state management and real-time task updates.
                      </li>
                    </ul>
                  </div>

                  {/* 3. Restaurant-Order-Booking-Website */}
                  <div className="space-y-0.5">
                    <div className="flex justify-between items-baseline text-xs">
                      <div className="flex items-center flex-wrap gap-1 font-bold">
                        <span>Restaurant-Order-Booking-Website</span>
                        <span>|</span>
                        <a 
                          href="https://restaurent-order-booking.netlify.app" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-sky-700 dark:text-sky-400 underline font-normal"
                        >
                          View
                        </a>
                        <span>|</span>
                        <span className="font-normal italic text-neutral-700 dark:text-neutral-300">
                          HTML, CSS, Javascript
                        </span>
                      </div>
                      <span className="font-bold text-neutral-900 dark:text-neutral-100 shrink-0 ml-2">
                        October 2025
                      </span>
                    </div>
                    <ul className="list-disc ml-5 space-y-0.5 text-xs text-neutral-800 dark:text-neutral-200 leading-normal">
                      <li>
                        Developed a responsive restaurant order booking website using <strong>HTML, CSS, and JavaScript</strong>, ensuring seamless usability across all devices.
                      </li>
                      <li>
                        Designed an <strong>interactive menu system</strong> allowing users to browse and add food items to the cart dynamically.
                      </li>
                      <li>
                        Implemented a <strong>cart functionality</strong> where users can view, update, and remove selected items before checkout.
                      </li>
                      <li>
                        Integrated a <strong>“Proceed to Payment”</strong> feature that redirects users to a dedicated payment page for order completion.
                      </li>
                      <li>
                        Added a <strong>table booking option</strong> enabling customers to reserve seats conveniently through an interactive form.
                      </li>
                    </ul>
                  </div>

                  {/* 4. Spotify-Clone */}
                  <div className="space-y-0.5">
                    <div className="flex justify-between items-baseline text-xs">
                      <div className="flex items-center flex-wrap gap-1 font-bold">
                        <span>Spotify-Clone(Music-Player)</span>
                        <span>|</span>
                        <a 
                          href="https://github.com/gsoni7424/spotify-clone" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-sky-700 dark:text-sky-400 underline font-normal"
                        >
                          GitHub
                        </a>
                        <span>|</span>
                        <a 
                          href="https://spotify-clone-mus.netlify.app" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-sky-700 dark:text-sky-400 underline font-normal"
                        >
                          View
                        </a>
                        <span>|</span>
                        <span className="font-normal italic text-neutral-700 dark:text-neutral-300">
                          HTML, CSS, JavaScript
                        </span>
                      </div>
                      <span className="font-bold text-neutral-900 dark:text-neutral-100 shrink-0 ml-2">
                        November 2025
                      </span>
                    </div>
                    <ul className="list-disc ml-5 space-y-0.5 text-xs text-neutral-800 dark:text-neutral-200 leading-normal">
                      <li>
                        Built a Spotify Clone web app using <strong>HTML, CSS, and JavaScript</strong>, replicating the core functionality of a music streaming platform.
                      </li>
                      <li>
                        Integrated play, pause, and next song controls, offering users an engaging and interactive playback experience.
                      </li>
                      <li>
                        Fetched and managed songs using <strong>JavaScript APIs</strong> and <strong>local storage</strong> to enable quick loading and offline playback.
                      </li>
                      <li>
                        Implemented dynamic song rendering and active track highlighting for a realistic player interface.
                      </li>
                      <li>
                        Focused on delivering a Spotify-like user experience, combining clean visuals with smooth functionality
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Section: Technical Skills */}
                <div className="mt-4 space-y-1">
                  <h2 className="text-sm font-bold uppercase tracking-wide border-b border-neutral-900 dark:border-neutral-300 pb-0.5">
                    Technical Skills
                  </h2>
                  <div className="space-y-0.5 text-xs text-neutral-800 dark:text-neutral-200">
                    <p><strong>Programming Languages:</strong> HTML/CSS, JavaScript</p>
                    <p><strong>Databases:</strong> MongoDB,Local-Storage</p>
                    <p><strong>Developer Tools:</strong> VS Code</p>
                    <p><strong>Frameworks:</strong> Node.js, Express, Git, React.js</p>
                    <p><strong>Core Competencies:</strong> OOPS</p>
                    <p><strong>Soft Skills:</strong> Communication, teamwork</p>
                  </div>
                </div>

              </div>
            )}

            {/* ========================================================================= */}
            {/* PAGE 2                                                                    */}
            {/* ========================================================================= */}
            {(pageView === 'all' || pageView === 'page2') && (
              <div 
                className={`resume-page-sheet relative w-full rounded-sm p-8 sm:p-12 shadow-2xl transition-colors font-serif min-h-[580px] ${
                  themeMode === 'paper' 
                    ? 'bg-white text-[#111827] border border-neutral-200' 
                    : 'bg-neutral-900 text-neutral-100 border border-neutral-800'
                }`}
              >
                {/* Page Number Indicator Tag */}
                <div className="absolute top-3 right-4 font-sans text-[10px] text-neutral-400 print:hidden font-mono">
                  Page 2 of 2
                </div>

                {/* Education Section */}
                <div className="space-y-2">
                  <h2 className="text-sm font-bold uppercase tracking-wide border-b border-neutral-900 dark:border-neutral-300 pb-0.5">
                    Education
                  </h2>

                  <div>
                    <div className="flex justify-between items-baseline text-xs font-bold text-neutral-900 dark:text-neutral-100">
                      <span>Zakir Hussain Delhi College (Percentage: 7.6 CGP)</span>
                      <span>2020 – 2023</span>
                    </div>
                    <div className="flex justify-between items-baseline text-xs text-neutral-700 dark:text-neutral-300 italic">
                      <span>Bachelor of Arts(Program)</span>
                      <span>Delhi</span>
                    </div>
                  </div>
                </div>

                {/* Trainings Section */}
                <div className="mt-6 space-y-2">
                  <h2 className="text-sm font-bold uppercase tracking-wide border-b border-neutral-900 dark:border-neutral-300 pb-0.5">
                    Trainings
                  </h2>

                  <div>
                    <div className="flex justify-between items-baseline text-xs font-bold text-neutral-900 dark:text-neutral-100">
                      <span>Coding Ninjas</span>
                      <span>May 2025 – October 2025</span>
                    </div>
                    <div className="text-xs text-neutral-700 dark:text-neutral-300 italic mb-1">
                      Full Stack Web Development
                    </div>
                    <ul className="list-disc ml-5 text-xs text-neutral-800 dark:text-neutral-200">
                      <li>
                        <span className="text-sky-700 dark:text-sky-400 font-semibold">Backend</span> |{' '}
                        <span className="text-sky-700 dark:text-sky-400 font-semibold">Frontend</span> |{' '}
                        <span className="text-sky-700 dark:text-sky-400 font-semibold">Data Structure</span> |
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Status Bar */}
        <div className="px-4 py-2.5 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="hidden sm:inline">Official 2-Page Resume • Contact: gsoni7424@gmail.com</span>
            <span className="sm:hidden">gsoni7424@gmail.com</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShareLink}
              className="flex items-center gap-1 text-neutral-400 hover:text-emerald-400 transition-colors"
            >
              {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedShare ? 'Link Copied' : 'Share'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="text-emerald-400 hover:text-emerald-300 font-semibold underline flex items-center gap-1"
            >
              <span>Download / Print</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
