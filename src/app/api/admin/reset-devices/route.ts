import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, readAdminSessionToken } from "@/lib/adminAuth";
import { isValidEmail, normalizeEmail } from "@/lib/ebookAccess";
import { resetDevicesForEmail } from "@/lib/ebookStore";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = readAdminSessionToken(cookies().get(ADMIN_SESSION_COOKIE)?.value);

  if (!session.ok) {
    return NextResponse.json({ error: "Niste prijavljeni." }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { email?: unknown };
  const email = normalizeEmail(body.email);

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Unesite ispravnu email adresu." }, { status: 400 });
  }

  const reset = await resetDevicesForEmail(email);

  if (!reset) {
    return NextResponse.json(
      { error: "Nema aktivnog pristupa za ovaj email." },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true });
}
