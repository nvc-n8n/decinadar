/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp"],
  },
  experimental: {
    outputFileTracingIncludes: {
      "/api/ebook/books/[bookId]/manifest": ["./content/book-pages/**/*"],
      "/api/ebook/books/[bookId]/pages/[page]": ["./content/book-pages/**/*"],
      "/api/ebook/books/[bookId]/download": ["./content/pdfs/**/*"],
    },
  },
};

export default nextConfig;
