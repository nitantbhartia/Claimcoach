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
    <div className="min-h-screen bg-frame">
      <header className="bg-panel border-b-[4px] border-frame">
        <div className="flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <Link href="/" className="flex items-center">
            <span className="text-body-lg font-bold tracking-[-0.03em] text-black">
              Claim Coach
            </span>
          </Link>

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
                      ? "text-black font-semibold"
                      : "text-[#4a555e] hover:text-coral"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-[17px] left-0 right-0 h-[4px] bg-coral" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {displayName && (
              <span className="hidden sm:inline text-body-sm text-[#4a555e] truncate max-w-[160px]">
                {displayName}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-body-sm text-[#4a555e] hover:text-coral transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>

        <div className="md:hidden flex gap-4 px-4 overflow-x-auto scrollbar-hide border-t border-black/10">
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
                    ? "text-black font-semibold border-coral"
                    : "text-[#4a555e] border-transparent hover:text-coral"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
