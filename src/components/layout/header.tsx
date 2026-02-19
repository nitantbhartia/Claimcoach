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
        <header className="max-w-[1400px] mx-auto px-6 py-8 lg:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 bg-black rounded-full inline-block" />
            <span className="text-[20px] font-bold tracking-[-0.02em] text-black">
              ClaimCoach
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/about"
                className="text-[15px] font-semibold text-black opacity-60 hover:opacity-100 transition-opacity"
              >
                How it works
              </Link>
              <Link
                href="/guides"
                className="text-[15px] font-semibold text-black opacity-60 hover:opacity-100 transition-opacity"
              >
                Success Stories
              </Link>
              <Link
                href="/pricing"
                className="text-[15px] font-semibold text-black opacity-60 hover:opacity-100 transition-opacity"
              >
                Pricing
              </Link>
              <Link
                href="/claims/new"
                className="bg-black text-white px-6 py-3 rounded-full text-[15px] font-semibold hover:translate-y-[-2px] hover:bg-[#1a1a1a] transition-all"
              >
                Check Offer
              </Link>
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 p-1"
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
              className="md:hidden bg-[#F2F0E4] overflow-hidden border-t border-black/5"
            >
              <div className="px-6 py-4 space-y-3">
                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className="block text-[15px] font-semibold text-black/60 hover:text-black py-2 border-b border-black/10"
                >
                  How it works
                </Link>
                <Link
                  href="/guides"
                  onClick={() => setMobileOpen(false)}
                  className="block text-[15px] font-semibold text-black/60 hover:text-black py-2 border-b border-black/10"
                >
                  Success Stories
                </Link>
                <Link
                  href="/pricing"
                  onClick={() => setMobileOpen(false)}
                  className="block text-[15px] font-semibold text-black/60 hover:text-black py-2 border-b border-black/10"
                >
                  Pricing
                </Link>
                <Link
                  href="/claims/new"
                  onClick={() => setMobileOpen(false)}
                  className="block bg-black text-white text-center rounded-full px-6 py-3 text-[15px] font-semibold mt-2"
                >
                  Check Offer
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
