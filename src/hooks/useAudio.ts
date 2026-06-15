import { useRef, useCallback } from 'react';

// Shared module-level instances to avoid browser resource limits
let sharedAudioContext: AudioContext | null = null;
let audioEnabledGlobal = true;

export function setGlobalAudioEnabled(enabled: boolean) {
  audioEnabledGlobal = enabled;
  if (!enabled && sharedAudioContext && sharedAudioContext.state === 'running') {
    // Optional: suspend when muted
  }
}

export function getGlobalAudioEnabled() {
  return audioEnabledGlobal;
}

export function useAudio() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (!sharedAudioContext) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        sharedAudioContext = new AudioContextClass();
      }
    }
    audioCtxRef.current = sharedAudioContext;
  }, []);

  const playRawSound = useCallback((freq: number, type: OscillatorType, duration: number, vol = 0.05) => {
    if (!audioEnabledGlobal) return;
    initAudio();
    const ctx = sharedAudioContext;
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (_e) {
      // Ignore audio failures
    }
  }, [initAudio]);

  const clickSound = useCallback(() => {
    playRawSound(800, 'square', 0.08, 0.02);
  }, [playRawSound]);

  const synthBeep = useCallback(() => {
    playRawSound(1200, 'sine', 0.15, 0.04);
  }, [playRawSound]);

  const warningSound = useCallback(() => {
    playRawSound(150, 'sawtooth', 0.25, 0.08);
  }, [playRawSound]);

  const playRobotStartup = useCallback(() => {
    if (!audioEnabledGlobal) return;
    initAudio();
    const ctx = sharedAudioContext;
    if (!ctx) return;

    try {
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
    } catch (_e) {}
  }, [initAudio]);

  const playRobotShutdown = useCallback(() => {
    if (!audioEnabledGlobal) return;
    initAudio();
    const ctx = sharedAudioContext;
    if (!ctx) return;

    try {
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
    } catch (_e) {}
  }, [initAudio]);

  const playVocalChirp = useCallback((char: string) => {
    if (!audioEnabledGlobal) return;
    initAudio();
    const ctx = sharedAudioContext;
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') ctx.resume();
      const now = ctx.currentTime;

      // 1. High-frequency digital mechanical keypress tick
      const oscTick = ctx.createOscillator();
      const gainTick = ctx.createGain();
      oscTick.type = 'sine';
      oscTick.frequency.setValueAtTime(1800 + Math.random() * 400, now);
      gainTick.gain.setValueAtTime(0.006, now);
      gainTick.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);
      oscTick.connect(gainTick);
      gainTick.connect(ctx.destination);
      oscTick.start();
      oscTick.stop(now + 0.012);

      // 2. Low-frequency robotic game voice beep/chirp
      if (char !== ' ' && char !== '\n' && char !== '\r') {
        const charCode = char.charCodeAt(0) || 100;
        const baseFreq = 150 + (charCode % 12) * 12;

        const oscSpeech = ctx.createOscillator();
        const gainSpeech = ctx.createGain();
        oscSpeech.type = 'triangle';
        oscSpeech.frequency.setValueAtTime(baseFreq, now);
        oscSpeech.frequency.exponentialRampToValueAtTime(baseFreq * 0.82, now + 0.045);

        gainSpeech.gain.setValueAtTime(0.018, now);
        gainSpeech.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

        oscSpeech.connect(gainSpeech);
        gainSpeech.connect(ctx.destination);
        oscSpeech.start();
        oscSpeech.stop(now + 0.045);
      }
    } catch (_e) {}
  }, [initAudio]);

  const playGlitchBuzz = useCallback(() => {
    if (!audioEnabledGlobal) return;
    initAudio();
    const ctx = sharedAudioContext;
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') ctx.resume();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(65, now);
      osc.frequency.linearRampToValueAtTime(175, now + 0.22);

      gain.gain.setValueAtTime(0.035, now);
      gain.gain.linearRampToValueAtTime(0.0001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.22);
    } catch (_e) {}
  }, [initAudio]);

  const playWarpSound = useCallback(() => {
    if (!audioEnabledGlobal) return;
    initAudio();
    const ctx = sharedAudioContext;
    if (!ctx) return;

    try {
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
    } catch (_e) {}
  }, [initAudio]);

  const playBoomSound = useCallback(() => {
    if (!audioEnabledGlobal) return;
    initAudio();
    const ctx = sharedAudioContext;
    if (!ctx) return;

    try {
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
    } catch (_e) {}
  }, [initAudio]);

  const playSound = useCallback((type: 'click' | 'hover' | 'success' | 'glitch' | 'type') => {
    switch (type) {
      case 'click':
        clickSound();
        break;
      case 'hover':
        playRawSound(240, 'sine', 0.06, 0.02);
        break;
      case 'success':
        playRawSound(523.25, 'sine', 0.2, 0.04);
        break;
      case 'glitch':
        playRawSound(100, 'square', 0.1, 0.03);
        break;
      case 'type':
        playRawSound(550, 'sine', 0.03, 0.015);
        break;
    }
  }, [clickSound, playRawSound]);

  return {
    initAudio,
    playRawSound,
    playSound,
    clickSound,
    synthBeep,
    warningSound,
    playRobotStartup,
    playRobotShutdown,
    playVocalChirp,
    playGlitchBuzz,
    playWarpSound,
    playBoomSound
  };
}
