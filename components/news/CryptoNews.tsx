"use client";

import { useEffect, useState } from "react";
import type { NewsItem } from "@/services/pipeline/types";

export default function CryptoNews() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        setNews(data.news || []);
      } catch (e) {
        console.log(e);
      }
    }
    load();
  }, []);

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl mb-4">Crypto News 📰</h2>

      {news.map((n, i) => (
        <div key={i} className="p-3 bg-zinc-900 rounded mb-2">
          <p>{n.title}</p>
          <p className="text-xs text-gray-400">{n.source}</p>
        </div>
      ))}
    </div>
  );
}
