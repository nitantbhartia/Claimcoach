import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { EstimateForm } from "./estimate-client";

export const metadata: Metadata = {
  title: "Free Car Value Estimator — ClaimCoach",
  description:
    "Get an instant AI-powered fair market value estimate for your vehicle. Enter your year, make, model, and mileage to see if your insurer's total loss offer is fair.",
  keywords: [
    "car value estimator",
    "what is my car worth",
    "total loss vehicle value",
    "actual cash value calculator",
    "fair market value car",
    "totaled car value",
  ],
  alternates: { canonical: "/estimate" },
  openGraph: {
    title: "Free Car Value Estimator — ClaimCoach",
    description:
      "Get an instant AI-powered fair market value estimate for your vehicle. See if your insurer's total loss offer is fair.",
    url: "https://claimcoach.app/estimate",
  },
};

export default function EstimatePage() {
  return (
    <div className="flex flex-col min-h-screen bg-panel">
      <Header />

      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-5 sm:px-6 py-10 sm:py-16">
          <h1 className="text-heading-lg sm:text-display-sm font-semibold text-black mb-2">
            What&apos;s your vehicle worth?
          </h1>
          <p className="text-body text-[#4a555e] mb-8">
            Get an instant fair market value estimate. Add details for a more accurate result — the estimate updates each time.
          </p>

          <EstimateForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
