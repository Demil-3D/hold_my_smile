import ContactForm from "@/components/Contact/ContactForm";
import FAQComponent from "@/components/FAQs/FAQComponent";
import { AboutSection } from "@/components/Home/About";
import { HeroBanner } from "@/components/Home/Banner";
import CTASection from "@/components/Home/CTA";
import HowItWorksSection from "@/components/Home/HowItWorks";
import TrustAndQualitySection from "@/components/Home/TrustAndQuality";

function HomePage() {
  return (
    <>
      <div className="w-full overflow-hidden">
        <HeroBanner />
        <AboutSection />
        <HowItWorksSection />
        <TrustAndQualitySection />

        <div className="py-12 px-3" data-aos="fade-up" data-aos-delay={0}>
          <FAQComponent />
          <CTASection />
          <ContactForm />
        </div>
      </div>
    </>
  );
}

export default HomePage;
