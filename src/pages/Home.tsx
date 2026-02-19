import ContactForm from "@/components/Contact/ContactForm";
import { AboutSection, AboutForPartnersSection } from "@/components/Home/About";
import { HeroBanner } from "@/components/Home/Banner";
import HowItWorksSection from "@/components/Home/HowItWorks";
import PracticeSupportSection from "@/components/Home/PracticeSupport";

function HomePage() {
  return (
    <>
      <div className="w-full">
        <HeroBanner />
        <AboutSection />

        {/* PARTNERS */}
        <AboutForPartnersSection />
        <HowItWorksSection />
        <PracticeSupportSection />
        <div className="pb-12">
          <ContactForm />
        </div>
      </div>
    </>
  );
}

export default HomePage;
