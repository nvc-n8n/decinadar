"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  maskedEmail: string;
  maxDevices: number;
};

export default function EbookVerification({ maskedEmail, maxDevices }: Props) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"sending" | "idle" | "verifying" | "error">(
    "sending"
  );
  const [message, setMessage] = useState("Šaljemo kod na email...");
  const sentOnMount = useRef(false);

  const sendCode = useCallback(async () => {
    setStatus("sending");
    setMessage("Šaljemo kod na email...");

    try {
      const response = await fetch("/api/ebook/otp/send", { method: "POST" });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        preview?: boolean;
      };

      if (!response.ok) throw new Error(data.error || "Kod nije moguće poslati.");

      setStatus("idle");
      setMessage(
        data.preview
          ? "Lokalni preview je aktivan; kod nije poslat."
          : `Kod je poslat na ${maskedEmail}.`
      );
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Kod nije moguće poslati.");
    }
  }, [maskedEmail]);

  useEffect(() => {
    if (sentOnMount.current) return;
    sentOnMount.current = true;
    void sendCode();
  }, [sendCode]);

  async function verify(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("verifying");
    setMessage("");

    try {
      const response = await fetch("/api/ebook/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) throw new Error(data.error || "Kod nije prihvaćen.");

      window.location.assign("/citaj");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Kod nije prihvaćen.");
    }
  }

  return (
    <main className="min-h-screen bg-rose/30 px-6 py-16">
      <div className="mx-auto max-w-md rounded-softer bg-cream-white p-8 text-center shadow-soft">
        <p className="mb-2 font-hand text-2xl text-lavender-dark">Deci na dar</p>
        <h1 className="mb-3 font-serif text-3xl font-semibold text-brown">
          Potvrdi email
        </h1>
        <p className="mb-6 font-sans text-sm leading-relaxed text-brown-light">
          Link sam nije dovoljan za pristup. Unesi šestocifreni kod koji šaljemo na
          {` ${maskedEmail}`}.
        </p>

        <form onSubmit={verify} className="space-y-4">
          <input
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{6}"
            maxLength={6}
            required
            aria-label="Kod od 6 cifara"
            className="w-full rounded-soft border border-lavender/30 bg-cream px-5 py-4 text-center font-sans text-2xl font-semibold tracking-[0.35em] text-brown focus:outline-none focus:ring-2 focus:ring-lavender/50"
            placeholder="000000"
          />
          <button
            type="submit"
            disabled={status === "sending" || status === "verifying" || code.length !== 6}
            className="w-full rounded-full bg-lavender px-7 py-3 font-sans font-semibold text-brown shadow-soft transition-colors hover:bg-lavender-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "verifying" ? "Proveravam..." : "Potvrdi i otvori"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 font-sans text-sm ${
              status === "error" ? "text-rose-dark" : "text-brown-light"
            }`}
            aria-live="polite"
          >
            {message}
          </p>
        )}

        <button
          type="button"
          onClick={() => void sendCode()}
          disabled={status === "sending" || status === "verifying"}
          className="mt-5 font-sans text-sm font-semibold text-lavender-dark hover:text-brown disabled:opacity-50"
        >
          Pošalji kod ponovo
        </button>

        <p className="mt-6 font-sans text-xs leading-relaxed text-brown-muted">
          Jedan pristup može biti aktivan na najviše {maxDevices} uređaja.
        </p>
      </div>
    </main>
  );
}
