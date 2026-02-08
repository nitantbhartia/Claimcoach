"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------------------------------------------------------------- */
/* Simulated policy document lines                                             */
/* -------------------------------------------------------------------------- */

const POLICY_LINES = [
  "DECLARATIONS PAGE — POLICY #SF-AUTO-2024-77431",
  "Named Insured: [Policyholder Name]",
  "Policy Period: 03/01/2025 to 09/01/2025",
  "Vehicle: 2022 Honda Civic EX — VIN: 2HGFE2F59NH******",
  "",
  "SECTION I — LIABILITY COVERAGE",
  "  Coverage A — Bodily Injury Liability",
  "    Limit: $50,000 per person / $100,000 per accident",
  "  Coverage B — Property Damage Liability",
  "    Limit: $50,000 per accident",
  "",
  "SECTION II — PHYSICAL DAMAGE",
  "  Coverage D — Collision",
  "    Limit: Actual Cash Value less $500 deductible",
  "    Note: ACV determined by comparable market analysis",
  "  Coverage E — Comprehensive (Other Than Collision)",
  "    Limit: Actual Cash Value less $500 deductible",
  "    Includes: theft, vandalism, weather, glass breakage",
  "",
  "SECTION III — UNINSURED / UNDERINSURED MOTORIST",
  "  UM/UIM Coverage",
  "    Limit: $50,000 per person / $100,000 per accident",
  "    Stacking: Non-stacked",
  "",
  "SECTION IV — MEDICAL PAYMENTS",
  "  MedPay Coverage",
  "    Limit: $5,000 per person",
  "    Applies regardless of fault determination",
  "",
  "SECTION V — ADDITIONAL COVERAGES",
  "  Transportation Expense (Loss of Use)",
  "    $30/day maximum, 30 day limit = $900 total",
  "    Triggered upon: vehicle non-drivable after covered loss",
  "  Towing and Labor",
  "    Limit: $75 per disablement",
  "",
  "SECTION VI — EXCLUSIONS AND CONDITIONS",
  "  6(a) — 72-Hour Reporting Requirement",
  "    Failure to report within 72 hours may result in",
  "    claim reduction or denial per Section 4(a).",
  "  6(b) — Cooperation Clause",
  "    Insured must cooperate fully with investigation.",
  "    Includes: recorded statements, vehicle inspection.",
  "  6(c) — Betterment / Depreciation",
  "    Insurer may apply depreciation to worn parts",
  "    including tires, brakes, battery, suspension.",
  "  6(d) — Pre-Existing Damage Exclusion",
  "    No coverage for damage existing prior to loss.",
  "",
  "SECTION VII — DISPUTE RESOLUTION",
  "  7(a) — Appraisal Clause",
  "    Either party may demand appraisal if amount",
  "    of loss cannot be agreed upon. Each party selects",
  "    an appraiser; umpire decides if they disagree.",
  "",
  "ENDORSEMENTS",
  "  Endorsement 402B — Original Equipment Manufacturer Parts",
  "    Vehicles < 5 model years: OEM parts required unless",
  "    insured provides written consent for aftermarket.",
  "  Endorsement 215A — Diminished Value",
  "    Not applicable in all states. Consult state law.",
  "  Endorsement 310C — Replacement Cost Override",
  "    Does not apply to total loss determinations.",
  "    Subject to $50,000 coverage maximum.",
  "",
  "RATED DRIVER INFORMATION",
  "  Primary driver: [Policyholder], License #****-****",
  "  Annual mileage: 12,000 estimated",
  "  Prior claims: None in 36-month lookback period",
  "",
  "PREMIUM BREAKDOWN",
  "  Collision:          $312/6mo",
  "  Comprehensive:      $148/6mo",
  "  BI Liability:       $276/6mo",
  "  PD Liability:       $186/6mo",
  "  UM/UIM:            $94/6mo",
  "  MedPay:            $32/6mo",
  "  ————————————————————————————",
  "  Total Premium:      $1,048/6mo",
  "",
  "END OF DECLARATIONS",
];

/* -------------------------------------------------------------------------- */
/* Highlight targets — specific lines the "AI" finds important                 */
/* -------------------------------------------------------------------------- */

interface Finding {
  lineIndex: number;
  label: string;
  value: string | null; // null = informational, string = dollar amount
  type: "coverage" | "gap" | "risk" | "hidden";
}

const FINDINGS: Finding[] = [
  { lineIndex: 7, label: "Bodily Injury Liability", value: null, type: "coverage" },
  { lineIndex: 13, label: "Collision — $500 deductible", value: null, type: "coverage" },
  { lineIndex: 14, label: "ACV clause detected", value: null, type: "risk" },
  { lineIndex: 16, label: "Comprehensive Coverage", value: null, type: "coverage" },
  { lineIndex: 21, label: "UM/UIM Coverage — Non-stacked", value: null, type: "coverage" },
  { lineIndex: 31, label: "Loss of Use / Rental", value: "+$900", type: "hidden" },
  { lineIndex: 35, label: "Towing and Labor", value: "+$75", type: "hidden" },
  { lineIndex: 38, label: "72-Hour Reporting Requirement", value: null, type: "risk" },
  { lineIndex: 41, label: "Cooperation Clause — recorded statement", value: null, type: "risk" },
  { lineIndex: 44, label: "Betterment / Depreciation on parts", value: null, type: "risk" },
  { lineIndex: 51, label: "Appraisal Clause — can work in your favor", value: null, type: "coverage" },
  { lineIndex: 56, label: "Endorsement 402B — OEM Parts Required", value: "+$800", type: "hidden" },
  { lineIndex: 58, label: "Endorsement 215A — Diminished Value", value: "+$2,500", type: "hidden" },
  { lineIndex: 60, label: "Replacement Cost Override — does NOT apply", value: null, type: "risk" },
];

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

interface LiveAuditProps {
  totalPages?: number;
  onComplete?: () => void;
  /** How long (ms) the full audit should take */
  duration?: number;
}

export function LiveAudit({
  totalPages = 42,
  onComplete,
  duration = 12000,
}: LiveAuditProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [discoveredFindings, setDiscoveredFindings] = useState<Finding[]>([]);
  const [highlightedLines, setHighlightedLines] = useState<Set<number>>(new Set());
  const [flyingBits, setFlyingBits] = useState<{ id: number; finding: Finding }[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const docRef = useRef<HTMLDivElement>(null);
  const flyIdRef = useRef(0);
  const findingsLogRef = useRef<HTMLDivElement>(null);

  const lineDelay = duration / POLICY_LINES.length;

  // Auto-scroll the document feed
  useEffect(() => {
    if (currentLine >= POLICY_LINES.length) {
      // Audit complete
      setIsComplete(true);
      setCurrentPage(totalPages);
      const timer = setTimeout(() => onComplete?.(), 1500);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCurrentLine((prev) => prev + 1);
      setCurrentPage(Math.min(totalPages, Math.ceil(((currentLine + 1) / POLICY_LINES.length) * totalPages)));

      // Check if this line is a finding
      const finding = FINDINGS.find((f) => f.lineIndex === currentLine);
      if (finding) {
        // Highlight the line
        setHighlightedLines((prev) => new Set(prev).add(currentLine));

        // Create flying bit
        const id = ++flyIdRef.current;
        setFlyingBits((prev) => [...prev, { id, finding }]);

        // Add to findings log after a short delay (simulating extraction)
        setTimeout(() => {
          setDiscoveredFindings((prev) => [...prev, finding]);
          setFlyingBits((prev) => prev.filter((b) => b.id !== id));
        }, 600);
      }
    }, lineDelay);

    return () => clearTimeout(timer);
  }, [currentLine, lineDelay, onComplete, totalPages, duration]);

  // Auto-scroll document to current line
  useEffect(() => {
    if (docRef.current) {
      const lineHeight = 22; // approximate
      docRef.current.scrollTop = Math.max(0, currentLine * lineHeight - 120);
    }
  }, [currentLine]);

  // Auto-scroll findings log
  useEffect(() => {
    if (findingsLogRef.current) {
      findingsLogRef.current.scrollTop = findingsLogRef.current.scrollHeight;
    }
  }, [discoveredFindings]);

  const progress = Math.min(100, (currentLine / POLICY_LINES.length) * 100);

  const hiddenValueTotal = discoveredFindings
    .filter((f) => f.value)
    .reduce((sum, f) => {
      const num = parseFloat((f.value || "0").replace(/[^0-9.]/g, ""));
      return sum + num;
    }, 0);

  return (
    <div className="bg-panel min-h-[480px] sm:min-h-[560px] flex flex-col overflow-hidden border border-slate-200">
      {/* ---- Progress bar ---- */}
      <div className="px-4 sm:px-6 pt-4 pb-3 border-b border-slate-100 bg-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-coral animate-pulse" />
            <span className="text-caption font-medium text-coral uppercase tracking-wider">
              {isComplete ? "Analysis Complete" : "Analyzing Policy"}
            </span>
          </div>
          <span className="text-caption text-slate-400 font-mono">
            {currentPage}/{totalPages} pages
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

      {/* ---- Document feed ---- */}
      <div className="flex-1 flex flex-col sm:flex-row relative overflow-hidden">
        {/* The scrolling document */}
        <div
          ref={docRef}
          className="flex-1 overflow-hidden relative px-4 sm:px-6 py-3"
          style={{ fontFamily: "monospace" }}
        >
          {/* Scan-line overlay */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <motion.div
              className="w-full h-px bg-coral/20"
              animate={{
                y: [0, docRef.current?.scrollHeight || 400],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          {/* Top/bottom gradient fade */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-panel to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-panel to-transparent z-20 pointer-events-none" />

          {POLICY_LINES.map((line, i) => {
            const isHighlighted = highlightedLines.has(i);
            const isPastCursor = i < currentLine;
            const isAtCursor = i === currentLine;

            return (
              <div
                key={i}
                className={`
                  text-[11px] sm:text-xs leading-[22px] whitespace-pre transition-all duration-300
                  ${isHighlighted ? "bg-coral/20 -mx-1 px-1" : ""}
                  ${isPastCursor ? "text-slate-400" : "text-slate-200"}
                  ${isAtCursor ? "text-slate-600" : ""}
                `}
              >
                <span className="inline-block w-6 sm:w-8 text-right mr-2 sm:mr-3 text-slate-300 select-none text-[10px]">
                  {i + 1}
                </span>
                {line || "\u00A0"}
              </div>
            );
          })}
        </div>

        {/* Flying extraction bits */}
        <AnimatePresence>
          {flyingBits.map(({ id, finding }) => (
            <motion.div
              key={id}
              initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              animate={{ opacity: 0, x: 80, y: 60, scale: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeIn" }}
              className="absolute z-30 pointer-events-none"
              style={{ top: `${(finding.lineIndex / POLICY_LINES.length) * 80}%`, left: "40%" }}
            >
              <div className={`
                px-2 py-1 text-[10px] font-semibold whitespace-nowrap
                ${finding.type === "hidden" ? "bg-coral text-white" : ""}
                ${finding.type === "risk" ? "bg-warning-500 text-black" : ""}
                ${finding.type === "coverage" ? "bg-coral text-white" : ""}
                ${finding.type === "gap" ? "bg-danger-500 text-white" : ""}
              `}>
                {finding.value || finding.label.slice(0, 20)}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ---- Live Findings Log ---- */}
      <div className="border-t border-slate-200 bg-white">
        {/* Hidden value counter */}
        {hiddenValueTotal > 0 && (
          <div className="px-4 sm:px-6 py-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-caption text-slate-500 uppercase tracking-wider font-medium">
              Hidden value discovered
            </span>
            <motion.span
              key={hiddenValueTotal}
              initial={{ scale: 1.3, color: "#16a34a" }}
              animate={{ scale: 1, color: "#002244" }}
              className="text-body-sm font-bold"
            >
              +${hiddenValueTotal.toLocaleString()}
            </motion.span>
          </div>
        )}

        <div
          ref={findingsLogRef}
          className="max-h-36 sm:max-h-44 overflow-y-auto px-4 sm:px-6 py-3 space-y-1.5"
        >
          <AnimatePresence>
            {discoveredFindings.map((finding, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-center gap-2 text-[11px] sm:text-xs"
              >
                {/* Timestamp */}
                <span className="text-slate-300 font-mono w-10 flex-shrink-0">
                  [{((i * 0.8) + 0.4).toFixed(1)}s]
                </span>

                {/* Type indicator */}
                <span
                  className={`
                    w-1.5 h-1.5 rounded-full flex-shrink-0
                    ${finding.type === "hidden" ? "bg-coral" : ""}
                    ${finding.type === "risk" ? "bg-warning-500" : ""}
                    ${finding.type === "coverage" ? "bg-coral" : ""}
                    ${finding.type === "gap" ? "bg-danger-500" : ""}
                  `}
                />

                {/* Label */}
                <span className="text-slate-600 truncate flex-1">
                  {finding.label}
                </span>

                {/* Value badge */}
                {finding.value ? (
                  <span className="text-coral font-semibold font-mono flex-shrink-0 mark-coral px-1">
                    {finding.value}
                  </span>
                ) : (
                  <span className="text-slate-400 font-mono flex-shrink-0">
                    {finding.type === "risk" ? "[RISK]" : "[FOUND]"}
                  </span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {discoveredFindings.length === 0 && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse" />
              <span className="font-mono">Scanning policy document...</span>
            </div>
          )}
        </div>
      </div>

      {/* Complete state */}
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
                  {discoveredFindings.length} findings identified
                </p>
                <p className="text-caption text-slate-500">
                  {discoveredFindings.filter((f) => f.type === "risk").length} risks,{" "}
                  {discoveredFindings.filter((f) => f.type === "hidden").length} hidden coverages
                </p>
              </div>
              {hiddenValueTotal > 0 && (
                <div className="text-right">
                  <p className="text-caption text-slate-500">Recoverable value</p>
                  <p className="text-heading font-bold text-coral">
                    +${hiddenValueTotal.toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
