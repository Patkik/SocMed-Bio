import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Volume2, VolumeX, TerminalSquare } from 'lucide-react';
import { useAudio, setGlobalAudioEnabled, getGlobalAudioEnabled } from '../hooks/useAudio';
import { GlitchText } from './GlitchText';

// Local log glitcher
const GlitchLog: React.FC<{ text: string; isLast: boolean }> = ({ text, isLast }) => {
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
};

interface CockpitLoaderProps {
  onComplete: () => void;
}

export const CockpitLoader: React.FC<CockpitLoaderProps> = ({ onComplete }) => {
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [audioEnabled, setAudioEnabled] = useState(getGlobalAudioEnabled());
  const [loadStage, setLoadStage] = useState<'BOOTING' | 'READY_TO_LAUNCH' | 'CHARGING' | 'COUNTDOWN' | 'WARPING'>('BOOTING');
  const [warpProgress, setWarpProgress] = useState(0);
  const [countdown, setCountdown] = useState(3);

  const { initAudio, playWarpSound, playBoomSound, clickSound, synthBeep, playRawSound } = useAudio();
  const loadingCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // References to prevent canvas re-initialization during updates
  const loadStageRef = useRef(loadStage);
  const warpProgressRef = useRef(warpProgress);

  useEffect(() => {
    loadStageRef.current = loadStage;
  }, [loadStage]);

  useEffect(() => {
    warpProgressRef.current = warpProgress;
  }, [warpProgress]);

  const bootSequences = [
    "INITIATING COGNITIVE BOOT PROTOCOLS...",
    "ACCESSING CORE://PATRICK_JOSH_ANEDEZ...",
    "LOADING BIOMETRIC_DATA: ...",
    "SYSTEM VARIABLES: Night_Owl = TRUE // Mood = CHILL",
    "BYPASSING SECURITY FIREWALL LEVELS 1-4...",
    "WARNING: REDACTED_PARAMETERS ENCOUNTERED...",
    "DECRYPTING DINOSAUR_GENOME_SEQUENCE [88% MATCH]...",
    "COMPILING CORE SYSTEM INTEL...",
    "ACCESS GRANTED. WELCOME BACK, OPERATOR."
  ];

  // 1. Boot Logger Sequence
  useEffect(() => {
    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < bootSequences.length) {
        setTerminalLogs((prev) => [...prev, bootSequences[logIndex]]);
        if (audioEnabled) playRawSound(600 + logIndex * 100, 'sine', 0.1, 0.02);
        logIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setLoadStage('READY_TO_LAUNCH');
          if (audioEnabled) synthBeep();
        }, 850);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [audioEnabled, playRawSound, synthBeep]);

  // 2. Countdown sequence
  useEffect(() => {
    if (loadStage !== 'COUNTDOWN') return;

    let timer = 3;
    setCountdown(timer);

    const interval = setInterval(() => {
      timer -= 1;
      setCountdown(timer);
      if (audioEnabled) playRawSound(300, 'square', 0.15, 0.05);

      if (timer <= 0) {
        clearInterval(interval);
        setLoadStage('WARPING');
        playBoomSound();

        setTimeout(() => {
          onComplete();
        }, 1600);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [loadStage, audioEnabled, playRawSound, playBoomSound, onComplete]);

  // 3. Optimized Starfield Animation Canvas loop (runs once, reads parameters from refs)
  useEffect(() => {
    if (!loadingCanvasRef.current) return;
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
      const stage = loadStageRef.current;
      const progress = warpProgressRef.current;

      if (stage === 'CHARGING') {
        speed = 2.5 + (progress / 100) * 18;
      } else if (stage === 'COUNTDOWN') {
        speed = 22;
      } else if (stage === 'WARPING') {
        speed = 60;
      }

      ctx.lineWidth = stage === 'WARPING' ? 4 : 1.5;

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
          if (stage === 'WARPING' || stage === 'COUNTDOWN') {
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
  }, []);

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

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#020202] flex flex-col justify-between overflow-hidden p-4 md:p-8"
      exit={{
        scale: 1.8,
        opacity: 0,
        filter: "blur(30px)",
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      {/* Starfield Background Canvas */}
      <canvas
        ref={loadingCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0"
      />

      {/* Cockpit framing */}
      <div className="absolute inset-0 border-[10px] md:border-[16px] border-matrix-dark/20 pointer-events-none z-10" />
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#00ff41]/5 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#00ff41]/5 to-transparent pointer-events-none z-10" />

      {/* Cockpit HUD Structural Brackets */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-matrix/40 z-10 hidden md:block" />
      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-matrix/40 z-10 hidden md:block" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-matrix/40 z-10 hidden md:block" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-matrix/40 z-10 hidden md:block" />

      {/* STATUS TOP BAR */}
      <div className="flex items-center justify-between border-b border-matrix/20 pb-2 z-20 select-none max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <Terminal className="animate-pulse text-matrix" size={16} />
          <span className="text-[10px] md:text-xs text-matrix-light font-bold uppercase tracking-widest text-glow font-mono">
            COCKPIT_HUD_SECURE_LINK // SYS: ACTIVE
          </span>
        </div>

        <button
          onClick={() => {
            initAudio();
            const nextVal = !audioEnabled;
            setAudioEnabled(nextVal);
            setGlobalAudioEnabled(nextVal);
            setTimeout(() => { if (nextVal) clickSound(); }, 50);
          }}
          className={`px-2 py-0.5 text-[9px] border rounded transition-all flex items-center gap-1 font-mono ${
            audioEnabled ? 'border-matrix bg-matrix-dark/20 text-matrix-light' : 'border-matrix-dark text-matrix/50'
          }`}
        >
          {audioEnabled ? <Volume2 size={10} /> : <VolumeX size={10} />}
          <span>{audioEnabled ? "SYNTH_ON" : "SYNTH_MUTED"}</span>
        </button>
      </div>

      {/* 3D COCKPIT INSTRUMENT LAYOUT */}
      <div
        className="flex-grow flex flex-col lg:flex-row justify-center items-center gap-6 max-w-7xl mx-auto w-full z-20 py-4"
        style={{
          transform: loadStage === 'WARPING' ? 'translate(calc(Math.random() * 4px - 2px), calc(Math.random() * 4px - 2px))' : 'none'
        }}
      >
        {/* LEFT PANEL */}
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

        {/* CENTER Holographic HUD */}
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
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-matrix/5 via-transparent to-matrix/5" />

          {/* STAGE BOOTING */}
          {loadStage === 'BOOTING' && (
            <div className="w-full flex flex-col justify-between min-h-[300px]">
              <div className="space-y-2 h-[260px] overflow-y-auto pr-2 scrollbar-thin text-left font-mono">
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
              <div className="text-[10px] text-matrix-dark flex justify-between border-t border-matrix/10 pt-2 uppercase font-bold tracking-widest mt-4 font-mono">
                <span>DECRYPTING_COGNITIVE_NODES</span>
                <span>{Math.round((terminalLogs.length / bootSequences.length) * 100)}%</span>
              </div>
            </div>
          )}

          {/* STAGE READY TO LAUNCH */}
          {loadStage === 'READY_TO_LAUNCH' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-6 space-y-6 flex flex-col items-center justify-center min-h-[300px] w-full font-mono"
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

          {/* STAGE CHARGING */}
          {loadStage === 'CHARGING' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-6 space-y-6 w-full flex flex-col justify-center min-h-[300px] font-mono"
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

          {/* STAGE COUNTDOWN */}
          {loadStage === 'COUNTDOWN' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-6 space-y-6 flex flex-col items-center justify-center min-h-[300px] w-full font-mono"
            >
              <div className="space-y-1">
                <div className="bg-red-950/20 border border-red-500/30 text-red-400 text-[10px] font-bold py-1 px-4 rounded inline-block uppercase tracking-widest animate-pulse shadow-glow-red">
                  HYPERSPACE DEPLOYMENT DETECTED
                </div>
                <h3 className="text-xs font-black text-matrix-light uppercase tracking-widest pt-2 text-glow">
                  YOU ARE ABOUT TO ENTER PATRICK JOSH'S DOMAIN, BE READY!
                </h3>
              </div>

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

          {/* STAGE WARPING */}
          {loadStage === 'WARPING' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-6 space-y-6 flex flex-col items-center justify-center min-h-[300px] w-full font-mono"
            >
              <div className="space-y-2">
                <div className="text-red-500 font-bold uppercase text-xs tracking-widest animate-ping">
                  // WARNING: ABSOLUTE WARPING //
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-wider animate-pulse text-glow-red">
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

        {/* RIGHT PANEL */}
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
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-[9px] text-matrix-dark border-t border-matrix/20 pt-2 z-20 select-none font-mono">
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
  );
};
