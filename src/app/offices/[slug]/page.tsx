import { notFound } from "next/navigation";
import { getOfficeBySlug, getOffices } from "@/lib/cms";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  const offices = await getOffices();
  return offices.map((office) => ({
    slug: office.slug,
  }));
}

export default async function OfficePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const office = await getOfficeBySlug(slug);

  if (!office) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="bg-[#fcfbf9] min-h-screen pt-24 pb-32">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full mb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={office.heroImage}
            alt={`${office.name} Office`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-end pb-20">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 w-full">
            <h1 className="font-serif text-6xl md:text-8xl text-white font-light tracking-wide">
              {office.name}
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Main Description */}
          <div className="lg:col-span-7 lg:col-start-2">
            <h2 className="text-3xl md:text-4xl font-serif text-[#111] leading-snug mb-12">
              {office.description}
            </h2>
            <div className="h-px w-24 bg-[#111] mb-12"></div>
            <p className="text-[17px] text-[#444] leading-relaxed font-light mb-8">
              Our {office.name} hub represents a critical component of Silverlake's global footprint, bridging complex local regulatory requirements with seamless international corporate strategy. We provide clients with the highest caliber of legal advice, rooted in deep regional expertise and synchronized perfectly with our wider international network.
            </p>
            <p className="text-[17px] text-[#444] leading-relaxed font-light">
              We leverage our extensive industry knowledge and strategic positioning in {office.name} to accelerate our clients' commercial objectives, whether facilitating high-stakes cross-border transactions, managing sensitive disputes, or providing structural insights for private capital investments.
            </p>
          </div>

          {/* Contact Details Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#111] mb-8">
                Contact details
              </h3>
              
              <div className="space-y-8">
                <div>
                  {office.phone.split(', ').map((p, idx) => (
                    <div key={idx} className="flex items-center gap-3 mb-2">
                      <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                      <a href={`tel:${p.replace(/\s/g, '').replace(/[()]/g, '')}`} className="text-[14px] text-[#444] hover:text-[#C5A059] transition-colors">
                        {p}
                      </a>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <a href={`mailto:${office.email}`} className="text-[14px] text-[#444] hover:text-[#C5A059] transition-colors">
                      {office.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/about"
                className="group flex items-center justify-between bg-[#111] text-white px-6 py-4 hover:bg-[#333] transition-colors w-full"
              >
                <span className="text-xs font-bold uppercase tracking-[0.15em]">Our global network</span>
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </main>
      <Footer />
    </>
  );
}
