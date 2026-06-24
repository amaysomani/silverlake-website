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
        getArticles({ limit: 20 }),
        getNews({ limit: 4 }),
      ]);
      
      const targetSlugs = ['private-capital', 'm-a', 'private-wealth', 'litigation-arbitration-and-investigations'];
      const topAreas = targetSlugs.map(slug => areas.find(a => a.slug === slug)).filter(Boolean) as PracticeArea[];
      
      // Override the name of "Litigation, Arbitration and Investigations" to "Disputes" for the homepage specifically
      const modifiedAreas = topAreas.map(area => 
        area.slug === 'litigation-arbitration-and-investigations' 
          ? { ...area, name: "Disputes" } 
          : area
      );

      const targetHeroSlugs = ['private-capital-uk-professional-services', 'private-credit-valuations', 'evergreen-fund-models-comparative-analysis'];
      const targetInsightSlugs = ['german-insurance-market-opportunities', 'countdown-aifmd-ii-loan-origination', 'real-opportunities-private-capital-real-estate'];

      const heroArticles = targetHeroSlugs.map(slug => arts.articles.find(a => a.slug === slug)).filter(Boolean) as Article[];
      const insightArticles = targetInsightSlugs.map(slug => arts.articles.find(a => a.slug === slug)).filter(Boolean) as Article[];

      setPracticeAreas(modifiedAreas);
      setArticles([...heroArticles, ...insightArticles]);
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
        <HeroCarousel articles={articles.slice(0, 3)} />

        {/* ═══════════════════════════════════════════════════
            2. WHAT WE DO
        ═══════════════════════════════════════════════════ */}
        <section className="py-[100px] lg:py-[140px] bg-[#eae8e1] text-[#333333] relative overflow-hidden">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 relative">
            <div className="flex flex-col sm:flex-row justify-between items-baseline mb-20 gap-6 border-b border-[#222]/10 pb-8">
              <h2 className="font-serif text-[32px] sm:text-[40px] font-normal text-[#222]">What we do</h2>
              <Link
                href="/practice-areas"
                className="group inline-flex items-center gap-2 text-[14px] font-normal text-[#222] border-b border-[#222] pb-0.5 hover:opacity-70 transition-opacity"
              >
                View all services
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-16 lg:gap-12 items-center">
              
              {/* Left Column */}
              <div className="flex flex-col gap-20">
                {practiceAreas.slice(0, 2).map((area) => (
                  <div key={area.slug} className="group flex flex-col items-start max-w-[420px]">
                    <h3 className="font-sans text-[24px] lg:text-[28px] font-medium text-[#222] mb-4 tracking-tight">
                      {area.name}
                    </h3>
                    <p className="text-[#444] text-[15px] leading-[1.6] mb-6 font-normal">
                      {area.overview.substring(0, 160)}...
                    </p>
                    <Link 
                      href={`/practice-areas/${area.slug}`}
                      className="text-[#222] text-[14px] font-normal inline-flex items-center gap-2 border-b border-[#222]/40 pb-0.5 hover:border-[#222] transition-colors"
                    >
                      Learn more <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Central Graphic (Macfarlanes style overlapping arcs) */}
              <div className="hidden lg:flex justify-center items-center px-4">
                <svg width="280" height="380" viewBox="0 0 280 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.7]">
                  <g stroke="#222" strokeWidth="0.5">
                    <line x1="140" y1="0" x2="140" y2="380" strokeWidth="0.5" opacity="0.4" />
                    {/* Top Left Quadrant Arcs */}
                    {[...Array(12)].map((_, i) => (
                      <path key={`tl-${i}`} d={`M 140 190 Q ${140 - (i * 12 + 10)} ${190 - (i * 14 + 10)} 140 0`} />
                    ))}
                    {/* Bottom Left Quadrant Arcs */}
                    {[...Array(12)].map((_, i) => (
                      <path key={`bl-${i}`} d={`M 140 190 Q ${140 - (i * 12 + 10)} ${190 + (i * 14 + 10)} 140 380`} />
                    ))}
                    {/* Top Right Quadrant Arcs */}
                    {[...Array(12)].map((_, i) => (
                      <path key={`tr-${i}`} d={`M 140 190 Q ${140 + (i * 12 + 10)} ${190 - (i * 14 + 10)} 140 0`} />
                    ))}
                    {/* Bottom Right Quadrant Arcs */}
                    {[...Array(12)].map((_, i) => (
                      <path key={`br-${i}`} d={`M 140 190 Q ${140 + (i * 12 + 10)} ${190 + (i * 14 + 10)} 140 380`} />
                    ))}
                  </g>
                </svg>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-20 lg:items-start">
                {practiceAreas.slice(2, 4).map((area) => (
                  <div key={area.slug} className="group flex flex-col items-start max-w-[420px]">
                    <h3 className="font-sans text-[24px] lg:text-[28px] font-medium text-[#222] mb-4 tracking-tight">
                      {area.name}
                    </h3>
                    <p className="text-[#444] text-[15px] leading-[1.6] mb-6 font-normal">
                      {area.overview.substring(0, 160)}...
                    </p>
                    <Link 
                      href={`/practice-areas/${area.slug}`}
                      className="text-[#222] text-[14px] font-normal inline-flex items-center gap-2 border-b border-[#222]/40 pb-0.5 hover:border-[#222] transition-colors"
                    >
                      Learn more <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </Link>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>



        {/* ═══════════════════════════════════════════════════
            4. WHO WE ARE (50/50 Split)
        ═══════════════════════════════════════════════════ */}
        <section className="flex flex-col lg:flex-row bg-[#081b33]">
          {/* Left: Image */}
          <div className="w-full lg:w-1/2 relative min-h-[500px] lg:min-h-[600px]">
            <img
              src="/images/office-interior.png"
              alt="Silverlake Office"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          {/* Right: Text Content */}
          <div className="w-full lg:w-1/2 flex items-center bg-[#081b33]">
            <div className="max-w-xl px-8 py-24 lg:px-24 lg:py-32 text-white">
              <h2 className="font-serif text-[36px] lg:text-[44px] font-normal mb-6 leading-tight tracking-tight">Who we are</h2>
              <p className="text-[15px] lg:text-[17px] font-sans font-normal text-white leading-[1.6] mb-10">
                We are big enough to undertake the most complex and demanding mandates yet small enough to know each other well and to be agile, adapting to the needs of our clients.
              </p>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-[15px] font-normal text-white border-b border-white pb-0.5 hover:text-white/70 hover:border-white/70 transition-colors"
              >
                Learn about Silverlake
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            5. FEATURED INSIGHTS
        ═══════════════════════════════════════════════════ */}
        <section className="py-[100px] lg:py-[140px] bg-[#fcfbf9]">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="flex flex-col sm:flex-row justify-between items-baseline mb-12 gap-6">
              <h2 className="font-serif text-[32px] sm:text-[40px] font-normal text-[#111]">Featured insights</h2>
              <Link
                href="/insights"
                className="group inline-flex items-center gap-2 text-[14px] font-normal text-[#111] border-b border-[#111] pb-0.5 hover:opacity-70 transition-opacity"
              >
                View more
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[3, 4, 5].map((index) => {
                const article = articles[index];
                if (!article) return null;
                return (
                  <Link key={article.slug} href={`/insights/${article.slug}`} className="flex flex-col bg-[#f4f4f4] hover:bg-[#111] transition-colors duration-500 group">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img src={article.featuredImage} alt={article.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-6 lg:p-8 flex flex-col flex-grow">
                      <h3 className="font-serif text-[20px] lg:text-[22px] font-normal text-[#111] group-hover:text-white transition-colors duration-500 mb-4 leading-snug pr-4">{article.title}</h3>
                      <p className="text-[14px] text-[#444] group-hover:text-white/80 transition-colors duration-500 leading-relaxed mb-8">{article.summary}</p>
                      <div className="text-[11px] uppercase tracking-wider text-[#666] group-hover:text-white/60 font-semibold mt-auto transition-colors duration-500">
                        {article.category}<br/>
                        <span className="text-[#333] group-hover:text-white mt-1 block transition-colors duration-500">{new Date(article.datePublished).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
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
