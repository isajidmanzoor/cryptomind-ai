import { getCryptoAIAnalysis } from "@/services/ai/groq";
import { createPollinationsImageUrl } from "@/services/images/pollinations";
import { publishArticle } from "@/services/integrations/publisher";
import { getPriceCharts } from "@/services/market/prices";
import { scrapeCryptoNews } from "@/services/news/scraper";
import { analyzeSentiment } from "@/services/sentiment/analyze";
import type {
  CryptoPipelineResult,
  FeatureStatus,
  GeneratedArticle,
  IntegrationStatus,
  SupportedLanguage,
} from "@/services/pipeline/types";

export async function runCryptoMindPipeline(options?: {
  publish?: boolean;
  language?: SupportedLanguage;
}): Promise<CryptoPipelineResult> {
  const language = normalizeLanguage(options?.language);
  const [news, market] = await Promise.all([scrapeCryptoNews(), getPriceCharts()]);
  const sentiment = analyzeSentiment(news);
  const analysis = await getCryptoAIAnalysis({ news, sentiment, market, language });
  const article = generateArticle({ news, sentiment, analysis, language });
  const integrations = options?.publish
    ? await runPublishingIntegrations(article)
    : getReadinessStatuses();
  const monetization = {
    adsenseConfigured: Boolean(getAdsenseClientId()),
    adsenseClientId: getAdsenseClientId(),
    adsenseSlotId: getAdsenseSlotId(),
    adsenseUnitConfigured: Boolean(getAdsenseClientId() && getAdsenseSlotId()),
    affiliateUrl: getAffiliateUrl(),
    cryptoAdsConfigured: Boolean(getCryptoAdsZoneId() || getCryptoAdsEmbedHtml()),
    cryptoAdsZoneId: getCryptoAdsZoneId(),
    cryptoAdsEmbedHtml: getCryptoAdsEmbedHtml(),
    cryptoAdsUnitConfigured: Boolean(getCryptoAdsZoneId() || getCryptoAdsEmbedHtml()),
  };

  return {
    generatedAt: new Date().toISOString(),
    language,
    news,
    sentiment,
    market,
    analysis,
    article,
    integrations,
    monetization,
    features: getFeatureStatuses(monetization),
  };
}

async function runPublishingIntegrations(article: GeneratedArticle) {
  const publishStatus = await publishArticle(article);

  return [publishStatus];
}

function getReadinessStatuses(): IntegrationStatus[] {
  return [
    {
      name: "Groq AI analysis",
      configured: Boolean(process.env.GROQ_API_KEY),
      ok: true,
      message: process.env.GROQ_API_KEY
        ? "Configured. Live AI analysis will run when Groq is reachable."
        : "Setup needed: add GROQ_API_KEY for live AI analysis.",
    },
    {
      name: "Supabase article publish",
      configured: Boolean(
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
          process.env.SUPABASE_SERVICE_ROLE_KEY
      ),
      ok: true,
      message:
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.SUPABASE_SERVICE_ROLE_KEY
          ? "Configured. POST /api/pipeline can publish articles."
          : "Setup needed: add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    },
    {
      name: "Publish safety key",
      configured: Boolean(process.env.PIPELINE_SECRET),
      ok: true,
      message: process.env.PIPELINE_SECRET
        ? "Configured. Publishing requires Authorization: Bearer <secret>."
        : "Setup needed: add PIPELINE_SECRET before live publishing is allowed.",
    },
  ];
}

function generateArticle(input: {
  news: Awaited<ReturnType<typeof scrapeCryptoNews>>;
  sentiment: ReturnType<typeof analyzeSentiment>;
  analysis: Awaited<ReturnType<typeof getCryptoAIAnalysis>>;
  language: SupportedLanguage;
}): GeneratedArticle {
  const lead = input.news[0];
  const title =
    input.language === "en"
      ? `CryptoMind AI: ${capitalize(input.sentiment.mood)} market signal is ${input.analysis.signal}`
      : `${localizedLabel(input.language, "titlePrefix")}: ${capitalize(input.sentiment.mood)} ${input.analysis.signal}`;
  const slug = slugify(`${title}-${new Date().toISOString().slice(0, 10)}`);
  const imageUrl = createPollinationsImageUrl(title);

  return {
    title,
    slug,
    excerpt: `${input.analysis.prediction} Confidence: ${input.analysis.confidence}%.`,
    body: [
      `${localizedLabel(input.language, "scan")} ${input.sentiment.mood} (${input.sentiment.score}).`,
      `${localizedLabel(input.language, "headline")} "${lead?.title || "fresh market data"}" - ${lead?.source || "crypto news sources"}.`,
      `AI signal: ${input.analysis.signal}. ${input.analysis.reason}`,
      `${localizedLabel(input.language, "risks")}: ${input.analysis.risks.join(", ")}.`,
      localizedLabel(input.language, "disclaimer"),
    ].join("\n\n"),
    imageUrl,
    affiliateUrl: getAffiliateUrl(),
  };
}

function getAffiliateUrl() {
  return extractUrl(process.env.NEXT_PUBLIC_AFFILIATE_URL) || "https://www.binance.com/";
}

function getAdsenseClientId() {
  return extractAdsenseClientId(process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "");
}

function getAdsenseSlotId() {
  return process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID || "";
}

function getCryptoAdsZoneId() {
  return process.env.NEXT_PUBLIC_CRYPTO_ADS_ZONE_ID || "";
}

function getCryptoAdsEmbedHtml() {
  return process.env.NEXT_PUBLIC_CRYPTO_ADS_EMBED_HTML || "";
}

function extractAdsenseClientId(value: string) {
  return value.match(/ca-pub-\d+/)?.[0] || value.trim();
}

function extractUrl(value?: string) {
  const trimmed = value?.trim();

  if (!trimmed) {
    return "";
  }

  return trimmed.match(/\((https?:\/\/[^)]+)\)/)?.[1] || trimmed;
}

function normalizeLanguage(language?: SupportedLanguage): SupportedLanguage {
  return language === "ur" ||
    language === "hi" ||
    language === "ar" ||
    language === "es"
    ? language
    : "en";
}

function localizedLabel(language: SupportedLanguage, key: string) {
  const labels: Record<SupportedLanguage, Record<string, string>> = {
    en: {
      titlePrefix: "CryptoMind AI",
      scan: "CryptoMind AI scanned live crypto headlines and market data. Current mood:",
      headline: "Leading headline:",
      risks: "Key risks",
      disclaimer: "This automated article is educational market commentary, not financial advice.",
    },
    ur: {
      titlePrefix: "کرپٹو مائنڈ اے آئی",
      scan: "CryptoMind AI ne live crypto headlines aur market data scan kiya. Current mood:",
      headline: "Leading headline:",
      risks: "Key risks",
      disclaimer: "Yeh automated article educational market commentary hai, financial advice nahi.",
    },
    hi: {
      titlePrefix: "CryptoMind AI",
      scan: "CryptoMind AI ne live crypto headlines aur market data scan kiya. Current mood:",
      headline: "Leading headline:",
      risks: "Key risks",
      disclaimer: "Yeh automated article educational market commentary hai, financial advice nahi.",
    },
    ar: {
      titlePrefix: "CryptoMind AI",
      scan: "CryptoMind AI scanned live crypto headlines and market data. Current mood:",
      headline: "Leading headline:",
      risks: "Key risks",
      disclaimer: "This automated article is educational market commentary, not financial advice.",
    },
    es: {
      titlePrefix: "CryptoMind AI",
      scan: "CryptoMind AI analizo noticias cripto y datos de mercado. Estado actual:",
      headline: "Titular principal:",
      risks: "Riesgos clave",
      disclaimer: "Este articulo automatico es comentario educativo, no consejo financiero.",
    },
  };

  return labels[language][key] || labels.en[key] || key;
}

function getFeatureStatuses(monetization: CryptoPipelineResult["monetization"]): FeatureStatus[] {
  const hasSupabase = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  return [
    live("AI-generated crypto news", "RSS/CryptoCompare scraper plus Groq article generation."),
    live("Price prediction", "Groq signal returns 24h prediction, confidence, risks."),
    live("Market sentiment", "Headline sentiment engine runs on every pipeline call."),
    hasSupabase
      ? live("Auto publishing", "POST /api/pipeline publishes generated articles to Supabase.")
      : partial("Auto publishing", "Supabase env keys required."),
    live("Multi-language support", "Pipeline and chatbot support en, ur, hi, ar, es."),
    process.env.GROQ_API_KEY
      ? live("AI chatbot", "Groq-backed /api/chat endpoint is configured.")
      : partial("AI chatbot", "Falls back without GROQ_API_KEY."),
    live("Airdrop tracker", "Curated tracker API and dashboard widget are enabled."),
    live("TradingView charts", "BTC/ETH/SOL TradingView embeds are enabled."),
    live("PWA support", "Manifest and service worker are included."),
    live("Admin dashboard", "Dashboard can preview and trigger protected publishing."),
    hasSupabase
      ? live("Newsletter", "Newsletter API stores subscribers in Supabase.")
      : partial("Newsletter", "Supabase env keys required."),
    live("SEO optimization", "Metadata, robots, sitemap, and blog routes are configured."),
    monetization.adsenseUnitConfigured
      ? live("AdSense integration", "AdSense client and slot are embedded.")
      : partial("AdSense integration", "Client configured; add NEXT_PUBLIC_ADSENSE_SLOT_ID for ad unit."),
    monetization.affiliateUrl
      ? live("Affiliate monetization", "Affiliate URL is embedded in articles and UI.")
      : partial("Affiliate monetization", "Add NEXT_PUBLIC_AFFILIATE_URL."),
    live("GitHub Actions automation", "Workflow can trigger /api/pipeline on a schedule."),
    live("Vercel deployment", "Project is linked and deployable with vercel deploy --prod."),
    hasSupabase
      ? live("Supabase backend", "Service role backend integration is configured.")
      : partial("Supabase backend", "Supabase env keys required."),
  ];
}

function live(name: string, detail: string): FeatureStatus {
  return { name, detail, status: "live" };
}

function partial(name: string, detail: string): FeatureStatus {
  return { name, detail, status: "partial" };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function capitalize(value: string) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}
