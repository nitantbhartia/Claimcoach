"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

/* -------------------------------------------------------------------------- */
/* FAQ data                                                                    */
/* -------------------------------------------------------------------------- */

const FAQ_ITEMS = [
  {
    question: "IS THIS LEGAL?",
    answer:
      "Yes. You are exercising your right to \u201CIndemnification\u201D\u2014the legal principle that insurance must put you back in the financial position you were in before the loss.",
  },
  {
    question: "WHAT IF I ACCEPTED?",
    answer:
      "If you have not deposited the check or signed a \u201CRelease of Liability,\u201D you can still negotiate. If you have deposited it, it is significantly harder but not impossible depending on state laws.",
  },
  {
    question: "COST OF SERVICE?",
    answer:
      "We charge a flat fee for the report generation. We do not take a percentage of your settlement. We are a tool, not a law firm.",
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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface-100 border-t border-primary-border flex items-center px-5 py-3 gap-3">
      <div className="flex-1 font-display text-[0.9rem] uppercase text-primary">
        Recover Your Money
      </div>
      <Link href="/claims/new">
        <button className="bg-primary text-surface-100 font-display uppercase font-bold text-[0.9rem] tracking-wide px-5 py-2.5 active:scale-[0.98] transition-transform">
          Start Audit
        </button>
      </Link>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main page                                                                  */
/* -------------------------------------------------------------------------- */

export default function LandingPage() {
  const [offer, setOffer] = useState("");
  const parsedOffer = parseFloat(offer.replace(/[^0-9.]/g, ""));
  const isValid = !isNaN(parsedOffer) && parsedOffer > 0;

  return (
    <div className="noise-overlay min-h-screen bg-surface-100 text-primary font-body text-body pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <Header />
      <StickyCTA />

      <main>
        {/* ================================================================ */}
        {/* SECTION 1: HERO                                                  */}
        {/* ================================================================ */}
        <section id="hero-section" className="container-landing pt-10 pb-16">
          <h1 className="font-display uppercase text-display-xl text-primary border-l-2 border-primary pl-4 mb-6">
            Your insurance company&apos;s first offer is a negotiation tactic.
          </h1>
          <p className="text-primary-dim mb-8">
            They rely on you being tired, desperate, and uninformed. We built the weapon to fight back.
          </p>

          {/* Offer input */}
          <div className="relative my-8">
            <label className="absolute -top-2.5 left-3 bg-surface-100 px-2 text-[0.8rem] text-primary-dim uppercase tracking-widest">
              Enter Total Loss Offer
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="$ 0.00"
              value={offer}
              onChange={(e) => setOffer(e.target.value.replace(/[^0-9.,]/g, ""))}
              className="forensic-input"
            />
          </div>

          <Link href="/claims/new">
            <button
              disabled={!isValid}
              className="w-full py-[18px] bg-primary text-surface-100 font-display uppercase font-bold text-[1.1rem] tracking-wide disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-transform"
            >
              Analyze My Claim
            </button>
          </Link>

          {/* Proof bar */}
          <div className="flex gap-4 text-[0.75rem] text-primary-dim border-t border-b border-primary-border-light py-2.5 mt-8 mb-8">
            <div>
              <span className="block text-primary font-bold">2,400+</span>
              CLAIMS AUDITED
            </div>
            <div>
              <span className="block text-primary font-bold">$3,200</span>
              AVG. RECOVERY
            </div>
            <div>
              <span className="block text-primary font-bold">05:00</span>
              ANALYSIS TIME
            </div>
          </div>

          {/* Blurred preview */}
          <div className="relative border border-dashed border-primary-border p-5 mt-5 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-surface-100/40 z-10">
              <div className="border border-primary px-5 py-2.5 font-display uppercase bg-surface-100 text-primary text-[0.9rem]">
                Analysis Locked
              </div>
            </div>
            <div className="blur-[5px] opacity-60 select-none">
              <div className="receipt-row">
                <span className="text-[0.9rem] text-primary-dim">Base Value Adjustment</span>
                <span className="font-body text-primary font-bold">+$1,240.00</span>
              </div>
              <div className="receipt-row">
                <span className="text-[0.9rem] text-primary-dim">Missing Sales Tax</span>
                <span className="font-body text-primary font-bold">+$845.20</span>
              </div>
              <div className="receipt-row">
                <span className="text-[0.9rem] text-primary-dim">Title &amp; Reg Fees</span>
                <span className="font-body text-primary font-bold">+$215.00</span>
              </div>
              <div className="receipt-row">
                <span className="text-[0.9rem] text-primary-dim">Condition Rating</span>
                <span className="font-body text-primary font-bold">+$600.00</span>
              </div>
              <h3 className="font-display uppercase text-display-sm text-right mt-5 text-primary">
                POTENTIAL RECOVERY: $2,900.20
              </h3>
            </div>
          </div>
          <p className="text-[0.7rem] text-primary-muted text-center mt-2.5">
            *Sample output based on real user data.
          </p>
        </section>

        {/* ================================================================ */}
        {/* SECTION 2: THE DECK IS STACKED                                   */}
        {/* ================================================================ */}
        <section className="border-b border-primary-border">
          <div className="container-landing py-16">
            <h2 className="font-display uppercase text-display border-b border-primary-border pb-2 mb-4">
              The Deck Is Stacked
            </h2>
            <p className="text-primary-dim mb-6">
              Insurance adjusters use proprietary software (CCC, Mitchell) specifically designed to minimize payouts. You are bringing a knife to a drone fight.
            </p>

            <div className="grid gap-5">
              {/* The Adjuster card */}
              <div className="border border-primary-border p-5" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0) 100%)" }}>
                <div className="font-display text-[1.2rem] border-b border-primary-border pb-2.5 mb-4 flex justify-between">
                  <span>THE ADJUSTER</span>
                  <span className="text-primary-muted">OPFOR</span>
                </div>
                <ul className="list-none p-0 space-y-2.5">
                  {[
                    "Access to millions of low-ball comps",
                    "Proprietary algorithmic devaluation",
                    "Incentivized to underpay by 15-20%",
                    "Counts on your financial desperation",
                  ].map((item) => (
                    <li key={item} className="pl-5 relative text-primary-dim">
                      <span className="absolute left-0 text-primary-muted">x</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* You + ClaimCoach card */}
              <div className="border-2 border-primary p-5" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0) 100%)" }}>
                <div className="font-display text-[1.2rem] border-b-2 border-primary pb-2.5 mb-4 flex justify-between">
                  <span>YOU + CLAIMCOACH</span>
                  <span>ALLY</span>
                </div>
                <ul className="list-none p-0 space-y-2.5">
                  {[
                    "Full forensic audit of the settlement",
                    "Identification of missing line items",
                    "Generate legalistic demand letters",
                    "Data-backed leverage to force fair payouts",
                  ].map((item) => (
                    <li key={item} className="pl-5 relative text-primary">
                      <span className="absolute left-0 text-primary font-bold">&check;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 3: PROTOCOL (How It Works)                               */}
        {/* ================================================================ */}
        <section className="border-b border-primary-border">
          <div className="container-landing py-16">
            <h2 className="font-display uppercase text-display border-b border-primary-border pb-2 mb-8">
              Protocol
            </h2>

            {/* Step I */}
            <div className="mb-8 pl-5 border-l border-primary-border">
              <div className="font-display text-step-num text-primary-border leading-none mb-2.5">I</div>
              <h3 className="font-display uppercase text-display-sm mb-2">Upload &amp; Input</h3>
              <p className="text-primary-dim">Enter your settlement offer and vehicle details. Our system ingests the data securely.</p>
            </div>

            {/* Step II */}
            <div className="mb-8 pl-5 border-l border-primary-border">
              <div className="font-display text-step-num text-primary-border leading-none mb-2.5">II</div>
              <h3 className="font-display uppercase text-display-sm mb-2">Forensic Scan</h3>
              <p className="text-primary-dim">AI cross-references your offer against state laws, real market data, and 2,000+ past claims to find discrepancies.</p>
            </div>

            {/* Step III — highlighted */}
            <div className="mb-8 pl-5 border-l-2 border-primary">
              <div className="font-display text-step-num text-primary leading-none mb-2.5">III</div>
              <h3 className="font-display uppercase text-display-sm text-primary mb-2">Counter-Attack</h3>
              <p className="text-primary">Receive a generated negotiation packet citing specific statutes and missing values. You send it. They pay.</p>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 4: MISSING CAPITAL                                       */}
        {/* ================================================================ */}
        <section className="border-b border-primary-border">
          <div className="container-landing py-16">
            <h2 className="font-display uppercase text-display border-b border-primary-border pb-2 mb-4">
              Missing Capital
            </h2>
            <p className="text-primary-dim">
              Most consumers leave{" "}
              <strong className="text-primary bg-primary/10 px-1">$1,500 – $4,000</strong>{" "}
              on the table because they don&apos;t know what to ask for.
            </p>

            <div className="mt-8 border border-primary-border-light p-5">
              <div className="receipt-row">
                <span className="text-[0.9rem] text-primary-dim">UNPAID SALES TAX</span>
                <span className="font-body text-primary font-bold">$800 – $3,000</span>
              </div>
              <p className="text-[0.75rem] text-primary-dim mb-5">
                Legally required in 34 states, often &ldquo;accidentally&rdquo; omitted.
              </p>

              <div className="receipt-row">
                <span className="text-[0.9rem] text-primary-dim">TITLE &amp; REGISTRATION</span>
                <span className="font-body text-primary font-bold">$200 – $500</span>
              </div>
              <p className="text-[0.75rem] text-primary-dim mb-5">
                Transfer fees required to replace your vehicle.
              </p>

              <div className="receipt-row">
                <span className="text-[0.9rem] text-primary-dim">VALUATION ADJUSTMENT</span>
                <span className="font-body text-primary font-bold">$500 – $2,000</span>
              </div>
              <p className="text-[0.75rem] text-primary-dim mb-0">
                Correcting the condition rating of your car vs. the comps.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 5: CASE FILES (Testimonials)                             */}
        {/* ================================================================ */}
        <section className="border-b border-primary-border">
          <div className="container-landing py-16">
            <h2 className="font-display uppercase text-display border-b border-primary-border pb-2 mb-8">
              Case Files
            </h2>

            <div className="mb-8">
              <p className="italic border-l-2 border-primary-border pl-4 text-primary/80">
                &ldquo;They offered $14k. ClaimCoach found they used comps from 200 miles away. I sent the generated letter and got a check for $17.5k three days later.&rdquo;
              </p>
              <div className="font-body text-[0.8rem] uppercase text-primary-muted mt-3">
                — Michael R. <span className="text-primary font-bold">(Recovered +$3,500)</span> / TX
              </div>
            </div>

            <div className="mb-8">
              <p className="italic border-l-2 border-primary-border pl-4 text-primary/80">
                &ldquo;I didn&apos;t even know I was owed sales tax. That alone was $1,200. This tool is lethal.&rdquo;
              </p>
              <div className="font-body text-[0.8rem] uppercase text-primary-muted mt-3">
                — Sarah J. <span className="text-primary font-bold">(Recovered +$1,200)</span> / FL
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 6: FAQ                                                   */}
        {/* ================================================================ */}
        <section className="mb-16">
          <div className="container-landing py-16">
            <h2 className="font-display uppercase text-display border-b border-primary-border pb-2 mb-4">
              Intelligence / FAQ
            </h2>

            <div>
              {FAQ_ITEMS.map((item) => (
                <details key={item.question} className="landing-accordion border-b border-primary-border group">
                  <summary className="w-full text-left py-5 font-display text-[1.1rem] cursor-pointer flex justify-between items-center text-primary">
                    <span>{item.question}</span>
                    <span className="text-primary-dim group-open:rotate-45 transition-transform duration-200">+</span>
                  </summary>
                  <div className="pb-5 text-primary-dim text-[0.9rem]">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
