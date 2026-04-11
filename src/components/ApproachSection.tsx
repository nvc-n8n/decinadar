"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import StaggerChildren, { childVariant } from "./StaggerChildren";
import { LoveIcon, PatienceIcon, TrustIcon } from "./DecorativeSVGs";

const cards = [
  {
    icon: LoveIcon,
    title: "Ljubav",
    text: "Svako dete zaslužuje da bude voljeno onako kakvo jeste. Ljubav je osnova svega što radim — ona gradi sigurnost i samopouzdanje kod deteta.",
  },
  {
    icon: PatienceIcon,
    title: "Strpljenje",
    text: "Deca uče u sopstvenom ritmu. Ja sam tu da ih vodim, ne da ih požurujem. Strpljenje je ključ za razumevanje i podršku u razvoju.",
  },
  {
    icon: TrustIcon,
    title: "Poverenje",
    text: "Kada dete veruje svom vaspitaču, otvara se čitav svet mogućnosti za učenje i rast. Gradim poverenje kroz doslednost i iskrenost.",
  },
];

export default function ApproachSection() {
  return (
    <section id="moj-rad" className="relative py-24 md:py-32 px-6 bg-cream-white">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brown mb-4">
            Moj rad sa decom
          </h2>
          <p className="font-sans text-brown-light max-w-2xl mx-auto">
            Tri stuba na kojima počiva moj pristup vaspitanju i radu sa decom
          </p>
        </AnimatedSection>

        {/* Cards */}
        <StaggerChildren className="grid md:grid-cols-3 gap-8 mb-16">
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={childVariant}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="bg-cream-white rounded-softer p-8 shadow-soft hover:shadow-soft-lg transition-shadow duration-300 text-center"
            >
              <div className="flex justify-center mb-5">
                <card.icon />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-brown mb-3">
                {card.title}
              </h3>
              <p className="font-sans text-brown-light text-sm leading-relaxed">
                {card.text}
              </p>
            </motion.div>
          ))}
        </StaggerChildren>

        <AnimatedSection className="max-w-3xl mx-auto text-center">
          <p className="font-sans text-brown-light leading-relaxed">
            Moj pristup podrazumeva da nema vikanja, nema kazni — samo razumevanje,
            podrška i slobodan prostor za dečji razvoj. Razvoj dece posmatram
            celovito: fizički, emocionalni, socijalni i kognitivni aspekt su
            podjednako važni. Svako dete je jedinstveno i zaslužuje individualan
            pristup.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
