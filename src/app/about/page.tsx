"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";
import { Shield, Target, Globe, Scale, ArrowRight } from "lucide-react";
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

const values = [
  {
    name: "Absolute Discretion",
    description: "Operating with the highest level of confidentiality and discretion, we protect our clients' interests in sensitive and complex transactions. Every engagement is treated with the utmost care, ensuring complete privacy throughout the advisory process.",
    icon: Shield,
  },
  {
    name: "Rigorous Expertise",
    description: "We bring elite subject-matter depth across regulatory, tax, structured financing, and technological compliance domains. Our lawyers are recognised specialists in their fields, with backgrounds at Magic Circle and leading international firms.",
    icon: Scale,
  },
  {
    name: "Global Perspective",
    description: "Advising on cross-border legal matters with an integrated network spanning our representative hubs in Dubai and Ireland. We coordinate seamlessly across time zones and regulatory jurisdictions to deliver unified counsel.",
    icon: Globe,
  },
  {
    name: "Client Alliance",
    description: "Aligning our operations with institutional demands to provide commercial agility and absolute professional alignment. We embed ourselves in our clients' strategic objectives, functioning as an extension of their internal legal operations.",
    icon: Target,
  },
];

export default function AboutPage() {
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
              <motion.span variants={fadeInUp} className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#cdcab2] block">
                Firm Overview
              </motion.span>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-white leading-[0.95]"
                >
                  An elite law firm built for
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-[#cdcab2] italic leading-[0.95]"
                >
                  institutional complexity.
                </motion.h1>
              </div>
              <motion.p variants={fadeInUp} className="mt-8 text-sm sm:text-base text-[#e2ddda]/70 leading-relaxed font-light max-w-2xl">
                Silverlake provides strategic counsel to businesses, investors, entrepreneurs, and institutions on complex legal matters across jurisdictions. We operate at the intersection of commercial ambition and regulatory discipline.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Firm Philosophy */}
        <section className="py-24 sm:py-32 bg-[#f9f3f1]">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
            >
              <motion.div variants={fadeInUp} className="space-y-6">
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#517380] font-semibold block">Our Philosophy</span>
                <div className="overflow-hidden">
                  <motion.h2
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif text-3xl sm:text-4xl font-light text-[#111111]"
                  >
                    Precision-Built Legal Counsel
                  </motion.h2>
                </div>
                <p className="text-sm text-[#757575] leading-relaxed font-light">
                  We believe that elite legal counsel requires more than technical compliance. It demands commercial foresight, structural agility, and absolute alignment with the client's strategic goals.
                </p>
                <p className="text-sm text-[#757575] leading-relaxed font-light">
                  Silverlake operates as a focused partnership. We consciously maintain a streamlined portfolio, ensuring that every transaction receives the full weight of our collective intelligence and deep sector expertise.
                </p>
                <p className="text-sm text-[#757575] leading-relaxed font-light">
                  Our advisory philosophy is rooted in a simple principle: legal counsel should accelerate business objectives, not constrain them. Every opinion, every structure, every recommendation is designed to create measurable commercial value.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="border border-[#cdcab2] p-8 sm:p-10 bg-[#fffaf8] space-y-6 hover:shadow-xl transition-shadow duration-700"
              >
                <h3 className="font-serif text-xl font-medium text-[#111111]">Key Differentiators</h3>
                <ul className="space-y-5 text-xs text-[#757575] font-light">
                  <li className="flex items-start gap-x-3">
                    <span className="h-2 w-2 bg-[#16303d] rounded-full mt-1.5 flex-shrink-0" />
                    <span><strong className="text-[#111111]">Sector Specialisation:</strong> We restrict our practices to high-end corporate, private capital, regulatory, and technology domains. This specialisation ensures unmatched depth in every engagement.</span>
                  </li>
                  <li className="flex items-start gap-x-3">
                    <span className="h-2 w-2 bg-[#16303d] rounded-full mt-1.5 flex-shrink-0" />
                    <span><strong className="text-[#111111]">Integrated Global Network:</strong> Seamless coordination across our key representative hubs in Dubai and Ireland with zero administrative friction or communication delays.</span>
                  </li>
                  <li className="flex items-start gap-x-3">
                    <span className="h-2 w-2 bg-[#16303d] rounded-full mt-1.5 flex-shrink-0" />
                    <span><strong className="text-[#111111]">CMS-Ready Client Resources:</strong> Providing direct access to high-value insights, regulatory updates, and transaction guides through our digital knowledge platform.</span>
                  </li>
                  <li className="flex items-start gap-x-3">
                    <span className="h-2 w-2 bg-[#16303d] rounded-full mt-1.5 flex-shrink-0" />
                    <span><strong className="text-[#111111]">AI-Native Operations:</strong> Leveraging proprietary technology to compress legal timelines, automate document workflows, and deliver real-time compliance monitoring.</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 sm:py-32 bg-[#111111] text-[#f9f3f1] noise-bg">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 relative z-10">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#cdcab2] font-semibold block">Core Values</span>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-4xl sm:text-5xl font-light"
                >
                  What Defines Us
                </motion.h2>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-sm text-[#e2ddda]/60 leading-relaxed"
              >
                Our values are not aspirational — they are operational. Every decision, every engagement, every recommendation is measured against these principles.
              </motion.p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-0"
            >
              {values.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.name}
                    variants={fadeInUp}
                    className={`group p-8 sm:p-10 lg:p-12 border-white/5 ${
                      idx < 2 ? "border-b" : ""
                    } ${
                      idx % 2 === 0 ? "sm:border-r" : ""
                    } hover:bg-white/[0.02] transition-colors duration-700`}
                  >
                    <div className="flex items-start gap-6">
                      <div className="p-3 border border-white/10 text-[#cdcab2] group-hover:scale-110 group-hover:border-[#cdcab2]/40 transition-all duration-500">
                        <Icon className="h-6 w-6 stroke-[1.2]" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-serif text-xl font-medium text-white group-hover:text-[#cdcab2] transition-colors duration-500">
                          {value.name}
                        </h3>
                        <p className="text-xs text-[#e2ddda]/50 leading-relaxed font-light">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Global Presence */}
        <section className="py-24 sm:py-32 bg-[#517380] text-[#f9f3f1] noise-bg">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 relative z-10">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#cdcab2] font-semibold block">Global Operations</span>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-4xl sm:text-5xl font-light"
                >
                  Representative Hubs
                </motion.h2>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-sm text-[#e2ddda]/70 leading-relaxed"
              >
                Strategically positioned in two of the world's most dynamic financial centres, our representative hubs enable seamless cross-border advisory.
              </motion.p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="space-y-6 text-left border-l-2 border-white/20 pl-8 group">
                <h3 className="font-serif text-3xl font-light text-white">Dubai</h3>
                <p className="text-sm text-[#e2ddda]/80 leading-relaxed font-light">
                  Headquartered in the Dubai International Financial Centre (DIFC), our Dubai office is our primary Middle East advisory hub, supporting private capital, structured finance, and cross-border M&A transactions across the GCC, MENA, and South Asian corridors.
                </p>
                <div className="pt-2">
                  <Link href="/careers#apply" className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#cdcab2] group-hover:text-white transition-colors duration-300">
                    Contact Dubai Office <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-6 text-left border-l-2 border-white/20 pl-8 group">
                <h3 className="font-serif text-3xl font-light text-white">Ireland</h3>
                <p className="text-sm text-[#e2ddda]/80 leading-relaxed font-light">
                  Based in Dublin's International Financial Services Centre (IFSC), our Dublin office serves as our European Union regulatory and competition hub, advising global clients on AIFMD, MiFID II, UCITS, and broader European financial services regulation.
                </p>
                <div className="pt-2">
                  <Link href="/careers#apply" className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#cdcab2] group-hover:text-white transition-colors duration-300">
                    Contact Dublin Office <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-32 bg-[#16303d] text-center">
          <div className="mx-auto max-w-[900px] px-6 lg:px-10">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl sm:text-5xl font-light text-white"
              >
                Ready to Work With Us?
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-sm text-[#e2ddda]/60 max-w-lg mx-auto leading-relaxed font-light"
            >
              Explore career opportunities or reach out to discuss how Silverlake can support your next transaction.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-10"
            >
              <MagneticButton strength={0.3}>
                <Link
                  href="/careers#apply"
                  className="group inline-flex items-center gap-3 border border-[#cdcab2]/40 text-[#f9f3f1] px-10 py-5 text-xs font-semibold uppercase tracking-[0.25em] hover:bg-[#cdcab2] hover:text-[#0a0f12] transition-all duration-700 btn-shine"
                >
                  Get in Touch
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
