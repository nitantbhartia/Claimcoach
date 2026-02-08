"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Claim, ClaimStatus } from "@/types";
import Link from "next/link";
import { Plus, ArrowRight, Loader2 } from "lucide-react";

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

function vehicleLabel(claim: Claim): string {
  const parts = [claim.vehicle_year, claim.vehicle_make, claim.vehicle_model].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : "Untitled claim";
}

export default function DashboardPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/claims")
      .then((res) => res.json())
      .then((data) => setClaims(data.claims ?? []))
      .catch(() => setClaims([]))
      .finally(() => setLoading(false));
  }, []);

  const firstClaimId = claims[0]?.id;

  const quickActions = firstClaimId
    ? [
        { label: "Upload documents", href: `/claims/${firstClaimId}/documents` },
        { label: "Review an offer", href: `/claims/${firstClaimId}/offer` },
        { label: "Analyze a policy", href: `/claims/${firstClaimId}/policy` },
      ]
    : [];

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

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-5 h-5 animate-spin text-[#4a555e]" />
        </div>
      )}

      {/* Claims list */}
      {!loading && claims.length > 0 ? (
        <div className="border border-black/10 overflow-hidden mb-10">
          {claims.map((claim, idx) => (
            <Link
              key={claim.id}
              href={`/claims/${claim.id}`}
              className={
                "group flex items-center gap-4 px-4 py-4 sm:px-6 hover:bg-panel-alt transition-colors" +
                (idx < claims.length - 1 ? " border-b border-black/10" : "")
              }
            >
              {/* Vehicle + type */}
              <div className="flex-1 min-w-0">
                <p className="text-body font-medium text-black truncate">
                  {vehicleLabel(claim)}
                </p>
                <div className="flex items-center gap-1.5 sm:hidden mt-0.5">
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full ${statusDot[claim.status]}`}
                    aria-hidden="true"
                  />
                  <span className="text-caption text-[#4a555e] truncate">
                    {statusLabel[claim.status]} &middot; {claim.insurer_name || "No insurer"}
                  </span>
                </div>
              </div>

              {/* Insurer */}
              <span className="hidden sm:block text-body-sm text-[#4a555e] w-28 shrink-0">
                {claim.insurer_name || "\u2014"}
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
                {new Date(claim.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>

              {/* Offer */}
              <span className="text-body-sm font-medium text-black w-20 shrink-0 text-right">
                {claim.offer_amount !== null ? formatCurrency(claim.offer_amount) : "\u2014"}
              </span>

              {/* Arrow */}
              <ArrowRight className="w-4 h-4 text-[#4a555e] group-hover:text-black transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      ) : !loading ? (
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
      ) : null}

      {/* Quick actions */}
      {!loading && claims.length > 0 && (
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
