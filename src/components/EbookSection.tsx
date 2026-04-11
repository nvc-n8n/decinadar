"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { EbookDecorations } from "./SectionDecorations";

const features = [
  "Praktični saveti za svakodnevne situacije sa decom",
  "Tehnike smirenja bez vikanja i kazni",
  "Igre i aktivnosti za razvoj dečje kreativnosti",
  "Rutine koje pomažu deci da se osećaju sigurno",
];

export default function EbookSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bookY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="e-book" ref={ref} className="relative py-24 md:py-32 px-6 bg-rose/40 overflow-hidden">
      <EbookDecorations />
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Book mockup */}
          <AnimatedSection>
            <motion.div style={{ y: bookY }} className="flex justify-center">
              <div className="relative">
                {/* Book shadow */}
                <div className="absolute inset-4 bg-brown/5 rounded-soft blur-xl" />
                {/* Book cover */}
                <div className="relative w-56 h-72 md:w-64 md:h-80 bg-gradient-to-br from-lavender to-lavender-dark rounded-soft shadow-soft-xl flex flex-col items-center justify-center p-6 text-center">
                  {/* Replace with actual book cover image */}
                  <div className="w-12 h-12 bg-cream-white/30 rounded-full mb-4 flex items-center justify-center">
                    <span className="text-2xl">📖</span>
                  </div>
                  <h3 className="font-hand text-2xl text-cream-white mb-2">
                    Deci na dar
                  </h3>
                  <p className="font-sans text-xs text-cream-white/80">
                    Besplatan e-book
                  </p>
                  {/* Book spine effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-3 bg-lavender-dark/20 rounded-l-soft" />
                </div>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Description */}
          <AnimatedSection delay={0.2}>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brown mb-4">
              Poklon e-book
            </h2>
            <p className="font-sans text-brown-light leading-relaxed mb-6">
              Preuzmite besplatan e-book u kojem delim najvažnije lekcije i savete
              iz svog dugogodišnjeg iskustva rada sa decom. Bilo da ste roditelj,
              vaspitač ili neko ko voli decu — ova knjiga je za vas.
            </p>

            {/* Checkmark items */}
            <ul className="space-y-3 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-lavender-dark mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-sans text-sm text-brown-light">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block bg-cream hover:bg-cream-white text-brown font-sans font-semibold px-8 py-4 rounded-full shadow-soft transition-colors duration-300"
            >
              Preuzmi besplatno
            </motion.a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
