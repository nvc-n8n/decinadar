"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

export default function PodcastSection() {
  return (
    <section className="py-24 md:py-32 px-6 bg-brown text-cream-white">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Podcast cover art placeholder */}
          <AnimatedSection>
            <div className="relative mx-auto w-64 h-64 md:w-72 md:h-72">
              <div className="absolute inset-0 bg-lavender/10 rounded-softer blur-2xl" />
              <div className="relative w-full h-full bg-gradient-to-br from-lavender-dark/30 to-rose/20 rounded-softer border border-cream-white/10 flex flex-col items-center justify-center gap-4 p-6">
                {/* Microphone icon */}
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-cream-white/60"
                >
                  <rect x="9" y="2" width="6" height="12" rx="3" />
                  <path d="M5 10a7 7 0 0014 0" />
                  <line x1="12" y1="17" x2="12" y2="22" />
                  <line x1="8" y1="22" x2="16" y2="22" />
                </svg>
                <span className="font-hand text-xl text-cream-white/80">
                  Deci na dar
                </span>
                <span className="font-sans text-xs text-cream-white/50">
                  Podcast
                </span>
              </div>
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection delay={0.2}>
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block bg-cream-white/10 border border-cream-white/20 text-cream-white/80 font-sans font-semibold text-sm px-5 py-2 rounded-full mb-6"
            >
              Uskoro
            </motion.span>

            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-cream-white mb-6">
              Podcast
            </h2>

            <p className="font-sans text-cream-white/70 leading-relaxed mb-4">
              Pripremam podcast u kome ću deliti svoja iskustva, razgovarati sa
              stručnjacima iz oblasti dečjeg razvoja i odgovarati na vaša pitanja.
              Teme će obuhvatiti sve od svakodnevnih izazova roditeljstva do
              specifičnih aspekata dečjeg razvoja.
            </p>

            <p className="font-hand text-xl text-lavender-light">
              Pratite me na mrežama za najave!
            </p>

            {/* Embedded player placeholder */}
            <div className="mt-8 bg-cream-white/5 border border-cream-white/10 rounded-soft p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-cream-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-cream-white/40 ml-0.5"
                >
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="h-1.5 bg-cream-white/10 rounded-full">
                  <div className="h-full w-0 bg-lavender/40 rounded-full" />
                </div>
                <p className="font-sans text-xs text-cream-white/30 mt-1.5">
                  Epizode uskoro...
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
