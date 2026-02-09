"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { Loader2, ArrowRight } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

interface Adjustment {
  factor: string;
  label: string;
  impact: number;
  explanation: string;
}

interface Estimate {
  low_estimate: number;
  mid_estimate: number;
  high_estimate: number;
  adjustments: Adjustment[];
  base_value: number;
  sources_referenced: string[];
  confidence: string;
  notes: string;
}

/* -------------------------------------------------------------------------- */
/* US States for dropdown                                                      */
/* -------------------------------------------------------------------------- */

const US_STATES = [
  { code: "", label: "Select state..." },
  { code: "AL", label: "Alabama" }, { code: "AK", label: "Alaska" },
  { code: "AZ", label: "Arizona" }, { code: "AR", label: "Arkansas" },
  { code: "CA", label: "California" }, { code: "CO", label: "Colorado" },
  { code: "CT", label: "Connecticut" }, { code: "DE", label: "Delaware" },
  { code: "FL", label: "Florida" }, { code: "GA", label: "Georgia" },
  { code: "HI", label: "Hawaii" }, { code: "ID", label: "Idaho" },
  { code: "IL", label: "Illinois" }, { code: "IN", label: "Indiana" },
  { code: "IA", label: "Iowa" }, { code: "KS", label: "Kansas" },
  { code: "KY", label: "Kentucky" }, { code: "LA", label: "Louisiana" },
  { code: "ME", label: "Maine" }, { code: "MD", label: "Maryland" },
  { code: "MA", label: "Massachusetts" }, { code: "MI", label: "Michigan" },
  { code: "MN", label: "Minnesota" }, { code: "MS", label: "Mississippi" },
  { code: "MO", label: "Missouri" }, { code: "MT", label: "Montana" },
  { code: "NE", label: "Nebraska" }, { code: "NV", label: "Nevada" },
  { code: "NH", label: "New Hampshire" }, { code: "NJ", label: "New Jersey" },
  { code: "NM", label: "New Mexico" }, { code: "NY", label: "New York" },
  { code: "NC", label: "North Carolina" }, { code: "ND", label: "North Dakota" },
  { code: "OH", label: "Ohio" }, { code: "OK", label: "Oklahoma" },
  { code: "OR", label: "Oregon" }, { code: "PA", label: "Pennsylvania" },
  { code: "RI", label: "Rhode Island" }, { code: "SC", label: "South Carolina" },
  { code: "SD", label: "South Dakota" }, { code: "TN", label: "Tennessee" },
  { code: "TX", label: "Texas" }, { code: "UT", label: "Utah" },
  { code: "VT", label: "Vermont" }, { code: "VA", label: "Virginia" },
  { code: "WA", label: "Washington" }, { code: "WV", label: "West Virginia" },
  { code: "WI", label: "Wisconsin" }, { code: "WY", label: "Wyoming" },
  { code: "DC", label: "District of Columbia" },
];

const CONDITIONS = ["Excellent", "Good", "Fair", "Poor"];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => String(CURRENT_YEAR - i));

/* -------------------------------------------------------------------------- */
/* Page component                                                              */
/* -------------------------------------------------------------------------- */

export default function EstimatePage() {
  // Form state
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [mileage, setMileage] = useState("");
  const [condition, setCondition] = useState("Good");
  const [state, setState] = useState("");

  // Result state
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canEstimate = year && make.trim() && model.trim();

  const handleEstimate = useCallback(async () => {
    if (!canEstimate) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/estimate-value", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleYear: year,
          vehicleMake: make.trim(),
          vehicleModel: model.trim(),
          mileage: mileage ? parseInt(mileage.replace(/\D/g, "")) : undefined,
          condition,
          state: state || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Estimate failed");
      }

      const data = await res.json();
      setEstimate(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [year, make, model, mileage, condition, state, canEstimate]);

  return (
    <div className="flex flex-col min-h-screen bg-panel">
      <Header />

      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-5 sm:px-6 py-10 sm:py-16">
          {/* Header */}
          <h1 className="text-heading-lg sm:text-display-sm font-semibold text-black mb-2">
            What&apos;s your vehicle worth?
          </h1>
          <p className="text-body text-[#4a555e] mb-8">
            Get an instant fair market value estimate. Add details for a more accurate result — the estimate updates each time.
          </p>

          {/* Form */}
          <div className="bg-white border border-black/10 p-5 sm:p-6 space-y-4 mb-6">
            {/* Row 1: Year, Make, Model */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-caption text-[#4a555e] mb-1 block">Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full border border-black/10 bg-white text-body py-2.5 px-3 text-black focus:outline-none focus:border-black/30"
                >
                  <option value="">Year</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-caption text-[#4a555e] mb-1 block">Make</label>
                <Input
                  placeholder="Toyota"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                />
              </div>
              <div>
                <label className="text-caption text-[#4a555e] mb-1 block">Model</label>
                <Input
                  placeholder="Camry"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>
            </div>

            {/* Row 2: Mileage, Condition, State */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-caption text-[#4a555e] mb-1 block">Mileage</label>
                <Input
                  placeholder="45,000"
                  inputMode="numeric"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value.replace(/[^0-9,]/g, ""))}
                />
              </div>
              <div>
                <label className="text-caption text-[#4a555e] mb-1 block">Condition</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full border border-black/10 bg-white text-body py-2.5 px-3 text-black focus:outline-none focus:border-black/30"
                >
                  {CONDITIONS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-caption text-[#4a555e] mb-1 block">State</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full border border-black/10 bg-white text-body py-2.5 px-3 text-black focus:outline-none focus:border-black/30"
                >
                  {US_STATES.map((s) => (
                    <option key={s.code} value={s.code}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={handleEstimate}
              loading={loading}
              disabled={!canEstimate}
            >
              {estimate ? "Update Estimate" : "Get Estimate"}
            </Button>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-white border border-black/10 p-4 mb-6">
              <p className="text-body-sm text-warning-500">{error}</p>
            </div>
          )}

          {/* Loading */}
          {loading && !estimate && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-[#4a555e]" />
            </div>
          )}

          {/* Results */}
          {estimate && (
            <div className="space-y-4">
              {/* Value range */}
              <div className="bg-white border border-black/10 p-5 sm:p-6">
                <p className="text-caption text-[#4a555e]/60 mb-1">
                  Estimated Fair Market Value
                </p>
                <p className="text-display-sm font-semibold text-black font-mono mb-4">
                  {formatCurrency(estimate.mid_estimate)}
                </p>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-caption text-[#4a555e]/60">Low</p>
                    <p className="text-body font-semibold text-black font-mono">
                      {formatCurrency(estimate.low_estimate)}
                    </p>
                  </div>
                  {/* Visual range bar */}
                  <div className="flex-1 h-2 bg-black/5 relative">
                    <div
                      className="absolute h-full bg-coral"
                      style={{
                        left: "0%",
                        right: "0%",
                      }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full border-2 border-white"
                      style={{
                        left: `${((estimate.mid_estimate - estimate.low_estimate) / (estimate.high_estimate - estimate.low_estimate)) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-caption text-[#4a555e]/60">High</p>
                    <p className="text-body font-semibold text-black font-mono">
                      {formatCurrency(estimate.high_estimate)}
                    </p>
                  </div>
                </div>
                <p className="text-caption text-[#4a555e] mt-3">
                  Confidence: {estimate.confidence} &middot; Sources: {estimate.sources_referenced.join(", ")}
                </p>
              </div>

              {/* Adjustments breakdown */}
              {estimate.adjustments.length > 0 && (
                <div className="bg-white border border-black/10 overflow-hidden">
                  <div className="px-5 py-3 border-b border-black/5">
                    <h2 className="text-body-sm font-semibold text-black">
                      Value Adjustments
                    </h2>
                  </div>

                  <div className="px-5 py-3 border-b border-black/5 flex justify-between">
                    <span className="text-body-sm text-[#4a555e]">Base value</span>
                    <span className="text-body-sm font-mono font-semibold text-black">
                      {formatCurrency(estimate.base_value)}
                    </span>
                  </div>

                  {estimate.adjustments.map((adj, i) => (
                    <div key={i} className="px-5 py-3 border-b border-black/5 last:border-b-0">
                      <div className="flex justify-between mb-0.5">
                        <span className="text-body-sm text-black">{adj.label}</span>
                        <span className={`text-body-sm font-mono font-semibold ${adj.impact >= 0 ? "text-success-600" : "text-danger-600"}`}>
                          {adj.impact >= 0 ? "+" : ""}{formatCurrency(adj.impact)}
                        </span>
                      </div>
                      <p className="text-caption text-[#4a555e]">{adj.explanation}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Notes */}
              {estimate.notes && (
                <p className="text-caption text-[#4a555e]/60 leading-relaxed">
                  {estimate.notes}
                </p>
              )}

              {/* CTA to start a real claim */}
              <div className="bg-white border border-black/10 p-5 text-center">
                <p className="text-body text-[#4a555e] mb-3">
                  Got a settlement offer? We&apos;ll show you exactly what&apos;s missing.
                </p>
                <Link href="/claims/new">
                  <Button className="gap-2">
                    Start Full Audit
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
