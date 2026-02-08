"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { ClaimStatus } from "@/types";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Mock data -- will be replaced with real data fetching
// ---------------------------------------------------------------------------

const mockClaims = [
  {
    id: "demo",
    vehicle: "2022 Honda Civic EX",
    type: "Auto Property Damage",
    insurer: "State Farm",
    status: "offer_received" as ClaimStatus,
    date: "2025-11-14",
    offer: 4200,
    fairnessScore: 38,
  },
  {
    id: "demo-2",
    vehicle: "2024 Toyota RAV4 XLE",
    type: "Auto Collision",
    insurer: "Progressive",
    status: "documenting" as ClaimStatus,
    date: "2026-01-28",
    offer: null,
    fairnessScore: null,
  },
];

const statusDot: Record<ClaimStatus, string> = {
  setup: "bg-slate-400",
  documenting: "bg-blue-500",
  policy_review: "bg-black",
  filed: "bg-yellow-500",
  offer_received: "bg-orange-500",
  negotiating: "bg-red-500",
  escalating: "bg-red-600",
  resolved: "bg-green-500",
};

const statusLabel: Record<ClaimStatus, string> = {
  setup: "Setup",
  documenting: "Documenting",
  policy_review: "Policy review",
  filed: "Filed",
  offer_received: "Offer received",
  negotiating: "Negotiating",
  escalating: "Escalating",
  resolved: "Resolved",
};

const quickActions = [
  { label: "Upload documents", href: "/claims/demo/documents" },
  { label: "Review an offer", href: "/claims/demo/offer" },
  { label: "Analyze a policy", href: "/claims/demo/policy" },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  return (
    <DashboardShell>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h1 className="text-heading-lg sm:text-display-sm text-black">Your claims</h1>
        <Link href="/claims/new">
          <Button size="sm" className="gap-1.5">
            <Plus className="w-4 h-4" />
            New Claim
          </Button>
        </Link>
      </div>

      {/* Claims list */}
      {mockClaims.length > 0 ? (
        <div className="border border-black/10 overflow-hidden mb-10">
          {mockClaims.map((claim, idx) => (
            <Link
              key={claim.id}
              href={`/claims/${claim.id}`}
              className={
                "group flex items-center gap-4 px-4 py-4 sm:px-6 hover:bg-panel-alt transition-colors" +
                (idx < mockClaims.length - 1 ? " border-b border-black/10" : "")
              }
            >
              {/* Vehicle + type */}
              <div className="flex-1 min-w-0">
                <p className="text-body font-medium text-black truncate">
                  {claim.vehicle}
                </p>
                <div className="flex items-center gap-1.5 sm:hidden mt-0.5">
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full ${statusDot[claim.status]}`}
                    aria-hidden="true"
                  />
                  <span className="text-caption text-[#4a555e] truncate">
                    {statusLabel[claim.status]} &middot; {claim.insurer}
                  </span>
                </div>
              </div>

              {/* Insurer -- hidden on mobile, shown inline above */}
              <span className="hidden sm:block text-body-sm text-[#4a555e] w-28 shrink-0">
                {claim.insurer}
              </span>

              {/* Status */}
              <span className="hidden sm:flex items-center gap-1.5 text-body-sm text-[#4a555e] w-36 shrink-0">
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full ${statusDot[claim.status]}`}
                  aria-hidden="true"
                />
                {statusLabel[claim.status]}
              </span>

              {/* Date */}
              <span className="hidden md:block text-body-sm text-[#4a555e] w-24 shrink-0">
                {new Date(claim.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>

              {/* Offer */}
              <span className="text-body-sm font-medium text-black w-20 shrink-0 text-right">
                {claim.offer !== null ? formatCurrency(claim.offer) : "\u2014"}
              </span>

              {/* Arrow */}
              <ArrowRight className="w-4 h-4 text-[#4a555e] group-hover:text-black transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      ) : (
        <div className="border border-black/10 p-12 text-center mb-10">
          <p className="text-heading text-black mb-2">No claims yet</p>
          <p className="text-body-sm text-[#4a555e] mb-6 max-w-md mx-auto">
            Start your first claim and our AI will analyze your insurance policy,
            evaluate offers, and help you negotiate a fair settlement.
          </p>
          <Link href="/claims/new">
            <Button className="gap-1.5">
              <Plus className="w-4 h-4" />
              Start Your First Claim
            </Button>
          </Link>
        </div>
      )}

      {/* Quick actions */}
      {mockClaims.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="text-body-sm text-[#4a555e] hover:text-black transition-colors py-1"
            >
              {action.label} &rarr;
            </Link>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
