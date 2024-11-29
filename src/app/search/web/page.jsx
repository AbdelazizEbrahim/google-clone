export const dynamic = "force-dynamic";

import WebSearchResults from "@/components/WebSearchResult";
import Link from "next/link";

export default async function WebSearchPage({ searchParams }) {
  const { start = "1", searchTerm = "defaultSearchTerm" } = searchParams || {};

  console.log(`Search Term: ${searchTerm}, Start Index: ${start}`);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.CONTEXT_KEY}&q=${searchTerm}&start=${start}`,
    { next: { revalidate: 0 } }
  );

  console.log("response: ", response);

  if (!response.ok) {
    console.error(`Error: ${response.status} - ${response.statusText}`);
    throw new Error("Something went wrong");
  }

  const data = await response.json();
  const results = data.items;

  if (!results) {
    return (
      <div className="flex flex-col justify-center items-center pt-10">
        <h1 className="text-3xl mb-4">No results found</h1>
        <p className="text-lg">
          Try searching for something else or go back to the homepage{" "}
          <Link href="/" className="text-blue-500">
            Home
          </Link>
        </p>
      </div>
    );
  }

  return <>{results && <WebSearchResults results={data} />}</>;
}
