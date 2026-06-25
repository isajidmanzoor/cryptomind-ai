export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-5">
        <h1 className="text-2xl font-bold text-cyan-400">
          CryptoMind AI
        </h1>

        <div className="flex gap-8 text-white">
          <a href="#">Market</a>
          <a href="#">News</a>
          <a href="#">Portfolio</a>
          <a href="#">Dashboard</a>
        </div>
      </div>
    </nav>
  );
}
