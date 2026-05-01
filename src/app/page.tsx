export const dynamic = "force-dynamic";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/domain/HeroSection";
import FeaturedDomains from "@/components/domain/FeaturedDomains";
import WhyUsSection from "@/components/domain/WhyUsSection";
import VIPSection from "@/components/domain/VIPSection";
import CTASection from "@/components/domain/CTASection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedDomains />
        <WhyUsSection />
        <VIPSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
