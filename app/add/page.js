"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./add.css";
import Header from "@/components/Header";
import Head from "next/head";

export default function AddFormulaPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    category: "Algebra",
    expression: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = [
    "Algebra",
    "Calculus",
    "Geometry",
    "Trigonometry",
    "Statistics",
    "Physics",
    "Other",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (
      !formData.title ||
      !formData.category ||
      !formData.expression ||
      !formData.description
    ) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("/api/formulas", formData);
      router.push("/");
    } catch (err) {
      setError("Failed to add formula.");
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="add-formula-container">
        <button onClick={() => router.back()} className="backBtn">
          ← Back
        </button>
        <h1 className="form-title">Add New Formula</h1>
        <form onSubmit={handleSubmit} className="formula-form">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter formula title"
          />

          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label htmlFor="expression">LaTeX Expression:</label>
          <textarea
            id="expression"
            name="expression"
            value={formData.expression}
            onChange={handleChange}
            placeholder="Enter LaTeX expression"
            rows={4}
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            rows={4}
          />

          {error && <p className="form-error">{error}</p>}

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? "Adding..." : "Add Formula"}
          </button>
        </form>
      </div>
    </>
  );
}
