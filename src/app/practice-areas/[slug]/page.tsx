import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Building2, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPracticeAreaBySlug, getArticleBySlug } from "@/lib/cms";
import { Article } from "@/lib/types";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const area = await getPracticeAreaBySlug(slug);
  if (!area) return {};

  return {
    title: `${area.name} Practice`,
    description: area.overview,
  };
}

export default async function PracticeAreaDetailPage({ params }: Props) {
  const { slug } = await params;
  const area = await getPracticeAreaBySlug(slug);
  if (!area) {
    notFound();
  }

  // Load related insights articles
  const relatedInsights: Article[] = [];
  for (const artSlug of area.relatedInsightsSlugs) {
    const result = await getArticleBySlug(artSlug);
    if (result) {
      relatedInsights.push(result.article);
    }
  }

  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* Back Link & Hero Header */}
        <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 bg-[#0a0f12] overflow-hidden">
          <div className="absolute inset-0 grain-overlay pointer-events-none" />
          <div className="mx-auto max-w-4xl px-6 relative z-10">
            <Link
              href="/practice-areas"
              className="inline-flex items-center text-xs font-semibold tracking-[0.15em] uppercase text-[#cdcab2]/60 hover:text-[#cdcab2] transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Practices
            </Link>
            <div className="max-w-4xl space-y-4">
              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#cdcab2] block">Practice Group</span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
                {area.name}
              </h1>
              <p className="mt-6 text-base sm:text-lg text-[#e2ddda]/70 leading-relaxed font-light">
                {area.overview}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24 bg-background transition-colors duration-300">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Left Side: Details & Lists */}
              <div className="lg:col-span-8 space-y-12">
                {/* Expertise */}
                <div className="space-y-6">
                  <div className="flex items-center gap-x-3 border-b border-border pb-4">
                    <CheckCircle2 className="h-6 w-6 text-accent-emerald stroke-[1.5]" />
                    <h2 className="font-serif text-2xl font-light text-primary">Core Legal Expertise</h2>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {area.expertise.map((exp) => (
                      <li key={exp.slug} className="flex items-start gap-x-3 text-sm text-muted-foreground">
                        <span className="h-1.5 w-1.5 bg-accent-emerald rounded-full mt-2 flex-shrink-0" />
                        <span>{exp.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Industries */}
                <div className="space-y-6">
                  <div className="flex items-center gap-x-3 border-b border-border pb-4">
                    <Building2 className="h-6 w-6 text-accent-emerald stroke-[1.5]" />
                    <h2 className="font-serif text-2xl font-light text-primary">Key Sectors Served</h2>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {area.industriesServed.map((ind) => (
                      <li key={ind} className="flex items-start gap-x-3 text-sm text-muted-foreground">
                        <span className="h-1.5 w-1.5 bg-accent-emerald rounded-full mt-2 flex-shrink-0" />
                        <span>{ind}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Side: Related Insights Sidebar */}
              <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-border pt-12 lg:pt-0 lg:pl-8 space-y-8">
                <div className="flex items-center gap-x-2 border-b border-border pb-4">
                  <BookOpen className="h-5 w-5 text-accent-emerald stroke-[1.5]" />
                  <h3 className="font-serif text-lg font-medium text-primary">Related Insights</h3>
                </div>

                {relatedInsights.length > 0 ? (
                  <div className="space-y-6">
                    {relatedInsights.map((art) => (
                      <div key={art.slug} className="p-5 border border-border bg-muted/10 hover:bg-background shadow-sm transition-all duration-300">
                        <span className="text-[9px] font-semibold uppercase tracking-widest text-accent-emerald">
                          {art.category}
                        </span>
                        <h4 className="font-serif text-sm font-semibold text-primary mt-2 hover:text-accent-emerald transition-colors line-clamp-2">
                          <Link href={`/insights/${art.slug}`}>{art.title}</Link>
                        </h4>
                        <span className="text-[10px] text-muted-foreground block mt-2">
                          {new Date(art.datePublished).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 border border-dashed border-border text-center">
                    <p className="text-xs text-muted-foreground">No recent articles for this practice group. Check back soon.</p>
                  </div>
                )}
                
                <div className="pt-4">
                  <Link
                    href="/insights"
                    className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-accent-emerald hover:text-primary transition-colors"
                  >
                    View Insights Hub
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
