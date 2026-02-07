import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/context";

export const metadata: Metadata = {
  title: "ClaimCoach - AI-Powered Insurance Claim Negotiator",
  description:
    "Get the settlement you deserve. ClaimCoach uses AI to analyze your insurance policy, evaluate offers, and generate professional counter-offers. Stop leaving money on the table.",
  keywords: [
    "insurance claim help",
    "insurance negotiation",
    "claim settlement",
    "lowball offer",
    "insurance counter offer",
    "auto claim",
    "car accident settlement",
    "insurance fairness",
  ],
  openGraph: {
    title: "ClaimCoach - AI-Powered Insurance Claim Negotiator",
    description:
      "Stop accepting lowball insurance offers. ClaimCoach analyzes your policy, evaluates your offer, and generates professional counter-offers.",
    type: "website",
    siteName: "ClaimCoach",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
