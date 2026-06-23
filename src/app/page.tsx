"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  Variants,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowRight, ArrowDown, Briefcase, Cpu, Globe, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";
import TextReveal from "@/components/TextReveal";
import CounterAnimation from "@/components/CounterAnimation";
import MarqueeText from "@/components/MarqueeText";
import { getPracticeAreas, getArticles, getNews } from "@/lib/cms";
import { PracticeArea, Article, NewsItem } from "@/lib/types";

/* ─── Animation Variants ─── */
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

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─── Practice Area Icon Map ─── */
const iconMap: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase className="h-5 w-5" />,
  Cpu: <Cpu className="h-5 w-5" />,
  Globe: <Globe className="h-5 w-5" />,
};

export default function HomePage() {
  const [practiceAreas, setPracticeAreas] = React.useState<PracticeArea[]>([]);
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [news, setNews] = React.useState<NewsItem[]>([]);
  const [hoveredPractice, setHoveredPractice] = React.useState<string | null>(null);

  /* Parallax */
  const heroRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(heroProgress, [0, 1], [0, 200]);
  const scaleBg = useTransform(heroProgress, [0, 1], [1.0, 1.15]);
  const opacityHero = useTransform(heroProgress, [0, 0.8], [1, 0]);

  React.useEffect(() => {
    async function loadData() {
      const [areas, arts, nws] = await Promise.all([
        getPracticeAreas(),
        getArticles({ limit: 3 }),
        getNews({ limit: 6 }),
      ]);
      setPracticeAreas(areas);
      setArticles(arts.articles);
      setNews(nws.news);
    }
    loadData();
  }, []);

  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* ═══════════════════════════════════════════════════
            SECTION 1: CINEMATIC HERO (100vh)
        ═══════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="relative h-screen w-full bg-[#0a0f12] overflow-hidden flex items-end pb-16 sm:pb-20 lg:pb-24"
        >
          {/* Background Image with Deep Parallax */}
          <motion.div
            className="absolute inset-0"
            style={{ y: yBg, scale: scaleBg }}
          >
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop"
              alt="Mountain landscape"
              className="w-full h-full object-cover opacity-30"
            />
          </motion.div>

          {/* Layered Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f12]/80 via-transparent to-[#0a0f12] z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f12]/70 via-transparent to-transparent z-10" />

          {/* Grain */}
          <div className="absolute inset-0 grain-overlay z-10 pointer-events-none" />

          {/* Content */}
          <motion.div
            style={{ opacity: opacityHero }}
            className="mx-auto max-w-[1400px] px-6 lg:px-10 w-full relative z-20"
          >
            <div className="max-w-5xl space-y-8">
              {/* Tagline */}
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="flex items-center gap-x-3 text-[#cdcab2]"
                >
                  <span className="h-[6px] w-[6px] rounded-full bg-[#cdcab2]" />
                  <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.3em]">
                    Udaipur Headquartered &bull; Venture Capital & Private Equity Counsel
                  </span>
                </motion.div>
              </div>

              {/* Hero Headline — Massive Serif */}
              <h1 className="font-serif font-light tracking-tight text-white">
                <span className="overflow-hidden block">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.95]"
                  >
                    Institutional Legal
                  </motion.span>
                </span>
                <span className="overflow-hidden block">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.95]"
                  >
                    Judgment{" "}
                    <span className="text-shimmer italic">at AI-Native Speed</span>
                  </motion.span>
                </span>
              </h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                className="text-sm sm:text-base md:text-lg text-[#e2ddda]/80 max-w-2xl font-light leading-relaxed"
              >
                The premier AI-native venture capital and corporate law firm in Rajasthan. We have replaced the billable hour with Legal Engineering, delivering faster transactions, precise compliance, and compounding contextual intelligence.
              </motion.p>

              {/* CTA Row */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap items-center gap-6 pt-4"
              >
                <MagneticButton strength={0.25}>
                  <Link
                    href="/practice-areas"
                    className="group inline-flex items-center gap-3 bg-[#cdcab2] text-[#0a0f12] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#f9f3f1] transition-colors duration-500 btn-shine"
                  >
                    Explore Our Practice
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </MagneticButton>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-[#cdcab2]/70 hover:text-[#f9f3f1] text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300"
                >
                  About the Firm
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          >
            <span className="text-[9px] uppercase tracking-[0.4em] text-[#cdcab2]/40 font-medium">Scroll</span>
            <ArrowDown className="h-4 w-4 text-[#cdcab2]/40 scroll-indicator" />
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════
            SECTION 2: MANIFESTO (Scroll-Driven Text Reveal)
        ═══════════════════════════════════════════════════ */}
        <section className="py-32 sm:py-40 lg:py-48 bg-[#f9f3f1] relative overflow-hidden">
          <div className="mx-auto max-w-[1100px] px-6 lg:px-10 text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[10px] uppercase tracking-[0.4em] text-[#517380] font-semibold block mb-8"
            >
              Our Belief
            </motion.span>
            <TextReveal
              text="Silverlake is a leading law firm advising businesses, investors, entrepreneurs, and institutions on complex legal matters across jurisdictions. We operate at the intersection of commercial ambition and regulatory discipline."
              className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-light text-[#111111] leading-relaxed"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 h-[1.5px] w-32 bg-[#16303d] mx-auto origin-center"
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            SECTION 3: STRATEGIC PILLARS
        ═══════════════════════════════════════════════════ */}
        <section className="py-24 sm:py-32 bg-[#111111] text-[#f9f3f1] relative noise-bg overflow-hidden">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 relative z-10">
            <div className="max-w-3xl space-y-4 mb-20">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[10px] uppercase tracking-[0.4em] text-[#cdcab2] font-semibold block"
              >
                Our Methodology
              </motion.span>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light"
                >
                  How We Work
                </motion.h2>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-sm text-[#e2ddda]/70 leading-relaxed max-w-xl"
              >
                We have redesigned corporate counsel for the institutional investment landscape, aligning legal precision with technological speed.
              </motion.p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-0"
            >
              {[
                {
                  num: "01",
                  title: "Legal Engineering",
                  desc: "We replace the billable hour with Legal Engineering — translating legal logic into automated deal workflows, custom document generation systems, and continuous compliance checks. Our proprietary tools reduce deal turnaround by an average of 40%, delivering speed without sacrificing rigour.",
                  icon: <Cpu className="h-7 w-7 text-[#cdcab2] stroke-[1]" />,
                },
                {
                  num: "02",
                  title: "Transactional Velocity",
                  desc: "Advising venture capital funds, private equity sponsors, and high-growth founders. We align our structural frameworks with investment timelines to eliminate transactional friction. From term sheet to closing, we compress legal cycles while maintaining institutional-grade governance.",
                  icon: <Briefcase className="h-7 w-7 text-[#cdcab2] stroke-[1]" />,
                },
                {
                  num: "03",
                  title: "Regulatory Integrity",
                  desc: "Deep expertise in fund regulations, licensing, and compliance across European and Middle Eastern markets, supported by active representative hubs in Dubai and Ireland. We navigate AIFMD, MiFID II, DIFC, ADGM, and FSRA frameworks with precision.",
                  icon: <Globe className="h-7 w-7 text-[#cdcab2] stroke-[1]" />,
                },
              ].map((pillar, idx) => (
                <motion.div
                  key={pillar.num}
                  variants={fadeInUp}
                  className={`group p-8 sm:p-10 lg:p-12 ${
                    idx < 2 ? "border-b md:border-b-0 md:border-r border-white/5" : ""
                  } hover:bg-white/[0.02] transition-colors duration-700`}
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-5xl lg:text-6xl text-[#cdcab2]/20 font-light group-hover:text-[#cdcab2]/40 transition-colors duration-700">
                        {pillar.num}
                      </span>
                      <div className="group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500">
                        {pillar.icon}
                      </div>
                    </div>
                    <h3 className="font-serif text-2xl font-light text-white group-hover:text-[#cdcab2] transition-colors duration-500">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#e2ddda]/60 leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            SECTION 4: FEATURED INSIGHTS (Editorial Grid)
        ═══════════════════════════════════════════════════ */}
        <section className="py-24 sm:py-32 bg-[#e2ddda] relative">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row items-baseline justify-between gap-6 pb-8 mb-12 border-b border-[#111111]/10">
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-[10px] uppercase tracking-[0.4em] text-[#517380] font-semibold block mb-3"
                >
                  Thought Leadership
                </motion.span>
                <div className="overflow-hidden">
                  <motion.h2
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif text-3xl sm:text-4xl font-light text-[#111111]"
                  >
                    Featured Insights
                  </motion.h2>
                </div>
              </div>
              <MagneticButton strength={0.2}>
                <Link
                  href="/insights"
                  className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#16303d] hover:text-[#111111] transition-colors border-b border-[#16303d]/30 pb-1 hover:border-[#111111]"
                >
                  View All Insights
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
            </div>

            {/* Asymmetric Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {articles.map((art, idx) => {
                const isLarge = idx === 0;
                return (
                  <motion.article
                    key={art.slug}
                    variants={scaleIn}
                    className={`group overflow-hidden ${
                      isLarge ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5"
                    }`}
                  >
                    <Link href={`/insights/${art.slug}`} className="block h-full">
                      <div className={`relative overflow-hidden ${isLarge ? "aspect-[4/3]" : "aspect-[16/9]"}`}>
                        <motion.img
                          initial={{ scale: 1.15 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                          src={art.featuredImage}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-[#111111]/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                          <span className="text-[9px] uppercase tracking-[0.3em] text-[#cdcab2] font-semibold">
                            {art.category}
                          </span>
                          <h3 className={`font-serif font-light text-white mt-2 leading-snug ${
                            isLarge ? "text-xl sm:text-2xl lg:text-3xl" : "text-lg"
                          }`}>
                            {art.title}
                          </h3>
                          {isLarge && (
                            <p className="text-xs text-[#e2ddda]/70 mt-3 line-clamp-2 max-w-lg leading-relaxed">
                              {art.summary}
                            </p>
                          )}
                          <div className="flex items-center gap-4 mt-4 text-[9px] uppercase tracking-wider text-[#f9f3f1]/50">
                            <span>{art.readingTime}</span>
                            <span>•</span>
                            <span>
                              {new Date(art.datePublished).toLocaleDateString("en-US", {
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            SECTION 5: PRACTICE AREAS (Interactive List)
        ═══════════════════════════════════════════════════ */}
        <section className="py-24 sm:py-32 bg-[#16303d] text-[#f9f3f1] relative overflow-hidden noise-bg">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 relative z-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-baseline justify-between gap-6 mb-16">
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-[10px] uppercase tracking-[0.4em] text-[#cdcab2] font-semibold block mb-3"
                >
                  Our Services
                </motion.span>
                <div className="overflow-hidden">
                  <motion.h2
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif text-4xl sm:text-5xl font-light"
                  >
                    Areas of Expertise
                  </motion.h2>
                </div>
              </div>
              <MagneticButton strength={0.2}>
                <Link
                  href="/practice-areas"
                  className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#cdcab2] hover:text-white transition-colors border-b border-[#cdcab2]/30 pb-1 hover:border-white"
                >
                  All Practice Areas
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
            </div>

            {/* Interactive List */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
            >
              {practiceAreas.map((area, idx) => (
                <motion.div key={area.slug} variants={fadeInUp}>
                  <Link
                    href={`/practice-areas/${area.slug}`}
                    onMouseEnter={() => setHoveredPractice(area.slug)}
                    onMouseLeave={() => setHoveredPractice(null)}
                    className="practice-list-item group flex items-center justify-between py-6 sm:py-8 border-t border-white/10 cursor-pointer"
                  >
                    <div className="flex items-center gap-6 sm:gap-10">
                      <span className="text-xs font-mono text-[#cdcab2]/30 w-6 font-medium">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-light group-hover:text-[#cdcab2] transition-colors duration-500">
                        {area.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-8">
                      <p className="hidden lg:block text-xs text-[#e2ddda]/40 max-w-xs leading-relaxed text-right group-hover:text-[#e2ddda]/70 transition-colors duration-500">
                        {area.overview.substring(0, 100)}...
                      </p>
                      <ArrowRight
                        className={`h-5 w-5 text-[#cdcab2]/30 transition-all duration-500 ${
                          hoveredPractice === area.slug
                            ? "translate-x-2 text-[#cdcab2]"
                            : ""
                        }`}
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
              {/* Bottom border */}
              <div className="border-t border-white/10" />
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            SECTION 6: FIRM STATS (Counter Section)
        ═══════════════════════════════════════════════════ */}
        <section className="py-24 sm:py-32 bg-[#0a0f12] text-[#f9f3f1] relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <div className="editorial-grid w-full h-full" />
          </div>
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 relative z-10">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] uppercase tracking-[0.4em] text-[#cdcab2]/60 font-semibold block text-center mb-16"
            >
              By The Numbers
            </motion.span>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0"
            >
              {[
                { value: 15, suffix: "+", label: "Years of Practice", sublabel: "Established presence in corporate law" },
                { value: 500, suffix: "+", label: "Transactions Closed", sublabel: "Across venture capital & private equity" },
                { value: 12, suffix: "", label: "Jurisdictions", sublabel: "Cross-border advisory capability" },
                { value: 98, suffix: "%", label: "Client Retention", sublabel: "Institutional client satisfaction rate" },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  className={`text-center ${
                    idx < 3 ? "lg:border-r lg:border-white/5" : ""
                  }`}
                >
                  <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light counter-glow">
                    <CounterAnimation
                      target={stat.value}
                      suffix={stat.suffix}
                      duration={2.5}
                    />
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[#cdcab2] font-semibold">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-[10px] text-[#e2ddda]/40 leading-relaxed max-w-[180px] mx-auto">
                    {stat.sublabel}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            SECTION 7: NEWS TICKER (Marquee)
        ═══════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 bg-[#f9f3f1] border-y border-[#cdcab2]/30 overflow-hidden">
          <div className="mb-10 mx-auto max-w-[1400px] px-6 lg:px-10 flex flex-col sm:flex-row items-baseline justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#517380] font-semibold block mb-2">
                Latest Updates
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#111111]">Firm News</h2>
            </div>
            <Link
              href="/news"
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#16303d] hover:text-[#111111] transition-colors"
            >
              All Announcements
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <MarqueeText speed={40} className="py-4">
            {news.map((item) => (
              <Link
                key={item.slug}
                href={`/news/${item.slug}`}
                className="inline-flex items-center gap-6 px-8 group whitespace-nowrap"
              >
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#517380] font-semibold shrink-0">
                  {item.category}
                </span>
                <span className="font-serif text-lg sm:text-xl text-[#111111] font-light group-hover:text-[#16303d] transition-colors">
                  {item.headline}
                </span>
                <span className="text-[10px] text-[#757575] shrink-0">
                  {new Date(item.datePublished).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="h-1 w-1 rounded-full bg-[#cdcab2] shrink-0" />
              </Link>
            ))}
          </MarqueeText>

          {/* Second ticker — reverse */}
          <MarqueeText speed={50} reverse className="py-4 opacity-40">
            {news.map((item) => (
              <span
                key={`rev-${item.slug}`}
                className="inline-flex items-center gap-6 px-8 whitespace-nowrap"
              >
                <span className="font-serif text-base text-[#111111]/30 font-light">
                  {item.headline}
                </span>
                <span className="h-1 w-1 rounded-full bg-[#cdcab2]/40 shrink-0" />
              </span>
            ))}
          </MarqueeText>
        </section>

        {/* ═══════════════════════════════════════════════════
            SECTION 8: GLOBAL PRESENCE (Split Screen Offices)
        ═══════════════════════════════════════════════════ */}
        <section className="relative bg-[#111111] text-[#f9f3f1] overflow-hidden">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-12 sm:py-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] uppercase tracking-[0.4em] text-[#cdcab2] font-semibold block text-center mb-4"
            >
              Global Operations
            </motion.span>
            <div className="overflow-hidden text-center mb-16">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl sm:text-5xl font-light"
              >
                Our Offices
              </motion.h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
            {/* Dubai */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              className="relative group overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop"
                alt="Dubai skyline"
                className="w-full h-full object-cover min-h-[400px] md:min-h-[500px] group-hover:scale-105 transition-transform duration-[1.5s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f12]/90 via-[#0a0f12]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 sm:p-12 z-10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#cdcab2] font-semibold block mb-2">
                  Middle East Hub
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-light mb-3">Dubai</h3>
                <p className="text-xs text-[#e2ddda]/70 leading-relaxed max-w-sm font-light">
                  Al Fattan Currency House, DIFC. Our primary Middle East advisory hub, supporting private capital, structured finance, and cross-border M&A transactions.
                </p>
                <Link
                  href="/careers#apply"
                  className="inline-flex items-center gap-2 mt-4 text-xs font-semibold uppercase tracking-wider text-[#cdcab2] hover:text-white transition-colors"
                >
                  Go to office <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Ireland */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              className="relative group overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1549918864-48ac978761a4?q=80&w=1200&auto=format&fit=crop"
                alt="Dublin cityscape"
                className="w-full h-full object-cover min-h-[400px] md:min-h-[500px] group-hover:scale-105 transition-transform duration-[1.5s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f12]/90 via-[#0a0f12]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 sm:p-12 z-10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#cdcab2] font-semibold block mb-2">
                  European Hub
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-light mb-3">Ireland</h3>
                <p className="text-xs text-[#e2ddda]/70 leading-relaxed max-w-sm font-light">
                  2 Harbourmaster Place, IFSC, Dublin 1. Our European Union regulatory and competition hub, advising global clients on complex cross-jurisdictional matters.
                </p>
                <Link
                  href="/careers#apply"
                  className="inline-flex items-center gap-2 mt-4 text-xs font-semibold uppercase tracking-wider text-[#cdcab2] hover:text-white transition-colors"
                >
                  Go to office <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            SECTION 9: CTA / CONTACT BANNER
        ═══════════════════════════════════════════════════ */}
        <section className="relative py-32 sm:py-40 bg-[#16303d] overflow-hidden">
          {/* Background texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="editorial-grid w-full h-full" />
          </div>

          <div className="mx-auto max-w-[1100px] px-6 lg:px-10 text-center relative z-10">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[10px] uppercase tracking-[0.4em] text-[#cdcab2]/60 font-semibold block mb-8"
            >
              Let&apos;s Work Together
            </motion.span>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight"
              >
                Start a Conversation
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-sm text-[#e2ddda]/60 max-w-lg mx-auto leading-relaxed font-light"
            >
              Whether you are structuring a fund, navigating a regulatory challenge, or closing a transaction, our team is ready to deliver institutional-grade counsel.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-12"
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
