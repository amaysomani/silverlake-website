import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import DisclaimerModal from "@/components/DisclaimerModal";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Silverlake Legal Advisors LLP | Excellence in Legal Advisory",
    template: "%s | Silverlake Legal Advisors LLP",
  },
  description: "A premium international law firm delivering sophisticated counsel across Corporate, Private Equity, Private Wealth, and Dispute Resolution.",
  keywords: ["Silverlake", "Law Firm", "Corporate Law", "M&A", "Private Equity", "Banking & Finance", "Dispute Resolution", "Regulatory", "Real Estate", "Tax Advisory", "Technology Law"],
  authors: [{ name: "Silverlake" }],
  metadataBase: new URL("https://silverlakelaw.in"),
  openGraph: {
    title: "Silverlake | Corporate Law Firm",
    description: "Silverlake is an International AI-Native Law firm advising businesses, investors, entrepreneurs, and institutions on complex legal matters across jurisdictions.",
    url: "https://silverlakelaw.in",
    siteName: "Silverlake Legal Advisors LLP",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Silverlake | Corporate Law Firm",
    description: "Silverlake is an International AI-Native Law firm advising businesses, investors, entrepreneurs, and institutions on complex legal matters across jurisdictions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          disableTransitionOnChange
        >
          <DisclaimerModal />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
