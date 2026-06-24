"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import MagneticButton from "./MagneticButton";

const allNavLinks = [
  { name: "Home", href: "/" },
  { name: "What we do", href: "/practice-areas" },
  { name: "Who we are", href: "/about" },
  { name: "Insights", href: "/insights" },
  { name: "Join us", href: "/careers" },
  { name: "News", href: "/news" },
  { name: "Alumni", href: "#alumni" },
  { name: "Get in touch", href: "/careers#apply" },
];

const desktopLinks = [
  { name: "WHAT WE DO", href: "/practice-areas" },
  { name: "WHO WE ARE", href: "/about" },
  { name: "INSIGHTS", href: "/insights" },
  { name: "JOIN US", href: "/careers" },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { scrollY } = useScroll();

  React.useEffect(() => { setMounted(true); }, []);
  React.useEffect(() => { setDrawerOpen(false); }, [pathname]);

  // Lock body scroll when drawer is open
  React.useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <>
      {/* ─── Transparent → Solid Header ─── */}
      <motion.header
        className={`fixed top-0 z-40 w-full transition-all duration-700 ${
          scrolled
            ? "bg-[#0A1128]/95 backdrop-blur-xl shadow-lg shadow-black/10"
            : "bg-gradient-to-b from-black/70 via-black/30 to-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex-1 lg:flex-none">
              <Link href="/" className="group flex items-center gap-3">
                <motion.span
                  animate={{ letterSpacing: scrolled ? "0.25em" : "0.35em" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-lg sm:text-xl font-medium text-[#fcfbf9] group-hover:text-[#C5A059] transition-colors duration-500"
                >
                  SILVERLAKE
                </motion.span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-x-8">
              <nav className="flex gap-x-8">
                {desktopLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`text-[11px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 py-2 relative group/nav ${
                        isActive
                          ? "text-[#C5A059]"
                          : "text-[#fcfbf9]/70 hover:text-[#fcfbf9]"
                      }`}
                    >
                      {link.name}
                      <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#C5A059] transition-transform duration-500 origin-left ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100"
                      }`} />
                    </Link>
                  );
                })}
              </nav>

              <span className="h-4 w-[1px] bg-white/15" />



              {/* Menu Trigger */}
              <MagneticButton strength={0.4}>
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#fcfbf9]/70 hover:text-[#fcfbf9] hover:border-[#C5A059] transition-all duration-500 cursor-pointer"
                  aria-label="Open navigation"
                >
                  <div className="w-[18px] h-[12px] flex flex-col justify-between">
                    <span className="w-full h-[1px] bg-current transition-all duration-300" />
                    <span className="w-[70%] h-[1px] bg-current transition-all duration-300 ml-auto" />
                  </div>
                </button>
              </MagneticButton>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-x-3">

              <button
                onClick={() => setDrawerOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#fcfbf9]/60 hover:text-[#fcfbf9] transition-all duration-300 cursor-pointer"
                aria-label="Open menu"
              >
                <div className="w-4 h-3 flex flex-col justify-between">
                  <span className="w-full h-[1px] bg-current" />
                  <span className="w-[70%] h-[1px] bg-current ml-auto" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ─── Full-Screen Navigation Overlay (Exo Ape Style) ─── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Dark Curtain */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "top" }}
              className="fixed inset-0 z-50 bg-[#0A1128]"
            />

            {/* Navigation Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="fixed inset-0 z-50 flex flex-col"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between px-6 lg:px-10 h-20 max-w-[1400px] mx-auto w-full">
                <span className="font-serif text-lg tracking-[0.35em] font-medium text-[#f9f3f1]">
                  SILVERLAKE
                </span>
                <MagneticButton strength={0.5}>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#f9f3f1]/60 hover:text-[#f9f3f1] hover:border-[#cdcab2] hover:rotate-90 transition-all duration-700 cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </MagneticButton>
              </div>

              {/* Navigation Links — Giant Typography */}
              <div className="flex-grow flex items-center">
                <nav className="w-full max-w-[1400px] mx-auto px-6 lg:px-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    <div className="lg:col-span-8 space-y-1">
                      {allNavLinks.map((link, idx) => {
                        const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                        return (
                          <div key={link.name} className="overflow-hidden">
                            <motion.div
                              initial={{ y: "100%" }}
                              animate={{ y: 0 }}
                              exit={{ y: "100%" }}
                              transition={{
                                duration: 0.7,
                                delay: 0.15 + idx * 0.05,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                            >
                              <Link
                                href={link.href}
                                onClick={() => setDrawerOpen(false)}
                                className={`block font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight transition-all duration-500 py-2 lg:py-3 group ${
                                  isActive
                                    ? "text-[#cdcab2]"
                                    : "text-[#f9f3f1]/40 hover:text-[#f9f3f1] hover:pl-4"
                                }`}
                              >
                                <span className="inline-flex items-center gap-4">
                                  <span className="text-xs font-sans font-medium tracking-widest text-[#cdcab2]/50 uppercase w-6">
                                    {String(idx + 1).padStart(2, "0")}
                                  </span>
                                  {link.name}
                                </span>
                              </Link>
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Right Column — Contact Info */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="lg:col-span-4 flex flex-col justify-end pt-12 lg:pt-0 lg:pl-16 space-y-8"
                    >
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#cdcab2]/60 font-medium mb-3">Representative Hubs</p>
                        <p className="text-sm text-[#f9f3f1]/70 font-light leading-relaxed">
                          Dubai, DIFC<br />
                          Dublin, Ireland<br />
                          Udaipur, India<br />
                          Bangalore, India
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#cdcab2]/60 font-medium mb-3">Contact</p>
                        <p className="text-sm text-[#f9f3f1]/70 font-light">
                          contact@silverlake.com
                        </p>
                      </div>
                      <div className="pt-4 border-t border-white/5">
                        <p className="text-[10px] text-[#f9f3f1]/30 tracking-wider">
                          &copy; {new Date().getFullYear()} Silverlake LLP
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
