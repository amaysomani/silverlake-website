import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="bg-[#fcfbf9] min-h-screen pt-32 pb-40 flex flex-col items-center justify-center">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
          <h1 className="font-serif text-[48px] sm:text-[64px] font-normal text-[#111] mb-16">
            Contact Us
          </h1>
          
          <div className="space-y-12">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#111]/40 mb-4">
                Email
              </p>
              <a 
                href="mailto:contact@silverlakelaw.in" 
                className="text-[24px] sm:text-[28px] text-[#111] hover:text-[#C5A059] transition-colors font-light"
              >
                contact@silverlakelaw.in
              </a>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#111]/40 mb-4">
                Phone
              </p>
              <div className="flex flex-col gap-4">
                <a 
                  href="tel:+918989599225" 
                  className="text-[24px] sm:text-[28px] text-[#111] hover:text-[#C5A059] transition-colors font-light"
                >
                  (+91) 8989 599 225
                </a>
                <a 
                  href="tel:+917024082617" 
                  className="text-[24px] sm:text-[28px] text-[#111] hover:text-[#C5A059] transition-colors font-light"
                >
                  (+91) 70240 82617
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
