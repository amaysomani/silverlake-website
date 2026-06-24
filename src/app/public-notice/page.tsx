import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Public Notice",
};

export default function PublicNoticePage() {
  return (
    <>
      <Header />
      <main className="flex-grow bg-[#fcfbf9] pt-40 pb-32">
        <div className="mx-auto max-w-[800px] px-6 lg:px-10 text-[#111111]">
          <h1 className="font-serif text-[36px] sm:text-[48px] font-normal mb-12">
            PUBLIC NOTICE
          </h1>

          <div className="space-y-8 text-[#444] text-[16px] font-light leading-relaxed">
            <h2 className="font-serif text-[20px] sm:text-[24px] font-normal text-[#111] mt-12 mb-4 leading-snug">
              CAUTION AGAINST FRAUDULENT COMMUNICATIONS, IMPERSONATION, AND UNAUTHORISED LEGAL NOTICES
            </h2>
            
            <p>
              It has been brought to the attention of Silverlake Legal Advisors LLP that unidentified individuals or entities have created fictitious email addresses and are utilising our name, logo, and credentials to disseminate fraudulent legal notices. These unauthorised communications, which primarily consist of fabricated copyright infringement notices, are being circulated to various companies and individuals.
            </p>
            
            <p>
              It is evident that these unknown perpetrators are impersonating us, and our legal practitioners with the malicious intent to deceive, extort, or otherwise defraud the public.
            </p>
            
            <p>
              Accordingly, Silverlake Legal Advisors LLP hereby issues this Public Notice to declare and clarify the following:
            </p>
            
            <ul className="list-disc pl-6 space-y-4">
              <li>
                We have no relationship, association, or affiliation, whether direct or indirect, with these unidentified individuals. We have not authorised, commissioned, or endorsed the transmission of such emails or legal notices to any person or entity.
              </li>
              <li>
                Any emails, notices, or demands of this nature originating from unofficial email domains are wholly fraudulent, unauthorised, and have not been issued by or on behalf of Silverlake Legal Advisors LLP.
              </li>
              <li>
                We treat the unauthorised use of our name and intellectual property as a severe breach of the law. We are currently initiating all appropriate legal proceedings, including criminal and civil actions, against the responsible parties.
              </li>
              <li>
                We strongly advise the general public, corporate entities, and individuals to exercise extreme caution, vigilance, and due diligence before responding to, complying with, or engaging with the senders of such suspect communications.
              </li>
            </ul>

            <p>
              Silverlake Legal Advisors LLP, its partners, and its employees categorically disclaim any and all liability for any direct, indirect, consequential, or incidental losses or damages incurred by any party arising out of or in connection with their engagement, reliance, or compliance with such fraudulent communications or individuals.
            </p>

            <p>
              If you receive a suspicious communication claiming to be from Silverlake Legal Advisors LLP, please do not respond or click on any links, and kindly report the incident directly to our official contact channels.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
