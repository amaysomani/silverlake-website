"use client";

import React, { useState } from "react";
import { ModuleConfig } from "@/lib/dashboard/moduleConfig";
import { getFeatureData } from "@/lib/dashboard/mockData";
import ModuleSidebar from "@/components/dashboard/sidebar/ModuleSidebar";
import ModuleShell from "@/components/dashboard/ModuleShell";
import MiddlePanel from "@/components/dashboard/middle/MiddlePanel";
import WorkspaceHeader from "@/components/dashboard/workspace/WorkspaceHeader";
import MainWorkspace from "@/components/dashboard/workspace/MainWorkspace";
import EmptyState from "@/components/dashboard/workspace/EmptyState";

interface ModuleClientProps {
  moduleConfig: ModuleConfig;
}

export default function ModuleClient({ moduleConfig }: ModuleClientProps) {
  const [activeFeatureId, setActiveFeatureId] = useState<string>(
    moduleConfig.features.length > 0 ? moduleConfig.features[0].id : ""
  );

  const activeFeature = moduleConfig.features.find(f => f.id === activeFeatureId);
  
  if (!activeFeature) {
    return <div className="p-8 text-white">Feature not found.</div>;
  }

  // Fetch the mock data for the current feature
  const featureData = getFeatureData(activeFeatureId);

  return (
    <ModuleShell>
      <ModuleSidebar 
        module={moduleConfig}
        activeFeatureId={activeFeatureId}
        onFeatureSelect={setActiveFeatureId}
      />
      
      <MiddlePanel 
        featureConfig={activeFeature}
        featureData={featureData}
      />
      
      <div className="flex-1 flex flex-col min-w-0 bg-[#060a13]">
        <WorkspaceHeader data={featureData} />
        
        {featureData.state === "empty" ? (
          <EmptyState reason={featureData.emptyReason || "No data connected"} />
        ) : (
          <MainWorkspace 
            featureConfig={activeFeature}
            featureData={featureData}
          />
        )}
      </div>
    </ModuleShell>
  );
}
