import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BookReader from "@/components/reader/BookReader";
import EbookVerification from "@/components/reader/EbookVerification";
import { getReaderBooksByIds } from "@/lib/bookCatalog";
import { EBOOK_MAX_DEVICES, maskEmail } from "@/lib/ebookStore";
import {
  readPendingEbookGrant,
  readVerifiedEbookSession,
} from "@/lib/ebookSession";

export const metadata: Metadata = {
  title: "Čitanje e-booka",
  robots: {
    index: false,
    follow: false,
  },
};

function getToken(searchParams?: { [key: string]: string | string[] | undefined }) {
  const token = searchParams?.token;
  return Array.isArray(token) ? token[0] : token;
}

function AccessMessage({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <main className="min-h-screen bg-rose/30 px-6 py-16">
      <div className="mx-auto max-w-xl rounded-softer bg-cream-white p-8 text-center shadow-soft">
        <p className="mb-2 font-hand text-2xl text-lavender-dark">Deci na dar</p>
        <h1 className="mb-4 font-serif text-3xl font-semibold text-brown">{title}</h1>
        <p className="mb-8 font-sans leading-relaxed text-brown-light">{text}</p>
        <a
          href="/#e-book"
          className="inline-block rounded-full bg-lavender px-7 py-3 font-sans font-semibold text-brown shadow-soft transition-colors hover:bg-lavender-dark"
        >
          Zatraži novi link
        </a>
      </div>
    </main>
  );
}

export default async function CitajPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const token = getToken(searchParams);

  if (token) {
    redirect(`/api/ebook/activate?token=${encodeURIComponent(token)}`);
  }

  const cookieStore = cookies();
  const access = await readVerifiedEbookSession(cookieStore);

  if (!access.ok) {
    const pending = await readPendingEbookGrant(cookieStore);

    if (pending.ok) {
      return (
        <EbookVerification
          maskedEmail={maskEmail(pending.payload.email)}
          maxDevices={EBOOK_MAX_DEVICES}
        />
      );
    }

    const reason =
      access.reason === "not-configured" || pending.reason === "not-configured"
        ? "not-configured"
        : access.reason === "expired" || pending.reason === "expired"
          ? "expired"
          : access.reason === "revoked" || pending.reason === "revoked"
            ? "revoked"
            : "missing";

    return (
      <AccessMessage
        title={
          reason === "not-configured"
            ? "Čitač još nije podešen"
            : reason === "expired"
              ? "Link je istekao"
              : reason === "revoked"
                ? "Potrebna je nova potvrda"
                : "Potreban je link za čitanje"
        }
        text={
          reason === "not-configured"
            ? "Nedostaje serversko podešavanje za bezbedan pristup. Pokušajte kasnije."
            : reason === "expired"
              ? "Zatražite novi link i materijal će ponovo stići na vašu email adresu."
              : reason === "revoked"
                ? "Otvorite privatni link iz emaila i potvrdite pristup kodom."
                : "Materijal se otvara preko privatnog linka koji dobijate emailom."
        }
      />
    );
  }

  const books = getReaderBooksByIds(access.payload.books);

  return (
    <main className="min-h-screen bg-rose/30 py-6">
      <BookReader
        books={books}
        readerEmail={access.payload.email}
        readerName={access.payload.name}
      />
    </main>
  );
}
