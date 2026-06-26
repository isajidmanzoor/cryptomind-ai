export async function GET() {
  return Response.json({
    news: [
      { title: "Bitcoin ETF inflows rising", rank: 1 },
      { title: "Altcoins showing momentum", rank: 2 },
      { title: "Market volatility increases", rank: 3 },
    ],
  });
}
