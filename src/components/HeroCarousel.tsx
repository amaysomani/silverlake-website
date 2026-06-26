"use client";

import * as React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Article } from "@/lib/types";

interface HeroCarouselProps {
  articles: Article[];
}

export default function HeroCarousel({ articles }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  // Auto-play
  React.useEffect(() => {
    if (!articles || articles.length === 0) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [articles]);

  if (!articles || articles.length === 0) return <div className="relative h-screen min-h-[600px] w-full bg-[#0a0f12]" />;

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
      x: dir > 0 ? "10%" : "-10%",
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.8 },
        scale: { duration: 0.8, ease: "easeOut" },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "10%" : "-10%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.8 },
        scale: { duration: 0.8 },
      },
    }),
  };

  const textVariants: Variants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <section className="relative w-full h-[90vh] bg-[#0a0f12] overflow-hidden flex items-center pt-20">
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
          {/* Background Image with Slow Zoom */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <motion.img
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 6, ease: "linear" }}
              src={currentArticle.featuredImage || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop"}
              alt={currentArticle.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Cascade Gradient Overlay */}
          {/* A solid-to-transparent gradient covering the left side to simulate the cascade */}
          <div 
            className="absolute inset-0 z-10" 
            style={{ 
              background: 'linear-gradient(to right, rgba(14, 25, 23, 0.95) 0%, rgba(14, 25, 23, 0.85) 25%, rgba(14, 25, 23, 0) 55%, rgba(14, 25, 23, 0) 100%)' 
            }} 
          />
        </motion.div>
      </AnimatePresence>

      {/* Text Content */}
      <div className="relative z-20 mx-auto max-w-[1400px] px-6 lg:px-10 w-full h-full flex flex-col justify-center pb-24 lg:pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${currentIndex}`}
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="max-w-xl text-[#f9f3f1]"
          >
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold block mb-4 text-[#8a9b8e]">
              {currentArticle.category || "Insight"}
            </span>
            <h1 className={`font-serif font-light leading-[1.1] mb-6 ${
              currentArticle.title.length > 60 
                ? "text-3xl sm:text-4xl md:text-5xl lg:text-5xl" 
                : "text-5xl sm:text-6xl md:text-7xl"
            }`}>
              {currentArticle.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-light text-white/80 mb-8 max-w-lg line-clamp-3">
              {currentArticle.summary || currentArticle.content?.substring(0, 100) + "..."}
            </p>
            
            <Link 
              href={`/insights/${currentArticle.slug}`}
              className="inline-flex items-center gap-2 group hover:text-[#8a9b8e] transition-colors pb-1 border-b border-white/30 hover:border-[#8a9b8e]"
            >
              <span className="text-sm tracking-wide">Read more</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute right-6 bottom-8 lg:right-10 lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto z-30 flex gap-4">
        <button
          onClick={handlePrev}
          className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white text-white hover:text-black transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white text-white hover:text-black transition-all"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-10 left-6 lg:left-10 z-30 flex gap-2">
        {articles.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`h-1 transition-all duration-500 rounded-full ${
              currentIndex === idx ? "w-10 bg-white" : "w-4 bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
