import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getNewsBySlug } from "@/lib/cms";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return {};

  return {
    title: item.headline,
    description: item.summary,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* Navigation & Header */}
        <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 bg-[#0a0f12] overflow-hidden">
          <div className="absolute inset-0 grain-overlay pointer-events-none" />
          <div className="mx-auto max-w-4xl px-6 relative z-10">
            <Link
              href="/news"
              className="inline-flex items-center text-xs font-semibold tracking-[0.15em] uppercase text-[#cdcab2]/60 hover:text-[#cdcab2] transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Updates
            </Link>

            <div className="space-y-4">
              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#cdcab2] block">
                {item.category}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-white leading-tight">
                {item.headline}
              </h1>
              
              {/* Metadata row */}
              <div className="pt-6 flex items-center gap-x-4 text-xs text-[#e2ddda]/40 border-t border-white/5">
                <span className="flex items-center gap-x-1.5">
                  <Calendar className="h-4 w-4 text-[#cdcab2]/60" />
                  {new Date(item.datePublished).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Layout */}
        <section className="py-16 bg-background transition-colors duration-300">
          <div className="mx-auto max-w-3xl px-6">
            <div className="space-y-6">
              {/* Summary / Excerpt */}
              <p className="text-base sm:text-lg font-light text-muted-foreground border-l-4 border-accent-emerald pl-6 italic leading-relaxed">
                {item.summary}
              </p>

              {/* Body Content */}
              <div
                className="prose prose-sm sm:prose max-w-none dark:prose-invert prose-headings:font-serif prose-headings:font-light prose-headings:text-primary prose-a:text-accent-emerald hover:prose-a:text-primary leading-relaxed text-muted-foreground space-y-6"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
