"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-grow bg-[#fcfbf9] text-[#111]">
        
        {/* Astonishing Hero Section */}
        <section className="pt-32 pb-20 lg:pt-48 lg:pb-32">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-end"
            >
              <div className="max-w-2xl">
                <div className="overflow-hidden mb-8">
                  <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif text-[50px] sm:text-[64px] lg:text-[88px] font-normal tracking-tight text-[#111] leading-[1.05]"
                  >
                    A distinctly different approach.
                  </motion.h1>
                </div>
                <motion.div variants={fadeInUp} className="flex gap-6 items-center">
                  <Link
                    href="/careers#apply"
                    className="group inline-flex items-center gap-3 bg-[#111] text-white px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.2em] hover:bg-[#333] transition-colors"
                  >
                    Contact Us
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </div>
              
              <motion.div variants={fadeInUp} className="max-w-lg lg:ml-auto">
                <p className="text-[20px] md:text-[24px] font-serif font-light text-[#444] leading-[1.5]">
                  Silverlake provides strategic counsel to businesses, investors, entrepreneurs, and institutions on complex legal matters across jurisdictions. We operate at the intersection of commercial ambition and regulatory discipline.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Massive Image Break */}
        <section className="py-10">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full aspect-[21/9] bg-[#eae8e1] overflow-hidden"
            >
              <img 
                src="/images/office-interior.png" 
                alt="Our global operations" 
                className="w-full h-full object-cover object-center grayscale-[20%]"
              />
            </motion.div>
          </div>
        </section>

        {/* Firm Philosophy / Differentiators */}
        <section className="py-24 sm:py-40">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-32">
              <div>
                <h2 className="font-serif text-[36px] lg:text-[48px] font-normal text-[#111] leading-tight sticky top-32">
                  Precision-Built <br />Legal Counsel
                </h2>
              </div>
              <div className="space-y-16 max-w-3xl">
                <div>
                  <h3 className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#111] mb-6">Sector Specialisation</h3>
                  <p className="text-[19px] text-[#555] font-light leading-[1.7]">
                    We restrict our practices to high-end corporate, private capital, regulatory, and technology domains. This specialisation ensures unmatched depth in every engagement. Every transaction receives the full weight of our collective intelligence.
                  </p>
                </div>
                <div className="h-px w-full bg-[#111]/10"></div>
                <div>
                  <h3 className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#111] mb-6">Integrated Global Network</h3>
                  <p className="text-[19px] text-[#555] font-light leading-[1.7]">
                    Seamless coordination across our key representative hubs in Dubai and Ireland with zero administrative friction or communication delays. Our advisory philosophy is rooted in a simple principle: legal counsel should accelerate business objectives, not constrain them.
                  </p>
                </div>
                <div className="h-px w-full bg-[#111]/10"></div>
                <div>
                  <h3 className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#111] mb-6">Absolute Discretion</h3>
                  <p className="text-[19px] text-[#555] font-light leading-[1.7]">
                    Operating with the highest level of confidentiality and discretion, we protect our clients' interests in sensitive and complex transactions. Every engagement is treated with the utmost care, ensuring complete privacy throughout the advisory process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Operations / Contact Footer */}
        <section className="py-32 bg-[#eae8e1]">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 text-center">
            <h2 className="font-serif text-[40px] sm:text-[56px] font-normal text-[#111] mb-8">
              Speak with our partners.
            </h2>
            <p className="text-[20px] text-[#555] font-light max-w-2xl mx-auto mb-16">
              Strategically positioned in two of the world's most dynamic financial centres, our representative hubs enable seamless cross-border advisory.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/careers#apply"
                className="group inline-flex justify-center items-center gap-3 bg-[#111] text-white px-10 py-5 text-[13px] font-semibold uppercase tracking-[0.2em] hover:bg-[#333] transition-colors"
              >
                Contact Dubai Hub
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/careers#apply"
                className="group inline-flex justify-center items-center gap-3 border border-[#111]/20 bg-transparent text-[#111] px-10 py-5 text-[13px] font-semibold uppercase tracking-[0.2em] hover:border-[#111] transition-colors"
              >
                Contact Dublin Hub
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
