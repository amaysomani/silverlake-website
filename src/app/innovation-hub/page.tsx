import type { Metadata } from "next";
import InnovationHubClient from "./InnovationHubClient";

export const metadata: Metadata = {
  title: "ARNO Venture Capital | AI-Native Legal Strategist Suite",
  description:
    "ARNO is Silverlake's AI-native legal intelligence engine for the venture capital ecosystem. 15 autonomous strategist modules for capital structures, due diligence, and exit modeling.",
  openGraph: {
    title: "ARNO Venture Capital | Innovation Hub",
    description:
      "Deploying high-conviction capital at the convergence of decentralized networks and AI. Experience 15 autonomous legal strategist modules.",
    url: "https://silverlakelaw.in/innovation-hub",
    siteName: "Silverlake Legal Advisors LLP",
    locale: "en_GB",
    type: "website",
  },
};

export default function InnovationHubPage() {
  return <InnovationHubClient />;
}
