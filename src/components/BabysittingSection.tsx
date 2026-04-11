"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { BabysittingDecorations } from "./SectionDecorations";

export default function BabysittingSection() {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      <BabysittingDecorations />
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image collage */}
          <AnimatedSection>
            <div className="relative mx-auto w-full max-w-sm aspect-square">
              {/* Main large circular image — Tamara doing activity with child */}
              <div className="absolute inset-[10%] rounded-full overflow-hidden shadow-soft-xl">
                <Image
                  src="/images/tamara-activity.jpg"
                  alt="Tamara radi aktivnost sa detetom"
                  fill
                  sizes="300px"
                  className="object-cover"
                  quality={90}
                />
              </div>
              {/* Top-right smaller bubble — tender moment */}
              <div className="absolute top-0 right-0 w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-soft-lg">
                <Image
                  src="/images/tamara-love.jpg"
                  alt="Devojčica ljubi Tamaru"
                  fill
                  sizes="128px"
                  className="object-cover"
                  quality={90}
                />
              </div>
              {/* Bottom-left smaller bubble */}
              <div className="absolute bottom-2 left-0 w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-soft-lg">
                <Image
                  src="/images/tamara-group-selfie.jpg"
                  alt="Tamara sa decom"
                  fill
                  sizes="112px"
                  className="object-cover"
                  quality={90}
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection delay={0.2}>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brown mb-6">
              Čuvanje dece
            </h2>
            <p className="font-sans text-brown-light leading-relaxed mb-4">
              Čuvanje dece za mene nikada nije bio samo posao. To je vreme u kojem
              upoznajem nove porodice, otkrivam nove karaktere, učim iz dečijih
              pitanja i smejem se njihovim idejama.
            </p>
            <p className="font-sans text-brown-light leading-relaxed mb-4">
              Uživam u tome da deca pored mene budu sigurna, podržana i radosna,
              a roditelji mirni i opušteni.
            </p>
            <p className="font-hand text-lg text-lavender-dark mb-8">
              Ako želite negu, posvećenost i toplinu — biće mi drago da se upoznamo.
            </p>

            <div className="text-center md:text-left">
              <motion.a
                href="#kontakt"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block bg-lavender hover:bg-rose text-brown font-sans font-semibold px-8 py-4 rounded-full shadow-soft transition-colors duration-300"
              >
                Kontaktirajte me
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
