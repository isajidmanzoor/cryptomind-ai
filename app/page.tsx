import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-cyan-400">
            🚀 AI Powered Crypto Intelligence
          </p>

          <h1 className="mt-5 text-7xl font-extrabold">
            Crypto<span className="text-cyan-400">Mind</span> AI
          </h1>

          <p className="mt-6 text-gray-400">
            AI News • Live Prices • Market Sentiment • Research
          </p>
        </div>
      </main>
    </>
  );
}
