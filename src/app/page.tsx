import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Shield,
  BarChart3,
  FileText,
  Phone,
  Scale,
  Upload,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  DollarSign,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* ---- HERO ---- */}
        <section className="bg-white">
          <div className="container-wide py-16 sm:py-24 lg:py-40">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h1 className="text-display sm:text-display-xl text-balance text-slate-900">
                  Stop leaving <span className="text-brand-600">money</span>
                  <br />
                  on the table.
                </h1>

                <p className="mt-6 text-body-lg text-slate-500 max-w-xl">
                  Insurance adjusters are trained negotiators. You&apos;re not.
                  ClaimCoach gives you the analysis, leverage, and language to
                  fight back &mdash; in minutes.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Link href="/claims/new">
                    <Button
                      size="lg"
                      className="bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-500"
                    >
                      See what you&apos;re owed &mdash; free
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button size="lg" variant="outline">
                      See how it works
                    </Button>
                  </Link>
                </div>

                <p className="mt-8 text-body-sm text-slate-400">
                  Free to start. No credit card required.
                </p>
              </div>

              {/* Hero illustration: mock UI preview */}
              <div className="hidden lg:block">
                <div className="relative">
                  {/* Main card */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center">
                        <Scale className="w-5 h-5 text-brand-600" />
                      </div>
                      <div>
                        <p className="text-body-sm font-medium text-slate-900">Fairness Score</p>
                        <p className="text-caption text-slate-500">2022 Honda Civic EX</p>
                      </div>
                    </div>
                    {/* Score bar */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-display-sm font-semibold text-danger-600">38/100</span>
                        <span className="text-caption text-danger-600 font-medium px-2 py-0.5 rounded-full bg-danger-50">Below fair value</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3">
                        <div className="h-3 rounded-full bg-gradient-to-r from-danger-500 to-orange-400" style={{ width: "38%" }} />
                      </div>
                    </div>
                    {/* Gap summary */}
                    <div className="grid grid-cols-3 gap-4 pt-2">
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <p className="text-caption text-slate-500">Their offer</p>
                        <p className="text-heading font-semibold text-slate-900">$4,200</p>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <p className="text-caption text-slate-500">Fair value</p>
                        <p className="text-heading font-semibold text-slate-900">$9,981</p>
                      </div>
                      <div className="text-center p-3 bg-danger-50 rounded-lg">
                        <p className="text-caption text-slate-500">Gap</p>
                        <p className="text-heading font-semibold text-danger-600">$5,781</p>
                      </div>
                    </div>
                  </div>

                  {/* Floating badge top-right */}
                  <div className="absolute -top-4 -right-4 bg-white rounded-xl border border-slate-200 shadow-lg px-4 py-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-success-50 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-success-600" />
                    </div>
                    <div>
                      <p className="text-caption font-medium text-success-600">+$5,781</p>
                      <p className="text-caption text-slate-400">recoverable</p>
                    </div>
                  </div>

                  {/* Floating badge bottom-left */}
                  <div className="absolute -bottom-3 -left-3 bg-white rounded-xl border border-slate-200 shadow-lg px-4 py-2.5 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-500" />
                    <p className="text-caption font-medium text-slate-700">AI-powered analysis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- SOCIAL PROOF STRIP ---- */}
        <section className="border-y border-slate-100 bg-slate-50/50">
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

        {/* ---- THE PROBLEM (visual comparison) ---- */}
        <section className="section-gap">
          <div className="container-wide">
            <h2 className="text-display-sm sm:text-display text-slate-900 max-w-2xl">
              The deck is stacked against you.
            </h2>

            <p className="mt-6 text-body-lg text-slate-600 max-w-2xl leading-relaxed">
              Your insurance adjuster handles 500+ claims a year. You handle
              one, maybe two in your lifetime. That information asymmetry is by design.
            </p>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Without ClaimCoach */}
              <div className="rounded-2xl border border-slate-200 p-6 sm:p-8 bg-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-slate-400" />
                  </div>
                  <p className="text-caption uppercase tracking-widest text-slate-400 font-semibold">
                    Without ClaimCoach
                  </p>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-body text-slate-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0" />
                    You read a 40-page policy and miss the clause that covers your loss.
                  </li>
                  <li className="flex items-start gap-3 text-body text-slate-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0" />
                    You accept the first offer because you don&apos;t know what &quot;fair&quot; looks like.
                  </li>
                  <li className="flex items-start gap-3 text-body text-slate-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0" />
                    You call your adjuster, get flustered, and agree to less than you&apos;re owed.
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-danger-400" />
                    <p className="text-body-sm text-danger-600 font-medium">Average loss: $3,000&ndash;$5,000</p>
                  </div>
                </div>
              </div>

              {/* With ClaimCoach */}
              <div className="rounded-2xl border-2 border-brand-200 p-6 sm:p-8 bg-brand-50/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-brand-600" />
                  </div>
                  <p className="text-caption uppercase tracking-widest text-brand-500 font-semibold">
                    With ClaimCoach
                  </p>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-body text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    AI reads your policy and surfaces the exact coverages, limits, and exclusions that matter.
                  </li>
                  <li className="flex items-start gap-3 text-body text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    A fairness score tells you whether the offer is reasonable &mdash; or $3,000 below market.
                  </li>
                  <li className="flex items-start gap-3 text-body text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    You get a professional counter-offer letter and talking points before you pick up the phone.
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-brand-100">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-success-500" />
                    <p className="text-body-sm text-success-600 font-medium">Average recovery: 70&ndash;85% of demand</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ---- HOW IT WORKS ---- */}
        <section id="how-it-works" className="section-gap">
          <div className="container-wide">
            <h2 className="text-display-sm sm:text-display text-slate-900 max-w-xl">
              How it works
            </h2>
            <p className="mt-4 text-body-lg text-slate-500 max-w-xl">
              From upload to counter-offer in under ten minutes.
            </p>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative group">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 hover:shadow-card transition-shadow h-full">
                  <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mb-5">
                    <Upload className="w-7 h-7 text-brand-500" />
                  </div>
                  <div className="text-caption font-semibold text-brand-500 mb-2">Step 1</div>
                  <h3 className="text-heading-lg text-slate-900">
                    Upload your documents
                  </h3>
                  <p className="mt-3 text-body text-slate-600 leading-relaxed">
                    Drop in your insurance policy, the settlement offer, and
                    any supporting evidence. We handle the rest.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="text-caption text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full">PDF support</span>
                    <span className="text-caption text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full">Photo upload</span>
                    <span className="text-caption text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full">VIN decode</span>
                  </div>
                </div>
                {/* Connector arrow (hidden on mobile) */}
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-slate-200" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 hover:shadow-card transition-shadow h-full">
                  <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mb-5">
                    <BarChart3 className="w-7 h-7 text-brand-500" />
                  </div>
                  <div className="text-caption font-semibold text-brand-500 mb-2">Step 2</div>
                  <h3 className="text-heading-lg text-slate-900">
                    Get your analysis
                  </h3>
                  <p className="mt-3 text-body text-slate-600 leading-relaxed">
                    Our AI reads your entire policy, scores the fairness of the offer,
                    and identifies every dollar you&apos;re missing.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="text-caption text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full">Fairness score</span>
                    <span className="text-caption text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full">Gap analysis</span>
                    <span className="text-caption text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full">Market data</span>
                  </div>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-slate-200" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="group">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 hover:shadow-card transition-shadow h-full">
                  <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mb-5">
                    <FileText className="w-7 h-7 text-brand-500" />
                  </div>
                  <div className="text-caption font-semibold text-brand-500 mb-2">Step 3</div>
                  <h3 className="text-heading-lg text-slate-900">
                    Negotiate with confidence
                  </h3>
                  <p className="mt-3 text-body text-slate-600 leading-relaxed">
                    Receive a professional counter-offer letter, adjuster call
                    script, and step-by-step escalation playbook.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="text-caption text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full">Demand letter</span>
                    <span className="text-caption text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full">Call script</span>
                    <span className="text-caption text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full">Escalation plan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ---- THE TOOLKIT (feature cards) ---- */}
        <section className="section-gap">
          <div className="container-wide">
            <h2 className="text-display-sm sm:text-display text-slate-900 max-w-xl">
              Everything you need to fight back.
            </h2>
            <p className="mt-4 text-body-lg text-slate-500 max-w-lg">
              Six AI-powered tools designed to level the playing field.
            </p>

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-card transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-heading text-slate-900">Policy Analysis</h3>
                <p className="mt-2 text-body-sm text-slate-500 leading-relaxed">
                  AI reads your entire policy and surfaces coverages, limits,
                  hidden benefits, and red-flag provisions.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-card transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-heading text-slate-900">Fairness Score</h3>
                <p className="mt-2 text-body-sm text-slate-500 leading-relaxed">
                  Data-backed score showing whether the insurer&apos;s offer is
                  fair, low, or significantly below market value.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-card transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-heading text-slate-900">Counter-Offer Letter</h3>
                <p className="mt-2 text-body-sm text-slate-500 leading-relaxed">
                  Professional demand letter with itemized damages, market
                  comparables, and policy references. Ready to send.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-card transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-heading text-slate-900">Call Script</h3>
                <p className="mt-2 text-body-sm text-slate-500 leading-relaxed">
                  Step-by-step phone script with talking points, objection
                  handlers, and behavioral tips for adjuster calls.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-card transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center mb-4">
                  <Scale className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="text-heading text-slate-900">State Legal Guide</h3>
                <p className="mt-2 text-body-sm text-slate-500 leading-relaxed">
                  Your state&apos;s insurance laws, filing deadlines, consumer
                  rights, and Department of Insurance complaint process.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-card transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-heading text-slate-900">Smart Autofill</h3>
                <p className="mt-2 text-body-sm text-slate-500 leading-relaxed">
                  Snap a photo of your insurance card, VIN, or offer letter and
                  AI extracts all the details automatically.
                </p>
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
              <div className="rounded-2xl border border-slate-200 p-8 bg-white">
                <h3 className="text-heading-lg text-slate-900">Free</h3>
                <p className="mt-1 text-body-sm text-slate-500">
                  See where you stand
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2.5 text-body text-slate-600">
                    <CheckCircle2 className="w-4.5 h-4.5 text-slate-400 flex-shrink-0" />
                    Upload your policy and offer documents
                  </div>
                  <div className="flex items-center gap-2.5 text-body text-slate-600">
                    <CheckCircle2 className="w-4.5 h-4.5 text-slate-400 flex-shrink-0" />
                    Basic fairness score
                  </div>
                  <div className="flex items-center gap-2.5 text-body text-slate-600">
                    <CheckCircle2 className="w-4.5 h-4.5 text-slate-400 flex-shrink-0" />
                    Coverage summary
                  </div>
                </div>
                <div className="mt-8">
                  <Link href="/signup">
                    <Button variant="outline" size="md" className="w-full">
                      Get started
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Paid */}
              <div className="rounded-2xl border-2 border-brand-300 p-8 bg-brand-50/30 relative">
                <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-brand-500 text-white text-caption font-medium">
                  Most popular
                </div>
                <h3 className="text-heading-lg text-slate-900">
                  Full Toolkit
                </h3>
                <p className="mt-1 text-body-sm text-slate-500">
                  $29 per claim
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2.5 text-body text-slate-600">
                    <CheckCircle2 className="w-4.5 h-4.5 text-brand-500 flex-shrink-0" />
                    Everything in Free
                  </div>
                  <div className="flex items-center gap-2.5 text-body text-slate-600">
                    <CheckCircle2 className="w-4.5 h-4.5 text-brand-500 flex-shrink-0" />
                    Detailed line-item fairness analysis
                  </div>
                  <div className="flex items-center gap-2.5 text-body text-slate-600">
                    <CheckCircle2 className="w-4.5 h-4.5 text-brand-500 flex-shrink-0" />
                    Professional counter-offer letter
                  </div>
                  <div className="flex items-center gap-2.5 text-body text-slate-600">
                    <CheckCircle2 className="w-4.5 h-4.5 text-brand-500 flex-shrink-0" />
                    Adjuster call script &amp; talking points
                  </div>
                  <div className="flex items-center gap-2.5 text-body text-slate-600">
                    <CheckCircle2 className="w-4.5 h-4.5 text-brand-500 flex-shrink-0" />
                    Step-by-step escalation guidance
                  </div>
                </div>
                <div className="mt-8">
                  <Link href="/signup">
                    <Button size="md" className="w-full">
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
            <p className="mt-4 text-body-lg text-slate-500 max-w-lg mx-auto">
              Join thousands of policyholders who stopped accepting lowball
              offers and started getting what they&apos;re owed.
            </p>

            <div className="mt-10">
              <Link href="/claims/new">
                <Button
                  size="lg"
                  className="bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-500"
                >
                  Find out what you&apos;re owed
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-body-sm text-slate-500">
              100% free. No credit card. Your results in under five
              minutes.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
