import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-paper-white">
      <Header />

      <main className="flex-1">
        {/* ---- HERO ---- */}
        <section className="py-20 sm:py-28">
          <div className="container-wide text-center">
            <p className="text-caption uppercase tracking-[0.2em] text-ink-800/60 font-medium mb-3">
              Pricing
            </p>
            <h1 className="font-serif text-display-sm sm:text-display text-ink-800">
              Simple. Transparent.
            </h1>
            <p className="mt-4 text-body-lg text-slate-500 max-w-lg mx-auto">
              Start free. Pay only when you need the full toolkit.
            </p>
          </div>
        </section>

        {/* ---- TIERS ---- */}
        <section className="pb-20 sm:pb-28">
          <div className="container-narrow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Free */}
              <div className="rounded-xl border border-slate-200 bg-white p-8">
                <h2 className="font-serif text-heading-lg text-ink-800">Free</h2>
                <p className="mt-2">
                  <span className="text-display-sm font-serif font-bold text-ink-800">$0</span>
                </p>
                <p className="text-body-sm text-slate-500 mt-1 mb-8">
                  No credit card required
                </p>

                <div className="space-y-3">
                  {[
                    "1 active claim",
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

                <div className="mt-10">
                  <Link href="/signup">
                    <Button variant="outline" size="md" className="w-full">
                      Start Free
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Per Claim */}
              <div className="rounded-xl border-2 border-ink-800 bg-white p-8 relative shadow-paper">
                <div className="absolute -top-3 left-6 px-3 py-0.5 rounded bg-ink-800 text-white text-caption font-medium uppercase tracking-wider">
                  Recommended
                </div>
                <h2 className="font-serif text-heading-lg text-ink-800">Full Toolkit</h2>
                <p className="mt-2">
                  <span className="text-display-sm font-serif font-bold text-ink-800">$79</span>
                  <span className="text-body-sm text-slate-500 ml-1">per claim</span>
                </p>
                <p className="text-body-sm text-slate-500 mt-1 mb-8">
                  One-time payment, no subscription
                </p>

                <div className="space-y-3">
                  {[
                    "Everything in Free",
                    "Full AI policy analysis",
                    "Detailed fairness score with line-item breakdown",
                    "Professional counter-offer letter",
                    "Adjuster call script with objection handlers",
                    "State-specific legal guide",
                    "Step-by-step escalation playbook",
                    "Export full report as PDF",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-body text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-ink-800 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <Link href="/signup">
                    <Button
                      size="md"
                      className="w-full bg-ink-800 text-white hover:bg-ink-900"
                    >
                      Get Started
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Pro */}
              <div className="rounded-xl border border-slate-200 bg-white p-8">
                <h2 className="font-serif text-heading-lg text-ink-800">Pro</h2>
                <p className="mt-2">
                  <span className="text-display-sm font-serif font-bold text-ink-800">$49</span>
                  <span className="text-body-sm text-slate-500 ml-1">/mo</span>
                </p>
                <p className="text-body-sm text-slate-500 mt-1 mb-8">
                  Billed quarterly at $147/quarter. Unlimited claims.
                </p>

                <div className="space-y-3">
                  {[
                    "Everything in Full Toolkit",
                    "Unlimited claims",
                    "Priority AI analysis",
                    "Claim history and tracking",
                    "Multi-vehicle support",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-body text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-ink-800 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <Link href="/signup">
                    <Button variant="outline" size="md" className="w-full">
                      Go Pro
                    </Button>
                  </Link>
                </div>
                <p className="text-caption text-slate-400 text-center mt-3">
                  For agents, attorneys &amp; public adjusters
                </p>
              </div>
            </div>

            <p className="mt-10 text-body-sm text-slate-400 text-center">
              All plans include a 30-day money-back guarantee.
            </p>
          </div>
        </section>

        <div className="divider" />

        {/* ---- ROI ---- */}
        <section className="section-gap">
          <div className="container-narrow">
            <p className="text-caption uppercase tracking-[0.2em] text-ink-800/60 font-medium mb-3">
              Return on Investment
            </p>
            <h2 className="font-serif text-display text-ink-800">
              The math is simple.
            </h2>

            <div className="mt-12 flex flex-col sm:flex-row items-baseline gap-4 sm:gap-8">
              <div>
                <p className="text-display-xl font-serif font-bold text-ink-800">$79</p>
                <p className="text-body-sm text-slate-500 mt-1">
                  ClaimCoach fee
                </p>
              </div>

              <span
                className="hidden sm:block text-display text-slate-200 select-none font-serif"
                aria-hidden="true"
              >
                &rarr;
              </span>

              <div>
                <p className="text-display-xl font-serif font-bold text-emerald-600">
                  <span className="mark-yellow">$3,500+</span>
                </p>
                <p className="text-body-sm text-slate-500 mt-1">
                  Average additional recovery
                </p>
              </div>
            </div>

            <p className="mt-10 text-body-lg text-slate-500 max-w-xl leading-relaxed">
              The average auto property damage claim is underpaid by
              $3,000&ndash;$5,000. A single successful counter-offer typically
              recovers more than <span className="font-semibold text-ink-800">44x</span> our
              fee. You pay $79 once &mdash; and keep every dollar of the increase.
            </p>

            <div className="mt-10 p-5 bg-paper-cream rounded-xl border border-slate-100">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex-1 min-w-[140px]">
                  <p className="text-caption text-slate-400 uppercase tracking-wider">Offer</p>
                  <p className="text-heading font-serif font-bold text-slate-400 line-through decoration-danger-500 decoration-2">$4,200</p>
                </div>
                <div className="flex-1 min-w-[140px]">
                  <p className="text-caption text-slate-400 uppercase tracking-wider">Fair value</p>
                  <p className="text-heading font-serif font-bold text-ink-800">$9,981</p>
                </div>
                <div className="flex-1 min-w-[140px]">
                  <p className="text-caption text-slate-400 uppercase tracking-wider">Your gain</p>
                  <p className="text-heading font-serif font-bold text-emerald-600">+$5,781</p>
                </div>
                <div className="flex-1 min-w-[140px]">
                  <p className="text-caption text-slate-400 uppercase tracking-wider">ROI</p>
                  <p className="text-heading font-serif font-bold text-ink-800">73x</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
