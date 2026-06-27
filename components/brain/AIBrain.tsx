"use client";

import { useEffect, useState } from "react";
import { getAIInsights } from "../../services/brain/engine";

type AIInsights = Awaited<ReturnType<typeof getAIInsights>>;

export default function AIBrain() {
  const [data, setData] = useState<AIInsights | null>(null);

  useEffect(() => {
    async function run() {
      const res = await getAIInsights();
      setData(res);
    }
    run();
  }, []);

  if (!data) return <p>Loading AI...</p>;

  return (
    <div className="p-4 bg-zinc-900 text-white rounded-xl">
      <h2 className="text-xl">AI Brain Active 🧠</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
