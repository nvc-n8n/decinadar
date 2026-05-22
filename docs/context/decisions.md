# Decisions

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
