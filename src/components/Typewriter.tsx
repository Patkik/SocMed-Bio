import React, { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  onTick?: (char: string) => void;
  onComplete?: () => void;
}

export const Typewriter: React.FC<TypewriterProps> = React.memo(({ 
  text, 
  speed = 20, 
  onTick,
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const glitchChars = ["%", "*", "$", "&", "?", "#", "@", "_", "1", "0", "█", "░", "▓", "§", "▢", "▣", "▰"];

  // Cache callbacks in refs to prevent timer resets on parent renders
  const onTickRef = useRef(onTick);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    let frame = 0;
    
    const framesPerChar = Math.max(1, Math.floor(speed / 15));
    
    const timer = setInterval(() => {
      frame++;
      if (frame >= framesPerChar) {
        frame = 0;
        i++;
      }

      if (i <= text.length) {
        let currentString = text.slice(0, i);
        if (i < text.length) {
          const remainingLength = Math.min(2, text.length - i);
          for (let k = 0; k < remainingLength; k++) {
            currentString += glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }
        }
        setDisplayedText(currentString);
        
        if (frame === 0 && i > 0 && i <= text.length) {
          const char = text.charAt(i - 1);
          if (onTickRef.current) onTickRef.current(char);
        }
      } else {
        clearInterval(timer);
        if (onCompleteRef.current) onCompleteRef.current();
      }
    }, 15);

    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayedText}</span>;
});

Typewriter.displayName = "Typewriter";
