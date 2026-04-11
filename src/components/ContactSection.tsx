"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { InstagramIcon } from "./DecorativeSVGs";
import { ContactDecorations } from "./SectionDecorations";

export default function ContactSection() {
  return (
    <section id="kontakt" className="relative py-24 md:py-32 px-6 overflow-hidden">
      <ContactDecorations />
      <div className="max-w-2xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brown mb-4">
            Kontakt
          </h2>
          <p className="font-sans text-brown-light mb-10">
            Imate pitanje, želite saradnju ili vas zanima čuvanje dece? Javite mi se!
          </p>

          {/* Quick links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="https://www.instagram.com/deci.na.dar/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-lavender/20 hover:bg-lavender/30 text-brown font-sans text-sm font-medium px-6 py-3 rounded-full transition-colors"
            >
              <InstagramIcon className="w-5 h-5" />
              Instagram DM
            </a>
            <a
              href="mailto:decinadar@gmail.com"
              className="flex items-center gap-2 bg-rose/20 hover:bg-rose/30 text-brown font-sans text-sm font-medium px-6 py-3 rounded-full transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              decinadar@gmail.com
            </a>
          </div>
        </AnimatedSection>

        {/* Contact form */}
        <AnimatedSection delay={0.2}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-cream-white rounded-softer p-8 shadow-soft space-y-5 text-left"
          >
            <div>
              <label
                htmlFor="name"
                className="block font-sans text-sm font-medium text-brown mb-1.5"
              >
                Ime
              </label>
              <input
                type="text"
                id="name"
                placeholder="Vaše ime"
                className="w-full bg-cream border border-lavender/30 rounded-soft px-5 py-3 font-sans text-sm text-brown placeholder:text-brown-muted focus:outline-none focus:ring-2 focus:ring-lavender/50 transition-shadow"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-sans text-sm font-medium text-brown mb-1.5"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="vaš@email.com"
                className="w-full bg-cream border border-lavender/30 rounded-soft px-5 py-3 font-sans text-sm text-brown placeholder:text-brown-muted focus:outline-none focus:ring-2 focus:ring-lavender/50 transition-shadow"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block font-sans text-sm font-medium text-brown mb-1.5"
              >
                Poruka
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Vaša poruka..."
                className="w-full bg-cream border border-lavender/30 rounded-soft px-5 py-3 font-sans text-sm text-brown placeholder:text-brown-muted focus:outline-none focus:ring-2 focus:ring-lavender/50 transition-shadow resize-none"
              />
            </div>
            <div className="text-center pt-2">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-lavender hover:bg-rose text-brown font-sans font-semibold px-8 py-3 rounded-full shadow-soft transition-colors duration-300"
              >
                Pošaljite
              </motion.button>
            </div>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}
