import * as fs from 'fs';
const articlesData = JSON.parse(fs.readFileSync('./src/content/articles.json', 'utf8'));

const arts = { articles: articlesData };

const targetHeroSlugs = ['offshore-fund-structures-for-india-focused-capital', 'private-credit-valuations', 'dpdp-act-2023-rules-2025-india-data-protection'];
const targetInsightSlugs = ['german-insurance-market-opportunities', 'countdown-aifmd-ii-loan-origination', 'real-opportunities-private-capital-real-estate'];

const heroArticles = targetHeroSlugs.map(slug => arts.articles.find(a => a.slug === slug)).filter(Boolean);
const insightArticles = targetInsightSlugs.map(slug => arts.articles.find(a => a.slug === slug)).filter(Boolean);

console.log('heroArticles length:', heroArticles.length);
console.log('insightArticles length:', insightArticles.length);

console.log('hero slugs found:', heroArticles.map(a => a.slug));
