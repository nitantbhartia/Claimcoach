import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Shield,
  FileText,
  Phone,
  Scale,
  Search,
  TrendingUp,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-panel">
      <Header />

      <main className="flex-1">
        {/* ---- HERO ---- */}
        <section className="relative overflow-hidden">
          <div className="relative container-wide py-20 sm:py-28">
            <p className="text-caption uppercase tracking-[0.2em] text-black/60 font-medium mb-4">
              How It Works
            </p>
            <h1 className="text-display-sm sm:text-display text-black max-w-3xl">
              Three steps from unfair offer to{" "}
              <span className="relative inline-block">
                fair settlement
                <span className="absolute -bottom-1 left-0 right-0 h-3 bg-coral/60 -z-10" />
              </span>
              .
            </h1>
            <p className="mt-6 text-body-lg text-[#4a555e] max-w-xl leading-relaxed">
              Our AI does the heavy lifting so you don&apos;t have to become an
              insurance expert overnight.
            </p>
          </div>
        </section>

        {/* ---- STEPS ---- */}
        <section className="section-gap border-t-[4px] border-black">
          <div className="container-wide max-w-4xl">
            {/* Step 01 */}
            <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6">
              <div>
                <span className="text-display-xl font-bold text-black/10 select-none" aria-hidden="true">
                  01
                </span>
              </div>
              <div>
                <div className="w-12 h-12 bg-coral/20 flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-black" />
                </div>
                <h2 className="text-heading-lg text-black">
                  Document everything
                </h2>
                <p className="mt-3 text-body text-[#4a555e] max-w-lg leading-relaxed">
                  Our guided documentation engine walks you through capturing
                  every piece of evidence you need. Context-aware checklists tell
                  you exactly what to photograph, what to gather, and what records
                  to request.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    "12+ guided vehicle photos",
                    "Accident scene checklist",
                    "Financial impact tracker",
                    "Pre-loss condition evidence",
                  ].map((tag) => (
                    <span key={tag} className="text-caption text-[#4a555e] bg-panel-alt px-2.5 py-1 border border-black/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t-[4px] border-black/10 my-14" />

            {/* Step 02 */}
            <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6">
              <div>
                <span className="text-display-xl font-bold text-black/10 select-none" aria-hidden="true">
                  02
                </span>
              </div>
              <div>
                <div className="w-12 h-12 bg-coral/20 flex items-center justify-center mb-4">
                  <Scale className="w-6 h-6 text-black" />
                </div>
                <h2 className="text-heading-lg text-black">
                  AI analyzes your claim
                </h2>
                <p className="mt-3 text-body text-[#4a555e] max-w-lg leading-relaxed">
                  Upload your insurance policy and our AI reads every page,
                  translating dense legal language into plain English. It finds
                  hidden coverages you didn&apos;t know you had and predicts the
                  tactics your adjuster will use.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    "Plain-English translation",
                    "Hidden coverage discovery",
                    "Red flag identification",
                    "Adjuster tactic prediction",
                  ].map((tag) => (
                    <span key={tag} className="text-caption text-[#4a555e] bg-panel-alt px-2.5 py-1 border border-black/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t-[4px] border-black/10 my-14" />

            {/* Step 03 */}
            <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6">
              <div>
                <span className="text-display-xl font-bold text-black/10 select-none" aria-hidden="true">
                  03
                </span>
              </div>
              <div>
                <div className="w-12 h-12 bg-coral/20 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-black" />
                </div>
                <h2 className="text-heading-lg text-black">
                  Get your fair settlement
                </h2>
                <p className="mt-3 text-body text-[#4a555e] max-w-lg leading-relaxed">
                  When you receive an offer, our Fairness Score instantly tells you
                  if it&apos;s reasonable. If it&apos;s not, we generate a
                  professional counter-offer package with demand letters, talking
                  points, and an escalation roadmap.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    "Fairness Score (1\u2013100)",
                    "Demand letter generation",
                    "Phone negotiation scripts",
                    "Escalation guidance",
                  ].map((tag) => (
                    <span key={tag} className="text-caption text-[#4a555e] bg-panel-alt px-2.5 py-1 border border-black/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- WHAT YOU GET ---- */}
        <section className="section-gap border-t-[4px] border-black">
          <div className="container-wide">
            <div className="text-center mb-14">
              <p className="text-caption uppercase tracking-[0.2em] text-black/60 font-medium mb-3">
                The Toolkit
              </p>
              <h2 className="text-display-sm sm:text-display text-black">
                Everything you need to fight back.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: <Search className="w-6 h-6" />,
                  title: "Policy X-Ray",
                  desc: "AI reads every clause and highlights coverages, limits, and exclusions in plain English.",
                },
                {
                  icon: <Scale className="w-6 h-6" />,
                  title: "Fairness Gauge",
                  desc: "A market-data-backed score showing exactly where your offer falls from undervalued to fair.",
                },
                {
                  icon: <FileText className="w-6 h-6" />,
                  title: "Counter-Offer Letter",
                  desc: "Professional demand letter with itemized damages, comparable data, and policy citations.",
                },
                {
                  icon: <Phone className="w-6 h-6" />,
                  title: "Call Script",
                  desc: "Word-for-word phone script with objection handlers for every adjuster tactic.",
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: "State Legal Guide",
                  desc: "Your state\u2019s insurance laws, deadlines, bad faith statutes, and complaint process.",
                },
                {
                  icon: <TrendingUp className="w-6 h-6" />,
                  title: "Escalation Playbook",
                  desc: "Step-by-step guide from supervisor requests to DOI complaints to small claims court.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white border-2 border-black/10 p-6 hover:border-coral transition-colors duration-200"
                >
                  <div className="w-12 h-12 bg-coral/20 text-black flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-heading text-black font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-body-sm text-[#4a555e] leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- STATS ---- */}
        <section className="border-y-[4px] border-black bg-white">
          <div className="container-wide py-16 sm:py-20 grid grid-cols-1 sm:grid-cols-4 gap-8 sm:gap-0 text-center">
            <div className="sm:border-r-[4px] sm:border-black/10">
              <p className="text-3xl sm:text-4xl font-bold text-black">850M+</p>
              <p className="text-body-sm text-[#4a555e] mt-1">
                Claims denied yearly
              </p>
            </div>
            <div className="sm:border-r-[4px] sm:border-black/10">
              <p className="text-3xl sm:text-4xl font-bold text-black">&lt;1%</p>
              <p className="text-body-sm text-[#4a555e] mt-1">
                Of those are ever appealed
              </p>
            </div>
            <div className="sm:border-r-[4px] sm:border-black/10">
              <p className="text-3xl sm:text-4xl font-bold text-black">
                <span className="bg-coral/40 px-1">40&ndash;50%</span>
              </p>
              <p className="text-body-sm text-[#4a555e] mt-1">
                Win rate when they do
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-coral">$3,500+</p>
              <p className="text-body-sm text-[#4a555e] mt-1">
                Avg. additional recovery
              </p>
            </div>
          </div>
        </section>

        {/* ---- CTA ---- */}
        <section className="bg-frame text-panel">
          <div className="container-wide py-16 sm:py-24 lg:py-28 text-center">
            <h2 className="text-display-sm sm:text-display text-panel max-w-2xl mx-auto">
              Ready to find out what your claim is really worth?
            </h2>
            <p className="mt-5 text-body-lg text-panel/60 max-w-lg mx-auto">
              Free to start. No credit card. Results in under five minutes.
            </p>

            <div className="mt-10">
              <Link href="/claims/new">
                <Button
                  size="lg"
                  className="bg-coral text-black hover:bg-coral-300 font-semibold"
                >
                  Analyze my claim
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
