"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { STATE_CODE_TO_NAME, STATE_NAMES, STATE_SALES_TAX } from "@/lib/tools/data";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface IncludedLineItem {
  label: string;
  low: number;
  high: number;
}

interface HomepageEstimate {
  estimated_missing_low: number;
  estimated_missing_high: number;
  included_line_items: IncludedLineItem[];
  assumptions: string[];
  last_updated_at: string;
  tax_rate_percent: number;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const TESTIMONIALS = [
  {
    quote:
      "I used the breakdown to ask for missing sales tax and fees. My offer increased by $2,140.",
    person: "J. Martin",
    state: "Texas",
  },
  {
    quote:
      "The calculator showed me what to question. The adjuster revised the valuation in two days.",
    person: "S. Patel",
    state: "Florida",
  },
];

const LAST_UPDATED_AT = "February 2026";

const PLACEHOLDER_ITEMS: IncludedLineItem[] = [
  { label: "Sales tax recovery", low: 0, high: 0 },
  { label: "Title and registration fees", low: 0, high: 0 },
  { label: "Comparable valuation adjustments", low: 0, high: 0 },
  { label: "Condition and equipment adjustments", low: 0, high: 0 },
];

const LINE_ITEM_META: Record<string, { short: string; subtitle: string }> = {
  "Sales tax recovery": { short: "Sales Tax", subtitle: "" },
  "Title and registration fees": { short: "Title Fees", subtitle: "DMV" },
  "Comparable valuation adjustments": { short: "Valuation Adj.", subtitle: "Avg." },
  "Condition and equipment adjustments": { short: "Condition Adj.", subtitle: "Est." },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function toUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getStateCode(stateName: string): string {
  for (const [code, name] of Object.entries(STATE_CODE_TO_NAME)) {
    if (name === stateName) return code;
  }
  return "";
}

function buildEstimate(offerAmount: number, stateName: string): HomepageEstimate | null {
  const stateTaxData = STATE_SALES_TAX[stateName];
  if (!stateTaxData || offerAmount <= 0) return null;

  const taxRecovery = offerAmount * (stateTaxData.avg_combined / 100);
  const titleAndRegistrationFees = Math.min(Math.max(offerAmount * 0.012, 200), 480);
  const valuationAdjustment = offerAmount * 0.05;
  const conditionAdjustment = offerAmount * 0.02;

  const estimatedLow =
    taxRecovery + titleAndRegistrationFees + valuationAdjustment * 0.8 + conditionAdjustment * 0.7;
  const estimatedHigh =
    taxRecovery + titleAndRegistrationFees + valuationAdjustment * 1.2 + conditionAdjustment;

  const includedLineItems: IncludedLineItem[] = [
    { label: "Sales tax recovery", low: taxRecovery, high: taxRecovery },
    { label: "Title and registration fees", low: titleAndRegistrationFees * 0.9, high: titleAndRegistrationFees },
    { label: "Comparable valuation adjustments", low: valuationAdjustment * 0.8, high: valuationAdjustment * 1.2 },
    { label: "Condition and equipment adjustments", low: conditionAdjustment * 0.7, high: conditionAdjustment },
  ];

  return {
    estimated_missing_low: Math.round(estimatedLow),
    estimated_missing_high: Math.round(estimatedHigh),
    included_line_items: includedLineItems.map((item) => ({
      ...item,
      low: Math.round(item.low),
      high: Math.round(item.high),
    })),
    assumptions: [
      "Uses state average combined tax rate and common replacement-related fees.",
      "Assumes standard total loss conditions without rare policy endorsements.",
      "Final numbers depend on your exact offer letter, vehicle details, and state filing rules.",
    ],
    last_updated_at: LAST_UPDATED_AT,
    tax_rate_percent: stateTaxData.avg_combined,
  };
}

/* ------------------------------------------------------------------ */
/*  Sticky mobile CTA                                                  */
/* ------------------------------------------------------------------ */

function StickyMobileCTA({ href }: { href: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const hero = document.getElementById("homepage-hero");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      setVisible(rect.bottom < 0);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#F2F0E4] px-4 py-3 md:hidden">
      <Link
        href={href}
        className="block w-full rounded-full bg-black px-4 py-3.5 text-center text-[15px] font-semibold text-white transition-transform active:scale-[0.98]"
      >
        See full breakdown
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function LandingPage() {
  const [offer, setOffer] = useState("");
  const [stateName, setStateName] = useState("");
  const [touched, setTouched] = useState<{ offer: boolean; state: boolean }>({
    offer: false,
    state: false,
  });

  const parsedOffer = parseFloat(offer.replace(/[^0-9.]/g, ""));
  const isOfferValid = !Number.isNaN(parsedOffer) && parsedOffer >= 1000;
  const hasRequiredFields = isOfferValid && stateName !== "";

  const estimate = useMemo(() => {
    if (!hasRequiredFields) return null;
    return buildEstimate(parsedOffer, stateName);
  }, [hasRequiredFields, parsedOffer, stateName]);

  const stateCode = stateName ? getStateCode(stateName) : "";
  const fullBreakdownHref = estimate
    ? `/claims/new?offer=${Math.round(parsedOffer)}${stateCode ? `&state=${stateCode}` : ""}`
    : "/claims/new";

  const totalMissing = estimate
    ? Math.round((estimate.estimated_missing_low + estimate.estimated_missing_high) / 2)
    : 0;

  const lineItems = estimate?.included_line_items ?? PLACEHOLDER_ITEMS;

  return (
    <div className="min-h-screen bg-[#5A9B82] font-sans text-black pb-20 md:pb-0">
      <Header />
      <StickyMobileCTA href={fullBreakdownHref} />

      <main>
        {/* ============================================================ */}
        {/*  Hero — Two-panel card                                        */}
        {/* ============================================================ */}

        <section
          id="homepage-hero"
          className="flex items-center justify-center px-4 py-8 md:px-6 md:py-12"
        >
          <div
            className="w-full max-w-[1000px] md:min-h-[680px] rounded-[32px] md:rounded-[44px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] md:grid md:grid-cols-[0.85fr_1.15fr]"
            style={{ background: "linear-gradient(90deg, #6CB096 45%, #F2F0E4 45%)" }}
          >
            {/* ---- Left panel: input ---- */}
            <div className="bg-[#6CB096] p-8 md:p-12 flex flex-col justify-between">
              <div>
                {/* Brand */}
                <div className="flex items-center gap-2 text-base font-bold tracking-[-0.02em] opacity-80 mb-10 md:mb-12">
                  <span className="w-2 h-2 bg-black rounded-full inline-block" />
                  ClaimCoach
                </div>

                {/* Hero copy */}
                <h1 className="text-[2.4rem] md:text-[48px] leading-[0.95] font-bold tracking-[-0.04em] mb-4 md:mb-6">
                  Check your offer in seconds.
                </h1>
                <p className="text-base text-black/60 leading-[1.4] font-medium tracking-[-0.01em] mb-8 md:mb-12 max-w-[300px]">
                  We estimate missing line items like taxes and transfer fees to
                  help you negotiate.
                </p>

                {/* Segmented control */}
                <div className="bg-black/[0.06] p-[5px] rounded-full flex mb-6 md:mb-8">
                  <div className="flex-1 text-center py-3 text-sm font-semibold rounded-full bg-black text-white tracking-[-0.01em]">
                    Auto
                  </div>
                  <div className="flex-1 text-center py-3 text-sm font-semibold rounded-full text-black/50 cursor-default tracking-[-0.01em]">
                    Property
                  </div>
                  <div className="flex-1 text-center py-3 text-sm font-semibold rounded-full text-black/50 cursor-default tracking-[-0.01em]">
                    Medical
                  </div>
                </div>

                {/* Offer amount */}
                <div className="mb-6">
                  <label
                    htmlFor="offer"
                    className="text-[12px] font-bold text-black/50 ml-1 mb-1.5 block uppercase tracking-[0.05em]"
                  >
                    Offer Amount
                  </label>
                  <div className="bg-black/[0.06] rounded-[20px] px-5 py-3.5 flex items-center border border-transparent transition-all focus-within:bg-black/10 focus-within:border-black/10">
                    <span className="text-black font-semibold mr-1 text-lg">$</span>
                    <input
                      id="offer"
                      type="text"
                      inputMode="numeric"
                      placeholder="e.g. 24,500"
                      value={offer}
                      onBlur={() => setTouched((prev) => ({ ...prev, offer: true }))}
                      onChange={(e) => setOffer(e.target.value.replace(/[^0-9.,]/g, ""))}
                      className="border-none bg-transparent text-lg font-semibold text-black w-full outline-none tracking-[-0.02em] placeholder:text-black/30"
                    />
                  </div>
                  {touched.offer && !isOfferValid && (
                    <p className="mt-1.5 ml-1 text-[12px] text-black/60 font-medium">
                      Enter at least $1,000
                    </p>
                  )}
                </div>

                {/* State */}
                <div className="mb-6">
                  <label
                    htmlFor="state"
                    className="text-[12px] font-bold text-black/50 ml-1 mb-1.5 block uppercase tracking-[0.05em]"
                  >
                    State
                  </label>
                  <div className="bg-black/[0.06] rounded-[20px] px-5 py-3.5 flex items-center border border-transparent transition-all focus-within:bg-black/10 focus-within:border-black/10">
                    <select
                      id="state"
                      value={stateName}
                      onBlur={() => setTouched((prev) => ({ ...prev, state: true }))}
                      onChange={(e) => setStateName(e.target.value)}
                      className="border-none bg-transparent text-lg font-semibold text-black w-full outline-none tracking-[-0.02em] appearance-none cursor-pointer"
                    >
                      <option value="">Select state...</option>
                      {STATE_NAMES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      className="ml-auto pointer-events-none flex-shrink-0"
                    >
                      <path
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {touched.state && !stateName && (
                    <p className="mt-1.5 ml-1 text-[12px] text-black/60 font-medium">
                      Select your state
                    </p>
                  )}
                </div>
              </div>

              {/* CTA button */}
              {estimate ? (
                <Link
                  href={fullBreakdownHref}
                  className="bg-black text-white border-none py-[22px] w-full rounded-full text-[17px] font-semibold flex items-center justify-between px-8 tracking-[-0.01em] transition-transform active:scale-[0.98] mt-auto"
                >
                  Analyze Offer
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="bg-black text-white border-none py-[22px] w-full rounded-full text-[17px] font-semibold flex items-center justify-between px-8 tracking-[-0.01em] mt-auto disabled:opacity-40 cursor-not-allowed"
                >
                  Analyze Offer
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              )}
            </div>

            {/* ---- Right panel: results ---- */}
            <div className="bg-[#F2F0E4] p-8 md:p-12 flex flex-col gap-6 rounded-t-[32px] md:rounded-none">
              {/* Header */}
              <div className="flex justify-between items-center px-1 mb-2">
                <span className="text-[12px] font-bold text-black/50 uppercase tracking-[0.05em]">
                  Estimated Breakdown
                </span>
                <span className="bg-black text-white px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.05em]">
                  Draft
                </span>
              </div>

              {/* Line items card */}
              <div className="bg-white rounded-[32px] p-6 md:p-8">
                {lineItems.map((item, i) => {
                  const meta = LINE_ITEM_META[item.label] ?? {
                    short: item.label,
                    subtitle: "",
                  };
                  const subtitle =
                    item.label === "Sales tax recovery" && estimate
                      ? `${estimate.tax_rate_percent}%`
                      : meta.subtitle;
                  const value = estimate
                    ? toUSD(Math.round((item.low + item.high) / 2))
                    : "\u2014";

                  return (
                    <div
                      key={item.label}
                      className={`flex justify-between items-center py-[18px] ${
                        i < lineItems.length - 1
                          ? "border-b border-black/[0.06]"
                          : ""
                      }`}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="text-base font-semibold text-black tracking-[-0.02em]">
                          {meta.short}
                        </span>
                        {subtitle && (
                          <span className="text-[13px] text-black/40 font-medium">
                            {subtitle}
                          </span>
                        )}
                      </div>
                      <span className="text-lg font-bold tracking-[-0.02em]">
                        {value}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Visualizer — total missing */}
              <div className="mt-auto bg-white rounded-[32px] p-6 md:p-8 flex items-center justify-between relative overflow-hidden">
                {/* Decorative circle */}
                <div className="absolute -right-5 -bottom-5 w-20 h-20 bg-[#FF5C39] rounded-full opacity-10 pointer-events-none" />

                <div className="flex flex-col gap-1.5">
                  <span className="text-sm text-black/50 font-semibold uppercase tracking-[0.02em]">
                    Potential Missing Value
                  </span>
                  <span className="text-[36px] md:text-[42px] font-bold tracking-[-0.04em] text-[#FF5C39] leading-none">
                    {estimate ? toUSD(totalMissing) : "\u2014"}
                  </span>
                </div>
                <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="19" x2="12" y2="5" />
                    <polyline points="5 12 12 5 19 12" />
                  </svg>
                </div>
              </div>

              {/* Confidence slider */}
              <div className="w-full px-1">
                <div className="flex justify-between mb-2">
                  <span className="text-[12px] font-bold text-black/50 uppercase tracking-[0.05em]">
                    Confidence Score
                  </span>
                  <span className="text-[12px] font-bold text-black uppercase tracking-[0.05em]">
                    {estimate ? "85%" : "\u2014"}
                  </span>
                </div>
                <div className="h-3 bg-black/[0.06] rounded-full relative overflow-hidden">
                  <div
                    className="h-full bg-[#FF5C39] rounded-full transition-all duration-700 ease-out"
                    style={{ width: estimate ? "85%" : "0%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  How It Works                                                 */}
        {/* ============================================================ */}

        <section className="bg-[#F2F0E4]">
          <div className="mx-auto max-w-[1000px] px-6 py-16">
            <div className="grid gap-5 md:grid-cols-3">
              <article className="rounded-[24px] bg-white p-6">
                <span className="text-[12px] font-bold text-black/40 uppercase tracking-[0.05em]">
                  Step 1
                </span>
                <h2 className="mt-3 text-[20px] font-bold tracking-[-0.02em]">
                  Enter offer details
                </h2>
                <p className="mt-2 text-[15px] text-black/60 leading-relaxed">
                  Start with your settlement amount and state to run a quick
                  screening check.
                </p>
              </article>
              <article className="rounded-[24px] bg-white p-6">
                <span className="text-[12px] font-bold text-black/40 uppercase tracking-[0.05em]">
                  Step 2
                </span>
                <h2 className="mt-3 text-[20px] font-bold tracking-[-0.02em]">
                  We compare benchmarks
                </h2>
                <p className="mt-2 text-[15px] text-black/60 leading-relaxed">
                  We apply state rules, market assumptions, and common claim
                  line items.
                </p>
              </article>
              <article className="rounded-[24px] bg-white p-6">
                <span className="text-[12px] font-bold text-black/40 uppercase tracking-[0.05em]">
                  Step 3
                </span>
                <h2 className="mt-3 text-[20px] font-bold tracking-[-0.02em]">
                  Get your next steps
                </h2>
                <p className="mt-2 text-[15px] text-black/60 leading-relaxed">
                  See a structured breakdown, then move into full analysis if
                  needed.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  Proof & Trust                                                */}
        {/* ============================================================ */}

        <section className="bg-white">
          <div className="mx-auto max-w-[1000px] px-6 py-16">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-[24px] font-bold tracking-[-0.02em]">
                  Proof and trust
                </h2>
                {TESTIMONIALS.map((testimonial) => (
                  <blockquote
                    key={testimonial.person}
                    className="rounded-[24px] border border-black/[0.06] bg-[#F2F0E4] p-6"
                  >
                    <p className="text-[15px] text-black/80 leading-relaxed">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <footer className="mt-3 text-[13px] text-black/40 font-medium">
                      {testimonial.person} &mdash; {testimonial.state}
                    </footer>
                  </blockquote>
                ))}
              </div>

              <div className="rounded-[24px] border border-black/[0.06] bg-[#F2F0E4] p-6">
                <h3 className="text-[20px] font-bold tracking-[-0.02em]">
                  Method and assumptions
                </h3>
                <details className="mt-4 rounded-[16px] border border-black/[0.06] bg-white p-4">
                  <summary className="cursor-pointer text-[14px] font-semibold text-black/80">
                    What this estimate checks
                  </summary>
                  <ul className="mt-3 space-y-2 text-[14px] text-black/60">
                    <li>Sales tax treatment in your state.</li>
                    <li>Common replacement-related fees and transfer costs.</li>
                    <li>Frequent valuation and condition adjustments.</li>
                  </ul>
                </details>
                <details className="mt-3 rounded-[16px] border border-black/[0.06] bg-white p-4">
                  <summary className="cursor-pointer text-[14px] font-semibold text-black/80">
                    Assumptions and limits
                  </summary>
                  <ul className="mt-3 space-y-2 text-[14px] text-black/60">
                    {(estimate?.assumptions ?? [
                      "Uses standard assumptions until your exact offer letter is reviewed.",
                      "Some states require additional documentation windows.",
                      "Final value can vary with endorsements and vehicle specifics.",
                    ]).map((assumption) => (
                      <li key={assumption}>{assumption}</li>
                    ))}
                  </ul>
                </details>
                <p className="mt-4 text-[12px] text-black/40 font-medium">
                  Last updated: {LAST_UPDATED_AT}. Source: state revenue and
                  insurance guidance data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  Final CTA                                                    */}
        {/* ============================================================ */}

        <section className="bg-[#F2F0E4]">
          <div className="mx-auto max-w-[1000px] px-6 py-16">
            <div className="rounded-[32px] bg-white p-8 md:p-10 text-center">
              <h2 className="text-[24px] font-bold tracking-[-0.02em]">
                Ready for a full claim analysis?
              </h2>
              <p className="mx-auto mt-3 max-w-[56ch] text-[15px] text-black/60 leading-relaxed">
                Get a detailed breakdown with state-specific guidance and clear
                next actions.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href={fullBreakdownHref}
                  className="rounded-full bg-black px-8 py-4 text-[16px] font-semibold text-white transition-transform active:scale-[0.98] hover:bg-black/90"
                >
                  Get full analysis
                </Link>
                <Link
                  href="/tools"
                  className="rounded-full border border-black/10 bg-white px-8 py-4 text-[16px] font-semibold text-black transition-colors hover:bg-black/[0.02]"
                >
                  Start with free tools
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
