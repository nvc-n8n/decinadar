# Architecture

The website is a static-style Next.js App Router application.

Key files:
- `src/app/page.tsx` composes the homepage sections.
- `src/app/layout.tsx` owns metadata, fonts, and structured data.
- `src/components/*Section.tsx` contains homepage sections.
- `src/components/Navbar.tsx` contains anchor navigation.
- `public/images` stores site images.
- `public/ebook-deci-na-dar.pdf` stores the downloadable e-book.

Content strategy:
- Homepage sections are component-based and content is stored close to the component for speed.
- Blog content currently lives in `src/components/BlogSection.tsx` as static arrays, which is the smallest production-ready setup for weekly manual posts.
- If blog volume grows beyond a few posts, move posts to MDX or a small content collection.
