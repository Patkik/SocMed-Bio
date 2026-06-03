import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal, ShieldAlert, Cpu, Share2, Music,
  Image as ImageIcon, Github, Instagram, Facebook,
  Linkedin, ExternalLink, Volume2, VolumeX,
  TerminalSquare, Info, Code, FileCode, Coffee,
  Database, GitBranch, Cloud, Bot, Box, Mail
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

const SERVICES_DATA = [
  {
    id: 1,
    tag: "// SERVICE_01 // ACTIVE",
    title: "Full-stack Web Developer",
    shortDesc: "End-to-end web deployment, interactive modules, and high-performance server structures.",
    projectName: "COMSOC_MIS_v1.0",
    projectDesc: "A secure student organization management portal featuring live biometric dashboard logs, digital roster rosters, security firewall overlays, and high-fidelity custom design systems.",
    projectLink: "https://github.com/Patkik/SocMed-Bio",
    projectImage: "/img/art1.jpg" // Clean mockup link (easy to replace images here)
  },
  {
    id: 2,
    tag: "// SERVICE_02 // ACTIVE",
    title: "Graphic Designer",
    shortDesc: "Sleek visual layouts, modern UI branding elements, and customized digital assets.",
    projectName: "CATERPRO_BRAND_DECK",
    projectDesc: "A premium corporate identity design system. Crafted with strict Apple-inspired minimalist design rules, balanced typography ratios, and micro-interaction visual blueprints.",
    projectLink: "https://github.com/Patkik/SocMed-Bio",
    projectImage: "/img/art2.jpg" // Clean mockup link (easy to replace images here)
  }
];

const TECH_DETAILS: Record<string, { systemRole: string; xp: string; projects: string }> = {
  "html": {
    systemRole: "Markup structural foundation layer.",
    xp: "Crafting semantically complete Document Object Models with SEO compliance and ARIA access keys.",
    projects: "Comsoc MIS, CaterPro Brand Landing Page."
  },
  "css": {
    systemRole: "Visual layout styling engine.",
    xp: "Designing modern fluid grid frameworks, CRT shaders, glassmorphism templates, and adaptive animation curves.",
    projects: "Holy Portfolio, CaterPro Presentation Deck."
  },
  "javascript": {
    systemRole: "Runtime behavioral engine.",
    xp: "Asynchronous task orchestration, Web Audio API synthesis, dynamic canvas rendering, and live DOM updates.",
    projects: "Spaceship Flight HUD, Comsoc member dashboard."
  },
  "typescript": {
    systemRole: "Compile-time strict typing controller.",
    xp: "Writing interface contracts, generics, strict null-safe checks, and compiler declarations to prevent system crashes.",
    projects: "Holy Portfolio main build, SocMed-Bio telemetry data layer."
  },
  "react": {
    systemRole: "Reactive state component virtual DOM engine.",
    xp: "Framer Motion layout animations, component hooks (useState, useEffect, useRef), and lazy rendering optimizations.",
    projects: "Hacker Dashboard Mainframe, Comsoc portal."
  },
  "java": {
    systemRole: "Back-end business logic processing node.",
    xp: "Object-oriented service development, relational mapping, secure REST endpoint controllers, and thread execution.",
    projects: "CaterPro transaction service, Comsoc core audit server."
  },
  "mysql": {
    systemRole: "Relational database structure engine.",
    xp: "Designing normalized schemas, indexing keys, foreign key constraints, and writing high-speed query updates.",
    projects: "Comsoc member roster data logs, CaterPro backend storage."
  },
  "mongodb": {
    systemRole: "NoSQL document database catalog.",
    xp: "BSON data schema designs, unstructured telemetry document logs, database clustering, and aggregate lookups.",
    projects: "SocMed-Bio activity metrics, gaming API cache."
  },
  "redis": {
    systemRole: "In-memory key-value caching system.",
    xp: "Accelerating query speeds by caching API payloads, session tokens, and routing indexes under 5ms.",
    projects: "Spaceship cockpit metrics, shell history session buffer."
  },
  "git": {
    systemRole: "Distributed version control system.",
    xp: "Branching protocols, pull requests, merge conflict resolutions, and CI/CD pipelines deployment integration.",
    projects: "All projects managed under Github Patkik/SocMed-Bio repo."
  },
  "docker": {
    systemRole: "Container virtualization infrastructure.",
    xp: "Multi-stage Dockerfile configurations, alpine OS micro-images, and microservice containers networking configurations.",
    projects: "Warped Portfolio Docker server deployments, AWS container runs."
  },
  "aws": {
    systemRole: "Cloud computing compute cluster host.",
    xp: "EC2 virtual servers provisioning, security group network configurations, SSH certificate validations, and public domain hosting.",
    projects: "SocMed-Bio Live Server hosting, active portfolio EC2 nodes."
  },
  "agentic a.i": {
    systemRole: "Next-Gen autonomous workspace assistant.",
    xp: "Interpreting developer requirements, compiling software assets, deploying servers, and optimizing runtime parameters autonomously.",
    projects: "Antigravity coding session, adaptive cockpit UI developer partner."
  }
};

// --- TERMINAL TYPEWRITER ENGINE ---
function Typewriter({ 
  text, 
  speed = 12, 
  onTick 
}: { 
  text: string; 
  speed?: number; 
  onTick?: () => void;
}) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        const char = text.charAt(i);
        setDisplayedText((prev) => prev + char);
        if (onTick && char !== ' ') {
          onTick();
        }
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayedText}</span>;
}

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

  // Cockpit hyper-drive launch states
  const [loadStage, setLoadStage] = useState<'BOOTING' | 'READY_TO_LAUNCH' | 'CHARGING' | 'COUNTDOWN' | 'WARPING'>('BOOTING');
  const [warpProgress, setWarpProgress] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [flash, setFlash] = useState(false);
  const loadingCanvasRef = useRef<HTMLCanvasElement | null>(null);

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
  const [selectedTech, setSelectedTech] = useState<any | null>(null);
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [spotifyOpen, setSpotifyOpen] = useState(false);

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

  const playRobotStartup = () => {
    if (!audioEnabled || !audioCtxRef.current) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.setValueAtTime(800, now + 0.05);
      osc.frequency.setValueAtTime(1600, now + 0.1);
      
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.25);
    } catch (e) {}
  };

  const playRobotShutdown = () => {
    if (!audioEnabled || !audioCtxRef.current) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.15);
      
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.2);
    } catch (e) {}
  };

  const typeTick = () => {
    playSound(1800 + Math.random() * 400, 'sine', 0.015, 0.01);
  };

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
          setLoadStage('READY_TO_LAUNCH');
          if (audioEnabled) synthBeep();
        }, 800);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [audioEnabled]);

  // Loading Screen Starfield Animation Loop (Warp Speed)
  useEffect(() => {
    if (!loading || !loadingCanvasRef.current) return;
    const canvas = loadingCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const numStars = 250;
    const stars: Array<{ x: number; y: number; z: number; color: string }> = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 1000,
        y: (Math.random() - 0.5) * 1000,
        z: Math.random() * 1000,
        color: `rgba(0, 255, 65, ${0.4 + Math.random() * 0.6})`
      });
    }

    let animationFrameId: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.fillRect(0, 0, width, height);

      let speed = 2.5;
      if (loadStage === 'CHARGING') {
        speed = 2.5 + (warpProgress / 100) * 18;
      } else if (loadStage === 'COUNTDOWN') {
        speed = 22;
      } else if (loadStage === 'WARPING') {
        speed = 60;
      }

      ctx.lineWidth = loadStage === 'WARPING' ? 4 : 1.5;

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        const pz = star.z;
        star.z -= speed;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * 1000;
          star.y = (Math.random() - 0.5) * 1000;
          star.z = 1000;
          continue;
        }

        const k = 400;
        const x = (star.x / star.z) * k + width / 2;
        const y = (star.y / star.z) * k + height / 2;

        const px = (star.x / pz) * k + width / 2;
        const py = (star.y / pz) * k + height / 2;

        const size = (1 - star.z / 1000) * 3;

        if (x >= 0 && x <= width && y >= 0 && y <= height) {
          ctx.beginPath();
          ctx.strokeStyle = star.color;
          if (loadStage === 'WARPING' || loadStage === 'COUNTDOWN') {
            ctx.moveTo(px, py);
            ctx.lineTo(x, y);
            ctx.stroke();
          } else {
            ctx.fillStyle = star.color;
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    const renderLoop = () => {
      draw();
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [loading, loadStage, warpProgress]);

  // Audio Synthesizers for Cockpit hyperdrive
  const playWarpSound = () => {
    if (!audioEnabled || !audioCtxRef.current) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 5);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 4.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 5);
    } catch (e) {}
  };

  const playBoomSound = () => {
    if (!audioEnabled || !audioCtxRef.current) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 1.5);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.5);
    } catch (e) {}
  };

  // Launch core action
  const handleInitiateWarp = () => {
    setLoadStage('CHARGING');
    playWarpSound();

    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setWarpProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setLoadStage('COUNTDOWN');
      }
    }, 60);
  };

  // Countdown and Warp completion handling
  useEffect(() => {
    if (loadStage !== 'COUNTDOWN') return;

    let timer = 3;
    setCountdown(timer);

    const interval = setInterval(() => {
      timer -= 1;
      setCountdown(timer);
      if (audioEnabled) playSound(300, 'square', 0.15, 0.05);

      if (timer <= 0) {
        clearInterval(interval);
        setLoadStage('WARPING');
        playBoomSound();

        setTimeout(() => {
          setLoading(false);
          setFlash(true);
        }, 1600);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [loadStage]);

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

      {/* 1. CINEMATIC 3D COCKPIT LOADING SCREEN */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#020202] flex flex-col justify-between overflow-hidden p-4 md:p-8"
            exit={{
              scale: 1.8,
              opacity: 0,
              filter: "blur(30px)",
              transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
            }}
          >
            {/* Warp Starfield Background Canvas */}
            <canvas
              ref={loadingCanvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0"
            />

            {/* Futuristic Curved Viewport Border / Cockpit Framing */}
            <div className="absolute inset-0 border-[10px] md:border-[16px] border-matrix-dark/20 pointer-events-none z-10" />
            <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#00ff41]/5 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#00ff41]/5 to-transparent pointer-events-none z-10" />

            {/* Cockpit HUD Structural Brackets */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-matrix/40 z-10 hidden md:block" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-matrix/40 z-10 hidden md:block" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-matrix/40 z-10 hidden md:block" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-matrix/40 z-10 hidden md:block" />

            {/* COCKPIT STATUS TOP BAR */}
            <div className="flex items-center justify-between border-b border-matrix/20 pb-2 z-20 select-none max-w-7xl mx-auto w-full">
              <div className="flex items-center gap-2">
                <Terminal className="animate-pulse text-matrix" size={16} />
                <span className="text-[10px] md:text-xs text-matrix-light font-bold uppercase tracking-widest text-glow">
                  COCKPIT_HUD_SECURE_LINK // SYS: ACTIVE
                </span>
              </div>

              <button
                onClick={() => {
                  initAudio();
                  setAudioEnabled(!audioEnabled);
                }}
                className={`px-2 py-0.5 text-[9px] border rounded transition-all flex items-center gap-1 ${audioEnabled ? 'border-matrix bg-matrix-dark/20 text-matrix-light' : 'border-matrix-dark text-matrix/50'
                  }`}
              >
                {audioEnabled ? <Volume2 size={10} /> : <VolumeX size={10} />}
                <span>{audioEnabled ? "SYNTH_ON" : "SYNTH_MUTED"}</span>
              </button>
            </div>

            {/* MAIN 3D COCKPIT INSTRUMENT LAYOUT */}
            <div
              className="flex-grow flex flex-col lg:flex-row justify-center items-center gap-6 max-w-7xl mx-auto w-full z-20 py-4"
              style={{
                transform: loadStage === 'WARPING' ? 'translate(calc(Math.random() * 4px - 2px), calc(Math.random() * 4px - 2px))' : 'none'
              }}
            >
              {/* LEFT INSTRUMENT WING PANEL */}
              <div className="hidden lg:flex flex-col gap-4 w-44 shrink-0 bg-black/60 border border-matrix/10 p-3 rounded font-mono text-[9px] text-matrix-dark shadow-glow">
                <div className="border-b border-matrix/20 pb-1 mb-1 font-bold text-matrix">FLIGHT_SYSTEMS</div>
                <div className="space-y-1.5">
                  <div className="flex justify-between"><span>REACTOR_TEMP:</span><span className="text-matrix-light">324.8 C</span></div>
                  <div className="flex justify-between"><span>CORE_PRESSURE:</span><span className="text-matrix-light">88.4 kPa</span></div>
                  <div className="flex justify-between"><span>VECTOR_CALIBR:</span><span className="text-matrix-light">PASS</span></div>
                  <div className="flex justify-between"><span>GRAVITY_NODE:</span><span className="text-matrix-light">G-1.02</span></div>
                </div>

                <div className="mt-4 border-b border-matrix/20 pb-1 mb-1 font-bold text-matrix">RADAR_SWEEP</div>
                <div className="h-20 border border-matrix/10 rounded relative flex items-center justify-center bg-[#010101] overflow-hidden">
                  {/* Glowing spinning radar line */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="absolute w-20 h-0.5 bg-gradient-to-r from-matrix/50 to-transparent origin-left"
                    style={{ left: '50%' }}
                  />
                  <div className="w-12 h-12 rounded-full border border-matrix-dark/20" />
                  <div className="w-6 h-6 rounded-full border border-matrix-dark/10" />
                  <div className="absolute text-[8px] text-matrix-light animate-pulse">// 🦕 DINO DETECTED</div>
                </div>
              </div>

              {/* CENTER 3D HOLOGRAPHIC HUD MONITOR */}
              <motion.div
                animate={loadStage === 'WARPING' ? {
                  x: [0, -3, 3, -2, 2, 0],
                  y: [0, 2, -3, 1, -2, 0],
                  rotateZ: [0, -0.5, 0.5, 0]
                } : {}}
                transition={loadStage === 'WARPING' ? {
                  repeat: Infinity,
                  duration: 0.15
                } : {}}
                className="flex-grow flex flex-col justify-center items-center max-w-3xl w-full border-2 border-matrix/30 bg-black/85 p-6 rounded relative shadow-glow-intense overflow-hidden animate-pulse"
                style={{
                  transform: "perspective(1000px) rotateX(10deg)",
                  transformStyle: "preserve-3d",
                  animationDuration: '6s'
                }}
              >
                {/* HUD scanline overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-matrix/5 via-transparent to-matrix/5" />

                {/* HUD STAGE RENDERERS */}

                {/* A. BOOTING TYPEWRITER LOGGER */}
                {loadStage === 'BOOTING' && (
                  <div className="w-full flex flex-col justify-between min-h-[300px]">
                    <div className="space-y-2 h-[260px] overflow-y-auto pr-2 scrollbar-thin text-left">
                      {terminalLogs.map((log, index) => {
                        const isLast = index === bootSequences.length - 1;
                        return (
                          <motion.p
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-xs flex items-start gap-1"
                          >
                            <span className="text-matrix-dark mr-1 shrink-0">&gt;&gt;</span>
                            <GlitchLog text={log} isLast={isLast} />
                          </motion.p>
                        );
                      })}
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-2 h-3.5 bg-matrix ml-1 align-middle"
                      />
                    </div>
                    <div className="text-[10px] text-matrix-dark flex justify-between border-t border-matrix/10 pt-2 uppercase font-bold tracking-widest mt-4">
                      <span>DECRYPTING_COGNITIVE_NODES</span>
                      <span>{Math.round((terminalLogs.length / bootSequences.length) * 100)}%</span>
                    </div>
                  </div>
                )}

                {/* B. READY TO LAUNCH STAGE */}
                {loadStage === 'READY_TO_LAUNCH' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-6 space-y-6 flex flex-col items-center justify-center min-h-[300px] w-full"
                  >
                    <div className="space-y-3">
                      <div className="bg-matrix/10 border border-matrix/30 text-matrix-light text-[10px] font-bold py-1 px-4 rounded inline-block uppercase tracking-widest animate-pulse shadow-glow">
                        COCKPIT SYSTEMS ACTIVE // DEPLOY_READY
                      </div>
                      <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-wider text-glow leading-snug">
                        YOU ARE ABOUT TO ENTER <br />
                        <span className="text-matrix-light animate-cyber-glitch font-black" data-text="PATRICK JOSH'S DOMAIN">PATRICK JOSH'S DOMAIN</span>
                      </h2>
                      <p className="text-[10px] md:text-xs text-matrix-light/60 max-w-md mx-auto uppercase font-bold tracking-widest animate-pulse">
                        WARP DRIVE SYSTEMS STANDING BY. BE READY FOR LAUNCH SEQUENCE.
                      </p>
                    </div>

                    {/* Interactive Launch Button */}
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(0,255,65,0.6)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleInitiateWarp}
                      className="px-8 py-4 border-2 border-matrix bg-matrix-dark/20 text-matrix-light hover:bg-matrix hover:text-black text-glow text-xs font-black uppercase rounded tracking-widest flex items-center gap-2 cursor-pointer transition-all shadow-glow border-glow"
                    >
                      <TerminalSquare size={14} className="animate-spin" style={{ animationDuration: '3s' }} />
                      <span>INITIATE HYPERSPACE LAUNCH</span>
                    </motion.button>
                  </motion.div>
                )}

                {/* C. CHARGING STAGE */}
                {loadStage === 'CHARGING' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-6 space-y-6 w-full flex flex-col justify-center min-h-[300px]"
                  >
                    <div className="space-y-2">
                      <div className="text-[10px] text-matrix font-bold tracking-widest uppercase animate-pulse">
                        CHARGING HYPERDRIVE DRIVE CORES
                      </div>
                      <div className="text-3xl md:text-5xl font-black text-white tracking-widest text-glow">
                        {warpProgress}%
                      </div>
                      <p className="text-[10px] text-matrix-light/70 uppercase font-bold animate-pulse">
                        VECTOR STABILIZATION IN PROGRESS... DO NOT INTERRUPT
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full max-w-md mx-auto bg-matrix-dark/20 border border-matrix/20 h-4 rounded-full overflow-hidden p-0.5 shadow-glow">
                      <motion.div
                        className="bg-matrix h-full rounded-full shadow-glow"
                        style={{ width: `${warpProgress}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto text-[8px] text-matrix-dark font-mono uppercase font-bold">
                      <div className="border border-matrix-dark/20 p-1">SYS: REFLUX</div>
                      <div className="border border-matrix-dark/20 p-1 animate-pulse text-matrix-light">WARP_STABLE</div>
                      <div className="border border-matrix-dark/20 p-1">VOLT: 8.8kV</div>
                    </div>
                  </motion.div>
                )}

                {/* D. COUNTDOWN STAGE */}
                {loadStage === 'COUNTDOWN' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-6 space-y-6 flex flex-col items-center justify-center min-h-[300px] w-full"
                  >
                    <div className="space-y-1">
                      <div className="bg-red-950/20 border border-red-500/30 text-red-400 text-[10px] font-bold py-1 px-4 rounded inline-block uppercase tracking-widest animate-pulse shadow-glow-red">
                        HYPERSPACE DEPLOYMENT DETECTED
                      </div>
                      <h3 className="text-xs font-black text-matrix-light uppercase tracking-widest pt-2 text-glow">
                        YOU ARE ABOUT TO ENTER PATRICK JOSH'S DOMAIN, BE READY!
                      </h3>
                    </div>

                    {/* Mega 3D countdown text */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={countdown}
                        initial={{ scale: 0.2, opacity: 0, rotateY: 90 }}
                        animate={{ scale: 1.2, opacity: 1, rotateY: 0 }}
                        exit={{ scale: 2, opacity: 0, filter: "blur(8px)" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-7xl md:text-9xl font-black text-matrix-light text-glow select-none"
                      >
                        {countdown}
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* E. WARPING SPEED STAGE */}
                {loadStage === 'WARPING' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-6 space-y-6 flex flex-col items-center justify-center min-h-[300px] w-full"
                  >
                    <div className="space-y-2">
                      <div className="text-red-500 font-bold uppercase text-xs tracking-widest animate-ping">
                        // WARNING: ABSOLUTE WARPING //
                      </div>
                      <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-wider animate-pulse text-glow-red font-mono">
                        WARP ENGAGED!
                      </h2>
                      <p className="text-[10px] text-matrix-light/60 uppercase font-bold tracking-widest animate-pulse">
                        LANDING IN PATRICK JOSH'S SYSTEMS...
                      </p>
                    </div>

                    <div className="w-16 h-1 bg-red-500 animate-pulse mt-4 shadow-glow-red" />
                  </motion.div>
                )}

              </motion.div>

              {/* RIGHT INSTRUMENT WING PANEL */}
              <div className="hidden lg:flex flex-col gap-4 w-44 shrink-0 bg-black/60 border border-matrix/10 p-3 rounded font-mono text-[9px] text-matrix-dark shadow-glow">
                <div className="border-b border-matrix/20 pb-1 mb-1 font-bold text-matrix">WARP_STABILIZER</div>
                <div className="space-y-1.5">
                  <div className="flex justify-between"><span>CORE_STABILITY:</span><span className="text-matrix-light">{loadStage === 'WARPING' ? '9.4%' : '99.8%'}</span></div>
                  <div className="flex justify-between"><span>GRID_CONVERG:</span><span className="text-matrix-light">94.8%</span></div>
                  <div className="flex justify-between"><span>WARP_GATE:</span><span className="text-matrix-light">OPEN</span></div>
                </div>

                <div className="mt-4 border-b border-matrix/20 pb-1 mb-1 font-bold text-matrix">REACTOR_CORE</div>
                <div className="w-full bg-[#050505] h-20 rounded border border-matrix/10 relative overflow-hidden flex flex-col justify-end p-1">
                  <div className="flex justify-between items-end gap-1 h-full">
                    {[5, 8, 3, 9, 6, 7].map((b, i) => {
                      let level = b;
                      if (loadStage === 'CHARGING') level = Math.min(10, Math.floor(b * (warpProgress / 100) + 1));
                      if (loadStage === 'COUNTDOWN') level = 9;
                      if (loadStage === 'WARPING') level = 10;
                      return (
                        <div
                          key={i}
                          className={`w-full rounded-t transition-all ${level > 8 ? 'bg-red-500 shadow-glow-red' : 'bg-matrix'}`}
                          style={{ height: `${level * 10}%` }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* COCKPIT STATUS BOTTOM SUMMARY */}
            <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-[9px] text-matrix-dark border-t border-matrix/20 pt-2 z-20 select-none">
              <span className="animate-pulse uppercase">
                SYS_STATUS: {loadStage}
              </span>
              <span className="uppercase font-bold text-matrix-light tracking-wider">
                {loadStage === 'BOOTING' && "INITIALIZING SYSTEM_LINK"}
                {loadStage === 'READY_TO_LAUNCH' && "HYPERDRIVE READY FOR LAUNCH"}
                {loadStage === 'CHARGING' && `CHARGING STABLE DRIVES (${warpProgress}%)`}
                {loadStage === 'COUNTDOWN' && "COMMENCING WARP SEQUENCE IN T-MINUS"}
                {loadStage === 'WARPING' && "WARNING: WARPING SPEED ACTIVE"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN HUB INTERFACE */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0, scale: 1.12, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
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

          {/* MAIN GRID BODY: RESPONSIVE 3-COLUMN TELEMETRY HUB */}
          <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* COLUMN 1: BIO & SERVICES (STAYS AT THE TOP ON MOBILE) */}
            <div className="space-y-8">
              
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

              {/* SERVICES PROVISIONED CARD */}
              <div className="cyber-card p-6 space-y-4 shadow-glow">
                <div className="flex items-center gap-2 border-b border-matrix/30 pb-3">
                  <Terminal size={18} className="text-matrix-light" />
                  <h2 className="text-sm font-bold tracking-widest text-matrix-light uppercase">SERVICES_PROVISIONED</h2>
                </div>
                <div className="space-y-3 font-mono">
                  {SERVICES_DATA.map((service) => {
                    const isExpanded = expandedService === service.id;
                    return (
                      <div 
                        key={service.id}
                        className="border border-matrix/20 bg-matrix-dark/5 rounded overflow-hidden transition-all duration-300"
                      >
                        {/* Header accordion trigger */}
                        <button
                          onClick={() => {
                            if (audioEnabled) clickSound();
                            setExpandedService(isExpanded ? null : service.id);
                          }}
                          className="w-full flex flex-col items-start p-3 hover:bg-matrix-dark/10 text-left transition-colors focus:outline-none"
                        >
                          <div className="flex justify-between w-full items-center">
                            <span className="text-matrix-dark text-[9px] uppercase tracking-wider font-bold">
                              {service.tag}
                            </span>
                            <span className="text-matrix text-xs">
                              {isExpanded ? "[-]" : "[+]"}
                            </span>
                          </div>
                          <span className="text-white font-bold text-xs mt-1">
                            {service.title}
                          </span>
                          <p className="text-[10px] text-matrix/60 mt-1">
                            {service.shortDesc}
                          </p>
                        </button>

                        {/* Collapsible apple-styled cinematic layout */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: "easeInOut" }}
                              className="border-t border-matrix/10 bg-black/40 px-3 pb-3 overflow-hidden"
                            >
                              {/* 
                                ================================================================
                                CINEMATIC ADVERTISEMENT DISPLAY (APPLE-LIKE PRODUCT PREVIEW)
                                ----------------------------------------------------------------
                                REPLACE_IMAGE_GUIDE:
                                To replace the project placeholder image with your own,
                                simply swap the 'src' path below in the <img> tag.
                                ================================================================
                              */}
                              <div className="mt-3 border border-matrix/25 rounded-md bg-black/80 overflow-hidden relative group hover:border-matrix/40 transition-all shadow-glow">
                                <div className="h-40 bg-gradient-to-br from-matrix-dark/20 to-black overflow-hidden relative flex items-center justify-center">
                                  <img 
                                    src={service.projectImage} 
                                    alt={service.projectName} 
                                    className="w-full h-full object-cover opacity-40 group-hover:opacity-75 group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0" 
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                                  <div className="absolute bottom-3 left-3 right-3">
                                    <span className="text-[8px] uppercase tracking-widest text-matrix bg-matrix-dark/50 px-1.5 py-0.5 rounded border border-matrix/20 mb-1 inline-block">
                                      // KEY_DEPLOYMENT
                                    </span>
                                    <h4 className="text-white font-black text-xs tracking-wider uppercase">{service.projectName}</h4>
                                  </div>
                                </div>
                                <div className="p-3 space-y-3 font-mono">
                                  <p className="text-[9px] text-matrix-light/80 leading-relaxed font-sans">
                                    {service.projectDesc}
                                  </p>
                                  <a 
                                    href={service.projectLink} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="inline-flex items-center justify-center gap-1.5 border border-matrix bg-matrix-dark/20 hover:bg-matrix hover:text-black py-1 px-3 rounded text-[9px] font-black tracking-wider uppercase transition-all shadow-glow w-full text-center"
                                  >
                                    <span>DEPLOYED_MAIN_PORTAL</span>
                                    <ExternalLink size={8} />
                                  </a>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                  
                  <div className="pt-2">
                    <a
                      href="mailto:patrickjoshanedez35@gmail.com"
                      onClick={() => { if (audioEnabled) clickSound(); }}
                      className="inline-flex items-center gap-2 border border-matrix bg-matrix-dark/20 hover:bg-matrix/10 px-4 py-2 rounded text-xs text-matrix-light font-bold transition-all shadow-glow w-full justify-center"
                    >
                      <Mail size={14} className="animate-pulse text-matrix-light" />
                      <span>CONTACT: patrickjoshanedez35@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* COLUMN 2: TECH INFRASTRUCTURE & SYSTEM SHELL (MIDDLE COLUMN) */}
            <div className="space-y-8">

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
                        onClick={() => {
                          if (audioEnabled) clickSound();
                          const key = stack.name.toLowerCase();
                          const details = TECH_DETAILS[key] || {
                            systemRole: "Core structural development stack.",
                            xp: "Integrated implementation within operational directives.",
                            projects: "Internal portfolio framework."
                          };
                          setSelectedTech({
                            name: stack.name,
                            category: stack.category,
                            ...details
                          });
                          playRobotStartup();
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

            </div>

            {/* COLUMN 3: BLUEPRINTS, GAMING & SPEC LOCKS (RIGHT COLUMN) */}
            <div className="space-y-8">

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
                        <span className="text-white font-bold text-xs">SECRET</span>
                      ) : (
                        <GlitchText text="[REDACTED]" className="text-red-500 bg-red-950/20 px-1 border border-red-500/30 text-xs cursor-pointer" />
                      )}
                    </button>
                  </div>

                  <div className="text-sm flex justify-between items-center border-b border-matrix-dark/10 py-1">
                    <span className="text-matrix/70 text-xs">SECRET</span>
                    <button
                      onClick={() => {
                        if (audioEnabled) clickSound();
                        setRevealBirthday(!revealBirthday);
                      }}
                      className="focus:outline-none"
                    >
                      {revealBirthday ? (
                        <span className="text-white font-bold text-xs">NASA COMMENT SECTION</span>
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
                    <span className="text-white font-bold">CHILL_STATE</span>
                  </div>

                  <div className="text-xs flex justify-between py-1">
                    <span className="text-matrix/70">ENERGY_SRC:</span>
                    <span className="text-matrix-light text-glow">COFFEE_AND_PROBABLY_SLEEPING</span>
                  </div>
                </div>
              </div>

            </div>

          </main>
          
          {/* SOCIALS & FOOTER */}
          <footer className="space-y-8 pt-8 border-t border-matrix/20 text-center">
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

      {/* 3. COGNITIVE ROBOT ASSISTANT SUBSYSTEM */}
      <AnimatePresence>
        {selectedTech && (
          <motion.div
            initial={{ y: 200, opacity: 0, scale: 0.95 }}
            animate={{ 
              y: 0, 
              opacity: 1, 
              scale: 1,
              x: [0, -1, 1, 0],
              transition: { 
                y: { type: "spring", damping: 20 },
                x: { repeat: Infinity, duration: 1.5, ease: "linear" }
              }
            }}
            exit={{ y: 150, opacity: 0, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92vw] max-w-2xl z-50 bg-[#020202]/95 backdrop-blur-md border-2 border-matrix rounded-xl shadow-glow overflow-hidden select-none"
          >
            {/* Header / Hazard lines bar */}
            <div className="flex items-center justify-between bg-matrix/10 border-b border-matrix/30 px-4 py-2 font-mono">
              <div className="flex items-center gap-2">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="text-matrix font-bold tracking-tighter text-xs"
                >
                  🤖 [ ◉ _ ◉ ]
                </motion.div>
                <span className="text-[10px] text-matrix-light font-bold tracking-widest uppercase">
                  SYS_ROBOT_INTELLIGENCE // INTERPRETING: {selectedTech.name.toUpperCase()}
                </span>
              </div>
              <button
                onClick={() => {
                  playRobotShutdown();
                  setSelectedTech(null);
                }}
                className="text-matrix hover:text-white border border-matrix/30 hover:border-matrix bg-black px-1.5 py-0.5 rounded text-[9px] font-bold font-mono transition-all focus:outline-none"
              >
                CLOSE [X]
              </button>
            </div>

            {/* Robot Content chassis */}
            <div className="p-4 sm:p-6 space-y-4 font-mono text-xs text-matrix">
              
              {/* Dynamic Game Character Face */}
              <div className="flex items-center gap-4 bg-matrix-dark/10 border border-matrix/20 p-3 rounded">
                <div className="text-xl md:text-2xl font-bold bg-[#040404] px-3 py-1.5 rounded border border-matrix/10 text-matrix-light text-glow select-none tracking-widest animate-pulse">
                  [ ◕ _ ◕ ]
                </div>
                <div className="text-[10px] text-matrix-light/80 leading-relaxed font-mono uppercase">
                  "beep! Analyzing technical parameters. Telemetry indicates optimal compilation. Typewriter system active."
                </div>
              </div>

              {/* Data logs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-matrix/20 pt-4">
                
                <div className="sm:border-r border-matrix/15 pr-2">
                  <span className="text-matrix-dark text-[9px] uppercase tracking-wider block font-bold mb-1">// COGNITIVE_ROLE</span>
                  <p className="text-white text-[11px] font-sans leading-relaxed">
                    <Typewriter text={selectedTech.systemRole} speed={12} onTick={typeTick} />
                  </p>
                </div>
                
                <div className="sm:border-r border-matrix/15 px-2">
                  <span className="text-matrix-dark text-[9px] uppercase tracking-wider block font-bold mb-1">// OPERATOR_TRACK_RECORD</span>
                  <p className="text-white text-[11px] font-sans leading-relaxed">
                    <Typewriter text={selectedTech.xp} speed={12} onTick={typeTick} />
                  </p>
                </div>
                
                <div className="pl-2">
                  <span className="text-matrix-dark text-[9px] uppercase tracking-wider block font-bold mb-1">// ASSOCIATED_PROJECTS</span>
                  <p className="text-matrix-light text-[11px] font-sans font-bold leading-relaxed text-glow">
                    <Typewriter text={selectedTech.projects} speed={12} onTick={typeTick} />
                  </p>
                </div>

              </div>
              
              <div className="text-[8px] text-matrix-dark flex justify-between border-t border-matrix-dark/20 pt-2 uppercase font-bold">
                <span>TELEMETRY_LOG: STABLE</span>
                <span>ROBOT_STATUS: ACTIVE // FEED_LOCK</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. PERSISTENT FLOATING AUDIO CONTROLLER */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0, 255, 65, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (audioEnabled) clickSound();
            setSpotifyOpen(!spotifyOpen);
          }}
          className="w-12 h-12 rounded-full border-2 border-matrix bg-black flex items-center justify-center text-matrix shadow-glow transition-all focus:outline-none"
        >
          <motion.div
            animate={spotifyOpen ? { rotate: 360 } : { rotate: 0 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          >
            <Music size={20} className="text-matrix-light" />
          </motion.div>
        </motion.button>
      </div>

      {/* Spotify Floating Window Panel */}
      <AnimatePresence>
        {spotifyOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-20 right-6 z-40 bg-[#020202]/95 backdrop-blur-md border border-matrix/30 rounded-xl p-3 w-80 max-w-[90vw] shadow-glow"
          >
            {/* Top window bar */}
            <div className="flex justify-between items-center mb-2 px-1 border-b border-matrix/20 pb-1.5">
              <div className="flex gap-2 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-matrix animate-ping" />
                <span className="text-[9px] text-matrix-light font-bold tracking-widest font-mono">
                  TUNING: 88.4 MHz // AUDIO_DECK
                </span>
              </div>
              <button
                onClick={() => {
                  if (audioEnabled) clickSound();
                  setSpotifyOpen(false);
                }}
                className="text-matrix-dark hover:text-matrix text-[9px] font-bold uppercase font-mono px-1 focus:outline-none"
              >
                [-]
              </button>
            </div>

            <iframe
              title="Spotify Embed: Recommendation Playlist"
              src={`https://open.spotify.com/embed/playlist/3MEEl3gloZAUbEiCBFzm1m?utm_source=generator&theme=0`}
              width="100%"
              height="350px"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded border border-matrix-dark/30 opacity-90 hover:opacity-100 transition-opacity"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* WHITE WARP FLASH OVERLAY */}
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
