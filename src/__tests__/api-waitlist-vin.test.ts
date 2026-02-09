import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// Mocks for waitlist
// ---------------------------------------------------------------------------

const mockUpsert = vi.fn();
vi.mock("@/lib/supabase/server", () => ({
  createServerSupabaseClient: () => ({
    from: () => ({
      upsert: mockUpsert,
    }),
  }),
}));

import { POST as waitlistPOST } from "@/app/api/waitlist/route";

function makeRequest(url: string, body: unknown) {
  return new NextRequest(new URL(url, "http://localhost:3000"), {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  mockUpsert.mockResolvedValue({ error: null });
});

// ---------------------------------------------------------------------------
// POST /api/waitlist
// ---------------------------------------------------------------------------

describe("POST /api/waitlist", () => {
  it("returns 400 for missing email", async () => {
    const req = makeRequest("/api/waitlist", { interest: "home" });
    const res = await waitlistPOST(req);

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Valid email is required");
  });

  it("returns 400 for invalid email (no @)", async () => {
    const req = makeRequest("/api/waitlist", { email: "notanemail" });
    const res = await waitlistPOST(req);

    expect(res.status).toBe(400);
  });

  it("returns 400 for non-string email", async () => {
    const req = makeRequest("/api/waitlist", { email: 12345 });
    const res = await waitlistPOST(req);

    expect(res.status).toBe(400);
  });

  it("succeeds with valid email", async () => {
    const req = makeRequest("/api/waitlist", {
      email: "user@example.com",
      interest: "home_health",
    });
    const res = await waitlistPOST(req);

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  it("normalizes email to lowercase", async () => {
    const req = makeRequest("/api/waitlist", {
      email: "  USER@EXAMPLE.COM  ",
    });
    await waitlistPOST(req);

    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({ email: "user@example.com" }),
      expect.anything()
    );
  });

  it("defaults interest to general when not provided", async () => {
    const req = makeRequest("/api/waitlist", { email: "test@test.com" });
    await waitlistPOST(req);

    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({ interest: "general" }),
      expect.anything()
    );
  });

  it("returns success even on database error (no email leak)", async () => {
    mockUpsert.mockResolvedValueOnce({ error: { message: "DB error" } });

    const req = makeRequest("/api/waitlist", { email: "user@test.com" });
    const res = await waitlistPOST(req);

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  it("truncates extremely long emails", async () => {
    const longEmail = "a".repeat(400) + "@test.com";
    const req = makeRequest("/api/waitlist", { email: longEmail });
    await waitlistPOST(req);

    const call = mockUpsert.mock.calls[0][0];
    expect(call.email.length).toBeLessThanOrEqual(320);
  });
});

// ---------------------------------------------------------------------------
// GET /api/vin
// ---------------------------------------------------------------------------

describe("GET /api/vin", () => {
  // We need to import VIN route separately without the Supabase mock interfering
  // Since VIN route doesn't use Supabase, we test it directly

  // Import the handler
  let vinGET: typeof import("@/app/api/vin/route").GET;

  beforeEach(async () => {
    const mod = await import("@/app/api/vin/route");
    vinGET = mod.GET;
    // Mock global fetch for NHTSA API
    vi.stubGlobal("fetch", vi.fn());
  });

  it("returns 400 for missing VIN", async () => {
    const req = new NextRequest(new URL("http://localhost:3000/api/vin"));
    const res = await vinGET(req);

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("valid 17-character VIN");
  });

  it("returns 400 for short VIN", async () => {
    const req = new NextRequest(new URL("http://localhost:3000/api/vin?vin=ABC123"));
    const res = await vinGET(req);

    expect(res.status).toBe(400);
  });

  it("returns 400 for VIN with invalid characters (I, O, Q)", async () => {
    // VINs cannot contain I, O, or Q
    const req = new NextRequest(
      new URL("http://localhost:3000/api/vin?vin=1HGBH41JXIN109186")
    );
    const res = await vinGET(req);

    expect(res.status).toBe(400);
  });

  it("accepts valid 17-character VIN", async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({
        Results: [{
          ModelYear: "2020",
          Make: "TOYOTA",
          Model: "CAMRY",
          Trim: "LE",
          BodyClass: "Sedan",
          DriveType: "FWD",
          FuelTypePrimary: "Gasoline",
          DisplacementL: "2.5",
          EngineCylinders: "4",
          VehicleType: "PASSENGER CAR",
          ErrorCode: "0",
        }],
      }),
    };
    vi.mocked(fetch).mockResolvedValueOnce(mockResponse as unknown as Response);

    const req = new NextRequest(
      new URL("http://localhost:3000/api/vin?vin=4T1B11HK5LU123456")
    );
    const res = await vinGET(req);

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.year).toBe("2020");
    expect(body.make).toBe("TOYOTA");
    expect(body.model).toBe("CAMRY");
    expect(body.vin).toBe("4T1B11HK5LU123456");
  });

  it("returns 502 when NHTSA API fails", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    const req = new NextRequest(
      new URL("http://localhost:3000/api/vin?vin=4T1B11HK5LU123456")
    );
    const res = await vinGET(req);

    expect(res.status).toBe(502);
    const body = await res.json();
    expect(body.error).toBe("NHTSA API request failed");
  });

  it("returns 422 for VIN decode errors", async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({
        Results: [{
          ErrorCode: "1",
          ErrorText: "VIN not recognized",
        }],
      }),
    };
    vi.mocked(fetch).mockResolvedValueOnce(mockResponse as unknown as Response);

    const req = new NextRequest(
      new URL("http://localhost:3000/api/vin?vin=4T1B11HK5LU123456")
    );
    const res = await vinGET(req);

    expect(res.status).toBe(422);
    const body = await res.json();
    expect(body.error).not.toContain("ErrorText"); // No detail leakage
  });
});
