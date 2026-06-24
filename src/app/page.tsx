"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  Variants,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";
import HeroCarousel from "@/components/HeroCarousel";
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

export default function HomePage() {
  const [practiceAreas, setPracticeAreas] = React.useState<PracticeArea[]>([]);
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [news, setNews] = React.useState<NewsItem[]>([]);

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
        getNews({ limit: 4 }),
      ]);
      setPracticeAreas(areas.slice(0, 4)); // Only top 4 like Macfarlanes
      setArticles(arts.articles);
      setNews(nws.news);
    }
    loadData();
  }, []);

  return (
    <>
      <Header />
      <main className="flex-grow bg-[#fcfbf9]">
        {/* ═══════════════════════════════════════════════════
            1. HERO (Macfarlanes style)
        ═══════════════════════════════════════════════════ */}
        <HeroCarousel articles={articles.slice(0, 4)} />

        {/* ═══════════════════════════════════════════════════
            2. WHAT WE DO
        ═══════════════════════════════════════════════════ */}
        <section className="py-[100px] lg:py-[140px] bg-[#eae8e1] text-[#333333] relative overflow-hidden">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 relative">
            <div className="flex flex-col sm:flex-row justify-between items-baseline mb-24 gap-6">
              <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#222]">What we do</h2>
              <Link
                href="/practice-areas"
                className="group inline-flex items-center gap-2 text-sm font-medium text-[#222] border-b border-[#222]/30 pb-1 hover:border-[#222] transition-colors"
              >
                All services
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-8 items-center">
              
              {/* Left Column */}
              <div className="flex flex-col gap-24">
                {practiceAreas.slice(0, 2).map((area) => (
                  <div key={area.slug} className="group flex flex-col items-start max-w-md">
                    <h3 className="font-sans text-[28px] lg:text-[32px] font-medium text-[#222] mb-6 tracking-tight group-hover:text-black transition-colors">
                      {area.name}
                    </h3>
                    <p className="text-[#444] text-lg leading-[1.6] mb-8 font-light">
                      {area.overview.substring(0, 160)}...
                    </p>
                    <Link 
                      href={`/practice-areas/${area.slug}`}
                      className="text-[#222] text-base font-medium inline-flex items-center gap-2 border-b border-[#222]/30 pb-1 hover:border-[#222] transition-all group-hover:pr-2"
                    >
                      Learn more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Central Graphic */}
              <div className="hidden lg:flex justify-center items-center px-8">
                <svg width="280" height="500" viewBox="0 0 280 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.35]">
                  <g stroke="#333" strokeWidth="0.6">
                    <line x1="140" y1="0" x2="140" y2="500" />
                    {[...Array(14)].map((_, i) => (
                      <path key={`left-${i}`} d={`M 140 0 Q ${-60 + i * 10} 250 140 500`} />
                    ))}
                    {[...Array(14)].map((_, i) => (
                      <path key={`right-${i}`} d={`M 140 0 Q ${340 - i * 10} 250 140 500`} />
                    ))}
                    {[...Array(14)].map((_, i) => (
                      <path key={`top-${i}`} d={`M 0 250 Q 140 ${-60 + i * 10} 280 250`} />
                    ))}
                    {[...Array(14)].map((_, i) => (
                      <path key={`bottom-${i}`} d={`M 0 250 Q 140 ${560 - i * 10} 280 250`} />
                    ))}
                  </g>
                </svg>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-24 lg:items-end">
                {practiceAreas.slice(2, 4).map((area) => (
                  <div key={area.slug} className="group flex flex-col items-start lg:items-start max-w-md">
                    <h3 className="font-sans text-[28px] lg:text-[32px] font-medium text-[#222] mb-6 tracking-tight group-hover:text-black transition-colors">
                      {area.name}
                    </h3>
                    <p className="text-[#444] text-lg leading-[1.6] mb-8 font-light">
                      {area.overview.substring(0, 160)}...
                    </p>
                    <Link 
                      href={`/practice-areas/${area.slug}`}
                      className="text-[#222] text-base font-medium inline-flex items-center gap-2 border-b border-[#222]/30 pb-1 hover:border-[#222] transition-all group-hover:pr-2"
                    >
                      Learn more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>



        {/* ═══════════════════════════════════════════════════
            4. WHO WE ARE
        ═══════════════════════════════════════════════════ */}
        <section className="py-[100px] lg:py-[140px] bg-[#1F2A44]">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#fcfbf9] mb-8">Who we are</h2>
                <p className="text-xl md:text-2xl font-serif font-light text-[#fcfbf9]/80 leading-relaxed mb-12">
                  We are recognized for the quality of our work, not just in dealing with the full range of corporate and commercial matters, but in advising our clients on their private affairs.
                </p>
                <MagneticButton strength={0.3}>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-3 bg-[#C5A059] text-[#0A1128] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#fcfbf9] hover:text-[#0A1128] transition-colors duration-500"
                  >
                    Get to know us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </MagneticButton>
              </div>
              <motion.div
                className="relative aspect-[4/3] overflow-hidden"
              >
                <img
                  src="/images/office-interior.png"
                  alt="Silverlake Office"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            5. FEATURED INSIGHTS
        ═══════════════════════════════════════════════════ */}
        <section className="py-[100px] lg:py-[140px] bg-[#fcfbf9]">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="flex flex-col sm:flex-row justify-between items-baseline mb-16 gap-6 border-b border-black/10 pb-6">
              <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#0A1128]">Featured insights</h2>
              <MagneticButton strength={0.2}>
                <Link
                  href="/insights"
                  className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#0A1128] hover:text-[#C5A059] transition-colors border-b border-[#0A1128]/30 pb-1 hover:border-[#C5A059]"
                >
                  View all insights
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {articles.map((art) => (
                <motion.article key={art.slug} whileHover={{ y: -8 }} className="group">
                  <Link href={`/insights/${art.slug}`} className="block h-full border-t-2 border-transparent hover:border-[#111111] transition-colors pt-4">
                    <div className="aspect-[4/3] overflow-hidden mb-6 relative">
                      <img
                        src={art.featuredImage}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s]"
                      />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold">
                        {art.category}
                      </span>
                      <span className="text-[10px] text-[#0A1128]/50">
                        {new Date(art.datePublished).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-light text-[#0A1128] mb-3 group-hover:text-[#C5A059] transition-colors">
                      {art.title}
                    </h3>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            6. LATEST NEWS
        ═══════════════════════════════════════════════════ */}
        <section className="py-[100px] lg:py-[140px] bg-[#0A1128] text-[#fcfbf9]">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="flex flex-col sm:flex-row justify-between items-baseline mb-16 gap-6 border-b border-white/20 pb-6">
              <h2 className="font-serif text-4xl sm:text-5xl font-light">Latest news</h2>
              <MagneticButton strength={0.2}>
                <Link
                  href="/news"
                  className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#C5A059] hover:text-white transition-colors border-b border-[#C5A059]/30 pb-1 hover:border-white"
                >
                  All news
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {news.map((item) => (
                <motion.div key={item.slug} variants={fadeInUp} whileHover={{ y: -8 }} className="group">
                  <Link href={`/news/${item.slug}`} className="block border-t border-white/20 pt-6">
                    <span className="text-[10px] text-white/50 block mb-3">
                      {new Date(item.datePublished).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <h3 className="font-serif text-xl font-light text-white group-hover:text-[#C5A059] transition-colors">
                      {item.headline}
                    </h3>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            7. OUR OFFICES
        ═══════════════════════════════════════════════════ */}
        <section className="bg-[#0A1128] text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
            {/* Dubai */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative group overflow-hidden"
            >
              <img
                src="/images/dubai-office.png"
                alt="Dubai Office"
                className="w-full h-full object-cover min-h-[400px] md:min-h-[500px] group-hover:scale-105 transition-transform duration-[1.5s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/90 via-[#0A1128]/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-8 sm:p-12 z-10 w-full">
                <h3 className="font-serif text-3xl font-light mb-4 text-white">Dubai</h3>
                <p className="text-white/70 font-light leading-relaxed mb-6 max-w-sm">
                  Our Dubai office serves as a hub for our Middle East practice, advising clients on cross-border transactions and private capital investments.
                </p>
                <MagneticButton strength={0.2}>
                  <Link
                    href="/offices/dubai"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-white hover:text-[#C5A059] transition-colors group/link"
                  >
                    Go to office
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </MagneticButton>
              </div>
            </motion.div>

            {/* Ireland */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative group overflow-hidden"
            >
              <img
                src="/images/ireland-office.png"
                alt="Ireland Office"
                className="w-full h-full object-cover min-h-[400px] md:min-h-[500px] group-hover:scale-105 transition-transform duration-[1.5s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/90 via-[#0A1128]/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-8 sm:p-12 z-10 w-full">
                <h3 className="font-serif text-3xl font-light mb-4 text-white">Ireland</h3>
                <p className="text-white/70 font-light leading-relaxed mb-6 max-w-sm">
                  Our Ireland representative office helps European private capital clients understand the market and informs investors on European opportunities.
                </p>
                <MagneticButton strength={0.2}>
                  <Link
                    href="/offices/ireland"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-white hover:text-[#C5A059] transition-colors group/link"
                  >
                    Go to office
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            8. CAREERS
        ═══════════════════════════════════════════════════ */}
        <section className="py-[100px] lg:py-[140px] bg-[#1F2A44] text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 noise-bg opacity-30 mix-blend-overlay pointer-events-none" />
          <div className="mx-auto max-w-[1000px] px-6 lg:px-10 relative z-10">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light mb-8">Careers at Silverlake</h2>
            <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto mb-12 font-light">
              We look for people who are academically strong, with the intellect and flexibility to take on the most complex problems.
            </p>
            <MagneticButton strength={0.3}>
              <Link
                href="/careers"
                className="inline-flex items-center gap-3 bg-[#C5A059] text-[#0A1128] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-white transition-colors duration-500"
              >
                Join us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </MagneticButton>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
