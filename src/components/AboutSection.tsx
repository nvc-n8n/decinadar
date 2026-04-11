"use client";

import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import { WavyDivider } from "./DecorativeSVGs";

export default function AboutSection() {
  return (
    <section id="o-meni" className="relative py-24 md:py-32 px-6">
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
                  src="/images/tamara-portrait.jpg"
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
              Moje ime je Tamara Janković. Ja sam diplomirani vaspitač predškolske
              dece i osnivač brenda &bdquo;Deci na dar&ldquo;. Moja strast i životni poziv je
              rad s decom — ne samo kao posao, već kao način života. Već godinama
              pomažem roditeljima da bolje razumeju svoju decu, i trudim se da
              svakom detetu pružim onoliko pažnje koliko mu zaista treba.
            </p>

            <WavyDivider className="text-rose my-6" />

            <p className="font-sans text-brown-light leading-relaxed mb-4">
              Imam bogato iskustvo u radu sa decom svih uzrasta — od beba do
              predškolaca. Verujem da su ljubav, strpljenje i poverenje temelji
              svakog zdravog odnosa između deteta i vaspitača. Moj pristup je
              zasnovan na razumevanju, nežnosti i stvaranju bezbednog okruženja u
              kojem deca mogu slobodno da istražuju, uče i rastu.
            </p>

            <WavyDivider className="text-lavender my-6" />

            <p className="font-sans text-brown-light leading-relaxed">
              Na ovom sajtu ćete pronaći sve na jednom mestu — od mojih e-knjiga
              i saveta, do informacija o čuvanju dece i načina da me kontaktirate.
              Hvala vam što ste tu. Dobrodošli!
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
