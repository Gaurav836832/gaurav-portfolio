import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InteractiveTerminal from './components/InteractiveTerminal';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import ResumeSection from './components/ResumeSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import DomainModal from './components/DomainModal';
import ProjectModals from './components/ProjectModals';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isDomainModalOpen, setIsDomainModalOpen] = useState(false);
  const [activeProjectDemo, setActiveProjectDemo] = useState<'chai' | 'todo' | 'restaurant' | 'spotify' | null>(null);

  const handleOpenContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Top Navbar */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenDomainModal={() => setIsDomainModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={handleOpenContact}
        />

        {/* Interactive Developer Terminal / Config Explorer */}
        <InteractiveTerminal
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={handleOpenContact}
        />

        {/* Work Experience Section */}
        <Experience />

        {/* Featured Projects with Interactive Simulators */}
        <Projects
          onOpenProjectDemo={(type) => setActiveProjectDemo(type)}
        />

        {/* Skills & Technical Competencies */}
        <Skills />

        {/* Education & Coding Ninjas Training */}
        <Education />

        {/* Official Curriculum Vitae (PDF) Section */}
        <ResumeSection
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Contact & Custom Domain Setup */}
        <ContactSection
          onOpenDomainModal={() => setIsDomainModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenDomainModal={() => setIsDomainModalOpen(true)}
      />

      {/* Interactive Printable Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Custom Domain (portfolio.gauravsoni.dev) Guide Modal */}
      <DomainModal
        isOpen={isDomainModalOpen}
        onClose={() => setIsDomainModalOpen(false)}
      />

      {/* Project Interactive Simulation Modals */}
      <ProjectModals
        isOpen={activeProjectDemo !== null}
        type={activeProjectDemo}
        onClose={() => setActiveProjectDemo(null)}
      />
    </div>
  );
}
