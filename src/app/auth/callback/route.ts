import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const rawNext = searchParams.get("next") ?? "/dashboard";

  // Prevent open redirect: only allow internal paths
  const next =
    rawNext.startsWith("/") && !rawNext.startsWith("//") && !rawNext.includes("://")
      ? rawNext
      : "/dashboard";

  if (code) {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return the user to an error page or login with error
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
