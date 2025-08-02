"use client";

import { useState } from "react";
import styles from "@/styles/SearchFilter.module.css";

// Component for searching and filtering formulas
export default function SearchFilter({ onSearch, onCategoryFilter }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Available categories
  const categories = [
    "All",
    "Algebra",
    "Calculus",
    "Geometry",
    "Trigonometry",
    "Statistics",
    "Physics",
    "Other",
  ];

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  // Handle category filter change
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onCategoryFilter(value);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search formulas by title or description..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <span className={styles.searchIcon}>🔍</span>
      </div>

      <div className={styles.categoryFilter}>
        <label htmlFor="category" className={styles.filterLabel}>
          Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className={styles.categorySelect}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
