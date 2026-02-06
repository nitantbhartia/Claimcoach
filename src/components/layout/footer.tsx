import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-zinc-950">
      <div className="container-wide py-10">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link href="/" className="flex items-center">
            <span className="text-lg font-semibold text-white">
              Claim<span className="text-brand-500">Coach</span>
            </span>
          </Link>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/about"
              className="text-body-sm text-zinc-500 hover:text-zinc-400 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/pricing"
              className="text-body-sm text-zinc-500 hover:text-zinc-400 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="text-body-sm text-zinc-500 hover:text-zinc-400 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/privacy"
              className="text-body-sm text-zinc-500 hover:text-zinc-400 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-body-sm text-zinc-500 hover:text-zinc-400 transition-colors"
            >
              Terms
            </Link>
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800 my-6" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-caption text-zinc-500">
            &copy; {new Date().getFullYear()} ClaimCoach. All rights reserved.
          </p>
          <p className="text-caption text-zinc-500">
            ClaimCoach is an educational tool. Not legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
