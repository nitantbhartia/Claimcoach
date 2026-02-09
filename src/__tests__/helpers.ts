import { vi } from "vitest";

// ---------------------------------------------------------------------------
// Mock Supabase client builder
// ---------------------------------------------------------------------------

export interface MockSupabaseChain {
  select: ReturnType<typeof vi.fn>;
  insert: ReturnType<typeof vi.fn>;
  update: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
  upsert: ReturnType<typeof vi.fn>;
  eq: ReturnType<typeof vi.fn>;
  single: ReturnType<typeof vi.fn>;
  order: ReturnType<typeof vi.fn>;
  limit: ReturnType<typeof vi.fn>;
}

/**
 * Creates a mock Supabase client with chainable query builder.
 * Configure return values per-test by setting `queryResult`.
 */
export function createMockSupabase(options?: {
  user?: { id: string; email?: string } | null;
  queryResult?: { data: unknown; error: unknown };
}) {
  const user = options?.user ?? null;
  const queryResult = options?.queryResult ?? { data: null, error: null };

  // Each method returns the chain for fluent API
  const chain: MockSupabaseChain = {
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    upsert: vi.fn().mockResolvedValue(queryResult),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue(queryResult),
    order: vi.fn().mockResolvedValue(queryResult),
    limit: vi.fn().mockResolvedValue(queryResult),
  };

  const from = vi.fn().mockReturnValue(chain);

  const supabase = {
    from,
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user },
        error: null,
      }),
    },
    storage: {
      from: vi.fn().mockReturnValue({
        upload: vi.fn().mockResolvedValue({ data: {}, error: null }),
        remove: vi.fn().mockResolvedValue({ data: {}, error: null }),
      }),
    },
  };

  return { supabase, chain, from };
}

// ---------------------------------------------------------------------------
// Mock NextRequest builder
// ---------------------------------------------------------------------------

export function createMockRequest(
  url: string,
  options?: {
    method?: string;
    body?: unknown;
    headers?: Record<string, string>;
  }
): Request {
  const { method = "GET", body, headers = {} } = options ?? {};

  const init: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body && method !== "GET") {
    init.body = JSON.stringify(body);
  }

  return new Request(url, init);
}

// ---------------------------------------------------------------------------
// Response helpers
// ---------------------------------------------------------------------------

export async function parseResponse(response: Response) {
  const json = await response.json();
  return { status: response.status, body: json };
}
