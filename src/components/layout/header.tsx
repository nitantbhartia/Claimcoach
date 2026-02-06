"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-brand-600" />
            <span className="text-xl font-bold text-gray-900">
              Claim<span className="text-brand-600">Coach</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              How It Works
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Start Free Claim</Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-2 pt-4">
            <nav className="flex flex-col gap-3">
              <Link
                href="/pricing"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <div className="flex gap-3 mt-2">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">Log In</Button>
                </Link>
                <Link href="/signup" className="flex-1">
                  <Button size="sm" className="w-full">Start Free</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
