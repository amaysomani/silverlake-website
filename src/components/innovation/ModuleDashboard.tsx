"use client";

import React, { useState, useEffect } from "react";
import {
  Grid, BarChart2, Star, FileText, Share2, Users, Plus, ChevronRight,
  TrendingUp, Zap, Scroll, Globe, PenTool, Scale, Coins, LayoutDashboard, Database, ShieldCheck, AlertCircle,
  PieChart as LucidePieChart, Shield, Calendar, Activity
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
    const upper = word.toUpperCase();
    if (upper === "LP" || upper === "SPV" || upper === "IP" || upper === "DD") return upper;
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
};

export default function ModuleDashboard({ moduleId, themeColors }: ModuleDashboardProps) {
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
      case "sector-intel": {
        const data = [
          { name: "Q1", funding: 1.2, deals: 45 }, { name: "Q2", funding: 1.8, deals: 60 },
          { name: "Q3", funding: 1.4, deals: 50 }, { name: "Q4", funding: 2.5, deals: 85 },
          { name: "Q1 (Est)", funding: 3.1, deals: 110 }
        ];
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-[260px]">
            <div className="flex flex-col h-full relative">
               <div className="mb-4">
                  <div className="text-[12px] text-white/50 mb-1">Capital Deployed</div>
                  <div className="text-2xl font-serif text-white tracking-wide">$10.0B</div>
               </div>
               <div className="flex-1 min-h-[140px] relative z-10 w-full -ml-4">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                     <defs>
                       <linearGradient id="colorFunding" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="0%" stopColor={primaryColor} stopOpacity={0.8}/>
                         <stop offset="100%" stopColor={primaryColor} stopOpacity={0.05}/>
                       </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                     <XAxis dataKey="name" stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} label={{ value: 'Time (Quarter)', position: 'insideBottom', offset: -15, fill: '#ffffff50', fontSize: 10 }} />
                     <YAxis stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}B`} label={{ value: 'Capital Deployed ($B)', angle: -90, position: 'insideLeft', offset: -5, fill: '#ffffff50', fontSize: 10 }} />
                     <Tooltip contentStyle={{ backgroundColor: '#131b2c', borderColor: '#ffffff15', borderRadius: '6px', fontSize: '11px' }} />
                     <Area type="monotone" dataKey="funding" stroke={primaryColor} strokeWidth={2} fillOpacity={1} fill="url(#colorFunding)" activeDot={{ r: 4, fill: '#fff', stroke: primaryColor }} />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
            </div>
            <div className="flex flex-col h-full relative">
               <div className="mb-4">
                  <div className="text-[12px] text-white/50 mb-1">Deal Volume</div>
                  <div className="text-2xl font-serif text-white tracking-wide">350 Rounds</div>
               </div>
               <div className="flex-1 min-h-[140px] relative z-10 w-full -ml-4">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                     <defs>
                       <linearGradient id="colorDeals" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="0%" stopColor={secondaryColor} stopOpacity={0.8}/>
                         <stop offset="100%" stopColor={secondaryColor} stopOpacity={0.05}/>
                       </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                     <XAxis dataKey="name" stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} label={{ value: 'Time (Quarter)', position: 'insideBottom', offset: -15, fill: '#ffffff50', fontSize: 10 }} />
                     <YAxis stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} label={{ value: 'Number of Deals', angle: -90, position: 'insideLeft', offset: -5, fill: '#ffffff50', fontSize: 10 }} />
                     <Tooltip contentStyle={{ backgroundColor: '#131b2c', borderColor: '#ffffff15', borderRadius: '6px', fontSize: '11px' }} />
                     <Area type="monotone" dataKey="deals" stroke={secondaryColor} strokeWidth={2} fillOpacity={1} fill="url(#colorDeals)" activeDot={{ r: 4, fill: '#fff', stroke: secondaryColor }} />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
            </div>
          </div>
        );
      }

      case "investment-memo": {
        const data = [
          { category: 'Economics', TermSheet: 80, Standard: 100, fullMark: 100 },
          { category: 'Control', TermSheet: 110, Standard: 100, fullMark: 100 },
          { category: 'Board', TermSheet: 90, Standard: 100, fullMark: 100 },
          { category: 'Liquidation', TermSheet: 130, Standard: 100, fullMark: 100 },
          { category: 'Vesting', TermSheet: 100, Standard: 100, fullMark: 100 },
        ];
        return (
          <div className="flex w-full h-[260px]">
             <div className="w-1/3 flex flex-col justify-center pl-4">
                <div className="text-[12px] text-white/50 mb-1">Deviation Index</div>
                <div className="text-3xl font-serif text-red-400 tracking-wide">+14%</div>
                <div className="text-[11px] text-white/40 mt-2">Term sheet leans heavily towards investor downside protection (Liquidation).</div>
             </div>
             <div className="flex-1 h-full">
               <ResponsiveContainer width="100%" height="100%">
                 <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
                   <PolarGrid stroke="#ffffff15" />
                   <PolarAngleAxis dataKey="category" tick={{ fill: '#ffffff80', fontSize: 11 }} />
                   <Radar name="Term Sheet" dataKey="TermSheet" stroke={primaryColor} fill={primaryColor} fillOpacity={0.4} strokeWidth={2} />
                   <Radar name="NVCA Standard" dataKey="Standard" stroke={secondaryColor} fill={secondaryColor} fillOpacity={0.1} strokeWidth={1} strokeDasharray="3 3" />
                   <Tooltip contentStyle={{ backgroundColor: '#131b2c', borderColor: '#ffffff15', borderRadius: '6px', fontSize: '11px' }} />
                 </RadarChart>
               </ResponsiveContainer>
             </div>
          </div>
        );
      }

      case "founder-vesting": {
        const data = [
          { month: "M1", vested: 0, cliff: 0 }, { month: "M6", vested: 0, cliff: 0 },
          { month: "M12", vested: 25, cliff: 25 }, { month: "M24", vested: 50, cliff: 25 },
          { month: "M36", vested: 75, cliff: 25 }, { month: "M48", vested: 100, cliff: 25 },
        ];
        return (
          <div className="w-full h-[260px] flex flex-col">
            <div className="mb-4 ml-4">
                <div className="text-[12px] text-white/50 mb-1">Standard 4-Year Vesting</div>
                <div className="text-xl font-serif text-white">1-Year Cliff Applied</div>
             </div>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                <XAxis dataKey="month" stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} label={{ value: 'Timeline (Months)', position: 'insideBottom', offset: -15, fill: '#ffffff50', fontSize: 10 }} />
                <YAxis stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v)=>`${v}%`} label={{ value: 'Vested Equity (%)', angle: -90, position: 'insideLeft', offset: 0, fill: '#ffffff50', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#131b2c', borderColor: '#ffffff15', borderRadius: '6px' }} />
                <Bar dataKey="cliff" barSize={30} fill={secondaryColor} fillOpacity={0.3} radius={[4,4,0,0]} />
                <Line type="monotone" dataKey="vested" stroke={primaryColor} strokeWidth={3} dot={{ r: 4, fill: '#0B0F19', stroke: primaryColor }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        );
      }

      case "lp-compliance": {
        const data = [
          { name: "MFN", high: 3, medium: 1, low: 0 },
          { name: "ESG", high: 1, medium: 4, low: 2 },
          { name: "Co-Invest", high: 2, medium: 2, low: 1 },
          { name: "Reporting", high: 4, medium: 5, low: 3 },
        ];
        return (
          <div className="w-full h-[260px] flex flex-col">
            <div className="mb-4 ml-4">
                <div className="text-[12px] text-white/50 mb-1">Obligation Risk Mapping</div>
                <div className="text-xl font-serif text-white">28 Total Obligations</div>
             </div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 20, left: 20, bottom: 20 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" horizontal={false} />
                <XAxis type="number" stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} label={{ value: 'Number of Obligations', position: 'insideBottom', offset: -15, fill: '#ffffff50', fontSize: 10 }} />
                <YAxis dataKey="name" type="category" stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} label={{ value: 'Obligation Category', angle: -90, position: 'insideLeft', offset: -15, fill: '#ffffff50', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#131b2c', borderColor: '#ffffff15', borderRadius: '6px' }} cursor={{fill: '#ffffff05'}} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', color: '#fff', opacity: 0.7 }} />
                <Bar dataKey="high" name="High Risk" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} />
                <Bar dataKey="medium" name="Medium Risk" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                <Bar dataKey="low" name="Low Risk" stackId="a" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      }

      case "dd-checklist": {
        const data = [
          { name: "Corp", completed: 85, missing: 15 },
          { name: "Contracts", completed: 60, missing: 40 },
          { name: "IP", completed: 95, missing: 5 },
          { name: "HR", completed: 70, missing: 30 }
        ];
        return (
          <div className="w-full h-[260px] flex flex-col">
             <div className="mb-4 ml-4">
                <div className="text-[12px] text-white/50 mb-1">Data Room Completeness</div>
                <div className="text-xl font-serif text-white">77.5% Indexed</div>
             </div>
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={data} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                 <XAxis dataKey="name" stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} label={{ value: 'Diligence Category', position: 'insideBottom', offset: -15, fill: '#ffffff50', fontSize: 10 }} />
                 <YAxis stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v)=>`${v}%`} label={{ value: 'Completion (%)', angle: -90, position: 'insideLeft', offset: 0, fill: '#ffffff50', fontSize: 10 }} />
                 <Tooltip contentStyle={{ backgroundColor: '#131b2c', borderColor: '#ffffff15', borderRadius: '6px' }} cursor={{fill: '#ffffff05'}} />
                 <Bar dataKey="completed" stackId="a" fill={primaryColor} radius={[0, 0, 4, 4]} />
                 <Bar dataKey="missing" stackId="a" fill="#ef4444" fillOpacity={0.4} radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        );
      }

      case "cap-table": {
        const pieData = [
          { name: "Founders", value: 55 }, { name: "Seed", value: 20 },
          { name: "Series A", value: 15 }, { name: "Option Pool", value: 10 },
        ];
        const colors = [primaryColor, secondaryColor, tertiaryColor, quaternaryColor];
        return (
          <div className="w-full h-[260px] flex items-center justify-center gap-12">
             <div className="w-64 h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius="70%" outerRadius="90%" paddingAngle={2} dataKey="value" stroke="none">
                      {pieData.map((e, i) => <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#131b2c', borderColor: '#ffffff15', borderRadius: '6px' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <div className="text-3xl font-serif text-white">Post</div>
                   <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Series A</div>
                </div>
             </div>
             <div className="flex flex-col gap-4">
                {pieData.map((entry, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: colors[index % colors.length] }} />
                      <span className="text-[13px] text-white/80">{entry.name}</span>
                    </div>
                    <div className="text-[18px] font-serif text-white pl-4.5">{entry.value}%</div>
                  </div>
                ))}
             </div>
          </div>
        );
      }

      case "pitch-deck": {
        const data = [
          { aspect: "Problem", score: 8.5 }, { aspect: "Solution", score: 9.0 },
          { aspect: "Market", score: 6.5 }, { aspect: "Team", score: 9.5 },
          { aspect: "Traction", score: 5.0 }, { aspect: "Ask", score: 7.0 }
        ];
        return (
          <div className="w-full h-[260px] flex flex-col">
             <div className="mb-4 ml-4">
                <div className="text-[12px] text-white/50 mb-1">Narrative Cohesion</div>
                <div className="text-xl font-serif text-white">Traction/Market Disconnect</div>
             </div>
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={data} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                 <XAxis dataKey="aspect" stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} label={{ value: 'Narrative Section', position: 'insideBottom', offset: -15, fill: '#ffffff50', fontSize: 10 }} />
                 <YAxis stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} domain={[0, 10]} label={{ value: 'Score (1-10)', angle: -90, position: 'insideLeft', offset: 0, fill: '#ffffff50', fontSize: 10 }} />
                 <Tooltip contentStyle={{ backgroundColor: '#131b2c', borderColor: '#ffffff15', borderRadius: '6px' }} cursor={{fill: '#ffffff05'}} />
                 <Bar dataKey="score" fill={primaryColor} radius={[4, 4, 0, 0]}>
                    {data.map((entry, i) => (
                       <Cell key={`cell-${i}`} fill={entry.score < 7 ? '#ef4444' : primaryColor} />
                    ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
          </div>
        );
      }

      case "competitor": {
        const data = [
          { name: "Target", price: 50, features: 80, market: 1000 },
          { name: "Comp A", price: 80, features: 90, market: 3000 },
          { name: "Comp B", price: 30, features: 40, market: 5000 },
          { name: "Comp C", price: 90, features: 60, market: 800 }
        ];
        return (
          <div className="w-full h-[260px] flex flex-col">
             <div className="mb-2 ml-4">
                <div className="text-[12px] text-white/50 mb-1">Strategic Positioning</div>
                <div className="text-xl font-serif text-white">Price vs Features</div>
             </div>
             <ResponsiveContainer width="100%" height="100%">
               <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                 <XAxis type="number" dataKey="price" name="Pricing ($)" stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} label={{ value: 'Pricing ($)', position: 'insideBottom', offset: -15, fill: '#ffffff50', fontSize: 10 }} />
                 <YAxis type="number" dataKey="features" name="Features" stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} label={{ value: 'Feature Completeness', angle: -90, position: 'insideLeft', offset: 0, fill: '#ffffff50', fontSize: 10 }} />
                 <ZAxis type="number" dataKey="market" range={[100, 1000]} />
                 <Tooltip cursor={{strokeDasharray: '3 3'}} contentStyle={{ backgroundColor: '#131b2c', borderColor: '#ffffff15', borderRadius: '6px' }} />
                 <Scatter name="Competitors" data={data} fill={secondaryColor} fillOpacity={0.6}>
                    {data.map((e, i) => <Cell key={i} fill={e.name === 'Target' ? primaryColor : secondaryColor} />)}
                 </Scatter>
               </ScatterChart>
             </ResponsiveContainer>
          </div>
        );
      }

      case "spv": {
        const data = [
          { name: "Capital Raised", value: 10000000 },
          { name: "Formation Costs", value: -50000 },
          { name: "Management Fee", value: -200000 },
          { name: "Investable", value: 9750000 }
        ];
        return (
          <div className="w-full h-[260px] flex flex-col">
             <div className="mb-4 ml-4">
                <div className="text-[12px] text-white/50 mb-1">SPV Capital Bridge</div>
                <div className="text-xl font-serif text-white">Investable Capital</div>
             </div>
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={data} margin={{ top: 10, right: 20, bottom: 20, left: 20 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                 <XAxis dataKey="name" stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} label={{ value: 'Capital Stage', position: 'insideBottom', offset: -15, fill: '#ffffff50', fontSize: 10 }} />
                 <YAxis stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v)=>`$${v/1000000}M`} label={{ value: 'Value ($M)', angle: -90, position: 'insideLeft', offset: -10, fill: '#ffffff50', fontSize: 10 }} />
                 <Tooltip contentStyle={{ backgroundColor: '#131b2c', borderColor: '#ffffff15', borderRadius: '6px' }} cursor={{fill: '#ffffff05'}} />
                 <Bar dataKey="value" fill={primaryColor} radius={[4, 4, 0, 0]}>
                    {data.map((e, i) => <Cell key={i} fill={e.value < 0 ? '#ef4444' : (i === 3 ? secondaryColor : primaryColor)} />)}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
          </div>
        );
      }

      case "equity-split": {
        const pieData = [
          { name: "CEO (Time + Idea)", value: 45 }, { name: "CTO (Code + IP)", value: 35 },
          { name: "COO (Capital + Network)", value: 20 }
        ];
        return (
          <div className="w-full h-[260px] flex items-center justify-center gap-12">
             <div className="w-64 h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius="0%" outerRadius="90%" dataKey="value" stroke="none">
                      {pieData.map((e, i) => <Cell key={`cell-${i}`} fill={[primaryColor, secondaryColor, tertiaryColor][i]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#131b2c', borderColor: '#ffffff15', borderRadius: '6px' }} />
                  </PieChart>
                </ResponsiveContainer>
             </div>
             <div className="flex flex-col gap-4">
                {pieData.map((entry, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: [primaryColor, secondaryColor, tertiaryColor][index] }} />
                      <span className="text-[13px] text-white/80">{entry.name}</span>
                    </div>
                    <div className="text-[18px] font-serif text-white pl-4.5">{entry.value}%</div>
                  </div>
                ))}
             </div>
          </div>
        );
      }

      case "exit-model": {
        const data = [
          { exit: 10, Pref: 10, Founder: 0, Common: 0 },
          { exit: 20, Pref: 10, Founder: 6, Common: 4 },
          { exit: 50, Pref: 10, Founder: 24, Common: 16 },
          { exit: 100, Pref: 10, Founder: 54, Common: 36 },
        ];
        return (
          <div className="w-full h-[260px] flex flex-col">
             <div className="mb-4 ml-4">
                <div className="text-[12px] text-white/50 mb-1">Payout Waterfall ($M)</div>
                <div className="text-xl font-serif text-white">1x Non-Participating Pref</div>
             </div>
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                 <XAxis dataKey="exit" stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v)=>`$${v}M`} label={{ value: 'Exit Valuation ($M)', position: 'insideBottom', offset: -15, fill: '#ffffff50', fontSize: 10 }} />
                 <YAxis stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v)=>`$${v}M`} label={{ value: 'Payout Distribution ($M)', angle: -90, position: 'insideLeft', offset: 0, fill: '#ffffff50', fontSize: 10 }} />
                 <Tooltip contentStyle={{ backgroundColor: '#131b2c', borderColor: '#ffffff15', borderRadius: '6px' }} />
                 <Area type="monotone" dataKey="Pref" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.4} />
                 <Area type="monotone" dataKey="Common" stackId="1" stroke={secondaryColor} fill={secondaryColor} fillOpacity={0.4} />
                 <Area type="monotone" dataKey="Founder" stackId="1" stroke={primaryColor} fill={primaryColor} fillOpacity={0.4} />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        );
      }

      case "term-sheet": {
        const data = [
          { name: "Pre-Money Valuation", value: 20 },
          { name: "Post-Money Valuation", value: 25 },
          { name: "Available Option Pool", value: 3.75 },
        ];
        return (
          <div className="w-full h-[260px] flex flex-col">
             <div className="mb-4 ml-4">
                <div className="text-[12px] text-white/50 mb-1">Implied Economics ($M)</div>
                <div className="text-xl font-serif text-white">$5M Raise / 20% Dilution</div>
             </div>
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, left: 60, bottom: 20 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" horizontal={false} />
                 <XAxis type="number" stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} label={{ value: 'Value ($M / %)', position: 'insideBottom', offset: -15, fill: '#ffffff50', fontSize: 10 }} />
                 <YAxis dataKey="name" type="category" stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} width={120} label={{ value: 'Economic Metric', angle: -90, position: 'insideLeft', offset: -50, fill: '#ffffff50', fontSize: 10 }} />
                 <Tooltip contentStyle={{ backgroundColor: '#131b2c', borderColor: '#ffffff15', borderRadius: '6px' }} cursor={{fill: '#ffffff05'}} />
                 <Bar dataKey="value" fill={primaryColor} radius={[0, 4, 4, 0]} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        );
      }

      case "ip-check": {
        const data = [
          { name: "Employees (Clean)", value: 85 },
          { name: "Contractors (Missing IP Assignment)", value: 10 },
          { name: "Open Source (Copyleft Risk)", value: 5 }
        ];
        return (
          <div className="w-full h-[260px] flex items-center justify-center gap-12">
             <div className="w-64 h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data} cx="50%" cy="50%" innerRadius="70%" outerRadius="90%" paddingAngle={2} dataKey="value" stroke="none">
                      {data.map((e, i) => <Cell key={i} fill={[primaryColor, '#f59e0b', '#ef4444'][i]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#131b2c', borderColor: '#ffffff15', borderRadius: '6px' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <div className="text-3xl font-serif text-red-400">15%</div>
                   <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Tainted IP</div>
                </div>
             </div>
             <div className="flex flex-col gap-4">
                {data.map((entry, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: [primaryColor, '#f59e0b', '#ef4444'][index] }} />
                      <span className="text-[12px] text-white/80">{entry.name}</span>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        );
      }

      case "employment": {
        const data = [
          { month: "Month 1", standard: 1, accelerated: 1 },
          { month: "Month 12", standard: 12, accelerated: 12 },
          { month: "COC Trigger", standard: 13, accelerated: 48 },
          { month: "Month 24", standard: 24, accelerated: 48 },
        ];
        return (
          <div className="w-full h-[260px] flex flex-col">
             <div className="mb-4 ml-4">
                <div className="text-[12px] text-white/50 mb-1">Equity Acceleration (Months Vested)</div>
                <div className="text-xl font-serif text-white">Double-Trigger Impact</div>
             </div>
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                 <XAxis dataKey="month" stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} label={{ value: 'Employment Timeline', position: 'insideBottom', offset: -15, fill: '#ffffff50', fontSize: 10 }} />
                 <YAxis stroke="#ffffff40" tick={{ fill: '#ffffff50', fontSize: 10 }} tickLine={false} axisLine={false} label={{ value: 'Months Vested', angle: -90, position: 'insideLeft', offset: 0, fill: '#ffffff50', fontSize: 10 }} />
                 <Tooltip contentStyle={{ backgroundColor: '#131b2c', borderColor: '#ffffff15', borderRadius: '6px' }} />
                 <Area type="stepAfter" dataKey="accelerated" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
                 <Area type="stepAfter" dataKey="standard" stroke={primaryColor} fill={primaryColor} fillOpacity={0.6} />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        );
      }

      case "compliance": {
        const data = [
          { name: "FDA (Medical)", risk: 90 },
          { name: "HIPAA (Data)", risk: 85 },
          { name: "GDPR (Privacy)", risk: 60 },
          { name: "FINRA (Finance)", risk: 10 },
          { name: "SOC2 (Sec)", risk: 75 }
        ];
        return (
          <div className="flex w-full h-[260px]">
             <div className="w-1/3 flex flex-col justify-center pl-4">
                <div className="text-[12px] text-white/50 mb-1">Regulatory Surface Area</div>
                <div className="text-3xl font-serif text-white tracking-wide">High</div>
                <div className="text-[11px] text-white/40 mt-2">Product triggers both medical device and protected health information frameworks.</div>
             </div>
             <div className="flex-1 h-full">
               <ResponsiveContainer width="100%" height="100%">
                 <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
                   <PolarGrid stroke="#ffffff15" />
                   <PolarAngleAxis dataKey="name" tick={{ fill: '#ffffff80', fontSize: 11 }} />
                   <Radar name="Risk Exposure" dataKey="risk" stroke={secondaryColor} fill={secondaryColor} fillOpacity={0.4} strokeWidth={2} />
                   <Tooltip contentStyle={{ backgroundColor: '#131b2c', borderColor: '#ffffff15', borderRadius: '6px', fontSize: '11px' }} />
                 </RadarChart>
               </ResponsiveContainer>
             </div>
          </div>
        );
      }

      default: {
        return <div className="text-white/40 flex items-center justify-center h-full">Select a module to view dashboard.</div>;
      }
    }
  };

  return (
    <div className="w-full h-full flex bg-[#0B0F19] text-white font-sans overflow-hidden">
      {/* LEFT SIDEBAR */}
      <div className="w-[220px] shrink-0 border-r border-[#1f2937] flex flex-col p-3.5 bg-[#080c14] relative justify-between h-full">
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
               <Grid className="w-3.5 h-3.5 text-blue-400" />
               <span className="text-[12px] font-medium truncate">{formatModuleName(moduleId)}</span>
            </div>

            {moduleId === "sector-intel" ? (
              <>
                 <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-3 mb-1 px-3">// Operations</div>
                 {[
                   { name: "Forecast Sector CAGR", icon: TrendingUp },
                   { name: "Track Capital Velocity", icon: Zap },
                   { name: "Retrieve Market Policy", icon: Scroll },
                   { name: "Assess Macro Trends", icon: Globe },
                   { name: "Generate Investment Thesis", icon: PenTool }
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

                 <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-3 mb-1 px-3">// Intelligence</div>
                 {[
                   { name: "Growth Projections", icon: BarChart2 },
                   { name: "Velocity Insights", icon: Star },
                   { name: "Regulatory Intelligence", icon: Scale },
                   { name: "Macroeconomic Indicators", icon: Coins },
                   { name: "Investment Theses", icon: FileText }
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
            ) : moduleId === "investment-memo" ? (
              <>
                 <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-3 mb-1 px-3">// Capabilities</div>
                 {[
                   { name: "Economics Extractor", icon: Coins },
                   { name: "Governance Map", icon: Grid },
                   { name: "Liquidity Rights Assessor", icon: TrendingUp },
                   { name: "Market Comparables Model", icon: BarChart2 },
                   { name: "Executive Summary Builder", icon: FileText }
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
            ) : moduleId === "founder-vesting" ? (
              <>
                 <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-3 mb-1 px-3">// Capabilities</div>
                 {[
                   { name: "Vesting Schedule Architect", icon: TrendingUp },
                   { name: "83(b) Strategy Analyzer", icon: Scale },
                   { name: "Acceleration Decoder", icon: Zap },
                   { name: "Clawback & Repurchase Assessor", icon: Coins },
                   { name: "Dynamic Equity Framework", icon: LucidePieChart }
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
            ) : moduleId === "lp-compliance" ? (
              <>
                 <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-3 mb-1 px-3">// Capabilities</div>
                 {[
                   { name: "Document Audit Engine", icon: FileText },
                   { name: "Investor Rights Tracker", icon: Users },
                   { name: "Compliance Scheduler", icon: Calendar },
                   { name: "Constraint Radar", icon: Activity },
                   { name: "GP Defense Matrix", icon: Shield }
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
                       <Icon className="w-3.5 h-3.5 opacity-80 text-yellow-400" />
                       <span className="text-[12px] truncate">{item.name}</span>
                     </div>
                   );
                 })}
              </>
            ) : moduleId === "dd-checklist" ? (
              <>
                 <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-3 mb-1 px-3">// Capabilities</div>
                 {[
                   { name: "VDR Audit Engine", icon: Database },
                   { name: "Discrepancy Scanner", icon: AlertCircle },
                   { name: "Cap Ledger Analyzer", icon: Grid },
                   { name: "Liability Screener", icon: ShieldCheck },
                   { name: "Screen Material Agreements", icon: FileText },
                   { name: "Remediation Roadmap", icon: TrendingUp }
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
                       <Icon className="w-3.5 h-3.5 opacity-80 text-red-400" />
                       <span className="text-[12px] truncate">{item.name}</span>
                     </div>
                   );
                 })}
              </>
            ) : moduleId === "cap-table" ? (
              <>
                 <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-3 mb-1 px-3">// Capabilities</div>
                 {[
                   { name: "Simulate Dilution", icon: LucidePieChart },
                   { name: "Compute Option Pools", icon: Coins },
                   { name: "Conversion Engine", icon: Zap },
                   { name: "Voting Distribution Matrix", icon: Grid },
                   { name: "Project Founder Equity", icon: Users }
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
                       <Icon className="w-3.5 h-3.5 opacity-80 text-green-400" />
                       <span className="text-[12px] truncate">{item.name}</span>
                     </div>
                   );
                 })}
              </>
            ) : moduleId === "pitch-deck" ? (
              <>
                 <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-3 mb-1 px-3">// Capabilities</div>
                 {[
                   { name: "Critique Narrative", icon: PenTool },
                   { name: "Validate Market Sizing", icon: Scale },
                   { name: "Evaluate Competitors", icon: Users },
                   { name: "Assess Team Fit", icon: Users },
                   { name: "Optimize Structure", icon: Grid }
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
            ) : moduleId === "competitor" ? (
              <>
                 <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-3 mb-1 px-3">// Capabilities</div>
                 {[
                   { name: "Compare Product Velocity", icon: Zap },
                   { name: "Map Pricing Structures", icon: Coins },
                   { name: "Identify Market Positioning", icon: Globe },
                   { name: "Highlight Defense Moats", icon: Shield },
                   { name: "Evaluate Strategic Pivots", icon: TrendingUp }
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
                       <Icon className="w-3.5 h-3.5 opacity-80 text-indigo-400" />
                       <span className="text-[12px] truncate">{item.name}</span>
                     </div>
                   );
                 })}
              </>
            ) : moduleId === "spv" ? (
              <>
                 <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-3 mb-1 px-3">// Capabilities</div>
                 {[
                   { name: "Jurisdiction Analyzer", icon: Globe },
                   { name: "Fee & Carry Modeler", icon: Coins },
                   { name: "Compliance Orchestrator", icon: Scale },
                   { name: "Syndicate Rulebook", icon: Scroll },
                   { name: "Lifecycle Blueprint Engine", icon: Zap }
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
                       <Icon className="w-3.5 h-3.5 opacity-80 text-pink-400" />
                       <span className="text-[12px] truncate">{item.name}</span>
                     </div>
                   );
                 })}
              </>
            ) : moduleId === "exit-model" ? (
              <>
                 <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-3 mb-1 px-3">// Capabilities</div>
                 {[
                   { name: "Waterfall Distribution Engine", icon: TrendingUp },
                   { name: "Share Class Impact Analyzer", icon: LucidePieChart },
                   { name: "Simulate Exit Valuations", icon: BarChart2 },
                   { name: "Compute Investment Metrics", icon: Coins },
                   { name: "Identify LP/Founder Alignment", icon: Users }
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
                       <Icon className="w-3.5 h-3.5 opacity-80 text-rose-400" />
                       <span className="text-[12px] truncate">{item.name}</span>
                     </div>
                   );
                 })}
              </>
            ) : moduleId === "term-sheet" ? (
              <>
                 <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-3 mb-1 px-3">// Capabilities</div>
                 {[
                   { name: "Draft NVCA Terms", icon: PenTool },
                   { name: "Formulate Transfer Rights", icon: Shield },
                   { name: "Outline Board Governance", icon: Grid },
                   { name: "Configure Economic Rules", icon: Coins },
                   { name: "Streamline Negotiations", icon: TrendingUp }
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
                       <Icon className="w-3.5 h-3.5 opacity-80 text-teal-400" />
                       <span className="text-[12px] truncate">{item.name}</span>
                     </div>
                   );
                 })}
              </>
            ) : moduleId === "ip-check" ? (
              <>
                 <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-3 mb-1 px-3">// Capabilities</div>
                 {[
                   { name: "Review IP Assignments", icon: FileText },
                   { name: "Audit OSS Compliance", icon: Code },
                   { name: "Search Patent Risks", icon: Search },
                   { name: "Map IP Lineage", icon: Grid },
                   { name: "Specify Remedial Actions", icon: ShieldCheck }
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
            ) : moduleId === "employment" ? (
              <>
                 <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-3 mb-1 px-3">// Capabilities</div>
                 {[
                   { name: "Review Severance Terms", icon: FileText },
                   { name: "Flag Acceleration Scenarios", icon: Zap },
                   { name: "Audit Restrictive Covenants", icon: Shield },
                   { name: "Evaluate Termination Clauses", icon: Scale },
                   { name: "Assess 280G Exposure", icon: AlertCircle }
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
                       <Icon className="w-3.5 h-3.5 opacity-80 text-lime-400" />
                       <span className="text-[12px] truncate">{item.name}</span>
                     </div>
                   );
                 })}
              </>
            ) : moduleId === "compliance" ? (
              <>
                 <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-3 mb-1 px-3">// Capabilities</div>
                 {[
                   { name: "Identify Regulatory Standards", icon: Scale },
                   { name: "Map Licensing Timelines", icon: Calendar },
                   { name: "Screen Operational Flows", icon: Activity },
                   { name: "Project Compliance Costs", icon: Coins },
                   { name: "Outline Mitigation Measures", icon: ShieldCheck }
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
                       <Icon className="w-3.5 h-3.5 opacity-80 text-fuchsia-400" />
                       <span className="text-[12px] truncate">{item.name}</span>
                     </div>
                   );
                 })}
              </>
            ) : (
              <>
                 <div
                   onClick={() => setActiveSubtab("Insights")}
                   className={`px-3 py-2.5 rounded-lg flex items-center gap-3 cursor-pointer transition-all ${
                     activeSubtab === "Insights" 
                       ? "bg-[#1f2937]/30 border border-white/5 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                       : "text-white/40 hover:text-white/80"
                   }`}
                 >
                    <BarChart2 className="w-4 h-4" />
                    <span className="text-[13px]">Insights</span>
                 </div>
                 <div
                   onClick={() => setActiveSubtab("Engagements")}
                   className={`px-3 py-2.5 rounded-lg flex items-center gap-3 cursor-pointer transition-all ${
                     activeSubtab === "Engagements" 
                       ? "bg-[#1f2937]/30 border border-white/5 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                       : "text-white/40 hover:text-white/80"
                   }`}
                 >
                    <Star className="w-4 h-4" />
                    <span className="text-[13px]">Engagements</span>
                 </div>
                 <div
                   onClick={() => setActiveSubtab("Invoices")}
                   className={`px-3 py-2.5 rounded-lg flex items-center gap-3 cursor-pointer transition-all ${
                     activeSubtab === "Invoices" 
                       ? "bg-[#1f2937]/30 border border-white/5 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                       : "text-white/40 hover:text-white/80"
                   }`}
                 >
                    <FileText className="w-4 h-4" />
                    <span className="text-[13px]">Invoices</span>
                 </div>
                 <div
                   onClick={() => setActiveSubtab("Workflows")}
                   className={`px-3 py-2.5 rounded-lg flex items-center gap-3 cursor-pointer transition-all ${
                     activeSubtab === "Workflows" 
                       ? "bg-[#1f2937]/30 border border-white/5 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                       : "text-white/40 hover:text-white/80"
                   }`}
                 >
                    <Share2 className="w-4 h-4" />
                    <span className="text-[13px]">Workflows</span>
                 </div>
                 <div
                   onClick={() => setActiveSubtab("Team")}
                   className={`px-3 py-2.5 rounded-lg flex items-center gap-3 cursor-pointer transition-all ${
                     activeSubtab === "Team" 
                       ? "bg-[#1f2937]/30 border border-white/5 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                       : "text-white/40 hover:text-white/80"
                   }`}
                 >
                    <Users className="w-4 h-4" />
                    <span className="text-[13px]">Team</span>
                 </div>
               </>
            )}
         </div>

         {/* Small glowing dot decoration */}
         <div className="w-2 h-2 rounded-full bg-blue-500/80 shadow-[0_0_10px_rgba(59,130,246,0.8)] ml-3 mb-2 animate-pulse relative z-10 shrink-0 mt-4" />
      </div>

      {/* RIGHT MAIN PANEL */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#060a13] h-full">
         {/* TOP HEADER */}
         <div className="h-14 border-b border-[#1f2937] flex items-center justify-between px-6 shrink-0">
            <h2 className="text-[13px] md:text-[14px] font-serif text-white/80 tracking-wide">Elysian Azure Resorts Private Limited</h2>
            <button className="flex items-center gap-2 px-2.5 py-1 rounded text-[10px] font-medium text-blue-300 bg-blue-900/20 border border-blue-500/20 hover:bg-blue-900/40 transition-colors cursor-pointer">
               <Plus className="w-3 h-3" />
               Initiate Legal Workflow
            </button>
         </div>

         {/* CONTENT */}
         <div className="flex-1 p-5 bg-gradient-to-b from-[#0B0F19] to-[#0a0d14] flex flex-col gap-4 overflow-hidden">
            {/* Top Stats & Charts Row */}
            <div className="bg-[#111827]/40 border border-[#1f2937]/80 rounded-xl p-4 flex flex-col flex-[1.3] min-h-0">
               <div className="flex justify-end items-center mb-1 shrink-0">
                  <button className="text-[9px] text-blue-400 hover:text-blue-300 flex items-center gap-0.5 font-medium tracking-wide">
                     View all <ChevronRight className="w-2.5 h-2.5" />
                  </button>
               </div>
               
               <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
                 {renderChart()}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
