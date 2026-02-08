import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_PDF_SIZE = 50 * 1024 * 1024; // 50MB

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "File must be a PDF" },
        { status: 400 }
      );
    }

    if (file.size > MAX_PDF_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum 50MB." },
        { status: 413 }
      );
    }

    // Convert file to Uint8Array for pdf-parse v2
    const bytes = await file.arrayBuffer();
    const data = new Uint8Array(bytes);

    // pdf-parse v2 uses a class-based API
    const { PDFParse } = await import("pdf-parse");
    const parser = new PDFParse({ data });
    const textResult = await parser.getText();
    const infoResult = await parser.getInfo();
    await parser.destroy();

    if (!textResult.text || textResult.text.trim().length === 0) {
      return NextResponse.json(
        { error: "Could not extract text from PDF. The file may be image-based or empty." },
        { status: 422 }
      );
    }

    return NextResponse.json({
      text: textResult.text,
      pages: textResult.total,
      info: infoResult.info,
    });
  } catch (error) {
    console.error("PDF extraction error:", error);
    return NextResponse.json(
      { error: "Failed to extract text from PDF" },
      { status: 500 }
    );
  }
}
