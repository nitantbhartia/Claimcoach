import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* ---- HERO ---- */}
        <section className="bg-zinc-950 text-white">
          <div className="container-wide py-24 sm:py-32 lg:py-40">
            <h1 className="text-display max-w-3xl text-balance">
              How ClaimCoach works
            </h1>
            <p className="mt-6 text-body-lg text-zinc-400 max-w-xl">
              Three steps from unfair offer to fair settlement. Our AI does the
              heavy lifting so you don&apos;t have to become an insurance expert
              overnight.
            </p>
          </div>
        </section>

        {/* ---- STEPS ---- */}
        <section className="section-gap">
          <div className="container-wide max-w-3xl">
            {/* Step 01 */}
            <div>
              <span
                className="text-display-xl text-zinc-200 select-none"
                aria-hidden="true"
              >
                01
              </span>
              <h2 className="text-heading-lg text-zinc-900 -mt-4">
                Document everything
              </h2>
              <p className="mt-3 text-body text-zinc-600 max-w-lg leading-relaxed">
                Our guided documentation engine walks you through capturing
                every piece of evidence you need. Context-aware checklists tell
                you exactly what to photograph, what to gather, and what records
                to request.
              </p>
              <div className="mt-4 space-y-1 text-body-sm text-zinc-400">
                <p>12+ guided vehicle photos with angle instructions</p>
                <p>Accident scene documentation checklist</p>
                <p>Financial impact tracker for all expenses</p>
                <p>Pre-loss condition evidence gathering</p>
              </div>
            </div>

            <div className="divider my-14" />

            {/* Step 02 */}
            <div>
              <span
                className="text-display-xl text-zinc-200 select-none"
                aria-hidden="true"
              >
                02
              </span>
              <h2 className="text-heading-lg text-zinc-900 -mt-4">
                AI analyzes your claim
              </h2>
              <p className="mt-3 text-body text-zinc-600 max-w-lg leading-relaxed">
                Upload your insurance policy and our AI reads every page,
                translating dense legal language into plain English. It finds
                hidden coverages you didn&apos;t know you had and predicts the
                tactics your adjuster will use.
              </p>
              <div className="mt-4 space-y-1 text-body-sm text-zinc-400">
                <p>Plain-English policy translation</p>
                <p>Hidden coverage discovery</p>
                <p>Red flag identification</p>
                <p>Adjuster tactic prediction</p>
              </div>
            </div>

            <div className="divider my-14" />

            {/* Step 03 */}
            <div>
              <span
                className="text-display-xl text-zinc-200 select-none"
                aria-hidden="true"
              >
                03
              </span>
              <h2 className="text-heading-lg text-zinc-900 -mt-4">
                Get your fair settlement
              </h2>
              <p className="mt-3 text-body text-zinc-600 max-w-lg leading-relaxed">
                When you receive an offer, our Fairness Score instantly tells you
                if it&apos;s reasonable. If it&apos;s not, we generate a
                professional counter-offer package with demand letters, talking
                points, and an escalation roadmap.
              </p>
              <div className="mt-4 space-y-1 text-body-sm text-zinc-400">
                <p>Fairness Score (1&ndash;100) with detailed breakdown</p>
                <p>Professional demand letter generation</p>
                <p>Phone negotiation scripts</p>
                <p>Step-by-step escalation guidance</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---- STATS ---- */}
        <section className="border-t border-zinc-100">
          <div className="container-wide py-20 sm:py-28">
            <h2 className="text-display text-zinc-900 mb-14">
              The numbers speak.
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-0">
              <div className="text-center sm:text-left flex-1">
                <p className="text-display-sm text-zinc-900">850M+</p>
                <p className="text-body-sm text-zinc-500 mt-1">
                  Claims denied yearly
                </p>
              </div>

              <div
                aria-hidden="true"
                className="hidden sm:block w-px h-12 bg-zinc-200"
              />

              <div className="text-center flex-1">
                <p className="text-display-sm text-zinc-900">
                  &lt;&thinsp;1%
                </p>
                <p className="text-body-sm text-zinc-500 mt-1">
                  Of those are ever appealed
                </p>
              </div>

              <div
                aria-hidden="true"
                className="hidden sm:block w-px h-12 bg-zinc-200"
              />

              <div className="text-center flex-1">
                <p className="text-display-sm text-zinc-900">
                  40&ndash;50%
                </p>
                <p className="text-body-sm text-zinc-500 mt-1">
                  Win rate when they do
                </p>
              </div>

              <div
                aria-hidden="true"
                className="hidden sm:block w-px h-12 bg-zinc-200"
              />

              <div className="text-center sm:text-right flex-1">
                <p className="text-display-sm text-brand-500">$2,100+</p>
                <p className="text-body-sm text-zinc-500 mt-1">
                  Avg. additional recovery
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---- CTA ---- */}
        <section className="bg-zinc-950 text-white">
          <div className="container-wide py-24 sm:py-32 text-center">
            <h2 className="text-display text-white">Ready?</h2>

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

            <p className="mt-6 text-body-sm text-zinc-500">
              Free to start. No credit card required.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
