import { NextRequest, NextResponse } from "next/server";
import { EBOOK_ACCESS_COOKIE, readEbookAccessToken } from "@/lib/ebookAccess";
import { revokeDevice } from "@/lib/ebookStore";
import { EBOOK_DEVICE_COOKIE, EBOOK_PENDING_COOKIE } from "@/lib/ebookSession";
import { shouldUseSecureCookie } from "@/lib/cookies";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(EBOOK_ACCESS_COOKIE)?.value;
  const deviceToken = request.cookies.get(EBOOK_DEVICE_COOKIE)?.value || "";
  const access = readEbookAccessToken(token);

  if (access.ok && deviceToken) {
    await revokeDevice(access.payload, deviceToken).catch(() => {});
  }

  const response = NextResponse.redirect(new URL("/citaj", request.url), 303);

  for (const name of [EBOOK_ACCESS_COOKIE, EBOOK_DEVICE_COOKIE, EBOOK_PENDING_COOKIE]) {
    response.cookies.set(name, "", {
      httpOnly: true,
      sameSite: "lax",
      secure: shouldUseSecureCookie(request),
      path: "/",
      maxAge: 0,
    });
  }

  return response;
}
