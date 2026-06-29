"use client";

import React from "react";
import { motion } from "framer-motion";
import TextReveal from "./TextReveal";
import { playClickSound, playHoverSound } from "@/lib/ArnoAudio";

const culturalTenets = [
  {
    num: "01",
    kanji: "初心",
    title: "Shoshin (Beginner's Mind)",
    desc: "Maintaining an attitude of openness, eagerness, and lack of preconceptions. In the high-stakes engineering of orbit and intelligence, humility precedes excellence."
  },
  {
    num: "02",
    kanji: "実質",
    title: "Show Me What You Built",
    desc: "Our only credential check. We prioritize demonstrated capability and tangible output. Résumés are public relations; code, hardware, and networks are reality."
  },
  {
    num: "03",
    kanji: "自主",
    title: "Sovereign Individuals",
    desc: "We hire self-directed builders who operate without managers. You know what is important, you define the goals, and you execute with total autonomy."
  },
  {
    num: "04",
    kanji: "結束",
    title: "Don't Feast With Who You Wouldn't Starve With",
    desc: "True trust is forged in hardship. We value loyalty and shared sacrifice above all, ensuring every team member is committed to the long-range mission."
  },
  {
    num: "05",
    kanji: "道路",
    title: "Build Roads, Not Shops",
    desc: "Space is the next silk route. Arno builds the fundamental infrastructure layers—the roads and bridges—upon which the future global economy runs."
  },
  {
    num: "06",
    kanji: "物理",
    title: "Make Physics Dangerous Again",
    desc: "Rejecting soft corporate safety boundaries in favor of high-stakes, real-world engineering. We push limits to achieve what was deemed mathematically impossible."
  }
];

interface ArnoPhilosophyProps {
  soundEnabled: boolean;
}

export default function ArnoPhilosophy({ soundEnabled }: ArnoPhilosophyProps) {
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
    <section id="philosophy" className="py-32 px-6 lg:px-12 bg-[#020208] relative overflow-hidden select-none border-t border-white/5">
      {/* Dynamic Background Grid and Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(127,86,217,0.01)_1px,transparent_1px)] bg-[size:100%_40px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] rounded-full bg-[#7f56d9]/3 arno-orb-glow pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Sticky Section Title */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:h-[calc(100vh-200px)] flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono tracking-[0.25em] text-[#3b82f6] uppercase mb-4">
                // HISTORY & ETHOS
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white leading-[1.1] font-sans mb-6">
                Our Story &<br />Operating Philosophy
              </h2>
            </div>
            
            <div className="hidden lg:block">
              <div className="w-12 h-[1px] bg-white/20 mb-4" />
              <p className="text-[10px] font-mono tracking-[0.15em] text-white/30 uppercase">
                ARNO CORE PROTOCOLS
              </p>
            </div>
          </div>
          
          {/* Right Column: Narrative & Tenets */}
          <div className="lg:col-span-8 space-y-24">
            {/* The Story Paragraphs - Scroll link reveal */}
            <div className="space-y-12 text-lg sm:text-2xl text-white font-sans font-light leading-relaxed">
              <div>
                <p className="text-[10px] font-mono text-[#7f56d9] uppercase tracking-widest mb-3">// FOUNDATION</p>
                <TextReveal 
                  text="Arno was founded to build a critical application and infrastructure layer for the global space industry."
                  className="text-white/80"
                />
              </div>

              <div>
                <p className="text-[10px] font-mono text-[#7f56d9] uppercase tracking-widest mb-3">// EVOLUTION</p>
                <TextReveal 
                  text="Previously we tried a bunch of different things in space data and hardware: We tried building a great software stack, and a wonderful ML stack. It worked for sometime but our horizontal focus didn't give us enough proof of product market fit. It was heart breaking, but remember all cool cats have many lives."
                  className="text-white/80"
                />
              </div>

              <div>
                <p className="text-[10px] font-mono text-[#7f56d9] uppercase tracking-widest mb-3">// THE TRIVECTA FOCUS</p>
                <TextReveal 
                  text="We have been spending a lot of time with a specific set of customers – this taught us a lot about what they urgently need and how much they'll pay for it. We are building exactly what they need, we are co-creating the solution with them."
                  className="text-white/80"
                />
              </div>

              <div>
                <p className="text-[10px] font-mono text-[#7f56d9] uppercase tracking-widest mb-3">// OPERATIONAL MOBILITY</p>
                <TextReveal 
                  text="All roles at Arno are forward-deployed engineering roles. Sure, some days you'll enjoy a nice private office. But if your end user is stationed at the national borders or in the middle of a deployment in the Indian Ocean, we go meet them and build things with them right there. This is not for everyone but then we are not looking for everyone."
                  className="text-white/80"
                />
              </div>

              <div>
                <p className="text-[10px] font-mono text-[#7f56d9] uppercase tracking-widest mb-3">// MERITOCRACY OVER RESUMES</p>
                <TextReveal 
                  text="We believe in small, autonomous teams where individual ownership is absolute. For example, when we ask who is working on ML pipeline for a particular problem set, the answer will be a human name, rather than SDE2, or Chief Architect or CTO."
                  className="text-white/80"
                />
              </div>
            </div>

            {/* Cultural Tenets Section */}
            <div>
              <div className="mb-12">
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white font-sans">
                  The Core Tenets
                </h3>
                <div className="w-full h-[1px] bg-white/10 mt-4" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {culturalTenets.map((tenet, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={handleMouseEnter}
                    onClick={handleClick}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-300 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[9px] text-[#3b82f6] tracking-widest font-bold">
                        // {tenet.num}
                      </span>
                      <span className="font-sans text-xs text-white/20 tracking-widest uppercase font-bold">
                        {tenet.kanji}
                      </span>
                    </div>
                    <h4 className="text-sm font-mono tracking-wider text-white uppercase mb-2">
                      {tenet.title}
                    </h4>
                    <p className="text-white/40 text-xs leading-relaxed font-sans font-light">
                      {tenet.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
