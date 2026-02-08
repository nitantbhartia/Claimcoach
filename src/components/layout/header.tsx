"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="bg-panel px-6 py-4 flex items-center justify-between border-b-[4px] border-frame">
      <Link href="/" className="flex items-center">
        <span className="text-[20px] font-bold tracking-[-0.03em] text-black">
          Claim Coach
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
        {isHome ? (
          <Link href="/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
          </Link>
        )}
      </nav>
    </header>
  );
}
