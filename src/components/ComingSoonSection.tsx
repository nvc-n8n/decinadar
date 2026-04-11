"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { ComingSoonDecorations } from "./SectionDecorations";

export default function ComingSoonSection() {
  return (
    <section className="relative py-24 md:py-32 px-6 bg-lavender/25 overflow-hidden">
      <ComingSoonDecorations />
      <div className="max-w-3xl mx-auto text-center">
        <AnimatedSection>
          {/* Badge */}
          <motion.span
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block bg-lavender text-brown font-sans font-semibold text-sm px-5 py-2 rounded-full mb-8"
          >
            Uskoro dostupan
          </motion.span>

          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brown mb-6">
            Novi e-book u pripremi
          </h2>

          <p className="font-sans text-brown-light leading-relaxed mb-4 max-w-xl mx-auto">
            Zbog ogromnog interesovanja i potrebe roditelja za jasnim smernicama,
            spremam proširen i detaljniji e-book. On će obuhvatiti praktične
            savete, konkretne primere, razvojne igre i sve ono što će vam pomoći
            oko rutina koje menjaju dečije ponašanje — bez vikanja i kazne.
          </p>

          <p className="font-hand text-xl text-lavender-dark mb-10">
            Radujem se što će uskoro biti dostupan!
          </p>

          {/* Email signup (UI only) */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Vaš email"
              className="flex-1 bg-cream-white border border-lavender/40 rounded-full px-6 py-3 font-sans text-sm text-brown placeholder:text-brown-muted focus:outline-none focus:ring-2 focus:ring-lavender/50 transition-shadow"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-lavender hover:bg-lavender-dark text-brown font-sans font-semibold px-6 py-3 rounded-full transition-colors duration-300"
            >
              Obavesti me
            </motion.button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
