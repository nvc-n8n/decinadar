// Renderuje sve PDF-ove iz content/books.json u privatne WebP strane.
//
// Upotreba:
//   node scripts/render-books.mjs [scale] [quality]
//
// Izlaz ide u content/book-pages, ne u public. Strane se u produkciji serviraju
// isključivo kroz API rute koje proveravaju pristup kupca.

import { pdf } from "pdf-to-img";
import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const catalogPath = path.join(root, "content", "books.json");
const [, , scaleArg, qualityArg] = process.argv;

const scale = Number(scaleArg) || 2.0;
const quality = Number(qualityArg) || 78;
const ext = "webp";

async function cleanOutput(outDir) {
  await fs.mkdir(outDir, { recursive: true });

  for (const file of await fs.readdir(outDir)) {
    if (/^page-\d+\.(png|webp)$/.test(file) || file === "manifest.json") {
      await fs.unlink(path.join(outDir, file));
    }
  }
}

async function renderBook(book) {
  const input = path.join(root, book.sourcePdf);
  const outDir = path.join(root, book.pagesDir);

  await fs.access(input);
  await cleanOutput(outDir);

  const doc = await pdf(input, { scale });
  let pages = 0;

  for await (const png of doc) {
    pages += 1;
    const num = String(pages).padStart(3, "0");
    const webp = await sharp(png).webp({ quality }).toBuffer();
    await fs.writeFile(path.join(outDir, `page-${num}.${ext}`), webp);
    process.stdout.write(`\r  ${book.id}: ${pages} strana`);
  }

  await fs.writeFile(
    path.join(outDir, "manifest.json"),
    JSON.stringify(
      {
        id: book.id,
        title: book.title,
        pages,
        ext,
        scale,
        quality,
      },
      null,
      2
    )
  );

  console.log(`\n✓ ${book.title}: ${pages} strana → ${book.pagesDir}`);
}

async function main() {
  const books = JSON.parse(await fs.readFile(catalogPath, "utf8"));

  for (const book of books) {
    await renderBook(book);
  }
}

main().catch((error) => {
  console.error("\nGreška pri renderu knjiga:", error);
  process.exit(1);
});
