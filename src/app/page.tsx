"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { STATE_CODE_TO_NAME, STATE_NAMES, STATE_SALES_TAX } from "@/lib/tools/data";

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
    {
      label: "Sales tax recovery",
      low: taxRecovery,
      high: taxRecovery,
    },
    {
      label: "Title and registration fees",
      low: titleAndRegistrationFees * 0.9,
      high: titleAndRegistrationFees,
    },
    {
      label: "Comparable valuation adjustments",
      low: valuationAdjustment * 0.8,
      high: valuationAdjustment * 1.2,
    },
    {
      label: "Condition and equipment adjustments",
      low: conditionAdjustment * 0.7,
      high: conditionAdjustment,
    },
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
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-300 bg-white px-4 py-3 sm:hidden">
      <Link
        href={href}
        className="block w-full rounded-xl bg-[#0EA5A4] px-4 py-3 text-center font-display text-[0.95rem] font-bold text-white transition-colors hover:bg-[#0F766E]"
      >
        See full breakdown
      </Link>
    </div>
  );
}

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

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-body pb-20 sm:pb-0">
      <Header />
      <StickyMobileCTA href={fullBreakdownHref} />

      <main>
        <section id="homepage-hero" className="mx-auto max-w-[1120px] px-5 pb-16 pt-10 sm:px-6 sm:pt-14">
          <div className="max-w-[640px]">
            <p className="mb-4 inline-flex items-center rounded-full border border-[#CBD5E1] bg-white px-3 py-1 text-caption text-slate-600">
              Total loss claim check
            </p>
            <h1 className="font-display text-[2rem] font-extrabold leading-tight tracking-[-0.02em] text-[#0F172A] sm:text-[2.6rem]">
              Check if your insurance offer is missing money in under 2 minutes.
            </h1>
            <p className="mt-4 max-w-[62ch] text-body-lg text-slate-600">
              Enter your offer and state. We estimate common missing line items like sales tax,
              transfer fees, and valuation adjustments so you know what to review next.
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-[#CBD5E1] bg-white p-5 shadow-subtle sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="offer" className="mb-1 block text-body-sm font-semibold text-slate-700">
                  Settlement offer amount
                </label>
                <input
                  id="offer"
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g., 14500"
                  value={offer}
                  onBlur={() => setTouched((prev) => ({ ...prev, offer: true }))}
                  onChange={(e) => setOffer(e.target.value.replace(/[^0-9.,]/g, ""))}
                  className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2.5 text-body text-[#0F172A] outline-none transition-colors focus:border-[#0EA5A4]"
                />
                {touched.offer && !isOfferValid && (
                  <p className="mt-1 text-caption text-[#D97706]">
                    Enter a valid amount of at least $1,000.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="state" className="mb-1 block text-body-sm font-semibold text-slate-700">
                  State
                </label>
                <select
                  id="state"
                  value={stateName}
                  onBlur={() => setTouched((prev) => ({ ...prev, state: true }))}
                  onChange={(e) => setStateName(e.target.value)}
                  className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2.5 text-body text-[#0F172A] outline-none transition-colors focus:border-[#0EA5A4]"
                >
                  <option value="">Select state...</option>
                  {STATE_NAMES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {touched.state && !stateName && (
                  <p className="mt-1 text-caption text-[#D97706]">Select your state to continue.</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              {estimate ? (
                <Link
                  href={fullBreakdownHref}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#0EA5A4] px-4 py-3 font-display text-body font-bold text-white transition-colors hover:bg-[#0F766E]"
                >
                  See full breakdown
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#0EA5A4]/60 px-4 py-3 font-display text-body font-bold text-white"
                >
                  Check my offer
                </button>
              )}
              <p className="mt-2 text-center text-caption text-slate-500">
                Educational tool, not legal advice.
              </p>
            </div>
          </div>

          {estimate && (
            <div className="mt-6 rounded-xl border border-[#CBD5E1] bg-white p-5 sm:p-6" id="result-panel">
              <p className="text-label uppercase text-slate-500">Estimated missing amount</p>
              <p className="mt-2 font-mono text-[1.7rem] font-semibold text-[#166534] sm:text-[2rem]">
                {toUSD(estimate.estimated_missing_low)} - {toUSD(estimate.estimated_missing_high)}
              </p>
              <p className="mt-2 max-w-[70ch] text-body-sm text-slate-600">
                This estimate is based on common total loss line items in {stateName}, including
                sales tax at {estimate.tax_rate_percent}% average combined rate.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {estimate.included_line_items.map((item) => (
                  <span
                    key={item.label}
                    className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-caption text-slate-700"
                  >
                    {item.label}
                  </span>
                ))}
              </div>

              <div className="mt-5 grid gap-2 rounded-xl border border-[#CBD5E1] bg-slate-50 p-4">
                {estimate.included_line_items.map((item) => (
                  <div key={`row-${item.label}`} className="flex justify-between gap-3 text-body-sm">
                    <span className="text-slate-600">{item.label}</span>
                    <span className="font-mono text-[#0F172A]">
                      {toUSD(item.low)}{item.low !== item.high ? ` - ${toUSD(item.high)}` : ""}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-caption text-slate-500">
                Educational tool. Results are directional and should be validated against your
                policy and offer documents.
              </p>
            </div>
          )}
        </section>

        <section className="border-y border-[#CBD5E1] bg-white">
          <div className="mx-auto grid max-w-[1120px] gap-5 px-5 py-16 sm:grid-cols-3 sm:px-6">
            <article className="rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-5">
              <p className="text-label uppercase text-slate-500">Step 1</p>
              <h2 className="mt-2 font-display text-heading-lg text-[#0F172A]">Enter offer details</h2>
              <p className="mt-2 text-body-sm text-slate-600">
                Start with your settlement amount and state to run a quick screening check.
              </p>
            </article>
            <article className="rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-5">
              <p className="text-label uppercase text-slate-500">Step 2</p>
              <h2 className="mt-2 font-display text-heading-lg text-[#0F172A]">We compare benchmarks</h2>
              <p className="mt-2 text-body-sm text-slate-600">
                We apply state rules, market assumptions, and common claim line items.
              </p>
            </article>
            <article className="rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-5">
              <p className="text-label uppercase text-slate-500">Step 3</p>
              <h2 className="mt-2 font-display text-heading-lg text-[#0F172A]">Get your next steps</h2>
              <p className="mt-2 text-body-sm text-slate-600">
                See a structured breakdown, then move into full analysis if needed.
              </p>
            </article>
          </div>
        </section>

        <section className="mx-auto max-w-[1120px] px-5 py-16 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="font-display text-[1.6rem] font-bold text-[#0F172A]">Proof and trust</h2>
              {TESTIMONIALS.map((testimonial) => (
                <blockquote
                  key={testimonial.person}
                  className="rounded-xl border border-[#CBD5E1] bg-white p-5"
                >
                  <p className="text-body text-slate-700">"{testimonial.quote}"</p>
                  <footer className="mt-3 text-caption text-slate-500">
                    {testimonial.person} - {testimonial.state}
                  </footer>
                </blockquote>
              ))}
            </div>

            <div className="rounded-xl border border-[#CBD5E1] bg-white p-5">
              <h3 className="font-display text-heading-lg text-[#0F172A]">Method and assumptions</h3>
              <details className="mt-4 rounded-lg border border-slate-300 p-3">
                <summary className="cursor-pointer text-body-sm font-semibold text-slate-700">
                  What this estimate checks
                </summary>
                <ul className="mt-3 space-y-2 text-body-sm text-slate-600">
                  <li>Sales tax treatment in your state.</li>
                  <li>Common replacement-related fees and transfer costs.</li>
                  <li>Frequent valuation and condition adjustments.</li>
                </ul>
              </details>
              <details className="mt-3 rounded-lg border border-slate-300 p-3">
                <summary className="cursor-pointer text-body-sm font-semibold text-slate-700">
                  Assumptions and limits
                </summary>
                <ul className="mt-3 space-y-2 text-body-sm text-slate-600">
                  {(estimate?.assumptions ?? [
                    "Uses standard assumptions until your exact offer letter is reviewed.",
                    "Some states require additional documentation windows.",
                    "Final value can vary with endorsements and vehicle specifics.",
                  ]).map((assumption) => (
                    <li key={assumption}>{assumption}</li>
                  ))}
                </ul>
              </details>
              <p className="mt-4 text-caption text-slate-500">
                Last updated: {LAST_UPDATED_AT}. Source: state revenue and insurance guidance data.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1120px] px-5 pb-20 sm:px-6">
          <div className="rounded-xl border border-[#CBD5E1] bg-white p-6 text-center">
            <h2 className="font-display text-[1.45rem] font-bold text-[#0F172A]">
              Ready for a full claim analysis?
            </h2>
            <p className="mx-auto mt-2 max-w-[64ch] text-body text-slate-600">
              Get a detailed breakdown with state-specific guidance and clear next actions.
            </p>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={fullBreakdownHref}
                className="rounded-xl bg-[#0EA5A4] px-5 py-3 font-display text-body font-bold text-white transition-colors hover:bg-[#0F766E]"
              >
                Get full analysis
              </Link>
              <Link
                href="/tools"
                className="rounded-xl border border-[#CBD5E1] bg-white px-5 py-3 font-display text-body font-semibold text-[#0F172A] transition-colors hover:bg-slate-50"
              >
                Start with free tools
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
