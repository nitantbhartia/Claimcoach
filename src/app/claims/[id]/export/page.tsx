"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Download, Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Mock data for the export (in production, fetch from Supabase)
// ---------------------------------------------------------------------------

const MOCK_EXPORT = {
  vehicle: "2022 Honda Civic EX",
  insurer: "State Farm",
  claimNumber: "SF-2025-88431",
  accidentDate: "November 14, 2025",
  fairnessScore: 38,
  offerAmount: 4200,
  fairValue: 9981,
  gap: 5781,
  lineItems: [
    { category: "Vehicle Base Value", insurer: 4200, fair: 6800, diff: 2600 },
    { category: "Loss of Use / Rental", insurer: 0, fair: 720, diff: 720 },
    { category: "Diminished Value", insurer: 0, fair: 1800, diff: 1800 },
    { category: "Sales Tax on Replacement", insurer: 0, fair: 476, diff: 476 },
    { category: "Registration / Title", insurer: 0, fair: 185, diff: 185 },
  ],
  coverages: [
    { name: "Collision Coverage", limit: "$50,000 ($500 deductible)" },
    { name: "Comprehensive Coverage", limit: "$50,000 ($500 deductible)" },
    { name: "Bodily Injury Liability", limit: "$50,000/$100,000" },
    { name: "Property Damage Liability", limit: "$50,000" },
    { name: "UM/UIM", limit: "$50,000/$100,000" },
    { name: "Medical Payments", limit: "$5,000/person" },
  ],
  hiddenCoverages: [
    { name: "Rental Reimbursement", value: "Up to $900" },
    { name: "Diminished Value Claim", value: "$1,500-$4,000" },
    { name: "OEM Parts Requirement", value: "$300-$1,200" },
  ],
  recommendation:
    "The insurer's offer of $4,200 accounts for only 42% of your total fair compensation of $9,981. We strongly recommend submitting a formal counter-demand for $9,981 supported by comparable vehicle data and itemized damages.",
};

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function ExportPage() {
  const params = useParams<{ id: string }>();
  const claimId = params.id;
  const data = MOCK_EXPORT;

  function handlePrint() {
    window.print();
  }

  return (
    <div className="min-h-screen bg-panel">
      {/* Non-printable header */}
      <div className="print:hidden sticky top-0 z-40 bg-panel border-b border-black/10 px-4 sm:px-6 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href={`/claims/${claimId}`}
            className="flex items-center gap-1.5 text-body-sm text-[#4a555e] hover:text-[#4a555e]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to claim
          </Link>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="outline" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-1.5" />
              Print
            </Button>
            <Button size="sm" onClick={handlePrint}>
              <Download className="w-4 h-4 mr-1.5" />
              Save as PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Printable content */}
      <div className="max-w-3xl mx-auto px-6 py-10 print:px-0 print:py-0 print:max-w-none">
        {/* Header */}
        <div className="mb-8 print:mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-display-sm font-semibold text-black">
              ClaimCoach Analysis Report
            </h1>
            <span className="text-body-sm text-[#4a555e]/60 print:text-[#4a555e]">
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="border-b-2 border-frame pb-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-body-sm">
              <div>
                <p className="text-[#4a555e]">Vehicle</p>
                <p className="font-medium text-black">{data.vehicle}</p>
              </div>
              <div>
                <p className="text-[#4a555e]">Insurer</p>
                <p className="font-medium text-black">{data.insurer}</p>
              </div>
              <div>
                <p className="text-[#4a555e]">Claim #</p>
                <p className="font-medium text-black">{data.claimNumber}</p>
              </div>
              <div>
                <p className="text-[#4a555e]">Date of Loss</p>
                <p className="font-medium text-black">{data.accidentDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fairness Score Summary */}
        <section className="mb-8 print:mb-6">
          <h2 className="text-heading font-semibold text-black mb-4 border-b border-black/10 pb-2">
            Fairness Assessment
          </h2>
          <div className="grid grid-cols-3 gap-6 mb-4">
            <div className="text-center p-4 bg-panel-alt print:bg-white print:border print:border-black/10">
              <p className="text-caption text-[#4a555e] mb-1">Their Offer</p>
              <p className="text-heading-lg font-semibold text-black font-mono">
                {formatCurrency(data.offerAmount)}
              </p>
            </div>
            <div className="text-center p-4 bg-panel-alt print:bg-white print:border print:border-black/10">
              <p className="text-caption text-[#4a555e] mb-1">Fair Value</p>
              <p className="text-heading-lg font-semibold text-black font-mono">
                {formatCurrency(data.fairValue)}
              </p>
            </div>
            <div className="text-center p-4 bg-danger-50 print:bg-white print:border print:border-black/10">
              <p className="text-caption text-[#4a555e] mb-1">Gap</p>
              <p className="text-heading-lg font-semibold text-danger-600 font-mono">
                {formatCurrency(data.gap)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-full bg-black/10 rounded-full h-3 print:border print:border-black/20">
              <div
                className="h-3 rounded-full bg-danger-500"
                style={{ width: `${data.fairnessScore}%` }}
              />
            </div>
            <span className="text-body-sm font-semibold text-black flex-shrink-0">
              {data.fairnessScore}/100
            </span>
          </div>
          <p className="text-body-sm text-[#4a555e] leading-relaxed">
            {data.recommendation}
          </p>
        </section>

        {/* Line Item Breakdown */}
        <section className="mb-8 print:mb-6">
          <h2 className="text-heading font-semibold text-black mb-4 border-b border-black/10 pb-2">
            Line-Item Breakdown
          </h2>
          <table className="w-full text-body-sm">
            <thead>
              <tr className="border-b border-black/10">
                <th className="text-left py-2 font-medium text-[#4a555e]">Category</th>
                <th className="text-right py-2 font-medium text-[#4a555e]">Their Amount</th>
                <th className="text-right py-2 font-medium text-[#4a555e]">Fair Amount</th>
                <th className="text-right py-2 font-medium text-[#4a555e]">Difference</th>
              </tr>
            </thead>
            <tbody>
              {data.lineItems.map((item, i) => (
                <tr key={i} className="border-b border-black/5">
                  <td className="py-2.5 text-black">{item.category}</td>
                  <td className="py-2.5 text-right font-mono text-black">
                    {item.insurer === 0 ? "$0" : formatCurrency(item.insurer)}
                  </td>
                  <td className="py-2.5 text-right font-mono text-black">
                    {formatCurrency(item.fair)}
                  </td>
                  <td className="py-2.5 text-right font-mono text-danger-600">
                    {item.diff > 0 ? `-${formatCurrency(item.diff)}` : "\u2014"}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-black/20 font-semibold">
                <td className="py-2.5 text-black">Total</td>
                <td className="py-2.5 text-right font-mono text-black">
                  {formatCurrency(data.offerAmount)}
                </td>
                <td className="py-2.5 text-right font-mono text-black">
                  {formatCurrency(data.fairValue)}
                </td>
                <td className="py-2.5 text-right font-mono text-danger-600">
                  -{formatCurrency(data.gap)}
                </td>
              </tr>
            </tfoot>
          </table>
        </section>

        {/* Coverage Summary */}
        <section className="mb-8 print:mb-6">
          <h2 className="text-heading font-semibold text-black mb-4 border-b border-black/10 pb-2">
            Policy Coverage Summary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
            {data.coverages.map((cov, i) => (
              <div key={i} className="flex justify-between py-1.5 border-b border-black/5">
                <span className="text-body-sm text-[#4a555e]">{cov.name}</span>
                <span className="text-body-sm font-medium text-black">{cov.limit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Hidden Coverages */}
        <section className="mb-8 print:mb-6">
          <h2 className="text-heading font-semibold text-black mb-4 border-b border-black/10 pb-2">
            Coverages You May Be Missing
          </h2>
          <div className="space-y-2">
            {data.hiddenCoverages.map((cov, i) => (
              <div key={i} className="flex justify-between py-1.5 border-b border-black/5">
                <span className="text-body-sm text-[#4a555e]">{cov.name}</span>
                <span className="text-body-sm font-medium text-coral">{cov.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-black/10 pt-4 mt-8">
          <div className="flex items-center justify-between">
            <p className="text-caption text-[#4a555e]/60">
              Generated by ClaimCoach &mdash; claimcoach.app
            </p>
            <p className="text-caption text-[#4a555e]/60">
              For educational purposes only. Not legal advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
