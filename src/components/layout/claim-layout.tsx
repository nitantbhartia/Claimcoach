"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface ClaimLayoutProps {
  children: React.ReactNode;
  claimId: string;
}

const claimTabs = [
  { href: "", label: "Overview" },
  { href: "/documents", label: "Documents" },
  { href: "/policy", label: "Policy" },
  { href: "/offer", label: "Offer" },
  { href: "/counter", label: "Counter-Offer" },
];

export function ClaimLayout({ children, claimId }: ClaimLayoutProps) {
  const pathname = usePathname();
  const basePath = `/claims/${claimId}`;

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-200">
        {/* Top row: back link + claim ID */}
        <div className="flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-body-sm text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>

          <span className="text-body-sm font-medium text-zinc-900">
            Claim #{claimId.slice(0, 8)}
          </span>

          {/* Empty spacer to keep claim ID centered */}
          <div className="w-20" />
        </div>

        {/* Tab navigation */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-6 overflow-x-auto -mb-px">
            {claimTabs.map((tab) => {
              const fullHref = basePath + tab.href;
              const isActive = pathname === fullHref;
              return (
                <Link
                  key={tab.href}
                  href={fullHref}
                  className={cn(
                    "pb-3 text-body-sm whitespace-nowrap border-b-2 transition-colors",
                    isActive
                      ? "text-zinc-900 font-medium border-brand-500"
                      : "text-zinc-500 border-transparent hover:text-zinc-700"
                  )}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
