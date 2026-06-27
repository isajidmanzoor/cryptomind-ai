import Groq from "groq-sdk";
import type {
  AIAnalysis,
  MarketAsset,
  NewsItem,
  SentimentResult,
  SupportedLanguage,
} from "@/services/pipeline/types";

const apiKey = process.env.GROQ_API_KEY;
const client = apiKey ? new Groq({ apiKey }) : null;

export async function getAIAnalysis(data: unknown) {
  if (!client) {
    return fallbackAnalysis(data);
  }

  const res = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "Return ONLY valid JSON in this format: {\"signal\":\"BUY|SELL|HOLD\",\"confidence\":80,\"reason\":\"...\"}"
      },
      {
        role: "user",
        content: JSON.stringify(data),
      },
    ],
  });

  return safeParse(res.choices[0].message.content || "{}", fallbackAnalysis(data));
}

export async function getCryptoAIAnalysis(input: {
  news: NewsItem[];
  sentiment: SentimentResult;
  market: MarketAsset[];
  language?: SupportedLanguage;
}): Promise<AIAnalysis> {
  if (!client) {
    return fallbackAnalysis(input);
  }

  try {
    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            `You are a crypto market analyst. Return ONLY valid JSON: {"signal":"BUY|SELL|HOLD","confidence":75,"reason":"short reason","prediction":"24h prediction","risks":["risk one","risk two"]}. Do not give financial advice. Write reason, prediction, and risks in ${languageName(input.language || "en")}.`,
        },
        {
          role: "user",
          content: JSON.stringify(input),
        },
      ],
      temperature: 0.3,
    });

    return normalizeAnalysis(
      safeParse(response.choices[0].message.content || "{}", fallbackAnalysis(input))
    );
  } catch {
    return fallbackAnalysis(input);
  }
}

export async function answerCryptoQuestion(input: {
  question: string;
  language?: SupportedLanguage;
  context?: unknown;
}) {
  const fallback =
    "I can help with crypto news, sentiment, airdrops, and risk-aware market education. This is not financial advice.";

  if (!client) {
    return fallback;
  }

  try {
    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are CryptoMind AI, a concise crypto education chatbot. Answer in ${languageName(input.language || "en")}. Do not give financial advice. If asked for trades, explain risk and scenarios.`,
        },
        {
          role: "user",
          content: JSON.stringify({
            question: input.question,
            context: input.context,
          }),
        },
      ],
      temperature: 0.4,
    });

    return response.choices[0].message.content?.trim() || fallback;
  } catch {
    return fallback;
  }
}

function safeParse<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    const jsonMatch = value.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return fallback;
    }

    try {
      return JSON.parse(jsonMatch[0]) as T;
    } catch {
      return fallback;
    }
  }
}

function normalizeAnalysis(value: Partial<AIAnalysis>): AIAnalysis {
  const signal: AIAnalysis["signal"] =
    value.signal === "BUY" || value.signal === "SELL" || value.signal === "HOLD"
      ? value.signal
      : "HOLD";

  return {
    signal,
    confidence: Math.max(1, Math.min(100, Number(value.confidence) || 60)),
    reason: value.reason || "Market is mixed while fresh news is being evaluated.",
    prediction:
      value.prediction ||
      "Expect short-term volatility until volume confirms the next move.",
    risks:
      Array.isArray(value.risks) && value.risks.length > 0
        ? value.risks.slice(0, 3)
        : ["High volatility", "Macro headlines", "Liquidity rotation"],
  };
}

function fallbackAnalysis(data: unknown): AIAnalysis {
  const input = data as {
    sentiment?: { mood?: string };
    trend?: string;
    market?: Array<{ change24h?: number }> | { change24h?: number };
  };
  const mood = input.sentiment?.mood || input.trend || "neutral";
  const btc = Array.isArray(input.market) ? input.market[0] : input.market;
  const change = Number(btc?.change24h || 0);
  const signal = mood === "bullish" && change >= 0 ? "BUY" : mood === "bearish" ? "SELL" : "HOLD";

  return {
    signal,
    confidence: mood === "neutral" ? 58 : 72,
    reason:
      mood === "bullish"
        ? "News sentiment and leading asset momentum are leaning positive."
        : mood === "bearish"
          ? "News sentiment is defensive and traders should respect downside risk."
          : "Signals are mixed, so confirmation is more important than speed.",
    prediction:
      signal === "BUY"
        ? "Market can attempt an upside continuation if volume expands."
        : signal === "SELL"
          ? "Market may retest lower support if negative headlines keep pressure high."
          : "Range-bound movement is likely until a clearer catalyst appears.",
    risks: ["Crypto assets are volatile", "Headlines can reverse quickly", "This is not financial advice"],
  };
}

function languageName(language: SupportedLanguage) {
  const names: Record<SupportedLanguage, string> = {
    en: "English",
    ur: "Urdu",
    hi: "Hindi",
    ar: "Arabic",
    es: "Spanish",
  };

  return names[language];
}
