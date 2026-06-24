"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function DisclaimerModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already agreed
    const agreed = localStorage.getItem("silverlake_disclaimer_agreed");
    if (!agreed) {
      setShow(true);
      // Lock scrolling while modal is open
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleAgree = () => {
    localStorage.setItem("silverlake_disclaimer_agreed", "true");
    setShow(false);
    document.body.style.overflow = "";
  };

  const handleDisagree = () => {
    // Revert them back / Boot them off
    window.location.href = "https://google.com";
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0f12]/90 backdrop-blur-md p-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#fcfbf9] text-[#111111] max-w-4xl w-full p-10 lg:p-14 shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            <h2 className="font-serif text-[28px] sm:text-[36px] font-normal mb-8">
              DISCLAIMER
            </h2>
            
            <div className="space-y-6 text-[#444] text-[15px] font-light leading-relaxed">
              <p>
                The rules of the Bar Council of India strictly prohibit law firms and legal practitioners from soliciting work or advertising in any manner. By accessing the Silverlake LLP website (hereinafter referred to as the "Website"), the user expressly acknowledges and agrees to the following:
              </p>
              
              <ul className="list-disc pl-6 space-y-4">
                <li>
                  The user is accessing the Website entirely of their own volition to seek further information regarding Silverlake LLP. There has been no advertisement, personal communication, solicitation, invitation, or inducement of any sort whatsoever from Silverlake LLP or any of its members to solicit work through this Website.
                </li>
                <li>
                  The information, materials, and publications contained on this Website are provided solely for informational purposes and shall not be construed as legal advice, a legal opinion, or legal consultation.
                </li>
                <li>
                  Any information obtained or materials downloaded from the Website are strictly at the user's discretion. Accessing, receiving, or utilising this Website does not establish, nor is it intended to create, an attorney-client relationship between Silverlake LLP and the user.
                </li>
                <li>
                  The Website utilises cookies to optimise user experience. By continuing to use this Website, the user provides express consent to the use of cookies and acknowledges the terms set forth in our <Link href="/cookie-policy" className="font-semibold text-[#111] hover:text-[#C5A059] transition-colors underline decoration-1 underline-offset-4">Cookie Policy</Link> and <Link href="/privacy-policy" className="font-semibold text-[#111] hover:text-[#C5A059] transition-colors underline decoration-1 underline-offset-4">Privacy Policy</Link>.
                </li>
                <li>
                  All information, content, design, and materials provided on this Website are the exclusive intellectual property of Silverlake LLP. Any unauthorised use, reproduction, or distribution is strictly prohibited.
                </li>
              </ul>

              <p>
                Please <Link href="/public-notice" className="font-semibold text-[#111] hover:text-[#C5A059] transition-colors underline decoration-1 underline-offset-4">click here</Link> to view an important public notice.
              </p>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 border-t border-[#111]/10 pt-8">
              <button 
                onClick={handleAgree}
                className="bg-[#111] text-white px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] hover:bg-[#333] transition-colors"
              >
                Agree
              </button>
              <button 
                onClick={handleDisagree}
                className="bg-transparent border border-[#111]/20 text-[#111] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] hover:border-[#111] transition-colors"
              >
                Disagree
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
