"use client";

import { motion } from "framer-motion";

export default function InfiniteMarquee() {
  const items = ["Corporate Law", "Private Equity", "Dispute Resolution", "Regulatory Advisory", "Real Estate", "Tax", "M&A", "Finance"];
  return (
    <div className="relative flex overflow-hidden whitespace-nowrap bg-[#0A1128] py-8 border-y border-white/5">
      <motion.div
        className="flex gap-16 pr-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="font-serif text-5xl md:text-7xl font-light text-white/5 uppercase tracking-wider">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
