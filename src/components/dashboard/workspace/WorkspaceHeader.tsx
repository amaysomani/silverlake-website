import React from "react";
import { FeatureData } from "@/lib/dashboard/mockData";
import { Download, History, ShieldCheck, AlertCircle } from "lucide-react";

export default function WorkspaceHeader({ data }: { data: FeatureData }) {
  return (
    <div className="h-16 border-b border-[#1f2937] flex items-center justify-between px-6 shrink-0 bg-[#060a13]">
      <div className="flex items-center gap-6">
        <div>
          <div className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">Client / Project</div>
          <div className="text-[13px] font-medium text-white/90">{data.clientName}</div>
        </div>
        
        <div className="w-px h-8 bg-white/5" />
        
        <div>
          <div className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">Date Range</div>
          <div className="text-[13px] text-white/70">{data.dateRange}</div>
        </div>

        <div className="w-px h-8 bg-white/5" />
        
        <div>
          <div className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">Owner</div>
          <div className="text-[13px] text-white/70 flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[8px] font-bold">
              {data.owner.charAt(0)}
            </div>
            {data.owner}
          </div>
        </div>

        <div className="w-px h-8 bg-white/5" />
        
        <div>
          <div className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">Status</div>
          <div className="flex items-center gap-1.5">
            {data.verificationStatus === "Verified" ? (
              <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-yellow-500" />
            )}
            <span className={`text-[12px] ${data.verificationStatus === "Verified" ? "text-green-400" : "text-yellow-500"}`}>
              {data.verificationStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-[10px] text-white/30 mr-2">
          Last updated: {data.lastUpdated !== "Never" ? new Date(data.lastUpdated).toLocaleString() : "Never"}
        </div>
        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors">
          <History className="w-4 h-4" />
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors">
          <Download className="w-3.5 h-3.5" />
          Export
        </button>
      </div>
    </div>
  );
}
