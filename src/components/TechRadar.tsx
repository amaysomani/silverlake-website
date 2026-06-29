"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TechRadar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Radar Rings */}
        {[1, 2, 3, 4].map((ring) => (
          <motion.div
            key={ring}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0.5, 1, 1.5],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: ring * 1,
              ease: "linear",
            }}
            className="absolute rounded-full border border-green-500/30"
            style={{
              width: ring * 300,
              height: ring * 300,
            }}
          />
        ))}

        {/* Scanning Sweep */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-[800px] h-[800px] rounded-full overflow-hidden"
          style={{ originX: 0.5, originY: 0.5 }}
        >
          <div className="w-1/2 h-1/2 absolute top-0 right-0 bg-gradient-to-bl from-green-500/20 to-transparent" style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }} />
        </motion.div>

        {/* Grid Background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, #00ff00 1px, transparent 1px), linear-gradient(to bottom, #00ff00 1px, transparent 1px)`,
            backgroundSize: "50px 50px"
          }}
        />
      </div>
    </div>
  );
}
