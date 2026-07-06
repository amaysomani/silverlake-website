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
            <img 
              src="/arnologo.svg" 
              alt="ARNO Logo" 
              className="h-6 w-auto"
              style={{ filter: "drop-shadow(0 0 10px rgba(130,90,255,0.35))" }}
            />
            <span className="text-[7px] font-tech font-medium tracking-[0.3em] text-white/25 uppercase mt-0.5">
              Venture Capital
            </span>
          </div>
        </Link>

      </div>
    </motion.header>
  );
}
