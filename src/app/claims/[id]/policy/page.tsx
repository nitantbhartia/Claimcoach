"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ClaimLayout } from "@/components/layout/claim-layout";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { PolicyAnalysis } from "@/types";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";

// ---------------------------------------------------------------------------
// Mock policy analysis data -- realistic State Farm auto policy
// ---------------------------------------------------------------------------

const MOCK_POLICY_ANALYSIS: PolicyAnalysis = {
  summary:
    "This is a State Farm Select Service auto insurance policy (Policy #SF-AUTO-2024-77431) with effective dates from March 1, 2025 to September 1, 2025. The policy covers a 2022 Honda Civic EX with bodily injury liability limits of $50,000 per person / $100,000 per accident and property damage liability of $50,000. You carry collision and comprehensive coverage, each with a $500 deductible. The policy includes uninsured/underinsured motorist coverage matching your liability limits. Medical payments coverage is set at $5,000 per person. Overall, your coverage levels are moderate -- adequate for minor to mid-range accidents but potentially insufficient for serious multi-vehicle collisions or injuries requiring extended medical treatment. Your $500 deductible is standard, but you should be aware of several provisions that could reduce your payout if not handled carefully.",
  coverages: [
    {
      name: "Collision Coverage",
      limit: "$50,000 (with $500 deductible)",
      description:
        "Covers damage to your 2022 Honda Civic from collisions with other vehicles or objects regardless of fault. After you pay the $500 deductible, State Farm will pay up to the actual cash value (ACV) of your vehicle, not to exceed $50,000. Note: ACV factors in depreciation, so the payout may be less than your purchase price.",
    },
    {
      name: "Comprehensive Coverage",
      limit: "$50,000 (with $500 deductible)",
      description:
        "Covers non-collision damage including theft, vandalism, hail, flooding, fire, falling objects, and animal strikes. Same $500 deductible and ACV cap apply. Glass claims (windshield, windows) may be covered with a reduced or waived deductible under state law.",
    },
    {
      name: "Bodily Injury Liability",
      limit: "$50,000 per person / $100,000 per accident",
      description:
        "Pays for injuries you cause to others in an at-fault accident. The $50,000 per-person cap means if one person's medical bills exceed $50K, you could be personally liable for the difference. The $100,000 per-accident cap applies when multiple people are injured.",
    },
    {
      name: "Property Damage Liability",
      limit: "$50,000 per accident",
      description:
        "Covers damage you cause to other people's property (vehicles, structures, fences, etc.) in an at-fault accident. This limit is shared across all damaged property in a single incident.",
    },
    {
      name: "Uninsured/Underinsured Motorist (UM/UIM)",
      limit: "$50,000 per person / $100,000 per accident",
      description:
        "Protects you if the at-fault driver has no insurance or insufficient coverage. This is critical -- it mirrors your liability limits and covers your medical bills, lost wages, and pain and suffering when the other driver cannot pay.",
    },
    {
      name: "Medical Payments (MedPay)",
      limit: "$5,000 per person",
      description:
        "Pays medical expenses for you and your passengers regardless of who is at fault. Covers ambulance rides, ER visits, surgery, X-rays, dental work, and follow-up care. This is paid in addition to any health insurance you have.",
    },
  ],
  hidden_coverages: [
    {
      name: "Loss of Use / Rental Reimbursement",
      description:
        "Your policy includes Transportation Expense coverage (often overlooked) that reimburses you for a rental car or alternative transportation while your vehicle is being repaired after a covered loss. This pays $30 per day for up to 30 days, which translates to $900 in total rental reimbursement. Many policyholders never claim this because the adjuster won't mention it proactively.",
      potential_value: "Up to $900 ($30/day x 30 days)",
    },
    {
      name: "Diminished Value Claim",
      description:
        "Even after repairs, your vehicle's resale value has decreased because of its accident history (it now has a Carfax record). In your state, you have the right to file a diminished value claim against the at-fault driver's insurer. For a 2022 Honda Civic with moderate collision damage, diminished value typically ranges from $1,500 to $4,000 depending on severity. State Farm will not volunteer this information.",
      potential_value: "$1,500 - $4,000 (estimated for your vehicle)",
    },
    {
      name: "OEM Parts Requirement",
      description:
        "Section 7(c) of your policy states that for vehicles less than 5 years old, the insurer must use Original Equipment Manufacturer (OEM) parts unless you provide written consent for aftermarket alternatives. Your 2022 Honda Civic qualifies. If the body shop or adjuster tries to authorize cheaper aftermarket parts, you can insist on OEM parts at no additional cost to you. OEM parts maintain your vehicle's value and warranty coverage.",
      potential_value: "$300 - $1,200 savings vs. aftermarket parts",
    },
    {
      name: "Towing and Labor Coverage",
      description:
        "Your policy includes Emergency Road Service which covers towing (up to $75 per disablement) and on-scene labor like tire changes, jump starts, and lockout assistance. If you paid for towing out of pocket at the accident scene, you can be reimbursed. This also applies to any breakdowns during the policy period, not just accidents.",
      potential_value: "Up to $75 per incident",
    },
  ],
  red_flags: [
    {
      provision: "72-Hour Reporting Requirement",
      risk: "Section 4(a) requires you to report any accident to State Farm within 72 hours of the incident. Late reporting can be used as grounds to reduce or deny your claim, even if the delay did not prejudice the investigation. If you waited more than 3 days to file, the adjuster may cite this provision.",
      recommendation:
        "If you reported late, document the reason for the delay (e.g., you were hospitalized, did not realize the extent of damage, etc.). Emphasize that the delay did not hinder their investigation. In most states, the insurer must prove they were actually prejudiced by late notice to deny a claim.",
    },
    {
      provision: "Cooperation Clause",
      risk: "Section 5(b) requires you to 'cooperate fully' with State Farm's investigation, including providing recorded statements, submitting to examinations under oath, and making your vehicle available for inspection. Refusing any request -- even unreasonable ones -- can be used to claim you violated the cooperation clause and void your coverage.",
      recommendation:
        "Cooperate with reasonable requests but know your rights. You are NOT required to give a recorded statement to the other driver's insurer. For your own insurer, you can request questions in writing first. Always be truthful but concise -- do not volunteer information beyond what is asked.",
    },
    {
      provision: "Depreciation on Parts and Labor",
      risk: "The policy allows State Farm to apply 'betterment' deductions when replacing worn parts (tires, brakes, battery, suspension components). If your worn tires are replaced with new ones, they may deduct 40-60% for depreciation, arguing the new parts 'bettered' your vehicle's pre-accident condition.",
      recommendation:
        "Challenge betterment deductions aggressively. Request an itemized breakdown of every depreciation adjustment. In many states, betterment deductions are limited or prohibited for certain parts. If they depreciate your tires, ask them to find comparable used tires instead -- they typically cannot, which weakens their position.",
    },
    {
      provision: "Appraisal Clause (Dispute Resolution)",
      risk: "Section 9 contains a binding appraisal clause. If you and State Farm cannot agree on the amount of loss, either party can demand an appraisal. Each side selects an appraiser, and if they disagree, an umpire makes the final call. While this sounds fair, the process costs $300-$500 out of pocket for your appraiser, and State Farm's appraisers tend to be conservative.",
      recommendation:
        "The appraisal clause can actually work in your favor for disputes over vehicle value or repair costs. Independent appraisals typically result in 15-30% higher payouts than the insurer's initial estimate. Consider this route if the gap between your demand and their offer exceeds $1,000.",
    },
    {
      provision: "Exclusion for Pre-Existing Damage",
      risk: "Section 3(d) excludes coverage for any damage that existed before the covered loss. The adjuster may attribute some damage to prior wear and tear or previous unreported incidents, particularly if there are inconsistencies in the damage pattern.",
      recommendation:
        "Gather any pre-accident photos of your vehicle (social media posts, prior listings, dashcam footage) to prove the vehicle's condition before the accident. If you had a recent inspection or detailing, those records help establish the baseline condition.",
    },
  ],
  adjuster_tactics: [
    {
      tactic: "Quick Settlement Pressure",
      counter:
        "The adjuster may call within days offering a 'fast and fair' settlement before you fully understand your damages. They may say things like 'This offer is only available for 48 hours' or 'If we go to formal evaluation, it could take months.' This is designed to get you to accept before you discover the full extent of your losses. Counter: Never accept the first offer. Tell them you need time to assess all damages, get multiple repair estimates, and consult with professionals. There is no legitimate deadline on a fair settlement -- urgency is a pressure tactic.",
    },
    {
      tactic: "Comparable Vehicle Lowballing",
      counter:
        "State Farm will pull comparable vehicle listings to determine your car's actual cash value (ACV), but they often cherry-pick the lowest-priced comparables, include vehicles with higher mileage or in worse condition, or pull listings from cheaper markets far from your area. Counter: Run your own comparable search on KBB, Edmunds, NADA, and local dealer listings. Focus on vehicles matching your exact year, trim (EX), mileage range (+/- 5,000 miles), condition, and within a 50-mile radius. Present at least 5-6 comparables that support a higher value. If there is a gap, the appraisal clause in your policy gives you leverage.",
    },
    {
      tactic: "Recorded Statement Fishing",
      counter:
        "The adjuster will request a recorded statement and ask broad, open-ended questions designed to elicit admissions that weaken your claim. Questions like 'Could you have done anything to avoid the accident?' or 'Were you distracted at all?' are traps. Even innocent answers like 'I was changing the radio station' can be used against you. Counter: You are not legally required to give a recorded statement to the other party's insurer. For your own insurer, keep answers short and factual. Stick to the facts of the incident -- do not speculate, guess, or offer opinions about fault.",
    },
    {
      tactic: "Delaying Tactics to Wear You Down",
      counter:
        "Adjusters often delay responses, request redundant paperwork, 'lose' documents, or transfer your claim to a new adjuster -- all to frustrate you into accepting a lower offer. State Farm handles millions of claims and knows that most people give up after 2-3 months of delays. Counter: Document every interaction with dates and times. Send a follow-up email after every phone call summarizing what was discussed. If you experience unreasonable delays, file a complaint with your state's Department of Insurance. Mention in writing that you are aware of your state's bad faith insurance laws -- this often accelerates the process significantly.",
    },
    {
      tactic: "Splitting Liability to Reduce Payout",
      counter:
        "Even in a clear-cut accident, the adjuster may claim you share partial fault to reduce the payout. In comparative negligence states, if they assign you 20% fault, your payout drops by 20%. They may cite your speed, following distance, or failure to take evasive action -- even without evidence. Counter: Obtain the police report, which typically assigns fault. Gather witness statements and any dashcam or surveillance footage. If the police report supports your version, firmly reject any liability assignment. Quote the specific evidence: 'The police report on page 2 states the other driver ran the red light. I reject your 20% fault assessment and request you revise it to 0%.'",
    },
  ],
};

// ---------------------------------------------------------------------------
// Analysis loading steps
// ---------------------------------------------------------------------------

const ANALYSIS_STEPS = [
  "Extracting policy text with OCR...",
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
      // Read file as text for the API
      const text = await policyFile.text();

      const res = await fetch("/api/ai/analyze-policy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ policyText: text }),
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
      // Fall back to mock data so app works without API key
      console.warn("API call failed, using mock data:", err);
      setAnalysis(MOCK_POLICY_ANALYSIS);
      setError("Live AI analysis unavailable. Showing sample analysis.");
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

  // ---- Upload state (no analysis yet) ----
  if (!analysis && !isAnalyzing) {
    return (
      <ClaimLayout claimId={claimId}>
        <div className="space-y-6">
          <div>
            <h1 className="text-heading-lg text-zinc-900">Policy Analysis</h1>
            <p className="text-body text-zinc-500 mt-1">
              Upload your insurance policy document and our AI will analyze your
              coverages, find hidden benefits, and identify provisions that could
              affect your claim.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-zinc-200 shadow-card p-6">
            <FileUpload
              onFilesSelected={handleFilesSelected}
              accept={{ "application/pdf": [".pdf"] }}
              maxFiles={1}
              maxSize={25 * 1024 * 1024}
              hint="PDF files only. Max 25 MB."
            />

            {policyFile && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-body-sm text-zinc-500 truncate">
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

  // ---- Loading state ----
  if (isAnalyzing) {
    return (
      <ClaimLayout claimId={claimId}>
        <div className="flex items-center justify-center py-24">
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-brand-500 animate-spin" />
            <p className="text-body-sm text-zinc-500">
              {ANALYSIS_STEPS[analysisStep]}
            </p>
          </div>
        </div>
      </ClaimLayout>
    );
  }

  // ---- Results ----
  if (!analysis) return null;

  return (
    <ClaimLayout claimId={claimId}>
      <div className="space-y-6">
        <h1 className="text-heading-lg text-zinc-900">Policy Analysis</h1>

        {/* Summary */}
        <section className="bg-white rounded-lg border border-zinc-200 shadow-card p-6">
          <h2 className="text-heading text-zinc-900 mb-3">Summary</h2>
          <p className="text-body text-zinc-600 leading-relaxed">
            {analysis.summary}
          </p>
        </section>

        {/* Coverages */}
        <section className="bg-white rounded-lg border border-zinc-200 shadow-card">
          <div className="p-6 pb-0">
            <h2 className="text-heading text-zinc-900">Your Coverage</h2>
          </div>
          <div className="mt-4">
            {analysis.coverages.map((coverage, i) => (
              <div
                key={i}
                className={`px-6 py-4 ${i !== analysis.coverages.length - 1 ? "border-b border-zinc-100" : ""}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <p className="text-body font-medium text-zinc-900">
                    {coverage.name}
                  </p>
                  <p className="text-body-sm text-zinc-500">{coverage.limit}</p>
                </div>
                <p className="text-body-sm text-zinc-600 mt-1 leading-relaxed">
                  {coverage.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Hidden coverages */}
        <section className="bg-white rounded-lg border border-zinc-200 shadow-card">
          <div className="p-6 pb-0">
            <h2 className="text-heading text-zinc-900">
              Coverages You Might Be Missing
            </h2>
          </div>
          <div className="mt-4">
            {analysis.hidden_coverages.map((hidden, i) => (
              <div
                key={i}
                className={`px-6 py-4 ${i !== analysis.hidden_coverages.length - 1 ? "border-b border-zinc-100" : ""}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <p className="text-body font-medium text-zinc-900">
                    {hidden.name}
                  </p>
                  <p className="text-body-sm text-brand-500 font-medium">
                    {hidden.potential_value}
                  </p>
                </div>
                <p className="text-body-sm text-zinc-600 mt-1 leading-relaxed">
                  {hidden.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Red flags */}
        <section className="bg-white rounded-lg border border-zinc-200 shadow-card">
          <div className="p-6 pb-0">
            <h2 className="text-heading text-zinc-900">Watch Out For</h2>
          </div>
          <div className="mt-4">
            {analysis.red_flags.map((flag, i) => {
              const expanded = expandedRedFlags.has(i);
              return (
                <div
                  key={i}
                  className={`${i !== analysis.red_flags.length - 1 ? "border-b border-zinc-100" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedRedFlags((prev) => toggle(prev, i))
                    }
                    className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-zinc-50 transition-colors"
                  >
                    <p className="text-body font-medium text-zinc-900">
                      {flag.provision}
                    </p>
                    {expanded ? (
                      <ChevronUp className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    )}
                  </button>
                  {expanded && (
                    <div className="px-6 pb-5 space-y-3">
                      <div>
                        <p className="text-body-sm font-medium text-zinc-700 mb-1">
                          Risk
                        </p>
                        <p className="text-body-sm text-zinc-600 leading-relaxed">
                          {flag.risk}
                        </p>
                      </div>
                      <div>
                        <p className="text-body-sm font-medium text-zinc-700 mb-1">
                          Recommendation
                        </p>
                        <p className="text-body-sm text-zinc-600 leading-relaxed">
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
        <section className="bg-white rounded-lg border border-zinc-200 shadow-card">
          <div className="p-6 pb-0">
            <h2 className="text-heading text-zinc-900">
              Predicted Adjuster Tactics
            </h2>
          </div>
          <div className="mt-4">
            {analysis.adjuster_tactics.map((item, i) => {
              const expanded = expandedTactics.has(i);
              return (
                <div
                  key={i}
                  className={`${i !== analysis.adjuster_tactics.length - 1 ? "border-b border-zinc-100" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedTactics((prev) => toggle(prev, i))
                    }
                    className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-zinc-50 transition-colors"
                  >
                    <p className="text-body font-medium text-zinc-900">
                      {item.tactic}
                    </p>
                    {expanded ? (
                      <ChevronUp className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    )}
                  </button>
                  {expanded && (
                    <div className="px-6 pb-5">
                      <p className="text-body-sm font-medium text-zinc-700 mb-1">
                        Counter-strategy
                      </p>
                      <p className="text-body-sm text-zinc-600 leading-relaxed">
                        {item.counter}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Disclaimer */}
        <p className="text-caption text-zinc-400">
          This analysis is educational and does not constitute legal advice.
          Insurance policies are complex legal documents and their
          interpretation can vary by state and specific circumstances. For
          decisions involving significant financial amounts or legal disputes,
          consult with a licensed insurance attorney or public adjuster in your
          state.
        </p>
      </div>
    </ClaimLayout>
  );
}
