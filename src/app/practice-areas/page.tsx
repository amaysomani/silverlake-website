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

        {/* Practice Grid - Warm Star Dust (#f9f3f1) Background */}
        <section className="py-24 bg-[#f9f3f1] transition-colors duration-300">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16"
            >
              {practiceAreas.map((area) => {
                const IconComponent = iconMap[area.iconName] || Briefcase;
                return (
                  <motion.div
                    key={area.slug}
                    variants={fadeInUp}
                    className="border border-[#cdcab2] p-10 bg-[#fffaf8] hover:bg-[#232323] hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group"
                  >
                    <div className="space-y-6">
                      <div className="flex items-center gap-x-4">
                        <div className="p-3 bg-[#f9f3f1] border border-[#cdcab2] text-[#1c3e4e] group-hover:scale-105 transition-transform duration-300">
                          <IconComponent className="h-6 w-6 stroke-[1.5]" />
                        </div>
                        <h2 className="font-serif text-xl font-medium text-[#111111] group-hover:text-[#cdcab2] transition-colors">
                          {area.name}
                        </h2>
                      </div>
                      <p className="text-xs sm:text-sm text-[#757575] group-hover:text-[#e2ddda] leading-relaxed transition-colors duration-300">
                        {area.overview}
                      </p>
                      
                      {/* Expertise tags */}
                      <div className="pt-4 space-y-2">
                        <h4 className="text-[10px] font-semibold uppercase tracking-wider text-[#111111] group-hover:text-[#cdcab2]">Core Expertise:</h4>
                        <div className="flex flex-wrap gap-2">
                          {area.expertise.slice(0, 3).map((exp) => (
                            <span
                              key={exp}
                              className="text-[11px] bg-[#f9f3f1] border border-[#cdcab2] px-3 py-1 text-[#757575]"
                            >
                              {exp}
                            </span>
                          ))}
                          {area.expertise.length > 3 && (
                            <span className="text-[11px] px-2 py-1 text-[#1c3e4e] group-hover:text-[#cdcab2] font-semibold">
                              +{area.expertise.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#cdcab2]/40 flex items-center justify-between">
                      <span className="text-[10px] text-[#757575] group-hover:text-[#aaaaaa] uppercase tracking-widest font-medium">
                        Silverlake Practice
                      </span>
                      <Link
                        href={`/practice-areas/${area.slug}`}
                        className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-[#111111] group-hover:text-[#cdcab2] transition-colors"
                      >
                        Explore Practice
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
