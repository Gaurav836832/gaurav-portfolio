import { useState, useEffect, useRef, type FormEvent } from 'react';
import { 
  X, 
  Coffee, 
  CheckCircle2, 
  CreditCard, 
  Trash2, 
  Plus, 
  Check, 
  Calendar, 
  Clock, 
  Users, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Music, 
  Utensils, 
  ListTodo,
  ExternalLink,
  ShieldCheck,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'chai' | 'todo' | 'restaurant' | 'spotify' | null;
}

export default function ProjectModals({ isOpen, onClose, type }: ProjectModalProps) {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/80">
          <div className="flex items-center gap-2.5">
            {type === 'chai' && <Coffee className="w-5 h-5 text-amber-400" />}
            {type === 'todo' && <ListTodo className="w-5 h-5 text-emerald-400" />}
            {type === 'restaurant' && <Utensils className="w-5 h-5 text-orange-400" />}
            {type === 'spotify' && <Music className="w-5 h-5 text-emerald-400" />}
            <div>
              <h3 className="text-base font-bold text-neutral-100">
                {type === 'chai' && "Get-Me-A-Chai • Interactive Simulation"}
                {type === 'todo' && "Todo-List WebApp • Live Playground"}
                {type === 'restaurant' && "Restaurant Order & Table Booking • Interactive Demo"}
                {type === 'spotify' && "Spotify Web Player • Live Audio Experience"}
              </h3>
              <p className="text-xs text-neutral-400 font-mono">
                Project Architecture & Live Demo Mode
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Specific Simulator */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {type === 'chai' && <ChaiSimulator />}
          {type === 'todo' && <TodoSimulator />}
          {type === 'restaurant' && <RestaurantSimulator />}
          {type === 'spotify' && <SpotifySimulator />}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * 1. Get-Me-A-Chai Interactive Crowdfunding Simulator
 * ----------------------------------------------------------- */
function ChaiSimulator() {
  const [tab, setTab] = useState<'support' | 'dashboard'>('support');
  const [amount, setAmount] = useState('100');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [supporters, setSupporters] = useState([
    { name: "Aditi Sharma", amount: "₹250", message: "Love your open-source work! Keep going!", date: "10 mins ago" },
    { name: "Rahul Verma", amount: "₹100", message: "Great project Gaurav, cheers!", date: "1 hour ago" },
    { name: "Anonymous", amount: "₹500", message: "Supporting quality developers from Delhi.", date: "Yesterday" }
  ]);
  const [totalRaised, setTotalRaised] = useState(850);

  const handleDonate = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const parsedAmount = parseInt(amount, 10) || 100;
      setSupporters([
        {
          name: name.trim(),
          amount: `₹${parsedAmount}`,
          message: message.trim() || "Cheers for the great development work!",
          date: "Just now"
        },
        ...supporters
      ]);
      setTotalRaised((prev) => prev + parsedAmount);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      setName('');
      setMessage('');
      setTab('dashboard');
    }, 1200);
  };

  return (
    <div className="space-y-5">
      {/* Switcher */}
      <div className="flex p-1 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
        <button
          onClick={() => setTab('support')}
          className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
            tab === 'support' ? 'bg-amber-600 text-white shadow' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          ☕ Buy A Chai (Supporter View)
        </button>
        <button
          onClick={() => setTab('dashboard')}
          className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
            tab === 'dashboard' ? 'bg-neutral-800 text-white shadow' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          📊 Creator Dashboard
        </button>
      </div>

      {tab === 'support' ? (
        <form onSubmit={handleDonate} className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200 flex items-center gap-3">
            <Coffee className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-amber-100">Patreon-style Crowdfunding Simulation</p>
              <p className="text-amber-300/80">
                Demonstrating Razorpay checkout webhook handling & dynamic donor ledger.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-300 mb-1.5">Select Chai Contribution</label>
            <div className="grid grid-cols-4 gap-2">
              {['50', '100', '250', '500'].map((amt) => (
                <button
                  type="button"
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                    amount === amt
                      ? 'bg-amber-500 text-neutral-950 border-amber-400'
                      : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-300 mb-1">Your Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priyansh / Tech Recruiter"
              className="w-full px-3.5 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-300 mb-1">Encouraging Message (Optional)</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Great resume and portfolio!"
              className="w-full px-3.5 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <span className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                <span>Triggering Razorpay API Simulation...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                <span>Simulate Razorpay Payment (₹{amount})</span>
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-[11px] text-neutral-400 block font-mono">Total Pledged</span>
              <span className="text-xl font-bold text-emerald-400 font-mono">₹{totalRaised}</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-[11px] text-neutral-400 block font-mono">Total Backers</span>
              <span className="text-xl font-bold text-neutral-100 font-mono">{supporters.length}</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-[11px] text-neutral-400 block font-mono">Gateway Status</span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 mt-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Razorpay OK
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono font-semibold text-neutral-300">Live Supporters Feed:</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {supporters.map((s, i) => (
                <div key={i} className="p-3 rounded-lg bg-neutral-950/80 border border-neutral-800/80 flex items-start justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-neutral-100">{s.name}</span>
                    <p className="text-neutral-400 text-[11px] mt-0.5">"{s.message}"</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">
                      {s.amount}
                    </span>
                    <span className="block text-[10px] text-neutral-500 mt-1">{s.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------
 * 2. Todo-List WebApp Interactive Playground
 * ----------------------------------------------------------- */
function TodoSimulator() {
  const [todos, setTodos] = useState([
    { id: '1', title: 'Prepare React & Next.js production build', completed: true, priority: 'High' },
    { id: '2', title: 'Integrate MongoDB indexes for fast query load', completed: true, priority: 'Medium' },
    { id: '3', title: 'Test CI/CD automated release pipeline', completed: false, priority: 'High' },
    { id: '4', title: 'Review Tailwind CSS responsive mobile breakpoints', completed: false, priority: 'Normal' }
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Normal'>('Medium');
  const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');

  const addTodo = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const item = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      completed: false,
      priority
    };
    setTodos([item, ...todos]);
    setNewTitle('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const filteredTodos = todos.filter(t => {
    if (filter === 'Active') return !t.completed;
    if (filter === 'Completed') return t.completed;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-xs text-emerald-200">
        <strong className="text-emerald-100">Live WebApp State Simulation:</strong> Test real-time CRUD operations, reactive task filters, and optimistic state updates just like in the deployed Vite app!
      </div>

      <form onSubmit={addTodo} className="flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-3.5 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as any)}
          className="px-2.5 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-300"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Normal">Normal</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </form>

      {/* Filter tabs */}
      <div className="flex items-center justify-between text-xs pt-1 border-b border-neutral-800 pb-2">
        <span className="text-neutral-400 font-mono">
          {todos.filter(t => !t.completed).length} pending tasks
        </span>
        <div className="flex gap-1">
          {(['All', 'Active', 'Completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                filter === f ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className={`p-3 rounded-lg border flex items-center justify-between gap-3 text-xs transition-all ${
              todo.completed
                ? 'bg-neutral-950/40 border-neutral-800/50 opacity-60'
                : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                  todo.completed
                    ? 'bg-emerald-600 border-emerald-500 text-neutral-950'
                    : 'border-neutral-600 hover:border-neutral-400'
                }`}
              >
                {todo.completed && <Check className="w-3 h-3 stroke-[3]" />}
              </button>
              <span className={`truncate text-sm ${todo.completed ? 'line-through text-neutral-500' : 'text-neutral-200'}`}>
                {todo.title}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                todo.priority === 'High' ? 'bg-rose-950/60 text-rose-300 border border-rose-800/40' :
                todo.priority === 'Medium' ? 'bg-amber-950/60 text-amber-300 border border-amber-800/40' :
                'bg-neutral-800 text-neutral-300'
              }`}>
                {todo.priority}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-neutral-500 hover:text-rose-400 transition-colors p-1"
                title="Delete task"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * 3. Restaurant Order & Table Booking Simulator
 * ----------------------------------------------------------- */
function RestaurantSimulator() {
  const [activeTab, setActiveTab] = useState<'menu' | 'table'>('menu');
  const [cart, setCart] = useState<Array<{ name: string; price: number; qty: number }>>([
    { name: "Paneer Tikka Butter Masala", price: 320, qty: 1 },
    { name: "Garlic Butter Naan (x2)", price: 90, qty: 2 }
  ]);
  const [bookedStatus, setBookedStatus] = useState<string | null>(null);
  const [tableForm, setTableForm] = useState({ name: 'Guest', guests: '2', date: '2026-09-15', time: '19:30' });

  const menuItems = [
    { id: 1, name: "Paneer Tikka Butter Masala", price: 320, category: "Mains" },
    { id: 2, name: "Dum Handi Biryani", price: 290, category: "Rice" },
    { id: 3, name: "Garlic Butter Naan (x2)", price: 90, category: "Breads" },
    { id: 4, name: "Cold Brew Mocha", price: 140, category: "Drinks" },
  ];

  const addToCart = (item: { name: string; price: number }) => {
    const existing = cart.find(c => c.name === item.name);
    if (existing) {
      setCart(cart.map(c => c.name === item.name ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeFromCart = (name: string) => {
    setCart(cart.filter(c => c.name !== name));
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleBookTable = (e: FormEvent) => {
    e.preventDefault();
    setBookedStatus(`Table confirmed for ${tableForm.guests} guests on ${tableForm.date} at ${tableForm.time}`);
    confetti({ particleCount: 50, spread: 50 });
  };

  return (
    <div className="space-y-4">
      {/* Tab switch */}
      <div className="flex p-1 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
        <button
          onClick={() => setActiveTab('menu')}
          className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
            activeTab === 'menu' ? 'bg-orange-600 text-white shadow' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          🍽️ Dynamic Food Menu & Cart
        </button>
        <button
          onClick={() => setActiveTab('table')}
          className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
            activeTab === 'table' ? 'bg-orange-600 text-white shadow' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          🪑 Table Reservation System
        </button>
      </div>

      {activeTab === 'menu' ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Menu Items */}
          <div className="md:col-span-7 space-y-2.5">
            <h4 className="text-xs font-mono text-neutral-300 font-semibold">Chef's Highlights:</h4>
            {menuItems.map((item) => (
              <div key={item.id} className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-neutral-200 block">{item.name}</span>
                  <span className="text-neutral-500 text-[11px] font-mono">₹{item.price} • {item.category}</span>
                </div>
                <button
                  onClick={() => addToCart(item)}
                  className="px-2.5 py-1 rounded bg-orange-600/30 hover:bg-orange-600 text-orange-200 hover:text-white transition-colors text-xs font-semibold"
                >
                  + Add
                </button>
              </div>
            ))}
          </div>

          {/* Cart & Checkout */}
          <div className="md:col-span-5 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-neutral-300 block border-b border-neutral-800 pb-1.5">
                Current Cart ({cart.reduce((a, c) => a + c.qty, 0)})
              </span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 text-xs">
                {cart.length === 0 && <p className="text-neutral-500 italic py-2">Cart is empty</p>}
                {cart.map((c, i) => (
                  <div key={i} className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-300 truncate max-w-[120px]">{c.name} (x{c.qty})</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-neutral-200">₹{c.price * c.qty}</span>
                      <button onClick={() => removeFromCart(c.name)} className="text-neutral-500 hover:text-rose-400">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-800 mt-2 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-neutral-400">Grand Total:</span>
                <span className="text-emerald-400 font-mono">₹{cartTotal}</span>
              </div>
              <button
                onClick={() => {
                  confetti({ particleCount: 40 });
                  alert(`Order Placed for ₹${cartTotal}! Redirecting to Payment Gateway Simulation.`);
                }}
                disabled={cart.length === 0}
                className="w-full py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs disabled:opacity-50 transition-all"
              >
                Proceed to Payment (₹{cartTotal})
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleBookTable} className="space-y-3">
          {bookedStatus && (
            <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{bookedStatus}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-1">Guests</label>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800">
                <Users className="w-4 h-4 text-orange-400" />
                <select
                  value={tableForm.guests}
                  onChange={(e) => setTableForm({ ...tableForm, guests: e.target.value })}
                  className="bg-transparent text-neutral-100 text-xs w-full outline-none"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 People (Standard)</option>
                  <option value="4">4 People (Booth)</option>
                  <option value="6">6 People (Family Table)</option>
                  <option value="8+">8+ People (Banquet)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-1">Time Slot</label>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800">
                <Clock className="w-4 h-4 text-orange-400" />
                <select
                  value={tableForm.time}
                  onChange={(e) => setTableForm({ ...tableForm, time: e.target.value })}
                  className="bg-transparent text-neutral-100 text-xs w-full outline-none"
                >
                  <option value="18:30">6:30 PM (Dinner Early)</option>
                  <option value="19:30">7:30 PM (Peak)</option>
                  <option value="20:30">8:30 PM (Prime)</option>
                  <option value="21:30">9:30 PM (Late Night)</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs transition-all shadow"
          >
            Confirm Table Reservation
          </button>
        </form>
      )}
    </div>
  );
}

/* -------------------------------------------------------------
 * 4. Spotify Clone Interactive Web Audio Streaming Player
 * ----------------------------------------------------------- */
function SpotifySimulator() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(25);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const playlist = [
    { title: "Midnight Lo-Fi Coding", artist: "Gaurav Beats", duration: "2:45", freq: 220 },
    { title: "Full Stack React Groove", artist: "Node Studio", duration: "3:12", freq: 277 },
    { title: "Clean Architecture Vibes", artist: "Vite Flow", duration: "3:05", freq: 330 },
    { title: "Deep Focus Ambient Synth", artist: "Syntax Waves", duration: "4:20", freq: 196 }
  ];

  const currentTrack = playlist[currentTrackIndex];

  // Synthesize mild pleasant ambient chord tone when playing
  const togglePlay = () => {
    if (isPlaying) {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
          oscRef.current.disconnect();
        } catch (e) {}
        oscRef.current = null;
      }
      setIsPlaying(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(currentTrack.freq, audioCtxRef.current.currentTime);
        gain.gain.setValueAtTime(0.04, audioCtxRef.current.currentTime);

        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();

        oscRef.current = osc;
        gainRef.current = gain;
        setIsPlaying(true);
      } catch (err) {
        setIsPlaying(true);
      }
    }
  };

  const nextTrack = () => {
    if (isPlaying && oscRef.current) {
      try { oscRef.current.stop(); } catch (e) {}
      oscRef.current = null;
      setIsPlaying(false);
    }
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const prevTrack = () => {
    if (isPlaying && oscRef.current) {
      try { oscRef.current.stop(); } catch (e) {}
      oscRef.current = null;
      setIsPlaying(false);
    }
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 2));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (oscRef.current) {
        try { oscRef.current.stop(); } catch (e) {}
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-xs text-emerald-200">
        <strong className="text-emerald-100">Live Web Audio API Engine:</strong> Features dynamic playlist rendering, active track highlighting, progress seeking, and gentle synthesized ambient sound.
      </div>

      {/* Mini Player Deck */}
      <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 text-center space-y-3">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-800 mx-auto flex items-center justify-center shadow-lg shadow-emerald-950/60">
          <Music className={`w-8 h-8 text-neutral-950 ${isPlaying ? 'animate-bounce' : ''}`} />
        </div>

        <div>
          <h4 className="text-sm font-bold text-neutral-100">{currentTrack.title}</h4>
          <p className="text-xs text-neutral-400 font-mono mt-0.5">{currentTrack.artist}</p>
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden cursor-pointer">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-neutral-500">
            <span>0:{Math.floor(progress * 0.6).toString().padStart(2, '0')}</span>
            <span>{currentTrack.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 pt-1">
          <button onClick={prevTrack} className="p-2 text-neutral-400 hover:text-white transition-colors">
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 flex items-center justify-center transition-all shadow-md active:scale-95"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-neutral-950" /> : <Play className="w-6 h-6 fill-neutral-950 ml-0.5" />}
          </button>

          <button onClick={nextTrack} className="p-2 text-neutral-400 hover:text-white transition-colors">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Playlist queue */}
      <div className="space-y-1.5">
        <span className="text-xs font-mono font-semibold text-neutral-400 block">Track Queue:</span>
        {playlist.map((track, i) => (
          <div
            key={i}
            onClick={() => {
              if (isPlaying && oscRef.current) {
                try { oscRef.current.stop(); } catch (e) {}
                oscRef.current = null;
                setIsPlaying(false);
              }
              setCurrentTrackIndex(i);
            }}
            className={`px-3 py-2 rounded-lg text-xs flex items-center justify-between cursor-pointer transition-colors ${
              i === currentTrackIndex
                ? 'bg-neutral-800 text-emerald-400 font-semibold'
                : 'bg-neutral-950/60 text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] w-4">{i + 1}</span>
              <span>{track.title}</span>
            </div>
            <span className="font-mono text-[11px]">{track.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
