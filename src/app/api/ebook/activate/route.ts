import { NextRequest, NextResponse } from "next/server";
import {
  EBOOK_ACCESS_COOKIE,
  getTokenMaxAge,
  readEbookAccessToken,
} from "@/lib/ebookAccess";
import { isActiveGrant, isDeviceAuthorized } from "@/lib/ebookStore";
import { EBOOK_DEVICE_COOKIE, EBOOK_PENDING_COOKIE } from "@/lib/ebookSession";
import { shouldUseSecureCookie } from "@/lib/cookies";

export const runtime = "nodejs";

function redirectToReader(request: NextRequest, error?: string) {
  const url = new URL("/citaj", request.url);
  if (error) url.searchParams.set("error", error);
  return NextResponse.redirect(url);
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const access = readEbookAccessToken(token);

  if (!access.ok) {
    return redirectToReader(request, access.reason);
  }

  try {
    if (!(await isActiveGrant(access.payload))) {
      return redirectToReader(request, "revoked");
    }

    const currentDevice = request.cookies.get(EBOOK_DEVICE_COOKIE)?.value || "";
    if (currentDevice && (await isDeviceAuthorized(access.payload, currentDevice))) {
      const response = redirectToReader(request);
      response.cookies.set(EBOOK_ACCESS_COOKIE, token!, {
        httpOnly: true,
        sameSite: "lax",
        secure: shouldUseSecureCookie(request),
        path: "/",
        maxAge: getTokenMaxAge(access.payload),
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
  } catch {
    return redirectToReader(request, "not-configured");
  }

  const response = redirectToReader(request);
  response.cookies.set(EBOOK_PENDING_COOKIE, token!, {
    httpOnly: true,
    sameSite: "lax",
    secure: shouldUseSecureCookie(request),
    path: "/",
    maxAge: Math.min(getTokenMaxAge(access.payload), 30 * 60),
  });
  response.cookies.set(EBOOK_ACCESS_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: shouldUseSecureCookie(request),
    path: "/",
    maxAge: 0,
  });

  return response;
}
