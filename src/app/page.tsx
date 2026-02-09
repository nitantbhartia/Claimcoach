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
  TrendingUp,
  CheckCircle2,
  Search,
  Eye,
  Zap,
  AlertTriangle,
  Lock,
  Mail,
  ShieldCheck,
  Car,
  DollarSign,
  XCircle,
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
/* Sticky CTA                                                                  */
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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy-900/95 border-t-4 border-navy-800 px-4 py-3 sm:py-4 transition-all animate-slide-up">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <p className="text-body-sm font-medium text-white">
            See what your car is actually worth
          </p>
          <p className="text-caption text-white/50 font-mono">
            Free fairness score. Results in 5 minutes.
          </p>
        </div>
        <Link href="/claims/new" className="flex-shrink-0 w-full sm:w-auto">
          <button className="w-full sm:w-auto px-6 py-3 bg-gold text-navy-900 font-semibold hover:bg-gold-300 transition-colors flex items-center justify-center gap-2 text-body-sm">
            Get your free fairness score
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </div>
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

  function handleReveal() {
    if (!isValid) return;
    setRevealed(true);
  }

  const TYPICALLY_EXCLUDED = [
    {
      name: "Diminished value",
      explanation:
        "Your car is worth less after an accident, even after repairs. Most adjusters leave this at $0.",
    },
    {
      name: "Loss of use",
      explanation:
        "Rental or daily rate while you\u2019re without your car. Owed even if you didn\u2019t rent one.",
    },
    {
      name: "Sales tax on replacement",
      explanation:
        "You\u2019ll pay this out of pocket when you buy a replacement vehicle if they don\u2019t include it.",
    },
    {
      name: "Registration & title fees",
      explanation:
        "Transfer fees for your replacement vehicle that the offer almost never covers.",
    },
  ];

  return (
    <div className="max-w-lg mx-auto lg:mx-0">
      <div className="bg-white p-6 sm:p-8 relative border-4 border-navy-800">
        {/* Top edge accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gold" />

        {!revealed ? (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="offer-hook"
                className="block text-body-sm font-medium text-navy-800 mb-2"
              >
                What did they offer you?
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl sm:text-2xl font-mono font-semibold text-navy-800">
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
                  className="w-full pl-10 pr-4 py-3 sm:py-4 text-2xl sm:text-4xl font-mono font-semibold text-navy-800 bg-navy-50 border-2 border-navy-100 focus:outline-none focus:border-navy-800 transition-all placeholder:text-navy-800/20"
                />
              </div>
            </div>

            <button
              onClick={handleReveal}
              disabled={!isValid}
              className="w-full py-4 bg-gold text-navy-900 font-semibold hover:bg-gold-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-body-lg"
            >
              Is this fair?
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-2 text-caption text-navy-800/40">
              <Lock className="w-3 h-3" />
              <span>Free &amp; private. No credit card required.</span>
            </div>
          </div>
        ) : (
          <div className="space-y-5 animate-fade-in">
            {/* Contextual header */}
            <div className="p-4 bg-navy-800">
              <p className="text-body-sm font-medium text-white leading-relaxed">
                On offers around{" "}
                <span className="font-mono font-bold text-gold">
                  ${parsedOffer.toLocaleString()}
                </span>
                , adjusters typically exclude:
              </p>
            </div>

            {/* Excluded items */}
            <div className="space-y-3">
              {TYPICALLY_EXCLUDED.map((item) => (
                <div
                  key={item.name}
                  className="flex gap-3 p-3 bg-navy-50 border border-navy-100"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <AlertTriangle className="w-4 h-4 text-gold-500" />
                  </div>
                  <div>
                    <p className="text-body-sm font-semibold text-navy-800">
                      {item.name}
                    </p>
                    <p className="text-caption text-navy-800/50 leading-relaxed mt-0.5">
                      {item.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recovery stat */}
            <div className="p-4 bg-gold/10 border border-gold/30">
              <p className="text-body-sm text-navy-800 text-center leading-relaxed">
                Policyholders who counter with evidence recover{" "}
                <span className="mark-gold font-bold text-navy-800">
                  70&ndash;85% more
                </span>
                .
              </p>
            </div>

            <Link href="/claims/new" className="block">
              <button className="w-full py-4 bg-gold text-navy-900 font-semibold hover:bg-gold-300 transition-colors flex items-center justify-center gap-2 text-body-lg">
                Get my full analysis
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>

            <button
              onClick={() => setRevealed(false)}
              className="w-full text-body-sm text-navy-800/40 hover:text-navy-800 transition-colors"
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
/* Comparison Dashboard -- animated X-Ray with bridge visualization           */
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
        <div className="bg-white overflow-hidden border-2 border-navy-100">
          <div className="px-4 sm:px-6 py-4 border-b border-navy-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-2 h-2 bg-danger-500 shrink-0" />
              <p className="text-label uppercase tracking-[0.05em] text-navy-800/40 font-medium truncate">
                Their Offer &mdash; 2022 Honda Civic EX
              </p>
            </div>
            <span className="px-2 py-0.5 text-label font-semibold bg-danger-50 text-danger-600 font-mono shrink-0">
              38/100
            </span>
          </div>
          <div className="px-4 sm:px-6 py-5 space-y-2.5">
            {[
              { label: "Vehicle Base Value", amount: "$4,200" },
              { label: "Loss of Use / Rental", amount: "$0" },
              { label: "Diminished Value", amount: "$0" },
              { label: "Sales Tax", amount: "$0" },
              { label: "Registration / Title", amount: "$0" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-body-sm text-navy-800/40">{item.label}</span>
                <span className="text-body-sm font-mono text-navy-800/40 line-through decoration-navy-800/20">
                  {item.amount}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3 border-t border-navy-100">
              <span className="text-body-sm font-semibold text-navy-800/40">Total</span>
              <span className="text-heading-lg font-mono font-semibold text-navy-800/40 line-through decoration-danger-500 decoration-2">
                $4,200
              </span>
            </div>
          </div>
        </div>

        {/* Overlay: ClaimCoach Audit */}
        <div
          className="absolute inset-0 overflow-hidden transition-all duration-300 ease-out"
          style={{ width: `${revealPercent}%` }}
        >
          <div
            className="bg-white overflow-hidden border-2 border-navy-800"
            style={{ width: containerRef.current?.offsetWidth || "100%", minWidth: "100%" }}
          >
            <div className="px-4 sm:px-6 py-4 border-b border-navy-100 flex items-center justify-between gap-2 bg-navy-800">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-2 h-2 bg-gold shrink-0" />
                <p className="text-label uppercase tracking-[0.05em] text-white/80 font-medium truncate">
                  ClaimCoach Audit &mdash; 2022 Honda Civic EX
                </p>
              </div>
              <span className="px-2 py-0.5 text-label font-semibold bg-gold text-navy-900 shrink-0">
                Market-backed
              </span>
            </div>
            <div className="px-4 sm:px-6 py-5 space-y-2.5 bg-white">
              {[
                { label: "Vehicle Base Value", amount: "$6,800" },
                { label: "Loss of Use / Rental", amount: "$720" },
                { label: "Diminished Value", amount: "$1,800" },
                { label: "Sales Tax on Replacement", amount: "$476" },
                { label: "Registration / Title", amount: "$185" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-body-sm text-navy-800/70">{item.label}</span>
                  <span className="text-body-sm font-mono font-semibold text-navy-800">
                    {item.amount}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3 border-t border-navy-100">
                <span className="text-body-sm font-semibold text-navy-800">Fair Total</span>
                <span className="text-heading-lg font-mono font-bold text-navy-800">
                  <span className="mark-gold">$9,981</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Drag handle */}
        {revealPercent < 100 && revealPercent > 0 && (
          <div
            className="absolute top-0 bottom-0 w-1 bg-navy-800 z-10"
            style={{ left: `${revealPercent}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-navy-800 border-2 border-white flex items-center justify-center">
              <span className="text-white text-caption font-bold">&harr;</span>
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-caption text-navy-800/40 mt-4 sm:hidden font-mono">
        &larr; Drag to reveal the hidden line items &rarr;
      </p>

      {/* Bridge Visualization */}
      <div className="max-w-3xl mx-auto mt-6">
        <div className="bg-white p-5 border-2 border-navy-100">
          <div className="flex items-center justify-between mb-3">
            <div className="text-left">
              <p className="text-label uppercase tracking-[0.05em] text-navy-800/40 font-medium">Their offer</p>
              <p className="text-heading font-mono font-semibold text-navy-800/40">$4,200</p>
            </div>
            <div className="text-right">
              <p className="text-label uppercase tracking-[0.05em] text-navy-800 font-medium">Fair value</p>
              <p className="text-heading font-mono font-bold text-navy-800">$9,981</p>
            </div>
          </div>
          <div className="relative w-full h-6 bg-navy-50 overflow-hidden">
            <div
              className={`absolute inset-y-0 left-0 bg-gold transition-all duration-1000 ease-out ${inView ? "animate-bridge-fill" : ""}`}
              style={{ width: inView ? `${(gap / fairTotal) * 100}%` : "0%" }}
            />
            <div
              className="absolute inset-y-0 flex items-center text-caption font-bold text-white pl-3"
              style={{ width: `${(theirTotal / fairTotal) * 100}%` }}
            >
              {inView && (
                <span className="bg-navy-800/50 px-1.5 py-0.5 text-white font-mono">
                  ${theirTotal.toLocaleString()}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-3">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gold/20 border border-gold text-body font-bold text-navy-900 font-mono">
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
      "Reads every clause and highlights the coverages, limits, and exclusions your adjuster hopes you miss.",
  },
  {
    icon: <Scale className="w-6 h-6" />,
    title: "Fairness Gauge",
    description:
      "A market-data-backed score from 0\u2013100 showing exactly how much you\u2019re being shortchanged on your auto claim.",
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
      "Word-for-word phone script with objection handlers for every tactic auto adjusters use. Never go in unprepared.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "State Legal Guide",
    description:
      "Your state\u2019s auto insurance laws, filing deadlines, bad faith statutes, and DOI complaint process.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Escalation Playbook",
    description:
      "Step-by-step guide from supervisor requests to DOI complaints to small claims court. They respond to pressure.",
  },
];

/* -------------------------------------------------------------------------- */
/* Representative case studies (NOT testimonials)                              */
/* -------------------------------------------------------------------------- */

const CASE_STUDIES = [
  {
    vehicle: "2021 Honda Accord",
    insurer: "GEICO",
    offer: 6800,
    fairValue: 11000,
    items: [
      { name: "Diminished value", amount: 1800 },
      { name: "Sales tax on replacement", amount: 476 },
      { name: "Rental reimbursement", amount: 720 },
      { name: "Base value gap", amount: 1206 },
    ],
  },
  {
    vehicle: "2019 Toyota RAV4",
    insurer: "State Farm",
    offer: 12500,
    fairValue: 18900,
    items: [
      { name: "Base value gap (wrong comps)", amount: 3400 },
      { name: "Loss of use", amount: 900 },
      { name: "Diminished value", amount: 2100 },
    ],
  },
  {
    vehicle: "2023 Tesla Model 3",
    insurer: "Progressive",
    offer: 28000,
    fairValue: 36770,
    items: [
      { name: "OEM parts entitlement", amount: 2400 },
      { name: "Diminished value", amount: 4200 },
      { name: "Sales tax", amount: 2170 },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* How adjusters calculate data                                               */
/* -------------------------------------------------------------------------- */

const ADJUSTER_TACTICS = [
  {
    icon: <Car className="w-5 h-5" />,
    tactic: "They cherry-pick comparable vehicles",
    detail:
      "Your 2022 Civic EX with 28K miles gets compared to 2020 LX models with 80,000 miles. Lower trim, higher mileage, lower value.",
  },
  {
    icon: <XCircle className="w-5 h-5" />,
    tactic: "They exclude legitimate line items",
    detail:
      "Sales tax on replacement ($476), rental reimbursement ($720), diminished value ($1,800), registration fees ($185) \u2014 all left at $0 unless you ask.",
  },
  {
    icon: <DollarSign className="w-5 h-5" />,
    tactic: 'They call it "fair market value"',
    detail:
      'The offer letter says "fair market value" but it\u2019s calculated to save the insurer money, not to make you whole. They\u2019re betting you won\u2019t check.',
  },
];

/* -------------------------------------------------------------------------- */
/* FAQ data                                                                    */
/* -------------------------------------------------------------------------- */

const FAQ_ITEMS = [
  {
    question: "Is this legal?",
    answer:
      "Absolutely. You have the legal right to negotiate your insurance settlement, request documentation of your adjuster\u2019s valuation methodology, and submit a counter-offer with supporting evidence. ClaimCoach simply helps you exercise those rights more effectively.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Yes. Your policy documents and offer letters are encrypted in transit and at rest. We automatically delete uploaded documents after analysis is complete. We never share your personal information with insurance companies or third parties.",
  },
  {
    question: "Do I still need a lawyer?",
    answer:
      "Most auto property damage claims under $25,000 can be resolved without an attorney. ClaimCoach gives you the same tools and market data that professionals use. For claims involving bodily injury, bad faith, or amounts over $25,000, we recommend consulting a licensed attorney.",
  },
  {
    question: "What about diminished value?",
    answer:
      "If your vehicle was in an accident, it\u2019s worth less even after repairs \u2014 that\u2019s diminished value. Most states allow diminished value claims, and most adjusters conveniently omit it. ClaimCoach automatically flags it and calculates your entitlement.",
  },
  {
    question: "What if I already accepted the offer?",
    answer:
      "In many states you can still negotiate supplemental claims for items not covered in the original settlement, such as diminished value or missed coverages. Check your state\u2019s reopening window. ClaimCoach\u2019s state legal guide will tell you your specific options.",
  },
  {
    question: "How fast does it work?",
    answer:
      "Your full analysis \u2014 fairness score, line-item breakdown, counter-offer letter, and call script \u2014 is generated in under 5 minutes. Most claim disputes resolve within 2\u20134 weeks after submitting a documented counter-offer.",
  },
  {
    question: "What if the $79 doesn\u2019t work for me?",
    answer:
      "We offer a 30-day money-back guarantee. If ClaimCoach doesn\u2019t help you identify at least $79 in additional recovery, we\u2019ll refund you. The average additional recovery is $3,500+, so the risk is essentially zero.",
  },
];

/* -------------------------------------------------------------------------- */
/* JSON-LD structured data                                                    */
/* -------------------------------------------------------------------------- */

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

/* -------------------------------------------------------------------------- */
/* Main page                                                                  */
/* -------------------------------------------------------------------------- */

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setEmailSubmitted(true);
    fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, interest: "home_health" }),
    }).catch(() => {});
  }

  return (
    <div className="flex flex-col min-h-screen bg-navy-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <Header />
      <StickyCTA />

      <main className="flex-1">
        {/* ================================================================ */}
        {/* HERO                                                             */}
        {/* ================================================================ */}
        <section
          id="hero-hook-section"
          className="relative overflow-hidden bg-white border-b-4 border-navy-800"
        >
          <div className="relative container-wide py-16 sm:py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Copy */}
              <div>
                <p className="text-label uppercase tracking-[0.05em] text-navy-800/50 font-medium mb-4">
                  Auto Property Damage Claims
                </p>

                <h1 className="font-serif text-display sm:text-display-xl text-navy-800 leading-[1.05] tracking-[-0.02em]">
                  They totaled your car and{" "}
                  <span className="relative inline-block">
                    lowballed
                    <span className="absolute -bottom-1 left-0 right-0 h-3 bg-gold/40 -z-10" />
                  </span>{" "}
                  the offer.
                </h1>

                <p className="mt-6 text-body-lg text-navy-800/60 max-w-lg leading-relaxed">
                  Adjusters handle 500+ auto claims a year. You handle one.{" "}
                  <span className="text-navy-800 font-medium">
                    See the line items they&apos;re hoping you&apos;ll miss.
                  </span>
                </p>

                {/* Data pills */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-navy-800 text-white text-body-sm font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Join 2,400+ policyholders
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold text-navy-900 text-body-sm font-medium">
                    <Zap className="w-3.5 h-3.5" />
                    Results in 5 min
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-navy-50 text-navy-800 text-body-sm font-medium">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    85% of offers are low
                    <sup className="text-[8px] text-navy-800/50">*</sup>
                  </span>
                </div>
              </div>

              {/* Right: The Hook */}
              <HeroHook />
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* POLICYHOLDER COUNTER + SECURITY                                   */}
        {/* ================================================================ */}
        <section className="bg-navy-800 text-white border-b-4 border-navy-900">
          <div className="container-wide py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gold" />
                <p className="text-body-sm text-white/80">
                  <span className="font-mono font-bold text-gold">2,847</span> policyholders have fought back with ClaimCoach
                </p>
              </div>
              <div className="flex items-center gap-4 text-caption text-white/40">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3 h-3" />
                  256-bit encryption
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3" />
                  Auto-deleted after analysis
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* HOW ADJUSTERS CALCULATE YOUR OFFER                                */}
        {/* ================================================================ */}
        <section className="section-gap bg-navy-50 border-b-4 border-navy-800">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-14">
              <div>
                <p className="text-label uppercase tracking-[0.05em] text-navy-800/50 font-medium mb-3">
                  The Playbook
                </p>
                <h2 className="font-serif text-display-sm sm:text-display text-navy-800 tracking-[-0.02em]">
                  How adjusters calculate your offer.
                </h2>
              </div>
              <p className="text-body text-navy-800/50 max-w-sm">
                Understanding their tactics is the first step to fighting back.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ADJUSTER_TACTICS.map((tactic, i) => (
                <div key={i} className="bg-white border border-navy-100 p-6 sm:p-8">
                  <div className="w-10 h-10 bg-danger-50 text-danger-600 flex items-center justify-center mb-5">
                    {tactic.icon}
                  </div>
                  <h3 className="text-heading text-navy-800 font-semibold mb-3">
                    {tactic.tactic}
                  </h3>
                  <p className="text-body-sm text-navy-800/60 leading-relaxed">
                    {tactic.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white border-2 border-gold p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-body-sm sm:text-body text-navy-800">
                <span className="font-semibold">The bottom line:</span> The average auto claim is underpaid by{" "}
                <span className="font-mono font-bold">$3,000&ndash;$5,000</span>.{" "}
                <span className="text-navy-800/50">That&apos;s not a rounding error &mdash; it&apos;s a strategy.</span>
              </p>
              <Link href="/claims/new" className="flex-shrink-0 w-full sm:w-auto">
                <button className="w-full sm:w-auto px-6 py-3 bg-gold text-navy-900 font-semibold hover:bg-gold-300 transition-colors flex items-center justify-center gap-2 text-body-sm whitespace-nowrap">
                  Check your offer
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* COMPARISON DASHBOARD                                              */}
        {/* ================================================================ */}
        <section className="section-gap bg-white border-b-4 border-navy-800">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
              <div className="max-w-lg">
                <p className="text-label uppercase tracking-[0.05em] text-navy-800/50 font-medium mb-3">
                  Real Example
                </p>
                <h2 className="font-serif text-display-sm sm:text-display text-navy-800 tracking-[-0.02em]">
                  See what they&apos;re hiding.
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-4 py-2 bg-navy-800 text-white text-body-sm font-semibold font-mono">
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

        {/* ================================================================ */}
        {/* REPRESENTATIVE OUTCOMES (not testimonials)                        */}
        {/* ================================================================ */}
        <section className="section-gap bg-navy-800 border-b-4 border-navy-900">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-14">
              <div>
                <p className="text-label uppercase tracking-[0.05em] text-white/40 font-medium mb-3">
                  Representative Outcomes
                </p>
                <h2 className="font-serif text-display-sm sm:text-display text-white tracking-[-0.02em]">
                  What a typical analysis finds.
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CASE_STUDIES.map((study) => (
                <div key={study.vehicle} className="bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-4">
                    <Car className="w-4 h-4 text-gold" />
                    <p className="text-body-sm font-semibold text-white">
                      {study.vehicle}
                    </p>
                  </div>
                  <p className="text-caption text-white/40 mb-4 font-mono">
                    {study.insurer}
                  </p>

                  {/* Offer vs fair */}
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <p className="text-caption text-white/40">Offer</p>
                      <p className="text-heading font-mono text-white/50 line-through decoration-danger-500">
                        ${study.offer.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-caption text-gold">Fair value</p>
                      <p className="text-heading font-mono font-bold text-gold">
                        ${study.fairValue.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Line items found */}
                  <div className="space-y-1.5 pt-4 border-t border-white/10">
                    <p className="text-caption text-white/30 uppercase tracking-[0.05em] mb-2">
                      Missing line items found
                    </p>
                    {study.items.map((item) => (
                      <div key={item.name} className="flex justify-between text-caption">
                        <span className="text-white/50">{item.name}</span>
                        <span className="text-gold font-mono font-semibold">
                          +${item.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-caption text-white/30 text-center leading-relaxed max-w-2xl mx-auto">
              Representative examples based on typical claim data and market analysis.
              Not actual user testimonials. Individual results depend on policy terms,
              vehicle condition, and state laws.
            </p>
          </div>
        </section>

        {/* ================================================================ */}
        {/* HOW IT WORKS                                                      */}
        {/* ================================================================ */}
        <section id="how-it-works" className="section-gap bg-navy-50 border-b-4 border-navy-800">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-16">
              <div>
                <p className="text-label uppercase tracking-[0.05em] text-navy-800/50 font-medium mb-3">
                  Three Steps
                </p>
                <h2 className="font-serif text-display-sm sm:text-display text-navy-800 tracking-[-0.02em]">
                  Upload. Analyze. Negotiate.
                </h2>
              </div>
              <span className="px-4 py-2 bg-navy-800 text-white text-body-sm font-semibold self-start lg:self-auto font-mono">
                AI-powered &mdash; under 5 minutes
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  num: "1",
                  icon: <Zap className="w-6 h-6 text-navy-800" />,
                  title: "Upload your documents",
                  desc: "Drop in your insurance policy and the settlement offer letter. AI reads them in seconds\u2014no manual data entry.",
                  tags: ["PDF & images", "VIN decode", "Card scan"],
                },
                {
                  num: "2",
                  icon: <Scale className="w-6 h-6 text-navy-800" />,
                  title: "Get your fairness score",
                  desc: "AI compares the offer against KBB, NADA, and local market data. Every dollar gap is itemized with sources.",
                  tags: ["Market comps", "Line items", "Gap analysis"],
                },
                {
                  num: "3",
                  icon: <FileText className="w-6 h-6 text-navy-800" />,
                  title: "Negotiate with confidence",
                  desc: "Get a professional counter-offer letter, adjuster call script, and escalation playbook. Ready to use.",
                  tags: ["Demand letter", "Call script", "Escalation"],
                },
              ].map((step) => (
                <div key={step.num} className="relative group">
                  <div className="bg-white p-6 sm:p-8 h-full border border-navy-100 hover:-translate-y-1 transition-transform duration-300">
                    <span className="text-6xl font-bold text-navy-800/5 select-none absolute top-4 right-6 font-mono">
                      {step.num}
                    </span>
                    <div className="relative">
                      <div className="w-12 h-12 bg-gold/20 flex items-center justify-center mb-5">
                        {step.icon}
                      </div>
                      <h3 className="text-heading-lg text-navy-800 font-semibold">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-body text-navy-800/50 leading-relaxed">
                        {step.desc}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {step.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-caption text-navy-800/50 bg-navy-50 px-2.5 py-1 border border-navy-100"
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

            <div className="mt-6 flex items-center justify-center gap-2 text-body-sm text-navy-800/40">
              <Lock className="w-4 h-4" />
              Your policy and offer documents are encrypted and automatically deleted after analysis.
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* TOOLKIT (FEATURES)                                                */}
        {/* ================================================================ */}
        <section className="section-gap bg-navy-800 border-b-4 border-navy-900">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-14">
              <div>
                <p className="text-label uppercase tracking-[0.05em] text-white/40 font-medium mb-3">
                  Your Toolkit
                </p>
                <h2 className="font-serif text-display-sm sm:text-display text-white tracking-[-0.02em]">
                  Everything you need to fight back.
                </h2>
              </div>
              <p className="text-body text-white/40 max-w-sm">
                Six tools that turn every auto policyholder into a prepared negotiator.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-gold/20 text-gold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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

        {/* ================================================================ */}
        {/* PRICING                                                           */}
        {/* ================================================================ */}
        <section className="section-gap bg-white border-b-4 border-navy-800">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-14">
              <div>
                <p className="text-label uppercase tracking-[0.05em] text-navy-800/50 font-medium mb-3">
                  Pricing
                </p>
                <h2 className="font-serif text-display-sm sm:text-display text-navy-800 tracking-[-0.02em]">
                  The $79 investment.
                </h2>
              </div>
              <span className="px-4 py-2 bg-gold text-navy-900 text-body-sm font-semibold self-start lg:self-auto font-mono">
                44x avg. return
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {/* Free */}
              <div className="bg-white border border-navy-100 p-8 hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-heading-lg text-navy-800">Free</h3>
                <p className="text-body-sm text-navy-800/50 mt-1 mb-6">
                  See where you stand
                </p>
                <div className="space-y-3">
                  {[
                    "Upload policy and offer",
                    "Basic fairness score",
                    "Coverage summary",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-body text-navy-800/70">
                      <CheckCircle2 className="w-4 h-4 text-navy-800/30 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link href="/signup">
                    <Button variant="outline" size="md" className="w-full">
                      Get started free
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Full Toolkit */}
              <div className="bg-white border-2 border-gold p-8 relative hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute -top-3 left-6 px-3 py-0.5 bg-gold text-navy-900 text-label font-medium uppercase tracking-[0.05em] z-10">
                  Recommended
                </div>
                <h3 className="text-heading-lg text-navy-800">
                  Full Toolkit
                </h3>
                <div className="flex items-baseline gap-2 mt-1 mb-6">
                  <span className="text-display-sm font-mono font-bold text-navy-800">$79</span>
                  <span className="text-body-sm text-navy-800/50">per claim</span>
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
                    <div key={item} className="flex items-center gap-2.5 text-body text-navy-800/70">
                      <CheckCircle2 className="w-4 h-4 text-gold-500 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link href="/signup">
                    <Button
                      size="md"
                      className="w-full bg-gold text-navy-900 hover:bg-gold-300 font-semibold"
                    >
                      Start free, upgrade later
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                {/* Money-back guarantee badge */}
                <div className="mt-6 flex items-center justify-center gap-2 p-3 bg-navy-50 border border-navy-100">
                  <ShieldCheck className="w-4 h-4 text-navy-800" />
                  <span className="text-caption font-semibold text-navy-800">
                    30-day money-back guarantee
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-8 text-caption text-navy-800/40 text-center font-mono">
              Pro plan: $49/mo billed quarterly for unlimited claims.
            </p>
          </div>
        </section>

        {/* ================================================================ */}
        {/* OUTCOMES / STATS                                                  */}
        {/* ================================================================ */}
        <section className="section-gap bg-navy-50 border-b-4 border-navy-800">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-14">
              <div>
                <p className="text-label uppercase tracking-[0.05em] text-navy-800/50 font-medium mb-3">
                  Outcomes
                </p>
                <h2 className="font-serif text-display-sm sm:text-display text-navy-800 tracking-[-0.02em]">
                  The data doesn&apos;t lie.
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  value: "$3K\u20135K",
                  label: "Average underpayment on auto property damage claims",
                  source: "NAIC Consumer Complaint Data",
                },
                {
                  value: "2\u20133x",
                  label: "Higher settlements with documented counter-offers",
                  source: "J.D. Power Claims Study",
                  highlight: true,
                },
                {
                  value: "85%",
                  label: "Of first offers can be negotiated higher with evidence",
                  source: "United Policyholders (nonprofit)",
                  accent: true,
                },
                {
                  value: "44x",
                  label: "Return on ClaimCoach\u2019s $79 fee",
                  source: "$79 vs $3,500 avg. recovery",
                },
              ].map((stat) => (
                <div
                  key={stat.value}
                  className="bg-white border border-navy-100 p-6 text-center hover:-translate-y-1 transition-transform duration-300"
                >
                  <p
                    className={`text-display-sm font-mono font-bold ${stat.accent ? "text-gold-500" : "text-navy-800"}`}
                  >
                    {stat.highlight ? (
                      <span className="mark-gold">{stat.value}</span>
                    ) : (
                      stat.value
                    )}
                  </p>
                  <p className="text-body-sm text-navy-800/50 mt-2">{stat.label}</p>
                  <p className="text-caption text-navy-800/30 mt-3 font-mono">{stat.source}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-caption text-navy-800/30 text-center">
              * Sources: NAIC Annual Report on Consumer Complaints; J.D. Power 2024 Auto Claims Satisfaction Study;
              United Policyholders, a 501(c)(3) consumer advocacy nonprofit.
            </p>
          </div>
        </section>

        {/* ================================================================ */}
        {/* FAQ                                                               */}
        {/* ================================================================ */}
        <section className="section-gap bg-white border-b-4 border-navy-800">
          <div className="container-narrow">
            <div className="text-center mb-14">
              <p className="text-label uppercase tracking-[0.05em] text-navy-800/50 font-medium mb-3">
                Questions
              </p>
              <h2 className="font-serif text-display-sm sm:text-display text-navy-800 tracking-[-0.02em]">
                Frequently asked.
              </h2>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item) => (
                <details
                  key={item.question}
                  className="group bg-navy-50 border border-navy-100 overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none px-6 py-5">
                    <span className="text-heading text-navy-800 font-medium pr-4">
                      {item.question}
                    </span>
                    <span className="text-navy-800/40 group-open:rotate-45 transition-transform duration-200 flex-shrink-0 text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-5 pt-0">
                    <p className="text-body text-navy-800/70 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* EMAIL CAPTURE — Home / Health Waitlist                            */}
        {/* ================================================================ */}
        <section className="bg-navy-50 border-b-4 border-navy-800">
          <div className="container-narrow py-12 sm:py-16">
            <div className="bg-white border border-navy-100 p-8 sm:p-10 text-center">
              <div className="w-12 h-12 bg-gold/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-5 h-5 text-gold-500" />
              </div>
              <h3 className="font-serif text-heading-lg text-navy-800 mb-2">
                Have a home or health claim?
              </h3>
              <p className="text-body text-navy-800/50 mb-6 max-w-md mx-auto">
                We&apos;re launching home and health claim analysis next. Drop your email and we&apos;ll let you know when it&apos;s ready.
              </p>

              {emailSubmitted ? (
                <div className="flex items-center justify-center gap-2 text-body text-success-600">
                  <CheckCircle2 className="w-5 h-5" />
                  You&apos;re on the list. We&apos;ll be in touch.
                </div>
              ) : (
                <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 min-w-0 px-4 py-3 bg-navy-50 border border-navy-100 text-navy-800 text-body-sm placeholder:text-navy-800/30 focus:outline-none focus:border-navy-800"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-navy-800 text-white font-semibold hover:bg-navy-700 transition-colors text-body-sm whitespace-nowrap"
                  >
                    Notify me
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* FINAL CTA                                                         */}
        {/* ================================================================ */}
        <section className="bg-navy-900 text-white">
          <div className="container-wide py-16 sm:py-24 lg:py-28 text-center">
            <h2 className="font-serif text-display-sm sm:text-display text-white max-w-2xl mx-auto tracking-[-0.02em]">
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
                  className="bg-gold text-navy-900 hover:bg-gold-300 font-semibold"
                >
                  Get your free fairness score
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-body-sm text-white/40 font-mono">
              100% free to start. No credit card. Results in under five minutes.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
