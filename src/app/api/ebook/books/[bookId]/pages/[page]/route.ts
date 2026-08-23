import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getBookById } from "@/lib/bookCatalog";
import { tokenAllowsBook } from "@/lib/ebookAccess";
import { readVerifiedEbookSession } from "@/lib/ebookSession";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: { bookId: string; page: string } }
) {
  const book = getBookById(params.bookId);

  if (!book) {
    return NextResponse.json({ error: "Materijal ne postoji." }, { status: 404 });
  }

  const access = await readVerifiedEbookSession(cookies());

  if (!access.ok || !tokenAllowsBook(access.payload, book.id)) {
    return NextResponse.json({ error: "Pristup nije dozvoljen." }, { status: 401 });
  }

  if (!/^\d{3}$/.test(params.page)) {
    return NextResponse.json({ error: "Strana ne postoji." }, { status: 404 });
  }

  const pagePath = path.join(process.cwd(), book.pagesDir, `page-${params.page}.webp`);

  try {
    const bytes = await fs.readFile(pagePath);

    return new NextResponse(bytes, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "Strana ne postoji." }, { status: 404 });
  }
}
