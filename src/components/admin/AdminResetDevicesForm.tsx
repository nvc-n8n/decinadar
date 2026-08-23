"use client";

import { useState } from "react";

export default function AdminResetDevicesForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/admin/reset-devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.get("email") }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) throw new Error(data.error || "Reset nije uspeo.");

      setStatus("success");
      setMessage("Uređaji su resetovani. Kupac može ponovo da potvrdi pristup.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Reset nije uspeo.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-softer bg-cream-white p-6 shadow-soft">
      <h2 className="font-serif text-2xl font-semibold text-brown">Reset uređaja</h2>
      <p className="mt-1 font-sans text-sm leading-relaxed text-brown-light">
        Koristi kada kupac promeni telefon ili dostigne ograničenje od dva uređaja.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          name="email"
          type="email"
          required
          placeholder="kupac@email.com"
          className="min-w-0 flex-1 rounded-soft border border-lavender/30 bg-cream px-5 py-3 font-sans text-sm text-brown placeholder:text-brown-muted focus:outline-none focus:ring-2 focus:ring-lavender/50"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-cream px-6 py-3 font-sans font-semibold text-brown shadow-soft transition-colors hover:bg-rose/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Resetujem..." : "Resetuj uređaje"}
        </button>
      </div>

      {message && (
        <p
          className={`mt-3 font-sans text-sm ${
            status === "error" ? "text-rose-dark" : "text-brown-light"
          }`}
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </form>
  );
}
