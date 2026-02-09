"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return (
      <header className="bg-surface-100 px-5 py-5 flex items-center justify-between border-b border-primary-border">
        <Link href="/" className="flex items-center">
          <span className="font-display font-bold tracking-[2px] border border-primary px-2 py-1 text-[0.85rem] text-primary uppercase">
            CLAIMCOACH
          </span>
        </Link>

        <span className="text-[0.8rem] font-body text-primary-dim">
          BETA_V.2.0
        </span>
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
