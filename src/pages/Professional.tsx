import ContactForm from "@/components/Contact/ContactForm";
import { AboutForPartnersSection } from "@/components/Home/About";
import { HeroBanner } from "@/components/Home/Banner";
import HowItWorksSection from "@/components/Professional/HowItWorks";
import PracticeSupportSection from "@/components/Professional/PracticeSupport";

function ProfessionalPage() {
  return (
    <>
      <div className="w-full">
        <HeroBanner />

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

export default ProfessionalPage;
