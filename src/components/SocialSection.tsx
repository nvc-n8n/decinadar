"use client";

import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import StaggerChildren, { childVariant } from "./StaggerChildren";
import { InstagramIcon, YouTubeIcon, TikTokIcon } from "./DecorativeSVGs";
import { SocialDecorations } from "./SectionDecorations";

const socials = [
  {
    platform: "Instagram",
    handle: "@deci.na.dar",
    url: "https://www.instagram.com/deci.na.dar/",
    description:
      "Razvojne igre, edukativni materijali, vrtićki trenuci, rubrika Mališani su rekli, predlozi aktivnosti i sve što može da ojača vezu dete-roditelj.",
    icon: InstagramIcon,
    bg: "bg-lavender/30",
    border: "border-lavender/40",
  },
  {
    platform: "YouTube",
    handle: "@decinadar",
    url: "https://youtube.com/@deci.na.dar1?si=vx5Ja5IDx-9juOIr",
    description:
      "Podcast \u201EMališani su rekli\u201C, priče za laku noć, zanimljivosti iz vrtića poput dečije predstave — i još lepih noviteta uskoro.",
    icon: YouTubeIcon,
    bg: "bg-rose/30",
    border: "border-rose/40",
  },
  {
    platform: "TikTok",
    handle: "@deci.na.dar",
    url: "https://www.tiktok.com/@deci.na.dar",
    description:
      "Najspontaniji kutak — mešavina humora, edukacije i trenutaka koje deca svojim reakcijama čine neponovljivim.",
    icon: TikTokIcon,
    bg: "bg-lavender/30",
    border: "border-lavender/40",
  },
];

function SocialCard({
  social,
}: {
  social: (typeof socials)[0];
}) {
  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block rounded-softer p-8 ${social.bg} border ${social.border} hover:shadow-soft-lg transition-all duration-300 group`}
    >
      <div className="flex items-center gap-3 mb-4">
        <social.icon className="text-brown group-hover:text-lavender-dark transition-colors" />
        <div>
          <h3 className="font-serif text-xl font-semibold text-brown">
            {social.platform}
          </h3>
          <p className="font-sans text-sm text-brown-light">{social.handle}</p>
        </div>
      </div>
      <p className="font-sans text-sm text-brown-light leading-relaxed">
        {social.description}
      </p>
    </a>
  );
}

export default function SocialSection() {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    breakpoints: {
      "(min-width: 768px)": { active: false },
    },
  });

  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      <SocialDecorations />
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brown mb-4">
            Gde sve možete da me pratite
          </h2>
          <p className="font-sans text-brown-light">
            Pronađite me na društvenim mrežama
          </p>
        </AnimatedSection>

        {/* Mobile carousel */}
        <div className="md:hidden overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {socials.map((social) => (
              <div
                key={social.platform}
                className="flex-[0_0_85%] min-w-0"
              >
                <SocialCard social={social} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <StaggerChildren className="hidden md:grid md:grid-cols-3 gap-8">
          {socials.map((social) => (
            <motion.div key={social.platform} variants={childVariant}>
              <SocialCard social={social} />
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
