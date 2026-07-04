"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";
import MagneticButton from "./MagneticButton";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Footer() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      alert('There was an error subscribing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0a0f12] text-[#f9f3f1] relative overflow-hidden">
      {/* ─── Giant Logo Watermark ─── */}
      <div className="relative pt-20 pb-8 border-b border-white/5">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <span className="font-serif text-[8vw] font-light tracking-[0.35em] pl-[0.35em] text-white/[0.04] block leading-none select-none text-center">
              SILVERLAKE
            </span>
          </motion.div>
        </div>
      </div>

      {/* ─── Footer Content Grid ─── */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand + Newsletter */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-serif text-xl tracking-[0.3em] font-medium text-[#f9f3f1] hover:text-[#cdcab2] transition-colors duration-500">
              SILVERLAKE
            </Link>
            <p className="mt-4 text-xs text-[#f9f3f1]/40 max-w-sm leading-relaxed font-light">
              Silverlake is an International AI-Native Law firm advising businesses, investors, entrepreneurs, and institutions on complex legal matters across jurisdictions.
            </p>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#cdcab2]/60 mb-3">
                Subscribe to Insights
              </h4>
              {isSuccess ? (
                <div className="border border-[#cdcab2]/30 bg-[#cdcab2]/5 px-4 py-4 max-w-md">
                  <p className="text-xs text-[#cdcab2] font-medium tracking-wide">
                    Thank you. You have been successfully subscribed to Silverlake Insights.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md gap-x-0 relative">
                  <label htmlFor="footer-email" className="sr-only">Email address</label>
                  <input
                    id="footer-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    disabled={isSubmitting}
                    className="min-w-0 flex-auto border border-white/10 border-r-0 bg-transparent px-4 py-3 text-xs text-[#f9f3f1] placeholder-[#f9f3f1]/20 focus:outline-none focus:border-[#cdcab2]/40 transition-colors disabled:opacity-50"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-[120px] items-center justify-center bg-[#cdcab2] text-[#0a0f12] px-0 py-3 text-[10px] font-bold tracking-wider uppercase hover:bg-[#f9f3f1] transition-colors duration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed btn-shine"
                  >
                    {isSubmitting ? (
                      <span className="w-3.5 h-3.5 border-2 border-[#0a0f12] border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <Mail className="h-3.5 w-3.5 mr-2" />
                        Subscribe
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#cdcab2]/60 mb-5">
              What we do
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Private Capital", href: "/practice-areas/private-capital" },
                { name: "Private Wealth", href: "/practice-areas/private-wealth" },
                { name: "M&A", href: "/practice-areas/corporate-and-ma" },
                { name: "Disputes", href: "/practice-areas/dispute-resolution" },
                { name: "View All →", href: "/practice-areas" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-[#f9f3f1]/35 hover:text-[#f9f3f1] transition-colors duration-300 font-light">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#cdcab2]/60 mb-5">
              Information
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Who we are", href: "/about" },
                { name: "Insights", href: "/insights" },
                { name: "News", href: "/news" },
                { name: "Join us", href: "/careers" },
                // { name: "Innovation Hub", href: "/innovation-hub" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-[#f9f3f1]/35 hover:text-[#f9f3f1] transition-colors duration-300 font-light">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Offices */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#cdcab2]/60 mb-5">
              Contact Us
            </h3>
            <div className="space-y-6">
              <div>
                <a href="mailto:contact@silverlakelaw.in" className="text-xs text-[#f9f3f1] hover:text-[#cdcab2] transition-colors block mb-1">
                  contact@silverlakelaw.in
                </a>
                <a href="tel:+918989599225" className="text-xs text-[#f9f3f1]/60 hover:text-[#f9f3f1] transition-colors block mb-1">
                  (+91) 8989 599 225
                </a>
                <a href="tel:+917024082617" className="text-xs text-[#f9f3f1]/60 hover:text-[#f9f3f1] transition-colors block">
                  (+91) 7024 082 617
                </a>
              </div>
              
              <div>
                <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cdcab2]/40 mb-3">Our Offices</h4>
                <ul className="space-y-2 text-xs font-light text-[#f9f3f1]/40">
                  <li>Udaipur</li>
                  <li>Ahmedabad</li>
                  <li>Bangalore</li>
                  <li>Jaipur</li>
                  <li>New Delhi</li>
                  <li>Mumbai</li>
                  <li>GIFT City</li>
                  <li>Dubai</li>
                  <li>Dublin</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-[#f9f3f1]/20 tracking-wider">
            &copy; {new Date().getFullYear()} Silverlake Legal Advisors LLP. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex gap-x-5">
              <Link href="/privacy-policy" className="text-[10px] text-[#f9f3f1]/20 hover:text-[#f9f3f1]/50 transition-colors tracking-wider">
                Privacy Policy
              </Link>
              <Link href="/cookie-policy" className="text-[10px] text-[#f9f3f1]/20 hover:text-[#f9f3f1]/50 transition-colors tracking-wider">
                Cookie Policy
              </Link>
              <Link href="/public-notice" className="text-[10px] text-[#f9f3f1]/20 hover:text-[#f9f3f1]/50 transition-colors tracking-wider">
                Public Notice
              </Link>
            </div>

            <span className="h-3 w-[1px] bg-white/10" />

            <div className="flex gap-x-3">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-[#f9f3f1]/20 hover:text-[#f9f3f1]/60 transition-colors" aria-label="LinkedIn">
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-[#f9f3f1]/20 hover:text-[#f9f3f1]/60 transition-colors" aria-label="Twitter">
                <TwitterIcon className="h-4 w-4" />
              </a>
            </div>

            <span className="h-3 w-[1px] bg-white/10" />

            {/* Scroll to top */}
            <MagneticButton strength={0.4}>
              <button
                onClick={scrollToTop}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[#f9f3f1]/30 hover:text-[#f9f3f1] hover:border-[#cdcab2] transition-all duration-500 cursor-pointer"
                aria-label="Scroll to top"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
