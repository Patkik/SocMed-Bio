import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { TechStack, TECH_DETAILS } from '../data/portfolioData';
import { Typewriter } from './Typewriter';
import { useAudio } from '../hooks/useAudio';

interface RobotAssistantProps {
  selectedTech: TechStack | null;
  onClose: () => void;
}

export const RobotAssistant: React.FC<RobotAssistantProps> = React.memo(({ selectedTech, onClose }) => {
  const { playRobotStartup, playRobotShutdown, playVocalChirp, playGlitchBuzz } = useAudio();

  const [typewriterCompleted, setTypewriterCompleted] = useState<Record<string, boolean>>({
    role: false,
    xp: false,
    projects: false
  });
  const [isRobotGlitching, setIsRobotGlitching] = useState(false);
  const [glitchFace, setGlitchFace] = useState("");
  const [robotFace, setRobotFace] = useState("[ ◉ _ ◉ ]");

  const allCompleted = typewriterCompleted.role && typewriterCompleted.xp && typewriterCompleted.projects;

  // 1. Play startup beep on mount
  useEffect(() => {
    if (selectedTech) {
      playRobotStartup();
      setTypewriterCompleted({ role: false, xp: false, projects: false });
    }
  }, [selectedTech, playRobotStartup]);

  // 2. Expression Face Controller (blinks, happy smile, talking mouth cycle)
  useEffect(() => {
    if (!selectedTech) return;
    
    let timer: any;
    let blinkTimer: any;
    
    if (isRobotGlitching) {
      setRobotFace(glitchFace || "[ X _ X ]");
      return;
    }
    
    if (!allCompleted) {
      // Dynamic talking mouth animation cycle
      const mouthFrames = ["[ ◉ ∩ ◉ ]", "[ ◑ ┰ ◑ ]", "[ ◉ ┠ ◉ ]", "[ ⊙ ∩ ⊙ ]"];
      let frameIdx = 0;
      
      const cycleMouth = () => {
        setRobotFace(mouthFrames[frameIdx]);
        frameIdx = (frameIdx + 1) % mouthFrames.length;
        timer = setTimeout(cycleMouth, 150);
      };
      cycleMouth();
    } else {
      // Satisfied/Happy status plus periodic blink triggers
      setRobotFace("[ ◕ ‿ ◕ ]");
      
      const doBlink = () => {
        setRobotFace("[ - _ - ]");
        setTimeout(() => {
          setRobotFace("[ ◕ ‿ ◕ ]");
        }, 220);
        
        blinkTimer = setTimeout(doBlink, 3200 + Math.random() * 2000);
      };
      
      blinkTimer = setTimeout(doBlink, 3000);
    }
    
    return () => {
      clearTimeout(timer);
      clearTimeout(blinkTimer);
    };
  }, [allCompleted, isRobotGlitching, glitchFace, selectedTech]);

  // 3. Periodic Glitch event loops during writing sequences
  useEffect(() => {
    if (!selectedTech || allCompleted) {
      setIsRobotGlitching(false);
      return;
    }
    
    let glitchTimer: any;
    
    const triggerGlitch = () => {
      const errorFaces = ["[ E R R ]", "[ X _ X ]", "[ 0 1 0 1 ]", "[ @ _ @ ]", "[ ▲ _ ▲ ]", "[ ▞ _ ▞ ]"];
      const randomFace = errorFaces[Math.floor(Math.random() * errorFaces.length)];
      
      setGlitchFace(randomFace);
      setIsRobotGlitching(true);
      playGlitchBuzz();
      
      setTimeout(() => {
        setIsRobotGlitching(false);
      }, 350);
      
      glitchTimer = setTimeout(triggerGlitch, 1800 + Math.random() * 1700);
    };
    
    glitchTimer = setTimeout(triggerGlitch, 1500 + Math.random() * 1000);
    
    return () => clearTimeout(glitchTimer);
  }, [selectedTech, allCompleted, playGlitchBuzz]);

  if (!selectedTech) return null;

  const key = selectedTech.name.toLowerCase();
  const details = TECH_DETAILS[key] || {
    systemRole: "Core structural development stack.",
    xp: "Integrated implementation within operational directives.",
    projects: "Internal portfolio framework."
  };

  const handleClose = () => {
    playRobotShutdown();
    onClose();
  };

  return (
    <div className="fixed inset-x-0 bottom-4 sm:bottom-6 z-50 flex justify-center pointer-events-none px-4">
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
        className={`w-full max-w-2xl pointer-events-auto bg-[#020202]/95 backdrop-blur-md border-2 rounded-xl transition-all duration-75 select-none ${
          isRobotGlitching 
            ? "border-red-500 shadow-glow-red animate-chassis-shake animate-crt-aberration" 
            : "border-matrix shadow-glow"
        }`}
      >
        {/* Header bar */}
        <div className={`flex items-center justify-between border-b px-4 py-2 font-mono transition-colors min-w-0 ${
          isRobotGlitching ? "bg-red-950/20 border-red-500/30" : "bg-matrix/10 border-matrix/30"
        }`}>
          <div className="flex items-center gap-2 min-w-0 mr-2">
            <Terminal size={13} className={`shrink-0 ${isRobotGlitching ? "text-red-400 animate-pulse" : "text-matrix-light"}`} />
            <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors truncate ${
              isRobotGlitching ? "text-red-400 animate-pulse text-glow-red" : "text-matrix-light"
            }`}>
              {isRobotGlitching ? (
                <>
                  <span className="hidden sm:inline">SYS_ROBOT_GLITCH // RE-INDEXING CORE TERMINAL DATA</span>
                  <span className="sm:hidden">GLITCH // RE-INDEXING</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">SYS_ROBOT_INTELLIGENCE // INTERPRETING: {selectedTech.name.toUpperCase()}</span>
                  <span className="sm:hidden">ROBOT // {selectedTech.name.toUpperCase()}</span>
                </>
              )}
            </span>
          </div>
          <button
            onClick={handleClose}
            className={`border bg-black px-1.5 py-0.5 rounded text-[9px] font-bold font-mono transition-all focus:outline-none shrink-0 ${
              isRobotGlitching 
                ? "text-red-500 border-red-500/30 hover:border-red-500 hover:text-white" 
                : "text-matrix hover:text-white border-matrix/30 hover:border-matrix"
            }`}
          >
            CLOSE [X]
          </button>
        </div>

        {/* Content chassis */}
        <div className={`p-4 sm:p-6 space-y-4 font-mono text-xs ${isRobotGlitching ? "text-red-400" : "text-matrix"}`}>
          
          {/* Face screen */}
          <div className={`flex items-center gap-4 border p-3 rounded transition-colors ${
            isRobotGlitching ? "bg-red-950/10 border-red-500/20" : "bg-matrix-dark/10 border-matrix/20"
          }`}>
            <div className={`text-xl md:text-2xl font-bold bg-[#040404] px-3 py-1.5 rounded border text-glow select-none tracking-wider whitespace-nowrap ${
              isRobotGlitching 
                ? "border-red-500 text-red-500 text-glow-red animate-pulse" 
                : "border-matrix/10 text-matrix-light animate-pulse"
            }`}>
              {robotFace}
            </div>
            <div className={`text-[10px] leading-relaxed font-mono uppercase transition-colors ${
              isRobotGlitching ? "text-red-400 text-glow-red" : "text-matrix-light/80"
            }`}>
              {isRobotGlitching 
                ? ">> [WARNING] TELEMETRY DATA UNSTABLE. COMPILING HARDWARE FAULTS [REDACTED]..." 
                : ">> [ONLINE] SYSTEM PARAMETERS LOADED. INITIATING HIGH-FIDELITY DECODING PROTOCOL..."
              }
            </div>
          </div>

          {/* 3-Column Typewriter Readout */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 border-t pt-4 ${
            isRobotGlitching ? "border-red-500/20" : "border-matrix/20"
          }`}>
            
            <div className={`sm:border-r pr-2 ${isRobotGlitching ? "border-red-500/10" : "border-matrix/15"}`}>
              <span className={`text-[9px] uppercase tracking-wider block font-bold mb-1 ${
                isRobotGlitching ? "text-red-500" : "text-matrix-dark"
              }`}>// COGNITIVE_ROLE</span>
              <p className="text-white text-[11px] font-sans leading-relaxed min-h-[40px]">
                <Typewriter 
                  text={details.systemRole} 
                  speed={20} 
                  onTick={playVocalChirp} 
                  onComplete={() => setTypewriterCompleted(prev => ({ ...prev, role: true }))} 
                />
              </p>
            </div>
            
            <div className={`sm:border-r px-2 ${isRobotGlitching ? "border-red-500/10" : "border-matrix/15"}`}>
              <span className={`text-[9px] uppercase tracking-wider block font-bold mb-1 ${
                isRobotGlitching ? "text-red-500" : "text-matrix-dark"
              }`}>// OPERATOR_TRACK_RECORD</span>
              <p className="text-white text-[11px] font-sans leading-relaxed min-h-[40px]">
                <Typewriter 
                  text={details.xp} 
                  speed={20} 
                  onTick={playVocalChirp} 
                  onComplete={() => setTypewriterCompleted(prev => ({ ...prev, xp: true }))} 
                />
              </p>
            </div>
            
            <div className="pl-2">
              <span className={`text-[9px] uppercase tracking-wider block font-bold mb-1 ${
                isRobotGlitching ? "text-red-500" : "text-matrix-dark"
              }`}>// ASSOCIATED_PROJECTS</span>
              <p className={`text-[11px] font-sans font-bold leading-relaxed min-h-[40px] ${
                isRobotGlitching ? "text-red-400 text-glow-red" : "text-matrix-light text-glow"
              }`}>
                <Typewriter 
                  text={details.projects} 
                  speed={20} 
                  onTick={playVocalChirp} 
                  onComplete={() => setTypewriterCompleted(prev => ({ ...prev, projects: true }))} 
                />
              </p>
            </div>

          </div>
          
          <div className={`text-[8px] flex flex-col sm:flex-row sm:justify-between gap-1 border-t pt-2 uppercase font-bold transition-colors ${
            isRobotGlitching ? "border-red-500/30 text-red-500" : "border-matrix-dark/20 text-matrix-dark"
          }`}>
            <span>{isRobotGlitching ? "TELEMETRY_LOG: CORRUPTED" : "TELEMETRY_LOG: STABLE"}</span>
            <span>{isRobotGlitching ? "ROBOT_STATUS: MEM_FAULT_ERR" : "ROBOT_STATUS: ACTIVE // FEED_LOCK"}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

RobotAssistant.displayName = "RobotAssistant";
