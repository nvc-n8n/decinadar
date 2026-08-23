# Worklog

## 2026-08-23

- Investigated the reported outage affecting the customer e-book access platform.
- Confirmed that the 2026-08-21 Git deployment removed `/admin`, `/citaj`, and the protected e-book API routes because the production-only implementation had never been committed to GitHub.
- Verified the last known-good deployment directly: `/admin` served the admin login and `/citaj` served the private-link reader entry page.
- Rolled production back atomically to Vercel deployment `dpl_DUfRH2PTarNroYw6dw9REdnMfNEp` (`decinadar-2mawnd0qc-mybeatpods1302-7165s-projects.vercel.app`).
- Verified `https://decinadar.rs`, `/admin`, and `/citaj` all return HTTP 200 after rollback; no Redis data, environment variables, customer records, or access links were modified.
- Checked post-rollback runtime error logs; no errors were reported.
- Recovered all 168 source files from the last known-good deployment into an isolated temporary directory and compared them against the current GitHub source.
- Restored the missing admin, reader, OTP/device verification, Redis access, Resend email, private PDFs, rendered book pages, build tracing, and documentation files while preserving the newer SEO metadata from `main`.
- Removed the obsolete public PDF and unused coming-soon section to match the protected production implementation.
- Verified a clean production build with all expected routes and ran local smoke checks: `/`, `/admin`, and `/citaj` returned 200; unauthenticated admin and protected book API calls returned 401.
- Ran a production dependency audit. It reports three high-severity advisories in the existing Next.js 14 dependency tree; remediation requires a separate major Next.js upgrade and was intentionally kept out of the outage recovery diff.
- Committed the recovered application as `ded5f5d`, verified its Vercel preview, fast-forwarded GitHub `main`, and promoted production deployment `dpl_ArtvYqp5UdVbX29DzjSiKSe13Ggp`.
- Confirmed `decinadar.rs`, `www.decinadar.rs`, and `decinadar.vercel.app` all point to the recovered Git-backed deployment.
- Re-ran production route and authorization smoke checks and found no runtime errors.
- Used the Redis read-only token to confirm that all 15 active customer grants remain present after recovery.

## 2026-05-22

- Added missing project context files required by the workspace instructions.
- Added the new downloaded client asset to the "O meni" portrait image and kept the original hero image.
- Added a homepage blog section with the blog intro, first article, and e-book announcement content.
- Added Blog to the navbar and wired the section into the homepage.
- Deployed the approved updates to production on `decinadar.rs`.
