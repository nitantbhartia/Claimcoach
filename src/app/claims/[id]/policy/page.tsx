"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ClaimLayout } from "@/components/layout/claim-layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileUpload } from "@/components/ui/file-upload";
import { PolicyAnalysis } from "@/types";
import {
  FileSearch,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
  Shield,
  Lightbulb,
  Target,
  FileText,
  Sparkles,
  DollarSign,
  Info,
} from "lucide-react";

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
// Progress animation steps for the analysis loading state
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

  // ---- State ----
  const [policyFile, setPolicyFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysis, setAnalysis] = useState<PolicyAnalysis | null>(null);
  const [expandedRedFlags, setExpandedRedFlags] = useState<Set<number>>(
    new Set()
  );
  const [expandedTactics, setExpandedTactics] = useState<Set<number>>(
    new Set()
  );

  // ---- Handlers ----
  function handleFilesSelected(files: File[]) {
    if (files.length > 0) {
      setPolicyFile(files[0]);
    }
  }

  function handleRemoveFile() {
    setPolicyFile(null);
    setAnalysis(null);
  }

  function handleAnalyze() {
    if (!policyFile) return;
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setAnalysisProgress(0);

    // Simulate analysis progress over ~3 seconds
    const totalDuration = 3000;
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
        // Short pause at 100% before showing results
        setTimeout(() => {
          setIsAnalyzing(false);
          setAnalysis(MOCK_POLICY_ANALYSIS);
        }, 400);
      }
    }, stepDuration);
  }

  function toggleRedFlag(index: number) {
    setExpandedRedFlags((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  function toggleTactic(index: number) {
    setExpandedTactics((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
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
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100">
                    <FileSearch className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      AI Policy Analysis
                    </h1>
                    <p className="text-sm text-gray-500">
                      Upload your insurance policy and let AI uncover what you
                      are really covered for.
                    </p>
                  </div>
                </div>
              </div>
              {analysis && (
                <Badge variant="success" size="md">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Analysis Complete
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* --------------------------------------------------------------- */}
        {/* 2. Policy Upload Section                                         */}
        {/* --------------------------------------------------------------- */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">
              Policy Document
            </h2>
          </CardHeader>
          <CardContent>
            {!policyFile ? (
              /* -- No file uploaded: show prominent upload area -- */
              <div className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Upload Your Insurance Policy
                </h3>
                <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                  Upload your declarations page or full policy document as a
                  PDF. Our AI will analyze it to find coverages, hidden
                  benefits, red flags, and predict adjuster strategies.
                </p>
                <FileUpload
                  onFilesSelected={handleFilesSelected}
                  accept={{ "application/pdf": [".pdf"] }}
                  maxFiles={1}
                  maxSize={25 * 1024 * 1024}
                  hint="PDF files only. Max 25 MB."
                  className="max-w-lg mx-auto"
                />
              </div>
            ) : (
              /* -- File uploaded: show file info and analyze button -- */
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 flex-shrink-0">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {policyFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(policyFile.size / 1024).toFixed(0)} KB -- PDF Document
                    </p>
                  </div>
                  {!isAnalyzing && (
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="text-sm text-gray-500 hover:text-red-600 transition-colors flex-shrink-0"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {/* Analyze button or loading state */}
                {!analysis && !isAnalyzing && (
                  <Button size="lg" onClick={handleAnalyze} className="w-full">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Analyze My Policy
                  </Button>
                )}

                {/* Analysis progress animation */}
                {isAnalyzing && (
                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full border-2 border-purple-300 border-t-purple-600 animate-spin" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-purple-900">
                          Analyzing your policy...
                        </p>
                        <p className="text-xs text-purple-600">
                          {ANALYSIS_STEPS[analysisStep]}
                        </p>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full bg-purple-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-purple-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${analysisProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-purple-500 mt-2 text-right">
                      {analysisProgress}%
                    </p>
                  </div>
                )}

                {/* Re-analyze prompt after analysis is done */}
                {analysis && !isAnalyzing && (
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>
                      Analysis complete. Upload a different policy to re-analyze.
                    </span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* --------------------------------------------------------------- */}
        {/* ANALYSIS RESULTS (only shown after analysis completes)           */}
        {/* --------------------------------------------------------------- */}
        {analysis && (
          <>
            {/* ------------------------------------------------------------- */}
            {/* 3. Plain-English Summary                                       */}
            {/* ------------------------------------------------------------- */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Plain-English Summary
                  </h2>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {analysis.summary}
                </p>
              </CardContent>
            </Card>

            {/* ------------------------------------------------------------- */}
            {/* 4. Coverage Details                                            */}
            {/* ------------------------------------------------------------- */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-100">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Coverage Details
                    </h2>
                    <p className="text-xs text-gray-500">
                      {analysis.coverages.length} coverages identified in your
                      policy
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {analysis.coverages.map((coverage, index) => (
                    <div key={index} className="px-6 py-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {coverage.name}
                        </h3>
                        <Badge variant="info" size="sm">
                          {coverage.limit}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {coverage.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* ------------------------------------------------------------- */}
            {/* 5. Hidden Coverages Found                                      */}
            {/* ------------------------------------------------------------- */}
            <Card className="ring-2 ring-green-200">
              <CardHeader className="bg-green-50 border-b-green-200">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-100">
                    <Eye className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-green-900">
                      Hidden Coverages Found
                    </h2>
                    <p className="text-xs text-green-700">
                      {analysis.hidden_coverages.length} coverages you might not
                      know about -- these could put money back in your pocket
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-green-100">
                  {analysis.hidden_coverages.map((hidden, index) => (
                    <div key={index} className="px-6 py-5">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <h3 className="text-sm font-semibold text-gray-900">
                            {hidden.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="w-3.5 h-3.5 text-green-600" />
                          <span className="text-sm font-bold text-green-700">
                            {hidden.potential_value}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed pl-6">
                        {hidden.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* ------------------------------------------------------------- */}
            {/* 6. Red Flags                                                   */}
            {/* ------------------------------------------------------------- */}
            <Card className="ring-2 ring-red-200">
              <CardHeader className="bg-red-50 border-b-red-200">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-red-900">
                      Red Flags
                    </h2>
                    <p className="text-xs text-red-700">
                      {analysis.red_flags.length} provisions that could hurt
                      your claim -- read carefully
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-red-100">
                  {analysis.red_flags.map((flag, index) => {
                    const isExpanded = expandedRedFlags.has(index);
                    return (
                      <div key={index} className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => toggleRedFlag(index)}
                          className="w-full text-left flex items-start gap-3"
                        >
                          <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="text-sm font-semibold text-gray-900">
                                {flag.provision}
                              </h3>
                              {isExpanded ? (
                                <EyeOff className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              ) : (
                                <Eye className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              )}
                            </div>
                            {!isExpanded && (
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                {flag.risk}
                              </p>
                            )}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="mt-3 ml-7 space-y-3">
                            <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                              <p className="text-xs font-semibold text-red-800 mb-1">
                                Risk
                              </p>
                              <p className="text-sm text-red-700 leading-relaxed">
                                {flag.risk}
                              </p>
                            </div>
                            <div className="rounded-lg bg-green-50 border border-green-200 p-3">
                              <p className="text-xs font-semibold text-green-800 mb-1">
                                Your Counter-Strategy
                              </p>
                              <p className="text-sm text-green-700 leading-relaxed">
                                {flag.recommendation}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* ------------------------------------------------------------- */}
            {/* 7. Adjuster Tactics                                            */}
            {/* ------------------------------------------------------------- */}
            <Card className="ring-2 ring-orange-200">
              <CardHeader className="bg-orange-50 border-b-orange-200">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100">
                    <Target className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-orange-900">
                      Predicted Adjuster Tactics
                    </h2>
                    <p className="text-xs text-orange-700">
                      {analysis.adjuster_tactics.length} tactics the adjuster
                      may use -- and how to counter each one
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-orange-100">
                  {analysis.adjuster_tactics.map((item, index) => {
                    const isExpanded = expandedTactics.has(index);
                    return (
                      <div key={index} className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => toggleTactic(index)}
                          className="w-full text-left flex items-start gap-3"
                        >
                          <Target className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="text-sm font-semibold text-gray-900">
                                {item.tactic}
                              </h3>
                              {isExpanded ? (
                                <EyeOff className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              ) : (
                                <Eye className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              )}
                            </div>
                            {!isExpanded && (
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                {item.counter}
                              </p>
                            )}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="mt-3 ml-7">
                            <div className="rounded-lg bg-orange-50 border border-orange-200 p-4">
                              <div className="flex items-start gap-2 mb-2">
                                <Shield className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                                <p className="text-xs font-semibold text-orange-800">
                                  How to Counter This Tactic
                                </p>
                              </div>
                              <p className="text-sm text-orange-900 leading-relaxed">
                                {item.counter}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
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
                      This analysis is educational and does not constitute legal
                      advice. Insurance policies are complex legal documents and
                      their interpretation can vary by state and specific
                      circumstances. The information provided is based on a
                      general reading of your uploaded document and may not
                      capture every nuance or amendment. For decisions involving
                      significant financial amounts or legal disputes, consult
                      with a licensed insurance attorney or public adjuster in
                      your state.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </ClaimLayout>
  );
}
