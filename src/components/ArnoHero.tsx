"use client";

import React from "react";
import { motion } from "framer-motion";
import { playClickSound, playHoverSound } from "@/lib/ArnoAudio";

interface ArnoHeroProps {
  soundEnabled: boolean;
}

export default function ArnoHero({ soundEnabled }: ArnoHeroProps) {
  const handleMouseEnter = () => {
    if (soundEnabled) {
      playHoverSound();
    }
  };

  const handleClick = (id: string) => {
    if (soundEnabled) {
      playClickSound();
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.9
      }
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden arno-grid-bg px-6 select-none"
    >
      {/* Radial Gradient Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-[#7f56d9] opacity-10 arno-orb-glow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#3b82f6] opacity-10 arno-orb-glow pointer-events-none" />
      
      {/* Radar sweeping grid background (SVG-driven) */}
      <div className="absolute inset-0 w-full h-full opacity-35 pointer-events-none flex items-center justify-center">
        <svg className="w-full h-full max-w-[1200px]" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Radar Rings */}
          <circle cx="400" cy="400" r="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <circle cx="400" cy="400" r="200" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <circle cx="400" cy="400" r="300" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" strokeDasharray="5 5" />
          <circle cx="400" cy="400" r="380" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          
          {/* Diagonal Lines */}
          <line x1="0" y1="0" x2="800" y2="800" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          <line x1="800" y1="0" x2="0" y2="800" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          
          {/* Sweeping Line */}
          <motion.line
            x1="400"
            y1="400"
            x2="800"
            y2="400"
            stroke="url(#radarSweep)"
            strokeWidth="3"
            style={{ originX: "400px", originY: "400px" }}
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 12,
              ease: "linear"
            }}
          />
          
          {/* Gradients definition */}
          <defs>
            <linearGradient id="radarSweep" x1="400" y1="400" x2="800" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.05)" />
              <stop offset="60%" stopColor="rgba(127, 86, 217, 0.2)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.8)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content Card Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center justify-center pt-20"
      >
        {/* Subtle Sub-Badge */}
        <div className="overflow-hidden mb-6">
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/5 bg-white/[0.03] text-[10px] font-mono tracking-[0.25em] text-[#3b82f6] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            ARNO VENTURE CAPITAL
          </motion.div>
        </div>

        {/* Clip-Reveal Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[1.05] uppercase text-white mb-8 font-sans max-w-4xl">
          <span className="clip-reveal-parent">
            <motion.span variants={itemVariants} className="clip-reveal-child block">
              The next wave of
            </motion.span>
          </span>
          <span className="clip-reveal-parent">
            <motion.span 
              variants={itemVariants} 
              className="clip-reveal-child block bg-gradient-to-r from-[#7f56d9] via-[#3b82f6] to-[#10b981] -webkit-background-clip-text -webkit-text-fill-color-transparent bg-clip-text"
            >
              venture capital
            </motion.span>
          </span>
          <span className="clip-reveal-parent">
            <motion.span variants={itemVariants} className="clip-reveal-child block">
              & intelligence
            </motion.span>
          </span>
        </h1>

        {/* Supporting Copy */}
        <div className="overflow-hidden max-w-2xl mx-auto mb-12">
          <motion.p 
            variants={itemVariants}
            className="text-sm sm:text-lg text-white/50 leading-relaxed font-sans font-light"
          >
            Deploying high-conviction capital at the convergence of decentralized spatial networks and AI. We invest early, move fast, and build sovereign systems for global security and communications.
          </motion.p>
        </div>

        {/* Dynamic CTA Buttons */}
        <motion.div 
          variants={fadeUpVariants}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          {/* Action Button 1 (Neon Glow) */}
          <button
            onClick={() => handleClick("products")}
            onMouseEnter={handleMouseEnter}
            className="relative px-8 py-3.5 rounded-xl text-[10px] font-mono tracking-widest uppercase bg-gradient-to-r from-[#7f56d9] to-[#3b82f6] text-white hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all duration-300 font-bold btn-shine cursor-pointer border border-transparent"
          >
            Discover Capabilities
          </button>
          
          {/* Action Button 2 (Glassmorphism Outline) */}
          <button
            onClick={() => handleClick("philosophy")}
            onMouseEnter={handleMouseEnter}
            className="px-8 py-3.5 rounded-xl text-[10px] font-mono tracking-widest uppercase border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all duration-300 font-bold cursor-pointer"
          >
            Read Our Story
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator (Hashgraph style) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-4 text-center cursor-pointer"
        onClick={() => handleClick("products")}
      >
        <span className="text-[8px] font-mono tracking-[0.3em] text-white/30 uppercase hover:text-white transition-colors duration-300">
          Scroll down to discover more
        </span>
        <div className="w-[1px] h-14 bg-white/10 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#3b82f6]"
            animate={{
              y: ["-100%", "200%"]
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
