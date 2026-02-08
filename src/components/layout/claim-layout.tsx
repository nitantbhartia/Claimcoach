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
  { href: "/call-script", label: "Call Script" },
];

export function ClaimLayout({ children, claimId }: ClaimLayoutProps) {
  const pathname = usePathname();
  const basePath = `/claims/${claimId}`;

  return (
    <div className="min-h-screen bg-frame">
      <header className="bg-panel border-b-[4px] border-frame">
        <div className="flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-body-sm text-[#4a555e] hover:text-coral transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>

          <span className="font-mono text-body-sm font-bold text-black">
            Case #{claimId.slice(0, 8)}
          </span>

          <div className="w-20" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide -mb-px">
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
                      ? "text-black font-semibold border-coral"
                      : "text-[#4a555e] border-transparent hover:text-coral"
                  )}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
