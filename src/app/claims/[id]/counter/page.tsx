"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ClaimLayout } from "@/components/layout/claim-layout";
import { Button } from "@/components/ui/button";
import { Claim, CounterOffer as CounterOfferType } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Copy, Download, ChevronDown, ChevronUp, Loader2, ArrowRight, Check, Phone } from "lucide-react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Generation loading steps
// ---------------------------------------------------------------------------

const GENERATION_STEPS = [
  "Reviewing offer analysis and gap data...",
  "Compiling comparable vehicle evidence...",
  "Calculating optimal demand amount...",
  "Drafting demand letter...",
  "Generating negotiation talking points...",
  "Building escalation roadmap...",
  "Finalizing your counter-offer package...",
];

// ---------------------------------------------------------------------------
// Evidence items
// ---------------------------------------------------------------------------

const EVIDENCE_ITEMS = [
  "KBB Fair Market Value Report",
  "NADA Valuation Report",
  "3 Local Comparable Vehicle Listings",
  "Rental Reimbursement Documentation (24 days)",
  "Diminished Value Assessment (17c formula)",
  "State DMV Fee Schedule ($185)",
  "Sales Tax Rate Documentation (7%)",
  "Photographs and Repair Estimates",
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function CounterOfferPage() {
  const params = useParams<{ id: string }>();
  const claimId = params.id;

  const [claim, setClaim] = useState<Claim | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [counterOffer, setCounterOffer] = useState<CounterOfferType | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());

  // Fetch claim data on mount
  useEffect(() => {
    async function fetchClaim() {
      try {
        const res = await fetch(`/api/claims/${claimId}`);
        if (!res.ok) {
          throw new Error("Failed to load claim data");
        }
        const data = await res.json();
        setClaim(data.claim);

        // Pre-populate counter offer if one was previously generated
        if (data.counterOffer) {
          setCounterOffer(data.counterOffer);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load claim data");
      } finally {
        setLoading(false);
      }
    }

    fetchClaim();
  }, [claimId]);

  // Derived values from real claim data
  const theirOffer = claim?.offer_amount ?? 0;
  const demand = counterOffer?.demand_amount ?? (claim?.offer_amount ? Math.round(claim.offer_amount * 2.4) : 0);
  const gap = demand - theirOffer;

  async function handleGenerate() {
    if (!claim) return;

    setIsGenerating(true);
    setGenerationStep(0);
    setCounterOffer(null);
    setError(null);

    let current = 0;
    const stepInterval = setInterval(() => {
      current = (current + 1) % GENERATION_STEPS.length;
      setGenerationStep(current);
    }, 2000);

    try {
      const res = await fetch("/api/ai/generate-counter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerAmount: claim.offer_amount,
          offerAnalysis: { fairness_score: claim.fairness_score, total_gap: gap },
          claimType: "Auto Property Damage",
          vehicleInfo: [claim.vehicle_year, claim.vehicle_make, claim.vehicle_model].filter(Boolean).join(" "),
          insurerName: claim.insurer_name,
        }),
      });

      clearInterval(stepInterval);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Generation failed");
      }

      const data = await res.json();
      setCounterOffer(data.counterOffer);
    } catch (err) {
      clearInterval(stepInterval);
      setError(err instanceof Error ? err.message : "Generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  function handleCopy() {
    if (!counterOffer) return;
    navigator.clipboard.writeText(counterOffer.demand_letter).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDownload() {
    if (!counterOffer) return;
    const blob = new Blob([counterOffer.demand_letter], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Counter-Offer-Demand-Letter-${claimId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function toggleStep(step: number) {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(step)) {
        next.delete(step);
      } else {
        next.add(step);
      }
      return next;
    });
  }

  if (loading) {
    return (
      <ClaimLayout claimId={claimId}>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-coral animate-spin" />
          <span className="ml-3 text-body text-[#4a555e]">Loading claim data...</span>
        </div>
      </ClaimLayout>
    );
  }

  return (
    <ClaimLayout claimId={claimId}>
      <div className="space-y-6">
        {/* ----------------------------------------------------------------- */}
        {/* 1. Summary Bar                                                     */}
        {/* ----------------------------------------------------------------- */}
        <div className="bg-panel border border-black/10 p-6">
          <h1 className="text-heading-lg sm:text-display-sm font-semibold text-black mb-4 sm:mb-6">
            Counter-Offer
          </h1>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Their offer */}
            <div className="text-center">
              <p className="text-caption text-[#4a555e]/60 mb-1">Their Offer</p>
              <p className="text-heading-lg font-semibold text-black font-mono">
                {formatCurrency(theirOffer)}
              </p>
            </div>

            <ArrowRight className="w-5 h-5 text-black/20 flex-shrink-0 hidden sm:block" />

            {/* Your demand */}
            <div className="text-center">
              <p className="text-caption text-[#4a555e]/60 mb-1">Your Demand</p>
              <p className="text-heading-lg font-semibold text-black font-mono">
                {formatCurrency(demand)}
              </p>
            </div>

            {/* Gap */}
            <div className="sm:ml-auto text-center sm:text-right">
              <p className="text-caption text-[#4a555e]/60 mb-1">Gap</p>
              <p className="text-heading-lg font-semibold text-danger-600 font-mono">
                {formatCurrency(gap)}
              </p>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* 2. Generate Button / Loading                                       */}
        {/* ----------------------------------------------------------------- */}
        {!counterOffer && !isGenerating && (
          <div className="bg-panel border border-black/10 p-6">
            {claim && !claim.offer_amount ? (
              <>
                <p className="text-body font-medium text-black mb-1">
                  Offer amount required
                </p>
                <p className="text-body-sm text-[#4a555e] mb-4">
                  You need to analyze an offer before generating a counter-offer.
                </p>
                <Link href={`/claims/${claimId}/offer`}>
                  <Button size="lg" variant="outline">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Review Offer First
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button size="lg" onClick={handleGenerate}>
                  Generate Counter-Offer
                </Button>
                <p className="text-body-sm text-[#4a555e] mt-2">
                  This will generate a demand letter, talking points, and escalation
                  plan tailored to your claim.
                </p>
              </>
            )}
          </div>
        )}

        {isGenerating && (
          <div className="bg-panel border border-black/10 p-6">
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-coral animate-spin" />
              <p className="text-body text-[#4a555e]">
                {GENERATION_STEPS[generationStep]}
              </p>
            </div>
          </div>
        )}

        {error && !isGenerating && (
          <div className="bg-panel border border-black/10 p-4">
            <p className="text-body-sm text-warning-500">{error}</p>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* RESULTS                                                            */}
        {/* ----------------------------------------------------------------- */}
        {counterOffer && !isGenerating && (
          <div className="space-y-6">
            {/* -------------------------------------------------------------- */}
            {/* 3. Demand Letter                                                */}
            {/* -------------------------------------------------------------- */}
            <div className="bg-panel border border-black/10">
              <div className="px-4 sm:px-6 py-4 border-b border-black/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="text-heading font-semibold text-black">
                  Demand Letter
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 text-body-sm font-medium text-coral hover:text-coral"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1.5 text-body-sm font-medium text-coral hover:text-coral"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <pre className="whitespace-pre-wrap break-words font-mono text-caption sm:text-body-sm text-black/80 leading-relaxed overflow-x-auto">
                  {counterOffer.demand_letter}
                </pre>
              </div>
              <div className="px-4 sm:px-6 pb-4">
                <p className="text-caption text-[#4a555e]/60">
                  Replace [Your Name], [Your Address], [Your Phone Number], and
                  [Your Email] with your actual contact information before
                  sending.
                </p>
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* 4. Talking Points                                               */}
            {/* -------------------------------------------------------------- */}
            <div className="bg-panel border border-black/10">
              <div className="px-4 sm:px-6 py-4 border-b border-black/5">
                <h2 className="text-heading font-semibold text-black">
                  Talking Points
                </h2>
                <p className="text-body-sm text-[#4a555e] mt-1">
                  {counterOffer.talking_points.length} points for your call with
                  the adjuster
                </p>
              </div>
              <div className="divide-y divide-black/5">
                {counterOffer.talking_points.map((point, index) => (
                  <div key={index} className="px-4 sm:px-6 py-4 flex gap-4">
                    <span className="flex-shrink-0 text-body-sm font-semibold text-[#4a555e]/60 w-6 text-right">
                      {index + 1}.
                    </span>
                    <p className="text-body-sm text-black/80 leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* 5. Evidence                                                     */}
            {/* -------------------------------------------------------------- */}
            <div className="bg-panel border border-black/10 p-6">
              <h2 className="text-heading font-semibold text-black mb-3">
                Evidence
              </h2>
              <p className="text-body text-[#4a555e] leading-relaxed mb-4">
                {counterOffer.evidence_summary}
              </p>
              <ul className="space-y-2">
                {EVIDENCE_ITEMS.map((item, index) => (
                  <li
                    key={index}
                    className="text-body-sm text-black/80 flex items-baseline gap-2"
                  >
                    <span className="text-black/20">&bull;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* 6. Escalation Roadmap                                           */}
            {/* -------------------------------------------------------------- */}
            <div className="bg-panel border border-black/10">
              <div className="px-4 sm:px-6 py-4 border-b border-black/5">
                <h2 className="text-heading font-semibold text-black">
                  If Negotiation Fails
                </h2>
              </div>
              <div className="divide-y divide-black/5">
                {counterOffer.escalation_steps.map((step, index) => {
                  const isExpanded = expandedSteps.has(index);
                  return (
                    <div key={index}>
                      <button
                        type="button"
                        onClick={() => toggleStep(index)}
                        className="w-full px-4 sm:px-6 py-4 flex items-center justify-between gap-3 text-left hover:bg-panel-alt"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-body-sm font-semibold text-[#4a555e]/60">
                            Step {step.step}
                          </span>
                          <span className="text-body-sm font-medium text-black">
                            {step.action}
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-[#4a555e]/60 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#4a555e]/60 flex-shrink-0" />
                        )}
                      </button>
                      {isExpanded && (
                        <div className="px-4 sm:px-6 pb-4 space-y-3">
                          <p className="text-body-sm text-[#4a555e] leading-relaxed">
                            {step.description}
                          </p>
                          {step.template && (
                            <pre className="whitespace-pre-wrap break-words text-caption sm:text-body-sm text-[#4a555e] font-mono leading-relaxed bg-panel-alt border border-black/5 p-3 sm:p-4 overflow-x-auto">
                              {step.template}
                            </pre>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* 7. Next steps                                                   */}
            {/* -------------------------------------------------------------- */}
            <div className="bg-panel border border-black/10 p-5">
              <p className="text-body-sm font-medium text-[#4a555e] mb-3">What&apos;s next?</p>
              <div className="space-y-2">
                <Link
                  href={`/claims/${claimId}/call-script`}
                  className="flex items-center justify-between text-body-sm text-black hover:text-coral transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#4a555e]/60" />
                    Prepare a call script to negotiate with the adjuster
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#4a555e]/60 flex-shrink-0" />
                </Link>
                <Link
                  href={`/claims/${claimId}/export`}
                  className="flex items-center justify-between text-body-sm text-black hover:text-coral transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-3.5 h-3.5 text-[#4a555e]/60" />
                    Export your full analysis report as PDF
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#4a555e]/60 flex-shrink-0" />
                </Link>
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* 8. Disclaimer                                                   */}
            {/* -------------------------------------------------------------- */}
            <p className="text-caption text-[#4a555e]/60 leading-relaxed">
              This counter-offer package is generated for educational and
              informational purposes only and does not constitute legal advice.
              The demand letter, talking points, and escalation strategies are
              based on general best practices and the specific details of your
              claim as entered into ClaimCoach. Laws regarding insurance claims,
              diminished value, bad faith, and consumer protections vary
              significantly by state. Before sending a demand letter or taking
              any legal action, review the materials with a licensed attorney or
              public adjuster in your state. ClaimCoach is not a law firm and
              does not provide legal representation.
            </p>
          </div>
        )}
      </div>
    </ClaimLayout>
  );
}
