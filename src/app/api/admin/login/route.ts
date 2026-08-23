import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminMaxAge,
  isAdminAuthConfigured,
  readAdminSessionToken,
  verifyAdminPassword,
} from "@/lib/adminAuth";
import { shouldUseSecureCookie } from "@/lib/cookies";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { password?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Neispravan zahtev." }, { status: 400 });
  }

  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { error: "Admin prijava nije podešena na serveru." },
      { status: 500 }
    );
  }

  if (!verifyAdminPassword(body.password)) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return NextResponse.json({ error: "Pogrešna lozinka." }, { status: 401 });
  }

  const token = createAdminSessionToken();
  const session = readAdminSessionToken(token);
  const response = NextResponse.json({ ok: true });

  if (session.ok) {
    response.cookies.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: shouldUseSecureCookie(request),
      path: "/",
      maxAge: getAdminMaxAge(session.payload),
    });
  }

  return response;
}
