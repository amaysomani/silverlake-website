"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { playClickSound, playHoverSound } from "@/lib/ArnoAudio";

const sections = [
  { id: "hero", num: "01", label: "MANIFESTO" },
  { id: "products", num: "02", label: "CAPABILITIES" },
  { id: "philosophy", num: "03", label: "PHILOSOPHY" },
  { id: "contact", num: "04", label: "CONTACT" },
];

interface ArnoScrollProgressProps {
  soundEnabled: boolean;
}

export default function ArnoScrollProgress({ soundEnabled }: ArnoScrollProgressProps) {
  const [activeSection, setActiveSection] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (soundEnabled) {
      playClickSound();
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMouseEnter = () => {
    if (soundEnabled) {
      playHoverSound();
    }
  };

  return (
    <div className="fixed right-6 lg:right-12 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-8 font-mono text-[9px] tracking-[0.25em]">
      {/* Scrollbar Line Track */}
      <div className="relative h-48 w-[2px] bg-white/10 rounded-full overflow-hidden mr-[9px]">
        <motion.div 
          style={{ scaleY }}
          className="absolute inset-0 bg-gradient-to-b from-[#7f56d9] to-[#3b82f6] origin-top rounded-full shadow-[0_0_10px_rgba(127,86,217,0.5)]"
        />
      </div>

      {/* Section Indicators */}
      <div className="flex flex-col gap-5 items-end">
        {sections.map((sect, index) => {
          const isActive = index === activeSection;
          return (
            <button
              key={sect.id}
              onClick={() => scrollToSection(sect.id)}
              onMouseEnter={handleMouseEnter}
              className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
            >
              {/* Text tag */}
              <span 
                className={`transition-all duration-500 transform ${
                  isActive 
                    ? "opacity-100 translate-x-0 text-white font-semibold" 
                    : "opacity-0 translate-x-4 text-white/30 group-hover:opacity-75 group-hover:translate-x-0"
                }`}
              >
                <span className="text-[#7f56d9] font-bold mr-1">// {sect.num}</span> {sect.label}
              </span>

              {/* Dot */}
              <div 
                className={`w-2.5 h-2.5 rounded-full border transition-all duration-500 ${
                  isActive 
                    ? "bg-[#3b82f6] border-[#3b82f6] scale-125 shadow-[0_0_10px_rgba(59,130,246,0.8)]" 
                    : "bg-transparent border-white/20 group-hover:border-white group-hover:scale-110"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
