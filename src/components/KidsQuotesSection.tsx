"use client";

import AnimatedSection from "./AnimatedSection";

const quotes = [
  { text: "Vaspitačice, ja sam danas pametna kao sat!", initials: "M", color: "bg-lavender/40" },
  { text: "Kad porastem, biću vaspitačica kao ti!", initials: "A", color: "bg-rose/40" },
  { text: "Ja ne plačem, samo mi oči kiše.", initials: "L", color: "bg-cream" },
  { text: "Tamo, jel može još jedan zagrljaj?", initials: "S", color: "bg-lavender/40" },
  { text: "Moj tata kaže da sam ja najbolji na svetu. I ja mislim da je on.", initials: "N", color: "bg-rose/40" },
  { text: "Mogu ja sam, ali nemoj da ideš daleko.", initials: "D", color: "bg-cream" },
  { text: "Danas sam pojela brokoli jer me je on molio.", initials: "E", color: "bg-lavender/40" },
  { text: "Vaspitačice, ja tebe volim do meseca i nazad!", initials: "M", color: "bg-rose/40" },
];

// Duplicate for seamless loop
const doubledQuotes = [...quotes, ...quotes];

function QuoteCard({ text, initials, color }: { text: string; initials: string; color: string }) {
  return (
    <div className={`${color} rounded-softer p-6 min-w-[280px] max-w-[320px] flex-shrink-0 shadow-soft`}>
      <p className="font-hand text-lg text-brown leading-snug mb-4">
        &ldquo;{text}&rdquo;
      </p>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-lavender-dark/20 flex items-center justify-center">
          <span className="font-sans text-xs font-bold text-brown">
            {initials}
          </span>
        </div>
        <span className="font-sans text-xs text-brown-muted">mali/a mališan/ka</span>
      </div>
    </div>
  );
}

export default function KidsQuotesSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <AnimatedSection className="text-center px-6 mb-12">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brown mb-4">
          Mališani su rekli
        </h2>
        <p className="font-hand text-xl text-lavender-dark">
          Najslađe izjave iz mog rada sa decom
        </p>
      </AnimatedSection>

      {/* Marquee row 1 */}
      <div className="relative mb-6">
        <div className="flex gap-6 animate-marquee">
          {doubledQuotes.map((q, i) => (
            <QuoteCard key={`r1-${i}`} {...q} />
          ))}
        </div>
      </div>

      {/* Marquee row 2 (reverse) */}
      <div className="relative">
        <div className="flex gap-6 animate-marquee-reverse">
          {[...doubledQuotes].reverse().map((q, i) => (
            <QuoteCard key={`r2-${i}`} {...q} />
          ))}
        </div>
      </div>
    </section>
  );
}
