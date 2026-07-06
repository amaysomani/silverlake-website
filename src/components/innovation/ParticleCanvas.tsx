"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  color: string;
  speed: number;
}

interface ParticleCanvasProps {
  scrollProgress: number; // 0 to 1
}

const PARTICLE_COUNT = 1200;
const COLORS = ["#5588ff", "#cc66d0", "#ffffff", "#aa55e8", "#ff88a0"];

export default function ParticleCanvas({ scrollProgress }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const scrollRef = useRef(scrollProgress);

  // Keep scroll value in ref for the animation loop
  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.3 - 0.2,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.1,
        baseOpacity: Math.random() * 0.6 + 0.1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        speed: Math.random() * 0.5 + 0.2,
      });
    }
    particlesRef.current = particles;
  }, []);

  const drawOcean = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      const scroll = scrollRef.current;
      const oceanBaseY = height * (0.65 + scroll * 0.5);

      // Draw 4 layers of ocean waves with stronger visibility
      for (let layer = 3; layer >= 0; layer--) {
        ctx.beginPath();
        
        // Parallax speed
        const speed = time * (0.0002 + layer * 0.0001);
        const yOffset = oceanBaseY + layer * 40;
        
        // Starting point
        ctx.moveTo(0, height);
        ctx.lineTo(0, yOffset);

        // Draw sine wave
        for (let x = 0; x <= width; x += 20) {
          const wave1 = Math.sin(x * 0.002 + speed) * (30 - layer * 5);
          const wave2 = Math.cos(x * 0.005 - speed * 1.5) * (15 - layer * 2);
          // Rise as scroll increases
          const scrollLift = scroll * 150 * (1 - layer * 0.1);
          
          ctx.lineTo(x, yOffset + wave1 + wave2 - scrollLift);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Mostly cyan waves with one purple layer to keep it subtle
        const r = layer === 1 ? 160 : 0;
        const g = layer === 1 ? 80 : 212;
        const b = layer === 1 ? 240 : 255;

        const alpha = 0.6 - layer * 0.12;
        const gradient = ctx.createLinearGradient(0, yOffset - 30, 0, height);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.5})`); // Mixed highlight at crest
        gradient.addColorStop(0.2, `rgba(20, 10, 60, ${alpha * 0.9})`); // Deep purple/blue
        gradient.addColorStop(0.6, `rgba(5, 2, 20, ${alpha})`); // Very dark purple
        gradient.addColorStop(1, `rgba(0, 2, 10, ${alpha})`); // Almost black

        ctx.fillStyle = gradient;
        ctx.fill();

        // Add a subtle glowing rim light on the top layers
        if (layer < 3) {
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.15 + (1 - layer * 0.5) * 0.15 + Math.sin(time * 0.001) * 0.05})`;
          ctx.lineWidth = 1.5 - layer * 0.5;
          ctx.stroke();
        }
      }

      ctx.restore();
    },
    []
  );

  const drawCrystalGlow = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      const scroll = scrollRef.current;
      const crystalOpacity = Math.max(0, 1 - scroll * 3);
      if (crystalOpacity <= 0) return;

      const cx = width * 0.5;
      const cy = height * 0.38 + Math.sin(time * 0.0008) * 10;

      ctx.save();
      ctx.globalAlpha = crystalOpacity;

      // Outer halo
      const haloRadius = 120 + Math.sin(time * 0.001) * 20;
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, haloRadius);
      halo.addColorStop(0, "rgba(0, 150, 255, 0.15)");
      halo.addColorStop(0.4, "rgba(0, 100, 255, 0.08)");
      halo.addColorStop(0.7, "rgba(0, 60, 200, 0.03)");
      halo.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.beginPath();
      ctx.arc(cx, cy, haloRadius, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      // Inner bright core
      const coreRadius = 30 + Math.sin(time * 0.002) * 5;
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius);
      core.addColorStop(0, "rgba(200, 230, 255, 0.3)");
      core.addColorStop(0.5, "rgba(100, 180, 255, 0.1)");
      core.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = core;
      ctx.fill();

      ctx.restore();
    },
    []
  );

  const drawParticles = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      const scroll = scrollRef.current;
      const particles = particlesRef.current;
      const cx = width * 0.5;
      const cy = height * 0.5;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Scroll-driven behaviour
        if (scroll < 0.25) {
          // Hero: gentle upward drift, concentrated near crystal
          p.vy += -0.002 * p.speed;
          p.vx += (Math.random() - 0.5) * 0.01;
        } else if (scroll < 0.5) {
          // Manifesto: particles spiral toward center vortex
          const dx = cx - p.x;
          const dy = cy - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const force = 0.0003;
          p.vx += (dx / dist) * force + (dy / dist) * 0.0001;
          p.vy += (dy / dist) * force - (dx / dist) * 0.0001;
        } else if (scroll < 0.75) {
          // Products: spread out into constellation
          p.vx += (Math.random() - 0.5) * 0.02;
          p.vy += (Math.random() - 0.5) * 0.02;
          // Dampen to prevent flying off
          p.vx *= 0.99;
          p.vy *= 0.99;
        } else {
          // Contact: continuous flowing star/cross shape
          const baseAngle = (i / particles.length) * Math.PI * 2;
          const rotation = time * 0.0002;
          const currentAngle = baseAngle + rotation;
          
          // Throb the shape points over time
          const throb = Math.sin(time * 0.0015) * 20;
          const targetRadius = 140 + Math.sin(currentAngle * 4) * (60 + throb);
          
          const tx = cx + Math.cos(currentAngle) * targetRadius;
          const ty = cy + Math.sin(currentAngle) * targetRadius;
          
          // Orbiting force to keep them flowing along the shape
          const tangentX = -Math.sin(currentAngle);
          const tangentY = Math.cos(currentAngle);
          
          p.vx += (tx - p.x) * 0.0015 + tangentX * 0.05;
          p.vy += (ty - p.y) * 0.0015 + tangentY * 0.05;
        }

        // Apply velocity with damping
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Oscillate opacity
        p.opacity = p.baseOpacity + Math.sin(time * 0.002 + i * 0.1) * 0.15;
        p.opacity = Math.max(0.05, Math.min(1, p.opacity));

        // Draw particle with glow
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = p.size * 4;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      if (particlesRef.current.length === 0) {
        initParticles(window.innerWidth, window.innerHeight);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = (timestamp: number) => {
      timeRef.current = timestamp;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Background gradient - Deep cinematic navy/cyan
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "#01030a"); // Almost black at top
      bg.addColorStop(0.5, "#060412"); // Deep dark purple-navy
      bg.addColorStop(0.8, "#1a0f2e"); // Rich purple horizon
      bg.addColorStop(1, "#05030a"); // Darker at bottom
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Draw layers in order
      drawOcean(ctx, w, h, timestamp);
      drawCrystalGlow(ctx, w, h, timestamp);
      // Floating particles removed for a cleaner, non-distracting aesthetic

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initParticles, drawOcean, drawCrystalGlow, drawParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
