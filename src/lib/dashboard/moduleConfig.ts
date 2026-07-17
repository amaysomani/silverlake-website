export interface FeatureConfig {
  id: string;
  title: string;
  purpose: string;
  inputs?: string[];
  workspaceFields?: string[];
  outputs?: string[];
  actions?: string[];
}

export interface ModuleConfig {
  id: string;
  title: string;
  description: string;
  features: FeatureConfig[];
}

export const trueBrainModules: ModuleConfig[] = [
  {
    id: "recruitment-intelligence",
    title: "Recruitment Intelligence",
    description: "Employer Brand, Talent Attraction and Employee Communications",
    features: [
      {
        id: "employer-brand-audit",
        title: "Employer Brand Audit",
        purpose: "Evaluate how the organisation presents itself to employees and prospective talent.",
        inputs: ["Careers page", "Job descriptions", "Recruitment presentations", "Employee handbook", "Employer brand materials", "Employee survey results", "Candidate feedback", "Competitor names", "Employer review data where authorised"],
        workspaceFields: ["Employer promise", "Culture themes", "Benefits", "Career development", "Workplace values", "Leadership positioning", "Diversity and inclusion messaging", "Social purpose messaging", "Claim and proof comparison", "Competitor employer comparison", "Communication gaps"],
        outputs: ["Employer Brand Audit Report", "Current employer brand position", "Strongest communication themes", "Unsupported claims", "Message inconsistencies", "Candidate information gaps", "Competitive white space", "Recommended priorities", "Evidence appendix"],
        actions: ["Generate audit", "Add competitor", "Assign reviewer", "Create improvement workflow", "Export report"]
      },
      {
        id: "talent-narrative",
        title: "Talent Narrative",
        purpose: "Create a consistent employer narrative explaining why people should join, contribute, and remain.",
        inputs: ["Corporate purpose", "Mission and values", "Leadership interviews", "Employee interviews", "Culture documentation", "Candidate research", "Business strategy", "Existing EVP", "Survey findings"],
        workspaceFields: ["Employer promise", "Employee experience", "Culture principles", "Reasons to believe", "Career growth proposition", "Leadership commitment", "Audience variants"],
        outputs: ["Employer Narrative Framework", "Core narrative", "Employer value proposition", "Message pillars", "Proof points", "Audience-specific versions", "Approved vocabulary", "Language to avoid", "Careers page copy summary", "Interview stage message guide", "Onboarding message guide"],
        actions: ["Build narrative", "Compare versions", "Submit for approval", "Generate audience adaptation", "Export narrative deck"]
      },
      {
        id: "candidate-journey",
        title: "Candidate Journey",
        purpose: "Map the communication journey from awareness to onboarding.",
        inputs: [],
        workspaceFields: ["Awareness", "Consideration", "Careers research", "Application", "Interview", "Offer", "Pre-joining", "Onboarding"],
        outputs: ["Current-state journey", "Communication gaps", "Content requirements", "Ownership map", "Future-state journey", "Priority actions"],
        actions: ["Add touchpoint", "Upload communication", "Create content brief", "Assign owner", "Export journey map"]
      },
      {
        id: "employee-communications",
        title: "Employee Communications",
        purpose: "Plan and manage communications that inform employees, support change, and strengthen trust.",
        inputs: ["Leadership announcements", "Organisational change", "Internal campaigns", "Town halls", "Newsletters", "Policy communications", "Culture programmes", "Onboarding communications", "Employee feedback"],
        workspaceFields: ["Title", "Objective", "Audience", "Context", "Key message", "Proof", "Sender", "Channel", "Scheduled date", "Approval owner", "Status", "Attachments", "Feedback", "Follow-up"],
        outputs: ["Employee communication plan", "Leadership message", "Manager briefing", "Employee FAQ", "Town hall script", "Communication calendar", "Feedback summary"],
        actions: ["Create communication", "Start approval workflow", "Schedule release", "Record feedback", "Export communication pack"]
      },
      {
        id: "talent-campaigns",
        title: "Talent Campaigns",
        purpose: "Plan employer brand and talent attraction campaigns.",
        inputs: [],
        workspaceFields: ["Campaign name", "Objective", "Talent audience", "Location", "Role category", "Employer narrative pillar", "Key message", "Proof", "Channel", "Campaign period", "Content required", "Owner", "Budget", "Approval status", "Data source", "Outcome measures"],
        outputs: ["Campaign brief", "Content calendar", "Deliverables tracker", "Approval schedule", "Post-campaign review"],
        actions: ["Create campaign", "Submit for approval", "Export campaign brief"]
      }
    ]
  },
  {
    id: "growth-strategy",
    title: "Growth & Strategy",
    description: "Brand Positioning, Market Intelligence and Communications Strategy",
    features: [
      {
        id: "brand-intelligence",
        title: "Brand Intelligence",
        purpose: "Consolidate interviews, workshops, perception research, and existing materials to establish current brand position.",
        inputs: ["Leadership interviews", "Employee interviews", "Customer interviews", "Surveys", "Existing brand strategy", "Website", "Campaign content", "Competitor list", "Media/share-of-voice data"],
        workspaceFields: ["Current perception", "Desired perception", "Leadership ambition", "Employee understanding", "Customer understanding", "Brand strengths", "Brand inconsistencies", "Communication gaps", "Emerging themes"],
        outputs: ["Brand Intelligence Report", "Research methodology", "Evidence reviewed", "Stakeholder themes", "Perception gaps", "Competitive context", "Priority insights", "Leadership decisions required"],
        actions: ["Generate report", "Export insights"]
      },
      {
        id: "competitor-matrix",
        title: "Competitor Matrix",
        purpose: "Compare competitors across positioning, narrative, communication activity, audience, and differentiation.",
        inputs: [],
        workspaceFields: ["Brand position", "Target audience", "Value proposition", "Narrative themes", "Key messages", "Tone of voice", "Services emphasised", "Communication channels", "Thought leadership themes", "Executive visibility", "Media presence", "Market claims", "Supporting evidence", "White space"],
        outputs: ["Competitive Communications Matrix", "Competitor profiles", "Side-by-side comparison", "Positioning map", "Common category language", "Overused claims", "Differentiation opportunities", "Source appendix"],
        actions: ["Add competitor", "Select comparison criteria", "Generate matrix", "Start strategy workflow", "Export matrix"]
      },
      {
        id: "strategic-narrative",
        title: "Strategic Narrative",
        purpose: "Convert approved insights into a unified narrative and messaging framework.",
        inputs: [],
        workspaceFields: ["Brand purpose", "Business ambition", "Current challenge", "Target audience", "Desired perception", "Central narrative", "Value proposition", "Narrative pillars", "Proof points", "Tone of voice", "Audience adaptations", "Calls to action"],
        outputs: ["Strategic Narrative Deck", "Core narrative", "Message pillars", "Proof points", "Audience versions", "Tone and language", "Application examples", "Governance and approvals"],
        actions: ["Create narrative", "Review content", "Compare revisions", "Approve framework", "Export deck"]
      },
      {
        id: "growth-opportunities",
        title: "Growth Opportunities",
        purpose: "Identify communication-led opportunities from market context, stakeholder needs, and competitor activity.",
        inputs: [],
        workspaceFields: ["Opportunity title", "Supporting insight", "Audience", "Business relevance", "Communication requirement", "Dependencies", "Risks", "Evidence source", "Priority", "Owner", "Review date", "Status"],
        outputs: ["Opportunity portfolio", "Priority matrix", "Supporting evidence", "Recommended communication response", "Dependencies and risks", "Leadership decisions required"],
        actions: ["Add opportunity", "Export portfolio"]
      },
      {
        id: "campaign-roadmap",
        title: "Campaign Roadmap",
        purpose: "Convert an approved strategy into a phased communications programme.",
        inputs: [],
        workspaceFields: ["Insight", "Strategy", "Narrative", "Planning", "Creation", "Approval", "Activation", "Measurement", "Learning"],
        outputs: ["Strategic roadmap", "Campaign calendar", "Responsibility matrix", "Approval schedule", "Measurement plan", "End-of-campaign learning report"],
        actions: ["Create roadmap", "Export calendar"]
      }
    ]
  },
  {
    id: "corporate-communications",
    title: "Corporate Communications",
    description: "Stakeholder Alignment, Executive Communications and Reputation Management",
    features: [
      {
        id: "stakeholder-intelligence",
        title: "Stakeholder Intelligence",
        purpose: "Map stakeholder groups, information needs, current concerns, and required communication actions.",
        inputs: ["Employees", "Customers", "Investors", "Media", "Government", "Regulators", "Partners", "Suppliers", "Communities", "Industry bodies"],
        workspaceFields: ["Stakeholder/group", "Relationship", "Influence", "Interest", "Current perception", "Desired perception", "Key concern", "Approved message", "Proof", "Owner", "Last engagement", "Next engagement", "Open action", "Source", "Review date"],
        outputs: ["Stakeholder map", "Engagement priorities", "Message matrix", "Concern register", "Communication plan"],
        actions: ["Add stakeholder", "Export map"]
      },
      {
        id: "corporate-narrative",
        title: "Corporate Narrative",
        purpose: "Maintain the approved corporate story, messages, positioning, and proof points.",
        inputs: [],
        workspaceFields: ["Corporate purpose", "Brand positioning", "Corporate story", "Business strategy", "Key messages", "Proof points", "Audience versions", "Restricted claims", "Tone of voice", "FAQs", "Document history"],
        outputs: ["Corporate narrative", "Message house", "Proof-point library", "Audience-message matrix", "Application guide", "Approval history"],
        actions: ["Update narrative", "Export message house"]
      },
      {
        id: "executive-office",
        title: "Executive Office",
        purpose: "Plan leadership messaging, executive visibility, and thought leadership.",
        inputs: [],
        workspaceFields: ["Name", "Position", "Biography", "Expertise areas", "Approved themes", "Restricted topics", "Key messages", "Supporting credentials", "Media experience", "Spokesperson status", "Content pipeline", "Upcoming commitments"],
        outputs: ["Executive visibility plan", "Message brief", "Interview brief", "Speech outline", "Thought leadership calendar", "Executive activity report"],
        actions: ["Add executive", "Generate plan"]
      },
      {
        id: "internal-communications",
        title: "Internal Communications",
        purpose: "Coordinate employee communication, announcements, leadership messaging, and feedback.",
        inputs: ["Leadership note", "Organisational announcement", "Employee newsletter", "Town hall", "Policy update", "Change communication", "Employee campaign", "FAQ", "Manager briefing", "Onboarding communication"],
        workspaceFields: ["Internal communication plan", "Draft communication", "Manager toolkit", "Employee FAQ", "Town hall script", "Feedback report"],
        outputs: ["Internal communication plan", "Draft communication", "Manager toolkit", "Employee FAQ", "Town hall script", "Feedback report"],
        actions: ["Create announcement", "Export plan"]
      },
      {
        id: "crisis-reputation",
        title: "Crisis & Reputation",
        purpose: "Identify potential issues, prepare response material, and coordinate communication during reputational events.",
        inputs: [],
        workspaceFields: ["Scenario", "Escalation criteria", "Response team", "Contact tree", "Holding statement", "Key messages", "Q&A", "Spokesperson", "Approval chain", "Channel plan", "Stakeholder notifications", "Simulation record", "Lessons"],
        outputs: ["Crisis manual", "Scenario plan", "Holding statement", "Q&A", "Stakeholder notification plan", "Simulation report", "Post-incident review"],
        actions: ["Log issue", "Draft statement", "Request approval"]
      }
    ]
  },
  {
    id: "public-relations",
    title: "Public Relations Intelligence",
    description: "Media Relations, Storytelling and Thought Leadership",
    features: [
      {
        id: "pr-strategy",
        title: "PR Strategy",
        purpose: "Develop an evidence-based PR programme aligned with business objectives, competition, and news context.",
        inputs: ["Business objective", "Brand narrative", "Audience", "News context", "Competitors", "Existing coverage", "Upcoming announcements", "Approved spokespersons", "Risks", "Campaign period", "Available evidence"],
        workspaceFields: ["Situation", "Objective", "Audience", "Insight", "Story", "Message", "Proof", "Media category", "Spokesperson", "Timing", "Deliverables", "Risk", "Measurement plan"],
        outputs: ["PR strategy", "Story architecture", "Media approach", "Campaign roadmap", "Spokesperson plan", "Risk considerations", "Measurement framework"],
        actions: ["Generate strategy", "Export roadmap"]
      },
      {
        id: "media-relations",
        title: "Media Relations",
        purpose: "Organise journalist relationships, media lists, pitches, responses, and follow-ups.",
        inputs: [],
        workspaceFields: ["Name", "Publication", "Beat", "Geography", "Language", "Public contact information", "Relationship owner", "Topics covered", "Previous interactions", "Pitch history", "Response status", "Notes", "Data source", "Last verified"],
        outputs: ["Media list", "Journalist brief", "Pitch note", "Outreach tracker", "Response summary", "Follow-up schedule"],
        actions: ["Add journalist", "Draft pitch", "Export media list"]
      },
      {
        id: "newsroom",
        title: "Newsroom",
        purpose: "Create and manage press releases, launch materials, press events, tours, and media assets.",
        inputs: ["Press releases", "Product launches", "Corporate announcements", "Media invitations", "Press conferences", "Press tours", "Media kits", "Fact sheets", "Executive biographies", "Images and video", "FAQs"],
        workspaceFields: ["Headline", "Subheading", "Dateline", "Announcement", "Context", "Quotes", "Supporting facts", "Boilerplate", "Media contact", "Embargo", "Legal review", "Approval status", "Distribution list"],
        outputs: ["Press release", "Media invitation", "Media kit", "Launch plan", "Press conference run sheet", "Press tour schedule", "Post-event summary"],
        actions: ["Draft press release", "Start approval workflow"]
      },
      {
        id: "thought-leadership",
        title: "Thought Leadership",
        purpose: "Manage bylines, op-eds, speaking opportunities, media commentary, and awards.",
        inputs: [],
        workspaceFields: ["Topic", "Executive", "Strategic relevance", "Audience", "Format", "Target publication/event", "Supporting evidence", "Draft owner", "Deadline", "Status", "Approval", "Outcome"],
        outputs: ["Thought leadership plan", "Editorial calendar", "Article brief", "Draft abstract", "Speaker brief", "Award opportunity list", "Nomination workflow"],
        actions: ["Add opportunity", "Export calendar"]
      },
      {
        id: "coverage-reputation",
        title: "Coverage & Reputation",
        purpose: "Record verified coverage and analyse themes, message inclusion, sentiment, and competitive visibility.",
        inputs: [],
        workspaceFields: ["Headline", "Publication", "Journalist", "Date", "URL", "Media type", "Geography", "Language", "Campaign", "Spokesperson", "Topic", "Key messages present", "Sentiment", "Prominence", "Potential reach", "Verified views", "Source", "Reviewer", "Review status"],
        outputs: ["Coverage book", "Campaign coverage report", "Message analysis", "Reputation summary", "Competitor visibility report", "Issue alert"],
        actions: ["Add coverage", "Generate report"]
      }
    ]
  }
];
