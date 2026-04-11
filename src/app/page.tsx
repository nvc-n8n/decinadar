"use client";

import IntroScreen from "@/components/IntroScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ApproachSection from "@/components/ApproachSection";
import SocialSection from "@/components/SocialSection";
import EbookSection from "@/components/EbookSection";
import ComingSoonSection from "@/components/ComingSoonSection";
import KidsQuotesSection from "@/components/KidsQuotesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BabysittingSection from "@/components/BabysittingSection";
import PodcastSection from "@/components/PodcastSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <IntroScreen />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ApproachSection />
        <SocialSection />
        <EbookSection />
        <ComingSoonSection />
        <KidsQuotesSection />
        <TestimonialsSection />
        <BabysittingSection />
        <PodcastSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
