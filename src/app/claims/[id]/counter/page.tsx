"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ClaimLayout } from "@/components/layout/claim-layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CounterOffer } from "@/types";
import { formatCurrency } from "@/lib/utils";
import {
  Scale,
  FileText,
  MessageSquare,
  Package,
  AlertTriangle,
  ArrowRight,
  Copy,
  Download,
  CheckCircle2,
  Phone,
  Building2,
  Gavel,
  UserCheck,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Mock counter-offer data -- based on $4,200 offer + $5,781 gap
// ---------------------------------------------------------------------------

const MOCK_COUNTER_OFFER: CounterOffer = {
  demand_amount: 9981,
  demand_letter: `RE: Settlement Demand -- Claim #SF-2025-88431
Insured Vehicle: 2022 Honda Civic EX
Date of Loss: November 14, 2025
Policy Number: SF-AUTO-2024-77431

Dear State Farm Claims Department,

I am writing in response to your settlement offer of $4,200 for the above-referenced claim. After careful review of the offer, comparable market data, and applicable damages, I respectfully reject this amount as it significantly undervalues my claim. I am submitting a formal demand for $9,981 based on the following itemized assessment.

VEHICLE BASE VALUE: $6,800

Your offer of $4,200 does not reflect the true fair market value of my 2022 Honda Civic EX with approximately 28,000 miles in good condition prior to the accident. I have obtained the following independent valuations:

- Kelley Blue Book Fair Market Range: $6,500 - $7,200
- NADA Clean Retail Value: $6,900
- Local comparable listings (3 vehicles within 50 miles): Average asking price of $7,100

The vehicles used in your valuation appear to include models with significantly higher mileage, lower trim levels (LX vs. my EX), and listings from markets outside my geographic area. I request that you use comparable vehicles matching my exact year, trim, mileage range (+/- 5,000 miles), and within a 50-mile radius of my zip code, consistent with industry standard valuation methodology.

Based on the preponderance of market evidence, the fair base value of my vehicle is $6,800, representing the conservative midpoint of the available data.

LOSS OF USE / RENTAL REIMBURSEMENT: $720

My policy includes Transportation Expense coverage at $30 per day for up to 30 days. I was without my vehicle for 24 days during the repair evaluation and settlement process (November 14 through December 8, 2025). This coverage was not included in your settlement offer. I am entitled to $720 (24 days x $30/day) under the terms of my policy.

DIMINISHED VALUE: $1,800

As a result of the accident, my vehicle now carries a permanent accident history on its Carfax and AutoCheck reports, which materially reduces its resale value regardless of the quality of repairs performed. Based on the 17c diminished value formula and comparable pre/post-accident sales data, the diminished value of my 2022 Honda Civic is conservatively estimated at $1,800, representing approximately a 10-15% reduction in value typical for vehicles of this age and value with moderate collision damage.

Diminished value is a recognized element of damages in our state, and I reserve all rights to pursue this claim against the at-fault party's insurer.

SALES TAX ON REPLACEMENT VEHICLE: $476

In the event my vehicle is deemed a total loss or I am required to purchase a replacement vehicle, I will incur sales tax at the state rate of 7%, which on the fair vehicle value of $6,800 amounts to $476. This is a direct and foreseeable cost of replacing my vehicle and should be included in the settlement.

REGISTRATION AND TITLE TRANSFER FEES: $185

Replacing my vehicle will require payment of state registration ($120), title transfer ($15), and plate transfer ($50) fees totaling $185. These are standard costs associated with vehicle replacement that are recoverable as part of a fair settlement.

TOTAL DEMAND: $9,981

The itemized total of my claim is as follows:

  Vehicle Base Value:           $6,800
  Loss of Use / Rental:         $  720
  Diminished Value:             $1,800
  Sales Tax on Replacement:     $  476
  Registration / Title Fees:    $  185
  ----------------------------------------
  TOTAL:                        $9,981

I believe this demand is fair, reasonable, and fully supported by the enclosed documentation and market data. I request that State Farm review this demand and respond within 15 business days with a revised settlement offer.

Please be advised that if we are unable to reach a fair resolution, I am prepared to pursue all available remedies including invoking the appraisal clause under Section 9 of my policy, filing a complaint with the State Department of Insurance, and consulting with legal counsel regarding potential bad faith claims practices.

I look forward to resolving this matter promptly and amicably.

Sincerely,
[Your Name]
[Your Address]
[Your Phone Number]
[Your Email]

Enclosures:
- KBB Fair Market Value Report
- NADA Valuation Report
- 3 Local Comparable Vehicle Listings
- Rental Reimbursement Receipts (24 days)
- Diminished Value Assessment
- State DMV Fee Schedule`,
  talking_points: [
    "Open by stating your claim number and that you are calling to discuss the settlement offer. Be professional and calm -- adjusters respond better to organized, confident claimants than emotional ones.",
    "Reference specific comparable vehicles: 'I found three 2022 Honda Civic EX models within 50 miles listed at $6,900, $7,200, and $7,200. Can you explain why your valuation of $4,200 is $2,600 below the lowest comparable listing?'",
    "Ask the adjuster to identify the specific comparable vehicles they used: 'Can you provide me with the VINs, mileage, trim level, and condition of the comparable vehicles used in your valuation?' This often reveals they used lower-trim or higher-mileage vehicles.",
    "Address the missing line items directly: 'Your offer does not include loss of use, diminished value, sales tax, or registration fees. My policy provides $30/day for rental reimbursement, and I was without my vehicle for 24 days. That alone is $720 you owe me under the policy terms.'",
    "Use the silence technique: After making your key points, stop talking. Do not fill the silence. Adjusters are trained to wait for you to negotiate against yourself. Make your demand and let them respond.",
    "If they say 'This is the best we can do,' respond with: 'I understand that may be your current position, but the market data does not support it. I have documented comparables from KBB, NADA, and local dealers all showing values between $6,500 and $7,200. I need you to explain the specific basis for your lower valuation.'",
    "If they push back on diminished value, say: 'My vehicle now has an accident on its Carfax, which reduces its resale value by 10-15%. This is a recognized element of damages in our state. If you are disputing the diminished value, please provide your own assessment rather than simply excluding it.'",
    "Close by setting a deadline: 'I have sent a formal demand letter for $9,981 with full documentation. I would like a revised offer within 15 business days. If we cannot reach an agreement, I will invoke the appraisal clause in my policy and file a complaint with the State Department of Insurance.'",
  ],
  evidence_summary:
    "Your counter-offer package includes the following compiled evidence: (1) Kelley Blue Book Fair Market Value report showing $6,500-$7,200 range for your 2022 Honda Civic EX with 28,000 miles; (2) NADA Guides Clean Retail valuation of $6,900; (3) Three local comparable vehicle listings within 50 miles averaging $7,100 (Honda of Springfield at $6,900/31,200mi, AutoNation Honda at $7,200/26,800mi, Carvana at $7,200/29,500mi); (4) Rental reimbursement documentation for 24 days at $30/day per your policy's Transportation Expense coverage; (5) Diminished value assessment based on the 17c formula showing $1,800 estimated loss; (6) State DMV fee schedule documenting $185 in registration and title transfer costs; (7) State sales tax rate documentation (7%) applied to fair vehicle value; (8) All photographs and repair estimates previously submitted to State Farm.",
  escalation_steps: [
    {
      step: 1,
      action: "Request a Supervisor Review",
      description:
        "If the initial adjuster refuses to meaningfully increase the offer after receiving your demand letter, request that your claim be escalated to a claims supervisor or team lead. Supervisors typically have higher settlement authority and more experience evaluating documented demands. When requesting escalation, remain professional: 'I appreciate your time, but I believe the documented market data supports a significantly higher value. I would like to request a review by your supervisor before we explore other options.'",
      template:
        "Subject: Request for Supervisor Review -- Claim #SF-2025-88431\n\nDear [Adjuster Name],\n\nThank you for your continued communication regarding the above claim. As we have been unable to reach agreement on a fair settlement amount, I respectfully request that my claim be escalated to a claims supervisor for review.\n\nI have provided documented market comparables from KBB, NADA, and local listings, as well as itemized damages totaling $9,981. I believe a supervisor review of this documentation will facilitate a fair resolution.\n\nPlease confirm the name and contact information of the supervisor who will be reviewing my claim.\n\nSincerely,\n[Your Name]",
    },
    {
      step: 2,
      action: "File a State Insurance Commissioner Complaint",
      description:
        "If escalation to a supervisor does not produce a fair offer, file a formal complaint with your State Department of Insurance. This is free and typically triggers an investigation that requires the insurer to provide a written response justifying their valuation. Insurance departments take these complaints seriously because patterns of complaints can lead to regulatory action. Filing a complaint does not prevent you from pursuing other remedies simultaneously.",
      template:
        "File online at your state's Department of Insurance website. Include:\n- Your policy number: SF-AUTO-2024-77431\n- Claim number: SF-2025-88431\n- Date of loss: November 14, 2025\n- Insurer's offer: $4,200\n- Your documented fair value: $9,981\n- Summary: 'State Farm's settlement offer of $4,200 is significantly below fair market value as documented by KBB ($6,500-$7,200), NADA ($6,900), and local comparable listings (avg $7,100). The offer also excludes legitimate damages including loss of use ($720), diminished value ($1,800), sales tax ($476), and registration fees ($185). Despite submitting a documented demand with supporting evidence, the insurer has not provided a reasonable basis for their valuation.'",
    },
    {
      step: 3,
      action: "Invoke the Appraisal Clause",
      description:
        "Your policy (Section 9) contains an appraisal clause that provides a binding dispute resolution mechanism for disagreements over the amount of loss. Either party can demand appraisal. You select an independent appraiser, State Farm selects one, and if they disagree, an umpire makes the final decision. This typically costs $300-$500 for your appraiser but independent appraisals usually result in 15-30% higher payouts than the insurer's initial offer. For a gap of $5,781, this is often worth the investment.",
      template:
        "Subject: Demand for Appraisal -- Policy #SF-AUTO-2024-77431, Claim #SF-2025-88431\n\nDear State Farm Claims Department,\n\nPursuant to Section 9 (Appraisal) of my auto insurance policy, I hereby invoke my right to an appraisal of the amount of loss for the above-referenced claim.\n\nI have selected [Appraiser Name], a licensed independent vehicle appraiser, as my appraiser. Please provide the name and contact information of your selected appraiser within the timeframe specified in the policy.\n\nI request that the appraisal process begin promptly and that all parties cooperate in good faith to reach a fair determination of the loss amount.\n\nSincerely,\n[Your Name]",
    },
    {
      step: 4,
      action: "Consult an Attorney",
      description:
        "If all prior steps fail to produce a fair settlement, consult with an attorney who specializes in insurance bad faith or personal injury claims. Many offer free initial consultations. An attorney can evaluate whether State Farm's conduct constitutes bad faith (unreasonable denial, lowball offers without justification, unnecessary delays) which can entitle you to additional damages beyond the claim itself, including punitive damages in some states. Attorney involvement often accelerates settlement because insurers know the costs of litigation far exceed the settlement gap.",
      template: null,
    },
  ],
};

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
// Escalation step icon mapping
// ---------------------------------------------------------------------------

const ESCALATION_ICONS = [UserCheck, Building2, Gavel, Scale];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function CounterOfferPage() {
  const params = useParams<{ id: string }>();
  const claimId = params.id;

  // ---- State ----
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [counterOffer, setCounterOffer] = useState<CounterOffer | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [copiedLetter, setCopiedLetter] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());
  const [expandedTalkingPoints, setExpandedTalkingPoints] = useState(true);

  // Reference values from the offer analysis
  const theirOffer = 4200;
  const fairValue = 9981;
  const gap = 5781;

  // ---- Handlers ----
  function handleGenerate() {
    setIsGenerating(true);
    setGenerationStep(0);
    setGenerationProgress(0);
    setShowResults(false);

    const totalDuration = 2500;
    const stepDuration = totalDuration / GENERATION_STEPS.length;
    let currentStep = 0;

    const stepInterval = setInterval(() => {
      currentStep++;
      if (currentStep < GENERATION_STEPS.length) {
        setGenerationStep(currentStep);
        setGenerationProgress(
          Math.round((currentStep / GENERATION_STEPS.length) * 100)
        );
      } else {
        clearInterval(stepInterval);
        setGenerationProgress(100);
        setTimeout(() => {
          setIsGenerating(false);
          setCounterOffer(MOCK_COUNTER_OFFER);
          setTimeout(() => setShowResults(true), 50);
        }, 300);
      }
    }, stepDuration);
  }

  function handleCopyLetter() {
    if (!counterOffer) return;
    navigator.clipboard.writeText(counterOffer.demand_letter).then(() => {
      setCopiedLetter(true);
      setTimeout(() => setCopiedLetter(false), 2000);
    });
  }

  function handleDownloadPDF() {
    if (!counterOffer) return;
    // Create a text blob and download it (placeholder for real PDF generation)
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

  function toggleEscalationStep(step: number) {
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
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-100">
                    <Scale className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Counter-Offer Generator
                    </h1>
                    <p className="text-sm text-gray-500">
                      Generate a professional demand letter, talking points, and
                      escalation plan backed by evidence.
                    </p>
                  </div>
                </div>
              </div>
              {counterOffer && showResults && (
                <Badge variant="success" size="md">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Package Ready
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* --------------------------------------------------------------- */}
        {/* 2. Counter-Offer Summary (always visible)                        */}
        {/* --------------------------------------------------------------- */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">
              Counter-Offer Summary
            </h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* Their Offer */}
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
                <p className="text-xs font-medium text-red-600 uppercase tracking-wide mb-1">
                  Their Offer
                </p>
                <p className="text-2xl font-bold text-red-700 font-mono">
                  {formatCurrency(theirOffer)}
                </p>
              </div>

              {/* Gap */}
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 text-center">
                <p className="text-xs font-medium text-orange-600 uppercase tracking-wide mb-1">
                  Identified Gap
                </p>
                <p className="text-2xl font-bold text-orange-700 font-mono">
                  +{formatCurrency(gap)}
                </p>
              </div>

              {/* Recommended Demand */}
              <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
                <p className="text-xs font-medium text-green-600 uppercase tracking-wide mb-1">
                  Recommended Demand
                </p>
                <p className="text-2xl font-bold text-green-700 font-mono">
                  {formatCurrency(fairValue)}
                </p>
              </div>
            </div>

            {/* Progress bar showing offer vs demand */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>
                  Their offer covers{" "}
                  {Math.round((theirOffer / fairValue) * 100)}% of fair value
                </span>
                <span>{formatCurrency(fairValue)}</span>
              </div>
              <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 to-red-400 rounded-full"
                  style={{
                    width: `${Math.round((theirOffer / fairValue) * 100)}%`,
                  }}
                />
                <div
                  className="absolute inset-y-0 bg-gradient-to-r from-green-400 to-green-500 rounded-r-full"
                  style={{
                    left: `${Math.round((theirOffer / fairValue) * 100)}%`,
                    width: `${Math.round((gap / fairValue) * 100)}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-red-600 font-medium">
                  {formatCurrency(theirOffer)} offered
                </span>
                <span className="text-green-600 font-medium">
                  +{formatCurrency(gap)} owed
                </span>
              </div>
            </div>

            {/* Generate button */}
            {!counterOffer && !isGenerating && (
              <div className="mt-6">
                <Button
                  size="lg"
                  onClick={handleGenerate}
                  className="w-full sm:w-auto"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Counter-Offer Package
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  This will generate a demand letter, talking points, and
                  escalation plan tailored to your claim.
                </p>
              </div>
            )}

            {/* Generation progress */}
            {isGenerating && (
              <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <div className="w-7 h-7 rounded-full border-2 border-red-300 border-t-red-600 animate-spin" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-red-900">
                      Generating your counter-offer...
                    </p>
                    <p className="text-xs text-red-600">
                      {GENERATION_STEPS[generationStep]}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-red-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-red-600 h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${generationProgress}%` }}
                  />
                </div>
                <p className="text-xs text-red-500 mt-1.5 text-right">
                  {generationProgress}%
                </p>
              </div>
            )}

            {/* Re-generate prompt */}
            {counterOffer && showResults && !isGenerating && (
              <div className="mt-6 flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-500">
                  Counter-offer package generated successfully.
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleGenerate}
                  className="text-xs"
                >
                  Regenerate
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* --------------------------------------------------------------- */}
        {/* GENERATED RESULTS (shown after generation completes)             */}
        {/* --------------------------------------------------------------- */}
        {counterOffer && showResults && (
          <div
            className="space-y-8 transition-all duration-500 ease-out"
            style={{
              animation: "fadeSlideIn 0.5s ease-out forwards",
            }}
          >
            {/* ------------------------------------------------------------- */}
            {/* 3. Demand Letter                                               */}
            {/* ------------------------------------------------------------- */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Demand Letter
                      </h2>
                      <p className="text-xs text-gray-500">
                        Professional letter ready to send to State Farm
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCopyLetter}
                    >
                      {copiedLetter ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-1.5 text-green-600" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-1.5" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={handleDownloadPDF}
                    >
                      <Download className="w-4 h-4 mr-1.5" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-inner">
                  <pre className="whitespace-pre-wrap font-serif text-sm text-gray-800 leading-relaxed">
                    {counterOffer.demand_letter}
                  </pre>
                </div>
                <div className="mt-3 flex items-start gap-2 text-xs text-gray-500">
                  <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <span>
                    Replace [Your Name], [Your Address], [Your Phone Number],
                    and [Your Email] with your actual contact information before
                    sending.
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* ------------------------------------------------------------- */}
            {/* 4. Talking Points                                              */}
            {/* ------------------------------------------------------------- */}
            <Card>
              <CardHeader>
                <button
                  type="button"
                  onClick={() =>
                    setExpandedTalkingPoints(!expandedTalkingPoints)
                  }
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-100">
                      <Phone className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="text-left">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Negotiation Talking Points
                      </h2>
                      <p className="text-xs text-gray-500">
                        {counterOffer.talking_points.length} points for your
                        phone call with the adjuster
                      </p>
                    </div>
                  </div>
                  {expandedTalkingPoints ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </CardHeader>
              {expandedTalkingPoints && (
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-100">
                    {counterOffer.talking_points.map((point, index) => (
                      <div key={index} className="px-6 py-4 flex gap-4">
                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {point}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-6 py-3 bg-green-50 border-t border-green-100">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-green-700">
                        <span className="font-semibold">Pro tip:</span> Take
                        notes during the call and send a follow-up email
                        summarizing what was discussed. This creates a paper
                        trail that protects you if the adjuster misrepresents
                        the conversation later.
                      </p>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* ------------------------------------------------------------- */}
            {/* 5. Evidence Summary                                            */}
            {/* ------------------------------------------------------------- */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100">
                    <Package className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Evidence Summary
                    </h2>
                    <p className="text-xs text-gray-500">
                      All evidence compiled and referenced in your demand letter
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {counterOffer.evidence_summary}
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      label: "KBB Fair Market Value Report",
                      status: "Included",
                    },
                    { label: "NADA Valuation Report", status: "Included" },
                    {
                      label: "3 Local Comparable Listings",
                      status: "Included",
                    },
                    {
                      label: "Rental Reimbursement Documentation",
                      status: "Included",
                    },
                    {
                      label: "Diminished Value Assessment",
                      status: "Included",
                    },
                    { label: "State DMV Fee Schedule", status: "Included" },
                    {
                      label: "Sales Tax Rate Documentation",
                      status: "Included",
                    },
                    {
                      label: "Photos & Repair Estimates",
                      status: "Included",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700 flex-1">
                        {item.label}
                      </span>
                      <Badge variant="success" size="sm">
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* ------------------------------------------------------------- */}
            {/* 6. Escalation Roadmap                                          */}
            {/* ------------------------------------------------------------- */}
            <Card className="ring-2 ring-orange-200">
              <CardHeader className="bg-orange-50 border-b-orange-200">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-orange-900">
                      Escalation Roadmap
                    </h2>
                    <p className="text-xs text-orange-700">
                      Step-by-step plan if negotiation does not produce a fair
                      settlement
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-orange-100">
                  {counterOffer.escalation_steps.map((step, index) => {
                    const isExpanded = expandedSteps.has(index);
                    const StepIcon =
                      ESCALATION_ICONS[index] || AlertTriangle;
                    return (
                      <div key={index} className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => toggleEscalationStep(index)}
                          className="w-full text-left flex items-start gap-4"
                        >
                          {/* Step indicator */}
                          <div className="flex flex-col items-center flex-shrink-0">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 border-2 border-orange-300">
                              <StepIcon className="w-5 h-5 text-orange-600" />
                            </div>
                            {index <
                              counterOffer.escalation_steps.length - 1 && (
                              <div className="w-0.5 h-4 bg-orange-200 mt-1" />
                            )}
                          </div>

                          {/* Step content */}
                          <div className="flex-1 min-w-0 pt-1">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="warning"
                                  size="sm"
                                >
                                  Step {step.step}
                                </Badge>
                                <h3 className="text-sm font-semibold text-gray-900">
                                  {step.action}
                                </h3>
                              </div>
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              )}
                            </div>
                            {!isExpanded && (
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                {step.description}
                              </p>
                            )}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="mt-3 ml-14 space-y-3">
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {step.description}
                            </p>
                            {step.template && (
                              <div className="rounded-lg bg-orange-50 border border-orange-200 p-4">
                                <p className="text-xs font-semibold text-orange-800 mb-2">
                                  Template / Instructions
                                </p>
                                <pre className="whitespace-pre-wrap text-xs text-orange-900 font-mono leading-relaxed">
                                  {step.template}
                                </pre>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* ------------------------------------------------------------- */}
            {/* 7. Disclaimer                                                  */}
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
                      This counter-offer package is generated for educational
                      and informational purposes only and does not constitute
                      legal advice. The demand letter, talking points, and
                      escalation strategies are based on general best practices
                      and the specific details of your claim as entered into
                      ClaimCoach. Laws regarding insurance claims, diminished
                      value, bad faith, and consumer protections vary
                      significantly by state. Before sending a demand letter or
                      taking any legal action, we strongly recommend reviewing
                      the materials with a licensed attorney or public adjuster
                      in your state who can tailor the strategy to your specific
                      circumstances and applicable laws. ClaimCoach is not a law
                      firm and does not provide legal representation.
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
