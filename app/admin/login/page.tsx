"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { X } from "lucide-react";
export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Invalid password.");
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="ju-admin-login flex min-h-screen items-center justify-center bg-gradient-to-br from-[#050A30] via-[#0D0221] to-[#02020F] px-4">
      <div className="ju-admin-login-card relative w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_0_60px_rgba(255,45,149,0.12)] backdrop-blur-xl">
        <Link
          href="/"
          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white/85 transition hover:border-ju-electric hover:bg-ju-electric/10 hover:text-ju-cyanGlow"
          aria-label="Back to site"
        >
          <X className="size-5" strokeWidth={2} />
        </Link>
        <h1 className="text-center text-xl font-black uppercase tracking-wide text-white">
          jeuLumi
        </h1>
        <p className="mt-2 text-center text-sm text-ju-muted">
          Admin dashboard — team access only
        </p>
        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
          <label className="text-xs font-bold uppercase tracking-wider text-ju-soft">
            Password
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white outline-none ring-ju-electric/30 focus:ring-2"
            />
          </label>
          {error ? (
            <p className="text-sm font-medium text-ju-pinkGlow">{error}</p>
          ) : null}
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-gradient-to-r from-[#FF2D95] to-[#7B2CFF] py-3 text-sm font-bold uppercase tracking-wide text-white shadow-btn-brand disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
