export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center px-6">
        <p className="text-cyan-400 mb-4">🚀 AI Powered Crypto Intelligence</p>

        <h1 className="text-6xl font-bold">
          Crypto<span className="text-cyan-400">Mind</span> AI
        </h1>

        <p className="mt-6 max-w-2xl text-gray-400 mx-auto">
          AI-powered crypto news, live prices, market insights and intelligent analysis.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="bg-cyan-500 text-black px-6 py-3 rounded-lg">
            Explore Market
          </button>

          <button className="border border-cyan-500 px-6 py-3 rounded-lg">
            Latest News
          </button>
        </div>
      </div>
    </main>
  );
}
