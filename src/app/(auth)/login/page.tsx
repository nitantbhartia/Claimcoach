"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Scale, FileText } from "lucide-react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  // Show error from callback if present
  const callbackError = searchParams.get("error");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      const next = searchParams.get("next") ?? "/dashboard";
      router.push(next);
      router.refresh();
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-panel">
      {/* Left: Trust sidebar (desktop only) */}
      <div className="hidden lg:flex lg:w-[420px] bg-frame text-white flex-col justify-between p-10 border-r-[4px] border-black">
        <div>
          <Link href="/">
            <span className="text-xl font-bold tracking-[-0.03em] text-white">
              Claim<span className="text-[#ff9e80]">Coach</span>
            </span>
          </Link>
        </div>

        <div className="space-y-8">
          <h2 className="text-heading-lg text-white leading-snug">
            Your insurer has analysts.
            <br />
            Now you have AI.
          </h2>
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield className="w-4 h-4 text-coral" />
              </div>
              <div>
                <p className="text-body-sm font-medium text-white">Policy X-Ray</p>
                <p className="text-caption text-panel/60">
                  AI reads every clause in plain English
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Scale className="w-4 h-4 text-coral" />
              </div>
              <div>
                <p className="text-body-sm font-medium text-white">Fairness Score</p>
                <p className="text-caption text-panel/60">
                  Market-data-backed offer evaluation
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FileText className="w-4 h-4 text-coral" />
              </div>
              <div>
                <p className="text-body-sm font-medium text-white">Counter-Offer</p>
                <p className="text-caption text-panel/60">
                  Professional demand letter in minutes
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-caption text-white/30">
          &copy; {new Date().getFullYear()} ClaimCoach
        </p>
      </div>

      {/* Right: Login form */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6 lg:hidden">
              <span className="text-heading-lg font-bold tracking-[-0.03em]">
                <span className="text-black">Claim</span>
                <span className="text-[#4a555e]">Coach</span>
              </span>
            </Link>
            <h1 className="text-heading-lg text-black">Welcome back</h1>
          </div>

          <button
            onClick={handleAppleLogin}
            disabled={loading}
            className="w-full px-4 py-2.5 text-body-sm font-medium text-panel bg-black hover:bg-coral hover:text-black transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            Continue with Apple
          </button>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full mt-3 px-4 py-2.5 border-2 border-black text-body-sm font-medium text-black hover:bg-black hover:text-panel transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-black/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-panel px-3 text-caption text-[#4a555e]">or</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {(error || callbackError) && (
              <p className="text-body-sm text-danger-600">
                {error || "Authentication failed. Please try again."}
              </p>
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

            <Button type="submit" loading={loading} className="w-full">
              Log in
            </Button>
          </form>

          <p className="text-center text-body-sm text-[#4a555e] mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-black font-medium hover:text-coral">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
