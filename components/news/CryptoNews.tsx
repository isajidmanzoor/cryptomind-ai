"use client";

import { useEffect, useState } from "react";
import { generateAIHeadline } from "../../services/ai/news";

export default function CryptoNews() {
  const [news, setNews] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadNews = async () => {
    try {
      const data = await generateAIHeadline();

      const shuffled = data
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      setNews(shuffled);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();

    const interval = setInterval(loadNews, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-16 text-gray-400">
        AI is analyzing market data...
      </div>
    );
  }

  return (
    <div className="mx-auto mt-16 max-w-5xl p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        🧠 AI Market Intelligence
      </h2>

      <div className="space-y-4">
        {news.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-800 bg-zinc-900 p-4"
          >
            <h3 className="text-lg font-semibold text-cyan-400">
              {item}
            </h3>
            <p className="text-xs text-gray-500">AI Generated • Live</p>
          </div>
        ))}
      </div>
    </div>
  );
}
