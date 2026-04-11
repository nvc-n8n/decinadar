"use client";

import { InstagramIcon, YouTubeIcon, TikTokIcon, Heart } from "./DecorativeSVGs";

export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-cream border-t border-lavender/20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Brand name */}
        <p className="font-hand text-3xl text-brown mb-4">Deci na dar</p>

        {/* Closing message */}
        <p className="font-sans text-sm text-brown-light leading-relaxed max-w-xl mx-auto mb-6">
          Hvala što ste deo priče Deci na dar. Odrastanje je najlepše putovanje,
          a vi ste svom detetu najveći vodič. Ako vam moje ideje, priče, e-book
          ili sadržaji pomognu bar malo da se osećate sigurnije — onda ovaj sajt
          ima svoju svrhu.
        </p>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-5 mb-6">
          <a
            href="https://www.instagram.com/deci.na.dar/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brown-light hover:text-lavender-dark transition-colors"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-6 h-6" />
          </a>
          <a
            href="https://youtube.com/@deci.na.dar1?si=vx5Ja5IDx-9juOIr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brown-light hover:text-lavender-dark transition-colors"
            aria-label="YouTube"
          >
            <YouTubeIcon className="w-6 h-6" />
          </a>
          <a
            href="https://www.tiktok.com/@deci.na.dar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brown-light hover:text-lavender-dark transition-colors"
            aria-label="TikTok"
          >
            <TikTokIcon className="w-6 h-6" />
          </a>
        </div>

        {/* Copyright */}
        <div className="flex items-center justify-center gap-1.5 text-brown-muted font-sans text-sm">
          <span>&copy; 2026 Deci na dar. Sva prava zadržana.</span>
          <Heart size={14} className="text-rose" />
        </div>
      </div>
    </footer>
  );
}
