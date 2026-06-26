export default function Pricing() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-center text-cyan-400">
        Pricing Plans
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        
        {/* FREE */}
        <div className="border border-gray-800 p-6 rounded-xl">
          <h2 className="text-2xl font-bold">Free</h2>
          <p className="text-gray-400 mt-2">Basic crypto news & prices</p>
          <p className="mt-4 text-green-400 font-bold">$0</p>
        </div>

        {/* PRO */}
        <div className="border border-cyan-500 p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-cyan-400">Pro</h2>
          <p className="text-gray-400 mt-2">AI insights + portfolio tracking</p>
          <p className="mt-4 text-cyan-400 font-bold">$9 / month</p>

          <button className="mt-4 bg-cyan-500 text-black px-4 py-2 rounded">
            Upgrade (Global)
          </button>

          <button className="mt-2 border border-green-500 text-green-400 px-4 py-2 rounded w-full">
            Pay via JazzCash (Pakistan)
          </button>
        </div>

        {/* ELITE */}
        <div className="border border-purple-500 p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-purple-400">Elite</h2>
          <p className="text-gray-400 mt-2">AI predictions + signals</p>
          <p className="mt-4 text-purple-400 font-bold">$19 / month</p>

          <button className="mt-4 bg-purple-500 text-black px-4 py-2 rounded w-full">
            Upgrade Global
          </button>
        </div>

      </div>
    </main>
  );
}
