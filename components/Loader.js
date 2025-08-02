"use client";

import "@/styles/Loader.css";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="loader-wrapper">
      <div className="spinner"></div>
      <p className="loader-text">{text}</p>
    </div>
  );
}
