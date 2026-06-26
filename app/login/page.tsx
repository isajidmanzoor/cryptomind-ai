"use client";

import { useState } from "react";
import { supabase } from "@/lib/auth";

export default function Login() {
  const [email, setEmail] = useState("");

  const login = async () => {
    await supabase.auth.signInWithOtp({
      email,
    });

    alert("Check your email for login link!");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-96 rounded-xl border border-gray-800 bg-zinc-900 p-6">
        <h1 className="text-2xl font-bold text-cyan-400">
          Login to CryptoMind AI
        </h1>

        <input
          className="mt-6 w-full rounded bg-black p-3 text-white border border-gray-700"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={login}
          className="mt-4 w-full rounded bg-cyan-500 p-3 font-bold text-black"
        >
          Send Magic Link
        </button>
      </div>
    </main>
  );
}
