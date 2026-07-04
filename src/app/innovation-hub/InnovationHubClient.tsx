"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ParticleCanvas from "@/components/innovation/ParticleCanvas";
import InnoHeader from "@/components/innovation/InnoHeader";
import InnoScrollIndicator from "@/components/innovation/InnoScrollIndicator";
import InnoProductGrid from "@/components/innovation/InnoProductGrid";
import InteractiveCrystal from "@/components/innovation/InteractiveCrystal";
import { resumeAudioContext } from "@/lib/ArnoAudio";

export default function InnovationHubClient() {
  const [introComplete, setIntroComplete] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight - container.clientHeight;
    const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    setScrollProgress(Math.min(1, Math.max(0, progress)));
    const sectionHeight = container.clientHeight;
    const section = Math.round(scrollTop / sectionHeight);
    setCurrentSection(Math.min(3, Math.max(0, section)));
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
                <h1
                  className="font-tech text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tight text-white inno-glitch-text inno-chromatic"
                  data-text="ARNO"
                >
                  ARNO
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-4 font-tech text-[10px] tracking-[0.3em] text-white/30 uppercase"
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
                  <div className="relative font-tech text-[10px] tracking-[0.25em] text-white/60 uppercase px-8 py-3 border border-white/15 rounded hover:border-white/30 hover:text-white transition-all duration-500">
                    Enter with audio
                    <div className="absolute inset-0 rounded bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEnter();
                  }}
                  className="font-tech text-[9px] tracking-[0.2em] text-white/20 uppercase hover:text-white/50 transition-colors cursor-pointer"
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
          {/* Crystal + lens flare overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Radial glow behind crystal */}
            <div
              className="absolute w-[500px] h-[500px] pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(40,120,220,0.12) 0%, rgba(20,80,180,0.05) 30%, transparent 60%)",
                filter: "blur(40px)",
              }}
            />
            {/* Light rays from crystal — horizontal */}
            <motion.div
              className="absolute w-[800px] h-[2px] pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(80,160,255,0.1) 30%, rgba(100,200,255,0.15) 50%, rgba(80,160,255,0.1) 70%, transparent)",
              }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Light rays from crystal — vertical */}
            <motion.div
              className="absolute w-[2px] h-[400px] pointer-events-none"
              style={{
                background: "linear-gradient(180deg, transparent, rgba(80,160,255,0.08) 30%, rgba(100,200,255,0.12) 50%, rgba(80,160,255,0.08) 70%, transparent)",
              }}
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            {/* The Crystal */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={introComplete ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto relative"
            >
              <InteractiveCrystal />
            </motion.div>
          </div>

          {/* Section Label (Hashgraph VC style) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={introComplete ? { opacity: 1 } : {}}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-6 lg:left-10 font-tech text-[9px] tracking-[0.2em] uppercase"
          >
            <span className="bg-gradient-to-r from-[#9bb8e1] to-[#2c4e73] bg-clip-text text-transparent font-bold">//00</span>
            <span className="text-white/30 ml-2">Hero</span>
          </motion.div>

          {/* Hero bottom text */}
          <div className="flex-1" />
          <div className="flex items-end justify-between pb-12 max-w-[1600px] mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={introComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-lg"
            >
              <h2 className="font-tech text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase leading-[1.05] tracking-tight">
                <span className="block">The next wave</span>
                <span className="block bg-gradient-to-r from-white/70 to-white/40 bg-clip-text text-transparent">of venture capital</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={introComplete ? { opacity: 1 } : {}}
              transition={{ delay: 1.8, duration: 1 }}
              className="hidden sm:flex flex-col items-end gap-4 text-right cursor-pointer"
              onClick={() => containerRef.current?.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
            >
              <span className="font-tech text-[8px] tracking-[0.3em] text-white/30 uppercase">
                Scroll down to<br />discover more
              </span>
              <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 right-0 h-1/2"
                  style={{ background: "linear-gradient(180deg, #9bb8e1, #2c4e73)" }}
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── SECTION 2: MANIFESTO ─── */}
        <section className="inno-snap-section flex flex-col justify-center px-6 lg:px-10 relative">
          <div className="absolute bottom-8 left-6 lg:left-10 font-tech text-[9px] tracking-[0.2em] uppercase">
            <span className="bg-gradient-to-r from-[#9bb8e1] to-[#2c4e73] bg-clip-text text-transparent font-bold">//01</span>
            <span className="text-white/30 ml-2">Manifesto</span>
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
                  <span className="block">Capital with</span>
                  <span className="block ml-8 lg:ml-16 bg-gradient-to-r from-white/60 to-white/30 bg-clip-text text-transparent">conviction</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-10 text-white/45 text-sm sm:text-base font-light leading-relaxed max-w-lg"
                >
                  ARNO is Silverlake&apos;s AI-native legal intelligence engine, purpose-built for the
                  venture capital ecosystem. We deploy autonomous strategist modules that map capital
                  structures, assess diligence anomalies, and model exit waterfalls — with the precision
                  of elite legal counsel and the speed of autonomous systems.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-6 text-white/35 text-sm font-light leading-relaxed max-w-lg"
                >
                  We don&apos;t wait for consensus. We move with speed and clarity. Infrastructure first.
                  Returns follow.
                </motion.p>
              </div>

              <div className="space-y-6">
                {[
                  { num: "01", title: "Shoshin — Beginner\u2019s Mind", desc: "Maintaining openness, eagerness, and lack of preconceptions. In the high-stakes engineering of legal intelligence, humility precedes excellence." },
                  { num: "02", title: "Show Me What You Built", desc: "Our only credential check. We prioritize demonstrated capability and tangible output. Code, hardware, and networks are reality." },
                  { num: "03", title: "Sovereign Individuals", desc: "We hire self-directed builders who operate without managers. You define the goals and execute with total autonomy." },
                  { num: "04", title: "Build Roads, Not Shops", desc: "ARNO builds the fundamental infrastructure layers \u2014 the roads and bridges \u2014 upon which the future legal-capital economy runs." },
                ].map((tenet, idx) => (
                  <motion.div
                    key={tenet.num}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="group border-l border-white/10 pl-6 py-3 hover:border-[#9bb8e1]/40 transition-colors duration-500"
                  >
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-tech text-[10px] bg-gradient-to-r from-[#9bb8e1] to-[#2c4e73] bg-clip-text text-transparent tracking-widest font-bold">{tenet.num}</span>
                      <h3 className="font-tech text-sm font-bold text-white/80 uppercase tracking-wide group-hover:text-white transition-colors duration-500">{tenet.title}</h3>
                    </div>
                    <p className="text-white/30 text-xs font-light leading-relaxed group-hover:text-white/45 transition-colors duration-500">{tenet.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: PRODUCTS ─── */}
        <section className="inno-snap-section flex flex-col justify-center px-6 lg:px-10 py-16 relative" style={{ minHeight: "auto", scrollSnapAlign: "start" }}>
          <div className="absolute top-8 left-6 lg:left-10 font-tech text-[9px] tracking-[0.2em] uppercase">
            <span className="bg-gradient-to-r from-[#9bb8e1] to-[#2c4e73] bg-clip-text text-transparent font-bold">//02</span>
            <span className="text-white/30 ml-2">Platform</span>
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
                <div className="font-tech text-[10px] tracking-[0.25em] bg-gradient-to-r from-[#9bb8e1] to-[#2c4e73] bg-clip-text text-transparent uppercase mb-3 font-medium">
                  // LEGAL STRATEGIST SUITE
                </div>
                <h2 className="font-tech text-3xl sm:text-5xl font-extrabold text-white uppercase leading-tight tracking-tight">
                  The Legal Studio.<br />
                  <span className="bg-gradient-to-r from-white/50 to-white/25 bg-clip-text text-transparent">Autonomous VC Workflows.</span>
                </h2>
              </div>
              <p className="text-white/30 text-xs sm:text-sm font-light leading-relaxed max-w-md">
                15 strategic modules mapping capital structures, diligence anomalies,
                and exit waterfalls in real-time.
              </p>
            </motion.div>

            <InnoProductGrid soundEnabled={soundEnabled} />
          </div>
        </section>

        {/* ─── SECTION 4: CONTACT / FOOTER ─── */}
        <section className="inno-snap-section flex flex-col justify-center items-center px-6 lg:px-10 relative">
          <div className="absolute bottom-20 left-6 lg:left-10 font-tech text-[9px] tracking-[0.2em] uppercase">
            <span className="bg-gradient-to-r from-[#9bb8e1] to-[#2c4e73] bg-clip-text text-transparent font-bold">//03</span>
            <span className="text-white/30 ml-2">Contact</span>
          </div>

          {/* Ambient glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(30,80,160,0.06) 0%, transparent 60%)",
              filter: "blur(60px)",
            }}
          />

          <div className="max-w-[1000px] mx-auto text-center relative">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-tech text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase leading-tight tracking-tight"
            >
              We prioritize warm introductions
              <br />
              <span className="bg-gradient-to-r from-white/50 to-white/25 bg-clip-text text-transparent">and ecosystem referrals</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-8"
            >
              {[
                { label: "Email", href: "mailto:contact@silverlakelaw.in", external: false },
                { label: "LinkedIn", href: "https://linkedin.com", external: true },
                { label: "X (Twitter)", href: "https://twitter.com", external: true },
              ].map((link, i) => (
                <React.Fragment key={link.label}>
                  {i > 0 && <span className="w-[1px] h-4 bg-white/10" />}
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className="font-tech text-[11px] tracking-[0.2em] text-white/40 uppercase hover:text-white transition-colors duration-300 font-medium"
                  >
                    {link.label}
                  </a>
                </React.Fragment>
              ))}
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-10 py-6">
            <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-tech text-[9px] tracking-[0.2em] text-white/15 uppercase">
                &copy; Silverlake Legal Advisors LLP {new Date().getFullYear()}
              </span>
              <div className="flex items-center gap-6">
                <Link
                  href="/privacy-policy"
                  className="font-tech text-[9px] tracking-[0.15em] text-white/15 uppercase hover:text-white/40 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/"
                  className="font-tech text-[9px] tracking-[0.15em] text-white/15 uppercase hover:text-white/40 transition-colors"
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
