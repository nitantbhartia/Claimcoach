"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  ArrowRight,
  Shield,
  FileText,
  CheckCircle2,
  Search,
  Zap,
  Lock,
  DollarSign,
  XCircle,
  Upload,
  Star,
  Gavel,
  ChevronRight,
  BarChart3,
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
      <Link href="/claims/new">
        <button className="w-full bg-emerald-600 text-white font-semibold py-4 flex items-center justify-center gap-2 text-body shadow-elevated">
          Start Free Audit
          <ChevronRight className="w-4 h-4" />
        </button>
      </Link>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero Floating Card Form                                                    */
/* -------------------------------------------------------------------------- */

function HeroOfferCard() {
  const [offer, setOffer] = useState("");

  const parsedOffer = parseFloat(offer.replace(/[^0-9.]/g, ""));
  const isValid = !isNaN(parsedOffer) && parsedOffer > 0;

  return (
    <div className="bg-white border border-slate-200 shadow-float rounded-xl p-6 sm:p-8 max-w-md mx-auto lg:mx-0">
      <p className="text-body-sm font-semibold text-slate-800 mb-4">
        Check your offer fairness for free
      </p>
      <div className="relative mb-4">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl sm:text-2xl font-mono font-semibold text-slate-300">
          $
        </span>
        <input
          id="hero-offer"
          type="text"
          inputMode="numeric"
          placeholder="Enter settlement amount"
          value={offer}
          onChange={(e) => setOffer(e.target.value.replace(/[^0-9.,]/g, ""))}
          className="w-full pl-10 pr-4 py-3 sm:py-4 text-xl sm:text-2xl font-mono font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/20 transition-all placeholder:text-slate-300 placeholder:text-base placeholder:font-sans placeholder:font-normal"
        />
      </div>
      <Link href="/claims/new">
        <button
          disabled={!isValid}
          className="w-full py-3.5 bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-body-lg shadow-card rounded-lg"
        >
          Analyze My Offer
          <ArrowRight className="w-5 h-5" />
        </button>
      </Link>
      <p className="mt-3 flex items-center justify-center gap-2 text-caption text-slate-400">
        <Lock className="w-3 h-3" />
        Bank-level security. No credit card required.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Audit Report Preview (right side of hero)                                  */
/* -------------------------------------------------------------------------- */

function AuditReportPreview() {
  const { ref, inView } = useInView(0.2);

  return (
    <div ref={ref} className="max-w-sm mx-auto lg:ml-auto lg:mr-0">
      <div
        className={`bg-white border border-slate-200 shadow-float rounded-xl overflow-hidden transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* Report header */}
        <div className="bg-slate-800 px-5 py-3 rounded-t-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span className="text-caption font-semibold text-white/80 uppercase tracking-wider">
              ClaimCoach Audit Report
            </span>
          </div>
        </div>

        {/* Score */}
        <div className="px-5 py-5 text-center border-b border-slate-100">
          <p className="text-caption text-slate-400 uppercase tracking-wider mb-1">
            Additional recovery found
          </p>
          <p
            className={`text-score font-mono font-bold text-emerald-600 transition-all duration-1000 ${inView ? "opacity-100" : "opacity-0"}`}
          >
            +$4,700
          </p>
        </div>

        {/* Line items found */}
        <div className="px-5 py-4 space-y-3">
          {[
            { label: "Overhead & Profit (20%)", amount: "+$2,500" },
            { label: "Code upgrade (electrical)", amount: "+$1,350" },
            { label: "Labor tax omission", amount: "+$850" },
          ].map((item, i) => (
            <div
              key={item.label}
              className={`flex items-center justify-between transition-all duration-500 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
              style={{ transitionDelay: `${500 + i * 150}ms` }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-body-sm text-slate-600">
                  {item.label}
                </span>
              </div>
              <span className="text-body-sm font-mono font-semibold text-emerald-600">
                {item.amount}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-emerald-50 border-t border-emerald-100 flex items-center justify-between">
          <span className="text-body-sm font-semibold text-slate-700">
            Your new claim total
          </span>
          <span className="text-heading font-mono font-bold text-emerald-700">
            $17,200
          </span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Receipt comparison (Before / After)                                        */
/* -------------------------------------------------------------------------- */

function ReceiptComparison() {
  const { ref, inView } = useInView(0.2);

  const theirItems = [
    { label: "Structure repair", amount: "$8,400" },
    { label: "Contents & personal property", amount: "$2,800" },
    { label: "Additional living expenses", amount: "$1,300" },
  ];

  const ourItems = [
    { label: "Structure repair", amount: "$8,400" },
    { label: "Contents & personal property", amount: "$2,800" },
    { label: "Additional living expenses", amount: "$1,300" },
    { label: "Overhead & Profit (+20%)", amount: "+$2,500", added: true },
    { label: "Code upgrade (electrical)", amount: "+$1,350", added: true },
    { label: "Debris removal", amount: "+$850", added: true },
  ];

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {/* Their Offer */}
      <div
        className={`bg-white border border-slate-200 shadow-card rounded-xl overflow-hidden transition-all duration-600 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="bg-slate-100 px-5 py-3 flex items-center gap-2 rounded-t-xl">
          <div className="w-2 h-2 rounded-full bg-danger-500" />
          <span className="text-label uppercase tracking-[0.05em] text-slate-500 font-bold">
            Their Offer
          </span>
        </div>
        <div className="px-5 py-4 space-y-3">
          {theirItems.map((item) => (
            <div key={item.label} className="flex justify-between">
              <span className="text-body-sm text-slate-500">{item.label}</span>
              <span className="text-body-sm font-mono text-slate-500">
                {item.amount}
              </span>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-slate-100 flex justify-between">
          <span className="text-body-sm font-semibold text-slate-600">
            Total
          </span>
          <span className="text-heading font-mono font-bold text-slate-500 line-through decoration-danger-500 decoration-2">
            $12,500
          </span>
        </div>
      </div>

      {/* ClaimCoach Audit */}
      <div
        className={`bg-white border-2 border-emerald-600 shadow-card rounded-xl overflow-hidden transition-all duration-600 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ transitionDelay: "200ms" }}
      >
        <div className="bg-emerald-50 px-5 py-3 flex items-center gap-2 rounded-t-xl">
          <div className="w-2 h-2 rounded-full bg-emerald-600" />
          <span className="text-label uppercase tracking-[0.05em] text-emerald-700 font-bold">
            The ClaimCoach Audit
          </span>
        </div>
        <div className="px-5 py-4 space-y-3">
          {ourItems.map((item, i) => (
            <div
              key={item.label}
              className={`flex justify-between ${item.added ? "bg-emerald-50 -mx-2 px-2 py-1" : ""}`}
            >
              <div className="flex items-center gap-2">
                {item.added && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                )}
                <span
                  className={`text-body-sm ${item.added ? "text-emerald-700 font-medium" : "text-slate-600"}`}
                >
                  {item.label}
                </span>
              </div>
              <span
                className={`text-body-sm font-mono ${item.added ? "font-semibold text-emerald-600" : "text-slate-600"}`}
              >
                {item.amount}
              </span>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-emerald-100 bg-emerald-50 flex justify-between">
          <span className="text-body-sm font-semibold text-emerald-700">
            New Total
          </span>
          <span className="text-heading font-mono font-bold text-emerald-700">
            $17,200
          </span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Five Stars component                                                       */
/* -------------------------------------------------------------------------- */

function FiveStars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4 fill-gold text-gold"
        />
      ))}
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
      "Yes, you have every right to dispute your settlement offer. This is standard practice. Insurance companies expect pushback from informed policyholders \u2014 ClaimCoach simply gives you the documentation to back it up.",
  },
  {
    question: "Will this actually work?",
    answer:
      "Insurance companies respond to documented, itemized disputes backed by market data and state regulations. We give you exactly that \u2014 a professional counter-offer with specific dollar amounts and citations they can\u2019t ignore.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Free to analyze your offer and see your full breakdown. The complete toolkit \u2014 including counter-offer letter, call script, and escalation playbook \u2014 is $79 per claim. That\u2019s a 44x return on the average recovery of $3,500+.",
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
/* Testimonials data                                                          */
/* -------------------------------------------------------------------------- */

const TESTIMONIALS = [
  {
    headline: "They offered $8k. ClaimCoach found $5,200 more.",
    quote:
      "I didn\u2019t know I could claim for debris removal until the audit showed me. The letter they generated got me a supplemental check in two weeks.",
    name: "Sarah J.",
    state: "Texas",
    recovered: 5200,
  },
  {
    headline: "My adjuster folded immediately.",
    quote:
      "Once I sent the letter with the specific line items, they cut a supplemental check in 48 hours. No pushback at all.",
    name: "Mike T.",
    state: "Florida",
    recovered: 3800,
  },
  {
    headline: "Found $2,500 in code upgrades they skipped.",
    quote:
      "The electrical panel had to be brought to current code. Insurance ignored it completely. ClaimCoach caught it immediately.",
    name: "Lisa M.",
    state: "California",
    recovered: 2500,
  },
];

/* -------------------------------------------------------------------------- */
/* Carrier names for social proof                                             */
/* -------------------------------------------------------------------------- */

const CARRIERS = ["State Farm", "Allstate", "Liberty Mutual", "GEICO", "Farmers"];

/* -------------------------------------------------------------------------- */
/* Main page                                                                  */
/* -------------------------------------------------------------------------- */

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
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
        <section id="hero-section" className="bg-white">
          <div className="container-wide py-14 sm:py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Copy */}
              <div>
                <h1 className="font-sans text-display sm:text-display-xl text-slate-900 leading-[1.08] tracking-tight">
                  Your insurance company&apos;s first offer is a{" "}
                  <span className="text-emerald-600">negotiation tactic</span>.
                </h1>

                <p className="mt-6 text-body-lg text-slate-500 max-w-lg leading-relaxed">
                  85% of policyholders accept the initial payout and leave
                  thousands on the table. We analyze your offer for missing line
                  items in under 5 minutes.
                </p>

                {/* Desktop form */}
                <div className="mt-10">
                  <HeroOfferCard />
                </div>
              </div>

              {/* Right: Audit Report preview */}
              <div className="hidden lg:block">
                <AuditReportPreview />
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 2: SOCIAL PROOF BAR                                      */}
        {/* ================================================================ */}
        <section className="bg-slate-50 border-y border-slate-200">
          <div className="container-wide py-5 sm:py-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <p className="text-label uppercase tracking-[0.05em] text-slate-400 font-bold whitespace-nowrap">
                We audit claims from major carriers including
              </p>
              <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8">
                {CARRIERS.map((carrier) => (
                  <span
                    key={carrier}
                    className="text-body-sm font-semibold text-slate-300 uppercase tracking-wider"
                  >
                    {carrier}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 3: THE RECEIPT (Visual Hook)                             */}
        {/* ================================================================ */}
        <section className="bg-white">
          <div className="container-wide py-16 sm:py-24">
            <div className="text-center mb-14">
              <h2 className="font-sans text-display-sm sm:text-display text-slate-900 tracking-[-0.02em]">
                The &ldquo;Hidden&rdquo; Money They Don&apos;t Tell You About
              </h2>
              <p className="mt-4 text-body-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                Adjusters use software designed to minimize payouts. We use the
                same data to find the line items they &ldquo;forgot.&rdquo;
              </p>
            </div>

            <ReceiptComparison />

            {/* Receipt-style callouts */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                {
                  label: "Overhead & Profit",
                  value: "+20%",
                  note: "Often skipped",
                },
                {
                  label: "Code Upgrades",
                  value: "+$2,500",
                  note: "Legally required",
                },
                {
                  label: "Labor Tax",
                  value: "+$850",
                  note: "Frequently missed",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-lg"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-body-sm font-semibold text-slate-800">
                      {item.label}:{" "}
                      <span className="font-mono text-emerald-600">
                        {item.value}
                      </span>
                    </p>
                    <p className="text-caption text-slate-400">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 4: THE STACKED DECK (The Problem)                       */}
        {/* ================================================================ */}
        <section className="bg-slate-50 border-y border-slate-200">
          <div className="container-wide py-16 sm:py-24">
            <div className="text-center mb-14">
              <h2 className="font-sans text-display-sm sm:text-display text-slate-900 tracking-[-0.02em]">
                Why It&apos;s Hard to Fight Alone
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: <Shield className="w-7 h-7" />,
                  title: 'The "Take It or Leave It" Trap',
                  desc: "They pressure you to sign quickly, claiming the file will close. It\u2019s a bluff. You have more time \u2014 and more leverage \u2014 than they want you to think.",
                },
                {
                  icon: <FileText className="w-7 h-7" />,
                  title: "Confusing Paperwork",
                  desc: "Their estimates are 30+ pages of codes (Xactimate) designed to be unreadable. If you can\u2019t understand it, you can\u2019t challenge it.",
                },
                {
                  icon: <Gavel className="w-7 h-7" />,
                  title: 'The "Policy Limit" Lie',
                  desc: 'They say "that\u2019s the max we can pay" without mentioning supplemental coverage, code upgrades, or overhead & profit \u2014 all items you\u2019re entitled to.',
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="bg-white border border-slate-200 shadow-card rounded-xl p-6 sm:p-8 hover:shadow-elevated transition-shadow"
                >
                  <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center mb-5">
                    {card.icon}
                  </div>
                  <h3 className="text-heading-lg text-slate-900 font-semibold">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-body text-slate-500 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 5: HOW IT WORKS                                          */}
        {/* ================================================================ */}
        <section id="how-it-works" className="bg-white">
          <div className="container-wide py-16 sm:py-24">
            <div className="text-center mb-16">
              <h2 className="font-sans text-display-sm sm:text-display text-slate-900 tracking-[-0.02em]">
                Dead Simple. Under 5 Minutes.
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
                {/* Dotted line connector (desktop) */}
                <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-[2px] border-t-2 border-dashed border-slate-200 z-0" />

                {[
                  {
                    num: "1",
                    icon: <Upload className="w-6 h-6" />,
                    title: "Upload Your Estimate",
                    desc: "Drag and drop your PDF or take photos of your insurer\u2019s paperwork.",
                  },
                  {
                    num: "2",
                    icon: <Search className="w-6 h-6" />,
                    title: "We Scan for Errors",
                    desc: "Our AI checks your claim against local construction rates and 150+ common omissions.",
                  },
                  {
                    num: "3",
                    icon: <FileText className="w-6 h-6" />,
                    title: "You Get a Negotiation Letter",
                    desc: "Receive a generated, data-backed letter citing the exact codes to demand more money.",
                  },
                ].map((step) => (
                  <div key={step.num} className="relative text-center px-4 py-6">
                    {/* Step circle */}
                    <div className="relative z-10 w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-card">
                      {step.icon}
                    </div>
                    <h3 className="text-heading text-slate-900 font-semibold">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-body-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-12 text-center">
                <Link href="/claims/new">
                  <button className="px-8 py-3.5 bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-card rounded-lg flex items-center gap-2 mx-auto text-body-lg">
                    Start Free Audit
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 6: TESTIMONIALS                                          */}
        {/* ================================================================ */}
        <section className="bg-slate-50 border-y border-slate-200">
          <div className="container-wide py-16 sm:py-24">
            <div className="text-center mb-14">
              <h2 className="font-sans text-display-sm sm:text-display text-slate-900 tracking-[-0.02em]">
                Real Money Recovered.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="bg-white border border-slate-200 shadow-card rounded-xl p-6 sm:p-8 flex flex-col hover:shadow-elevated transition-shadow"
                >
                  {/* Stars */}
                  <FiveStars />

                  {/* Headline */}
                  <p className="mt-4 text-heading text-slate-900 font-semibold">
                    &ldquo;{t.headline}&rdquo;
                  </p>

                  {/* Quote */}
                  <p className="mt-3 text-body-sm text-slate-500 leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Attribution */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-body-sm font-semibold text-slate-700">
                        {t.name}
                      </p>
                      <p className="text-caption text-slate-400">{t.state}</p>
                    </div>
                    <span className="text-body font-mono font-bold text-emerald-600">
                      +${t.recovered.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { value: "$2.1M+", label: "Total recovered for users" },
                { value: "$3,500+", label: "Average increase per claim" },
                { value: "85%", label: "Of offers have missing line items" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white border border-slate-200 shadow-subtle rounded-xl p-5 text-center"
                >
                  <p className="text-display-sm font-mono font-bold text-emerald-600">
                    {stat.value}
                  </p>
                  <p className="text-body-sm text-slate-400 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* FAQ                                                               */}
        {/* ================================================================ */}
        <section className="bg-white">
          <div className="container-narrow py-16 sm:py-24">
            <div className="text-center mb-14">
              <h2 className="font-sans text-display-sm sm:text-display text-slate-900 tracking-[-0.02em]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item) => (
                <details
                  key={item.question}
                  className="group bg-slate-50 border border-slate-200 rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none px-6 py-5">
                    <span className="text-heading text-slate-800 font-medium pr-4">
                      {item.question}
                    </span>
                    <span className="text-slate-400 group-open:rotate-45 transition-transform duration-200 flex-shrink-0 text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-5 pt-0">
                    <p className="text-body text-slate-500 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* FINAL CTA (Dark Navy)                                            */}
        {/* ================================================================ */}
        <section className="bg-navy-800">
          <div className="container-wide py-16 sm:py-24 lg:py-28">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-sans text-display-sm sm:text-display text-white tracking-[-0.02em]">
                Stop guessing. Start recovering.
              </h2>
              <p className="mt-5 text-body-lg text-white/60 max-w-lg mx-auto">
                See how much more you are owed today.
              </p>

              <div className="mt-10">
                <Link href="/claims/new">
                  <button className="px-10 py-4 bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-elevated rounded-lg flex items-center gap-2 mx-auto text-body-lg">
                    Start Free Audit
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <p className="mt-4 text-caption text-white/30">
                  Free analysis. No credit card. Results in under 5 minutes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
