import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  FileText,
  BarChart3,
  MessageSquareText,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Scale,
  Upload,
  Search,
  Zap,
  Car,
  Home,
  Heart,
  Building2,
  ChevronRight,
  Clock,
  Lock,
  Star,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* ------------------------------------------------------------------ */}
        {/* HERO                                                               */}
        {/* ------------------------------------------------------------------ */}
        <section className="relative overflow-hidden gradient-hero text-white">
          {/* Decorative background grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="container-wide relative py-20 sm:py-28 lg:py-36">
            <div className="max-w-3xl">
              <Badge variant="info" size="md" className="mb-6">
                <Car className="w-3.5 h-3.5 mr-1.5" />
                Now available for auto property damage claims
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance leading-[1.1]">
                Get the Settlement{" "}
                <span className="text-brand-300">You Deserve</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-brand-100 max-w-2xl leading-relaxed">
                Insurance companies have teams of adjusters working to minimize
                your payout. ClaimCoach gives you AI-powered analysis, fairness
                scoring, and professional counter-offer letters -- so you can
                negotiate from a position of strength.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/claims/new">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white text-brand-700 hover:bg-brand-50 focus:ring-white"
                  >
                    Analyze My Claim Free
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10"
                  >
                    See How It Works
                  </Button>
                </Link>
              </div>

              <p className="mt-5 text-sm text-brand-200 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                No credit card required &middot; Your data stays private
              </p>
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* STATS BAR                                                          */}
        {/* ------------------------------------------------------------------ */}
        <section className="relative -mt-12 z-10">
          <div className="container-wide">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
              <div className="px-8 py-8 text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-brand-700">
                  $2B+
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  In underpaid auto claims annually
                </p>
              </div>
              <div className="px-8 py-8 text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-brand-700">
                  40&ndash;50%
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Appeal success rate when policyholders push back
                </p>
              </div>
              <div className="px-8 py-8 text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-brand-700">
                  &lt;1%
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Of denied claims are ever formally appealed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* PROBLEM STATEMENT / SOCIAL PROOF                                   */}
        {/* ------------------------------------------------------------------ */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-balance">
                Insurance companies aren&apos;t on your side.{" "}
                <span className="text-brand-600">Now you have backup.</span>
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Most people accept the first offer their insurer makes -- even
                when it&apos;s far below what their policy covers. They
                don&apos;t know what their policy actually says, they don&apos;t
                know what a fair settlement looks like, and they don&apos;t know
                how to push back professionally.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                ClaimCoach changes that. In minutes, not weeks.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: AlertTriangle,
                  color: "text-warning-500",
                  bg: "bg-warning-50",
                  title: "Lowball Offers Are the Norm",
                  description:
                    "Insurers routinely make initial offers 20-40% below fair value. Most policyholders don't realize they're being shortchanged.",
                },
                {
                  icon: Scale,
                  color: "text-brand-600",
                  bg: "bg-brand-50",
                  title: "The Knowledge Gap Is Real",
                  description:
                    "Insurance policies are dense and deliberately confusing. Without expertise, you can't know what you're actually owed.",
                },
                {
                  icon: TrendingUp,
                  color: "text-success-500",
                  bg: "bg-success-50",
                  title: "Pushing Back Works",
                  description:
                    "Studies show that policyholders who negotiate with data and documentation receive significantly higher settlements.",
                },
              ].map((item) => (
                <Card key={item.title} hover>
                  <CardContent className="pt-6">
                    <div
                      className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-4`}
                    >
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* HOW IT WORKS                                                       */}
        {/* ------------------------------------------------------------------ */}
        <section className="py-20 sm:py-28 bg-gray-50">
          <div className="container-wide">
            <div className="text-center max-w-2xl mx-auto">
              <Badge variant="info" size="md" className="mb-4">
                Simple 3-step process
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                How ClaimCoach Works
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                From documentation to negotiation in minutes -- not weeks of
                back-and-forth with your insurer.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  step: "01",
                  icon: Upload,
                  title: "Document",
                  description:
                    "Upload your insurance policy, the offer you received, and any supporting documents like repair estimates or photos. We'll organize everything for you.",
                },
                {
                  step: "02",
                  icon: Search,
                  title: "Analyze",
                  description:
                    "Our AI reads your policy, identifies relevant coverages, and scores the fairness of your insurer's offer against comparable claims data and policy terms.",
                },
                {
                  step: "03",
                  icon: MessageSquareText,
                  title: "Negotiate",
                  description:
                    "Get a professional counter-offer letter, talking points for your adjuster call, and step-by-step escalation guidance if they don't budge.",
                },
              ].map((item, index) => (
                <div key={item.step} className="relative">
                  {/* Connector line (desktop only) */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-12 -right-4 lg:-right-6 w-8 lg:w-12 border-t-2 border-dashed border-brand-200" />
                  )}

                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                          {item.step}
                        </div>
                        <item.icon className="w-6 h-6 text-brand-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/claims/new">
                <Button size="lg">
                  Start Your Free Analysis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* FEATURES                                                           */}
        {/* ------------------------------------------------------------------ */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="container-wide">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Everything You Need to Fight Back
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Powerful tools that level the playing field between you and your
                insurance company.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: FileText,
                  title: "Policy Analysis",
                  description:
                    "Our AI reads your entire insurance policy and surfaces the specific clauses, coverages, and limits relevant to your claim. No more guessing what you're owed.",
                  highlights: [
                    "Coverage identification",
                    "Limit & deductible extraction",
                    "Exclusion flagging",
                  ],
                },
                {
                  icon: BarChart3,
                  title: "Fairness Score",
                  description:
                    "Get a clear, data-backed score that tells you whether your insurer's offer is fair, low, or way below what you should accept. Understand exactly where you stand.",
                  highlights: [
                    "Comparable claims benchmarking",
                    "Line-item breakdown",
                    "Confidence rating",
                  ],
                },
                {
                  icon: MessageSquareText,
                  title: "Counter-Offer Generator",
                  description:
                    "Generate a professional, policy-referenced counter-offer letter ready to send to your adjuster. Written in the language insurers respect and respond to.",
                  highlights: [
                    "Policy-backed arguments",
                    "Professional tone & format",
                    "Ready to send",
                  ],
                },
                {
                  icon: Zap,
                  title: "Escalation Guidance",
                  description:
                    "If your insurer won't budge, we walk you through next steps: supervisor escalation, state insurance department complaints, and when to consider an attorney.",
                  highlights: [
                    "Step-by-step playbook",
                    "State-specific resources",
                    "Attorney referral triggers",
                  ],
                },
              ].map((feature) => (
                <Card key={feature.title} hover className="overflow-hidden">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-5">
                      <feature.icon className="w-6 h-6 text-brand-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {feature.highlights.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-success-500 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* CLAIM TYPES                                                        */}
        {/* ------------------------------------------------------------------ */}
        <section className="py-20 sm:py-28 bg-gray-50">
          <div className="container-wide">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Claim Types
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                We&apos;re starting with the most common dispute -- auto
                property damage -- and expanding from there.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Car,
                  title: "Auto Property Damage",
                  status: "available" as const,
                  description:
                    "Collision, comprehensive, and total loss claims. Get fair value for your vehicle.",
                },
                {
                  icon: Home,
                  title: "Homeowner",
                  status: "coming_soon" as const,
                  description:
                    "Storm, fire, water damage, and other covered property losses.",
                },
                {
                  icon: Heart,
                  title: "Health",
                  status: "coming_soon" as const,
                  description:
                    "Medical claim denials, out-of-network disputes, and billing errors.",
                },
                {
                  icon: Building2,
                  title: "Renter's",
                  status: "coming_soon" as const,
                  description:
                    "Personal property theft, liability, and additional living expense claims.",
                },
              ].map((type) => (
                <Card
                  key={type.title}
                  hover={type.status === "available"}
                  className={
                    type.status === "coming_soon" ? "opacity-75" : undefined
                  }
                >
                  <CardContent className="pt-6 text-center">
                    <div
                      className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
                        type.status === "available"
                          ? "bg-brand-50"
                          : "bg-gray-100"
                      }`}
                    >
                      <type.icon
                        className={`w-7 h-7 ${
                          type.status === "available"
                            ? "text-brand-600"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      {type.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                      {type.description}
                    </p>
                    <div className="mt-4">
                      {type.status === "available" ? (
                        <Badge variant="success" size="sm">
                          Available Now
                        </Badge>
                      ) : (
                        <Badge variant="default" size="sm">
                          <Clock className="w-3 h-3 mr-1" />
                          Coming Soon
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* PRICING PREVIEW                                                    */}
        {/* ------------------------------------------------------------------ */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="container-wide">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Simple, Transparent Pricing
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Start for free. Pay only when you&apos;re ready to generate your
                counter-offer.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free tier */}
              <Card className="relative">
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold text-gray-900">Free</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    See where you stand
                  </p>
                  <p className="mt-6">
                    <span className="text-4xl font-extrabold text-gray-900">
                      $0
                    </span>
                  </p>
                  <ul className="mt-8 space-y-3">
                    {[
                      "Upload policy & offer",
                      "Basic fairness score",
                      "Coverage summary",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-success-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link href="/signup">
                      <Button variant="outline" className="w-full">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Pro tier */}
              <Card className="relative border-brand-600 border-2 shadow-lg">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge
                    variant="info"
                    size="md"
                    className="bg-brand-600 text-white shadow-md"
                  >
                    <Star className="w-3.5 h-3.5 mr-1" />
                    Most Popular
                  </Badge>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Claim Pro
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Full negotiation toolkit
                  </p>
                  <p className="mt-6">
                    <span className="text-4xl font-extrabold text-gray-900">
                      $29
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      / claim
                    </span>
                  </p>
                  <ul className="mt-8 space-y-3">
                    {[
                      "Everything in Free",
                      "Detailed fairness analysis",
                      "Counter-offer letter",
                      "Adjuster talking points",
                      "Escalation guidance",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-success-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link href="/signup">
                      <Button className="w-full">
                        Start Free, Upgrade Later
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Enterprise / Attorney tier */}
              <Card className="relative">
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Attorney
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    For legal professionals
                  </p>
                  <p className="mt-6">
                    <span className="text-4xl font-extrabold text-gray-900">
                      $99
                    </span>
                    <span className="text-sm text-gray-500 ml-1">/ mo</span>
                  </p>
                  <ul className="mt-8 space-y-3">
                    {[
                      "Everything in Claim Pro",
                      "Unlimited claims",
                      "Batch analysis",
                      "Priority support",
                      "Custom branding",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-success-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link href="/signup">
                      <Button variant="outline" className="w-full">
                        Contact Us
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            <p className="mt-8 text-center text-sm text-gray-500">
              All plans include a 30-day money-back guarantee. No subscriptions
              required for individual claims.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* TRUST / COMPLIANCE BAR                                             */}
        {/* ------------------------------------------------------------------ */}
        <section className="py-12 bg-gray-50 border-y border-gray-100">
          <div className="container-wide">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-brand-600" />
                <span>256-bit encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-brand-600" />
                <span>SOC 2 compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600" />
                <span>No data sold to third parties</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-600" />
                <span>Not legal advice</span>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* FINAL CTA                                                          */}
        {/* ------------------------------------------------------------------ */}
        <section className="relative overflow-hidden gradient-hero text-white">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="container-wide relative py-20 sm:py-28 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance">
              Stop Leaving Money on the Table
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-brand-100 max-w-2xl mx-auto leading-relaxed">
              Your insurance company has a team. Now you do too. Upload your
              claim and find out in minutes whether you&apos;re getting a fair
              deal.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/claims/new">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-brand-700 hover:bg-brand-50 focus:ring-white"
                >
                  Analyze My Claim Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10"
                >
                  View Pricing
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-sm text-brand-200">
              Free to start &middot; No credit card required &middot; Results in
              under 5 minutes
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
