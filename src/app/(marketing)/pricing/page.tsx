import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, X } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Explore the basics and see what ClaimCoach can do.",
    features: [
      { text: "1 active claim", included: true },
      { text: "Basic documentation checklists", included: true },
      { text: "General tips and guidance", included: true },
      { text: "Claim status tracking", included: true },
      { text: "Policy analysis", included: false },
      { text: "Fairness Score", included: false },
      { text: "Counter-offer generation", included: false },
      { text: "Negotiation talking points", included: false },
    ],
    cta: "Start Free",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Per Claim",
    price: "$29",
    period: "per claim",
    description: "Full toolkit for a single claim. Pay only when you need it.",
    badge: "Most Popular",
    features: [
      { text: "Everything in Free, plus:", included: true },
      { text: "Full AI policy analysis", included: true },
      { text: "Fairness Score (1-100)", included: true },
      { text: "Counter-offer letter generation", included: true },
      { text: "Negotiation talking points", included: true },
      { text: "Evidence package compilation", included: true },
      { text: "Escalation roadmap", included: true },
      { text: "Downloadable PDF documents", included: true },
    ],
    cta: "Get Started",
    href: "/signup",
    highlighted: true,
  },
  {
    name: "Pro Monthly",
    price: "$14.99",
    period: "per month",
    description: "For landlords, families, and anyone managing multiple claims.",
    features: [
      { text: "Everything in Per Claim, plus:", included: true },
      { text: "Unlimited claims", included: true },
      { text: "Family coverage (up to 5 members)", included: true },
      { text: "Priority AI analysis", included: true },
      { text: "Claim history and analytics", included: true },
      { text: "Proactive policy review", included: true },
      { text: "Multi-property management", included: true },
      { text: "Email support", included: true },
    ],
    cta: "Subscribe",
    href: "/signup",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero */}
        <section className="py-16 sm:py-24 bg-gray-50">
          <div className="container-wide text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start free. Pay only when you need the full toolkit. The average user recovers
              thousands more than our fee.
            </p>
          </div>
        </section>

        {/* Plans */}
        <section className="py-16 -mt-8">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={
                    plan.highlighted
                      ? "border-2 border-brand-600 shadow-lg relative"
                      : "relative"
                  }
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="info" size="md">
                        {plan.badge}
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      {plan.period && (
                        <span className="text-sm text-gray-500 ml-1">/{plan.period}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature.text} className="flex items-start gap-2">
                          {feature.included ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                          )}
                          <span
                            className={
                              feature.included ? "text-sm text-gray-700" : "text-sm text-gray-400"
                            }
                          >
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link href={plan.href} className="w-full">
                      <Button
                        variant={plan.highlighted ? "primary" : "outline"}
                        className="w-full"
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ-like section */}
        <section className="py-16 bg-gray-50">
          <div className="container-narrow text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              The math speaks for itself
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-8">
              The average auto property damage claim is underpaid by $1,500-$5,000. Our $29
              per-claim fee pays for itself many times over with a successful counter-offer.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="p-6 bg-white rounded-xl border border-gray-200">
                <p className="text-3xl font-bold text-brand-600">$29</p>
                <p className="text-sm text-gray-600 mt-1">ClaimCoach fee</p>
              </div>
              <div className="p-6 bg-white rounded-xl border border-gray-200">
                <p className="text-3xl font-bold text-green-600">$2,100+</p>
                <p className="text-sm text-gray-600 mt-1">Average additional recovery</p>
              </div>
              <div className="p-6 bg-white rounded-xl border border-gray-200">
                <p className="text-3xl font-bold text-brand-600">72x</p>
                <p className="text-sm text-gray-600 mt-1">Return on investment</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
