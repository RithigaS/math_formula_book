import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectMongoDB from "@/lib/mongodb";
import Formula from "@/models/Formula";

// GET - Get a single formula by ID (public access)
export async function GET(request, { params }) {
  try {
    await connectMongoDB();

    const formula = await Formula.findById(params.id); // removed userEmail check

    if (!formula) {
      return NextResponse.json({ error: "Formula not found" }, { status: 404 });
    }

    return NextResponse.json({ formula });
  } catch (error) {
    console.error("Error fetching formula:", error);
    return NextResponse.json(
      { error: "Failed to fetch formula" },
      { status: 500 }
    );
  }
}

// PUT - Update a formula
export async function PUT(request, { params }) {
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

    const updatedFormula = await Formula.findOneAndUpdate(
      { _id: params.id, userEmail: session.user.email },
      { title, category, expression, description },
      { new: true }
    );

    if (!updatedFormula) {
      return NextResponse.json({ error: "Formula not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Formula updated successfully",
      formula: updatedFormula,
    });
  } catch (error) {
    console.error("Error updating formula:", error);
    return NextResponse.json(
      { error: "Failed to update formula" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a formula
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectMongoDB();

    const deletedFormula = await Formula.findOneAndDelete({
      _id: params.id,
      userEmail: session.user.email,
    });

    if (!deletedFormula) {
      return NextResponse.json({ error: "Formula not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Formula deleted successfully" });
  } catch (error) {
    console.error("Error deleting formula:", error);
    return NextResponse.json(
      { error: "Failed to delete formula" },
      { status: 500 }
    );
  }
}
