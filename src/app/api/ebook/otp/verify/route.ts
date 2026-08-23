import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { EBOOK_ACCESS_COOKIE, getTokenMaxAge } from "@/lib/ebookAccess";
import { verifyCodeAndRegisterDevice } from "@/lib/ebookStore";
import {
  EBOOK_DEVICE_COOKIE,
  EBOOK_PENDING_COOKIE,
  readPendingEbookGrant,
} from "@/lib/ebookSession";
import { shouldUseSecureCookie } from "@/lib/cookies";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const pending = await readPendingEbookGrant(cookies());

  if (!pending.ok) {
    return NextResponse.json(
      { error: "Link nije važeći. Otvorite ponovo link iz emaila." },
      { status: 401 }
    );
  }

  const body = (await request.json().catch(() => ({}))) as { code?: unknown };
  const code = String(body.code || "").replace(/\D/g, "").slice(0, 6);

  if (code.length !== 6) {
    return NextResponse.json({ error: "Unesite kod od 6 cifara." }, { status: 400 });
  }

  const verified = await verifyCodeAndRegisterDevice(pending.payload, code);

  if (!verified.ok) {
    const message =
      verified.reason === "invalid"
        ? "Kod nije tačan."
        : verified.reason === "expired"
          ? "Kod je istekao. Zatražite novi kod."
          : verified.reason === "too-many-attempts"
            ? "Previše pogrešnih pokušaja. Zatražite novi kod."
            : verified.reason === "device-limit"
              ? "Dostignut je limit od 2 uređaja. Kontaktirajte Tamaru za reset."
              : "Pristup više nije aktivan. Zatražite novi link.";

    return NextResponse.json({ error: message }, { status: 403 });
  }

  const maxAge = getTokenMaxAge(pending.payload);
  const response = NextResponse.json({ ok: true });

  response.cookies.set(EBOOK_ACCESS_COOKIE, pending.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: shouldUseSecureCookie(request),
    path: "/",
    maxAge,
  });
  response.cookies.set(EBOOK_DEVICE_COOKIE, verified.deviceToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: shouldUseSecureCookie(request),
    path: "/",
    maxAge,
  });
  response.cookies.set(EBOOK_PENDING_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: shouldUseSecureCookie(request),
    path: "/",
    maxAge: 0,
  });

  return response;
}
