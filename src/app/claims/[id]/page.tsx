"use client";

import { useParams } from "next/navigation";
import { ClaimLayout } from "@/components/layout/claim-layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScoreGauge } from "@/components/ui/score-gauge";
import {
  formatCurrency,
  getStatusLabel,
  getStatusColor,
  getProgressPercentage,
} from "@/lib/utils";
import Link from "next/link";
import {
  Camera,
  FileSearch,
  DollarSign,
  Scale,
  ArrowRight,
  Car,
  Calendar,
  Building2,
  Hash,
  FileText,
  Receipt,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";
import { ClaimStatus } from "@/types";

// ---------------------------------------------------------------------------
// Mock data -- will be replaced with real fetching once the API is wired up
// ---------------------------------------------------------------------------

const MOCK_CLAIM = {
  id: "demo-claim-001",
  status: "offer_received" as ClaimStatus,
  vehicleYear: 2022,
  vehicleMake: "Honda",
  vehicleModel: "Civic",
  accidentDate: "2025-11-14",
  insurerName: "State Farm",
  claimNumber: "SF-2025-88431",
  offerAmount: 4200,
  fairnessScore: 38,
  documentsUploaded: 8,
  trackedExpenses: 1247,
  policyUploaded: true,
};

// ---------------------------------------------------------------------------
// Next-step definitions keyed by claim status
// ---------------------------------------------------------------------------

interface NextStep {
  icon: React.ElementType;
  label: string;
  description: string;
  href: (claimId: string) => string;
  variant: "primary" | "outline";
}

const NEXT_STEPS: Record<ClaimStatus, NextStep[]> = {
  setup: [
    {
      icon: Camera,
      label: "Upload documents",
      description: "Add photos and files to strengthen your claim.",
      href: (id) => `/claims/${id}/documents`,
      variant: "primary",
    },
  ],
  documenting: [
    {
      icon: Camera,
      label: "Upload more documents",
      description:
        "The more evidence you provide, the stronger your negotiating position.",
      href: (id) => `/claims/${id}/documents`,
      variant: "primary",
    },
    {
      icon: FileSearch,
      label: "Upload your policy for AI analysis",
      description:
        "We can find hidden coverages and red flags in your policy.",
      href: (id) => `/claims/${id}/policy`,
      variant: "outline",
    },
  ],
  policy_review: [
    {
      icon: FileSearch,
      label: "Review your policy analysis",
      description:
        "See what coverages apply and any adjuster tactics to watch for.",
      href: (id) => `/claims/${id}/policy`,
      variant: "primary",
    },
  ],
  filed: [
    {
      icon: Clock,
      label: "Waiting for the insurer's response",
      description:
        "Keep uploading any new documents or expenses while you wait.",
      href: (id) => `/claims/${id}/documents`,
      variant: "outline",
    },
  ],
  offer_received: [
    {
      icon: DollarSign,
      label: "Review your offer",
      description:
        "Our AI will analyze the offer and tell you if it is fair.",
      href: (id) => `/claims/${id}/offer`,
      variant: "primary",
    },
    {
      icon: Scale,
      label: "Build a counter-offer",
      description:
        "Generate a demand letter and talking points backed by evidence.",
      href: (id) => `/claims/${id}/counter`,
      variant: "outline",
    },
  ],
  negotiating: [
    {
      icon: Scale,
      label: "Refine your counter-offer",
      description:
        "Update your strategy as negotiations continue.",
      href: (id) => `/claims/${id}/counter`,
      variant: "primary",
    },
  ],
  escalating: [
    {
      icon: Scale,
      label: "View escalation steps",
      description:
        "Follow the recommended escalation path to resolve your claim.",
      href: (id) => `/claims/${id}/counter`,
      variant: "primary",
    },
  ],
  resolved: [
    {
      icon: CheckCircle2,
      label: "View final settlement",
      description: "Your claim has been resolved. Review the outcome.",
      href: (id) => `/claims/${id}/offer`,
      variant: "primary",
    },
  ],
};

// ---------------------------------------------------------------------------
// Navigation card definitions
// ---------------------------------------------------------------------------

interface NavCard {
  icon: React.ElementType;
  title: string;
  description: string;
  href: (claimId: string) => string;
  color: string;
  iconBg: string;
}

const NAV_CARDS: NavCard[] = [
  {
    icon: Camera,
    title: "Documents",
    description:
      "Upload photos, repair estimates, medical records, and other evidence.",
    href: (id) => `/claims/${id}/documents`,
    color: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    icon: FileSearch,
    title: "Policy Analysis",
    description:
      "Upload your policy and let AI find hidden coverages and red flags.",
    href: (id) => `/claims/${id}/policy`,
    color: "text-purple-600",
    iconBg: "bg-purple-100",
  },
  {
    icon: DollarSign,
    title: "Offer Analysis",
    description:
      "Get a fairness score and line-by-line breakdown of the insurer's offer.",
    href: (id) => `/claims/${id}/offer`,
    color: "text-orange-600",
    iconBg: "bg-orange-100",
  },
  {
    icon: Scale,
    title: "Counter-Offer",
    description:
      "Generate a demand letter, talking points, and escalation plan.",
    href: (id) => `/claims/${id}/counter`,
    color: "text-red-600",
    iconBg: "bg-red-100",
  },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function ClaimOverviewPage() {
  const params = useParams<{ id: string }>();
  const claimId = params.id;
  const claim = { ...MOCK_CLAIM, id: claimId };

  const progress = getProgressPercentage(claim.status);
  const statusLabel = getStatusLabel(claim.status);
  const statusColor = getStatusColor(claim.status);
  const nextSteps = NEXT_STEPS[claim.status] ?? [];

  return (
    <ClaimLayout claimId={claimId}>
      <div className="space-y-8">
        {/* ----------------------------------------------------------------- */}
        {/* 1. Claim Status Card                                              */}
        {/* ----------------------------------------------------------------- */}
        <Card>
          <CardContent className="py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {claim.vehicleYear} {claim.vehicleMake} {claim.vehicleModel}{" "}
                    Claim
                  </h1>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}
                  >
                    {statusLabel}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Claim #{claim.claimNumber}
                </p>
              </div>

              {claim.fairnessScore !== null && (
                <ScoreGauge score={claim.fairnessScore} size="sm" />
              )}
            </div>

            {/* Progress bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Claim progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} size="md" color="brand" />
            </div>

            {/* Recommended next action (first step) */}
            {nextSteps.length > 0 && (
              <div className="mt-4 flex items-center gap-3 rounded-lg bg-brand-50 border border-brand-200 px-4 py-3">
                <AlertCircle className="w-5 h-5 text-brand-600 flex-shrink-0" />
                <p className="text-sm text-brand-800 flex-1">
                  <span className="font-semibold">Recommended:</span>{" "}
                  {nextSteps[0].description}
                </p>
                <Link href={nextSteps[0].href(claimId)}>
                  <Button size="sm" variant={nextSteps[0].variant}>
                    {nextSteps[0].label}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ----------------------------------------------------------------- */}
        {/* 2. Claim Details + 3. Quick Stats (side-by-side on desktop)        */}
        {/* ----------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Claim Details */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                Claim Details
              </h2>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div className="flex items-start gap-3">
                  <Car className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Vehicle
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {claim.vehicleYear} {claim.vehicleMake}{" "}
                      {claim.vehicleModel}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Accident Date
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {new Date(claim.accidentDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Insurer
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {claim.insurerName}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Hash className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Claim Number
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {claim.claimNumber}
                    </dd>
                  </div>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                Quick Stats
              </h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                {/* Documents uploaded */}
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {claim.documentsUploaded}
                    </p>
                    <p className="text-xs text-gray-500">
                      Documents uploaded
                    </p>
                  </div>
                </div>

                {/* Expenses tracked */}
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100">
                    <Receipt className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(claim.trackedExpenses)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Expenses tracked
                    </p>
                  </div>
                </div>

                {/* Offer amount */}
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100">
                    <DollarSign className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {claim.offerAmount
                        ? formatCurrency(claim.offerAmount)
                        : "--"}
                    </p>
                    <p className="text-xs text-gray-500">Offer amount</p>
                  </div>
                </div>

                {/* Fairness score */}
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-100">
                    <Scale className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    {claim.fairnessScore !== null ? (
                      <>
                        <p className="text-2xl font-bold text-red-600">
                          {claim.fairnessScore}/100
                        </p>
                        <p className="text-xs text-gray-500">
                          Fairness score
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-2xl font-bold text-gray-300">
                          --
                        </p>
                        <p className="text-xs text-gray-500">
                          Fairness score
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* 4. Next Steps                                                      */}
        {/* ----------------------------------------------------------------- */}
        {nextSteps.length > 0 && (
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                Next Steps
              </h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {nextSteps.map((step, idx) => {
                  const StepIcon = step.icon;
                  return (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-brand-100 flex-shrink-0">
                        <StepIcon className="w-5 h-5 text-brand-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">
                          {step.label}
                        </p>
                        <p className="text-sm text-gray-500">
                          {step.description}
                        </p>
                      </div>
                      <Link href={step.href(claimId)} className="flex-shrink-0">
                        <Button size="sm" variant={step.variant}>
                          Go
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* 5. Navigation Cards                                                */}
        {/* ----------------------------------------------------------------- */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Claim Sections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {NAV_CARDS.map((card) => {
              const NavIcon = card.icon;
              return (
                <Link key={card.title} href={card.href(claimId)}>
                  <Card hover className="h-full">
                    <CardContent className="py-5">
                      <div
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${card.iconBg} mb-3`}
                      >
                        <NavIcon className={`w-5 h-5 ${card.color}`} />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        {card.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {card.description}
                      </p>
                      <div className="mt-3 flex items-center text-xs font-medium text-brand-600">
                        Open section
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </ClaimLayout>
  );
}
