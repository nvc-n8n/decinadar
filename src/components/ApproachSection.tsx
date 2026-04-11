"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import StaggerChildren, { childVariant } from "./StaggerChildren";
import { LoveIcon, PatienceIcon, TrustIcon } from "./DecorativeSVGs";
import { ApproachDecorations } from "./SectionDecorations";

const cards = [
  {
    icon: LoveIcon,
    title: "Ljubav",
    text: "Verujem da svako dete ima svoj tempo, svoj stil učenja i svoj način da nam pokaže ko je. Zato ih pažljivo posmatram, slušam i pratim.",
  },
  {
    icon: PatienceIcon,
    title: "Strpljenje",
    text: "Volim disciplinu, ali onu koja se gradi kroz jasne dogovore, rutinu i toplu komunikaciju. Kada dete zna da ga poštuješ, ono počinje da poštuje i druge.",
  },
  {
    icon: TrustIcon,
    title: "Poverenje",
    text: "Kada mu pokloniš sigurnost, ono raširi krila. Prilagođavam se deci, a ne ona meni — jer svako dete zaslužuje da bude viđeno.",
  },
];

export default function ApproachSection() {
  return (
    <section id="moj-rad" className="relative py-24 md:py-32 px-6 bg-cream-white overflow-hidden">
      <ApproachDecorations />
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brown mb-4">
            Moj rad sa decom
          </h2>
          <p className="font-sans text-brown-light max-w-2xl mx-auto">
            Moj rad sa decom zasniva se na tri temelja: ljubav, strpljenje i poverenje.
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

        <AnimatedSection className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Tamara with educational materials */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0 rounded-full overflow-hidden shadow-soft-lg">
              <Image
                src="/images/tamara-reading.jpg"
                alt="Tamara sa edukativnim materijalom"
                fill
                sizes="224px"
                className="object-cover"
                quality={90}
              />
            </div>
            <p className="font-sans text-brown-light leading-relaxed text-center md:text-left">
              Sve što radim nastaje iz jedne želje: da detetu bude lepo da raste,
              a roditelju lakše da razume. Prilagođavam se njima, a ne oni meni —
              jer svako dete zaslužuje da bude viđeno, saslušano i podržano.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
