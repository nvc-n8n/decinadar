"use client";

import { useMemo, useState } from "react";
import type { ReaderBook } from "@/lib/bookCatalog";

type Status = "idle" | "sending" | "sent" | "error";

type ApiResponse = {
  ok?: boolean;
  preview?: boolean;
  readerUrl?: string;
  error?: string;
};

type Props = {
  books: ReaderBook[];
  emailConfigured: boolean;
};

export default function AdminSendAccessForm({ books, emailConfigured }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [readerUrl, setReaderUrl] = useState<string | null>(null);
  const [selectedBooks, setSelectedBooks] = useState(() => books.map((book) => book.id));

  const allSelected = selectedBooks.length === books.length;
  const selectedSummary = useMemo(
    () =>
      books
        .filter((book) => selectedBooks.includes(book.id))
        .map((book) => book.title)
        .join(", "),
    [books, selectedBooks]
  );

  function toggleBook(bookId: string) {
    setSelectedBooks((current) =>
      current.includes(bookId)
        ? current.filter((id) => id !== bookId)
        : [...current, bookId]
    );
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.assign("/admin");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    setReaderUrl(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/admin/send-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          bookIds: selectedBooks,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as ApiResponse;

      if (!response.ok) {
        throw new Error(data.error || "Slanje nije uspelo.");
      }

      setStatus("sent");
      setReaderUrl(data.readerUrl || null);
      setMessage(
        data.preview
          ? "Lokalni test je uspeo. Pošto Resend nije podešen, email nije poslat, ali link je generisan."
          : "Email je poslat kupcu."
      );
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Slanje nije uspelo.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-hand text-2xl text-lavender-dark">Deci na dar</p>
          <h1 className="font-serif text-3xl font-semibold text-brown">
            Slanje pristupa kupcu
          </h1>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="self-start rounded-full bg-cream px-5 py-2.5 font-sans text-sm font-semibold text-brown shadow-soft transition-colors hover:bg-rose/40"
        >
          Odjavi se
        </button>
      </div>

      <form onSubmit={handleSubmit} className="rounded-softer bg-cream-white p-6 shadow-soft space-y-5">
        {!emailConfigured && (
          <div className="rounded-soft bg-rose/30 px-4 py-3 font-sans text-sm leading-relaxed text-brown">
            Slanje emaila još nije podešeno. Dodajte `RESEND_API_KEY` i proverite
            `EBOOK_FROM_EMAIL` pre slanja kupcima.
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="customer-name" className="block font-sans text-sm font-medium text-brown mb-1.5">
              Ime kupca
            </label>
            <input
              id="customer-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="npr. Ana"
              className="w-full bg-cream border border-lavender/30 rounded-soft px-5 py-3 font-sans text-sm text-brown placeholder:text-brown-muted focus:outline-none focus:ring-2 focus:ring-lavender/50 transition-shadow"
            />
          </div>
          <div>
            <label htmlFor="customer-email" className="block font-sans text-sm font-medium text-brown mb-1.5">
              Email kupca
            </label>
            <input
              id="customer-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="kupac@email.com"
              className="w-full bg-cream border border-lavender/30 rounded-soft px-5 py-3 font-sans text-sm text-brown placeholder:text-brown-muted focus:outline-none focus:ring-2 focus:ring-lavender/50 transition-shadow"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-3 mb-3">
            <p className="font-sans text-sm font-medium text-brown">Materijali</p>
            <button
              type="button"
              onClick={() => setSelectedBooks(allSelected ? [] : books.map((book) => book.id))}
              className="rounded-full bg-cream px-4 py-2 font-sans text-xs font-semibold text-brown transition-colors hover:bg-lavender/30"
            >
              {allSelected ? "Skini sve" : "Izaberi sve"}
            </button>
          </div>
          <div className="grid gap-3">
            {books.map((book) => (
              <label
                key={book.id}
                className="flex cursor-pointer items-start gap-3 rounded-soft border border-lavender/20 bg-cream/60 p-4 transition-colors hover:bg-cream"
              >
                <input
                  type="checkbox"
                  checked={selectedBooks.includes(book.id)}
                  onChange={() => toggleBook(book.id)}
                  className="mt-1 h-4 w-4 accent-lavender-dark"
                />
                <span>
                  <span className="block font-sans text-sm font-semibold text-brown">{book.title}</span>
                  <span className="block font-sans text-xs text-brown-muted">{book.description}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-soft bg-rose/20 px-4 py-3 font-sans text-sm text-brown-light">
          Biće poslato: <span className="font-semibold text-brown">{selectedSummary || "ništa nije izabrano"}</span>
        </div>

        <button
          type="submit"
          disabled={status === "sending" || selectedBooks.length === 0 || !emailConfigured}
          className="rounded-full bg-lavender px-7 py-3 font-sans font-semibold text-brown shadow-soft transition-colors hover:bg-lavender-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Šaljem..." : "Pošalji pristup"}
        </button>

        {message && (
          <div
            className={`rounded-soft px-4 py-3 font-sans text-sm ${
              status === "error" ? "bg-rose/30 text-brown" : "bg-lavender/20 text-brown"
            }`}
            aria-live="polite"
          >
            <p>{message}</p>
            {readerUrl && (
              <a
                href={readerUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block break-all font-semibold text-lavender-dark hover:text-brown"
              >
                {readerUrl}
              </a>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
