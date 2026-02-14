import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/context";
import { RouteProgressBar } from "@/components/ui/route-progress";
import { Analytics } from "@/components/analytics";

const SITE_URL = "https://claimcoach.app";
const SITE_NAME = "ClaimCoach";
const DEFAULT_DESCRIPTION =
  "Get the settlement you deserve. ClaimCoach uses AI to analyze your insurance policy, evaluate offers, and generate professional counter-offers backed by market data.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0d0d",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ClaimCoach — Fight Your Lowball Total Loss Offer",
    template: "%s | ClaimCoach",
  },
  description:
    "Insurance adjusters handle 500+ claims a year. You handle one. ClaimCoach analyzes your total loss offer and finds the line items they\u2019re hoping you\u2019ll miss.",
  keywords: [
    "insurance claim help",
    "insurance negotiation",
    "claim settlement",
    "lowball offer",
    "insurance counter offer",
    "auto claim",
    "car accident settlement",
    "insurance fairness",
    "diminished value",
    "total loss negotiation",
    "insurance underpayment",
    "counter offer letter",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ClaimCoach — Fight Your Lowball Total Loss Offer",
    description:
      "Insurance adjusters handle 500+ claims a year. You handle one. ClaimCoach analyzes your total loss offer and finds the line items they\u2019re hoping you\u2019ll miss.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClaimCoach — Fight Your Lowball Total Loss Offer",
    description:
      "Insurance adjusters handle 500+ claims a year. You handle one. ClaimCoach finds the line items they\u2019re hoping you\u2019ll miss.",
    creator: "@claimcoach",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  url: SITE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: DEFAULT_DESCRIPTION,
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      name: "Free Analysis",
      description: "Basic claim analysis and score",
    },
    {
      "@type": "Offer",
      price: "79",
      priceCurrency: "USD",
      name: "Full Toolkit",
      description:
        "Complete AI-powered analysis, counter-offer generation, call script, and export",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1200",
    bestRating: "5",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <RouteProgressBar />
        <Analytics />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
