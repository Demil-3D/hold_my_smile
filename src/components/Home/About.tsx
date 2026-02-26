import {
  CircleQuestionMarkIcon,
  CreditCardIcon,
  GlobeIcon,
  PackageCheckIcon,
  ScanEyeIcon,
} from "lucide-react";
import doctorImage from "@/assets/images/doctor_bg.jpg";
import { Item, ItemContent, ItemMedia, ItemTitle } from "../ui/item";

export function AboutSection() {
  const SECTION_CLASSES = "w-full mx-auto px-6 md:px-12 lg:px-24 py-24";
  const BENEFITS = [
    {
      icon: <GlobeIcon />,
      title: "Sign Up Online",
      description:
        "Create your free account on our platform in minutes. It's simple, secure, and the first step toward lifelong smile protection.",
    },
    {
      icon: <ScanEyeIcon />,
      title: "We Access Your Digital Scans",
      description:
        "We securely retrieve your final orthodontic scan data, no appointments needed unless your teeth have shifted or you've had dental work.",
    },
    {
      icon: <CreditCardIcon />,
      title: "Your Subscription",
      description:
        "Choose from multiple plans starting at £19.99 per month, with discounted replacement retainers when you need them.",
    },
    {
      icon: <PackageCheckIcon />,
      title: "Enjoy Seamless Retainer Delivery",
      description:
        "Your first retainer is sent straight to your door. Need a replacement? Just log in and reorder, no hassle, no clinic visits.",
    },
    {
      icon: <CircleQuestionMarkIcon />,
      title: "No Subscription? No Problem!",
      description:
        "Even if you don't subscribe, you can still order retainers as needed as long as you've signed up and we have your scan on file.",
    },
  ];

  return (
    <div className="py-12" id="about">
      <section className={`${SECTION_CLASSES} max-w-5xl text-center space-y-6`}>
        <legend className="text-2xl md:text-4xl font-bold text-primary max-w-2xl mx-auto">
          Retention made <span className="text-accent">Effortless.</span>
        </legend>
        <p className="text-lg">
          {`Hold My Smile is a subscription service that delivers a brand-new retainer to your door every year, plus fast replacements on demand within 48 hours if it's lost, broken, or worn.
            We securely store your original digital scan from your orthodontist (if on file), so getting a replacement is easy and fast - there's no appointments or travel required.
            With simple, consistent retention from home, you'll avoid relapse, reduce the risk of retreatment, and stay confident knowing your smile is right where it should be.`}
        </p>
      </section>

      {/* BENEFITS */}
      <section className={`${SECTION_CLASSES} text-center space-y-12`}>
        <legend className="text-2xl md:text-4xl font-bold text-primary max-w-2xl mx-auto">
          What are the benefits of a{" "}
          <span>
            hold<span className="text-accent font-bold">my</span>
            <span className="relative">
              <span>smile</span>
              <div className="size-10 md:size-16 rounded-full border-[2.5px] md:border-[5px] border-transparent border-b-accent absolute -bottom-1 md:-bottom-1.75 right-0 left-0 mx-auto"></div>
            </span>
          </span>{" "}
          Subscription?
        </legend>

        <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 place-items-center place-content-center gap-6 text-start">
          {BENEFITS.map((benefit, index) => {
            return (
              <Item key={index} className="items-start gap-4">
                <ItemMedia>{benefit.icon}</ItemMedia>
                <div className="flex-1">
                  <ItemTitle className="text-lg">{benefit.title}</ItemTitle>
                  <ItemContent className="text-base">
                    {benefit.description}
                  </ItemContent>
                </div>
              </Item>
            );
          })}
        </div>
      </section>

      {/* DOCTOR RECOMMENDATION */}
      <section className={`w-full mx-auto px-6 md:px-12 pt-12 pb-24`}>
        <div className="w-full max-w-4xl mx-auto inset-shadow-sm border p-6 md:p-10 flex max-md:flex-col items-start gap-12">
          <div className="w-24 aspect-square rounded-full bg-secondary overflow-hidden">
            <img
              src={doctorImage}
              alt={"Dr Mathew Clare"}
              className="w-48 aspect-square object-cover object-bottom-left"
            />
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="w-full">
              <legend className="text-base font-semibold text-accent mb-1">
                Dr Matthew Clare
              </legend>
              <span className="text-black/70 line-clamp-1">
                Specialist Orthodontist, DDS, MOrth (RCS Edin), MFDS RCS (Eng),
                BDS (Lond) GDC Reg. No. 72274
              </span>
            </div>
            <p
              className="text-2xl text-primary italic"
              style={{
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              <span className="text-4xl">“</span>
              {`Hold My Smile gives our patients the tools and support to stay in
              control - effortlessly. It's orthodontic retention, reimagined.`}
              {/* <br /> */}
              <span className="text-4xl">”</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export function AboutForPartnersSection() {
  return (
    <div className="py-16 bg-primary">
      <section
        className={`w-full mx-auto px-6 md:px-12 lg:px-24 max-w-7xl text-center lg:text-start space-y-12 lg:flex lg:items-center`}
      >
        <legend className="text-4xl md:text-6xl font-bold text-white max-w-2xl mx-auto lg:flex-1">
          <span className="text-accent">Partner</span> with Us.
        </legend>
        <div className="w-full lg:flex-1">
          <p className="text-lg text-white whitespace-pre-wrap">
            {`Retention shouldn't be the hardest part of orthodontic care.\nHold My Smile makes long-term retention simple for patients and effortless for practices. We handle secure scan storage, annual retainers, and fast replacements - reducing admin, preventing emergencies, and creating reliable recurring revenue. Every smile stays protected, long after treatment ends.`}
          </p>
        </div>
      </section>
    </div>
  );
}
