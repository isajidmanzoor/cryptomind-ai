import { runCryptoMindPipeline } from "@/services/pipeline/run";
import type { CryptoPipelineResult, SupportedLanguage } from "@/services/pipeline/types";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const language = parseLanguage(url.searchParams.get("lang"));
  const data = await runCryptoMindPipeline({ publish: false, language });

  if (url.searchParams.get("full") === "1") {
    return Response.json({
      success: true,
      mode: "preview",
      data,
    });
  }

  return Response.json({
    success: true,
    mode: "preview",
    message: "Compact preview. Use /api/pipeline?full=1 for full charts and article payload.",
    summary: summarizePipeline(data),
  });
}

export async function POST(request: Request) {
  const secret = process.env.PIPELINE_SECRET;

  if (!secret) {
    return Response.json(
      {
        success: false,
        error:
          "PIPELINE_SECRET is required before live article publishing.",
      },
      { status: 428 }
    );
  }

  const auth = request.headers.get("authorization");

  if (auth !== `Bearer ${secret}`) {
    return Response.json(
      { success: false, error: "Unauthorized pipeline trigger." },
      { status: 401 }
    );
  }

  const url = new URL(request.url);
  const language = parseLanguage(url.searchParams.get("lang"));
  const data = await runCryptoMindPipeline({ publish: true, language });

  return Response.json({
    success: true,
    mode: "published",
    data,
  });
}

function summarizePipeline(data: CryptoPipelineResult) {
  const primary = data.market[0];

  return {
    generatedAt: data.generatedAt,
    language: data.language,
    signal: data.analysis.signal,
    confidence: data.analysis.confidence,
    prediction: data.analysis.prediction,
    sentiment: data.sentiment,
    primaryMarket: primary
      ? {
          symbol: primary.symbol,
          name: primary.name,
          price: primary.price,
          change24h: primary.change24h,
        }
      : null,
    latestNews: data.news.slice(0, 5).map((item) => ({
      title: item.title,
      source: item.source,
      publishedAt: item.publishedAt,
      url: item.url,
    })),
    article: {
      title: data.article.title,
      slug: data.article.slug,
      imageUrl: data.article.imageUrl,
    },
    integrations: data.integrations,
    monetization: data.monetization,
    features: data.features,
  };
}

function parseLanguage(value: string | null): SupportedLanguage {
  return value === "ur" || value === "hi" || value === "ar" || value === "es"
    ? value
    : "en";
}
