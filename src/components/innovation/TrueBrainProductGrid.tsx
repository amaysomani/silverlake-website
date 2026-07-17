"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, FileText, PenTool, ShieldAlert, Search,
  Calculator, Presentation, Grid, Building, PieChart,
  TrendingUp, Code, Shield, Users, Scale, Globe, MessageSquare,
  ArrowLeft, ArrowRight, Loader2, Play
} from "lucide-react";
import { playClickSound, playHoverSound } from "@/lib/ArnoAudio";
import TrueBrainModuleDashboard from "./TrueBrainModuleDashboard";

const iconMap: Record<string, React.ComponentType<any>> = {
  Briefcase, FileText, PenTool, ShieldAlert, SearchCheck: Search,
  Calculator, Presentation, Grid, Building, PieChart,
  TrendingUp, Code, Shield, Users, Scale, Globe, MessageSquare,
};

interface ProductInput {
  id: string;
  label: string;
  type: "text" | "textarea";
  placeholder: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  descriptionPoints: string[];
  icon: string;
  themeColors: string[];
  inputs: ProductInput[];
  getSystemInstruction: () => string;
  getPrompt: (inputs: Record<string, string>) => string;
}

const products: Product[] = [
  {
    id: "recruitment",
    title: "Recruitment Intelligence",
    description: "Employer Brand, Talent Attraction and Employee Communications",
    descriptionPoints: [
      "Evaluate how the organisation presents itself to employees and prospective talent",
      "Create a consistent employer narrative explaining why people should join, contribute, and remain",
      "Map the communication journey from awareness to onboarding",
      "Plan and manage communications that inform employees, support change, and strengthen trust",
      "Plan employer brand and talent attraction campaigns"
    ],
    icon: "Users",
    themeColors: ["#134e5e", "#71b280", "#0f9b0f", "#1d976c"],
    inputs: [{ id: "role", label: "Target Role", type: "text", placeholder: "e.g., Senior Engineer" }],
    getSystemInstruction: () => "You are a specialized Recruitment Director",
    getPrompt: (i) => `Outline a recruitment plan for ${i.role || "a key position"}`
  },
  {
    id: "growth-strategy",
    title: "Growth & Strategy",
    description: "Brand Positioning, Market Intelligence and Communications Strategy",
    descriptionPoints: [
      "Consolidate interviews, workshops, perception research, and existing materials to establish current brand position",
      "Compare competitors across positioning, narrative, communication activity, audience, and differentiation",
      "Convert approved insights into a unified narrative and messaging framework",
      "Identify communication-led opportunities from market context, stakeholder needs, and competitor activity",
      "Convert an approved strategy into a phased communications programme"
    ],
    icon: "TrendingUp",
    themeColors: ["#0d5e65", "#248694", "#157582", "#084851"],
    inputs: [{ id: "market", label: "Target Market", type: "text", placeholder: "e.g., Enterprise Software" }],
    getSystemInstruction: () => "You are an elite Growth Strategist",
    getPrompt: (i) => `Outline a growth strategy for ${i.market || "your industry"}`
  },
  {
    id: "corporate-communications",
    title: "Corporate Communications",
    description: "Stakeholder Alignment, Executive Communications and Reputation Management",
    descriptionPoints: [
      "Map stakeholder groups, information needs, current concerns, and required communication actions",
      "Maintain the approved corporate story, messages, positioning, and proof points",
      "Plan leadership messaging, executive visibility, and thought leadership",
      "Coordinate employee communication, announcements, leadership messaging, and feedback",
      "Identify potential issues, prepare response material, and coordinate communication during reputational events"
    ],
    icon: "MessageSquare",
    themeColors: ["#2980b9", "#6dd5ed", "#2193b0", "#2c3e50"],
    inputs: [{ id: "audience", label: "Target Audience", type: "text", placeholder: "e.g., Investors" }],
    getSystemInstruction: () => "You are a Corporate Communications Executive",
    getPrompt: (i) => `Draft a communication brief for ${i.audience || "key stakeholders"}`
  },
  {
    id: "public-relations",
    title: "Public Relations Intelligence",
    description: "Media Relations, Storytelling and Thought Leadership",
    descriptionPoints: [
      "Develop an evidence-based PR programme aligned with business objectives, competition, and news context",
      "Organise journalist relationships, media lists, pitches, responses, and follow-ups",
      "Create and manage press releases, launch materials, press events, tours, and media assets",
      "Manage bylines, op-eds, speaking opportunities, media commentary, and awards",
      "Record verified coverage and analyse themes, message inclusion, sentiment, and competitive visibility"
    ],
    icon: "Globe",
    themeColors: ["#a64b28", "#c96f43", "#853a1a", "#612a14"],
    inputs: [{ id: "topic", label: "PR Topic", type: "text", placeholder: "e.g., Product Launch" }],
    getSystemInstruction: () => "You are an expert PR Manager",
    getPrompt: (i) => `Draft a PR strategy for ${i.topic || "a new announcement"}`
  }
];

// Card mesh gradient background
const CardMeshGradient = ({ colors, active = false }: { colors: string[]; active?: boolean }) => (
  <div className={`absolute inset-0 overflow-hidden z-0 pointer-events-none transition-opacity duration-700 rounded-xl ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
    <div className="absolute inset-[-50%] opacity-60 blur-[60px] saturate-[1.5]">
      <div className="absolute top-[10%] left-[10%] w-[60%] h-[60%] rounded-full mix-blend-screen" style={{ backgroundColor: colors[0], animation: "blob1 1.5s infinite alternate" }} />
      <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] rounded-full mix-blend-screen" style={{ backgroundColor: colors[1], animation: "blob2 2s infinite alternate-reverse" }} />
      <div className="absolute bottom-[10%] left-[20%] w-[60%] h-[60%] rounded-full mix-blend-screen" style={{ backgroundColor: colors[2], animation: "blob3 1.8s infinite alternate" }} />
      <div className="absolute bottom-[20%] right-[10%] w-[60%] h-[60%] rounded-full mix-blend-screen" style={{ backgroundColor: colors[3], animation: "blob4 2.2s infinite alternate-reverse" }} />
    </div>
    <div className="absolute inset-0 bg-black/40 mix-blend-overlay" />
  </div>
);

// Markdown renderer (simplified from ArnoCapabilities)
const renderMarkdown = (text: string) => {
  const lines = text.split("\n");
  const htmlElements: React.ReactNode[] = [];
  let inTable = false;
  let tableHeaders: string[] = [];
  let tableRows: string[][] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("|")) {
      const parts = line.split("|").map(p => p.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      if (line.includes("---")) continue;
      if (!inTable) { inTable = true; tableHeaders = parts; } else { tableRows.push(parts); }
      continue;
    } else if (inTable) {
      htmlElements.push(
        <div key={`table-${i}`} className="overflow-x-auto my-6 border border-white/10 rounded-xl">
          <table className="w-full text-[13px] text-left border-collapse">
            <thead><tr className="border-b border-white/20 bg-white/[0.02]">{tableHeaders.map((h, idx) => <th key={idx} className="py-3 px-4 font-tech text-[10px] uppercase tracking-widest text-white/40 border-r border-white/10 last:border-r-0">{h}</th>)}</tr></thead>
            <tbody>{tableRows.map((row, rIdx) => <tr key={rIdx} className="border-b border-white/10 last:border-b-0">{row.map((col, cIdx) => <td key={cIdx} className="py-3 px-4 text-white/70 font-light border-r border-white/10 last:border-r-0">{col}</td>)}</tr>)}</tbody>
          </table>
        </div>
      );
      inTable = false; tableHeaders = []; tableRows = [];
    }
    if (line === "") continue;
    if (line.startsWith("## ")) htmlElements.push(<h2 key={i} className="text-xl font-bold text-white mb-4 mt-8 pb-3 border-b border-white/10 font-tech">{line.replace("## ", "")}</h2>);
    else if (line.startsWith("### ")) htmlElements.push(<h3 key={i} className="font-tech text-[11px] uppercase tracking-[0.2em] text-white/50 mt-8 mb-3 font-bold">{line.replace("### ", "")}</h3>);
    else if (line.startsWith("# ")) htmlElements.push(<h1 key={i} className="text-2xl font-bold text-white mb-6 font-tech">{line.replace("# ", "")}</h1>);
    else if (line.startsWith(">")) htmlElements.push(<blockquote key={i} className="border-l-2 border-white/20 pl-5 italic text-white/40 my-5 font-light">{line.replace(/^>\s*/, "")}</blockquote>);
    else if (line.startsWith("*") || line.startsWith("-")) htmlElements.push(<ul key={i} className="list-disc pl-6 mb-3"><li className="text-white/70 font-light text-sm">{line.replace(/^[\*\-]\s*/, "")}</li></ul>);
    else {
      const parts = line.split("**");
      const processed = parts.map((part, idx) => idx % 2 === 1 ? <strong key={idx} className="font-bold text-white">{part}</strong> : part);
      htmlElements.push(<p key={i} className="text-white/60 text-sm leading-[1.7] font-light mb-4">{processed}</p>);
    }
  }
  if (inTable) {
    htmlElements.push(
      <div key="table-final" className="overflow-x-auto my-6 border border-white/10 rounded-xl">
        <table className="w-full text-[13px] text-left border-collapse">
          <thead><tr className="border-b border-white/20 bg-white/[0.02]">{tableHeaders.map((h, idx) => <th key={idx} className="py-3 px-4 font-tech text-[10px] uppercase tracking-widest text-white/40">{h}</th>)}</tr></thead>
          <tbody>{tableRows.map((row, rIdx) => <tr key={rIdx} className="border-b border-white/10 last:border-b-0">{row.map((col, cIdx) => <td key={cIdx} className="py-3 px-4 text-white/70 font-light">{col}</td>)}</tr>)}</tbody>
        </table>
      </div>
    );
  }
  return (
    <motion.div 
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} 
      initial="hidden" 
      animate="show" 
      className="space-y-1"
    >
      {htmlElements.map((el, i) => (
        <motion.div key={i} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
          {el}
        </motion.div>
      ))}
    </motion.div>
  );
};

interface InnoProductGridProps {
  soundEnabled: boolean;
}

export default function TrueBrainProductGrid({ soundEnabled }: InnoProductGridProps) {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const activeProduct = products.find((p) => p.id === selectedProductId);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedProductId && containerRef.current) {
      // Small timeout to allow the DOM to update and render the modal
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }
  }, [selectedProductId]);

  const handleCardClick = (product: Product) => {
    if (soundEnabled) playClickSound();
    setSelectedProductId(product.id);
  };

  const handleCloseModal = () => {
    if (soundEnabled) playClickSound();
    setSelectedProductId(null);
  };

  return (
    <div ref={containerRef} className="relative z-10">
      {/* Product Grid & Modal Transition */}
      <AnimatePresence mode="wait">
        {!selectedProductId ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-5"
          >
            {products.map((product, idx) => {
              const IconComponent = iconMap[product.icon] || Briefcase;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onMouseEnter={() => soundEnabled && playHoverSound()}
                  onClick={() => handleCardClick(product)}
                  className="group relative inno-glass-card rounded-xl p-6 lg:p-7 overflow-hidden cursor-pointer"
                >
                  <CardMeshGradient colors={product.themeColors} />

                  <div className="relative z-10">
                    {/* Number */}
                    <div className="font-tech text-[9px] text-white/25 tracking-widest font-bold mb-4">
                      {String(idx + 1).padStart(2, "0")}
                    </div>

                    {/* Icon */}
                    <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center mb-4 group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-500">
                      <IconComponent className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" strokeWidth={1.5} />
                    </div>

                    {/* Title */}
                    <h3 className="font-tech text-[15px] lg:text-[16px] font-bold text-white/90 uppercase tracking-wide mb-2 leading-tight">
                      {product.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[12px] text-white/40 font-light leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* Execution Modal */
          activeProduct && (
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-[#020a19]/80 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden flex flex-col min-h-[600px] lg:h-[700px] shadow-[0_50px_100px_rgba(0,0,0,0.9)]"
            >
              {/* Modal Header */}
              <header className="flex justify-between items-center p-6 sm:px-10 border-b border-white/10 bg-[#020a19]/50">
                <button onClick={handleCloseModal} className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group cursor-pointer">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-tech text-[10px] uppercase tracking-[0.2em] font-bold">RETURN TO PLATFORM</span>
                </button>
                <div className="font-tech text-[9px] uppercase tracking-widest text-white/30 hidden md:block">
                  EXECUTION MODULE // {activeProduct.id.toUpperCase()}
                </div>
              </header>

              <div className="flex flex-col lg:flex-row flex-1 overflow-hidden h-full">
                {/* Left: Input Form */}
                <div className="w-full lg:w-[350px] p-8 sm:p-10 lg:border-r border-b lg:border-b-0 border-white/10 overflow-y-auto no-scrollbar flex flex-col">
                  <div>
                    <h2 className="text-2xl font-bold text-white font-tech uppercase tracking-tight mb-3">{activeProduct.title}</h2>
                    <p className="text-xs text-white/30 uppercase tracking-[0.2em] font-mono mb-4 font-bold">// CAPABILITIES</p>
                    {activeProduct.descriptionPoints ? (
                      <ul className="space-y-3 mb-8 list-none pl-0">
                        {activeProduct.descriptionPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-2.5 text-[11px] sm:text-xs text-white/50 font-light leading-relaxed">
                            <span className="font-tech text-[9px] text-[#cc66d0]/75 mt-1 select-none font-bold whitespace-nowrap">
                              0{index + 1}.
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-white/50 font-light mb-8">{activeProduct.description}</p>
                    )}
                  </div>
                </div>

                {/* Right: Output */}
                <div className="flex-1 p-8 sm:p-10 overflow-y-auto no-scrollbar relative flex flex-col">
                  <div className="flex-1 min-h-[500px] w-full">
                    <TrueBrainModuleDashboard moduleId={activeProduct.id} themeColors={activeProduct.themeColors} />
                  </div>
                </div>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}
