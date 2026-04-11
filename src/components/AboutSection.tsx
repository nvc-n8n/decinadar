"use client";

import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import { WavyDivider } from "./DecorativeSVGs";
import { AboutDecorations } from "./SectionDecorations";

export default function AboutSection() {
  return (
    <section id="o-meni" className="relative py-24 md:py-32 px-6 overflow-hidden">
      <AboutDecorations />
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Tamara's portrait photo */}
          <AnimatedSection>
            <div className="relative mx-auto w-72 h-72 md:w-96 md:h-96">
              {/* Decorative circle behind */}
              <div className="absolute inset-0 bg-lavender/15 rounded-full scale-110" />
              {/* Photo frame */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-soft-xl">
                {/*
                  To add Tamara's portrait photo:
                  Save the portrait image as /public/images/tamara-portrait.jpg
                  then remove the placeholder below and uncomment the Image component
                */}
                <Image
                  src="/images/tamara-professional.jpg"
                  alt="Tamara Janković"
                  fill
                  sizes="384px"
                  className="object-cover"
                  quality={90}
                  priority
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Text content */}
          <AnimatedSection delay={0.2}>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brown mb-6">
              O meni
            </h2>
            <p className="font-sans text-brown-light leading-relaxed mb-4">
              Zdravo, ja sam Tamara Janković — diplomirani vaspitač, kreator
              sadržaja i velika zaljubljenica u dečiji svet.
            </p>

            <WavyDivider className="text-rose my-6" />

            <p className="font-sans text-brown-light leading-relaxed mb-4">
              Već više od četiri i po godine radim u privatnoj predškolskoj
              ustanovi Naš vrtić, gde svakodnevno otkrivam koliko je svaki
              mališan jedinstven, poseban i neponovljiv. Pored rada u vrtiću,
              bavim se i digitalnim marketingom, uređivanjem fotografija i
              privatnim čuvanjem dece.
            </p>

            <WavyDivider className="text-lavender my-6" />

            <p className="font-sans text-brown-light leading-relaxed">
              Volim da čitam knjige, putujem, istražujem nova mesta i provodim
              vreme sa porodicom i prijateljima. Oduvek sam znala da ću biti
              vaspitač. Deca su me oduvek brzo prihvatala, a ja njih razumela —
              i taj prirodan odnos me vodi i danas, u svakom razgovoru, zagrljaju
              i novoj ideji.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
