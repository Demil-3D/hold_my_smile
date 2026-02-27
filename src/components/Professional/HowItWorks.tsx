import {
  CircleQuestionMarkIcon,
  CreditCardIcon,
  PackageCheckIcon,
  ScanEyeIcon,
} from "lucide-react";
import { Item, ItemContent, ItemMedia, ItemTitle } from "../ui/item";

function HowItWorksSection() {
  const SECTION_CLASSES = "w-full mx-auto px-6 md:px-12 lg:px-24 py-24";
  const HOW_IT_WORKS = [
    {
      icon: <ScanEyeIcon />,
      title: "Scan & Upload",
      description:
        "Capture the final scan at the end of treatment and upload it to our secure portal.",
    },
    {
      icon: <CreditCardIcon />,
      title: "Patient Invite",
      description:
        "Invite your patient to the platform during their final debond appointment.",
    },
    {
      icon: <PackageCheckIcon />,
      title: "Fulfillment Managed",
      description:
        "We handle the fulfillment of their annual supply and any mid-year replacements.",
    },
    {
      icon: <CircleQuestionMarkIcon />,
      title: "Shared Success",
      description:
        "Your practice receives a share of the recurring revenue with zero additional labor.",
    },
  ];

  return (
    <div className="pb-12 bg-slate-100" id="about">
      {/* HOW IT WORKS */}
      <section className={`${SECTION_CLASSES} text-center space-y-12`}>
        <legend className="text-2xl md:text-4xl font-bold text-primary max-w-xl mx-auto">
          4 Simple Steps to a Passive{" "}
          <span className="text-accent">Retention</span> Strategy.
        </legend>

        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 place-items-center place-content-center gap-0 text-start">
          {HOW_IT_WORKS.map((explanation, index) => {
            return (
              <Item key={index} className="w-full items-start gap-6">
                <ItemMedia>
                  <span className="text-4xl font-bold text-accent">
                    {(index + 1).toString().padStart(2, "0")}
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

      <section className={`w-full mx-auto px-6 md:px-12 pb-12`}>
        <div className="w-full max-w-5xl mx-auto inset-shadow-sm border p-4 md:p-8 flex max-md:flex-col items-start gap-12">
          <div className="flex-1 flex flex-col gap-4">
            <p
              className="text-xl text-primary italic"
              style={{
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              <sub className="text-4xl">“</sub>{" "}
              {`For over 20 years, we've been dedicated to creating healthy, confident smiles. In a small number of cases, we've had to provide treatment a second time—always due to retainers not being worn consistently or replaced when necessary. Thankfully, we now have a solution that ensures this will no longer happen`}{" "}
              <sub className="text-4xl">”</sub>
            </p>
            <div className="w-full">
              <legend className="text-lg font-semibold text-accent mb-1">
                Lincoln Orthodontics
              </legend>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HowItWorksSection;
