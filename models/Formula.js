import mongoose from "mongoose";

// Formula schema for storing math formulas
const FormulaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Algebra",
      "Calculus",
      "Geometry",
      "Trigonometry",
      "Statistics",
      "Physics",
      "Other",
    ],
  },
  expression: {
    type: String,
    required: true, // LaTeX expression
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model (check if it already exists to avoid re-compilation errors)
export default mongoose.models.Formula ||
  mongoose.model("Formula", FormulaSchema);
