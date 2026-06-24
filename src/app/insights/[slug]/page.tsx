import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Share2, Printer } from "lucide-react";
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
      "name": "Silverlake Legal Advisors LLP",
      "logo": {
        "@type": "ImageObject",
        "url": "https://silverlakelaw.in/logo.png",
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
        <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-24 overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${article.featuredImage || 'https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?q=80&w=1920&auto=format&fit=crop'})` 
            }}
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 z-10 bg-black/50" />
          
          <div className="mx-auto max-w-[1200px] px-6 lg:px-10 relative z-20 flex flex-col md:flex-row justify-between items-end">
            <div className="space-y-6 max-w-3xl">
              {/* Breadcrumbs */}
              <div className="flex items-center text-sm font-medium tracking-wide text-white/90 hover:text-white transition-colors mb-4">
                <Link href="/" className="hover:underline underline-offset-4">Home</Link>
                <span className="mx-3">/</span>
                <Link href="/insights" className="hover:underline underline-offset-4">Insights</Link>
              </div>

              <span className="text-sm font-bold uppercase tracking-widest text-white block">
                {article.category ? article.category.toUpperCase() : "ARTICLE"}
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-white leading-tight">
                {article.title}
              </h1>
              
              <div className="pt-4 flex items-center gap-2 text-sm font-medium text-white/90">
                <span>
                  {new Date(article.datePublished).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="mx-1">|</span>
                <span>{article.readingTime}</span>
              </div>
            </div>

            {/* Share & Print Buttons */}
            <div className="flex gap-4 mt-8 md:mt-0">
              <button 
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black hover:bg-gray-200 transition-colors"
                aria-label="Share article"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <button 
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black hover:bg-gray-200 transition-colors"
                aria-label="Print article"
              >
                <Printer className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Content Layout */}
        <section className="py-20 bg-white transition-colors duration-300">
          <div className="mx-auto max-w-[900px] px-6">
            <div className="space-y-12">
              
              {/* Large Introductory Text */}
              {article.summary && (
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#222] leading-[1.3]">
                  {article.summary}
                </h2>
              )}

              {/* Body Content */}
              <div
                className="prose prose-lg sm:prose-xl max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:text-[#222] prose-p:text-[#333] prose-p:leading-relaxed prose-a:text-[#222] prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-[#C5A059] prose-strong:text-[#222] prose-li:text-[#333] dark:prose-headings:text-[#222] dark:prose-p:text-[#333] dark:prose-strong:text-[#222] dark:prose-a:text-[#222] dark:prose-li:text-[#333] space-y-8"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Tags */}
              <div className="pt-12 border-t border-gray-200">
                <div className="flex flex-wrap gap-3">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/insights?tag=${encodeURIComponent(tag)}`}
                      className="text-sm font-medium text-[#444] bg-gray-100 hover:bg-gray-200 px-4 py-2 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="py-20 bg-white border-t border-gray-100">
            <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
              <div className="flex justify-between items-baseline mb-12">
                <h2 className="font-serif text-4xl text-[#222] font-normal">Related insights</h2>
                <Link 
                  href="/insights" 
                  className="text-base text-[#222] border-b border-gray-300 pb-1 hover:border-black transition-colors flex items-center gap-2"
                >
                  View more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {relatedArticles.map((art, idx) => {
                  if (idx === 0) {
                    // Large Card (Left)
                    return (
                      <Link 
                        key={art.slug} 
                        href={`/insights/${art.slug}`}
                        className="md:col-span-2 group relative overflow-hidden flex flex-col min-h-[450px]"
                      >
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundImage: `url(${art.featuredImage})` }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-[#35343d] p-8 transition-colors group-hover:bg-[#2a2931]">
                          <h3 className="font-serif text-[28px] font-normal text-white underline decoration-white/40 underline-offset-8 group-hover:decoration-white transition-colors leading-snug">
                            {art.title}
                          </h3>
                        </div>
                      </Link>
                    );
                  } else {
                    // Small Cards (Right)
                    return (
                      <Link 
                        key={art.slug}
                        href={`/insights/${art.slug}`}
                        className="md:col-span-1 group flex flex-col bg-[#f8f8f8] hover:bg-[#f0f0f0] transition-colors h-full"
                      >
                        <div className="h-[220px] overflow-hidden relative">
                          <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${art.featuredImage})` }}
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="font-serif text-[22px] font-normal text-[#222] mb-4 leading-snug">
                            {art.title}
                          </h3>
                          <p className="text-sm text-[#555] leading-relaxed line-clamp-4">
                            {art.summary}
                          </p>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
