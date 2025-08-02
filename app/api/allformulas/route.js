import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Formula from "@/models/Formula";

// GET - Get all formulas (no auth restriction)
export async function GET() {
  try {
    await connectMongoDB();

    const formulas = await Formula.find().sort({ createdAt: -1 });

    return NextResponse.json({ formulas });
  } catch (error) {
    console.error("Error fetching all formulas:", error);
    return NextResponse.json(
      { error: "Failed to fetch all formulas" },
      { status: 500 }
    );
  }
}
