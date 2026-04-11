"use client";

import { motion } from "framer-motion";

// Small reusable floating decoration positioned absolutely within a section
function Deco({
  children,
  className = "",
  delay = 0,
  duration = 6,
  floatRange = 6,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  floatRange?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className={`absolute pointer-events-none ${className}`}
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

// --- SVG elements ---

function Star({ size = 20, color = "#F5D76E", opacity = 0.7 }: { size?: number; color?: string; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} opacity={opacity}>
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}

function Spark({ size = 14, color = "#F5D76E", opacity = 0.6 }: { size?: number; color?: string; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} opacity={opacity}>
      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10Z" />
    </svg>
  );
}

function Heart({ size = 18, color = "#FEC9D1", opacity = 0.6 }: { size?: number; color?: string; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} opacity={opacity}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function Cloud({ width = 60, opacity = 0.35 }: { width?: number; opacity?: number }) {
  const h = width * 0.5;
  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} fill="none">
      <ellipse cx={width * 0.36} cy={h * 0.65} rx={width * 0.3} ry={h * 0.35} fill="white" opacity={opacity} />
      <ellipse cx={width * 0.6} cy={h * 0.58} rx={width * 0.26} ry={h * 0.38} fill="white" opacity={opacity * 0.9} />
      <ellipse cx={width * 0.25} cy={h * 0.6} rx={width * 0.2} ry={h * 0.26} fill="white" opacity={opacity * 0.8} />
    </svg>
  );
}

function Flower({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 36 50" fill="none" opacity="0.6">
      <line x1="18" y1="25" x2="18" y2="50" stroke="#5CAD5C" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="13" cy="38" rx="5" ry="3" fill="#6BC06B" opacity="0.7" transform="rotate(-30, 13, 38)" />
      <circle cx="18" cy="18" r="6" fill="#F5A3B2" opacity="0.8" />
      <circle cx="12" cy="13" r="5.5" fill="#FEC9D1" opacity="0.7" />
      <circle cx="24" cy="13" r="5.5" fill="#FEC9D1" opacity="0.7" />
      <circle cx="12" cy="22" r="5.5" fill="#FEC9D1" opacity="0.7" />
      <circle cx="24" cy="22" r="5.5" fill="#FEC9D1" opacity="0.7" />
      <circle cx="18" cy="17" r="3.5" fill="#F5D76E" opacity="0.8" />
    </svg>
  );
}

function Leaf({ size = 20, color = "#A8D5A2", opacity = 0.5 }: { size?: number; color?: string; opacity?: number }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 20 30" fill={color} opacity={opacity}>
      <path d="M10 0 C15 8, 18 16, 10 30 C2 16, 5 8, 10 0Z" />
      <line x1="10" y1="5" x2="10" y2="28" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

// --- Decoration presets for different sections ---

export function AboutDecorations() {
  return (
    <>
      <Deco className="top-8 right-[5%] hidden md:block" delay={0.2} duration={7}>
        <Star size={22} color="#F5D76E" opacity={0.6} />
      </Deco>
      <Deco className="top-16 right-[12%] hidden lg:block" delay={0.4} duration={5}>
        <Spark size={14} color="#D4C4F0" opacity={0.5} />
      </Deco>
      <Deco className="bottom-12 left-[4%] hidden md:block" delay={0.6} duration={8}>
        <Heart size={20} color="#FEC9D1" opacity={0.5} />
      </Deco>
      <Deco className="bottom-24 right-[6%] hidden lg:block" delay={0.5} duration={6}>
        <Leaf size={18} />
      </Deco>
    </>
  );
}

export function ApproachDecorations() {
  return (
    <>
      <Deco className="top-10 left-[3%] hidden md:block" delay={0.2} duration={6}>
        <Star size={24} color="#F5D76E" opacity={0.5} />
      </Deco>
      <Deco className="top-20 right-[4%] hidden lg:block" delay={0.4} duration={7}>
        <Heart size={18} color="#F5A3B2" opacity={0.5} />
      </Deco>
      <Deco className="bottom-16 left-[6%] hidden lg:block" delay={0.6} duration={5}>
        <Spark size={16} color="#B1BFEB" opacity={0.5} />
      </Deco>
      <Deco className="bottom-10 right-[3%] hidden md:block" delay={0.3} duration={8}>
        <Cloud width={70} opacity={0.25} />
      </Deco>
    </>
  );
}

export function SocialDecorations() {
  return (
    <>
      <Deco className="top-8 left-[4%] hidden md:block" delay={0.3} duration={7}>
        <Heart size={22} color="#FEC9D1" opacity={0.5} />
      </Deco>
      <Deco className="top-16 right-[5%] hidden lg:block" delay={0.5} duration={6}>
        <Star size={18} color="#F5D76E" opacity={0.5} />
      </Deco>
      <Deco className="bottom-12 right-[8%] hidden md:block" delay={0.4} duration={8}>
        <Spark size={12} color="#D4C4F0" opacity={0.4} />
      </Deco>
    </>
  );
}

export function EbookDecorations() {
  return (
    <>
      <Deco className="top-10 right-[4%] hidden md:block" delay={0.2} duration={7}>
        <Star size={26} color="#F5D76E" opacity={0.6} />
      </Deco>
      <Deco className="top-20 left-[3%] hidden lg:block" delay={0.5} duration={6}>
        <Flower size={32} />
      </Deco>
      <Deco className="bottom-16 right-[6%] hidden lg:block" delay={0.4} duration={5}>
        <Heart size={16} color="#2D2A26" opacity={0.15} />
      </Deco>
      <Deco className="bottom-10 left-[5%] hidden md:block" delay={0.6} duration={8}>
        <Spark size={14} color="#F5D76E" opacity={0.5} />
      </Deco>
    </>
  );
}

export function ComingSoonDecorations() {
  return (
    <>
      <Deco className="top-8 right-[5%] hidden md:block" delay={0.3} duration={6}>
        <Spark size={18} color="#F5D76E" opacity={0.5} />
      </Deco>
      <Deco className="top-16 left-[4%] hidden lg:block" delay={0.5} duration={7}>
        <Star size={20} color="#8A9BD4" opacity={0.4} />
      </Deco>
      <Deco className="bottom-12 right-[7%] hidden md:block" delay={0.4} duration={5}>
        <Heart size={18} color="#FEC9D1" opacity={0.4} />
      </Deco>
      <Deco className="bottom-20 left-[6%] hidden lg:block" delay={0.6} duration={8}>
        <Cloud width={65} opacity={0.2} />
      </Deco>
    </>
  );
}

export function KidsQuotesDecorations() {
  return (
    <>
      <Deco className="top-6 left-[3%] hidden md:block" delay={0.2} duration={6}>
        <Heart size={22} color="#FEC9D1" opacity={0.5} />
      </Deco>
      <Deco className="top-10 right-[4%] hidden lg:block" delay={0.4} duration={7}>
        <Star size={20} color="#F5D76E" opacity={0.5} />
      </Deco>
      <Deco className="bottom-8 left-[5%] hidden md:block" delay={0.5} duration={5}>
        <Spark size={14} color="#B1BFEB" opacity={0.4} />
      </Deco>
      <Deco className="bottom-12 right-[3%] hidden lg:block" delay={0.3} duration={8}>
        <Heart size={16} color="#F5A3B2" opacity={0.4} />
      </Deco>
    </>
  );
}

export function TestimonialsDecorations() {
  return (
    <>
      <Deco className="top-10 right-[4%] hidden md:block" delay={0.3} duration={7}>
        <Star size={24} color="#F5D76E" opacity={0.5} />
      </Deco>
      <Deco className="top-20 left-[3%] hidden lg:block" delay={0.5} duration={6}>
        <Heart size={18} color="#FEC9D1" opacity={0.4} />
      </Deco>
      <Deco className="bottom-16 right-[5%] hidden lg:block" delay={0.4} duration={5}>
        <Spark size={16} color="#D4C4F0" opacity={0.4} />
      </Deco>
    </>
  );
}

export function BabysittingDecorations() {
  return (
    <>
      <Deco className="top-8 right-[4%] hidden md:block" delay={0.2} duration={7}>
        <Cloud width={80} opacity={0.3} />
      </Deco>
      <Deco className="top-20 left-[3%] hidden lg:block" delay={0.4} duration={6}>
        <Star size={20} color="#F5D76E" opacity={0.5} />
      </Deco>
      <Deco className="bottom-12 left-[4%] hidden md:block" delay={0.5} duration={5}>
        <Heart size={20} color="#F5A3B2" opacity={0.45} />
      </Deco>
      <Deco className="bottom-20 right-[5%] hidden lg:block" delay={0.6} duration={8}>
        <Flower size={28} />
      </Deco>
    </>
  );
}

export function PodcastDecorations() {
  return (
    <>
      <Deco className="top-10 right-[5%] hidden md:block" delay={0.3} duration={6}>
        <Star size={22} color="#C8D3F0" opacity={0.35} />
      </Deco>
      <Deco className="top-20 left-[4%] hidden lg:block" delay={0.5} duration={7}>
        <Spark size={16} color="#FEC9D1" opacity={0.3} />
      </Deco>
      <Deco className="bottom-16 right-[6%] hidden lg:block" delay={0.4} duration={5}>
        <Heart size={16} color="#C8D3F0" opacity={0.25} />
      </Deco>
    </>
  );
}

export function ContactDecorations() {
  return (
    <>
      <Deco className="top-8 left-[3%] hidden md:block" delay={0.2} duration={7}>
        <Heart size={24} color="#FEC9D1" opacity={0.5} />
      </Deco>
      <Deco className="top-16 right-[4%] hidden lg:block" delay={0.4} duration={6}>
        <Star size={20} color="#F5D76E" opacity={0.5} />
      </Deco>
      <Deco className="bottom-12 left-[5%] hidden lg:block" delay={0.5} duration={8}>
        <Flower size={30} />
      </Deco>
      <Deco className="bottom-16 right-[5%] hidden md:block" delay={0.3} duration={5}>
        <Spark size={14} color="#B1BFEB" opacity={0.4} />
      </Deco>
    </>
  );
}
