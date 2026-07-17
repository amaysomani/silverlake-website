"use client";

import React, { useState, useEffect } from "react";
import {
  Grid, BarChart2, Star, FileText, Share2, Users, Plus, ChevronRight,
  TrendingUp, Zap, Scroll, Globe, PenTool, Scale, Coins, LayoutDashboard, Database, ShieldCheck, AlertCircle,
  PieChart as LucidePieChart, Shield, Calendar, Activity, Search
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis,
  BarChart, Bar, ScatterChart, Scatter, ZAxis, Legend,
  ComposedChart, Line
} from "recharts";

interface ModuleDashboardProps {
  moduleId: string;
  themeColors: string[];
}

const formatModuleName = (id: string) => {
  return id.split('-').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
};

export default function TrueBrainModuleDashboard({ moduleId, themeColors }: ModuleDashboardProps) {
  const scrollToContact = () => {
    document.querySelector('.inno-snap-container')?.scrollTo({ top: 9999, behavior: 'smooth' });
  };
  const [activeSubtab, setActiveSubtab] = useState<string | null>(null);

  useEffect(() => {
    setActiveSubtab(null);
  }, [moduleId]);

  const primaryColor = themeColors[0] || "#3b82f6";
  const secondaryColor = themeColors[1] || "#8b5cf6";
  const tertiaryColor = themeColors[2] || "#ec4899";
  const quaternaryColor = themeColors[3] || "#14b8a6";

  const renderChart = () => {
    switch (moduleId) {
      case "recruitment": {
        const data = [
          { name: "Awareness", candidates: 5000 },
          { name: "Consideration", candidates: 1200 },
          { name: "Application", candidates: 300 },
          { name: "Interview", candidates: 85 },
          { name: "Offer", candidates: 20 }
        ];
        return (
          <div className="w-full h-[260px] flex flex-col">
             <div className="mb-4 ml-4">
                <div className="text-[12px] text-white/50 mb-1">Candidate Journey Pipeline</div>
                <div className="text-xl font-serif text-white">Conversion Metrics</div>
             </div>
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, left: 60, bottom: 20 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" horizontal={false} />
                 <XAxis type="number" stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} />
                 <YAxis dataKey="name" type="category" stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} width={80} />
                 <Tooltip contentStyle={{ backgroundColor: '#131b2c', borderColor: '#ffffff15', borderRadius: '6px' }} cursor={{fill: '#ffffff05'}} />
                 <Bar dataKey="candidates" fill={primaryColor} radius={[0, 4, 4, 0]} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        );
      }
      case "growth-strategy": {
        const data = [
          { name: "TrueBrain", price: 85, differentiation: 95, market: 1000 },
          { name: "Comp A", price: 40, differentiation: 50, market: 3000 },
          { name: "Comp B", price: 70, differentiation: 60, market: 5000 },
          { name: "Comp C", price: 90, differentiation: 80, market: 800 }
        ];
        return (
          <div className="w-full h-[260px] flex flex-col">
             <div className="mb-2 ml-4">
                <div className="text-[12px] text-white/50 mb-1">Competitor Matrix</div>
                <div className="text-xl font-serif text-white">Price vs Differentiation</div>
             </div>
             <ResponsiveContainer width="100%" height="100%">
               <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                 <XAxis type="number" dataKey="price" name="Pricing Index" stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} label={{ value: 'Pricing Index', position: 'insideBottom', offset: -15, fill: '#ffffff50', fontSize: 10 }} />
                 <YAxis type="number" dataKey="differentiation" name="Differentiation" stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} label={{ value: 'Brand Differentiation', angle: -90, position: 'insideLeft', offset: 0, fill: '#ffffff50', fontSize: 10 }} />
                 <ZAxis type="number" dataKey="market" range={[100, 1000]} />
                 <Tooltip cursor={{strokeDasharray: '3 3'}} contentStyle={{ backgroundColor: '#131b2c', borderColor: '#ffffff15', borderRadius: '6px' }} />
                 <Scatter name="Brands" data={data} fill={secondaryColor} fillOpacity={0.6}>
                    {data.map((e, i) => <Cell key={i} fill={e.name === 'TrueBrain' ? primaryColor : secondaryColor} />)}
                 </Scatter>
               </ScatterChart>
             </ResponsiveContainer>
          </div>
        );
      }
      case "corporate-communications": {
        const data = [
          { category: 'Employees', Sentiment: 85, Target: 100, fullMark: 100 },
          { category: 'Investors', Sentiment: 92, Target: 100, fullMark: 100 },
          { category: 'Media', Sentiment: 78, Target: 100, fullMark: 100 },
          { category: 'Public', Sentiment: 70, Target: 100, fullMark: 100 },
          { category: 'Regulators', Sentiment: 88, Target: 100, fullMark: 100 },
        ];
        return (
          <div className="flex w-full h-[260px]">
             <div className="w-1/3 flex flex-col justify-center pl-4">
                <div className="text-[12px] text-white/50 mb-1">Stakeholder Intelligence</div>
                <div className="text-3xl font-serif text-white tracking-wide">82.6</div>
                <div className="text-[11px] text-white/40 mt-2">Overall Stakeholder Sentiment Score vs Target.</div>
             </div>
             <div className="flex-1 h-full">
               <ResponsiveContainer width="100%" height="100%">
                 <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
                   <PolarGrid stroke="#ffffff15" />
                   <PolarAngleAxis dataKey="category" tick={{ fill: '#ffffff80', fontSize: 11 }} />
                   <Radar name="Current Sentiment" dataKey="Sentiment" stroke={primaryColor} fill={primaryColor} fillOpacity={0.4} strokeWidth={2} />
                   <Radar name="Target" dataKey="Target" stroke={secondaryColor} fill={secondaryColor} fillOpacity={0.1} strokeWidth={1} strokeDasharray="3 3" />
                   <Tooltip contentStyle={{ backgroundColor: '#131b2c', borderColor: '#ffffff15', borderRadius: '6px', fontSize: '11px' }} />
                 </RadarChart>
               </ResponsiveContainer>
             </div>
          </div>
        );
      }
      case "public-relations": {
        const data = [
          { name: "Week 1", mentions: 120, positive: 80, negative: 10 },
          { name: "Week 2", mentions: 150, positive: 110, negative: 5 },
          { name: "Week 3", mentions: 300, positive: 250, negative: 15 },
          { name: "Week 4", mentions: 220, positive: 180, negative: 10 },
        ];
        return (
          <div className="w-full h-[260px] flex flex-col">
             <div className="mb-4 ml-4">
                <div className="text-[12px] text-white/50 mb-1">Coverage & Reputation</div>
                <div className="text-xl font-serif text-white">Media Sentiment Trends</div>
             </div>
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                 <XAxis dataKey="name" stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} />
                 <YAxis stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} />
                 <Tooltip contentStyle={{ backgroundColor: '#131b2c', borderColor: '#ffffff15', borderRadius: '6px' }} />
                 <Area type="monotone" dataKey="mentions" stackId="1" stroke={tertiaryColor} fill={tertiaryColor} fillOpacity={0.1} />
                 <Area type="monotone" dataKey="negative" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.4} />
                 <Area type="monotone" dataKey="positive" stackId="3" stroke={primaryColor} fill={primaryColor} fillOpacity={0.4} />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        );
      }
      default: {
        return <div className="text-white/40 flex items-center justify-center h-full">Select a module to view dashboard.</div>;
      }
    }
  };

  const renderSidebarItems = () => {
    switch (moduleId) {
      case "recruitment":
        return (
          <>
             <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-3 mb-1 px-3">// Capabilities</div>
             {[
               { name: "Employer Brand Audit", icon: FileText },
               { name: "Talent Narrative", icon: PenTool },
               { name: "Candidate Journey", icon: Grid },
               { name: "Employee Communications", icon: Users },
               { name: "Talent Campaigns", icon: Globe }
             ].map((item) => {
               const Icon = item.icon;
               const isActive = activeSubtab === item.name;
               return (
                 <div
                   key={item.name}
                   onClick={() => setActiveSubtab(item.name)}
                   className={`px-3 py-1.5 rounded-lg flex items-center gap-3 cursor-pointer transition-all ${
                     isActive 
                       ? "bg-[#1f2937]/30 border border-white/5 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                       : "text-white/40 hover:text-white/80"
                   }`}
                 >
                   <Icon className="w-3.5 h-3.5 opacity-80 text-blue-400" />
                   <span className="text-[12px] truncate">{item.name}</span>
                 </div>
               );
             })}
          </>
        );
      case "growth-strategy":
        return (
          <>
             <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-3 mb-1 px-3">// Capabilities</div>
             {[
               { name: "Brand Intelligence", icon: Search },
               { name: "Competitor Matrix", icon: Grid },
               { name: "Strategic Narrative", icon: PenTool },
               { name: "Growth Opportunities", icon: TrendingUp },
               { name: "Campaign Roadmap", icon: Calendar }
             ].map((item) => {
               const Icon = item.icon;
               const isActive = activeSubtab === item.name;
               return (
                 <div
                   key={item.name}
                   onClick={() => setActiveSubtab(item.name)}
                   className={`px-3 py-1.5 rounded-lg flex items-center gap-3 cursor-pointer transition-all ${
                     isActive 
                       ? "bg-[#1f2937]/30 border border-white/5 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                       : "text-white/40 hover:text-white/80"
                   }`}
                 >
                   <Icon className="w-3.5 h-3.5 opacity-80 text-purple-400" />
                   <span className="text-[12px] truncate">{item.name}</span>
                 </div>
               );
             })}
          </>
        );
      case "corporate-communications":
        return (
          <>
             <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-3 mb-1 px-3">// Capabilities</div>
             {[
               { name: "Stakeholder Intelligence", icon: Users },
               { name: "Corporate Narrative", icon: PenTool },
               { name: "Executive Office", icon: ShieldCheck },
               { name: "Internal Communications", icon: Share2 },
               { name: "Crisis & Reputation", icon: AlertCircle }
             ].map((item) => {
               const Icon = item.icon;
               const isActive = activeSubtab === item.name;
               return (
                 <div
                   key={item.name}
                   onClick={() => setActiveSubtab(item.name)}
                   className={`px-3 py-1.5 rounded-lg flex items-center gap-3 cursor-pointer transition-all ${
                     isActive 
                       ? "bg-[#1f2937]/30 border border-white/5 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                       : "text-white/40 hover:text-white/80"
                   }`}
                 >
                   <Icon className="w-3.5 h-3.5 opacity-80 text-cyan-400" />
                   <span className="text-[12px] truncate">{item.name}</span>
                 </div>
               );
             })}
          </>
        );
      case "public-relations":
        return (
          <>
             <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-3 mb-1 px-3">// Capabilities</div>
             {[
               { name: "PR Strategy", icon: Zap },
               { name: "Media Relations", icon: Globe },
               { name: "Newsroom", icon: LayoutDashboard },
               { name: "Thought Leadership", icon: Star },
               { name: "Coverage & Reputation", icon: Activity }
             ].map((item) => {
               const Icon = item.icon;
               const isActive = activeSubtab === item.name;
               return (
                 <div
                   key={item.name}
                   onClick={() => setActiveSubtab(item.name)}
                   className={`px-3 py-1.5 rounded-lg flex items-center gap-3 cursor-pointer transition-all ${
                     isActive 
                       ? "bg-[#1f2937]/30 border border-white/5 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                       : "text-white/40 hover:text-white/80"
                   }`}
                 >
                   <Icon className="w-3.5 h-3.5 opacity-80 text-orange-400" />
                   <span className="text-[12px] truncate">{item.name}</span>
                 </div>
               );
             })}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex bg-[#0B0F19] text-white font-sans overflow-hidden">
      {/* LEFT SIDEBAR (REMOVED ARNO LOGO/NAME) */}
      <div className="w-[180px] md:w-[240px] shrink-0 border-r border-[#1f2937] flex flex-col p-3.5 bg-[#080c14] relative justify-between h-full">
         {/* Glow decoration */}
         <div className="absolute bottom-0 left-0 w-full h-[120px] bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none blur-xl" />
         
         <div className="flex flex-col gap-1 mt-2 overflow-y-auto no-scrollbar flex-1 pr-1 relative z-10">
            <div 
              onClick={() => setActiveSubtab(null)}
              className={`px-3 py-2 rounded-lg flex items-center gap-3 cursor-pointer transition-all ${
                activeSubtab === null 
                  ? "bg-[#1f2937]/50 border border-white/5 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                  : "text-white/40 hover:text-white/80"
              }`}
            >
               <Grid className="w-3.5 h-3.5 text-blue-400 shrink-0" />
               <span className="text-[12px] font-medium truncate">{formatModuleName(moduleId)}</span>
            </div>

            {renderSidebarItems()}
         </div>
      </div>

      {/* RIGHT MAIN PANEL */}
      <div className="flex-1 flex flex-col min-w-0">
         {/* TOP HEADER */}
         <div className="h-14 border-b border-[#1f2937] flex items-center justify-between px-6 md:px-10 shrink-0">
            <h2 className="text-[13px] md:text-[14px] font-serif text-white/80 tracking-wide">TrueBrain Consulting LLP</h2>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded text-[12px] font-medium text-blue-300 bg-blue-900/20 border border-blue-500/20 hover:bg-blue-900/40 transition-colors">
               <Plus className="w-3.5 h-3.5" />
               Initiate workflow
            </button>
         </div>

         {/* CONTENT */}
         <div className="flex-1 overflow-y-auto no-scrollbar p-6 lg:p-10 bg-gradient-to-b from-[#0B0F19] to-[#0a0d14] relative">
            {/* Top Stats & Charts Row */}
            <div className="bg-[#111827]/40 border border-[#1f2937]/80 rounded-xl p-6">
               <div className="flex justify-end items-center mb-8">
                  <button className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium tracking-wide">
                     View all <ChevronRight className="w-3 h-3" />
                  </button>
               </div>
               
               {renderChart()}
            </div>
         </div>
      </div>
    </div>
  );
}
