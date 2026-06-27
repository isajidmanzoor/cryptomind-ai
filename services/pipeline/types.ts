export type MarketMood = "bullish" | "bearish" | "neutral";
export type TradeSignal = "BUY" | "SELL" | "HOLD";
export type SupportedLanguage = "en" | "ur" | "hi" | "ar" | "es";

export type NewsItem = {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  summary: string;
};

export type SentimentResult = {
  mood: MarketMood;
  score: number;
  bullish: number;
  bearish: number;
  neutral: number;
  highlights: string[];
};

export type PricePoint = {
  time: string;
  price: number;
};

export type MarketAsset = {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  chart: PricePoint[];
};

export type AIAnalysis = {
  signal: TradeSignal;
  confidence: number;
  reason: string;
  prediction: string;
  risks: string[];
};

export type GeneratedArticle = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  imageUrl: string;
  affiliateUrl: string;
};

export type IntegrationStatus = {
  name: string;
  configured: boolean;
  ok: boolean;
  message: string;
};

export type CryptoPipelineResult = {
  generatedAt: string;
  language: SupportedLanguage;
  news: NewsItem[];
  sentiment: SentimentResult;
  market: MarketAsset[];
  analysis: AIAnalysis;
  article: GeneratedArticle;
  integrations: IntegrationStatus[];
  monetization: {
    adsenseConfigured: boolean;
    adsenseClientId: string;
    adsenseSlotId: string;
    adsenseUnitConfigured: boolean;
    affiliateUrl: string;
    cryptoAdsConfigured: boolean;
    cryptoAdsZoneId: string;
    cryptoAdsEmbedHtml: string;
    cryptoAdsUnitConfigured: boolean;
  };
  features: FeatureStatus[];
};

export type FeatureStatus = {
  name: string;
  status: "live" | "partial" | "missing";
  detail: string;
};

export type AirdropItem = {
  id: string;
  project: string;
  category: string;
  status: "confirmed" | "rumored" | "active";
  action: string;
  url: string;
  risk: "low" | "medium" | "high";
};
