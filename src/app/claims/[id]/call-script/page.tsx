"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ClaimLayout } from "@/components/layout/claim-layout";
import { Button } from "@/components/ui/button";
import { Claim, CallScript, CounterOffer } from "@/types";
import { Loader2, Phone, Copy, Check, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, ArrowRight } from "lucide-react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Loading steps
// ---------------------------------------------------------------------------

const GENERATION_STEPS = [
  "Analyzing your claim details...",
  "Reviewing offer analysis and gap data...",
  "Preparing negotiation strategies...",
  "Writing call opening and key points...",
  "Generating objection handlers...",
  "Finalizing your call script...",
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function CallScriptPage() {
  const params = useParams<{ id: string }>();
  const claimId = params.id;

  const [claim, setClaim] = useState<Claim | null>(null);
  const [counterOffer, setCounterOffer] = useState<CounterOffer | null>(null);
  const [loadingClaim, setLoadingClaim] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [script, setScript] = useState<CallScript | null>(null);
  const [expandedPoints, setExpandedPoints] = useState<Set<number>>(new Set());
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch claim data on mount
  useEffect(() => {
    async function fetchClaim() {
      try {
        const res = await fetch(`/api/claims/${claimId}`);
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Failed to load claim");
        }
        const data = await res.json();
        setClaim(data.claim);
        setCounterOffer(data.counterOffer ?? null);
      } catch (err) {
        setLoadError(
          err instanceof Error ? err.message : "Failed to load claim data"
        );
      } finally {
        setLoadingClaim(false);
      }
    }
    fetchClaim();
  }, [claimId]);

  async function handleGenerate() {
    if (!claim) return;

    setIsGenerating(true);
    setGenerationStep(0);
    setScript(null);
    setError(null);

    let current = 0;
    const stepInterval = setInterval(() => {
      current = (current + 1) % GENERATION_STEPS.length;
      setGenerationStep(current);
    }, 1500);

    try {
      const res = await fetch("/api/ai/generate-call-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerAmount: claim.offer_amount,
          demandAmount:
            counterOffer?.demand_amount ??
            (claim.offer_amount
              ? Math.round(claim.offer_amount * 2.4)
              : 0),
          vehicleInfo: [
            claim.vehicle_year,
            claim.vehicle_make,
            claim.vehicle_model,
          ]
            .filter(Boolean)
            .join(" "),
          insurerName: claim.insurer_name,
          state: "",
        }),
      });

      clearInterval(stepInterval);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Generation failed");
      }

      const data = await res.json();
      setScript(data.script);
    } catch (err) {
      clearInterval(stepInterval);
      setError(
        err instanceof Error ? err.message : "Generation failed. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  }

  function togglePoint(index: number) {
    setExpandedPoints((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  function handleCopyAll() {
    if (!script) return;
    const text = [
      "CALL SCRIPT — Insurance Claim Negotiation\n",
      "OPENING:",
      script.opening,
      "\nKEY POINTS:",
      ...script.key_points.map(
        (p, i) =>
          `\n${i + 1}. ${p.topic}\nSay: ${p.what_to_say}\nIf they say: ${p.if_they_say}\nYour response: ${p.your_response}`
      ),
      "\nCLOSING:",
      script.closing,
      "\nDO:",
      ...script.dos.map((d) => `• ${d}`),
      "\nDON'T:",
      ...script.donts.map((d) => `• ${d}`),
    ].join("\n");

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  // Loading state while fetching claim data
  if (loadingClaim) {
    return (
      <ClaimLayout claimId={claimId}>
        <div className="bg-panel border border-black/10 p-6">
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-coral animate-spin" />
            <p className="text-body text-[#4a555e]">Loading claim data...</p>
          </div>
        </div>
      </ClaimLayout>
    );
  }

  // Error loading claim data
  if (loadError || !claim) {
    return (
      <ClaimLayout claimId={claimId}>
        <div className="bg-panel border border-black/10 p-6">
          <p className="text-body text-danger-600">
            {loadError || "Claim not found."}
          </p>
        </div>
      </ClaimLayout>
    );
  }

  return (
    <ClaimLayout claimId={claimId}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-panel border border-black/10 p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-coral/10 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-coral" />
            </div>
            <div>
              <h1 className="text-heading-lg sm:text-display-sm font-semibold text-black">
                Call Script
              </h1>
              <p className="text-body text-[#4a555e] mt-1">
                A step-by-step phone script with exact talking points, objection
                handlers, and behavioral tips for your adjuster call.
              </p>
            </div>
          </div>
        </div>

        {/* Generate button */}
        {!script && !isGenerating && (
          <div className="bg-panel border border-black/10 p-6">
            <Button size="lg" onClick={handleGenerate}>
              <Phone className="w-4 h-4 mr-2" />
              Generate Call Script
            </Button>
            <p className="text-body-sm text-[#4a555e] mt-2">
              Based on your offer analysis and counter-offer data.
            </p>
          </div>
        )}

        {/* Loading */}
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

        {/* Results */}
        {script && !isGenerating && (
          <div className="space-y-6">
            {/* Copy all button */}
            <div className="flex justify-end">
              <button
                onClick={handleCopyAll}
                className="inline-flex items-center gap-1.5 text-body-sm font-medium text-coral hover:text-coral"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy full script"}
              </button>
            </div>

            {/* Opening */}
            <div className="bg-panel border border-black/10 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-caption font-semibold uppercase tracking-wider text-coral">
                  Opening
                </span>
              </div>
              <p className="text-body text-[#4a555e] leading-relaxed italic">
                &ldquo;{script.opening}&rdquo;
              </p>
            </div>

            {/* Key Points */}
            <div className="bg-panel border border-black/10">
              <div className="px-5 sm:px-6 py-4 border-b border-black/5">
                <h2 className="text-heading font-semibold text-black">
                  Key Negotiation Points
                </h2>
                <p className="text-body-sm text-[#4a555e] mt-0.5">
                  Tap each point to see objection handlers
                </p>
              </div>
              <div className="divide-y divide-black/5">
                {script.key_points.map((point, i) => {
                  const expanded = expandedPoints.has(i);
                  return (
                    <div key={i}>
                      <button
                        type="button"
                        onClick={() => togglePoint(i)}
                        className="w-full px-5 sm:px-6 py-4 flex items-start justify-between gap-3 text-left hover:bg-panel-alt transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-body-sm font-semibold text-coral flex-shrink-0 mt-0.5">
                            {i + 1}.
                          </span>
                          <div>
                            <p className="text-body font-medium text-black">
                              {point.topic}
                            </p>
                            {!expanded && (
                              <p className="text-body-sm text-[#4a555e] mt-1 line-clamp-2">
                                {point.what_to_say}
                              </p>
                            )}
                          </div>
                        </div>
                        {expanded ? (
                          <ChevronUp className="w-4 h-4 text-[#4a555e]/60 flex-shrink-0 mt-1" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#4a555e]/60 flex-shrink-0 mt-1" />
                        )}
                      </button>
                      {expanded && (
                        <div className="px-5 sm:px-6 pb-5 space-y-4 ml-8">
                          <div>
                            <p className="text-caption font-semibold uppercase tracking-wider text-[#4a555e]/60 mb-1.5">
                              What to say
                            </p>
                            <p className="text-body-sm text-[#4a555e] leading-relaxed">
                              {point.what_to_say}
                            </p>
                          </div>
                          <div className="bg-coral/5 border border-coral/20 p-3">
                            <p className="text-caption font-semibold uppercase tracking-wider text-coral mb-1.5">
                              If they say...
                            </p>
                            <p className="text-body-sm text-black leading-relaxed italic">
                              &ldquo;{point.if_they_say}&rdquo;
                            </p>
                          </div>
                          <div className="bg-ice-50 border border-ice-200 p-3">
                            <p className="text-caption font-semibold uppercase tracking-wider text-coral mb-1.5">
                              Your response
                            </p>
                            <p className="text-body-sm text-black leading-relaxed">
                              {point.your_response}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Closing */}
            <div className="bg-panel border border-black/10 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-caption font-semibold uppercase tracking-wider text-coral">
                  Closing
                </span>
              </div>
              <p className="text-body text-[#4a555e] leading-relaxed italic">
                &ldquo;{script.closing}&rdquo;
              </p>
            </div>

            {/* Dos and Don'ts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-panel border border-black/10 p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ThumbsUp className="w-4 h-4 text-success-600" />
                  <h3 className="text-heading font-semibold text-black">Do</h3>
                </div>
                <ul className="space-y-2.5">
                  {script.dos.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-body-sm text-[#4a555e]">
                      <span className="text-success-500 mt-0.5 flex-shrink-0">&bull;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-panel border border-black/10 p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ThumbsDown className="w-4 h-4 text-danger-600" />
                  <h3 className="text-heading font-semibold text-black">Don&apos;t</h3>
                </div>
                <ul className="space-y-2.5">
                  {script.donts.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-body-sm text-[#4a555e]">
                      <span className="text-danger-500 mt-0.5 flex-shrink-0">&bull;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Next steps */}
            <div className="bg-panel border border-black/10 p-5">
              <p className="text-body-sm font-medium text-[#4a555e] mb-3">What&apos;s next?</p>
              <div className="space-y-2">
                <Link
                  href={`/claims/${claimId}/counter`}
                  className="flex items-center justify-between text-body-sm text-black hover:text-coral transition-colors"
                >
                  Send a formal counter-offer with your demand letter
                  <ArrowRight className="w-3.5 h-3.5 text-[#4a555e]/60 flex-shrink-0" />
                </Link>
                <Link
                  href={`/claims/${claimId}/export`}
                  className="flex items-center justify-between text-body-sm text-black hover:text-coral transition-colors"
                >
                  Export your full analysis report as PDF
                  <ArrowRight className="w-3.5 h-3.5 text-[#4a555e]/60 flex-shrink-0" />
                </Link>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-caption text-[#4a555e]/60 leading-relaxed">
              This call script is for educational purposes and does not
              constitute legal advice. Adjust the script to match your specific
              situation and communication style. If the negotiation becomes
              adversarial or involves significant amounts, consider consulting
              with a licensed attorney or public adjuster.
            </p>
          </div>
        )}
      </div>
    </ClaimLayout>
  );
}
