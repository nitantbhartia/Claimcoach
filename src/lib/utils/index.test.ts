import { describe, it, expect } from "vitest";
import {
  cn,
  formatCurrency,
  formatDate,
  getStatusLabel,
  getStatusColor,
  getFairnessColor,
  getFairnessLabel,
  getProgressPercentage,
} from "./index";

// ---------------------------------------------------------------------------
// cn (class name utility)
// ---------------------------------------------------------------------------

describe("cn", () => {
  it("joins multiple class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("filters out falsy values", () => {
    expect(cn("foo", false, "bar", null, undefined, "baz")).toBe("foo bar baz");
  });

  it("returns empty string for no truthy classes", () => {
    expect(cn(false, null, undefined)).toBe("");
  });

  it("handles single class", () => {
    expect(cn("only")).toBe("only");
  });
});

// ---------------------------------------------------------------------------
// formatCurrency
// ---------------------------------------------------------------------------

describe("formatCurrency", () => {
  it("formats whole numbers without decimals", () => {
    expect(formatCurrency(4200)).toBe("$4,200");
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("$0");
  });

  it("formats large numbers with commas", () => {
    expect(formatCurrency(1250000)).toBe("$1,250,000");
  });

  it("rounds decimal amounts", () => {
    // minimumFractionDigits: 0, maximumFractionDigits: 0
    expect(formatCurrency(4200.75)).toBe("$4,201");
  });

  it("formats negative amounts", () => {
    const result = formatCurrency(-500);
    expect(result).toContain("500");
  });
});

// ---------------------------------------------------------------------------
// formatDate
// ---------------------------------------------------------------------------

describe("formatDate", () => {
  it("formats ISO date string", () => {
    const result = formatDate("2024-01-15T00:00:00Z");
    expect(result).toContain("January");
    expect(result).toContain("15");
    expect(result).toContain("2024");
  });

  it("formats date-only string", () => {
    const result = formatDate("2024-06-01");
    expect(result).toContain("2024");
  });
});

// ---------------------------------------------------------------------------
// getStatusLabel
// ---------------------------------------------------------------------------

describe("getStatusLabel", () => {
  it("returns correct label for each status", () => {
    expect(getStatusLabel("setup")).toBe("Setting Up");
    expect(getStatusLabel("documenting")).toBe("Documenting");
    expect(getStatusLabel("policy_review")).toBe("Policy Review");
    expect(getStatusLabel("filed")).toBe("Filed with Insurer");
    expect(getStatusLabel("offer_received")).toBe("Offer Received");
    expect(getStatusLabel("negotiating")).toBe("Negotiating");
    expect(getStatusLabel("escalating")).toBe("Escalating");
    expect(getStatusLabel("resolved")).toBe("Resolved");
  });
});

// ---------------------------------------------------------------------------
// getStatusColor
// ---------------------------------------------------------------------------

describe("getStatusColor", () => {
  it("returns a tailwind class string for each status", () => {
    expect(getStatusColor("setup")).toContain("bg-");
    expect(getStatusColor("resolved")).toContain("green");
    expect(getStatusColor("negotiating")).toContain("red");
  });
});

// ---------------------------------------------------------------------------
// getFairnessColor
// ---------------------------------------------------------------------------

describe("getFairnessColor", () => {
  it("returns green for scores >= 80", () => {
    expect(getFairnessColor(80)).toContain("green");
    expect(getFairnessColor(95)).toContain("green");
  });

  it("returns yellow for scores 60-79", () => {
    expect(getFairnessColor(60)).toContain("yellow");
    expect(getFairnessColor(79)).toContain("yellow");
  });

  it("returns red for scores < 60", () => {
    expect(getFairnessColor(59)).toContain("red");
    expect(getFairnessColor(0)).toContain("red");
  });
});

// ---------------------------------------------------------------------------
// getFairnessLabel
// ---------------------------------------------------------------------------

describe("getFairnessLabel", () => {
  it("returns correct labels for score ranges", () => {
    expect(getFairnessLabel(80)).toBe("Fair Offer");
    expect(getFairnessLabel(100)).toBe("Fair Offer");
    expect(getFairnessLabel(60)).toBe("Borderline");
    expect(getFairnessLabel(79)).toBe("Borderline");
    expect(getFairnessLabel(59)).toBe("Below Fair Value");
    expect(getFairnessLabel(0)).toBe("Below Fair Value");
  });
});

// ---------------------------------------------------------------------------
// getProgressPercentage
// ---------------------------------------------------------------------------

describe("getProgressPercentage", () => {
  it("returns correct percentages for each status", () => {
    expect(getProgressPercentage("setup")).toBe(10);
    expect(getProgressPercentage("documenting")).toBe(25);
    expect(getProgressPercentage("policy_review")).toBe(40);
    expect(getProgressPercentage("filed")).toBe(55);
    expect(getProgressPercentage("offer_received")).toBe(65);
    expect(getProgressPercentage("negotiating")).toBe(80);
    expect(getProgressPercentage("escalating")).toBe(90);
    expect(getProgressPercentage("resolved")).toBe(100);
  });

  it("returns increasing values as claim progresses", () => {
    const statuses = [
      "setup", "documenting", "policy_review", "filed",
      "offer_received", "negotiating", "escalating", "resolved",
    ] as const;
    for (let i = 1; i < statuses.length; i++) {
      expect(getProgressPercentage(statuses[i])).toBeGreaterThan(
        getProgressPercentage(statuses[i - 1])
      );
    }
  });
});
