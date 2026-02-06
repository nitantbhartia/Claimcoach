import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* ---- HERO ---- */}
        <section className="py-20 sm:py-28">
          <div className="container-wide text-center">
            <h1 className="text-display-sm text-slate-900">Simple pricing</h1>
            <p className="mt-4 text-body-lg text-slate-500 max-w-lg mx-auto">
              Start free. Pay only when you need the full toolkit.
            </p>
          </div>
        </section>

        {/* ---- TIERS ---- */}
        <section className="pb-20 sm:pb-28">
          <div className="container-narrow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Free */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10">
                <h2 className="text-heading-lg text-slate-900">Free</h2>
                <p className="mt-1 text-display-sm text-slate-900">$0</p>
                <p className="mt-1 text-body-sm text-slate-500">
                  No credit card required
                </p>

                <div className="mt-8 space-y-3 text-body text-slate-500">
                  <p>&mdash; 1 active claim</p>
                  <p>&mdash; Upload your policy and offer</p>
                  <p>&mdash; Basic fairness score</p>
                  <p>&mdash; Coverage summary</p>
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
              <div className="rounded-2xl border border-brand-200 bg-brand-50 p-8 sm:p-10">
                <h2 className="text-heading-lg text-slate-900">Per Claim</h2>
                <p className="mt-1 text-display-sm text-slate-900">$29</p>
                <p className="mt-1 text-body-sm text-slate-500">
                  One-time, per claim
                </p>

                <div className="mt-8 space-y-3 text-body text-slate-500">
                  <p>&mdash; Everything in Free</p>
                  <p>&mdash; Full AI policy analysis</p>
                  <p>&mdash; Detailed fairness score with breakdown</p>
                  <p>&mdash; Professional counter-offer letter</p>
                  <p>&mdash; Adjuster call talking points</p>
                  <p>&mdash; Step-by-step escalation guidance</p>
                </div>

                <div className="mt-10">
                  <Link href="/signup">
                    <Button
                      size="md"
                      className="w-full bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-500"
                    >
                      Get Started
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <p className="mt-8 text-body-sm text-slate-400 text-center">
              Need unlimited claims?{" "}
              <Link
                href="/signup"
                className="text-brand-500 underline underline-offset-2 hover:text-brand-600"
              >
                Pro: $14.99/mo
              </Link>{" "}
              for families and landlords managing multiple claims.
            </p>
          </div>
        </section>

        <div className="divider" />

        {/* ---- ROI ---- */}
        <section className="section-gap">
          <div className="container-narrow">
            <h2 className="text-display text-slate-900">
              The math is simple.
            </h2>

            <div className="mt-12 flex flex-col sm:flex-row items-baseline gap-4 sm:gap-8">
              <div>
                <p className="text-display-xl text-slate-900">$29</p>
                <p className="text-body-sm text-slate-500 mt-1">
                  ClaimCoach fee
                </p>
              </div>

              <span
                className="hidden sm:block text-display text-slate-300 select-none"
                aria-hidden="true"
              >
                &rarr;
              </span>

              <div>
                <p className="text-display-xl text-brand-500">$2,100+</p>
                <p className="text-body-sm text-slate-500 mt-1">
                  Average additional recovery
                </p>
              </div>
            </div>

            <p className="mt-10 text-body-lg text-slate-600 max-w-xl leading-relaxed">
              The average auto property damage claim is underpaid by
              $1,500&ndash;$5,000. A single successful counter-offer typically
              recovers more than 70x our fee. You pay $29 once -- and keep every
              dollar of the increase.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
