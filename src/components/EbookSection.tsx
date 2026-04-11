"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import { EbookDecorations } from "./SectionDecorations";

const features = [
  "Kako dete razmišlja i šta je zaista važno pre škole",
  "Kako se snalazi u svakodnevnim situacijama",
  "Kako rešava probleme i sarađuje u grupi",
  "Bez pritiska — jasan i topao smer za roditelje",
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
          {/* Ebook promo photo */}
          <AnimatedSection>
            <motion.div style={{ y: bookY }} className="flex justify-center">
              <div className="relative w-full max-w-sm aspect-[9/16] rounded-softer overflow-hidden shadow-soft-xl">
                <Image
                  src="/images/tamara-ebook.jpg"
                  alt="Tamara promoviše besplatan e-book"
                  fill
                  sizes="(max-width: 768px) 100vw, 384px"
                  className="object-cover"
                  quality={90}
                />
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Description */}
          <AnimatedSection delay={0.2}>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brown mb-4">
              Poklon e-book
            </h2>
            <p className="font-sans text-brown-light leading-relaxed mb-4">
              Ovaj e-book sam napisala jer svakodnevno gledam istu dilemu kod
              roditelja: &bdquo;Da li je moje dete spremno za školu?&ldquo; I skoro uvek
              se sve svede na slova, brojeve i pisanje.
            </p>
            <p className="font-sans text-brown-light leading-relaxed mb-6">
              A ja iz prakse vidim da to nije ono što pravi razliku. Razliku pravi
              dete koje ume da kaže šta mu treba, koje zna da sačeka, da sarađuje,
              da izdrži kada nešto ne ide odmah.
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
              href="/ebook-deci-na-dar.pdf"
              download="Šta dete treba da zna pre polaska u školu - Deci na dar.pdf"
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
