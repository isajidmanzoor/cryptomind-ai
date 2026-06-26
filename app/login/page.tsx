"use client";

import { useState } from "react";
import { supabase } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const login = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Magic link sent!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="p-6 border border-gray-700 rounded-xl w-80">
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          className="w-full p-2 text-black"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={login}
          className="mt-4 w-full bg-cyan-500 text-black p-2 font-bold"
        >
          Send Magic Link
        </button>
      </div>
    </div>
  );
}
