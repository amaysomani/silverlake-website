import { Article, NewsItem, PracticeArea, Office } from "./types";
import practiceAreasData from "@/content/practice-areas.json";
import articlesData from "@/content/articles.json";
import newsData from "@/content/news.json";
import officesData from "@/content/offices.json";
import { client } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";

// Cast JSON data to typed arrays
const practiceAreas: PracticeArea[] = practiceAreasData as PracticeArea[];
const fallbackArticles: Article[] = (articlesData as Article[]).sort(
  (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
);
const fallbackNewsItems: NewsItem[] = (newsData as NewsItem[]).sort(
  (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
);

// Practice Areas
export async function getPracticeAreas(): Promise<PracticeArea[]> {
  return practiceAreas; // Currently no Sanity schema for Practice Areas
}

export async function getPracticeAreaBySlug(slug: string): Promise<PracticeArea | null> {
  const area = practiceAreas.find((a) => a.slug === slug);
  return area || null;
}

// Offices
const offices: Office[] = officesData as Office[];

export async function getOffices(): Promise<Office[]> {
  return offices;
}

export async function getOfficeBySlug(slug: string): Promise<Office | null> {
  const office = offices.find((o) => o.slug === slug);
  return office || null;
}

// Articles (Insights)
interface GetArticlesOptions {
  search?: string;
  category?: string;
  tag?: string;
  page?: number;
  limit?: number;
}

interface PaginatedArticles {
  articles: Article[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function getArticles(options: GetArticlesOptions = {}): Promise<PaginatedArticles> {
  const { search, category, tag, page = 1, limit = 10 } = options;

  let allArticles = [...fallbackArticles];

  try {
    const sanityArticles = await client.fetch(`*[_type == "article"] | order(datePublished desc)`);
    if (sanityArticles && sanityArticles.length > 0) {
      allArticles = sanityArticles.map((s: any) => ({
        title: s.title || "Untitled",
        slug: s.slug?.current || "untitled",
        category: s.category || "Uncategorized",
        datePublished: s.datePublished || new Date().toISOString(),
        summary: s.content || "",
        content: s.content || "",
        featuredImage: s.featuredImage ? urlForImage(s.featuredImage)?.url() : "",
        readTime: "5 min read",
        tags: [],
        author: { name: "Silverlake Editorial", role: "Partner", imageUrl: "" },
        isFeatured: false
      }));
    }
  } catch (error) {
    console.error("Sanity Article Fetch Error:", error);
  }

  let filtered = [...allArticles];

  // Search filter
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(s) ||
        a.summary.toLowerCase().includes(s) ||
        a.tags.some((t) => t.toLowerCase().includes(s)) ||
        a.content.toLowerCase().includes(s)
    );
  }

  // Category filter
  if (category && category !== "All") {
    filtered = filtered.filter(
      (a) => a.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Tag filter
  if (tag) {
    filtered = filtered.filter((a) =>
      a.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    );
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const paginatedArticles = filtered.slice(startIndex, startIndex + limit);

  return {
    articles: paginatedArticles,
    pagination: {
      total,
      page,
      limit,
      totalPages,
    },
  };
}

export async function getArticleBySlug(slug: string): Promise<{ article: Article; relatedArticles: Article[] } | null> {
  let allArticles = [...fallbackArticles];
  
  try {
    const sanityArticles = await client.fetch(`*[_type == "article"] | order(datePublished desc)`);
    if (sanityArticles && sanityArticles.length > 0) {
      allArticles = sanityArticles.map((s: any) => ({
        title: s.title || "Untitled",
        slug: s.slug?.current || "untitled",
        category: s.category || "Uncategorized",
        datePublished: s.datePublished || new Date().toISOString(),
        summary: s.content || "",
        content: s.content || "",
        featuredImage: s.featuredImage ? urlForImage(s.featuredImage)?.url() : "",
        readTime: "5 min read",
        tags: [],
        author: { name: "Silverlake Editorial", role: "Partner", imageUrl: "" },
        isFeatured: false
      }));
    }
  } catch (error) {
    console.error("Sanity Article Fetch Error:", error);
  }

  const article = allArticles.find((a) => a.slug === slug);
  if (!article) return null;

  const related = allArticles
    .filter((a) => a.slug !== slug)
    .filter((a) => a.category === article.category || a.tags.some((t) => article.tags.includes(t)))
    .slice(0, 3);

  if (related.length < 3) {
    const fallback = allArticles
      .filter((a) => a.slug !== slug && !related.some((r) => r.slug === a.slug))
      .slice(0, 3 - related.length);
    related.push(...fallback);
  }

  return {
    article,
    relatedArticles: related,
  };
}

export async function getFeaturedArticle(): Promise<Article | null> {
  const result = await getArticles();
  const allArticles = result.articles;
  const featured = allArticles.find((a) => a.isFeatured);
  return featured || allArticles[0] || null;
}

// News
interface GetNewsOptions {
  page?: number;
  limit?: number;
  category?: string;
}

interface PaginatedNews {
  news: NewsItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function getNews(options: GetNewsOptions = {}): Promise<PaginatedNews> {
  const { page = 1, limit = 10, category } = options;

  let allNews = [...fallbackNewsItems];

  try {
    const sanityNews = await client.fetch(`*[_type == "news"] | order(datePublished desc)`);
    if (sanityNews && sanityNews.length > 0) {
      allNews = sanityNews.map((s: any) => ({
        headline: s.headline || "Untitled",
        slug: s.slug?.current || "untitled",
        datePublished: s.datePublished || new Date().toISOString(),
        category: "Firm News", // Fallback, no category in our schema yet
        summary: ""
      }));
    }
  } catch (error) {
    console.error("Sanity News Fetch Error:", error);
  }

  let filtered = [...allNews];

  if (category && category !== "All") {
    filtered = filtered.filter((item) => item.category.toLowerCase() === category.toLowerCase());
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const paginatedNews = filtered.slice(startIndex, startIndex + limit);

  return {
    news: paginatedNews,
    pagination: {
      total,
      page,
      limit,
      totalPages,
    },
  };
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const result = await getNews();
  const item = result.news.find((n) => n.slug === slug);
  return item || null;
}
