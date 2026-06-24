import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeClient from "./HomeClient";
import { getPracticeAreas, getArticles } from "@/lib/cms";
import { PracticeArea, Article } from "@/lib/types";

export default async function HomePage() {
  const [areas, arts] = await Promise.all([
    getPracticeAreas(),
    getArticles({ limit: 20 }),
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
