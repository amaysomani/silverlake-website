import React from "react";
import { FeatureConfig } from "@/lib/dashboard/moduleConfig";
import { FeatureData } from "@/lib/dashboard/mockData";
import { Sparkles, FileText, ArrowRight } from "lucide-react";

interface MainWorkspaceProps {
  featureConfig: FeatureConfig;
  featureData: FeatureData;
}

export default function MainWorkspace({ featureConfig, featureData }: MainWorkspaceProps) {
  return (
    <div className="flex-1 bg-gradient-to-b from-[#0B0F19] to-[#0a0d14] p-8 overflow-y-auto no-scrollbar">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Workspace Fields Grid */}
        <div className="grid grid-cols-2 gap-6">
          {featureConfig.workspaceFields?.slice(0, 4).map((field, index) => {
            // Mock pulling data dynamically if it matches our mock content
            let content = "Analyzing inputs to generate insights...";
            if (featureData.workspaceContent) {
              const key = Object.keys(featureData.workspaceContent)[index];
              if (key && featureData.workspaceContent[key]) {
                const val = featureData.workspaceContent[key];
                content = Array.isArray(val) ? val.join(" • ") : val;
              }
            }

            return (
              <div key={field} className="bg-[#1f2937]/30 border border-white/5 rounded-xl p-5 hover:bg-[#1f2937]/40 transition-colors">
                <div className="text-[11px] font-medium text-white/50 uppercase tracking-wider mb-3">
                  {field}
                </div>
                <div className="text-sm text-white/90 leading-relaxed font-serif">
                  {content}
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Recommendations / Output Preview */}
        <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-medium text-blue-100">AI Analysis & Generation</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            {featureConfig.outputs?.slice(0, 3).map((output) => (
              <div key={output} className="flex items-start gap-3 p-4 rounded-lg bg-[#0B0F19]/50 border border-white/5">
                <FileText className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm text-white/90 mb-1">{output}</div>
                  <div className="text-xs text-white/40">Ready for review</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        {featureConfig.actions && (
          <div>
            <h3 className="text-xs font-serif text-white/80 mb-4 tracking-wide uppercase">Available Actions</h3>
            <div className="flex flex-wrap gap-3">
              {featureConfig.actions.map((action, index) => (
                <button
                  key={action}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    index === 0
                      ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                      : "bg-[#1f2937]/50 hover:bg-[#1f2937] text-white/70 border border-white/5"
                  }`}
                >
                  {action}
                  {index === 0 && <ArrowRight className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
