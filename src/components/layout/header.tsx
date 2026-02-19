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
        <header className="bg-transparent px-5 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-[15px] font-bold tracking-[-0.01em] text-black/80">
              ClaimCoach
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden sm:flex items-center gap-5">
              <Link
                href="/estimate"
                className="text-[13px] font-semibold text-black/50 hover:text-black/80 transition-colors"
              >
                Estimate
              </Link>
              <Link
                href="/guides"
                className="text-[13px] font-semibold text-black/50 hover:text-black/80 transition-colors"
              >
                Guides
              </Link>
              <Link
                href="/pricing"
                className="text-[13px] font-semibold text-black/50 hover:text-black/80 transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/login"
                className="text-[13px] font-semibold text-black/80 bg-black/10 hover:bg-black/15 rounded-full px-4 py-1.5 transition-colors"
              >
                Log In
              </Link>
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="sm:hidden flex flex-col gap-1.5 p-1"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-[1.5px] bg-black transition-transform duration-200 ${mobileOpen ? "rotate-45 translate-y-[4.5px]" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-black transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-black transition-transform duration-200 ${mobileOpen ? "-rotate-45 -translate-y-[4.5px]" : ""}`} />
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
              className="sm:hidden bg-[#6CB096] overflow-hidden"
            >
              <div className="px-5 py-4 space-y-3">
                <Link
                  href="/estimate"
                  onClick={() => setMobileOpen(false)}
                  className="block text-[14px] font-semibold text-black/60 hover:text-black py-2 border-b border-black/10"
                >
                  Estimate
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className="block text-[14px] font-semibold text-black/60 hover:text-black py-2 border-b border-black/10"
                >
                  How It Works
                </Link>
                <Link
                  href="/guides"
                  onClick={() => setMobileOpen(false)}
                  className="block text-[14px] font-semibold text-black/60 hover:text-black py-2 border-b border-black/10"
                >
                  Guides
                </Link>
                <Link
                  href="/pricing"
                  onClick={() => setMobileOpen(false)}
                  className="block text-[14px] font-semibold text-black/60 hover:text-black py-2 border-b border-black/10"
                >
                  Pricing
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block text-[14px] font-semibold text-black/80 py-2"
                >
                  Log In
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
          href="/guides"
          className="text-body-sm font-medium text-black/60 hover:text-coral transition-colors"
        >
          Guides
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
