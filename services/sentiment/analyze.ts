import type { MarketMood, NewsItem, SentimentResult } from "@/services/pipeline/types";

const BULLISH_TERMS = [
  "surge",
  "rally",
  "gain",
  "bull",
  "inflow",
  "adoption",
  "breakout",
  "approved",
  "record",
  "accumulate",
];

const BEARISH_TERMS = [
  "drop",
  "fall",
  "bear",
  "outflow",
  "hack",
  "lawsuit",
  "selloff",
  "liquidation",
  "crackdown",
  "risk",
];

export function analyzeSentiment(news: NewsItem[]): SentimentResult {
  const scored = news.map((item) => scoreText(`${item.title} ${item.summary}`));
  const bullish = scored.filter((score) => score > 0).length;
  const bearish = scored.filter((score) => score < 0).length;
  const neutral = Math.max(0, news.length - bullish - bearish);
  const totalScore = scored.reduce((sum, score) => sum + score, 0);
  const normalized = news.length ? totalScore / news.length : 0;
  const mood: MarketMood =
    normalized > 0.2 ? "bullish" : normalized < -0.2 ? "bearish" : "neutral";

  return {
    mood,
    score: Number(normalized.toFixed(2)),
    bullish,
    bearish,
    neutral,
    highlights: news.slice(0, 3).map((item) => item.title),
  };
}

function scoreText(value: string) {
  const text = value.toLowerCase();
  const bullishScore = BULLISH_TERMS.reduce(
    (score, term) => score + Number(text.includes(term)),
    0
  );
  const bearishScore = BEARISH_TERMS.reduce(
    (score, term) => score + Number(text.includes(term)),
    0
  );

  return bullishScore - bearishScore;
}
