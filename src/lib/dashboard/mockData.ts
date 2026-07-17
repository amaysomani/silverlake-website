export interface Source {
  id: string;
  title: string;
  type: string;
  url?: string;
  dateAccessed: string;
  owner: string;
  status: "Verified" | "Awaiting Verification" | "Pending";
}

export interface WorkspaceRecord {
  id: string;
  title: string;
  status: "Draft" | "In Review" | "Changes Requested" | "Approved" | "Active" | "Completed" | "Archived";
  updatedAt: string;
}

export interface FeatureData {
  featureId: string;
  state: "populated" | "empty";
  emptyReason?: "No data connected" | "Awaiting verification" | "Manual input required" | "Insufficient data";
  clientName: string;
  dateRange: string;
  lastUpdated: string;
  owner: string;
  verificationStatus: string;
  sources: Source[];
  records: WorkspaceRecord[];
  workspaceContent?: any;
}

// A completely populated example for 'employer-brand-audit'
const employerBrandAuditData: FeatureData = {
  featureId: "employer-brand-audit",
  state: "populated",
  clientName: "Elysian Azure Resorts",
  dateRange: "Jan 1, 2026 - Jun 30, 2026",
  lastUpdated: "2026-07-16T10:30:00Z",
  owner: "S. Rossi",
  verificationStatus: "Verified",
  sources: [
    { id: "s1", title: "Elysian Careers Page", type: "Website", dateAccessed: "2026-07-10", owner: "System", status: "Verified" },
    { id: "s2", title: "2025 Employee Survey", type: "Document", dateAccessed: "2026-07-12", owner: "HR Team", status: "Verified" },
    { id: "s3", title: "Competitor Analysis 2026", type: "Research", dateAccessed: "2026-07-15", owner: "Strategy", status: "Awaiting Verification" }
  ],
  records: [
    { id: "r1", title: "Initial Audit Draft", status: "In Review", updatedAt: "2026-07-14T09:00:00Z" },
    { id: "r2", title: "Competitor Comparison", status: "Approved", updatedAt: "2026-07-15T14:30:00Z" }
  ],
  workspaceContent: {
    employerPromise: "We empower hospitality leaders to redefine luxury.",
    cultureThemes: ["Excellence", "Sustainability", "Guest-first", "Innovation"],
    gaps: ["Sustainability claims lack concrete data", "Diversity messaging is inconsistent across regions"]
  }
};

// An empty state example for 'talent-narrative'
const talentNarrativeData: FeatureData = {
  featureId: "talent-narrative",
  state: "empty",
  emptyReason: "Manual input required",
  clientName: "Elysian Azure Resorts",
  dateRange: "N/A",
  lastUpdated: "Never",
  owner: "Unassigned",
  verificationStatus: "Pending",
  sources: [],
  records: []
};

// Fallback for all other features
const defaultEmptyData: FeatureData = {
  featureId: "default",
  state: "empty",
  emptyReason: "No data connected",
  clientName: "Elysian Azure Resorts",
  dateRange: "YTD 2026",
  lastUpdated: "Never",
  owner: "System",
  verificationStatus: "Awaiting Verification",
  sources: [],
  records: []
};

export function getFeatureData(featureId: string): FeatureData {
  if (featureId === "employer-brand-audit") {
    return employerBrandAuditData;
  }
  if (featureId === "talent-narrative") {
    return talentNarrativeData;
  }
  return { ...defaultEmptyData, featureId };
}
