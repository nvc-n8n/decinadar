"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AnimatedSection from "./AnimatedSection";
import { StarRating } from "./DecorativeSVGs";
import { TestimonialsDecorations } from "./SectionDecorations";

const testimonials = [
  {
    quote:
      "Tamara je promenila način na koji gledam na vaspitanje. Njen pristup bez vikanja i kazni dao je neverovatne rezultate sa mojim detetom. Preporučujem je svim roditeljima!",
    name: "Jelena M.",
    role: "Mama dvoje dece",
  },
  {
    quote:
      "Od kada pratim Tamarine savete, atmosfera u našem domu je potpuno drugačija. Deca su smirenija, a ja sam sigurnija u sebe kao roditelj. Hvala na svemu!",
    name: "Marko P.",
    role: "Tata jednog dečaka",
  },
  {
    quote:
      "Tamara čuva naše dete i ne mogu da zamislim bolju osobu za taj posao. Nežna je, strpljiva i dete je obožava. Pravi dragulj!",
    name: "Ana S.",
    role: "Mama devojčice",
  },
  {
    quote:
      "E-book koji sam preuzela bio je tačno ono što mi je trebalo. Konkretni saveti, lako primenljivi, i zaista funkcionišu. Jedva čekam novi!",
    name: "Milica T.",
    role: "Mama troje dece",
  },
];

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
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

  return (
    <section className="relative py-24 md:py-32 px-6 bg-cream-white overflow-hidden">
      <TestimonialsDecorations />
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brown mb-4">
            Utisci roditelja
          </h2>
          <p className="font-sans text-brown-light">
            Šta kažu roditelji koji su mi ukazali poverenje
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="flex-[0_0_100%] min-w-0 px-4"
                >
                  <div className="bg-cream rounded-softer p-8 md:p-10 shadow-soft text-center max-w-2xl mx-auto">
                    <div className="flex justify-center mb-4">
                      <StarRating />
                    </div>
                    <p className="font-sans text-brown leading-relaxed mb-6 italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div>
                      <p className="font-serif text-lg font-semibold text-brown">
                        {t.name}
                      </p>
                      <p className="font-sans text-sm text-brown-muted">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? "bg-lavender w-6"
                    : "bg-brown-muted/30 hover:bg-brown-muted/50"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
