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
  { params }: { params: { bookId: string } }
) {
  const book = getBookById(params.bookId);

  if (!book) {
    return NextResponse.json({ error: "Materijal ne postoji." }, { status: 404 });
  }

  if (!book.downloadable) {
    return NextResponse.json({ error: "Ovaj materijal nije za preuzimanje." }, { status: 403 });
  }

  const access = await readVerifiedEbookSession(cookies());

  if (!access.ok || !tokenAllowsBook(access.payload, book.id)) {
    return NextResponse.json({ error: "Pristup nije dozvoljen." }, { status: 401 });
  }

  const pdfPath = path.join(process.cwd(), book.sourcePdf);

  try {
    const bytes = await fs.readFile(pdfPath);

    return new NextResponse(bytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${book.id}.pdf"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "Materijal trenutno nije dostupan." }, { status: 404 });
  }
}
