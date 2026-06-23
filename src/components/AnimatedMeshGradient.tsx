"use client";

import { motion } from "framer-motion";

export default function AnimatedMeshGradient() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none mix-blend-screen opacity-20">
      <motion.div
        className="absolute -inset-[100%] opacity-40"
        style={{
          background: "radial-gradient(circle at center, #1F2A44 0%, transparent 40%), radial-gradient(circle at 80% 20%, #C5A059 0%, transparent 30%), radial-gradient(circle at 20% 80%, #0A1128 0%, transparent 50%)"
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}
