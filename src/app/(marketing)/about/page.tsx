import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import {
  Camera,
  FileSearch,
  Scale,
  ArrowRight,
  Shield,
  Clock,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  FileText,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Document Everything",
    description:
      "Our guided documentation engine walks you through capturing every piece of evidence you need. Context-aware checklists tell you exactly what photos to take, what information to gather, and what records to request.",
    icon: Camera,
    features: [
      "12+ guided vehicle photos with angle instructions",
      "Accident scene documentation checklist",
      "Financial impact tracker for all expenses",
      "Pre-loss condition evidence gathering",
    ],
  },
  {
    number: "02",
    title: "AI Analyzes Your Claim",
    description:
      "Upload your insurance policy and our AI reads every page, translating dense legal language into plain English. It finds hidden coverages you didn't know you had and predicts the tactics your adjuster will use.",
    icon: FileSearch,
    features: [
      "Plain-English policy translation",
      "Hidden coverage discovery",
      "Red flag identification",
      "Adjuster tactic prediction",
    ],
  },
  {
    number: "03",
    title: "Get Your Fair Settlement",
    description:
      "When you receive an offer, our Fairness Score instantly tells you if it's reasonable. If it's not, we generate a professional counter-offer package with demand letters, talking points, and an escalation roadmap.",
    icon: Scale,
    features: [
      "Fairness Score (1-100) with detailed breakdown",
      "Professional demand letter generation",
      "Phone negotiation scripts",
      "Step-by-step escalation guidance",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero */}
        <section className="py-16 sm:py-24 gradient-hero text-white">
          <div className="container-wide text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              How ClaimCoach Works
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Three steps from unfair offer to fair settlement. Our AI does the heavy
              lifting so you don&apos;t have to become an insurance expert overnight.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 sm:py-24">
          <div className="container-wide">
            <div className="space-y-24">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.number}
                    className={`flex flex-col ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                    } gap-12 items-center`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                          STEP {step.number}
                        </span>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">{step.title}</h2>
                      <p className="text-gray-600 text-lg mb-6">{step.description}</p>
                      <ul className="space-y-3">
                        {step.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="w-80 h-64 bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl flex items-center justify-center border border-brand-200">
                        <Icon className="w-24 h-24 text-brand-400" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="py-16 bg-gray-50">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why This Matters</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The insurance claims process is fundamentally stacked against consumers.
                Here&apos;s what you&apos;re up against.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: DollarSign,
                  stat: "$13,955",
                  label: "Average homeowner claim payout",
                  color: "text-brand-600",
                },
                {
                  icon: AlertTriangle,
                  stat: "1 in 5",
                  label: "In-network health claims denied",
                  color: "text-red-600",
                },
                {
                  icon: Clock,
                  stat: "<1%",
                  label: "Of denied claims are appealed",
                  color: "text-yellow-600",
                },
                {
                  icon: TrendingUp,
                  stat: "40-50%",
                  label: "Appeal success rate when filed",
                  color: "text-green-600",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                    <Icon className={`w-8 h-8 ${item.color} mx-auto mb-3`} />
                    <p className={`text-3xl font-bold ${item.color}`}>{item.stat}</p>
                    <p className="text-sm text-gray-600 mt-1">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-24 gradient-hero text-white">
          <div className="container-wide text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to fight for your fair settlement?
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Start your free claim analysis in under 2 minutes. No credit card required.
            </p>
            <Link href="/claims/new">
              <Button size="lg" className="bg-white text-brand-700 hover:bg-blue-50">
                Start My Free Claim
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
