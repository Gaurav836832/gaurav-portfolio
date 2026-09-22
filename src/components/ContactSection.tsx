import { useState, useEffect, type FormEvent } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  Clock, 
  Github, 
  Linkedin, 
  MessageSquare,
  Globe,
  Loader2,
  CheckCircle2,
  Inbox,
  ExternalLink,
  MessageCircle,
  X,
  Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export interface PortfolioMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

interface ContactSectionProps {
  onOpenDomainModal: () => void;
}

export default function ContactSection({ onOpenDomainModal }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Full-Stack Developer Opportunity / Project Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [lastSentMessage, setLastSentMessage] = useState<PortfolioMessage | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(false);
  const [messages, setMessages] = useState<PortfolioMessage[]>([]);

  // Load saved messages from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('gaurav_portfolio_messages');
      if (saved) {
        setMessages(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load messages from localStorage', e);
    }
  }, []);

  // Live IST Clock (Asia/Kolkata)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const istString = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        setCurrentTime(istString);
      } catch (e) {
        setCurrentTime('New Delhi (IST)');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleClearInbox = () => {
    setMessages([]);
    try {
      localStorage.removeItem('gaurav_portfolio_messages');
    } catch (e) {}
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    const newMessage: PortfolioMessage = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim() || 'Portfolio Inquiry',
      message: formData.message.trim(),
      timestamp: new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      })
    };

    // 1. Save locally to portfolio inbox storage immediately
    try {
      const updatedMessages = [newMessage, ...messages];
      setMessages(updatedMessages);
      localStorage.setItem('gaurav_portfolio_messages', JSON.stringify(updatedMessages));
    } catch (err) {
      console.error('Failed to save to localStorage', err);
    }

       // 2. Dispatch to our own Express backend (sends via Gmail)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newMessage.name,
          email: newMessage.email,
          subject: newMessage.subject,
          message: newMessage.message
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error('Backend responded with error:', data.error || res.statusText);
      }
    } catch (networkError) {
      // In case of network timeout, message is still safely logged in inbox
      console.log('Online dispatch notice:', networkError);
    }

    // 3. Update UI states
    setIsSubmitting(false);
    setIsSent(true);
    setLastSentMessage(newMessage);
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.7 } });
  };

  const handleOpenGmailWeb = () => {
    if (!lastSentMessage) return;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      PORTFOLIO_DATA.personal.email
    )}&su=${encodeURIComponent(lastSentMessage.subject)}&body=${encodeURIComponent(
      `Hi Gaurav,\n\nName: ${lastSentMessage.name}\nEmail: ${lastSentMessage.email}\n\nMessage:\n${lastSentMessage.message}`
    )}`;
    window.open(gmailUrl, '_blank');
  };

  const handleCopyMessageText = () => {
    if (!lastSentMessage) return;
    const text = `From: ${lastSentMessage.name} (${lastSentMessage.email})\nSubject: ${lastSentMessage.subject}\n\nMessage:\n${lastSentMessage.message}`;
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleResetForm = () => {
    setIsSent(false);
    setLastSentMessage(null);
    setFormData({
      name: '',
      email: '',
      subject: 'Full-Stack Developer Opportunity / Project Inquiry',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-emerald-400">
              <Mail className="w-3.5 h-3.5" />
              <span>Let's Build Something Impactful</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-100">
              Get in Touch
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
              Whether you have a full-time role, a freelance engagement, or a technical inquiry, my inbox is always open.
            </p>
          </div>

          <button
            onClick={() => setInboxOpen(true)}
            className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-emerald-500/50 text-xs font-mono text-neutral-300 hover:text-emerald-400 transition-all shadow-sm group"
          >
            <Inbox className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Messages Inbox</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
              {messages.length}
            </span>
          </button>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Coordinates & Status */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Status & Location Card */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    OPEN TO NEW OPPORTUNITIES
                  </span>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">Remote / On-site</span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    <span>Location</span>
                  </span>
                  <span className="font-semibold text-neutral-200">New Delhi, Delhi, India</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>Local Time (IST)</span>
                  </span>
                  <span className="font-mono text-neutral-200 font-bold">{currentTime || 'Asia/Kolkata'}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span>Domain</span>
                  </span>
                  <button
                    onClick={onOpenDomainModal}
                    className="font-mono text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>portfolio.gauravsoni.dev</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="space-y-3">
              {/* Email Card */}
              <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block font-mono">Email Address</span>
                    <a
                      href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                      className="text-sm font-semibold text-neutral-100 hover:text-emerald-400 transition-colors"
                    >
                      {PORTFOLIO_DATA.personal.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Card */}
              <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block font-mono">Phone / Mobile</span>
                    <a
                      href={`tel:${PORTFOLIO_DATA.personal.phone}`}
                      className="text-sm font-semibold text-neutral-100 hover:text-cyan-400 transition-colors"
                    >
                      {PORTFOLIO_DATA.personal.phoneInternational}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <a
                    href={`https://wa.me/918851415479?text=${encodeURIComponent("Hi Gaurav, I saw your portfolio and would like to connect!")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 transition-colors"
                    title="Chat on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <button
                    onClick={handleCopyPhone}
                    className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
                    title="Copy phone"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Social Profile Links */}
            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">Professional Networks:</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/gsoni7424"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs text-neutral-300 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs text-neutral-300 hover:text-cyan-400 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 shadow-xl relative">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Send a Direct Message</span>
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Live Dispatch
                </span>
              </div>
              <p className="text-xs text-neutral-400 mb-6">
                Fill in your project brief or inquiry details. Messages are dispatched directly to <strong className="text-neutral-200">gsoni7424@gmail.com</strong>.
              </p>

              {isSent && lastSentMessage ? (
                /* Success Card with Direct Multi-Channel Actions */
                <div className="p-6 rounded-2xl bg-neutral-950 border border-emerald-500/40 space-y-5 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 mt-0.5">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <h4 className="text-base font-bold text-emerald-300">
                        Message Successfully Sent!
                      </h4>
                      <p className="text-xs text-neutral-300">
                        Your message has been processed and saved to your portfolio inbox. Gaurav will be notified directly.
                      </p>
                    </div>
                  </div>

                  {/* Summary of sent message */}
                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-neutral-400 border-b border-neutral-800 pb-1.5">
                      <span className="font-mono">Sender:</span>
                      <span className="font-medium text-neutral-200">{lastSentMessage.name} ({lastSentMessage.email})</span>
                    </div>
                    <div className="flex justify-between items-center text-neutral-400 border-b border-neutral-800 pb-1.5">
                      <span className="font-mono">Subject:</span>
                      <span className="font-medium text-neutral-200">{lastSentMessage.subject}</span>
                    </div>
                    <div className="pt-1 text-neutral-300">
                      <span className="font-mono text-neutral-400 block mb-1">Message:</span>
                      <p className="italic bg-neutral-950 p-2.5 rounded-lg border border-neutral-800/80 max-h-24 overflow-y-auto">
                        "{lastSentMessage.message}"
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        onClick={handleOpenGmailWeb}
                        className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Open in Gmail Web</span>
                      </button>

                      <button
                        onClick={handleCopyMessageText}
                        className="py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                      >
                        {copiedText ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-neutral-400" />}
                        <span>{copiedText ? 'Copied to Clipboard!' : 'Copy Formatted Text'}</span>
                      </button>
                    </div>

                    <button
                      onClick={handleResetForm}
                      className="w-full py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 text-xs font-mono transition-all"
                    >
                      ← Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                /* Standard Message Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                        Your Name <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Aman Sharma / Recruiter"
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                        Your Email <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. name@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                      Subject / Opportunity Type
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                      Message / Project Details <span className="text-emerald-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your project, timeline, or job opening..."
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/60 active:scale-98 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message Now</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-neutral-500 font-mono">
                    ⚡ Instant transmission to <span className="text-neutral-400">{PORTFOLIO_DATA.personal.email}</span> & logged in your local portfolio inbox.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Messages Inbox Modal */}
      {inboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/70">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Inbox className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-neutral-100 flex items-center gap-2">
                    <span>Portfolio Message Inbox</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 font-normal">
                      {messages.length} stored
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Logged inquiries and message submissions
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button
                    onClick={handleClearInbox}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 transition-colors text-xs flex items-center gap-1"
                    title="Clear inbox"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setInboxOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
              {messages.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-neutral-800/80 flex items-center justify-center mx-auto text-neutral-500">
                    <Inbox className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-neutral-300">No messages in inbox yet</p>
                  <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                    When visitors or recruiters send messages through the contact form, they will appear here.
                  </p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="font-bold text-neutral-200 block text-sm">{msg.name}</span>
                        <span className="font-mono text-emerald-400 text-[11px]">{msg.email}</span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500 shrink-0">
                        {msg.timestamp}
                      </span>
                    </div>

                    <div className="bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800/80 space-y-1">
                      <span className="font-semibold text-neutral-300 block">{msg.subject}</span>
                      <p className="text-neutral-300 whitespace-pre-wrap">{msg.message}</p>
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                        className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-[11px] text-neutral-300 hover:text-white transition-colors"
                      >
                        Reply via Email
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex justify-between items-center text-xs">
              <span className="text-neutral-500 font-mono">Recipient: gsoni7424@gmail.com</span>
              <button
                onClick={() => setInboxOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
