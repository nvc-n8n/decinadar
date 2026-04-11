"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import HeroBackground from "./HeroBackground";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Illustrated background with parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <HeroBackground />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 pt-28 md:pt-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Hero image — first on desktop (left side) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex-shrink-0 w-full max-w-sm lg:max-w-md order-2 lg:order-1"
          >
            <div className="relative aspect-[3/4] rounded-softer overflow-hidden shadow-soft-xl">
              <Image
                src="/images/tamara-hero.webp"
                alt="Tamara Janković sa decom"
                fill
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-cover"
                quality={95}
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-brown/15 to-transparent" />
            </div>
          </motion.div>

          {/* Text side — right on desktop */}
          <div className="flex-1 text-center lg:text-left order-1 lg:order-2">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-brown leading-tight mb-5"
            >
              Dobrodošli na sajt{" "}
              <span className="text-lavender-dark">Deci na dar</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="font-sans text-lg md:text-xl text-brown-light leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Mesto koje raste zajedno sa vašom decom. Edukativni sadržaji,
              razvojno-podsticajne igre, inspiracija za roditeljstvo i iskrene
              priče iz vrtićkog života.
            </motion.p>

            <motion.a
              href="#o-meni"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block bg-lavender hover:bg-rose text-brown font-sans font-semibold px-8 py-4 rounded-full shadow-soft transition-colors duration-300 text-base"
            >
              Upoznajte me
            </motion.a>
          </div>
        </div>
      </div>

      {/* Scroll chevron */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.svg
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-brown-light"
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
