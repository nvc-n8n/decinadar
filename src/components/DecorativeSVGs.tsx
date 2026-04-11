"use client";

// Reusable decorative SVG shapes for the site
export function Star({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}

export function Heart({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export function Cloud({ className = "", size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.65}
      viewBox="0 0 32 21"
      fill="currentColor"
      className={className}
    >
      <path d="M25.5 17.5H7a5.5 5.5 0 01-.47-10.98A7.5 7.5 0 0121 6.5h.5a5 5 0 014 9z" />
    </svg>
  );
}

export function ABCBlock({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <rect x="2" y="2" width="24" height="24" rx="4" />
      <text
        x="14"
        y="19"
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
        fontSize="14"
        fontWeight="bold"
        fontFamily="serif"
      >
        A
      </text>
    </svg>
  );
}

export function Flower({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <circle cx="12" cy="12" r="3" />
      <ellipse cx="12" cy="6" rx="2.5" ry="4" opacity="0.7" />
      <ellipse cx="12" cy="18" rx="2.5" ry="4" opacity="0.7" />
      <ellipse cx="6" cy="12" rx="4" ry="2.5" opacity="0.7" />
      <ellipse cx="18" cy="12" rx="4" ry="2.5" opacity="0.7" />
    </svg>
  );
}

export function WavyDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 12"
      fill="none"
      className={`w-24 h-3 ${className}`}
    >
      <path
        d="M0 6c16.667-6 33.333-6 50 0s33.333 6 50 0 33.333-6 50 0 33.333 6 50 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Icons for approach cards
export function LoveIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="22" fill="#FEC9D1" opacity="0.3" />
      <path
        d="M24 36l-1.93-1.76C15.6 28.36 12 25.08 12 21c0-3.32 2.68-6 6-6 1.87 0 3.67.87 4.8 2.24h2.4C26.33 15.87 28.13 15 30 15c3.32 0 6 2.68 6 6 0 4.08-3.6 7.36-10.07 13.25L24 36z"
        fill="#FEC9D1"
      />
    </svg>
  );
}

export function PatienceIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="22" fill="#B1BFEB" opacity="0.3" />
      <circle cx="24" cy="24" r="10" stroke="#B1BFEB" strokeWidth="2.5" fill="none" />
      <path d="M24 18v7l4.5 4.5" stroke="#B1BFEB" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function TrustIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="22" fill="#B1BFEB" opacity="0.2" />
      <circle cx="24" cy="24" r="22" fill="#FEC9D1" opacity="0.15" />
      <path
        d="M16 28c0 0 2-2 4-2s3 2 4 2 2-2 4-2 4 2 4 2"
        stroke="#B1BFEB"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M20 22c1.5-3 3-4 4-4s2.5 1 4 4"
        stroke="#FEC9D1"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="19" cy="20" r="1.5" fill="#B1BFEB" />
      <circle cx="29" cy="20" r="1.5" fill="#B1BFEB" />
    </svg>
  );
}

// Social platform icons
export function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export function YouTubeIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

// Star rating
export function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="#FEC9D1"
        >
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
        </svg>
      ))}
    </div>
  );
}
