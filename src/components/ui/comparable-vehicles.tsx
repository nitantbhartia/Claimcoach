"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Comparable {
  title: string;
  price: number;
  mileage: number;
  condition: string;
  location: string;
  distance_miles: number;
  source: string;
  url: string | null;
  notes: string;
}

interface ComparablesData {
  fair_market_estimate: number;
  comparables: Comparable[];
  summary: string;
}

interface Props {
  vehicleYear: string | null;
  vehicleMake: string | null;
  vehicleModel: string | null;
  state: string | null;
  offerAmount?: number | null;
}

export function ComparableVehicles({ vehicleYear, vehicleMake, vehicleModel, state, offerAmount }: Props) {
  const [data, setData] = useState<ComparablesData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSearch = vehicleYear && vehicleMake && vehicleModel;

  async function handleSearch() {
    if (!canSearch) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/vehicles/comparables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleYear,
          vehicleMake,
          vehicleModel,
          state: state || undefined,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to find comparables");
      }

      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setLoading(false);
    }
  }

  if (!canSearch) return null;

  // Not yet searched
  if (!data && !loading && !error) {
    return (
      <div className="bg-panel border border-black/10 p-5">
        <h2 className="text-heading font-semibold text-black mb-2">
          Comparable Vehicles
        </h2>
        <p className="text-body-sm text-[#4a555e] mb-4">
          Pull real market listings to support your counter-argument. Shows similar vehicles listed for sale near you.
        </p>
        <Button size="sm" onClick={handleSearch}>
          Search Comparables
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-panel border border-black/10 overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-black/5 flex items-center justify-between">
        <h2 className="text-heading font-semibold text-black">
          Comparable Vehicles
        </h2>
        {data && (
          <Button size="sm" variant="outline" onClick={handleSearch} loading={loading}>
            Refresh
          </Button>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-6 h-6 animate-spin text-[#4a555e] mx-auto mb-3" />
            <p className="text-body-sm text-[#4a555e]">Searching vehicle listings...</p>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="p-4">
          <p className="text-body-sm text-warning-500">{error}</p>
        </div>
      )}

      {data && !loading && (
        <>
          {/* Fair market estimate banner */}
          <div className="px-4 sm:px-6 py-4 bg-panel-alt border-b border-black/5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-caption text-[#4a555e]/60">
                  Estimated Fair Market Value
                </p>
                <p className="text-heading-lg font-semibold text-black font-mono">
                  {formatCurrency(data.fair_market_estimate)}
                </p>
              </div>
              {offerAmount != null && offerAmount > 0 && (
                <div>
                  <p className="text-caption text-[#4a555e]/60">
                    vs. Insurer&apos;s Offer
                  </p>
                  {data.fair_market_estimate > offerAmount ? (
                    <p className="text-body font-semibold text-danger-600 font-mono">
                      {formatCurrency(data.fair_market_estimate - offerAmount)} below market
                    </p>
                  ) : (
                    <p className="text-body font-semibold text-success-600 font-mono">
                      At or above market value
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="px-4 sm:px-6 py-4 border-b border-black/5">
            <p className="text-body-sm text-[#4a555e] leading-relaxed">
              {data.summary}
            </p>
          </div>

          {/* Comparable listings */}
          <div className="divide-y divide-black/5">
            {data.comparables.map((comp, i) => (
              <div key={i} className="px-4 sm:px-6 py-4">
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <div className="min-w-0">
                    <p className="text-body-sm font-medium text-black truncate">
                      {comp.title}
                    </p>
                    <p className="text-caption text-[#4a555e]">
                      {comp.source} &middot; {comp.location}
                      {comp.distance_miles > 0 && ` (${comp.distance_miles} mi)`}
                    </p>
                  </div>
                  <p className="text-body font-semibold text-black font-mono whitespace-nowrap">
                    {formatCurrency(comp.price)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-caption text-[#4a555e]">
                  <span>{comp.mileage.toLocaleString()} miles</span>
                  <span>{comp.condition} condition</span>
                  {comp.notes && <span>{comp.notes}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="px-4 sm:px-6 py-3 bg-panel-alt border-t border-black/5">
            <p className="text-caption text-[#4a555e]/60">
              Based on {data.comparables.length} comparable listings.
              Include these in your demand letter to support your valuation.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
