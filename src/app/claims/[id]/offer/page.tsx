"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ClaimLayout } from "@/components/layout/claim-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScoreGauge } from "@/components/ui/score-gauge";
import { OfferAnalysis } from "@/types";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

// ---------------------------------------------------------------------------
// Mock offer analysis data -- 2022 Honda Civic, $4,200 offer from State Farm
// ---------------------------------------------------------------------------

const MOCK_ANALYSIS: OfferAnalysis = {
  fairness_score: 38,
  summary:
    "State Farm&apos;s offer of $4,200 is significantly below the fair market value of your 2022 Honda Civic. The offer fails to account for diminished value, loss of use, sales tax on a replacement vehicle, and registration/title transfer fees. Based on comparable market data, your vehicle&apos;s fair value alone is $6,500-$7,200 before accounting for these additional legitimate damages. The total gap between their offer and your fair compensation is $5,781.",
  line_items: [
    {
      category: "Vehicle Base Value",
      insurer_amount: 4200,
      fair_amount: 6800,
      difference: 2600,
      reasoning:
        "State Farm uses cherry-picked comparables with higher mileage and lower trim levels. KBB, NADA, and local market listings all support a fair value of $6,500-$7,200 for your 2022 Honda Civic EX with 28,000 miles in good condition.",
    },
    {
      category: "Loss of Use / Rental",
      insurer_amount: 0,
      fair_amount: 720,
      difference: 720,
      reasoning:
        "Your policy includes Transportation Expense coverage at $30/day for up to 30 days. You were without your vehicle for 24 days. State Farm did not include this in their offer.",
    },
    {
      category: "Diminished Value",
      insurer_amount: 0,
      fair_amount: 1800,
      difference: 1800,
      reasoning:
        "Your vehicle now has an accident on its Carfax history, reducing resale value by an estimated 10-15%. Conservatively estimated at $1,800 based on pre-accident value.",
    },
    {
      category: "Sales Tax on Replacement",
      insurer_amount: 0,
      fair_amount: 476,
      difference: 476,
      reasoning:
        "At your state\u2019s 7% sales tax rate applied to the fair vehicle value of $6,800, replacement sales tax amounts to $476. Often omitted from initial offers.",
    },
    {
      category: "Registration / Title Transfer",
      insurer_amount: 0,
      fair_amount: 185,
      difference: 185,
      reasoning:
        "Replacing your vehicle requires new registration and title transfer fees totaling approximately $185 based on your state\u2019s DMV fee schedule.",
    },
  ],
  total_gap: 5781,
  comparable_data: [
    {
      source: "Kelley Blue Book (KBB)",
      value: "$6,500 - $7,200",
      details:
        "Fair Market Range for 2022 Honda Civic EX, 28,000 miles, good condition. Factors in your zip code, local demand, and vehicle-specific features.",
    },
    {
      source: "NADA Guides",
      value: "$6,900 (Clean Retail)",
      details:
        "Clean Retail value assumes good condition with no mechanical defects. Reflects what a consumer would expect to pay at a dealership.",
    },
    {
      source: "Local Market Listings",
      value: "$7,100 average (3 vehicles)",
      details:
        "Three comparable 2022 Civic EX vehicles within 50 miles: $6,900 at 31,200 mi, $7,200 at 26,800 mi, $7,200 at 29,500 mi.",
    },
  ],
  recommendation:
    "Your offer is significantly below fair market value. The insurer\u2019s offer of $4,200 accounts for only 42% of your total fair compensation of $9,981. We strongly recommend submitting a formal counter-demand for $9,981 supported by the comparable vehicle data and itemized damages above. Based on similar claims, policyholders who counter with documented evidence typically settle for 70-85% of their demand amount, which in your case would be $6,987-$8,484.",
};

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

  const [offerAmount, setOfferAmount] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysis, setAnalysis] = useState<OfferAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

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
          vehicleInfo: "2022 Honda Civic EX, 28,000 miles",
          damageDescription: "Collision damage from rear-end accident",
        }),
      });

      clearInterval(stepInterval);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Analysis failed");
      }

      const data = await res.json();
      setAnalysis(data.analysis);
    } catch (err) {
      clearInterval(stepInterval);
      console.warn("API call failed, using mock data:", err);
      setAnalysis(MOCK_ANALYSIS);
      setError("Live AI analysis unavailable. Showing sample analysis.");
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

  return (
    <ClaimLayout claimId={claimId}>
      <div className="space-y-6">
        {/* ----------------------------------------------------------------- */}
        {/* 1. Input Section                                                   */}
        {/* ----------------------------------------------------------------- */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-card p-6">
          <h1 className="text-display-sm font-semibold text-slate-900">
            Offer Analysis
          </h1>
          <p className="text-body text-slate-500 mt-1 mb-6">
            Enter the insurer&apos;s offer amount to get an instant fairness
            analysis backed by market data.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <div className="flex-1 relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-body font-medium">
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
                className="pl-8 text-body-lg font-semibold"
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
        {/* 2. Loading State                                                   */}
        {/* ----------------------------------------------------------------- */}
        {isAnalyzing && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-card p-6">
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-brand-500 animate-spin" />
              <p className="text-body text-slate-600">
                {ANALYSIS_STEPS[analysisStep]}
              </p>
            </div>
          </div>
        )}

        {error && !isAnalyzing && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-card p-4">
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
            <div className="bg-white rounded-lg border border-slate-200 shadow-card p-6">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <ScoreGauge
                  score={analysis.fairness_score}
                  size="lg"
                  className="flex-shrink-0"
                />

                <div className="flex-1 text-center md:text-left space-y-4">
                  <p className="text-body-sm font-medium text-slate-500">
                    {getScoreLabel(analysis.fairness_score)}
                  </p>
                  <p className="text-body text-slate-600 leading-relaxed">
                    {analysis.summary}
                  </p>

                  {/* Their offer vs Fair value */}
                  <div className="flex flex-wrap items-baseline gap-6">
                    <div>
                      <p className="text-caption text-slate-400">Their offer</p>
                      <p className="text-heading-lg font-semibold text-slate-900 font-mono">
                        {formatCurrency(theirTotal)}
                      </p>
                    </div>
                    <div>
                      <p className="text-caption text-slate-400">Fair value</p>
                      <p className="text-heading-lg font-semibold text-slate-900 font-mono">
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
            <div className="bg-white rounded-lg border border-slate-200 shadow-card overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h2 className="text-heading font-semibold text-slate-900">
                  Line-Item Breakdown
                </h2>
              </div>

              {/* Desktop table */}
              <div className="hidden md:block">
                <table className="w-full text-body-sm">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-3 px-6 font-medium text-slate-500">
                        Category
                      </th>
                      <th className="text-right py-3 px-6 font-medium text-slate-500">
                        Their Amount
                      </th>
                      <th className="text-right py-3 px-6 font-medium text-slate-500">
                        Fair Amount
                      </th>
                      <th className="text-right py-3 px-6 font-medium text-slate-500">
                        Difference
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.line_items.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-100 last:border-b-0"
                      >
                        <td className="py-4 px-6">
                          <p className="font-medium text-slate-900">
                            {item.category}
                          </p>
                          <p className="text-body-sm text-slate-500 mt-1 max-w-md leading-relaxed">
                            {item.reasoning}
                          </p>
                        </td>
                        <td className="py-4 px-6 text-right font-mono text-slate-900">
                          {item.insurer_amount === 0
                            ? "$0"
                            : formatCurrency(item.insurer_amount)}
                        </td>
                        <td className="py-4 px-6 text-right font-mono text-slate-900">
                          {formatCurrency(item.fair_amount)}
                        </td>
                        <td className="py-4 px-6 text-right font-mono">
                          {item.difference > 0 ? (
                            <span className="text-danger-600">
                              -{formatCurrency(item.difference)}
                            </span>
                          ) : (
                            <span className="text-slate-400">&mdash;</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-slate-200 bg-slate-50">
                      <td className="py-3 px-6 font-semibold text-slate-900">
                        Total
                      </td>
                      <td className="py-3 px-6 text-right font-mono font-semibold text-slate-900">
                        {formatCurrency(theirTotal)}
                      </td>
                      <td className="py-3 px-6 text-right font-mono font-semibold text-slate-900">
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
              <div className="md:hidden divide-y divide-slate-100">
                {analysis.line_items.map((item, index) => (
                  <div key={index} className="px-6 py-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-body-sm font-medium text-slate-900">
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
                        <p className="text-caption text-slate-400">
                          Their Amount
                        </p>
                        <p className="text-body-sm font-mono text-slate-900">
                          {item.insurer_amount === 0
                            ? "$0"
                            : formatCurrency(item.insurer_amount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-caption text-slate-400">
                          Fair Amount
                        </p>
                        <p className="text-body-sm font-mono text-slate-900">
                          {formatCurrency(item.fair_amount)}
                        </p>
                      </div>
                    </div>
                    <p className="text-body-sm text-slate-500 leading-relaxed">
                      {item.reasoning}
                    </p>
                  </div>
                ))}
                <div className="px-6 py-4 bg-slate-50">
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm font-semibold text-slate-900">
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
            <div className="bg-white rounded-lg border border-slate-200 shadow-card">
              <div className="px-6 py-4 border-b border-slate-100">
                <h2 className="text-heading font-semibold text-slate-900">
                  Market Data
                </h2>
              </div>
              <div className="divide-y divide-slate-100">
                {analysis.comparable_data.map((comp, index) => (
                  <div key={index} className="px-6 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                      <p className="text-body-sm font-medium text-slate-900">
                        {comp.source}
                      </p>
                      <p className="text-body-sm font-semibold text-slate-900 font-mono">
                        {comp.value}
                      </p>
                    </div>
                    <p className="text-body-sm text-slate-500 leading-relaxed">
                      {comp.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* 6. Recommendation                                               */}
            {/* -------------------------------------------------------------- */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-card p-6">
              <h2 className="text-heading font-semibold text-slate-900 mb-3">
                Recommendation
              </h2>
              <p className="text-body text-slate-600 leading-relaxed">
                {analysis.recommendation}
              </p>
              <div className="mt-4">
                <Link
                  href={`/claims/${claimId}/counter`}
                  className="inline-flex items-center gap-2 text-body font-medium text-brand-500 hover:text-brand-600"
                >
                  Generate a counter-offer
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* 7. Disclaimer                                                   */}
            {/* -------------------------------------------------------------- */}
            <p className="text-caption text-slate-400 leading-relaxed">
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
