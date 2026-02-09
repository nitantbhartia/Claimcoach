import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Mock Supabase before importing routes
// ---------------------------------------------------------------------------

const mockUser = { id: "user-123", email: "test@example.com" };
const mockChain = {
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  single: vi.fn(),
  order: vi.fn(),
  limit: vi.fn(),
};
const mockFrom = vi.fn().mockReturnValue(mockChain);
const mockGetUser = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createServerSupabaseClient: () => ({
    from: mockFrom,
    auth: { getUser: mockGetUser },
  }),
}));

// Import AFTER mocks
import { POST, GET } from "@/app/api/claims/route";
import { GET as GET_CLAIM, PATCH } from "@/app/api/claims/[id]/route";
import { NextRequest } from "next/server";

function makeRequest(url: string, opts?: { method?: string; body?: unknown }) {
  const init: RequestInit = { method: opts?.method ?? "GET" };
  if (opts?.body) {
    init.method = "POST";
    init.body = JSON.stringify(opts.body);
    init.headers = { "Content-Type": "application/json" };
  }
  return new NextRequest(new URL(url, "http://localhost:3000"), init);
}

beforeEach(() => {
  vi.clearAllMocks();
  mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
});

// ---------------------------------------------------------------------------
// POST /api/claims
// ---------------------------------------------------------------------------

describe("POST /api/claims", () => {
  it("returns 401 when not authenticated", async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: null }, error: null });

    const req = makeRequest("http://localhost:3000/api/claims", {
      body: { claim_type: "auto" },
    });
    const res = await POST(req);

    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toBe("Unauthorized");
  });

  it("creates a claim with correct fields", async () => {
    const claimData = {
      claim_type: "auto",
      accident_date: "2024-01-15",
      fault_status: "not_at_fault",
      filed_with_insurer: true,
      insurer_name: "State Farm",
      claim_number: "CLM-12345",
      has_offer: false,
      vehicle_year: "2020",
      vehicle_make: "Toyota",
      vehicle_model: "Camry",
      damage_description: "Rear bumper dented",
      state: "CA",
    };

    mockChain.single.mockResolvedValueOnce({
      data: { id: "claim-1", ...claimData, user_id: "user-123" },
      error: null,
    });

    const req = makeRequest("http://localhost:3000/api/claims", { body: claimData });
    const res = await POST(req);

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.claim.id).toBe("claim-1");
    expect(body.claim.insurer_name).toBe("State Farm");

    // Verify the insert was called with correct data
    expect(mockFrom).toHaveBeenCalledWith("claims");
    const insertCall = mockChain.insert.mock.calls[0][0];
    expect(insertCall.user_id).toBe("user-123");
    expect(insertCall.claim_type).toBe("auto");
    expect(insertCall.state).toBe("CA");
    expect(insertCall.status).toBe("documenting"); // has_offer: false
  });

  it("sets status to offer_received when has_offer is true", async () => {
    mockChain.single.mockResolvedValueOnce({
      data: { id: "claim-2", status: "offer_received" },
      error: null,
    });

    const req = makeRequest("http://localhost:3000/api/claims", {
      body: { has_offer: true, offer_amount: 4200 },
    });
    await POST(req);

    const insertCall = mockChain.insert.mock.calls[0][0];
    expect(insertCall.status).toBe("offer_received");
    expect(insertCall.offer_amount).toBe(4200);
  });

  it("returns 500 on database error", async () => {
    mockChain.single.mockResolvedValueOnce({
      data: null,
      error: { message: "connection failed" },
    });

    const req = makeRequest("http://localhost:3000/api/claims", {
      body: { claim_type: "auto" },
    });
    const res = await POST(req);

    expect(res.status).toBe(500);
    const body = await res.json();
    // Should NOT leak Supabase error details
    expect(body.error).toBe("Failed to create claim");
    expect(body.error).not.toContain("connection");
  });
});

// ---------------------------------------------------------------------------
// GET /api/claims
// ---------------------------------------------------------------------------

describe("GET /api/claims", () => {
  it("returns 401 when not authenticated", async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: null }, error: null });

    const res = await GET();

    expect(res.status).toBe(401);
  });

  it("returns user claims with explicit user_id filter", async () => {
    const claims = [
      { id: "c1", insurer_name: "Geico" },
      { id: "c2", insurer_name: "State Farm" },
    ];

    mockChain.order.mockResolvedValueOnce({ data: claims, error: null });

    const res = await GET();

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.claims).toHaveLength(2);

    // Verify user_id filter applied (defense-in-depth)
    expect(mockChain.eq).toHaveBeenCalledWith("user_id", "user-123");
  });

  it("returns empty array when no claims", async () => {
    mockChain.order.mockResolvedValueOnce({ data: null, error: null });

    const res = await GET();

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.claims).toEqual([]);
  });

  it("returns generic error on database failure", async () => {
    mockChain.order.mockResolvedValueOnce({
      data: null,
      error: { message: "RLS violation" },
    });

    const res = await GET();

    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBe("Failed to fetch claims");
    expect(body.error).not.toContain("RLS");
  });
});

// ---------------------------------------------------------------------------
// GET /api/claims/[id]
// ---------------------------------------------------------------------------

describe("GET /api/claims/[id]", () => {
  it("returns 401 when not authenticated", async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: null }, error: null });

    const req = makeRequest("http://localhost:3000/api/claims/claim-1");
    const res = await GET_CLAIM(req, { params: { id: "claim-1" } });

    expect(res.status).toBe(401);
  });

  it("returns 404 when claim not found", async () => {
    mockChain.single.mockResolvedValueOnce({ data: null, error: { code: "PGRST116" } });

    const req = makeRequest("http://localhost:3000/api/claims/nonexistent");
    const res = await GET_CLAIM(req, { params: { id: "nonexistent" } });

    expect(res.status).toBe(404);
  });

  it("filters by user_id for IDOR protection", async () => {
    // Claim fetch
    mockChain.single.mockResolvedValueOnce({
      data: { id: "claim-1", user_id: "user-123" },
      error: null,
    });
    // Documents, expenses, policy, offer, counter queries
    const emptyResult = { data: [], error: null };
    mockChain.order.mockResolvedValue(emptyResult);
    mockChain.limit.mockResolvedValue(emptyResult);
    // Profile
    mockChain.single.mockResolvedValueOnce({
      data: { subscription_tier: "free" },
      error: null,
    });

    const req = makeRequest("http://localhost:3000/api/claims/claim-1");
    await GET_CLAIM(req, { params: { id: "claim-1" } });

    // Verify user_id filter was applied on the claims query
    expect(mockChain.eq).toHaveBeenCalledWith("id", "claim-1");
    expect(mockChain.eq).toHaveBeenCalledWith("user_id", "user-123");
  });
});

// ---------------------------------------------------------------------------
// PATCH /api/claims/[id]
// ---------------------------------------------------------------------------

describe("PATCH /api/claims/[id]", () => {
  it("returns 401 when not authenticated", async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: null }, error: null });

    const req = new NextRequest(
      new URL("http://localhost:3000/api/claims/claim-1"),
      {
        method: "PATCH",
        body: JSON.stringify({ status: "negotiating" }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const res = await PATCH(req, { params: { id: "claim-1" } });

    expect(res.status).toBe(401);
  });

  it("only allows whitelisted fields", async () => {
    mockChain.single.mockResolvedValueOnce({
      data: { id: "claim-1", status: "negotiating" },
      error: null,
    });

    const req = new NextRequest(
      new URL("http://localhost:3000/api/claims/claim-1"),
      {
        method: "PATCH",
        body: JSON.stringify({
          status: "negotiating",
          user_id: "hacker-456",       // BLOCKED: not in whitelist
          subscription_tier: "pro",    // BLOCKED: not in whitelist
          offer_amount: 5000,          // ALLOWED
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    await PATCH(req, { params: { id: "claim-1" } });

    // The update call should only contain whitelisted fields
    const updateCall = mockChain.update.mock.calls[0][0];
    expect(updateCall.status).toBe("negotiating");
    expect(updateCall.offer_amount).toBe(5000);
    expect(updateCall).not.toHaveProperty("user_id");
    expect(updateCall).not.toHaveProperty("subscription_tier");
  });

  it("rejects request with no valid fields", async () => {
    const req = new NextRequest(
      new URL("http://localhost:3000/api/claims/claim-1"),
      {
        method: "PATCH",
        body: JSON.stringify({
          user_id: "hacker",
          created_at: "2020-01-01",
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const res = await PATCH(req, { params: { id: "claim-1" } });

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("No valid fields to update");
  });

  it("applies user_id filter on update for IDOR protection", async () => {
    mockChain.single.mockResolvedValueOnce({
      data: { id: "claim-1", status: "negotiating" },
      error: null,
    });

    const req = new NextRequest(
      new URL("http://localhost:3000/api/claims/claim-1"),
      {
        method: "PATCH",
        body: JSON.stringify({ status: "negotiating" }),
        headers: { "Content-Type": "application/json" },
      }
    );

    await PATCH(req, { params: { id: "claim-1" } });

    // Should have eq("user_id", "user-123") in the chain
    expect(mockChain.eq).toHaveBeenCalledWith("user_id", "user-123");
  });

  it("allows state field in whitelist", async () => {
    mockChain.single.mockResolvedValueOnce({
      data: { id: "claim-1", state: "CA" },
      error: null,
    });

    const req = new NextRequest(
      new URL("http://localhost:3000/api/claims/claim-1"),
      {
        method: "PATCH",
        body: JSON.stringify({ state: "CA" }),
        headers: { "Content-Type": "application/json" },
      }
    );

    await PATCH(req, { params: { id: "claim-1" } });

    const updateCall = mockChain.update.mock.calls[0][0];
    expect(updateCall.state).toBe("CA");
  });
});
