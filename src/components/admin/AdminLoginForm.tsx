"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "error";

export default function AdminLoginForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: formData.get("password") }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Prijava nije uspela.");
      }

      window.location.assign("/admin");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Prijava nije uspela.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="admin-password" className="block font-sans text-sm font-medium text-brown mb-1.5">
          Admin lozinka
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full bg-cream border border-lavender/30 rounded-soft px-5 py-3 font-sans text-sm text-brown placeholder:text-brown-muted focus:outline-none focus:ring-2 focus:ring-lavender/50 transition-shadow"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-lavender px-6 py-3 font-sans font-semibold text-brown shadow-soft transition-colors hover:bg-lavender-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Ulazim..." : "Uđi u admin panel"}
      </button>

      {message && (
        <p className="font-sans text-sm text-rose-dark" aria-live="polite">
          {message}
        </p>
      )}
    </form>
  );
}
