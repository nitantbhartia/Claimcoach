import { NextRequest, NextResponse } from "next/server";
import { analyzeWithAI, isAIConfigured, getAIErrorMessage } from "@/lib/ai/client";
import { requireAuth } from "@/lib/auth";
import { sanitizeField, extractJSON } from "@/lib/ai/sanitize";

export const runtime = "nodejs";
export const maxDuration = 30;

const COMPARABLES_PROMPT = `You are an automotive market research assistant. Given a vehicle's year, make, model, and location (state), find realistic comparable vehicle listings that would be currently available for sale near that location.

Return 5-8 comparable vehicles as JSON. Each comparable should represent a realistic listing — vary the mileage, condition, and price realistically. Prices should generally cluster around fair market value for the vehicle.

Vehicle: {vehicleInfo}
State: {state}
Mileage (if known): {mileage}

Respond ONLY with JSON in this format:
{
  "fair_market_estimate": <number - your best estimate of fair market value>,
  "comparables": [
    {
      "title": "<year> <make> <model> <trim if applicable>",
      "price": <number - listing price>,
      "mileage": <number - odometer reading>,
      "condition": "<Excellent|Good|Fair>",
      "location": "<City, ST>",
      "distance_miles": <number - distance from user's state>,
      "source": "<dealer name or marketplace>",
      "url": null,
      "notes": "<any relevant detail like color, trim, features>"
    }
  ],
  "summary": "<one paragraph explaining the market for this vehicle and what fair value looks like>"
}`;

// Dev fallback data
const DEV_COMPARABLES = {
  fair_market_estimate: 17800,
  comparables: [
    { title: "2019 Toyota Camry LE", price: 18200, mileage: 42000, condition: "Good", location: "Dallas, TX", distance_miles: 15, source: "AutoNation Toyota", url: null, notes: "Silver, single owner, clean title" },
    { title: "2019 Toyota Camry SE", price: 19500, mileage: 38000, condition: "Excellent", location: "Fort Worth, TX", distance_miles: 30, source: "CarMax", url: null, notes: "Red, sport trim, leather seats" },
    { title: "2019 Toyota Camry LE", price: 16900, mileage: 55000, condition: "Good", location: "Austin, TX", distance_miles: 195, source: "Carvana", url: null, notes: "White, higher mileage but well maintained" },
    { title: "2019 Toyota Camry XLE", price: 20100, mileage: 35000, condition: "Excellent", location: "Houston, TX", distance_miles: 240, source: "Sterling McCall Toyota", url: null, notes: "Black, premium package, navigation" },
    { title: "2020 Toyota Camry LE", price: 19800, mileage: 31000, condition: "Good", location: "San Antonio, TX", distance_miles: 270, source: "Cars.com listing", url: null, notes: "Blue, newer model year comparable" },
    { title: "2019 Toyota Camry LE", price: 17200, mileage: 48000, condition: "Fair", location: "Plano, TX", distance_miles: 20, source: "DriveTime", url: null, notes: "Gray, minor cosmetic wear" },
  ],
  summary: "The 2019 Toyota Camry LE in Texas currently lists between $16,900 and $20,100 depending on mileage and condition. Average retail price for similar vehicles in the DFW metro area is approximately $17,800. Vehicles under 45,000 miles in good condition consistently list above $17,000.",
};

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    if (!isAIConfigured()) {
      return NextResponse.json(DEV_COMPARABLES);
    }

    const body = await request.json();
    const { vehicleYear, vehicleMake, vehicleModel, state, mileage } = body;

    if (!vehicleYear || !vehicleMake || !vehicleModel) {
      return NextResponse.json(
        { error: "Vehicle year, make, and model are required" },
        { status: 400 }
      );
    }

    const vehicleInfo = sanitizeField(`${vehicleYear} ${vehicleMake} ${vehicleModel}`, 200);
    const safeState = sanitizeField(state || "Unknown", 50);
    const safeMileage = sanitizeField(mileage ? String(mileage) : "Unknown", 20);

    const prompt = COMPARABLES_PROMPT
      .replace("{vehicleInfo}", vehicleInfo)
      .replace("{state}", safeState)
      .replace("{mileage}", safeMileage);

    const result = await analyzeWithAI(
      prompt,
      `Find comparable vehicle listings for a ${vehicleInfo} in ${safeState}.`
    );

    const jsonStr = extractJSON(result);
    if (!jsonStr) {
      return NextResponse.json(
        { error: "Failed to parse comparable vehicle data" },
        { status: 500 }
      );
    }

    const data = JSON.parse(jsonStr);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Comparables search error:", error);
    return NextResponse.json(
      { error: getAIErrorMessage(error) },
      { status: 500 }
    );
  }
}
