"use client";

import { useEffect, useState } from "react";
import { getPortfolio } from "@/services/user/portfolio";

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // demo user id
    getPortfolio("demo-user").then(setData).catch(console.error);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold text-cyan-400">
        📊 User Dashboard
      </h1>

      <div className="mt-8 space-y-4">
        {data.length === 0 && (
          <p className="text-gray-400">No portfolio data yet</p>
        )}

        {data.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-800 bg-zinc-900 p-4"
          >
            <pre className="text-sm text-gray-300">
              {JSON.stringify(item.coins, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </main>
  );
}
