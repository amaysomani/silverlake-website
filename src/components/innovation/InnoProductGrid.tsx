"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, FileText, PenTool, ShieldAlert, Search,
  Calculator, Presentation, Grid, Building, PieChart,
  TrendingUp, Code, Shield, Users, Scale,
  ArrowLeft, ArrowRight, Loader2, Play
} from "lucide-react";
import { playClickSound, playHoverSound } from "@/lib/ArnoAudio";

const iconMap: Record<string, React.ComponentType<any>> = {
  Briefcase, FileText, PenTool, ShieldAlert, SearchCheck: Search,
  Calculator, Presentation, Grid, Building, PieChart,
  TrendingUp, Code, Shield, Users, Scale,
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
  icon: string;
  themeColors: string[];
  inputs: ProductInput[];
  getSystemInstruction: () => string;
  getPrompt: (inputs: Record<string, string>) => string;
}

const products: Product[] = [
  { id: "sector-intel", title: "Sector Intelligence", description: "Generates a 1000-word venture capital funding analysis thesis.", icon: "Briefcase", themeColors: ["#0d5e65", "#248694", "#157582", "#084851"], inputs: [{ id: "sector", label: "Sector Name", type: "text", placeholder: "e.g., Enterprise AI, SpaceTech" }], getSystemInstruction: () => "You are an elite VC Strategist. Output factual, analytical analysis. Use markdown.", getPrompt: (i) => `Analyze the current venture capital funding environment for ${i.sector || "Enterprise AI"} over the last 12 months. Structure: 1. Macro Thesis, 2. Capital Deployment Trends, 3. Legal Friction, 4. Actionable Strategy.` },
  { id: "investment-memo", title: "Investment Memo", description: "Distills complex Term Sheet provisions into a concise 2-page summary.", icon: "FileText", themeColors: ["#a64b28", "#c96f43", "#853a1a", "#612a14"], inputs: [{ id: "termSheet", label: "Raw Term Sheet Text", type: "textarea", placeholder: "Paste raw term sheet draft here..." }], getSystemInstruction: () => "You are a senior partner at an elite private funds law firm. Distill highly complex legal documents into their fundamental commercial implications. use markdown tables strictly.", getPrompt: (i) => `Review the draft Term Sheet for a Series A financing:\n\n${i.termSheet || ""}\n\nGenerate a comprehensive 2-page Investment Memo extracting Economic Architecture, Control Rights, Downside Mechanics, and Deviation Analysis.` },
  { id: "founder-vesting", title: "Advisory Content", description: "Drafts highly direct advisory content for founders regarding vesting mechanics.", icon: "PenTool", themeColors: ["#134e5e", "#71b280", "#0f9b0f", "#1d976c"], inputs: [{ id: "context", label: "Specific Focus", type: "text", placeholder: "Leave blank for standard analysis" }], getSystemInstruction: () => "You are an experienced legal architect advising YC-backed founders.", getPrompt: (i) => `Draft a 800-word advisory article titled "The Mechanics of Founder Vesting". Focus context: ${i.context || "None"}.` },
  { id: "lp-compliance", title: "LP Compliance", description: "Extracts and maps ongoing operational obligations from LP Side Letters.", icon: "ShieldAlert", themeColors: ["#2980b9", "#6dd5ed", "#2193b0", "#2c3e50"], inputs: [{ id: "lpName", label: "Limited Partner Name", type: "text", placeholder: "e.g., Sovereign Wealth Fund Alpha" }, { id: "sideLetter", label: "Side Letter Text", type: "textarea", placeholder: "Paste full side letter text here..." }], getSystemInstruction: () => "You are a meticulous fund formation attorney specializing in LP compliance.", getPrompt: (i) => `Analyze the Side Letter for ${i.lpName || "Sovereign Wealth Fund Alpha"}:\n\n${i.sideLetter || ""}\n\nExtract obligations using a markdown table (Type, Requirement, Frequency, Risk Level).` },
  { id: "dd-checklist", title: "Diligence Flaw Assessor", description: "Cross-references a data room index against standard Series A checklists.", icon: "SearchCheck", themeColors: ["#cb2d3e", "#ef473a", "#c84e89", "#ff0844"], inputs: [{ id: "dataRoomIndex", label: "Data Room Document Index", type: "textarea", placeholder: "Paste the list of documents..." }], getSystemInstruction: () => "You are an operational efficiency expert within a PE/VC law firm.", getPrompt: (i) => `Review the provided index of documents:\n\n${i.dataRoomIndex || ""}\n\nCross-reference against Series A checklist. Write narrative report identifying critical missing documents.` },
  { id: "cap-table", title: "Cap Table Simulator", description: "Calculates dilution impact and returns waterfall under various exit scenarios.", icon: "Calculator", themeColors: ["#1D976C", "#93F9B9", "#00b4db", "#0083B0"], inputs: [{ id: "capData", label: "Current Cap Table", type: "textarea", placeholder: "Paste capitalization data here..." }, { id: "roundDetails", label: "Proposed Round Details", type: "text", placeholder: "e.g., $10M on $40M pre-money" }], getSystemInstruction: () => "You are an expert financial modeler and startup lawyer.", getPrompt: (i) => `Given current cap table:\n${i.capData || ""}\n\nAnd proposed round:\n${i.roundDetails || ""}\n\nCalculate post-money ownership percentages.` },
  { id: "pitch-deck", title: "Pitch Deck Analyzer", description: "Evaluates presentation flow, market sizing claims, and competitive positioning.", icon: "Presentation", themeColors: ["#e65c00", "#F9D423", "#f5af19", "#ff9966"], inputs: [{ id: "deckOutline", label: "Deck Text/Outline", type: "textarea", placeholder: "Paste slide contents or outline..." }], getSystemInstruction: () => "You are an active seed-stage VC. Critically evaluate pitch materials.", getPrompt: (i) => `Analyze the following pitch deck outline:\n\n${i.deckOutline || ""}\n\nIdentify 3 weak points and suggest structural improvements.` },
  { id: "competitor", title: "Competitor Matrix", description: "Generates a strategic comparison matrix across product, pricing, and moats.", icon: "Grid", themeColors: ["#8E2DE2", "#4A00E0", "#753a88", "#203a43"], inputs: [{ id: "competitors", label: "Target & Competitors", type: "textarea", placeholder: "List main competitor names/URLs..." }], getSystemInstruction: () => "You are an elite market researcher.", getPrompt: (i) => `Create a feature, pricing, and moat comparison matrix for:\n\n${i.competitors || ""}\n\nUse markdown tables.` },
  { id: "spv", title: "SPV Structuring", description: "Advises on optimal entity formation and syndication structures for deals.", icon: "Building", themeColors: ["#cc2b5e", "#753a88", "#f093fb", "#f5576c"], inputs: [{ id: "dealParams", label: "Syndicate Deal Parameters", type: "textarea", placeholder: "Total raise, carry, LP count..." }], getSystemInstruction: () => "You are a corporate structuring attorney.", getPrompt: (i) => `Draft an SPV structuring memo based on:\n\n${i.dealParams || ""}\n\nRecommend domicile, GP/LP structure.` },
  { id: "equity-split", title: "Founder Equity Split", description: "Provides framework for dynamic equity splitting among founding teams.", icon: "PieChart", themeColors: ["#f7186a", "#ec8c69", "#ed6ea0", "#ff0844"], inputs: [{ id: "teamProfiles", label: "Founder Contributions", type: "textarea", placeholder: "Describe each founder role and time commitment..." }], getSystemInstruction: () => "You are a pragmatic YC partner.", getPrompt: (i) => `Analyze founding team profiles:\n\n${i.teamProfiles || ""}\n\nRecommend an equity split framework.` },
  { id: "exit-model", title: "Exit Modeler", description: "Visualizes liquidity events and liquidation preference impacts.", icon: "TrendingUp", themeColors: ["#f12711", "#f5af19", "#e8ae2f", "#ff5e62"], inputs: [{ id: "preferences", label: "Liquidation Preferences", type: "textarea", placeholder: "List investor classes and preference terms..." }, { id: "exitValue", label: "Target Exit Value", type: "text", placeholder: "e.g., $50M, $100M M&A" }], getSystemInstruction: () => "You are a mathematically rigorous investment banker.", getPrompt: (i) => `Model payout waterfall for exit value ${i.exitValue || ""} based on:\n\n${i.preferences || ""}\n\nShow exact returns by share class in a markdown table.` },
  { id: "term-sheet", title: "Term Sheet Generator", description: "Drafts NVCA-aligned term sheet provisions based on deal parameters.", icon: "Code", themeColors: ["#1e3c72", "#2a5298", "#99f2c8", "#1f4037"], inputs: [{ id: "economics", label: "Key Deal Economics", type: "textarea", placeholder: "Valuation, raise, board seats..." }], getSystemInstruction: () => "You are a venture lawyer drafting NVCA standard documents.", getPrompt: (i) => `Generate a draft Term Sheet skeleton based on:\n\n${i.economics || ""}` },
  { id: "ip-check", title: "IP Chain Checker", description: "Reviews chain of title and open source risks in tech transactions.", icon: "Shield", themeColors: ["#f093fb", "#f5576c", "#ff5e62", "#ff9966"], inputs: [{ id: "ipContext", label: "IP Development Context", type: "textarea", placeholder: "Describe how core IP was built..." }], getSystemInstruction: () => "You are a technology transactions attorney.", getPrompt: (i) => `Review IP context:\n\n${i.ipContext || ""}\n\nIdentify critical chain-of-title risks.` },
  { id: "employment", title: "Employment Reviewer", description: "Scans executive employment agreements for severance and acceleration triggers.", icon: "Users", themeColors: ["#11998e", "#38ef7d", "#134e5e", "#71b280"], inputs: [{ id: "employmentDoc", label: "Agreement Excerpt", type: "textarea", placeholder: "Paste sections on termination/severance..." }], getSystemInstruction: () => "You are an executive compensation lawyer.", getPrompt: (i) => `Analyze employment excerpt:\n\n${i.employmentDoc || ""}\n\nSummarize severance obligations and equity acceleration risks.` },
  { id: "compliance", title: "Compliance Screener", description: "Flags regulatory requirements (HIPAA, FINRA, FDA) based on product description.", icon: "Scale", themeColors: ["#141E30", "#243B55", "#4B79A1", "#283E51"], inputs: [{ id: "productDesc", label: "Product & Market", type: "textarea", placeholder: "What does the product do and who buys it?" }], getSystemInstruction: () => "You are a regulatory compliance specialist.", getPrompt: (i) => `Review product:\n\n${i.productDesc || ""}\n\nOutline primary US and EU regulatory frameworks.` },
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

export default function InnoProductGrid({ soundEnabled }: InnoProductGridProps) {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [interactionId, setInteractionId] = useState<string | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

  const activeProduct = products.find((p) => p.id === selectedProductId);

  const handleCardClick = (product: Product) => {
    if (soundEnabled) playClickSound();
    setSelectedProductId(product.id);
    setInputValues({});
    setError(null);
    setResult(null);
  };

  const handleCloseModal = () => {
    if (soundEnabled) playClickSound();
    setSelectedProductId(null);
    setInputValues({});
    setError(null);
    setResult(null);
    setInteractionId(null);
    setFeedbackSubmitted(false);
  };

  const handleInputChange = (id: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [id]: value }));
  };

  const initiateDirective = async () => {
    const prod = products.find((p) => p.id === selectedProductId);
    if (!prod) return;
    if (soundEnabled) playClickSound();
    setLoading(true);
    setError(null);
    setResult(null);
    setInteractionId(null);
    setFeedbackSubmitted(false);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleId: prod.id,
          inputs: inputValues,
          prompt: prod.getPrompt(inputValues),
          systemInstruction: prod.getSystemInstruction(),
        }),
      });
      if (!res.ok) throw new Error("Failed to generate strategist synthesis.");
      const data = await res.json();
      setResult(data.text);
      if (data.interactionId) setInteractionId(data.interactionId);
    } catch (err: any) {
      setError(err.message || "An error occurred during directive run.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10">
      {/* Product Grid */}
      {!selectedProductId ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
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
                onClick={() => handleCardClick(product)}
                onMouseEnter={() => soundEnabled && playHoverSound()}
                className="group relative cursor-pointer inno-glass-card rounded-xl p-6 lg:p-7 overflow-hidden"
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

                  {/* Launch indicator */}
                  <div className="mt-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="font-tech text-[9px] tracking-[0.2em] text-[#00d4ff] uppercase font-bold">
                      LAUNCH MODULE
                    </span>
                    <ArrowRight className="w-3 h-3 text-[#00d4ff]" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Execution Modal */
        <AnimatePresence>
          {activeProduct && (
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
                <div className="w-full lg:w-[500px] p-8 sm:p-10 lg:border-r border-b lg:border-b-0 border-white/10 overflow-y-auto no-scrollbar flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white font-tech uppercase tracking-tight mb-3">{activeProduct.title}</h2>
                    <p className="text-sm text-white/50 font-light mb-8">{activeProduct.description}</p>
                    <div className="space-y-6">
                      {activeProduct.inputs.map((input) => (
                        <div key={input.id} className="space-y-2">
                          <label className="block font-tech text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">{input.label}</label>
                          {input.type === "textarea" ? (
                            <textarea value={inputValues[input.id] || ""} onChange={(e) => handleInputChange(input.id, e.target.value)} placeholder={input.placeholder} rows={5} className="w-full border border-white/10 bg-black/20 p-4 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-white/30 transition-colors resize-none font-light rounded-lg" />
                          ) : (
                            <input type="text" value={inputValues[input.id] || ""} onChange={(e) => handleInputChange(input.id, e.target.value)} placeholder={input.placeholder} className="w-full border border-white/10 bg-black/20 p-4 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-white/30 transition-colors font-light rounded-lg" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-8">
                    <button onClick={initiateDirective} disabled={loading} className="w-full bg-white hover:bg-white/90 text-[#020a19] py-4 px-6 font-bold text-[11px] uppercase tracking-[0.16em] transition-colors flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer rounded-lg font-tech">
                      {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /><span>SYNTHESIZING...</span></>) : (<><Play className="w-3.5 h-3.5 fill-current" /><span>INITIATE DIRECTIVE</span></>)}
                    </button>
                  </div>
                </div>

                {/* Right: Output */}
                <div className="flex-1 p-8 sm:p-10 overflow-y-auto no-scrollbar relative">
                  {!result && !loading && !error && (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mx-auto mb-6">
                          <Play className="w-6 h-6 text-white/20" />
                        </div>
                        <p className="font-tech text-[11px] uppercase tracking-[0.2em] text-white/20 font-bold">AWAITING DIRECTIVE</p>
                        <p className="text-white/10 text-xs mt-2 font-light">Configure inputs and initiate to generate analysis</p>
                      </div>
                    </div>
                  )}
                  {loading && (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <Loader2 className="w-8 h-8 text-[#00d4ff] animate-spin mx-auto mb-4" />
                        <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">SYNTHESIZING OUTPUT...</p>
                      </div>
                    </div>
                  )}
                  {error && (
                    <div className="border border-red-500/30 bg-red-500/5 p-6 rounded-xl">
                      <p className="font-tech text-[10px] uppercase tracking-widest text-red-400 font-bold mb-2">ERROR</p>
                      <p className="text-red-300/80 text-sm font-light">{error}</p>
                    </div>
                  )}
                  {result && (
                    <div className="prose prose-invert max-w-none">
                      {renderMarkdown(result)}
                      
                      {/* Feedback UI for Continuous Learning */}
                      {interactionId && (
                        <div className="mt-12 p-5 border border-white/10 rounded-xl bg-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 not-prose">
                          <div>
                            <div className="text-[13px] font-bold text-white/80 mb-1">Help Train The Model</div>
                            <div className="text-[11px] text-white/40">Was this analysis accurate and helpful?</div>
                          </div>
                          <div className="flex gap-2">
                              <button 
                                onClick={async () => {
                                  if (feedbackSubmitted) return;
                                  setFeedbackSubmitted(true);
                                  await fetch("/api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ interactionId, feedbackScore: 1 }) });
                                }} 
                                disabled={feedbackSubmitted}
                                className="px-4 py-2 bg-white/5 hover:bg-green-500/20 text-white/70 hover:text-green-400 border border-white/10 hover:border-green-500/30 rounded font-tech text-[10px] uppercase tracking-widest transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {feedbackSubmitted ? "Submitted" : "Accurate"}
                              </button>
                              <button 
                                onClick={async () => {
                                  if (feedbackSubmitted) return;
                                  setFeedbackSubmitted(true);
                                  await fetch("/api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ interactionId, feedbackScore: -1 }) });
                                }} 
                                disabled={feedbackSubmitted}
                                className="px-4 py-2 bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-400 border border-white/10 hover:border-red-500/30 rounded font-tech text-[10px] uppercase tracking-widest transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {feedbackSubmitted ? "Submitted" : "Inaccurate"}
                              </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
