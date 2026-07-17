import React from "react";
import { ModuleConfig } from "@/lib/dashboard/moduleConfig";

interface ModuleSidebarProps {
  module: ModuleConfig;
  activeFeatureId: string;
  onFeatureSelect: (id: string) => void;
}

export default function ModuleSidebar({ module, activeFeatureId, onFeatureSelect }: ModuleSidebarProps) {
  return (
    <div className="w-[280px] shrink-0 border-r border-[#1f2937] flex flex-col p-6 bg-[#0a0d14] h-full overflow-y-auto no-scrollbar">
      <div className="mb-8">
        <h1 className="text-xl font-serif text-white/90 mb-2">{module.title}</h1>
        <p className="text-xs text-white/40 leading-relaxed">{module.description}</p>
      </div>

      <div className="flex flex-col gap-2">
        {module.features.map((feature, index) => {
          const isActive = feature.id === activeFeatureId;
          return (
            <button
              key={feature.id}
              onClick={() => onFeatureSelect(feature.id)}
              className={`flex items-start gap-3 p-3 text-left rounded-xl transition-all border ${
                isActive
                  ? "bg-[#1f2937]/50 border-white/10 text-white shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                  : "border-transparent text-white/50 hover:bg-[#1f2937]/20 hover:text-white/80"
              }`}
            >
              <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-medium border ${
                isActive ? "bg-blue-500/10 border-blue-500/30 text-blue-400" : "bg-white/5 border-white/10 text-white/40"
              }`}>
                {index + 1}
              </div>
              <div>
                <div className={`text-sm font-medium mb-1 ${isActive ? "text-white" : ""}`}>
                  {feature.title}
                </div>
                {isActive && (
                  <div className="text-[10px] text-white/40 leading-relaxed">
                    {feature.purpose}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
