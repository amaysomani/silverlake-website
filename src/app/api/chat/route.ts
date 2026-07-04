import { NextResponse } from "next/server";
import { createClient } from "next-sanity";

const sanityToken = process.env.SANITY_API_WRITE_TOKEN;
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: false,
  token: sanityToken,
});

export async function POST(req: Request) {
  try {
    const { prompt, systemInstruction, moduleId, inputs } = await req.json();

    // Simulated LLM delay (replace with real OpenAI/Gemini call later)
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Simulated detailed response generation based on the module
    let responseText = "";

    if (moduleId === "investment-memo") {
      responseText = `# Investment Memo Summary\n\n## 1. Economic Architecture\n- **Pre-Money Valuation:** Implicit calculation required based on final cap table constraints. Recommended aggressive anti-dilution provisions.\n- **Liquidation Preference:** Standard 1x non-participating preferred is market standard here.\n\n## 2. Control Rights\n- **Board Composition:** Maintain 2-1-2 structure to protect founder autonomy.\n- **Protective Provisions:** Scope of veto rights on M&A and future capital raises are broadly drafted. Suggest narrowing.\n\n## 3. Downside Mechanics\n- **Drag-Along Rights:** Threshold set at 50% of Preferred. Advise pushing for a majority of Common requirement.\n\n## 4. Deviation Analysis\n> The draft term sheet significantly deviates from NVCA standard forms regarding founder vesting acceleration upon single-trigger events. This presents a material risk.`;
    } else if (moduleId === "sector-intel") {
      responseText = `# Sector Intelligence Report\n\n## Macro Thesis\n${inputs.sector || "This sector"} is experiencing a rapid influx of capital deployment, characterized by shortened diligence cycles and premium valuations.\n\n## Capital Deployment Trends\n- **Early Stage:** Pre-seed valuations have inflated by 20% YoY.\n- **Growth Stage:** Series B+ rounds are seeing heavy participation from non-traditional crossover funds.\n\n## Legal Friction\n- IP chain of title remains the primary friction point in diligence.\n- Regulatory uncertainty in cross-border data flows.\n\n## Actionable Strategy\nDeploy capital with a focus on defensible technical moats rather than pure execution plays. Standardize warrant coverage in bridge notes.`;
    } else if (moduleId === "founder-vesting") {
      responseText = `# The Mechanics of Founder Vesting\n\n## Overview\nFor a YC-backed startup focusing on **${inputs.context || "Standard Development"}**, the vesting schedule is the most critical protective mechanism for the cap table.\n\n## Standard Architecture\n- **4-Year Vesting:** Absolute market standard.\n- **1-Year Cliff:** Ensures commitment before equity is realized.\n\n## Acceleration Triggers\n> **Warning:** Single-trigger acceleration on a Change of Control is rarely accepted by Series A lead investors. Always structure with Double-Trigger (Change of Control + Termination Without Cause).`;
    } else {
      // Generic robust fallback
      responseText = `# Strategic Analysis Report\n\nBased on your inputs:\n\n${(prompt || "").substring(0, 150)}...\n\n## Overview\nOur system has parsed the legal and commercial variables provided. We strongly advise a cautious approach to the structural mechanics outlined.\n\n## Key Findings\n1. **Liability Exposure:** There are material caps missing on indemnification obligations.\n2. **Commercial Leverage:** You possess strong negotiating leverage based on current market dynamics.\n\n## Recommendation\nDraft protective covenants immediately and revise the schedule of exceptions.`;
    }

    // Save interaction to Sanity for Continuous Learning
    let interactionId = null;
    if (sanityToken) {
      try {
        const result = await client.create({
          _type: "aiInteraction",
          moduleId: moduleId || "unknown",
          inputs: JSON.stringify(inputs || {}),
          prompt: prompt,
          response: responseText,
          feedbackScore: 0,
        });
        interactionId = result._id;
      } catch (dbErr) {
        console.error("Failed to log to Sanity:", dbErr);
      }
    }

    return NextResponse.json({
      text: responseText,
      interactionId: interactionId,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
