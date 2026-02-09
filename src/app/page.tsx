"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

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
        <button className="w-full bg-brand-500 text-white font-semibold py-4 flex items-center justify-center gap-2 text-body shadow-elevated">
          Start Free Audit &rarr;
        </button>
      </Link>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero Offer Input                                                           */
/* -------------------------------------------------------------------------- */

function HeroOfferCard() {
  const [offer, setOffer] = useState("");

  const parsedOffer = parseFloat(offer.replace(/[^0-9.]/g, ""));
  const isValid = !isNaN(parsedOffer) && parsedOffer > 0;

  return (
    <div className="bg-white border border-charcoal-200 shadow-elevated rounded-xl p-6 sm:p-8 max-w-md mx-auto lg:mx-0">
      <p className="text-body font-semibold text-charcoal-900 mb-4">
        Check your offer fairness for free
      </p>
      <div className="relative mb-4">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl sm:text-3xl font-mono font-semibold text-charcoal-300">
          $
        </span>
        <input
          id="hero-offer"
          type="text"
          inputMode="numeric"
          placeholder="Enter settlement amount"
          value={offer}
          onChange={(e) => setOffer(e.target.value.replace(/[^0-9.,]/g, ""))}
          className="w-full pl-11 pr-4 py-4 sm:py-5 text-2xl sm:text-3xl font-mono font-semibold text-charcoal-900 bg-cream-100 border-2 border-charcoal-200 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all placeholder:text-charcoal-300 placeholder:text-base placeholder:font-sans placeholder:font-normal shadow-subtle"
        />
      </div>
      <Link href="/claims/new">
        <button
          disabled={!isValid}
          className="w-full py-4 bg-brand-500 text-white font-semibold text-body-lg hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-lg"
        >
          Analyze My Offer &rarr;
        </button>
      </Link>
      <p className="mt-3 text-center text-caption text-charcoal-400">
        Bank-level encryption. No credit card required.
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
        className={`bg-white border border-charcoal-200 shadow-float rounded-xl overflow-hidden transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* Report header */}
        <div className="bg-charcoal-900 px-5 py-3 rounded-t-xl">
          <span className="text-caption font-semibold text-white/70 uppercase tracking-wider">
            ClaimCoach Audit Report
          </span>
        </div>

        {/* Score */}
        <div className="px-5 py-5 text-center border-b border-charcoal-100">
          <p className="text-caption text-charcoal-400 uppercase tracking-wider mb-1">
            Additional recovery found
          </p>
          <p
            className={`text-score font-mono font-bold text-brand-500 transition-all duration-1000 ${inView ? "opacity-100" : "opacity-0"}`}
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
                <span className="text-brand-500 font-bold text-body-sm">+</span>
                <span className="text-body-sm text-charcoal-600">
                  {item.label}
                </span>
              </div>
              <span className="text-body-sm font-mono font-semibold text-brand-500">
                {item.amount}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-brand-50 border-t border-brand-100 flex items-center justify-between">
          <span className="text-body-sm font-semibold text-charcoal-700">
            Your new claim total
          </span>
          <span className="text-heading font-mono font-bold text-brand-600">
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
        className={`bg-white border border-charcoal-200 shadow-card rounded-xl overflow-hidden transition-all duration-600 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="bg-charcoal-50 px-5 py-3 rounded-t-xl">
          <span className="text-label uppercase tracking-[0.05em] text-charcoal-400 font-bold">
            Their Offer
          </span>
        </div>
        <div className="px-5 py-4 space-y-3">
          {theirItems.map((item) => (
            <div key={item.label} className="flex justify-between">
              <span className="text-body-sm text-charcoal-500">{item.label}</span>
              <span className="text-body-sm font-mono text-charcoal-500">
                {item.amount}
              </span>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-charcoal-100 flex justify-between">
          <span className="text-body-sm font-semibold text-charcoal-600">
            Total
          </span>
          <span className="text-heading font-mono font-bold text-warmred-400 line-through decoration-warmred-400 decoration-2">
            $12,500
          </span>
        </div>
      </div>

      {/* ClaimCoach Audit */}
      <div
        className={`bg-white border-2 border-brand-500 shadow-card rounded-xl overflow-hidden transition-all duration-600 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ transitionDelay: "200ms" }}
      >
        <div className="bg-brand-50 px-5 py-3 rounded-t-xl">
          <span className="text-label uppercase tracking-[0.05em] text-brand-600 font-bold">
            The ClaimCoach Audit
          </span>
        </div>
        <div className="px-5 py-4 space-y-3">
          {ourItems.map((item, i) => (
            <div
              key={item.label}
              className={`flex justify-between ${item.added ? "bg-brand-50 -mx-2 px-2 py-1 rounded-md" : ""}`}
            >
              <div className="flex items-center gap-2">
                {item.added && (
                  <span className="text-brand-500 font-bold text-body-sm">+</span>
                )}
                <span
                  className={`text-body-sm ${item.added ? "text-brand-700 font-medium" : "text-charcoal-600"}`}
                >
                  {item.label}
                </span>
              </div>
              <span
                className={`text-body-sm font-mono ${item.added ? "font-semibold text-brand-500" : "text-charcoal-600"}`}
              >
                {item.amount}
              </span>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-brand-100 bg-brand-50 flex justify-between">
          <span className="text-body-sm font-semibold text-brand-700">
            New Total
          </span>
          <span className="text-heading font-mono font-bold text-brand-700">
            $17,200
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
    vehicle: "2019 Toyota Camry",
    recovered: 5200,
    initials: "SJ",
  },
  {
    headline: "My adjuster folded immediately.",
    quote:
      "Once I sent the letter with the specific line items, they cut a supplemental check in 48 hours. No pushback at all.",
    name: "Mike T.",
    state: "Florida",
    vehicle: "2021 Honda Accord",
    recovered: 3800,
    initials: "MT",
  },
  {
    headline: "Found $2,500 in code upgrades they skipped.",
    quote:
      "The electrical panel had to be brought to current code. Insurance ignored it completely. ClaimCoach caught it immediately.",
    name: "Lisa M.",
    state: "California",
    vehicle: "2018 Ford F-150",
    recovered: 2500,
    initials: "LM",
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
    <div className="flex flex-col min-h-screen bg-cream-100">
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
        <section id="hero-section" className="bg-cream-100">
          <div className="container-wide py-14 sm:py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Copy */}
              <div>
                <h1 className="font-sans text-display sm:text-display-xl text-charcoal-900 leading-[1.08] tracking-tight">
                  Your insurance company&apos;s first offer is a{" "}
                  <span className="text-brand-500">negotiation tactic</span>.
                </h1>

                <p className="mt-6 text-body-lg text-charcoal-500 max-w-lg leading-relaxed">
                  85% of policyholders accept the initial payout and leave
                  thousands on the table. We analyze your offer for missing line
                  items in under 5 minutes.
                </p>

                {/* Trust badges - text only */}
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-body-sm text-charcoal-400">
                  <span>&#10003; 2,400+ policyholders</span>
                  <span>&#10003; Results in 5 min</span>
                  <span>&#10003; Documents encrypted</span>
                </div>

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
        <section className="bg-white border-y border-charcoal-100">
          <div className="container-wide py-5 sm:py-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <p className="text-label uppercase tracking-[0.05em] text-charcoal-400 font-bold whitespace-nowrap">
                We audit claims from major carriers including
              </p>
              <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8">
                {CARRIERS.map((carrier) => (
                  <span
                    key={carrier}
                    className="text-body-sm font-semibold text-charcoal-300 uppercase tracking-wider"
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
            <div className="max-w-2xl mb-14">
              <h2 className="font-sans text-display-sm sm:text-display text-charcoal-900 tracking-[-0.02em]">
                The &ldquo;Hidden&rdquo; Money They Don&apos;t Tell You About
              </h2>
              <p className="mt-4 text-body-lg text-charcoal-500 leading-relaxed">
                Adjusters use software designed to minimize payouts. We use the
                same data to find the line items they &ldquo;forgot.&rdquo;
              </p>
            </div>

            <ReceiptComparison />

            {/* Receipt-style callouts — data-driven bars instead of icons */}
            <div className="mt-14 max-w-3xl mx-auto space-y-4">
              {[
                {
                  label: "Overhead & Profit",
                  included: "$0",
                  owed: "+$2,500 (20%)",
                  note: "Often skipped by adjusters",
                  pct: 100,
                },
                {
                  label: "Code Upgrades",
                  included: "$0",
                  owed: "+$2,500",
                  note: "Legally required in most states",
                  pct: 100,
                },
                {
                  label: "Labor Tax",
                  included: "$0",
                  owed: "+$850",
                  note: "Frequently omitted from estimates",
                  pct: 34,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-cream-100 border border-charcoal-100 rounded-lg p-5"
                >
                  <div className="flex items-baseline justify-between mb-3">
                    <h4 className="text-heading text-charcoal-900 font-semibold">
                      {item.label}
                    </h4>
                    <span className="text-body font-mono font-bold text-brand-500">
                      {item.owed}
                    </span>
                  </div>
                  {/* Mini comparison bar */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 h-2 bg-charcoal-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-warmred-200 rounded-full"
                        style={{ width: "0%" }}
                      />
                    </div>
                    <span className="text-caption font-mono text-warmred-400 w-20 text-right">
                      Included: {item.included}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-charcoal-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-400 rounded-full"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                    <span className="text-caption font-mono text-brand-500 w-20 text-right">
                      Owed: {item.owed.replace(/ \(.+\)/, "")}
                    </span>
                  </div>
                  <p className="mt-2 text-caption text-charcoal-400">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 4: THE STACKED DECK (The Problem)                       */}
        {/* ================================================================ */}
        <section className="bg-cream-100">
          <div className="container-wide py-16 sm:py-24">
            <div className="max-w-2xl mb-14">
              <h2 className="font-sans text-display-sm sm:text-display text-charcoal-900 tracking-[-0.02em]">
                Why It&apos;s Hard to Fight Alone
              </h2>
            </div>

            <div className="max-w-3xl space-y-0">
              {[
                {
                  title: "The \u201CTake It or Leave It\u201D Trap",
                  desc: "They pressure you to sign quickly, claiming the file will close. It\u2019s a bluff. You have more time \u2014 and more leverage \u2014 than they want you to think.",
                },
                {
                  title: "Confusing Paperwork",
                  desc: "Their estimates are 30+ pages of codes (Xactimate) designed to be unreadable. If you can\u2019t understand it, you can\u2019t challenge it.",
                },
                {
                  title: "The \u201CPolicy Limit\u201D Lie",
                  desc: "They say \u201Cthat\u2019s the max we can pay\u201D without mentioning supplemental coverage, code upgrades, or overhead & profit \u2014 all items you\u2019re entitled to.",
                },
              ].map((card, i) => (
                <div
                  key={card.title}
                  className="py-8 border-b border-charcoal-200 last:border-b-0"
                >
                  <h3 className="text-heading-lg text-charcoal-900 font-semibold mb-3">
                    {card.title}
                  </h3>
                  <p className="text-body text-charcoal-500 leading-relaxed max-w-2xl">
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
            <div className="max-w-2xl mb-16">
              <h2 className="font-sans text-display-sm sm:text-display text-charcoal-900 tracking-[-0.02em]">
                How ClaimCoach Gets You More Money
              </h2>
              <p className="mt-4 text-body-lg text-charcoal-500">
                Upload your estimate, and our AI finds every dollar your insurer missed — in under 5 minutes.
              </p>
            </div>

            <div className="max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
                {[
                  {
                    num: "1",
                    title: "Upload Your Estimate",
                    desc: "Drag and drop your PDF or take photos of your insurer\u2019s paperwork.",
                  },
                  {
                    num: "2",
                    title: "We Scan for Errors",
                    desc: "Our AI checks your claim against local construction rates and 150+ common omissions.",
                  },
                  {
                    num: "3",
                    title: "You Get a Negotiation Letter",
                    desc: "Receive a generated, data-backed letter citing the exact codes to demand more money.",
                  },
                ].map((step) => (
                  <div key={step.num} className="relative">
                    {/* Large step number */}
                    <span className="block text-stat font-bold text-brand-500 mb-4 font-mono">
                      {step.num}
                    </span>
                    <h3 className="text-heading-lg text-charcoal-900 font-semibold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-body text-charcoal-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-14">
                <Link href="/claims/new">
                  <button className="px-8 py-4 bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-colors rounded-lg text-body-lg">
                    Start Free Audit &rarr;
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 6: TESTIMONIALS                                          */}
        {/* ================================================================ */}
        <section className="bg-cream-100">
          <div className="container-wide py-16 sm:py-24">
            <div className="max-w-2xl mb-14">
              <h2 className="font-sans text-display-sm sm:text-display text-charcoal-900 tracking-[-0.02em]">
                Real Money Recovered.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="bg-white border border-charcoal-100 shadow-card rounded-xl p-6 sm:p-8 flex flex-col"
                >
                  {/* Dollar recovered callout */}
                  <span className="inline-block text-heading-lg font-mono font-bold text-brand-500 mb-4">
                    +${t.recovered.toLocaleString()} recovered
                  </span>

                  {/* Large decorative quote mark */}
                  <span className="text-[3rem] leading-none text-charcoal-200 font-serif -mb-4">
                    &ldquo;
                  </span>

                  {/* Quote */}
                  <p className="text-body text-charcoal-600 leading-relaxed flex-1">
                    {t.quote}
                  </p>

                  {/* Attribution */}
                  <div className="mt-6 pt-4 border-t border-charcoal-100 flex items-center gap-3">
                    {/* Initials circle */}
                    <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-body-sm font-bold flex-shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-body-sm font-semibold text-charcoal-800">
                        {t.name}, {t.state}
                      </p>
                      <p className="text-caption text-charcoal-400">
                        {t.vehicle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
              {[
                { value: "$2.1M+", label: "Total recovered for users" },
                { value: "$3,500+", label: "Average increase per claim" },
                { value: "85%", label: "Of offers have missing line items" },
              ].map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <p className="text-stat font-mono font-bold text-brand-500">
                    {stat.value}
                  </p>
                  <p className="text-body-sm text-charcoal-400 mt-1">
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
              <h2 className="font-sans text-display-sm sm:text-display text-charcoal-900 tracking-[-0.02em]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-0">
              {FAQ_ITEMS.map((item, i) => (
                <details
                  key={item.question}
                  className="group border-b border-charcoal-200 first:border-t"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none py-6">
                    <span className="text-heading text-charcoal-800 font-semibold pr-4">
                      {item.question}
                    </span>
                    <span className="text-charcoal-400 group-open:rotate-45 transition-transform duration-200 flex-shrink-0 text-xl leading-none font-light">
                      +
                    </span>
                  </summary>
                  <div className="pb-6 pt-0">
                    <p className="text-body text-charcoal-500 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* FINAL CTA                                                        */}
        {/* ================================================================ */}
        <section className="bg-charcoal-900">
          <div className="container-wide py-16 sm:py-24 lg:py-28">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-sans text-display-sm sm:text-display text-white tracking-[-0.02em]">
                Stop guessing. Start recovering.
              </h2>
              <p className="mt-5 text-body-lg text-white/50 max-w-lg mx-auto">
                See how much more you are owed today.
              </p>

              <div className="mt-10">
                <Link href="/claims/new">
                  <button className="px-10 py-4 bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-colors rounded-lg text-body-lg">
                    Start Free Audit &rarr;
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
