"use client";

import * as React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Briefcase, Layers, DollarSign, Gavel, ShieldCheck, Home, Calculator, Cpu } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";
import { getPracticeAreas } from "@/lib/cms";
import { PracticeArea } from "@/lib/types";

// Map string icon names to Lucide components
const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Briefcase: Briefcase,
  Layers: Layers,
  DollarSign: DollarSign,
  Gavel: Gavel,
  ShieldCheck: ShieldCheck,
  Home: Home,
  Calculator: Calculator,
  Cpu: Cpu,
};

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

  React.useEffect(() => {
    async function loadData() {
      const data = await getPracticeAreas();
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

        {/* Practice Areas Index - Macfarlanes Style */}
        <section className="py-24 bg-[#eae8e1] min-h-screen text-[#222]">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
              
              {/* Left Column - Main Categories */}
              <div className="w-full lg:w-[45%] flex flex-col gap-0">
                {practiceAreas.map((area, idx) => (
                  <div key={area.slug} className="border-b border-[#222]/20 last:border-b-0 group cursor-pointer">
                    <Link 
                      href={`/practice-areas/${area.slug}`}
                      className="py-6 flex items-center justify-between hover:text-black transition-colors"
                    >
                      <h2 className="font-serif text-2xl lg:text-[28px] font-normal text-[#333] group-hover:text-black transition-colors">
                        {area.name}
                      </h2>
                      <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center group-hover:bg-[#111] transition-colors">
                        <ArrowRight className="w-4 h-4 text-[#eae8e1] transform rotate-90" />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Right Column - Highlighted Area / Sub-categories (Static example for M&A based on screenshot) */}
              <div className="w-full lg:w-[45%] lg:sticky lg:top-32 flex flex-col pt-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-serif text-2xl lg:text-[28px] font-normal text-[#333]">
                    M&A
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-[#ccc]">
                    <ArrowRight className="w-4 h-4 text-[#333] transform -rotate-90" />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {[
                    "Overview of M&A",
                    "Private M&A",
                    "Public Takeovers and Mergers",
                    "Capital Markets",
                    "Private Equity Transactions",
                    "Private Capital Real Estate",
                    "Sponsor Solutions",
                    "Management Advisory"
                  ].map((subItem) => (
                    <Link 
                      key={subItem} 
                      href="/practice-areas/corporate-and-ma"
                      className="group inline-flex items-center gap-2 text-base text-[#444] border-b border-[#222]/30 pb-2 hover:border-[#222] transition-colors w-fit"
                    >
                      {subItem}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
                
                {/* Visual Separator */}
                <div className="h-px bg-[#222]/20 w-full mt-12 mb-8"></div>
                
                <p className="text-sm text-[#666] font-light max-w-sm">
                  Click on any practice area on the left to explore our capabilities, sub-practices, and key contacts.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
