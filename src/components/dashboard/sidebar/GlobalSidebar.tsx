"use client";

import React from "react";
import { Grid, BarChart2, Star, FileText, Share2, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GlobalSidebar() {
  const pathname = usePathname();

  const navItems = [
    { icon: Grid, label: "Overview", href: "/dashboard" },
    { icon: BarChart2, label: "Insights", href: "/dashboard/insights" },
    { icon: Star, label: "Engagements", href: "/dashboard/engagements" },
    { icon: FileText, label: "Invoices", href: "/dashboard/invoices" },
    { icon: Share2, label: "Workflows", href: "/dashboard/workflows" },
    { icon: Users, label: "Team", href: "/dashboard/team" },
  ];

  return (
    <div className="w-[160px] md:w-[180px] shrink-0 border-r border-[#1f2937] flex flex-col p-3.5 bg-[#080c14] relative justify-between h-full">
      {/* Glow decoration */}
      <div className="absolute bottom-0 left-0 w-full h-[120px] bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none blur-xl" />

      <div className="flex flex-col gap-1 mt-2 relative z-10">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
          
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`px-3 py-2 rounded-lg flex items-center gap-3 transition-colors cursor-pointer ${
                isActive
                  ? "bg-[#1f2937]/50 border border-white/5 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                  : "text-white/40 hover:text-white/80"
              }`}
            >
              <item.icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-400" : ""}`} />
              <span className="text-[12px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Small glowing dot decoration */}
      <div className="w-2 h-2 rounded-full bg-blue-500/80 shadow-[0_0_10px_rgba(59,130,246,0.8)] ml-3 mb-2 animate-pulse relative z-10" />
    </div>
  );
}
