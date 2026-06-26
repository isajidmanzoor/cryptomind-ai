export async function generateNews() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/search/trending"
  );

  const data = await res.json();

  return (data?.coins || []).map((c: any) => {
    const name = c.item.name;

    return {
      title: `${name} surges in crypto market due to AI-driven momentum`,
      rank: c.item.market_cap_rank || 0,
      sentiment:
        Math.random() > 0.5 ? "bullish" : "bearish",
    };
  });
}
