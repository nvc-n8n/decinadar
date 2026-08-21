import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const siteUrl = "https://decinadar.rs";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Deci na dar | Tamara Janković — vaspitač | Edukativni sadržaj za decu i roditelje",
    template: "%s | Deci na dar",
  },
  description:
    "Tamara Janković, diplomirani vaspitač sa 4+ godine iskustva. Edukativni sadržaj za decu i roditelje: razvojne igre, saveti za roditelje, priče iz vrtića. Besplatan e-book za pripremu deteta za školu.",
  keywords: [
    "edukativni sadržaj za decu",
    "edukativni sadržaj za roditelje",
    "razvojne igre za decu",
    "edukativne igre za decu",
    "aktivnosti za decu predškolskog uzrasta",
    "priprema deteta za školu",
    "saveti za roditelje",
    "saveti vaspitača",
    "razvoj dece",
    "razvojne aktivnosti za decu",
    "igre za decu",
    "diplomirani vaspitač",
    "deci na dar",
    "Tamara Janković",
    "Tamara Jankovic vaspitač",
    "mališani su rekli podcast",
  ],
  authors: [{ name: "Tamara Janković" }],
  creator: "Tamara Janković",
  publisher: "Deci na dar",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Deci na dar | Tamara Janković — Edukativni sadržaj za decu i roditelje",
    description:
      "Diplomirani vaspitač sa iskustvom. Razvojne igre, saveti za roditelje i priče iz vrtića. Besplatan e-book za pripremu deteta za školu.",
    type: "website",
    locale: "sr_RS",
    url: siteUrl,
    siteName: "Deci na dar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deci na dar | Tamara Janković — Edukativni sadržaj za decu i roditelje",
    description:
      "Diplomirani vaspitač. Razvojne igre, saveti za roditelje i besplatan e-book za pripremu deteta za školu.",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "education",
};

// JSON-LD structured data: brand sajta + Tamara kao autor edukativnog sadržaja
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Deci na dar",
  description:
    "Edukativni sadržaj za decu i roditelje: razvojne igre, saveti za roditelje, priče iz vrtića i besplatan e-book za pripremu deteta za školu.",
  url: siteUrl,
  inLanguage: "sr",
  about: [
    "Edukativni sadržaj za decu",
    "Razvojne igre za decu",
    "Saveti za roditelje",
    "Priprema deteta za školu",
  ],
  author: {
    "@type": "Person",
    name: "Tamara Janković",
    jobTitle: "Diplomirani vaspitač predškolske dece",
    description:
      "Vaspitačica sa više od 4 godine iskustva u privatnoj predškolskoj ustanovi. Kreator edukativnog sadržaja za roditelje i decu.",
    email: "tamara.decinadar@gmail.com",
    knowsAbout: [
      "Predškolsko vaspitanje",
      "Razvojne igre",
      "Priprema deteta za školu",
      "Roditeljstvo",
    ],
    sameAs: [
      "https://www.instagram.com/deci.na.dar/",
      "https://youtube.com/@deci.na.dar1",
      "https://www.tiktok.com/@deci.na.dar",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${caveat.variable} font-sans antialiased bg-cream text-brown`}
      >
        {children}
      </body>
    </html>
  );
}
