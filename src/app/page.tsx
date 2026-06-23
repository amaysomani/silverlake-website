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
      <main className="flex-grow bg-[#f9f3f1]">
        {/* ═══════════════════════════════════════════════════
            1. HERO (Macfarlanes style)
        ═══════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="relative min-h-[90vh] w-full bg-[#0a0f12] overflow-hidden flex items-center"
        >
          <motion.div className="absolute inset-0" style={{ y: yBg, scale: scaleBg }}>
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop"
              alt="Background"
              className="w-full h-full object-cover opacity-20"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[#0a0f12]/40 z-10" />
          <div className="absolute inset-0 grain-overlay z-10 pointer-events-none" />

          <motion.div
            style={{ opacity: opacityHero }}
            className="mx-auto max-w-[1400px] px-6 lg:px-10 w-full relative z-20 pt-20"
          >
            <div className="max-w-5xl">
              <h1 className="font-serif font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1]">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="block"
                >
                  Silverlake is a pre-eminent law firm that serves a global client base in Private Capital, Private Wealth, M&A and Disputes.
                </motion.span>
              </h1>
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════
            2. WHAT WE DO
        ═══════════════════════════════════════════════════ */}
        <section className="py-24 sm:py-32 bg-[#111111] text-[#f9f3f1] relative">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="flex flex-col sm:flex-row justify-between items-baseline mb-16 gap-6">
              <h2 className="font-serif text-4xl sm:text-5xl font-light">What we do</h2>
              <MagneticButton strength={0.2}>
                <Link
                  href="/practice-areas"
                  className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#cdcab2] hover:text-white transition-colors border-b border-[#cdcab2]/30 pb-1 hover:border-white"
                >
                  All services
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {practiceAreas.map((area, idx) => (
                <motion.div key={area.slug} variants={fadeInUp} className="group relative border border-white/10 aspect-[3/4] overflow-hidden bg-black">
                  <Link href={`/practice-areas/${area.slug}`} className="block h-full w-full">
                    <img 
                      src={`https://images.unsplash.com/photo-${[
                        "1507679622114-f1eb0e00be33", // Boardroom
                        "1454165804606-c3d57bc86b40", // Finance
                        "1556761175-5973dc0f32b7", // Corporate
                        "1600880292203-757bb62b4baf"  // Legal
                      ][idx % 4]}?q=80&w=800&auto=format&fit=crop`}
                      alt={area.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-110 group-hover:opacity-50 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="font-serif text-2xl font-light mb-4 text-white group-hover:text-[#cdcab2] transition-colors relative z-10">
                        {area.name}
                      </h3>
                      <p className="text-sm text-white/70 leading-relaxed group-hover:text-white transition-colors relative z-10">
                        {area.overview.substring(0, 80)}...
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            3. EXAMPLES OF OUR WORK (Case Studies)
        ═══════════════════════════════════════════════════ */}
        <section className="py-24 sm:py-32 bg-[#f9f3f1]">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="flex flex-col sm:flex-row justify-between items-baseline mb-16 gap-6 border-b border-black/10 pb-6">
              <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#111111]">Examples of our work</h2>
              <MagneticButton strength={0.2}>
                <Link
                  href="/practice-areas"
                  className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#16303d] hover:text-black transition-colors border-b border-[#16303d]/30 pb-1 hover:border-black"
                >
                  Case studies
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative aspect-[21/9] md:aspect-[24/9] overflow-hidden bg-black group"
            >
              <img
                src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1600&auto=format&fit=crop"
                alt="Case Study"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#cdcab2] font-bold mb-3 block">Case study</span>
                <h3 className="font-serif text-2xl md:text-4xl text-white font-light max-w-2xl leading-tight">
                  Defending institutional funds in landmark private credit disciplinary appeals
                </h3>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            4. WHO WE ARE
        ═══════════════════════════════════════════════════ */}
        <section className="py-24 sm:py-32 bg-[#e2ddda]">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#111111] mb-8">Who we are</h2>
                <p className="text-xl md:text-2xl font-serif font-light text-[#111111]/80 leading-relaxed mb-12">
                  We are recognized for the quality of our work, not just in dealing with the full range of corporate and commercial matters, but in advising our clients on their private affairs.
                </p>
                <MagneticButton strength={0.3}>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-3 bg-[#111111] text-[#f9f3f1] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#cdcab2] hover:text-[#111111] transition-colors duration-500"
                  >
                    Get to know us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </MagneticButton>
              </div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="relative aspect-[4/3] overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
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
        <section className="py-24 sm:py-32 bg-[#f9f3f1]">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="flex flex-col sm:flex-row justify-between items-baseline mb-16 gap-6 border-b border-black/10 pb-6">
              <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#111111]">Featured insights</h2>
              <MagneticButton strength={0.2}>
                <Link
                  href="/insights"
                  className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#16303d] hover:text-black transition-colors border-b border-[#16303d]/30 pb-1 hover:border-black"
                >
                  View all insights
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {articles.map((art) => (
                <motion.article key={art.slug} variants={fadeInUp} className="group">
                  <Link href={`/insights/${art.slug}`} className="block h-full border-t-2 border-transparent hover:border-[#111111] transition-colors pt-4">
                    <div className="aspect-[4/3] overflow-hidden mb-6 relative">
                      <img
                        src={art.featuredImage}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s]"
                      />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#517380] font-semibold block mb-3">
                      {art.category}
                    </span>
                    <h3 className="font-serif text-2xl font-light text-[#111111] mb-3 group-hover:text-[#517380] transition-colors">
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
        <section className="py-24 sm:py-32 bg-[#111111] text-[#f9f3f1]">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="flex flex-col sm:flex-row justify-between items-baseline mb-16 gap-6 border-b border-white/20 pb-6">
              <h2 className="font-serif text-4xl sm:text-5xl font-light">Latest news</h2>
              <MagneticButton strength={0.2}>
                <Link
                  href="/news"
                  className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#cdcab2] hover:text-white transition-colors border-b border-[#cdcab2]/30 pb-1 hover:border-white"
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
                <motion.div key={item.slug} variants={fadeInUp} className="group">
                  <Link href={`/news/${item.slug}`} className="block border-t border-white/20 pt-6">
                    <span className="text-[10px] text-white/50 block mb-3">
                      {new Date(item.datePublished).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <h3 className="font-serif text-xl font-light text-white group-hover:text-[#cdcab2] transition-colors">
                      {item.headline}
                    </h3>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            7. CAREERS
        ═══════════════════════════════════════════════════ */}
        <section className="py-24 sm:py-32 bg-[#16303d] text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 noise-bg opacity-30 mix-blend-overlay pointer-events-none" />
          <div className="mx-auto max-w-[1000px] px-6 lg:px-10 relative z-10">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light mb-8">Careers at Silverlake</h2>
            <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto mb-12 font-light">
              We look for people who are academically strong, with the intellect and flexibility to take on the most complex problems.
            </p>
            <MagneticButton strength={0.3}>
              <Link
                href="/careers"
                className="inline-flex items-center gap-3 bg-[#cdcab2] text-[#0a0f12] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-white transition-colors duration-500"
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
