import {
  BoxIcon,
  ComputerIcon,
  MapPinHouseIcon,
  ScanLineIcon,
} from "lucide-react";
import doctorImage from "@/assets/images/doctor_bg.jpg";
import { Item, ItemContent, ItemMedia, ItemTitle } from "../ui/item";

function HowItWorksSection() {
  const SECTION_CLASSES = "w-full mx-auto px-6 md:px-12 lg:px-24 py-18";
  const HOW_IT_WORKS_STEPS = [
    {
      label: "Your Scan",
      icon: <ScanLineIcon className="size-6" />,
      text: "Your orthodontist or dental practice provides an approved digital scan after treatment.",
    },

    {
      label: "We Manufacture",
      icon: <BoxIcon className="size-6" />,
      text: "Using that scan, we produce precision retainers designed for long-term wear.",
    },

    {
      label: "Delivered to You",
      icon: <MapPinHouseIcon className="size-6" />,
      text: "Your retainers are delivered directly to your door as part of your subscription.",
    },

    {
      label: "Need a Replacement?",
      icon: <ComputerIcon className="size-6" />,
      text: "If your retainer is lost or damaged, request a replacement quickly and easily through your dashboard.",
    },
  ];

  return (
    <div
      className="py-12  bg-linear-to-b from-slate-100 to-slate-200 from-70% bg-fixed"
      id="about"
    >
      <section className={`${SECTION_CLASSES} text-start space-y-14`}>
        {/* HOW IT WORKS */}
        <div className="space-y-12 w-full max-w-6xl mx-auto p-6">
          <legend className="text-4xl font-bold text-primary max-w-2xl mx-auto text-center">
            Simple. <span className="text-accent font-bold">Secure.</span>{" "}
            Streamlined.
          </legend>

          <div className="w-full grid md:grid-cols-2 place-items-center place-content-center gap-6 text-start">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              return (
                <Item
                  key={index}
                  className="items-start gap-6"
                  data-aos="fade-right"
                  data-aos-delay={150 * index}
                  data-aos-duration={500}
                >
                  <ItemMedia>
                    <div className="size-10 bg-primary/10 text-primary grid place-items-center">
                      {step.icon}
                    </div>
                  </ItemMedia>
                  <div className="flex-1">
                    <ItemTitle className="text-lg">{step.label}</ItemTitle>
                    <ItemContent className="text-base">{step.text}</ItemContent>
                  </div>
                </Item>
              );
            })}
          </div>
        </div>

        {/* BENEFITS */}
        <div
          className="space-y-12 w-full max-w-4xl mx-auto bg-white/10 py-4"
          data-aos="fade-up"
          data-aos-delay={0}
          data-aos-duration={500}
        >
          <div className="w-full space-y-6 px-6 text-center">
            {/* <legend className="text-4xl font-bold text-primary max-w-2xl mx-auto text-center">
              Because <span className="text-accent">Retention</span> Is
              Lifelong.
            </legend> */}
            <p className="text-lg">
              {`Teeth don't “lock in place” permanently. They respond to pressure, age, and natural changes over time.`}
            </p>
            <p className="text-lg">
              A subscription ensures You always have a backup, You replace worn
              retainers before they lose effectiveness, and You never delay
              replacement when it matters most.
            </p>

            <p className="text-lg">
              Your smile is an investment. Subscriptions protect investments.
            </p>
          </div>
        </div>
      </section>

      {/* DOCTOR RECOMMENDATION */}
      <section
        className={`w-full mx-auto px-6 md:px-12 pt-6 pb-18`}
        data-aos="flip-down"
        data-aos-delay={0}
        data-aos-duration={500}
      >
        <div className="w-full max-w-4xl mx-auto inset-shadow-sm border p-6 md:p-10 flex max-md:flex-col items-start gap-12">
          <div className="w-24 aspect-square rounded-full bg-secondary overflow-hidden">
            <img
              src={doctorImage}
              alt={"Dr Mathew Clare"}
              className="w-48 aspect-square object-cover object-bottom-left"
            />
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <p
              className="text-xl text-primary italic"
              style={{
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              <span className="text-4xl">“</span>
              {`Hold My Smile gives our patients the tools and support to stay in
              control - effortlessly. It's orthodontic retention, reimagined.`}
              <span className="text-4xl">”</span>
            </p>
            <div className="w-full space-y-1">
              <legend className="text-base font-semibold text-accent">
                Dr Matthew Clare
              </legend>
              <span className="text-black/70 line-clamp-1">
                Specialist Orthodontist, DDS, MOrth (RCS Edin), MFDS RCS (Eng),
                BDS (Lond).
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HowItWorksSection;
