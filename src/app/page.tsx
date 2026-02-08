"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  AlertTriangle,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* useInView — lightweight IntersectionObserver hook                           */
/* -------------------------------------------------------------------------- */

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* -------------------------------------------------------------------------- */
/* Sticky CTA — floats until user scrolls past the hero hook                  */
/* -------------------------------------------------------------------------- */

function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const heroHook = document.getElementById("hero-hook-section");
      if (!heroHook) return;
      const rect = heroHook.getBoundingClientRect();
      // Show sticky CTA when hero hook scrolls out of view
      setVisible(rect.bottom < 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-ink-800/95 backdrop-blur-sm border-t border-white/10 px-4 py-3 sm:py-4 transition-all animate-slide-up">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <p className="text-body-sm font-medium text-white">
            Find out what your claim is really worth
          </p>
          <p className="text-caption text-white/50">Free analysis. Results in 5 minutes.</p>
        </div>
        <Link href="/claims/new" className="flex-shrink-0 w-full sm:w-auto">
          <button className="w-full sm:w-auto px-6 py-3 bg-white text-ink-800 font-semibold rounded-lg hover:bg-slate-100 transition-all flex items-center justify-center gap-2 text-body-sm">
            <Eye className="w-4 h-4" />
            Uncover hidden coverage
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Evidence Counter — ticking odometer after hero                             */
/* -------------------------------------------------------------------------- */

function EvidenceCounter() {
  const [count, setCount] = useState(1_420_550);
  const { ref, inView } = useInView(0.5);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      // Random increment between $47 and $389 every 200ms
      setCount((prev) => prev + Math.floor(Math.random() * 342) + 47);
    }, 200);
    return () => clearInterval(interval);
  }, [inView]);

  // Format with commas
  const formatted = count.toLocaleString();

  return (
    <section ref={ref} className="bg-ink-800 text-white overflow-hidden">
      <div className="container-wide py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-body-sm text-white/60 uppercase tracking-wider font-medium">
              Underpaid claims identified today
            </p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-white/40 text-3xl sm:text-4xl font-mono font-bold">$</span>
            {formatted.split("").map((char, i) => (
              <span
                key={`${i}-${char}`}
                className="inline-block text-3xl sm:text-4xl font-mono font-bold text-emerald-400 odometer-digit"
                style={{
                  animation: char !== "," ? "odometer 0.15s ease-out" : "none",
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* The Hook: Interactive offer input                                          */
/* -------------------------------------------------------------------------- */

function HeroHook() {
  const [offer, setOffer] = useState("");
  const [revealed, setRevealed] = useState(false);

  const parsedOffer = parseFloat(offer.replace(/[^0-9.]/g, ""));
  const isValid = !isNaN(parsedOffer) && parsedOffer > 0;

  const fairValue = isValid ? Math.round(parsedOffer * 2.37) : 0;
  const gap = fairValue - parsedOffer;

  function handleReveal() {
    if (!isValid) return;
    setRevealed(true);
  }

  return (
    <div className="max-w-lg mx-auto lg:mx-0">
      <div className="bg-white rounded-2xl shadow-sharp p-6 sm:p-8 relative">
        {/* Top edge accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ink-800 via-ink-500 to-ink-800 rounded-t-2xl" />

        {!revealed ? (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="offer-hook"
                className="block text-body-sm font-medium text-slate-500 mb-2 uppercase tracking-wider"
              >
                What did they offer you?
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
              className="w-full py-4 bg-ink-800 text-white font-medium rounded-lg hover:bg-ink-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-body-lg shadow-sharp-sm hover:shadow-sharp active:scale-[0.98]"
            >
              <Eye className="w-5 h-5" />
              Uncover the hidden coverage
            </button>

            <p className="text-caption text-slate-400 text-center">
              100% free. Takes 30 seconds.
            </p>
          </div>
        ) : (
          <div className="space-y-5 animate-fade-in">
            {/* Their offer */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-caption uppercase tracking-wider text-slate-400 mb-1">
                Their offer
              </p>
              <p className="text-2xl font-serif font-semibold text-slate-400 line-through decoration-danger-500 decoration-2">
                ${parsedOffer.toLocaleString()}
              </p>
            </div>

            {/* Fair value */}
            <div className="p-4 bg-white rounded-lg border-2 border-ink-800 relative shadow-sharp-sm">
              <div className="absolute -top-3 left-4 px-2 py-0.5 bg-highlight-yellow rounded text-caption font-semibold text-ink-800 uppercase tracking-wider">
                Typical fair value
              </div>
              <p className="text-3xl sm:text-4xl font-serif font-bold text-ink-800 mt-1">
                ${fairValue.toLocaleString()}
              </p>
              {/* Glowing gap pill */}
              <div className="flex items-center gap-2 mt-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-body-sm font-bold text-emerald-700 animate-pulse-glow">
                  <TrendingUp className="w-4 h-4" />
                  +${gap.toLocaleString()}
                </span>
                <span className="text-caption text-slate-400">recoverable</span>
              </div>
            </div>

            <p className="text-body-sm text-slate-500 text-center leading-relaxed">
              Policyholders who counter with evidence recover{" "}
              <span className="mark-yellow font-semibold text-ink-800">70&ndash;85%</span> of fair
              value. That&apos;s{" "}
              <span className="font-semibold text-ink-800">
                ${Math.round(fairValue * 0.75).toLocaleString()}
              </span>{" "}
              in your pocket.
            </p>

            <Link href="/claims/new" className="block">
              <button className="w-full py-4 bg-ink-800 text-white font-medium rounded-lg hover:bg-ink-900 transition-all flex items-center justify-center gap-2 text-body-lg shadow-sharp-sm hover:shadow-sharp">
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
/* Comparison Dashboard — animated cards with bridge visualization            */
/* -------------------------------------------------------------------------- */

function ComparisonDashboard() {
  const { ref, inView } = useInView(0.2);
  const [revealPercent, setRevealPercent] = useState(0);

  // Touch/drag X-Ray reveal for mobile
  const containerRef = useRef<HTMLDivElement>(null);
  const handleDrag = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setRevealPercent(pct);
  }, []);

  // Auto-reveal on desktop when in view
  useEffect(() => {
    if (!inView) return;
    // Only auto-reveal if user hasn't manually dragged
    const timer = setTimeout(() => {
      setRevealPercent((prev) => (prev > 10 ? prev : 100));
    }, 600);
    return () => clearTimeout(timer);
  }, [inView]);

  const theirTotal = 4200;
  const fairTotal = 9981;
  const gap = fairTotal - theirTotal;

  return (
    <div ref={ref}>
      {/* X-Ray Reveal Container */}
      <div
        ref={containerRef}
        className="relative max-w-3xl mx-auto cursor-grab active:cursor-grabbing touch-none select-none"
        onPointerMove={(e) => {
          if (e.buttons > 0) handleDrag(e.clientX);
        }}
        onPointerDown={(e) => handleDrag(e.clientX)}
      >
        {/* Base layer: Their Offer */}
        <div className="bg-white rounded-2xl shadow-sharp-sm overflow-hidden border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-danger-500" />
              <p className="text-caption uppercase tracking-widest text-slate-400 font-medium">
                Their Offer &mdash; 2022 Honda Civic EX
              </p>
            </div>
            <span className="px-2 py-0.5 rounded text-caption font-semibold bg-danger-50 text-danger-600">
              38/100
            </span>
          </div>
          <div className="px-6 py-5 space-y-2.5">
            {[
              { label: "Vehicle Base Value", amount: "$4,200" },
              { label: "Loss of Use / Rental", amount: "$0" },
              { label: "Diminished Value", amount: "$0" },
              { label: "Sales Tax", amount: "$0" },
              { label: "Registration / Title", amount: "$0" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-body-sm text-slate-400">{item.label}</span>
                <span className="text-body-sm font-mono text-slate-400 line-through decoration-slate-300">
                  {item.amount}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <span className="text-body-sm font-semibold text-slate-400">Total</span>
              <span className="text-heading-lg font-serif font-semibold text-slate-400 line-through decoration-danger-500 decoration-2">
                $4,200
              </span>
            </div>
          </div>
        </div>

        {/* Overlay: ClaimCoach Audit — revealed via X-Ray slide */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl transition-all duration-300 ease-out"
          style={{ width: `${revealPercent}%` }}
        >
          <div className="bg-white rounded-2xl shadow-sharp overflow-hidden border-2 border-ink-800"
            style={{ width: containerRef.current?.offsetWidth || "100%", minWidth: "100%" }}
          >
            <div className="px-6 py-4 border-b border-ink-800/10 flex items-center justify-between bg-ink-800">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <p className="text-caption uppercase tracking-widest text-white/80 font-medium">
                  ClaimCoach Audit &mdash; 2022 Honda Civic EX
                </p>
              </div>
              <span className="px-2 py-0.5 rounded text-caption font-semibold bg-highlight-yellow text-ink-800">
                Market-backed
              </span>
            </div>
            <div className="px-6 py-5 space-y-2.5 bg-white">
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
              <div className="flex items-center justify-between pt-3 border-t border-ink-800/10">
                <span className="text-body-sm font-semibold text-ink-800">Fair Total</span>
                <span className="text-heading-lg font-serif font-bold text-ink-800">
                  <span className="mark-yellow">$9,981</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Drag handle indicator */}
        {revealPercent < 100 && revealPercent > 0 && (
          <div
            className="absolute top-0 bottom-0 w-1 bg-ink-800 z-10"
            style={{ left: `${revealPercent}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-ink-800 border-2 border-white shadow-sharp-sm flex items-center justify-center">
              <span className="text-white text-caption font-bold">&harr;</span>
            </div>
          </div>
        )}
      </div>

      {/* Mobile hint */}
      <p className="text-center text-caption text-slate-400 mt-4 sm:hidden">
        &larr; Drag to reveal the hidden line items &rarr;
      </p>

      {/* Bridge Visualization */}
      <div className="max-w-3xl mx-auto mt-6">
        <div className="bg-white rounded-xl shadow-sharp-sm p-5 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="text-left">
              <p className="text-caption uppercase tracking-wider text-slate-400 font-medium">Their offer</p>
              <p className="text-heading font-serif font-semibold text-slate-400">$4,200</p>
            </div>
            <div className="text-right">
              <p className="text-caption uppercase tracking-wider text-ink-800 font-medium">Fair value</p>
              <p className="text-heading font-serif font-bold text-ink-800">$9,981</p>
            </div>
          </div>
          {/* The Bridge */}
          <div className="relative w-full h-6 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 transition-all duration-1000 ease-out ${inView ? "animate-bridge-fill" : ""}`}
              style={{ width: inView ? `${(gap / fairTotal) * 100}%` : "0%" }}
            />
            {/* Percentage labels */}
            <div
              className="absolute inset-y-0 flex items-center text-caption font-bold text-white pl-3"
              style={{ width: `${(theirTotal / fairTotal) * 100}%` }}
            >
              {inView && <span className="bg-slate-400/80 px-1.5 py-0.5 rounded text-white">${theirTotal.toLocaleString()}</span>}
            </div>
          </div>
          {/* Gap pill */}
          <div className="flex justify-center mt-3">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-body font-bold text-emerald-700 animate-pulse-glow">
              +${gap.toLocaleString()} left on the table
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Feature cards data                                                         */
/* -------------------------------------------------------------------------- */

const FEATURES = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Policy X-Ray",
    description:
      "AI reads every clause and highlights the coverages, limits, and exclusions your adjuster hopes you miss.",
    color: "bg-ink-50 text-ink-800",
  },
  {
    icon: <Scale className="w-6 h-6" />,
    title: "Fairness Gauge",
    description:
      "A market-data-backed score from 0\u2013100 showing exactly how much you\u2019re being shortchanged.",
    color: "bg-amber-50 text-amber-700",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Counter-Offer Letter",
    description:
      "Professional demand letter with itemized damages, comparable vehicle data, and policy citations they can\u2019t ignore.",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Call Script",
    description:
      "Word-for-word phone script with objection handlers for every tactic adjusters use. Never go in unprepared.",
    color: "bg-purple-50 text-purple-700",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "State Legal Guide",
    description:
      "Your state\u2019s insurance laws, filing deadlines, bad faith statutes, and DOI complaint process.",
    color: "bg-rose-50 text-rose-700",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Escalation Playbook",
    description:
      "Step-by-step guide from supervisor requests to DOI complaints to small claims court. They respond to pressure.",
    color: "bg-sky-50 text-sky-700",
  },
];

/* -------------------------------------------------------------------------- */
/* Myth vs Reality FAQ                                                        */
/* -------------------------------------------------------------------------- */

const MYTHS = [
  {
    myth: "\u201CThe first offer is fair.\u201D",
    reality: "The first offer is calculated to be the lowest amount you\u2019ll accept. 85% of initial offers can be negotiated upward with documented evidence.",
  },
  {
    myth: "\u201CYou need a lawyer for every claim.\u201D",
    reality: "Most auto property damage claims under $25,000 can be resolved without an attorney. ClaimCoach gives you the same tools and leverage professionals use.",
  },
  {
    myth: "\u201CClaimCoach provides legal advice.\u201D",
    reality: "No. ClaimCoach is an educational and analytical tool. We help you understand your policy and build evidence-backed counter-offers. For legal representation, consult a licensed attorney.",
  },
  {
    myth: "\u201CInsurance companies won\u2019t budge.\u201D",
    reality: "Adjusters negotiate every day\u2014they expect pushback. A well-documented counter-offer with policy citations and market data changes the conversation entirely.",
  },
  {
    myth: "\u201CIt takes weeks to fight a claim.\u201D",
    reality: "ClaimCoach generates your full analysis, counter-offer letter, and call script in under 5 minutes. Most claim disputes resolve within 2\u20134 weeks.",
  },
  {
    myth: "\u201CDiminished value doesn\u2019t apply to me.\u201D",
    reality: "If your vehicle was in an accident, it\u2019s worth less\u2014even after repairs. Most states allow diminished value claims, and most adjusters conveniently \u201Cforget\u201D to include it.",
  },
  {
    myth: "\u201C$79 is expensive for claim help.\u201D",
    reality: "The average additional recovery is $3,500+. That\u2019s a 44x return. A single missed line item (sales tax, rental, diminished value) often exceeds $79.",
  },
];

/* -------------------------------------------------------------------------- */
/* Main page                                                                   */
/* -------------------------------------------------------------------------- */

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-paper-white">
      <Header />
      <StickyCTA />

      <main className="flex-1">
        {/* ---- HERO ---- */}
        <section id="hero-hook-section" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-paper-white via-paper-warm to-paper-cream" />

          <div className="relative container-wide py-16 sm:py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Asymmetric copy */}
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
                  You handle one. ClaimCoach levels the playing field.
                </p>

                {/* Data pills — asymmetric right float */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink-800 text-white text-body-sm font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Free to start
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink-800 text-white text-body-sm font-medium">
                    <Zap className="w-3.5 h-3.5" />
                    Results in 5 min
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink-800/10 text-ink-800 text-body-sm font-medium">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    85% of offers are low
                  </span>
                </div>
              </div>

              {/* Right: The Hook */}
              <HeroHook />
            </div>
          </div>
        </section>

        {/* ---- EVIDENCE COUNTER ---- */}
        <EvidenceCounter />

        {/* ---- COMPARISON DASHBOARD ---- */}
        <section className="section-gap bg-paper-warm">
          <div className="container-wide">
            {/* Asymmetric header */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
              <div className="max-w-lg">
                <p className="text-caption uppercase tracking-[0.2em] text-ink-800/60 font-medium mb-3">
                  The Gap
                </p>
                <h2 className="font-serif text-display-sm sm:text-display text-ink-800">
                  See what they&apos;re hiding.
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-4 py-2 rounded-full bg-ink-800 text-white text-body-sm font-semibold">
                  $5,781 hidden
                </span>
                <span className="px-4 py-2 rounded-full bg-danger-50 text-danger-600 text-body-sm font-semibold">
                  38/100 fairness
                </span>
              </div>
            </div>

            <ComparisonDashboard />
          </div>
        </section>

        {/* ---- HOW IT WORKS ---- */}
        <section id="how-it-works" className="section-gap bg-white">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-16">
              <div>
                <p className="text-caption uppercase tracking-[0.2em] text-ink-800/60 font-medium mb-3">
                  Three Steps
                </p>
                <h2 className="font-serif text-display-sm sm:text-display text-ink-800">
                  Upload. Analyze. Negotiate.
                </h2>
              </div>
              <span className="px-4 py-2 rounded-full bg-ink-50 text-ink-800 text-body-sm font-semibold self-start lg:self-auto">
                &lt; 5 minutes total
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  num: "1",
                  icon: <Zap className="w-6 h-6 text-ink-800" />,
                  iconBg: "bg-ink-50",
                  title: "Upload your documents",
                  desc: "Drop in your insurance policy and the settlement offer. AI reads them in seconds\u2014no manual data entry.",
                  tags: ["PDF & images", "VIN decode", "Card scan"],
                },
                {
                  num: "2",
                  icon: <Scale className="w-6 h-6 text-amber-700" />,
                  iconBg: "bg-amber-50",
                  title: "Get your fairness score",
                  desc: "AI compares the offer against KBB, NADA, and local market data. Every dollar gap is itemized.",
                  tags: ["Market comps", "Line items", "Gap analysis"],
                },
                {
                  num: "3",
                  icon: <FileText className="w-6 h-6 text-emerald-700" />,
                  iconBg: "bg-emerald-50",
                  title: "Negotiate with confidence",
                  desc: "Get a professional counter-offer letter, adjuster call script, and escalation playbook. Ready to use.",
                  tags: ["Demand letter", "Call script", "Escalation"],
                },
              ].map((step) => (
                <div key={step.num} className="relative group">
                  <div className="bg-paper-warm rounded-2xl p-6 sm:p-8 h-full border border-slate-100 hover:shadow-sharp-sm transition-all duration-300 hover:-translate-y-1">
                    <span className="text-6xl font-serif font-bold text-slate-100 select-none absolute top-4 right-6">
                      {step.num}
                    </span>
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-xl ${step.iconBg} flex items-center justify-center mb-5`}>
                        {step.icon}
                      </div>
                      <h3 className="text-heading-lg text-ink-800 font-semibold">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-body text-slate-500 leading-relaxed">
                        {step.desc}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {step.tags.map((tag) => (
                          <span key={tag} className="text-caption text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- THE ADJUSTER'S NIGHTMARE (FEATURES) ---- */}
        <section className="section-gap bg-ink-800">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-14">
              <div>
                <p className="text-caption uppercase tracking-[0.2em] text-white/40 font-medium mb-3">
                  The Toolkit
                </p>
                <h2 className="font-serif text-display-sm sm:text-display text-white">
                  The adjuster&apos;s nightmare.
                </h2>
              </div>
              <p className="text-body text-white/40 max-w-sm">
                Six tools that turn every policyholder into a prepared negotiator.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-heading text-white font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-body-sm text-white/50 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- THE $79 INVESTMENT (PRICING) ---- */}
        <section className="section-gap bg-paper-cream/50">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-14">
              <div>
                <p className="text-caption uppercase tracking-[0.2em] text-ink-800/60 font-medium mb-3">
                  Pricing
                </p>
                <h2 className="font-serif text-display-sm sm:text-display text-ink-800">
                  The $79 investment.
                </h2>
              </div>
              <span className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-body-sm font-semibold self-start lg:self-auto">
                44x avg. return
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Free */}
              <div className="bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-sharp-sm transition-all duration-300">
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

              {/* Full Toolkit — premium card with holographic border */}
              <div className="premium-card p-8 relative shadow-premium-glow hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute -top-3 left-6 px-3 py-0.5 rounded bg-ink-800 text-white text-caption font-medium uppercase tracking-wider z-10">
                  Recommended
                </div>
                <h3 className="font-serif text-heading-lg text-ink-800">
                  Full Toolkit
                </h3>
                <div className="flex items-baseline gap-2 mt-1 mb-6">
                  <span className="text-display-sm font-serif font-bold text-ink-800">$79</span>
                  <span className="text-body-sm text-slate-500">per claim</span>
                </div>
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
                    <Button size="md" className="w-full bg-ink-800 hover:bg-ink-900 text-white shadow-sharp-sm hover:shadow-sharp">
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
        <section className="section-gap bg-white">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-14">
              <div>
                <p className="text-caption uppercase tracking-[0.2em] text-ink-800/60 font-medium mb-3">
                  Outcomes
                </p>
                <h2 className="font-serif text-display-sm sm:text-display text-ink-800">
                  The data doesn&apos;t lie.
                </h2>
              </div>
              <span className="px-4 py-2 rounded-full bg-ink-800 text-white text-body-sm font-semibold self-start lg:self-auto">
                Industry research
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { value: "$3K\u20135K", label: "Average underpayment on auto property damage claims", source: "NAIC data" },
                { value: "2\u20133x", label: "Higher settlements with documented counter-offers", source: "Industry studies", highlight: true },
                { value: "85%", label: "Of first offers can be negotiated upward", source: "Consumer advocacy", color: "text-emerald-600" },
                { value: "44x", label: "Return on ClaimCoach\u2019s $79 fee", source: "$79 vs $3,500 avg." },
              ].map((stat) => (
                <div key={stat.value} className="bg-paper-warm rounded-2xl border border-slate-100 p-6 text-center hover:shadow-sharp-sm transition-all duration-300 hover:-translate-y-1">
                  <p className={`text-display-sm font-serif font-bold ${stat.color || "text-ink-800"}`}>
                    {stat.highlight ? <span className="mark-yellow">{stat.value}</span> : stat.value}
                  </p>
                  <p className="text-body-sm text-slate-500 mt-2">{stat.label}</p>
                  <p className="text-caption text-slate-400 mt-3">{stat.source}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- MYTH vs REALITY ---- */}
        <section className="section-gap bg-paper-warm">
          <div className="container-narrow">
            <div className="text-center mb-14">
              <p className="text-caption uppercase tracking-[0.2em] text-ink-800/60 font-medium mb-3">
                Myth vs. Reality
              </p>
              <h2 className="font-serif text-display-sm sm:text-display text-ink-800">
                What they want you to believe.
              </h2>
            </div>

            <div className="space-y-4">
              {MYTHS.map((item) => (
                <details key={item.myth} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-sharp-sm transition-all duration-300">
                  <summary className="flex items-center justify-between cursor-pointer list-none px-6 py-5">
                    <div className="flex items-center gap-3 pr-4">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-danger-50 flex items-center justify-center">
                        <AlertTriangle className="w-3.5 h-3.5 text-danger-600" />
                      </span>
                      <span className="text-heading text-ink-800 font-medium">
                        {item.myth}
                      </span>
                    </div>
                    <span className="text-slate-400 group-open:rotate-45 transition-transform duration-200 flex-shrink-0 text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-5 pt-0">
                    <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-caption uppercase tracking-wider text-emerald-700 font-semibold mb-1">
                          Reality
                        </p>
                        <p className="text-body text-slate-600 leading-relaxed">
                          {item.reality}
                        </p>
                      </div>
                    </div>
                  </div>
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
                  className="bg-white text-ink-800 hover:bg-slate-100 font-semibold shadow-sharp-sm hover:shadow-sharp"
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
