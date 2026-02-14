"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertTriangle, Info, Scale } from "lucide-react";
import {
  STATE_NAMES,
  STANDARD_CHECKLIST_ITEMS,
  STATE_SPECIFIC_ITEMS,
  calculateChecklistResults,
  fmtCurrency,
} from "@/lib/tools/data";

export function SettlementChecklist({ mode = "full" }: { mode?: "mini" | "full" }) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [state, setState] = useState("");
  const [offer, setOffer] = useState("");

  const parsedOffer = parseFloat(offer.replace(/[^0-9.]/g, ""));
  const hasOffer = !isNaN(parsedOffer) && parsedOffer > 0;

  function toggleItem(id: string) {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  const stateItems = state ? STATE_SPECIFIC_ITEMS[state] ?? [] : [];
  const allItems = [...STANDARD_CHECKLIST_ITEMS, ...stateItems];

  const result = useMemo(() => {
    if (!hasOffer) return null;
    return calculateChecklistResults(
      checkedItems,
      state || "California",
      parsedOffer
    );
  }, [checkedItems, state, parsedOffer, hasOffer]);

  const uncheckedCount = allItems.length - checkedItems.length;

  /* ---- Mini mode ---- */
  if (mode === "mini") {
    const miniItems = STANDARD_CHECKLIST_ITEMS;
    const miniUnchecked = miniItems.filter(
      (i) => !checkedItems.includes(i.id)
    );
    const miniLow = miniUnchecked.reduce((s, i) => s + i.range_low, 0);
    const miniHigh = miniUnchecked.reduce((s, i) => s + i.range_high, 0);

    return (
      <div className="border border-black/10 bg-white p-5 my-6">
        <p className="text-body font-semibold text-black mb-4">
          Does your offer include all of these?
        </p>

        <p className="text-caption text-[#4a555e] mb-3">
          Check what&apos;s in your settlement:
        </p>

        <div className="space-y-2 mb-4">
          {miniItems.map((item) => {
            const isChecked = checkedItems.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleItem(item.id)}
                className={`w-full flex items-center justify-between text-left py-2 px-3 border transition-all text-body-sm ${
                  isChecked
                    ? "border-emerald-200 bg-emerald-50 text-black"
                    : "border-black/10 text-[#4a555e] hover:border-black/20"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 ${
                      isChecked
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-black/20"
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-3 h-3" />}
                  </span>
                  {item.label}
                </span>
                <span className="font-mono text-caption ml-2 flex-shrink-0">
                  {item.range_low > 0
                    ? `$${item.range_low.toLocaleString()}–$${item.range_high.toLocaleString()}`
                    : "varies"}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {miniUnchecked.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border border-coral/30 bg-coral/5 p-3 mb-4"
            >
              <p className="text-body-sm font-medium text-black">
                {miniUnchecked.length} unchecked item
                {miniUnchecked.length !== 1 ? "s" : ""}
              </p>
              {miniLow > 0 && (
                <p className="text-body-sm text-[#4a555e]">
                  You could be owed:{" "}
                  <span className="font-mono font-semibold text-black">
                    {fmtCurrency(miniLow)} – {fmtCurrency(miniHigh)}
                  </span>
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <Link href="/tools/settlement-checklist">
          <button className="w-full py-2.5 bg-black text-white text-body-sm font-medium hover:bg-coral hover:text-black transition-colors flex items-center justify-center gap-2">
            Get your exact breakdown
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    );
  }

  /* ---- Full mode ---- */
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-heading-lg sm:text-display-sm font-semibold text-black mb-2">
          Total Loss Settlement Checklist
        </h1>
        <p className="text-body text-[#4a555e]">
          Check every line item that&apos;s included in your offer. We&apos;ll
          show you what&apos;s missing and how much it could be worth.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-black/10 p-5 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-caption text-[#4a555e] mb-1 block">
              Your state
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full border border-black/10 bg-white text-body py-2.5 px-3 text-black focus:outline-none focus:border-coral"
            >
              <option value="">Select state...</option>
              {STATE_NAMES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-caption text-[#4a555e] mb-1 block">
              Offer amount
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="$ 12,000"
              value={offer}
              onChange={(e) => setOffer(e.target.value.replace(/[^0-9.,]/g, ""))}
              className="w-full border border-black/10 bg-white text-body py-2.5 px-3 text-black focus:outline-none focus:border-coral"
            />
          </div>
        </div>
      </div>

      {/* Standard items */}
      <div className="bg-white border border-black/10 overflow-hidden">
        <div className="px-5 py-3 border-b border-black/5">
          <h2 className="text-body font-semibold text-black flex items-center gap-2">
            <Scale className="w-4 h-4" />
            Required Line Items
          </h2>
        </div>
        {STANDARD_CHECKLIST_ITEMS.map((item) => {
          const isChecked = checkedItems.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleItem(item.id)}
              className={`w-full text-left px-5 py-4 border-b border-black/5 last:border-b-0 transition-colors ${
                isChecked ? "bg-emerald-50/50" : "hover:bg-black/[0.02]"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    isChecked
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-black/20"
                  }`}
                >
                  {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="text-body font-medium text-black">
                      {item.label}
                    </span>
                    <span className="text-caption font-mono text-[#4a555e] ml-3 flex-shrink-0">
                      {item.range_low > 0
                        ? `$${item.range_low.toLocaleString()}–$${item.range_high.toLocaleString()}`
                        : "varies"}
                    </span>
                  </div>
                  <p className="text-body-sm text-[#4a555e] mt-1">
                    {item.description}
                  </p>
                  {isChecked && (
                    <p className="text-body-sm text-emerald-600 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Included — but is the amount accurate?
                    </p>
                  )}
                  {!isChecked && (
                    <p className="text-body-sm text-coral mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      MISSING — Estimated value:{" "}
                      {item.range_low > 0
                        ? `$${item.range_low.toLocaleString()}–$${item.range_high.toLocaleString()}`
                        : "varies by situation"}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* State-specific items */}
      {state && stateItems.length > 0 && (
        <div className="bg-white border border-black/10 overflow-hidden">
          <div className="px-5 py-3 border-b border-black/5">
            <h2 className="text-body font-semibold text-black">
              {state}-Specific Items
            </h2>
          </div>
          {stateItems.map((item) => {
            const isChecked = checkedItems.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleItem(item.id)}
                className={`w-full text-left px-5 py-4 border-b border-black/5 last:border-b-0 transition-colors ${
                  isChecked ? "bg-emerald-50/50" : "hover:bg-black/[0.02]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      isChecked
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-black/20"
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-body font-medium text-black">
                      {item.label}
                    </span>
                    <p className="text-body-sm text-[#4a555e] mt-1">
                      {item.description}
                    </p>
                    {item.statute && (
                      <p className="text-caption text-[#4a555e]/60 mt-1 font-mono">
                        {item.statute}
                      </p>
                    )}
                    {item.is_right_not_dollar && (
                      <p className="text-body-sm text-blue-600 mt-1 flex items-center gap-1">
                        <Info className="w-3.5 h-3.5" />
                        Not a dollar amount — a right you need to know
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Results summary */}
      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-2 border-black p-5 sm:p-6"
        >
          <p className="text-label uppercase text-[#4a555e]/60 mb-4">
            Your Results
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-emerald-50 border border-emerald-200">
              <p className="text-display-sm font-semibold text-emerald-700 font-mono">
                {result.checked_count}
              </p>
              <p className="text-caption text-emerald-600">Included</p>
            </div>
            <div className="text-center p-3 bg-coral/5 border border-coral/30">
              <p className="text-display-sm font-semibold text-black font-mono">
                {result.missing_count}
              </p>
              <p className="text-caption text-coral">Missing</p>
            </div>
          </div>

          {result.estimated_gap_low > 0 && (
            <div className="text-center py-4 border-t border-black/10">
              <p className="text-body-sm text-[#4a555e]">Estimated gap:</p>
              <p className="text-heading-lg font-semibold text-black font-mono">
                {fmtCurrency(result.estimated_gap_low)}
                {result.estimated_gap_high !== result.estimated_gap_low &&
                  ` – ${fmtCurrency(result.estimated_gap_high)}`}
              </p>
              <p className="text-body-sm text-[#4a555e] mt-1">
                Your {fmtCurrency(parsedOffer)} offer should be{" "}
                <span className="font-semibold text-black">
                  {fmtCurrency(result.adjusted_offer_low)}
                  {result.adjusted_offer_high !== result.adjusted_offer_low &&
                    ` – ${fmtCurrency(result.adjusted_offer_high)}`}
                </span>
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* CTA */}
      <div className="border-2 border-black p-6 text-center">
        <p className="text-body font-medium text-black mb-1">
          Get exact dollar amounts for each missing item.
        </p>
        <p className="text-body-sm text-[#4a555e] mb-4">
          ClaimCoach analyzes your specific offer against{" "}
          {state || "your state's"} regulations and market data.
        </p>
        <Link href="/claims/new">
          <button className="px-8 py-3 bg-black text-white font-medium hover:bg-coral hover:text-black transition-colors text-body flex items-center justify-center gap-2 mx-auto">
            Analyze my offer — free, 5 minutes
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </div>
  );
}
