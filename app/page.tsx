import Navbar from "@/components/layout/Navbar";
import CryptoCards from "@/components/crypto/CryptoCards";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white pt-28">
        <div className="text-center">
          <h1 className="text-6xl font-bold">
            Crypto<span className="text-cyan-400">Mind</span> AI
          </h1>

          <p className="mt-6 text-gray-400">
            AI Powered Crypto Intelligence
          </p>
        </div>

        <CryptoCards />
      </main>
    </>
  );
}
