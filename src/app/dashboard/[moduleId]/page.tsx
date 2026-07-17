import React from "react";
import { notFound } from "next/navigation";
import { trueBrainModules } from "@/lib/dashboard/moduleConfig";
import ModuleClient from "./ModuleClient";

interface ModulePageProps {
  params: {
    moduleId: string;
  };
}

// Ensure generateStaticParams if needed for static export, or dynamic is fine
export function generateStaticParams() {
  return trueBrainModules.map((m) => ({
    moduleId: m.id,
  }));
}

export default function ModulePage({ params }: ModulePageProps) {
  const moduleConfig = trueBrainModules.find((m) => m.id === params.moduleId);

  if (!moduleConfig) {
    notFound();
  }

  return <ModuleClient moduleConfig={moduleConfig} />;
}
