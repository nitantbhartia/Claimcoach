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
/* useInView -- lightweight IntersectionObserver hook                          */
/* -------------------------------------------------------------------------- */

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* -------------------------------------------------------------------------- */
/* Sticky CTA -- floats until user scrolls past the hero hook                 */
/* -------------------------------------------------------------------------- */

function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const heroHook = document.getElementById("hero-hook-section");
      if (!heroHook) return;
      const rect = heroHook.getBoundingClientRect();
      setVisible(rect.bottom < 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-frame/95 border-t-4 border-frame px-4 py-3 sm:py-4 transition-all animate-slide-up">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <p className="text-body-sm font-medium text-panel">
            Find out what your claim is really worth
          </p>
          <p className="text-caption text-panel/50 font-mono">
            Free analysis. Results in 5 minutes.
          </p>
        </div>
        <Link href="/claims/new" className="flex-shrink-0 w-full sm:w-auto">
          <button className="w-full sm:w-auto px-6 py-3 bg-coral text-black font-semibold hover:bg-coral-300 transition-colors flex items-center justify-center gap-2 text-body-sm">
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
/* Evidence Counter -- ticking odometer after hero                            */
/* -------------------------------------------------------------------------- */

function EvidenceCounter() {
  const [count, setCount] = useState(1_420_550);
  const { ref, inView } = useInView(0.5);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 342) + 47);
    }, 200);
    return () => clearInterval(interval);
  }, [inView]);

  const formatted = count.toLocaleString();

  return (
    <section ref={ref} className="bg-frame text-panel border-y-4 border-frame overflow-hidden">
      <div className="container-wide py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-coral animate-pulse" />
            <p className="text-label uppercase tracking-[0.05em] text-panel/60 font-medium">
              Underpaid claims identified today
            </p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-panel/40 text-3xl sm:text-4xl font-mono font-bold">$</span>
            {formatted.split("").map((char, i) => (
              <span
                key={`${i}-${char}`}
                className="inline-block text-3xl sm:text-4xl font-mono font-bold text-coral odometer-digit"
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
      <div className="bg-panel p-6 sm:p-8 relative border-4 border-frame">
        {/* Top edge accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-coral" />

        {!revealed ? (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="offer-hook"
                className="block text-label uppercase tracking-[0.05em] text-black/50 mb-2"
              >
                What did they offer you?
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-mono font-semibold text-black">
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
                  className="w-full pl-10 pr-4 py-4 text-3xl sm:text-4xl font-mono font-semibold text-black bg-white border-2 border-black/10 focus:outline-none focus:border-black transition-all placeholder:text-black/20"
                />
              </div>
            </div>

            <button
              onClick={handleReveal}
              disabled={!isValid}
              className="w-full py-4 bg-black text-panel font-medium hover:bg-coral hover:text-black disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-body-lg"
            >
              <Eye className="w-5 h-5" />
              Uncover the hidden coverage
            </button>

            <p className="text-caption text-black/40 text-center font-mono">
              100% free. Takes 30 seconds.
            </p>
          </div>
        ) : (
          <div className="space-y-5 animate-fade-in">
            {/* Their offer */}
            <div className="p-4 bg-white border border-black/10">
              <p className="text-label uppercase tracking-[0.05em] text-black/40 mb-1">
                Their offer
              </p>
              <p className="text-2xl font-mono font-semibold text-black/40 line-through decoration-danger-500 decoration-2">
                ${parsedOffer.toLocaleString()}
              </p>
            </div>

            {/* Fair value */}
            <div className="p-4 bg-white border-2 border-black relative">
              <div className="absolute -top-3 left-4 px-2 py-0.5 bg-coral text-label font-semibold text-black uppercase tracking-[0.05em]">
                Typical fair value
              </div>
              <p className="text-3xl sm:text-4xl font-mono font-bold text-black mt-1">
                ${fairValue.toLocaleString()}
              </p>
              {/* Gap pill */}
              <div className="flex items-center gap-2 mt-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-coral/20 text-body-sm font-bold text-black animate-pulse-glow">
                  <TrendingUp className="w-4 h-4" />
                  +${gap.toLocaleString()}
                </span>
                <span className="text-caption text-black/40">recoverable</span>
              </div>
            </div>

            <p className="text-body-sm text-black/60 text-center leading-relaxed">
              Policyholders who counter with evidence recover{" "}
              <span className="mark-coral font-semibold text-black">70&ndash;85%</span> of fair
              value. That&apos;s{" "}
              <span className="font-semibold font-mono text-black">
                ${Math.round(fairValue * 0.75).toLocaleString()}
              </span>{" "}
              in your pocket.
            </p>

            <Link href="/claims/new" className="block">
              <button className="w-full py-4 bg-black text-panel font-medium hover:bg-coral hover:text-black transition-colors flex items-center justify-center gap-2 text-body-lg">
                Get my full analysis
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>

            <button
              onClick={() => setRevealed(false)}
              className="w-full text-body-sm text-black/40 hover:text-black transition-colors"
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
/* Comparison Dashboard -- animated cards with bridge visualization           */
/* -------------------------------------------------------------------------- */

function ComparisonDashboard() {
  const { ref, inView } = useInView(0.2);
  const [revealPercent, setRevealPercent] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const handleDrag = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setRevealPercent(pct);
  }, []);

  useEffect(() => {
    if (!inView) return;
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
        <div className="bg-white overflow-hidden border-2 border-black/10">
          <div className="px-6 py-4 border-b border-black/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-danger-500" />
              <p className="text-label uppercase tracking-[0.05em] text-black/40 font-medium">
                Their Offer &mdash; 2022 Honda Civic EX
              </p>
            </div>
            <span className="px-2 py-0.5 text-label font-semibold bg-danger-50 text-danger-600 font-mono">
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
                <span className="text-body-sm text-black/40">{item.label}</span>
                <span className="text-body-sm font-mono text-black/40 line-through decoration-black/20">
                  {item.amount}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3 border-t border-black/10">
              <span className="text-body-sm font-semibold text-black/40">Total</span>
              <span className="text-heading-lg font-mono font-semibold text-black/40 line-through decoration-danger-500 decoration-2">
                $4,200
              </span>
            </div>
          </div>
        </div>

        {/* Overlay: ClaimCoach Audit -- revealed via X-Ray slide */}
        <div
          className="absolute inset-0 overflow-hidden transition-all duration-300 ease-out"
          style={{ width: `${revealPercent}%` }}
        >
          <div
            className="bg-white overflow-hidden border-2 border-black"
            style={{ width: containerRef.current?.offsetWidth || "100%", minWidth: "100%" }}
          >
            <div className="px-6 py-4 border-b border-black/10 flex items-center justify-between bg-frame">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-coral" />
                <p className="text-label uppercase tracking-[0.05em] text-panel/80 font-medium">
                  ClaimCoach Audit &mdash; 2022 Honda Civic EX
                </p>
              </div>
              <span className="px-2 py-0.5 text-label font-semibold bg-coral text-black">
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
                  <span className="text-body-sm text-black/70">{item.label}</span>
                  <span className="text-body-sm font-mono font-semibold text-black">
                    {item.amount}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3 border-t border-black/10">
                <span className="text-body-sm font-semibold text-black">Fair Total</span>
                <span className="text-heading-lg font-mono font-bold text-black">
                  <span className="mark-coral">$9,981</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Drag handle indicator */}
        {revealPercent < 100 && revealPercent > 0 && (
          <div
            className="absolute top-0 bottom-0 w-1 bg-black z-10"
            style={{ left: `${revealPercent}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-black border-2 border-panel flex items-center justify-center">
              <span className="text-panel text-caption font-bold">&harr;</span>
            </div>
          </div>
        )}
      </div>

      {/* Mobile hint */}
      <p className="text-center text-caption text-black/40 mt-4 sm:hidden font-mono">
        &larr; Drag to reveal the hidden line items &rarr;
      </p>

      {/* Bridge Visualization */}
      <div className="max-w-3xl mx-auto mt-6">
        <div className="bg-white p-5 border-2 border-black/10">
          <div className="flex items-center justify-between mb-3">
            <div className="text-left">
              <p className="text-label uppercase tracking-[0.05em] text-black/40 font-medium">Their offer</p>
              <p className="text-heading font-mono font-semibold text-black/40">$4,200</p>
            </div>
            <div className="text-right">
              <p className="text-label uppercase tracking-[0.05em] text-black font-medium">Fair value</p>
              <p className="text-heading font-mono font-bold text-black">$9,981</p>
            </div>
          </div>
          {/* The Bridge */}
          <div className="relative w-full h-6 bg-black/5 overflow-hidden">
            <div
              className={`absolute inset-y-0 left-0 bg-coral transition-all duration-1000 ease-out ${inView ? "animate-bridge-fill" : ""}`}
              style={{ width: inView ? `${(gap / fairTotal) * 100}%` : "0%" }}
            />
            {/* Percentage labels */}
            <div
              className="absolute inset-y-0 flex items-center text-caption font-bold text-panel pl-3"
              style={{ width: `${(theirTotal / fairTotal) * 100}%` }}
            >
              {inView && (
                <span className="bg-black/50 px-1.5 py-0.5 text-panel font-mono">
                  ${theirTotal.toLocaleString()}
                </span>
              )}
            </div>
          </div>
          {/* Gap pill */}
          <div className="flex justify-center mt-3">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-coral/20 border border-coral text-body font-bold text-black animate-pulse-glow font-mono">
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
  },
  {
    icon: <Scale className="w-6 h-6" />,
    title: "Fairness Gauge",
    description:
      "A market-data-backed score from 0\u2013100 showing exactly how much you\u2019re being shortchanged.",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Counter-Offer Letter",
    description:
      "Professional demand letter with itemized damages, comparable vehicle data, and policy citations they can\u2019t ignore.",
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Call Script",
    description:
      "Word-for-word phone script with objection handlers for every tactic adjusters use. Never go in unprepared.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "State Legal Guide",
    description:
      "Your state\u2019s insurance laws, filing deadlines, bad faith statutes, and DOI complaint process.",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Escalation Playbook",
    description:
      "Step-by-step guide from supervisor requests to DOI complaints to small claims court. They respond to pressure.",
  },
];

/* -------------------------------------------------------------------------- */
/* Myth vs Reality FAQ                                                        */
/* -------------------------------------------------------------------------- */

const MYTHS = [
  {
    myth: "\u201CThe first offer is fair.\u201D",
    reality:
      "The first offer is calculated to be the lowest amount you\u2019ll accept. 85% of initial offers can be negotiated upward with documented evidence.",
  },
  {
    myth: "\u201CYou need a lawyer for every claim.\u201D",
    reality:
      "Most auto property damage claims under $25,000 can be resolved without an attorney. ClaimCoach gives you the same tools and leverage professionals use.",
  },
  {
    myth: "\u201CClaimCoach provides legal advice.\u201D",
    reality:
      "No. ClaimCoach is an educational and analytical tool. We help you understand your policy and build evidence-backed counter-offers. For legal representation, consult a licensed attorney.",
  },
  {
    myth: "\u201CInsurance companies won\u2019t budge.\u201D",
    reality:
      "Adjusters negotiate every day\u2014they expect pushback. A well-documented counter-offer with policy citations and market data changes the conversation entirely.",
  },
  {
    myth: "\u201CIt takes weeks to fight a claim.\u201D",
    reality:
      "ClaimCoach generates your full analysis, counter-offer letter, and call script in under 5 minutes. Most claim disputes resolve within 2\u20134 weeks.",
  },
  {
    myth: "\u201CDiminished value doesn\u2019t apply to me.\u201D",
    reality:
      "If your vehicle was in an accident, it\u2019s worth less\u2014even after repairs. Most states allow diminished value claims, and most adjusters conveniently \u201Cforget\u201D to include it.",
  },
  {
    myth: "\u201C$79 is expensive for claim help.\u201D",
    reality:
      "The average additional recovery is $3,500+. That\u2019s a 44x return. A single missed line item (sales tax, rental, diminished value) often exceeds $79.",
  },
];

/* -------------------------------------------------------------------------- */
/* Main page                                                                  */
/* -------------------------------------------------------------------------- */

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-frame">
      <Header />
      <StickyCTA />

      <main className="flex-1">
        {/* ---- HERO ---- */}
        <section
          id="hero-hook-section"
          className="relative overflow-hidden bg-panel border-b-4 border-frame"
        >
          <div className="relative container-wide py-16 sm:py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Copy */}
              <div>
                <p className="text-label uppercase tracking-[0.05em] text-black/50 font-medium mb-4">
                  AI-Powered Claim Advocacy
                </p>

                <h1 className="text-display sm:text-display-xl text-black leading-[1.05] tracking-[-0.04em]">
                  Your insurer has
                  <br />
                  an unfair{" "}
                  <span className="relative inline-block">
                    advantage
                    <span className="absolute -bottom-1 left-0 right-0 h-3 bg-coral/60 -z-10" />
                  </span>
                  .
                </h1>

                <p className="mt-6 text-body-lg text-black/50 max-w-lg leading-relaxed">
                  Adjusters handle 500+ claims a year with teams of analysts.
                  You handle one. ClaimCoach levels the playing field.
                </p>

                {/* Data pills */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-panel text-body-sm font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Free to start
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-coral text-black text-body-sm font-medium">
                    <Zap className="w-3.5 h-3.5" />
                    Results in 5 min
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/10 text-black text-body-sm font-medium">
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
        <section className="section-gap bg-panel border-b-4 border-frame">
          <div className="container-wide">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
              <div className="max-w-lg">
                <p className="text-label uppercase tracking-[0.05em] text-black/50 font-medium mb-3">
                  The Gap
                </p>
                <h2 className="text-display-sm sm:text-display text-black tracking-[-0.04em]">
                  See what they&apos;re hiding.
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-4 py-2 bg-black text-panel text-body-sm font-semibold font-mono">
                  $5,781 hidden
                </span>
                <span className="px-4 py-2 bg-danger-50 text-danger-600 text-body-sm font-semibold font-mono">
                  38/100 fairness
                </span>
              </div>
            </div>

            <ComparisonDashboard />
          </div>
        </section>

        {/* ---- HOW IT WORKS ---- */}
        <section id="how-it-works" className="section-gap bg-panel-alt border-b-4 border-frame">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-16">
              <div>
                <p className="text-label uppercase tracking-[0.05em] text-black/50 font-medium mb-3">
                  Three Steps
                </p>
                <h2 className="text-display-sm sm:text-display text-black tracking-[-0.04em]">
                  Upload. Analyze. Negotiate.
                </h2>
              </div>
              <span className="px-4 py-2 bg-black text-panel text-body-sm font-semibold self-start lg:self-auto font-mono">
                &lt; 5 minutes total
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  num: "1",
                  icon: <Zap className="w-6 h-6 text-black" />,
                  title: "Upload your documents",
                  desc: "Drop in your insurance policy and the settlement offer. AI reads them in seconds\u2014no manual data entry.",
                  tags: ["PDF & images", "VIN decode", "Card scan"],
                },
                {
                  num: "2",
                  icon: <Scale className="w-6 h-6 text-black" />,
                  title: "Get your fairness score",
                  desc: "AI compares the offer against KBB, NADA, and local market data. Every dollar gap is itemized.",
                  tags: ["Market comps", "Line items", "Gap analysis"],
                },
                {
                  num: "3",
                  icon: <FileText className="w-6 h-6 text-black" />,
                  title: "Negotiate with confidence",
                  desc: "Get a professional counter-offer letter, adjuster call script, and escalation playbook. Ready to use.",
                  tags: ["Demand letter", "Call script", "Escalation"],
                },
              ].map((step) => (
                <div key={step.num} className="relative group">
                  <div className="bg-panel p-6 sm:p-8 h-full border border-black/10 hover:-translate-y-1 transition-transform duration-300">
                    <span className="text-6xl font-bold text-black/5 select-none absolute top-4 right-6 font-mono">
                      {step.num}
                    </span>
                    <div className="relative">
                      <div className="w-12 h-12 bg-coral/20 flex items-center justify-center mb-5">
                        {step.icon}
                      </div>
                      <h3 className="text-heading-lg text-black font-semibold">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-body text-black/50 leading-relaxed">
                        {step.desc}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {step.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-caption text-black/50 bg-white px-2.5 py-1 border border-black/10"
                          >
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
        <section className="section-gap bg-frame border-b-4 border-frame">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-14">
              <div>
                <p className="text-label uppercase tracking-[0.05em] text-panel/40 font-medium mb-3">
                  The Toolkit
                </p>
                <h2 className="text-display-sm sm:text-display text-panel tracking-[-0.04em]">
                  The adjuster&apos;s nightmare.
                </h2>
              </div>
              <p className="text-body text-panel/40 max-w-sm">
                Six tools that turn every policyholder into a prepared negotiator.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-coral/20 text-coral flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-heading text-panel font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-body-sm text-panel/50 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- THE $79 INVESTMENT (PRICING) ---- */}
        <section className="section-gap bg-panel border-b-4 border-frame">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-14">
              <div>
                <p className="text-label uppercase tracking-[0.05em] text-black/50 font-medium mb-3">
                  Pricing
                </p>
                <h2 className="text-display-sm sm:text-display text-black tracking-[-0.04em]">
                  The $79 investment.
                </h2>
              </div>
              <span className="px-4 py-2 bg-coral text-black text-body-sm font-semibold self-start lg:self-auto font-mono">
                44x avg. return
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {/* Free */}
              <div className="bg-white border border-black/10 p-8 hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-heading-lg text-black">Free</h3>
                <p className="text-body-sm text-black/50 mt-1 mb-6">
                  See where you stand
                </p>
                <div className="space-y-3">
                  {[
                    "Upload policy and offer",
                    "Basic fairness score",
                    "Coverage summary",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-body text-black/70">
                      <CheckCircle2 className="w-4 h-4 text-black/30 flex-shrink-0" />
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
              <div className="bg-white border-2 border-coral p-8 relative hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute -top-3 left-6 px-3 py-0.5 bg-coral text-black text-label font-medium uppercase tracking-[0.05em] z-10">
                  Recommended
                </div>
                <h3 className="text-heading-lg text-black">
                  Full Toolkit
                </h3>
                <div className="flex items-baseline gap-2 mt-1 mb-6">
                  <span className="text-display-sm font-mono font-bold text-black">$79</span>
                  <span className="text-body-sm text-black/50">per claim</span>
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
                    <div key={item} className="flex items-center gap-2.5 text-body text-black/70">
                      <CheckCircle2 className="w-4 h-4 text-coral flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link href="/signup">
                    <Button
                      size="md"
                      className="w-full bg-black text-panel hover:bg-coral hover:text-black"
                    >
                      Start free, upgrade later
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <p className="mt-8 text-caption text-black/40 text-center font-mono">
              Pro plan: $49/mo billed quarterly for unlimited claims. 30-day money-back guarantee.
            </p>
          </div>
        </section>

        {/* ---- OUTCOMES ---- */}
        <section className="section-gap bg-panel-alt border-b-4 border-frame">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-14">
              <div>
                <p className="text-label uppercase tracking-[0.05em] text-black/50 font-medium mb-3">
                  Outcomes
                </p>
                <h2 className="text-display-sm sm:text-display text-black tracking-[-0.04em]">
                  The data doesn&apos;t lie.
                </h2>
              </div>
              <span className="px-4 py-2 bg-black text-panel text-body-sm font-semibold self-start lg:self-auto">
                Industry research
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  value: "$3K\u20135K",
                  label: "Average underpayment on auto property damage claims",
                  source: "NAIC data",
                },
                {
                  value: "2\u20133x",
                  label: "Higher settlements with documented counter-offers",
                  source: "Industry studies",
                  highlight: true,
                },
                {
                  value: "85%",
                  label: "Of first offers can be negotiated upward",
                  source: "Consumer advocacy",
                  accent: true,
                },
                {
                  value: "44x",
                  label: "Return on ClaimCoach\u2019s $79 fee",
                  source: "$79 vs $3,500 avg.",
                },
              ].map((stat) => (
                <div
                  key={stat.value}
                  className="bg-panel border border-black/10 p-6 text-center hover:-translate-y-1 transition-transform duration-300"
                >
                  <p
                    className={`text-display-sm font-mono font-bold ${stat.accent ? "text-coral-600" : "text-black"}`}
                  >
                    {stat.highlight ? (
                      <span className="mark-coral">{stat.value}</span>
                    ) : (
                      stat.value
                    )}
                  </p>
                  <p className="text-body-sm text-black/50 mt-2">{stat.label}</p>
                  <p className="text-caption text-black/30 mt-3 font-mono">{stat.source}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- MYTH vs REALITY ---- */}
        <section className="section-gap bg-panel border-b-4 border-frame">
          <div className="container-narrow">
            <div className="text-center mb-14">
              <p className="text-label uppercase tracking-[0.05em] text-black/50 font-medium mb-3">
                Myth vs. Reality
              </p>
              <h2 className="text-display-sm sm:text-display text-black tracking-[-0.04em]">
                What they want you to believe.
              </h2>
            </div>

            <div className="space-y-4">
              {MYTHS.map((item) => (
                <details
                  key={item.myth}
                  className="group bg-white border border-black/10 overflow-hidden hover:-translate-y-0.5 transition-transform duration-300"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none px-6 py-5">
                    <div className="flex items-center gap-3 pr-4">
                      <span className="flex-shrink-0 w-7 h-7 bg-coral/20 flex items-center justify-center">
                        <AlertTriangle className="w-3.5 h-3.5 text-coral-600" />
                      </span>
                      <span className="text-heading text-black font-medium">
                        {item.myth}
                      </span>
                    </div>
                    <span className="text-black/40 group-open:rotate-45 transition-transform duration-200 flex-shrink-0 text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-5 pt-0">
                    <div className="flex items-start gap-3 p-4 bg-ice-50 border border-ice-200">
                      <CheckCircle2 className="w-5 h-5 text-ice-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-label uppercase tracking-[0.05em] text-ice-400 font-semibold mb-1">
                          Reality
                        </p>
                        <p className="text-body text-black/70 leading-relaxed">
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
        <section className="bg-frame text-panel">
          <div className="container-wide py-16 sm:py-24 lg:py-28 text-center">
            <h2 className="text-display-sm sm:text-display text-panel max-w-2xl mx-auto tracking-[-0.04em]">
              Stop accepting their first number.
            </h2>
            <p className="mt-5 text-body-lg text-panel/60 max-w-lg mx-auto">
              Your policy entitles you to a fair settlement. Find out what
              that number actually is.
            </p>

            <div className="mt-10">
              <Link href="/claims/new">
                <Button
                  size="lg"
                  className="bg-coral text-black hover:bg-coral-300 font-semibold"
                >
                  Get my free analysis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-body-sm text-panel/40 font-mono">
              100% free. No credit card. Results in under five minutes.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
