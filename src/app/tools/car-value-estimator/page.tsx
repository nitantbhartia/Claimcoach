import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CarValueEstimator } from "@/components/tools/car-value-estimator";

export const metadata: Metadata = {
  title: "What's My Car Worth? — ClaimCoach",
  description:
    "Get an independent AI estimate of your vehicle's fair market value. Compare to your insurer's offer to see if you're being shortchanged.",
  keywords: [
    "what is my totaled car worth",
    "car value after total loss",
    "actual cash value calculator",
    "total loss vehicle value",
  ],
};

export default function CarValueEstimatorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-panel">
      <Header />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-5 sm:px-6 py-10 sm:py-16">
          <CarValueEstimator mode="full" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
