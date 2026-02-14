import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Calculator, ClipboardCheck, HelpCircle, Car } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Insurance Tools — ClaimCoach",
  description:
    "Free interactive tools to help you get a fair settlement on your total loss insurance claim. Sales tax calculator, settlement checklist, fairness quiz, and more.",
};

const TOOLS = [
  {
    href: "/tools/sales-tax-calculator",
    icon: Calculator,
    title: "Sales Tax Calculator",
    description:
      "Calculate how much sales tax your insurer owes you on a replacement vehicle.",
    tag: "Most popular",
  },
  {
    href: "/tools/settlement-checklist",
    icon: ClipboardCheck,
    title: "Settlement Checklist",
    description:
      "Check every line item that should be in your offer. See what's missing.",
    tag: null,
  },
  {
    href: "/tools/offer-fairness-quiz",
    icon: HelpCircle,
    title: "Is My Offer Fair?",
    description:
      "5-question quiz that scores your offer and shows exactly where you're being shortchanged.",
    tag: null,
  },
  {
    href: "/tools/car-value-estimator",
    icon: Car,
    title: "What's My Car Worth?",
    description:
      "Get an independent AI estimate of your vehicle's fair market value.",
    tag: null,
  },
];

export default function ToolsIndexPage() {
  return (
    <div className="flex flex-col min-h-screen bg-panel">
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-10 sm:py-16">
          <h1 className="text-heading-lg sm:text-display-sm font-semibold text-black mb-2">
            Free Insurance Claim Tools
          </h1>
          <p className="text-body text-[#4a555e] mb-8">
            Interactive calculators and checklists to help you get a fair
            settlement. No account required.
          </p>

          <div className="grid gap-4">
            {TOOLS.map((tool) => (
              <Link key={tool.href} href={tool.href}>
                <div className="bg-white border border-black/10 p-5 hover:border-coral/40 hover:shadow-card transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-coral/10 flex items-center justify-center flex-shrink-0">
                      <tool.icon className="w-5 h-5 text-coral" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-body font-semibold text-black group-hover:text-coral transition-colors">
                          {tool.title}
                        </h2>
                        {tool.tag && (
                          <span className="text-[0.6rem] uppercase font-bold tracking-wider bg-coral/10 text-coral px-1.5 py-0.5">
                            {tool.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-body-sm text-[#4a555e]">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
