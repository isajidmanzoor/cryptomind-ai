import type { NewsItem } from "@/services/pipeline/types";

const FALLBACK_NEWS: NewsItem[] = [
  {
    id: "fallback-btc-etf",
    title: "Bitcoin ETF flows keep traders focused on institutional demand",
    url: "https://www.coindesk.com/",
    source: "CryptoMind fallback",
    publishedAt: new Date().toISOString(),
    summary:
      "Institutional demand remains a key market narrative while traders watch liquidity and ETF flow data.",
  },
  {
    id: "fallback-altcoins",
    title: "Altcoin volatility rises as liquidity rotates across major tokens",
    url: "https://cointelegraph.com/",
    source: "CryptoMind fallback",
    publishedAt: new Date().toISOString(),
    summary:
      "Large-cap altcoins are showing mixed momentum, with risk appetite moving quickly between sectors.",
  },
  {
    id: "fallback-macro",
    title: "Crypto market watches macro signals for the next directional move",
    url: "https://decrypt.co/",
    source: "CryptoMind fallback",
    publishedAt: new Date().toISOString(),
    summary:
      "Macro expectations and dollar liquidity continue to influence crypto positioning.",
  },
];

type CryptoCompareNews = {
  id?: string;
  title?: string;
  url?: string;
  source_info?: { name?: string };
  published_on?: number;
  body?: string;
};

const RSS_SOURCES = [
  { name: "Cointelegraph", url: "https://cointelegraph.com/rss" },
  { name: "Decrypt", url: "https://decrypt.co/feed" },
];

export async function scrapeCryptoNews(): Promise<NewsItem[]> {
  const rssNews = await scrapeRssFeeds();

  if (rssNews.length > 0) {
    return rssNews;
  }

  try {
    const response = await fetch(
      "https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=BTC,ETH,Trading,Blockchain",
      { next: { revalidate: 300 } }
    );

    if (!response.ok) {
      throw new Error(`CryptoCompare news failed: ${response.status}`);
    }

    const payload = (await response.json()) as { Data?: CryptoCompareNews[] };
    const news = (payload.Data || []).slice(0, 8).map((item, index) => ({
      id: item.id || `cryptocompare-${index}`,
      title: item.title || "Untitled crypto update",
      url: item.url || "https://min-api.cryptocompare.com/",
      source: item.source_info?.name || "CryptoCompare",
      publishedAt: item.published_on
        ? new Date(item.published_on * 1000).toISOString()
        : new Date().toISOString(),
      summary: trimText(stripHtml(item.body || item.title || ""), 220),
    }));

    return news.length > 0 ? news : FALLBACK_NEWS;
  } catch {
    return FALLBACK_NEWS;
  }
}

async function scrapeRssFeeds(): Promise<NewsItem[]> {
  const results = await Promise.allSettled(
    RSS_SOURCES.map(async (source) => {
      const response = await fetch(source.url, { next: { revalidate: 300 } });

      if (!response.ok) {
        throw new Error(`${source.name} RSS failed: ${response.status}`);
      }

      const xml = await response.text();

      return parseRss(xml, source.name);
    })
  );

  return results
    .flatMap((result) => (result.status === "fulfilled" ? result.value : []))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 10);
}

function parseRss(xml: string, source: string): NewsItem[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

  return items.map((item, index) => {
    const title = decodeEntities(readTag(item, "title"));
    const link = decodeEntities(readTag(item, "link") || readTag(item, "guid"));
    const description = decodeEntities(readTag(item, "description"));
    const publishedAt = readTag(item, "pubDate");

    return {
      id: `${source.toLowerCase()}-${slugify(title || link || String(index))}`,
      title: title || "Untitled crypto update",
      url: link || "https://cointelegraph.com",
      source,
      publishedAt: publishedAt
        ? new Date(publishedAt).toISOString()
        : new Date().toISOString(),
      summary: trimText(stripHtml(description || title), 240),
    };
  });
}

function readTag(item: string, tag: string) {
  const match = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));

  return (match?.[1] || "")
    .replace(/^<!\[CDATA\[/, "")
    .replace(/\]\]>$/, "")
    .trim();
}

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function trimText(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trim()}...`;
}

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'");
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
