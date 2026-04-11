"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import { TestimonialsDecorations } from "./SectionDecorations";

const testimonialImages = [
  { src: "/images/utisak-7.jpg", alt: "Utisak roditelja — Vladimir S.", name: "Vladimir S." },
  { src: "/images/utisak-1.jpg", alt: "Utisak roditelja — Vladimir S.", name: "Vladimir S." },
  { src: "/images/utisak-3.jpg", alt: "Utisak roditelja — Nevena B.", name: "Nevena B." },
  { src: "/images/utisak-4.jpg", alt: "Utisak roditelja — Dragana A.", name: "Dragana A." },
  { src: "/images/utisak-5.jpg", alt: "Utisak roditelja — Jelena M.", name: "Jelena M." },
  { src: "/images/utisak-6.jpg", alt: "Utisak roditelja — Jovana B.", name: "Jovana B." },
  { src: "/images/utisak-2.jpg", alt: "Utisak roditelja — Tamara \u0160.", name: "Tamara \u0160." },
  { src: "/images/utisak-8.jpg", alt: "Utisak roditelja — Marija", name: "Marija" },
];

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="relative py-24 md:py-32 px-6 bg-cream-white overflow-hidden">
      <TestimonialsDecorations />
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brown mb-4">
            Utisci roditelja
          </h2>
          <p className="font-sans text-brown-light max-w-2xl mx-auto">
            Kroz svoj rad, upoznala sam veliki broj porodica — kako u vrtiću,
            tako i privatno. Roditelji najbolje znaju da prepoznaju kada je neko
            srcem uz njihovo dete.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4">
                {testimonialImages.map((img, i) => (
                  <div
                    key={i}
                    className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0"
                  >
                    <div className="rounded-softer overflow-hidden shadow-soft bg-cream-white border border-lavender/20">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={400}
                        height={600}
                        className="w-full h-auto object-contain"
                        quality={90}
                      />
                      <div className="px-4 py-3 text-center border-t border-lavender/10">
                        <p className="font-serif text-sm font-semibold text-brown">{img.name}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nav arrows */}
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 bg-cream-white/90 backdrop-blur-sm rounded-full shadow-soft flex items-center justify-center hover:bg-lavender/30 transition-colors z-10"
              aria-label="Prethodni"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 bg-cream-white/90 backdrop-blur-sm rounded-full shadow-soft flex items-center justify-center hover:bg-lavender/30 transition-colors z-10"
              aria-label="Sledeći"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonialImages.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? "bg-lavender w-6"
                    : "bg-brown-muted/30 hover:bg-brown-muted/50"
                }`}
                aria-label={`Utisak ${i + 1}`}
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
