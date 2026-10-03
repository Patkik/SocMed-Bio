import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Disc, X } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

interface SpotifyWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
}

// Beats per minute for visualizer beat pulse (128 BPM -> ~468ms beat duration)
const BPM = 128;
const BEAT_DURATION = 60000 / BPM;

// Multi-frame Dancing Cat ASCII Art Animation
const DANCING_CAT_FRAMES = [
  // Frame 0: Stepping left, paw out, ear twitch
  [
    "      /\\_/\\      ",
    "   ♪ ( =^.^= )   ",
    "     /(  > )>    ",
    "    (  (   )     ",
    "     /    \\~     "
  ],
  // Frame 1: Hands in the air, paws up!
  [
    "      /\\_/\\      ",
    "  ♫  ( =>.<= ) ♬ ",
    "    \\(  ^  )/    ",
    "     (  v  )     ",
    "      |   |      "
  ],
  // Frame 2: Stepping right, paw out, ear twitch
  [
    "      /\\_/\\      ",
    "     ( =^.^= ) ♪ ",
    "    <( <  )\\     ",
    "     (   )  )    ",
    "    ~/    \\      "
  ],
  // Frame 3: Hip shake, eyes closed vibing
  [
    "      /\\_/\\      ",
    "  ♩  ( =~.~= ) ♫ ",
    "     <) ^ (<     ",
    "     (  ~  )     ",
    "      \\   /      "
  ]
];

export const SpotifyWidget: React.FC<SpotifyWidgetProps> = React.memo(({ isOpen, onToggle }) => {
  const { playSound } = useAudio();
  const [beatPulse, setBeatPulse] = useState(false);
  const [catFrameIdx, setCatFrameIdx] = useState(0);

  // 1. Procedural BPM beat pulses and dancing cat frame cycle
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setBeatPulse(prev => !prev);
      setCatFrameIdx(prev => (prev + 1) % DANCING_CAT_FRAMES.length);
    }, BEAT_DURATION);
    return () => clearInterval(interval);
  }, [isOpen]);

  // 2. Audio visualizer wave bar heights state
  const [waveHeights, setWaveHeights] = useState<number[]>(Array(16).fill(10));
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!isOpen) return;

    const animateWaves = (time: number) => {
      if (time - lastTimeRef.current >= 50) {
        lastTimeRef.current = time;

        const now = Date.now();
        const cyclePosition = (now % BEAT_DURATION) / BEAT_DURATION;
        const isNearBeat = cyclePosition < 0.18 || (cyclePosition > 0.45 && cyclePosition < 0.62);
        const beatMultiplier = isNearBeat ? 2.4 : 1.0;

        setWaveHeights(prev =>
          prev.map((_, idx) => {
            const frequency = 0.2 + idx * 0.12;
            const sineVal = Math.sin(time * 0.005 * frequency) * 12 + 16;
            const noise = Math.random() * 6;
            const height = Math.max(4, Math.min(36, (sineVal + noise) * beatMultiplier));
            return height;
          })
        );
      }
      requestRef.current = requestAnimationFrame(animateWaves);
    };

    requestRef.current = requestAnimationFrame(animateWaves);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isOpen]);

  const currentCatAscii = DANCING_CAT_FRAMES[catFrameIdx].join('\n');

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 font-mono">
      {/* Expanded Spotify Deck Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="bg-black border border-matrix/40 rounded shadow-glow-intense p-3 w-[calc(100vw-32px)] sm:w-[330px] h-[430px] overflow-hidden flex flex-col justify-between"
          >
            {/* Window bar */}
            <div className="flex justify-between items-center bg-matrix-dark/10 px-2 py-1 mb-2 border-b border-matrix/20 text-[10px] shrink-0">
              <span className="text-matrix-light font-bold flex items-center gap-1.5">
                <Disc className="animate-spin text-matrix" style={{ animationDuration: '4s' }} size={12} />
                <span>BACKGROUND_JAMMER_CORE</span>
              </span>
              <button
                onClick={() => { playSound('click'); onToggle(); }}
                className="hover:text-red-500 transition-colors focus:outline-none"
                aria-label="Close music deck"
              >
                <X size={12} />
              </button>
            </div>

            {/* Compact Spotify iFrame */}
            <div className="h-[152px] rounded border border-matrix-dark/30 overflow-hidden bg-black/50 shrink-0 mb-2">
              <iframe
                title="Spotify Embed"
                src="https://open.spotify.com/embed/playlist/3MEEl3gloZAUbEiCBFzm1m?utm_source=generator&theme=0"
                width="100%"
                height="152px"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>

            {/* DANCING CAT ASCII ANIMATION STAGE */}
            <div className="flex-grow border border-matrix/25 bg-black/80 rounded p-2.5 flex flex-col justify-between relative overflow-hidden select-none shadow-glow">
              {/* Header inside Cat deck */}
              <div className="flex items-center justify-between text-[8px] text-matrix-dark border-b border-matrix/15 pb-1">
                <span className="text-matrix-light font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-matrix animate-pulse" />
                  DANCING_CAT.EXE // ASCII_JAMMER
                </span>
                <span className="font-mono text-matrix/70">SYNC: {BPM} BPM</span>
              </div>

              {/* Animated Dancing Cat ASCII Frame */}
              <div className="flex items-center justify-center py-1">
                <motion.div
                  animate={{
                    y: beatPulse ? -4 : 0,
                    scale: beatPulse ? 1.04 : 1,
                    rotate: catFrameIdx === 0 ? -2 : catFrameIdx === 2 ? 2 : 0
                  }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="relative"
                >
                  <pre className="font-mono text-matrix-light text-xs sm:text-[13px] leading-tight text-glow font-bold whitespace-pre select-none tracking-normal">
                    {currentCatAscii}
                  </pre>
                </motion.div>
              </div>

              {/* Audio Equalizer Wave Bars under Cat */}
              <div className="space-y-1 pt-1 border-t border-matrix/15">
                <div className="flex items-end justify-center gap-[3px] h-6 px-1">
                  {waveHeights.map((height, idx) => (
                    <motion.div
                      key={idx}
                      animate={{ height: Math.max(3, height * 0.55) }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="w-[3px] bg-matrix rounded-t shadow-glow"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-[8px] font-mono text-matrix/70 pt-0.5">
                  <span className="text-matrix-light font-semibold">STATUS: VIBING TO THE BEAT</span>
                  <span className="text-matrix-dark">ASCII_V2</span>
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => playSound('hover')}
        onClick={() => { playSound('click'); onToggle(); }}
        className="bg-black border border-matrix hover:border-matrix-light p-4 rounded-full text-matrix shadow-glow flex items-center justify-center group focus:outline-none"
      >
        <motion.div
          animate={isOpen ? { rotate: 360 } : { rotate: 0 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        >
          <Music size={20} className="text-matrix-light" />
        </motion.div>
      </motion.button>
    </div>
  );
});

SpotifyWidget.displayName = "SpotifyWidget";
