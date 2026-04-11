"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import { InstagramIcon } from "./DecorativeSVGs";
import { ContactDecorations } from "./SectionDecorations";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formsubmit.co/ajax/7dc47fa6724a0d5b26fc513edf956349", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="kontakt" className="relative py-24 md:py-32 px-6 overflow-hidden">
      <ContactDecorations />
      <div className="max-w-2xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brown mb-4">
            Kontakt
          </h2>
          <p className="font-sans text-brown-light mb-10">
            Za sva pitanja, saradnju ili čuvanje dece — rado ću vam se javiti
            i pomoći, jer svaka porodica zaslužuje podršku.
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
              href="mailto:tamara.decinadar@gmail.com"
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
              tamara.decinadar@gmail.com
            </a>
          </div>
        </AnimatedSection>

        {/* Tamara with kids image */}
        <AnimatedSection delay={0.15}>
          <div className="relative w-full h-96 md:h-[28rem] rounded-softer overflow-hidden shadow-soft mb-8">
            <Image
              src="/images/tamara-group-selfie.jpg"
              alt="Tamara sa decom"
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover object-center"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cream/30 to-transparent" />
          </div>
        </AnimatedSection>

        {/* Contact form */}
        <AnimatedSection delay={0.2}>
          <form
            onSubmit={handleSubmit}
            className="bg-cream-white rounded-softer p-8 shadow-soft space-y-5 text-left"
          >
            <input type="hidden" name="_subject" value="Nova poruka sa sajta Deci na dar" />
            <input type="hidden" name="_template" value="table" />
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
                name="name"
                required
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
                name="email"
                required
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
                name="message"
                rows={4}
                required
                placeholder="Vaša poruka..."
                className="w-full bg-cream border border-lavender/30 rounded-soft px-5 py-3 font-sans text-sm text-brown placeholder:text-brown-muted focus:outline-none focus:ring-2 focus:ring-lavender/50 transition-shadow resize-none"
              />
            </div>
            <div className="text-center pt-2">
              {status === "sent" ? (
                <p className="font-sans text-sm text-lavender-dark font-medium py-3">
                  Poruka je uspešno poslata! Javiću vam se uskoro.
                </p>
              ) : status === "error" ? (
                <p className="font-sans text-sm text-rose-dark font-medium py-3">
                  Greška pri slanju. Pokušajte ponovo ili pišite na email.
                </p>
              ) : (
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-lavender hover:bg-rose text-brown font-sans font-semibold px-8 py-3 rounded-full shadow-soft transition-colors duration-300 disabled:opacity-60"
                >
                  {status === "sending" ? "Šaljem..." : "Pošaljite"}
                </motion.button>
              )}
            </div>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}
