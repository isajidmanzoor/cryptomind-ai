"use client";

import { useEffect, useState } from "react";
import { getMarket } from "@/services/coingecko";

export default function CryptoCards() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    getMarket().then(setCoins).catch(console.error);
  }, []);

  return (
    <section className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-6 p-6 md:grid-cols-3">
      {coins.map((coin: any) => (
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
