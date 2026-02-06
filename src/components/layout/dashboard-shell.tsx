"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Shield,
  LayoutDashboard,
  FilePlus,
  Settings,
  LogOut,
  ChevronLeft,
  Bell,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/claims/new", label: "New Claim", icon: FilePlus },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="w-7 h-7 text-brand-600" />
              <span className="text-lg font-bold text-gray-900 hidden sm:inline">
                Claim<span className="text-brand-600">Coach</span>
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-brand-50 text-brand-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors relative">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden flex border-t border-gray-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex-1 flex flex-col items-center gap-1 py-2 text-xs font-medium transition-colors",
                  isActive ? "text-brand-600" : "text-gray-500"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
