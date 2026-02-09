import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// Mock Supabase SSR
// ---------------------------------------------------------------------------

const mockGetUser = vi.fn();

vi.mock("@supabase/ssr", () => ({
  createServerClient: () => ({
    auth: { getUser: mockGetUser },
  }),
}));

// Mock next/headers cookies
vi.mock("next/headers", () => ({
  cookies: () => ({
    get: vi.fn().mockReturnValue(undefined),
    set: vi.fn(),
  }),
}));

// Set env vars before middleware import
vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://test.supabase.co");
vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-key");

import { middleware } from "@/middleware";

function makeRequest(pathname: string) {
  return new NextRequest(new URL(pathname, "http://localhost:3000"));
}

beforeEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// Middleware route protection
// ---------------------------------------------------------------------------

describe("Middleware", () => {
  it("redirects unauthenticated user from /dashboard to /login", async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: null });

    const req = makeRequest("/dashboard");
    const res = await middleware(req);

    expect(res.status).toBe(307); // redirect
    expect(res.headers.get("Location")).toContain("/login");
    expect(res.headers.get("Location")).toContain("next=%2Fdashboard");
  });

  it("redirects unauthenticated user from /claims/xyz to /login", async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: null });

    const req = makeRequest("/claims/abc-123");
    const res = await middleware(req);

    expect(res.status).toBe(307);
    expect(res.headers.get("Location")).toContain("/login");
  });

  it("redirects unauthenticated user from /claims/new to /login", async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: null });

    const req = makeRequest("/claims/new");
    const res = await middleware(req);

    expect(res.status).toBe(307);
    expect(res.headers.get("Location")).toContain("/login");
  });

  it("allows authenticated user to access /dashboard", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
      error: null,
    });

    const req = makeRequest("/dashboard");
    const res = await middleware(req);

    // Not a redirect
    expect(res.status).toBe(200);
  });

  it("redirects authenticated user from /login to /dashboard", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
      error: null,
    });

    const req = makeRequest("/login");
    const res = await middleware(req);

    expect(res.status).toBe(307);
    expect(res.headers.get("Location")).toContain("/dashboard");
  });

  it("redirects authenticated user from /signup to /dashboard", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
      error: null,
    });

    const req = makeRequest("/signup");
    const res = await middleware(req);

    expect(res.status).toBe(307);
    expect(res.headers.get("Location")).toContain("/dashboard");
  });

  it("allows unauthenticated user to access public routes", async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: null });

    const routes = ["/", "/about", "/pricing"];
    for (const route of routes) {
      const req = makeRequest(route);
      const res = await middleware(req);
      expect(res.status).toBe(200);
    }
  });

  it("preserves the requested path in the next param on redirect", async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: null });

    const req = makeRequest("/claims/abc-123/offer");
    const res = await middleware(req);

    const location = res.headers.get("Location") ?? "";
    expect(location).toContain("next=");
    expect(location).toContain("%2Fclaims%2Fabc-123%2Foffer");
  });
});
