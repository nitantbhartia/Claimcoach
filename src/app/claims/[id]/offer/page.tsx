"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ClaimLayout } from "@/components/layout/claim-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScoreGauge } from "@/components/ui/score-gauge";
import { Claim, OfferAnalysis } from "@/types";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { LiveAuditOffer } from "@/components/ui/live-audit-offer";

// ---------------------------------------------------------------------------
// Analysis loading steps
// ---------------------------------------------------------------------------

const ANALYSIS_STEPS = [
  "Pulling comparable vehicle data...",
  "Analyzing KBB, NADA, and local listings...",
  "Calculating diminished value...",
  "Itemizing uncovered damages...",
  "Computing fairness score...",
  "Generating recommendation...",
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function OfferAnalysisPage() {
  const params = useParams<{ id: string }>();
  const claimId = params.id;

  const [claim, setClaim] = useState<Claim | null>(null);
  const [claimLoading, setClaimLoading] = useState(true);
  const [offerAmount, setOfferAmount] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysis, setAnalysis] = useState<OfferAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch claim data on mount
  useEffect(() => {
    async function fetchClaim() {
      try {
        const res = await fetch(`/api/claims/${claimId}`);
        if (!res.ok) throw new Error("Failed to load claim");
        const claimData = await res.json();
        setClaim(claimData);

        // Pre-populate analysis if cached
        if (claimData.offerAnalysis) {
          setAnalysis(claimData.offerAnalysis);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load claim data."
        );
      } finally {
        setClaimLoading(false);
      }
    }
    fetchClaim();
  }, [claimId]);

  // Computed totals
  const theirTotal = analysis
    ? analysis.line_items.reduce((s, i) => s + i.insurer_amount, 0)
    : 0;
  const fairTotal = analysis
    ? analysis.line_items.reduce((s, i) => s + i.fair_amount, 0)
    : 0;

  async function handleAnalyze() {
    const parsed = parseFloat(offerAmount.replace(/[^0-9.]/g, ""));
    if (isNaN(parsed) || parsed <= 0) return;

    setIsAnalyzing(true);
    setAnalysisStep(0);
    setAnalysis(null);
    setError(null);

    let current = 0;
    const stepInterval = setInterval(() => {
      current = (current + 1) % ANALYSIS_STEPS.length;
      setAnalysisStep(current);
    }, 2000);

    try {
      const res = await fetch("/api/ai/analyze-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerAmount: parsed,
          claimType: "Auto Property Damage",
          vehicleInfo: claim
            ? `${claim.vehicle_year} ${claim.vehicle_make} ${claim.vehicle_model}`
            : "Unknown vehicle",
          damageDescription: claim?.damage_description ?? "No description provided",
        }),
      });

      clearInterval(stepInterval);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Analysis failed");
      }

      const data = await res.json();
      setAnalysis(data.analysis);

      // Cache analysis in Supabase
      fetch(`/api/claims/${claimId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fairness_score: data.analysis.fairness_score,
          status: "offer_received",
        }),
      });
    } catch (err) {
      clearInterval(stepInterval);
      setError(
        err instanceof Error ? err.message : "Analysis failed. Please try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

  function getScoreLabel(score: number): string {
    if (score >= 80) return "Fair offer -- close to market value";
    if (score >= 60) return "Borderline -- some room for negotiation";
    if (score >= 40) return "Below fair value -- significant gap identified";
    return "Well below fair value -- strongly recommend counter-offer";
  }

  // Show loading spinner while claim data is being fetched
  if (claimLoading) {
    return (
      <ClaimLayout claimId={claimId}>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#4a555e]/60" />
        </div>
      </ClaimLayout>
    );
  }

  return (
    <ClaimLayout claimId={claimId}>
      <div className="space-y-6">
        {/* ----------------------------------------------------------------- */}
        {/* 1. Input Section                                                   */}
        {/* ----------------------------------------------------------------- */}
        <div className="bg-panel border border-black/10 p-6">
          <h1 className="text-heading-lg sm:text-display-sm font-semibold text-black">
            Offer Analysis
          </h1>
          <p className="text-body text-[#4a555e] mt-1 mb-6">
            Enter the insurer&apos;s offer amount to get an instant fairness
            analysis backed by market data.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <div className="flex-1 relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#4a555e]/60 text-body font-medium">
                $
              </span>
              <Input
                id="offer-amount"
                type="text"
                placeholder="e.g. 4,200"
                value={offerAmount}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9.,]/g, "");
                  setOfferAmount(val);
                }}
                className="pl-7 sm:pl-8 text-body font-semibold"
              />
            </div>
            <Button
              size="lg"
              onClick={handleAnalyze}
              loading={isAnalyzing}
              disabled={
                !offerAmount ||
                parseFloat(offerAmount.replace(/[^0-9.]/g, "")) <= 0
              }
            >
              Analyze
            </Button>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* 2. Loading State — Live Audit                                      */}
        {/* ----------------------------------------------------------------- */}
        {isAnalyzing && (
          <LiveAuditOffer duration={12000} />
        )}

        {error && !isAnalyzing && (
          <div className="bg-panel border border-black/10 p-4">
            <p className="text-body-sm text-warning-500">{error}</p>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* RESULTS                                                            */}
        {/* ----------------------------------------------------------------- */}
        {analysis && !isAnalyzing && (
          <div className="space-y-6">
            {/* -------------------------------------------------------------- */}
            {/* 3. Score + Summary                                              */}
            {/* -------------------------------------------------------------- */}
            <div className="bg-panel border border-black/10 p-6">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <ScoreGauge
                  score={analysis.fairness_score}
                  size="lg"
                  className="flex-shrink-0"
                />

                <div className="flex-1 text-center md:text-left space-y-4">
                  <p className="text-body-sm font-medium text-[#4a555e]">
                    {getScoreLabel(analysis.fairness_score)}
                  </p>
                  <p className="text-body text-[#4a555e] leading-relaxed">
                    {analysis.summary}
                  </p>

                  {/* Their offer vs Fair value */}
                  <div className="flex flex-wrap items-baseline gap-3 sm:gap-6">
                    <div>
                      <p className="text-caption text-[#4a555e]/60">Their offer</p>
                      <p className="text-heading-lg font-semibold text-black font-mono">
                        {formatCurrency(theirTotal)}
                      </p>
                    </div>
                    <div>
                      <p className="text-caption text-[#4a555e]/60">Fair value</p>
                      <p className="text-heading-lg font-semibold text-black font-mono">
                        {formatCurrency(fairTotal)}
                      </p>
                    </div>
                  </div>
                  <p className="text-body-sm text-danger-600 font-medium">
                    Gap: {formatCurrency(analysis.total_gap)}
                  </p>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* 4. Line Items                                                   */}
            {/* -------------------------------------------------------------- */}
            <div className="bg-panel border border-black/10 overflow-hidden">
              <div className="px-4 sm:px-6 py-4 border-b border-black/5">
                <h2 className="text-heading font-semibold text-black">
                  Line-Item Breakdown
                </h2>
              </div>

              {/* Desktop table */}
              <div className="hidden md:block">
                <table className="w-full text-body-sm">
                  <thead>
                    <tr className="border-b border-black/5">
                      <th className="text-left py-3 px-6 font-medium text-[#4a555e]">
                        Category
                      </th>
                      <th className="text-right py-3 px-6 font-medium text-[#4a555e]">
                        Their Amount
                      </th>
                      <th className="text-right py-3 px-6 font-medium text-[#4a555e]">
                        Fair Amount
                      </th>
                      <th className="text-right py-3 px-6 font-medium text-[#4a555e]">
                        Difference
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.line_items.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-black/5 last:border-b-0"
                      >
                        <td className="py-4 px-6">
                          <p className="font-medium text-black">
                            {item.category}
                          </p>
                          <p className="text-body-sm text-[#4a555e] mt-1 max-w-md leading-relaxed">
                            {item.reasoning}
                          </p>
                        </td>
                        <td className="py-4 px-6 text-right font-mono text-black">
                          {item.insurer_amount === 0
                            ? "$0"
                            : formatCurrency(item.insurer_amount)}
                        </td>
                        <td className="py-4 px-6 text-right font-mono text-black">
                          {formatCurrency(item.fair_amount)}
                        </td>
                        <td className="py-4 px-6 text-right font-mono">
                          {item.difference > 0 ? (
                            <span className="text-danger-600">
                              -{formatCurrency(item.difference)}
                            </span>
                          ) : (
                            <span className="text-[#4a555e]/60">&mdash;</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-black/10 bg-panel-alt">
                      <td className="py-3 px-6 font-semibold text-black">
                        Total
                      </td>
                      <td className="py-3 px-6 text-right font-mono font-semibold text-black">
                        {formatCurrency(theirTotal)}
                      </td>
                      <td className="py-3 px-6 text-right font-mono font-semibold text-black">
                        {formatCurrency(fairTotal)}
                      </td>
                      <td className="py-3 px-6 text-right font-mono font-semibold text-danger-600">
                        -{formatCurrency(analysis.total_gap)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Mobile layout */}
              <div className="md:hidden divide-y divide-black/5">
                {analysis.line_items.map((item, index) => (
                  <div key={index} className="px-4 sm:px-6 py-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-body-sm font-medium text-black">
                        {item.category}
                      </p>
                      {item.difference > 0 && (
                        <span className="text-body-sm font-mono text-danger-600">
                          -{formatCurrency(item.difference)}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-2">
                      <div>
                        <p className="text-caption text-[#4a555e]/60">
                          Their Amount
                        </p>
                        <p className="text-body-sm font-mono text-black">
                          {item.insurer_amount === 0
                            ? "$0"
                            : formatCurrency(item.insurer_amount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-caption text-[#4a555e]/60">
                          Fair Amount
                        </p>
                        <p className="text-body-sm font-mono text-black">
                          {formatCurrency(item.fair_amount)}
                        </p>
                      </div>
                    </div>
                    <p className="text-body-sm text-[#4a555e] leading-relaxed">
                      {item.reasoning}
                    </p>
                  </div>
                ))}
                <div className="px-4 sm:px-6 py-4 bg-panel-alt">
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm font-semibold text-black">
                      Total Gap
                    </span>
                    <span className="text-body-sm font-semibold text-danger-600 font-mono">
                      -{formatCurrency(analysis.total_gap)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* 5. Market Data                                                  */}
            {/* -------------------------------------------------------------- */}
            <div className="bg-panel border border-black/10">
              <div className="px-4 sm:px-6 py-4 border-b border-black/5">
                <h2 className="text-heading font-semibold text-black">
                  Market Data
                </h2>
              </div>
              <div className="divide-y divide-black/5">
                {analysis.comparable_data.map((comp, index) => (
                  <div key={index} className="px-6 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                      <p className="text-body-sm font-medium text-black">
                        {comp.source}
                      </p>
                      <p className="text-body-sm font-semibold text-black font-mono">
                        {comp.value}
                      </p>
                    </div>
                    <p className="text-body-sm text-[#4a555e] leading-relaxed">
                      {comp.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* 6. Recommendation                                               */}
            {/* -------------------------------------------------------------- */}
            <div className="bg-panel border border-black/10 p-6">
              <h2 className="text-heading font-semibold text-black mb-3">
                Recommendation
              </h2>
              <p className="text-body text-[#4a555e] leading-relaxed">
                {analysis.recommendation}
              </p>
              <div className="mt-4">
                <Link
                  href={`/claims/${claimId}/counter`}
                  className="inline-flex items-center gap-2 text-body font-medium text-coral hover:text-coral"
                >
                  Generate a counter-offer
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* 7. Next steps                                                   */}
            {/* -------------------------------------------------------------- */}
            <div className="bg-panel border border-black/10 p-5">
              <p className="text-body-sm font-medium text-[#4a555e] mb-3">What&apos;s next?</p>
              <div className="space-y-2">
                <Link
                  href={`/claims/${claimId}/counter`}
                  className="flex items-center justify-between text-body-sm text-black hover:text-coral transition-colors"
                >
                  Generate a counter-offer with demand letter
                  <ArrowRight className="w-3.5 h-3.5 text-[#4a555e]/60 flex-shrink-0" />
                </Link>
                <Link
                  href={`/claims/${claimId}/call-script`}
                  className="flex items-center justify-between text-body-sm text-black hover:text-coral transition-colors"
                >
                  Prepare a call script for the adjuster
                  <ArrowRight className="w-3.5 h-3.5 text-[#4a555e]/60 flex-shrink-0" />
                </Link>
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* 8. Disclaimer                                                   */}
            {/* -------------------------------------------------------------- */}
            <p className="text-caption text-[#4a555e]/60 leading-relaxed">
              This analysis is for educational purposes and does not constitute
              legal or financial advice. Fair market values are estimates based
              on publicly available data and may not reflect your exact
              vehicle&apos;s condition, options, or local market dynamics. Actual
              settlement amounts depend on many factors including your policy
              terms, state regulations, and the specific circumstances of your
              claim. For significant disputes, consult with a licensed public
              adjuster or attorney.
            </p>
          </div>
        )}
      </div>
    </ClaimLayout>
  );
}
