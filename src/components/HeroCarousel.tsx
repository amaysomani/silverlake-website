"use client";

import * as React from "react";
import { motion, AnimatePresence, Variants, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Article } from "@/lib/types";

interface HeroCarouselProps {
  articles: Article[];
}

export default function HeroCarousel({ articles }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  // Mouse parallax tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const target = e.currentTarget as HTMLElement;
    const { left, top, width, height } = target.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5; // -0.5 to 0.5
    const y = (clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const springConfig = { damping: 30, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothMouseX, [-0.5, 0.5], [-2, 2]);
  const bgY = useTransform(smoothMouseY, [-0.5, 0.5], [-2, 2]);

  const fgX = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]);
  const fgY = useTransform(smoothMouseY, [-0.5, 0.5], [-5, 5]);

  const decX = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);
  const decY = useTransform(smoothMouseY, [-0.5, 0.5], [-8, 8]);

  // Scroll typography morphing
  const { scrollY } = useScroll();
  const fontWeightRaw = useTransform(scrollY, [0, 300], [700, 400]);
  const dynamicFontWeight = useSpring(fontWeightRaw, { stiffness: 300, damping: 30 });

  // Auto-play
  React.useEffect(() => {
    if (!articles || articles.length === 0) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 8000); // increased interval to allow 12s zoom to play out longer
    return () => clearInterval(timer);
  }, [articles]);

  if (!articles || articles.length === 0) return null;

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  };

  const currentArticle = articles[currentIndex];

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "5%" : "-5%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.8 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "5%" : "-5%",
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.8 },
      },
    }),
  };

  const textVariants: Variants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1, 
      transition: { staggerChildren: 0.02, delayChildren: 0.8 } // Delayed to wait for masks
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const letterVariants: Variants = {
    initial: { opacity: 0, filter: "blur(10px)", y: 10 },
    animate: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeUpVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 1.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
  }

  // Cinematic masks (6 columns)
  const masks = Array.from({ length: 6 });

  return (
    <section 
      className="relative w-full h-[90vh] bg-[#0A1128] overflow-hidden flex items-center pt-20"
      onMouseMove={handleMouseMove}
    >
      {/* Cinematic Reveal Masks (runs once on load) */}
      <div className="absolute inset-0 z-50 flex pointer-events-none">
        {masks.map((_, i) => (
          <motion.div
            key={`mask-${i}`}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.2 + i * 0.1, 
              ease: [0.76, 0, 0.24, 1] 
            }}
            style={{ transformOrigin: "bottom" }}
            className="flex-1 bg-[#0A1128]"
          />
        ))}
      </div>

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image with Slow Zoom & Parallax */}
          <motion.div 
            style={{ x: bgX, y: bgY }}
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 12, ease: "linear" }}
              src={currentArticle.featuredImage || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop"}
              alt={currentArticle.title}
              className="w-full h-full object-cover origin-center"
            />
          </motion.div>
          
          {/* Cascade Gradient Overlay */}
          <div 
            className="absolute inset-0 z-10" 
            style={{ 
              background: 'linear-gradient(to right, rgba(10, 17, 40, 0.95) 0%, rgba(10, 17, 40, 0.85) 25%, rgba(10, 17, 40, 0) 55%, rgba(10, 17, 40, 0) 100%)' 
            }} 
          />
        </motion.div>
      </AnimatePresence>

      {/* Text Content */}
      <div className="relative z-20 mx-auto max-w-[1400px] px-6 lg:px-10 w-full h-full flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentIndex}`}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ x: fgX, y: fgY }}
            className="max-w-2xl text-[#fcfbf9]"
          >
            <motion.span 
              variants={fadeUpVariants}
              style={{ x: decX, y: decY }}
              className="text-[11px] uppercase tracking-[0.25em] font-semibold block mb-6 text-[#C5A059]"
            >
              {currentArticle.category || "Insight"}
            </motion.span>
            
            {/* Letter-by-Letter Blur Reveal + Dynamic Font Weight */}
            <motion.h1 
              variants={textVariants}
              style={{ fontWeight: dynamicFontWeight }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.1] mb-8"
            >
              {currentArticle.title.split("").map((char, index) => (
                <motion.span key={index} variants={letterVariants} className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p 
              variants={fadeUpVariants}
              className="text-lg md:text-xl font-light text-white/80 mb-10 max-w-lg leading-relaxed"
            >
              {currentArticle.summary || currentArticle.content?.substring(0, 100) + "..."}
            </motion.p>
            
            <motion.div variants={fadeUpVariants} style={{ x: decX, y: decY }}>
              <Link 
                href={`/insights/${currentArticle.slug}`}
                className="inline-flex items-center gap-2 group hover:text-[#C5A059] transition-colors pb-1 border-b border-white/30 hover:border-[#C5A059]"
              >
                <span className="text-sm tracking-wide uppercase font-semibold">Read more</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <motion.div 
        style={{ x: decX, y: decY }}
        className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 flex gap-4"
      >
        <button
          onClick={handlePrev}
          className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#C5A059] text-white hover:text-[#0A1128] transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#C5A059] text-white hover:text-[#0A1128] transition-all duration-300"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>

      {/* Progress Indicators */}
      <motion.div 
        style={{ x: decX, y: decY }}
        className="absolute bottom-10 left-6 lg:left-10 z-30 flex gap-3"
      >
        {articles.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className="group py-2"
          >
            <div className={`h-[2px] transition-all duration-500 rounded-full ${
              currentIndex === idx ? "w-12 bg-[#C5A059]" : "w-6 bg-white/30 group-hover:bg-white/60"
            }`} />
          </button>
        ))}
      </motion.div>
    </section>
  );
}
