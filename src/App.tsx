import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal, ShieldAlert, Cpu, Share2, Music,
  Image as ImageIcon, Github, Instagram, Facebook,
  Linkedin, ExternalLink, Volume2, VolumeX,
  TerminalSquare, Info, Code, FileCode, Coffee,
  Database, GitBranch, Cloud, Bot, Box
} from 'lucide-react';


const ARTWORKS_DATA = [
  {
    id: 1,
    title: "Toji",
    description: "Ressurected Toji Fushiguro from the anime series Jujutsu Kaisen",
    imageUrl: "/img/art1.jpg",
    date: "2026.04.12",
    hash: "MD5:8F2D5E1A"
  },
  {
    id: 2,
    title: "Tanjiro",
    description: "Fanart of Tanjiro Kamado from the anime series Demon Slayer: Kimetsu no Yaiba",
    imageUrl: "/img/art2.jpg",
    date: "2026.05.28",
    hash: "SHA256:4C8B9A2F"
  }
];

const TECH_STACKS = [
  { name: "HTML", category: "Frontend", level: 95 },
  { name: "CSS", category: "Frontend", level: 90 },
  { name: "JavaScript", category: "Frontend", level: 92 },
  { name: "TypeScript", category: "Frontend", level: 85 },
  { name: "React", category: "Frontend", level: 88 },
  { name: "Java", category: "Backend", level: 80 },
  { name: "MySQL", category: "Database", level: 85 },
  { name: "MongoDB", category: "Database", level: 78 },
  { name: "Redis", category: "Database", level: 82 },
  { name: "Git", category: "Version Control", level: 90 },
  { name: "Docker", category: "DevOps", level: 84 },
  { name: "AWS", category: "DevOps", level: 80 },
  { name: "Agentic A.I", category: "Next-Gen", level: 95 }
];

// --- CYBER GLITCH INTERFACES & COMPONENTS ---
interface GlitchProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = "" }: GlitchProps) {
  return (
    <span
      className={`animate-cyber-glitch font-black tracking-widest ${className}`}
      data-text={text}
    >
      {text}
    </span>
  );
}

function GlitchLog({ text, isLast }: { text: string; isLast: boolean }) {
  const [isGlitching, setIsGlitching] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGlitching(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  if (isGlitching) {
    return (
      <GlitchText
        text={text}
        className={isLast ? "text-matrix-light font-bold text-xs md:text-sm" : "text-matrix/80 text-xs md:text-sm"}
      />
    );
  }

  return (
    <span className={isLast ? "text-matrix-light font-bold text-glow" : "text-matrix/80"}>
      {text}
    </span>
  );
}

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
    case 'java':
      return (
        <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <Coffee {...iconProps} />
        </motion.div>
      );
    case 'mysql':
    case 'mongodb':
    case 'redis':
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
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [matrixActive, setMatrixActive] = useState(true);

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

  // Gaming tab and simulation states
  const [gamingTab, setGamingTab] = useState<'mlbb' | 'codm' | 'genshin'>('mlbb');
  const [simulationActive, setSimulationActive] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [simulationOutput, setSimulationOutput] = useState<string>('');
  const [selectedHeroInfo, setSelectedHeroInfo] = useState<string>('');

  const runGamingSimulation = () => {
    if (simulationActive) return;
    setSimulationActive(true);
    setSimulationProgress(0);
    setSimulationOutput("LAUNCHING COMBAT ENGINE...");
    if (audioEnabled) warningSound();

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setSimulationProgress(progress);
      if (progress === 20) {
        setSimulationOutput("TARGET AREA CHECKED // EVALUATING MOVEMENT...");
        if (audioEnabled) clickSound();
      } else if (progress === 40) {
        setSimulationOutput("HERO LOAD: KAGURA_OVERDRIVE [MATCHES: 600+]");
        if (audioEnabled) clickSound();
      } else if (progress === 60) {
        setSimulationOutput("SYNAPSE LINK STABLE // WEAPON: SEIMEI UMBRELLA");
        if (audioEnabled) clickSound();
      } else if (progress === 80) {
        setSimulationOutput("PROBABILITY: 98.6% DOMINANCE DETECTED");
        if (audioEnabled) clickSound();
      } else if (progress === 100) {
        clearInterval(interval);
        setSimulationOutput("VICTORY FORECAST // APEX DOMINANCE CONFIRMED!");
        if (audioEnabled) synthBeep();
        setTimeout(() => {
          setSimulationActive(false);
        }, 3000);
      }
    }, 400);
  };

  // Audio Synth Engine (Web Audio API)
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };

  // Automatic audio context initialization hook on first interaction
  useEffect(() => {
    const triggerAudioInit = () => {
      initAudio();
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    };

    window.addEventListener('click', triggerAudioInit, { once: true });
    window.addEventListener('keydown', triggerAudioInit, { once: true });

    return () => {
      window.removeEventListener('click', triggerAudioInit);
      window.removeEventListener('keydown', triggerAudioInit);
    };
  }, []);

  const playSound = (freq: number, type: OscillatorType, duration: number, vol = 0.05) => {
    if (!audioEnabled || !audioCtxRef.current) return;
    try {
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();

      osc.type = type;
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(vol, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start();
      osc.stop(audioCtxRef.current.currentTime + duration);
    } catch (e) {
      // Audio failed, ignore
    }
  };

  const clickSound = () => playSound(800, 'square', 0.08, 0.02);
  const synthBeep = () => playSound(1200, 'sine', 0.15, 0.04);
  const warningSound = () => playSound(150, 'sawtooth', 0.25, 0.08);

  const bootSequences = [
    "INITIATING COGNITIVE BOOT PROTOCOLS...",
    "ACCESSING CORE://PATRICK_JOSH_ANEDEZ...",
    "LOADING BIOMETRIC_DATA: \..",
    "SYSTEM VARIABLES: Night_Owl = TRUE // Mood = CHILL",
    "BYPASSING SECURITY FIREWALL LEVELS 1-4...",
    "WARNING: REDACTED_PARAMETERS ENCOUNTERED...",
    "DECRYPTING DINOSAUR_GENOME_SEQUENCE [88% MATCH]...",
    "COMPILING CORE SYSTEM INTEL...",
    "ACCESS GRANTED. WELCOME BACK, OPERATOR."
  ];

  // Hacking CLI Loading Screen Simulation
  useEffect(() => {
    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < bootSequences.length) {
        setTerminalLogs((prev) => [...prev, bootSequences[logIndex]]);
        if (audioEnabled) playSound(600 + logIndex * 100, 'sine', 0.1, 0.02);
        logIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          if (audioEnabled) synthBeep();
        }, 1200);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [audioEnabled]);

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

    const letters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ🦕🦖';
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

        // Glowing effect on head character
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

    // Cap framerates to keep CPU usage low
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

  // CLI Drawer Commands Parser
  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response: string[] = [];

    if (trimmed === '') return;

    if (audioEnabled) clickSound();

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
          "🦖 SYSTEM DECRYPTION DETECTED: RAWR!!! 🦖",
          "____________________________________________",
          "   /\\__/\\",
          "  / 🦕 🦕 \\  - 'My dream is to be a dinosaur'",
          "  \\  __  /  - 'so I can eat every single person'",
          "   \\/__\\/   - 'that hurts my feelings.'",
          "____________________________________________",
          "STATUS: MALAPIT NA MAMATAY"
        ];
        if (audioEnabled) warningSound();
        break;
      case 'specs':
        response = [
          `>> ${cmd}`,
          "--- OPERATIONAL DIRECTIVE SPECS ---",
          "OPERATOR NAME: PATRICK JOSH AÑEDEZ",
          "BSIT STATUS  : ACTIVE OPERATOR",
          "NIGHT CYCLE  : ACTIVE ALWAYS",
          "MOOD MATRIX  : CHILL // BUT UNSTABLE",
          "FAV_COLOR    : RED",
          "BIRTHDAY     : DECEMBER 26"
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
        if (audioEnabled) warningSound();
    }

    setCliHistory((prev) => [...prev, ...response, ""]);
    setCliInput('');
  };

  // Filter skills
  const filteredSkills = selectedCategory === 'All'
    ? TECH_STACKS
    : TECH_STACKS.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#050505] text-matrix font-mono selection:bg-matrix selection:text-black relative crt-scanlines">

      {/* BACKGROUND MATRIX CANVAS */}
      {!loading && matrixActive && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 w-full h-full pointer-events-none opacity-40 z-0"
        />
      )}

      {/* STATIC RETRO GRID BACKDROP FOR CYBER GLOW */}
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-30 z-0" />

      {/* 1. CLI LOADING SCREEN */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-6 md:p-12 border-4 border-matrix-dark m-2 flicker-animation"
            exit={{
              scale: 1.5,
              opacity: 0,
              filter: "blur(20px)",
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
          >
            <div className="max-w-4xl w-full mx-auto uppercase tracking-wide text-xs md:text-sm pt-4">
              <div className="flex items-center justify-between border-b border-matrix-dark pb-3 mb-6">
                <div className="flex items-center gap-2">
                  <Terminal className="animate-pulse text-matrix" size={20} />
                  <GlitchText text="CRITICAL_SYSTEM_TERMINAL v2.0.4" className="text-matrix-light font-bold text-glow text-xs md:text-sm" />
                </div>
                <button
                  onClick={() => {
                    initAudio();
                    setAudioEnabled(!audioEnabled);
                  }}
                  className={`px-3 py-1 text-xs border rounded transition-all flex items-center gap-1 ${audioEnabled ? 'border-matrix bg-matrix-dark/20 text-matrix-light' : 'border-matrix-dark text-matrix/50'
                    }`}
                >
                  {audioEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
                  <span>{audioEnabled ? "AUDIO_ON" : "INIT_AUDIO"}</span>
                </button>
              </div>

              <div className="space-y-3 h-[68vh] overflow-y-auto pr-2 scrollbar-thin font-mono">
                {terminalLogs.map((log, index) => {
                  const isLast = index === bootSequences.length - 1;
                  return (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm flex items-start gap-1"
                    >
                      <span className="text-matrix-dark mr-2 shrink-0">&gt;&gt;</span>
                      <GlitchLog text={log} isLast={isLast} />
                    </motion.p>
                  );
                })}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2.5 h-4 bg-matrix ml-1 align-middle"
                />
              </div>
            </div>

            <div className="w-full max-w-4xl mx-auto flex items-center justify-between text-[11px] text-matrix-dark pt-4 border-t border-matrix-dark">
              <span className="animate-pulse">STATUS: DECRYPTING_BIOMETRICS</span>
              <span>ESTIMATING: {Math.round((terminalLogs.length / bootSequences.length) * 100)}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN HUB INTERFACE */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto px-4 py-8 space-y-16 relative z-10"
        >
          {/* HEADER ROW */}
          <header className="cyber-card p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-glow">
            <div>
              <h1
                onClick={() => { if (audioEnabled) synthBeep(); }}
                className="text-3xl md:text-5xl font-black tracking-tighter text-matrix-light uppercase group cursor-pointer glitch-hover text-glow"
              >
                PATRICK JOSH <span className="text-white group-hover:text-matrix transition-colors">AÑEDEZ</span>
              </h1>
              <p className="text-xs text-matrix/60 mt-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-matrix rounded-full animate-ping" />
                WELCOME TO MY HUMBLE ABODE, VISITOR!
              </p>
            </div>

            {/* System Metrics Panel */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="bg-matrix-dark/20 px-3 py-1.5 border border-matrix/20 rounded flex items-center gap-2">
                <span>MATRIX_BG:</span>
                <button
                  onClick={() => {
                    if (audioEnabled) clickSound();
                    setMatrixActive(!matrixActive);
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] ${matrixActive ? 'bg-matrix text-black font-bold' : 'border border-matrix/30 text-matrix'
                    }`}
                >
                  {matrixActive ? "ACTIVE" : "PAUSED"}
                </button>
              </div>

              <div className="bg-matrix-dark/20 px-3 py-1.5 border border-matrix/20 rounded flex items-center gap-2">
                <button
                  onClick={() => {
                    initAudio();
                    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
                      audioCtxRef.current.resume();
                    }
                    setAudioEnabled(!audioEnabled);
                    setTimeout(() => { if (!audioEnabled) clickSound(); }, 50);
                  }}
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

          {/* MAIN GRID BODY: SPEC SIDEBAR + PORTFOLIO SECTIONS */}
          <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* LEFT PROFILE & SPEC SIDEBAR */}
            <div className="space-y-8 lg:sticky lg:top-8">

              {/* SYSTEM OVERVIEW */}
              <div className="cyber-card p-6 space-y-6 shadow-glow">
                <div className="flex items-center gap-2 border-b border-matrix/30 pb-3">
                  <Terminal size={18} className="text-matrix-light" />
                  <h2 className="text-sm font-bold tracking-widest text-matrix-light uppercase">BIO_OVERVIEW</h2>
                </div>
                <p className="text-sm text-white/90 leading-relaxed font-mono">
                  Currently a BSIT student, night owl, chill, likes animals, likes anime, likes coding, fav color{' '}
                  <span onClick={() => { if (audioEnabled) clickSound(); setRevealColor(!revealColor); }} className="cursor-pointer inline-block">
                    {revealColor ? <span className="text-red-400 font-bold border-b border-red-500 border-dashed">NASA COMMENT SECTION</span> : <GlitchText text="[REDACTED]" className="text-red-500 bg-red-950/20 px-1 border border-red-500/30 text-xs" />}
                  </span>
                  , birthday{' '}
                  <span onClick={() => { if (audioEnabled) clickSound(); setRevealBirthday(!revealBirthday); }} className="cursor-pointer inline-block">
                    {revealBirthday ? <span className="text-matrix-light font-bold border-b border-matrix border-dashed">NASA COMMENT SECTION</span> : <GlitchText text="[REDACTED]" className="text-matrix-light bg-matrix-dark/30 px-1 border border-matrix/30 text-xs" />}
                  </span>
                  , likes to play games.
                </p>

                {/* THE CLASSIFIED DINOSAUR MANIFESTO */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-red-950/20 border border-red-500/40 p-4 rounded relative overflow-hidden group shadow-glow-red"
                >
                  <div className="absolute top-0 right-0 px-2 py-0.5 bg-red-500/20 text-red-400 text-[9px] font-bold tracking-widest border-l border-b border-red-500/40 uppercase">
                    SYS_THREAT
                  </div>
                  <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2 text-xs text-glow-red uppercase">
                    <ShieldAlert size={14} className="animate-pulse" /> TARGET_CLASSIFICATION.LOG
                  </h4>
                  <p className="text-xs text-red-200/90 italic font-mono leading-relaxed">
                    "My dream is to be a dinosaur someday so I can eat every single person that hurts my feelings."
                  </p>
                </motion.div>
              </div>

              {/* SPECIFICATION CARD WITH DECRYPTION LOCKS */}
              <div className="cyber-card p-6 space-y-4 shadow-glow">
                <div className="text-xs text-matrix-dark border-b border-matrix/20 pb-2 uppercase font-bold tracking-wider">SYSTEM_SPECS // REVEAL_LOCKS</div>

                <div className="space-y-3">
                  <div className="text-sm flex justify-between items-center border-b border-matrix-dark/10 py-1">
                    <span className="text-matrix/70 text-xs">FAV_COLOR:</span>
                    <button
                      onClick={() => {
                        if (audioEnabled) clickSound();
                        setRevealColor(!revealColor);
                      }}
                      className="focus:outline-none"
                    >
                      {revealColor ? (
                        <span className="text-white font-bold text-xs">RED</span>
                      ) : (
                        <GlitchText text="[REDACTED]" className="text-red-500 bg-red-950/20 px-1 border border-red-500/30 text-xs cursor-pointer" />
                      )}
                    </button>
                  </div>

                  <div className="text-sm flex justify-between items-center border-b border-matrix-dark/10 py-1">
                    <span className="text-matrix/70 text-xs">BIRTHDAY:</span>
                    <button
                      onClick={() => {
                        if (audioEnabled) clickSound();
                        setRevealBirthday(!revealBirthday);
                      }}
                      className="focus:outline-none"
                    >
                      {revealBirthday ? (
                        <span className="text-white font-bold text-xs">DECEMBER 26</span>
                      ) : (
                        <GlitchText text="[REDACTED]" className="text-matrix-light bg-matrix-dark/30 px-1 border border-matrix/30 text-xs cursor-pointer" />
                      )}
                    </button>
                  </div>

                  <div className="text-xs flex justify-between py-1">
                    <span className="text-matrix/70">GEOLOCATION:</span>
                    <span className="text-white">FROM_PLANET_MARS</span>
                  </div>

                  <div className="text-xs flex justify-between py-1">
                    <span className="text-matrix/70">MOOD:</span>
                    <span className="text-matrix-light text-glow">CHILL_STATE</span>
                  </div>

                  <div className="text-xs flex justify-between py-1">
                    <span className="text-matrix/70">ENERGY_SRC:</span>
                    <span className="text-matrix-light text-glow">COFFEE_AND_PROBABLY_SLEEPING</span>
                  </div>
                </div>
              </div>

              {/* GAMING INTELLIGENCE DECK */}
              <div className="cyber-card p-6 space-y-6 shadow-glow">
                <div className="flex items-center justify-between border-b border-matrix/30 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-matrix-light font-bold text-sm tracking-widest uppercase text-glow">GAMING_INTELLIGENCE</span>
                  </div>
                  <span className="text-[9px] text-matrix-dark uppercase font-bold tracking-widest animate-pulse">CLASSIFIED_OPS</span>
                </div>

                {/* Sub-tabs */}
                <div className="flex gap-2">
                  {(['mlbb', 'codm', 'genshin'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        if (audioEnabled) clickSound();
                        setGamingTab(tab);
                        setSelectedHeroInfo('');
                      }}
                      className={`flex-grow py-1.5 text-[10px] border rounded transition-all font-bold ${gamingTab === tab
                        ? 'border-matrix bg-matrix/20 text-matrix-light text-glow'
                        : 'border-matrix/20 text-matrix/50 hover:border-matrix/40 hover:text-matrix'
                        }`}
                    >
                      {tab.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Tab Contents */}
                <div className="bg-black/40 border border-matrix-dark/20 p-4 rounded min-h-[140px] flex flex-col justify-between font-mono">
                  {gamingTab === 'mlbb' && (
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center border-b border-matrix-dark/10 pb-1">
                        <span className="text-matrix/70">RANK:</span>
                        <span className="text-white font-bold flex items-center gap-1">
                          👑 Mythical Immortal <span className="text-matrix-light text-glow">(101 Stars)</span>
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-b border-matrix-dark/10 pb-1">
                        <span className="text-matrix/70">SIGNATURE:</span>
                        <button
                          onClick={() => {
                            if (audioEnabled) clickSound();
                            setSelectedHeroInfo(selectedHeroInfo === 'kagura' ? '' : 'kagura');
                          }}
                          className="text-matrix-light font-bold hover:underline cursor-pointer flex items-center gap-1 focus:outline-none"
                        >
                          🔮 Kagura (600+ Matches)
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-matrix/70">ROLE:</span>
                        <span className="text-white">All Around Operator</span>
                      </div>

                      {selectedHeroInfo === 'kagura' && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-matrix-dark/20 border border-matrix/30 p-2 rounded text-[10px] mt-2 text-matrix-light/90 leading-relaxed border-l-2 border-l-matrix"
                        >
                          <span className="font-bold text-white uppercase block mb-1">// INTEL: SEIMEI UMBRELLA DECK</span>
                          Yin-yang vector manipulation. Specializes in multi-lane target locks and clean system wiping operations.
                        </motion.div>
                      )}
                    </div>
                  )}

                  {gamingTab === 'codm' && (
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center border-b border-matrix-dark/10 pb-1">
                        <span className="text-matrix/70">MP RANK:</span>
                        <span className="text-white font-bold flex items-center gap-1">
                          🎯 Pro III <span className="text-matrix/50 text-[10px]">[TACTICAL]</span>
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-matrix/70">BR RANK:</span>
                        <span className="text-white font-bold flex items-center gap-1">
                          🛡️ Pro V <span className="text-matrix/50 text-[10px]">[SURVIVAL]</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {gamingTab === 'genshin' && (
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center border-b border-matrix-dark/10 pb-1">
                        <span className="text-matrix/70">ADVENTURE LEVEL:</span>
                        <span className="text-white font-bold">AR 58 Operator</span>
                      </div>
                      <div className="pb-1">
                        <span className="text-matrix/70 block mb-1">ACTIVE MAIN TEAM:</span>
                        <div className="flex gap-1.5 flex-wrap">
                          {[
                            { name: 'Raiden Shogun', elem: 'Electro', color: 'text-purple-400 border-purple-500/30 bg-purple-950/20' },
                            { name: 'Itto', elem: 'Geo', color: 'text-yellow-500 border-yellow-500/30 bg-yellow-950/20' },
                            { name: 'Yoimiya', elem: 'Pyro', color: 'text-red-400 border-red-500/30 bg-red-950/20' }
                          ].map((hero) => (
                            <button
                              key={hero.name}
                              onClick={() => {
                                if (audioEnabled) clickSound();
                                setSelectedHeroInfo(selectedHeroInfo === hero.name.toLowerCase() ? '' : hero.name.toLowerCase());
                              }}
                              className={`px-1.5 py-0.5 border rounded text-[10px] font-bold cursor-pointer transition-all ${hero.color} hover:brightness-125 focus:outline-none`}
                            >
                              {hero.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {selectedHeroInfo === 'raiden shogun' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-2 border border-purple-500/30 bg-purple-950/10 rounded text-[10px] mt-1 text-purple-200 border-l-2 border-l-purple-500">
                          <span className="font-bold text-purple-400 block mb-0.5">⚡ MUSOU NO HITOTACHI</span>
                          Electro power node. Maximizes elemental reload and bursts system metrics.
                        </motion.div>
                      )}
                      {selectedHeroInfo === 'itto' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-2 border border-yellow-500/30 bg-yellow-950/10 rounded text-[10px] mt-1 text-yellow-200 border-l-2 border-l-yellow-500">
                          <span className="font-bold text-yellow-500 block mb-0.5">🪨 ARATAKI TATSUMAKI</span>
                          Geo core impact. Strong shielding nodes and heavy bludgeon critical streams.
                        </motion.div>
                      )}
                      {selectedHeroInfo === 'yoimiya' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-2 border border-red-500/30 bg-red-950/10 rounded text-[10px] mt-1 text-red-200 border-l-2 border-l-red-500">
                          <span className="font-bold text-red-400 block mb-0.5">🔥 RYUUGAN FIREWORKS</span>
                          Pyro speed fireballs. Rapid fire damage streams and high-velocity kinetic hits.
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* RIGHT PORTFOLIO HUB */}
            <div className="lg:col-span-2 space-y-12">

              {/* ANIMATED TECH STACKS SECTION */}
              <section className="cyber-card p-6 space-y-6 shadow-glow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-matrix/30 pb-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Cpu size={20} className="text-matrix-light animate-spin" style={{ animationDuration: '6s' }} />
                    <h2 className="text-lg font-bold tracking-widest text-matrix-light uppercase">TECH_INFRASTRUCTURE</h2>
                  </div>

                  {/* Category Filter Chips */}
                  <div className="flex flex-wrap gap-2">
                    {['All', 'Frontend', 'Backend', 'Database', 'Version Control', 'DevOps', 'Next-Gen'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          if (audioEnabled) clickSound();
                          setSelectedCategory(cat);
                        }}
                        className={`px-2 py-1 text-[10px] border rounded transition-all font-bold ${selectedCategory === cat
                          ? 'border-matrix bg-matrix/20 text-matrix-light text-glow'
                          : 'border-matrix/20 text-matrix/50 hover:border-matrix/40 hover:text-matrix'
                          }`}
                      >
                        {cat.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                        className="bg-black/80 border border-matrix/30 p-4 rounded relative overflow-hidden group cursor-pointer"
                      >
                        <div className="absolute top-0 right-0 p-1 text-[8px] bg-matrix-dark/30 border-l border-b border-matrix/20 text-matrix/50 group-hover:text-matrix-light">
                          {stack.category}
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                          {getTechIcon(stack.name)}
                          <h4 className="text-sm font-bold text-white group-hover:text-matrix-light transition-colors">
                            {stack.name}
                          </h4>
                        </div>
                        {/* Static visual gauge bar */}
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

              {/* CLASSIFIED ARTWORK VAULT */}
              <section className="cyber-card p-6 space-y-6 shadow-glow">
                <div className="flex items-center gap-2 border-b border-matrix/30 pb-4">
                  <ImageIcon size={20} className="text-matrix-light" />
                  <h2 className="text-lg font-bold tracking-widest text-matrix-light uppercase">CREATIVE_VAULT // BLUEPRINTS</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                {/* MODULAR EXPANSION MANUAL */}
                <div className="bg-matrix-dark/10 border border-matrix/30 p-4 rounded text-xs space-y-2">
                  <div className="flex items-center gap-1.5 text-matrix-light font-bold uppercase text-[10px]">
                    <Info size={14} className="text-matrix" /> MORE_ABOUT_ME:
                  </div>
                  <p className="text-[11px] text-matrix-light/80 leading-relaxed">
                    I'm actually from another planet, so beware hooman.
                  </p>
                  <ol className="list-decimal pl-4 space-y-1 text-[11px] text-matrix/75">
                    <li>totally not <code className="text-white">human</code>.</li>
                    <li>do you want to build a <code className="text-white">snowman</code>?</li>
                    <li>I can adapt easily to new environments just like planet Earth.</li>
                  </ol>
                </div>
              </section>

              {/* SPOTIFY MAIN MAIN PLAYER DECK */}
              <section className="cyber-card p-6 space-y-6 shadow-glow">
                <div className="flex items-center justify-between border-b border-matrix/30 pb-4">
                  <div className="flex items-center gap-2">
                    <Music size={20} className="text-matrix-light animate-pulse" />
                    <h2 className="text-lg font-bold tracking-widest text-matrix-light uppercase">SATELLITE_JAMMER // FAV MUSIC</h2>
                  </div>
                  <div className="text-[10px] text-matrix-dark font-mono uppercase tracking-widest">
                    EMBEDDED_DECK_ACTIVE
                  </div>
                </div>

                <div className="relative border border-matrix/40 rounded p-3 bg-black/90 shadow-glow-intense">

                  {/* Decorative radio mainframe dials and meters */}
                  <div className="flex justify-between items-center mb-3 px-1 border-b border-matrix-dark/20 pb-2">
                    <div className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-matrix animate-ping" />
                      <div className="text-[9px] text-matrix-light font-bold tracking-widest font-mono">TUNING: 88.4 MHz</div>
                    </div>
                    {/* Retro animated VU Level meters */}
                    <div className="flex items-end gap-0.5 h-3">
                      {[3, 6, 2, 8, 4, 7, 5].map((h, i) => (
                        <div
                          key={i}
                          className="w-1 bg-matrix rounded-t"
                          style={{
                            height: `${h * 10}%`,
                            animation: `bounce 0.8s ease infinite alternate`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <iframe
                    title="Spotify Embed: Recommendation Playlist"
                    src={`https://open.spotify.com/embed/playlist/3MEEl3gloZAUbEiCBFzm1m?utm_source=generator&theme=0`}
                    width="100%"
                    height="360px"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded border border-matrix-dark/30 opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
              </section>

            </div>
          </main>

          {/* INTERACTIVE CLI PANEL DRAWER */}
          <section className="cyber-card shadow-glow overflow-hidden">
            <button
              onClick={() => {
                if (audioEnabled) clickSound();
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
                      <span className="mr-2 text-matrix-dark font-bold font-mono">&gt;</span>
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

          {/* SOCIALS & FOOTER */}
          <footer className="space-y-8 pt-8 border-t border-matrix/20 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-matrix-dark uppercase tracking-widest font-bold">
              <Share2 size={14} /> SECURITY_CLEARANCE // CONNECT_CHANNELS
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {[
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
                  onClick={() => { if (audioEnabled) clickSound(); }}
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

      {/* Bounce animation override for audio level indicators */}
      <style>{`
        @keyframes bounce {
          0% { transform: scaleY(0.25); }
          100% { transform: scaleY(1); }
        }
      `}</style>

    </div>
  );
}
