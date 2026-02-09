"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return (
      <header className="bg-cream-100 px-4 sm:px-6 py-4 flex items-center justify-between border-b border-charcoal-100">
        <Link href="/" className="flex items-center">
          <span className="text-[20px] font-bold tracking-[-0.03em] text-charcoal-900">
            ClaimCoach
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-6">
          <a
            href="#how-it-works"
            className="text-body-sm font-medium text-charcoal-500 hover:text-charcoal-900 transition-colors"
          >
            How It Works
          </a>
          <Link
            href="/pricing"
            className="text-body-sm font-medium text-charcoal-500 hover:text-charcoal-900 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/login"
            className="text-body-sm font-medium text-charcoal-500 hover:text-charcoal-900 transition-colors"
          >
            Sign In
          </Link>
          <Link href="/signup">
            <button className="px-4 py-2 text-body-sm font-semibold text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors">
              Start Free Audit
            </button>
          </Link>
        </nav>
      </header>
    );
  }

  return (
    <header className="bg-panel px-4 sm:px-6 py-4 flex items-center justify-between border-b-[4px] border-frame">
      <Link href="/" className="flex items-center">
        <span className="text-[20px] font-bold tracking-[-0.03em] text-black">
          ClaimCoach
        </span>
      </Link>

      <nav className="hidden sm:flex items-center gap-6">
        <Link
          href="/about"
          className="text-body-sm font-medium text-black/60 hover:text-coral transition-colors"
        >
          How It Works
        </Link>
        <Link
          href="/pricing"
          className="text-body-sm font-medium text-black/60 hover:text-coral transition-colors"
        >
          Pricing
        </Link>
        <Link href="/login">
          <Button variant="ghost" size="sm">
            Log In
          </Button>
        </Link>
      </nav>
    </header>
  );
}
