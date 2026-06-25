export async function getAIInsights() {
  // Fake-but-realistic AI brain layer (we can upgrade to Groq/OpenAI later)

  const marketMood = Math.random() > 0.5 ? "Bullish 📈" : "Bearish 📉";

  const signals = [
    { coin: "BTC", action: Math.random() > 0.5 ? "BUY" : "HOLD" },
    { coin: "ETH", action: Math.random() > 0.5 ? "BUY" : "SELL" },
    { coin: "SOL", action: Math.random() > 0.5 ? "HOLD" : "BUY" },
  ];

  const insights = [
    "Whale activity detected in top wallets",
    "Market reacting to macro liquidity changes",
    "AI predicts short-term volatility spike",
    "Institutional inflow increasing in BTC",
  ];

  return {
    mood: marketMood,
    signals,
    insights,
  };
}
