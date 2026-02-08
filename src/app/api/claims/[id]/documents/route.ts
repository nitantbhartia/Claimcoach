import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify claim ownership explicitly
    const { data: claim } = await supabase
      .from("claims")
      .select("id, user_id")
      .eq("id", params.id)
      .eq("user_id", user.id)
      .single();

    if (!claim) {
      return NextResponse.json({ error: "Claim not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const category = formData.get("category") as string || "other";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file size (50MB max)
    const MAX_FILE_SIZE = 50 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum 50MB." },
        { status: 413 }
      );
    }

    // Validate file type
    const ALLOWED_TYPES = new Set([
      "image/jpeg", "image/png", "image/webp", "image/gif",
      "application/pdf",
    ]);
    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "File type not allowed. Use JPEG, PNG, WebP, GIF, or PDF." },
        { status: 400 }
      );
    }

    // Sanitize filename: strip path separators and use timestamp prefix
    const safeName = file.name.replace(/[/\\:*?"<>|]/g, "_").slice(0, 100);
    const filePath = `${user.id}/${params.id}/${Date.now()}-${safeName}`;
    const { error: uploadError } = await supabase.storage
      .from("claim-documents")
      .upload(filePath, file);

    if (uploadError) {
      return NextResponse.json(
        { error: uploadError.message },
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
      return NextResponse.json({ error: docError.message }, { status: 500 });
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
    const supabase = createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { documentId } = await request.json();

    const { error } = await supabase
      .from("claim_documents")
      .delete()
      .eq("id", documentId)
      .eq("claim_id", params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
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
