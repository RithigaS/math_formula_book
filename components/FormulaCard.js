"use client";

import Link from "next/link";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import styles from "@/styles/FormulaCard.module.css";
import { useSession } from "next-auth/react";

export default function FormulaCard({ formula, onDelete }) {
  const { data: session } = useSession();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this formula?")) {
      onDelete(formula._id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className={styles["formula-card-container"]}>
      <div className={styles["formula-card"]}>
        <div className={styles["formula-card-header"]}>
          <h3 className={styles["formula-title"]}>{formula.title}</h3>
          <span className={styles["formula-category"]}>{formula.category}</span>
        </div>

        <div className={styles["formula-display"]}>
          <BlockMath math={formula.expression} />
        </div>

        <p className={styles["formula-description"]}>
          {formula.description.length > 100
            ? `${formula.description.substring(0, 100)}...`
            : formula.description}
        </p>
        <div className={styles["formula-author"]}>
          <span>By: {formula.userName}</span>
          {formula.userEmail && (
            <span className={styles["formula-email"]}>
              {session?.user?.email === formula.userEmail
                ? "You"
                : session?.user?.name}
            </span>
          )}
        </div>

        <div className={styles["formula-card-footer"]}>
          <span className={styles["formula-date"]}>
            Created: {formatDate(formula.createdAt)}
          </span>

          <div className={styles["formula-actions"]}>
            <Link href={`/view/${formula._id}`} className={styles["view-btn"]}>
              View
            </Link>
            {session && session.user.email === formula.userEmail && (
              <>
                <Link
                  href={`/edit/${formula._id}`}
                  className={styles["edit-btn"]}
                >
                  Edit
                </Link>
                <button onClick={handleDelete} className={styles["delete-btn"]}>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
