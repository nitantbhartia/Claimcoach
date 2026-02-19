"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return (
      <footer className="bg-[#5A9B82]">
        <div className="max-w-[1000px] mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link href="/" className="flex items-center">
              <span className="text-[14px] font-bold tracking-[-0.01em] text-black/70">
                ClaimCoach
              </span>
            </Link>

            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                href="/guides"
                className="text-[12px] font-semibold text-black/40 hover:text-black/70 transition-colors"
              >
                Guides
              </Link>
              <Link
                href="/pricing"
                className="text-[12px] font-semibold text-black/40 hover:text-black/70 transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/login"
                className="text-[12px] font-semibold text-black/40 hover:text-black/70 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/privacy"
                className="text-[12px] font-semibold text-black/40 hover:text-black/70 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-[12px] font-semibold text-black/40 hover:text-black/70 transition-colors"
              >
                Terms
              </Link>
            </nav>
          </div>

          <div className="border-t border-black/10 my-5" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-[11px] text-black/30 font-medium">
              &copy; {new Date().getFullYear()} ClaimCoach. All rights reserved.
            </p>
            <p className="text-[11px] text-black/30 font-medium">
              Educational tool. Not legal advice.
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-panel border-t-[4px] border-frame">
      <div className="container-wide py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link href="/" className="flex items-center">
            <span className="text-[20px] font-bold tracking-[-0.03em] text-black">
              ClaimCoach
            </span>
          </Link>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/about"
              className="text-body-sm text-[#4a555e] hover:text-coral transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/guides"
              className="text-body-sm text-[#4a555e] hover:text-coral transition-colors"
            >
              Guides
            </Link>
            <Link
              href="/pricing"
              className="text-body-sm text-[#4a555e] hover:text-coral transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="text-body-sm text-[#4a555e] hover:text-coral transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/privacy"
              className="text-body-sm text-[#4a555e] hover:text-coral transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-body-sm text-[#4a555e] hover:text-coral transition-colors"
            >
              Terms
            </Link>
          </nav>
        </div>

        <div className="border-t border-black/10 my-6" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-caption text-[#4a555e]">
            &copy; {new Date().getFullYear()} ClaimCoach. All rights reserved.
          </p>
          <p className="text-caption text-[#4a555e]">
            Educational tool. Not legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
