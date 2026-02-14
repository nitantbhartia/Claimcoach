import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FairnessQuiz } from "@/components/tools/fairness-quiz";

export const metadata: Metadata = {
  title: "Is My Insurance Offer Fair? — ClaimCoach",
  description:
    "Take our 5-question quiz to score your insurance settlement offer. Find out if you're being lowballed and how much more you could recover.",
  keywords: [
    "is my insurance offer fair",
    "is my total loss settlement fair",
    "am I getting lowballed by insurance",
    "total loss offer too low",
  ],
};

export default function FairnessQuizPage() {
  return (
    <div className="flex flex-col min-h-screen bg-panel">
      <Header />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-5 sm:px-6 py-10 sm:py-16">
          <FairnessQuiz mode="full" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
