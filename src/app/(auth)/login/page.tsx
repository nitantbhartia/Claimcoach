"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Supabase auth will be integrated here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/dashboard");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="text-heading-lg">
              <span className="text-zinc-900 font-semibold">Claim</span>
              <span className="text-brand-500 font-semibold">Coach</span>
            </span>
          </Link>
          <h1 className="text-heading-lg text-zinc-900">Welcome back</h1>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg text-body-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors disabled:opacity-50"
        >
          Continue with Google
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-caption text-zinc-400">or</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <p className="text-body-sm text-danger-600">{error}</p>
          )}

          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" loading={loading} className="w-full bg-brand-500 hover:bg-brand-600">
            Log in
          </Button>
        </form>

        <p className="text-center text-body-sm text-zinc-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-brand-500 font-medium hover:text-brand-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
