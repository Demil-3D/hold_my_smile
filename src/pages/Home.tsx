import ContactForm from "@/components/Contact/ContactForm";
import { AboutSection } from "@/components/Home/About";
import { HeroBanner } from "@/components/Home/Banner";
import HowItWorksSection from "@/components/Home/HowItWorks";
import TrustAndQualitySection from "@/components/Home/TrustAndQuality";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full">
        <HeroBanner />
        <AboutSection />
        <HowItWorksSection />
        <TrustAndQualitySection />

        <div className="py-12 px-3">
          <section className="w-full mx-auto px-6 md:px-12 lg:px-24 py-18">
            <div className="w-full border border-slate-200 inset-shadow-xs flex max-md:flex-col p-6 gap-6 items-center max-w-3xl mx-auto">
              <div className="md:flex-1 space-y-2">
                <legend className="text-2xl font-bold max-w-2xl">
                  Your Smile Is an Investment.{" "}
                  <span className="text-accent">Protect It.</span>
                </legend>
                <p className="whitespace-pre-wrap">
                  {`Teeth naturally shift over time.\nA structured retention plan keeps your results secure, without the last-minute stress.`}
                </p>
              </div>
              <Button
                variant={"secondary"}
                size={"default"}
                className="rounded-none text-lg mt-4 py-6 bg-accent"
                onClick={() => navigate("/register")}
              >
                Protect Your Smile
              </Button>
            </div>
          </section>

          <ContactForm />
        </div>
      </div>
    </>
  );
}

export default HomePage;
