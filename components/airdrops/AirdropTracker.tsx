"use client";

import { useEffect, useState } from "react";
import { Gift } from "lucide-react";
import type { AirdropItem } from "@/services/pipeline/types";

export default function AirdropTracker() {
  const [items, setItems] = useState<AirdropItem[]>([]);

  useEffect(() => {
    fetch("/api/airdrops")
      .then((response) => response.json())
      .then((payload: { airdrops?: AirdropItem[] }) => setItems(payload.airdrops || []))
      .catch(() => setItems([]));
  }, []);

  return (
    <section className="rounded border border-white/10 bg-zinc-950 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Gift size={20} className="text-emerald-300" />
        <h2 className="text-2xl font-semibold">Airdrop Tracker</h2>
      </div>
      <div className="grid gap-3">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="rounded border border-white/10 bg-white/[0.03] p-3 transition hover:border-emerald-300/60"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium text-white">{item.project}</p>
              <span className={riskClass(item.risk)}>{item.risk} risk</span>
            </div>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-emerald-300">
              {item.category} / {item.status}
            </p>
            <p className="mt-2 text-sm text-zinc-400">{item.action}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function riskClass(risk: AirdropItem["risk"]) {
  if (risk === "low") {
    return "rounded bg-emerald-400/10 px-2 py-1 text-xs text-emerald-300";
  }

  if (risk === "medium") {
    return "rounded bg-amber-400/10 px-2 py-1 text-xs text-amber-300";
  }

  return "rounded bg-rose-400/10 px-2 py-1 text-xs text-rose-300";
}
