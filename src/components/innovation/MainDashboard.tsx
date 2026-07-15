"use client";

import React, { useState } from "react";
import {
  Grid, BarChart2, Star, FileText, Share2, Users, Plus, ChevronRight, FileBadge, UserCircle2
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const billedData = [
  { name: "Jan", value: 2500 },
  { name: "Feb", value: 3100 },
  { name: "Mar", value: 2400 },
  { name: "Apr", value: 4100 },
  { name: "May", value: 2800 },
  { name: "Jun", value: 1200 }
];

const workedData = [
  { name: "Jan", value: 2600 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 2400 },
  { name: "Apr", value: 4000 },
  { name: "May", value: 2800 },
  { name: "Jun", value: 1300 }
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#131b2c] border border-white/10 px-2.5 py-1 rounded text-[11px] text-white shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
        ${payload[0].value}
      </div>
    );
  }
  return null;
};

export default function MainDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="w-full max-w-[1200px] aspect-[16/10.5] md:aspect-[16/9.5] flex bg-[#0B0F19] text-white font-sans overflow-hidden rounded-xl border border-[#1f2937] shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
      {/* LEFT SIDEBAR */}
      <div className="w-[180px] md:w-[200px] shrink-0 border-r border-[#1f2937] flex flex-col p-4 bg-[#080c14] relative justify-between">
        {/* Glow decoration */}
        <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none blur-xl" />
        
        <div className="flex flex-col gap-1 mt-4 relative z-10">
          <div className="px-3 py-2 rounded-lg bg-[#1f2937]/50 border border-white/5 flex items-center gap-3 text-white cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <Grid className="w-4 h-4 text-blue-400" />
            <span className="text-[13px] font-medium">Overview</span>
          </div>
          <div className="px-3 py-2 rounded-lg flex items-center gap-3 text-white/40 hover:text-white/80 transition-colors cursor-pointer">
            <BarChart2 className="w-4 h-4" />
            <span className="text-[13px]">Insights</span>
          </div>
          <div className="px-3 py-2 rounded-lg flex items-center gap-3 text-white/40 hover:text-white/80 transition-colors cursor-pointer">
            <Star className="w-4 h-4" />
            <span className="text-[13px]">Engagements</span>
          </div>
          <div className="px-3 py-2 rounded-lg flex items-center gap-3 text-white/40 hover:text-white/80 transition-colors cursor-pointer">
            <FileText className="w-4 h-4" />
            <span className="text-[13px]">Invoices</span>
          </div>
          <div className="px-3 py-2 rounded-lg flex items-center gap-3 text-white/40 hover:text-white/80 transition-colors cursor-pointer">
            <Share2 className="w-4 h-4" />
            <span className="text-[13px]">Workflows</span>
          </div>
          <div className="px-3 py-2 rounded-lg flex items-center gap-3 text-white/40 hover:text-white/80 transition-colors cursor-pointer">
            <Users className="w-4 h-4" />
            <span className="text-[13px]">Team</span>
          </div>
        </div>

        {/* Small glowing dot decoration */}
        <div className="w-2.5 h-2.5 rounded-full bg-blue-500/80 shadow-[0_0_15px_rgba(59,130,246,0.8)] ml-3 mb-4 animate-pulse relative z-10" />
      </div>

      {/* RIGHT MAIN PANEL */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#060a13]">
        {/* TOP HEADER */}
        <div className="h-16 border-b border-[#1f2937] flex items-center justify-between px-6 md:px-8 shrink-0">
          <h2 className="text-[14px] md:text-[15px] font-serif text-white/80 tracking-wide">Elysian Azure Resorts Private Limited</h2>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded text-[11px] font-medium text-blue-300 bg-blue-900/20 border border-blue-500/20 hover:bg-blue-900/40 transition-colors cursor-pointer">
            <Plus className="w-3.5 h-3.5" />
            Initiate Legal Workflow
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-5 md:p-6 bg-gradient-to-b from-[#0B0F19] to-[#0a0d14] flex flex-col gap-5">
          {/* Good Morning / Charts Card */}
          <div className="bg-[#111827]/40 border border-[#1f2937]/80 rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[15px] font-serif text-white/90">Good morning.</h3>
              <button className="text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium tracking-wide">
                View all <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 md:gap-8">
              {/* Left Chart: Total Billed */}
              <div className="flex flex-col h-[180px] md:h-[200px]">
                <div className="mb-2">
                  <div className="text-[11px] text-white/50">Total Billed</div>
                  <div className="text-xl md:text-2xl font-serif text-white tracking-wide mt-0.5">$31,316.40</div>
                </div>
                <div className="flex-1 min-h-0 relative -ml-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={billedData} margin={{ top: 15, right: 10, left: 10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="billedGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4}/>
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                      <XAxis dataKey="name" stroke="#ffffff25" tick={{ fill: '#ffffff40', fontSize: 9 }} tickLine={false} axisLine={false} />
                      <YAxis stroke="#ffffff25" tick={{ fill: '#ffffff40', fontSize: 9 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}K`} ticks={[1000, 3000, 5000]} domain={[0, 5000]} />
                      <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ffffff10' }} />
                      <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fill="url(#billedGradient)" activeDot={{ r: 4, fill: '#fff', stroke: '#3b82f6', strokeWidth: 2 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Right Chart: Total Worked */}
              <div className="flex flex-col h-[180px] md:h-[200px]">
                <div className="mb-2">
                  <div className="text-[11px] text-white/50">Total Worked</div>
                  <div className="text-xl md:text-2xl font-serif text-white tracking-wide mt-0.5">251.17 hrs</div>
                </div>
                <div className="flex-1 min-h-0 relative -ml-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={workedData} margin={{ top: 15, right: 10, left: 10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="workedGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                      <XAxis dataKey="name" stroke="#ffffff25" tick={{ fill: '#ffffff40', fontSize: 9 }} tickLine={false} axisLine={false} />
                      <YAxis stroke="#ffffff25" tick={{ fill: '#ffffff40', fontSize: 9 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}K`} ticks={[1000, 3000, 5000]} domain={[0, 5000]} />
                      <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ffffff10' }} />
                      <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} fill="url(#workedGradient)" activeDot={{ r: 4, fill: '#fff', stroke: '#8b5cf6', strokeWidth: 2 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Widgets Row */}
          <div className="grid grid-cols-2 gap-5 md:gap-6">
            {/* Recent Workflows */}
            <div className="bg-[#111827]/40 border border-[#1f2937]/80 rounded-xl p-5 flex flex-col h-[180px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[13px] font-serif text-white/90">Recent workflows</h3>
                <button className="text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium tracking-wide">
                  View all <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="flex flex-col gap-2.5 flex-1 overflow-y-auto pr-1 no-scrollbar">
                <div className="bg-[#1f2937]/30 border border-white/5 rounded-lg p-2.5 flex items-center justify-between group hover:bg-[#1f2937]/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-white/5 rounded">
                      <FileBadge className="w-3.5 h-3.5 text-white/40" />
                    </div>
                    <span className="text-[12px] text-white/70 group-hover:text-white/90 transition-colors truncate max-w-[150px] md:max-w-[200px]">Contract Review & Risk Analysis</span>
                  </div>
                  <span className="text-[9px] font-medium text-blue-400 bg-blue-900/20 px-2 py-0.5 rounded border border-blue-500/10 shrink-0">In Progress</span>
                </div>
                <div className="bg-[#1f2937]/30 border border-white/5 rounded-lg p-2.5 flex items-center justify-between group hover:bg-[#1f2937]/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-white/5 rounded">
                      <FileBadge className="w-3.5 h-3.5 text-white/40" />
                    </div>
                    <span className="text-[12px] text-white/70 group-hover:text-white/90 transition-colors truncate max-w-[150px] md:max-w-[200px]">Lease Agreement – Elysian Azure Bali</span>
                  </div>
                  <span className="text-[9px] font-medium text-white/40 bg-white/5 px-2 py-0.5 rounded border border-white/5 shrink-0">Pending Review</span>
                </div>
              </div>
            </div>

            {/* New Team Members */}
            <div className="bg-[#111827]/40 border border-[#1f2937]/80 rounded-xl p-5 flex flex-col h-[180px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[13px] font-serif text-white/90">New Team Members</h3>
                <button className="text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium tracking-wide">
                  View all <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1 no-scrollbar">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1f2937]/50 border border-white/5 flex items-center justify-center">
                        <UserCircle2 className="w-4 h-4 text-white/30" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="w-16 h-1.5 rounded bg-white/10"></div>
                        <div className="w-10 h-1 rounded bg-white/5"></div>
                      </div>
                    </div>
                    <span className="text-[9px] font-medium text-purple-400 bg-purple-900/20 px-2 py-0.5 rounded border border-purple-500/10 shrink-0">Onboarding</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
