"use client";

import * as React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";
import HeroCarousel from "@/components/HeroCarousel";
import StickyNarrative from "@/components/StickyNarrative";
import InfiniteMarquee from "@/components/InfiniteMarquee";
import InteractiveStats from "@/components/InteractiveStats";
import AnimatedMeshGradient from "@/components/AnimatedMeshGradient";
import EditorialHeadline from "@/components/EditorialHeadline";

import { getPracticeAreas, getArticles } from "@/lib/cms";
import { PracticeArea, Article } from "@/lib/types";

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

  React.useEffect(() => {
    async function loadData() {
      const [areas, arts] = await Promise.all([
        getPracticeAreas(),
        getArticles({ limit: 3 }),
      ]);
      setPracticeAreas(areas.slice(0, 4));
      setArticles(arts.articles);
    }
    loadData();
  }, []);

  return (
    <>
      <Header />
      <main className="flex-grow bg-[#0A1128]">
        
        <HeroCarousel articles={articles.slice(0, 4)} />

        {/* ─── LAYERED SCROLL STORYTELLING CONTAINER ─── */}
        <div className="relative w-full">
          
          {/* LAYER 1: WHAT WE DO */}
          <div className="sticky top-0 min-h-screen w-full bg-[#0A1128] z-10 flex flex-col justify-center overflow-hidden border-b border-white/10">
            <AnimatedMeshGradient />
            <section className="relative z-10 py-[100px] lg:py-[140px] text-[#fcfbf9]">
              <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                <div className="flex flex-col sm:flex-row justify-between items-baseline mb-16 gap-6">
                  <EditorialHeadline text="What we do" className="font-serif text-4xl sm:text-5xl font-light" />
                  <MagneticButton strength={0.2}>
                    <Link
                      href="/practice-areas"
                      className="group relative inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#C5A059] transition-colors py-2"
                    >
                      <span className="relative z-10 group-hover:text-white transition-colors duration-500">All services</span>
                      <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-white" />
                      {/* Liquid Link Underline */}
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C5A059]/30 transform origin-left scale-x-100 transition-transform duration-500" />
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
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
                    <motion.div key={area.slug} variants={fadeInUp} whileHover={{ y: -12 }} className="group relative border border-white/10 aspect-[3/4] overflow-hidden bg-black shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-700">
                      <Link href={`/practice-areas/${area.slug}`} className="block h-full w-full">
                        <img 
                          src={`https://images.unsplash.com/photo-${[
                            "1589829085413-56de8ae18c73", 
                            "1454165804606-c3d57bc86b40", 
                            "1497366216548-37526070297c", 
                            "1600880292203-757bb62b4baf"  
                          ][idx % 4]}?q=80&w=800&auto=format&fit=crop`}
                          alt={area.name}
                          className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-[1.08] group-hover:opacity-50 transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                          <h3 className="font-serif text-2xl font-light mb-4 text-white group-hover:text-[#C5A059] transition-colors duration-500 relative z-10">
                            {area.name}
                          </h3>
                          <div className="h-[2px] w-0 bg-[#C5A059] group-hover:w-12 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] mb-4" />
                          <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/80 transition-colors duration-500 relative z-10">
                            {area.overview.substring(0, 80)}...
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>
          </div>

          {/* LAYER 2: STICKY NARRATIVE */}
          <div className="relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] bg-[#fcfbf9]">
            <StickyNarrative />
          </div>

          {/* LAYER 3: MARQUEE & STATS */}
          <div className="relative z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] bg-[#0A1128]">
            <InfiniteMarquee />
            <InteractiveStats />
          </div>

          {/* LAYER 4: FEATURED INSIGHTS */}
          <div className="sticky top-0 min-h-screen w-full bg-[#fcfbf9] z-40 shadow-[0_-20px_50px_rgba(0,0,0,0.4)] py-[100px] lg:py-[140px] flex flex-col justify-center">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10 w-full">
              <div className="flex flex-col sm:flex-row justify-between items-baseline mb-16 gap-6 border-b border-black/10 pb-6">
                <EditorialHeadline text="Featured insights" className="font-serif text-4xl sm:text-5xl font-light text-[#0A1128]" />
                <MagneticButton strength={0.2}>
                  <Link
                    href="/insights"
                    className="group relative inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#0A1128] transition-colors py-2"
                  >
                    <span className="relative z-10 group-hover:text-[#C5A059] transition-colors duration-500">View all insights</span>
                    <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-[#C5A059]" />
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#0A1128]/20 transform origin-left scale-x-100 transition-transform duration-500" />
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C5A059] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                  </Link>
                </MagneticButton>
              </div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-3 gap-12"
              >
                {articles.map((art) => (
                  <motion.article key={art.slug} variants={fadeInUp} whileHover={{ y: -12 }} className="group cursor-pointer">
                    <Link href={`/insights/${art.slug}`} className="block h-full border-t border-transparent transition-colors">
                      <div className="aspect-[4/3] overflow-hidden mb-6 relative shadow-md group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-700">
                        <img
                          src={art.featuredImage}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                        />
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold">
                          {art.category}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-black/20" />
                        <span className="text-[10px] uppercase tracking-[0.1em] text-[#0A1128]/50">
                          {new Date(art.datePublished).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl font-light text-[#0A1128] mb-4 group-hover:text-[#C5A059] transition-colors duration-500 leading-snug">
                        {art.title}
                      </h3>
                      {/* Luxury gold underline effect */}
                      <div className="h-[1px] w-full bg-black/10 relative overflow-hidden">
                         <div className="absolute top-0 left-0 h-full w-full bg-[#C5A059] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-[0.8s] ease-[cubic-bezier(0.76,0,0.24,1)]" />
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </div>

          {/* LAYER 5: CAREERS (Scrolls normally over insights) */}
          <div className="relative z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            <section className="py-[100px] lg:py-[140px] bg-[#1F2A44] text-[#fcfbf9] text-center overflow-hidden">
              <div className="mx-auto max-w-[1000px] px-6 lg:px-10 relative z-10">
                <EditorialHeadline text="Careers at Silverlake" className="font-serif text-4xl sm:text-5xl md:text-6xl font-light mb-8" />
                <p className="text-lg md:text-xl text-[#fcfbf9]/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                  We look for people who are academically strong, with the intellect and flexibility to take on the most complex problems.
                </p>
                <MagneticButton strength={0.3}>
                  <Link
                    href="/careers"
                    className="inline-flex items-center gap-3 bg-[#C5A059] text-[#0A1128] px-8 py-5 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-white transition-colors duration-500 shadow-xl"
                  >
                    Join us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </MagneticButton>
              </div>
            </section>
            <Footer />
          </div>

        </div>
      </main>
    </>
  );
}
