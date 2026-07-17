"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  FileText,
  PenTool,
  ShieldAlert,
  Search,
  Calculator,
  Presentation,
  Grid,
  Building,
  PieChart,
  TrendingUp,
  Code,
  Shield,
  Users,
  Scale,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Volume2,
  VolumeX,
  Play
} from "lucide-react";
import { playClickSound, playHoverSound } from "@/lib/ArnoAudio";

// Mapped icons list matching database references
const iconMap: Record<string, React.ComponentType<any>> = {
  Briefcase,
  FileText,
  PenTool,
  ShieldAlert,
  SearchCheck: Search,
  Calculator,
  Presentation,
  Grid,
  Building,
  PieChart,
  TrendingUp,
  Code,
  Shield,
  Users,
  Scale
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
  themeColors: string[]; // 4 hex colors for mesh gradients
  inputs: ProductInput[];
  getSystemInstruction: () => string;
  getPrompt: (inputs: Record<string, string>) => string;
}

const products: Product[] = [
  {
    id: "sector-intel",
    title: "Sector Intelligence",
    description: "Generates a 1000-word venture capital funding analysis thesis.",
    icon: "Briefcase",
    themeColors: ["#0d5e65", "#248694", "#157582", "#084851"],
    inputs: [{ id: "sector", label: "Sector Name", type: "text", placeholder: "e.g., Enterprise AI, SpaceTech" }],
    getSystemInstruction: () => "You are an elite VC Strategist. Output factual, analytical analysis. Use markdown.",
    getPrompt: (inputs) => `Analyze the current venture capital funding environment for ${inputs.sector || "Enterprise AI"} over the last 12 months. Structure: 1. Macro Thesis, 2. Capital Deployment Trends, 3. Legal Friction, 4. Actionable Strategy.`
  },
  {
    id: "investment-memo",
    title: "Investment Memo",
    description: "Distills complex Term Sheet provisions into a concise 2-page Investment Memo summary.",
    icon: "FileText",
    themeColors: ["#a64b28", "#c96f43", "#853a1a", "#612a14"],
    inputs: [{ id: "termSheet", label: "Raw Term Sheet Text", type: "textarea", placeholder: "Paste raw term sheet draft here..." }],
    getSystemInstruction: () => "You are a senior partner at an elite private funds law firm. Distill highly complex legal documents into their fundamental commercial implications. use markdown tables strictly.",
    getPrompt: (inputs) => `Review the draft Term Sheet for a Series A financing:\n\n${inputs.termSheet || ""}\n\nGenerate a comprehensive 2-page Investment Memo extracting Economic Architecture, Control Rights, Downside Mechanics, and Deviation Analysis.`
  },
  {
    id: "founder-vesting",
    title: "Advisory Content",
    description: "Drafts highly direct advisory content for founders regarding vesting mechanics.",
    icon: "PenTool",
    themeColors: ["#134e5e", "#71b280", "#0f9b0f", "#1d976c"],
    inputs: [{ id: "context", label: "Specific Focus", type: "text", placeholder: "Leave blank for standard analysis" }],
    getSystemInstruction: () => "You are an experienced legal architect advising YC-backed founders. Explain complex corporate legal mechanics simply.",
    getPrompt: (inputs) => `Draft a 800-word advisory article titled "The Mechanics of Founder Vesting". Focus context: ${inputs.context || "None"}. Address standard models, commercial logic, cap table risk, and actionable steps.`
  },
  {
    id: "lp-compliance",
    title: "LP Compliance",
    description: "Extracts and maps ongoing operational obligations from LP Side Letters to manage governance risk.",
    icon: "ShieldAlert",
    themeColors: ["#2980b9", "#6dd5ed", "#2193b0", "#2c3e50"],
    inputs: [
      { id: "lpName", label: "Limited Partner Name", type: "text", placeholder: "e.g., Sovereign Wealth Fund Alpha" },
      { id: "sideLetter", label: "Side Letter Text", type: "textarea", placeholder: "Paste full side letter text here..." }
    ],
    getSystemInstruction: () => "You are a meticulous fund formation attorney specializing in LP compliance. Risk identification and obligation mapping.",
    getPrompt: (inputs) => `Analyze the Side Letter for ${inputs.lpName || "Sovereign Wealth Fund Alpha"}:\n\n${inputs.sideLetter || ""}\n\nExtract obligations (MFN, ESG, etc) using a markdown table (Type, Requirement, Frequency, Risk Level).`
  },
  {
    id: "dd-checklist",
    title: "Diligence Flaw Assessor",
    description: "Cross-references a data room index against standard Series A checklists to identify immediate fatal flaws.",
    icon: "SearchCheck",
    themeColors: ["#cb2d3e", "#ef473a", "#c84e89", "#ff0844"],
    inputs: [{ id: "dataRoomIndex", label: "Data Room Document Index", type: "textarea", placeholder: "Paste the list of documents..." }],
    getSystemInstruction: () => "You are an operational efficiency expert within a PE/VC law firm. Assess raw company data against standard due diligence requirements.",
    getPrompt: (inputs) => `Review the provided index of documents in the target company's data room:\n\n${inputs.dataRoomIndex || ""}\n\nCross-reference against Series A checklist. Write narrative report identifying critical missing documents.`
  },
  {
    id: "cap-table",
    title: "Cap Table Simulator",
    description: "Calculates dilution impact and returns waterfall under various exit scenarios.",
    icon: "Calculator",
    themeColors: ["#1D976C", "#93F9B9", "#00b4db", "#0083B0"],
    inputs: [
      { id: "capData", label: "Current Cap Table (Text or CSV)", type: "textarea", placeholder: "Paste capitalization data here..." },
      { id: "roundDetails", label: "Proposed Round Details", type: "text", placeholder: "e.g., $10M on $40M pre-money" }
    ],
    getSystemInstruction: () => "You are an expert financial modeler and startup lawyer. Provide precise mathematical capitalization analysis.",
    getPrompt: (inputs) => `Given current cap table:\n${inputs.capData || ""}\n\nAnd proposed round:\n${inputs.roundDetails || ""}\n\nCalculate post-money ownership percentages and highlight severe dilution risks.`
  },
  {
    id: "pitch-deck",
    title: "Pitch Deck Analyzer",
    description: "Evaluates presentation flow, market sizing claims, and competitive positioning.",
    icon: "Presentation",
    themeColors: ["#e65c00", "#F9D423", "#f5af19", "#ff9966"],
    inputs: [{ id: "deckOutline", label: "Deck Text/Outline", type: "textarea", placeholder: "Paste slide contents or outline..." }],
    getSystemInstruction: () => "You are an active seed-stage VC. Critically evaluate pitch materials for narrative cohesion and market reality.",
    getPrompt: (inputs) => `Analyze the following pitch deck outline:\n\n${inputs.deckOutline || ""}\n\nIdentify 3 weak points in the narrative and suggest structural improvements.`
  },
  {
    id: "competitor",
    title: "Competitor Matrix",
    description: "Generates a strategic comparison matrix across product, pricing, and moats.",
    icon: "Grid",
    themeColors: ["#8E2DE2", "#4A00E0", "#753a88", "#203a43"],
    inputs: [{ id: "competitors", label: "Target & Competitors", type: "textarea", placeholder: "List main competitor names/URLs..." }],
    getSystemInstruction: () => "You are an elite market researcher. Focus on structural advantages, not marketing claims.",
    getPrompt: (inputs) => `Create a feature, pricing, and moat comparison matrix for:\n\n${inputs.competitors || ""}\n\nUse markdown tables and synthesize the ultimate winning strategy.`
  },
  {
    id: "spv",
    title: "SPV Structuring",
    description: "Advises on optimal entity formation and syndication structures for deals.",
    icon: "Building",
    themeColors: ["#cc2b5e", "#753a88", "#f093fb", "#f5576c"],
    inputs: [{ id: "dealParams", label: "Syndicate Deal Parameters", type: "textarea", placeholder: "Total raise, carry, LP count..." }],
    getSystemInstruction: () => "You are a corporate structuring attorney. Prioritize tax efficiency and governance simplicity.",
    getPrompt: (inputs) => `Draft an SPV structuring memo based on:\n\n${inputs.dealParams || ""}\n\nRecommend domicile, GP/LP structure, and outline major formation costs.`
  },
  {
    id: "equity-split",
    title: "Founder Equity Split",
    description: "Provides framework for dynamic equity splitting among founding teams.",
    icon: "PieChart",
    themeColors: ["#f7186a", "#ec8c69", "#ed6ea0", "#ff0844"],
    inputs: [{ id: "teamProfiles", label: "Founder Contributions", type: "textarea", placeholder: "Describe each founder role and time commitment..." }],
    getSystemInstruction: () => "You are a pragmatic YC partner. Avoid equal splits if unjustified. Promote dynamic vesting models.",
    getPrompt: (inputs) => `Analyze founding team profiles:\n\n${inputs.teamProfiles || ""}\n\nRecommend an equity split framework and justify the allocation.`
  },
  {
    id: "exit-model",
    title: "Exit Modeler",
    description: "Visualizes liquidity events and liquidation preference impacts.",
    icon: "TrendingUp",
    themeColors: ["#f12711", "#f5af19", "#e8ae2f", "#ff5e62"],
    inputs: [
      { id: "preferences", label: "Liquidation Preferences", type: "textarea", placeholder: "List investor classes and preference terms..." },
      { id: "exitValue", label: "Target Exit Value", type: "text", placeholder: "e.g., $50M, $100M M&A" }
    ],
    getSystemInstruction: () => "You are a mathematically rigorous investment banker. Focus on payout distributions and breakpoint traps.",
    getPrompt: (inputs) => `Model payout waterfall for exit value ${inputs.exitValue || ""} based on:\n\n${inputs.preferences || ""}\n\nShow exact returns by share class in a markdown table.`
  },
  {
    id: "term-sheet",
    title: "Term Sheet Generator",
    description: "Drafts NVCA-aligned term sheet provisions based on deal parameters.",
    icon: "Code",
    themeColors: ["#1e3c72", "#2a5298", "#99f2c8", "#1f4037"],
    inputs: [{ id: "economics", label: "Key Deal Economics", type: "textarea", placeholder: "Valuation, raise, board seats..." }],
    getSystemInstruction: () => "You are a venture lawyer drafting NVCA standard documents. Use precise legal terminology.",
    getPrompt: (inputs) => `Generate a draft Term Sheet skeleton focusing on Economics, Control, and Dilution based on:\n\n${inputs.economics || ""}`
  },
  {
    id: "ip-check",
    title: "IP Chain Checker",
    description: "Reviews chain of title and open source risks in tech transactions.",
    icon: "Shield",
    themeColors: ["#f093fb", "#f5576c", "#ff5e62", "#ff9966"],
    inputs: [{ id: "ipContext", label: "IP Development Context", type: "textarea", placeholder: "Describe how core IP was built (contractors, uni, etc)..." }],
    getSystemInstruction: () => "You are a technology transactions attorney focusing on IP protection and open source compliance.",
    getPrompt: (inputs) => `Review IP context:\n\n${inputs.ipContext || ""}\n\nIdentify critical chain-of-title risks and necessary curative assignments.`
  },
  {
    id: "employment",
    title: "Employment Reviewer",
    description: "Scans executive employment agreements for severance and acceleration triggers.",
    icon: "Users",
    themeColors: ["#11998e", "#38ef7d", "#134e5e", "#71b280"],
    inputs: [{ id: "employmentDoc", label: "Agreement Excerpt", type: "textarea", placeholder: "Paste sections on termination/severance..." }],
    getSystemInstruction: () => "You are an executive compensation lawyer. Focus on double-trigger equity acceleration and severance terms.",
    getPrompt: (inputs) => `Analyze employment excerpt:\n\n${inputs.employmentDoc || ""}\n\nSummarize severance obligations and equity acceleration risks upon change of control.`
  },
  {
    id: "compliance",
    title: "Compliance Screener",
    description: "Flags regulatory requirements (HIPAA, FINRA, FDA) based on product description.",
    icon: "Scale",
    themeColors: ["#141E30", "#243B55", "#4B79A1", "#283E51"],
    inputs: [{ id: "productDesc", label: "Product & Market", type: "textarea", placeholder: "What does the product do and who buys it?" }],
    getSystemInstruction: () => "You are a regulatory compliance specialist holding risk averse views.",
    getPrompt: (inputs) => `Review product:\n\n${inputs.productDesc || ""}\n\nOutline the primary US and EU regulatory frameworks the startup must navigate prior to launch.`
  }
];

// Card animated mesh gradient background (replicating Kawa / Hashgraph style)
const CardMeshGradient = ({ colors, active = false }: { colors: string[]; active?: boolean }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden z-0 pointer-events-none transition-opacity duration-700 rounded-xl ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
      <div className="absolute inset-[-50%] opacity-80 blur-[60px] saturate-[1.8]">
        <div className="absolute top-[10%] left-[10%] w-[60%] h-[60%] rounded-full mix-blend-screen" style={{ backgroundColor: colors[0], animation: "blob1 1.5s infinite alternate" }} />
        <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] rounded-full mix-blend-screen" style={{ backgroundColor: colors[1], animation: "blob2 2s infinite alternate-reverse" }} />
        <div className="absolute bottom-[10%] left-[20%] w-[60%] h-[60%] rounded-full mix-blend-screen" style={{ backgroundColor: colors[2], animation: "blob3 1.8s infinite alternate" }} />
        <div className="absolute bottom-[20%] right-[10%] w-[60%] h-[60%] rounded-full mix-blend-screen" style={{ backgroundColor: colors[3], animation: "blob4 2.2s infinite alternate-reverse" }} />
      </div>
      <div className="absolute inset-0 bg-black/40 mix-blend-overlay" />
    </div>
  );
};

// Global backdrop radial glow based on active card
const GlobalBgGlow = ({ activeColor }: { activeColor: string }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 transition-all duration-[1500ms] ease-in-out overflow-hidden">
      <div 
        className="absolute top-1/2 left-1/2 w-[100vw] h-[100vw] max-w-[1000px] max-h-[1000px] rounded-full blur-[140px] opacity-15 transition-colors duration-700 -translate-x-1/2 -translate-y-1/2" 
        style={{ backgroundColor: activeColor }} 
      />
    </div>
  );
};

// Render helper for mock or real markdown outputs
const renderMarkdown = (text: string) => {
  const lines = text.split("\n");
  let inTable = false;
  let tableHeaders: string[] = [];
  let tableRows: string[][] = [];

  const htmlElements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Table parsing
    if (line.startsWith("|")) {
      const parts = line.split("|").map(p => p.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      if (line.includes("---")) {
        continue;
      }
      if (!inTable) {
        inTable = true;
        tableHeaders = parts;
      } else {
        tableRows.push(parts);
      }
      continue;
    } else {
      if (inTable) {
        const headers = tableHeaders;
        const rows = tableRows;
        htmlElements.push(
          <div key={`table-${i}`} className="overflow-x-auto my-6 border border-white/10 rounded-xl">
            <table className="w-full text-[13px] sm:text-[14px] text-left border-collapse">
              <thead>
                <tr className="border-b border-white/20 bg-white/[0.02]">
                  {headers.map((h, idx) => (
                    <th key={idx} className="py-3 px-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#d5e0ff]/50 border-r border-white/10 last:border-r-0">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rIdx) => (
                  <tr key={rIdx} className="border-b border-white/10 hover:bg-white/[0.01] transition-colors last:border-b-0">
                    {row.map((col, cIdx) => (
                      <td key={cIdx} className="py-3 px-4 text-[#d5e0ff]/80 font-light border-r border-white/10 last:border-r-0">{col}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        inTable = false;
        tableHeaders = [];
        tableRows = [];
      }
    }

    if (line === "") continue;

    // Headers
    if (line.startsWith("## ")) {
      htmlElements.push(<h2 key={i} className="text-[20px] sm:text-[24px] font-bold uppercase text-[#E5ECFF] mb-6 mt-12 pb-4 border-b border-[#d5e0ff]/10 font-sans tracking-tight">{line.replace("## ", "")}</h2>);
    } else if (line.startsWith("### ")) {
      htmlElements.push(<h3 key={i} className="font-mono text-[11px] sm:text-[12px] uppercase font-bold tracking-[0.2em] text-[#d5e0ff]/60 mt-10 mb-4">{line.replace("### ", "")}</h3>);
    } else if (line.startsWith("# ")) {
      htmlElements.push(<h1 key={i} className="text-[26px] sm:text-[32px] font-bold uppercase text-[#E5ECFF] tracking-wide mb-8 font-sans">{line.replace("# ", "")}</h1>);
    }
    // Blockquote
    else if (line.startsWith(">")) {
      htmlElements.push(<blockquote key={i} className="border-l-2 border-[#d5e0ff]/30 pl-6 italic text-[#d5e0ff]/50 my-6 leading-relaxed font-light">{line.replace(/^>\s*/, "")}</blockquote>);
    }
    // List Items
    else if (line.startsWith("*") || line.startsWith("-")) {
      htmlElements.push(
        <ul key={i} className="list-disc pl-6 mb-4">
          <li className="text-[#d5e0ff]/80 font-light text-[14px] sm:text-[15px]">{line.replace(/^[\*\-]\s*/, "")}</li>
        </ul>
      );
    } else if (/^\d+\./.test(line)) {
      htmlElements.push(
        <ol key={i} className="list-decimal pl-6 mb-4">
          <li className="text-[#d5e0ff]/80 font-light text-[14px] sm:text-[15px]">{line.replace(/^\d+\.\s*/, "")}</li>
        </ol>
      );
    }
    // Standard paragraph with bold replacement
    else {
      const parts = line.split("**");
      const processed = parts.map((part, idx) => {
        if (idx % 2 === 1) {
          return <strong key={idx} className="font-bold text-[#E5ECFF]">{part}</strong>;
        }
        return part;
      });
      htmlElements.push(<p key={i} className="text-[#d5e0ff]/70 text-[14px] sm:text-[15px] leading-[1.7] font-light mb-6 text-justify">{processed}</p>);
    }
  }

  if (inTable) {
    htmlElements.push(
      <div key={`table-final`} className="overflow-x-auto my-6 border border-white/10 rounded-xl">
        <table className="w-full text-[13px] sm:text-[14px] text-left border-collapse">
          <thead>
            <tr className="border-b border-white/20 bg-white/[0.02]">
              {tableHeaders.map((h, idx) => (
                <th key={idx} className="py-3 px-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#d5e0ff]/50 border-r border-white/10 last:border-r-0">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, rIdx) => (
              <tr key={rIdx} className="border-b border-white/10 hover:bg-white/[0.01] transition-colors last:border-b-0">
                {row.map((col, cIdx) => (
                  <td key={cIdx} className="py-3 px-4 text-[#d5e0ff]/80 font-light border-r border-white/10 last:border-r-0">{col}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <div className="space-y-1">{htmlElements}</div>;
};

interface ArnoCapabilitiesProps {
  soundEnabled: boolean;
}

export default function ArnoCapabilities({ soundEnabled }: ArnoCapabilitiesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [sliderProgress, setSliderProgress] = useState(0);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const isWheelLockedRef = useRef(false);

  // Update scroll progress bar based on activeIndex
  useEffect(() => {
    if (!selectedProductId) {
      setSliderProgress(
        products.length > 1 ? (activeIndex / (products.length - 1)) * 100 : 0
      );
    }
  }, [activeIndex, selectedProductId]);

  // Bind mousewheel and arrow key navigation when modal is NOT open
  useEffect(() => {
    if (selectedProductId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex(prev => Math.min(prev + 1, products.length - 1));
        if (soundEnabled) playHoverSound();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex(prev => Math.max(prev - 1, 0));
        if (soundEnabled) playHoverSound();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Filter out small scroll movements to prevent hyper-sensitivity
      if (Math.abs(e.deltaY) < 15 && Math.abs(e.deltaX) < 15) return;

      if (!isWheelLockedRef.current) {
        isWheelLockedRef.current = true;
        
        if (e.deltaY > 0 || e.deltaX > 0) {
          setActiveIndex(prev => Math.min(prev + 1, products.length - 1));
          if (soundEnabled) playHoverSound();
        } else {
          setActiveIndex(prev => Math.max(prev - 1, 0));
          if (soundEnabled) playHoverSound();
        }

        setTimeout(() => {
          isWheelLockedRef.current = false;
        }, 400); // lock wheel scroll changes for 400ms
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const sectionEl = sectionRef.current;
    if (sectionEl) {
      sectionEl.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (sectionEl) {
        sectionEl.removeEventListener("wheel", handleWheel);
      }
    };
  }, [selectedProductId, soundEnabled]);

  const handleMouseEnter = () => {
    if (soundEnabled) playHoverSound();
  };

  const handleCardClick = (index: number) => {
    if (soundEnabled) playClickSound();
    if (index === activeIndex) {
      // Launch active module
      const prod = products[index];
      setSelectedProductId(prod.id);
      setInputValues({});
      setError(null);
      setResult(null);
      // Smooth scroll back to top of page/section if needed
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setActiveIndex(index);
    }
  };

  const handleCloseModal = () => {
    if (soundEnabled) playClickSound();
    setSelectedProductId(null);
    setInputValues({});
    setError(null);
    setResult(null);
  };

  const handleInputChange = (id: string, value: string) => {
    setInputValues(prev => ({ ...prev, [id]: value }));
  };

  const initiateDirective = async () => {
    const prod = products.find(p => p.id === selectedProductId);
    if (!prod) return;

    if (soundEnabled) playClickSound();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const systemInstruction = prod.getSystemInstruction();
      const prompt = prod.getPrompt(inputValues);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, systemInstruction })
      });

      if (!res.ok) {
        throw new Error("Failed to generate strategist synthesis.");
      }

      const data = await res.json();
      setResult(data.text);
    } catch (err: any) {
      setError(err.message || "An error occurred during directive run.");
    } finally {
      setLoading(false);
    }
  };

  // Coverflow 3D Transform calculations
  const getCardStyle = (index: number, activeIndex: number) => {
    const diff = index - activeIndex;
    const absDiff = Math.abs(diff);
    const sign = Math.sign(diff);

    if (diff === 0) {
      return {
        transform: "translateX(0px) translateZ(80px) rotateY(0deg) scale(1)",
        zIndex: 50,
        opacity: 1,
        filter: "brightness(1) blur(0px)",
        pointerEvents: "auto" as const
      };
    }

    // Responsive scaling offsets
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const stepX = isMobile ? 120 : 220;
    const rateX = isMobile ? 40 : 60;
    const stepZ = isMobile ? -60 : -100;
    const angleY = isMobile ? -30 : -45;

    const translateX = sign * (stepX + absDiff * rateX);
    const translateZ = absDiff * stepZ;
    const rotateY = -sign * angleY;
    const opacity = Math.max(1 - absDiff * 0.18, 0);
    const brightness = Math.max(1 - absDiff * 0.22, 0.35);
    const blur = absDiff * 1.5;

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(0.9)`,
      zIndex: 40 - absDiff,
      opacity,
      filter: `brightness(${brightness}) blur(${blur}px)`,
      pointerEvents: absDiff === 1 ? ("auto" as const) : ("none" as const)
    };
  };

  const activeProduct = products.find(p => p.id === selectedProductId);
  const activeColor = products[activeIndex]?.themeColors[0] || "#7f56d9";

  return (
    <section 
      id="products" 
      ref={sectionRef}
      className="py-24 px-6 lg:px-12 bg-[#020208] relative overflow-hidden select-none min-h-[750px] lg:min-h-[850px] flex flex-col justify-between"
    >
      {/* Background radial overlays */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#3b82f6]/5 arno-orb-glow pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#7f56d9]/5 arno-orb-glow pointer-events-none" />

      {/* Global Background Color Glow of active card */}
      {!selectedProductId && <GlobalBgGlow activeColor={activeColor} />}

      <div className="max-w-[1400px] mx-auto w-full relative z-10 flex-grow flex flex-col justify-between">
        
        {/* Section Header */}
        {!selectedProductId && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="text-[10px] font-mono tracking-[0.25em] text-[#7f56d9] uppercase mb-4">
                // LEGAL STRATEGIST SUITE
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white leading-tight font-sans">
                THE LEGAL STUDIO.<br />AUTONOMOUS VC WORKFLOWS.
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-white/40 text-xs sm:text-sm font-sans font-light leading-relaxed">
                Replicating elite legal advisory parameters. Harness 15 strategic modules mapping capital structures, diligence anomalies, and exit waterfalls in real-time.
              </p>
            </div>
          </div>
        )}

        {/* 3D Coverflow Slider View */}
        {!selectedProductId ? (
          <div className="relative flex-grow flex items-center justify-center min-h-[550px] overflow-visible">
            
            {/* Left Navigate Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (soundEnabled) playClickSound();
                setActiveIndex(prev => Math.max(prev - 1, 0));
              }}
              className="absolute left-[2%] lg:left-[5%] z-50 p-4 text-[#d5e0ff]/30 hover:text-white transition-colors disabled:opacity-0 cursor-pointer"
              disabled={activeIndex === 0}
            >
              <ChevronLeft className="w-10 h-10" strokeWidth={1} />
            </button>

            {/* Right Navigate Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (soundEnabled) playClickSound();
                setActiveIndex(prev => Math.min(prev + 1, products.length - 1));
              }}
              className="absolute right-[2%] lg:right-[5%] z-50 p-4 text-[#d5e0ff]/30 hover:text-white transition-colors disabled:opacity-0 cursor-pointer"
              disabled={activeIndex === products.length - 1}
            >
              <ChevronRight className="w-10 h-10" strokeWidth={1} />
            </button>

            {/* Center Slider Track */}
            <div 
              className="relative flex items-center justify-center w-full h-[520px] overflow-visible z-10"
              style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
            >
              {products.map((item, idx) => {
                const style = getCardStyle(idx, activeIndex);
                const isActive = idx === activeIndex;
                const IconComponent = iconMap[item.icon] || Briefcase;

                return (
                  <div
                    key={item.id}
                    onClick={() => handleCardClick(idx)}
                    style={style}
                    className={`absolute w-[290px] sm:w-[350px] md:w-[400px] h-[480px] sm:h-[520px] bg-[#020a19d9] backdrop-blur-xl border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.7)] rounded-xl flex flex-col transition-all duration-[600ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] cursor-pointer group overflow-hidden ${
                      isActive ? "hover:border-white/30" : ""
                    }`}
                  >
                    {/* Animated Mesh Backing */}
                    <CardMeshGradient colors={item.themeColors} active={isActive} />

                    {/* Progress tag inside card */}
                    <div className="absolute top-0 right-0 p-6 z-20">
                      <div className="font-mono text-[9px] sm:text-[10px] text-[#d5e0ff]/50 tracking-widest font-bold">
                        {(idx + 1).toString().padStart(2, "0")} <span className="text-[#d5e0ff]/20 mx-1">/</span> {products.length.toString().padStart(2, "0")}
                      </div>
                    </div>

                    {/* Content inside card */}
                    <div className="flex-1 flex flex-col p-8 sm:p-10 relative z-10 h-full">
                      
                      <div className="mt-6 mb-auto">
                        {/* Glowing Circular Icon wrapper */}
                        <div 
                          className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-6 sm:mb-8 transition-all duration-700 delay-100 ${
                            isActive ? "text-[#d5e0ff] scale-110 drop-shadow-[0_0_20px_rgba(213,224,255,0.4)]" : "text-[#d5e0ff]/40 scale-95"
                          }`}
                        >
                          <IconComponent className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />
                        </div>

                        {/* Module Category Tag */}
                        <div className="inline-flex items-center justify-center border border-[#d5e0ff]/20 bg-[#d5e0ff]/10 backdrop-blur-md px-3 py-1 mb-5 block w-max">
                          <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-[#d5e0ff]/80 font-bold">
                            {item.tag}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-[26px] sm:text-[32px] font-bold tracking-wider leading-[1.15] text-[#E5ECFF] uppercase font-sans">
                          {item.title}
                        </h3>
                      </div>

                      {/* Description & Action Trigger */}
                      <div className="mt-6 border-t border-[#d5e0ff]/10 pt-5">
                        <p className={`text-[13px] sm:text-[14px] leading-[1.6] font-light transition-colors duration-500 ${
                          isActive ? "text-[#d5e0ff]/80" : "text-[#d5e0ff]/40"
                        }`}>
                          {item.description}
                        </p>
                        
                        <div className="mt-6 flex items-center justify-between">
                          <span 
                            className={`font-mono text-[9px] sm:text-[10px] tracking-[0.2em] font-bold uppercase transition-all duration-500 flex items-center gap-1.5 ${
                              isActive ? "text-[#E5ECFF] opacity-100 translate-y-0" : "text-[#d5e0ff]/20 opacity-0 translate-y-2"
                            }`}
                          >
                            LAUNCH MODULE <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
            
          </div>
        ) : (
          /* Execution Modal Overlay */
          <AnimatePresence>
            {activeProduct && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full bg-[#020a19] border border-white/10 rounded-3xl overflow-hidden flex flex-col min-h-[600px] lg:h-[750px] shadow-[0_50px_100px_rgba(0,0,0,0.9)] relative z-[150]"
              >
                {/* Modal Header */}
                <header className="flex justify-between items-center p-6 sm:px-10 border-b border-[#d5e0ff]/10 bg-[#020a19]">
                  <button 
                    onClick={handleCloseModal}
                    className="flex items-center gap-3 text-[#d5e0ff]/60 hover:text-white transition-colors group cursor-pointer"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold">
                      RETURN TO PLATFORM
                    </span>
                  </button>
                  <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#d5e0ff]/40 hidden md:block">
                    EXECUTION MODULE // {activeProduct.id.toUpperCase()}
                  </div>
                </header>

                {/* Main Modal Body Splits */}
                <div className="flex flex-col lg:flex-row flex-1 overflow-hidden h-full">
                  
                  {/* Left: Input Form Panel */}
                  <div className="w-full lg:w-[500px] p-8 sm:p-10 lg:border-r border-b lg:border-b-0 border-[#d5e0ff]/10 overflow-y-auto no-scrollbar flex flex-col justify-between">
                    <div>
                      <div className="inline-flex border border-[#d5e0ff]/20 bg-[#d5e0ff]/5 px-3 py-1 mb-6">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#d5e0ff]/70 font-bold">
                          {activeProduct.tag}
                        </span>
                      </div>
                      <h2 className="text-[28px] sm:text-[34px] font-bold uppercase tracking-tight text-[#E5ECFF] mb-4 leading-tight">
                        {activeProduct.title}
                      </h2>
                      <p className="text-[13px] sm:text-[14px] text-[#d5e0ff]/60 leading-[1.6] font-light mb-8">
                        {activeProduct.description}
                      </p>

                      {/* Dynamic Inputs Render */}
                      <div className="space-y-6">
                        {activeProduct.inputs.map(input => (
                          <div key={input.id} className="space-y-3">
                            <label className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-[#d5e0ff]/50">
                              {input.label}
                            </label>
                            {input.type === "textarea" ? (
                              <textarea
                                value={inputValues[input.id] || ""}
                                onChange={(e) => handleInputChange(input.id, e.target.value)}
                                placeholder={input.placeholder}
                                rows={5}
                                className="w-full border border-[#d5e0ff]/10 bg-[#020a19] p-4 text-[13px] sm:text-[14px] text-[#d5e0ff] placeholder:text-[#d5e0ff]/20 focus:outline-none focus:border-[#d5e0ff]/40 transition-colors resize-none font-light rounded-lg"
                              />
                            ) : (
                              <input
                                type="text"
                                value={inputValues[input.id] || ""}
                                onChange={(e) => handleInputChange(input.id, e.target.value)}
                                placeholder={input.placeholder}
                                className="w-full border border-[#d5e0ff]/10 bg-[#020a19] p-4 text-[13px] sm:text-[14px] text-[#d5e0ff] placeholder:text-[#d5e0ff]/20 focus:outline-none focus:border-[#d5e0ff]/40 transition-colors font-light rounded-lg"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action execution button */}
                    <div className="pt-8">
                      <button
                        onClick={initiateDirective}
                        disabled={loading}
                        className="w-full bg-[#d5e0ff] hover:bg-white text-[#020a19] py-5 px-6 font-bold text-[11px] sm:text-[12px] uppercase tracking-[0.16em] transition-colors flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer rounded-lg"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>SYNTHESIZING...</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>INITIATE DIRECTIVE</span>
                          </>
                        )}
                      </button>
                      {error && (
                        <div className="mt-4 p-4 border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-mono uppercase tracking-wide rounded-lg">
                          ERR: {error}
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Right: Synthesis Results Display Panel */}
                  <div className="flex-grow p-8 sm:p-12 overflow-y-auto no-scrollbar relative min-h-[400px] lg:min-h-0 bg-[#d5e0ff]/[0.01]">
                    
                    {!result && !loading && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-[#d5e0ff]/20 p-6">
                        <Grid className="w-12 h-12 mb-6 opacity-20" strokeWidth={1} />
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#d5e0ff]/30 text-center">
                          Awaiting Input Parameters
                        </span>
                      </div>
                    )}

                    {loading && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-[#d5e0ff]/50 p-6">
                        <Loader2 className="w-10 h-10 animate-spin mb-6 opacity-50" strokeWidth={1.5} />
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                          Processing Request...
                        </span>
                      </div>
                    )}

                    {result && (
                      <div className="max-w-3xl mx-auto text-[#d5e0ff]/80 text-[15px] leading-[1.7] font-light animate-in fade-in duration-700">
                        {renderMarkdown(result)}
                      </div>
                    )}

                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Carousel Bottom Control Bar & Progress Indicator */}
        {!selectedProductId && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5 pt-8">
            
            {/* Sound Mute Indicator Toggle */}
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
              // ARNO LANDING SUITE 2026
            </div>

            {/* Slider Dots Tracker */}
            <div className="flex items-center gap-2">
              {products.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (soundEnabled) playClickSound();
                    setActiveIndex(idx);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    idx === activeIndex
                      ? "bg-[#d5e0ff] scale-150"
                      : "bg-[#d5e0ff]/20 hover:bg-[#d5e0ff]/50"
                  }`}
                  aria-label={`Slide to product ${idx + 1}`}
                />
              ))}
            </div>

            {/* Slider Completion Progress Percentage */}
            <div className="flex items-center gap-4 w-full sm:w-[220px]">
              <div className="h-[2px] bg-white/10 flex-grow relative overflow-hidden rounded-full">
                <div 
                  className="absolute top-0 left-0 h-full bg-[#d5e0ff] transition-all duration-300 rounded-full"
                  style={{ width: `${sliderProgress}%` }}
                />
              </div>
              <span className="font-mono text-[10px] text-[#d5e0ff] font-bold tracking-widest min-w-[36px] text-right">
                {Math.round(sliderProgress)}%
              </span>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
