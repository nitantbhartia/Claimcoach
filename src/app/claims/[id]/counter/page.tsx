"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ClaimLayout } from "@/components/layout/claim-layout";
import { Button } from "@/components/ui/button";
import { CounterOffer } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Copy, Download, ChevronDown, ChevronUp, Loader2, ArrowRight, Check, Phone } from "lucide-react";
import Link from "next/link";

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
    "Reference specific comparable vehicles: \u2018I found three 2022 Honda Civic EX models within 50 miles listed at $6,900, $7,200, and $7,200. Can you explain why your valuation of $4,200 is $2,600 below the lowest comparable listing?\u2019",
    "Ask the adjuster to identify the specific comparable vehicles they used: \u2018Can you provide me with the VINs, mileage, trim level, and condition of the comparable vehicles used in your valuation?\u2019 This often reveals they used lower-trim or higher-mileage vehicles.",
    "Address the missing line items directly: \u2018Your offer does not include loss of use, diminished value, sales tax, or registration fees. My policy provides $30/day for rental reimbursement, and I was without my vehicle for 24 days. That alone is $720 you owe me under the policy terms.\u2019",
    "Use the silence technique: After making your key points, stop talking. Do not fill the silence. Adjusters are trained to wait for you to negotiate against yourself. Make your demand and let them respond.",
    "If they say \u2018This is the best we can do,\u2019 respond with: \u2018I understand that may be your current position, but the market data does not support it. I have documented comparables from KBB, NADA, and local dealers all showing values between $6,500 and $7,200. I need you to explain the specific basis for your lower valuation.\u2019",
    "If they push back on diminished value, say: \u2018My vehicle now has an accident on its Carfax, which reduces its resale value by 10-15%. This is a recognized element of damages in our state. If you are disputing the diminished value, please provide your own assessment rather than simply excluding it.\u2019",
    "Close by setting a deadline: \u2018I have sent a formal demand letter for $9,981 with full documentation. I would like a revised offer within 15 business days. If we cannot reach an agreement, I will invoke the appraisal clause in my policy and file a complaint with the State Department of Insurance.\u2019",
  ],
  evidence_summary:
    "Your counter-offer package includes the following compiled evidence: (1) Kelley Blue Book Fair Market Value report showing $6,500-$7,200 range for your 2022 Honda Civic EX with 28,000 miles; (2) NADA Guides Clean Retail valuation of $6,900; (3) Three local comparable vehicle listings within 50 miles averaging $7,100; (4) Rental reimbursement documentation for 24 days at $30/day per your policy; (5) Diminished value assessment based on the 17c formula showing $1,800 estimated loss; (6) State DMV fee schedule documenting $185 in registration and title transfer costs; (7) State sales tax rate documentation (7%) applied to fair vehicle value; (8) All photographs and repair estimates previously submitted.",
  escalation_steps: [
    {
      step: 1,
      action: "Request a Supervisor Review",
      description:
        "If the initial adjuster refuses to meaningfully increase the offer after receiving your demand letter, request that your claim be escalated to a claims supervisor or team lead. Supervisors typically have higher settlement authority and more experience evaluating documented demands. Remain professional: \u2018I appreciate your time, but I believe the documented market data supports a significantly higher value. I would like to request a review by your supervisor before we explore other options.\u2019",
      template:
        "Subject: Request for Supervisor Review -- Claim #SF-2025-88431\n\nDear [Adjuster Name],\n\nThank you for your continued communication regarding the above claim. As we have been unable to reach agreement on a fair settlement amount, I respectfully request that my claim be escalated to a claims supervisor for review.\n\nI have provided documented market comparables from KBB, NADA, and local listings, as well as itemized damages totaling $9,981. I believe a supervisor review of this documentation will facilitate a fair resolution.\n\nPlease confirm the name and contact information of the supervisor who will be reviewing my claim.\n\nSincerely,\n[Your Name]",
    },
    {
      step: 2,
      action: "File a State Insurance Commissioner Complaint",
      description:
        "If escalation to a supervisor does not produce a fair offer, file a formal complaint with your State Department of Insurance. This is free and typically triggers an investigation requiring the insurer to provide a written response justifying their valuation. Insurance departments take these complaints seriously because patterns of complaints can lead to regulatory action.",
      template:
        "File online at your state\u2019s Department of Insurance website. Include:\n- Your policy number: SF-AUTO-2024-77431\n- Claim number: SF-2025-88431\n- Date of loss: November 14, 2025\n- Insurer\u2019s offer: $4,200\n- Your documented fair value: $9,981\n- Summary: \u2018State Farm\u2019s settlement offer of $4,200 is significantly below fair market value as documented by KBB ($6,500-$7,200), NADA ($6,900), and local comparable listings (avg $7,100). The offer also excludes legitimate damages including loss of use ($720), diminished value ($1,800), sales tax ($476), and registration fees ($185).\u2019",
    },
    {
      step: 3,
      action: "Invoke the Appraisal Clause",
      description:
        "Your policy (Section 9) contains an appraisal clause that provides a binding dispute resolution mechanism. You select an independent appraiser, State Farm selects one, and if they disagree, an umpire makes the final decision. This typically costs $300-$500 for your appraiser but independent appraisals usually result in 15-30% higher payouts than the insurer\u2019s initial offer.",
      template:
        "Subject: Demand for Appraisal -- Policy #SF-AUTO-2024-77431, Claim #SF-2025-88431\n\nDear State Farm Claims Department,\n\nPursuant to Section 9 (Appraisal) of my auto insurance policy, I hereby invoke my right to an appraisal of the amount of loss for the above-referenced claim.\n\nI have selected [Appraiser Name], a licensed independent vehicle appraiser, as my appraiser. Please provide the name and contact information of your selected appraiser within the timeframe specified in the policy.\n\nSincerely,\n[Your Name]",
    },
    {
      step: 4,
      action: "Consult an Attorney",
      description:
        "If all prior steps fail to produce a fair settlement, consult with an attorney who specializes in insurance bad faith or personal injury claims. Many offer free initial consultations. An attorney can evaluate whether the insurer\u2019s conduct constitutes bad faith, which can entitle you to additional damages beyond the claim itself. Attorney involvement often accelerates settlement because insurers know the costs of litigation far exceed the settlement gap.",
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

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [counterOffer, setCounterOffer] = useState<CounterOffer | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());

  // Reference values from the offer analysis
  const theirOffer = 4200;
  const demand = 9981;
  const gap = 5781;

  async function handleGenerate() {
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
          offerAmount: theirOffer,
          offerAnalysis: { fairness_score: 38, total_gap: gap },
          claimType: "Auto Property Damage",
          vehicleInfo: "2022 Honda Civic EX, 28,000 miles",
          insurerName: "State Farm",
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
      console.warn("API call failed, using mock data:", err);
      setCounterOffer(MOCK_COUNTER_OFFER);
      setError("Live AI generation unavailable. Showing sample counter-offer.");
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
    a.download = `Counter-Offer-Demand-Letter-${params.id}.txt`;
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

  return (
    <ClaimLayout claimId={claimId}>
      <div className="space-y-6">
        {/* ----------------------------------------------------------------- */}
        {/* 1. Summary Bar                                                     */}
        {/* ----------------------------------------------------------------- */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-card p-6">
          <h1 className="text-heading-lg sm:text-display-sm font-semibold text-slate-900 mb-4 sm:mb-6">
            Counter-Offer
          </h1>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Their offer */}
            <div className="text-center">
              <p className="text-caption text-slate-400 mb-1">Their Offer</p>
              <p className="text-heading-lg font-semibold text-slate-900 font-mono">
                {formatCurrency(theirOffer)}
              </p>
            </div>

            <ArrowRight className="w-5 h-5 text-slate-300 flex-shrink-0 hidden sm:block" />

            {/* Your demand */}
            <div className="text-center">
              <p className="text-caption text-slate-400 mb-1">Your Demand</p>
              <p className="text-heading-lg font-semibold text-slate-900 font-mono">
                {formatCurrency(demand)}
              </p>
            </div>

            {/* Gap */}
            <div className="sm:ml-auto text-center sm:text-right">
              <p className="text-caption text-slate-400 mb-1">Gap</p>
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
          <div className="bg-white rounded-lg border border-slate-200 shadow-card p-6">
            <Button size="lg" onClick={handleGenerate}>
              Generate Counter-Offer
            </Button>
            <p className="text-body-sm text-slate-500 mt-2">
              This will generate a demand letter, talking points, and escalation
              plan tailored to your claim.
            </p>
          </div>
        )}

        {isGenerating && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-card p-6">
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-brand-500 animate-spin" />
              <p className="text-body text-slate-600">
                {GENERATION_STEPS[generationStep]}
              </p>
            </div>
          </div>
        )}

        {error && !isGenerating && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-card p-4">
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
            <div className="bg-white rounded-lg border border-slate-200 shadow-card">
              <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="text-heading font-semibold text-slate-900">
                  Demand Letter
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 text-body-sm font-medium text-brand-500 hover:text-brand-600"
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
                    className="inline-flex items-center gap-1.5 text-body-sm font-medium text-brand-500 hover:text-brand-600"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <pre className="whitespace-pre-wrap break-words font-mono text-caption sm:text-body-sm text-slate-700 leading-relaxed overflow-x-auto">
                  {counterOffer.demand_letter}
                </pre>
              </div>
              <div className="px-6 pb-4">
                <p className="text-caption text-slate-400">
                  Replace [Your Name], [Your Address], [Your Phone Number], and
                  [Your Email] with your actual contact information before
                  sending.
                </p>
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* 4. Talking Points                                               */}
            {/* -------------------------------------------------------------- */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-card">
              <div className="px-6 py-4 border-b border-slate-100">
                <h2 className="text-heading font-semibold text-slate-900">
                  Talking Points
                </h2>
                <p className="text-body-sm text-slate-500 mt-1">
                  {counterOffer.talking_points.length} points for your call with
                  the adjuster
                </p>
              </div>
              <div className="divide-y divide-slate-100">
                {counterOffer.talking_points.map((point, index) => (
                  <div key={index} className="px-6 py-4 flex gap-4">
                    <span className="flex-shrink-0 text-body-sm font-semibold text-slate-400 w-6 text-right">
                      {index + 1}.
                    </span>
                    <p className="text-body-sm text-slate-700 leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* 5. Evidence                                                     */}
            {/* -------------------------------------------------------------- */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-card p-6">
              <h2 className="text-heading font-semibold text-slate-900 mb-3">
                Evidence
              </h2>
              <p className="text-body text-slate-600 leading-relaxed mb-4">
                {counterOffer.evidence_summary}
              </p>
              <ul className="space-y-2">
                {EVIDENCE_ITEMS.map((item, index) => (
                  <li
                    key={index}
                    className="text-body-sm text-slate-700 flex items-baseline gap-2"
                  >
                    <span className="text-slate-300">&bull;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* 6. Escalation Roadmap                                           */}
            {/* -------------------------------------------------------------- */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-card">
              <div className="px-6 py-4 border-b border-slate-100">
                <h2 className="text-heading font-semibold text-slate-900">
                  If Negotiation Fails
                </h2>
              </div>
              <div className="divide-y divide-slate-100">
                {counterOffer.escalation_steps.map((step, index) => {
                  const isExpanded = expandedSteps.has(index);
                  return (
                    <div key={index}>
                      <button
                        type="button"
                        onClick={() => toggleStep(index)}
                        className="w-full px-6 py-4 flex items-center justify-between gap-3 text-left hover:bg-slate-50"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-body-sm font-semibold text-slate-400">
                            Step {step.step}
                          </span>
                          <span className="text-body-sm font-medium text-slate-900">
                            {step.action}
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        )}
                      </button>
                      {isExpanded && (
                        <div className="px-6 pb-4 space-y-3">
                          <p className="text-body-sm text-slate-600 leading-relaxed">
                            {step.description}
                          </p>
                          {step.template && (
                            <pre className="whitespace-pre-wrap break-words text-caption sm:text-body-sm text-slate-500 font-mono leading-relaxed bg-slate-50 rounded-lg border border-slate-100 p-3 sm:p-4 overflow-x-auto">
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
            <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
              <p className="text-body-sm font-medium text-slate-500 mb-3">What&apos;s next?</p>
              <div className="space-y-2">
                <Link
                  href={`/claims/${claimId}/call-script`}
                  className="flex items-center justify-between text-body-sm text-slate-900 hover:text-brand-500 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    Prepare a call script to negotiate with the adjuster
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                </Link>
                <Link
                  href={`/claims/${claimId}/export`}
                  className="flex items-center justify-between text-body-sm text-slate-900 hover:text-brand-500 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    Export your full analysis report as PDF
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                </Link>
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* 8. Disclaimer                                                   */}
            {/* -------------------------------------------------------------- */}
            <p className="text-caption text-slate-400 leading-relaxed">
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
