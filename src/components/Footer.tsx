"use client";

import { InstagramIcon, YouTubeIcon, TikTokIcon, Heart } from "./DecorativeSVGs";

export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-cream border-t border-lavender/20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Brand name */}
        <p className="font-hand text-3xl text-brown mb-6">Deci na dar</p>

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
            href="https://www.youtube.com/@decinadar"
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
