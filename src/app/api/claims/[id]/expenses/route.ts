import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, DEV_USER } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerSupabaseClient();
    let user: { id: string; email?: string } | null = null;

    if (!isSupabaseConfigured()) {
      user = DEV_USER;
    } else {
      const { data } = await supabase.auth.getUser();
      user = data.user;
    }

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify claim ownership explicitly to prevent IDOR
    const { data: claim } = await supabase
      .from("claims")
      .select("id, user_id")
      .eq("id", params.id)
      .eq("user_id", user.id)
      .single();

    if (!claim) {
      return NextResponse.json({ error: "Claim not found" }, { status: 404 });
    }

    const body = await request.json();

    const { data, error } = await supabase
      .from("financial_impacts")
      .insert({
        claim_id: params.id,
        category: body.category,
        description: body.description,
        amount: body.amount,
        date: body.date,
        receipt_url: body.receipt_url || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Create expense DB error:", error);
      return NextResponse.json(
        { error: "Failed to create expense" },
        { status: 500 }
      );
    }

    return NextResponse.json({ expense: data }, { status: 201 });
  } catch (error) {
    console.error("Create expense error:", error);
    return NextResponse.json(
      { error: "Failed to create expense" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerSupabaseClient();
    let user: { id: string; email?: string } | null = null;

    if (!isSupabaseConfigured()) {
      user = DEV_USER;
    } else {
      const { data } = await supabase.auth.getUser();
      user = data.user;
    }

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify claim ownership explicitly to prevent IDOR
    const { data: claim } = await supabase
      .from("claims")
      .select("id, user_id")
      .eq("id", params.id)
      .eq("user_id", user.id)
      .single();

    if (!claim) {
      return NextResponse.json({ error: "Claim not found" }, { status: 404 });
    }

    const { expenseId } = await request.json();

    const { error } = await supabase
      .from("financial_impacts")
      .delete()
      .eq("id", expenseId)
      .eq("claim_id", params.id);

    if (error) {
      console.error("Delete expense DB error:", error);
      return NextResponse.json(
        { error: "Failed to delete expense" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete expense error:", error);
    return NextResponse.json(
      { error: "Failed to delete expense" },
      { status: 500 }
    );
  }
}
