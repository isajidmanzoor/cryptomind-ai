import { getAIAnalysis } from "./groq";

export async function generateSignal(market: unknown) {
  const ai = await getAIAnalysis(market);

  return {
    signal: ai.signal || "HOLD",
    confidence: ai.confidence || 50,
    reason: ai.reason || "No clear trend",
  };
}
