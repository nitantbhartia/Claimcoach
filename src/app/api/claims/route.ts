import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// Create a new claim
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // In production, this would save to Supabase
    // For now, return a mock response with a generated ID
    const claimId = crypto.randomUUID();

    const claim = {
      id: claimId,
      ...body,
      status: "setup",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return NextResponse.json({ claim }, { status: 201 });
  } catch (error) {
    console.error("Create claim error:", error);
    return NextResponse.json(
      { error: "Failed to create claim" },
      { status: 500 }
    );
  }
}

// List claims for a user
export async function GET() {
  try {
    // In production, this would fetch from Supabase with auth
    const claims = [
      {
        id: "demo",
        claim_type: "auto",
        status: "offer_received",
        insurer_name: "State Farm",
        accident_date: "2026-01-15",
        offer_amount: 4200,
        vehicle: "2022 Honda Civic",
        created_at: "2026-01-16T10:00:00Z",
        updated_at: "2026-02-01T14:30:00Z",
      },
    ];

    return NextResponse.json({ claims });
  } catch (error) {
    console.error("List claims error:", error);
    return NextResponse.json(
      { error: "Failed to fetch claims" },
      { status: 500 }
    );
  }
}
