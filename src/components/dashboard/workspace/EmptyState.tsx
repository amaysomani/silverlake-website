import React from "react";
import { AlertCircle, Database, Edit3, Loader2 } from "lucide-react";

interface EmptyStateProps {
  reason: "No data connected" | "Awaiting verification" | "Manual input required" | "Insufficient data";
}

export default function EmptyState({ reason }: EmptyStateProps) {
  
  const getIcon = () => {
    switch (reason) {
      case "No data connected":
        return <Database className="w-8 h-8 text-blue-500/50" />;
      case "Awaiting verification":
        return <Loader2 className="w-8 h-8 text-yellow-500/50 animate-spin-slow" />;
      case "Manual input required":
        return <Edit3 className="w-8 h-8 text-purple-500/50" />;
      case "Insufficient data":
        return <AlertCircle className="w-8 h-8 text-orange-500/50" />;
    }
  };

  const getMessage = () => {
    switch (reason) {
      case "No data connected":
        return "Connect your client data sources or integrations to populate this workspace.";
      case "Awaiting verification":
        return "Sources have been uploaded and are currently pending human verification.";
      case "Manual input required":
        return "Please complete the required input fields in the left panel to begin analysis.";
      case "Insufficient data":
        return "Not enough data has been collected to generate meaningful insights yet.";
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-10 bg-gradient-to-b from-[#0B0F19] to-[#0a0d14]">
      <div className="w-24 h-24 rounded-full bg-[#1f2937]/30 border border-white/5 flex items-center justify-center mb-6 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
        {getIcon()}
      </div>
      <h2 className="text-xl font-serif text-white/90 mb-3">{reason}</h2>
      <p className="text-sm text-white/40 max-w-md text-center leading-relaxed">
        {getMessage()}
      </p>
      
      {reason === "No data connected" && (
        <button className="mt-8 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors">
          Connect Data Sources
        </button>
      )}
    </div>
  );
}
