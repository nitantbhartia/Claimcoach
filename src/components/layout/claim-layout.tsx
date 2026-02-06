"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Shield,
  ChevronLeft,
  FileText,
  Camera,
  FileSearch,
  DollarSign,
  Scale,
  ArrowLeft,
} from "lucide-react";

interface ClaimLayoutProps {
  children: React.ReactNode;
  claimId: string;
}

const claimNavItems = [
  { href: "", label: "Overview", icon: FileText },
  { href: "/documents", label: "Documents", icon: Camera },
  { href: "/policy", label: "Policy Analysis", icon: FileSearch },
  { href: "/offer", label: "Offer Analysis", icon: DollarSign },
  { href: "/counter", label: "Counter-Offer", icon: Scale },
];

export function ClaimLayout({ children, claimId }: ClaimLayoutProps) {
  const pathname = usePathname();
  const basePath = `/claims/${claimId}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center h-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mr-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-brand-600" />
            <span className="font-semibold text-gray-900">Claim #{claimId.slice(0, 8)}</span>
          </div>
        </div>

        {/* Claim Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 overflow-x-auto pb-px -mb-px">
            {claimNavItems.map((item) => {
              const fullHref = basePath + item.href;
              const isActive = pathname === fullHref;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={fullHref}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors",
                    isActive
                      ? "border-brand-600 text-brand-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
