import { createHmac, timingSafeEqual } from "crypto";
import { DEFAULT_BOOK_IDS, isKnownBookId } from "./bookCatalog";

export type EbookAccessPayload = {
  kind: "ebook-access";
  grantId: string;
  email: string;
  name?: string;
  books: string[];
  iat: number;
  exp: number;
};

type TokenResult =
  | { ok: true; payload: EbookAccessPayload }
  | { ok: false; reason: "missing" | "invalid" | "expired" | "not-configured" };

export const EBOOK_ACCESS_COOKIE = "decinadar_ebook_access";
const LOCAL_DEV_SECRET = "decinadar-local-ebook-access-secret";
const PERMANENT_COOKIE_MAX_AGE = 400 * 24 * 60 * 60;

export function normalizeEmail(value: unknown) {
  return String(value || "").trim().toLowerCase();
}

export function normalizeName(value: unknown) {
  const name = String(value || "").trim().replace(/\s+/g, " ");
  return name || undefined;
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function getEbookAccessSecret() {
  const secret = process.env.EBOOK_ACCESS_SECRET;

  if (secret) return secret;
  if (process.env.NODE_ENV !== "production") return LOCAL_DEV_SECRET;

  throw new Error("Missing EBOOK_ACCESS_SECRET");
}

function sign(payload: string) {
  return createHmac("sha256", getEbookAccessSecret()).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function createEbookAccessToken({
  grantId,
  email,
  name,
  bookIds = DEFAULT_BOOK_IDS,
}: {
  grantId: string;
  email: string;
  name?: string;
  bookIds?: string[];
}) {
  const now = Math.floor(Date.now() / 1000);
  const books = bookIds.filter((id) => isKnownBookId(id));

  if (!books.length) {
    throw new Error("No books selected");
  }

  const payload: EbookAccessPayload = {
    kind: "ebook-access",
    grantId,
    email,
    name,
    books,
    iat: now,
    exp: 0,
  };
  const encoded = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");

  return `${encoded}.${sign(encoded)}`;
}

export function readEbookAccessToken(token: unknown): TokenResult {
  if (typeof token !== "string" || !token.trim()) {
    return { ok: false, reason: "missing" };
  }

  const parts = token.split(".");
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    return { ok: false, reason: "invalid" };
  }

  const [encoded, signature] = parts;

  try {
    if (!safeEqual(signature, sign(encoded))) {
      return { ok: false, reason: "invalid" };
    }

    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8")
    ) as Partial<EbookAccessPayload>;

    if (
      !payload ||
      payload.kind !== "ebook-access" ||
      typeof payload.grantId !== "string" ||
      !/^[a-f0-9-]{36}$/i.test(payload.grantId) ||
      !isValidEmail(String(payload.email || "")) ||
      !Array.isArray(payload.books) ||
      !payload.books.some((id) => isKnownBookId(String(id))) ||
      typeof payload.exp !== "number" ||
      typeof payload.iat !== "number"
    ) {
      return { ok: false, reason: "invalid" };
    }

    if (payload.exp !== 0 && payload.exp < Math.floor(Date.now() / 1000)) {
      return { ok: false, reason: "expired" };
    }

    return {
      ok: true,
      payload: {
        kind: "ebook-access",
        grantId: payload.grantId,
        email: normalizeEmail(payload.email),
        name: normalizeName(payload.name),
        books: Array.from(
          new Set(payload.books.map((id) => String(id)).filter(isKnownBookId))
        ),
        iat: payload.iat,
        exp: payload.exp,
      },
    };
  } catch (error) {
    if (error instanceof Error && error.message === "Missing EBOOK_ACCESS_SECRET") {
      return { ok: false, reason: "not-configured" };
    }

    return { ok: false, reason: "invalid" };
  }
}

export function getTokenMaxAge(payload: EbookAccessPayload) {
  if (payload.exp === 0) return PERMANENT_COOKIE_MAX_AGE;
  return Math.max(0, payload.exp - Math.floor(Date.now() / 1000));
}

export function isPermanentEbookAccess(payload: EbookAccessPayload) {
  return payload.exp === 0;
}

export function tokenAllowsBook(payload: EbookAccessPayload, bookId: string) {
  return payload.books.includes(bookId);
}
