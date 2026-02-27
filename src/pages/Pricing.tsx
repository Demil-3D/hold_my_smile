import type { SubscriptionPlanProperties } from "./Dashboard/utils/schema/patient/subscription";
import { useEffect, useState } from "react";
import { http } from "@/utils/http";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import biologyNotFailure from "@/assets/images/biology-not-failure.png";
import monitoring from "@/assets/images/monitoring.png";
import longTermSmileProtection from "@/assets/images/long-term-smile-protection.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SubscriptionCard from "@/components/Dashboard/SubscriptionComponents/SubscriptionCard";

function PricingPage() {
  const [subscriptionPlans, setSubscriptionPlans] = useState<
    SubscriptionPlanProperties[]
  >([]);

  useEffect(() => {
    async function loadSubscription() {
      try {
        const res = await http.get("plans");
        const data = await res.json();
        const filteredProducts = (data as []).filter(
          (p) => p["type"] === "subscription",
        );
        setSubscriptionPlans(filteredProducts.reverse());
      } catch (err) {
        console.log(err);
        toast.error("Network error!\n\nFailed to load subscription data.");
      }
    }

    loadSubscription();
  }, []);

  const PARAGRAPHS = [
    {
      text: `Hold My Smile is designed to make long-term retention simple and predictable.\n\nEvery subscription is built around stability and convenience. Depending on your plan, you receive fresh retainers each year, protection against lost or damaged retainers, remote smile monitoring, professional clinical feedback, and support to correct minor relapse before it becomes major.`,
      image: biologyNotFailure,
    },
    {
      text: `Some patients only need reliable annual retainer supply and replacement protection. Others prefer ongoing clinical oversight and reassurance that their smile is being reviewed regularly. Our monitoring plans provide remote tracking and early detection of unwanted movement, reducing the need for unnecessary in-clinic appointments while keeping you informed.\n\nThe financial difference between prevention and correction can be significant. Private retainer replacement, multiple dental reviews, and relapse correction treatment often cost far more than structured monthly protection. A subscription spreads that cost while keeping your results secure.\n\nAll retainers are custom-made medical devices manufactured by a DAMAS-certified dental laboratory and supplied under UK Medical Device Regulations. Each appliance is produced following prescription from a registered dental professional. This is regulated, compliant care designed for long-term stability.`,
      image: monitoring,
    },
    {
      text: `If you have finished orthodontic treatment, are managing a teenager's retention, or have ever replaced a lost retainer at short notice, you already understand the importance of staying consistent.\n\nYour orthodontic treatment was an investment. Retention protects it.\n\nChoose the level of support that matches how closely you want your smile supervised, and let the system handle the rest.`,
      image: longTermSmileProtection,
    },
  ];

  const PLAN_TYPES = [
    {
      group: "Retention",
      levels: ["RETENTION_STANDARD", "RETENTION_PREMIUM"],
    },
    {
      group: "Monitoring",
      levels: ["MONITORING_LITE"],
    },
    {
      group: "Mixed",
      levels: ["MONITORING_STANDARD", "MONITORING_PREMIUM"],
    },
  ];

  return (
    <div className="w-full relative">
      <div className="w-full pb-0 pt-44 text-center bg-slate-100">
        <legend className="text-4xl font-semibold text-primary">
          Protect Your{" "}
          <span className="relative">
            <span>Smile</span>
            <div className="size-16 rounded-full border-[2.5px] md:border-[5px] border-transparent border-b-accent absolute -bottom-1 md:-bottom-1.75 right-0 left-0 mx-auto"></div>
          </span>{" "}
          Long Term
        </legend>
        <p className="text-primary/60 mt-4">
          Choose the level of protection and monitoring that suits you.
        </p>
      </div>
      <div className="w-full text-center py-24 bg-slate-100">
        <div className="max-w-6xl mx-auto">
          <Accordion
            type="single"
            className="w-full space-y-4 border border-slate-200"
            defaultValue={"0"}
          >
            {PLAN_TYPES.map((plan_type, index) => {
              const plans = subscriptionPlans.filter((p) =>
                plan_type.levels.includes(p.sub_level),
              );
              if (plans.length === 0) return null;
              return (
                <AccordionItem
                  key={index}
                  value={`${index}`}
                  className="rounded-none"
                >
                  <AccordionTrigger className="text-xl font-semibold cursor-pointer border-b-2 p-4 rounded-none">
                    {plan_type.group}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                      {plans.map((plan) => (
                        <SubscriptionCard key={plan.id} plan={plan} />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>

      {/* OTHER TEXT */}
      <div className="w-full py-20 px-6 space-y-32" id="plans">
        <section className="w-full max-w-300 text-center space-y-10 mx-auto">
          <legend className="text-2xl md:text-4xl font-bold text-primary max-w-2xl mx-auto">
            Clinical Standards You Can{" "}
            <span className="text-accent">Trust</span>
          </legend>
          <div className="text-center whitespace-pre-wrap max-w-4xl mx-auto text-lg">
            {`Orthodontic treatment straightens your teeth. Retention keeps them that way.\nTeeth move throughout life. After braces or aligners, they naturally shift back toward their original position. That isn’t failure. It’s biology. Without consistent retainers and periodic oversight, small changes can become costly corrections.`}
          </div>

          <div className="w-full space-y-24 mt-14">
            {PARAGRAPHS.map((paragraph, index) => {
              return (
                <div
                  key={index}
                  className={cn(
                    "flex max-md:flex-col gap-24 items-center",
                    (index + 1) % 2 === 0 ? "md:flex-row-reverse" : null,
                  )}
                >
                  <div className="w-full md:flex-1 text-lg text-center md:text-start whitespace-pre-wrap">
                    <p>{paragraph.text}</p>
                  </div>
                  <div className="w-full md:flex-1">
                    <img
                      src={paragraph.image}
                      alt={`Image 0${index + 1}`}
                      className="w-full object-cover bg-slate-100"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default PricingPage;
