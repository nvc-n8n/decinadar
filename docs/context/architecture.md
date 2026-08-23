# Architecture

The production application is a Next.js App Router website with a public marketing surface and a private e-book delivery flow.

Key files:
- `src/app/page.tsx` composes the homepage sections.
- `src/app/layout.tsx` owns metadata, fonts, and structured data.
- `src/components/*Section.tsx` contains homepage sections.
- `src/components/Navbar.tsx` contains anchor navigation.
- `public/images` stores site images.
- `content/pdfs` stores source PDFs outside the public directory.
- `content/book-pages` stores rendered private reader pages produced during `prebuild`.
- `/admin` is the client-facing admin entry point for sending access to buyers.
- `/citaj` is the private customer reader entry point.
- Protected e-book API routes activate emailed links and serve book manifests/pages.
- Vercel KV/Redis stores customer access state; production secrets and email configuration are managed through Vercel environment variables.

Recovery note:
- The private e-book routes and content were recovered from `dpl_DUfRH2PTarNroYw6dw9REdnMfNEp` on 2026-08-23. Future production changes must originate from the complete version-controlled application and include route smoke checks.

Content strategy:
- Homepage sections are component-based and content is stored close to the component for speed.
- Blog content currently lives in `src/components/BlogSection.tsx` as static arrays, which is the smallest production-ready setup for weekly manual posts.
- If blog volume grows beyond a few posts, move posts to MDX or a small content collection.
