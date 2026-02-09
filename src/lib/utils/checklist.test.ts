import { describe, it, expect } from "vitest";
import { autoClaimChecklist } from "./checklist";

describe("autoClaimChecklist", () => {
  it("has at least 10 checklist items", () => {
    expect(autoClaimChecklist.length).toBeGreaterThanOrEqual(10);
  });

  it("every item has required fields", () => {
    for (const item of autoClaimChecklist) {
      expect(item.id).toBeDefined();
      expect(typeof item.id).toBe("string");
      expect(item.label).toBeDefined();
      expect(item.description).toBeDefined();
      expect(typeof item.completed).toBe("boolean");
      expect(item.category).toBeDefined();
      expect(typeof item.required).toBe("boolean");
    }
  });

  it("all items start as not completed", () => {
    for (const item of autoClaimChecklist) {
      expect(item.completed).toBe(false);
    }
  });

  it("has unique IDs", () => {
    const ids = autoClaimChecklist.map((item) => item.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("contains required photo items", () => {
    const requiredPhotos = autoClaimChecklist.filter(
      (item) => item.category === "vehicle_damage" && item.required
    );
    expect(requiredPhotos.length).toBeGreaterThanOrEqual(5);
  });

  it("contains scene documentation items", () => {
    const sceneItems = autoClaimChecklist.filter(
      (item) => item.category === "accident_scene"
    );
    expect(sceneItems.length).toBeGreaterThanOrEqual(2);
  });

  it("has valid categories", () => {
    const validCategories = new Set([
      "vehicle_damage",
      "accident_scene",
      "police_report",
      "medical_records",
      "repair_estimates",
      "receipts",
      "policy",
      "correspondence",
      "other",
    ]);

    for (const item of autoClaimChecklist) {
      expect(validCategories.has(item.category)).toBe(true);
    }
  });
});
