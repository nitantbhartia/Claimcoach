import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SettlementChecklist } from "@/components/tools/settlement-checklist";

export const metadata: Metadata = {
  title: "Total Loss Settlement Checklist — ClaimCoach",
  description:
    "Check every line item that should be in your total loss settlement. Find out what's missing and how much you're owed with our free interactive checklist.",
  keywords: [
    "total loss settlement checklist",
    "what should be included in total loss offer",
    "insurance settlement checklist",
    "total loss claim checklist",
    "missing line items insurance offer",
    "insurance settlement line items",
  ],
  alternates: { canonical: "/tools/settlement-checklist" },
  openGraph: {
    title: "Total Loss Settlement Checklist — ClaimCoach",
    description:
      "Check every line item that should be in your total loss offer. See what's missing and how much more you're owed.",
    url: "https://claimcoach.app/tools/settlement-checklist",
  },
};

export default function SettlementChecklistPage() {
  return (
    <div className="flex flex-col min-h-screen bg-panel">
      <Header />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-5 sm:px-6 py-10 sm:py-16">
          <SettlementChecklist mode="full" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
