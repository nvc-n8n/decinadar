import type { EbookAccessPayload } from "./ebookAccess";
import { EBOOK_ACCESS_COOKIE, readEbookAccessToken } from "./ebookAccess";
import { isActiveGrant, isDeviceAuthorized } from "./ebookStore";

export const EBOOK_PENDING_COOKIE = "decinadar_ebook_pending";
export const EBOOK_DEVICE_COOKIE = "decinadar_ebook_device";

type CookieReader = {
  get(name: string): { value: string } | undefined;
};

type SessionResult =
  | { ok: true; payload: EbookAccessPayload; token: string; deviceToken: string }
  | {
      ok: false;
      reason: "missing" | "invalid" | "expired" | "not-configured" | "revoked";
    };

export async function readVerifiedEbookSession(cookies: CookieReader): Promise<SessionResult> {
  const token = cookies.get(EBOOK_ACCESS_COOKIE)?.value;
  const access = readEbookAccessToken(token);

  if (!access.ok) return access;

  const deviceToken = cookies.get(EBOOK_DEVICE_COOKIE)?.value || "";

  try {
    if (!(await isDeviceAuthorized(access.payload, deviceToken))) {
      return { ok: false, reason: "revoked" };
    }
  } catch {
    return { ok: false, reason: "not-configured" };
  }

  return {
    ok: true,
    payload: access.payload,
    token: token!,
    deviceToken,
  };
}

export async function readPendingEbookGrant(cookies: CookieReader): Promise<SessionResult> {
  const token = cookies.get(EBOOK_PENDING_COOKIE)?.value;
  const access = readEbookAccessToken(token);

  if (!access.ok) return access;

  try {
    if (!(await isActiveGrant(access.payload))) {
      return { ok: false, reason: "revoked" };
    }
  } catch {
    return { ok: false, reason: "not-configured" };
  }

  return {
    ok: true,
    payload: access.payload,
    token: token!,
    deviceToken: cookies.get(EBOOK_DEVICE_COOKIE)?.value || "",
  };
}
