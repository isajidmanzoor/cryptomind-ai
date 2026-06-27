import { getCryptoAIAnalysis } from "@/services/ai/groq";
import { getPriceCharts } from "@/services/market/prices";
import { scrapeCryptoNews } from "@/services/news/scraper";
import { analyzeSentiment } from "@/services/sentiment/analyze";

export async function getAIInsights() {
  const [news, market] = await Promise.all([scrapeCryptoNews(), getPriceCharts()]);
  const sentiment = analyzeSentiment(news);
  const analysis = await getCryptoAIAnalysis({ news, sentiment, market });
  const signals = market.slice(0, 3).map((asset) => ({
    coin: asset.symbol,
    action: analysis.signal,
    change24h: asset.change24h,
  }));

  return {
    mood: sentiment.mood,
    signals,
    insights: [
      analysis.prediction,
      analysis.reason,
      ...sentiment.highlights.slice(0, 2),
    ],
  };
}
