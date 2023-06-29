import React from "react";

export default function Input({ label, ...native }) {
  return (
    <>
      <label className="form-label">{label}</label>
      <input
        className="form-control"
        placeholder={`silakan mengisi ${label}`}
        {...native}
      />
    </>
  );
}
