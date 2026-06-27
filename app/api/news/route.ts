import { scrapeCryptoNews } from "@/services/news/scraper";

export const dynamic = "force-dynamic";

export async function GET() {
  const news = await scrapeCryptoNews();

  return Response.json({
    news,
  });
}
