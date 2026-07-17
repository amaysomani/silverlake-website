import React from "react";
import { FeatureConfig } from "@/lib/dashboard/moduleConfig";
import { FeatureData } from "@/lib/dashboard/mockData";
import { Link, FileText, CheckCircle2, AlertCircle, Clock } from "lucide-react";

interface MiddlePanelProps {
  featureConfig: FeatureConfig;
  featureData: FeatureData;
}

export default function MiddlePanel({ featureConfig, featureData }: MiddlePanelProps) {
  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case "Verified":
      case "Approved":
        return <CheckCircle2 className="w-3 h-3 text-green-400" />;
      case "Awaiting Verification":
      case "In Review":
        return <Clock className="w-3 h-3 text-yellow-400" />;
      default:
        return <AlertCircle className="w-3 h-3 text-white/30" />;
    }
  };

  return (
    <div className="w-[300px] shrink-0 border-r border-[#1f2937] bg-[#0B0F19] flex flex-col h-full overflow-y-auto no-scrollbar p-5">
      
      {featureConfig.inputs && featureConfig.inputs.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xs font-serif text-white/80 mb-3 tracking-wide uppercase">Required Inputs</h3>
          <div className="flex flex-col gap-1.5">
            {featureConfig.inputs.map((input) => (
              <div key={input} className="text-[11px] text-white/50 flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5">
                <div className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
                {input}
              </div>
            ))}
          </div>
        </div>
      )}

      {featureData.records.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xs font-serif text-white/80 mb-3 tracking-wide uppercase">Saved Records</h3>
          <div className="flex flex-col gap-2">
            {featureData.records.map((record) => (
              <div key={record.id} className="bg-[#1f2937]/30 border border-white/5 p-3 rounded-xl hover:bg-[#1f2937]/50 transition-colors cursor-pointer">
                <div className="text-[12px] text-white/90 font-medium mb-1 truncate">{record.title}</div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1.5">
                    <StatusIcon status={record.status} />
                    <span className="text-[9px] text-white/40">{record.status}</span>
                  </div>
                  <span className="text-[9px] text-white/30">{new Date(record.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xs font-serif text-white/80 mb-3 tracking-wide uppercase">Uploaded Sources</h3>
        {featureData.sources.length === 0 ? (
          <div className="text-[11px] text-white/30 italic px-2">No sources uploaded.</div>
        ) : (
          <div className="flex flex-col gap-2">
            {featureData.sources.map((source) => (
              <div key={source.id} className="bg-[#1f2937]/20 border border-white/5 p-2.5 rounded-lg flex flex-col gap-1.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="text-[11px] text-white/80 truncate">{source.title}</span>
                  </div>
                  <StatusIcon status={source.status} />
                </div>
                <div className="flex items-center justify-between pl-5">
                  <span className="text-[9px] text-white/40">{source.type}</span>
                  <span className="text-[9px] text-white/30">{source.dateAccessed}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
