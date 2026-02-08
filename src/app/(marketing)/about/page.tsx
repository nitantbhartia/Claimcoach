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
    <div className="flex flex-col min-h-screen bg-paper-white">
      <Header />

      <main className="flex-1">
        {/* ---- HERO ---- */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-paper-white via-paper-warm to-paper-cream" />
          <div className="relative container-wide py-20 sm:py-28">
            <p className="text-caption uppercase tracking-[0.2em] text-ink-800/60 font-medium mb-4">
              How It Works
            </p>
            <h1 className="font-serif text-display-sm sm:text-display text-ink-800 max-w-3xl">
              Three steps from unfair offer to{" "}
              <span className="relative inline-block">
                fair settlement
                <span className="absolute -bottom-1 left-0 right-0 h-3 bg-highlight-yellow/60 -z-10 rounded-sm" />
              </span>
              .
            </h1>
            <p className="mt-6 text-body-lg text-slate-500 max-w-xl leading-relaxed">
              Our AI does the heavy lifting so you don&apos;t have to become an
              insurance expert overnight.
            </p>
          </div>
        </section>

        {/* ---- STEPS ---- */}
        <section className="section-gap bg-white">
          <div className="container-wide max-w-4xl">
            {/* Step 01 */}
            <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6">
              <div>
                <span className="text-display-xl font-serif font-bold text-slate-100 select-none" aria-hidden="true">
                  01
                </span>
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-ink-50 flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-ink-800" />
                </div>
                <h2 className="font-serif text-heading-lg text-ink-800">
                  Document everything
                </h2>
                <p className="mt-3 text-body text-slate-500 max-w-lg leading-relaxed">
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
                    <span key={tag} className="text-caption text-slate-500 bg-paper-warm px-2.5 py-1 rounded-full border border-slate-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="divider my-14" />

            {/* Step 02 */}
            <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6">
              <div>
                <span className="text-display-xl font-serif font-bold text-slate-100 select-none" aria-hidden="true">
                  02
                </span>
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                  <Scale className="w-6 h-6 text-amber-700" />
                </div>
                <h2 className="font-serif text-heading-lg text-ink-800">
                  AI analyzes your claim
                </h2>
                <p className="mt-3 text-body text-slate-500 max-w-lg leading-relaxed">
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
                    <span key={tag} className="text-caption text-slate-500 bg-paper-warm px-2.5 py-1 rounded-full border border-slate-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="divider my-14" />

            {/* Step 03 */}
            <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6">
              <div>
                <span className="text-display-xl font-serif font-bold text-slate-100 select-none" aria-hidden="true">
                  03
                </span>
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-emerald-700" />
                </div>
                <h2 className="font-serif text-heading-lg text-ink-800">
                  Get your fair settlement
                </h2>
                <p className="mt-3 text-body text-slate-500 max-w-lg leading-relaxed">
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
                    <span key={tag} className="text-caption text-slate-500 bg-paper-warm px-2.5 py-1 rounded-full border border-slate-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- WHAT YOU GET ---- */}
        <section className="section-gap bg-paper-cream/50">
          <div className="container-wide">
            <div className="text-center mb-14">
              <p className="text-caption uppercase tracking-[0.2em] text-ink-800/60 font-medium mb-3">
                The Toolkit
              </p>
              <h2 className="font-serif text-display-sm sm:text-display text-ink-800">
                Everything you need to fight back.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: <Search className="w-6 h-6" />,
                  title: "Policy X-Ray",
                  desc: "AI reads every clause and highlights coverages, limits, and exclusions in plain English.",
                  color: "bg-ink-50 text-ink-800",
                },
                {
                  icon: <Scale className="w-6 h-6" />,
                  title: "Fairness Gauge",
                  desc: "A market-data-backed score showing exactly where your offer falls from undervalued to fair.",
                  color: "bg-amber-50 text-amber-700",
                },
                {
                  icon: <FileText className="w-6 h-6" />,
                  title: "Counter-Offer Letter",
                  desc: "Professional demand letter with itemized damages, comparable data, and policy citations.",
                  color: "bg-emerald-50 text-emerald-700",
                },
                {
                  icon: <Phone className="w-6 h-6" />,
                  title: "Call Script",
                  desc: "Word-for-word phone script with objection handlers for every adjuster tactic.",
                  color: "bg-purple-50 text-purple-700",
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: "State Legal Guide",
                  desc: "Your state\u2019s insurance laws, deadlines, bad faith statutes, and complaint process.",
                  color: "bg-rose-50 text-rose-700",
                },
                {
                  icon: <TrendingUp className="w-6 h-6" />,
                  title: "Escalation Playbook",
                  desc: "Step-by-step guide from supervisor requests to DOI complaints to small claims court.",
                  color: "bg-sky-50 text-sky-700",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-xl border border-slate-100 p-6 hover:shadow-paper transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-heading text-ink-800 font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-body-sm text-slate-500 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- STATS ---- */}
        <section className="border-y border-slate-200/60 bg-white">
          <div className="container-wide py-16 sm:py-20 grid grid-cols-1 sm:grid-cols-4 gap-8 sm:gap-0 text-center">
            <div className="sm:border-r sm:border-slate-100">
              <p className="text-3xl sm:text-4xl font-serif font-bold text-ink-800">850M+</p>
              <p className="text-body-sm text-slate-500 mt-1">
                Claims denied yearly
              </p>
            </div>
            <div className="sm:border-r sm:border-slate-100">
              <p className="text-3xl sm:text-4xl font-serif font-bold text-ink-800">&lt;1%</p>
              <p className="text-body-sm text-slate-500 mt-1">
                Of those are ever appealed
              </p>
            </div>
            <div className="sm:border-r sm:border-slate-100">
              <p className="text-3xl sm:text-4xl font-serif font-bold text-ink-800">
                <span className="mark-yellow">40&ndash;50%</span>
              </p>
              <p className="text-body-sm text-slate-500 mt-1">
                Win rate when they do
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-serif font-bold text-emerald-600">$3,500+</p>
              <p className="text-body-sm text-slate-500 mt-1">
                Avg. additional recovery
              </p>
            </div>
          </div>
        </section>

        {/* ---- CTA ---- */}
        <section className="bg-ink-800 text-white">
          <div className="container-wide py-16 sm:py-24 lg:py-28 text-center">
            <h2 className="font-serif text-display-sm sm:text-display text-white max-w-2xl mx-auto">
              Ready to find out what your claim is really worth?
            </h2>
            <p className="mt-5 text-body-lg text-white/60 max-w-lg mx-auto">
              Free to start. No credit card. Results in under five minutes.
            </p>

            <div className="mt-10">
              <Link href="/claims/new">
                <Button
                  size="lg"
                  className="bg-white text-ink-800 hover:bg-slate-100 font-semibold"
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
