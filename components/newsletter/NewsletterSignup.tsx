"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import type { SupportedLanguage } from "@/services/pipeline/types";

export default function NewsletterSignup({ language }: { language: SupportedLanguage }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function subscribe() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, language }),
      });
      const payload = (await response.json()) as { message?: string; error?: string };

      setMessage(payload.message || payload.error || "Subscription unavailable.");
    } catch {
      setMessage("Subscription unavailable.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded border border-white/10 bg-zinc-950 p-5">
      <div className="flex items-center gap-2">
        <Mail size={20} className="text-emerald-300" />
        <h2 className="text-2xl font-semibold">Newsletter</h2>
      </div>
      <div className="mt-4 flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="min-w-0 flex-1 rounded border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-emerald-300"
        />
        <button
          type="button"
          onClick={subscribe}
          disabled={loading}
          className="rounded bg-emerald-400 px-4 py-2 text-sm font-semibold text-black disabled:opacity-60"
        >
          {loading ? "..." : "Join"}
        </button>
      </div>
      <p className="mt-3 min-h-5 text-sm text-zinc-400">
        {message || "Daily AI crypto digest with sentiment, airdrops, and risk notes."}
      </p>
    </section>
  );
}
