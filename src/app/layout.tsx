import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Silverlake | Corporate Law Firm",
    template: "%s | Silverlake",
  },
  description: "Silverlake is a leading international law firm advising businesses, investors, entrepreneurs, and institutions on complex legal matters across jurisdictions.",
  keywords: ["Silverlake", "Law Firm", "Corporate Law", "M&A", "Private Equity", "Banking & Finance", "Dispute Resolution", "Regulatory", "Real Estate", "Tax Advisory", "Technology Law"],
  authors: [{ name: "Silverlake" }],
  metadataBase: new URL("https://silverlake.com"),
  openGraph: {
    title: "Silverlake | Corporate Law Firm",
    description: "Silverlake is a leading international law firm advising businesses, investors, entrepreneurs, and institutions on complex legal matters across jurisdictions.",
    url: "https://silverlake.com",
    siteName: "Silverlake",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Silverlake | Corporate Law Firm",
    description: "Silverlake is a leading international law firm advising businesses, investors, entrepreneurs, and institutions on complex legal matters across jurisdictions.",
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
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
