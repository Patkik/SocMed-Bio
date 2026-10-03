import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Volume2, VolumeX, ShieldAlert, FastForward, Sparkles, AlertTriangle, EyeOff } from 'lucide-react';
import { useAudio, setGlobalAudioEnabled, getGlobalAudioEnabled } from '../hooks/useAudio';
import { GlitchText } from './GlitchText';

interface CockpitLoaderProps {
  onComplete: (skipFlash?: boolean) => void;
}

type IntroStage = 'FLASH_WARNING' | 'WARP_ZOOM' | 'DOMAIN_REVEAL' | 'PORTAL_BREACH';

export const CockpitLoader: React.FC<CockpitLoaderProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<IntroStage>('FLASH_WARNING');
  const [warpProgress, setWarpProgress] = useState(0);
  const [domainProgress, setDomainProgress] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(getGlobalAudioEnabled());
  const [flash, setFlash] = useState(false);
  const [isSafeSkipping, setIsSafeSkipping] = useState(false);

  const {
    initAudio,
    playWarpSound,
    playBoomSound,
    clickSound,
    synthBeep,
    warningSound,
    playRawSound
  } = useAudio();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageRef = useRef<IntroStage>(stage);
  const warpProgressRef = useRef(warpProgress);

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  useEffect(() => {
    warpProgressRef.current = warpProgress;
  }, [warpProgress]);

  // Fast forward / safe skip handler (Zero flashes, clean exit)
  const handleSafeSkip = useCallback(() => {
    clickSound();
    setIsSafeSkipping(true);
    onComplete(true);
  }, [clickSound, onComplete]);

  // Proceed to warp zoom animation (Requires explicit user permission/click)
  const handleProceedToWarp = useCallback(() => {
    clickSound();
    setStage('WARP_ZOOM');
  }, [clickSound]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleSafeSkip();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (stage === 'FLASH_WARNING') {
          handleProceedToWarp();
        } else {
          handleSafeSkip();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage, handleProceedToWarp, handleSafeSkip]);

  // STAGE 0: FLASH_WARNING Sound ping (No auto-proceed; waits for viewer permission)
  useEffect(() => {
    if (stage === 'FLASH_WARNING' && audioEnabled) {
      warningSound();
    }
  }, [stage, audioEnabled, warningSound]);

  // STAGE 1: WARP_ZOOM (0 to 100 over ~2.4 seconds)
  useEffect(() => {
    if (stage !== 'WARP_ZOOM') return;

    if (audioEnabled) {
      playWarpSound();
    }

    const interval = setInterval(() => {
      setWarpProgress((prev) => {
        const next = prev + 2.5;
        if (next >= 100) {
          clearInterval(interval);
          // Trigger shockwave flash transition
          setFlash(true);
          setTimeout(() => setFlash(false), 300);

          if (audioEnabled) {
            playBoomSound();
            setTimeout(() => {
              warningSound();
            }, 120);
          }

          setStage('DOMAIN_REVEAL');
          return 100;
        }
        return next;
      });
    }, 55);

    return () => clearInterval(interval);
  }, [stage, audioEnabled, playWarpSound, playBoomSound, warningSound]);

  // STAGE 2: DOMAIN_REVEAL (Progress bar & holding ~2.8 seconds)
  useEffect(() => {
    if (stage !== 'DOMAIN_REVEAL') return;

    const interval = setInterval(() => {
      setDomainProgress((prev) => {
        const next = prev + 3;
        if (next >= 100) {
          clearInterval(interval);
          // Transition to PORTAL_BREACH -> Main Screen
          setStage('PORTAL_BREACH');
          if (audioEnabled) {
            synthBeep();
          }
          setTimeout(() => {
            onComplete(false);
          }, 500);
          return 100;
        }
        return next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [stage, audioEnabled, synthBeep, onComplete]);

  // 3D Hyperspace Warp Canvas Loop
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const numStars = 350;
    const stars: Array<{ x: number; y: number; z: number; color: string; speedOffset: number }> = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 1400,
        y: (Math.random() - 0.5) * 1400,
        z: Math.random() * 1000 + 1,
        color: Math.random() > 0.85 ? '#ffffff' : '#00ff66',
        speedOffset: 0.8 + Math.random() * 0.4
      });
    }

    let animationFrameId: number;

    const draw = () => {
      const currentStage = stageRef.current;
      const progress = warpProgressRef.current;

      // Background fade trails
      if (currentStage === 'WARP_ZOOM') {
        ctx.fillStyle = 'rgba(2, 4, 3, 0.28)';
      } else if (currentStage === 'PORTAL_BREACH') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      } else if (currentStage === 'FLASH_WARNING') {
        ctx.fillStyle = 'rgba(2, 4, 3, 0.6)';
      } else {
        ctx.fillStyle = 'rgba(2, 4, 3, 0.4)';
      }
      ctx.fillRect(0, 0, width, height);

      // Speed tuning based on stage
      let baseSpeed = 1.0;
      if (currentStage === 'FLASH_WARNING') {
        // Calm, safe background drifting before animation
        baseSpeed = 0.8;
      } else if (currentStage === 'WARP_ZOOM') {
        // Accelerating warp zoom curve
        baseSpeed = 6 + (progress / 100) * 75;
      } else if (currentStage === 'DOMAIN_REVEAL') {
        // Smooth atmospheric star drift
        baseSpeed = 3.5;
      } else if (currentStage === 'PORTAL_BREACH') {
        // Final hyperdrive burst
        baseSpeed = 95;
      }

      ctx.lineWidth = (currentStage === 'DOMAIN_REVEAL' || currentStage === 'FLASH_WARNING') ? 1.5 : 2.5;

      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        const pz = star.z;
        star.z -= baseSpeed * star.speedOffset;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * 1400;
          star.y = (Math.random() - 0.5) * 1400;
          star.z = 1000;
          continue;
        }

        const k = 450;
        const x = (star.x / star.z) * k + centerX;
        const y = (star.y / star.z) * k + centerY;

        const px = (star.x / pz) * k + centerX;
        const py = (star.y / pz) * k + centerY;

        const size = Math.max(0.5, (1 - star.z / 1000) * 2.8);

        if (x >= 0 && x <= width && y >= 0 && y <= height) {
          if (currentStage === 'WARP_ZOOM' || currentStage === 'PORTAL_BREACH') {
            ctx.beginPath();
            ctx.strokeStyle = star.color;
            ctx.moveTo(px, py);
            ctx.lineTo(x, y);
            ctx.stroke();
          } else {
            // Calm point rendering during flash warning & domain reveal
            ctx.beginPath();
            ctx.fillStyle = star.color;
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Center tunnel rings only during active warp zoom
      if (currentStage === 'WARP_ZOOM') {
        const ringProgress = (progress % 50) / 50;
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringProgress * (width * 0.4), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 255, 102, ${(1 - ringProgress) * 0.15})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
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

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#020403] flex flex-col justify-between overflow-hidden p-4 md:p-8 select-none font-mono"
      exit={
        isSafeSkipping
          ? {
              opacity: 0,
              transition: { duration: 0.25, ease: "easeOut" }
            }
          : {
              scale: 1.4,
              opacity: 0,
              filter: "blur(20px)",
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
            }
      }
    >
      {/* Dynamic Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-85 z-0"
      />

      {/* Screen flash transition shockwave (only fires during stage transitions) */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 bg-[#00ff66] pointer-events-none z-40 mix-blend-screen"
          />
        )}
      </AnimatePresence>

      {/* Cockpit HUD Structural Vignette */}
      <div className="absolute inset-0 border-[8px] md:border-[14px] border-[#00ff66]/15 pointer-events-none z-10" />
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />

      {/* Corner Brackets */}
      <div className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-[#00ff66]/40 z-10 hidden sm:block" />
      <div className="absolute top-5 right-5 w-10 h-10 border-t-2 border-r-2 border-[#00ff66]/40 z-10 hidden sm:block" />
      <div className="absolute bottom-5 left-5 w-10 h-10 border-b-2 border-l-2 border-[#00ff66]/40 z-10 hidden sm:block" />
      <div className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-[#00ff66]/40 z-10 hidden sm:block" />

      {/* TOP STATUS BAR */}
      <header className="flex items-center justify-between border-b border-[#00ff66]/20 pb-3 z-20 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <Terminal className="text-[#00ff66] animate-pulse" size={15} />
          <span className="text-[10px] md:text-xs text-[#00ff66] font-bold tracking-widest text-glow">
            SPATIAL TRANSIT HUD // APEX PROTOCOL
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              initAudio();
              const nextVal = !audioEnabled;
              setAudioEnabled(nextVal);
              setGlobalAudioEnabled(nextVal);
              if (nextVal) playRawSound(800, 'sine', 0.1, 0.03);
            }}
            className={`px-2.5 py-1 text-[10px] border rounded transition-colors flex items-center gap-1.5 ${
              audioEnabled
                ? 'border-[#00ff66]/50 bg-[#00ff66]/10 text-[#00ff66]'
                : 'border-zinc-800 text-zinc-500 hover:text-zinc-400'
            }`}
          >
            {audioEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
            <span className="hidden xs:inline">{audioEnabled ? "AUDIO ON" : "MUTED"}</span>
          </button>

          <button
            onClick={handleSafeSkip}
            className="px-2.5 py-1 text-[10px] border border-zinc-700 hover:border-[#00ff66]/50 bg-black/60 hover:bg-[#00ff66]/10 text-zinc-300 hover:text-[#00ff66] rounded transition-all flex items-center gap-1 font-mono font-medium"
            title="Press Space or Esc to skip"
          >
            <span>SKIP</span>
            <FastForward size={11} />
          </button>
        </div>
      </header>

      {/* CENTER STAGE CONTAINER */}
      <main className="flex-grow flex items-center justify-center max-w-4xl mx-auto w-full z-20 px-4">
        <AnimatePresence mode="wait">
          {/* ── PHASE 0: FLASH & PHOTOSENSITIVITY WARNING ───────────── */}
          {stage === 'FLASH_WARNING' && (
            <motion.div
              key="flash-warning"
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(12px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-center w-full space-y-6 max-w-xl p-6 sm:p-8 rounded-2xl bg-black/90 border-2 border-amber-500/50 shadow-[0_0_35px_rgba(245,158,11,0.25)] relative overflow-hidden"
            >
              {/* Subtle hazard stripes pattern banner */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 via-[#00ff66] to-amber-500" />

              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 text-[10px] font-bold tracking-widest uppercase">
                <AlertTriangle size={13} className="animate-pulse" />
                <span>PHOTOSENSITIVITY & FLASH WARNING</span>
              </div>

              {/* Warning Content */}
              <div className="space-y-3">
                <h1 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  VISUAL INTENSITY NOTICE
                </h1>
                <p className="text-xs sm:text-sm text-zinc-300 font-mono leading-relaxed max-w-md mx-auto">
                  This intro contains <strong className="text-amber-400 font-bold">rapid flashing lights, strobe shockwaves, and high-speed warp zoom transitions</strong>. Viewer discretion is advised for individuals sensitive to flashing visual effects.
                </p>
              </div>

              {/* Actions Grid */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleProceedToWarp}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#00ff66] hover:bg-[#00E55C] text-black font-black text-xs tracking-wider uppercase transition-all shadow-glow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles size={14} />
                  <span>INITIATE WARP SEQUENCE</span>
                </button>

                <button
                  onClick={handleSafeSkip}
                  className="w-full sm:w-auto px-5 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-mono text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <EyeOff size={14} className="text-zinc-400" />
                  <span>SKIP INTRO (SAFE MODE)</span>
                </button>
              </div>

              {/* Viewer permission indicator */}
              <div className="text-[11px] text-zinc-400 font-mono pt-1">
                Viewer permission required to start • Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-white text-[10px]">Enter</kbd> to launch or <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-white text-[10px]">Esc</kbd> to skip intro
              </div>
            </motion.div>
          )}

          {/* ── PHASE 1: WARPING / ZOOMING IN ───────────────────────── */}
          {stage === 'WARP_ZOOM' && (
            <motion.div
              key="warp-zoom"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.25, filter: "blur(10px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-center w-full space-y-6 max-w-xl"
            >
              {/* Telemetry pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00ff66]/10 border border-[#00ff66]/30 text-[#00ff66] text-[10px] tracking-widest uppercase font-bold shadow-glow">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-ping" />
                <span>HYPERDRIVE ENGAGED • WARPING ZOOM IN</span>
              </div>

              {/* Central Speed Readout */}
              <div className="space-y-2">
                <motion.div
                  animate={{
                    scale: [1, 1.03, 1],
                    textShadow: [
                      "0 0 10px rgba(0,255,102,0.4)",
                      "0 0 25px rgba(0,255,102,0.8)",
                      "0 0 10px rgba(0,255,102,0.4)"
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  className="text-4xl sm:text-6xl font-black text-white tracking-widest"
                >
                  WARP {(1 + (warpProgress / 100) * 8.9).toFixed(1)}c
                </motion.div>
                <p className="text-xs text-zinc-300 font-mono tracking-wider">
                  FOLDING SPACE-TIME COORDINATES...
                </p>
              </div>

              {/* Progress gauge bar */}
              <div className="space-y-1.5 max-w-md mx-auto">
                <div className="w-full bg-black/80 border border-[#00ff66]/30 h-2.5 rounded-full overflow-hidden p-0.5 shadow-glow">
                  <motion.div
                    className="bg-[#00ff66] h-full rounded-full shadow-glow"
                    style={{ width: `${warpProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                  <span>VELOCITY ACCELERATION</span>
                  <span className="text-[#00ff66] font-bold">{Math.round(warpProgress)}%</span>
                </div>
              </div>

              <div className="text-[10px] text-zinc-500 font-mono">
                [PRESS SPACE OR CLICK SKIP TO JUMP DIRECTLY]
              </div>
            </motion.div>
          )}

          {/* ── PHASE 2: YOU ARE ABOUT TO ENTER PATRICK JOSH'S DOMAIN ── */}
          {stage === 'DOMAIN_REVEAL' && (
            <motion.div
              key="domain-reveal"
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.3, filter: "blur(14px)" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              onClick={handleSafeSkip}
              className="text-center w-full space-y-6 max-w-2xl cursor-pointer p-6 sm:p-8 rounded-2xl bg-black/80 border-2 border-[#00ff66]/40 shadow-glow-intense relative overflow-hidden"
            >
              {/* Subtle scanning highlight */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#00ff66]/5 via-transparent to-[#00ff66]/5 pointer-events-none" />

              {/* Warning Header Chip */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest">
                <ShieldAlert size={12} className="animate-pulse" />
                <span>SPATIAL TRANSITION // GATEWAY DETECTED</span>
              </div>

              {/* CORE HEADLINE: "YOU ARE ABOUT TO ENTER PATRICK JOSH'S DOMAIN" */}
              <div className="space-y-3">
                <span className="text-xs md:text-sm font-mono text-zinc-300 uppercase tracking-widest block font-medium">
                  CAUTION: NEURAL LINK SYNCHRONIZING
                </span>
                <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                  YOU ARE ABOUT TO ENTER <br />
                  <span className="text-[#00ff66] text-glow font-black inline-block mt-1">
                    <GlitchText text="PATRICK JOSH'S DOMAIN" />
                  </span>
                </h1>
                <p className="text-xs text-zinc-400 max-w-md mx-auto pt-1 font-mono">
                  All systems calibrated. Initializing developer mainframe and interactive portfolio deck.
                </p>
              </div>

              {/* Domain Entry Synchronization Bar */}
              <div className="max-w-md mx-auto space-y-2">
                <div className="w-full bg-black/90 border border-[#00ff66]/30 h-2 rounded-full overflow-hidden p-0.5 shadow-glow">
                  <motion.div
                    className="bg-[#00ff66] h-full rounded-full shadow-glow"
                    style={{ width: `${domainProgress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                  <span className="flex items-center gap-1.5 text-[#00ff66]">
                    <Sparkles size={11} />
                    <span>ENTERING DOMAIN</span>
                  </span>
                  <span className="text-[#00ff66] font-bold">{Math.round(domainProgress)}%</span>
                </div>
              </div>

              {/* Technical Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[10px] text-zinc-400">
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">#FULL_STACK_ARCHITECT</span>
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[#00ff66]">#BUKSU_CMS_V2</span>
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">#TERMINAL_HUD</span>
              </div>

              <div className="text-[10px] text-zinc-500 pt-2 font-mono">
                [CLICK ANYWHERE OR PRESS SPACE TO ENTER INSTANTLY]
              </div>
            </motion.div>
          )}

          {/* ── PHASE 3: PORTAL BREACH / TRANSITION TO MAIN SCREEN ─────── */}
          {stage === 'PORTAL_BREACH' && (
            <motion.div
              key="portal-breach"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1.15 }}
              exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="text-center w-full space-y-3"
            >
              <div className="text-sm sm:text-lg font-black text-[#00ff66] tracking-widest text-glow uppercase animate-pulse">
                DOMAIN ACCESS GRANTED
              </div>
              <div className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                ENTERING MAIN SYSTEM...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* BOTTOM TELEMETRY FOOTER */}
      <footer className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[10px] text-zinc-500 border-t border-[#00ff66]/20 pt-3 z-20 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-pulse" />
          <span className="text-zinc-400 uppercase font-bold">
            STAGE: {stage === 'FLASH_WARNING' ? '00 // FLASH WARNING' : stage === 'WARP_ZOOM' ? '01 // WARPING ZOOM' : stage === 'DOMAIN_REVEAL' ? "02 // PATRICK JOSH'S DOMAIN" : '03 // PORTAL BREACH'}
          </span>
        </div>

        <div className="text-zinc-400 font-mono">
          BUKIDNON STATE UNIVERSITY • PATRICK JOSH AÑEDEZ
        </div>
      </footer>
    </motion.div>
  );
};
