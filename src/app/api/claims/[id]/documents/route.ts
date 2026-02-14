import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { requireAuth, isSupabaseConfigured } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_TYPES = new Set([
  "image/jpeg", "image/png", "image/webp", "image/gif",
  "application/pdf",
]);
const VALID_CATEGORIES = new Set([
  "insurance_card", "offer_letter", "policy", "damage_photo",
  "repair_estimate", "receipt", "correspondence", "other",
]);

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const rl = checkRateLimit(`${auth.user.id}:upload-doc`, RATE_LIMITS.write.limit, RATE_LIMITS.write.windowMs);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: `Rate limit exceeded. Try again in ${rl.resetIn}s.` },
        { status: 429, headers: { "Retry-After": String(rl.resetIn) } }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "Database is not configured." },
        { status: 503 }
      );
    }

    const supabase = createServerSupabaseClient();

    // Verify claim ownership explicitly
    const { data: claim } = await supabase
      .from("claims")
      .select("id, user_id")
      .eq("id", params.id)
      .eq("user_id", auth.user.id)
      .single();

    if (!claim) {
      return NextResponse.json({ error: "Claim not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const rawCategory = formData.get("category") as string || "other";
    const category = VALID_CATEGORIES.has(rawCategory) ? rawCategory : "other";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum 50MB." },
        { status: 413 }
      );
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "File type not allowed. Use JPEG, PNG, WebP, GIF, or PDF." },
        { status: 400 }
      );
    }

    // Sanitize filename: strip path separators and use timestamp prefix
    const safeName = file.name.replace(/[/\\:*?"<>|]/g, "_").slice(0, 100);
    const filePath = `${auth.user.id}/${params.id}/${Date.now()}-${safeName}`;
    const { error: uploadError } = await supabase.storage
      .from("claim-documents")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload storage error:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("claim-documents")
      .getPublicUrl(filePath);

    // Create document record
    const { data: doc, error: docError } = await supabase
      .from("claim_documents")
      .insert({
        claim_id: params.id,
        category,
        file_name: file.name,
        file_url: urlData.publicUrl,
        file_type: file.type,
        file_size: file.size,
      })
      .select()
      .single();

    if (docError) {
      console.error("Create document record error:", docError);
      return NextResponse.json({ error: "Failed to save document record" }, { status: 500 });
    }

    return NextResponse.json({ document: doc }, { status: 201 });
  } catch (error) {
    console.error("Upload document error:", error);
    return NextResponse.json(
      { error: "Failed to upload document" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "Database is not configured." },
        { status: 503 }
      );
    }

    const supabase = createServerSupabaseClient();

    // Verify claim ownership for DELETE too
    const { data: claim } = await supabase
      .from("claims")
      .select("id, user_id")
      .eq("id", params.id)
      .eq("user_id", auth.user.id)
      .single();

    if (!claim) {
      return NextResponse.json({ error: "Claim not found" }, { status: 404 });
    }

    const { documentId } = await request.json();

    if (!documentId || typeof documentId !== "string") {
      return NextResponse.json({ error: "documentId is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("claim_documents")
      .delete()
      .eq("id", documentId)
      .eq("claim_id", params.id);

    if (error) {
      console.error("Delete document error:", error);
      return NextResponse.json({ error: "Failed to delete document" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete document error:", error);
    return NextResponse.json(
      { error: "Failed to delete document" },
      { status: 500 }
    );
  }
}
