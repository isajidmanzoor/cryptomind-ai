"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [ai, setAi] = useState<any>(null);
  const [signal, setSignal] = useState<any>(null);

  useEffect(() => {
    fetch("/api/ai").then(r => r.json()).then(setAi);
    fetch("/api/signal").then(r => r.json()).then(setSignal);
  }, []);

  return (
    <div className="p-10 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold">AI Crypto Dashboard</h1>

      <div className="mt-6">
        <h2 className="text-xl">Market Insight</h2>
        <p>{ai?.data?.insight}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl">Signal</h2>
        <p>{signal?.signal?.signal}</p>
        <p>{signal?.signal?.confidence}%</p>
        <p>{signal?.signal?.reason}</p>
      </div>
    </div>
  );
}
