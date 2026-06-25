"use client";

import { useEffect, useState } from "react";
import { getAIInsights } from "../../services/brain/engine";

export default function AIBrain() {
  const [data, setData] = useState<any>(null);

  const loadBrain = async () => {
    const res = await getAIInsights();
    setData(res);
  };

  useEffect(() => {
    loadBrain();

    const interval = setInterval(loadBrain, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return (
      <div className="text-center text-gray-400 mt-10">
        AI Brain analyzing market...
      </div>
    );
  }

  return (
    <div className="mx-auto mt-16 max-w-5xl p-6">
      <h2 className="text-2xl font-bold text-cyan-400">
        🧠 AI Brain Dashboard
      </h2>

      <p className="mt-2 text-gray-400">
        Market Mood:{" "}
        <span className="text-white font-bold">{data.mood}</span>
      </p>

      {/* Signals */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {data.signals.map((s: any, i: number) => (
          <div
            key={i}
            className="rounded-xl border border-gray-800 bg-zinc-900 p-4"
          >
            <h3 className="text-lg font-bold">{s.coin}</h3>
            <p
              className={
                s.action === "BUY"
                  ? "text-green-500"
                  : s.action === "SELL"
                  ? "text-red-500"
                  : "text-yellow-500"
              }
            >
              {s.action}
            </p>
          </div>
        ))}
      </div>

      {/* Insights */}
      <div className="mt-8 space-y-3">
        {data.insights.map((i: string, idx: number) => (
          <div
            key={idx}
            className="rounded-xl border border-gray-800 bg-zinc-900 p-4 text-gray-300"
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
}
