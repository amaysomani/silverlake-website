"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function GlobalOverlays() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Film Grain Noise */}
      <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03] mix-blend-overlay noise-bg" />

      {/* Architectural Grid System */}
      <div 
        className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Reading Progress Indicator */}
      <div className="fixed left-0 top-0 bottom-0 w-1 bg-black/10 z-[100] hidden md:block">
        <motion.div
          className="w-full bg-[#C5A059] origin-top"
          style={{ scaleY, height: '100%' }}
        />
      </div>
    </>
  );
}
