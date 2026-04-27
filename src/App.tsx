/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gamepad2, X, Ghost, Play, ShieldAlert, Maximize, Search, ExternalLink, VolumeX, Volume2 } from "lucide-react";
import { AdSense } from "./components/AdSense";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { Contact } from "./components/Contact";
import initialGamesData from "./data/games.json";

interface Game {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  description: string;
  category?: string;
}

// Variations for Panic Mode Disguise
const WIKIPEDIA_ARTICLES = [
  {
    title: "Institutional Resource Portal",
    subtitle: "Analysis of Advanced Pedagogy",
    content: "The integration of computational logic in secondary education environments provides a framework for students to engage with complex problem-solving metrics. Research indicates that structured pedagogical entry points significantly enhance long-term retention of algorithmic concepts.",
    sidebar: ["Curriculum Overview", "Faculty Research", "Student Resources", "Academic Calendar"]
  },
  {
    title: "Global Economic Assessment",
    subtitle: "Macroeconomic Trends in Developing Markets",
    content: "Analysis of trade volatility in Southeast Asian markets during the 2024 fiscal cycle suggests a robust trend toward decentralized manufacturing hubs. Fiscal policies implemented by centralized banking institutions have shown a 2.4% correlation with increased domestic asset valuations.",
    sidebar: ["Market Analytics", "Fiscal Policy Reports", "Trade Agreements", "GDP Forecasts"]
  },
  {
    title: "Marine Biological Review",
    subtitle: "Benthic Ecosystems in the Abyssal Zone",
    content: "The abyssal zone, comprising over 80% of the ocean's total volume, remains one of the least understood biomes on Earth. Recent submersible data indicates a surprisingly high density of chemosynthetic organisms clustering around thermal vents at depths exceeding 4,000 meters.",
    sidebar: ["Species Database", "Thermocline Data", "Oceanic Mapping", "Conservation Efforts"]
  },
  {
    title: "Theoretical Physics Journal",
    subtitle: "Entropy and the Arrow of Time",
    content: "Thermodynamic irreversibility is a fundamental constraint on the progression of physical states within a closed system. The second law of thermodynamics dictates that entropy must increase over time, providing a cosmological basis for the temporal directionality observed in classical mechanics.",
    sidebar: ["Quantum Foundations", "Relativity Updates", "Field Equations", "Conference Notes"]
  },
  {
    title: "Digital History Archive",
    subtitle: "Origins of the Printing Press (1440-1500)",
    content: "Johannes Gutenberg's introduction of movable type in Europe facilitated a paradigm shift in the dissemination of information. The resulting surge in literacy rates during the late 15th century contributed directly to the sociocultural transformations known as the Renaissance.",
    sidebar: ["Manuscript Studies", "Technological Impact", "Gutenberg Bible", "Typographic Evolution"]
  }
];

function PanicModeWikipedia() {
  const article = useMemo(() => WIKIPEDIA_ARTICLES[Math.floor(Math.random() * WIKIPEDIA_ARTICLES.length)], []);

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <header className="border-b-2 border-slate-200 pb-4 mb-8">
        <h1 className="text-4xl font-serif">{article.title}</h1>
        <p className="text-sm text-slate-500 mt-2 italic flex items-center gap-2">
          <ShieldAlert className="w-3 h-3" /> Educational Access Validated • April 2026
        </p>
      </header>
      <div className="flex gap-8">
        <aside className="hidden md:block w-48 shrink-0 space-y-4 text-sm text-[#0645ad] border-r border-slate-100 pr-6">
          <p className="font-bold text-black border-b border-slate-100 pb-1 uppercase text-[10px] tracking-wider">Site Navigation</p>
          {article.sidebar.map((item, i) => (
            <p key={i} className="hover:underline cursor-pointer">{item}</p>
          ))}
        </aside>
        <main className="flex-1 space-y-6">
          <h2 className="text-2xl font-bold border-b border-slate-200 pb-2">{article.subtitle}</h2>
          <p className="leading-relaxed text-slate-700">{article.content}</p>
        </main>
      </div>
    </div>
  );
}

function PanicModeExcel() {
  return (
    <div className="h-full bg-[#f3f2f1] font-sans text-[11px] overflow-hidden flex flex-col">
      <div className="bg-[#107c41] h-8 flex items-center px-4 text-white font-bold gap-4">
        <span>File</span><span>Home</span><span>Insert</span><span>Draw</span><span>Page Layout</span>
      </div>
      <div className="bg-white border-b border-slate-200 h-20 flex p-3 gap-8">
        <div className="flex flex-col items-center gap-1"><div className="w-8 h-8 bg-slate-100 rounded"></div>Paste</div>
        <div className="w-[1px] bg-slate-200 h-full"></div>
        <div className="flex flex-col gap-2">
          <div className="w-32 h-6 bg-slate-100 rounded"></div>
          <div className="w-24 h-4 bg-slate-50 rounded"></div>
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-[#e1dfdd] p-[1px]">
        <table className="w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="w-10 bg-[#f3f2f1] border border-slate-300"></th>
              {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(c => (
                <th key={c} className="w-32 bg-[#f3f2f1] border border-slate-300 font-normal">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(r => (
              <tr key={r}>
                <td className="bg-[#f3f2f1] border border-slate-300 text-center">{r}</td>
                <td className="border border-slate-200 p-1">{r === 1 ? 'Project Data: Q2' : Math.random().toFixed(4)}</td>
                <td className="border border-slate-200 p-1">{Math.floor(Math.random() * 1000)}</td>
                <td className="border border-slate-200 p-1">{r === 2 ? '=SUM(B2:D2)' : ''}</td>
                <td className="border border-slate-200 p-1"></td><td className="border border-slate-200 p-1"></td><td className="border border-slate-200 p-1"></td>
                <td className="border border-slate-200 p-1"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PanicModeDisguise({ onExit }: { onExit: () => void }) {
  const [variant] = useState(() => Math.floor(Math.random() * 2));
  
  return (
    <div className="fixed inset-0 z-[100] bg-white text-black overflow-hidden selection:bg-[#3399ff] selection:text-white">
      {variant === 0 && <PanicModeWikipedia />}
      {variant === 1 && <PanicModeExcel />}
      
      <button 
        onClick={onExit}
        className="fixed bottom-2 right-2 w-4 h-4 text-black/5 hover:text-black/50"
      >
        .
      </button>
    </div>
  );
}

export default function App() {
  // Use a fallback empty array to prevent crashes if import fails
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [isPanicActive, setIsPanicActive] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [isGameLoading, setIsGameLoading] = useState(false);
  const [loadingTime, setLoadingTime] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isTabHidden, setIsTabHidden] = useState(false);
  const [showMuteNotif, setShowMuteNotif] = useState(false);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  // Auto-Mute on Tab Switch
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsTabHidden(true);
      } else {
        setIsTabHidden(false);
        setShowMuteNotif(true);
        const timer = setTimeout(() => setShowMuteNotif(false), 2000);
        return () => clearTimeout(timer);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Randomize games on mount
  useEffect(() => {
    const shuffleArray = (array: Game[]) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
    
    setGames(shuffleArray(initialGamesData || []));
  }, []);
  
  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setShowInterstitial(true); // Re-enable interstitial for revenue
    setIsGameLoading(true);
  };

  // Panic Mode Shortcut (Backtick Key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Use backtick (`) as a safe, non-conflicting panic key
      if (e.key === '`') {
        e.preventDefault();
        setIsPanicActive(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleFullscreen = () => {
    if (!gameContainerRef.current) return;
    
    if (!document.fullscreenElement) {
      gameContainerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Track loading time for heavy games
  useEffect(() => {
    let interval: number;
    if (isGameLoading) {
      setLoadingTime(0);
      interval = window.setInterval(() => {
        setLoadingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameLoading]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const categories = ["All", "Action", "Arcade", "Racing", "Puzzle", "Sports", "Strategy", "Adventure", "Simulator"];

  const filteredGames = useMemo(() => {
    const query = debouncedSearchQuery.toLowerCase().trim();
    return games.filter(game => {
      const matchesSearch = !query || 
        game.name.toLowerCase().includes(query) || 
        game.description?.toLowerCase().includes(query);
      const matchesCategory = selectedCategory === "All" || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, debouncedSearchQuery, selectedCategory]);

  const gridItems = useMemo(() => {
    const items: any[] = [];
    filteredGames.forEach((game, index) => {
      items.push({ type: 'game', content: game, index });
      
      // Inject ads in the sequence
      if ((index + 1) % 4 === 0 && index !== filteredGames.length - 1 && !debouncedSearchQuery) {
        items.push({ 
          type: 'ad', 
          id: `ad-${game.id}`, 
          index 
        });
      }
    });
    return items;
  }, [filteredGames, debouncedSearchQuery]);
  
  // Debug check
  useEffect(() => {
    console.log("App mounted. Games count:", games?.length);
    if (!games || games.length === 0) {
      console.warn("No games data found or loaded.");
    }
  }, [games]);
  return (
    <div className="min-h-screen font-sans bg-frog-dark">
      {/* Privacy Policy Overlay */}
      <AnimatePresence>
        {showPrivacyPolicy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
          >
            <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Overlay */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
          >
            <Contact onClose={() => setShowContact(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panic Mode Overlay */}
      <AnimatePresence>
        {isPanicActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 z-[100]"
          >
            <PanicModeDisguise onExit={() => setIsPanicActive(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auto-Mute Notification */}
      <AnimatePresence>
        {showMuteNotif && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] bg-frog-main text-black px-6 py-3 rounded-full font-black text-sm uppercase flex items-center gap-3 shadow-2xl ring-4 ring-black/20"
          >
            <Volume2 className="w-5 h-5" />
            <span>Audio Unmuted • Welcome Back!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation - Sticky Logo Only */}
      <nav className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-border px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div 
              className="flex items-center gap-3 cursor-pointer group shrink-0"
              onClick={() => setSelectedGame(null)}
            >
              <div className="w-9 h-9 bg-frog-main rounded-xl flex items-center justify-center text-black font-black text-xl group-hover:rotate-12 transition-transform">
                F
              </div>
              <h1 className="text-xl md:text-2xl font-display font-extrabold tracking-tighter text-frog-main uppercase group-hover:scale-105 transition-transform hidden sm:block">
                Unblocked <span className="text-[#f1f5f9]">Frog</span>
              </h1>
            </div>

            <div className="max-w-xs md:max-w-md w-full relative group mr-4 md:mr-8 transition-all">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-frog-light/40 group-focus-within:text-frog-main transition-colors" />
              <input 
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-frog-dark/50 border border-white/5 rounded-xl py-2 md:py-2.5 pl-10 pr-4 text-xs md:text-sm text-frog-light placeholder:text-frog-light/20 focus:outline-none focus:border-frog-main/50 focus:ring-1 focus:ring-frog-main/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center">
            <div className="hidden md:flex flex-col items-end leading-tight shrink-0 pl-4 pr-0">
              <span className="text-sm font-black text-frog-main uppercase tracking-tight">Panic Mode</span>
              <span className="text-[11px] text-frog-light/90 uppercase font-bold mt-1 flex items-center gap-1.5">
                Press <span className="bg-frog-main text-black px-2 py-0.5 rounded font-mono text-xs shadow-sm ring-2 ring-frog-main/20">`</span> key to hide
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Category Navigation */}
      <div className="sticky top-[77px] z-30 bg-frog-dark/80 backdrop-blur-md border-b border-white/5 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shrink-0 border ${
                selectedCategory === cat
                ? 'bg-frog-main text-black border-frog-main shadow-[0_0_15px_rgba(163,230,53,0.3)]'
                : 'bg-white/5 text-frog-light border-white/5 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <header className="px-6 py-12 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 overflow-hidden flex justify-center w-full"
          >
             <div className="w-full max-w-[728px] p-2 bg-surface/20 rounded-xl border border-border/30 px-4">
                <AdSense adClient="ca-pub-8358881625500999" adSlot="XXXXXXXXXX" style={{ width: '100%', minHeight: '90px' }} />
             </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-display font-black leading-[0.9] tracking-tighter"
          >
            THE CURATED<br />
            <span className="text-frog-main uppercase italic">GAMING POND.</span>
          </motion.h2>
          <p className="max-w-2xl mx-auto text-frog-light text-lg md:text-xl">
             Explore our hand-picked collection of unblocked classics. Ribbiting fun for everyone.
          </p>
        </div>
      </header>

      {/* Games Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Gamepad2 className="text-frog-main" />
            <h3 className="text-2xl font-display font-bold">
              {searchQuery ? `Searching: ${searchQuery}` : 'Recommended'}
            </h3>
          </div>
        </div>

        {gridItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px] grid-flow-dense">
            <AnimatePresence mode="popLayout">
              {gridItems.map((item) => (
                  <motion.div
                  layout
                  key={item.type === 'game' ? item.content.id : item.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.3,
                    delay: (item.index % 12) * 0.03 // Staggered entrance for first few items
                  }}
                  className={item.type === 'game' 
                    ? `bento-card flex flex-col ${item.index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`
                    : `flex items-center justify-center bento-card bg-surface/30 p-4 overflow-hidden h-[250px] ${(item.index + 1) % 8 === 0 ? 'col-span-full h-[150px]' : 'sm:col-span-2'}`
                  }
                >
                  {item.type === 'game' ? (
                    <GameCard 
                      game={item.content} 
                      isLarge={item.index === 0} 
                      onClick={() => handleGameSelect(item.content)} 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <AdSense adClient="ca-pub-8358881625500999" adSlot="XXXXXXXXXX" style={{ width: '100%', height: '100%' }} />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center space-y-6 bento-card p-12 bg-white/5 border-dashed border-white/10"
          >
            <div className="relative">
              <div className="p-8 bg-frog-main/10 rounded-full animate-pulse">
                <Ghost className="w-16 h-16 text-frog-main" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-frog-dark p-2 rounded-lg border border-white/10">
                <Search className="w-4 h-4 text-frog-main" />
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-display font-black uppercase italic tracking-wider text-frog-main">
                No Ribbiting Results
              </h4>
              <p className="text-frog-light max-w-sm mx-auto leading-relaxed">
                We searched every corner of the pond, but couldn't find any games matching <span className="text-white font-bold">"{searchQuery}"</span>.
              </p>
            </div>
            {searchQuery && (
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setDebouncedSearchQuery("");
                }}
                className="group flex items-center gap-2 bg-frog-main text-black px-6 py-2.5 rounded-xl font-bold uppercase text-xs tracking-widest hover:shadow-[0_0_20px_rgba(163,230,53,0.4)] transition-all"
              >
                <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                Clear Search
              </button>
            )}
          </motion.div>
        )}

        <div className="mt-20 pt-10 border-t border-border/30 flex flex-col items-center w-full overflow-hidden">
          <div className="w-full max-w-4xl">
            <AdSense adClient="ca-pub-8358881625500999" adSlot="XXXXXXXXXX" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-frog-light">
          <div className="flex items-center gap-2">
            <span className="text-xl">🐸</span>
            <span>© 2026 Unblocked Frog Curated. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <button 
              onClick={() => {
                setShowPrivacyPolicy(true);
                window.scrollTo(0, 0);
              }}
              className="text-[10px] uppercase font-bold text-frog-light/60 hover:text-frog-main transition-colors tracking-widest"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setShowContact(true)}
              className="text-[10px] uppercase font-bold text-frog-light/60 hover:text-frog-main transition-colors tracking-widest"
            >
              Contact Pond
            </button>
          </div>
        </div>
      </footer>

      {/* Game Iframe Overlay */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            ref={gameContainerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col"
          >
            <div className="p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-frog-main rounded-lg">
                  <Gamepad2 className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg leading-tight">{selectedGame.name}</h4>
                  <p className="text-xs text-frog-light">Playing Unblocked</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => window.open(selectedGame.url, '_blank')}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors group flex items-center gap-2"
                  aria-label="Open in new window"
                >
                  <ExternalLink className="w-5 h-5 text-frog-light group-hover:text-frog-main transition-colors" />
                  <span className="text-[10px] font-bold text-frog-light uppercase hidden sm:block">Open New Tab</span>
                </button>
                <div className="h-6 w-[1px] bg-white/10 mx-1"></div>
                <button 
                  onClick={toggleFullscreen}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors group flex items-center gap-2"
                  aria-label="Toggle Fullscreen"
                >
                  <Maximize className="w-5 h-5 text-frog-light group-hover:text-frog-main transition-colors" />
                  <span className="text-[10px] font-bold text-frog-light uppercase hidden sm:block">Fullscreen</span>
                </button>
                <div className="h-6 w-[1px] bg-white/10 mx-1"></div>
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors group"
                  aria-label="Close game"
                >
                  <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col md:flex-row relative bg-black overflow-hidden mt-2">
              {/* Left Skyscraper Ad */}
              <div className="hidden lg:flex w-[160px] shrink-0 bg-surface/10 border-r border-white/5 flex-col items-center py-4">
                <p className="text-[9px] text-white/20 uppercase font-black mb-4 vertical-text">Advertisement</p>
                <div className="w-[120px]">
                  <AdSense adClient="ca-pub-8358881625500999" adSlot="XXXXXXXXXX" style={{ width: '120px', height: '600px', display: 'block' }} />
                </div>
              </div>

              <div className="flex-1 relative">
                {showInterstitial ? (
                  <div className="absolute inset-0 z-10 bg-[#0a0c10] flex flex-col items-center justify-center p-8 text-center">
                    <div className="max-w-xl w-full space-y-8">
                       <h5 className="text-2xl font-display font-bold text-frog-main uppercase italic">Ribbiting Content Loading...</h5>
                       <div className="bg-frog-dark border border-white/5 rounded-2xl p-4 min-h-[300px] flex flex-col items-center justify-center">
                          <p className="text-[9px] text-white/20 uppercase font-black mb-4 tracking-tighter">Advertisement</p>
                          <AdSense adClient="ca-pub-8358881625500999" adSlot="XXXXXXXXXX" style={{ width: '100%', minHeight: '250px' }} />
                       </div>
                       <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowInterstitial(false)}
                        className="bg-frog-main text-black px-12 py-4 rounded-xl font-display font-black text-xl hover:shadow-[0_0_20px_rgba(101,255,143,0.3)] transition-all mx-auto"
                      >
                        SKIP AD & PLAY
                      </motion.button>
                    </div>
                  </div>
                ) : null}

                <AnimatePresence>
                  {isGameLoading && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-20 bg-[#0a0c10] flex flex-col items-center justify-center p-8"
                    >
                      <div className="relative">
                        <motion.div
                          animate={{ 
                            y: [0, -40, 0],
                            scaleX: [1, 0.8, 1.2, 1],
                            scaleY: [1, 1.2, 0.8, 1]
                          }}
                          transition={{ 
                            duration: 0.8, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="text-6xl mb-6 select-none"
                        >
                          🐸
                        </motion.div>
                        <motion.div 
                          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.1, 0.2] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-3 bg-frog-main rounded-[100%] blur-md"
                        />
                      </div>
                      <div className="mt-8 space-y-4 text-center">
                        <h5 className="text-xl font-display font-black text-frog-main tracking-widest animate-pulse">RIBBITING...</h5>
                        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="w-full h-full bg-frog-main"
                          />
                        </div>
                        <p className="text-[10px] text-frog-light uppercase font-bold tracking-[0.3em] opacity-40">Loading Game World</p>
                        
                        {loadingTime > 5 && (
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[10px] text-frog-main font-bold max-w-[200px] leading-relaxed"
                          >
                            TIP: Heavy game detected. Please wait, it will start shortly! 🐸
                          </motion.p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <iframe
                  src={selectedGame.url}
                  onLoad={() => setIsGameLoading(false)}
                  className={`w-full h-full border-none transition-opacity duration-500 ${isGameLoading ? 'opacity-0' : 'opacity-100'}`}
                  title={selectedGame.name}
                  allow="autoplay; payment; fullscreen; microphone; focus-without-user-activation; screen-wake-lock; gamepad; clipboard-read; clipboard-write;"
                  referrerPolicy="no-referrer"
                  // @ts-ignore - legacy attributes for some game engines
                  webkitallowfullscreen="true" 
                  // @ts-ignore
                  mozallowfullscreen="true" 
                  // @ts-ignore
                  msallowfullscreen="true"
                  allowFullScreen
                />
                
                {/* Connection Hint */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5 pointer-events-none">
                  <p className="text-[10px] text-frog-light font-medium uppercase tracking-wider">
                    Game not loading? Click <span className="text-frog-main font-bold">"Open New Tab"</span> above!
                  </p>
                </div>
              </div>

              {/* Right Skyscraper Ad */}
              <div className="hidden lg:flex w-[160px] shrink-0 bg-surface/10 border-l border-white/5 flex-col items-center py-4">
                <p className="text-[9px] text-white/20 uppercase font-black mb-4 vertical-text">Advertisement</p>
                <div className="w-[120px]">
                  <AdSense adClient="ca-pub-8358881625500999" adSlot="XXXXXXXXXX" style={{ width: '120px', height: '600px', display: 'block' }} />
                </div>
              </div>

              {/* Mobile Bottom Banner */}
              <div className="lg:hidden h-[90px] border-t border-white/5 bg-surface/10 p-2 overflow-hidden flex items-center justify-center">
                <div className="w-full max-w-[728px]">
                  <AdSense adClient="ca-pub-8358881625500999" adSlot="XXXXXXXXXX" style={{ width: '100%', height: '100%' }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface GameCardProps {
  game: Game;
  isLarge: boolean;
  onClick: () => void;
}

function GameCard({ game, isLarge, onClick }: GameCardProps) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 0 30px rgba(34, 197, 94, 0.2)",
        borderColor: "rgba(34, 197, 94, 0.5)"
      }}
      transition={{ 
        scale: { duration: 0.2 },
        boxShadow: { duration: 0.2 }
      }}
      onClick={onClick}
      className="group relative h-full w-full overflow-hidden cursor-pointer flex flex-col"
    >
      <div className={`overflow-hidden relative bg-[#1c1f26] ${isLarge ? 'flex-1' : 'aspect-[16/10]'}`}>
        <img
          src={game.thumbnail}
          alt={game.name}
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${game.id}/400/300?blur=5`;
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {game.category && (
          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[9px] font-black text-frog-main uppercase tracking-widest z-10">
            {game.category}
          </div>
        )}
        
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
           <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 flex items-center gap-2 bg-frog-main text-black px-3 py-1 rounded-full text-[10px] font-bold font-display w-fit">
            <Gamepad2 className="w-3 h-3" /> LAUNCH GAME
          </div>
        </div>
      </div>
      <div className="p-4 bg-surface">
        <h4 className="text-base font-display font-bold group-hover:text-frog-main transition-colors truncate">
          {game.name}
        </h4>
        <p className="text-[12px] text-frog-light line-clamp-1 mt-1 font-medium italic">
          {game.description}
        </p>
      </div>
    </motion.div>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <a href="#" className="text-xs text-frog-light/40 hover:text-frog-accent transition-colors">
      {label}
    </a>
  );
}
