import { createHash, createHmac, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "decinadar_admin";

type AdminPayload = {
  kind: "admin";
  iat: number;
  exp: number;
};

type AdminSessionResult =
  | { ok: true; payload: AdminPayload }
  | { ok: false; reason: "missing" | "invalid" | "expired" | "not-configured" };

const LOCAL_DEV_SECRET = "decinadar-local-admin-session-secret";
const LOCAL_DEV_PASSWORD = "deci-na-dar-admin";
const ADMIN_SESSION_DAYS = 7;

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.EBOOK_ACCESS_SECRET;

  if (secret) return secret;
  if (process.env.NODE_ENV !== "production") return LOCAL_DEV_SECRET;

  throw new Error("Missing ADMIN_SESSION_SECRET or EBOOK_ACCESS_SECRET");
}

function getPasswordConfig() {
  const hash = process.env.ADMIN_PASSWORD_SHA256;
  const password = process.env.ADMIN_PASSWORD;

  if (hash || password) return { hash, password };
  if (process.env.NODE_ENV !== "production") return { password: LOCAL_DEV_PASSWORD };

  return null;
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function sign(payload: string) {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
}

export function isAdminAuthConfigured() {
  try {
    return Boolean(getPasswordConfig() && getSessionSecret());
  } catch {
    return false;
  }
}

export function verifyAdminPassword(password: unknown) {
  const value = String(password || "");
  const config = getPasswordConfig();

  if (!config || !value) return false;

  if (config.hash) {
    return safeEqual(sha256(value), config.hash);
  }

  return config.password ? safeEqual(value, config.password) : false;
}

export function createAdminSessionToken() {
  const now = Math.floor(Date.now() / 1000);
  const payload: AdminPayload = {
    kind: "admin",
    iat: now,
    exp: now + ADMIN_SESSION_DAYS * 24 * 60 * 60,
  };
  const encoded = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");

  return `${encoded}.${sign(encoded)}`;
}

export function readAdminSessionToken(token: unknown): AdminSessionResult {
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
    ) as Partial<AdminPayload>;

    if (
      !payload ||
      payload.kind !== "admin" ||
      typeof payload.iat !== "number" ||
      typeof payload.exp !== "number"
    ) {
      return { ok: false, reason: "invalid" };
    }

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return { ok: false, reason: "expired" };
    }

    return {
      ok: true,
      payload: {
        kind: "admin",
        iat: payload.iat,
        exp: payload.exp,
      },
    };
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Missing ADMIN_SESSION_SECRET or EBOOK_ACCESS_SECRET"
    ) {
      return { ok: false, reason: "not-configured" };
    }

    return { ok: false, reason: "invalid" };
  }
}

export function getAdminMaxAge(payload: AdminPayload) {
  return Math.max(0, payload.exp - Math.floor(Date.now() / 1000));
}
