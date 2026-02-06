"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  formatCurrency,
  formatDate,
  getStatusLabel,
  getStatusColor,
  getProgressPercentage,
} from "@/lib/utils";
import { ClaimStatus } from "@/types";
import Link from "next/link";
import {
  Plus,
  FileText,
  Camera,
  DollarSign,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Car,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Mock data -- will be replaced with real data fetching
// ---------------------------------------------------------------------------

const mockClaims = [
  {
    id: "demo",
    type: "Auto Property Damage",
    status: "offer_received" as ClaimStatus,
    insurer: "State Farm",
    date: "2026-01-15",
    offer: 4200,
    vehicle: "2022 Honda Civic",
  },
  {
    id: "demo-2",
    type: "Auto Collision",
    status: "documenting" as ClaimStatus,
    insurer: "Progressive",
    date: "2026-01-28",
    offer: null,
    vehicle: "2024 Toyota RAV4",
  },
];

const quickActions = [
  {
    label: "Start New Claim",
    description: "Begin a guided walkthrough to set up your claim.",
    href: "/claims/new",
    icon: Plus,
    color: "bg-brand-50 text-brand-600",
  },
  {
    label: "Upload Documents",
    description: "Add photos, estimates, or policy documents.",
    href: "/claims/demo/documents",
    icon: Camera,
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Review Offer",
    description: "Analyze an insurer offer for fairness.",
    href: "/claims/demo/offer",
    icon: DollarSign,
    color: "bg-orange-50 text-orange-600",
  },
];

const recentActivity = [
  {
    id: "a1",
    icon: AlertCircle,
    iconColor: "text-orange-500",
    title: "Offer received from State Farm",
    description: "Initial settlement offer of $4,200 for your Honda Civic claim.",
    timestamp: "2026-02-03T14:30:00Z",
  },
  {
    id: "a2",
    icon: FileText,
    iconColor: "text-blue-500",
    title: "Policy analysis complete",
    description: "We found 2 hidden coverages that could increase your payout.",
    timestamp: "2026-02-01T09:15:00Z",
  },
  {
    id: "a3",
    icon: Camera,
    iconColor: "text-purple-500",
    title: "Documents uploaded",
    description: "3 photos and 1 repair estimate added to your claim.",
    timestamp: "2026-01-30T16:45:00Z",
  },
  {
    id: "a4",
    icon: CheckCircle2,
    iconColor: "text-green-500",
    title: "Claim filed with Progressive",
    description: "Your RAV4 collision claim has been submitted successfully.",
    timestamp: "2026-01-28T11:00:00Z",
  },
];

// ---------------------------------------------------------------------------
// Helper: relative time label
// ---------------------------------------------------------------------------

function timeAgo(dateString: string): string {
  const now = new Date();
  const then = new Date(dateString);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  const userName = "Alex";

  return (
    <DashboardShell>
      {/* ----------------------------------------------------------------- */}
      {/* Welcome header                                                    */}
      {/* ----------------------------------------------------------------- */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Welcome back, {userName}
          </h1>
          <p className="mt-1 text-gray-500">
            Here is an overview of your active claims and recent activity.
          </p>
        </div>
        <Link href="/claims/new">
          <Button size="lg" className="gap-2 w-full sm:w-auto">
            <Plus className="w-5 h-5" />
            New Claim
          </Button>
        </Link>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Active Claims                                                     */}
      {/* ----------------------------------------------------------------- */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Active Claims
          </h2>
          <span className="text-sm text-gray-500">
            {mockClaims.length} {mockClaims.length === 1 ? "claim" : "claims"}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {mockClaims.map((claim) => {
            const progress = getProgressPercentage(claim.status);
            return (
              <Link key={claim.id} href={`/claims/${claim.id}`}>
                <Card hover className="h-full">
                  <CardHeader className="flex flex-row items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100">
                        <Car className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {claim.type}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {claim.vehicle}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(
                        claim.status
                      )}`}
                    >
                      {getStatusLabel(claim.status)}
                    </span>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Key details */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">Insurer</span>
                        <p className="font-medium text-gray-900">
                          {claim.insurer}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Date of Loss</span>
                        <p className="font-medium text-gray-900">
                          {formatDate(claim.date)}
                        </p>
                      </div>
                      {claim.offer !== null && (
                        <div className="col-span-2">
                          <span className="text-gray-500">Current Offer</span>
                          <p className="font-semibold text-orange-600">
                            {formatCurrency(claim.offer)}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium text-gray-500">
                          Claim Progress
                        </span>
                        <span className="text-xs font-medium text-gray-700">
                          {progress}%
                        </span>
                      </div>
                      <Progress value={progress} size="sm" color="brand" />
                    </div>

                    {/* CTA hint */}
                    <div className="flex items-center text-sm font-medium text-brand-600 gap-1">
                      View details
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Quick Actions                                                     */}
      {/* ----------------------------------------------------------------- */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.label} href={action.href}>
                <Card hover className="h-full">
                  <CardContent className="flex flex-col items-start gap-3 py-5">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-lg ${action.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {action.label}
                      </p>
                      <p className="mt-0.5 text-sm text-gray-500">
                        {action.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Recent Activity                                                   */}
      {/* ----------------------------------------------------------------- */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>

        <Card>
          <CardContent className="divide-y divide-gray-100 p-0">
            {recentActivity.map((event, idx) => {
              const Icon = event.icon;
              return (
                <div
                  key={event.id}
                  className="flex items-start gap-4 px-6 py-4"
                >
                  {/* Timeline icon */}
                  <div className="relative flex-shrink-0 mt-0.5">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50">
                      <Icon className={`w-4 h-4 ${event.iconColor}`} />
                    </div>
                    {/* Connector line (skip last item) */}
                    {idx < recentActivity.length - 1 && (
                      <span
                        className="absolute left-1/2 top-8 -translate-x-1/2 w-px h-full bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {event.title}
                    </p>
                    <p className="mt-0.5 text-sm text-gray-500 line-clamp-2">
                      {event.description}
                    </p>
                  </div>

                  {/* Timestamp */}
                  <div className="flex-shrink-0 flex items-center gap-1 text-xs text-gray-400 whitespace-nowrap">
                    <Clock className="w-3.5 h-3.5" />
                    {timeAgo(event.timestamp)}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>
    </DashboardShell>
  );
}
