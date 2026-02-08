"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ClaimLayout } from "@/components/layout/claim-layout";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { PolicyAnalysis, Claim } from "@/types";
import { Chat } from "@/components/ui/chat";
import { ChevronDown, ChevronUp, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { LiveAudit } from "@/components/ui/live-audit";

// ---------------------------------------------------------------------------
// Analysis loading steps
// ---------------------------------------------------------------------------

const ANALYSIS_STEPS = [
  "Extracting text from PDF...",
  "Identifying coverage sections...",
  "Analyzing coverage limits and deductibles...",
  "Scanning for hidden coverages...",
  "Detecting red-flag provisions...",
  "Modeling likely adjuster tactics...",
  "Generating plain-English summary...",
  "Finalizing your analysis...",
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function PolicyAnalysisPage() {
  const params = useParams<{ id: string }>();
  const claimId = params.id;

  const [policyFile, setPolicyFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysis, setAnalysis] = useState<PolicyAnalysis | null>(null);
  const [expandedRedFlags, setExpandedRedFlags] = useState<Set<number>>(
    new Set()
  );
  const [expandedTactics, setExpandedTactics] = useState<Set<number>>(
    new Set()
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoadingClaim, setIsLoadingClaim] = useState(true);

  // Fetch claim data on mount to check for cached policy analysis
  useEffect(() => {
    async function fetchClaim() {
      try {
        const res = await fetch(`/api/claims/${claimId}`);
        if (!res.ok) {
          throw new Error("Failed to load claim data");
        }
        const data = await res.json();
        if (data.policyAnalysis) {
          setAnalysis(data.policyAnalysis as PolicyAnalysis);
        }
      } catch (err) {
        console.error("Failed to fetch claim:", err);
      } finally {
        setIsLoadingClaim(false);
      }
    }

    fetchClaim();
  }, [claimId]);

  function handleFilesSelected(files: File[]) {
    if (files.length > 0) setPolicyFile(files[0]);
  }

  async function handleAnalyze() {
    if (!policyFile) return;
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setError(null);

    // Cycle through step labels while waiting
    let current = 0;
    const stepInterval = setInterval(() => {
      current = (current + 1) % ANALYSIS_STEPS.length;
      setAnalysisStep(current);
    }, 2000);

    try {
      // Step 1: Extract text from PDF
      let policyText: string;

      if (policyFile.type === "application/pdf") {
        const formData = new FormData();
        formData.append("file", policyFile);

        const extractRes = await fetch("/api/ai/extract-pdf", {
          method: "POST",
          body: formData,
        });

        if (!extractRes.ok) {
          const extractData = await extractRes.json().catch(() => ({}));
          throw new Error(extractData.error || "PDF text extraction failed");
        }

        const extractData = await extractRes.json();
        policyText = extractData.text;
      } else {
        // Fallback: read file as text for non-PDF files
        policyText = await policyFile.text();
      }

      // Step 2: Send extracted text for AI analysis
      const res = await fetch("/api/ai/analyze-policy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ policyText }),
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
      setError(
        err instanceof Error ? err.message : "Analysis failed. Please try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

  function toggle(set: Set<number>, index: number): Set<number> {
    const next = new Set(set);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    return next;
  }

  // ---- Initial loading state ----
  if (isLoadingClaim) {
    return (
      <ClaimLayout claimId={claimId}>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-[#4a555e]" />
          <span className="ml-3 text-body text-[#4a555e]">
            Loading claim data...
          </span>
        </div>
      </ClaimLayout>
    );
  }

  // ---- Upload state (no analysis yet) ----
  if (!analysis && !isAnalyzing) {
    return (
      <ClaimLayout claimId={claimId}>
        <div className="space-y-6">
          <div>
            <h1 className="text-heading-lg text-black">Policy Analysis</h1>
            <p className="text-body text-[#4a555e] mt-1">
              Upload your insurance policy document and our AI will analyze your
              coverages, find hidden benefits, and identify provisions that could
              affect your claim.
            </p>
          </div>

          <div className="bg-panel border border-black/10 p-6">
            <FileUpload
              onFilesSelected={handleFilesSelected}
              accept={{ "application/pdf": [".pdf"] }}
              maxFiles={1}
              maxSize={25 * 1024 * 1024}
              hint="PDF files only. Max 25 MB."
            />

            {policyFile && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-body-sm text-[#4a555e] truncate">
                  {policyFile.name} --{" "}
                  {(policyFile.size / 1024).toFixed(0)} KB
                </p>
                <Button onClick={handleAnalyze}>Analyze</Button>
              </div>
            )}

            {error && (
              <p className="text-body-sm text-warning-500 mt-3">{error}</p>
            )}
          </div>
        </div>
      </ClaimLayout>
    );
  }

  // ---- Loading state: Live Audit ----
  if (isAnalyzing) {
    return (
      <ClaimLayout claimId={claimId}>
        <div className="space-y-4">
          <div>
            <h1 className="text-heading-lg text-black">Policy Analysis</h1>
            <p className="text-body-sm text-[#4a555e] mt-1">
              Our AI is reading your policy document...
            </p>
          </div>
          <LiveAudit totalPages={42} duration={14000} />
        </div>
      </ClaimLayout>
    );
  }

  // ---- Results ----
  if (!analysis) return null;

  return (
    <ClaimLayout claimId={claimId}>
      <div className="space-y-6">
        <h1 className="text-heading-lg text-black">Policy Analysis</h1>

        {/* Summary */}
        <section className="bg-panel border border-black/10 p-6">
          <h2 className="text-heading text-black mb-3">Summary</h2>
          <p className="text-body text-[#4a555e] leading-relaxed">
            {analysis.summary}
          </p>
        </section>

        {/* Coverages */}
        <section className="bg-panel border border-black/10">
          <div className="p-6 pb-0">
            <h2 className="text-heading text-black">Your Coverage</h2>
          </div>
          <div className="mt-4">
            {analysis.coverages.map((coverage, i) => (
              <div
                key={i}
                className={`px-6 py-4 ${i !== analysis.coverages.length - 1 ? "border-b border-black/10" : ""}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <p className="text-body font-medium text-black">
                    {coverage.name}
                  </p>
                  <p className="text-body-sm text-[#4a555e]">{coverage.limit}</p>
                </div>
                <p className="text-body-sm text-[#4a555e] mt-1 leading-relaxed">
                  {coverage.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Hidden coverages */}
        <section className="bg-panel border border-black/10">
          <div className="p-6 pb-0">
            <h2 className="text-heading text-black">
              Coverages You Might Be Missing
            </h2>
          </div>
          <div className="mt-4">
            {analysis.hidden_coverages.map((hidden, i) => (
              <div
                key={i}
                className={`px-6 py-4 ${i !== analysis.hidden_coverages.length - 1 ? "border-b border-black/10" : ""}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <p className="text-body font-medium text-black">
                    {hidden.name}
                  </p>
                  <p className="text-body-sm text-black font-medium">
                    {hidden.potential_value}
                  </p>
                </div>
                <p className="text-body-sm text-[#4a555e] mt-1 leading-relaxed">
                  {hidden.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Red flags */}
        <section className="bg-panel border border-black/10">
          <div className="p-6 pb-0">
            <h2 className="text-heading text-black">Watch Out For</h2>
          </div>
          <div className="mt-4">
            {analysis.red_flags.map((flag, i) => {
              const expanded = expandedRedFlags.has(i);
              return (
                <div
                  key={i}
                  className={`${i !== analysis.red_flags.length - 1 ? "border-b border-black/10" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedRedFlags((prev) => toggle(prev, i))
                    }
                    className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-panel-alt transition-colors"
                  >
                    <p className="text-body font-medium text-black">
                      {flag.provision}
                    </p>
                    {expanded ? (
                      <ChevronUp className="w-4 h-4 text-[#4a555e] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#4a555e] flex-shrink-0" />
                    )}
                  </button>
                  {expanded && (
                    <div className="px-6 pb-5 space-y-3">
                      <div>
                        <p className="text-body-sm font-medium text-[#4a555e] mb-1">
                          Risk
                        </p>
                        <p className="text-body-sm text-[#4a555e] leading-relaxed">
                          {flag.risk}
                        </p>
                      </div>
                      <div>
                        <p className="text-body-sm font-medium text-[#4a555e] mb-1">
                          Recommendation
                        </p>
                        <p className="text-body-sm text-[#4a555e] leading-relaxed">
                          {flag.recommendation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Adjuster tactics */}
        <section className="bg-panel border border-black/10">
          <div className="p-6 pb-0">
            <h2 className="text-heading text-black">
              Predicted Adjuster Tactics
            </h2>
          </div>
          <div className="mt-4">
            {analysis.adjuster_tactics.map((item, i) => {
              const expanded = expandedTactics.has(i);
              return (
                <div
                  key={i}
                  className={`${i !== analysis.adjuster_tactics.length - 1 ? "border-b border-black/10" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedTactics((prev) => toggle(prev, i))
                    }
                    className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-panel-alt transition-colors"
                  >
                    <p className="text-body font-medium text-black">
                      {item.tactic}
                    </p>
                    {expanded ? (
                      <ChevronUp className="w-4 h-4 text-[#4a555e] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#4a555e] flex-shrink-0" />
                    )}
                  </button>
                  {expanded && (
                    <div className="px-6 pb-5">
                      <p className="text-body-sm font-medium text-[#4a555e] mb-1">
                        Counter-strategy
                      </p>
                      <p className="text-body-sm text-[#4a555e] leading-relaxed">
                        {item.counter}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Next steps */}
        <div className="bg-panel border border-black/10 p-5">
          <p className="text-body-sm font-medium text-[#4a555e] mb-3">What&apos;s next?</p>
          <div className="space-y-2">
            <Link
              href={`/claims/${claimId}/offer`}
              className="flex items-center justify-between text-body-sm text-black hover:text-black transition-colors"
            >
              Analyze the insurer&apos;s settlement offer
              <ArrowRight className="w-3.5 h-3.5 text-[#4a555e] flex-shrink-0" />
            </Link>
            <Link
              href={`/claims/${claimId}/documents`}
              className="flex items-center justify-between text-body-sm text-black hover:text-black transition-colors"
            >
              Upload supporting documentation
              <ArrowRight className="w-3.5 h-3.5 text-[#4a555e] flex-shrink-0" />
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-caption text-[#4a555e]">
          This analysis is educational and does not constitute legal advice.
          Insurance policies are complex legal documents and their
          interpretation can vary by state and specific circumstances. For
          decisions involving significant financial amounts or legal disputes,
          consult with a licensed insurance attorney or public adjuster in your
          state.
        </p>
      </div>

      {/* Chat for follow-up questions */}
      <Chat context={JSON.stringify(analysis)} />
    </ClaimLayout>
  );
}
