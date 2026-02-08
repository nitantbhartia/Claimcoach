"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Shield,
  FileText,
  Phone,
  Scale,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Search,
  Eye,
  Zap,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* The Hook: Interactive offer input                                          */
/* -------------------------------------------------------------------------- */

function HeroHook() {
  const [offer, setOffer] = useState("");
  const [revealed, setRevealed] = useState(false);

  const parsedOffer = parseFloat(offer.replace(/[^0-9.]/g, ""));
  const isValid = !isNaN(parsedOffer) && parsedOffer > 0;

  // Simulated "typical recovery" multiplier
  const fairValue = isValid ? Math.round(parsedOffer * 2.37) : 0;
  const gap = fairValue - parsedOffer;

  function handleReveal() {
    if (!isValid) return;
    setRevealed(true);
  }

  return (
    <div className="max-w-lg mx-auto lg:mx-0">
      {/* The Paper Card */}
      <div className="bg-white rounded-xl shadow-document p-6 sm:p-8 relative">
        {/* Subtle paper texture top edge */}
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {!revealed ? (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="offer-hook"
                className="block text-body-sm font-medium text-slate-500 mb-2 uppercase tracking-wider"
              >
                What did the insurance company offer you?
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-serif font-semibold text-ink-800">
                  $
                </span>
                <input
                  id="offer-hook"
                  type="text"
                  inputMode="numeric"
                  placeholder="4,200"
                  value={offer}
                  onChange={(e) => {
                    setOffer(e.target.value.replace(/[^0-9.,]/g, ""));
                    setRevealed(false);
                  }}
                  className="w-full pl-10 pr-4 py-4 text-3xl sm:text-4xl font-serif font-semibold text-ink-800 bg-paper-warm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-800/20 focus:border-ink-800 transition-all placeholder:text-slate-300"
                />
              </div>
            </div>

            <button
              onClick={handleReveal}
              disabled={!isValid}
              className="w-full py-4 bg-ink-800 text-white font-medium rounded-lg hover:bg-ink-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-body-lg"
            >
              <Eye className="w-5 h-5" />
              Uncover the hidden coverage
            </button>

            <p className="text-caption text-slate-400 text-center">
              100% free. Takes 30 seconds.
            </p>
          </div>
        ) : (
          /* The Contrast — revealed state */
          <div className="space-y-5 animate-fade-in">
            {/* Their offer (struck through) */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-caption uppercase tracking-wider text-slate-400 mb-1">
                Their offer
              </p>
              <p className="text-2xl font-serif font-semibold text-slate-400 line-through decoration-danger-500 decoration-2">
                ${parsedOffer.toLocaleString()}
              </p>
            </div>

            {/* Fair value (highlighted) */}
            <div className="p-4 bg-white rounded-lg border-2 border-ink-800 relative">
              <div className="absolute -top-3 left-4 px-2 py-0.5 bg-highlight-yellow rounded text-caption font-semibold text-ink-800 uppercase tracking-wider">
                Typical fair value
              </div>
              <p className="text-3xl sm:text-4xl font-serif font-bold text-ink-800 mt-1">
                ${fairValue.toLocaleString()}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="w-4 h-4 text-success-600" />
                <span className="text-body-sm font-semibold text-success-600">
                  +${gap.toLocaleString()} recoverable
                </span>
              </div>
            </div>

            {/* The data point */}
            <p className="text-body-sm text-slate-500 text-center leading-relaxed">
              Policyholders who counter with documented evidence typically recover{" "}
              <span className="mark-yellow font-semibold text-ink-800">70&ndash;85%</span> of their
              fair value. That&apos;s{" "}
              <span className="font-semibold text-ink-800">
                ${Math.round(fairValue * 0.75).toLocaleString()}
              </span>{" "}
              in your pocket.
            </p>

            {/* The Action */}
            <Link href="/claims/new" className="block">
              <button className="w-full py-4 bg-ink-800 text-white font-medium rounded-lg hover:bg-ink-900 transition-all flex items-center justify-center gap-2 text-body-lg">
                Get my full analysis
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>

            <button
              onClick={() => setRevealed(false)}
              className="w-full text-body-sm text-slate-400 hover:text-slate-600 transition-colors"
            >
              Try a different amount
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Comparison Module                                                           */
/* -------------------------------------------------------------------------- */

function ComparisonModule() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-document overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-ink-800" />
          <p className="text-caption uppercase tracking-widest text-slate-500 font-medium">
            Settlement Comparison &mdash; 2022 Honda Civic EX
          </p>
        </div>

        {/* Insurer offer (greyed, struck through) */}
        <div className="px-6 py-5 bg-slate-50/60 border-b border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-caption uppercase tracking-wider text-slate-400 font-medium">
              State Farm Offer
            </p>
            <span className="px-2 py-0.5 rounded text-caption font-semibold bg-danger-50 text-danger-600">
              38/100 Fairness
            </span>
          </div>
          <div className="space-y-2">
            {[
              { label: "Vehicle Base Value", amount: "$4,200", fair: false },
              { label: "Loss of Use / Rental", amount: "$0", fair: false },
              { label: "Diminished Value", amount: "$0", fair: false },
              { label: "Sales Tax", amount: "$0", fair: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-body-sm text-slate-400">{item.label}</span>
                <span className="text-body-sm font-mono text-slate-400 line-through decoration-slate-300">
                  {item.amount}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <span className="text-body-sm font-semibold text-slate-400">Total</span>
              <span className="text-heading font-serif font-semibold text-slate-400 line-through decoration-danger-500 decoration-2">
                $4,200
              </span>
            </div>
          </div>
        </div>

        {/* Fair value (highlighted) */}
        <div className="px-6 py-5 bg-white">
          <div className="flex items-center justify-between mb-3">
            <p className="text-caption uppercase tracking-wider text-ink-800 font-semibold">
              ClaimCoach Fair Value
            </p>
            <span className="px-2 py-0.5 rounded text-caption font-semibold bg-highlight-yellow text-ink-800">
              Market-backed
            </span>
          </div>
          <div className="space-y-2">
            {[
              { label: "Vehicle Base Value", amount: "$6,800" },
              { label: "Loss of Use / Rental", amount: "$720" },
              { label: "Diminished Value", amount: "$1,800" },
              { label: "Sales Tax on Replacement", amount: "$476" },
              { label: "Registration / Title", amount: "$185" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-body-sm text-slate-600">{item.label}</span>
                <span className="text-body-sm font-mono font-semibold text-ink-800">
                  {item.amount}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2 border-t border-ink-800/10">
              <span className="text-body-sm font-semibold text-ink-800">Fair Total</span>
              <span className="text-heading-lg font-serif font-bold text-ink-800">
                <span className="mark-yellow">$9,981</span>
              </span>
            </div>
          </div>
        </div>

        {/* Gap bar */}
        <div className="px-6 py-4 bg-paper-cream border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-caption text-slate-500 uppercase tracking-wider font-medium">
              Money left on the table
            </span>
            <span className="text-body font-serif font-bold text-danger-600">+$5,781</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-danger-500 transition-all duration-1000"
              style={{ width: "58%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Feature cards                                                               */
/* -------------------------------------------------------------------------- */

const FEATURES = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Policy X-Ray",
    description:
      "AI reads every clause in your policy and highlights the coverages, limits, and exclusions that affect your claim. No legalese.",
    color: "bg-ink-50 text-ink-800",
  },
  {
    icon: <Scale className="w-6 h-6" />,
    title: "Fairness Gauge",
    description:
      "A market-data-backed score from 0-100 that shows exactly where your offer falls on the spectrum from undervalued to fair.",
    color: "bg-amber-50 text-amber-700",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Counter-Offer Letter",
    description:
      "A professional demand letter with itemized damages, comparable vehicle data, and policy citations. Tap to edit any amount.",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Call Script",
    description:
      "Word-for-word phone script with objection handlers for every tactic adjusters use. Know exactly what to say.",
    color: "bg-purple-50 text-purple-700",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "State Legal Guide",
    description:
      "Your state&apos;s insurance laws, filing deadlines, bad faith statutes, and Department of Insurance complaint process.",
    color: "bg-rose-50 text-rose-700",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Smart Autofill",
    description:
      "Snap a photo of your insurance card, VIN plate, or offer letter. AI extracts every detail in seconds.",
    color: "bg-sky-50 text-sky-700",
  },
];

/* -------------------------------------------------------------------------- */
/* Main page                                                                   */
/* -------------------------------------------------------------------------- */

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-paper-white">
      <Header />

      <main className="flex-1">
        {/* ---- HERO ---- */}
        <section className="relative overflow-hidden">
          {/* Subtle paper grain background */}
          <div className="absolute inset-0 bg-gradient-to-b from-paper-white via-paper-warm to-paper-cream" />

          <div className="relative container-wide py-16 sm:py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Copy */}
              <div>
                <p className="text-caption uppercase tracking-[0.2em] text-ink-800/60 font-medium mb-4">
                  AI-Powered Claim Advocacy
                </p>

                <h1 className="font-serif text-display sm:text-display-xl text-ink-800 leading-[1.05]">
                  Your insurer has
                  <br />
                  an unfair{" "}
                  <span className="relative inline-block">
                    advantage
                    <span className="absolute -bottom-1 left-0 right-0 h-3 bg-highlight-yellow/60 -z-10 rounded-sm" />
                  </span>
                  .
                </h1>

                <p className="mt-6 text-body-lg text-slate-500 max-w-lg leading-relaxed">
                  Adjusters handle 500+ claims a year with teams of analysts.
                  You handle one. ClaimCoach levels the playing field with
                  AI-powered policy analysis, market data, and professional
                  counter-offers.
                </p>

                <div className="mt-8 flex flex-wrap gap-6 text-body-sm text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-success-600" />
                    Free to start
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-success-600" />
                    Results in 5 min
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-success-600" />
                    No legal jargon
                  </span>
                </div>
              </div>

              {/* Right: The Hook */}
              <HeroHook />
            </div>
          </div>
        </section>

        {/* ---- CREDIBILITY STRIP ---- */}
        <section className="border-y border-slate-200/60 bg-white">
          <div className="container-wide py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 text-center">
            <div className="sm:border-r sm:border-slate-100">
              <p className="text-3xl sm:text-4xl font-serif font-bold text-ink-800">850M+</p>
              <p className="text-body-sm text-slate-500 mt-1">
                claims denied yearly in the US
              </p>
            </div>
            <div className="sm:border-r sm:border-slate-100">
              <p className="text-3xl sm:text-4xl font-serif font-bold text-ink-800">&lt;1%</p>
              <p className="text-body-sm text-slate-500 mt-1">
                of policyholders ever push back
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-serif font-bold text-ink-800">
                <span className="mark-yellow">40&ndash;50%</span>
              </p>
              <p className="text-body-sm text-slate-500 mt-1">
                win rate when they do
              </p>
            </div>
          </div>
        </section>

        {/* ---- COMPARISON MODULE ---- */}
        <section className="section-gap bg-paper-warm">
          <div className="container-wide">
            <div className="text-center mb-12">
              <p className="text-caption uppercase tracking-[0.2em] text-ink-800/60 font-medium mb-3">
                The Gap
              </p>
              <h2 className="font-serif text-display-sm sm:text-display text-ink-800">
                See what they&apos;re not telling you.
              </h2>
              <p className="mt-4 text-body-lg text-slate-500 max-w-xl mx-auto">
                The insurer&apos;s first offer is calculated to be as low as
                you&apos;ll accept. Here&apos;s what a real analysis uncovers.
              </p>
            </div>

            <ComparisonModule />
          </div>
        </section>

        {/* ---- HOW IT WORKS ---- */}
        <section id="how-it-works" className="section-gap bg-white">
          <div className="container-wide">
            <div className="text-center mb-16">
              <p className="text-caption uppercase tracking-[0.2em] text-ink-800/60 font-medium mb-3">
                Three Steps
              </p>
              <h2 className="font-serif text-display-sm sm:text-display text-ink-800">
                Upload. Analyze. Negotiate.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {/* Step 1 */}
              <div className="relative">
                <div className="bg-paper-warm rounded-xl p-6 sm:p-8 h-full border border-slate-100">
                  <span className="text-6xl font-serif font-bold text-slate-100 select-none absolute top-4 right-6">
                    1
                  </span>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-ink-50 flex items-center justify-center mb-5">
                      <Zap className="w-6 h-6 text-ink-800" />
                    </div>
                    <h3 className="text-heading-lg text-ink-800 font-semibold">
                      Upload your documents
                    </h3>
                    <p className="mt-3 text-body text-slate-500 leading-relaxed">
                      Drop in your insurance policy and the settlement offer.
                      AI reads them in seconds &mdash; no manual data entry.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="text-caption text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-100">
                        PDF &amp; images
                      </span>
                      <span className="text-caption text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-100">
                        VIN decode
                      </span>
                      <span className="text-caption text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-100">
                        Card scan
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="bg-paper-warm rounded-xl p-6 sm:p-8 h-full border border-slate-100">
                  <span className="text-6xl font-serif font-bold text-slate-100 select-none absolute top-4 right-6">
                    2
                  </span>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-5">
                      <Scale className="w-6 h-6 text-amber-700" />
                    </div>
                    <h3 className="text-heading-lg text-ink-800 font-semibold">
                      Get your fairness score
                    </h3>
                    <p className="mt-3 text-body text-slate-500 leading-relaxed">
                      AI compares the offer against KBB, NADA, and local
                      market data. Every dollar gap is itemized.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="text-caption text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-100">
                        Market comps
                      </span>
                      <span className="text-caption text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-100">
                        Line items
                      </span>
                      <span className="text-caption text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-100">
                        Gap analysis
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="bg-paper-warm rounded-xl p-6 sm:p-8 h-full border border-slate-100">
                  <span className="text-6xl font-serif font-bold text-slate-100 select-none absolute top-4 right-6">
                    3
                  </span>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-5">
                      <FileText className="w-6 h-6 text-emerald-700" />
                    </div>
                    <h3 className="text-heading-lg text-ink-800 font-semibold">
                      Negotiate with confidence
                    </h3>
                    <p className="mt-3 text-body text-slate-500 leading-relaxed">
                      Get a professional counter-offer letter, adjuster call
                      script, and escalation playbook. Ready to use.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="text-caption text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-100">
                        Demand letter
                      </span>
                      <span className="text-caption text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-100">
                        Call script
                      </span>
                      <span className="text-caption text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-100">
                        Escalation
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- FEATURE CARDS ---- */}
        <section className="section-gap bg-paper-cream/50">
          <div className="container-wide">
            <div className="text-center mb-14">
              <p className="text-caption uppercase tracking-[0.2em] text-ink-800/60 font-medium mb-3">
                The Toolkit
              </p>
              <h2 className="font-serif text-display-sm sm:text-display text-ink-800">
                Six tools. One goal.
              </h2>
              <p className="mt-4 text-body-lg text-slate-500 max-w-md mx-auto">
                Everything you need to understand your policy and fight for a fair settlement.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-xl border border-slate-100 p-6 hover:shadow-paper transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-heading text-ink-800 font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-body-sm text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- PRICING ---- */}
        <section className="section-gap bg-white">
          <div className="container-wide">
            <div className="text-center mb-14">
              <p className="text-caption uppercase tracking-[0.2em] text-ink-800/60 font-medium mb-3">
                Pricing
              </p>
              <h2 className="font-serif text-display-sm sm:text-display text-ink-800">
                Simple. Transparent.
              </h2>
              <p className="mt-4 text-body-lg text-slate-500 max-w-md mx-auto">
                Start free. Pay only when you need the full toolkit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Free */}
              <div className="bg-white rounded-xl border border-slate-200 p-8">
                <h3 className="font-serif text-heading-lg text-ink-800">Free</h3>
                <p className="text-body-sm text-slate-500 mt-1 mb-6">
                  See where you stand
                </p>
                <div className="space-y-3">
                  {[
                    "Upload policy and offer",
                    "Basic fairness score",
                    "Coverage summary",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-body text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link href="/signup">
                    <Button variant="outline" size="md" className="w-full">
                      Get started
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Full Toolkit */}
              <div className="bg-white rounded-xl border-2 border-ink-800 p-8 relative shadow-paper">
                <div className="absolute -top-3 left-6 px-3 py-0.5 rounded bg-ink-800 text-white text-caption font-medium uppercase tracking-wider">
                  Recommended
                </div>
                <h3 className="font-serif text-heading-lg text-ink-800">
                  Full Toolkit
                </h3>
                <p className="text-body-sm text-slate-500 mt-1 mb-6">
                  $79 per claim
                </p>
                <div className="space-y-3">
                  {[
                    "Everything in Free",
                    "Detailed line-item analysis",
                    "Professional counter-offer letter",
                    "Adjuster call script",
                    "State-specific legal guide",
                    "Escalation playbook",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-body text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-ink-800 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link href="/signup">
                    <Button size="md" className="w-full bg-ink-800 hover:bg-ink-900 text-white">
                      Start free, upgrade later
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <p className="mt-8 text-caption text-slate-400 text-center">
              Pro plan: $49/mo billed quarterly for unlimited claims. 30-day money-back guarantee.
            </p>
          </div>
        </section>

        {/* ---- OUTCOMES ---- */}
        <section className="section-gap bg-paper-warm">
          <div className="container-wide">
            <div className="text-center mb-14">
              <p className="text-caption uppercase tracking-[0.2em] text-ink-800/60 font-medium mb-3">
                Outcomes
              </p>
              <h2 className="font-serif text-display-sm sm:text-display text-ink-800">
                The data doesn&apos;t lie.
              </h2>
              <p className="mt-4 text-body-lg text-slate-500 max-w-xl mx-auto">
                Insurance companies settle for less when policyholders don&apos;t push back.
                Here&apos;s what the research shows.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white rounded-xl border border-slate-100 p-6 text-center">
                <p className="text-display-sm font-serif font-bold text-ink-800">$3,000&ndash;$5,000</p>
                <p className="text-body-sm text-slate-500 mt-2">
                  Average underpayment on auto property damage claims
                </p>
                <p className="text-caption text-slate-400 mt-3">
                  Source: NAIC consumer complaint data
                </p>
              </div>
              <div className="bg-white rounded-xl border border-slate-100 p-6 text-center">
                <p className="text-display-sm font-serif font-bold text-ink-800">
                  <span className="mark-yellow">2&ndash;3x</span>
                </p>
                <p className="text-body-sm text-slate-500 mt-2">
                  Higher settlements when policyholders counter with documented evidence
                </p>
                <p className="text-caption text-slate-400 mt-3">
                  Source: Insurance industry studies
                </p>
              </div>
              <div className="bg-white rounded-xl border border-slate-100 p-6 text-center">
                <p className="text-display-sm font-serif font-bold text-emerald-600">85%</p>
                <p className="text-body-sm text-slate-500 mt-2">
                  Of first offers can be successfully negotiated upward
                </p>
                <p className="text-caption text-slate-400 mt-3">
                  Source: Consumer advocacy research
                </p>
              </div>
              <div className="bg-white rounded-xl border border-slate-100 p-6 text-center">
                <p className="text-display-sm font-serif font-bold text-ink-800">44x</p>
                <p className="text-body-sm text-slate-500 mt-2">
                  Return on ClaimCoach&apos;s $79 fee based on avg. recovery increase
                </p>
                <p className="text-caption text-slate-400 mt-3">
                  $79 fee vs. $3,500 avg. additional recovery
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <section className="section-gap bg-white">
          <div className="container-narrow">
            <div className="text-center mb-14">
              <p className="text-caption uppercase tracking-[0.2em] text-ink-800/60 font-medium mb-3">
                FAQ
              </p>
              <h2 className="font-serif text-display-sm sm:text-display text-ink-800">
                Common questions.
              </h2>
            </div>

            <div className="space-y-0 divide-y divide-slate-100">
              {[
                {
                  q: "Is ClaimCoach legal advice?",
                  a: "No. ClaimCoach is an educational and analytical tool that helps you understand your policy and evaluate settlement offers. We don\u2019t provide legal advice, represent you in disputes, or act as a public adjuster. If you need legal counsel, we recommend consulting a licensed attorney in your state.",
                },
                {
                  q: "How is the fair value calculated?",
                  a: "Our AI analyzes your vehicle\u2019s year, make, model, mileage, condition, and local market data from sources like KBB and NADA. It then compares the insurer\u2019s offer against comparable vehicles, applicable coverages (diminished value, loss of use, sales tax), and your specific policy terms to determine a data-backed fair value range.",
                },
                {
                  q: "What if my claim has already been denied?",
                  a: "ClaimCoach can still help. We\u2019ll analyze the denial reason against your policy language, identify potential grounds for appeal, and generate the documentation you need to reopen your claim. Many denials are overturned when policyholders respond with specific policy citations.",
                },
                {
                  q: "Do I still need a lawyer?",
                  a: "Most auto property damage claims can be resolved without an attorney. ClaimCoach gives you the same analytical tools and negotiation materials that professionals use. However, if your claim involves injuries, bad faith, or amounts over $25,000, we recommend also consulting an attorney.",
                },
                {
                  q: "How long does the analysis take?",
                  a: "Most analyses complete in under five minutes. Upload your policy and offer documents, and our AI immediately begins scanning, highlighting key clauses, and generating your fairness score, counter-offer letter, and negotiation toolkit.",
                },
                {
                  q: "What types of claims do you support?",
                  a: "Currently, ClaimCoach specializes in auto property damage claims (total loss, collision, comprehensive). This includes vehicle valuation disputes, diminished value claims, loss of use, and supplemental damage claims. Homeowners and other claim types are coming soon.",
                },
                {
                  q: "What if the insurer won\u2019t budge?",
                  a: "ClaimCoach includes a step-by-step escalation playbook: from supervisor requests to Department of Insurance complaints to small claims court guidance. Each step includes templates, scripts, and state-specific deadlines. Most insurers respond to well-documented escalation.",
                },
              ].map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="text-heading text-ink-800 font-medium pr-4">
                      {item.q}
                    </span>
                    <span className="text-slate-400 group-open:rotate-45 transition-transform duration-200 flex-shrink-0 text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-body text-slate-500 leading-relaxed max-w-2xl">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---- FINAL CTA ---- */}
        <section className="bg-ink-800 text-white">
          <div className="container-wide py-16 sm:py-24 lg:py-28 text-center">
            <h2 className="font-serif text-display-sm sm:text-display text-white max-w-2xl mx-auto">
              Stop accepting their first number.
            </h2>
            <p className="mt-5 text-body-lg text-white/60 max-w-lg mx-auto">
              Your policy entitles you to a fair settlement. Find out what
              that number actually is.
            </p>

            <div className="mt-10">
              <Link href="/claims/new">
                <Button
                  size="lg"
                  className="bg-white text-ink-800 hover:bg-slate-100 font-semibold"
                >
                  Get my free analysis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-body-sm text-white/40">
              100% free. No credit card. Results in under five minutes.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
