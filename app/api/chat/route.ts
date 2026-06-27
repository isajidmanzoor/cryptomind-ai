import { answerCryptoQuestion } from "@/services/ai/groq";
import { runCryptoMindPipeline } from "@/services/pipeline/run";
import type { SupportedLanguage } from "@/services/pipeline/types";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    question?: string;
    language?: SupportedLanguage;
  };
  const question = body.question?.trim();

  if (!question) {
    return Response.json(
      { success: false, error: "question is required" },
      { status: 400 }
    );
  }

  const context = await runCryptoMindPipeline({
    publish: false,
    language: body.language,
  });
  const answer = await answerCryptoQuestion({
    question,
    language: body.language,
    context: {
      signal: context.analysis.signal,
      confidence: context.analysis.confidence,
      sentiment: context.sentiment,
      topNews: context.news.slice(0, 3),
      market: context.market.slice(0, 3),
    },
  });

  return Response.json({
    success: true,
    answer,
    language: context.language,
  });
}
