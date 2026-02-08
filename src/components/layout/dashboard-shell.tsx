"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FilePlus, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth/context";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/claims/new", label: "New Claim", icon: FilePlus },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  const displayName =
    user?.user_metadata?.full_name ||
    user?.email ||
    "";

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-body-lg font-semibold">
              <span className="text-slate-900">Claim</span>
              <span className="text-ink-800">Coach</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-1.5 pb-0.5 text-body-sm transition-colors",
                    isActive
                      ? "text-slate-900 font-medium"
                      : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-ink-800 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User actions */}
          <div className="flex items-center gap-3">
            {displayName && (
              <span className="hidden sm:inline text-body-sm text-slate-500 truncate max-w-[160px]">
                {displayName}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-body-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden flex gap-4 px-4 overflow-x-auto scrollbar-hide border-t border-slate-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 py-2.5 text-body-sm whitespace-nowrap border-b-2 transition-colors",
                  isActive
                    ? "text-slate-900 font-medium border-ink-800"
                    : "text-slate-500 border-transparent hover:text-slate-700"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
