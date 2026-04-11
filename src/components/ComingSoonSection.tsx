"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

export default function ComingSoonSection() {
  return (
    <section className="py-24 md:py-32 px-6 bg-lavender/25">
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
            Radim na potpuno novom e-booku koji ide još dublje u teme koje vas
            najviše zanimaju — od postavljanja granica, preko rutina, do
            emocionalnog razvoja dece. Bićete prvi koji će saznati kad bude gotov!
          </p>

          <p className="font-hand text-xl text-lavender-dark mb-10">
            Ostanite uz mene — biće vredno čekanja.
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
