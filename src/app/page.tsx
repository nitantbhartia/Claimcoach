"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  ArrowRight,
  Shield,
  FileText,
  Phone,
  CheckCircle2,
  Search,
  Zap,
  AlertTriangle,
  Lock,
  DollarSign,
  XCircle,
  Clock,
  Users,
  ChevronRight,
  BarChart3,
  Scale,
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
/* Sticky Mobile CTA                                                          */
/* -------------------------------------------------------------------------- */

function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [offer, setOffer] = useState("");

  useEffect(() => {
    function onScroll() {
      const hero = document.getElementById("hero-section");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      setVisible(rect.bottom < 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
      {expanded ? (
        <div className="bg-navy-900 border-t border-navy-800 px-4 py-4 animate-slide-up">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-mono font-semibold text-white/40">
                $
              </span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="0.00"
                value={offer}
                onChange={(e) =>
                  setOffer(e.target.value.replace(/[^0-9.,]/g, ""))
                }
                className="w-full pl-8 pr-3 py-3 text-lg font-mono font-semibold text-white bg-navy-800 border border-navy-200/20 focus:outline-none focus:border-gold placeholder:text-white/20"
              />
            </div>
            <Link href="/claims/new" className="flex-shrink-0">
              <button className="h-full px-5 bg-gold text-navy-900 font-semibold hover:bg-gold-300 transition-colors text-body-sm">
                Analyze
                <ArrowRight className="w-4 h-4 ml-1 inline" />
              </button>
            </Link>
          </div>
          <button
            onClick={() => setExpanded(false)}
            className="w-full text-center text-caption text-white/30 mt-2"
          >
            Close
          </button>
        </div>
      ) : (
        <button
          onClick={() => setExpanded(true)}
          className="w-full bg-gold text-navy-900 font-semibold py-4 flex items-center justify-center gap-2 text-body"
        >
          Analyze Your Offer — Free
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero Offer Form                                                            */
/* -------------------------------------------------------------------------- */

function HeroOfferForm() {
  const [offer, setOffer] = useState("");

  const parsedOffer = parseFloat(offer.replace(/[^0-9.]/g, ""));
  const isValid = !isNaN(parsedOffer) && parsedOffer > 0;

  return (
    <div className="max-w-md mx-auto lg:mx-0">
      <label
        htmlFor="hero-offer"
        className="block text-body-sm font-medium text-white/70 mb-3"
      >
        Enter your settlement offer amount
      </label>
      <div className="relative mb-3">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl sm:text-3xl font-mono font-semibold text-white/30">
          $
        </span>
        <input
          id="hero-offer"
          type="text"
          inputMode="numeric"
          placeholder="0.00"
          value={offer}
          onChange={(e) => setOffer(e.target.value.replace(/[^0-9.,]/g, ""))}
          className="w-full pl-12 pr-4 py-4 sm:py-5 text-2xl sm:text-4xl font-mono font-semibold text-white bg-navy-800 border-2 border-navy-200/20 focus:outline-none focus:border-gold transition-all placeholder:text-white/15"
        />
      </div>
      <Link href="/claims/new">
        <button
          disabled={!isValid}
          className="w-full py-4 bg-gold text-navy-900 font-bold hover:bg-gold-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-body-lg"
        >
          Analyze My Offer — Free
          <ArrowRight className="w-5 h-5" />
        </button>
      </Link>
      <p className="mt-3 flex items-center justify-center gap-2 text-caption text-white/30">
        <Lock className="w-3 h-3" />
        No credit card required. See your full breakdown instantly.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Analysis Preview (visual element for hero)                                 */
/* -------------------------------------------------------------------------- */

function AnalysisPreview() {
  const { ref, inView } = useInView(0.2);

  return (
    <div ref={ref} className="max-w-md mx-auto lg:mx-0">
      <div
        className={`bg-navy-800 border border-white/10 overflow-hidden transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        {/* Header */}
        <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-gold" />
            <span className="text-caption font-semibold text-white/60 uppercase tracking-wider">
              ClaimCoach Analysis
            </span>
          </div>
          <span className="px-2 py-0.5 text-caption font-semibold bg-danger-500/20 text-danger-500">
            6 items missing
          </span>
        </div>

        {/* Line items */}
        <div className="px-5 py-4 space-y-2.5">
          {[
            {
              label: "Sales tax on replacement",
              amount: "+$1,840",
              status: "missing",
            },
            {
              label: "Title & registration fees",
              amount: "+$385",
              status: "missing",
            },
            {
              label: "Comparable vehicle adjustment",
              amount: "+$1,200",
              status: "missing",
            },
            {
              label: "Dealer documentation fees",
              amount: "+$499",
              status: "missing",
            },
            {
              label: "Loss of use (12 days)",
              amount: "+$540",
              status: "missing",
            },
            {
              label: "Aftermarket upgrades",
              amount: "+$750",
              status: "missing",
            },
          ].map((item, i) => (
            <div
              key={item.label}
              className={`flex items-center justify-between py-1.5 transition-all duration-500 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <div className="flex items-center gap-2">
                <XCircle className="w-3.5 h-3.5 text-danger-500" />
                <span className="text-body-sm text-white/50">{item.label}</span>
              </div>
              <span className="text-body-sm font-mono font-semibold text-success-500">
                {item.amount}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="px-5 py-3 border-t border-white/10 bg-success-500/10 flex items-center justify-between">
          <span className="text-body-sm font-semibold text-white">
            Additional amount owed
          </span>
          <span className="text-heading font-mono font-bold text-success-500">
            +$5,214
          </span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* FAQ data                                                                    */
/* -------------------------------------------------------------------------- */

const FAQ_ITEMS = [
  {
    question: "Is this legal?",
    answer:
      "Yes, you have every right to dispute your settlement offer. This is standard practice. Insurance companies expect pushback from informed policyholders — ClaimCoach simply gives you the documentation to back it up.",
  },
  {
    question: "Will this actually work?",
    answer:
      "Insurance companies respond to documented, itemized disputes backed by market data and state regulations. We give you exactly that — a professional counter-offer with specific dollar amounts and citations they can\u2019t ignore.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Free to analyze your offer and see your full breakdown. The complete toolkit — including counter-offer letter, call script, and escalation playbook — is $79 per claim. That\u2019s a 44x return on the average recovery of $3,500+.",
  },
  {
    question: "What if I already accepted the offer?",
    answer:
      "In most states, you can reopen or supplement your claim within a certain window. ClaimCoach\u2019s state legal guide will tell you your specific options and deadlines.",
  },
  {
    question: "Is my information secure?",
    answer:
      "All documents are encrypted in transit and at rest with 256-bit encryption. We automatically delete uploaded documents after analysis is complete. We never share your information with insurance companies or third parties.",
  },
  {
    question: "How is this different from hiring a public adjuster?",
    answer:
      "Public adjusters take 5\u201315% of your settlement and take weeks to deliver results. ClaimCoach costs $79, takes 5 minutes, and gives you the same market data, line-item analysis, and professional documentation.",
  },
];

/* -------------------------------------------------------------------------- */
/* JSON-LD structured data for FAQ                                            */
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
/* Missing line items data                                                    */
/* -------------------------------------------------------------------------- */

const MISSING_LINE_ITEMS = [
  {
    name: "Sales tax on replacement vehicle",
    range: "$800–$3,000+",
    detail:
      "You\u2019ll pay this when you buy your replacement car. Most offers leave it at $0.",
  },
  {
    name: "Title, registration & transfer fees",
    range: "$200–$500",
    detail:
      "Transfer costs for your replacement vehicle that the offer almost never includes.",
  },
  {
    name: "Comparable vehicle adjustments",
    range: "$500–$2,000",
    detail:
      "Your car gets compared to lower-trim, higher-mileage models. The difference is money out of your pocket.",
  },
  {
    name: "Dealer fees & documentation charges",
    range: "$300–$800",
    detail:
      "Dealer doc fees, advertising fees, and other costs you\u2019ll actually pay when buying a replacement.",
  },
  {
    name: "Aftermarket upgrades & modifications",
    range: "Varies",
    detail:
      "Tinted windows, upgraded audio, custom wheels — anything you added that increased the value.",
  },
  {
    name: "Loss of use / rental car gap",
    range: "$200–$1,500",
    detail:
      "Daily rate while you\u2019re without transportation. Owed even if you didn\u2019t rent a car.",
  },
];

/* -------------------------------------------------------------------------- */
/* Testimonials data                                                          */
/* -------------------------------------------------------------------------- */

const TESTIMONIALS = [
  {
    quote:
      "They offered me $8,200 for my 2019 Civic. ClaimCoach found $2,800 in missing line items. I settled for $10,900.",
    name: "M.K.",
    state: "Texas",
    recovered: 2700,
  },
  {
    quote:
      "I didn\u2019t even know I could dispute a total loss offer. ClaimCoach walked me through everything.",
    name: "J.R.",
    state: "Florida",
    recovered: 3200,
  },
  {
    quote:
      "Got an extra $1,600 just from the sales tax and registration fees they left off.",
    name: "A.P.",
    state: "California",
    recovered: 1600,
  },
];

/* -------------------------------------------------------------------------- */
/* Main page                                                                  */
/* -------------------------------------------------------------------------- */

export default function LandingPage() {
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
        {/* SECTION 1: HERO                                                  */}
        {/* ================================================================ */}
        <section
          id="hero-section"
          className="relative overflow-hidden bg-navy-900"
        >
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative container-wide py-16 sm:py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Copy + Form */}
              <div>
                <h1 className="font-serif text-display sm:text-display-xl text-white leading-[1.05] tracking-[-0.02em]">
                  Your insurance company&apos;s first offer is a{" "}
                  <span className="relative inline-block">
                    negotiation tactic
                    <span className="absolute -bottom-1 left-0 right-0 h-3 bg-danger-500/30 -z-10" />
                  </span>
                  .
                </h1>

                <p className="mt-6 text-body-lg text-white/50 max-w-lg leading-relaxed">
                  ClaimCoach analyzes your settlement offer in under 5 minutes
                  and shows you every line item they&apos;re hoping you
                  won&apos;t notice — so you can fight back with the numbers.
                </p>

                {/* Social proof badges */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-white text-body-sm font-medium">
                    <Users className="w-3.5 h-3.5 text-gold" />
                    2,400+ policyholders helped
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-white text-body-sm font-medium">
                    <DollarSign className="w-3.5 h-3.5 text-success-500" />
                    Avg $3,500+ recovered
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-white text-body-sm font-medium">
                    <Zap className="w-3.5 h-3.5 text-gold" />
                    Results in under 5 min
                  </span>
                </div>

                {/* Offer input form */}
                <div className="mt-10">
                  <HeroOfferForm />
                </div>
              </div>

              {/* Right: Analysis preview */}
              <div className="hidden lg:block">
                <AnalysisPreview />
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 2: THE PROBLEM (Reframe)                                */}
        {/* ================================================================ */}
        <section className="bg-navy-800 border-t border-white/5">
          <div className="container-wide py-16 sm:py-24">
            <div className="text-center mb-14">
              <p className="text-label uppercase tracking-[0.05em] text-white/30 font-medium mb-3">
                The reality
              </p>
              <h2 className="font-serif text-display-sm sm:text-display text-white tracking-[-0.02em] max-w-2xl mx-auto">
                The deck is stacked against you.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {/* Their side */}
              <div className="bg-danger-500/5 border border-danger-500/20 p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 bg-danger-500" />
                  <h3 className="text-label uppercase tracking-[0.05em] text-danger-500 font-bold">
                    Their side
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Adjusters handle 500+ claims per year",
                    "They use proprietary tools (like CCC ONE) that consistently undervalue",
                    "They\u2019re incentivized to close claims fast and cheap",
                    "They know most people won\u2019t push back",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-body-sm text-white/60"
                    >
                      <XCircle className="w-4 h-4 text-danger-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Your side */}
              <div className="bg-white/5 border border-white/10 p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 bg-white/40" />
                  <h3 className="text-label uppercase tracking-[0.05em] text-white/40 font-bold">
                    Your side
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "This is your first (maybe only) total loss claim",
                    "You have days to respond, not months",
                    "You don\u2019t know what line items should be on the offer",
                    "You don\u2019t know your state\u2019s specific regulations",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-body-sm text-white/60"
                    >
                      <AlertTriangle className="w-4 h-4 text-white/30 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bridge line */}
            <div className="mt-8 max-w-4xl mx-auto text-center">
              <p className="text-body-lg text-white/70 leading-relaxed">
                <span className="text-gold font-semibold">ClaimCoach</span>{" "}
                gives you the same analysis a public adjuster would — powered by
                AI, delivered in minutes, not weeks.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 3: HOW IT WORKS                                          */}
        {/* ================================================================ */}
        <section
          id="how-it-works"
          className="bg-navy-900 border-t border-white/5"
        >
          <div className="container-wide py-16 sm:py-24">
            <div className="text-center mb-16">
              <p className="text-label uppercase tracking-[0.05em] text-white/30 font-medium mb-3">
                Three steps
              </p>
              <h2 className="font-serif text-display-sm sm:text-display text-white tracking-[-0.02em]">
                Dead simple. Under 5 minutes.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  num: "01",
                  icon: <Zap className="w-6 h-6" />,
                  title: "Enter your offer",
                  desc: "Tell us what they offered and your vehicle details. Takes 60 seconds.",
                },
                {
                  num: "02",
                  icon: <Search className="w-6 h-6" />,
                  title: "Get your analysis",
                  desc: "Our AI compares your offer against market data, state regulations, and common missing line items.",
                },
                {
                  num: "03",
                  icon: <FileText className="w-6 h-6" />,
                  title: "Fight back with proof",
                  desc: "Get a detailed breakdown you can send directly to your adjuster with specific dollar amounts for each missing item.",
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="relative bg-navy-800 border border-white/10 p-6 sm:p-8 hover:border-gold/30 transition-colors group"
                >
                  <span className="text-5xl font-bold text-white/[0.03] absolute top-4 right-6 font-mono select-none">
                    {step.num}
                  </span>
                  <div className="relative">
                    <div className="w-12 h-12 bg-gold/10 text-gold flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                      {step.icon}
                    </div>
                    <h3 className="text-heading-lg text-white font-semibold">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-body text-white/40 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 4: WHAT WE FIND (The "Aha" Moment)                      */}
        {/* ================================================================ */}
        <WhatWeFind />

        {/* ================================================================ */}
        {/* SECTION 5: SOCIAL PROOF & TESTIMONIALS                           */}
        {/* ================================================================ */}
        <section className="bg-navy-900 border-t border-white/5">
          <div className="container-wide py-16 sm:py-24">
            <div className="text-center mb-14">
              <p className="text-label uppercase tracking-[0.05em] text-white/30 font-medium mb-3">
                Results
              </p>
              <h2 className="font-serif text-display-sm sm:text-display text-white tracking-[-0.02em]">
                Real people. Real money recovered.
              </h2>
            </div>

            {/* Testimonial cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="bg-navy-800 border border-white/10 p-6 sm:p-8 flex flex-col"
                >
                  <p className="text-body text-white/70 leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-body-sm font-semibold text-white">
                        {t.name}
                      </p>
                      <p className="text-caption text-white/30">{t.state}</p>
                    </div>
                    <span className="text-body-sm font-mono font-bold text-success-500">
                      +${t.recovered.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  value: "$2.1M+",
                  label: "Total recovered for users",
                },
                {
                  value: "$3,500+",
                  label: "Average increase per claim",
                },
                {
                  value: "85%",
                  label: "Of offers have missing line items",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 border border-white/10 p-5 text-center"
                >
                  <p className="text-display-sm font-mono font-bold text-gold">
                    {stat.value}
                  </p>
                  <p className="text-body-sm text-white/40 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 6: FAQ / OBJECTION HANDLING                              */}
        {/* ================================================================ */}
        <section className="bg-navy-800 border-t border-white/5">
          <div className="container-narrow py-16 sm:py-24">
            <div className="text-center mb-14">
              <p className="text-label uppercase tracking-[0.05em] text-white/30 font-medium mb-3">
                Questions
              </p>
              <h2 className="font-serif text-display-sm sm:text-display text-white tracking-[-0.02em]">
                Yeah, but&hellip;
              </h2>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item) => (
                <details
                  key={item.question}
                  className="group bg-white/5 border border-white/10 overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none px-6 py-5">
                    <span className="text-heading text-white font-medium pr-4">
                      {item.question}
                    </span>
                    <span className="text-white/30 group-open:rotate-45 transition-transform duration-200 flex-shrink-0 text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-5 pt-0">
                    <p className="text-body text-white/50 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 7: FINAL CTA                                             */}
        {/* ================================================================ */}
        <section className="bg-navy-900 border-t border-white/5">
          <div className="container-wide py-16 sm:py-24 lg:py-32">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-display-sm sm:text-display text-white tracking-[-0.02em]">
                Every day you wait, you&apos;re closer to accepting less than
                you&apos;re owed.
              </h2>
              <p className="mt-5 text-body-lg text-white/50 max-w-lg mx-auto">
                Enter your offer amount and see what they left out. It takes 5
                minutes and it&apos;s free.
              </p>
            </div>

            {/* Repeat offer form */}
            <div className="mt-12 max-w-md mx-auto">
              <HeroOfferForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 4: What We Find (extracted for readability)                        */
/* -------------------------------------------------------------------------- */

function WhatWeFind() {
  const { ref, inView } = useInView(0.15);

  return (
    <section ref={ref} className="bg-navy-800 border-t border-white/5">
      <div className="container-wide py-16 sm:py-24">
        <div className="text-center mb-14">
          <p className="text-label uppercase tracking-[0.05em] text-white/30 font-medium mb-3">
            What we catch
          </p>
          <h2 className="font-serif text-display-sm sm:text-display text-white tracking-[-0.02em]">
            Line items adjusters hope you&apos;ll miss.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {MISSING_LINE_ITEMS.map((item, i) => (
            <div
              key={item.name}
              className={`bg-white/5 border border-white/10 p-6 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-body-sm font-semibold text-white">
                  {item.name}
                </span>
              </div>
              <p className="text-heading font-mono font-bold text-success-500 mb-2">
                {item.range}
              </p>
              <p className="text-caption text-white/40 leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Callout box */}
        <div className="mt-10 max-w-3xl mx-auto">
          <div className="bg-gold/10 border border-gold/30 p-6 sm:p-8 text-center">
            <p className="text-body-lg text-white leading-relaxed">
              Most people are owed{" "}
              <span className="font-mono font-bold text-gold">
                $1,500–$4,000+
              </span>{" "}
              more than their first offer. The insurance company is counting on
              you not knowing this.
            </p>
            <Link href="/claims/new" className="inline-block mt-6">
              <button className="px-8 py-3 bg-gold text-navy-900 font-bold hover:bg-gold-300 transition-colors flex items-center gap-2 text-body">
                See what they left out of your offer
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
