"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import { PodcastDecorations } from "./SectionDecorations";

export default function PodcastSection() {
  return (
    <section className="relative py-24 md:py-32 px-6 bg-brown text-cream-white overflow-hidden">
      <PodcastDecorations />
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Classroom group photo */}
          <AnimatedSection>
            <div className="relative mx-auto w-full max-w-sm aspect-square rounded-softer overflow-hidden shadow-soft-xl">
              <Image
                src="/images/tamara-classroom.jpg"
                alt="Tamara sa celom grupom dece u vrtiću"
                fill
                sizes="(max-width: 768px) 100vw, 384px"
                className="object-cover"
                quality={90}
              />
              {/* Podcast overlay badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-brown/70 backdrop-blur-sm rounded-soft p-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-cream-white/15 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-cream-white/70"
                  >
                    <rect x="9" y="2" width="6" height="12" rx="3" />
                    <path d="M5 10a7 7 0 0014 0" />
                    <line x1="12" y1="17" x2="12" y2="22" />
                  </svg>
                </div>
                <div>
                  <span className="font-hand text-sm text-cream-white/90 block">Deci na dar</span>
                  <span className="font-sans text-[10px] text-cream-white/50">Podcast</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection delay={0.2}>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-cream-white mb-6">
              YouTube &amp; Podcast
            </h2>

            <p className="font-sans text-cream-white/70 leading-relaxed mb-4">
              Na YouTube-u možete pronaći i moj podcast &bdquo;Mališani su rekli&ldquo;,
              gde deca odgovaraju na pitanja onako kako oni vide svet — svojim
              očima, iskreno i bez zadrške.
            </p>

            <p className="font-sans text-cream-white/70 leading-relaxed mb-4">
              Tu su i priče za laku noć, kao i razne zanimljivosti iz vrtića
              poput dečije predstave. A biće i još lepih noviteta...
            </p>

            <motion.a
              href="https://youtube.com/@deci.na.dar1?si=vx5Ja5IDx-9juOIr"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-cream-white/10 hover:bg-cream-white/20 border border-cream-white/20 text-cream-white font-sans font-semibold px-6 py-3 rounded-full transition-colors duration-300 mt-4"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Pogledajte na YouTube-u
            </motion.a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
