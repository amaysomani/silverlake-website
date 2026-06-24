"use client";

import * as React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, ArrowDown, ArrowUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPracticeAreas } from "@/lib/cms";
import { PracticeArea } from "@/lib/types";

// Animation Variants for Cascading Stagger Effects
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

export default function PracticeAreasPage() {
  const [practiceAreas, setPracticeAreas] = React.useState<PracticeArea[]>([]);
  const [selectedArea, setSelectedArea] = React.useState<PracticeArea | null>(null);

  React.useEffect(() => {
    async function loadData() {
      const data = await getPracticeAreas();
      // Need to split them into 2 columns for the unselected view
      setPracticeAreas(data);
    }
    loadData();
  }, []);

  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* Cinematic Hero */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#0a0f12] overflow-hidden">
          <div className="absolute inset-0 grain-overlay pointer-events-none" />
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 relative z-10">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-4xl space-y-5"
            >
              <motion.span variants={fadeInUp} className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#cdcab2] block">What We Think & Do</motion.span>
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-white leading-[0.95]"
                >
                  Our Practice Areas
                </motion.h1>
              </div>
              <motion.p variants={fadeInUp} className="mt-6 text-sm sm:text-base text-[#e2ddda]/70 leading-relaxed font-light max-w-2xl">
                Silverlake delivers market-leading counsel across eight core practices. We provide cross-border structuring, regulatory clearance, and transactional advisory designed to align with institutional standards.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Practice Areas Index - Interactive Macfarlanes Style */}
        <section className="py-24 bg-[#eae8e1] min-h-screen text-[#222]">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            
            {selectedArea === null ? (
              /* State 1: 2-Column Grid of All Services */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0 max-w-5xl mx-auto">
                {practiceAreas.map((area) => (
                  <div 
                    key={area.slug} 
                    className="flex justify-between items-center border-b border-[#222]/20 py-5 cursor-pointer group"
                    onClick={() => setSelectedArea(area)}
                  >
                    <h2 className="font-serif text-[22px] lg:text-[24px] font-normal text-[#333] group-hover:text-black transition-colors">
                      {area.name}
                    </h2>
                    <div className="w-7 h-7 rounded-full bg-[#444] flex items-center justify-center group-hover:bg-[#111] transition-colors">
                      <ArrowDown className="w-4 h-4 text-[#eae8e1]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* State 2: 50/50 Split View */
              <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start max-w-6xl mx-auto">
                
                {/* Left Column - Main Categories */}
                <div className="w-full lg:w-[50%] flex flex-col gap-0">
                  {practiceAreas.map((area) => {
                    const isSelected = selectedArea.slug === area.slug;
                    return (
                      <div 
                        key={area.slug} 
                        className="flex justify-between items-center border-b border-[#222]/20 py-5 cursor-pointer group"
                        onClick={() => setSelectedArea(isSelected ? null : area)}
                      >
                        <h2 className={`font-serif text-[22px] lg:text-[24px] font-normal transition-colors ${isSelected ? "text-black" : "text-[#444] group-hover:text-black"}`}>
                          {area.name}
                        </h2>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isSelected ? "bg-[#111]" : "bg-[#444] group-hover:bg-[#111]"}`}>
                          {isSelected ? (
                            <ArrowUp className="w-4 h-4 text-[#eae8e1]" />
                          ) : (
                            <ArrowDown className="w-4 h-4 text-[#eae8e1]" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right Column - Subcategories */}
                <div className="w-full lg:w-[50%] lg:sticky lg:top-32 flex flex-col pt-5">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="font-serif text-[28px] lg:text-[32px] font-normal text-[#111]">
                      {selectedArea.name}
                    </h3>
                    <div 
                      className="w-9 h-9 rounded-full bg-[#eae8e1] flex items-center justify-center border border-[#999] hover:bg-white hover:border-[#111] transition-all cursor-pointer shadow-sm"
                      onClick={() => setSelectedArea(null)}
                    >
                      <ArrowUp className="w-4 h-4 text-[#333]" strokeWidth={2} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    <Link 
                      href={`/practice-areas/${selectedArea.slug}`}
                      className="group inline-flex items-center justify-between text-[15px] text-[#444] border-b border-[#222]/20 pb-3 hover:border-[#222] hover:text-[#111] transition-colors w-full sm:w-[90%]"
                    >
                      Overview of {selectedArea.name}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                    </Link>
                    
                    {selectedArea.expertise.map((exp) => (
                      <Link 
                        key={exp.slug} 
                        href={`/practice-areas/${selectedArea.slug}/${exp.slug}`}
                        className="group inline-flex items-center justify-between text-[15px] text-[#444] border-b border-[#222]/20 pb-3 hover:border-[#222] hover:text-[#111] transition-colors w-full sm:w-[90%]"
                      >
                        {exp.title}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                      </Link>
                    ))}
                  </div>
                  
                  {/* Visual Separator */}
                  <div className="h-px bg-[#222]/10 w-full mt-16 mb-8"></div>
                  
                  <p className="text-[13px] text-[#666] font-light max-w-sm tracking-wide">
                    Click on any practice area on the left to explore our capabilities.
                  </p>
                </div>

              </div>
            )}

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
