"use client";

import { useParams } from "next/navigation";
import { ClaimLayout } from "@/components/layout/claim-layout";
import { Button } from "@/components/ui/button";
import { ScoreGauge } from "@/components/ui/score-gauge";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, Download, Phone } from "lucide-react";
import type { ClaimStatus } from "@/types";

// ---------------------------------------------------------------------------
// Mock data -- will be replaced with real fetching once the API is wired up
// ---------------------------------------------------------------------------

const MOCK_CLAIM = {
  id: "demo-claim-001",
  status: "offer_received" as ClaimStatus,
  vehicleYear: 2022,
  vehicleMake: "Honda",
  vehicleModel: "Civic",
  accidentDate: "2025-11-14",
  insurerName: "State Farm",
  claimNumber: "SF-2025-88431",
  faultStatus: "Not at fault",
  offerAmount: 4200,
  fairnessScore: 38,
  documentsUploaded: 8,
  trackedExpenses: 1247,
  policyUploaded: true,
};

// ---------------------------------------------------------------------------
// Status dot color mapping
// ---------------------------------------------------------------------------

function getStatusDotColor(status: ClaimStatus): string {
  const map: Record<ClaimStatus, string> = {
    setup: "bg-slate-400",
    documenting: "bg-blue-500",
    policy_review: "bg-black",
    filed: "bg-yellow-500",
    offer_received: "bg-orange-500",
    negotiating: "bg-red-500",
    escalating: "bg-red-600",
    resolved: "bg-green-500",
  };
  return map[status];
}

function getStatusLabel(status: ClaimStatus): string {
  const labels: Record<ClaimStatus, string> = {
    setup: "Setting Up",
    documenting: "Documenting",
    policy_review: "Policy Review",
    filed: "Filed with Insurer",
    offer_received: "Offer Received",
    negotiating: "Negotiating",
    escalating: "Escalating",
    resolved: "Resolved",
  };
  return labels[status];
}

function getProgressPercentage(status: ClaimStatus): number {
  const progress: Record<ClaimStatus, number> = {
    setup: 10,
    documenting: 25,
    policy_review: 40,
    filed: 55,
    offer_received: 65,
    negotiating: 80,
    escalating: 90,
    resolved: 100,
  };
  return progress[status];
}

// ---------------------------------------------------------------------------
// Sub-page navigation rows
// ---------------------------------------------------------------------------

const SUB_PAGES = [
  { label: "Documents", description: "Photos, estimates, and evidence", href: (id: string) => `/claims/${id}/documents` },
  { label: "Policy Analysis", description: "Coverage details and red flags", href: (id: string) => `/claims/${id}/policy` },
  { label: "Offer Analysis", description: "Fairness breakdown of the insurer\u2019s offer", href: (id: string) => `/claims/${id}/offer` },
  { label: "Counter-Offer", description: "Demand letter and negotiation plan", href: (id: string) => `/claims/${id}/counter` },
  { label: "Call Script", description: "AI-generated phone script for adjuster calls", href: (id: string) => `/claims/${id}/call-script` },
  { label: "Export Report", description: "Print or save full analysis as PDF", href: (id: string) => `/claims/${id}/export` },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function ClaimOverviewPage() {
  const params = useParams<{ id: string }>();
  const claimId = params.id;
  const claim = { ...MOCK_CLAIM, id: claimId };

  const progress = getProgressPercentage(claim.status);
  const statusLabel = getStatusLabel(claim.status);
  const dotColor = getStatusDotColor(claim.status);

  return (
    <ClaimLayout claimId={claimId}>
      <div className="space-y-6">
        {/* -------------------------------------------------------------- */}
        {/* 1. Status bar                                                   */}
        {/* -------------------------------------------------------------- */}
        <div className="bg-panel border border-black/10 px-5 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Status */}
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                <span className="text-body-sm font-medium text-black">
                  {statusLabel}
                </span>
              </div>

              {/* Divider */}
              <span className="hidden sm:block w-px h-4 bg-black/10" />

              {/* Progress */}
              <span className="text-body-sm text-[#4a555e]">
                {progress}% complete
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link href={`/claims/${claimId}/call-script`}>
                <Button size="sm" variant="outline">
                  <Phone className="w-3.5 h-3.5 mr-1.5" />
                  Call Script
                </Button>
              </Link>
              <Link href={`/claims/${claimId}/export`}>
                <Button size="sm" variant="outline">
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Export PDF
                </Button>
              </Link>
              <Link href={`/claims/${claimId}/offer`}>
                <Button size="sm">
                  Review offer
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* 2. Two-column layout                                            */}
        {/* -------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left column - wider (3/5) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Claim details */}
            <div className="bg-panel border border-black/10 p-5">
              <h2 className="text-heading text-black mb-4">
                Claim Details
              </h2>
              <dl className="space-y-3">
                <div className="flex justify-between py-1.5 border-b border-black/10">
                  <dt className="text-body-sm text-[#4a555e]">Vehicle</dt>
                  <dd className="text-body-sm font-medium text-black">
                    {claim.vehicleYear} {claim.vehicleMake} {claim.vehicleModel}
                  </dd>
                </div>
                <div className="flex justify-between py-1.5 border-b border-black/10">
                  <dt className="text-body-sm text-[#4a555e]">Insurer</dt>
                  <dd className="text-body-sm font-medium text-black">
                    {claim.insurerName}
                  </dd>
                </div>
                <div className="flex justify-between py-1.5 border-b border-black/10">
                  <dt className="text-body-sm text-[#4a555e]">Claim #</dt>
                  <dd className="text-body-sm font-medium text-black">
                    {claim.claimNumber}
                  </dd>
                </div>
                <div className="flex justify-between py-1.5 border-b border-black/10">
                  <dt className="text-body-sm text-[#4a555e]">Accident date</dt>
                  <dd className="text-body-sm font-medium text-black">
                    {new Date(claim.accidentDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </dd>
                </div>
                <div className="flex justify-between py-1.5">
                  <dt className="text-body-sm text-[#4a555e]">Fault status</dt>
                  <dd className="text-body-sm font-medium text-black">
                    {claim.faultStatus}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Financial summary */}
            <div className="bg-panel border border-black/10 p-5">
              <h2 className="text-heading text-black mb-4">
                Financial Summary
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-caption text-[#4a555e] mb-1">
                    Documented expenses
                  </p>
                  <p className="text-heading-lg text-black">
                    {formatCurrency(claim.trackedExpenses)}
                  </p>
                </div>
                <div>
                  <p className="text-caption text-[#4a555e] mb-1">
                    Insurer&apos;s offer
                  </p>
                  <p className="text-heading-lg text-black">
                    {claim.offerAmount
                      ? formatCurrency(claim.offerAmount)
                      : "--"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - narrower (2/5) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Fairness score */}
            <div className="bg-panel border border-black/10 p-5 flex flex-col items-center">
              <h2 className="text-body-sm font-medium text-[#4a555e] mb-4 self-start">
                Fairness Score
              </h2>
              <ScoreGauge score={claim.fairnessScore} size="md" />
            </div>

            {/* Next steps */}
            <div className="bg-panel border border-black/10 p-5">
              <h2 className="text-body-sm font-medium text-[#4a555e] mb-3">
                Recommended Next Steps
              </h2>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href={`/claims/${claimId}/offer`}
                    className="flex items-center justify-between text-body-sm text-black hover:text-black transition-colors"
                  >
                    Review the insurer&apos;s offer in detail
                    <ArrowRight className="w-3.5 h-3.5 text-[#4a555e] flex-shrink-0" />
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/claims/${claimId}/counter`}
                    className="flex items-center justify-between text-body-sm text-black hover:text-black transition-colors"
                  >
                    Build a counter-offer with evidence
                    <ArrowRight className="w-3.5 h-3.5 text-[#4a555e] flex-shrink-0" />
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/claims/${claimId}/documents`}
                    className="flex items-center justify-between text-body-sm text-black hover:text-black transition-colors"
                  >
                    Upload additional documentation
                    <ArrowRight className="w-3.5 h-3.5 text-[#4a555e] flex-shrink-0" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* 3. Navigation links                                             */}
        {/* -------------------------------------------------------------- */}
        <div className="bg-panel border border-black/10">
          {SUB_PAGES.map((page, idx) => (
            <Link
              key={page.label}
              href={page.href(claimId)}
              className={`flex items-center justify-between px-5 py-4 hover:bg-panel-alt transition-colors ${
                idx < SUB_PAGES.length - 1 ? "border-b border-black/10" : ""
              }`}
            >
              <div>
                <p className="text-body font-medium text-black">
                  {page.label}
                </p>
                <p className="text-caption text-[#4a555e]">{page.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#4a555e] flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </ClaimLayout>
  );
}
