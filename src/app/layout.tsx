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

export const metadata: Metadata = {
  title: "Deci na dar — Tamara Janković",
  description:
    "Diplomirani vaspitač. Razvoj dece kroz igru i rutinu. Bez vikanja i kazni. Čuvanje dece u Beogradu.",
  keywords: [
    "vaspitač",
    "čuvanje dece",
    "Beograd",
    "razvoj dece",
    "Tamara Janković",
    "deci na dar",
  ],
  openGraph: {
    title: "Deci na dar — Tamara Janković",
    description:
      "Diplomirani vaspitač. Razvoj dece kroz igru i rutinu. Bez vikanja i kazni.",
    type: "website",
    locale: "sr_RS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${caveat.variable} font-sans antialiased bg-cream text-brown`}
      >
        {children}
      </body>
    </html>
  );
}
