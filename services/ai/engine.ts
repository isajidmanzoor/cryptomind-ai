import { getCryptoAIAnalysis } from "@/services/ai/groq";
import { getPriceCharts } from "@/services/market/prices";
import { scrapeCryptoNews } from "@/services/news/scraper";
import { analyzeSentiment } from "@/services/sentiment/analyze";

export async function getMarketSignal() {
  const [news, market] = await Promise.all([scrapeCryptoNews(), getPriceCharts()]);
  const sentiment = analyzeSentiment(news);
  const ai = await getCryptoAIAnalysis({ news, sentiment, market });
  const primary = market[0];

  return {
    signal: ai.signal,
    confidence: ai.confidence,
    reason: ai.reason,
    prediction: ai.prediction,
    risks: ai.risks,
    market: {
      asset: primary?.symbol || "BTC",
      price: primary?.price || 0,
      change24h: primary?.change24h || 0,
      mood: sentiment.mood,
      newsCount: news.length,
    },
  };
}
