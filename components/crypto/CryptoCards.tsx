"use client";

import { useEffect, useState } from "react";
import { getMarket } from "../../services/coingecko";

export default function CryptoCards() {
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMarket()
      .then((data) => {
        setCoins(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-400">
        Loading market data...
      </div>
    );
  }

  return (
    <section className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-6 p-6 md:grid-cols-3">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="rounded-xl border border-gray-800 bg-zinc-900 p-6"
        >
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
        </div>
      ))}
    </section>
  );
}
