"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReaderBook } from "@/lib/bookCatalog";

type Props = {
  books: ReaderBook[];
  readerEmail: string;
  readerName?: string;
};

const pad = (n: number) => String(n).padStart(3, "0");

const iconBtn =
  "grid place-items-center w-9 h-9 rounded-full bg-cream-white hover:bg-cream text-brown shadow-soft transition-colors";

export default function BookReader({ books, readerEmail, readerName }: Props) {
  const [bookId, setBookId] = useState(books[0]?.id || "");
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isFs, setIsFs] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const touchX = useRef<number | null>(null);
  const didRestore = useRef(false);

  const activeBook = books.find((book) => book.id === bookId) || books[0];
  const basePath = activeBook ? `/api/ebook/books/${activeBook.id}` : "";
  const storageKey = `decinadar-reader-page:${bookId}`;
  const progress = pages ? (page / pages) * 100 : 0;
  const zoomed = zoom > 1;
  const src = `${basePath}/pages/${pad(page)}`;
  const preload = page < pages ? `${basePath}/pages/${pad(page + 1)}` : null;

  useEffect(() => {
    setBookId((current) => {
      if (books.some((book) => book.id === current)) return current;
      return books[0]?.id || "";
    });
  }, [books]);

  useEffect(() => {
    if (!basePath) return;

    let alive = true;
    didRestore.current = false;
    setPage(1);
    setPages(0);
    setLoaded(false);

    fetch(`${basePath}/manifest`, { credentials: "same-origin" })
      .then((response) => {
        if (!response.ok) throw new Error("Manifest nije dostupan");
        return response.json();
      })
      .then((manifest) => {
        if (!alive) return;

        const total = Number(manifest.pages) || 0;
        setPages(total);

        try {
          const saved = parseInt(localStorage.getItem(storageKey) || "", 10);
          if (saved >= 1 && saved <= total) setPage(saved);
        } catch {}

        didRestore.current = true;
      })
      .catch(() => alive && setPages(0));

    return () => {
      alive = false;
    };
  }, [basePath, storageKey]);

  useEffect(() => {
    if (!didRestore.current) return;

    try {
      localStorage.setItem(storageKey, String(page));
    } catch {}
  }, [page, storageKey]);

  const prev = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);
  const next = useCallback(
    () => setPage((p) => Math.min(pages || 1, p + 1)),
    [pages]
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && ["s", "p"].includes(event.key.toLowerCase())) {
        event.preventDefault();
        return;
      }
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  useEffect(() => {
    const onFs = () => setIsFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) setLoaded(true);
    else setLoaded(false);
  }, [page, bookId]);

  const cycleZoom = () => setZoom((z) => (z === 1 ? 1.5 : z === 1.5 ? 2 : 1));

  const toggleFs = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    else el.requestFullscreen?.().catch(() => {});
  }, []);

  const onTouchStart = (event: React.TouchEvent) => {
    touchX.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchX.current === null) return;

    const dx = event.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchX.current = null;
  };

  return (
    <div
      ref={rootRef}
      className={`select-none ${isFs ? "bg-cream min-h-screen overflow-auto py-6" : ""}`}
      onContextMenu={(event) => event.preventDefault()}
      style={{ WebkitUserSelect: "none", userSelect: "none" }}
    >
      <style>{`@media print { .book-reader { display: none !important; } }`}</style>

      <div className="book-reader mx-auto max-w-4xl px-4">
        <div className="pb-4">
          <div className="rounded-softer bg-cream-white p-4 shadow-soft">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-hand text-2xl text-lavender-dark">Deci na dar</p>
                <p className="font-sans text-sm text-brown-light">
                  {readerName ? `${readerName} · ` : ""}
                  {readerEmail}
                </p>
              </div>
              <form action="/api/ebook/logout" method="post">
                <button
                  type="submit"
                  className="rounded-full bg-cream px-5 py-2.5 font-sans text-sm font-semibold text-brown transition-colors hover:bg-rose/40"
                >
                  Zatvori pristup
                </button>
              </form>
            </div>

            {books.length > 1 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {books.map((book) => (
                  <button
                    key={book.id}
                    type="button"
                    onClick={() => setBookId(book.id)}
                    className={`rounded-full px-4 py-2 font-sans text-sm font-semibold transition-colors ${
                      book.id === activeBook?.id
                        ? "bg-lavender text-brown"
                        : "bg-cream text-brown-light hover:bg-lavender/25"
                    }`}
                  >
                    {book.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 pb-3">
          <div className="flex items-center justify-between gap-3">
            <h1 className="truncate font-serif text-lg font-semibold text-brown md:text-xl">
              {activeBook?.title || "Materijal"}
            </h1>
            <div className="flex flex-shrink-0 items-center gap-2">
              {activeBook?.downloadable && (
                <a
                  href={`${basePath}/download`}
                  download
                  className="flex items-center gap-1.5 rounded-full bg-lavender px-3.5 py-2 font-sans text-sm font-semibold text-brown shadow-soft transition-colors hover:bg-lavender-dark"
                  title="Preuzmi PDF za štampu"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                  </svg>
                  <span className="hidden sm:inline">Preuzmi za štampu</span>
                </a>
              )}
              <button onClick={cycleZoom} className={iconBtn} aria-label="Uvećanje" title="Uvećanje">
                {zoomed ? (
                  <span className="text-[11px] font-sans font-semibold tabular-nums">
                    {Math.round(zoom * 100)}%
                  </span>
                ) : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="11" cy="11" r="7" />
                    <path strokeLinecap="round" d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
                  </svg>
                )}
              </button>
              <button onClick={toggleFs} className={iconBtn} aria-label="Ceo ekran" title="Ceo ekran">
                {isFs ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9L4 4m0 5V4h5M15 9l5-5m0 5V4h-5M9 15l-5 5m0-5v5h5M15 15l5 5m0-5v5h-5" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                  </svg>
                )}
              </button>
              <span className="whitespace-nowrap font-sans text-sm text-brown-light tabular-nums">
                {page} / {pages || "..."}
              </span>
            </div>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-brown/10">
            <div
              className="h-full bg-lavender-dark transition-[width] duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div
          className={`relative mx-auto rounded-soft bg-white shadow-soft-lg ${
            zoomed ? "max-h-[80vh] overflow-auto" : "overflow-hidden"
          }`}
          onTouchStart={zoomed ? undefined : onTouchStart}
          onTouchEnd={zoomed ? undefined : onTouchEnd}
        >
          {pages === 0 ? (
            <div className="py-24 text-center font-sans text-brown-light">
              Učitavanje materijala...
            </div>
          ) : (
            <>
              <div className="relative" style={{ width: `${zoom * 100}%` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imgRef}
                  src={src}
                  alt={`Strana ${page}`}
                  draggable={false}
                  onLoad={() => setLoaded(true)}
                  onDragStart={(event) => event.preventDefault()}
                  className="block h-auto w-full select-none"
                  style={{
                    pointerEvents: "none",
                    opacity: loaded ? 1 : 0,
                    transition: "opacity 250ms ease",
                  }}
                />
              </div>

              {!zoomed && (
                <>
                  <button
                    onClick={prev}
                    disabled={page <= 1}
                    aria-label="Prethodna strana"
                    className="group absolute left-0 top-0 z-20 flex h-full w-1/2 items-center justify-start pl-2 disabled:cursor-default"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-cream/90 text-brown opacity-0 shadow-soft transition-opacity group-hover:opacity-100">
                      ‹
                    </span>
                  </button>
                  <button
                    onClick={next}
                    disabled={page >= pages}
                    aria-label="Sledeća strana"
                    className="group absolute right-0 top-0 z-20 flex h-full w-1/2 items-center justify-end pr-2 disabled:cursor-default"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-cream/90 text-brown opacity-0 shadow-soft transition-opacity group-hover:opacity-100">
                      ›
                    </span>
                  </button>
                </>
              )}
            </>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 py-4">
          <button
            onClick={prev}
            disabled={page <= 1}
            className="rounded-full bg-cream-white px-5 py-2.5 font-sans font-semibold text-brown shadow-soft transition-colors hover:bg-cream disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Prethodna
          </button>
          <span className="hidden font-sans text-xs text-brown-muted sm:block">
            {zoomed ? "Prevuci za pomeranje strane" : "Prevuci prstom ili koristi strelice"}
          </span>
          <button
            onClick={next}
            disabled={!!pages && page >= pages}
            className="rounded-full bg-cream-white px-5 py-2.5 font-sans font-semibold text-brown shadow-soft transition-colors hover:bg-cream disabled:cursor-not-allowed disabled:opacity-40"
          >
            Sledeća →
          </button>
        </div>

        <p className="pb-6 text-center font-sans text-xs text-brown-muted">
          Materijal je dostupan samo kroz privatni link koji ste dobili emailom.
        </p>
      </div>

      {preload && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preload} alt="" aria-hidden="true" style={{ display: "none" }} />
      )}
    </div>
  );
}
