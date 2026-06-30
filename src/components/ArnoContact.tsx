"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Landmark, MessageSquare, Send } from "lucide-react";
import { playClickSound, playHoverSound } from "@/lib/ArnoAudio";

interface ArnoContactProps {
  soundEnabled: boolean;
}

export default function ArnoContact({ soundEnabled }: ArnoContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    referral: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleMouseEnter = () => {
    if (soundEnabled) {
      playHoverSound();
    }
  };

  const handleFocus = () => {
    if (soundEnabled) {
      playClickSound();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (soundEnabled) {
      playClickSound();
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", company: "", referral: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="py-32 px-6 lg:px-12 bg-[#020208] relative overflow-hidden select-none border-t border-white/5">
      {/* Background glow orbs */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#10b981]/3 arno-orb-glow pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-[#3b82f6]/3 arno-orb-glow pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Context & References */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <div className="text-[10px] font-mono tracking-[0.25em] text-[#10b981] uppercase mb-4">
                // PARTNERSHIPS & CONTACT
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white leading-tight font-sans">
                Ecosystem<br />Referrals First.
              </h2>
            </div>

            <p className="text-white/50 text-xs sm:text-sm font-sans font-light leading-relaxed max-w-md">
              We prioritize warm introductions and ecosystem referrals. Arno operates with high speed and clarity, investing from pre-seed through Series A. If you are a sovereign individual building infrastructure at the apex of spatial networks and machine intelligence, let's initiate connection.
            </p>

            {/* Direct contact references */}
            <div className="space-y-6 pt-4 border-t border-white/5 max-w-sm">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/40">
                  <Mail className="w-4 h-4 text-[#3b82f6]" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono text-white/30 tracking-widest uppercase">// SECURE EMAIL</h4>
                  <a href="mailto:intel@arno.vc" className="text-xs font-mono text-white/70 hover:text-white transition-colors duration-300">
                    intel@arno.vc
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/40">
                  <Landmark className="w-4 h-4 text-[#7f56d9]" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono text-white/30 tracking-widest uppercase">// PHYSICAL HUBS</h4>
                  <p className="text-xs text-white/70 font-sans font-light leading-relaxed">
                    Udaipur • Ahmedabad • Bangalore • Jaipur • New Delhi • Mumbai • GIFT City • Dubai • Dublin
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cyber Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl arno-glass border border-white/5 relative overflow-hidden">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <Send className="w-6 h-6 text-[#10b981]" />
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-wider text-white font-sans mb-3">
                    Transmission Sent
                  </h3>
                  <p className="text-white/50 text-xs font-sans font-light max-w-xs leading-relaxed">
                    Signal received. Our nodes will process your referral payload and establish connection shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-[9px] font-mono tracking-widest text-white/40 uppercase">
                        // 01 Sender Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={handleFocus}
                        onMouseEnter={handleMouseEnter}
                        className="bg-black/40 border border-white/5 focus:border-[#3b82f6]/40 focus:ring-1 focus:ring-[#3b82f6]/20 rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all duration-300 font-sans font-light"
                        placeholder="e.g. Kris Nair"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-[9px] font-mono tracking-widest text-white/40 uppercase">
                        // 02 Secure Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={handleFocus}
                        onMouseEnter={handleMouseEnter}
                        className="bg-black/40 border border-white/5 focus:border-[#3b82f6]/40 focus:ring-1 focus:ring-[#3b82f6]/20 rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all duration-300 font-sans font-light"
                        placeholder="e.g. kris@arno.vc"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Company */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="company" className="text-[9px] font-mono tracking-widest text-white/40 uppercase">
                        // 03 Project / Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        onFocus={handleFocus}
                        onMouseEnter={handleMouseEnter}
                        className="bg-black/40 border border-white/5 focus:border-[#3b82f6]/40 focus:ring-1 focus:ring-[#3b82f6]/20 rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all duration-300 font-sans font-light"
                        placeholder="e.g. Arno Network"
                      />
                    </div>

                    {/* Referral */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="referral" className="text-[9px] font-mono tracking-widest text-white/40 uppercase">
                        // 04 Ecosystem Referral
                      </label>
                      <input
                        type="text"
                        id="referral"
                        value={formData.referral}
                        onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
                        onFocus={handleFocus}
                        onMouseEnter={handleMouseEnter}
                        className="bg-black/40 border border-white/5 focus:border-[#3b82f6]/40 focus:ring-1 focus:ring-[#3b82f6]/20 rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all duration-300 font-sans font-light"
                        placeholder="e.g. Hashgraph Group"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-[9px] font-mono tracking-widest text-white/40 uppercase">
                      // 05 Context Payload (Pitch Description)
                      </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={handleFocus}
                      onMouseEnter={handleMouseEnter}
                      className="bg-black/40 border border-white/5 focus:border-[#3b82f6]/40 focus:ring-1 focus:ring-[#3b82f6]/20 rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all duration-300 font-sans font-light resize-none leading-relaxed"
                      placeholder="Briefly describe the spatial radar nodes, ML pipelines, or spectrum services you are building..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    onMouseEnter={handleMouseEnter}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-mono tracking-widest uppercase bg-gradient-to-r from-[#7f56d9] to-[#3b82f6] text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 font-bold btn-shine cursor-pointer border border-transparent"
                  >
                    Initiate Connection
                  </button>
                </form>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
