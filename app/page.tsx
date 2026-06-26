import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10 text-white">
      <h1 className="text-3xl font-bold">CryptoMind AI v3 🚀</h1>

      <div className="mt-6">
        <Link href="/api/ai" className="text-cyan-400 underline">
          Run AI Market Engine
        </Link>
      </div>
    </main>
  );
}
