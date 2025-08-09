"use client";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signin/email", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email }),
      });
      if (res.ok) alert("Check your email for a sign-in link.");
      else alert("Failed to send sign-in link.");
    } catch (e) {
      alert("Error sending email");
    }
  };
  return (
    <main className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      <form onSubmit={submit} className="space-y-3">
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <button className="w-full bg-sakura-600 hover:bg-sakura-700 text-white font-semibold py-2 px-4 rounded">
          Send magic link
        </button>
      </form>
    </main>
  );
}
