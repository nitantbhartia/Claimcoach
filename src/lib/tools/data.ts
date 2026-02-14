/* -------------------------------------------------------------------------- */
/*  State sales tax rates                                                      */
/*  Source: state revenue departments. Update quarterly.                        */
/* -------------------------------------------------------------------------- */

export interface StateTaxData {
  state_rate: number;
  avg_combined: number;
  note?: string;
}

export const STATE_SALES_TAX: Record<string, StateTaxData> = {
  Alabama: { state_rate: 4.0, avg_combined: 9.24 },
  Alaska: {
    state_rate: 0,
    avg_combined: 1.76,
    note: "No state tax but local taxes may apply.",
  },
  Arizona: { state_rate: 5.6, avg_combined: 8.4 },
  Arkansas: { state_rate: 6.5, avg_combined: 9.47 },
  California: { state_rate: 7.25, avg_combined: 8.85 },
  Colorado: { state_rate: 2.9, avg_combined: 7.81 },
  Connecticut: { state_rate: 6.35, avg_combined: 6.35 },
  Delaware: {
    state_rate: 0,
    avg_combined: 0,
    note: "No sales tax — but a 4.25% document fee applies to vehicles.",
  },
  Florida: { state_rate: 6.0, avg_combined: 7.01 },
  Georgia: {
    state_rate: 4.0,
    avg_combined: 7.37,
    note: "TAVT of ~6.6% applies instead for title transfers.",
  },
  Hawaii: { state_rate: 4.0, avg_combined: 4.44 },
  Idaho: { state_rate: 6.0, avg_combined: 6.02 },
  Illinois: { state_rate: 6.25, avg_combined: 8.82 },
  Indiana: { state_rate: 7.0, avg_combined: 7.0 },
  Iowa: { state_rate: 6.0, avg_combined: 6.94 },
  Kansas: { state_rate: 6.5, avg_combined: 8.71 },
  Kentucky: { state_rate: 6.0, avg_combined: 6.0 },
  Louisiana: { state_rate: 4.45, avg_combined: 9.56 },
  Maine: { state_rate: 5.5, avg_combined: 5.5 },
  Maryland: { state_rate: 6.0, avg_combined: 6.0 },
  Massachusetts: { state_rate: 6.25, avg_combined: 6.25 },
  Michigan: { state_rate: 6.0, avg_combined: 6.0 },
  Minnesota: { state_rate: 6.875, avg_combined: 7.49 },
  Mississippi: { state_rate: 7.0, avg_combined: 7.07 },
  Missouri: { state_rate: 4.225, avg_combined: 8.38 },
  Montana: { state_rate: 0, avg_combined: 0 },
  Nebraska: { state_rate: 5.5, avg_combined: 6.94 },
  Nevada: { state_rate: 6.85, avg_combined: 8.23 },
  "New Hampshire": { state_rate: 0, avg_combined: 0 },
  "New Jersey": { state_rate: 6.625, avg_combined: 6.6 },
  "New Mexico": { state_rate: 4.875, avg_combined: 7.72 },
  "New York": { state_rate: 4.0, avg_combined: 8.52 },
  "North Carolina": {
    state_rate: 4.75,
    avg_combined: 6.99,
    note: "3% highway use tax applies, capped.",
  },
  "North Dakota": { state_rate: 5.0, avg_combined: 6.96 },
  Ohio: { state_rate: 5.75, avg_combined: 7.24 },
  Oklahoma: { state_rate: 4.5, avg_combined: 8.98 },
  Oregon: {
    state_rate: 0,
    avg_combined: 0,
    note: "0.5% vehicle privilege/use tax may apply.",
  },
  Pennsylvania: { state_rate: 6.0, avg_combined: 6.34 },
  "Rhode Island": { state_rate: 7.0, avg_combined: 7.0 },
  "South Carolina": {
    state_rate: 6.0,
    avg_combined: 7.43,
    note: "Capped at $500 for vehicles.",
  },
  "South Dakota": { state_rate: 4.2, avg_combined: 6.4 },
  Tennessee: { state_rate: 7.0, avg_combined: 9.55 },
  Texas: { state_rate: 6.25, avg_combined: 8.2 },
  Utah: { state_rate: 6.1, avg_combined: 7.19 },
  Vermont: { state_rate: 6.0, avg_combined: 6.24 },
  Virginia: { state_rate: 4.3, avg_combined: 5.75 },
  Washington: { state_rate: 6.5, avg_combined: 10.25 },
  "West Virginia": { state_rate: 6.0, avg_combined: 6.55 },
  Wisconsin: { state_rate: 5.0, avg_combined: 5.43 },
  Wyoming: { state_rate: 4.0, avg_combined: 5.36 },
};

export const STATE_NAMES = Object.keys(STATE_SALES_TAX).sort();

/* State code -> full name mapping */
export const STATE_CODE_TO_NAME: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas",
  CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware",
  FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho",
  IL: "Illinois", IN: "Indiana", IA: "Iowa", KS: "Kansas",
  KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
  MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada",
  NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York",
  NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma",
  OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
  SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah",
  VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West Virginia",
  WI: "Wisconsin", WY: "Wyoming", DC: "Washington D.C.",
};

/* -------------------------------------------------------------------------- */
/*  Sales tax calculation                                                      */
/* -------------------------------------------------------------------------- */

export interface SalesTaxResult {
  state: string;
  settlement_amount: number;
  tax_rate_percent: number;
  state_rate_percent: number;
  taxable_amount: number;
  tax_owed: number;
  keeping_vehicle: boolean;
  note?: string;
}

export function calculateSalesTax(
  settlementAmount: number,
  state: string,
  keepingVehicle: boolean,
  salvageValue = 0
): SalesTaxResult | null {
  const data = STATE_SALES_TAX[state];
  if (!data) return null;

  const rate = data.avg_combined / 100;
  const taxableAmount =
    keepingVehicle && salvageValue > 0
      ? settlementAmount - salvageValue
      : settlementAmount;

  const taxOwed = Math.round(taxableAmount * rate * 100) / 100;

  return {
    state,
    settlement_amount: settlementAmount,
    tax_rate_percent: data.avg_combined,
    state_rate_percent: data.state_rate,
    taxable_amount: taxableAmount,
    tax_owed: taxOwed,
    keeping_vehicle: keepingVehicle,
    note: data.note,
  };
}

/* -------------------------------------------------------------------------- */
/*  Settlement checklist items                                                 */
/* -------------------------------------------------------------------------- */

export interface ChecklistItemDef {
  id: string;
  label: string;
  description: string;
  range_low: number;
  range_high: number;
  calculable?: boolean;
  is_right_not_dollar?: boolean;
  statute?: string;
}

export const STANDARD_CHECKLIST_ITEMS: ChecklistItemDef[] = [
  {
    id: "sales_tax",
    label: "Sales tax on replacement vehicle",
    description:
      "Tax you'll pay when buying a replacement car. Required in most states.",
    range_low: 800,
    range_high: 3000,
    calculable: true,
  },
  {
    id: "title_registration",
    label: "Title, registration, and transfer fees",
    description:
      "One-time fees to legally register a replacement vehicle in your name.",
    range_low: 200,
    range_high: 500,
  },
  {
    id: "comparable_adjustments",
    label: "Comparable vehicle adjustments",
    description:
      "If the insurer's comparable vehicles have higher mileage or worse condition than yours, the ACV should be adjusted up.",
    range_low: 500,
    range_high: 2000,
  },
  {
    id: "dealer_fees",
    label: "Dealer documentation fees",
    description:
      "Doc fees charged by dealers when buying a replacement vehicle.",
    range_low: 300,
    range_high: 800,
  },
  {
    id: "loss_of_use",
    label: "Loss of use / rental car gap",
    description:
      "Compensation for days without a vehicle beyond what rental coverage provides.",
    range_low: 200,
    range_high: 1500,
  },
  {
    id: "aftermarket",
    label: "Aftermarket modifications and upgrades",
    description:
      "Custom wheels, audio systems, tint, performance parts — often completely ignored.",
    range_low: 0,
    range_high: 5000,
  },
];

export const STATE_SPECIFIC_ITEMS: Record<string, ChecklistItemDef[]> = {
  California: [
    {
      id: "ca_license_fees",
      label: "License fees (remaining registration term)",
      description:
        "Pro-rated vehicle license fees for the remainder of your registration period.",
      range_low: 50,
      range_high: 200,
    },
    {
      id: "ca_35_day_reopener",
      label: "35-day reopener right (know your rights)",
      description:
        "If you can't find a comparable vehicle for the settlement amount within 35 days, your insurer must reopen the claim.",
      range_low: 0,
      range_high: 0,
      is_right_not_dollar: true,
      statute: "Cal. Code Regs. § 2695.8(c)",
    },
  ],
  Georgia: [
    {
      id: "ga_tavt",
      label: "Title Ad Valorem Tax (TAVT)",
      description:
        "Georgia charges ~6.6% TAVT on vehicle title transfers instead of traditional sales tax.",
      range_low: 500,
      range_high: 2000,
    },
    {
      id: "ga_diminished_value",
      label: "Diminished value (first-party)",
      description:
        "Georgia is the ONLY state requiring insurers to pay diminished value on first-party claims.",
      range_low: 500,
      range_high: 5000,
      statute: "State Farm v. Mabry, 274 Ga. 498 (2001)",
    },
  ],
  "North Carolina": [
    {
      id: "nc_highway_use_tax",
      label: "Highway use tax",
      description: "NC charges a 3% highway use tax on vehicle purchases (capped).",
      range_low: 200,
      range_high: 500,
    },
    {
      id: "nc_diminished_value",
      label: "Diminished value (first-party)",
      description: "NC allows first-party diminished value claims.",
      range_low: 500,
      range_high: 5000,
    },
  ],
  Illinois: [
    {
      id: "il_30_day_window",
      label: "Sales tax (30-day purchase window)",
      description:
        "You must purchase or lease a replacement within 30 days to recover sales tax.",
      range_low: 0,
      range_high: 0,
      is_right_not_dollar: true,
      statute: "215 ILCS 5/155.22a",
    },
  ],
  Ohio: [
    {
      id: "oh_30_day_window",
      label: "Sales tax (30-day documentation required)",
      description:
        "You must provide purchase documentation within 30 days to recover sales tax.",
      range_low: 0,
      range_high: 0,
      is_right_not_dollar: true,
      statute: "Ohio Admin. Code § 3901-1-54",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Checklist calculation                                                      */
/* -------------------------------------------------------------------------- */

export interface ChecklistResult {
  checked_count: number;
  missing_count: number;
  missing_items: (ChecklistItemDef & {
    type: "dollar" | "right";
    estimated_low: number;
    estimated_high: number;
  })[];
  estimated_gap_low: number;
  estimated_gap_high: number;
  adjusted_offer_low: number;
  adjusted_offer_high: number;
}

export function calculateChecklistResults(
  checkedItems: string[],
  state: string,
  offerAmount: number
): ChecklistResult {
  const stateItems = STATE_SPECIFIC_ITEMS[state] ?? [];
  const allItems = [...STANDARD_CHECKLIST_ITEMS, ...stateItems];

  const missing: ChecklistResult["missing_items"] = [];
  let totalLow = 0;
  let totalHigh = 0;

  for (const item of allItems) {
    if (checkedItems.includes(item.id)) continue;

    if (item.is_right_not_dollar) {
      missing.push({
        ...item,
        type: "right",
        estimated_low: 0,
        estimated_high: 0,
      });
      continue;
    }

    let low = item.range_low;
    let high = item.range_high;

    if (item.id === "sales_tax" && item.calculable) {
      const tax = calculateSalesTax(offerAmount, state, false);
      if (tax) {
        low = tax.tax_owed;
        high = tax.tax_owed;
      }
    }

    totalLow += low;
    totalHigh += high;
    missing.push({
      ...item,
      type: "dollar",
      estimated_low: low,
      estimated_high: high,
    });
  }

  return {
    checked_count: checkedItems.length,
    missing_count: missing.length,
    missing_items: missing,
    estimated_gap_low: totalLow,
    estimated_gap_high: totalHigh,
    adjusted_offer_low: offerAmount + totalLow,
    adjusted_offer_high: offerAmount + totalHigh,
  };
}

/* -------------------------------------------------------------------------- */
/*  Fairness quiz scoring                                                      */
/* -------------------------------------------------------------------------- */

export interface FairnessResult {
  score: number;
  severity: string;
  missing_items: { item: string; low: number; high: number }[];
  estimated_gap_low: number;
  estimated_gap_high: number;
  adjusted_offer_low: number;
  adjusted_offer_high: number;
}

export function calculateFairnessScore(
  state: string,
  offerAmount: number,
  includesSalesTax: boolean | null,
  includedItems: string[]
): FairnessResult {
  let score = 50;
  const missingItems: FairnessResult["missing_items"] = [];
  let gapLow = 0;
  let gapHigh = 0;

  // Sales tax
  if (includesSalesTax === true) {
    score += 15;
  } else if (includesSalesTax === false) {
    score -= 15;
    const tax = calculateSalesTax(offerAmount, state, false);
    if (tax && tax.tax_owed > 0) {
      missingItems.push({
        item: "Sales tax",
        low: tax.tax_owed,
        high: tax.tax_owed,
      });
      gapLow += tax.tax_owed;
      gapHigh += tax.tax_owed;
    }
  }

  // Standard items
  const standardIds = [
    "title_registration",
    "comparable_adjustments",
    "dealer_fees",
    "loss_of_use",
    "aftermarket",
  ];
  let includedCount = 0;

  for (const id of standardIds) {
    if (includedItems.includes(id)) {
      score += 7;
      includedCount++;
    } else {
      const def = STANDARD_CHECKLIST_ITEMS.find((i) => i.id === id);
      if (def) {
        missingItems.push({
          item: def.label,
          low: def.range_low,
          high: def.range_high,
        });
        gapLow += def.range_low;
        gapHigh += def.range_high;
      }
    }
  }

  const missingCount = standardIds.length - includedCount;
  if (missingCount >= 3) score -= 10;

  score = Math.max(0, Math.min(100, score));

  let severity: string;
  if (score >= 80) {
    severity =
      "Your offer looks reasonable, but there may still be room to negotiate.";
  } else if (score >= 60) {
    severity =
      "Your offer is below average. Several common line items appear to be missing.";
  } else if (score >= 40) {
    severity =
      "Your offer is significantly below what you're likely owed. Multiple line items are missing.";
  } else {
    severity =
      "Your offer is very low. You're likely leaving thousands of dollars on the table.";
  }

  return {
    score,
    severity,
    missing_items: missingItems,
    estimated_gap_low: gapLow,
    estimated_gap_high: gapHigh,
    adjusted_offer_low: offerAmount + gapLow,
    adjusted_offer_high: offerAmount + gapHigh,
  };
}

/* -------------------------------------------------------------------------- */
/*  Formatting helpers                                                         */
/* -------------------------------------------------------------------------- */

export function fmtCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function fmtCurrencyExact(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
