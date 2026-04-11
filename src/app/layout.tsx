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

const siteUrl = "https://decinadar.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Deci na dar | Tamara Janković — Diplomirani vaspitač | Čuvanje dece Beograd",
    template: "%s | Deci na dar",
  },
  description:
    "Tamara Janković, diplomirani vaspitač sa 4+ godine iskustva. Čuvanje dece u Beogradu, edukativne igre, razvojni saveti za roditelje. Besplatan e-book za pripremu deteta za školu. Bez vikanja i kazni.",
  keywords: [
    "čuvanje dece Beograd",
    "bebisiterka Beograd",
    "dadilja Beograd",
    "vaspitač Beograd",
    "diplomirani vaspitač",
    "privatno čuvanje dece",
    "čuvanje dece cena",
    "razvoj dece",
    "igre za decu",
    "priprema za školu",
    "deci na dar",
    "Tamara Janković",
    "Tamara Jankovic vaspitač",
    "edukativne igre za decu",
    "saveti za roditelje",
    "razvojne aktivnosti za decu",
    "čuvanje beba Beograd",
    "dečiji vaspitač privatno",
    "vaspitačica Beograd",
    "pomoć sa decom Beograd",
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
    title: "Deci na dar | Tamara Janković — Čuvanje dece u Beogradu",
    description:
      "Diplomirani vaspitač sa iskustvom. Čuvanje dece u Beogradu, edukativne igre, razvojni saveti. Besplatan e-book za pripremu deteta za školu.",
    type: "website",
    locale: "sr_RS",
    url: siteUrl,
    siteName: "Deci na dar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deci na dar | Tamara Janković — Čuvanje dece Beograd",
    description:
      "Diplomirani vaspitač. Čuvanje dece u Beogradu, edukativne igre, razvojni saveti za roditelje.",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "education",
};

// JSON-LD structured data for babysitter/childcare service
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Deci na dar — Tamara Janković",
  description:
    "Diplomirani vaspitač predškolske dece. Privatno čuvanje dece u Beogradu. Edukativne igre, razvojni saveti, besplatan e-book.",
  url: siteUrl,
  telephone: "",
  email: "tamara.decinadar@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Beograd",
    addressRegion: "Srbija",
    addressCountry: "RS",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "44.7866",
    longitude: "20.4489",
  },
  areaServed: {
    "@type": "City",
    name: "Beograd",
  },
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "07:00",
    closes: "20:00",
  },
  sameAs: [
    "https://www.instagram.com/deci.na.dar/",
    "https://youtube.com/@deci.na.dar1",
    "https://www.tiktok.com/@deci.na.dar",
  ],
  founder: {
    "@type": "Person",
    name: "Tamara Janković",
    jobTitle: "Diplomirani vaspitač predškolske dece",
    description:
      "Vaspitačica sa više od 4 godine iskustva u privatnoj predškolskoj ustanovi. Kreator edukativnog sadržaja za roditelje i decu.",
  },
  additionalType: "https://schema.org/ChildCare",
  serviceType: [
    "Čuvanje dece",
    "Privatno čuvanje dece",
    "Bebisiterka",
    "Dadilja",
    "Edukativne aktivnosti za decu",
  ],
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
