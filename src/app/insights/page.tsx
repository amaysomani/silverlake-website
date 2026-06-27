import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getArticles } from "@/lib/cms";
import InsightsClient from "./InsightsClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Insights",
  description: "Silverlake thought leadership articles, legal updates, market reports, and regulatory intelligence.",
};

interface Props {
  searchParams: Promise<{
    search?: string;
    category?: string;
    tag?: string;
    page?: string;
  }>;
}

export default async function InsightsPage({ searchParams }: Props) {
  const params = await searchParams;
  const search = params.search || "";
  const category = params.category || "All";
  const tag = params.tag || "";
  const pageNum = parseInt(params.page || "1", 10);
  const limit = 6;

  const { articles, pagination } = await getArticles({
    search,
    category,
    tag,
    page: pageNum,
    limit,
  });

  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col">
        <InsightsClient
          initialArticles={articles}
          initialPagination={pagination}
          search={search}
          category={category}
          tag={tag}
        />
      </main>
      <Footer />
    </>
  );
}
