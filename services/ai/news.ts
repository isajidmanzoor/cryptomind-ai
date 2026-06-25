export async function generateAIHeadline() {
  // Placeholder AI logic (later we plug Groq/OpenAI)
  const response = await fetch("https://api.coingecko.com/api/v3/global");

  const data = await response.json();

  const btc = data.data.total_market_cap.usd;

  return [
    `Bitcoin dominance affecting global market cap: $${btc}`,
    `AI predicts volatility spike in crypto market`,
    `Institutional money flowing into BTC ETFs`,
    `Altcoins showing mixed sentiment today`,
    `Market reacts to macroeconomic signals`,
  ];
}
