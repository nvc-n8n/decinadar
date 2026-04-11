"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ImageBubbleProps {
  src: string;
  alt: string;
  /** Size in vw units — e.g. 12 means 12vw (scales with viewport) */
  size: number;
  className?: string;
  /** Animation delay in seconds */
  delay?: number;
  /** Float animation speed: "slow" | "medium" | "fast" */
  speed?: "slow" | "medium" | "fast";
}

const speedMap = {
  slow: "animate-float-slow",
  medium: "animate-float-medium",
  fast: "animate-float-fast",
};

export default function ImageBubble({
  src,
  alt,
  size,
  className = "",
  delay = 0,
  speed = "slow",
}: ImageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`absolute ${speedMap[speed]} ${className}`}
      style={{ width: `${size}vw`, height: `${size}vw` }}
    >
      <div className="relative w-full h-full rounded-full overflow-hidden shadow-soft-lg">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}vw`}
          className="object-cover"
          quality={90}
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}
