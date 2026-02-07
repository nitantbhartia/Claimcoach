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
    vehicle: "2022 Honda Civic",
    type: "Auto Property Damage",
    insurer: "State Farm",
    status: "offer_received" as ClaimStatus,
    date: "2026-01-15",
    offer: 4200,
  },
  {
    id: "demo-2",
    vehicle: "2024 Toyota RAV4",
    type: "Auto Collision",
    insurer: "Progressive",
    status: "documenting" as ClaimStatus,
    date: "2026-01-28",
    offer: null,
  },
];

const statusDot: Record<ClaimStatus, string> = {
  setup: "bg-slate-400",
  documenting: "bg-blue-500",
  policy_review: "bg-brand-500",
  filed: "bg-amber-500",
  offer_received: "bg-amber-500",
  negotiating: "bg-orange-500",
  escalating: "bg-red-500",
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
        <h1 className="text-heading-lg sm:text-display-sm text-slate-900">Your claims</h1>
        <Link href="/claims/new">
          <Button size="sm" className="gap-1.5">
            <Plus className="w-4 h-4" />
            New Claim
          </Button>
        </Link>
      </div>

      {/* Claims list */}
      <div className="border border-slate-200 rounded-lg shadow-card overflow-hidden mb-10">
        {mockClaims.map((claim, idx) => (
          <Link
            key={claim.id}
            href={`/claims/${claim.id}`}
            className={
              "group flex items-center gap-4 px-4 py-4 sm:px-6 hover:bg-slate-50 transition-colors" +
              (idx < mockClaims.length - 1 ? " border-b border-slate-100" : "")
            }
          >
            {/* Vehicle + type */}
            <div className="flex-1 min-w-0">
              <p className="text-body font-medium text-slate-900 truncate">
                {claim.vehicle}
              </p>
              <div className="flex items-center gap-1.5 sm:hidden mt-0.5">
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full ${statusDot[claim.status]}`}
                  aria-hidden="true"
                />
                <span className="text-caption text-slate-500 truncate">
                  {statusLabel[claim.status]} &middot; {claim.insurer}
                </span>
              </div>
            </div>

            {/* Insurer -- hidden on mobile, shown inline above */}
            <span className="hidden sm:block text-body-sm text-slate-500 w-28 shrink-0">
              {claim.insurer}
            </span>

            {/* Status */}
            <span className="hidden sm:flex items-center gap-1.5 text-body-sm text-slate-600 w-36 shrink-0">
              <span
                className={`inline-block w-1.5 h-1.5 rounded-full ${statusDot[claim.status]}`}
                aria-hidden="true"
              />
              {statusLabel[claim.status]}
            </span>

            {/* Date */}
            <span className="hidden md:block text-body-sm text-slate-400 w-24 shrink-0">
              {new Date(claim.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>

            {/* Offer */}
            <span className="text-body-sm font-medium text-slate-900 w-20 shrink-0 text-right">
              {claim.offer !== null ? formatCurrency(claim.offer) : "\u2014"}
            </span>

            {/* Arrow */}
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
          </Link>
        ))}
      </div>

      {/* Mobile status badges -- visible below each row on small screens */}
      {/* (status is embedded in the row layout via sm:hidden / sm:flex) */}

      {/* Quick actions */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="text-body-sm text-slate-500 hover:text-slate-900 transition-colors py-1"
          >
            {action.label} &rarr;
          </Link>
        ))}
      </div>
    </DashboardShell>
  );
}
