import React from 'react';
import { useAudio } from '../hooks/useAudio';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = React.memo(({ text, className = "" }) => {
  const { playSound } = useAudio();

  return (
    <span 
      onMouseEnter={() => playSound('glitch')}
      onClick={() => playSound('glitch')}
      className={`animate-cyber-glitch font-black tracking-widest cursor-help select-none ${className}`} 
      data-text={text}
    >
      {text}
    </span>
  );
});

GlitchText.displayName = "GlitchText";
