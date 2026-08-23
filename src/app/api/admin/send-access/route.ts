import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { normalizeBookIds } from "@/lib/bookCatalog";
import { getSiteUrl, sendAccessEmail } from "@/lib/email";
import {
  createEbookAccessToken,
  isValidEmail,
  normalizeEmail,
  normalizeName,
  readEbookAccessToken,
} from "@/lib/ebookAccess";
import {
  activateAccessGrant,
  removeStagedGrant,
  stageAccessGrant,
} from "@/lib/ebookStore";
import { ADMIN_SESSION_COOKIE, readAdminSessionToken } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = readAdminSessionToken(cookies().get(ADMIN_SESSION_COOKIE)?.value);

  if (!session.ok) {
    return NextResponse.json({ error: "Niste prijavljeni." }, { status: 401 });
  }

  let body: {
    name?: unknown;
    email?: unknown;
    bookIds?: unknown;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Neispravan zahtev." }, { status: 400 });
  }

  const email = normalizeEmail(body.email);
  const name = normalizeName(body.name);
  const bookIds = normalizeBookIds(body.bookIds);

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Unesite ispravnu email adresu." }, { status: 400 });
  }

  if (!bookIds.length) {
    return NextResponse.json({ error: "Izaberite bar jedan materijal." }, { status: 400 });
  }

  let token: string;
  let grantId: string;

  try {
    grantId = randomUUID();
    token = createEbookAccessToken({ grantId, email, name, bookIds });

    const access = readEbookAccessToken(token);
    if (!access.ok) throw new Error("Invalid generated access token");
    await stageAccessGrant(access.payload);
  } catch {
    return NextResponse.json(
      { error: "Pristupni link nije moguće napraviti. Proverite EBOOK_ACCESS_SECRET." },
      { status: 500 }
    );
  }

  const readerUrl = `${getSiteUrl(request)}/api/ebook/activate?token=${encodeURIComponent(token)}`;
  const result = await sendAccessEmail({
    to: email,
    name,
    readerUrl,
    bookIds,
  });

  if (!result.ok) {
    await removeStagedGrant(grantId).catch(() => {});
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  try {
    const access = readEbookAccessToken(token);
    if (!access.ok) throw new Error("Invalid generated access token");
    await activateAccessGrant(access.payload);
  } catch {
    return NextResponse.json(
      { error: "Email je poslat, ali pristup nije aktiviran. Pošaljite novi pristup." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    preview: result.preview,
    readerUrl,
  });
}
