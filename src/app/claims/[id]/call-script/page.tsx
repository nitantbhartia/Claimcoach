"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ClaimLayout } from "@/components/layout/claim-layout";
import { Button } from "@/components/ui/button";
import { CallScript } from "@/types";
import { Loader2, Phone, Copy, Check, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, ArrowRight } from "lucide-react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Mock call script data
// ---------------------------------------------------------------------------

const MOCK_SCRIPT: CallScript = {
  opening:
    "Hi, this is [Your Name] calling about claim number SF-2025-88431 for my 2022 Honda Civic. I received your settlement offer of $4,200 and I'd like to discuss it with you. Do you have a few minutes?",
  key_points: [
    {
      topic: "Vehicle Valuation",
      what_to_say:
        "I appreciate the offer, but after researching comparable vehicles, I believe the fair market value is significantly higher. I found three 2022 Honda Civic EX models within 50 miles listed at $6,900, $7,200, and $7,200. KBB puts the fair range at $6,500 to $7,200, and NADA's clean retail value is $6,900.",
      if_they_say:
        "Our valuation is based on our comparable vehicles database and reflects the fair market value.",
      your_response:
        "I understand you have your own comparables, and I'd like to see them. Can you provide me with the VINs, mileage, trim level, and condition of the vehicles you used? I want to make sure we're comparing apples to apples — my vehicle is an EX trim with 28,000 miles in good pre-accident condition.",
    },
    {
      topic: "Missing Line Items",
      what_to_say:
        "Your offer doesn't include several legitimate damages. My policy provides $30 per day for rental reimbursement, and I was without my vehicle for 24 days — that's $720 your offer doesn't account for. There's also diminished value, sales tax on a replacement vehicle, and registration fees.",
      if_they_say:
        "Those items aren't typically included in the settlement offer.",
      your_response:
        "Rental reimbursement is explicitly covered under my policy's Transportation Expense provision. And diminished value is a recognized element of damages in our state. I'm not asking for anything unusual — these are standard items that should be part of a complete settlement. I can provide documentation for each one.",
    },
    {
      topic: "Diminished Value",
      what_to_say:
        "My vehicle now has an accident on its Carfax history, which reduces its resale value by an estimated 10 to 15 percent. Based on the 17c diminished value formula, that's approximately $1,800.",
      if_they_say:
        "We don't typically compensate for diminished value on first-party claims.",
      your_response:
        "I understand that's your position, but diminished value is a real, measurable loss. If you're disputing the amount, I'd welcome your own diminished value assessment rather than simply excluding it. The market data clearly shows vehicles with accident history sell for less.",
    },
    {
      topic: "Total Demand",
      what_to_say:
        "When you add up the fair vehicle value of $6,800, rental reimbursement of $720, diminished value of $1,800, sales tax of $476, and registration fees of $185, my documented demand is $9,981. I've prepared a detailed demand letter with supporting documentation for each line item.",
      if_they_say: "That amount is much higher than what we can offer.",
      your_response:
        "I understand there's a gap, and I'm open to a good-faith negotiation. But I need the revised offer to be based on actual market data. Every dollar in my demand is documented — I'm not inflating anything. What specific items in my demand do you disagree with, and what's the basis for your disagreement?",
    },
    {
      topic: "Next Steps",
      what_to_say:
        "I'll be sending my formal demand letter with all supporting documentation today. I'd like a revised offer within 15 business days.",
      if_they_say:
        "I'll need to review the documentation and get back to you.",
      your_response:
        "That's completely reasonable. I want to make sure you have everything you need. Can I confirm the best email to send the demand package to? And just so we're on the same page — if we can't reach an agreement, I'm prepared to invoke the appraisal clause under Section 9 of my policy.",
    },
  ],
  closing:
    "Thank you for your time today. To summarize: I'm sending a formal demand for $9,981 with full documentation. I'd appreciate a revised offer within 15 business days. If we can't reach an agreement, I'll explore the appraisal process and file a complaint with the Department of Insurance. I look forward to resolving this fairly. Have a good day.",
  dos: [
    "Stay calm and professional throughout the entire call",
    "Take notes on everything the adjuster says, including their name and direct number",
    "Reference specific dollar amounts and evidence sources",
    "Ask them to explain their valuation methodology in detail",
    "Use silence after making key points — don't fill the gap",
    "Follow up with an email summarizing the call within 24 hours",
  ],
  donts: [
    "Don't accept any offer on the spot — always say you need time to review",
    "Don't get emotional or raise your voice, even if they're dismissive",
    "Don't volunteer information they didn't ask for",
    "Don't say 'I think' or 'I feel' — use 'the data shows' and 'my documentation confirms'",
    "Don't agree to a recorded statement without preparation",
    "Don't threaten legal action unless you're prepared to follow through",
  ],
};

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

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [script, setScript] = useState<CallScript | null>(null);
  const [expandedPoints, setExpandedPoints] = useState<Set<number>>(new Set());
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
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
          offerAmount: 4200,
          demandAmount: 9981,
          vehicleInfo: "2022 Honda Civic EX, 28,000 miles",
          insurerName: "State Farm",
          state: "California",
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
      console.warn("API call failed, using mock data:", err);
      setScript(MOCK_SCRIPT);
      setError("Live AI generation unavailable. Showing sample call script.");
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
