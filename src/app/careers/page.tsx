"use client";

import * as React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, GraduationCap, Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";

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

export default function CareersPage() {
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const openings = [
    {
      title: "Senior Associate – Corporate & M&A",
      location: "Dubai representative office",
      type: "Lateral Hire",
      description: "We are seeking a senior associate with 5+ years PQE to join our market-leading Corporate M&A team. Experience in cross-border acquisitions and financial sponsor transactions is preferred.",
    },
    {
      title: "Associate – Credit Funds & Private Capital",
      location: "Dubai / Ireland / Udaipur / Bangalore representative hubs",
      type: "Lateral Hire",
      description: "Seeking a finance associate with 2-4 years PQE to advise credit funds and institutional direct lending platforms on structural leverage and portfolio investments.",
    },
    {
      title: "Knowledge Lawyer – Financial Services Regulation",
      location: "Ireland representative office",
      type: "Knowledge & Innovation",
      description: "Seeking an experienced regulatory specialist (5+ years PQE) to coordinate thought leadership, track legislative adjustments (including AIFMD II), and advise internal transaction teams.",
    },
  ];

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
              <motion.span variants={fadeInUp} className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#cdcab2] block">Careers at Silverlake</motion.span>
              
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-white leading-[0.95]"
                >
                  Work at the frontier of
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-[#cdcab2] italic leading-[0.95]"
                >
                  complex legal matters.
                </motion.h1>
              </div>

              <motion.p variants={fadeInUp} className="mt-8 text-sm sm:text-base text-[#e2ddda]/70 leading-relaxed font-light max-w-2xl">
                Silverlake looks for exceptional analytical minds, commercial perspective, and collegiate spirits. We advise global platforms on high-stakes transactions, demanding rigour, agility, and absolute dedication.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Why Join Silverlake - Star Dust (#f9f3f1) Background */}
        <section className="py-24 border-b border-border bg-[#f9f3f1] transition-colors duration-300">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
            >
              <motion.div variants={fadeInUp} className="space-y-6">
                <div className="reveal-text-line">
                  <h2 className="font-serif text-3xl font-light text-[#111111]">Why Join Silverlake?</h2>
                </div>
                <p className="text-sm text-[#757575] leading-relaxed font-light">
                  We maintain a collaborative, non-hierarchical partnership. Working in focused transaction teams means that from your first day, you will be directly involved in shaping creative structures for leading institutions.
                </p>
                <p className="text-sm text-[#757575] leading-relaxed font-light">
                  We invest heavily in our lawyers’ professional development, providing structured training across technical legal disciplines, commercial business models, and emerging technological regulations.
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeInUp}
                className="border border-[#cdcab2] p-8 bg-[#fffaf8] space-y-6 shadow-sm hover:shadow-xl transition-shadow duration-500"
              >
                <h3 className="font-serif text-lg font-medium text-[#111111]">What We Expect</h3>
                <ul className="space-y-4 text-xs text-[#757575] font-light">
                  <li className="flex items-start gap-x-3">
                    <CheckCircle2 className="h-5 w-5 text-[#1c3e4e] mt-0.5 flex-shrink-0" />
                    <span><strong>Technical Rigour:</strong> Absolute precision and analytical depth in reviewing and drafting transaction documentation.</span>
                  </li>
                  <li className="flex items-start gap-x-3">
                    <CheckCircle2 className="h-5 w-5 text-[#1c3e4e] mt-0.5 flex-shrink-0" />
                    <span><strong>Commercial Perspective:</strong> Translating legal boundaries into actionable, value-accretive advice for business principals.</span>
                  </li>
                  <li className="flex items-start gap-x-3">
                    <CheckCircle2 className="h-5 w-5 text-[#1c3e4e] mt-0.5 flex-shrink-0" />
                    <span><strong>Collegiate Spirit:</strong> Supporting your colleagues, sharing knowledge, and contributing to a unified partnership culture.</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Programmes Section (Graduate & Internships) - Deep Japanese Indigo (#16303d) Background */}
        <section className="py-24 border-b border-[#1c3e4e] bg-[#16303d] text-[#f9f3f1] transition-colors duration-300">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#cdcab2] block">Early Careers</span>
              <div className="reveal-text-line">
                <motion.h2 
                  initial={{ y: "105%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-3xl font-light text-white"
                >
                  Graduate & Internship Pathways
                </motion.h2>
              </div>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              {/* Graduate Program */}
              <motion.div 
                variants={fadeInUp}
                className="border border-[#517380] p-10 bg-[#232323] flex flex-col justify-between shadow-lg hover:border-white/35 hover:bg-[#111111] transition-all duration-500 group"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-x-4">
                    <div className="p-3 bg-[#16303d] text-[#cdcab2] group-hover:scale-105 transition-transform duration-300">
                      <GraduationCap className="h-6 w-6 stroke-[1.5]" />
                    </div>
                    <h3 className="font-serif text-xl font-medium text-white">Graduate Training Contract</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#e2ddda] leading-relaxed font-light">
                    Our two-year graduate training programme comprises four six-month seats across Corporate, Private Capital, Tax, and Technology. You will receive hands-on mentoring from partners and senior associates.
                  </p>
                  <ul className="space-y-2 text-xs text-[#e2ddda]">
                    <li className="flex items-center gap-x-2">
                      <Calendar className="h-4 w-4 text-[#cdcab2]" />
                      <span>Applications Open: September 2026</span>
                    </li>
                    <li className="flex items-center gap-x-2">
                      <Calendar className="h-4 w-4 text-[#cdcab2]" />
                      <span>Deadline: January 2027</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] text-[#aaaaaa] font-semibold uppercase tracking-wider">Starts Autumn 2027</span>
                  <Link href="#apply" className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#cdcab2] hover:text-white transition-colors">
                    Apply Now &rarr;
                  </Link>
                </div>
              </motion.div>

              {/* Internship Program */}
              <motion.div 
                variants={fadeInUp}
                className="border border-[#517380] p-10 bg-[#232323] flex flex-col justify-between shadow-lg hover:border-white/35 hover:bg-[#111111] transition-all duration-500 group"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-x-4">
                    <div className="p-3 bg-[#16303d] text-[#cdcab2] group-hover:scale-105 transition-transform duration-300">
                      <Briefcase className="h-6 w-6 stroke-[1.5]" />
                    </div>
                    <h3 className="font-serif text-xl font-medium text-white">Summer Internship Scheme</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#e2ddda] leading-relaxed font-light">
                    A three-week summer placement designed to introduce law and non-law students to high-end corporate transactions. Interns work alongside transaction teams and participate in mock negotiations.
                  </p>
                  <ul className="space-y-2 text-xs text-[#e2ddda]">
                    <li className="flex items-center gap-x-2">
                      <Calendar className="h-4 w-4 text-[#cdcab2]" />
                      <span>Applications Open: October 2026</span>
                    </li>
                    <li className="flex items-center gap-x-2">
                      <Calendar className="h-4 w-4 text-[#cdcab2]" />
                      <span>Deadline: February 2027</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] text-[#aaaaaa] font-semibold uppercase tracking-wider">Runs Summer 2027</span>
                  <Link href="#apply" className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#cdcab2] hover:text-white transition-colors">
                    Apply Now &rarr;
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Current Openings - Foggy (#c4c2aa) Background */}
        <section className="py-24 border-b border-border bg-[#c4c2aa] text-[#111111] transition-colors duration-300">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#1c3e4e] block">Lateral Hiring</span>
              <div className="reveal-text-line">
                <motion.h2 
                  initial={{ y: "105%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-3xl font-light text-[#111111] mt-2"
                >
                  Current Legal Vacancies
                </motion.h2>
              </div>
              <p className="text-xs sm:text-sm text-[#111111]/85 mt-4 leading-relaxed font-light">
                If you are an experienced associate or specialist looking to join an agile, elite transactional firm, review our active opportunities below.
              </p>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-6"
            >
              {openings.map((op) => (
                <motion.div 
                  key={op.title} 
                  variants={fadeInUp}
                  className="border border-[#111111]/25 p-8 bg-[#fffaf8] hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                    <h3 className="font-serif text-lg font-medium text-[#111111]">{op.title}</h3>
                    <div className="flex items-center gap-x-3 text-xs">
                      <span className="text-[#517380] font-semibold uppercase">{op.type}</span>
                      <span className="text-[#757575] border-l border-[#cdcab2] pl-3">{op.location}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-xs sm:text-sm text-[#757575] leading-relaxed max-w-3xl font-light">
                    {op.description}
                  </p>
                  <div className="mt-6 pt-4 border-t border-[#cdcab2]/30 flex justify-end">
                    <Link href="#apply" className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#1c3e4e] hover:text-[#111111] transition-colors">
                      Express Interest
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Application CTA / Form (Anchor: #apply) - Steel Teal (#517380) Background */}
        <section id="apply" className="py-24 bg-[#517380] text-[#f9f3f1] transition-colors duration-300 scroll-mt-20">
          <div className="mx-auto max-w-3xl px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="border border-[#cdcab2]/40 bg-[#fffaf8] text-[#111111] p-10 shadow-2xl space-y-8"
            >
              <div className="text-center space-y-2">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#517380] block">Application Form</span>
                <div className="reveal-text-line">
                  <motion.h2 
                    initial={{ y: "105%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif text-2xl font-light text-[#111111]"
                  >
                    Get In Touch With Recruitment
                  </motion.h2>
                </div>
                <p className="text-xs text-[#757575] max-w-md mx-auto font-light">
                  Submit your details below to express interest in a lateral role, graduate contract, or summer internship.
                </p>
              </div>

              {formSubmitted ? (
                <motion.div 
                  variants={fadeInUp}
                  className="border border-[#1c3e4e] bg-[#16303d]/5 p-8 text-center space-y-4"
                >
                  <CheckCircle2 className="h-10 w-10 text-[#16303d] mx-auto stroke-[1.5]" />
                  <h3 className="font-serif text-lg font-semibold text-[#111111]">Submission Successful</h3>
                  <p className="text-xs text-[#757575] max-w-sm mx-auto leading-relaxed font-light">
                    Thank you for contacting Silverlake Recruitment. A member of our team will review your credentials and follow up with you.
                  </p>
                </motion.div>
              ) : (
                <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-[#111111] mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full border border-[#cdcab2] bg-[#f9f3f1] px-4 py-2.5 text-sm text-[#111111] focus:outline-none focus:border-[#1c3e4e] transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#111111] mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full border border-[#cdcab2] bg-[#f9f3f1] px-4 py-2.5 text-sm text-[#111111] focus:outline-none focus:border-[#1c3e4e] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="role-type" className="block text-xs font-semibold uppercase tracking-wider text-[#111111] mb-2">
                        Applying For
                      </label>
                      <select
                        id="role-type"
                        className="w-full border border-[#cdcab2] bg-[#f9f3f1] px-4 py-2.5 text-sm text-[#111111] focus:outline-none focus:border-[#1c3e4e] transition-colors"
                      >
                        <option>Graduate Training Contract</option>
                        <option>Summer Internship Scheme</option>
                        <option>Lateral Hire (Associate/Specialist)</option>
                        <option>General Recruitment Inquiry</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="cv-link" className="block text-xs font-semibold uppercase tracking-wider text-[#111111] mb-2">
                        CV Link / Portfolio (Optional)
                      </label>
                      <input
                        type="url"
                        id="cv-link"
                        placeholder="https://..."
                        className="w-full border border-[#cdcab2] bg-[#f9f3f1] px-4 py-2.5 text-sm text-[#111111] focus:outline-none focus:border-[#1c3e4e] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#111111] mb-2">
                      Covering Statement
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      placeholder="Summarize your credentials, PQE, or academic background..."
                      className="w-full border border-[#cdcab2] bg-[#f9f3f1] px-4 py-2.5 text-sm text-[#111111] focus:outline-none focus:border-[#1c3e4e] transition-colors"
                    />
                  </div>

                  <div className="pt-2 text-center">
                    <button
                      type="submit"
                      className="bg-[#16303d] text-white px-8 py-3.5 text-xs font-semibold tracking-widest uppercase hover:bg-[#1c3e4e] hover:text-[#cdcab2] transition-all duration-300 cursor-pointer shadow-md"
                    >
                      Submit Application
                    </button>
                  </div>
                </motion.form>
              )}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
