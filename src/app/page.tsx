import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeClient from "./HomeClient";
import { getPracticeAreas, getArticles } from "@/lib/cms";
import { PracticeArea, Article } from "@/lib/types";

export default async function HomePage() {
  const [areas, arts] = await Promise.all([
    getPracticeAreas(),
    getArticles({ limit: 100 }),
  ]);
  
  const targetSlugs = ['private-capital', 'm-a', 'private-wealth', 'litigation-arbitration-and-investigations'];
  const topAreas = targetSlugs.map(slug => areas.find(a => a.slug === slug)).filter(Boolean) as PracticeArea[];
  
  // Override the name of "Litigation, Arbitration and Investigations" to "Disputes" for the homepage specifically
  const modifiedAreas = topAreas.map(area => 
    area.slug === 'litigation-arbitration-and-investigations' 
      ? { ...area, name: "Disputes" } 
      : area
  );

  const targetHeroSlugs = ['offshore-fund-structures-for-india-focused-capital', 'private-credit-valuations', 'dpdp-act-2023-rules-2025-india-data-protection'];
  const targetInsightSlugs = [
    'esg-linked-fundraising-india-regulatory-expectations',
    'reits-india-sebi-2026-reforms-mature-real-estate',
    'fdi-indian-real-estate-regulatory-framework-structuring'
  ];

  const heroArticles = targetHeroSlugs.map(slug => arts.articles.find(a => a.slug === slug)).filter(Boolean) as Article[];
  
  const homepageImages = [
    '/images/insight-canyon.png',
    '/images/insight-blue-waves.png',
    '/images/insight-teal-particles.png'
  ];

  const insightArticles = targetInsightSlugs.map((slug, index) => {
    const article = arts.articles.find(a => a.slug === slug);
    if (article) {
      return {
        ...article,
        featuredImage: homepageImages[index]
      };
    }
    return null;
  }).filter(Boolean) as Article[];

  return (
    <>
      <Header />
      <HomeClient 
        practiceAreas={modifiedAreas} 
        articles={[...heroArticles, ...insightArticles]} 
      />
      <Footer />
    </>
  );
}
