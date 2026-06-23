import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getNews } from "@/lib/cms";
import NewsClient from "./NewsClient";

export const metadata = {
  title: "News & Media",
  description: "Browse Silverlake's press releases, awards, events, and corporate announcements.",
};

interface Props {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
}

export default async function NewsPage({ searchParams }: Props) {
  const params = await searchParams;
  const category = params.category || "All";
  const pageNum = parseInt(params.page || "1", 10);
  const limit = 6;

  const { news, pagination } = await getNews({
    category,
    page: pageNum,
    limit,
  });

  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col">
        <NewsClient
          initialNews={news}
          initialPagination={pagination}
          category={category}
        />
      </main>
      <Footer />
    </>
  );
}
