"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { playToggleSound, resumeAudioContext } from "@/lib/ArnoAudio";

interface InnoHeaderProps {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export default function InnoHeader({ soundEnabled, setSoundEnabled }: InnoHeaderProps) {
  const handleToggleSound = () => {
    resumeAudioContext();
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    playToggleSound(nextState);
  };
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
    >
      <div className="flex items-center justify-between px-6 lg:px-12 py-8 max-w-[1920px] mx-auto w-full border-b border-white/[0.03]">
        {/* Logo */}
        <Link
          href="/"
          className="pointer-events-auto flex items-center gap-3 group"
        >
          <div className="flex flex-col leading-none">
            <span
              className="font-arno lowercase"
              style={{
                fontSize: "clamp(16px, 1.8vw, 24px)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                background: "linear-gradient(100deg, #5588ff 0%, #7866f5 25%, #aa55e8 55%, #cc66d0 75%, #c878be 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 10px rgba(130,90,255,0.35))",
              }}
            >
              arno
            </span>
            <span className="text-[7px] font-tech font-medium tracking-[0.3em] text-white/25 uppercase mt-0.5">
              Venture Capital
            </span>
          </div>
        </Link>

        {/* Sound Toggle (Hashgraph style) */}
        <button
          onClick={handleToggleSound}
          className="pointer-events-auto flex items-center gap-3 cursor-pointer group"
        >
          <span className="text-[10px] font-tech font-medium tracking-[0.2em] text-white/50 uppercase group-hover:text-white/80 transition-colors">
            {soundEnabled ? "SOUND ON" : "SOUND OFF"}
          </span>
          <div className="flex items-end gap-[2px] h-4 w-5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-[2px] bg-white/50 rounded-full transition-all ${
                  soundEnabled ? "inno-sound-bar" : ""
                }`}
                style={{
                  height: soundEnabled ? undefined : "4px",
                  animationDelay: soundEnabled ? `${i * 0.15}s` : undefined,
                }}
              />
            ))}
          </div>
        </button>
      </div>
    </motion.header>
  );
}
