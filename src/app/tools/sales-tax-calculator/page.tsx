import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SalesTaxCalculator } from "@/components/tools/sales-tax-calculator";

export const metadata: Metadata = {
  title: "Sales Tax Recovery Calculator — ClaimCoach",
  description:
    "Calculate how much sales tax your insurer owes you on a replacement vehicle. Free calculator for total loss claims with state-specific rates.",
  keywords: [
    "auto insurance sales tax calculator",
    "replacement vehicle sales tax insurance",
    "total loss sales tax owed",
    "do I get sales tax on totaled car",
  ],
};

export default function SalesTaxCalculatorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-panel">
      <Header />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-5 sm:px-6 py-10 sm:py-16">
          <SalesTaxCalculator mode="full" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
