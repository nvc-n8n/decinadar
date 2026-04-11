"use client";

import { motion } from "framer-motion";

function FloatingElement({
  children,
  x,
  y,
  delay = 0,
  duration = 6,
  floatRange = 8,
  className = "",
}: {
  children: React.ReactNode;
  x: string;
  y: string;
  delay?: number;
  duration?: number;
  floatRange?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay + 1.0, duration: 0.8, ease: "easeOut" }}
      className={`absolute pointer-events-none ${className}`}
      style={{ left: x, top: y }}
    >
      <motion.div
        animate={{ y: [-floatRange / 2, floatRange / 2, -floatRange / 2] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function CloudSVG({ width = 140, opacity = 0.8 }: { width?: number; opacity?: number }) {
  const h = width * 0.5;
  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} fill="none">
      <ellipse cx={width * 0.36} cy={h * 0.65} rx={width * 0.32} ry={h * 0.36} fill="white" opacity={opacity} />
      <ellipse cx={width * 0.6} cy={h * 0.58} rx={width * 0.28} ry={h * 0.4} fill="white" opacity={opacity * 0.95} />
      <ellipse cx={width * 0.25} cy={h * 0.6} rx={width * 0.22} ry={h * 0.28} fill="white" opacity={opacity * 0.85} />
    </svg>
  );
}

function StarSVG({ size = 24, color = "#F5D76E", opacity = 1 }: { size?: number; color?: string; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} opacity={opacity}>
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}

function SparkSVG({ size = 16, color = "#F5D76E" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10Z" />
    </svg>
  );
}

function HeartSVG({ size = 24, color = "#FEC9D1" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function FlowerSVG() {
  return (
    <svg width="60" height="90" viewBox="0 0 60 90" fill="none">
      {/* Stem */}
      <line x1="30" y1="40" x2="30" y2="90" stroke="#5CAD5C" strokeWidth="3" strokeLinecap="round" />
      {/* Leaf */}
      <ellipse cx="20" cy="65" rx="10" ry="5" fill="#6BC06B" opacity="0.8" transform="rotate(-30, 20, 65)" />
      <ellipse cx="40" cy="72" rx="8" ry="4" fill="#6BC06B" opacity="0.7" transform="rotate(25, 40, 72)" />
      {/* Petals */}
      <circle cx="30" cy="28" r="10" fill="#F5A3B2" opacity="0.9" />
      <circle cx="20" cy="20" r="9" fill="#FEC9D1" />
      <circle cx="40" cy="20" r="9" fill="#FEC9D1" />
      <circle cx="20" cy="34" r="9" fill="#FEC9D1" />
      <circle cx="40" cy="34" r="9" fill="#FEC9D1" />
      {/* Center */}
      <circle cx="30" cy="27" r="6" fill="#F5D76E" />
    </svg>
  );
}

function ABCBlocksSVG() {
  return (
    <svg width="110" height="95" viewBox="0 0 110 95" fill="none">
      {/* Block B - bottom left */}
      <rect x="5" y="45" width="42" height="42" rx="5" fill="#B1BFEB" />
      <rect x="5" y="45" width="42" height="42" rx="5" stroke="#8A9BD4" strokeWidth="1.5" fill="none" />
      <text x="26" y="74" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="Georgia, serif">B</text>
      {/* Block C - bottom right */}
      <rect x="60" y="45" width="42" height="42" rx="5" fill="#F5D76E" />
      <rect x="60" y="45" width="42" height="42" rx="5" stroke="#D4B84E" strokeWidth="1.5" fill="none" />
      <text x="81" y="74" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="Georgia, serif">C</text>
      {/* Block A - top center */}
      <rect x="32" y="5" width="42" height="42" rx="5" fill="#FEC9D1" />
      <rect x="32" y="5" width="42" height="42" rx="5" stroke="#F5A3B2" strokeWidth="1.5" fill="none" />
      <text x="53" y="34" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="Georgia, serif">A</text>
    </svg>
  );
}

export default function HeroBackground() {
  return (
    <>
      {/* Gradient sky background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #D4C4F0 0%, #DCCCE8 15%, #E8D0E0 30%, #F2D5D8 45%, #FEE0E5 60%, #FAF0E8 80%, #FAF4E3 100%)",
        }}
      />

      {/* Clouds */}
      <FloatingElement x="3%" y="5%" delay={0} duration={8} floatRange={6}>
        <CloudSVG width={160} opacity={0.85} />
      </FloatingElement>
      <FloatingElement x="70%" y="3%" delay={0.3} duration={9} floatRange={5} className="hidden md:block">
        <CloudSVG width={180} opacity={0.9} />
      </FloatingElement>
      <FloatingElement x="40%" y="1%" delay={0.5} duration={7} floatRange={4} className="hidden lg:block">
        <CloudSVG width={110} opacity={0.65} />
      </FloatingElement>
      <FloatingElement x="85%" y="8%" delay={0.2} duration={10} floatRange={5} className="hidden md:block">
        <CloudSVG width={100} opacity={0.5} />
      </FloatingElement>

      {/* Stars */}
      <FloatingElement x="25%" y="12%" delay={0.4} duration={5} floatRange={4}>
        <StarSVG size={28} />
      </FloatingElement>
      <FloatingElement x="65%" y="18%" delay={0.6} duration={6} floatRange={5} className="hidden md:block">
        <StarSVG size={22} opacity={0.8} />
      </FloatingElement>
      <FloatingElement x="82%" y="25%" delay={0.8} duration={4} floatRange={6} className="hidden lg:block">
        <SparkSVG size={18} color="#F5D76E" />
      </FloatingElement>
      <FloatingElement x="12%" y="30%" delay={1.0} duration={7} floatRange={3} className="hidden md:block">
        <SparkSVG size={14} color="#D4C4F0" />
      </FloatingElement>
      <FloatingElement x="55%" y="8%" delay={0.7} duration={5} floatRange={4} className="hidden lg:block">
        <StarSVG size={16} color="#F5A3B2" opacity={0.7} />
      </FloatingElement>

      {/* Hearts */}
      <FloatingElement x="75%" y="15%" delay={0.5} duration={6} floatRange={6}>
        <HeartSVG size={28} color="#FEC9D1" />
      </FloatingElement>
      <FloatingElement x="18%" y="22%" delay={0.9} duration={5} floatRange={5} className="hidden md:block">
        <HeartSVG size={20} color="#F5A3B2" />
      </FloatingElement>
      <FloatingElement x="88%" y="35%" delay={1.1} duration={7} floatRange={4} className="hidden lg:block">
        <HeartSVG size={16} color="#B1BFEB" />
      </FloatingElement>
      <FloatingElement x="60%" y="25%" delay={0.7} duration={6} floatRange={5} className="hidden lg:block">
        <HeartSVG size={14} color="#D4C4F0" />
      </FloatingElement>

      {/* Rolling hills at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 200"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-24 md:h-32 lg:h-40"
        >
          {/* Back hills - green */}
          <ellipse cx="250" cy="200" rx="400" ry="120" fill="#A8D5A2" opacity="0.5" />
          <ellipse cx="900" cy="200" rx="350" ry="110" fill="#B8D9B0" opacity="0.45" />
          <ellipse cx="1300" cy="200" rx="300" ry="100" fill="#A8D5A2" opacity="0.4" />
          {/* Mid hills - pink */}
          <ellipse cx="500" cy="210" rx="380" ry="95" fill="#FEC9D1" opacity="0.4" />
          <ellipse cx="1100" cy="215" rx="350" ry="85" fill="#FEE0E5" opacity="0.45" />
          {/* Front hills - green */}
          <ellipse cx="150" cy="220" rx="280" ry="80" fill="#C5E6C0" opacity="0.5" />
          <ellipse cx="700" cy="225" rx="320" ry="75" fill="#D4EDD0" opacity="0.4" />
          <ellipse cx="1200" cy="220" rx="300" ry="80" fill="#C5E6C0" opacity="0.45" />
          {/* Ground */}
          <rect x="0" y="180" width="1440" height="20" fill="#FAF4E3" opacity="0.6" />
        </svg>
      </div>

      {/* Flower - bottom left */}
      <FloatingElement x="5%" y="auto" delay={0.8} duration={7} floatRange={4} className="hidden md:block bottom-20 !top-auto">
        <FlowerSVG />
      </FloatingElement>

      {/* ABC Blocks - bottom right */}
      <FloatingElement x="auto" y="auto" delay={1.0} duration={8} floatRange={3} className="hidden md:block bottom-24 right-[5%] !top-auto !left-auto">
        <ABCBlocksSVG />
      </FloatingElement>
    </>
  );
}
