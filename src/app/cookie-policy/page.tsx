import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Cookie Policy",
};

export default function CookiePolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-grow bg-[#fcfbf9] pt-40 pb-32">
        <div className="mx-auto max-w-[800px] px-6 lg:px-10 text-[#111111]">
          <h1 className="font-serif text-[36px] sm:text-[48px] font-normal mb-12">
            COOKIES POLICY
          </h1>

          <div className="space-y-8 text-[#444] text-[16px] font-light leading-relaxed">
            <p>
              Silverlake Legal Advisors LLP ("we", "us", or "our") utilises cookies and similar tracking technologies on our website, www.silverlakelaw.in (the "Website"). This Cookie Policy outlines how we collect, use, and manage information pertaining to your browsing activities to enhance user experience, optimise functionality, and secure our Website.
            </p>

            <p>
              Any reference in this policy to "personal data" pertains to information that identifies, or could reasonably be used to identify, a living individual. We are committed to safeguarding your privacy; please refer to our Privacy Policy for comprehensive details on our data protection practices.
            </p>

            <h2 className="font-serif text-[24px] font-normal text-[#111] mt-12 mb-4">What is a cookie?</h2>
            <p>
              A cookie is a small alphanumeric text file stored on your browser or your device's hard drive when you visit a website. Cookies enable the Website to recognise your device, remember your preferences, and track your interactions with the site. Upon accessing our Website, strictly necessary cookies are automatically deployed to ensure core site functionality.
            </p>

            <h2 className="font-serif text-[24px] font-normal text-[#111] mt-12 mb-4">Classification of Cookies</h2>
            <p>
              To ensure transparency, we categorise the cookies deployed on our Website based on their source and duration:
            </p>
            <ul className="list-disc pl-6 space-y-4">
              <li>
                First-Party and Third-Party Cookies: "First-party" cookies are set directly by the Silverlake Legal Advisors LLP domain. "Third-party" cookies are placed by external entities or service providers operating through our Website.
              </li>
              <li>
                Session Cookies: These are temporary cookies utilised to link a user's actions during a single browser session. They are automatically deleted from your device the moment you close your browser window.
              </li>
              <li>
                Persistent Cookies: These cookies remain on your device for a pre-defined period specified within the cookie itself. They are reactivated each time you return to the Website that generated them.
              </li>
            </ul>

            <h2 className="font-serif text-[24px] font-normal text-[#111] mt-12 mb-4">Consent and Types of Cookies</h2>
            <p>
              The requirement for user consent depends on the classification of the cookie:
            </p>
            <ul className="list-disc pl-6 space-y-4">
              <li>
                Strictly Necessary Cookies: These are essential for the operation and security of the Website. They do not require your prior consent.
              </li>
              <li>
                Non-Essential Cookies: For all performance, functionality, targeting, and social media cookies, we request your explicit prior consent before placing them on your device.
              </li>
            </ul>

            <h2 className="font-serif text-[24px] font-normal text-[#111] mt-12 mb-4">Managing and Withdrawing Consent</h2>
            <p>
              You reserve the right to modify your cookie preferences or withdraw your consent at any time. You may manage your preferences through the following methods:
            </p>

            <h3 className="font-serif text-[20px] font-normal text-[#111] mt-8 mb-3">A. Cookie Preference Centre</h3>
            <p>
              You can customise the cookies placed on your device by clicking the <Link href="#cookie-settings" className="font-semibold text-[#111] hover:text-[#C5A059] transition-colors underline decoration-1 underline-offset-4">Cookie Preferences</Link> button located at the bottom of this policy or in the Website footer.
            </p>

            <h3 className="font-serif text-[20px] font-normal text-[#111] mt-8 mb-3">B. Browser Settings</h3>
            <p>
              You can withdraw your consent by clearing your cookies and adjusting your internet browser settings to refuse or block the placement of some or all cookies.
            </p>
            <p className="italic">
              Please note: If you configure your browser to block all cookies (including strictly necessary ones), you may lose access to certain features, areas, or functionalities of our Website.
            </p>
            <p>
              For instructions on managing cookie settings for standard browsers, please refer to the official documentation linked below:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cookie settings in Microsoft Edge</li>
              <li>Cookie settings in Firefox</li>
              <li>Cookie settings in Chrome</li>
              <li>Cookie settings in Safari</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
