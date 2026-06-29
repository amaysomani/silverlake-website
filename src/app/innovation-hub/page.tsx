"use client";

import React, { useState } from "react";
import ArnoHeader from "@/components/ArnoHeader";
import ArnoHero from "@/components/ArnoHero";
import ArnoCapabilities from "@/components/ArnoCapabilities";
import ArnoPhilosophy from "@/components/ArnoPhilosophy";
import ArnoContact from "@/components/ArnoContact";
import ArnoScrollProgress from "@/components/ArnoScrollProgress";
import { playClickSound, playHoverSound } from "@/lib/ArnoAudio";

export default function ArnoPage() {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const handleMouseEnter = () => {
    if (soundEnabled) {
      playHoverSound();
    }
  };

  const handleClick = () => {
    if (soundEnabled) {
      playClickSound();
    }
  };

  return (
    <div className="bg-[#020208] min-h-screen text-white font-sans selection:bg-[#3b82f6]/30 selection:text-white relative overflow-hidden">
      {/* Arno Scroll Tracker */}
      <ArnoScrollProgress soundEnabled={soundEnabled} />

      {/* Floating Kawa-style Header */}
      <ArnoHeader soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />

      {/* Page Sections */}
      <main className="relative">
        {/* //01 Manifesto */}
        <ArnoHero soundEnabled={soundEnabled} />

        {/* //02 Capabilities */}
        <ArnoCapabilities soundEnabled={soundEnabled} />

        {/* //03 Philosophy */}
        <ArnoPhilosophy soundEnabled={soundEnabled} />

        {/* //04 Contact */}
        <ArnoContact soundEnabled={soundEnabled} />
      </main>

      {/* Premium Footer (Hashgraph VC style) */}
      <footer className="py-20 px-6 lg:px-12 bg-[#010105] border-t border-white/5 relative z-10 text-center sm:text-left select-none">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-12">
          
          {/* Footer Left */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white font-sans">
              We prioritize warm introductions<br />and ecosystem referrals
            </h3>
            <p className="text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase">
              © ARNO VENTURES 2026
            </p>
          </div>

          {/* Footer Right: Links */}
          <div className="flex flex-col sm:flex-row gap-12 font-mono text-[10px] tracking-widest uppercase">
            {/* Social Links */}
            <div className="flex flex-col gap-2">
              <span className="text-white/20">// Connection</span>
              <a 
                href="mailto:intel@arno.vc" 
                onMouseEnter={handleMouseEnter}
                onClick={handleClick}
                className="text-white/60 hover:text-white transition-colors duration-300"
              >
                Email
              </a>
              <a 
                href="https://x.com/ArnoVC" 
                target="_blank" 
                rel="noreferrer"
                onMouseEnter={handleMouseEnter}
                onClick={handleClick}
                className="text-white/60 hover:text-white transition-colors duration-300"
              >
                X (Twitter)
              </a>
              <a 
                href="https://linkedin.com/company/arno-ventures" 
                target="_blank" 
                rel="noreferrer"
                onMouseEnter={handleMouseEnter}
                onClick={handleClick}
                className="text-white/60 hover:text-white transition-colors duration-300"
              >
                LinkedIn
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex flex-col gap-2">
              <span className="text-white/20">// Legal</span>
              <a 
                href="/privacy-policy" 
                onMouseEnter={handleMouseEnter}
                onClick={handleClick}
                className="text-white/60 hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <span className="text-white/40 select-none">
                Made by Antigravity
              </span>
            </div>
          </div>
          
        </div>
      </footer>
    </div>
  );
}
