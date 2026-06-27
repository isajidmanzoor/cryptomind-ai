import { getAirdrops } from "@/services/airdrops/tracker";

export const dynamic = "force-dynamic";

export async function GET() {
  const airdrops = await getAirdrops();

  return Response.json({
    success: true,
    airdrops,
    disclaimer:
      "Airdrop information is educational. Verify every claim through official project channels.",
  });
}
