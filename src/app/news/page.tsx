import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "News & Media",
  description: "Browse Silverlake's press releases, awards, events, and corporate announcements.",
};

export default async function NewsPage() {
  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col pt-32 pb-40 bg-[#fcfbf9] min-h-screen">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 text-center flex flex-col items-center justify-center flex-grow">
          <h1 className="font-serif text-[40px] sm:text-[56px] text-[#111] mb-6">News & Media</h1>
          <p className="text-[#666] text-lg font-light tracking-wide uppercase">Content Coming Soon</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
