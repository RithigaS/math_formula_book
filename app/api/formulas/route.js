import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectMongoDB from "@/lib/mongodb";
import Formula from "@/models/Formula";

// GET - Get all formulas for the logged-in user
export async function GET(request) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectMongoDB();

    // Get search parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    // Build query
    let query = { userEmail: session.user.email };

    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const formulas = await Formula.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ formulas });
  } catch (error) {
    console.error("Error fetching formulas:", error);
    return NextResponse.json(
      { error: "Failed to fetch formulas" },
      { status: 500 }
    );
  }
}

// POST - Create a new formula
export async function POST(request) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { title, category, expression, description } = await request.json();

    // Validate required fields
    if (!title || !category || !expression || !description) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const newFormula = new Formula({
      title,
      category,
      expression,
      description,
      userEmail: session.user.email,
    });

    await newFormula.save();

    return NextResponse.json({
      message: "Formula created successfully",
      formula: newFormula,
    });
  } catch (error) {
    console.error("Error creating formula:", error);
    return NextResponse.json(
      { error: "Failed to create formula" },
      { status: 500 }
    );
  }
}
