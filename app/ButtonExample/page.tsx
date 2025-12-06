"use client";

import { useState } from "react";

export default function Page() {
  const [message, setMessage] = useState("");

  return (
    <main style={{ padding: 20 }}>
      <button
        onClick={() => setMessage("Hello World")}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Click Me
      </button>

      {message && (
        <p style={{ marginTop: 20, fontSize: "18px" }}>{message}</p>
      )}
    </main>
  );
}