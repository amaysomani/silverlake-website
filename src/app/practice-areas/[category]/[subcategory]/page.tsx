import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPracticeAreas } from "@/lib/cms";

interface Props {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { category, subcategory } = await params;
  const practiceAreas = await getPracticeAreas();
  const area = practiceAreas.find((a) => a.slug === category);
  if (!area) return {};
  
  const subArea = area.expertise.find((e) => e.slug === subcategory);
  if (!subArea) return {};

  return {
    title: `${subArea.title} - ${area.name}`,
    description: subArea.content.substring(0, 160),
  };
}

export default async function SubPracticePage({ params }: Props) {
  const { category, subcategory } = await params;
  const practiceAreas = await getPracticeAreas();
  const area = practiceAreas.find((a) => a.slug === category);
  if (!area) notFound();
  
  const subArea = area.expertise.find((e) => e.slug === subcategory);
  if (!subArea) notFound();

  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* Cinematic Header */}
        <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-[#0a0f12] overflow-hidden">
          <div className="absolute inset-0 grain-overlay pointer-events-none" />
          <div className="mx-auto max-w-4xl px-6 relative z-10">
            <Link
              href="/practice-areas"
              className="inline-flex items-center text-xs font-semibold tracking-[0.15em] uppercase text-[#cdcab2]/60 hover:text-[#cdcab2] transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Services
            </Link>
            <div className="max-w-4xl space-y-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#cdcab2] block">{area.name}</span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.1]">
                {subArea.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24 bg-[#fcfbf9] min-h-[50vh]">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="prose prose-lg prose-neutral max-w-none">
              <p className="text-[20px] lg:text-[24px] font-serif font-light text-[#333] leading-[1.6]">
                {subArea.content}
              </p>
            </div>
            
            <div className="mt-20 pt-10 border-t border-[#222]/10">
              <h3 className="font-serif text-2xl text-[#111] mb-8">Other areas in {area.name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {area.expertise.filter((e) => e.slug !== subArea.slug).map((exp) => (
                  <Link 
                    key={exp.slug} 
                    href={`/practice-areas/${area.slug}/${exp.slug}`}
                    className="group flex justify-between items-center text-base text-[#444] border-b border-[#222]/20 pb-3 hover:border-[#222] hover:text-[#111] transition-colors"
                  >
                    {exp.title}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
