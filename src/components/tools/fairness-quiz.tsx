"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, AlertTriangle, CheckCircle2, ChevronRight } from "lucide-react";
import {
  STATE_NAMES,
  calculateFairnessScore,
  fmtCurrency,
  type FairnessResult,
} from "@/lib/tools/data";

const TOTAL_QUESTIONS = 5;

const INCLUDED_ITEM_OPTIONS = [
  { id: "title_registration", label: "Title and registration fees" },
  { id: "comparable_adjustments", label: "Comparable vehicle adjustments" },
  { id: "dealer_fees", label: "Dealer fees" },
  { id: "loss_of_use", label: "Loss of use / rental gap" },
  { id: "aftermarket", label: "Aftermarket upgrades" },
];

/* -------------------------------------------------------------------------- */
/*  Score gauge                                                                */
/* -------------------------------------------------------------------------- */

function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 80
      ? "bg-emerald-500"
      : score >= 60
      ? "bg-gold-400"
      : score >= 40
      ? "bg-coral"
      : "bg-danger-500";

  return (
    <div className="w-full h-4 bg-black/10 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`h-full ${color}`}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export function FairnessQuiz({ mode = "full" }: { mode?: "mini" | "full" }) {
  const [step, setStep] = useState(1);
  const [state, setState] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [offer, setOffer] = useState("");
  const [includesSalesTax, setIncludesSalesTax] = useState<boolean | null>(null);
  const [includedItems, setIncludedItems] = useState<string[]>([]);
  const [result, setResult] = useState<FairnessResult | null>(null);

  const parsedOffer = parseFloat(offer.replace(/[^0-9.]/g, ""));

  function toggleItem(id: string) {
    setIncludedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  function canAdvance(): boolean {
    switch (step) {
      case 1:
        return state !== "";
      case 2:
        return vehicleYear !== "" && vehicleMake.trim() !== "" && vehicleModel.trim() !== "";
      case 3:
        return !isNaN(parsedOffer) && parsedOffer > 0;
      case 4:
        return includesSalesTax !== null;
      case 5:
        return true;
      default:
        return false;
    }
  }

  function handleNext() {
    if (!canAdvance()) return;
    if (step < TOTAL_QUESTIONS) {
      setStep((s) => s + 1);
    } else {
      // Calculate result
      const r = calculateFairnessScore(
        state,
        parsedOffer,
        includesSalesTax,
        includedItems
      );
      setResult(r);
      setStep(TOTAL_QUESTIONS + 1);
    }
  }

  function handleBack() {
    if (step > 1) setStep((s) => s - 1);
  }

  function restart() {
    setStep(1);
    setResult(null);
    setState("");
    setVehicleYear("");
    setVehicleMake("");
    setVehicleModel("");
    setOffer("");
    setIncludesSalesTax(null);
    setIncludedItems([]);
  }

  /* ---- Mini mode ---- */
  if (mode === "mini") {
    // Compact inline quiz
    if (result) {
      return (
        <div className="border border-black/10 bg-white p-5 my-6">
          <p className="text-body font-semibold text-black mb-3">
            Your Offer Score: {result.score} / 100
          </p>
          <ScoreBar score={result.score} />
          <p className="text-body-sm text-[#4a555e] mt-3">{result.severity}</p>
          {result.estimated_gap_low > 0 && (
            <p className="text-body-sm text-[#4a555e] mt-1">
              Estimated gap:{" "}
              <span className="font-mono font-semibold text-black">
                {fmtCurrency(result.estimated_gap_low)} –{" "}
                {fmtCurrency(result.estimated_gap_high)}
              </span>
            </p>
          )}
          <div className="flex gap-2 mt-4">
            <Link href="/claims/new" className="flex-1">
              <button className="w-full py-2.5 bg-black text-white text-body-sm font-medium hover:bg-coral hover:text-black transition-colors flex items-center justify-center gap-2">
                Get my full analysis
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <button
              onClick={restart}
              className="px-3 py-2.5 border border-black/10 text-body-sm text-[#4a555e] hover:bg-black/5 transition-colors"
            >
              Redo
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="border border-black/10 bg-white p-5 my-6">
        <p className="text-body font-semibold text-black mb-1">
          Is my insurance offer fair?
        </p>
        <p className="text-body-sm text-[#4a555e] mb-4">
          5 quick questions. Get your score instantly.
        </p>

        {/* Progress */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: TOTAL_QUESTIONS }, (_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 ${
                i < step ? "bg-coral" : "bg-black/10"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step === 1 && (
              <div>
                <p className="text-body-sm font-medium text-black mb-2">
                  What state are you in?
                </p>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full border border-black/10 bg-white text-body py-2.5 px-3 text-black focus:outline-none focus:border-coral"
                >
                  <option value="">Select state...</option>
                  {STATE_NAMES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            )}
            {step === 2 && (
              <div>
                <p className="text-body-sm font-medium text-black mb-2">
                  What&apos;s your vehicle?
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    placeholder="Year"
                    value={vehicleYear}
                    onChange={(e) => setVehicleYear(e.target.value)}
                    maxLength={4}
                    className="border border-black/10 bg-white text-body-sm py-2 px-2 text-black focus:outline-none focus:border-coral"
                  />
                  <input
                    placeholder="Make"
                    value={vehicleMake}
                    onChange={(e) => setVehicleMake(e.target.value)}
                    className="border border-black/10 bg-white text-body-sm py-2 px-2 text-black focus:outline-none focus:border-coral"
                  />
                  <input
                    placeholder="Model"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    className="border border-black/10 bg-white text-body-sm py-2 px-2 text-black focus:outline-none focus:border-coral"
                  />
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <p className="text-body-sm font-medium text-black mb-2">
                  What did they offer you?
                </p>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="$ 12,000"
                  value={offer}
                  onChange={(e) =>
                    setOffer(e.target.value.replace(/[^0-9.,]/g, ""))
                  }
                  className="w-full border border-black/10 bg-white text-body py-2.5 px-3 text-black focus:outline-none focus:border-coral"
                />
              </div>
            )}
            {step === 4 && (
              <div>
                <p className="text-body-sm font-medium text-black mb-2">
                  Does your offer include sales tax?
                </p>
                <div className="flex gap-2">
                  {[
                    { label: "Yes", val: true },
                    { label: "No", val: false },
                    { label: "Not sure", val: null },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() =>
                        setIncludesSalesTax(
                          opt.val as boolean | null
                        )
                      }
                      className={`flex-1 py-2 px-3 border text-body-sm font-medium transition-all ${
                        includesSalesTax === opt.val
                          ? "border-coral bg-coral/5 text-black"
                          : "border-black/10 text-[#4a555e] hover:border-black/20"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 5 && (
              <div>
                <p className="text-body-sm font-medium text-black mb-2">
                  Which of these are in your offer?
                </p>
                <div className="space-y-1.5">
                  {INCLUDED_ITEM_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleItem(opt.id)}
                      className={`w-full text-left py-2 px-3 border text-body-sm transition-all flex items-center gap-2 ${
                        includedItems.includes(opt.id)
                          ? "border-emerald-200 bg-emerald-50 text-black"
                          : "border-black/10 text-[#4a555e] hover:border-black/20"
                      }`}
                    >
                      <span
                        className={`w-3.5 h-3.5 border flex-shrink-0 flex items-center justify-center ${
                          includedItems.includes(opt.id)
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : "border-black/20"
                        }`}
                      >
                        {includedItems.includes(opt.id) && (
                          <CheckCircle2 className="w-2.5 h-2.5" />
                        )}
                      </span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-2 mt-4">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="px-3 py-2 border border-black/10 text-body-sm text-[#4a555e] hover:bg-black/5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canAdvance()}
            className="flex-1 py-2.5 bg-black text-white text-body-sm font-medium hover:bg-coral hover:text-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {step === TOTAL_QUESTIONS ? "See my score" : "Next"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  /* ---- Full mode ---- */
  if (result) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-heading-lg sm:text-display-sm font-semibold text-black mb-2">
            Your Offer Fairness Score
          </h1>
        </div>

        {/* Score display */}
        <div className="bg-white border border-black/10 p-6 text-center">
          <p className="text-label uppercase text-[#4a555e]/60 mb-2">
            Your Score
          </p>
          <p className="text-score font-semibold text-black font-mono">
            {result.score}
            <span className="text-heading text-[#4a555e]"> / 100</span>
          </p>
          <div className="max-w-md mx-auto mt-4 mb-4">
            <ScoreBar score={result.score} />
          </div>
          <p className="text-body text-[#4a555e] max-w-lg mx-auto">
            {result.severity}
          </p>

          {vehicleYear && vehicleMake && vehicleModel && (
            <p className="text-body-sm text-[#4a555e] mt-3">
              Your {fmtCurrency(parsedOffer)} offer for a {vehicleYear}{" "}
              {vehicleMake} {vehicleModel} in {state} is likely{" "}
              <span className="font-semibold text-black">
                {fmtCurrency(result.estimated_gap_low)} –{" "}
                {fmtCurrency(result.estimated_gap_high)}
              </span>{" "}
              below fair value.
            </p>
          )}
        </div>

        {/* Missing items */}
        {result.missing_items.length > 0 && (
          <div className="bg-white border border-black/10 overflow-hidden">
            <div className="px-5 py-3 border-b border-black/5">
              <h2 className="text-body font-semibold text-black flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-coral" />
                Missing items detected:
              </h2>
            </div>
            {result.missing_items.map((item) => (
              <div
                key={item.item}
                className="px-5 py-3 border-b border-black/5 last:border-b-0 flex justify-between items-center"
              >
                <span className="text-body-sm text-black">{item.item}</span>
                <span className="text-body-sm font-mono font-semibold text-coral ml-3 flex-shrink-0">
                  ~{fmtCurrency(item.low === item.high ? item.low : item.low)}
                  {item.high !== item.low && `–${fmtCurrency(item.high)}`}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="border-2 border-black p-6 text-center">
          <p className="text-body font-medium text-black mb-1">
            Get your detailed analysis with exact amounts
          </p>
          <p className="text-body-sm text-[#4a555e] mb-4">
            {state}-specific citations you can send to your adjuster.
          </p>
          <Link href="/claims/new">
            <button className="px-8 py-3 bg-black text-white font-medium hover:bg-coral hover:text-black transition-colors text-body flex items-center justify-center gap-2 mx-auto">
              Get my full analysis
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <button
            onClick={restart}
            className="text-body-sm text-[#4a555e] hover:text-black mt-3 block mx-auto"
          >
            Retake quiz
          </button>
        </div>
      </div>
    );
  }

  /* ---- Full mode: questions ---- */
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-heading-lg sm:text-display-sm font-semibold text-black mb-2">
          Is My Insurance Offer Fair?
        </h1>
        <p className="text-body text-[#4a555e]">
          Answer 5 quick questions and we&apos;ll score your offer instantly.
        </p>
      </div>

      {/* Progress */}
      <div className="flex gap-1">
        {Array.from({ length: TOTAL_QUESTIONS }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 transition-colors duration-300 ${
              i < step ? "bg-coral" : "bg-black/10"
            }`}
          />
        ))}
      </div>

      <div className="bg-white border border-black/10 p-5 sm:p-6">
        <p className="text-caption text-[#4a555e]/60 mb-2">
          Question {step} of {TOTAL_QUESTIONS}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            {step === 1 && (
              <div>
                <p className="text-heading font-semibold text-black mb-4">
                  What state are you in?
                </p>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full border border-black/10 bg-white text-body py-3 px-3 text-black focus:outline-none focus:border-coral"
                >
                  <option value="">Select your state...</option>
                  {STATE_NAMES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            )}

            {step === 2 && (
              <div>
                <p className="text-heading font-semibold text-black mb-4">
                  What&apos;s your vehicle?
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-caption text-[#4a555e] mb-1 block">
                      Year
                    </label>
                    <input
                      placeholder="2020"
                      value={vehicleYear}
                      onChange={(e) => setVehicleYear(e.target.value)}
                      maxLength={4}
                      className="w-full border border-black/10 bg-white text-body py-2.5 px-3 text-black focus:outline-none focus:border-coral"
                    />
                  </div>
                  <div>
                    <label className="text-caption text-[#4a555e] mb-1 block">
                      Make
                    </label>
                    <input
                      placeholder="Honda"
                      value={vehicleMake}
                      onChange={(e) => setVehicleMake(e.target.value)}
                      className="w-full border border-black/10 bg-white text-body py-2.5 px-3 text-black focus:outline-none focus:border-coral"
                    />
                  </div>
                  <div>
                    <label className="text-caption text-[#4a555e] mb-1 block">
                      Model
                    </label>
                    <input
                      placeholder="Accord"
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      className="w-full border border-black/10 bg-white text-body py-2.5 px-3 text-black focus:outline-none focus:border-coral"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <p className="text-heading font-semibold text-black mb-4">
                  What did they offer you?
                </p>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="$ 12,000"
                  value={offer}
                  onChange={(e) =>
                    setOffer(e.target.value.replace(/[^0-9.,]/g, ""))
                  }
                  className="w-full border border-black/10 bg-white text-body py-3 px-3 text-black focus:outline-none focus:border-coral"
                />
              </div>
            )}

            {step === 4 && (
              <div>
                <p className="text-heading font-semibold text-black mb-4">
                  Does your offer include sales tax?
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Yes", val: true },
                    { label: "No", val: false },
                    { label: "Not sure", val: null },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() =>
                        setIncludesSalesTax(opt.val as boolean | null)
                      }
                      className={`py-3 px-4 border text-body font-medium transition-all ${
                        includesSalesTax === opt.val
                          ? "border-coral bg-coral/5 text-black"
                          : "border-black/10 text-[#4a555e] hover:border-black/20"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <p className="text-heading font-semibold text-black mb-4">
                  Which of these are in your offer? (check all that apply)
                </p>
                <div className="space-y-2">
                  {INCLUDED_ITEM_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleItem(opt.id)}
                      className={`w-full text-left py-3 px-4 border text-body transition-all flex items-center gap-3 ${
                        includedItems.includes(opt.id)
                          ? "border-emerald-200 bg-emerald-50 text-black"
                          : "border-black/10 text-[#4a555e] hover:border-black/20"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 border-2 flex-shrink-0 flex items-center justify-center ${
                          includedItems.includes(opt.id)
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : "border-black/20"
                        }`}
                      >
                        {includedItems.includes(opt.id) && (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        )}
                      </span>
                      {opt.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setIncludedItems([])}
                    className={`w-full text-left py-3 px-4 border text-body transition-all ${
                      includedItems.length === 0
                        ? "border-coral bg-coral/5 text-black"
                        : "border-black/10 text-[#4a555e] hover:border-black/20"
                    }`}
                  >
                    None of these / Not sure
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="px-4 py-2.5 border border-black/10 text-body-sm text-[#4a555e] hover:bg-black/5 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canAdvance()}
            className="flex-1 py-2.5 bg-black text-white text-body font-medium hover:bg-coral hover:text-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {step === TOTAL_QUESTIONS ? "See my score" : "Next"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
