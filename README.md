This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## E-book Admin Setup

Tamara sends access from `/admin`. The buyer receives a personalized email with
a private reading link. A new device must enter a six-digit code sent to the
buyer's email before `/citaj` opens. Access is limited to two active devices and
can be reset from `/admin`.

Set these environment variables in production:

```bash
RESEND_API_KEY=...
EBOOK_ACCESS_SECRET=...
ADMIN_SESSION_SECRET=...
ADMIN_PASSWORD_SHA256=...
NEXT_PUBLIC_SITE_URL=https://decinadar.rs
EBOOK_FROM_EMAIL="Deci na dar <noreply@decinadar.rs>"
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
```

Optional variables:

```bash
EBOOK_REPLY_TO=tamara.decinadar@gmail.com
EBOOK_EMAIL_PREVIEW=true
```

Use `EBOOK_EMAIL_PREVIEW=true` only for local/staging smoke tests. Production
should have Resend configured, `EBOOK_FROM_EMAIL` must be a verified Resend
sender/domain, and preview mode should stay disabled.

`npm run build` renders all PDFs from `content/books.json` into private reader
pages under `content/book-pages`. Those generated pages are served only through
authenticated API routes, not from `public`.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
