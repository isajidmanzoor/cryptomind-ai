"use client";

import { useEffect, useState } from "react";

type AiResponse = {
  data?: {
    signal?: string;
    confidence?: number;
    reason?: string;
    prediction?: string;
  };
};

type SignalResponse = {
  signal?: {
    signal?: string;
    confidence?: number;
    reason?: string;
  };
};

export default function Dashboard() {
  const [ai, setAi] = useState<AiResponse | null>(null);
  const [signal, setSignal] = useState<SignalResponse | null>(null);

  useEffect(() => {
    fetch("/api/ai").then(r => r.json()).then(setAi);
    fetch("/api/signal").then(r => r.json()).then(setSignal);
  }, []);

  return (
    <div className="p-10 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold">AI Crypto Dashboard</h1>

      <div className="mt-6">
        <h2 className="text-xl">Market Insight</h2>
        <p>{ai?.data?.prediction || ai?.data?.reason || "Loading live AI signal..."}</p>
        <p>{ai?.data?.signal ? `${ai.data.signal} - ${ai.data.confidence}%` : null}</p>
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
