import type { Metadata } from "next";
import { seoDescription, seoKeywords, siteName } from "@/app/seo";

export const metadata: Metadata = {
  title: "AI Crypto Blog",
  description: "Daily AI-generated crypto market insights, Bitcoin analysis, altcoin trends, DeFi news, airdrops, and worldwide Web3 research.",
  keywords: seoKeywords,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `AI Crypto Blog | ${siteName}`,
    description: seoDescription,
    url: "/blog",
    images: ["/opengraph-image"],
  },
};

export default function Blog() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-cyan-400">
        AI Crypto Blog
      </h1>

      <p className="mt-6 text-gray-400">
        Daily AI generated crypto insights, trends and analysis.
      </p>

      <div className="mt-10 space-y-6">
        <div className="rounded-xl border border-gray-800 bg-zinc-900 p-6">
          Bitcoin breakout expected in next cycle
        </div>

        <div className="rounded-xl border border-gray-800 bg-zinc-900 p-6">
          Ethereum upgrade impact on gas fees
        </div>

        <div className="rounded-xl border border-gray-800 bg-zinc-900 p-6">
          Altcoin season prediction model
        </div>
      </div>
    </main>
  );
}
