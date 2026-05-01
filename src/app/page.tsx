export const dynamic = "force-dynamic";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/domain/HeroSection";
import FeaturedDomains from "@/components/domain/FeaturedDomains";
import StatsSection from "@/components/domain/StatsSection";
import CategoriesSection from "@/components/domain/CategoriesSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturedDomains />
        <CategoriesSection />
      </main>
      <Footer />
    </>
  );
}
