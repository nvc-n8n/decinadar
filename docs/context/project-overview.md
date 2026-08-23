# Project Overview

Deci na dar is a Serbian single-page Next.js website for Tamara Janković, a preschool educator. The site presents her work, educational content, e-books, social channels, childcare offer, testimonials, and contact path.

Primary business goals:
- Build trust with parents.
- Promote educational content and e-books.
- Support childcare inquiries in Belgrade.
- Keep weekly content updates fast and low-risk.

Current implementation:
- Next.js App Router.
- Tailwind CSS with custom warm brand colors.
- Framer Motion for section animations.
- Static assets served from `public/images`.
- A production e-book access flow at `/admin` and `/citaj` sends private buyer links and stores access state in Vercel KV/Redis.

Source recovery:
- On 2026-08-23, the complete e-book access implementation and private content were recovered byte-for-byte from Vercel deployment `dpl_DUfRH2PTarNroYw6dw9REdnMfNEp` and restored to version control alongside the current SEO changes.
