"use client";

import * as React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";
import { Article } from "@/lib/types";

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface InsightsClientProps {
  initialArticles: Article[];
  initialPagination: Pagination;
  search: string;
  category: string;
  tag: string;
}

const categories = ["All", "Investor Intelligence", "Fund Regulation", "Private Capital"];

// Animation Variants for Cascading Stagger Effects
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export default function InsightsClient({
  initialArticles,
  initialPagination,
  search,
  category,
  tag,
}: InsightsClientProps) {
  return (
    <div className="flex-grow">
      {/* Cinematic Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-[#0a0f12] overflow-hidden">
        <div className="absolute inset-0 grain-overlay pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl space-y-5"
          >
            <motion.span variants={fadeInUp} className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#cdcab2] block">Thought Leadership</motion.span>
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[0.95]"
              >
                Silverlake Insights
              </motion.h1>
            </div>
            <motion.p variants={fadeInUp} className="mt-4 text-sm text-[#e2ddda]/60 leading-relaxed max-w-2xl font-light">
              Expert legal analysis and strategic commentary on private capital markets, regulatory reforms, tax structures, and technology. Our editorial design focuses on clarity, depth, and precision.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Search Bar - Warm Star Dust (#f9f3f1) Background */}
      <section className="border-b border-border bg-[#f9f3f1] py-6 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = category === cat || (cat === "All" && !category);
                const href = cat === "All" 
                  ? `/insights${search ? `?search=${encodeURIComponent(search)}` : ""}` 
                  : `/insights?category=${encodeURIComponent(cat)}${search ? `&search=${encodeURIComponent(search)}` : ""}`;
                return (
                  <Link
                    key={cat}
                    href={href}
                    className={`text-xs font-semibold uppercase tracking-wider px-4 py-2 border transition-all duration-300 ${
                      isActive
                        ? "bg-[#1c3e4e] border-[#1c3e4e] text-white"
                        : "border-[#cdcab2] text-[#757575] hover:border-[#1c3e4e] hover:text-[#1c3e4e]"
                    }`}
                  >
                    {cat}
                  </Link>
                );
              })}
            </div>

            {/* Search Form */}
            <form action="/insights" method="GET" className="relative max-w-md w-full">
              {category !== "All" && (
                <input type="hidden" name="category" value={category} />
              )}
              {tag && <input type="hidden" name="tag" value={tag} />}
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search articles..."
                className="w-full border border-[#cdcab2] bg-[#fffaf8] pl-10 pr-4 py-2 text-sm text-[#111111] placeholder-[#757575]/50 focus:outline-none focus:border-[#1c3e4e] transition-colors"
              />
              <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-[#757575]" />
            </form>
          </div>
        </div>
      </section>

      {/* Article Feed - Warm Star Dust (#f9f3f1) Background */}
      <section className="py-20 bg-[#f9f3f1] transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {initialArticles.length > 0 ? (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {initialArticles.map((art) => (
                <motion.article
                  key={art.slug}
                  variants={fadeInUp}
                  className="border border-[#cdcab2] bg-[#fffaf8] flex flex-col justify-between hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="p-8 space-y-4">
                    <div className="flex items-center gap-x-2 text-[10px] font-semibold uppercase tracking-widest text-[#517380]">
                      <span>{art.category}</span>
                    </div>
                    <h2 className="font-serif text-xl font-light text-[#111111] hover:text-[#1c3e4e] transition-colors line-clamp-2">
                      <Link href={`/insights/${art.slug}`}>{art.title}</Link>
                    </h2>
                    <p className="text-xs text-[#757575] leading-relaxed line-clamp-3">
                      {art.summary}
                    </p>
                  </div>

                  {/* Metadata bar */}
                  <div className="px-8 py-5 border-t border-[#cdcab2]/40 bg-[#e2ddda]/30 flex flex-col gap-y-2">
                    <div className="flex items-center justify-between text-[10px] text-[#757575] uppercase tracking-wider font-semibold">
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-3.5 w-3.5 text-[#517380]" />
                        {new Date(art.datePublished).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center">
                        <Clock className="mr-1 h-3.5 w-3.5 text-[#517380]" />
                        {art.readingTime}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-[#cdcab2]/20 flex items-center justify-between">
                      <span className="text-[10px] text-[#757575]/80 font-medium">By {art.author}</span>
                      <Link
                        href={`/insights/${art.slug}`}
                        className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#1c3e4e] hover:text-[#111111] transition-colors"
                      >
                        Read More
                        <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16 border border-dashed border-[#cdcab2] max-w-xl mx-auto bg-[#fffaf8]">
              <p className="text-sm text-[#757575]">No articles match your selection. Try adjusting filters or search term.</p>
              <div className="mt-4">
                <Link
                  href="/insights"
                  className="text-xs font-semibold uppercase tracking-widest text-[#1c3e4e] hover:underline"
                >
                  Reset Filters
                </Link>
              </div>
            </div>
          )}

          {/* Pagination Controls */}
          {initialPagination.totalPages > 1 && (
            <div className="mt-16 border-t border-[#cdcab2]/40 pt-6 flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                {initialPagination.page > 1 ? (
                  <Link
                    href={`/insights?page=${initialPagination.page - 1}${category !== "All" ? `&category=${category}` : ""}${search ? `&search=${search}` : ""}${tag ? `&tag=${tag}` : ""}`}
                    className="border border-[#cdcab2] px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#fffaf8] text-[#111111]"
                  >
                    Previous
                  </Link>
                ) : (
                  <span className="border border-[#cdcab2] opacity-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider cursor-not-allowed bg-[#fffaf8] text-[#757575]">
                    Previous
                  </span>
                )}
                {initialPagination.page < initialPagination.totalPages ? (
                  <Link
                    href={`/insights?page=${initialPagination.page + 1}${category !== "All" ? `&category=${category}` : ""}${search ? `&search=${search}` : ""}${tag ? `&tag=${tag}` : ""}`}
                    className="border border-[#cdcab2] px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#fffaf8] text-[#111111]"
                  >
                    Next
                  </Link>
                ) : (
                  <span className="border border-[#cdcab2] opacity-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider cursor-not-allowed bg-[#fffaf8] text-[#757575]">
                    Next
                  </span>
                )}
              </div>
              <div className="hidden sm:flex-grow sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs text-[#757575]">
                    Showing page <span className="font-semibold text-[#111111]">{initialPagination.page}</span> of <span className="font-semibold text-[#111111]">{initialPagination.totalPages}</span>
                  </p>
                </div>
                <div className="flex gap-x-2">
                  {Array.from({ length: initialPagination.totalPages }).map((_, i) => {
                    const p = i + 1;
                    const isActive = initialPagination.page === p;
                    return (
                      <Link
                        key={p}
                        href={`/insights?page=${p}${category !== "All" ? `&category=${category}` : ""}${search ? `&search=${search}` : ""}${tag ? `&tag=${tag}` : ""}`}
                        className={`text-xs font-semibold uppercase tracking-wider px-3.5 py-2 border ${
                          isActive
                            ? "bg-[#1c3e4e] border-[#1c3e4e] text-white"
                            : "border-[#cdcab2] text-[#757575] hover:border-[#1c3e4e] bg-[#fffaf8]"
                        }`}
                      >
                        {p}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
