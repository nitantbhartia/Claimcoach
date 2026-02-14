"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, AlertTriangle, Info } from "lucide-react";
import {
  STATE_NAMES,
  STATE_SALES_TAX,
  calculateSalesTax,
  fmtCurrency,
  fmtCurrencyExact,
} from "@/lib/tools/data";

/* -------------------------------------------------------------------------- */
/*  State-specific FAQ data                                                    */
/* -------------------------------------------------------------------------- */

const FAQ_ITEMS = [
  {
    q: "Is sales tax always included in total loss settlements?",
    a: "In most states, yes — insurers are required to reimburse sales tax as part of fair market value. However, some states require you to purchase a replacement vehicle first and submit proof. Check your state's specific rules above.",
  },
  {
    q: "What if I'm keeping the totaled vehicle?",
    a: "If you retain the salvage, sales tax is typically calculated on the settlement amount minus the salvage value. Toggle the \"Keeping the vehicle?\" option above to see the adjusted calculation.",
  },
  {
    q: "Does this apply to third-party claims?",
    a: "Yes. Whether you're filing through your own insurer (first-party) or the at-fault driver's insurer (third-party), you're entitled to be made whole — which includes sales tax on a replacement vehicle.",
  },
  {
    q: "What if my insurer refuses to pay sales tax?",
    a: "Document your request in writing and cite your state's regulations. If they still refuse, file a complaint with your state's Department of Insurance. ClaimCoach can generate a demand letter with the correct citations for your state.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export function SalesTaxCalculator({ mode = "full" }: { mode?: "mini" | "full" }) {
  const [offer, setOffer] = useState("");
  const [state, setState] = useState("");
  const [keepingVehicle, setKeepingVehicle] = useState(false);
  const [salvageValue, setSalvageValue] = useState("");
  const [calculated, setCalculated] = useState(false);

  const parsedOffer = parseFloat(offer.replace(/[^0-9.]/g, ""));
  const parsedSalvage = parseFloat(salvageValue.replace(/[^0-9.]/g, "")) || 0;
  const isValid = !isNaN(parsedOffer) && parsedOffer > 0 && state !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    return calculateSalesTax(parsedOffer, state, keepingVehicle, parsedSalvage);
  }, [parsedOffer, state, keepingVehicle, parsedSalvage, isValid]);

  const stateData = state ? STATE_SALES_TAX[state] : null;

  // Auto-calculate for mini mode
  const showResult = mode === "mini" ? result !== null : calculated && result !== null;

  function handleCalculate() {
    if (!isValid) return;
    setCalculated(true);
  }

  /* ---- Mini mode ---- */
  if (mode === "mini") {
    return (
      <div className="border border-black/10 bg-white p-5 my-6">
        <p className="text-body font-semibold text-black mb-4">
          How much sales tax are you owed?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div>
            <label className="text-caption text-[#4a555e] mb-1 block">
              Your settlement offer
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="$ 14,500"
              value={offer}
              onChange={(e) => setOffer(e.target.value.replace(/[^0-9.,]/g, ""))}
              className="w-full border border-black/10 bg-white text-body py-2.5 px-3 text-black focus:outline-none focus:border-coral"
            />
          </div>
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
        </div>

        <AnimatePresence>
          {showResult && result && result.tax_owed > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border border-coral/30 bg-coral/5 p-4 mb-4 overflow-hidden"
            >
              <p className="text-caption text-[#4a555e] mb-1">
                {state} sales tax ({result.tax_rate_percent}% avg):
              </p>
              <p className="text-heading-lg font-semibold text-black font-mono">
                You&apos;re owed: {fmtCurrencyExact(result.tax_owed)}
              </p>
              <p className="text-body-sm text-[#4a555e] mt-2">
                If this wasn&apos;t in your offer, your insurer owes you this on
                top of the settlement amount.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {showResult && result && result.tax_owed === 0 && stateData?.note && (
          <div className="border border-black/10 bg-black/5 p-3 mb-4">
            <p className="text-body-sm text-[#4a555e]">
              <Info className="w-4 h-4 inline mr-1" />
              {stateData.note}
            </p>
          </div>
        )}

        <p className="text-body-sm text-[#4a555e] mb-3">
          Sales tax is just one of 6-8 line items most offers miss.
        </p>

        <Link href="/claims/new">
          <button className="w-full py-2.5 bg-black text-white text-body-sm font-medium hover:bg-coral hover:text-black transition-colors flex items-center justify-center gap-2">
            See all missing line items
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
          Sales Tax Recovery Calculator
        </h1>
        <p className="text-body text-[#4a555e]">
          See what your insurer owes you in sales tax on a replacement vehicle.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white border border-black/10 p-5 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-caption text-[#4a555e] mb-1 block">
              Your settlement offer
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="$ 14,500"
              value={offer}
              onChange={(e) => setOffer(e.target.value.replace(/[^0-9.,]/g, ""))}
              className="w-full border border-black/10 bg-white text-body py-2.5 px-3 text-black focus:outline-none focus:border-coral"
            />
          </div>
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
        </div>

        {/* Keeping vehicle toggle */}
        <div>
          <label className="text-caption text-[#4a555e] mb-2 block">
            Keeping the vehicle?
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setKeepingVehicle(false)}
              className={`flex-1 py-2 px-4 border text-body-sm font-medium transition-all ${
                !keepingVehicle
                  ? "border-coral bg-coral/5 text-black"
                  : "border-black/10 text-[#4a555e] hover:border-black/20"
              }`}
            >
              No
            </button>
            <button
              type="button"
              onClick={() => setKeepingVehicle(true)}
              className={`flex-1 py-2 px-4 border text-body-sm font-medium transition-all ${
                keepingVehicle
                  ? "border-coral bg-coral/5 text-black"
                  : "border-black/10 text-[#4a555e] hover:border-black/20"
              }`}
            >
              Yes
            </button>
          </div>
        </div>

        {keepingVehicle && (
          <div>
            <label className="text-caption text-[#4a555e] mb-1 block">
              Salvage/retention value (if known)
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="$ 0"
              value={salvageValue}
              onChange={(e) =>
                setSalvageValue(e.target.value.replace(/[^0-9.,]/g, ""))
              }
              className="w-full border border-black/10 bg-white text-body py-2.5 px-3 text-black focus:outline-none focus:border-coral"
            />
          </div>
        )}

        <button
          onClick={handleCalculate}
          disabled={!isValid}
          className="w-full py-3 bg-black text-white text-body font-medium hover:bg-coral hover:text-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          Calculate
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Results */}
      <AnimatePresence>
        {showResult && result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
          >
            {/* Tax breakdown */}
            <div className="bg-white border border-black/10 p-5 sm:p-6">
              <p className="text-label uppercase text-[#4a555e]/60 mb-1">
                Your Results
              </p>

              <div className="space-y-2 mt-4">
                <div className="flex justify-between text-body-sm">
                  <span className="text-[#4a555e]">State sales tax rate:</span>
                  <span className="font-mono font-semibold text-black">
                    {result.state_rate_percent}%
                  </span>
                </div>
                {result.tax_rate_percent !== result.state_rate_percent && (
                  <div className="flex justify-between text-body-sm">
                    <span className="text-[#4a555e]">
                      Avg combined rate (incl. local):
                    </span>
                    <span className="font-mono font-semibold text-black">
                      {result.tax_rate_percent}%
                    </span>
                  </div>
                )}
                {keepingVehicle && parsedSalvage > 0 && (
                  <div className="flex justify-between text-body-sm">
                    <span className="text-[#4a555e]">Taxable amount:</span>
                    <span className="font-mono font-semibold text-black">
                      {fmtCurrency(result.taxable_amount)}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-black/10 mt-4 pt-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-body font-medium text-black">
                    Sales tax owed:
                  </span>
                  <span className="text-display-sm font-semibold text-black font-mono">
                    {fmtCurrencyExact(result.tax_owed)}
                  </span>
                </div>
              </div>
            </div>

            {/* Warning callout */}
            {result.tax_owed > 0 && (
              <div className="border-2 border-coral/40 bg-coral/5 p-5">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-body font-medium text-black">
                      If your settlement offer does NOT include this amount,
                      your insurer is shortchanging you by{" "}
                      {fmtCurrency(result.tax_owed)}.
                    </p>
                    {stateData?.note && (
                      <p className="text-body-sm text-[#4a555e] mt-2">
                        {state} note: {stateData.note}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Other missing items teaser */}
            <div className="bg-white border border-black/10 p-5 sm:p-6">
              <p className="text-body font-medium text-black mb-3">
                But sales tax is just ONE of the line items insurers miss. Most
                offers are also missing:
              </p>
              <ul className="space-y-2 text-body-sm text-[#4a555e]">
                <li className="flex justify-between">
                  <span>Title &amp; registration fees</span>
                  <span className="font-mono">$200 – $500</span>
                </li>
                <li className="flex justify-between">
                  <span>Comparable vehicle adjustments</span>
                  <span className="font-mono">$500 – $2,000</span>
                </li>
                <li className="flex justify-between">
                  <span>Dealer documentation fees</span>
                  <span className="font-mono">$300 – $800</span>
                </li>
                <li className="flex justify-between">
                  <span>Loss of use compensation</span>
                  <span className="font-mono">$200 – $1,500</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="border-2 border-black p-6 text-center">
              <p className="text-body font-medium text-black mb-1">
                Get your complete analysis.
              </p>
              <p className="text-body-sm text-[#4a555e] mb-4">
                See every line item your offer is missing.
              </p>
              <Link href="/claims/new">
                <button className="px-8 py-3 bg-black text-white font-medium hover:bg-coral hover:text-black transition-colors text-body flex items-center justify-center gap-2 mx-auto">
                  Analyze my full offer — free, 5 minutes
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-heading font-semibold text-black mb-4">
                FAQ
              </h2>
              {FAQ_ITEMS.map((item) => (
                <details
                  key={item.q}
                  className="border-b border-black/10 group"
                >
                  <summary className="w-full text-left py-4 text-body font-medium cursor-pointer flex justify-between items-center text-black">
                    <span>{item.q}</span>
                    <span className="text-[#4a555e] group-open:rotate-45 transition-transform duration-200 ml-4 flex-shrink-0">
                      +
                    </span>
                  </summary>
                  <div className="pb-4 text-body-sm text-[#4a555e]">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
