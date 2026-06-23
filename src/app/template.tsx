"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Navy Sweep Panel */}
      <motion.div
        className="fixed inset-0 z-[100] bg-[#0A1128] origin-right"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Content Fade In */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
