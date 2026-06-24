export interface Article {
  slug: string;
  title: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage: string;
  datePublished: string; // ISO string, e.g. "2026-04-30T10:00:00Z"
  readingTime: string; // e.g. "5 min read"
  summary: string;
  content: string; // Markdown or simple HTML
  isFeatured?: boolean;
}

export interface NewsItem {
  slug: string;
  headline: string;
  datePublished: string; // ISO string, e.g. "2026-03-26T10:00:00Z"
  summary: string;
  content: string; // Markdown or simple HTML
  category: string; // "Announcement", "Award", "Press Release", "Event"
}

export interface SubPractice {
  title: string;
  slug: string;
  content: string;
}

export interface PracticeArea {
  slug: string;
  name: string;
  iconName: string; // Lucide icon name, e.g., "Briefcase", "TrendingUp"
  overview: string;
  expertise: SubPractice[];
  industriesServed: string[];
  relatedInsightsSlugs: string[];
}

export interface Office {
  slug: string;
  name: string;
  heroImage: string;
  description: string;
  address: string[];
  email: string;
  phone: string;
}
