import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal, Quote, Sparkles, Cpu, Share2,
  Image as ImageIcon, Github, Instagram, Facebook,
  Linkedin, ExternalLink, Volume2, VolumeX,
  TerminalSquare, Info, Code, FileCode, Coffee,
  Database, GitBranch, Cloud, Bot, Box, Mail, Server
} from 'lucide-react';

// Subsystem Components
import { CockpitLoader } from './components/CockpitLoader';
import { RobotAssistant } from './components/RobotAssistant';
import { SpotifyWidget } from './components/SpotifyWidget';
import { GlitchText } from './components/GlitchText';
import { CMSV2TerminalShowcase } from './components/CMSV2TerminalShowcase';
import { CMSV2CaseStudy } from './components/CMSV2CaseStudy';

// Hooks & Portfolio Data Registry
import { useAudio, setGlobalAudioEnabled, getGlobalAudioEnabled } from './hooks/useAudio';
import {
  SERVICES_DATA, TECH_STACKS, ARTWORKS_DATA, TechStack,
  BIO_OVERVIEW, SYSTEM_SPECS_DATA, EXTRA_FACTS_DATA,
  MLBB_DATA, CODM_DATA, GENSHIN_DATA
} from './data/portfolioData';

// Dynamic Tech Stack Icon Animate-Wrappers
const getTechIcon = (name: string) => {
  const iconProps = { className: "text-matrix group-hover:text-matrix-light transition-colors", size: 18 };

  switch (name.toLowerCase()) {
    case 'html':
    case 'typescript':
      return (
        <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <Code {...iconProps} />
        </motion.div>
      );
    case 'css':
    case 'javascript':
      return (
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
          <FileCode {...iconProps} />
        </motion.div>
      );
    case 'react':
      return (
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }}>
          <Cpu {...iconProps} />
        </motion.div>
      );
    case 'express':
    case 'node.js':
      return (
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <Server {...iconProps} />
        </motion.div>
      );
    case 'java':
      return (
        <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <Coffee {...iconProps} />
        </motion.div>
      );
    case 'mysql':
    case 'mongodb':
    case 'redis':
    case 'chromadb':
      return (
        <motion.div animate={{ scale: [1, 1.05, 1], filter: ["drop-shadow(0 0 1px rgba(0,255,65,0.2))", "drop-shadow(0 0 4px rgba(0,255,65,0.6))", "drop-shadow(0 0 1px rgba(0,255,65,0.2))"] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
          <Database {...iconProps} />
        </motion.div>
      );
    case 'git':
      return (
        <motion.div animate={{ x: [-1.5, 1.5, -1.5] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}>
          <GitBranch {...iconProps} />
        </motion.div>
      );
    case 'docker':
      return (
        <motion.div animate={{ y: [0, -3, 0], rotate: [0, 3, -3, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
          <Box {...iconProps} />
        </motion.div>
      );
    case 'aws':
      return (
        <motion.div animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
          <Cloud {...iconProps} />
        </motion.div>
      );
    case 'paddleocr-vl':
    case 'paddleocr':
    case 'agentic a.i':
      return (
        <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <Bot {...iconProps} />
        </motion.div>
      );
    default:
      return <Cpu {...iconProps} />;
  }
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(getGlobalAudioEnabled());
  const [matrixActive, setMatrixActive] = useState(true);
  const [flash, setFlash] = useState(false);
  const [skippedIntro, setSkippedIntro] = useState(false);

  // Decryption Reveal State
  const [revealColor, setRevealColor] = useState(false);
  const [revealBirthday, setRevealBirthday] = useState(false);

  // Interactive CLI commands
  const [cliOpen, setCliOpen] = useState(false);
  const [cliInput, setCliInput] = useState('');
  const [cliHistory, setCliHistory] = useState<string[]>([
    "PATRICK_TERMINAL SHELL v2.0.4 - READY",
    "TYPE 'help' FOR A LIST OF APEX SHELL COMMANDS.",
    ""
  ]);

  // Tech stack filtering
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Time ticker
  const [systemTime, setSystemTime] = useState('');

  // Gaming tab states
  const [gamingTab, setGamingTab] = useState<'mlbb' | 'codm' | 'genshin'>('mlbb');
  const [selectedHeroInfo, setSelectedHeroInfo] = useState<string>('');

  // Custom states for Robot, Accordion & Spotify
  const [selectedTech, setSelectedTech] = useState<TechStack | null>(null);
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [spotifyOpen, setSpotifyOpen] = useState(false);
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);

  const { initAudio, clickSound, synthBeep, warningSound } = useAudio();

  const handleLoadingComplete = useCallback((skipFlash = false) => {
    setLoading(false);
    if (skipFlash) {
      setSkippedIntro(true);
      setFlash(false);
    } else {
      setFlash(true);
    }
  }, []);

  const toggleSpotify = useCallback(() => {
    clickSound();
    setSpotifyOpen(p => !p);
  }, [clickSound]);

  const closeRobot = useCallback(() => {
    setSelectedTech(null);
  }, []);

  // Sync state mute toggles with audio hook global metrics
  const toggleAudio = useCallback(() => {
    initAudio();
    setAudioEnabled(prev => {
      const next = !prev;
      setGlobalAudioEnabled(next);
      return next;
    });
    setTimeout(() => {
      if (getGlobalAudioEnabled()) {
        clickSound();
      }
    }, 50);
  }, [initAudio, clickSound]);

  // Handle local system clock
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setSystemTime(date.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Matrix digital rain background canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (loading || !matrixActive || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const letters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ≡ƒªò≡ƒªû';
    const alphabet = letters.split('');

    const fontSize = 14;
    const columns = Math.floor(width / fontSize) + 1;
    const rainDrops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00ff41';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        if (Math.random() > 0.97) {
          ctx.fillStyle = '#ffffff';
          ctx.fillText(text, x, y);
          ctx.fillStyle = '#00ff41';
        } else {
          ctx.fillStyle = 'rgba(0, 255, 65, 0.45)';
          ctx.fillText(text, x, y);
        }

        if (y > height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    // Cap framerates to keep CPU usage low (24 fps)
    let lastTime = 0;
    const fps = 24;
    const nextFrameMs = 1000 / fps;

    const renderLoop = (time: number) => {
      animationFrameId = requestAnimationFrame(renderLoop);
      if (time - lastTime >= nextFrameMs) {
        draw();
        lastTime = time;
      }
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [loading, matrixActive]);

  // CLI Command execute logic
  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response: string[] = [];

    if (trimmed === '') return;

    clickSound();

    switch (trimmed) {
      case 'help':
        response = [
          `>> ${cmd}`,
          "AVAILABLE SECURE CHANNELS:",
          "  help     - Display system endpoints",
          "  dino     - Extract Dinosaur Genome Profile",
          "  specs    - Print operational bios and parameters",
          "  skills   - List technical infrastructure index",
          "  clear    - Clear console records"
        ];
        break;
      case 'dino':
        response = [
          `>> ${cmd}`,
          "🦕 SYSTEM DECRYPTION DETECTED: RAWR!!! 🦕",
          "____________________________________________",
          "   /\\__/\\",
          "  / 🦕 🦕 \\  - 'My dream is to be a dinosaur'",
          "  \\  __  /  - 'so I can eat every single person'",
          "   \\/__\\/   - 'that hurts my feelings.'",
          "____________________________________________",
          "STATUS: MALAPIT NA MAMATAY"
        ];
        warningSound();
        break;
      case 'specs':
        response = [
          `>> ${cmd}`,
          "--- OPERATIONAL DIRECTIVE SPECS ---",
          "OPERATOR NAME: PATRICK JOSH AÑEDEZ",
          "BSIT STATUS  : ACTIVE OPERATOR",
          "NIGHT CYCLE  : ACTIVE ALWAYS",
          "MOOD MATRIX  : CHILL // BUT UNSTABLE",
          "FAV_COLOR    : SECRET",
          "BIRTHDAY     : SECRET"
        ];
        break;
      case 'skills':
        response = [
          `>> ${cmd}`,
          "--- TECHNICAL INFRASTRUCTURE MATRIX ---",
          "  [Frontend]  HTML, CSS, JS, TS, React",
          "  [Backend]   Java, JavaScript",
          "  [Database]  MySQL, MongoDB, Redis",
          "  [DevOps]    Git, Docker, AWS",
          "  [Next-Gen]  Agentic A.I"
        ];
        break;
      case 'clear':
        setCliHistory([]);
        setCliInput('');
        return;
      default:
        response = [
          `>> ${cmd}`,
          `ERROR: UNRECOGNIZED MODULE '${cmd}'. TYPE 'help' FOR RETRIEVAL OPTIONS.`
        ];
        warningSound();
    }

    setCliHistory((prev) => [...prev, ...response, ""]);
    setCliInput('');
  };

  // Filter skills
  const filteredSkills = selectedCategory === 'All'
    ? TECH_STACKS
    : TECH_STACKS.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#050505] text-matrix font-mono selection:bg-matrix selection:text-black relative crt-scanlines overflow-x-hidden">

      {/* BACKGROUND MATRIX CANVAS */}
      {!loading && matrixActive && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 w-full h-full pointer-events-none opacity-40 z-0"
        />
      )}

      {/* CYBER GRID BACKDROP */}
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-30 z-0" />

      {/* 1. Curved Cockpit Loader screen */}
      <AnimatePresence>
        {loading && <CockpitLoader onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* 2. Floating Spotify Deck (FAB + embed panel) */}
      <SpotifyWidget isOpen={spotifyOpen} onToggle={toggleSpotify} />

      {/* 3. Main Dashboard */}
      {!loading && (
        <motion.div
          initial={skippedIntro ? { opacity: 0 } : { opacity: 0, scale: 1.12, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: skippedIntro ? 0.35 : 1.4, ease: "easeOut" }}
          className="max-w-6xl mx-auto px-4 py-8 space-y-16 relative z-10"
        >
          {/* Header section */}
          <header className="cyber-card p-4 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-glow">
            <div>
              <h1
                onClick={() => synthBeep()}
                className="text-2xl xs:text-3xl md:text-5xl font-black tracking-tighter text-matrix-light uppercase group cursor-pointer glitch-hover text-glow"
              >
                PATRICK JOSH <span className="text-white group-hover:text-matrix transition-colors">AÑEDEZ</span>
              </h1>
              <div className="mt-2 space-y-1 font-mono">
                <p className="text-xs sm:text-sm text-white font-bold tracking-wide flex flex-wrap items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-matrix rounded-full animate-ping" />
                  <span className="text-matrix-light">{BIO_OVERVIEW.role}</span>
                  <span className="text-matrix/40 hidden xs:inline">•</span>
                  <span className="text-matrix/80 font-normal text-xs">{BIO_OVERVIEW.institution}</span>
                </p>
                <p className="text-[11px] text-matrix/70 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span>📍 {BIO_OVERVIEW.location}</span>
                  <span className="text-matrix/40">•</span>
                  <a href={`mailto:${BIO_OVERVIEW.email}`} className="hover:text-matrix-light underline transition-colors">
                    ✉ {BIO_OVERVIEW.email}
                  </a>
                  <span className="text-matrix/40">•</span>
                  <a href={`https://${BIO_OVERVIEW.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-matrix-light underline transition-colors">
                    🌐 {BIO_OVERVIEW.github}
                  </a>
                </p>
              </div>
            </div>

            {/* Header controls */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="bg-matrix-dark/20 px-3 py-1.5 border border-matrix/20 rounded flex items-center gap-2">
                <span>MATRIX_BG:</span>
                <button
                  onClick={() => {
                    clickSound();
                    setMatrixActive(!matrixActive);
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] ${
                    matrixActive ? 'bg-matrix text-black font-bold' : 'border border-matrix/30 text-matrix'
                  }`}
                >
                  {matrixActive ? "ACTIVE" : "PAUSED"}
                </button>
              </div>

              <div className="bg-matrix-dark/20 px-3 py-1.5 border border-matrix/20 rounded flex items-center gap-2">
                <button
                  onClick={toggleAudio}
                  className={`flex items-center gap-1.5 ${audioEnabled ? 'text-matrix-light font-bold' : 'text-matrix-dark hover:text-matrix'}`}
                >
                  {audioEnabled ? <Volume2 size={14} className="animate-pulse" /> : <VolumeX size={14} />}
                  <span>SYNTH_AUDIO</span>
                </button>
              </div>

              <div className="bg-matrix-dark/10 px-3 py-1.5 border border-matrix/20 rounded hidden lg:block text-matrix-light/80">
                {systemTime || "CLOCK_SYNCING"}
              </div>
            </div>
          </header>

          {/* DE-CLUTTERED 2-COLUMN LAYOUT GRID */}
          <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* COLUMN 1: Bio, Services, CLI Console, and Spec Locks */}
            <div className="space-y-8">
              
              {/* SYSTEM BIO OVERVIEW */}
              <div className="cyber-card p-4 sm:p-6 space-y-6 shadow-glow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-matrix/30 pb-3">
                  <div className="flex items-center gap-2">
                    <Terminal size={18} className="text-matrix-light" />
                    <h2 className="text-sm font-bold tracking-widest text-matrix-light uppercase">BIO_OVERVIEW</h2>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-matrix/30 bg-matrix-dark/20 text-matrix-light tracking-wider uppercase self-start sm:self-auto">
                    OPERATOR_DOSSIER // ACTIVE
                  </span>
                </div>

                {/* About Me Section */}
                <div className="space-y-2">
                  <div className="text-xs text-matrix-dark border-b border-matrix/20 pb-1 uppercase font-bold tracking-wider flex items-center gap-1.5 font-mono">
                    <span className="text-matrix">┌──</span> ABOUT_ME
                  </div>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-mono">
                    {BIO_OVERVIEW.aboutMe}
                  </p>
                </div>

                {/* Core Highlights Section */}
                <div className="space-y-2.5">
                  <div className="text-xs text-matrix-dark border-b border-matrix/20 pb-1 uppercase font-bold tracking-wider flex items-center gap-1.5 font-mono">
                    <span className="text-matrix">┌──</span> CORE_HIGHLIGHTS
                  </div>
                  <div className="space-y-2 font-mono">
                    {BIO_OVERVIEW.competencies.map((comp, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded bg-matrix-dark/10 border border-matrix/20 hover:border-matrix/50 transition-colors space-y-1"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-matrix-light flex items-center gap-1.5">
                            <span className="text-matrix">•</span> {comp.title}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-matrix-dark/30 border border-matrix/20 text-matrix/70 font-mono tracking-wider shrink-0">
                            {comp.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/80 leading-relaxed pl-3 border-l border-matrix/20">
                          {comp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What I Build & Deliver Section */}
                <div className="space-y-2.5">
                  <div className="text-xs text-matrix-dark border-b border-matrix/20 pb-1 uppercase font-bold tracking-wider flex items-center gap-1.5 font-mono">
                    <span className="text-matrix">┌──</span> WHAT_I_BUILD_AND_DELIVER
                  </div>
                  <div className="grid grid-cols-1 gap-2 font-mono">
                    {BIO_OVERVIEW.deliverables.map((del, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded bg-matrix-dark/10 border border-matrix/20 hover:border-matrix/40 transition-colors"
                      >
                        <div className="text-xs font-bold text-white mb-0.5 flex items-center gap-1.5">
                          <span className="text-matrix">•</span> {del.title}
                        </div>
                        <div className="text-[11px] text-matrix/80 leading-relaxed pl-3 border-l border-matrix/20">
                          {del.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Intel / Easter Eggs */}
                <div className="p-3 rounded border border-matrix/20 bg-matrix-dark/15 font-mono text-xs text-matrix/80 flex flex-wrap items-center gap-x-1.5 gap-y-1">
                  <span className="text-matrix-light font-bold text-[10px] tracking-wider uppercase mr-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-matrix animate-ping" />
                    &gt;_ INTEL_LOCKS:
                  </span>
                  <span>{BIO_OVERVIEW.textPart1}</span>
                  <span onClick={() => { clickSound(); setRevealColor(!revealColor); }} className="cursor-pointer inline-block">
                    {revealColor ? (
                      <span className="text-blue-400 font-bold border-b border-blue-500 border-dashed">{BIO_OVERVIEW.favColorRevealed}</span>
                    ) : (
                      <GlitchText text={BIO_OVERVIEW.favColorPlaceholder} className="text-red-500 bg-red-950/20 px-1 border border-red-500/30 text-xs" />
                    )}
                  </span>
                  <span>{BIO_OVERVIEW.textPart2}</span>
                  <span onClick={() => { clickSound(); setRevealBirthday(!revealBirthday); }} className="cursor-pointer inline-block">
                    {revealBirthday ? (
                      <span className="text-matrix-light font-bold border-b border-matrix border-dashed">{BIO_OVERVIEW.birthdayRevealed}</span>
                    ) : (
                      <GlitchText text={BIO_OVERVIEW.birthdayPlaceholder} className="text-matrix-light bg-matrix-dark/30 px-1 border border-matrix/30 text-xs" />
                    )}
                  </span>
                  <span> • Likes animals & coding.</span>
                </div>

                {/* STYLISH QUOTE CARD // CORE MANTRA */}
                <motion.div
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.2 }}
                  className="relative overflow-hidden rounded-lg border border-matrix/30 bg-gradient-to-br from-matrix-dark/25 via-[#030804]/90 to-black p-4 sm:p-5 shadow-glow group hover:border-matrix/60 transition-colors"
                >
                  {/* Top-right terminal status badge */}
                  <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-matrix/15 text-matrix-light text-[9px] font-mono font-bold tracking-widest border-l border-b border-matrix/30 uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-matrix animate-pulse" />
                    CORE_MANTRA
                  </div>

                  {/* Watermark quote symbol */}
                  <Quote
                    size={68}
                    className="absolute -right-2 -bottom-2 text-matrix/[0.07] -rotate-12 pointer-events-none select-none transition-transform duration-500 group-hover:scale-110 group-hover:text-matrix/[0.12]"
                  />

                  {/* Header label */}
                  <div className="flex items-center gap-2 text-matrix-light text-xs font-bold tracking-wider uppercase mb-2.5">
                    <Sparkles size={14} className="text-matrix animate-pulse" />
                    <span>LIFETIME_MISSION // PHILOSOPHY</span>
                  </div>

                  {/* Quote content */}
                  <blockquote className="relative z-10 space-y-3 font-mono">
                    <p className="text-xs sm:text-sm text-white/90 leading-relaxed italic">
                      "{BIO_OVERVIEW.quote.text}{' '}
                      <span className="text-matrix-light font-bold not-italic text-glow underline decoration-matrix/40 decoration-wavy underline-offset-4">
                        '{BIO_OVERVIEW.quote.highlight}'
                      </span>
                      "
                    </p>

                    <div className="pt-2 flex items-center justify-between text-[11px] border-t border-matrix/20 text-matrix/70">
                      <span className="tracking-widest uppercase font-semibold flex items-center gap-1.5 text-matrix-light">
                        <span className="text-matrix">──</span> {BIO_OVERVIEW.quote.author}
                      </span>
                      <span className="text-[10px] text-matrix-dark tracking-wider uppercase hidden xs:inline">
                        // GUIDING_DIRECTIVE
                      </span>
                    </div>
                  </blockquote>
                </motion.div>
              </div>

              {/* SERVICES CATALOG CARD (Cinematic Interactive Showcase) */}
              <div className="cyber-card p-4 sm:p-6 space-y-4 shadow-glow">
                <div className="flex items-center gap-2 border-b border-matrix/30 pb-3">
                  <Terminal size={18} className="text-matrix-light" />
                  <h2 className="text-sm font-bold tracking-widest text-matrix-light uppercase">&gt;_ SERVICES_PROVISIONED</h2>
                </div>
                <div className="space-y-3 font-mono">
                  {SERVICES_DATA.map((service) => {
                    const isExpanded = expandedService === service.id;
                    return (
                      <div 
                        key={service.id}
                        className="border border-matrix/20 bg-matrix-dark/5 rounded overflow-hidden transition-all duration-300"
                      >
                        <button
                          onClick={() => {
                            clickSound();
                            setExpandedService(isExpanded ? null : service.id);
                          }}
                          className="w-full flex flex-col items-start p-3 hover:bg-matrix-dark/10 text-left transition-colors focus:outline-none cursor-pointer group"
                        >
                          <div className="flex justify-between w-full items-center">
                            <span className="text-matrix-light/90 text-[9px] uppercase tracking-wider font-bold group-hover:text-matrix-light transition-colors">
                              {service.tag}
                            </span>
                            <span className="text-matrix text-xs font-bold border border-matrix/30 px-1.5 py-0.5 rounded bg-black/60 group-hover:border-matrix transition-all">
                              {isExpanded ? "[-]" : "[+]"}
                            </span>
                          </div>
                          <span className="text-white font-bold text-xs mt-1 group-hover:text-matrix-light transition-colors">
                            {service.title}
                          </span>
                          <p className="text-[10px] text-zinc-300 mt-1">
                            {service.shortDesc}
                          </p>
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              className="border-t border-matrix/20 bg-black/70 p-3 sm:p-4 overflow-hidden"
                            >
                              <CMSV2TerminalShowcase
                                onOpenCaseStudy={() => {
                                  clickSound();
                                  setCaseStudyOpen(true);
                                }}
                                onSoundTrigger={clickSound}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                  
                  <div className="pt-2">
                    <a
                      href="mailto:patrickjoshanedez35@gmail.com"
                      onClick={() => clickSound()}
                      className="inline-flex items-center gap-2 border border-matrix bg-matrix-dark/20 hover:bg-matrix/10 px-4 py-2 rounded text-xs text-matrix-light font-bold transition-all shadow-glow w-full justify-center"
                    >
                      <Mail size={14} className="animate-pulse text-matrix-light shrink-0" />
                      <span className="text-[10px] xs:text-xs truncate">CONTACT: patrickjoshanedez35@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* SYSTEM INTERACTIVE CLI DRAW CONSOLE */}
              <section className="cyber-card shadow-glow overflow-hidden">
                <button
                  onClick={() => {
                    clickSound();
                    setCliOpen(!cliOpen);
                  }}
                  className="w-full flex items-center justify-between p-4 bg-matrix-dark/10 hover:bg-matrix-dark/20 text-xs font-bold font-mono tracking-widest text-matrix-light border-b border-matrix/20"
                >
                  <div className="flex items-center gap-2">
                    <TerminalSquare size={16} className={cliOpen ? "animate-pulse" : ""} />
                    <span>INTERACTIVE_SYSTEM_SHELL</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 border border-matrix/30 rounded bg-black">
                    {cliOpen ? "COLLAPSE_TERM" : "OPEN_TERM"}
                  </span>
                </button>

                <AnimatePresence>
                  {cliOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="bg-black/95 p-4 space-y-4"
                    >
                      <div className="h-44 overflow-y-auto font-mono text-xs text-matrix/90 space-y-1 bg-[#020202] p-3 border border-matrix-dark/40 rounded scrollbar-thin">
                        {cliHistory.map((line, idx) => (
                          <p key={idx} className="whitespace-pre-wrap">{line}</p>
                        ))}
                        <div className="flex items-center text-matrix-light mt-1">
                          <span className="mr-2 text-matrix-dark font-bold">&gt;</span>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              executeCommand(cliInput);
                            }}
                            className="flex-grow flex items-center"
                          >
                            <input
                              type="text"
                              value={cliInput}
                              onChange={(e) => setCliInput(e.target.value)}
                              className="bg-transparent border-none outline-none text-matrix-light flex-grow font-mono focus:ring-0 focus:border-none p-0 text-xs"
                              placeholder="Type 'help' and press Enter..."
                              autoFocus
                            />
                          </form>
                        </div>
                      </div>
                      <div className="text-[9px] text-matrix-dark flex justify-between font-mono">
                        <span>SECURITY_CLEARANCE: OPERATOR</span>
                        <span>SHELL_VERSION: v2.0.4</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>

              {/* CLASSIFIED VARIABLES WITH DECRYPTION LOCKS */}
              <div className="cyber-card p-4 sm:p-6 space-y-4 shadow-glow font-mono">
                <div className="text-xs text-matrix-dark border-b border-matrix/20 pb-2 uppercase font-bold tracking-wider">SYSTEM_SPECS // REVEAL_LOCKS</div>
                <div className="space-y-3">
                  <div className="text-sm flex justify-between items-center border-b border-matrix-dark/10 py-1">
                    <span className="text-matrix/70 text-xs">FAV_COLOR:</span>
                    <button
                      onClick={() => { clickSound(); setRevealColor(!revealColor); }}
                      className="focus:outline-none"
                    >
                      {revealColor ? (
                        <span className="text-blue-400 font-bold text-xs">{SYSTEM_SPECS_DATA.favColorRevealed}</span>
                      ) : (
                        <GlitchText text={BIO_OVERVIEW.favColorPlaceholder} className="text-red-500 bg-red-950/20 px-1 border border-red-500/30 text-xs cursor-pointer" />
                      )}
                    </button>
                  </div>

                  <div className="text-sm flex justify-between items-center border-b border-matrix-dark/10 py-1">
                    <span className="text-matrix/70 text-xs">BIRTHDAY:</span>
                    <button
                      onClick={() => { clickSound(); setRevealBirthday(!revealBirthday); }}
                      className="focus:outline-none"
                    >
                      {revealBirthday ? (
                        <span className="text-white font-bold text-xs">{SYSTEM_SPECS_DATA.birthdayRevealed}</span>
                      ) : (
                        <GlitchText text={BIO_OVERVIEW.birthdayPlaceholder} className="text-matrix-light bg-matrix-dark/30 px-1 border border-matrix/30 text-xs cursor-pointer" />
                      )}
                    </button>
                  </div>

                  <div className="text-xs flex justify-between py-1">
                    <span className="text-matrix/70">GEOLOCATION:</span>
                    <span className="text-white font-bold">{SYSTEM_SPECS_DATA.geolocation}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* COLUMN 2: Tech infrastructure, Artwork vault, gaming decks */}
            <div className="space-y-8">
              
              {/* ANIMATED TECH INFRASTRUCTURE GRID */}
              <section className="cyber-card p-4 sm:p-6 space-y-6 shadow-glow">
                <div className="flex flex-col gap-3 pb-4 border-b border-matrix/30">
                  <div className="flex items-center gap-2">
                    <Cpu size={20} className="text-matrix-light animate-spin" style={{ animationDuration: '6s' }} />
                    <h2 className="text-lg font-bold tracking-widest text-matrix-light uppercase">TECH_INFRASTRUCTURE</h2>
                  </div>

                  {/* Filter chips */}
                  <div className="flex flex-wrap gap-2">
                    {['All', 'Frontend', 'Backend', 'Database', 'Version Control', 'DevOps', 'Next-Gen'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          clickSound();
                          setSelectedCategory(cat);
                        }}
                        className={`px-2 py-1 text-[10px] border rounded transition-all font-bold ${
                          selectedCategory === cat
                            ? 'border-matrix bg-matrix/20 text-matrix-light text-glow'
                            : 'border-matrix/20 text-matrix/50 hover:border-matrix/40 hover:text-matrix'
                        }`}
                      >
                        {cat.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  <AnimatePresence mode="popLayout">
                    {filteredSkills.map((stack, idx) => (
                      <motion.div
                        layout
                        key={stack.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={{
                          y: -4,
                          borderColor: '#00ff66',
                          boxShadow: "0px 0px 15px rgba(0,255,65,0.3)"
                        }}
                        onClick={() => {
                          clickSound();
                          setSelectedTech(stack);
                        }}
                        className="bg-black/80 border border-matrix/30 p-3 sm:p-4 rounded relative overflow-hidden group cursor-pointer"
                      >
                        <div className="absolute top-0 right-0 p-1 text-[8px] bg-matrix-dark/30 border-l border-b border-matrix/20 text-matrix/50 group-hover:text-matrix-light font-bold">
                          {stack.category}
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                          {getTechIcon(stack.name)}
                          <h4 className="text-sm font-bold text-white group-hover:text-matrix-light transition-colors leading-normal">
                            {stack.name}
                          </h4>
                        </div>
                        {/* Gauge bar */}
                        <div className="w-full bg-matrix-dark/30 h-1.5 rounded overflow-hidden border border-matrix/10">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${stack.level}%` }}
                            transition={{ duration: 1, delay: idx * 0.05 }}
                            className="bg-matrix h-full shadow-glow"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </section>

              {/* ARTWORK GALLERY / BLUEPRINTS */}
              <section className="cyber-card p-4 sm:p-6 space-y-6 shadow-glow">
                <div className="flex items-center gap-2 border-b border-matrix/30 pb-4">
                  <ImageIcon size={20} className="text-matrix-light" />
                  <h2 className="text-lg font-bold tracking-widest text-matrix-light uppercase">CREATIVE_VAULT // BLUEPRINTS</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {ARTWORKS_DATA.map((art) => (
                    <div
                      key={art.id}
                      className="bg-black/90 border border-matrix/20 rounded overflow-hidden group hover:border-matrix/75 transition-all shadow-glow flex flex-col"
                    >
                      <div className="h-44 overflow-hidden bg-matrix-dark/20 relative">
                        <img
                          src={art.imageUrl}
                          alt={art.title}
                          className="w-full h-full object-cover opacity-50 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500 filter grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute top-2 right-2 bg-black/85 px-2 py-0.5 border border-matrix/30 text-[9px] rounded text-white font-mono">
                          ID: 00{art.id}
                        </div>
                        <div className="absolute bottom-2 left-2 bg-black/85 px-2 py-0.5 border border-matrix/20 text-[8px] text-matrix-light rounded font-mono">
                          {art.hash}
                        </div>
                      </div>
                      <div className="p-4 border-t border-matrix/20 bg-[#070707] flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="text-sm font-bold text-white group-hover:text-matrix-light transition-colors mb-1 uppercase tracking-wider">{art.title}</h3>
                          <p className="text-[11px] text-matrix/70 leading-relaxed font-mono mb-4">{art.description}</p>
                        </div>
                        <div className="text-[9px] text-matrix-dark border-t border-matrix-dark/20 pt-2 flex justify-between font-mono">
                          <span>VAULT_DATE: {art.date}</span>
                          <span>SYS_SECURE: PASS</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Extra facts summary box */}
                <div className="bg-matrix-dark/10 border border-matrix/30 p-4 rounded text-xs space-y-2">
                  <div className="flex items-center gap-1.5 text-matrix-light font-bold uppercase text-[10px]">
                    <Info size={14} className="text-matrix" /> MORE_ABOUT_ME:
                  </div>
                  <p className="text-[11px] text-matrix-light/80 leading-relaxed">
                    {EXTRA_FACTS_DATA.summary}
                  </p>
                  <ol className="list-decimal pl-4 space-y-1 text-[11px] text-matrix/75 font-mono">
                    {EXTRA_FACTS_DATA.items.map((item, idx) => {
                      const parts = item.split(/(`[^`]+`)/);
                      return (
                        <li key={idx}>
                          {parts.map((part, i) => {
                            if (part.startsWith('`') && part.endsWith('`')) {
                              return <code key={i} className="text-white bg-matrix-dark/30 px-1 border border-matrix/10 rounded">{part.slice(1, -1)}</code>;
                            }
                            return part;
                          })}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </section>

              {/* GAMING INTELLIGENCE DECK */}
              <div className="cyber-card p-4 sm:p-6 space-y-6 shadow-glow">
                <div className="flex items-center justify-between border-b border-matrix/30 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-matrix-light font-bold text-sm tracking-widest uppercase text-glow">GAMING_INTELLIGENCE</span>
                  </div>
                  <span className="text-[9px] text-matrix-dark uppercase font-bold tracking-widest animate-pulse">CLASSIFIED_OPS</span>
                </div>

                {/* Sub tabs */}
                <div className="flex gap-2">
                  {(['mlbb', 'codm', 'genshin'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        clickSound();
                        setGamingTab(tab);
                        setSelectedHeroInfo('');
                      }}
                      className={`flex-grow py-1.5 text-[10px] border rounded transition-all font-bold ${
                        gamingTab === tab
                          ? 'border-matrix bg-matrix/20 text-matrix-light text-glow'
                          : 'border-matrix/20 text-matrix/50 hover:border-matrix/40 hover:text-matrix'
                      }`}
                    >
                      {tab.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Tab content specs */}
                <div className="bg-black/40 border border-matrix-dark/20 p-4 rounded min-h-[140px] flex flex-col justify-between font-mono">
                  {gamingTab === 'mlbb' && (
                    <div className="space-y-2 text-xs">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-matrix-dark/10 pb-1 gap-1">
                        <span className="text-matrix/70 text-[10px] sm:text-xs">RANK:</span>
                        <span className="text-white font-bold flex flex-wrap items-center gap-1 sm:text-right">
                          {MLBB_DATA.rank}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start border-b border-matrix-dark/10 pb-1 gap-1">
                        <span className="text-matrix/70 text-[10px] sm:text-xs">SIGNATURE:</span>
                        <button
                          onClick={() => {
                            clickSound();
                            setSelectedHeroInfo(selectedHeroInfo === 'kagura' ? '' : 'kagura');
                          }}
                          className="text-matrix-light font-bold hover:underline cursor-pointer flex items-center gap-1 focus:outline-none text-left sm:text-right"
                        >
                          {MLBB_DATA.signature}
                        </button>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span className="text-matrix/70 text-[10px] sm:text-xs">ROLE:</span>
                        <span className="text-white sm:text-right">{MLBB_DATA.role}</span>
                      </div>

                      {selectedHeroInfo === 'kagura' && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-matrix-dark/20 border border-matrix/30 p-2 rounded text-[10px] mt-2 text-matrix-light/90 leading-relaxed border-l-2 border-l-matrix"
                        >
                          <span className="font-bold text-white uppercase block mb-1">{MLBB_DATA.intelTitle}</span>
                          {MLBB_DATA.intelDesc}
                        </motion.div>
                      )}
                    </div>
                  )}

                  {gamingTab === 'codm' && (
                    <div className="space-y-2 text-xs">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-matrix-dark/10 pb-1 gap-1">
                        <span className="text-matrix/70 text-[10px] sm:text-xs">MP RANK:</span>
                        <span className="text-white font-bold flex flex-wrap items-center gap-1 sm:text-right">
                          {CODM_DATA.mpRank}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span className="text-matrix/70 text-[10px] sm:text-xs">BR RANK:</span>
                        <span className="text-white font-bold flex flex-wrap items-center gap-1 sm:text-right">
                          {CODM_DATA.brRank}
                        </span>
                      </div>
                    </div>
                  )}

                  {gamingTab === 'genshin' && (
                    <div className="space-y-2 text-xs">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-matrix-dark/10 pb-1 gap-1">
                        <span className="text-matrix/70 text-[10px] sm:text-xs">ADVENTURE LEVEL:</span>
                        <span className="text-white font-bold sm:text-right">{GENSHIN_DATA.arLevel}</span>
                      </div>
                      <div className="pb-1">
                        <span className="text-matrix/70 block mb-1">ACTIVE MAIN TEAM:</span>
                        <div className="flex gap-1.5 flex-wrap">
                          {GENSHIN_DATA.team.map((hero) => (
                            <button
                              key={hero.name}
                              onClick={() => {
                                clickSound();
                                setSelectedHeroInfo(selectedHeroInfo === hero.name.toLowerCase() ? '' : hero.name.toLowerCase());
                              }}
                              className={`px-1.5 py-0.5 border rounded text-[10px] font-bold cursor-pointer transition-all ${hero.color} hover:brightness-125 focus:outline-none`}
                            >
                              {hero.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {GENSHIN_DATA.team.map((hero) => {
                        if (selectedHeroInfo !== hero.name.toLowerCase()) return null;
                        return (
                          <motion.div
                            key={hero.name}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`p-2 border rounded text-[10px] mt-1 border-l-2 ${hero.color.split(' ').slice(0, 3).join(' ')}`}
                          >
                            <span className="font-bold block mb-0.5">{hero.intelTitle}</span>
                            {hero.intelDesc}
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </main>

          {/* Socials & footer networks */}
          <footer className="space-y-8 pt-8 border-t border-matrix/20 text-center font-mono">
            <div className="flex items-center justify-center gap-2 text-xs text-matrix-dark uppercase tracking-widest font-bold">
              <Share2 size={14} /> SECURITY_CLEARANCE // CONNECT_CHANNELS
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: 'Gmail', icon: <Mail size={16} />, url: 'mailto:patrickjoshanedez35@gmail.com' },
                { name: 'Facebook', icon: <Facebook size={16} />, url: 'https://www.facebook.com/Patkik.juice/' },
                { name: 'Instagram', icon: <Instagram size={16} />, url: 'https://www.instagram.com/patweck009/' },
                { name: 'TikTok', icon: <span className="font-black text-[10px] tracking-tighter">TT</span>, url: 'https://tiktok.com/@takeshi_190' },
                { name: 'GitHub', icon: <Github size={16} />, url: 'https://github.com/Patkik' },
                { name: 'LinkedIn', icon: <Linkedin size={16} />, url: 'https://linkedin.com' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => clickSound()}
                  className="flex items-center gap-2 border border-matrix/30 hover:border-matrix-light hover:bg-matrix/10 px-4 py-2 rounded text-xs text-matrix bg-black transition-all group font-mono shadow-glow"
                >
                  {social.icon}
                  <span className="text-white group-hover:text-matrix-light transition-colors">{social.name}</span>
                  <ExternalLink size={10} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>

            <p className="text-[10px] text-matrix-dark font-mono uppercase tracking-widest pt-4">
              © {new Date().getFullYear()} - PATRICK JOSH AÑEDEZ. ALL SYSTEM PARAMETERS GRANTED BY THE PREHISTORIC APEX DINOSAUR.
            </p>
          </footer>
        </motion.div>
      )}

      {/* 4. Sliding Interactive Robotic assistant */}
      <AnimatePresence>
        {selectedTech && <RobotAssistant selectedTech={selectedTech} onClose={closeRobot} />}
      </AnimatePresence>

      {/* 5. WHITE WARP FLASH OVERLAY */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            onAnimationComplete={() => setFlash(false)}
            className="fixed inset-0 z-50 bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* 6. CINEMATIC BUKSU CMS-V2 CASE STUDY OVERLAY */}
      <AnimatePresence>
        {caseStudyOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 overflow-y-auto bg-[#090D14]"
          >
            <CMSV2CaseStudy
              onClose={() => {
                clickSound();
                setCaseStudyOpen(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
