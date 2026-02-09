"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return (
      <header className="bg-navy-900 px-4 sm:px-6 py-4 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="flex items-center">
          <span className="text-[20px] font-bold tracking-[-0.03em] text-white">
            ClaimCoach
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-6">
          <a
            href="#how-it-works"
            className="text-body-sm font-medium text-white/50 hover:text-white transition-colors"
          >
            How It Works
          </a>
          <Link
            href="/pricing"
            className="text-body-sm font-medium text-white/50 hover:text-white transition-colors"
          >
            Pricing
          </Link>
          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/50 hover:text-white hover:bg-white/10"
            >
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              size="sm"
              className="bg-gold text-navy-900 hover:bg-gold-300 font-semibold"
            >
              Get Started
            </Button>
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
