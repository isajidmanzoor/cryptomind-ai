const symbols = [
  { label: "Bitcoin", tv: "BINANCE:BTCUSDT" },
  { label: "Ethereum", tv: "BINANCE:ETHUSDT" },
  { label: "Solana", tv: "BINANCE:SOLUSDT" },
];

export default function TradingViewCharts() {
  return (
    <section className="rounded border border-white/10 bg-zinc-950 p-5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-emerald-300">
            TradingView
          </p>
          <h2 className="mt-2 text-2xl font-semibold">Live Market Charts</h2>
        </div>
        <p className="text-sm text-zinc-400">BTC / ETH / SOL</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {symbols.map((symbol) => (
          <div key={symbol.tv} className="overflow-hidden rounded border border-white/10 bg-black/30">
            <div className="border-b border-white/10 px-3 py-2 text-sm text-zinc-300">
              {symbol.label}
            </div>
            <iframe
              title={`${symbol.label} TradingView chart`}
              src={`https://s.tradingview.com/widgetembed/?symbol=${encodeURIComponent(symbol.tv)}&interval=60&theme=dark&style=1&timezone=Etc%2FUTC&hide_top_toolbar=1&hide_legend=1`}
              className="h-80 w-full border-0"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
