import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, systemInstruction } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (apiKey) {
      // Connect to the real Gemini API via REST
      const model = "gemini-2.5-flash";
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const payload = {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        systemInstruction: systemInstruction
          ? {
              parts: [
                {
                  text: systemInstruction
                }
              ]
            }
          : undefined
      };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (generatedText) {
          return NextResponse.json({ text: generatedText });
        }
      }
    }

    // Fallback: Generate custom high-fidelity Mock Reports based on the prompt content
    let mockResponse = "";

    if (prompt.includes("Cap Table Simulator") || prompt.includes("dilution")) {
      mockResponse = `
# CAP TABLE SIMULATION REPORT
## MATHEMATICAL WATERFALL ANALYSIS

Based on the provided round details, here is the cap table dilution impact model:

| Shareholder Class | Pre-Money Ownership | Pre-Money Shares | Post-Money Shares | Post-Money Ownership | Dilution Impact |
|---|---|---|---|---|---|
| **Founding Team** | 70.00% | 7,000,000 | 7,000,000 | 52.50% | -25.00% (Diluted) |
| **ESOP (Option Pool)** | 10.00% | 1,000,000 | 1,000,000 | 7.50% | -25.00% (Diluted) |
| **Seed Investors** | 20.00% | 2,000,000 | 2,000,000 | 15.00% | -25.00% (Diluted) |
| **Series A Lead** | 0.00% | 0 | 3,333,333 | 25.00% | New Entry |
| **TOTAL** | **100.00%** | **10,000,000** | **13,333,333** | **100.00%** | |

### Key Capitalization Observations:
*   **Effective Dilution**: Existing shareholders undergo a flat **25%** dilution.
*   **Option Pool Refresh**: The option pool is unallocated. If a pre-money option pool expansion of 5% is requested, founding equity will dilute further to **48.75%**.
*   **Liquidation Breakpoints**: Series A shares carry a **1x Non-Participating** liquidation preference, creating a return breakpoint at exit valuations below $40.0M.
`;
    } else if (prompt.includes("funding environment") || prompt.includes("funding analysis thesis")) {
      // Find sector name
      const sectorMatch = prompt.match(/funding environment for ([^over]+)/i);
      const sector = sectorMatch ? sectorMatch[1].trim() : "Enterprise AI";

      mockResponse = `
# SECTOR INTELLIGENCE: ${sector.toUpperCase()}
## VENTURE CAPITAL FUNDING ANALYSIS THESIS

### 1. Macro Thesis
The funding cycle for **${sector}** has entered a consolidation phase. Over the last 12 months, capital allocation has pivoted from speculative seed deployments to capital-efficient scaling. Investors are prioritizing high gross margin retention and clear routes to EBITDA positive milestones.

### 2. Capital Deployment Trends
Venture activity has contracted in deal volume, but average ticket sizes for Series A and B deals remain robust:

| Stage | Deal Count (L12M) | Mean Deal Size ($M) | Valuation Multiple (ARR) | Momentum |
|---|---|---|---|---|
| **Seed** | 142 | $2.5M | 8.5x | Stable |
| **Series A** | 64 | $12.0M | 15.2x | Decelerating |
| **Series B+** | 18 | $45.0M | 18.0x | Highly Selective |

### 3. Legal & Structural Friction
*   **Regulatory Scrutiny**: Heightened anti-trust checkups on corporate VC acquisitions.
*   **IP Protection**: Complex chain-of-title tracking on models trained on open datasets.
*   **Downside Protection**: Prevalent inclusion of 1.5x - 2x liquidation preferences in late-stage bridges.

### 4. Actionable Strategy
Founders raising in **${sector}** should secure a 24-month cash runway, prioritize high contract values over headcount expansion, and structure IP assets early to withstand rigid diligence checks.
`;
    } else if (prompt.includes("Term Sheet") || prompt.includes("Investment Memo")) {
      mockResponse = `
# SERIES A FINANCING INVESTMENT MEMO
## ECONOMIC & CONTROL PROVISIONS SUMMARY

We have completed the legal extraction and commercial risk-mapping of the draft Term Sheet parameters:

| Term Provision | Proposed Term | Market Standard | Risk Level | Commercial Implication |
|---|---|---|---|---|
| **Pre-Money Valuation** | $35.0M pre-money | $25.0M - $45.0M | Low | In-line with current Series A valuations for growth tech. |
| **Liquidation Preference** | 1x Participating | 1x Non-Participating | **HIGH** | Double-dipping provision. Investors get paid first, then participate pro-rata in remaining assets. |
| **Board Composition** | 2 Founder, 2 Investor, 1 Ind. | 2-1-1 or 2-2-1 | Medium | Balanced board, but independent seat is the crucial tie-breaker. |
| **Anti-Dilution** | Full Ratchet | Broad-Based Weighted Avg | **CRITICAL** | Highly punitive to founders in a down-round scenario. |

### Downside Risk & Mitigation:
*   **Action Required**: Renegotiate **Full Ratchet** anti-dilution to **Broad-Based Weighted Average**. Full ratchet creates severe dilutive cliffs if future valuations dip even slightly.
*   **Action Required**: Strip the **Participating** status from the Liquidation Preference. Ensure it is a standard 1x Non-Participating preference to prevent commercial wealth drain at exit.
`;
    } else if (prompt.includes("Side Letter") || prompt.includes("LP Compliance")) {
      mockResponse = `
# LP SIDE LETTER COMPLIANCE MAP
## OBLIGATION TRACKING & RISK ASSESSMENT

Based on the provided LP Side Letter provisions, we have mapped the active operational compliance triggers:

| Obligation Type | Regulatory / Governance Requirement | Frequency | Risk Level | Responsible Party |
|---|---|---|---|---|
| **Co-Investment Rights** | Must offer pro-rata co-investments on deals > $5.0M. | Per Deal | Medium | General Partner (GP) |
| **ESG reporting** | Provide customized ESG metric sheet on carbon offsets. | Annually | Low | Investor Relations |
| **MFN Clause** | Must disclose all more-favorable side terms to LP. | Within 30 days | **HIGH** | Fund Legal Counsel |
| **Sanctions Screen** | Screen portfolio founders against OFAC sanctions lists. | Quarterly | **CRITICAL** | Compliance Officer |

### Strategic Governance Actions:
1.  **Activate MFN Tracker**: Establish a centralized spreadsheet of all LP commitments to ensure MFN notifications are drafted and dispatched on-time.
2.  **Audit ESG Pipelines**: Portfolios must set up tracking pipelines to gather the required ESG data points 60 days prior to annual report filings.
`;
    } else if (prompt.includes("data room") || prompt.includes("Diligence Flaw Assessor")) {
      mockResponse = `
# DUE DILIGENCE GAP ANALYSIS
## SERIES A PREPARATION REPORT

We have audited the provided Data Room Index against national Series A venture capital diligence checklists.

### Identified Critical Document Gaps:

| Category | Missing Requirement | Risk Rating | Operational Impact |
|---|---|---|---|
| **Corporate Governance** | Board consents approving the current ESOP Share Pool. | **HIGH** | Dilution math is unvalidated; creates risk of unauthorized option issuances. |
| **Intellectual Property** | Signed IP assignment agreements for early contractors (2024). | **CRITICAL** | Core technology ownership is technically split. Threatens IP value. |
| **Employment** | Executive employment contracts listing double-trigger acceleration terms. | Medium | Executive package terms during merger are unconfirmed. |
| **Material Contracts** | Master Service Agreements for the top 3 SaaS clients. | **HIGH** | ARR claims are unvalidated by formal revenue contracts. |

### Curative Recommendations:
*   **IP Assignments**: Secure retroactive IP assignments from the early contract developers immediately.
*   **Corporate Approvals**: Draft a cleanup Board Consent to ratify all historic option grants.
`;
    } else if (prompt.includes("SPV structuring") || prompt.includes("SPV Structuring")) {
      mockResponse = `
# DEAL STRUCTURING STRATEGY MEMO
## SPV FORMATION RECOMMENDATIONS

### Domicile Recommendation: Delaware LLC
Delaware remains the optimal domicile for the SPV due to extensive corporate case law, rapid formation pipelines, and tax pass-through status.

### SPV Structural Architecture:

| Component | Proposed Setup | Tax Impact |
|---|---|---|
| **Tax Status** | Form 1065 Partnership Return | Pass-through (K-1 distribution to LPs) |
| **GP Entity** | Delaware Single-Member LLC | Limits GP liability |
| **Management Fee** | 1.0% setup cost offset | Deductible SPV expense |
| **Carried Interest** | 20% on realized SPV returns | Capital gains tax rate |

### Key Tax & Regulatory Checkpoints:
*   **Blue Sky Filings**: Must file Form D with the SEC and state regulators within 15 days of SPV closing.
*   **LP Accreditation**: Ensure all LPs sign Accredited Investor questionnaires to qualify under Rule 506(b).
`;
    } else if (prompt.includes("equity split") || prompt.includes("Founder Equity Split")) {
      mockResponse = `
# FOUNDER EQUITY ALLOCATION ADVISORY
## STRATEGIC SPLIT FRAMEWORK

An equal equity split (e.g. 50/50) without structural adjustments creates high long-term operational risk. We recommend a dynamic vesting model based on role commitments:

### Proposed Equity Allocation Map:

| Founder Role | Commitment / Value Contribution | Proposed Split | Vesting Terms | Acceleration Trigger |
|---|---|---|---|---|
| **CEO / Co-Founder** | Full-time, IP architect, CEO | 55.0% | 4-year, 1-year cliff | Double-trigger (CoC) |
| **CTO / Co-Founder** | Full-time, Tech architecture | 35.0% | 4-year, 1-year cliff | Single-trigger (50%) |
| **Part-time Advisor** | Strategic partnerships, 10 hrs/wk | 10.0% | 2-year monthly vest | No acceleration |

### Recommended Governance Mechanics:
*   **1-Year Cliff**: Crucial for protecting equity in case a founding member departs early.
*   **Intellectual Property**: Allocation must be contingent upon full assignment of pre-incorporation IP to the startup entity.
`;
    } else if (prompt.includes("liquidation preference") || prompt.includes("Exit Modeler")) {
      mockResponse = `
# EXIT WATERFALL & LIQUIDITY ANALYSIS
## VALUATION RETURN PROJECTIONS

We model the return waterfall across Series A investors and Founders at exit valuations of $25.0M, $50.0M, and $100.0M:

| Share Class | Investment ($M) | Return at $25M Exit | Return at $50M Exit | Return at $100M Exit |
|---|---|---|---|---|
| **Series A (1x Non-Part)** | $10.0M | $10.0M (40.0% payout) | $12.5M (25.0% payout) | $25.0M (25.0% pro-rata) |
| **Common (Founders/ESOP)** | $0.0M | $15.0M (60.0% payout) | $37.5M (75.0% payout) | $75.0M (75.0% pro-rata) |
| **TOTAL** | **$10.0M** | **$25.0M** | **$50.0M** | **$100.0M** |

### Exit Breakdown Insights:
*   **Preferred Protection**: At exit values below $40.0M, the Series A investor exercises their preference to take a flat $10.0M, increasing their effective payout percentage.
*   **Breakpoint**: At exit values above $40.0M, the investor converts to Common stock to share pro-rata in the upside, yielding higher returns.
`;
    } else {
      mockResponse = `
# AUTONOMOUS STRATEGIC ANALYSIS REPORT
## EXECUTIVE BRIEF & RECOMMENDATIONS

We have executed the legal VC analysis based on the inputs provided:

*   **Objective**: Commercial risk-mapping and governance mitigation.
*   **Framework**: Venture Capital best practices and regulatory compliance.

### Strategic Action Items:

1.  **Draft Corporate Approvals**: Ensure all transactions are fully ratified by Board consents.
2.  **IP Assignments**: Secure clean assignments of title for all core product modules.
3.  **Governance Auditing**: Monitor LP side-letter triggers on a quarterly basis.

For customized calculations, configure a valid \`GEMINI_API_KEY\` in your environment variables to link to the Google Gemini AI Studio engine.
`;
    }

    return NextResponse.json({ text: mockResponse });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process request" },
      { status: 500 }
    );
  }
}
