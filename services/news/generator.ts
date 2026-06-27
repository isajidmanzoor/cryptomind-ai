import { scrapeCryptoNews } from "@/services/news/scraper";
import { analyzeSentiment } from "@/services/sentiment/analyze";

export async function generateNews() {
  const news = await scrapeCryptoNews();
  const sentiment = analyzeSentiment(news);

  return news.map((item, index) => ({
    title: item.title,
    rank: index + 1,
    sentiment: sentiment.mood,
    source: item.source,
    url: item.url,
  }));
}
