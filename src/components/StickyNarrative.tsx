"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import EditorialHeadline from "./EditorialHeadline";

const steps = [
  {
    title: "Corporate Law",
    desc: "Advising on complex cross-border transactions and governance matters.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Mergers & Acquisitions",
    desc: "Structuring and executing high-stakes public and private M&A deals.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Dispute Resolution",
    desc: "Protecting clients' interests in landmark international litigation.",
    img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Regulatory Advisory",
    desc: "Navigating rapidly evolving global financial regulations.",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop"
  }
];

export default function StickyNarrative() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate which step is active based on scroll progress (0 to 1 over 4 steps)
  const activeIndex = useTransform(scrollYProgress, (v) => Math.min(Math.floor(v * steps.length), steps.length - 1));
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = activeIndex.on("change", (v) => setActive(v));
    return () => unsubscribe();
  }, [activeIndex]);

  return (
    <section ref={containerRef} className="relative w-full bg-[#fcfbf9]" style={{ height: `${steps.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center overflow-hidden">
        
        {/* Left: Sticky Text */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-10 md:px-20 relative z-10">
          <EditorialHeadline text="Our Expertise" className="font-serif text-5xl md:text-7xl font-light text-[#0A1128] mb-8" />
          
          <div className="relative h-[200px]">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="absolute top-0 left-0 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: active === i ? 1 : 0, 
                  y: active === i ? 0 : 20,
                  pointerEvents: active === i ? 'auto' : 'none'
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-semibold text-[#C5A059] uppercase tracking-widest">
                    Step 0{i + 1}
                  </span>
                  <div className="h-[1px] w-12 bg-[#0A1128]/20" />
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-light text-[#0A1128] mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-[#0A1128]/70 max-w-md leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Scrolling Images mapped to scroll */}
        <div className="w-full md:w-1/2 h-full relative">
          {steps.map((step, i) => {
            // Each image should fade in/out based on scroll progress
            const start = i / steps.length;
            const end = (i + 1) / steps.length;
            const yOffset = useTransform(scrollYProgress, [start, end], ["10%", "-10%"]);
            const opacity = useTransform(scrollYProgress, 
              [start - 0.1, start, end, end + 0.1], 
              [0, 1, 1, 0]
            );
            
            return (
              <motion.div
                key={i}
                className="absolute inset-0 w-full h-full p-4 md:p-10"
                style={{ opacity }}
              >
                <motion.div className="w-full h-full relative overflow-hidden rounded-sm" style={{ y: yOffset }}>
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Floating Panel Depth Shadow */}
                  <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
