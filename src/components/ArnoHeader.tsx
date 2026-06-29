"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { playClickSound, playHoverSound, playToggleSound, resumeAudioContext } from "@/lib/ArnoAudio";
import { Shield, Radar, Radio, Cpu, Menu, X, Volume2, VolumeX } from "lucide-react";

interface ArnoHeaderProps {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

const productItems = [
  {
    name: "Maritime Domain Awareness",
    desc: "AIS tracking, dark vessel detection, and behavioural intelligence at sea.",
    icon: Shield,
    href: "#products"
  },
  {
    name: "SIGINT",
    desc: "Signals intelligence tracking and geolocation of radio emitters globally.",
    icon: Radio,
    href: "#products"
  },
  {
    name: "ELINT",
    desc: "Electronic intelligence identifying and decoding non-communication signals.",
    icon: Radar,
    href: "#products"
  },
  {
    name: "Mission as a Service",
    desc: "Programmatic on-demand satellite tasking and rapid intelligence API delivery.",
    icon: Cpu,
    href: "#products"
  }
];

export default function ArnoHeader({ soundEnabled, setSoundEnabled }: ArnoHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleSound = () => {
    resumeAudioContext();
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    playToggleSound(nextState);
  };

  const handleLinkClick = (id: string) => {
    if (soundEnabled) {
      playClickSound();
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const handleMouseEnterLink = () => {
    if (soundEnabled) {
      playHoverSound();
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 lg:px-12 ${
        scrolled 
          ? "py-4 bg-[#020208]/70 backdrop-blur-md border-b border-white/5" 
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between relative">
        {/* Left: Arno Logo */}
        <div className="flex items-center gap-8">
          <Link 
            href="/" 
            className="text-[11px] font-mono tracking-[0.2em] text-white/50 hover:text-white transition-colors cursor-pointer hidden sm:block"
            onMouseEnter={handleMouseEnterLink}
            onClick={() => soundEnabled && playClickSound()}
          >
            ← RETURN
          </Link>
          
          <button 
            onClick={() => handleLinkClick("hero")}
            onMouseEnter={handleMouseEnterLink}
            className="relative group cursor-pointer focus:outline-none"
          >
            <span 
              className="text-2xl md:text-3xl font-sans font-bold tracking-tighter"
              style={{
                background: "linear-gradient(135deg, #7f56d9 0%, #3b82f6 50%, #10b981 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              arno
            </span>
          </button>
        </div>

        {/* Center: Navigation (Kawa Space matching) */}
        <nav className="hidden md:flex items-center gap-10">
          {/* Products Dropdown Trigger */}
          <div 
            className="relative"
            onMouseEnter={() => {
              setIsProductsOpen(true);
              handleMouseEnterLink();
            }}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <button 
              className={`text-[12px] font-mono tracking-[0.18em] uppercase py-2 cursor-pointer transition-colors relative flex items-center gap-1 ${
                isProductsOpen ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              Products
              <motion.span 
                animate={{ rotate: isProductsOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-[10px]"
              >
                ▼
              </motion.span>
            </button>

            {/* Rounded Floating Dropdown (Identical to Kawa Space style) */}
            <AnimatePresence>
              {isProductsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[480px] rounded-2xl arno-glass p-5 shadow-2xl shadow-black/80"
                >
                  <div className="grid grid-cols-1 gap-1">
                    {productItems.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleLinkClick("products")}
                        onMouseEnter={handleMouseEnterLink}
                        className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors text-left w-full cursor-pointer focus:outline-none"
                      >
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7f56d9]/20 to-[#3b82f6]/20 flex items-center justify-center border border-[#7f56d9]/30 mt-0.5">
                          <item.icon className="w-4 h-4 text-[#3b82f6]" />
                        </div>
                        <div>
                          <div className="text-[12px] font-mono uppercase tracking-wider text-white font-medium mb-0.5">
                            {item.name}
                          </div>
                          <div className="text-[10px] text-white/50 leading-relaxed font-sans font-light">
                            {item.desc}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => handleLinkClick("philosophy")}
            onMouseEnter={handleMouseEnterLink}
            className="text-[12px] font-mono tracking-[0.18em] uppercase text-white/70 hover:text-white transition-colors cursor-pointer focus:outline-none"
          >
            Philosophy
          </button>

          <button
            onClick={() => handleLinkClick("contact")}
            onMouseEnter={handleMouseEnterLink}
            className="text-[12px] font-mono tracking-[0.18em] uppercase text-white/70 hover:text-white transition-colors cursor-pointer focus:outline-none"
          >
            Contact
          </button>
        </nav>

        {/* Right: Sound Toggle & Mobile trigger */}
        <div className="flex items-center gap-5">
          {/* Sound Toggle (Hashgraph VC style) */}
          <button
            onClick={handleToggleSound}
            onMouseEnter={handleMouseEnterLink}
            className="flex items-center gap-2 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 rounded-full px-4 py-1.5 transition-all duration-300 group cursor-pointer focus:outline-none"
            aria-label={soundEnabled ? "Disable sounds" : "Enable sounds"}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[#3b82f6]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-white/40" />
            )}
            <span className="text-[9px] font-mono tracking-widest uppercase font-semibold text-white/70 group-hover:text-white transition-colors">
              Sound: {soundEnabled ? "ON" : "OFF"}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => {
              if (soundEnabled) playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden text-white/80 hover:text-white focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#020208]/95 backdrop-blur-lg border-b border-white/5 overflow-hidden z-40"
          >
            <div className="px-6 py-8 flex flex-col gap-6 font-mono text-sm tracking-widest uppercase">
              {/* Products Section (Expanded in Mobile) */}
              <div>
                <p className="text-[10px] text-white/30 mb-3 tracking-[0.2em]">// Products</p>
                <div className="flex flex-col gap-3 pl-4">
                  {productItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleLinkClick("products")}
                      className="text-left text-white/70 hover:text-white text-xs cursor-pointer focus:outline-none"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full h-[1px] bg-white/5" />

              <button
                onClick={() => handleLinkClick("philosophy")}
                className="text-left text-white/80 hover:text-white cursor-pointer focus:outline-none"
              >
                Philosophy
              </button>

              <button
                onClick={() => handleLinkClick("contact")}
                className="text-left text-white/80 hover:text-white cursor-pointer focus:outline-none"
              >
                Contact
              </button>

              <div className="w-full h-[1px] bg-white/5" />

              <Link
                href="/"
                onClick={() => soundEnabled && playClickSound()}
                className="text-left text-white/50 hover:text-white cursor-pointer"
              >
                ← Return to main website
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
