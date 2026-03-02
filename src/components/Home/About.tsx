import {
  BadgeCheckIcon,
  CalendarCheck,
  CalendarDaysIcon,
  HeartHandshake,
  MapPinHouseIcon,
  ShieldCheck,
  ShieldPlusIcon,
  Truck,
} from "lucide-react";

export function AboutSection() {
  const SECTION_CLASSES = "w-full mx-auto px-6 md:px-12 lg:px-24 py-18";
  const KEY_BENEFITS = [
    {
      icon: <CalendarDaysIcon className="size-14 text-primary" />,
      title: "Annual Retainer Supply",
      subtitle: "Fresh retainers delivered on schedule.",
    },

    {
      icon: <ShieldPlusIcon className="size-14 text-primary" />,
      title: "Fast Replacement Service",
      subtitle:
        "Lost or cracked your retainer? We prioritize quick turnaround.",
    },

    {
      icon: <BadgeCheckIcon className="size-14 text-primary" />,
      title: "Professional Quality",
      subtitle: "Produced from clinically approved digital scans.",
    },

    {
      icon: <MapPinHouseIcon className="size-14 text-primary" />,
      title: "Doorstep Delivery",
      subtitle: "No unnecessary appointments.",
    },
  ];

  return (
    <div className="py-12" id="about">
      <section className={`${SECTION_CLASSES} max-w-370 space-y-6 max-md:px-3`}>
        <div className="w-full max-w-3xl mx-auto text-center space-y-6 px-6">
          <legend className="text-4xl font-bold text-primary max-w-2xl mx-auto">
            Retention made <span className="text-accent">Effortless.</span>
          </legend>
          <p className="text-lg">
            {`Hold My Smile delivers professionally made retainers to your door, with fast replacements when you need them most.`}
          </p>
        </div>

        {/* PROBLEM AND SOLUTION */}
        <div className="pt-10 grid gap-8 lg:grid-cols-2">
          {/* Card: Problem */}
          <div
            className="group relative p-7"
            data-aos="fade-up"
            data-aos-delay={0}
            data-aos-duration={500}
          >
            <div className="flex items-start gap-4">
              <div className="flex size-10 items-center justify-center bg-[#0f172b10] text-[#0f172b] shadow-sm">
                <ShieldCheck className="size-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                  Braces are done. Retention is not.
                </h3>
                <p className="mt-2 text-slate-600">
                  You invested time, money, and discipline into your smile, but
                  teeth naturally shift over time.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-slate-700">
              <p>
                Losing or damaging a retainer can undo months of progress and
                replacing one through traditional routes can mean delays,
                appointments, and unexpected costs.
              </p>
              <p className="font-medium text-slate-900">
                Retention shouldn't feel stressful.
              </p>
              <p className="text-slate-600">It should feel secure.</p>
            </div>
          </div>

          {/* Card: Solution */}
          <div
            className="group relative p-7"
            data-aos="fade-up"
            data-aos-delay={150}
            data-aos-duration={500}
          >
            <div className="flex items-start gap-4">
              <div className="flex size-10 items-center justify-center bg-[#d77bc520] text-[#d77bc5] shadow-sm">
                <HeartHandshake className="size-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                  Your smile, protected all year round.
                </h3>
                <p className="mt-2 text-slate-600">
                  Hold My Smile is a subscription-based retainer service
                  designed to keep your smile stable and protected long-term.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-slate-700">
              <p>
                We manufacture high-quality retainers from your approved dental
                scan and deliver them directly to your home, with rapid
                replacement support if something goes wrong.
              </p>

              <ul className="mt-4 space-y-3">
                <Bullet icon={ShieldCheck}>No last-minute panic.</Bullet>
                <Bullet icon={CalendarCheck}>No complicated booking.</Bullet>
                <Bullet icon={Truck}>No long lab queues.</Bullet>
              </ul>

              <p className="text-sm font-medium text-[#0f172b]">
                Just reliable retention.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`${SECTION_CLASSES} max-w-360 text-center space-y-12`}
      >
        <legend className="text-4xl font-bold text-primary max-w-2xl mx-auto">
          Key <span className="text-accent">Benefits.</span>
        </legend>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 pt-10">
          {KEY_BENEFITS.map((benefit, index) => {
            return (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={150 * index}
                data-aos-duration={500}
                className="w-full flex flex-col gap-4 px-4 py-6 items-center max-md:border max-md:border-slate-200 md:border-x md:border-x-slate-200"
              >
                {benefit.icon}
                <div className="text-center w-fit">
                  <legend className="text-lg font-semibold">
                    {benefit.title}
                  </legend>
                  <p className="text-muted-foreground">{benefit.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Bullet({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-slate-700">{children}</span>
    </li>
  );
}
