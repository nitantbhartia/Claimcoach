import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* ---- HERO ---- */}
        <section className="bg-white">
          <div className="container-wide py-16 sm:py-24 lg:py-40">
            <h1 className="text-display sm:text-display-xl max-w-4xl text-balance text-slate-900">
              Stop leaving <span className="text-brand-600">money</span>
              <br />
              on the table.
            </h1>

            <p className="mt-6 text-body-lg text-slate-500 max-w-xl">
              Insurance adjusters are trained negotiators. You&apos;re not.
              ClaimCoach gives you the analysis, leverage, and language to
              fight back -- in minutes.
            </p>

            <div className="mt-10">
              <Link href="/claims/new">
                <Button
                  size="lg"
                  className="bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-500"
                >
                  Analyze my claim
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <p className="mt-16 text-body text-slate-500">
              Insurance companies underpay claims by an average of
              $3,000&ndash;$5,000. Most people never push back.
            </p>
          </div>
        </section>

        {/* ---- SOCIAL PROOF STRIP ---- */}
        <section className="border-b border-slate-100">
          <div className="container-wide py-8 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0">
            <div className="text-center sm:text-left flex-1">
              <p className="text-heading-lg sm:text-display-sm text-slate-900">850M+</p>
              <p className="text-body-sm text-slate-500 mt-1">
                claims denied yearly
              </p>
            </div>

            <div
              aria-hidden="true"
              className="hidden sm:block w-px h-12 bg-slate-200"
            />

            <div className="text-center flex-1">
              <p className="text-heading-lg sm:text-display-sm text-slate-900">&lt;&thinsp;1%</p>
              <p className="text-body-sm text-slate-500 mt-1">
                of those are ever appealed
              </p>
            </div>

            <div
              aria-hidden="true"
              className="hidden sm:block w-px h-12 bg-slate-200"
            />

            <div className="text-center sm:text-right flex-1">
              <p className="text-heading-lg sm:text-display-sm text-slate-900">40&ndash;50%</p>
              <p className="text-body-sm text-slate-500 mt-1">
                win rate when they do
              </p>
            </div>
          </div>
        </section>

        {/* ---- THE PROBLEM ---- */}
        <section className="section-gap">
          <div className="container-wide">
            <h2 className="text-display-sm sm:text-display text-slate-900 max-w-2xl">
              The deck is stacked against you.
            </h2>

            <p className="mt-6 text-body-lg text-slate-600 max-w-2xl leading-relaxed">
              Your insurance adjuster handles 500+ claims a year. You handle
              one, maybe two in your lifetime. They know exactly which
              clauses to cite, which precedents to reference, and which
              lowball number most people will accept without question.
              That information asymmetry is by design.
            </p>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              {/* Left: The problem */}
              <div>
                <p className="text-caption uppercase tracking-widest text-slate-400 mb-4">
                  Without ClaimCoach
                </p>
                <ul className="space-y-4 text-body text-slate-600">
                  <li className="pl-4 border-l-2 border-slate-200">
                    You read a 40-page policy and miss the clause that
                    covers your loss.
                  </li>
                  <li className="pl-4 border-l-2 border-slate-200">
                    You accept the first offer because you don&apos;t know
                    what &quot;fair&quot; looks like.
                  </li>
                  <li className="pl-4 border-l-2 border-slate-200">
                    You call your adjuster, get flustered, and agree to
                    less than you&apos;re owed.
                  </li>
                </ul>
              </div>

              {/* Right: The solution */}
              <div>
                <p className="text-caption uppercase tracking-widest text-brand-500 mb-4">
                  With ClaimCoach
                </p>
                <ul className="space-y-4 text-body text-slate-600">
                  <li className="pl-4 border-l-2 border-brand-500">
                    AI reads your policy and surfaces the exact coverages,
                    limits, and exclusions that matter.
                  </li>
                  <li className="pl-4 border-l-2 border-brand-500">
                    A fairness score tells you whether the offer is
                    reasonable -- or $3,000 below market.
                  </li>
                  <li className="pl-4 border-l-2 border-brand-500">
                    You get a professional counter-offer letter and
                    talking points before you pick up the phone.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ---- HOW IT WORKS ---- */}
        <section className="section-gap">
          <div className="container-wide">
            <h2 className="text-display-sm sm:text-display text-slate-900 max-w-xl">
              How it works
            </h2>
            <p className="mt-4 text-body-lg text-slate-500 max-w-xl">
              From upload to counter-offer in under ten minutes.
            </p>

            <div className="mt-16 space-y-16 max-w-2xl">
              {/* Step 01 */}
              <div>
                <span className="text-display sm:text-display-xl text-slate-100 select-none" aria-hidden="true">
                  01
                </span>
                <h3 className="text-heading-lg text-slate-900 -mt-4">
                  Upload your documents
                </h3>
                <p className="mt-3 text-body text-slate-600">
                  Drop in your insurance policy, the settlement offer, and
                  any supporting evidence -- repair estimates, photos,
                  medical bills. We handle the rest.
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-body-sm text-slate-400">
                  <li>PDF &amp; image support</li>
                  <li>Auto-categorization</li>
                  <li>Secure upload</li>
                </ul>
              </div>

              {/* Step 02 */}
              <div>
                <span className="text-display sm:text-display-xl text-slate-100 select-none" aria-hidden="true">
                  02
                </span>
                <h3 className="text-heading-lg text-slate-900 -mt-4">
                  Get your analysis
                </h3>
                <p className="mt-3 text-body text-slate-600">
                  Our AI reads your entire policy, identifies relevant
                  coverages, and scores the fairness of your insurer&apos;s
                  offer against comparable claims and policy terms.
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-body-sm text-slate-400">
                  <li>Coverage extraction</li>
                  <li>Fairness scoring</li>
                  <li>Gap identification</li>
                </ul>
              </div>

              {/* Step 03 */}
              <div>
                <span className="text-display sm:text-display-xl text-slate-100 select-none" aria-hidden="true">
                  03
                </span>
                <h3 className="text-heading-lg text-slate-900 -mt-4">
                  Negotiate with confidence
                </h3>
                <p className="mt-3 text-body text-slate-600">
                  Receive a professional counter-offer letter, adjuster
                  call talking points, and a step-by-step escalation
                  playbook if they don&apos;t budge.
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-body-sm text-slate-400">
                  <li>Counter-offer letter</li>
                  <li>Talking points</li>
                  <li>Escalation guide</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ---- THE TOOLKIT ---- */}
        <section className="section-gap">
          <div className="container-wide">
            <h2 className="text-display-sm sm:text-display text-slate-900 max-w-xl">
              Everything you need to fight back.
            </h2>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12">
              {/* Left: large feature */}
              <div className="md:col-span-3">
                <p className="text-caption uppercase tracking-widest text-brand-500 mb-3">
                  Core
                </p>
                <h3 className="text-heading-lg text-slate-900">
                  Policy Analysis
                </h3>
                <p className="mt-3 text-body text-slate-600 max-w-md leading-relaxed">
                  Our AI reads your entire insurance policy and surfaces
                  the specific clauses, coverages, limits, and exclusions
                  relevant to your claim. No more guessing what
                  you&apos;re owed -- every argument is backed by your own
                  policy language.
                </p>
              </div>

              {/* Right: stacked smaller features */}
              <div className="md:col-span-2 space-y-10">
                <div>
                  <h3 className="text-heading text-slate-900">
                    Fairness Score
                  </h3>
                  <p className="mt-2 text-body-sm text-slate-500 leading-relaxed">
                    A clear, data-backed score that tells you whether your
                    insurer&apos;s offer is fair, low, or significantly
                    below market value. Know exactly where you stand.
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-10">
                  <h3 className="text-heading text-slate-900">
                    Counter-Offers
                  </h3>
                  <p className="mt-2 text-body-sm text-slate-500 leading-relaxed">
                    Professional, policy-referenced counter-offer letters
                    written in the language insurers respect. Ready to
                    send.
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-10">
                  <h3 className="text-heading text-slate-900">
                    Escalation Guide
                  </h3>
                  <p className="mt-2 text-body-sm text-slate-500 leading-relaxed">
                    Step-by-step playbook: supervisor escalation, state
                    insurance department complaints, and when to consider
                    an attorney.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ---- PRICING ---- */}
        <section className="section-gap">
          <div className="container-wide">
            <h2 className="text-display-sm sm:text-display text-slate-900 max-w-md">
              Simple pricing.
            </h2>
            <p className="mt-4 text-body-lg text-slate-500 max-w-lg">
              Start free. Pay only when you need the full toolkit.
            </p>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
              {/* Free */}
              <div className="py-8">
                <h3 className="text-heading-lg text-slate-900">Free</h3>
                <p className="mt-1 text-body-sm text-slate-500">
                  See where you stand
                </p>
                <div className="mt-6 space-y-2 text-body text-slate-600">
                  <p>Upload your policy and offer documents</p>
                  <p>Basic fairness score</p>
                  <p>Coverage summary</p>
                </div>
                <div className="mt-8">
                  <Link href="/signup">
                    <Button variant="outline" size="md">
                      Get started
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Paid */}
              <div className="py-8 px-8 bg-brand-50 rounded-2xl">
                <h3 className="text-heading-lg text-slate-900">
                  Full Toolkit
                </h3>
                <p className="mt-1 text-body-sm text-slate-500">
                  $29 per claim
                </p>
                <div className="mt-6 space-y-2 text-body text-slate-600">
                  <p>Everything in Free</p>
                  <p>Detailed fairness analysis with line-item breakdown</p>
                  <p>Professional counter-offer letter</p>
                  <p>Adjuster call talking points</p>
                  <p>Step-by-step escalation guidance</p>
                </div>
                <div className="mt-8">
                  <Link href="/signup">
                    <Button size="md">
                      Start free, upgrade later
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <p className="mt-10 text-body-sm text-slate-400 max-w-lg">
              Pro plan: $14.99/mo for unlimited claims.
              All plans include a 30-day money-back guarantee.
            </p>
          </div>
        </section>

        {/* ---- FINAL CTA ---- */}
        <section className="bg-brand-50">
          <div className="container-wide py-16 sm:py-24 lg:py-32 text-center">
            <h2 className="text-display-sm sm:text-display text-slate-900 max-w-2xl mx-auto text-balance">
              Your claim deserves a fair evaluation.
            </h2>

            <div className="mt-10">
              <Link href="/claims/new">
                <Button
                  size="lg"
                  className="bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-500"
                >
                  Analyze my claim
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-body-sm text-slate-500">
              Free to start. No credit card required. Results in under five
              minutes.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
