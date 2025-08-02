"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import styles from "./add.module.css";

// Edit Formula page component
export default function EditFormula() {
  const params = useParams();
  const router = useRouter();
  const formulaId = params.id;

  const [formData, setFormData] = useState({
    title: "",
    category: "Algebra",
    expression: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch formula data on mount
  useEffect(() => {
    const fetchFormula = async () => {
      try {
        const response = await axios.get(`/api/formulas/${formulaId}`);
        setFormData(response.data.formula);
        setError("");
      } catch (err) {
        setError("Failed to load formula.");
      } finally {
        setLoading(false);
      }
    };

    fetchFormula();
  }, [formulaId]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/formulas/${formulaId}`, formData);
      router.push("/");
    } catch (err) {
      setError("Failed to update formula.");
    }
  };

  if (loading) {
    return <div className={styles.container}>Loading formula...</div>;
  }

  if (error) {
    return <div className={styles.container}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Edit Formula</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <label className={styles.label}>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={styles.select}
          required
        >
          <option value="Algebra">Algebra</option>
          <option value="Calculus">Calculus</option>
          <option value="Geometry">Geometry</option>
          <option value="Trigonometry">Trigonometry</option>
          <option value="Statistics">Statistics</option>
          <option value="Physics">Physics</option>
          <option value="Other">Other</option>
        </select>
        <label className={styles.label}>Expression (LaTeX)</label>
        <textarea
          name="expression"
          value={formData.expression}
          onChange={handleChange}
          className={styles.textarea}
          rows={4}
          required
        />
        <label className={styles.label}>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={styles.textarea}
          rows={4}
          required
        />
        <button type="submit" className={styles.submitBtn}>
          Update Formula
        </button>
      </form>
    </div>
  );
}
