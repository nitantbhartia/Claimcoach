import { ClaimStatus } from "@/types";

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getStatusLabel(status: ClaimStatus): string {
  const labels: Record<ClaimStatus, string> = {
    setup: "Setting Up",
    documenting: "Documenting",
    policy_review: "Policy Review",
    filed: "Filed with Insurer",
    offer_received: "Offer Received",
    negotiating: "Negotiating",
    escalating: "Escalating",
    resolved: "Resolved",
  };
  return labels[status];
}

export function getStatusColor(status: ClaimStatus): string {
  const colors: Record<ClaimStatus, string> = {
    setup: "bg-slate-100 text-slate-700",
    documenting: "bg-blue-100 text-blue-700",
    policy_review: "bg-purple-100 text-purple-700",
    filed: "bg-yellow-100 text-yellow-700",
    offer_received: "bg-orange-100 text-orange-700",
    negotiating: "bg-red-100 text-red-700",
    escalating: "bg-red-200 text-red-800",
    resolved: "bg-green-100 text-green-700",
  };
  return colors[status];
}

export function getFairnessColor(score: number): string {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
}

export function getFairnessLabel(score: number): string {
  if (score >= 80) return "Fair Offer";
  if (score >= 60) return "Borderline";
  return "Below Fair Value";
}

export function getProgressPercentage(status: ClaimStatus): number {
  const progress: Record<ClaimStatus, number> = {
    setup: 10,
    documenting: 25,
    policy_review: 40,
    filed: 55,
    offer_received: 65,
    negotiating: 80,
    escalating: 90,
    resolved: 100,
  };
  return progress[status];
}
