import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CinematicHero } from "@/components/sections/CinematicHero";
import { ConsultationForm } from "@/components/sections/ConsultationForm";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FeaturedWedding } from "@/components/sections/FeaturedWedding";
import { WhyMakna } from "@/components/sections/WhyMakna";
import { PackageStrip } from "@/components/sections/PackageStrip";
import { JournalStrip } from "@/components/sections/JournalStrip";
import { ConsultationBanner } from "@/components/sections/ConsultationBanner";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="konten" tabIndex={-1}>
        <CinematicHero />
        <ExperienceSection />
        <ServicesGrid />
        <FeaturedWedding />
        <WhyMakna />
        <PortfolioGrid />
        <PackageStrip />
        <JournalStrip />
        <ConsultationBanner />
        <ConsultationForm />
      </main>
      <SiteFooter />
    </>
  );
}
