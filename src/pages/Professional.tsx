import ContactForm from "@/components/Contact/ContactForm";
import { HeroBanner } from "@/components/Professional/Banner";
import HowItWorksSection from "@/components/Professional/HowItWorks";
import PracticeSupportSection from "@/components/Professional/PracticeSupport";
import Why from "@/components/Professional/Why";

function ProfessionalPage() {
  return (
    <>
      <div className="w-full">
        <HeroBanner />
        <Why />
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
