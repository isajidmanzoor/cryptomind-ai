import type { MarketAsset, PricePoint } from "@/services/pipeline/types";

type CoinGeckoMarket = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  sparkline_in_7d?: { price?: number[] };
};

const FALLBACK_MARKET: MarketAsset[] = [
  makeFallbackAsset("BTC", "Bitcoin", 67000, 1.8),
  makeFallbackAsset("ETH", "Ethereum", 3500, 0.9),
  makeFallbackAsset("SOL", "Solana", 145, -1.2),
];

export async function getPriceCharts(): Promise<MarketAsset[]> {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=true&price_change_percentage=24h",
      { next: { revalidate: 180 } }
    );

    if (!response.ok) {
      throw new Error(`CoinGecko market failed: ${response.status}`);
    }

    const coins = (await response.json()) as CoinGeckoMarket[];

    return coins.map((coin) => ({
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      price: coin.current_price,
      change24h: coin.price_change_percentage_24h || 0,
      volume24h: coin.total_volume || 0,
      chart: toChart(coin.sparkline_in_7d?.price || []),
    }));
  } catch {
    return FALLBACK_MARKET;
  }
}

function toChart(prices: number[]): PricePoint[] {
  return prices.slice(-48).map((price, index) => ({
    time: `${index + 1}h`,
    price: Number(price.toFixed(2)),
  }));
}

function makeFallbackAsset(
  symbol: string,
  name: string,
  basePrice: number,
  change24h: number
): MarketAsset {
  return {
    symbol,
    name,
    price: basePrice,
    change24h,
    volume24h: basePrice * 100000,
    chart: Array.from({ length: 48 }, (_, index) => {
      const wave = Math.sin(index / 4) * basePrice * 0.015;
      const drift = index * basePrice * 0.0008;

      return {
        time: `${index + 1}h`,
        price: Number((basePrice + wave + drift).toFixed(2)),
      };
    }),
  };
}
