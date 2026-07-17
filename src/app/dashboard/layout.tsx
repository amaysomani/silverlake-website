import React from "react";
import GlobalSidebar from "@/components/dashboard/sidebar/GlobalSidebar";

export const metadata = {
  title: "TrueBrain Dashboard | Silverlake Law",
  description: "AI-powered service dashboards for TrueBrain.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-[#0B0F19] text-white font-sans overflow-hidden">
      <GlobalSidebar />
      <div className="flex-1 flex min-w-0">
        {children}
      </div>
    </div>
  );
}
