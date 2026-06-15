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

// Cyberpunk karaoke lyric lines
const LYRICS = [
  "// LINK_ESTABLISHED: PATRICK_JOSH_MAIN_HUB",
  "Work it, Make it, Do it, Makes us",
  "Harder, Better, Faster, Stronger",
  "More than, Hour, Our, Never",
  "Ever, After, Work is, Over",
  "Work it, Make it, Do it, Makes us",
  "Harder, Better, Faster, Stronger",
  "// COGNITIVE_DRIVE: TEMPERATURE_STABLE",
  "Digital rain falling in the mainframe",
  "Neon shadows walking in the grid",
  "Aspirations of a prehistoric dinosaur",
  "Raw energy streaming in the circuits",
  "// SYNAPSES: ACTIVE // SYSTEM_MOOD: CHILL"
];

export const SpotifyWidget: React.FC<SpotifyWidgetProps> = React.memo(({ isOpen, onToggle }) => {
  const { playSound } = useAudio();
  const [beatPulse, setBeatPulse] = useState(false);
  const [lyricIdx, setLyricIdx] = useState(0);
  const beatCountRef = useRef(0);

  // 1. Procedural BPM beat pulses and synced lyric feed indexes
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setBeatPulse(prev => !prev);
      
      // Update lyrics every 4 beats (one bar of music)
      beatCountRef.current = (beatCountRef.current + 1) % 4;
      if (beatCountRef.current === 0) {
        setLyricIdx(prev => (prev + 1) % LYRICS.length);
      }
    }, BEAT_DURATION);
    return () => clearInterval(interval);
  }, [isOpen]);

  // 2. Audio visualizer wave bar heights state
  const [waveHeights, setWaveHeights] = useState<number[]>(Array(15).fill(10));
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!isOpen) return;

    const animateWaves = (time: number) => {
      if (time - lastTimeRef.current >= 50) { 
        lastTimeRef.current = time;
        
        const now = Date.now();
        const cyclePosition = (now % BEAT_DURATION) / BEAT_DURATION;
        const isNearBeat = cyclePosition < 0.15 || (cyclePosition > 0.45 && cyclePosition < 0.6);
        const beatMultiplier = isNearBeat ? 2.5 : 1.0;

        setWaveHeights(prev =>
          prev.map((_, idx) => {
            const frequency = 0.2 + idx * 0.1;
            const sineVal = Math.sin(time * 0.005 * frequency) * 15 + 20;
            const noise = Math.random() * 8;
            const height = Math.max(4, Math.min(48, (sineVal + noise) * beatMultiplier));
            return height;
          })
        );
      }
      requestRef.current = requestAnimationFrame(animateWaves);
    };

    requestRef.current = requestAnimationFrame(animateWaves);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isOpen]);

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
              <span className="text-matrix-light font-bold flex items-center gap-1">
                <Disc className="animate-spin" style={{ animationDuration: '4s' }} size={12}/> BACKGROUND_JAMMER_CORE
              </span>
              <button 
                onClick={() => { playSound('click'); onToggle(); }} 
                className="hover:text-red-500 transition-colors focus:outline-none"
              >
                <X size={12}/>
              </button>
            </div>

            {/* DANCING ROBOT AND WAVE VISUALIZER DECK */}
            <div className="h-16 border border-matrix/20 bg-matrix-dark/5 rounded flex items-center justify-between px-3 py-1 overflow-hidden relative mb-2 shrink-0">
              
              {/* Dancing SVG Robot */}
              <motion.div
                animate={{
                  y: beatPulse ? [0, -8, 0] : [0, -6, 0],
                  rotate: beatPulse ? [-4, 4, -4] : [4, -4, 4],
                  scale: beatPulse ? [1, 1.05, 1] : [1, 0.98, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: BEAT_DURATION / 1000,
                  ease: "easeInOut"
                }}
                className="flex items-center gap-2 relative z-10 shrink-0"
              >
                <svg width="32" height="32" viewBox="0 0 32 32" className="text-matrix-light fill-none stroke-current" strokeWidth="2">
                  <line x1="16" y1="6" x2="16" y2="10" />
                  <circle cx="16" cy="5" r="1.5" className="fill-matrix-light" />
                  
                  <rect x="3" y="14" width="2" height="6" rx="1" />
                  <rect x="27" y="14" width="2" height="6" rx="1" />
                  
                  <rect x="6" y="10" width="20" height="14" rx="3" className="fill-black" />
                  
                  <motion.circle 
                    cx="11" cy="16" 
                    r={beatPulse ? 2 : 1}
                    className="fill-matrix-light" 
                  />
                  <motion.circle 
                    cx="21" cy="16" 
                    r={beatPulse ? 2 : 1} 
                    className="fill-matrix-light" 
                  />
                  
                  <motion.path 
                    d={beatPulse ? "M 12 20 Q 16 22 20 20" : "M 13 21 L 19 21"} 
                    strokeLinecap="round" 
                  />
                </svg>
                
                <div className="flex flex-col text-[8px] tracking-tighter text-matrix-light">
                  <span className="font-bold">BOT_DANCER.EXE</span>
                  <span className="opacity-60 uppercase text-[6px]">Sync: {BPM} BPM</span>
                </div>
              </motion.div>

              {/* Beat Synced Audio Wave Bars */}
              <div className="flex items-end gap-[3px] h-12 pr-1 shrink-0">
                {waveHeights.map((height, idx) => (
                  <motion.div
                    key={idx}
                    animate={{ height }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="w-[3px] bg-matrix rounded-t shadow-glow"
                  />
                ))}
              </div>
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

            {/* Cyberpunk Lyrics Terminal Screen */}
            <div className="h-[112px] border border-matrix/20 bg-black/90 rounded p-3 flex flex-col justify-center space-y-1 relative overflow-hidden select-none shadow-glow shrink-0">
              <div className="absolute top-1 left-2 text-[6px] text-matrix-dark uppercase font-bold tracking-widest">
                &gt;&gt; TELEMETRY_LYRIC_FEED
              </div>
              <div className="text-center font-mono text-[9px] space-y-1.5 pt-2">
                <p className="text-matrix-dark/20 truncate select-none">
                  {LYRICS[(lyricIdx - 1 + LYRICS.length) % LYRICS.length]}
                </p>
                <p className="text-matrix-light text-glow font-bold truncate scale-105 transition-transform duration-300">
                  &gt;&gt; {LYRICS[lyricIdx]} &lt;&lt;
                </p>
                <p className="text-matrix-dark/20 truncate select-none">
                  {LYRICS[(lyricIdx + 1) % LYRICS.length]}
                </p>
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
