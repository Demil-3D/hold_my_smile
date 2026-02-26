import {
  ArrowUpDownIcon,
  FileSlidersIcon,
  HandCoinsIcon,
  MonitorCogIcon,
  ServerIcon,
  TruckIcon,
  UserRoundPlusIcon,
} from "lucide-react";
import { Item, ItemContent, ItemMedia, ItemTitle } from "../ui/item";

function PracticeSupportSection() {
  const SECTION_CLASSES = "w-full mx-auto px-6 md:px-12 lg:px-24 py-24";
  const PARTNER_BENEFITS = [
    {
      icon: <HandCoinsIcon />,
      title: "Up to 50% Profit Share for Practices",
      description:
        "Turn subscriptions into predictable monthly income with profit sharing of up to half the net revenue.",
    },
    {
      icon: <UserRoundPlusIcon />,
      title: "Seamless Patient Onboarding",
      description:
        "Scans uploaded at treatment end are securely stored from day one, with no admin and no delays.",
    },
    {
      icon: <TruckIcon />,
      title: "Annual Retainer Supply",
      description:
        "Patients receive a new, custom-fit retainer every 12 months to protect results and reduce relapse.",
    },
    {
      icon: <ArrowUpDownIcon />,
      title: "Fast, Hassle-Free Replacements",
      description:
        "Lost or broken retainer? Patients order direct and receive a replacement within 48 hours, even when your practice is closed.",
    },
    {
      icon: <MonitorCogIcon />,
      title: "Zero Admin for Your Team",
      description:
        "We handle ordering, storage, and replacements so your team stays focused on patient care.",
    },
    {
      icon: <ServerIcon />,
      title: "Secure Data Storage",
      description:
        "Scans are stored safely free of charge, fully compliant, and instantly accessible.",
    },
    {
      icon: <FileSlidersIcon />,
      title: "Reliable, Streamlined Process",
      description:
        "Working directly with the lab reduces errors and keeps everything consistent.",
    },
  ];

  return (
    <>
      <div className="py-12">
        <section
          className={`${SECTION_CLASSES} max-w-5xl text-center space-y-6`}
        >
          <legend className="text-2xl md:text-4xl font-bold text-primary max-w-2xl mx-auto">
            Your Practice. <span className="text-accent">Supported.</span>
          </legend>
          <p className="text-lg">
            {`Hold My Smile makes orthodontic retention simple for patients and sustainable for practices. From day one, we manage the entire retention journey; handling ordering, secure storage, and fast replacements; so your team can stay focused on dentistry, not administration. Patients enjoy long-term stability and peace of mind, while your practice benefits from reduced workload and dependable recurring income. With Hold My Smile, retention becomes effortless, reliable, and rewarding.`}
          </p>
        </section>

        {/* BENEFITS */}
        <section className={`${SECTION_CLASSES} text-center space-y-12`}>
          <legend className="text-2xl md:text-4xl font-bold text-primary max-w-2xl mx-auto">
            Partner <span className="text-accent">Benefits.</span>
          </legend>

          <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 place-items-center place-content-center gap-6 text-start">
            {PARTNER_BENEFITS.map((benefit, index) => {
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
      </div>
    </>
  );
}

export default PracticeSupportSection;
