import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-grow bg-[#fcfbf9] pt-40 pb-32">
        <div className="mx-auto max-w-[800px] px-6 lg:px-10 text-[#111111]">
          <h1 className="font-serif text-[36px] sm:text-[48px] font-normal mb-12">
            PRIVACY POLICY
          </h1>

          <div className="space-y-8 text-[#444] text-[16px] font-light leading-relaxed">
            <h2 className="font-serif text-[24px] font-normal text-[#111] mt-12 mb-4">Purpose of this Policy</h2>
            <p>
              Silverlake Legal Advisors LLP (hereinafter referred to as the "we," "us," or "our") is committed to protecting and respecting your privacy. This Privacy Policy sets forth the basis on which any personal data we collect from you, or that you provide to us, will be processed. We act as a "Data Controller" in accordance with the General Data Protection Regulation (GDPR) and other applicable data protection legislation. Any updates or amendments to this policy will be published directly on our website.
            </p>

            <h2 className="font-serif text-[24px] font-normal text-[#111] mt-12 mb-4">Categories of Personal Data Collected</h2>
            <p>
              "Personal Data" encompasses any information relating to an identified or identifiable natural person. We predominantly collect Personal Data provided directly by you (e.g., upon entering into an engagement, submitting a business card, utilising our website, subscribing to publications, or applying for employment). We may also obtain data from public domain sources or authorised third parties.
            </p>
            <p>
              The Personal Data we may collect and process includes:
            </p>
            <ul className="list-disc pl-6 space-y-4">
              <li>Full name, title, employer, and corporate position.</li>
              <li>Email address, postal address, and telephone numbers.</li>
              <li>Bank account details and billing information.</li>
              <li>Identification and background verification information acquired through our mandatory client onboarding and anti-money laundering (AML) procedures.</li>
              <li>Details regarding visits to our premises or meetings, including dietary or access requirements.</li>
              <li>Resumes, credentials, and information provided pursuant to an employment application.</li>
              <li>Information concerning your interactions with our website, electronic communications, and materials.</li>
            </ul>

            <h2 className="font-serif text-[24px] font-normal text-[#111] mt-12 mb-4">Lawful Basis and Purposes of Processing</h2>
            <p>
              We processes Personal Data strictly in connection with our professional legal operations and to fulfill statutory or regulatory obligations. Processing is executed based on one or more of the following lawful bases: your explicit consent, the performance of a contract, compliance with a legal obligation, or our legitimate business interests.
            </p>
            <p>
              The primary purposes for processing include:
            </p>
            <ul className="list-disc pl-6 space-y-4">
              <li>Providing legal counsel and related services.</li>
              <li>Complying with statutory, regulatory, risk management, and professional obligations.</li>
              <li>Establishing, exercising, or defending legal claims.</li>
              <li>Managing business development, marketing communications, and event logistics.</li>
              <li>Administering employment applications and internal recruitment processes.</li>
              <li>Analysing website traffic and usage metrics to optimise platform functionality.</li>
            </ul>

            <h2 className="font-serif text-[24px] font-normal text-[#111] mt-12 mb-4">Data Subject Rights</h2>
            <p>
              Subject to applicable data protection legislation, you possess specific legal rights regarding your Personal Data. Please note that certain rights may be restricted to preserve legal professional privilege or to ensure compliance with our regulatory obligations. Your rights include the ability to:
            </p>
            <ul className="list-disc pl-6 space-y-4">
              <li>Request access to the Personal Data we hold concerning you.</li>
              <li>Request the rectification of inaccurate or incomplete data.</li>
              <li>Request the erasure of your Personal Data.</li>
              <li>Withdraw previously granted consent for data processing.</li>
              <li>Object to, or request the restriction of, the processing of your data.</li>
              <li>Request data portability to transmit your information to another organisation.</li>
              <li>Object to automated decision-making and profiling.</li>
              <li>Lodge a formal complaint with the relevant supervisory authority.</li>
            </ul>
            <p>
              If you wish to exercise these rights, you may, at any time, contact Silverlake Legal Advisors LLP using the contact details below.
            </p>

            <h2 className="font-serif text-[24px] font-normal text-[#111] mt-12 mb-4">Disclosure and Third-Party Sharing</h2>
            <p>
              We may disclose your Personal Data to authorised third parties strictly for the purposes delineated in this policy. Such disclosures are executed in compliance with applicable laws and under appropriate safeguarding agreements. Third parties may include:
            </p>
            <ul className="list-disc pl-6 space-y-4">
              <li>Entities integral to the provision of our legal services, including counterparties, co-counsel, courts, tribunals, regulatory bodies, and government institutions.</li>
              <li>Professional advisers, auditors, and external service providers engaged to fulfill our legal and operational obligations.</li>
              <li>Data processors operating on our behalf under strict confidentiality agreements.</li>
            </ul>

            <h2 className="font-serif text-[24px] font-normal text-[#111] mt-12 mb-4">Data Retention</h2>
            <p>
              We adhere to strict data minimisation principles. We will retain your Personal Data only for as long as is reasonably necessary to fulfill the purposes outlined in this Privacy Policy, or as required to satisfy applicable legal, accounting, or regulatory retention mandates.
            </p>

            <h2 className="font-serif text-[24px] font-normal text-[#111] mt-12 mb-4">Non-existence of automated decision making</h2>
            <p>
              Silverlake Legal Advisors LLP does not subject your Personal Data to automated decision-making processes, nor do we engage in profiling activities to evaluate personal aspects relating to a natural person.
            </p>

            <h2 className="font-serif text-[24px] font-normal text-[#111] mt-12 mb-4">Contact us</h2>
            <p>
              For further inquiries, to exercise your data subject rights, or to raise a formal complaint regarding our data handling practices, please contact us in writing at:
            </p>
            <ul className="list-disc pl-6 space-y-4">
              <li>Email: contact@silverlake.com</li>
              <li>Address: Udaipur, Rajasthan, India</li>
              <li>Website: www.silverlakelaw.in</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
