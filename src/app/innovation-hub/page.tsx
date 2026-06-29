"use client";

import React from "react";
import Link from "next/link";

export default function InnovationHubComingSoon() {
  return (
    <div className="bg-[#020208] min-h-screen text-white font-sans selection:bg-[#3b82f6]/30 selection:text-white relative overflow-hidden flex flex-col items-center justify-center">
      <div className="text-center space-y-6 z-10 px-4">
        <div className="inline-block px-3 py-1 mb-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
          <span className="text-[10px] font-mono text-white/70 tracking-widest uppercase">Under Construction</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 pb-2">
          Innovation Hub
        </h1>
        <p className="text-white/60 text-lg md:text-xl font-mono tracking-widest uppercase">
          Coming Soon
        </p>
        <div className="pt-12">
          <Link 
            href="/" 
            className="text-xs font-mono text-white/50 hover:text-white transition-colors duration-300 uppercase tracking-widest border-b border-white/10 hover:border-white/50 pb-2"
          >
            &larr; Return Home
          </Link>
        </div>
      </div>

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3b82f6]/5 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}
