import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

const mockUser = { id: "user-123", email: "test@example.com" };
const mockGetUser = vi.fn();
const mockChain = {
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  single: vi.fn(),
};
const mockFrom = vi.fn().mockReturnValue(mockChain);

vi.mock("@/lib/supabase/server", () => ({
  createServerSupabaseClient: () => ({
    from: mockFrom,
    auth: { getUser: mockGetUser },
    storage: {
      from: vi.fn().mockReturnValue({
        upload: vi.fn().mockResolvedValue({ data: {}, error: null }),
      }),
    },
  }),
}));

import { POST as expensesPOST, DELETE as expensesDELETE } from "@/app/api/claims/[id]/expenses/route";

function makeRequest(url: string, opts: { method?: string; body?: unknown }) {
  return new NextRequest(new URL(url, "http://localhost:3000"), {
    method: opts.method ?? "POST",
    body: JSON.stringify(opts.body),
    headers: { "Content-Type": "application/json" },
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
});

// ---------------------------------------------------------------------------
// POST /api/claims/[id]/expenses — IDOR protection
// ---------------------------------------------------------------------------

describe("POST /api/claims/[id]/expenses", () => {
  it("returns 401 when not authenticated", async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: null }, error: null });

    const req = makeRequest("/api/claims/claim-1/expenses", {
      body: { category: "repair", amount: 500 },
    });
    const res = await expensesPOST(req, { params: { id: "claim-1" } });

    expect(res.status).toBe(401);
  });

  it("returns 404 when claim does not belong to user (IDOR protection)", async () => {
    // First call: ownership check fails
    mockChain.single.mockResolvedValueOnce({ data: null, error: null });

    const req = makeRequest("/api/claims/other-user-claim/expenses", {
      body: { category: "repair", amount: 500 },
    });
    const res = await expensesPOST(req, { params: { id: "other-user-claim" } });

    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.error).toBe("Claim not found");

    // Verify we checked both claim ID and user ID
    expect(mockChain.eq).toHaveBeenCalledWith("id", "other-user-claim");
    expect(mockChain.eq).toHaveBeenCalledWith("user_id", "user-123");
  });

  it("creates expense when claim belongs to user", async () => {
    // Ownership check passes
    mockChain.single
      .mockResolvedValueOnce({
        data: { id: "claim-1", user_id: "user-123" },
        error: null,
      })
      // Insert result
      .mockResolvedValueOnce({
        data: { id: "exp-1", category: "repair", amount: 500 },
        error: null,
      });

    const req = makeRequest("/api/claims/claim-1/expenses", {
      body: {
        category: "repair",
        description: "Bumper repair",
        amount: 500,
        date: "2024-01-15",
      },
    });
    const res = await expensesPOST(req, { params: { id: "claim-1" } });

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.expense.id).toBe("exp-1");
  });
});

// ---------------------------------------------------------------------------
// DELETE /api/claims/[id]/expenses — IDOR protection
// ---------------------------------------------------------------------------

describe("DELETE /api/claims/[id]/expenses", () => {
  it("returns 401 when not authenticated", async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: null }, error: null });

    const req = makeRequest("/api/claims/claim-1/expenses", {
      method: "DELETE",
      body: { expenseId: "exp-1" },
    });
    const res = await expensesDELETE(req, { params: { id: "claim-1" } });

    expect(res.status).toBe(401);
  });

  it("returns 404 when claim does not belong to user", async () => {
    mockChain.single.mockResolvedValueOnce({ data: null, error: null });

    const req = makeRequest("/api/claims/other-claim/expenses", {
      method: "DELETE",
      body: { expenseId: "exp-1" },
    });
    const res = await expensesDELETE(req, { params: { id: "other-claim" } });

    expect(res.status).toBe(404);
  });

  it("deletes expense when authorized", async () => {
    // Ownership check — the chain is: from().select().eq().eq().single()
    mockChain.single.mockResolvedValueOnce({
      data: { id: "claim-1", user_id: "user-123" },
      error: null,
    });

    // Delete chain — from().delete().eq().eq()
    // The last .eq() needs to resolve with { error }
    // Since our mock .eq() returns `this` by default, we need the chain
    // to eventually resolve. The delete handler's chain ends at .eq(),
    // which returns the chain object. The handler then checks `error` on the result.
    // We mock the chain itself to have an `error` property for this case.
    Object.defineProperty(mockChain, "error", {
      value: null,
      writable: true,
      configurable: true,
    });

    const req = makeRequest("/api/claims/claim-1/expenses", {
      method: "DELETE",
      body: { expenseId: "exp-1" },
    });
    const res = await expensesDELETE(req, { params: { id: "claim-1" } });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);

    // Clean up
    delete (mockChain as Record<string, unknown>).error;
  });
});
