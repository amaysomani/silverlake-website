import React from "react";

export default function ModuleShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex min-w-0 h-full overflow-hidden">
      {children}
    </div>
  );
}
