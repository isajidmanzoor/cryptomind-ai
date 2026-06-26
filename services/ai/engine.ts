import { getAIAnalysis } from "./groq";

export async function getMarketSignal() {
  const market = {
    btc: 67000 + Math.random() * 1000,
    volume: Math.random() > 0.5 ? "high" : "low",
    trend: Math.random() > 0.5 ? "bullish" : "bearish",
    fearGreed: Math.floor(Math.random() * 100),
  };

  const ai = await getAIAnalysis(market);

  const confidenceBoost =
    market.volume === "high" ? 10 : -5;

  return {
    signal: ai.signal,
    confidence: Math.min(
      100,
      (ai.confidence || 50) + confidenceBoost
    ),
    reason: ai.reason,
    market,
  };
}
