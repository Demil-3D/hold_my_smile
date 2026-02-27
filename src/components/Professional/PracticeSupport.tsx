import {
  HandCoinsIcon,
  MonitorCheckIcon,
  ShieldPlusIcon,
  TruckElectricIcon,
} from "lucide-react";
import { Item, ItemContent, ItemMedia, ItemTitle } from "../ui/item";

function PracticeSupportSection() {
  const SECTION_CLASSES = "w-full mx-auto px-6 md:px-12 lg:px-24 py-16";
  const PARTNER_BENEFITS = [
    {
      icon: <HandCoinsIcon className="size-6" />,
      title: "Discover a Steady New Income Stream",
      description:
        "Unlock a predictable, recurring revenue source from your existing patient base with zero additional labor or overhead.",
    },
    {
      icon: <ShieldPlusIcon className="size-6" />,
      title: "Protect Your Results",
      description:
        "Ensure your hard work lasts a lifetime by reducing the risk of orthodontic relapse with automated annual supplies.",
    },
    {
      icon: <MonitorCheckIcon className="size-6" />,
      title: "Clinically Supervised Excellence",
      description:
        "We aren't 'DIY dentistry'; we act as a professional extension of your practice to maintain high clinical standards.",
    },
    {
      icon: <TruckElectricIcon className="size-6" />,
      title: "Rapid 48-Hour Fulfillment",
      description:
        "Patients receive laboratory-grade replacements directly to their door within 48 hours, even when your clinic is closed.",
    },
  ];

  return (
    <>
      <div className="py-12">
        {/* BENEFITS */}
        <section className={`${SECTION_CLASSES} text-center space-y-12`}>
          <legend className="text-2xl md:text-4xl font-bold text-primary max-w-2xl mx-auto">
            A Partnership Built on{" "}
            <span className="text-accent">Clinical Excellence.</span>
          </legend>

          <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 place-items-center place-content-center gap-6 text-start">
            {PARTNER_BENEFITS.map((benefit, index) => {
              return (
                <Item
                  key={index}
                  className="flex-col items-start gap-4 border border-shade-200 rounded-none inset-shadow-xs"
                  data-aos="fade-right"
                  data-aos-delay={250 * index}
                  data-aos-duration={500}
                >
                  <ItemMedia className="text-primary bg-primary/10 size-10">
                    {benefit.icon}
                  </ItemMedia>
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

          <section
            className={`${SECTION_CLASSES} max-w-5xl text-center space-y-6`}
            data-aos="fade-up"
            data-aos-delay={0}
            data-aos-duration={500}
          >
            <p className="text-lg">
              {`Hold My Smile transforms orthodontic retention from a logistical burden into a sustainable practice asset. We manage the entire journey—from secure scan storage to automated annual delivery—freeing your team to focus on clinical excellence rather than administration. By bridging the gap between debonding and lifelong care, we provide your patients with peace of mind and your practice with a reliable, recurring revenue stream.`}
            </p>
          </section>
        </section>
      </div>
    </>
  );
}

export default PracticeSupportSection;
