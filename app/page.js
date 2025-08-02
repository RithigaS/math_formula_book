"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import FormulaCard from "@/components/FormulaCard";
import SearchFilter from "@/components/SearchFilter";
import Header from "@/components/Header";
import Loader from "@/components/Loader";

// Home page component - displays all formulas
export default function HomePage() {
  const [formulas, setFormulas] = useState([]);
  const [filteredFormulas, setFilteredFormulas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch formulas on component mount
  useEffect(() => {
    fetchFormulas();
  }, []);

  // Fetch all formulas from new API
  const fetchFormulas = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/allformulas");
      setFormulas(response.data.formulas);
      setFilteredFormulas(response.data.formulas);
      setError("");
    } catch (error) {
      console.error("Error fetching formulas:", error);
      setError("Failed to load formulas");
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (searchTerm) => {
    const filtered = formulas.filter(
      (f) =>
        f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFormulas(filtered);
  };

  // Handle category filter
  const handleCategoryFilter = (category) => {
    if (category === "All") {
      setFilteredFormulas(formulas);
    } else {
      const filtered = formulas.filter((f) => f.category === category);
      setFilteredFormulas(filtered);
    }
  };

  // Handle delete formula (optional: remove if only public view)
  const handleDeleteFormula = async (formulaId) => {
    try {
      await axios.delete(`/api/formulas/${formulaId}`);
      setFormulas(formulas.filter((f) => f._id !== formulaId));
      setFilteredFormulas(filteredFormulas.filter((f) => f._id !== formulaId));
    } catch (error) {
      console.error("Error deleting formula:", error);
      setError("Failed to delete formula");
    }
  };

  return (
    <>
      <Header />
      <div className="page-container">
        <SearchFilter
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
        />

        {error && <div className="error-text">{error}</div>}

        {loading ? (
          <Loader text="Fetching formulas..." />
        ) : filteredFormulas.length === 0 ? (
          <div className="empty-state">
            <h3>No formulas found</h3>
            <p>Start building your math formula collection!</p>
            <Link href="/add" className="btn-primary">
              Add Your First Formula
            </Link>
          </div>
        ) : (
          <div className="formulas-grid">
            {filteredFormulas.map((formula) => (
              <FormulaCard
                key={formula._id}
                formula={formula}
                onDelete={handleDeleteFormula}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
