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
      transition={{ delay: 2.5, duration: 1 }}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
    >
      <div className="flex items-center justify-between px-6 lg:px-10 py-6 max-w-[1600px] mx-auto w-full">
        {/* Logo */}
        <Link
          href="/"
          className="pointer-events-auto flex items-center gap-3 group"
        >
          {/* ARNO Mark */}
          <div className="flex items-center gap-2">
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              className="text-white/80 group-hover:text-white transition-colors"
            >
              <path
                d="M16 2L28 8V24L16 30L4 24V8L16 2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M16 2L28 8L16 14L4 8L16 2Z"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                opacity="0.4"
              />
              <line x1="16" y1="14" x2="16" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            </svg>
            <div className="flex flex-col leading-none">
              <span className="text-[11px] font-tech font-bold tracking-[0.3em] text-white/90 uppercase">
                ARNO
              </span>
              <span className="text-[8px] font-tech font-medium tracking-[0.2em] text-white/40 uppercase">
                Venture Capital
              </span>
            </div>
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
