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
    const { interactionId, feedbackScore } = await req.json();

    if (!sanityToken) {
      return NextResponse.json({ success: false, message: "No Sanity token configured" });
    }

    if (!interactionId) {
      return NextResponse.json({ error: "Missing interactionId" }, { status: 400 });
    }

    await client.patch(interactionId).set({ feedbackScore }).commit();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
