import ContactForm from "@/components/Contact/ContactForm";
import ClinicianFAQs from "@/components/FAQs/ClinicianFAQ";
import { HeroBanner } from "@/components/Professional/Banner";
import HowItWorksSection from "@/components/Professional/HowItWorks";
import PracticeSupportSection from "@/components/Professional/PracticeSupport";
import Why from "@/components/Professional/Why";

function ProfessionalPage() {
  return (
    <>
      <div className="w-full overflow-hidden">
        <HeroBanner />
        <Why />
        <HowItWorksSection />
        <PracticeSupportSection />

        <div className="pb-12 space-y-24">
          <ClinicianFAQs />
          <ContactForm />
        </div>
      </div>
    </>
  );
}

export default ProfessionalPage;
