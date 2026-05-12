import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SkipToContent } from "@/components/SkipToContent";
import { ReservationBar } from "@/components/ReservationBar";
import { ExperienceSection } from "@/components/ExperienceSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { HomeMidGrid } from "@/components/HomeMidGrid";
import { EventsSection } from "@/components/EventsSection";
import { ContactSection } from "@/components/ContactSection";
import { BookBand } from "@/components/BookBand";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SkipToContent />
      <Navbar />
      <ReservationBar />
      <main id="main" className="ju-public-main min-h-screen overflow-x-hidden">
        <Hero />
        <ExperienceSection />
        <HowItWorksSection />
        <HomeMidGrid />
        <EventsSection />
        <ContactSection />
        <BookBand />
        <Footer />
      </main>
    </>
  );
}
