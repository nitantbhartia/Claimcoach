"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Download, Printer, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import type { Claim, OfferAnalysis, PolicyAnalysis } from "@/types";

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function ExportPage() {
  const params = useParams<{ id: string }>();
  const claimId = params.id;

  const [claim, setClaim] = useState<Claim | null>(null);
  const [offerAnalysis, setOfferAnalysis] = useState<OfferAnalysis | null>(null);
  const [policyAnalysis, setPolicyAnalysis] = useState<PolicyAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/claims/${claimId}`);
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || `Failed to fetch claim (${res.status})`);
        }

        const json = await res.json();
        setClaim(json.claim);
        setOfferAnalysis(json.offerAnalysis ?? null);
        setPolicyAnalysis(json.policyAnalysis ?? null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [claimId]);

  function handlePrint() {
    window.print();
  }

  // -------------------------------------------------------------------------
  // Loading state
  // -------------------------------------------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-panel flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#4a555e]" />
          <p className="text-body-sm text-[#4a555e]">Loading export data&hellip;</p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Error state
  // -------------------------------------------------------------------------
  if (error || !claim) {
    return (
      <div className="min-h-screen bg-panel flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <p className="text-heading font-semibold text-black mb-2">
            Unable to load claim
          </p>
          <p className="text-body-sm text-[#4a555e] mb-6">
            {error ?? "Claim not found."}
          </p>
          <Link
            href={`/claims/${claimId}`}
            className="inline-flex items-center gap-1.5 text-body-sm text-[#4a555e] hover:text-[#4a555e]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to claim
          </Link>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // No analysis data available
  // -------------------------------------------------------------------------
  if (!offerAnalysis && !policyAnalysis) {
    return (
      <div className="min-h-screen bg-panel">
        <div className="print:hidden sticky top-0 z-40 bg-panel border-b border-black/10 px-4 sm:px-6 py-3">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <Link
              href={`/claims/${claimId}`}
              className="flex items-center gap-1.5 text-body-sm text-[#4a555e] hover:text-[#4a555e]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to claim
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center px-6" style={{ minHeight: "calc(100vh - 56px)" }}>
          <div className="text-center max-w-md">
            <p className="text-heading font-semibold text-black mb-2">
              No analysis data yet
            </p>
            <p className="text-body-sm text-[#4a555e]">
              Run an offer analysis or policy analysis first to generate the export report.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Build display data from real claim + analysis
  // -------------------------------------------------------------------------
  const vehicle = [claim.vehicle_year, claim.vehicle_make, claim.vehicle_model]
    .filter(Boolean)
    .join(" ");
  const insurer = claim.insurer_name ?? "";
  const claimNumber = claim.claim_number ?? "";
  const accidentDate = claim.accident_date
    ? new Date(claim.accident_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const fairnessScore = claim.fairness_score ?? offerAnalysis?.fairness_score ?? 0;
  const offerAmount = claim.offer_amount ?? 0;

  const lineItems = (offerAnalysis?.line_items ?? []).map((item) => ({
    category: item.category,
    insurer: item.insurer_amount,
    fair: item.fair_amount,
    diff: item.difference,
  }));

  const fairValue = lineItems.reduce((sum, item) => sum + item.fair, 0);
  const gap = offerAnalysis?.total_gap ?? 0;

  const coverages = policyAnalysis?.coverages ?? [];
  const hiddenCoverages = policyAnalysis?.hidden_coverages ?? [];
  const recommendation = offerAnalysis?.recommendation ?? "";

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-panel">
      {/* Non-printable header */}
      <div className="print:hidden sticky top-0 z-40 bg-panel border-b border-black/10 px-4 sm:px-6 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href={`/claims/${claimId}`}
            className="flex items-center gap-1.5 text-body-sm text-[#4a555e] hover:text-[#4a555e]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to claim
          </Link>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="outline" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-1.5" />
              Print
            </Button>
            <Button size="sm" onClick={handlePrint}>
              <Download className="w-4 h-4 mr-1.5" />
              Save as PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Printable content */}
      <div className="max-w-3xl mx-auto px-6 py-10 print:px-0 print:py-0 print:max-w-none">
        {/* Header */}
        <div className="mb-8 print:mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-display-sm font-semibold text-black">
              ClaimCoach Analysis Report
            </h1>
            <span className="text-body-sm text-[#4a555e]/60 print:text-[#4a555e]">
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="border-b-2 border-frame pb-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-body-sm">
              <div>
                <p className="text-[#4a555e]">Vehicle</p>
                <p className="font-medium text-black">{vehicle}</p>
              </div>
              <div>
                <p className="text-[#4a555e]">Insurer</p>
                <p className="font-medium text-black">{insurer}</p>
              </div>
              <div>
                <p className="text-[#4a555e]">Claim #</p>
                <p className="font-medium text-black">{claimNumber}</p>
              </div>
              <div>
                <p className="text-[#4a555e]">Date of Loss</p>
                <p className="font-medium text-black">{accidentDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fairness Score Summary */}
        <section className="mb-8 print:mb-6">
          <h2 className="text-heading font-semibold text-black mb-4 border-b border-black/10 pb-2">
            Fairness Assessment
          </h2>
          <div className="grid grid-cols-3 gap-6 mb-4">
            <div className="text-center p-4 bg-panel-alt print:bg-white print:border print:border-black/10">
              <p className="text-caption text-[#4a555e] mb-1">Their Offer</p>
              <p className="text-heading-lg font-semibold text-black font-mono">
                {formatCurrency(offerAmount)}
              </p>
            </div>
            <div className="text-center p-4 bg-panel-alt print:bg-white print:border print:border-black/10">
              <p className="text-caption text-[#4a555e] mb-1">Fair Value</p>
              <p className="text-heading-lg font-semibold text-black font-mono">
                {formatCurrency(fairValue)}
              </p>
            </div>
            <div className="text-center p-4 bg-danger-50 print:bg-white print:border print:border-black/10">
              <p className="text-caption text-[#4a555e] mb-1">Gap</p>
              <p className="text-heading-lg font-semibold text-danger-600 font-mono">
                {formatCurrency(gap)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-full bg-black/10 rounded-full h-3 print:border print:border-black/20">
              <div
                className="h-3 rounded-full bg-danger-500"
                style={{ width: `${fairnessScore}%` }}
              />
            </div>
            <span className="text-body-sm font-semibold text-black flex-shrink-0">
              {fairnessScore}/100
            </span>
          </div>
          <p className="text-body-sm text-[#4a555e] leading-relaxed">
            {recommendation}
          </p>
        </section>

        {/* Line Item Breakdown */}
        <section className="mb-8 print:mb-6">
          <h2 className="text-heading font-semibold text-black mb-4 border-b border-black/10 pb-2">
            Line-Item Breakdown
          </h2>
          <table className="w-full text-body-sm">
            <thead>
              <tr className="border-b border-black/10">
                <th className="text-left py-2 font-medium text-[#4a555e]">Category</th>
                <th className="text-right py-2 font-medium text-[#4a555e]">Their Amount</th>
                <th className="text-right py-2 font-medium text-[#4a555e]">Fair Amount</th>
                <th className="text-right py-2 font-medium text-[#4a555e]">Difference</th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((item, i) => (
                <tr key={i} className="border-b border-black/5">
                  <td className="py-2.5 text-black">{item.category}</td>
                  <td className="py-2.5 text-right font-mono text-black">
                    {item.insurer === 0 ? "$0" : formatCurrency(item.insurer)}
                  </td>
                  <td className="py-2.5 text-right font-mono text-black">
                    {formatCurrency(item.fair)}
                  </td>
                  <td className="py-2.5 text-right font-mono text-danger-600">
                    {item.diff > 0 ? `-${formatCurrency(item.diff)}` : "\u2014"}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-black/20 font-semibold">
                <td className="py-2.5 text-black">Total</td>
                <td className="py-2.5 text-right font-mono text-black">
                  {formatCurrency(offerAmount)}
                </td>
                <td className="py-2.5 text-right font-mono text-black">
                  {formatCurrency(fairValue)}
                </td>
                <td className="py-2.5 text-right font-mono text-danger-600">
                  -{formatCurrency(gap)}
                </td>
              </tr>
            </tfoot>
          </table>
        </section>

        {/* Coverage Summary */}
        <section className="mb-8 print:mb-6">
          <h2 className="text-heading font-semibold text-black mb-4 border-b border-black/10 pb-2">
            Policy Coverage Summary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
            {coverages.map((cov, i) => (
              <div key={i} className="flex justify-between py-1.5 border-b border-black/5">
                <span className="text-body-sm text-[#4a555e]">{cov.name}</span>
                <span className="text-body-sm font-medium text-black">{cov.limit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Hidden Coverages */}
        <section className="mb-8 print:mb-6">
          <h2 className="text-heading font-semibold text-black mb-4 border-b border-black/10 pb-2">
            Coverages You May Be Missing
          </h2>
          <div className="space-y-2">
            {hiddenCoverages.map((cov, i) => (
              <div key={i} className="flex justify-between py-1.5 border-b border-black/5">
                <span className="text-body-sm text-[#4a555e]">{cov.name}</span>
                <span className="text-body-sm font-medium text-coral">{cov.potential_value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-black/10 pt-4 mt-8">
          <div className="flex items-center justify-between">
            <p className="text-caption text-[#4a555e]/60">
              Generated by ClaimCoach &mdash; claimcoach.app
            </p>
            <p className="text-caption text-[#4a555e]/60">
              For educational purposes only. Not legal advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
