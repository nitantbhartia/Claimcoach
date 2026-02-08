import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-panel border-t-[4px] border-frame">
      <div className="container-wide py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link href="/" className="flex items-center">
            <span className="text-[20px] font-bold tracking-[-0.03em] text-black">
              Claim Coach
            </span>
          </Link>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/about" className="text-body-sm text-[#4a555e] hover:text-coral transition-colors">
              How It Works
            </Link>
            <Link href="/pricing" className="text-body-sm text-[#4a555e] hover:text-coral transition-colors">
              Pricing
            </Link>
            <Link href="/login" className="text-body-sm text-[#4a555e] hover:text-coral transition-colors">
              Log In
            </Link>
            <Link href="/privacy" className="text-body-sm text-[#4a555e] hover:text-coral transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-body-sm text-[#4a555e] hover:text-coral transition-colors">
              Terms
            </Link>
          </nav>
        </div>

        <div className="border-t border-black/10 my-6" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-caption text-[#4a555e]">
            &copy; {new Date().getFullYear()} Claim Coach. All rights reserved.
          </p>
          <p className="text-caption text-[#4a555e]">
            Educational tool. Not legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
