import {
  CircleQuestionMarkIcon,
  CreditCardIcon,
  GlobeIcon,
  PackageCheckIcon,
  ScanEyeIcon,
} from "lucide-react";
import { Item, ItemContent, ItemMedia, ItemTitle } from "../ui/item";

function HowItWorksSection() {
  const SECTION_CLASSES = "w-full mx-auto px-6 md:px-12 lg:px-24 py-24";
  const HOW_IT_WORKS = [
    {
      icon: <GlobeIcon />,
      title: "Sign Up Online",
      description:
        "Create your free account on our platform in minutes. It's simple, secure, and the first step to streamlined retention.",
    },
    {
      icon: <ScanEyeIcon />,
      title: "Upload Patient Scans",
      description:
        "We securely store final orthodontic scans at no cost, ready for future use. No appointments required unless your teeth have shifted or you've had dental work.",
    },
    {
      icon: <CreditCardIcon />,
      title: "Patient Sign-Up",
      description:
        "Before leaving, patients quickly enter their own details into Hold My Smile, ensuring they're set up for ongoing retention support.",
    },
    {
      icon: <PackageCheckIcon />,
      title: "We'll Handle the Rest",
      description:
        "Out team will follow up directly with the patient to explain retention options, answer questions, and provide support, reducing your admin workload while keeping you informed.",
    },
    {
      icon: <CircleQuestionMarkIcon />,
      title: "Enjoy Profit Share",
      description:
        "You start receiving your share of the revenue, without the extra workload.",
    },
  ];

  return (
    <div className="pb-12 bg-slate-100 -mb-12" id="about">
      {/* HOW IT WORKS */}
      <section className={`${SECTION_CLASSES} text-center space-y-12`}>
        <legend className="text-2xl md:text-4xl font-bold text-primary max-w-xl mx-auto">
          It All Comes Down to These 5{" "}
          <span className="text-accent">Simple</span> Steps
        </legend>

        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 place-items-center place-content-center gap-0 text-start">
          {HOW_IT_WORKS.map((explanation, index) => {
            return (
              <Item key={index} className="w-full items-start gap-6">
                <ItemMedia>
                  <span className="text-4xl font-bold text-accent">
                    {index + 1}
                  </span>
                </ItemMedia>
                <div className="flex-1">
                  <ItemTitle className="text-lg">{explanation.title}</ItemTitle>
                  <ItemContent className="text-base">
                    {explanation.description}
                  </ItemContent>
                </div>
              </Item>
            );
          })}
        </div>
      </section>

      <section
        className={`w-full mx-auto px-6 md:px-12 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-6`}
      >
        <div className="w-full inset-shadow-sm border p-4 md:p-8 flex max-md:flex-col items-start gap-12">
          <div className="flex-1 flex flex-col gap-4">
            <p
              className="text-xl text-primary italic"
              style={{
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              <span className="text-4xl">“</span>
              {`For over 20 years, we've been dedicated to creating healthy, confident smiles. In a small number of cases, we've had to provide treatment a second time—always due to retainers not being worn consistently or replaced when necessary. Thankfully, we now have a solution that ensures this will no longer happen`}
              <span className="text-4xl">”</span>
            </p>
            <div className="w-full">
              <legend className="text-lg font-semibold text-accent mb-1">
                Lincoln Orthodontics
              </legend>
            </div>
          </div>
        </div>
        <div className="w-full inset-shadow-sm border p-4 md:p-8 flex max-md:flex-col items-start gap-12">
          <div className="flex-1 flex flex-col gap-4">
            <p
              className="text-xl text-primary italic"
              style={{
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              <span className="text-4xl">“</span>
              {`Finally, a retention system that benefits patients and the practice. Plus it provides a steady revenue without the admin burden.`}
              <span className="text-4xl">”</span>
            </p>
            <div className="w-full">
              <legend className="text-lg font-semibold text-accent mb-1">
                St James Dental Practice
              </legend>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HowItWorksSection;
