"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  if (isHome) {
    return (
      <>
        <header className="bg-surface-100 px-5 py-5 flex items-center justify-between border-b border-primary-border">
          <Link href="/" className="flex items-center">
            <span className="font-display font-bold tracking-[2px] border border-primary px-2 py-1 text-[0.85rem] text-primary uppercase">
              CLAIMCOACH
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-[0.8rem] font-body text-primary-dim hidden sm:block">
              BETA_V.2.0
            </span>
            <nav className="hidden sm:flex items-center gap-4">
              <Link
                href="/estimate"
                className="text-[0.8rem] font-body text-primary-dim hover:text-primary transition-colors"
              >
                FREE ESTIMATE
              </Link>
              <Link
                href="/pricing"
                className="text-[0.8rem] font-body text-primary-dim hover:text-primary transition-colors"
              >
                PRICING
              </Link>
              <Link href="/login">
                <span className="text-[0.8rem] font-body text-primary border border-primary px-3 py-1 hover:bg-primary hover:text-surface-100 transition-colors">
                  LOG IN
                </span>
              </Link>
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="sm:hidden flex flex-col gap-1.5 p-1"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-[1.5px] bg-primary transition-transform duration-200 ${mobileOpen ? "rotate-45 translate-y-[4.5px]" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-primary transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-primary transition-transform duration-200 ${mobileOpen ? "-rotate-45 -translate-y-[4.5px]" : ""}`} />
            </button>
          </div>
        </header>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="sm:hidden bg-surface-100 border-b border-primary-border overflow-hidden"
            >
              <div className="px-5 py-4 space-y-3">
                <Link
                  href="/estimate"
                  onClick={() => setMobileOpen(false)}
                  className="block text-[0.9rem] font-body text-primary-dim hover:text-primary py-2 border-b border-primary-border-light"
                >
                  FREE ESTIMATE
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className="block text-[0.9rem] font-body text-primary-dim hover:text-primary py-2 border-b border-primary-border-light"
                >
                  HOW IT WORKS
                </Link>
                <Link
                  href="/pricing"
                  onClick={() => setMobileOpen(false)}
                  className="block text-[0.9rem] font-body text-primary-dim hover:text-primary py-2 border-b border-primary-border-light"
                >
                  PRICING
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block text-[0.9rem] font-body text-primary py-2"
                >
                  LOG IN
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </>
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

      {/* Mobile nav for inner pages */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="sm:hidden flex flex-col gap-1.5 p-1"
        aria-label="Toggle menu"
      >
        <span className={`block w-5 h-[1.5px] bg-black transition-transform duration-200 ${mobileOpen ? "rotate-45 translate-y-[4.5px]" : ""}`} />
        <span className={`block w-5 h-[1.5px] bg-black transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
        <span className={`block w-5 h-[1.5px] bg-black transition-transform duration-200 ${mobileOpen ? "-rotate-45 -translate-y-[4.5px]" : ""}`} />
      </button>
    </header>
  );
}
