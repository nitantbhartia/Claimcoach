import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GuideCard } from "@/components/guides/guide-card";
import { listGuides } from "@/lib/guides/registry";

export const metadata: Metadata = {
  title: "Total Loss Insurance Guides",
  description:
    "Free guides on total loss settlements, insurance negotiation, counter-offer letters, and sales tax recovery. Learn how to fight lowball offers and get a fair payout.",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndexPage() {
  const guides = listGuides();

  return (
    <div className="flex flex-col min-h-screen bg-panel">
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-10 sm:py-16">
          <h1 className="text-heading-lg sm:text-display-sm font-semibold text-black mb-2">
            Insurance Claim Guides
          </h1>
          <p className="text-body text-[#4a555e] mb-8">
            In-depth guides to help you navigate total loss claims, negotiate
            with your insurer, and get a fair settlement.
          </p>

          <div className="grid gap-4">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
