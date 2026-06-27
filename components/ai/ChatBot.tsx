"use client";

import { useState } from "react";
import { Bot, Send } from "lucide-react";
import type { SupportedLanguage } from "@/services/pipeline/types";

export default function ChatBot({ language }: { language: SupportedLanguage }) {
  const [question, setQuestion] = useState("What is the current BTC risk?");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function ask() {
    if (!question.trim()) {
      return;
    }

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question, language }),
      });
      const payload = (await response.json()) as { answer?: string; error?: string };

      setAnswer(payload.answer || payload.error || "Chatbot unavailable.");
    } catch {
      setAnswer("Chatbot unavailable.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded border border-white/10 bg-zinc-950 p-5">
      <div className="flex items-center gap-2">
        <Bot size={20} className="text-emerald-300" />
        <h2 className="text-2xl font-semibold">AI Chatbot</h2>
      </div>
      <div className="mt-4 flex gap-2">
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          className="min-w-0 flex-1 rounded border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-emerald-300"
        />
        <button
          type="button"
          onClick={ask}
          disabled={loading}
          className="grid size-10 place-items-center rounded bg-emerald-400 text-black disabled:opacity-60"
          aria-label="Ask chatbot"
        >
          <Send size={17} />
        </button>
      </div>
      <p className="mt-4 min-h-20 rounded border border-white/10 bg-black/24 p-3 text-sm leading-6 text-zinc-300">
        {loading ? "Thinking..." : answer || "Ask about crypto news, sentiment, airdrops, or risk scenarios."}
      </p>
    </section>
  );
}
