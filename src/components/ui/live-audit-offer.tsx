"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------------------------------------------------------------- */
/* Simulated offer evaluation log entries                                      */
/* -------------------------------------------------------------------------- */

interface OfferFinding {
  delay: number; // seconds from start
  label: string;
  detail: string;
  type: "check" | "gap" | "found" | "risk";
  value?: string;
}

const OFFER_FINDINGS: OfferFinding[] = [
  { delay: 0.3, label: "Parsing offer amount", detail: "Settlement offer: $4,200", type: "check" },
  { delay: 0.9, label: "Vehicle identification", detail: "2022 Honda Civic EX — 28K miles", type: "check" },
  { delay: 1.5, label: "Pulling KBB value", detail: "KBB Fair Market Range: $6,200–$7,400", type: "found" },
  { delay: 2.1, label: "Pulling NADA value", detail: "NADA Clean Retail: $6,800", type: "found" },
  { delay: 2.8, label: "Scanning local listings", detail: "5 comparable vehicles in 50mi radius", type: "found" },
  { delay: 3.5, label: "Base value gap detected", detail: "Offer $2,600 below fair market", type: "gap", value: "+$2,600" },
  { delay: 4.2, label: "Checking Loss of Use", detail: "Policy allows $30/day × 30 days", type: "found" },
  { delay: 4.8, label: "Rental not included in offer", detail: "24 days without vehicle", type: "gap", value: "+$720" },
  { delay: 5.5, label: "Checking diminished value", detail: "Accident history reduces resale value", type: "found" },
  { delay: 6.1, label: "DV claim eligible", detail: "Estimated diminished value for EX trim", type: "gap", value: "+$1,800" },
  { delay: 6.8, label: "Checking sales tax", detail: "State requires tax on replacement vehicle", type: "found" },
  { delay: 7.3, label: "Sales tax omitted from offer", detail: "7% on replacement vehicle value", type: "gap", value: "+$476" },
  { delay: 7.9, label: "Registration & title fees", detail: "Transfer fees not included", type: "gap", value: "+$185" },
  { delay: 8.5, label: "Checking betterment deductions", detail: "No betterment applied — favorable", type: "check" },
  { delay: 9.0, label: "Reviewing comparable selection", detail: "Insurer used higher-mileage comps", type: "risk" },
  { delay: 9.6, label: "OEM parts entitlement", detail: "Endorsement 402B — vehicle < 5 years", type: "found" },
  { delay: 10.2, label: "Calculating fairness score", detail: "Score: 38/100 — Significantly below fair value", type: "risk" },
  { delay: 10.8, label: "Computing total fair value", detail: "Fair total: $9,981 vs offered $4,200", type: "gap", value: "+$5,781" },
];

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

interface LiveAuditOfferProps {
  onComplete?: () => void;
  duration?: number;
}

export function LiveAuditOffer({
  onComplete,
  duration = 12000,
}: LiveAuditOfferProps) {
  const [visibleFindings, setVisibleFindings] = useState<OfferFinding[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const totalGap = visibleFindings
    .filter((f) => f.value)
    .reduce((sum, f) => {
      const num = parseFloat((f.value || "0").replace(/[^0-9.]/g, ""));
      return sum + num;
    }, 0);

  useEffect(() => {
    // Schedule each finding
    const scale = duration / 12000; // scale timings to desired duration
    OFFER_FINDINGS.forEach((finding) => {
      const timer = setTimeout(() => {
        setVisibleFindings((prev) => [...prev, finding]);
      }, finding.delay * 1000 * scale);
      timersRef.current.push(timer);
    });

    // Complete
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => onComplete?.(), 1200);
    }, (OFFER_FINDINGS[OFFER_FINDINGS.length - 1].delay + 1) * 1000 * scale);
    timersRef.current.push(completeTimer);

    return () => timersRef.current.forEach(clearTimeout);
  }, [duration, onComplete]);

  // Auto-scroll log
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [visibleFindings]);

  const progress = (visibleFindings.length / OFFER_FINDINGS.length) * 100;

  return (
    <div className="bg-panel overflow-hidden border border-slate-200">
      {/* ---- Progress bar ---- */}
      <div className="px-4 sm:px-6 pt-4 pb-3 border-b border-slate-100 bg-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-coral animate-pulse" />
            <span className="text-caption font-medium text-coral uppercase tracking-wider">
              {isComplete ? "Evaluation Complete" : "Evaluating Offer"}
            </span>
          </div>
          <span className="text-caption text-slate-400 font-mono">
            {visibleFindings.length}/{OFFER_FINDINGS.length} checks
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1">
          <motion.div
            className="h-1 rounded-full bg-coral"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* ---- Value comparison bar (appears as gaps are found) ---- */}
      {totalGap > 0 && (
        <div className="px-4 sm:px-6 py-3 border-b border-slate-100 bg-panel-alt/50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4 text-caption">
              <span className="text-slate-400">
                Offer: <span className="font-mono text-slate-500 line-through">$4,200</span>
              </span>
              <span className="text-coral font-semibold">
                Fair: <span className="font-mono">${(4200 + totalGap).toLocaleString()}</span>
              </span>
            </div>
            <motion.span
              key={totalGap}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-body-sm font-bold text-coral"
            >
              +${totalGap.toLocaleString()}
            </motion.span>
          </div>
          {/* Fairness gauge */}
          <div className="relative w-full bg-slate-100 rounded-full h-2.5">
            <div
              className="absolute inset-0 rounded-full overflow-hidden"
            >
              <div className="h-full bg-gradient-to-r from-danger-500 via-amber-400 to-emerald-500 w-full" />
            </div>
            {/* Offer marker */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-danger-500 z-10"
              initial={{ left: "50%" }}
              animate={{ left: "38%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            {/* Fair marker */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-emerald-500 z-10"
              initial={{ left: "50%" }}
              animate={{ left: "78%" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-1 text-[10px] text-slate-400">
            <span>Undervalued</span>
            <span>Market Fair</span>
          </div>
        </div>
      )}

      {/* ---- Live findings log ---- */}
      <div
        ref={logRef}
        className="max-h-64 sm:max-h-80 overflow-y-auto px-4 sm:px-6 py-4 space-y-2"
      >
        <AnimatePresence>
          {visibleFindings.map((finding, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-2.5"
            >
              {/* Type dot */}
              <div className="mt-1.5 flex-shrink-0">
                <span
                  className={`
                    block w-2 h-2 rounded-full
                    ${finding.type === "check" ? "bg-coral" : ""}
                    ${finding.type === "found" ? "bg-blue-500" : ""}
                    ${finding.type === "gap" ? "bg-coral" : ""}
                    ${finding.type === "risk" ? "bg-warning-500" : ""}
                  `}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-body-sm font-medium text-slate-700 truncate">
                    {finding.label}
                  </span>
                  {finding.value && (
                    <span className="text-caption font-semibold text-coral mark-coral px-1 whitespace-nowrap flex-shrink-0">
                      {finding.value}
                    </span>
                  )}
                  {!finding.value && finding.type === "risk" && (
                    <span className="text-[10px] font-mono text-warning-600 bg-amber-50 px-1.5 py-0.5 flex-shrink-0">
                      RISK
                    </span>
                  )}
                </div>
                <p className="text-caption text-slate-400 truncate">
                  {finding.detail}
                </p>
              </div>

              {/* Timestamp */}
              <span className="text-[10px] text-slate-300 font-mono mt-0.5 flex-shrink-0">
                {finding.delay.toFixed(1)}s
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {visibleFindings.length === 0 && (
          <div className="flex items-center gap-2 text-body-sm text-slate-400 py-4">
            <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse" />
            <span className="font-mono">Initializing offer evaluation...</span>
          </div>
        )}
      </div>

      {/* ---- Complete summary ---- */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="px-4 sm:px-6 py-4 bg-panel-alt border-t border-slate-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-sm font-semibold text-coral">
                  Evaluation complete
                </p>
                <p className="text-caption text-slate-500">
                  {visibleFindings.filter((f) => f.type === "gap").length} underpayment gaps identified
                </p>
              </div>
              <div className="text-right">
                <p className="text-caption text-slate-500">Total gap</p>
                <p className="text-heading font-bold text-coral">
                  +${totalGap.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
