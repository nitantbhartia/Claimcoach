"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";

interface OutcomeReporterProps {
  claimId: string;
  offerAmount: number | null;
  finalSettlement: number | null;
  resolvedAt: string | null;
  onUpdate: (settlement: number, resolvedAt: string) => void;
}

export function OutcomeReporter({
  claimId,
  offerAmount,
  finalSettlement,
  resolvedAt,
  onUpdate,
}: OutcomeReporterProps) {
  const [amount, setAmount] = useState(
    finalSettlement ? String(finalSettlement) : ""
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(!!finalSettlement);

  const handleSubmit = useCallback(async () => {
    const parsed = parseFloat(amount.replace(/[^0-9.]/g, ""));
    if (isNaN(parsed) || parsed <= 0) {
      setError("Enter a valid settlement amount");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const now = new Date().toISOString();
      const res = await fetch(`/api/claims/${claimId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          final_settlement: parsed,
          resolved_at: now,
          status: "resolved",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save outcome");
      }

      setSubmitted(true);
      onUpdate(parsed, now);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }, [amount, claimId, onUpdate]);

  // Already submitted — show the outcome summary
  if (submitted && finalSettlement) {
    const gain = offerAmount ? finalSettlement - offerAmount : null;
    const gainPct = offerAmount && offerAmount > 0
      ? ((finalSettlement - offerAmount) / offerAmount) * 100
      : null;

    return (
      <div className="bg-panel border border-black/10 p-5">
        <h2 className="text-body-sm font-semibold text-black mb-4">
          Claim Outcome
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-caption text-[#4a555e] mb-1">Final Settlement</p>
            <p className="text-heading-lg font-semibold text-black font-mono">
              {formatCurrency(finalSettlement)}
            </p>
          </div>
          {offerAmount != null && (
            <div>
              <p className="text-caption text-[#4a555e] mb-1">Original Offer</p>
              <p className="text-heading-lg text-[#4a555e] font-mono">
                {formatCurrency(offerAmount)}
              </p>
            </div>
          )}
        </div>

        {gain != null && gainPct != null && (
          <div className={`border-t border-black/10 pt-3 ${gain > 0 ? "" : ""}`}>
            <div className="flex items-baseline justify-between">
              <span className="text-body-sm text-[#4a555e]">
                {gain > 0 ? "Extra money recovered" : "Settlement vs. offer"}
              </span>
              <span
                className={`text-body font-semibold font-mono ${
                  gain > 0 ? "text-green-600" : gain < 0 ? "text-red-600" : "text-black"
                }`}
              >
                {gain > 0 ? "+" : ""}
                {formatCurrency(gain)} ({gain > 0 ? "+" : ""}
                {gainPct.toFixed(0)}%)
              </span>
            </div>
          </div>
        )}

        {resolvedAt && (
          <p className="text-caption text-[#4a555e] mt-3">
            Resolved{" "}
            {new Date(resolvedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
      </div>
    );
  }

  // Input form — user hasn't reported outcome yet
  return (
    <div className="bg-panel border border-black/10 p-5">
      <h2 className="text-body-sm font-semibold text-black mb-1">
        Report Your Outcome
      </h2>
      <p className="text-caption text-[#4a555e] mb-4">
        How much did you actually receive? This helps us improve our estimates
        and show other users what&apos;s possible.
      </p>

      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            placeholder="$15,000"
            inputMode="decimal"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value.replace(/[^0-9.,]/g, ""));
              setError(null);
            }}
          />
        </div>
        <Button onClick={handleSubmit} loading={saving} disabled={!amount.trim()}>
          Save Outcome
        </Button>
      </div>

      {error && (
        <p className="text-caption text-red-600 mt-2">{error}</p>
      )}

      {offerAmount != null && amount && (
        <p className="text-caption text-[#4a555e] mt-2">
          {(() => {
            const parsed = parseFloat(amount.replace(/[^0-9.]/g, ""));
            if (isNaN(parsed)) return null;
            const diff = parsed - offerAmount;
            if (diff > 0)
              return `That\u2019s ${formatCurrency(diff)} more than the original offer of ${formatCurrency(offerAmount)}.`;
            if (diff < 0)
              return `That\u2019s ${formatCurrency(Math.abs(diff))} less than the original offer of ${formatCurrency(offerAmount)}.`;
            return `Same as the original offer of ${formatCurrency(offerAmount)}.`;
          })()}
        </p>
      )}
    </div>
  );
}
