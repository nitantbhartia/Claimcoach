import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const DEV_USER = { id: "dev-user-id", email: "dev@claimcoach.local" };

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key && !url.includes("placeholder"));
}

/**
 * Verify the request is from an authenticated user.
 * Returns the user object or a 401 NextResponse.
 *
 * When Supabase is not configured (dev/preview), returns a
 * placeholder user to stay consistent with middleware which
 * also bypasses auth in that scenario.
 */
export async function requireAuth(): Promise<
  | { user: { id: string; email?: string }; error?: never }
  | { user?: never; error: NextResponse }
> {
  if (!isSupabaseConfigured()) {
    return { user: DEV_USER };
  }

  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { user };
}

export { isSupabaseConfigured, DEV_USER };
