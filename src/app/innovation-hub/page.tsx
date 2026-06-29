import * as React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Innovation Hub | Silverlake Legal Advisors",
  description: "Welcome to the Innovation Hub at Silverlake.",
};

export default function InnovationHubPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#fcfbf9] pt-[120px] pb-[80px]">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16">
          <h1 className="font-serif text-[40px] sm:text-[56px] text-[#111] leading-tight mb-8">
            Innovation Hub
          </h1>
          <p className="text-[18px] text-[#444] font-light max-w-2xl leading-relaxed">
            Welcome to the Silverlake Innovation Hub. A whole new experience is coming soon.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
