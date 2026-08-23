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

  const access = await readVerifiedEbookSession(cookies());

  if (!access.ok || !tokenAllowsBook(access.payload, book.id)) {
    return NextResponse.json({ error: "Pristup nije dozvoljen." }, { status: 401 });
  }

  const manifestPath = path.join(process.cwd(), book.pagesDir, "manifest.json");
  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8")) as {
    pages: number;
    ext: string;
  };

  return NextResponse.json(
    {
      id: book.id,
      title: book.title,
      description: book.description,
      pages: manifest.pages,
      ext: manifest.ext,
    },
    {
      headers: {
        "Cache-Control": "private, no-store",
      },
    }
  );
}
