import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

/**
 * Verify the request is from an authenticated user.
 * Returns the user object or a 401 NextResponse.
 */
export async function requireAuth(): Promise<
  | { user: { id: string; email?: string }; error?: never }
  | { user?: never; error: NextResponse }
> {
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
