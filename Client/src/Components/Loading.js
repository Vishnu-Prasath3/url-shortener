import React from "react";

export default function Loading() {
  return (
    <div className="text-center">
      <div
        className="spinner-border"
        role="status"
        style={{ height: "30px", width: "30px", marginTop: "10px" }}
      >
        <span className="sr-only">..</span>
      </div>
    </div>
  );
}