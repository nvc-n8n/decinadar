# Decisions

## 2026-08-23: Roll back to the last deployment containing the customer portal

Decision: Roll production back to `dpl_DUfRH2PTarNroYw6dw9REdnMfNEp` after the latest Git deployment removed the e-book admin and reader routes.

Why:
- The previous deployment was verified before promotion and contains working `/admin` and `/citaj` routes.
- Rollback only re-points production traffic; it does not migrate or delete the Redis data holding existing customer access.
- Restoring service immediately has lower risk than rebuilding the missing portal during an active outage.

Tradeoff:
- Production was restored immediately, then the exact portal source was recovered and verified separately before re-enabling the Git deployment path.

## 2026-08-23: Preserve the working portal artifact and current SEO

Decision: Restore the portal implementation byte-for-byte from the last known-good deployment, but retain the newer `src/app/layout.tsx` SEO changes from GitHub `main`.

Why:
- The deployed artifact is the only complete source of the production-tested customer flow.
- The later SEO-only commit is independent of admin, reader, Redis, and email behavior.
- Keeping the merge narrow minimizes risk to the 15 existing customer grants.

Tradeoff:
- The recovered application remains on Next.js 14 for this incident fix. A major framework upgrade should be handled and tested separately.

## 2026-05-22: Add blog as homepage section

Decision: Add the first blog content directly as a homepage section instead of introducing routing, CMS, MDX, or a database.

Why:
- The client needs weekly manual blog additions now.
- The site is already a single-page marketing site.
- Static component content is the fastest reliable path with minimal maintenance.

Tradeoff:
- This is not ideal for a large archive.
- Revisit when there are enough posts to justify dedicated blog routes and content files.

## 2026-05-22: Use downloaded image in "O meni"

Decision: Copy the downloaded image into `public/images/tamara-hero-new.png` and use it in the "O meni" portrait slot while keeping the original hero image.

Why:
- Keeps deployment self-contained.
- Avoids depending on a local Downloads path.
