import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "ClaimCoach — Check Your Total Loss Offer",
  description:
    "Don't leave thousands on the table. ClaimCoach uses AI and real-time market data to verify if your total loss insurance settlement is fair — and generates a professional counter-offer if it's not.",
  keywords: [
    "total loss offer checker",
    "insurance settlement fair",
    "insurance lowball offer",
    "total loss negotiation",
    "counter offer insurance claim",
    "insurance claim AI",
    "car accident settlement amount",
    "insurance underpayment",
    "fight insurance offer",
    "total loss car value",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "ClaimCoach — Check Your Total Loss Offer",
    description:
      "Don't leave thousands on the table. ClaimCoach uses AI and real-time market data to verify if your total loss settlement is fair.",
    url: "https://claimcoach.app",
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F2F0E4] font-sans text-black">
      <Header />

      <main>
        {/* ============================================================ */}
        {/*  Hero Section                                                 */}
        {/* ============================================================ */}

        <section className="max-w-[1400px] mx-auto px-6 py-12 lg:px-12 lg:py-20 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-12 text-center lg:text-left">
          {/* Hero Content */}
          <div className="max-w-[620px] mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 bg-black/5 px-4 py-1.5 rounded-full text-[13px] font-bold uppercase tracking-[0.05em] mb-6">
              <span className="text-[#FF5C39]">●</span> New AI Valuation Engine
            </div>

            <h1 className="text-[64px] lg:text-[84px] leading-[0.92] font-bold tracking-[-0.05em] mb-8">
              Insurance offers are rarely&nbsp;final.
            </h1>

            <p className="text-xl leading-[1.5] text-black/60 font-medium mb-12">
              Don&apos;t leave thousands on the table. ClaimCoach uses real-time
              market data and local tax laws to verify if your settlement offer
              is actually fair.
            </p>

            <div className="flex gap-4 items-center justify-center lg:justify-start">
              <Link
                href="/claims/new"
                className="bg-black text-white px-10 py-6 rounded-full text-lg font-semibold inline-flex items-center gap-3 hover:translate-y-[-2px] hover:bg-[#1a1a1a] transition-all"
              >
                Get Started Free
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <span className="opacity-40 ml-2.5 hidden sm:inline">
                No credit card required
              </span>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="absolute w-[300px] h-[300px] bg-[#FF5C39] blur-[80px] opacity-15 z-[1] top-1/2 left-1/2" />
            <div className="bg-[#6CB096] rounded-[32px] lg:rounded-[44px] p-8 lg:p-12 shadow-[0_50px_100px_-20px_rgba(108,176,150,0.4)] lg:-rotate-2 relative z-[2]">
              <div className="text-white/80 text-xs font-bold uppercase tracking-[0.05em]">
                Live Analysis Preview
              </div>

              <div className="bg-white rounded-[24px] lg:rounded-[32px] p-6 lg:p-8 mt-4 lg:mt-6">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.05em] text-black/50">
                      Potential Gain
                    </div>
                    <div className="text-[28px] lg:text-[32px] font-extrabold text-[#FF5C39]">
                      +$3,069
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-[0.05em] text-black/50">
                      Confidence
                    </div>
                    <div className="text-lg font-bold">85%</div>
                  </div>
                </div>
                <div className="h-2 bg-[#f0f0f0] rounded mt-4 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-[85%] bg-[#FF5C39] rounded" />
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <div className="flex-1 h-10 rounded-xl bg-black/10" />
                <div className="flex-1 h-10 rounded-xl bg-black/10" />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  Benefit Grid                                                 */}
        {/* ============================================================ */}

        <section className="max-w-[1400px] mx-auto px-6 py-12 lg:px-12 lg:py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 — Recover Hidden Fees */}
          <div className="bg-white p-8 lg:p-12 rounded-[32px] border border-black/[0.03] hover:translate-y-[-8px] transition-transform">
            <div className="w-14 h-14 bg-[#F2F0E4] rounded-[18px] flex items-center justify-center mb-6">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FF5C39"
                strokeWidth="2"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h3 className="text-[22px] font-bold tracking-[-0.02em] mb-3">
              Recover Hidden Fees
            </h3>
            <p className="text-base leading-[1.6] text-black/60 font-medium">
              Carriers often &ldquo;forget&rdquo; to include sales tax, title
              transfer fees, and local registration credits.
            </p>
          </div>

          {/* Card 2 — 60-Second Scan */}
          <div className="bg-white p-8 lg:p-12 rounded-[32px] border border-black/[0.03] hover:translate-y-[-8px] transition-transform">
            <div className="w-14 h-14 bg-[#F2F0E4] rounded-[18px] flex items-center justify-center mb-6">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FF5C39"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3 className="text-[22px] font-bold tracking-[-0.02em] mb-3">
              60-Second Scan
            </h3>
            <p className="text-base leading-[1.6] text-black/60 font-medium">
              Upload your offer PDF or enter your details manually. Our AI
              identifies discrepancies in seconds.
            </p>
          </div>

          {/* Card 3 — Negotiation Scripts */}
          <div className="bg-white p-8 lg:p-12 rounded-[32px] border border-black/[0.03] hover:translate-y-[-8px] transition-transform">
            <div className="w-14 h-14 bg-[#F2F0E4] rounded-[18px] flex items-center justify-center mb-6">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FF5C39"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3 className="text-[22px] font-bold tracking-[-0.02em] mb-3">
              Negotiation Scripts
            </h3>
            <p className="text-base leading-[1.6] text-black/60 font-medium">
              Receive a generated letter to send to your adjuster citing
              specific codes and market data.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
