"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface ParticleCanvasProps {
  scrollProgress: number;
}

export default function ParticleCanvas({ scrollProgress }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const scrollRef = useRef(scrollProgress);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  const drawOcean = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      const scroll = scrollRef.current;
      const oceanBaseY = height * (0.65 + scroll * 0.5);

      // 3 wave layers (down from 4), step=30 (down from 20) — fewer path points
      for (let layer = 2; layer >= 0; layer--) {
        ctx.beginPath();
        const speed = time * (0.0002 + layer * 0.0001);
        const yOffset = oceanBaseY + layer * 45;

        ctx.moveTo(0, height);
        ctx.lineTo(0, yOffset);

        for (let x = 0; x <= width; x += 30) {
          const wave1 = Math.sin(x * 0.002 + speed) * (28 - layer * 5);
          const wave2 = Math.cos(x * 0.005 - speed * 1.5) * (14 - layer * 2);
          const scrollLift = scroll * 140 * (1 - layer * 0.1);
          ctx.lineTo(x, yOffset + wave1 + wave2 - scrollLift);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        const r = layer === 1 ? 160 : 0;
        const g = layer === 1 ? 80 : 212;
        const b = layer === 1 ? 240 : 255;
        const alpha = 0.55 - layer * 0.12;

        const gradient = ctx.createLinearGradient(0, yOffset - 30, 0, height);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.5})`);
        gradient.addColorStop(0.2, `rgba(20, 10, 60, ${alpha * 0.9})`);
        gradient.addColorStop(0.6, `rgba(5, 2, 20, ${alpha})`);
        gradient.addColorStop(1, `rgba(0, 2, 10, ${alpha})`);

        ctx.fillStyle = gradient;
        ctx.fill();

        // Only stroke the top layer
        if (layer === 0) {
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.18)`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
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

      const haloRadius = 120 + Math.sin(time * 0.001) * 20;
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, haloRadius);
      halo.addColorStop(0, "rgba(0, 150, 255, 0.15)");
      halo.addColorStop(0.4, "rgba(0, 100, 255, 0.07)");
      halo.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.beginPath();
      ctx.arc(cx, cy, haloRadius, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      ctx.restore();
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false }); // alpha:false = faster compositing
    if (!ctx) return;

    const resize = () => {
      // Cap pixel ratio at 1 on mobile/low-end to reduce fill-rate cost
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Frame throttle: target 30fps for background canvas (imperceptible, saves ~50% GPU)
    let lastFrame = 0;
    const TARGET_INTERVAL = 1000 / 30;

    const animate = (timestamp: number) => {
      animationRef.current = requestAnimationFrame(animate);
      if (timestamp - lastFrame < TARGET_INTERVAL) return;
      lastFrame = timestamp;

      const w = window.innerWidth;
      const h = window.innerHeight;

      // Background — one fillRect is much cheaper than a gradient every frame on alpha:false
      ctx.fillStyle = "#01030a";
      ctx.fillRect(0, 0, w, h);

      drawOcean(ctx, w, h, timestamp);
      drawCrystalGlow(ctx, w, h, timestamp);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [drawOcean, drawCrystalGlow]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
