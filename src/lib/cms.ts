import { Article, NewsItem, PracticeArea } from "./types";
import practiceAreasData from "@/content/practice-areas.json";
import articlesData from "@/content/articles.json";
import newsData from "@/content/news.json";

// Cast JSON data to typed arrays
const practiceAreas: PracticeArea[] = practiceAreasData as PracticeArea[];
const articles: Article[] = (articlesData as Article[]).sort(
  (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
);
const newsItems: NewsItem[] = (newsData as NewsItem[]).sort(
  (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
);

// Practice Areas
export async function getPracticeAreas(): Promise<PracticeArea[]> {
  return practiceAreas;
}

export async function getPracticeAreaBySlug(slug: string): Promise<PracticeArea | null> {
  const area = practiceAreas.find((a) => a.slug === slug);
  return area || null;
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

  let filtered = [...articles];

  // Search filter (title, summary, tags, content)
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
  const article = articles.find((a) => a.slug === slug);
  if (!article) return null;

  // Find related articles (matching category or tags, excluding current)
  const related = articles
    .filter((a) => a.slug !== slug)
    .filter((a) => a.category === article.category || a.tags.some((t) => article.tags.includes(t)))
    .slice(0, 3);

  // Fallback to latest if not enough related
  if (related.length < 3) {
    const fallback = articles
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
  const featured = articles.find((a) => a.isFeatured);
  return featured || articles[0] || null;
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

  let filtered = [...newsItems];

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
  const item = newsItems.find((n) => n.slug === slug);
  return item || null;
}
