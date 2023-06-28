import React from "react";

export default function Input({ label, ...native }) {
  console.log({ ...native });
  return (
    <>
      <label htmlFor="fotoBarang" className="form-label">
        {label}
      </label>
      <input
        className="form-control"
        {...native}
        //   value={image}
      />
    </>
  );
}
