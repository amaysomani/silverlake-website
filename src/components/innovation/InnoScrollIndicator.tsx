"use client";

import React from "react";
import { motion } from "framer-motion";

interface InnoScrollIndicatorProps {
  scrollProgress: number; // 0 to 1
  currentSection: number; // 0-3
  totalSections: number;
}

const sectionLabels = ["HERO", "MANIFESTO", "THE STUDIO", "CONNECT"];

export default function InnoScrollIndicator({
  scrollProgress,
  currentSection,
  totalSections,
}: InnoScrollIndicatorProps) {
  return (
    <>
      {/* Right-side vertical progress bar */}
      <div className="fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3">
        <div className="relative w-[1px] h-32 bg-white/10 overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#00d4ff] to-[#0066ff] rounded-full"
            style={{ height: `${scrollProgress * 100}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Bottom-left section number */}
      <div className="fixed bottom-8 left-6 lg:left-10 z-40 flex flex-col gap-1">
        <motion.span
          key={currentSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[10px] font-tech font-medium tracking-[0.25em] text-[#00d4ff]/60 uppercase"
        >
          //{String(currentSection + 1).padStart(2, "0")}
        </motion.span>
        <motion.span
          key={`label-${currentSection}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-[11px] font-tech font-bold tracking-[0.2em] text-white/80 uppercase"
        >
          {sectionLabels[currentSection] || ""}
        </motion.span>
      </div>
    </>
  );
}
