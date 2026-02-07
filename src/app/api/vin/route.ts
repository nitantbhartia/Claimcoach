import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

interface NHTSAResult {
  Variable: string;
  Value: string | null;
}

export async function GET(request: NextRequest) {
  const vin = request.nextUrl.searchParams.get("vin");

  if (!vin || vin.length !== 17) {
    return NextResponse.json(
      { error: "A valid 17-character VIN is required" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${encodeURIComponent(vin)}?format=json`,
      { next: { revalidate: 86400 } } // cache for 24h
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "NHTSA API request failed" },
        { status: 502 }
      );
    }

    const data = await res.json();
    const results: Record<string, string | null> = data.Results?.[0] ?? {};

    // Check for decode errors
    const errorCode = results.ErrorCode;
    if (errorCode && errorCode !== "0" && !errorCode.includes("0")) {
      return NextResponse.json(
        { error: "Could not decode VIN. Please check and try again.", details: results.ErrorText },
        { status: 422 }
      );
    }

    return NextResponse.json({
      vin: vin.toUpperCase(),
      year: results.ModelYear || null,
      make: results.Make || null,
      model: results.Model || null,
      trim: results.Trim || null,
      body_class: results.BodyClass || null,
      drive_type: results.DriveType || null,
      fuel_type: results.FuelTypePrimary || null,
      engine: [results.DisplacementL ? `${results.DisplacementL}L` : null, results.EngineCylinders ? `${results.EngineCylinders}-cyl` : null]
        .filter(Boolean)
        .join(" ") || null,
      vehicle_type: results.VehicleType || null,
    });
  } catch (error) {
    console.error("VIN decode error:", error);
    return NextResponse.json(
      { error: "Failed to decode VIN" },
      { status: 500 }
    );
  }
}
