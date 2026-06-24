import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Share2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getArticleBySlug } from "@/lib/cms";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const result = await getArticleBySlug(slug);
  if (!result) return {};

  const { article } = result;
  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.datePublished,
      authors: [article.author],
      tags: article.tags,
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const result = await getArticleBySlug(slug);

  if (!result) {
    notFound();
  }

  const { article, relatedArticles } = result;

  // JSON-LD Structured Metadata for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "datePublished": article.datePublished,
    "dateModified": article.datePublished,
    "author": [
      {
        "@type": "Organization",
        "name": article.author,
      },
    ],
    "description": article.summary,
    "publisher": {
      "@type": "Organization",
      "name": "Silverlake LLP",
      "logo": {
        "@type": "ImageObject",
        "url": "https://silverlake.com/logo.png",
      },
    },
  };

  return (
    <>
      {/* Structured data injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-grow">
        {/* Navigation & Header */}
        <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 bg-[#0a0f12] overflow-hidden">
          <div className="absolute inset-0 grain-overlay pointer-events-none" />
          <div className="mx-auto max-w-4xl px-6 relative z-10">
            <Link
              href="/insights"
              className="inline-flex items-center text-xs font-semibold tracking-[0.15em] uppercase text-[#cdcab2]/60 hover:text-[#cdcab2] transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Insights
            </Link>

            <div className="space-y-4">
              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#cdcab2] block">
                {article.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
                {article.title}
              </h1>
              
              {/* Metadata row */}
              <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-[#e2ddda]/40 border-t border-white/5">
                <span className="flex items-center gap-x-1.5 font-semibold text-[#f9f3f1]/70">
                  <User className="h-4 w-4 text-[#cdcab2]/60" />
                  {article.author}
                </span>
                <span className="flex items-center gap-x-1.5">
                  <Calendar className="h-4 w-4 text-[#cdcab2]/60" />
                  {new Date(article.datePublished).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-x-1.5">
                  <Clock className="h-4 w-4 text-[#cdcab2]/60" />
                  {article.readingTime}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content & Sharing Layout */}
        <section className="py-16 bg-background transition-colors duration-300">
          <div className="mx-auto max-w-4xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Sharing sidebar */}
              <div className="lg:col-span-1 flex lg:flex-col lg:items-center gap-4 lg:pt-2 border-b lg:border-b-0 lg:border-r border-border pb-6 lg:pb-0 lg:pr-6">
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold lg:mb-2">Share</span>
                <button 
                  className="rounded-full p-2 border border-border hover:bg-muted text-muted-foreground hover:text-primary transition-all duration-300"
                  aria-label="Share article"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>

              {/* Article Content */}
              <div className="lg:col-span-11 space-y-8">
                {/* Summary / Excerpt */}
                <p className="text-base sm:text-lg font-light text-muted-foreground border-l-4 border-accent-emerald pl-6 italic leading-relaxed">
                  {article.summary}
                </p>

                {/* Body Content */}
                <div
                  className="prose prose-sm sm:prose max-w-none dark:prose-invert prose-headings:font-serif prose-headings:font-light prose-headings:text-primary prose-a:text-accent-emerald hover:prose-a:text-primary leading-relaxed text-muted-foreground space-y-6"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Tags */}
                <div className="pt-8 border-t border-border">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/insights?tag=${encodeURIComponent(tag)}`}
                        className="text-[10px] uppercase font-semibold tracking-wider bg-muted text-muted-foreground px-3 py-1.5 border border-transparent hover:border-border transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="py-20 border-t border-border bg-muted/10 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="max-w-3xl mb-12">
                <span className="text-xs font-semibold uppercase tracking-widest text-accent-emerald">Selected Readings</span>
                <h2 className="font-serif text-2xl font-light text-primary mt-2">Related Analysis</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map((art) => (
                  <article
                    key={art.slug}
                    className="border border-border bg-background flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="p-6 space-y-4">
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-accent-emerald">
                        {art.category}
                      </span>
                      <h3 className="font-serif text-base font-semibold text-primary hover:text-accent-emerald transition-colors line-clamp-2">
                        <Link href={`/insights/${art.slug}`}>{art.title}</Link>
                      </h3>
                      <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3">
                        {art.summary}
                      </p>
                    </div>
                    <div className="px-6 py-4 border-t border-border bg-muted/10 flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>
                        {new Date(art.datePublished).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span>{art.readingTime}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
