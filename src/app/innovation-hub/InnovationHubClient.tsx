"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ParticleCanvas from "@/components/innovation/ParticleCanvas";
import InnoHeader from "@/components/innovation/InnoHeader";
import InnoScrollIndicator from "@/components/innovation/InnoScrollIndicator";
import InnoProductGrid from "@/components/innovation/InnoProductGrid";
import InteractiveCrystal from "@/components/innovation/InteractiveCrystal";
import MainDashboard from "@/components/innovation/MainDashboard";
import { resumeAudioContext } from "@/lib/ArnoAudio";

export default function InnovationHubClient() {
  const [introComplete, setIntroComplete] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contact@silverlakelaw.in");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
    window.location.href = "mailto:contact@silverlakelaw.in";
  };

  const rafScrollRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    // Cancel any pending RAF update so we only run once per frame
    cancelAnimationFrame(rafScrollRef.current);
    rafScrollRef.current = requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
      const section = Math.round(scrollTop / container.clientHeight);
      setCurrentSection(Math.min(3, Math.max(0, section)));
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafScrollRef.current);
    };
  }, [handleScroll]);

  // Background Audio Effect
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/background.m4a");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.05; // Subtle default volume
    }

    if (soundEnabled && introComplete) {
      audioRef.current.play().catch(err => console.log("Audio playback prevented:", err));
    } else {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [soundEnabled, introComplete]);

  const handleEnter = () => {
    resumeAudioContext();
    setIntroComplete(true);
  };

  return (
    <div className="bg-[#000209] text-white overflow-hidden relative">
      {/* ═══════════════════════════════════════════════
          INTRO LOADING SEQUENCE
      ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {!introComplete && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[100] bg-[#000209] flex items-center justify-center cursor-pointer"
            exit={{
              clipPath: "inset(0 0 100% 0)",
              transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
            }}
            onClick={handleEnter}
          >
            <div className="absolute inset-0 noise-bg pointer-events-none" />
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Ambient glow — matches gradient colors */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(100,120,255,0.22) 0%, rgba(180,80,220,0.1) 60%, transparent 100%)",
                    filter: "blur(30px)",
                  }}
                />
                {/* 'arno' Logo SVG */}
                <img
                  src="/arnologo.svg"
                  alt="ARNO Logo"
                  className="relative w-[50vw] max-w-[500px] h-auto mx-auto"
                  style={{
                    filter: "drop-shadow(0 0 40px rgba(130,90,255,0.5)) drop-shadow(0 0 80px rgba(170,70,210,0.3))",
                  }}
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="mt-6 font-tech text-[10px] tracking-[0.45em] text-white/25 uppercase"
              >
                AI-Native Legal Strategist Suite
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-12 flex flex-col items-center gap-4"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSoundEnabled(true);
                    handleEnter();
                  }}
                  className="relative group cursor-pointer"
                >
                  <div className="relative font-tech text-[10px] tracking-[0.3em] text-white/50 uppercase px-10 py-3.5 border border-white/10 rounded-[2px] hover:border-white/30 hover:text-white/80 transition-all duration-500 backdrop-blur-sm">
                    Enter with audio
                    <div className="absolute inset-0 rounded-[2px] bg-white/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEnter();
                  }}
                  className="font-tech text-[9px] tracking-[0.25em] text-white/15 uppercase hover:text-white/40 transition-colors cursor-pointer"
                >
                  Enter without audio
                </button>
              </motion.div>
            </div>
          </motion.div>

        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════
          CINEMATIC OVERLAYS (always present)
      ═══════════════════════════════════════════════ */}

      {/* Film grain noise */}
      <div className="fixed inset-0 z-[60] pointer-events-none noise-bg opacity-[0.03]" />

      {/* Vignette overlay — dark edges like cinema */}
      <div
        className="fixed inset-0 z-[55] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(0,2,9,0.7) 100%)",
        }}
      />

      {/* Horizontal scan line — subtle moving light */}
      <motion.div
        className="fixed left-0 right-0 h-[1px] z-[56] pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(100,180,255,0.08) 30%, rgba(100,180,255,0.12) 50%, rgba(100,180,255,0.08) 70%, transparent 100%)",
        }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Ambient horizontal light beam */}
      <div
        className="fixed top-[38%] left-0 right-0 h-[2px] z-[5] pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 5%, rgba(60,140,255,0.08) 30%, rgba(60,140,255,0.15) 50%, rgba(60,140,255,0.08) 70%, transparent 95%)",
          boxShadow: "0 0 80px 20px rgba(40,100,200,0.06)",
        }}
      />

      {/* ═══════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════ */}

      <ParticleCanvas scrollProgress={scrollProgress} />
      <InnoHeader soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />
      <InnoScrollIndicator
        scrollProgress={scrollProgress}
        currentSection={currentSection}
        totalSections={4}
      />

      {/* Scroll-Snap Container */}
      <div
        ref={containerRef}
        className="inno-snap-container relative z-10"
        data-lenis-prevent="true"
      >
        {/* ─── SECTION 1: HERO ─── */}
        <section className="inno-snap-section flex flex-col justify-between px-6 lg:px-10 relative">
          {/* ── Full-section crystal background ── */}
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={introComplete ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Atmospheric glow rings behind the crystal */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "radial-gradient(ellipse 65% 65% at 50% 48%, rgba(120,40,220,0.18) 0%, rgba(60,20,180,0.08) 40%, transparent 70%)",
              filter: "blur(30px)",
            }} />
            <InteractiveCrystal />
          </motion.div>

          {/* Section 1 Content Overlay — left side, above the crystal */}
          <div className="absolute left-6 lg:left-20 top-1/2 -translate-y-1/2 flex flex-col items-start z-20 pointer-events-none" style={{ maxWidth: "clamp(260px, 32vw, 460px)" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={introComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start"
            >
              <h2 className="font-tech text-2xl sm:text-4xl lg:text-5xl font-bold text-white uppercase leading-[1.1] tracking-wide mb-8">
                The next wave<br />
                <span className="text-white/70">of legal tech</span>
              </h2>
              <button
                className="pointer-events-auto group relative px-6 py-2.5 overflow-hidden rounded-[2px] border border-white/20 backdrop-blur-sm transition-all hover:border-white/40"
                onClick={() => containerRef.current?.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300" />
                <span className="relative flex items-center gap-3 text-[9px] font-tech font-bold tracking-[0.25em] text-white/70 group-hover:text-white uppercase transition-colors">
                  <div className="w-[4px] h-[4px] bg-[#cc66d0] rotate-45" />
                  Explore our platform
                </span>
              </button>
            </motion.div>
          </div>

          {/* Bottom Navigation / HUD */}
          <div className="absolute bottom-10 left-6 lg:left-12 right-6 lg:right-12 flex items-center justify-between z-30 pointer-events-none">

            {/* Sound Toggle */}
            <div className="pointer-events-auto flex items-center gap-4 cursor-pointer group" onClick={() => {
              resumeAudioContext();
              setSoundEnabled(!soundEnabled);
            }}>
              <div className="flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                <div className="w-[2px] h-[6px] bg-white rounded-full" />
                <div className="w-[2px] h-[10px] bg-white rounded-full" />
                <div className="w-[2px] h-[4px] bg-white rounded-full" />
              </div>
              <span className="text-[9px] font-tech font-bold tracking-[0.25em] text-white/50 uppercase group-hover:text-white transition-colors">
                {soundEnabled ? "Sound On" : "Sound Off"}
              </span>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={introComplete ? { opacity: 1 } : {}}
              transition={{ delay: 1.8, duration: 1 }}
              className="pointer-events-auto flex items-center gap-3 cursor-pointer group"
              onClick={() => containerRef.current?.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
            >
              <div className="w-[10px] h-[10px] border border-white/30 rounded-full flex items-center justify-center relative overflow-hidden group-hover:border-white transition-colors">
                <motion.div
                  className="w-[2px] h-[2px] bg-white rounded-full"
                  animate={{ y: [-2, 4, -2] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <span className="font-tech text-[9px] font-bold tracking-[0.25em] text-white/50 uppercase group-hover:text-white transition-colors">
                Scroll to explore
              </span>
            </motion.div>

            {/* Connect / Chat */}
            <div className="pointer-events-auto flex items-center gap-3 cursor-pointer group">
              <span className="text-[9px] font-tech font-bold tracking-[0.25em] text-white/50 uppercase group-hover:text-white transition-colors">
                Connect with us
              </span>
              <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#cc66d0] group-hover:text-[#cc66d0] transition-all">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: MANIFESTO ─── */}
        <section className="inno-snap-section flex flex-col justify-center px-6 lg:px-10 relative">
          <div className="absolute bottom-8 left-6 lg:left-10 font-tech text-[9px] tracking-[0.2em] uppercase">
            <span className="bg-gradient-to-r from-[#9bb8e1] to-[#2c4e73] bg-clip-text text-transparent font-bold">//01</span>
            <span className="text-white/60 ml-2">Manifesto</span>
          </div>

          <div className="max-w-[1600px] mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-tech text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white uppercase leading-[1.05] tracking-tight"
                >
                  <span className="block">Legal Engineering with</span>
                  <span className="block bg-gradient-to-r from-white/80 to-white/50 bg-clip-text text-transparent">conviction</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-10 text-white/85 text-sm sm:text-base font-light leading-relaxed max-w-lg"
                >
                  ARNO is Silverlake&apos;s AI-native legal intelligence engine, purpose-built for the
                  venture capital ecosystem. We deploy autonomous strategist modules that map capital
                  structures, assess diligence anomalies, and model exit waterfalls.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-6 text-white/75 text-sm font-light leading-relaxed max-w-lg"
                >
                  We don&apos;t wait for consensus. We move with speed and clarity. Infrastructure first.
                  Returns follow.
                </motion.p>
              </div>

              <div className="space-y-6">
                {[
                  { num: "01", title: "Uncompromising Compliance", desc: "The law is not a negotiating position. Every statute, every filing, every obligation held to the letter, every time." },
                  { num: "02", title: "Transparency by Default", desc: "Every conclusion comes with a source. Every recommendation comes with a reason. You will never receive advice you can't trace back to first principles." },
                  { num: "03", title: "Unshakable Foundation", desc: "The hard work happens before the deadline, not at it. Every deposition, filing, and hearing is built on preparation done long before the room fills." },
                  { num: "04", title: "Fiercely Fiduciary", desc: "Your matter is our mandate. When you retain us, your interests become our full responsibility. There is no version of this where we separate the two." },
                  { num: "05", title: "Completely Confidential", desc: "Privilege is a covenant, not a setting. What you share with us stays with us permanently, unconditionally, by design." },
                  { num: "06", title: "Integrity by Design", desc: "Ethics are not a revision at the end of the engagement. They are the first line of it. We don't start anywhere else." },
                ].map((tenet, idx) => (
                  <motion.div
                    key={tenet.num}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="group border-l border-white/10 pl-6 py-3 hover:border-[#cc66d0]/40 transition-colors duration-500"
                  >
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-tech text-[10px] bg-gradient-to-r from-[#cc66d0] to-[#5588ff] bg-clip-text text-transparent tracking-widest font-bold">{tenet.num}</span>
                      <h3 className="font-tech text-sm font-bold text-white tracking-wide group-hover:text-white transition-colors duration-500">{tenet.title}</h3>
                    </div>
                    <p className="text-white/70 text-xs font-light leading-relaxed group-hover:text-white transition-colors duration-500">{tenet.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: PRODUCTS ─── */}
        <section className="inno-snap-section flex flex-col justify-center px-6 lg:px-10 py-16 relative" style={{ minHeight: "auto", scrollSnapAlign: "start" }}>
          <div className="absolute top-8 left-6 lg:left-10 font-tech text-[9px] tracking-[0.2em] uppercase">
            <span className="bg-gradient-to-r from-[#cc66d0] to-[#5588ff] bg-clip-text text-transparent font-bold">//02</span>
            <span className="text-white/60 ml-2">Platform</span>
          </div>

          <div className="max-w-[1600px] mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6"
            >
              <div>
                <div className="font-tech text-[10px] tracking-[0.25em] bg-gradient-to-r from-[#cc66d0] to-[#5588ff] bg-clip-text text-transparent uppercase mb-3 font-medium">
                  // LEGAL STRATEGIST SUITE
                </div>
                <h2 className="font-tech text-3xl sm:text-5xl font-extrabold text-white uppercase leading-tight tracking-tight">
                  The Legal Studio.<br />
                  <span className="block mt-2 text-base sm:text-xl md:text-2xl font-semibold tracking-normal bg-gradient-to-r from-white/80 to-white/50 bg-clip-text text-transparent normal-case leading-relaxed">
                    An Intelligent Synthesis of Market Strategy, Predictive Financial Modeling, and Automated Legal Architecture.
                  </span>
                </h2>
              </div>
            </motion.div>

            {/* DASHBOARD MOCKUP PREVIEW */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 mb-24 w-full flex flex-col items-center"
            >
              <h3 className="font-tech text-2xl font-bold text-white uppercase mb-8 tracking-widest text-center">Dashboard</h3>
              <div className="w-full max-w-[1000px] aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0B0F19]">
                <MainDashboard />
              </div>
            </motion.div>

            <InnoProductGrid soundEnabled={soundEnabled} />

            {/* BOOK A DEMO */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-20 w-full flex flex-col items-center gap-5"
            >
              <button
                onClick={handleCopyEmail}
                className="pointer-events-auto group relative px-10 py-4 overflow-hidden rounded-[2px] border border-[#cc66d0]/30 bg-[#cc66d0]/5 backdrop-blur-md transition-all duration-500 hover:border-[#cc66d0]/70 hover:bg-[#cc66d0]/10 hover:shadow-[0_0_30px_rgba(204,102,208,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative flex items-center gap-4 text-xs font-tech font-bold tracking-[0.3em] text-white/90 group-hover:text-white uppercase transition-colors">
                  <div className={`w-[6px] h-[6px] rotate-45 transition-colors duration-300 ${isCopied ? 'bg-green-400' : 'bg-[#cc66d0] group-hover:bg-[#5588ff]'}`} />
                  {isCopied ? "Email Copied!" : "Book A Demo"}
                  {!isCopied && (
                    <svg className="w-4 h-4 text-[#cc66d0] group-hover:text-[#5588ff] group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                  {isCopied && (
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
              </button>
              <p className="text-white/60 text-sm font-light tracking-wide text-center">
                Click to copy email, then mail us at <button onClick={handleCopyEmail} className="text-white/70 font-medium hover:text-white transition-colors cursor-pointer focus:outline-none">contact@silverlakelaw.in</button>
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── SECTION 4: CONTACT / FOOTER ─── */}
        <section className="inno-snap-section flex flex-col justify-center items-center px-6 lg:px-10 relative overflow-hidden">

          {/* Large glowing orb behind content */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(0,100,200,0.12) 0%, rgba(0,50,120,0.06) 30%, transparent 65%)",
              filter: "blur(80px)",
            }}
          />

          {/* Animated concentric rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-white/[0.04] pointer-events-none"
              style={{
                width: `${400 + i * 200}px`,
                height: `${400 + i * 200}px`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              animate={{ scale: [1, 1.03, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 4 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
            />
          ))}

          {/* Horizontal glowing line */}
          <motion.div
            className="absolute left-0 right-0 h-[1px] pointer-events-none"
            style={{
              top: "20%",
              background: "linear-gradient(90deg, transparent 0%, rgba(0,180,255,0.12) 30%, rgba(0,212,255,0.2) 50%, rgba(0,180,255,0.12) 70%, transparent 100%)",
            }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-0 right-0 h-[1px] pointer-events-none"
            style={{
              bottom: "20%",
              background: "linear-gradient(90deg, transparent 0%, rgba(0,180,255,0.08) 30%, rgba(0,212,255,0.15) 50%, rgba(0,180,255,0.08) 70%, transparent 100%)",
            }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <div className="absolute bottom-20 left-6 lg:left-12 font-tech text-[9px] tracking-[0.2em] uppercase">
            <span className="text-[#00d4ff]/70 font-bold">//03</span>
            <span className="text-white/50 ml-2">Contact</span>
          </div>

          <div className="max-w-[900px] mx-auto text-center relative z-10">
            {/* Small label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-8 flex items-center justify-center gap-4"
            >
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#00d4ff]/40" />
              <span className="font-tech text-[9px] tracking-[0.15em] text-[#00d4ff]/80 uppercase">Curious? Jump in and explore this interactive demo.</span>
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#00d4ff]/40" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-tech text-3xl sm:text-5xl lg:text-6xl font-bold text-white uppercase leading-tight tracking-tight mb-6"
            >
              We prioritize warm<br />
              <span className="text-white/85">introductions</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-white/75 text-sm font-light leading-relaxed max-w-md mx-auto mb-14"
            >
              The best collaborations begin with a trusted introduction.
              Reach out through your network or connect with us directly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-6"
            >
              {[
                { label: "Email us", href: "mailto:contact@silverlakelaw.in", primary: true },
                { label: "LinkedIn", href: "https://www.linkedin.com/company/arnoai/", primary: false },
                { label: "X / Twitter", href: "https://twitter.com", primary: false },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className={`group relative font-tech text-[10px] tracking-[0.25em] uppercase transition-all duration-300 px-8 py-3 border rounded-[2px] ${link.primary
                    ? "border-[#00d4ff]/40 text-[#00d4ff]/80 hover:border-[#00d4ff] hover:text-[#00d4ff] hover:shadow-[0_0_20px_rgba(0,212,255,0.15)]"
                    : "border-white/20 text-white/60 hover:border-white/40 hover:text-white/90"
                    }`}
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-12 py-6 border-t border-white/[0.04]">
            <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-tech text-[9px] tracking-[0.2em] text-white/40 uppercase">
                &copy; Silverlake Legal Advisors LLP {new Date().getFullYear()}
              </span>
              <div className="flex items-center gap-6">
                <Link
                  href="/privacy-policy"
                  className="font-tech text-[9px] tracking-[0.15em] text-white/40 uppercase hover:text-white/70 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/"
                  className="font-tech text-[9px] tracking-[0.15em] text-white/40 uppercase hover:text-white/70 transition-colors"
                >
                  Return to Silverlake
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
