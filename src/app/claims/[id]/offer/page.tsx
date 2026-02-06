"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ClaimLayout } from "@/components/layout/claim-layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScoreGauge } from "@/components/ui/score-gauge";
import { OfferAnalysis } from "@/types";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  ArrowRight,
  BarChart3,
  Scale,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Info,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Mock offer analysis data -- 2022 Honda Civic, $4,200 offer from State Farm
// ---------------------------------------------------------------------------

const MOCK_ANALYSIS: OfferAnalysis = {
  fairness_score: 38,
  summary:
    "State Farm's offer of $4,200 is significantly below the fair market value of your 2022 Honda Civic. The offer fails to account for diminished value, loss of use, sales tax on a replacement vehicle, and registration/title transfer fees. Based on comparable market data, your vehicle's fair value alone is $6,500-$7,200 before accounting for these additional legitimate damages. The total gap between their offer and your fair compensation is $5,781.",
  line_items: [
    {
      category: "Vehicle Base Value",
      insurer_amount: 4200,
      fair_amount: 6800,
      difference: 2600,
      reasoning:
        "State Farm's valuation uses cherry-picked comparables with higher mileage and lower trim levels. KBB, NADA, and local market listings all support a fair value of $6,500-$7,200 for your 2022 Honda Civic EX with 28,000 miles in good condition. We use the midpoint of $6,800.",
    },
    {
      category: "Loss of Use / Rental",
      insurer_amount: 0,
      fair_amount: 720,
      difference: 720,
      reasoning:
        "Your policy includes Transportation Expense coverage at $30/day for up to 30 days. You were without your vehicle for 24 days during the repair evaluation and settlement process. State Farm did not include this in their offer, but you are entitled to $720 (24 days x $30/day).",
    },
    {
      category: "Diminished Value",
      insurer_amount: 0,
      fair_amount: 1800,
      difference: 1800,
      reasoning:
        "Your 2022 Honda Civic now has an accident on its Carfax history, reducing its resale value by an estimated 10-15%. For a vehicle with a pre-accident value of ~$6,800, the diminished value is conservatively estimated at $1,800. This is a legitimate claim against the at-fault party's insurer in your state.",
    },
    {
      category: "Sales Tax on Replacement",
      insurer_amount: 0,
      fair_amount: 476,
      difference: 476,
      reasoning:
        "If your vehicle is totaled or you must purchase a replacement, you will owe sales tax on the replacement vehicle. At your state's 7% sales tax rate applied to the fair vehicle value of $6,800, this amounts to $476. Many insurers omit this cost from initial offers.",
    },
    {
      category: "Registration / Title Transfer",
      insurer_amount: 0,
      fair_amount: 185,
      difference: 185,
      reasoning:
        "Replacing your vehicle requires new registration and title transfer fees. Based on your state's DMV fee schedule, this costs approximately $185 including title fee ($15), registration ($120), and plate transfer ($50).",
    },
  ],
  total_gap: 5781,
  comparable_data: [
    {
      source: "Kelley Blue Book (KBB)",
      value: "$6,500 - $7,200",
      details:
        "Fair Market Range for 2022 Honda Civic EX, 28,000 miles, good condition. KBB factors in your zip code, local demand, and vehicle-specific features including the turbocharged 1.5L engine and Honda Sensing suite.",
    },
    {
      source: "NADA Guides",
      value: "$6,900 (Clean Retail)",
      details:
        "NADA Clean Retail value assumes a vehicle in good condition with no mechanical defects and only minor cosmetic wear. This value reflects what a consumer would expect to pay at a dealership for a comparable vehicle.",
    },
    {
      source: "Local Market Listings",
      value: "$7,100 average (3 vehicles)",
      details:
        "Three comparable 2022 Honda Civic EX vehicles found within 50 miles: (1) $6,900 with 31,200 miles at Honda of Springfield, (2) $7,200 with 26,800 miles at AutoNation Honda, (3) $7,200 with 29,500 miles at Carvana. Average asking price: $7,100.",
    },
  ],
  recommendation:
    "Your offer is significantly below fair market value. The insurer's offer of $4,200 accounts for only 42% of your total fair compensation of $9,981. We strongly recommend submitting a formal counter-demand for $9,981 supported by the comparable vehicle data and itemized damages above. Based on similar claims, policyholders who counter with documented evidence typically settle for 70-85% of their demand amount, which in your case would be $6,987-$8,484 -- still significantly more than the current offer.",
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

  // ---- State ----
  const [offerAmount, setOfferAmount] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysis, setAnalysis] = useState<OfferAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);

  // ---- Handlers ----
  function handleAnalyze() {
    const parsed = parseFloat(offerAmount.replace(/[^0-9.]/g, ""));
    if (isNaN(parsed) || parsed <= 0) return;

    setIsAnalyzing(true);
    setAnalysisStep(0);
    setAnalysisProgress(0);
    setShowResults(false);

    const totalDuration = 2000;
    const stepDuration = totalDuration / ANALYSIS_STEPS.length;
    let currentStep = 0;

    const stepInterval = setInterval(() => {
      currentStep++;
      if (currentStep < ANALYSIS_STEPS.length) {
        setAnalysisStep(currentStep);
        setAnalysisProgress(
          Math.round((currentStep / ANALYSIS_STEPS.length) * 100)
        );
      } else {
        clearInterval(stepInterval);
        setAnalysisProgress(100);
        setTimeout(() => {
          setIsAnalyzing(false);
          setAnalysis(MOCK_ANALYSIS);
          // Small delay before revealing results for smooth transition
          setTimeout(() => setShowResults(true), 50);
        }, 300);
      }
    }, stepDuration);
  }

  function getScoreLabel(score: number): string {
    if (score >= 80) return "Fair offer -- close to market value";
    if (score >= 60) return "Borderline -- some room for negotiation";
    if (score >= 40) return "Below fair value -- significant gap identified";
    return "Well below fair value -- strongly recommend counter-offer";
  }

  function getScoreBadgeVariant(
    score: number
  ): "success" | "warning" | "danger" {
    if (score >= 80) return "success";
    if (score >= 60) return "warning";
    return "danger";
  }

  // ---- Render ----
  return (
    <ClaimLayout claimId={claimId}>
      <div className="space-y-8">
        {/* --------------------------------------------------------------- */}
        {/* 1. Page Header                                                   */}
        {/* --------------------------------------------------------------- */}
        <Card>
          <CardContent className="py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100">
                    <DollarSign className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      AI Offer Analysis
                    </h1>
                    <p className="text-sm text-gray-500">
                      Enter the insurer&apos;s offer and get an instant fairness
                      analysis backed by market data.
                    </p>
                  </div>
                </div>
              </div>
              {analysis && showResults && (
                <Badge
                  variant={getScoreBadgeVariant(analysis.fairness_score)}
                  size="md"
                >
                  <BarChart3 className="w-3.5 h-3.5 mr-1" />
                  Score: {analysis.fairness_score}/100
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* --------------------------------------------------------------- */}
        {/* 2. Enter Offer                                                   */}
        {/* --------------------------------------------------------------- */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">
              Enter Offer Amount
            </h2>
          </CardHeader>
          <CardContent>
            <div className="max-w-xl">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="offer-amount"
                      type="text"
                      placeholder="e.g. 4,200"
                      value={offerAmount}
                      onChange={(e) => {
                        // Allow digits, commas, and one decimal point
                        const val = e.target.value.replace(/[^0-9.,]/g, "");
                        setOfferAmount(val);
                      }}
                      className="pl-10 text-lg font-semibold"
                      hint="Enter the total amount the insurer offered you."
                    />
                  </div>
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
                  <Sparkles className="w-5 h-5 mr-2" />
                  Analyze Offer
                </Button>
              </div>

              {/* Analysis progress animation */}
              {isAnalyzing && (
                <div className="mt-4 rounded-lg border border-orange-200 bg-orange-50 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <div className="w-7 h-7 rounded-full border-2 border-orange-300 border-t-orange-600 animate-spin" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-orange-900">
                        Analyzing your offer...
                      </p>
                      <p className="text-xs text-orange-600">
                        {ANALYSIS_STEPS[analysisStep]}
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-orange-600 h-2 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${analysisProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-orange-500 mt-1.5 text-right">
                    {analysisProgress}%
                  </p>
                </div>
              )}

              {/* Post-analysis confirmation */}
              {analysis && showResults && !isAnalyzing && (
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>
                    Analysis complete. Enter a different amount to re-analyze.
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* --------------------------------------------------------------- */}
        {/* ANALYSIS RESULTS (shown after analysis completes)                */}
        {/* --------------------------------------------------------------- */}
        {analysis && showResults && (
          <div
            className="space-y-8 transition-all duration-500 ease-out"
            style={{
              animation: "fadeSlideIn 0.5s ease-out forwards",
            }}
          >
            {/* ------------------------------------------------------------- */}
            {/* 3. Fairness Score                                              */}
            {/* ------------------------------------------------------------- */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100">
                    <BarChart3 className="w-4 h-4 text-orange-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Fairness Score
                  </h2>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <ScoreGauge
                    score={analysis.fairness_score}
                    size="lg"
                    className="flex-shrink-0"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-sm font-semibold text-gray-900 mb-2">
                      {getScoreLabel(analysis.fairness_score)}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {analysis.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                      <div className="flex items-center gap-1.5 text-sm">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-500">Their offer:</span>
                        <span className="font-bold text-gray-900">
                          {formatCurrency(
                            analysis.line_items.reduce(
                              (sum, item) => sum + item.insurer_amount,
                              0
                            )
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-gray-500">Fair value:</span>
                        <span className="font-bold text-green-600">
                          {formatCurrency(
                            analysis.line_items.reduce(
                              (sum, item) => sum + item.fair_amount,
                              0
                            )
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm">
                        <TrendingDown className="w-4 h-4 text-red-500" />
                        <span className="text-gray-500">Gap:</span>
                        <span className="font-bold text-red-600">
                          {formatCurrency(analysis.total_gap)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ------------------------------------------------------------- */}
            {/* 4. Line-Item Breakdown                                         */}
            {/* ------------------------------------------------------------- */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100">
                    <Scale className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Line-Item Breakdown
                    </h2>
                    <p className="text-xs text-gray-500">
                      How each component of the offer compares to fair market
                      value
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="text-left py-3 px-6 font-semibold text-gray-600">
                          Category
                        </th>
                        <th className="text-right py-3 px-6 font-semibold text-gray-600">
                          Insurer Amount
                        </th>
                        <th className="text-right py-3 px-6 font-semibold text-gray-600">
                          Fair Amount
                        </th>
                        <th className="text-right py-3 px-6 font-semibold text-gray-600">
                          Difference
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {analysis.line_items.map((item, index) => (
                        <tr key={index} className="group hover:bg-gray-50">
                          <td className="py-4 px-6">
                            <p className="font-medium text-gray-900">
                              {item.category}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 max-w-md leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              {item.reasoning}
                            </p>
                          </td>
                          <td className="py-4 px-6 text-right font-mono">
                            <span
                              className={
                                item.insurer_amount === 0
                                  ? "text-red-500"
                                  : "text-gray-900"
                              }
                            >
                              {item.insurer_amount === 0
                                ? "$0"
                                : formatCurrency(item.insurer_amount)}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right font-mono text-green-600 font-medium">
                            {formatCurrency(item.fair_amount)}
                          </td>
                          <td className="py-4 px-6 text-right">
                            {item.difference > 0 ? (
                              <span className="inline-flex items-center gap-1 text-red-600 font-semibold font-mono">
                                <TrendingDown className="w-3.5 h-3.5" />-
                                {formatCurrency(item.difference)}
                              </span>
                            ) : (
                              <span className="text-green-600 font-mono">
                                --
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50 border-t-2 border-gray-200">
                        <td className="py-3 px-6 font-bold text-gray-900">
                          Total
                        </td>
                        <td className="py-3 px-6 text-right font-mono font-bold text-gray-900">
                          {formatCurrency(
                            analysis.line_items.reduce(
                              (sum, item) => sum + item.insurer_amount,
                              0
                            )
                          )}
                        </td>
                        <td className="py-3 px-6 text-right font-mono font-bold text-green-600">
                          {formatCurrency(
                            analysis.line_items.reduce(
                              (sum, item) => sum + item.fair_amount,
                              0
                            )
                          )}
                        </td>
                        <td className="py-3 px-6 text-right font-mono font-bold text-red-600">
                          -{formatCurrency(analysis.total_gap)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Mobile card layout */}
                <div className="md:hidden divide-y divide-gray-100">
                  {analysis.line_items.map((item, index) => (
                    <div key={index} className="px-6 py-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-sm font-semibold text-gray-900">
                          {item.category}
                        </p>
                        {item.difference > 0 && (
                          <Badge variant="danger" size="sm">
                            -{formatCurrency(item.difference)}
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-2">
                        <div>
                          <p className="text-xs text-gray-500">Insurer</p>
                          <p
                            className={`text-sm font-mono font-medium ${
                              item.insurer_amount === 0
                                ? "text-red-500"
                                : "text-gray-900"
                            }`}
                          >
                            {item.insurer_amount === 0
                              ? "$0"
                              : formatCurrency(item.insurer_amount)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Fair Value</p>
                          <p className="text-sm font-mono font-medium text-green-600">
                            {formatCurrency(item.fair_amount)}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {item.reasoning}
                      </p>
                    </div>
                  ))}
                  {/* Mobile totals */}
                  <div className="px-6 py-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-900">
                        Total Gap
                      </span>
                      <span className="text-sm font-bold text-red-600 font-mono">
                        -{formatCurrency(analysis.total_gap)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ------------------------------------------------------------- */}
            {/* 5. Comparable Data                                             */}
            {/* ------------------------------------------------------------- */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100">
                    <BarChart3 className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Comparable Market Data
                    </h2>
                    <p className="text-xs text-gray-500">
                      Independent sources supporting the fair market value
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysis.comparable_data.map((comp, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 p-4 hover:border-purple-300 hover:shadow-sm transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {comp.source}
                        </h3>
                        <ExternalLink className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                      </div>
                      <p className="text-xl font-bold text-purple-600 mb-2">
                        {comp.value}
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {comp.details}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* ------------------------------------------------------------- */}
            {/* 6. Gap Analysis                                                */}
            {/* ------------------------------------------------------------- */}
            <Card className="ring-2 ring-red-200">
              <CardHeader className="bg-red-50 border-b-red-200">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-red-900">
                    Gap Analysis
                  </h2>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Gap visualization */}
                  <div className="flex-1">
                    <div className="flex items-end gap-4 mb-4">
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">
                          Their Offer
                        </p>
                        <div className="bg-red-100 rounded-lg p-3 text-center">
                          <p className="text-2xl font-bold text-red-700 font-mono">
                            {formatCurrency(
                              analysis.line_items.reduce(
                                (sum, item) => sum + item.insurer_amount,
                                0
                              )
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center pb-3">
                        <ArrowRight className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">
                          Fair Value
                        </p>
                        <div className="bg-green-100 rounded-lg p-3 text-center">
                          <p className="text-2xl font-bold text-green-700 font-mono">
                            {formatCurrency(
                              analysis.line_items.reduce(
                                (sum, item) => sum + item.fair_amount,
                                0
                              )
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Gap bar */}
                    <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-red-500 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${Math.round(
                            (analysis.line_items.reduce(
                              (sum, item) => sum + item.insurer_amount,
                              0
                            ) /
                              analysis.line_items.reduce(
                                (sum, item) => sum + item.fair_amount,
                                0
                              )) *
                              100
                          )}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">$0</span>
                      <span className="text-xs font-semibold text-red-600">
                        Gap: {formatCurrency(analysis.total_gap)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatCurrency(
                          analysis.line_items.reduce(
                            (sum, item) => sum + item.fair_amount,
                            0
                          )
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Recommendation text */}
                  <div className="md:max-w-sm">
                    <p className="text-xs font-semibold text-red-800 mb-2 uppercase tracking-wide">
                      Recommendation
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {analysis.recommendation}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ------------------------------------------------------------- */}
            {/* 7. Next Steps CTA                                              */}
            {/* ------------------------------------------------------------- */}
            <Card className="bg-brand-50 border-brand-200">
              <CardContent className="py-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-100 flex-shrink-0">
                      <Scale className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-brand-900">
                        Ready to Fight Back?
                      </h3>
                      <p className="text-sm text-brand-700 mt-0.5">
                        Generate a professional counter-offer with a demand
                        letter, talking points, and escalation plan -- all
                        backed by the evidence above.
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/claims/${claimId}/counter`}
                    className="flex-shrink-0"
                  >
                    <Button size="lg">
                      Generate Counter-Offer
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* ------------------------------------------------------------- */}
            {/* 8. Disclaimer                                                  */}
            {/* ------------------------------------------------------------- */}
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">
                      Important Disclaimer
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      This analysis is for educational purposes and does not
                      constitute legal or financial advice. Fair market values
                      are estimates based on publicly available data and may not
                      reflect your exact vehicle&apos;s condition, options, or local
                      market dynamics. Actual settlement amounts depend on many
                      factors including your policy terms, state regulations, and
                      the specific circumstances of your claim. For significant
                      disputes, consult with a licensed public adjuster or
                      attorney.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Inline keyframes for fade-slide animation */}
      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </ClaimLayout>
  );
}
