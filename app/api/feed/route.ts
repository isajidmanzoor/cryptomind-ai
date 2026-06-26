import { getMarketSignal } from "@/services/ai/engine";

export async function GET() {
  const signal = await getMarketSignal();

  return Response.json({
    feed: [
      signal,
      {
        signal: "HOLD",
        confidence: 45,
        reason: "Market cooling phase",
      },
    ],
  });
}
