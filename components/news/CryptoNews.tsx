"use client";

import { useEffect, useState } from "react";

export default function CryptoNews() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const generateNews = async () => {
    try {
      // Fake AI-style crypto news generator (frontend demo version)
      const topics = [
        "Bitcoin hits new resistance level",
        "Ethereum network upgrade incoming",
        "Solana ecosystem growing rapidly",
        "Market sentiment turns bullish",
        "Institutional crypto adoption increases",
      ];

      const shuffled = topics
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((t, i) => ({
          id: i,
          title: t,
          time: "Just now",
        }));

      setNews(shuffled);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    generateNews();

    const interval = setInterval(generateNews, 15000); // refresh news
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-16 text-gray-400">
        Loading AI Crypto News...
      </div>
    );
  }

  return (
    <div className="mx-auto mt-16 max-w-5xl p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        🧠 AI Crypto News Feed
      </h2>

      <div className="space-y-4">
        {news.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-gray-800 bg-zinc-900 p-4"
          >
            <h3 className="text-lg font-semibold text-cyan-400">
              {item.title}
            </h3>
            <p className="text-xs text-gray-500">{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
