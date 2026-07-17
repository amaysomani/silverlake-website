import React from "react";
import Link from "next/link";
import { trueBrainModules } from "@/lib/dashboard/moduleConfig";
import { Users, TrendingUp, MessageSquare, Globe } from "lucide-react";

export default function DashboardEntryPage() {
  const getIcon = (id: string) => {
    switch (id) {
      case "recruitment-intelligence": return <Users className="w-8 h-8 text-blue-400" />;
      case "growth-strategy": return <TrendingUp className="w-8 h-8 text-purple-400" />;
      case "corporate-communications": return <MessageSquare className="w-8 h-8 text-cyan-400" />;
      case "public-relations": return <Globe className="w-8 h-8 text-orange-400" />;
      default: return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-12 bg-gradient-to-b from-[#0B0F19] to-[#0a0d14]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-serif text-white/90 mb-4 tracking-wide">TrueBrain Hub</h1>
          <p className="text-white/40 max-w-2xl text-sm leading-relaxed">
            Select an intelligence module to access AI-powered workflows, evidence-based recommendations, and strategy execution tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {trueBrainModules.map((module) => (
            <Link 
              key={module.id} 
              href={`/dashboard/${module.id}`}
              className="bg-[#1f2937]/30 border border-white/5 rounded-2xl p-6 flex flex-col hover:bg-[#1f2937]/50 hover:-translate-y-1 transition-all group shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
            >
              <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 group-hover:scale-105 transition-transform">
                {getIcon(module.id)}
              </div>
              
              <h2 className="text-lg font-serif text-white/90 mb-3">{module.title}</h2>
              <p className="text-xs text-white/40 leading-relaxed mb-6 flex-1">
                {module.description}
              </p>
              
              <div className="text-[11px] font-medium text-blue-400 uppercase tracking-wider group-hover:text-blue-300 transition-colors flex items-center gap-2">
                Open Workspace &rarr;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
