"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, FileText, PenTool, ShieldAlert, Search,
  Calculator, Presentation, Grid, Building, PieChart,
  TrendingUp, Code, Shield, Users, Scale,
  ArrowLeft, ArrowRight, Loader2, Play
} from "lucide-react";
import { playClickSound, playHoverSound } from "@/lib/ArnoAudio";
import ModuleDashboard from "./ModuleDashboard";

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
  descriptionPoints: string[];
  icon: string;
  themeColors: string[];
  inputs: ProductInput[];
  getSystemInstruction: () => string;
  getPrompt: (inputs: Record<string, string>) => string;
}

const products: Product[] = [
  {
    id: "sector-intel",
    title: "Sector Intelligence",
    description: "Generates a 1000-word venture capital funding analysis thesis.",
    descriptionPoints: [
      "Runs regression & classification models (XGBoost) to forecast sector-specific CAGR.",
      "Identifies historical capital deployment velocity and growth anomalies.",
      "Retrieves relevant market regulations, policies, and macro reports using RAG.",
      "Assesses capital availability and macro trends (inflation, GDP, interest rates).",
      "Synthesizes a structured 1,000-word investment thesis outlining entry routes."
    ],
    icon: "Briefcase",
    themeColors: ["#0d5e65", "#248694", "#157582", "#084851"],
    inputs: [{ id: "sector", label: "Sector Name", type: "text", placeholder: "e.g., Enterprise AI, SpaceTech" }],
    getSystemInstruction: () => "You are an elite VC Strategist. Output factual, analytical analysis. Use markdown.",
    getPrompt: (i) => `Analyze the current venture capital funding environment for ${i.sector || "Enterprise AI"} over the last 12 months. Structure: 1. Macro Thesis, 2. Capital Deployment Trends, 3. Legal Friction, 4. Actionable Strategy.`
  },
  {
    id: "investment-memo",
    title: "Investment Memo",
    description: "Distills complex Term Sheet provisions into a concise 2-page summary.",
    descriptionPoints: [
      "Extracts key economic terms, share values, and liquidation preferences.",
      "Highlights corporate governance, board composition, and veto rights.",
      "Assesses drag-along, tag-along, and right of first refusal (ROFR) mechanics.",
      "Builds dynamic comparative models contrasting terms with industry standards.",
      "Generates a formatted executive summary outlining core legal leverage points."
    ],
    icon: "FileText",
    themeColors: ["#a64b28", "#c96f43", "#853a1a", "#612a14"],
    inputs: [{ id: "termSheet", label: "Raw Term Sheet Text", type: "textarea", placeholder: "Paste raw term sheet draft here..." }],
    getSystemInstruction: () => "You are a senior partner at an elite private funds law firm. Distill highly complex legal documents into their fundamental commercial implications. use markdown tables strictly.",
    getPrompt: (i) => `Review the draft Term Sheet for a Series A financing:\n\n${i.termSheet || ""}\n\nGenerate a comprehensive 2-page Investment Memo extracting Economic Architecture, Control Rights, Downside Mechanics, and Deviation Analysis.`
  },
  {
    id: "founder-vesting",
    title: "Advisory Content",
    description: "Drafts highly direct advisory content for founders regarding vesting mechanics.",
    descriptionPoints: [
      "Explains standard time-based vesting schedules and 1-year cliff models.",
      "Analyzes the impact and benefits of filing Section 83(b) tax elections.",
      "Decodes single and double-trigger acceleration mechanisms upon exits.",
      "Advises on company repurchase options and clawbacks on unvested equity.",
      "Guides co-founders in setting up dynamic equity splits for team retention."
    ],
    icon: "PenTool",
    themeColors: ["#134e5e", "#71b280", "#0f9b0f", "#1d976c"],
    inputs: [{ id: "context", label: "Specific Focus", type: "text", placeholder: "Leave blank for standard analysis" }],
    getSystemInstruction: () => "You are an experienced legal architect advising YC-backed founders.",
    getPrompt: (i) => `Draft a 800-word advisory article titled "The Mechanics of Founder Vesting". Focus context: ${i.context || "None"}.`
  },
  {
    id: "lp-compliance",
    title: "LP Compliance",
    description: "Extracts and maps ongoing operational obligations from LP Side Letters.",
    descriptionPoints: [
      "Audits LP Side Letters, subscription books, and placement memoranda.",
      "Tracks specific co-investment rights, board observer roles, and GP restrictions.",
      "Maps compliance schedules and periodic financial/ESG reporting deadlines.",
      "Identifies key-person triggers, concentration limits, and investment exclusions.",
      "Formulates actionable GP compliance matrices to prevent contractual defaults."
    ],
    icon: "ShieldAlert",
    themeColors: ["#2980b9", "#6dd5ed", "#2193b0", "#2c3e50"],
    inputs: [{ id: "lpName", label: "Limited Partner Name", type: "text", placeholder: "e.g., Sovereign Wealth Fund Alpha" }, { id: "sideLetter", label: "Side Letter Text", type: "textarea", placeholder: "Paste full side letter text here..." }],
    getSystemInstruction: () => "You are a meticulous fund formation attorney specializing in LP compliance.",
    getPrompt: (i) => `Analyze the Side Letter for ${i.lpName || "Sovereign Wealth Fund Alpha"}:\n\n${i.sideLetter || ""}\n\nExtract obligations using a markdown table (Type, Requirement, Frequency, Risk Level).`
  },
  {
    id: "dd-checklist",
    title: "Diligence Flaw Assessor",
    description: "Cross-references a data room index against standard Series A checklists.",
    descriptionPoints: [
      "Audits startup virtual data rooms against institutional financing checklists.",
      "Flags discrepancies in IP assignments, employment contracts, and board consents.",
      "Analyzes capitalization ledger consistency and historic options authorizations.",
      "Screens material corporate agreements for change-of-control liabilities.",
      "Delivers a prioritized list of diligence deficiencies for legal remediation."
    ],
    icon: "SearchCheck",
    themeColors: ["#cb2d3e", "#ef473a", "#c84e89", "#ff0844"],
    inputs: [{ id: "dataRoomIndex", label: "Data Room Document Index", type: "textarea", placeholder: "Paste the list of documents..." }],
    getSystemInstruction: () => "You are an operational efficiency expert within a PE/VC law firm.",
    getPrompt: (i) => `Review the provided index of documents:\n\n${i.dataRoomIndex || ""}\n\nCross-reference against Series A checklist. Write narrative report identifying critical missing documents.`
  },
  {
    id: "cap-table",
    title: "Cap Table Simulator",
    description: "Calculates dilution impact and returns waterfall under various exit scenarios.",
    descriptionPoints: [
      "Simulates post-financing share structures and overall dilution impacts.",
      "Computes the cost and dilutive effect of expanding employee option pools.",
      "Calculates conversion ratios for SAFEs, convertible debt, and warrants.",
      "Models voting rights distribution across multiple classes of shareholders.",
      "Projects founder ownership percentages through future funding milestones."
    ],
    icon: "Calculator",
    themeColors: ["#1D976C", "#93F9B9", "#00b4db", "#0083B0"],
    inputs: [{ id: "capData", label: "Current Cap Table", type: "textarea", placeholder: "Paste capitalization data here..." }, { id: "roundDetails", label: "Proposed Round Details", type: "text", placeholder: "e.g., $10M on $40M pre-money" }],
    getSystemInstruction: () => "You are an expert financial modeler and startup lawyer.",
    getPrompt: (i) => `Given current cap table:\n${i.capData || ""}\n\nAnd proposed round:\n${i.roundDetails || ""}\n\nCalculate post-money ownership percentages.`
  },
  {
    id: "pitch-deck",
    title: "Pitch Deck Analyzer",
    description: "Evaluates presentation flow, market sizing claims, and competitive positioning.",
    descriptionPoints: [
      "Critiques slide sequence, narrative consistency, and key message clarity.",
      "Validates TAM/SAM calculation methodologies and market penetration projections.",
      "Evaluates competitor profiling tables, feature comparisons, and defense moats.",
      "Assesses leadership team representation and founder-market fit messaging.",
      "Recommends structural slide optimizations to align with venture capital standards."
    ],
    icon: "Presentation",
    themeColors: ["#e65c00", "#F9D423", "#f5af19", "#ff9966"],
    inputs: [{ id: "deckOutline", label: "Deck Text/Outline", type: "textarea", placeholder: "Paste slide contents or outline..." }],
    getSystemInstruction: () => "You are an active seed-stage VC. Critically evaluate pitch materials.",
    getPrompt: (i) => `Analyze the following pitch deck outline:\n\n${i.deckOutline || ""}\n\nIdentify 3 weak points and suggest structural improvements.`
  },
  {
    id: "competitor",
    title: "Competitor Matrix",
    description: "Generates a strategic comparison matrix across product, pricing, and moats.",
    descriptionPoints: [
      "Compares product feature sets, release speeds, and proprietary tech.",
      "Maps pricing tiers, licensing terms, and contract value structures.",
      "Identifies market positioning, brand identity, and customer acquisition channels.",
      "Highlights competitor defensibility moats, patents, and network effects.",
      "Evaluates strategic expansion directions and potential product-market fit pivots."
    ],
    icon: "Grid",
    themeColors: ["#8E2DE2", "#4A00E0", "#753a88", "#203a43"],
    inputs: [{ id: "competitors", label: "Target & Competitors", type: "textarea", placeholder: "List main competitor names/URLs..." }],
    getSystemInstruction: () => "You are an elite market researcher.",
    getPrompt: (i) => `Create a feature, pricing, and moat comparison matrix for:\n\n${i.competitors || ""}\n\nUse markdown tables.`
  },
  {
    id: "spv",
    title: "SPV Structuring",
    description: "Advises on optimal entity formation and syndication structures for deals.",
    descriptionPoints: [
      "Details tax and regulatory implications of Delaware vs. offshore syndicates.",
      "Outlines GP management fee structures, carry distribution, and hurdle rates.",
      "Coordinates compliance checks including investor accreditation and AML/KYC.",
      "Sets co-investment parameters and operational guidelines for syndicates.",
      "Designs legal blueprints for capital calls and asset distribution events."
    ],
    icon: "Building",
    themeColors: ["#cc2b5e", "#753a88", "#f093fb", "#f5576c"],
    inputs: [{ id: "dealParams", label: "Syndicate Deal Parameters", type: "textarea", placeholder: "Total raise, carry, LP count..." }],
    getSystemInstruction: () => "You are a corporate structuring attorney.",
    getPrompt: (i) => `Draft an SPV structuring memo based on:\n\n${i.dealParams || ""}\n\nRecommend domicile, GP/LP structure.`
  },
  {
    id: "equity-split",
    title: "Founder Equity Split",
    description: "Provides framework for dynamic equity splitting among founding teams.",
    descriptionPoints: [
      "Weights early contributions across initial capital, technology, and patents.",
      "Factors in future commitment, full-time status, and opportunity costs.",
      "Recommends milestone-based vesting to align incentive schemes.",
      "Implements clawback mechanics to protect equity if a founder departs early.",
      "Provides a fair allocation framework to prevent co-founder alignment friction."
    ],
    icon: "PieChart",
    themeColors: ["#f7186a", "#ec8c69", "#ed6ea0", "#ff0844"],
    inputs: [{ id: "teamProfiles", label: "Founder Contributions", type: "textarea", placeholder: "Describe each founder role and time commitment..." }],
    getSystemInstruction: () => "You are a pragmatic YC partner.",
    getPrompt: (i) => `Analyze founding team profiles:\n\n${i.teamProfiles || ""}\n\nRecommend an equity split framework.`
  },
  {
    id: "exit-model",
    title: "Exit Modeler",
    description: "Visualizes liquidity events and liquidation preference impacts.",
    descriptionPoints: [
      "Calculates payout waterfalls for multi-class structures upon exit.",
      "Assesses cash impact of participating vs. non-participating preferred shares.",
      "Simulates payouts across acquisition valuations and IPO prices.",
      "Computes IRR, MoIC, and exit returns for each investor class and founders.",
      "Identifies potential misalignment of exit incentives between founders and LPs."
    ],
    icon: "TrendingUp",
    themeColors: ["#f12711", "#f5af19", "#e8ae2f", "#ff5e62"],
    inputs: [{ id: "preferences", label: "Liquidation Preferences", type: "textarea", placeholder: "List investor classes and preference terms..." }, { id: "exitValue", label: "Target Exit Value", type: "text", placeholder: "e.g., $50M, $100M M&A" }],
    getSystemInstruction: () => "You are a mathematically rigorous investment banker.",
    getPrompt: (i) => `Model payout waterfall for exit value ${i.exitValue || ""} based on:\n\n${i.preferences || ""}\n\nShow exact returns by share class in a markdown table.`
  },
  {
    id: "term-sheet",
    title: "Term Sheet Generator",
    description: "Drafts NVCA-aligned term sheet provisions based on deal parameters.",
    descriptionPoints: [
      "Drafts NVCA-standard terms customized to specific round pricing parameters.",
      "Formulates right of first refusal, co-sale rights, and registration rights.",
      "Outlines board representation guidelines and protective provisions list.",
      "Configures dividend privileges, conversion features, and anti-dilution rules.",
      "Streamlines initial negotiation cycles by providing clean, industry-standard drafts."
    ],
    icon: "Code",
    themeColors: ["#1e3c72", "#2a5298", "#99f2c8", "#1f4037"],
    inputs: [{ id: "economics", label: "Key Deal Economics", type: "textarea", placeholder: "Valuation, raise, board seats..." }],
    getSystemInstruction: () => "You are a venture lawyer drafting NVCA standard documents.",
    getPrompt: (i) => `Generate a draft Term Sheet skeleton based on:\n\n${i.economics || ""}`
  },
  {
    id: "ip-check",
    title: "IP Chain Checker",
    description: "Reviews chain of title and open source risks in tech transactions.",
    descriptionPoints: [
      "Reviews historical invention assignment agreements and contractor documents.",
      "Audits codebases for open-source licenses and copywriting compliance.",
      "Searches patent databases to identify potential infringement or litigation risks.",
      "Maps intellectual property transfer histories from university or studio roots.",
      "Specifies required remedial assignments to secure clean corporate title."
    ],
    icon: "Shield",
    themeColors: ["#f093fb", "#f5576c", "#ff5e62", "#ff9966"],
    inputs: [{ id: "ipContext", label: "IP Development Context", type: "textarea", placeholder: "Describe how core IP was built..." }],
    getSystemInstruction: () => "You are a technology transactions attorney.",
    getPrompt: (i) => `Review IP context:\n\n${i.ipContext || ""}\n\nIdentify critical chain-of-title risks.`
  },
  {
    id: "employment",
    title: "Employment Reviewer",
    description: "Scans executive employment agreements for severance and acceleration triggers.",
    descriptionPoints: [
      "Reviews executive contracts for severance structures, notice times, and terms.",
      "Flags single-trigger and double-trigger vesting acceleration scenarios.",
      "Audits non-disclosure, non-solicit, and non-compete restrictive covenants.",
      "Evaluates contract definitions of 'Cause' and 'Good Reason' termination.",
      "Highlights potential exposure to Section 280G excise taxes on golden parachutes."
    ],
    icon: "Users",
    themeColors: ["#11998e", "#38ef7d", "#134e5e", "#71b280"],
    inputs: [{ id: "employmentDoc", label: "Agreement Excerpt", type: "textarea", placeholder: "Paste sections on termination/severance..." }],
    getSystemInstruction: () => "You are an executive compensation lawyer.",
    getPrompt: (i) => `Analyze employment excerpt:\n\n${i.employmentDoc || ""}\n\nSummarize severance obligations and equity acceleration risks.`
  },
  {
    id: "compliance",
    title: "Compliance Screener",
    description: "Flags regulatory requirements (HIPAA, FINRA, FDA) based on product description.",
    descriptionPoints: [
      "Identifies relevant compliance standards like HIPAA, FINRA, GDPR, or FDA.",
      "Maps out necessary licensing, certification, and state registration timelines.",
      "Screens operational flows for data security, retention, and data privacy mandates.",
      "Estimates timeline and cost projections for achieving full compliance status.",
      "Outlines risk-mitigation measures to address regulatory enforcement actions."
    ],
    icon: "Scale",
    themeColors: ["#141E30", "#243B55", "#4B79A1", "#283E51"],
    inputs: [{ id: "productDesc", label: "Product & Market", type: "textarea", placeholder: "What does the product do and who buys it?" }],
    getSystemInstruction: () => "You are a regulatory compliance specialist.",
    getPrompt: (i) => `Review product:\n\n${i.productDesc || ""}\n\nOutline primary US and EU regulatory frameworks.`
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

export default function InnoProductGrid({ soundEnabled }: InnoProductGridProps) {
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
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
                    <ModuleDashboard moduleId={activeProduct.id} themeColors={activeProduct.themeColors} />
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
