"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, Car, Loader2 } from "lucide-react";
import { fmtCurrency } from "@/lib/tools/data";

/* -------------------------------------------------------------------------- */
/*  KBB link builder                                                           */
/* -------------------------------------------------------------------------- */

function buildKBBUrl(year: string, make: string, model: string): string {
  const m = make.toLowerCase().replace(/\s+/g, "-");
  const mod = model.toLowerCase().replace(/\s+/g, "-");
  return `https://www.kbb.com/${m}/${mod}/${year}/`;
}

function buildEdmundsUrl(year: string, make: string, model: string): string {
  const m = make.toLowerCase().replace(/\s+/g, "-");
  const mod = model.toLowerCase().replace(/\s+/g, "-");
  return `https://www.edmunds.com/${m}/${mod}/${year}/appraisal/`;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export function CarValueEstimator({
  mode = "full",
}: {
  mode?: "mini" | "full";
}) {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [mileage, setMileage] = useState("");
  const [condition, setCondition] = useState("Good");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState<{
    low: number;
    mid: number;
    high: number;
  } | null>(null);
  const [error, setError] = useState("");

  const canEstimate = year.length === 4 && make.trim() && model.trim();

  async function handleEstimate() {
    if (!canEstimate) return;
    setLoading(true);
    setError("");
    setEstimate(null);

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

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not get estimate.");
        return;
      }

      setEstimate({
        low: data.low_estimate,
        mid: data.mid_estimate,
        high: data.high_estimate,
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const CURRENT_YEAR = new Date().getFullYear();
  const YEARS = Array.from({ length: 30 }, (_, i) => String(CURRENT_YEAR - i));

  /* ---- Mini mode ---- */
  if (mode === "mini") {
    return (
      <div className="border border-black/10 bg-white p-5 my-6">
        <p className="text-body font-semibold text-black mb-4">
          What&apos;s your car actually worth?
        </p>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <label className="text-caption text-[#4a555e] mb-1 block">
              Year
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full border border-black/10 bg-white text-body-sm py-2 px-2 text-black focus:outline-none focus:border-coral"
            >
              <option value="">Year</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-caption text-[#4a555e] mb-1 block">
              Mileage
            </label>
            <input
              inputMode="numeric"
              placeholder="45,000"
              value={mileage}
              onChange={(e) =>
                setMileage(e.target.value.replace(/[^0-9,]/g, ""))
              }
              className="w-full border border-black/10 bg-white text-body-sm py-2 px-2 text-black focus:outline-none focus:border-coral"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <label className="text-caption text-[#4a555e] mb-1 block">
              Make
            </label>
            <input
              placeholder="Honda"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="w-full border border-black/10 bg-white text-body-sm py-2 px-2 text-black focus:outline-none focus:border-coral"
            />
          </div>
          <div>
            <label className="text-caption text-[#4a555e] mb-1 block">
              Model
            </label>
            <input
              placeholder="Accord"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full border border-black/10 bg-white text-body-sm py-2 px-2 text-black focus:outline-none focus:border-coral"
            />
          </div>
        </div>

        <button
          onClick={handleEstimate}
          disabled={!canEstimate || loading}
          className="w-full py-2.5 bg-black text-white text-body-sm font-medium hover:bg-coral hover:text-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-3"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Check value
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {error && (
          <p className="text-body-sm text-danger-600 mb-3">{error}</p>
        )}

        <AnimatePresence>
          {estimate && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="border border-coral/30 bg-coral/5 p-3 mb-3 overflow-hidden"
            >
              <p className="text-caption text-[#4a555e] mb-1">
                Estimated range:
              </p>
              <p className="text-heading font-semibold text-black font-mono">
                {fmtCurrency(estimate.low)} – {fmtCurrency(estimate.high)}
              </p>
              <p className="text-body-sm text-[#4a555e] mt-1">
                What did they offer? If it&apos;s less, you may be owed the
                difference.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <Link href="/claims/new">
          <button className="w-full py-2.5 border border-black text-black text-body-sm font-medium hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2">
            Compare to my offer
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    );
  }

  /* ---- Full mode ---- */
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-heading-lg sm:text-display-sm font-semibold text-black mb-2">
          What&apos;s My Car Worth?
        </h1>
        <p className="text-body text-[#4a555e]">
          Get an independent AI-powered estimate of your vehicle&apos;s fair
          market value. Compare it to your insurer&apos;s offer.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white border border-black/10 p-5 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-caption text-[#4a555e] mb-1 block">
              Year
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full border border-black/10 bg-white text-body py-2.5 px-3 text-black focus:outline-none focus:border-coral"
            >
              <option value="">Year</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-caption text-[#4a555e] mb-1 block">
              Make
            </label>
            <input
              placeholder="e.g., Honda"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="w-full border border-black/10 bg-white text-body py-2.5 px-3 text-black focus:outline-none focus:border-coral"
            />
          </div>
          <div>
            <label className="text-caption text-[#4a555e] mb-1 block">
              Model
            </label>
            <input
              placeholder="e.g., Accord"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full border border-black/10 bg-white text-body py-2.5 px-3 text-black focus:outline-none focus:border-coral"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-caption text-[#4a555e] mb-1 block">
              Mileage
            </label>
            <input
              inputMode="numeric"
              placeholder="45,000"
              value={mileage}
              onChange={(e) =>
                setMileage(e.target.value.replace(/[^0-9,]/g, ""))
              }
              className="w-full border border-black/10 bg-white text-body py-2.5 px-3 text-black focus:outline-none focus:border-coral"
            />
          </div>
          <div>
            <label className="text-caption text-[#4a555e] mb-1 block">
              Condition
            </label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full border border-black/10 bg-white text-body py-2.5 px-3 text-black focus:outline-none focus:border-coral"
            >
              <option>Excellent</option>
              <option>Good</option>
              <option>Fair</option>
              <option>Poor</option>
            </select>
          </div>
          <div>
            <label className="text-caption text-[#4a555e] mb-1 block">
              State (optional)
            </label>
            <input
              placeholder="e.g., California"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full border border-black/10 bg-white text-body py-2.5 px-3 text-black focus:outline-none focus:border-coral"
            />
          </div>
        </div>

        <button
          onClick={handleEstimate}
          disabled={!canEstimate || loading}
          className="w-full py-3 bg-black text-white text-body font-medium hover:bg-coral hover:text-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Estimating...
            </>
          ) : (
            <>
              <Car className="w-4 h-4" />
              Get Estimate
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-white border border-danger-500/30 p-4">
          <p className="text-body-sm text-danger-600">{error}</p>
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {estimate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
          >
            <div className="bg-white border border-black/10 p-5 sm:p-6">
              <p className="text-label uppercase text-[#4a555e]/60 mb-1">
                Estimated Fair Market Value
              </p>
              <p className="text-display-sm font-semibold text-black font-mono mb-4">
                {fmtCurrency(estimate.mid)}
              </p>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-caption text-[#4a555e]/60">Low</p>
                  <p className="text-body font-semibold text-black font-mono">
                    {fmtCurrency(estimate.low)}
                  </p>
                </div>
                <div className="flex-1 h-2 bg-black/5 relative">
                  <div
                    className="absolute h-full bg-coral"
                    style={{ left: "0%", right: "0%" }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full border-2 border-white"
                    style={{
                      left: `${
                        ((estimate.mid - estimate.low) /
                          (estimate.high - estimate.low || 1)) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <div className="text-right">
                  <p className="text-caption text-[#4a555e]/60">High</p>
                  <p className="text-body font-semibold text-black font-mono">
                    {fmtCurrency(estimate.high)}
                  </p>
                </div>
              </div>
            </div>

            {/* Cross-reference links */}
            <div className="bg-white border border-black/10 p-5 sm:p-6">
              <p className="text-body font-medium text-black mb-3">
                Cross-reference with independent sources:
              </p>
              <div className="space-y-2">
                {make && model && year && (
                  <>
                    <a
                      href={buildKBBUrl(year, make, model)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-2.5 px-4 border border-black/10 text-body-sm text-black hover:bg-black/[0.02] transition-colors"
                    >
                      <span>Kelley Blue Book (KBB)</span>
                      <ExternalLink className="w-4 h-4 text-[#4a555e]" />
                    </a>
                    <a
                      href={buildEdmundsUrl(year, make, model)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-2.5 px-4 border border-black/10 text-body-sm text-black hover:bg-black/[0.02] transition-colors"
                    >
                      <span>Edmunds Appraisal</span>
                      <ExternalLink className="w-4 h-4 text-[#4a555e]" />
                    </a>
                  </>
                )}
              </div>
              <p className="text-caption text-[#4a555e]/60 mt-3">
                If your insurer&apos;s value is significantly lower than these
                sources, you have strong grounds to dispute.
              </p>
            </div>

            {/* CTA */}
            <div className="border-2 border-black p-6 text-center">
              <p className="text-body font-medium text-black mb-1">
                Got a settlement offer?
              </p>
              <p className="text-body-sm text-[#4a555e] mb-4">
                We&apos;ll show you exactly what&apos;s missing — not just vehicle
                value, but sales tax, fees, and more.
              </p>
              <Link href="/claims/new">
                <button className="px-8 py-3 bg-black text-white font-medium hover:bg-coral hover:text-black transition-colors text-body flex items-center justify-center gap-2 mx-auto">
                  Analyze my full offer
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
