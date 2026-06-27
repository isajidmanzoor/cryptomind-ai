import { getMarketSignal } from "@/services/ai/engine";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getMarketSignal();

  return Response.json({
    success: true,
    data,
    time: new Date().toISOString(),
  });
}
