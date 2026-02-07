"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth/context";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    setMobileMenuOpen(false);
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-subtle">
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-semibold text-slate-900">
              Claim<span className="text-brand-600">Coach</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/about"
              className="text-body-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/pricing"
              className="text-body-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              Pricing
            </Link>
            {!loading && user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-body-sm text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-body-sm text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-body-sm text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-lg bg-brand-500 px-3.5 py-1.5 text-body-sm font-medium text-white hover:bg-brand-600 transition-colors"
                >
                  Start Free
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-700" />
            ) : (
              <Menu className="w-5 h-5 text-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-slate-100 mt-2 pt-4">
            <nav className="flex flex-col gap-3">
              <Link
                href="/about"
                className="text-body-sm text-slate-500 hover:text-slate-900 px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/pricing"
                className="text-body-sm text-slate-500 hover:text-slate-900 px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              {!loading && user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-body-sm text-slate-500 hover:text-slate-900 px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-body-sm text-slate-500 hover:text-slate-900 px-2 py-1 text-left"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-body-sm text-slate-500 hover:text-slate-900 px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center rounded-lg bg-brand-500 px-3.5 py-1.5 text-body-sm font-medium text-white hover:bg-brand-600 transition-colors mt-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Start Free
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
