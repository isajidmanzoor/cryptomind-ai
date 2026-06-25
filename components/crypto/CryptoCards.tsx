"use client";

import { useEffect, useState } from "react";
import { getMarket } from "../../services/coingecko";

export default function CryptoCards() {
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await getMarket();

      // 🔥 SORT by highest gainers first
      const sorted = [...data].sort(
        (a, b) =>
          b.price_change_percentage_24h -
          a.price_change_percentage_24h
      );

      setCoins(sorted);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-400">
        Loading crypto intelligence...
      </div>
    );
  }

  return (
    <section className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-6 p-6 md:grid-cols-3">
      {coins.map((coin, index) => (
        <div
          key={coin.id}
          className="relative rounded-xl border border-gray-800 bg-zinc-900 p-6 transition hover:scale-105"
        >
          {/* 🔥 TOP GAINER BADGE */}
          {index === 0 && (
            <div className="absolute right-3 top-3 rounded-full bg-yellow-500 px-2 py-1 text-xs font-bold text-black">
              🔥 TOP GAINER
            </div>
          )}

          <h2 className="text-xl font-bold">{coin.name}</h2>

          <p className="mt-2 text-3xl font-bold text-cyan-400">
            ${coin.current_price}
          </p>

          <p
            className={
              coin.price_change_percentage_24h > 0
                ? "text-green-500"
                : "text-red-500"
            }
          >
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>

          {/* mini label */}
          <p className="mt-3 text-xs text-gray-500">
            Rank #{coin.market_cap_rank}
          </p>
        </div>
      ))}
    </section>
  );
}
