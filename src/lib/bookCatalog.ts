import books from "../../content/books.json";

export type Book = {
  id: string;
  title: string;
  description: string;
  sourcePdf: string;
  pagesDir: string;
  downloadable?: boolean;
};

export type ReaderBook = Pick<Book, "id" | "title" | "description" | "downloadable">;

export const BOOKS = books as Book[];
export const DEFAULT_BOOK_IDS = BOOKS.map((book) => book.id);
export const READER_BOOKS = BOOKS.map(toReaderBook);

const knownIds = new Set(DEFAULT_BOOK_IDS);

export function getBookById(id: string) {
  return BOOKS.find((book) => book.id === id) || null;
}

export function isKnownBookId(id: string) {
  return knownIds.has(id);
}

export function normalizeBookIds(value: unknown) {
  const raw = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",")
      : [];

  const ids = raw
    .map((item) => String(item).trim())
    .filter((id) => isKnownBookId(id));

  return Array.from(new Set(ids));
}

export function getBooksByIds(ids: string[]) {
  const allowed = new Set(ids);
  return BOOKS.filter((book) => allowed.has(book.id));
}

export function toReaderBook(book: Book): ReaderBook {
  return {
    id: book.id,
    title: book.title,
    description: book.description,
    downloadable: book.downloadable,
  };
}

export function getReaderBooksByIds(ids: string[]) {
  return getBooksByIds(ids).map(toReaderBook);
}

export function formatBookList(ids: string[]) {
  const selected = getBooksByIds(ids);

  if (!selected.length) return "e-book paket";
  if (selected.length === 1) return selected[0].title;

  return selected.map((book) => book.title).join(", ");
}
