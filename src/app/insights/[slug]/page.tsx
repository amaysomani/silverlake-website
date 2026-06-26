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
        <section className="relative overflow-hidden bg-[#37323C]">
          {/* Background Image */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
            style={{ 
              backgroundImage: `url(${article.featuredImage || 'https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?q=80&w=1920&auto=format&fit=crop'})` 
            }}
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 z-10 bg-[#37323C]/40" />
          
          <div className="mx-auto max-w-[1200px] px-6 lg:px-10 relative z-20">
            <div className="relative flex flex-col pb-14 pt-[120px] lg:min-h-[480px] lg:pt-[220px]">
              <div className="relative">
                <div className="space-y-6 lg:space-y-8 lg:pr-[220px]">
                  {/* Breadcrumbs */}
                  <div className="flex items-center text-sm font-medium tracking-wide text-white/90 hover:text-white transition-colors">
                    <Link href="/" className="hover:underline underline-offset-4">Home</Link>
                    <span className="mx-3">/</span>
                    <Link href="/insights" className="hover:underline underline-offset-4">Insights</Link>
                  </div>

                  <span className="text-sm font-bold uppercase tracking-widest text-white/90 block">
                    {article.category ? article.category.toUpperCase() : "ARTICLE"}
                  </span>
                  <h1 className="font-serif text-[2.25rem] lg:text-[3.25rem] font-normal text-white leading-tight">
                    {article.title}
                  </h1>
                  
                  <div className="flex items-baseline gap-2 text-[0.875rem] font-medium lg:text-[1rem] text-white/90">
                    <span>
                      {new Date(article.datePublished).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span> | </span>
                    <p>{article.readingTime}</p>
                  </div>
                </div>

                {/* Share & Print Buttons */}
                <div className="absolute bottom-[-36px] right-0 lg:bottom-0">
                  <div className="flex gap-4 text-[#37323C]">
                    <button 
                      className="flex items-center justify-center w-[56px] h-[56px] rounded-full bg-white text-[#37323C] hover:bg-[#37323C] hover:text-white transition-colors"
                      aria-label="Share article"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                    <button 
                      className="flex items-center justify-center w-[56px] h-[56px] rounded-full bg-white text-[#37323C] hover:bg-[#37323C] hover:text-white transition-colors"
                      aria-label="Print article"
                    >
                      <Printer className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Layout */}
        <section className="py-20 bg-[#fcfbf9] transition-colors duration-300">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
            <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-10">
              
              {/* Main content: col-span-9 */}
              <div className="col-span-12 lg:col-span-9">
                <div className="space-y-10">
                  
                  {/* Large Introductory Text */}
                  {article.summary && (
                    <div className="font-serif text-[1.75rem] lg:text-[2.25rem] font-normal text-[#37323C] leading-[1.3] mb-8 pb-6 border-b border-gray-100">
                      {article.summary}
                    </div>
                  )}

                  {/* Body Content */}
                  <div
                    className="macfarlanes-rte"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />

                  {/* Tags */}
                  <div className="pt-12 border-t border-gray-200">
                    <div className="flex flex-wrap gap-3">
                      {article.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/insights?tag=${encodeURIComponent(tag)}`}
                          className="text-sm font-medium text-[#444] bg-[#E1E1DC] hover:bg-[#37323C] hover:text-white px-4 py-2 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Sidebar: col-span-3 */}
              <div className="col-span-12 lg:col-span-3 mt-12 lg:mt-0">
                <div className="sticky top-28 space-y-8">
                  {/* Author Box */}
                  <div>
                    <h3 className="font-serif text-[1.25rem] lg:text-[1.5rem] text-[#37323C] font-normal border-b border-gray-200 pb-4 mb-6">
                      Authors
                    </h3>
                    
                    <div className="flex flex-col gap-4">
                      <div className="relative group flex gap-4 lg:flex-col xl:flex-row">
                        {/* Vertical rectangular profile thumbnail */}
                        <div className="w-[103px] h-[131px] lg:w-[114px] lg:h-[132px] shrink-0 overflow-hidden bg-[#E1E1DC] relative">
                          <img 
                            src="/images/office-interior.png" 
                            alt={article.author} 
                            className="object-cover size-full transition-transform duration-500 group-hover:scale-110 opacity-70"
                          />
                          <div className="absolute inset-0 bg-[#37323C]/10 flex items-center justify-center">
                            <span className="font-serif text-[1.5rem] text-[#37323C] font-semibold">SL</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col justify-center gap-1">
                          <p className="text-[1.125rem] font-serif font-bold text-[#37323C] leading-[1.15] hover:underline">
                            {article.author}
                          </p>
                          <p className="text-[0.95rem] text-[#555] font-sans">
                            Silverlake Advisory
                          </p>
                          
                          {/* Social links */}
                          <div className="mt-2 flex items-center gap-2">
                            <a 
                              href="https://www.linkedin.com/company/silverlake-legal-advisors-llp" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex size-8 items-center justify-center rounded-full bg-[#E1E1DC] text-[#37323C] transition-colors hover:bg-[#37323C] hover:text-white"
                              aria-label="LinkedIn"
                            >
                              <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.932617 6.20133H4.39909V17.3346H0.932617V6.20133ZM2.65234 0.667969C3.75901 0.667969 4.65234 1.5613 4.65234 2.66797C4.65234 3.77464 3.75901 4.66797 2.65234 4.66797C1.54568 4.66797 0.652344 3.77464 0.652344 2.66797C0.652344 1.5613 1.54568 0.667969 2.65234 0.667969Z" fill="currentColor" />
                                <path d="M6.55859 6.20182H9.87858V7.72184H9.93197C10.3986 6.84184 11.5186 5.92188 13.1986 5.92188C16.6919 5.92188 17.3451 8.22852 17.3451 11.2285V17.3351H13.8919V11.9219C13.8919 10.6285 13.8651 8.9751 12.0918 8.9751C10.3185 8.9751 10.0117 10.3751 10.0117 11.8285V17.3351H6.55859V6.20182Z" fill="currentColor" />
                              </svg>
                            </a>
                            <Link 
                              href="/contact"
                              className="flex size-8 items-center justify-center rounded-full bg-[#E1E1DC] text-[#37323C] transition-colors hover:bg-[#37323C] hover:text-white text-xs font-semibold font-serif"
                              title="Contact Us"
                            >
                              vC
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                <h2 className="font-serif text-4xl text-[#37323C] font-normal">Related insights</h2>
                <Link 
                  href="/insights" 
                  className="text-base text-[#37323C] border-b border-gray-300 pb-1 hover:border-black transition-colors flex items-center gap-2"
                >
                  View more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map((art) => (
                  <Link 
                    key={art.slug}
                    href={`/insights/${art.slug}`}
                    className="group flex flex-col bg-[#f8f8f8] hover:bg-[#f0f0f0] transition-colors h-full"
                  >
                    <div className="h-[220px] overflow-hidden relative">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${art.featuredImage})` }}
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-serif text-[22px] font-normal text-[#37323C] mb-4 leading-snug">
                        {art.title}
                      </h3>
                      <p className="text-sm text-[#555] leading-relaxed line-clamp-4">
                        {art.summary}
                      </p>
                    </div>
                  </Link>
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
