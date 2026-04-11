import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Deci na dar — Tamara Janković";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(180deg, #D4C4F0 0%, #E8D0E0 25%, #FEC9D1 50%, #FEE0E5 70%, #FAF4E3 100%)",
        }}
      >
        {/* Clouds */}
        <div style={{ position: "absolute", top: "30px", left: "60px", display: "flex" }}>
          <svg width="140" height="70" viewBox="0 0 140 70">
            <ellipse cx="50" cy="45" rx="45" ry="25" fill="white" opacity="0.8" />
            <ellipse cx="85" cy="40" rx="40" ry="28" fill="white" opacity="0.9" />
            <ellipse cx="35" cy="42" rx="30" ry="20" fill="white" opacity="0.7" />
          </svg>
        </div>
        <div style={{ position: "absolute", top: "50px", right: "80px", display: "flex" }}>
          <svg width="160" height="80" viewBox="0 0 160 80">
            <ellipse cx="60" cy="50" rx="50" ry="28" fill="white" opacity="0.85" />
            <ellipse cx="100" cy="45" rx="45" ry="30" fill="white" opacity="0.9" />
            <ellipse cx="40" cy="48" rx="35" ry="22" fill="white" opacity="0.75" />
          </svg>
        </div>
        <div style={{ position: "absolute", top: "20px", left: "450px", display: "flex" }}>
          <svg width="100" height="50" viewBox="0 0 100 50">
            <ellipse cx="40" cy="30" rx="35" ry="18" fill="white" opacity="0.6" />
            <ellipse cx="65" cy="28" rx="30" ry="20" fill="white" opacity="0.7" />
          </svg>
        </div>

        {/* Stars */}
        <div style={{ position: "absolute", top: "80px", left: "300px", display: "flex" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#F5D76E">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
          </svg>
        </div>
        <div style={{ position: "absolute", top: "120px", right: "250px", display: "flex" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#F5D76E" opacity="0.8">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
          </svg>
        </div>
        <div style={{ position: "absolute", bottom: "200px", left: "150px", display: "flex" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#D4C4F0">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
          </svg>
        </div>

        {/* Hearts */}
        <div style={{ position: "absolute", top: "100px", right: "180px", display: "flex" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#FEC9D1">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div style={{ position: "absolute", top: "160px", left: "180px", display: "flex" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#F5A3B2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div style={{ position: "absolute", bottom: "160px", right: "320px", display: "flex" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#B1BFEB" opacity="0.7">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        {/* Rolling hills at bottom */}
        <div style={{ position: "absolute", bottom: "0", left: "0", right: "0", display: "flex" }}>
          <svg width="1200" height="160" viewBox="0 0 1200 160">
            <ellipse cx="200" cy="160" rx="280" ry="80" fill="#A8D5A2" opacity="0.6" />
            <ellipse cx="500" cy="165" rx="300" ry="70" fill="#FEC9D1" opacity="0.5" />
            <ellipse cx="800" cy="160" rx="260" ry="75" fill="#B8D9B0" opacity="0.5" />
            <ellipse cx="1050" cy="165" rx="250" ry="65" fill="#FEE0E5" opacity="0.5" />
            <ellipse cx="100" cy="170" rx="200" ry="60" fill="#C5E6C0" opacity="0.4" />
          </svg>
        </div>

        {/* Flower - bottom left */}
        <div style={{ position: "absolute", bottom: "80px", left: "100px", display: "flex" }}>
          <svg width="50" height="70" viewBox="0 0 50 70">
            <line x1="25" y1="35" x2="25" y2="70" stroke="#5CAD5C" strokeWidth="3" />
            <ellipse cx="15" cy="55" rx="8" ry="4" fill="#5CAD5C" opacity="0.7" transform="rotate(-30, 15, 55)" />
            <circle cx="25" cy="25" r="8" fill="#F5A3B2" />
            <circle cx="17" cy="18" r="7" fill="#FEC9D1" />
            <circle cx="33" cy="18" r="7" fill="#FEC9D1" />
            <circle cx="17" cy="30" r="7" fill="#FEC9D1" />
            <circle cx="33" cy="30" r="7" fill="#FEC9D1" />
            <circle cx="25" cy="24" r="5" fill="#F5D76E" />
          </svg>
        </div>

        {/* ABC Blocks - bottom right */}
        <div style={{ position: "absolute", bottom: "60px", right: "120px", display: "flex" }}>
          <svg width="100" height="90" viewBox="0 0 100 90">
            <rect x="5" y="40" width="38" height="38" rx="4" fill="#B1BFEB" stroke="#8A9BD4" strokeWidth="1.5" />
            <text x="24" y="67" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="serif">B</text>
            <rect x="55" y="40" width="38" height="38" rx="4" fill="#F5D76E" stroke="#D4B84E" strokeWidth="1.5" />
            <text x="74" y="67" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="serif">C</text>
            <rect x="30" y="5" width="38" height="38" rx="4" fill="#FEC9D1" stroke="#F5A3B2" strokeWidth="1.5" />
            <text x="49" y="32" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="serif">A</text>
          </svg>
        </div>

        {/* Main text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "36px",
              color: "#2D2A26",
              fontStyle: "italic",
              marginBottom: "8px",
            }}
          >
            Dobrodosli na sajt
          </span>
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "96px",
              fontWeight: "bold",
              fontStyle: "italic",
              color: "#2D2A26",
              lineHeight: "1.1",
              marginBottom: "16px",
            }}
          >
            Deci na dar
          </span>
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "28px",
              fontStyle: "italic",
              color: "#6B6560",
              marginBottom: "12px",
            }}
          >
            Sa ljubavlju za male radoznalce!
          </span>
          <span
            style={{
              fontFamily: "sans-serif",
              fontSize: "22px",
              color: "#9A9490",
            }}
          >
            by Tamara Jankovic
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
