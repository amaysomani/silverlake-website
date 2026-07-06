"use client";

import React from "react";

interface InnoScrollIndicatorProps {
  scrollProgress: number;
  currentSection: number;
  totalSections: number;
}

const sectionLabels = ["HERO", "MANIFESTO", "PLATFORM", "CONTACT"];

export default function InnoScrollIndicator({ currentSection }: InnoScrollIndicatorProps) {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4 pointer-events-none">
      {sectionLabels.map((label, idx) => {
        const isActive = currentSection === idx;
        return (
          <div key={label} title={label} className="flex items-center justify-center w-3 h-3">
            <div
              className={`rounded-full transition-all duration-500 ${
                isActive ? "w-2 h-2 bg-[#cc66d0]" : "w-1.5 h-1.5 bg-white/25"
              }`}
              style={{ boxShadow: isActive ? "0 0 8px rgba(0,212,255,0.7)" : "none" }}
            />
          </div>
        );
      })}
    </div>
  );
}
