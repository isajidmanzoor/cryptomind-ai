import { runCryptoMindPipeline } from "@/services/pipeline/run";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await runCryptoMindPipeline({ publish: false });

  return Response.json({
    feed: data,
  });
}
