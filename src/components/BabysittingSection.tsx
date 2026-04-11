"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

export default function BabysittingSection() {
  return (
    <section className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image collage of kids */}
          <AnimatedSection>
            <div className="relative mx-auto w-full max-w-sm aspect-square">
              {/* Main large circular image */}
              <div className="absolute inset-[10%] rounded-full overflow-hidden shadow-soft-xl">
                <Image
                  src="/images/kids-6.jpg"
                  alt="Čuvanje dece"
                  fill
                  sizes="300px"
                  className="object-cover"
                  quality={90}
                />
              </div>
              {/* Top-right smaller bubble */}
              <div className="absolute top-0 right-0 w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-soft-lg">
                <Image
                  src="/images/kids-2.jpg"
                  alt="Dete se igra"
                  fill
                  sizes="128px"
                  className="object-cover"
                  quality={90}
                />
              </div>
              {/* Bottom-left smaller bubble */}
              <div className="absolute bottom-2 left-0 w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-soft-lg">
                <Image
                  src="/images/kids-9.jpg"
                  alt="Deca se igraju"
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
              Pored edukativnog sadržaja na mrežama, pružam i uslugu čuvanja dece
              u Beogradu. Svako dete koje mi roditelji povere tretiram s istom
              ljubavlju i pažnjom kao svoje. Moj pristup je individualan — prilagođavam
              se potrebama svakog deteta i porodice.
            </p>
            <p className="font-sans text-brown-light leading-relaxed mb-4">
              Bilo da vam treba pomoć na nekoliko sati ili na redovnoj bazi — tu
              sam za vas. Imate priliku da se uverite da sam prava osoba za vaše
              dete pre nego što se obavežete.
            </p>
            <p className="font-hand text-lg text-lavender-dark mb-8">
              Vaše dete je u sigurnim rukama.
            </p>

            <motion.a
              href="#kontakt"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block bg-lavender hover:bg-rose text-brown font-sans font-semibold px-8 py-4 rounded-full shadow-soft transition-colors duration-300"
            >
              Kontaktirajte me
            </motion.a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
