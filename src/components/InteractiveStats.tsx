"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

function Counter({ from, to, format }: { from: number, to: number, format: (val: number) => string }) {
  const nodeRef = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });
  
  React.useEffect(() => {
    if (!isInView || !nodeRef.current) return;
    let start = performance.now();
    const duration = 2000;
    
    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = from + (to - from) * easeProgress;
      
      if (nodeRef.current) {
        nodeRef.current.textContent = format(current);
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, from, to, format]);

  return <span ref={nodeRef}>{format(from)}</span>;
}

export default function InteractiveStats() {
  const stats = [
    { value: 20, format: (v: number) => `$${Math.floor(v)}B+`, label: "Assets Advised" },
    { value: 500, format: (v: number) => `${Math.floor(v)}+`, label: "Global Professionals" },
    { value: 25, format: (v: number) => `${Math.floor(v)}+`, label: "Jurisdictions" },
    { value: 95, format: (v: number) => `${Math.floor(v)}%`, label: "Client Retention" }
  ];

  return (
    <section className="py-[100px] lg:py-[140px] bg-[#0A1128] relative border-t border-white/5">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="relative group cursor-default"
            >
              <div className="absolute inset-0 bg-[#C5A059] blur-3xl opacity-0 group-hover:opacity-[0.15] transition-opacity duration-700" />
              <div className="font-serif text-5xl md:text-7xl font-light text-[#C5A059] mb-4 drop-shadow-[0_0_15px_rgba(197,160,89,0.1)] group-hover:drop-shadow-[0_0_25px_rgba(197,160,89,0.3)] transition-all duration-700">
                <Counter from={0} to={stat.value} format={stat.format} />
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/50 font-semibold group-hover:text-white/80 transition-colors duration-700">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
