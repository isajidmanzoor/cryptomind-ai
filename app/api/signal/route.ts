import { getMarketSignal } from "@/services/ai/engine";
import { sendAlert } from "@/services/alerts/notify";

export async function GET() {
  const signal = await getMarketSignal();

  if (signal.confidence > 80) {
    await sendAlert(
      `🔥 HIGH CONFIDENCE SIGNAL: ${signal.signal}`
    );
  }

  return Response.json({
    success: true,
    signal,
    time: new Date().toISOString(),
  });
}
