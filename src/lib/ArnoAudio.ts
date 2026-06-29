"use client";

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

export function playHoverSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.type = "sine";
  osc.frequency.setValueAtTime(1000, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.08);
  
  // Adjusted volume gain (approx 4%)
  gain.gain.setValueAtTime(0.04, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.08);
}

export function playClickSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.type = "triangle";
  osc.frequency.setValueAtTime(300, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.12);
  
  // Adjusted volume gain (approx 12%)
  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.12);
}

export function playToggleSound(isOn: boolean) {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.type = "sine";
  if (isOn) {
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
  } else {
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.15);
  }
  
  // Adjusted volume gain (approx 8%)
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.15);
}

export function resumeAudioContext() {
  const ctx = getAudioContext();
  if (ctx && ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
}
