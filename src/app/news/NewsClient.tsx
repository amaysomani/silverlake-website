"use client";

import * as React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { NewsItem } from "@/lib/types";

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface NewsClientProps {
  initialNews: NewsItem[];
  initialPagination: Pagination;
  category: string;
}

const categories = ["All", "Announcement", "Award", "Press Release", "Event"];

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

export default function NewsClient({
  initialNews,
  initialPagination,
  category,
}: NewsClientProps) {
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
            <motion.span variants={fadeInUp} className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#cdcab2] block">Firm Updates</motion.span>
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[0.95]"
              >
                News & Press
              </motion.h1>
            </div>
            <motion.p variants={fadeInUp} className="mt-4 text-sm text-[#e2ddda]/60 leading-relaxed max-w-2xl font-light">
              Stay updated with Silverlake&apos;s firm announcements, awards, press releases, and global events participation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter Bar - Warm Star Dust (#f9f3f1) Background */}
      <section className="border-b border-border bg-[#f9f3f1] py-6 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = category === cat || (cat === "All" && !category);
              const href = cat === "All" 
                ? "/news" 
                : `/news?category=${encodeURIComponent(cat)}`;
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
        </div>
      </section>

      {/* News Items list - Warm Star Dust (#f9f3f1) Background */}
      <section className="py-20 bg-[#f9f3f1] transition-colors duration-300">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {initialNews.length > 0 ? (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-12"
            >
              {initialNews.map((item) => (
                <motion.article
                  key={item.slug}
                  variants={fadeInUp}
                  className="border border-[#cdcab2] p-8 bg-[#fffaf8] hover:shadow-xl transition-all duration-500 grid grid-cols-1 md:grid-cols-4 gap-6 items-baseline group"
                >
                  {/* Date and Category info */}
                  <div className="md:col-span-1 space-y-2 border-b md:border-b-0 md:border-r border-[#cdcab2]/40 pb-4 md:pb-0 md:pr-6">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#517380] block">
                      {item.category}
                    </span>
                    <span className="flex items-center text-xs text-[#757575]">
                      <Calendar className="mr-1.5 h-3.5 w-3.5 text-[#757575]" />
                      {new Date(item.datePublished).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Headline and Summary info */}
                  <div className="md:col-span-3 space-y-3">
                    <h2 className="font-serif text-xl font-medium text-[#111111] group-hover:text-[#1c3e4e] transition-colors leading-snug">
                      <Link href={`/news/${item.slug}`}>{item.headline}</Link>
                    </h2>
                    <p className="text-xs sm:text-sm text-[#757575] leading-relaxed">
                      {item.summary}
                    </p>
                    <div className="pt-2">
                      <Link
                        href={`/news/${item.slug}`}
                        className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#1c3e4e] group-hover:text-[#111111] transition-colors"
                      >
                        Read Announcement
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16 border border-dashed border-[#cdcab2] max-w-md mx-auto bg-[#fffaf8]">
              <p className="text-sm text-[#757575]">No news updates match your selection.</p>
              <div className="mt-4">
                <Link
                  href="/news"
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
                    href={`/news?page=${initialPagination.page - 1}${category !== "All" ? `&category=${category}` : ""}`}
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
                    href={`/news?page=${initialPagination.page + 1}${category !== "All" ? `&category=${category}` : ""}`}
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
                        href={`/news?page=${p}${category !== "All" ? `&category=${category}` : ""}`}
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
