import { useCallback, useEffect, useState } from "react";
import type {
  SubscriptionPlanProperties,
  SubscriptionProps,
} from "../utils/schema/patient/subscription";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { http } from "@/utils/http";
import { toast } from "sonner";
import SubscriptionCard from "@/components/Dashboard/SubscriptionComponents/SubscriptionCard";
import SubscriptionSection from "@/components/Dashboard/SubscriptionComponents/SubscriptionSection";

/**
 * Types
 */
type CarouselApi = {
  on: (evt: "select", cb: () => void) => void;
  off: (evt: "select", cb: () => void) => void;
  scrollTo: (index: number, jump?: boolean) => void;
  selectedScrollSnap: () => number;
};

function SubscriptionPage() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [subscriptionPlans, setSubscriptionPlans] = useState<
    SubscriptionPlanProperties[]
  >([]);
  const [subscription, setSubscription] = useState<SubscriptionProps[]>([]);

  const handleSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;

    handleSelect(); // init
    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api, handleSelect]);

  const handleFocusSlide = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  useEffect(() => {
    async function loadSubscription() {
      try {
        const res = await http.get("patient/subscriptions");
        const data = await res.json();
        setSubscription(data.active_subscriptions);
        const filteredProducts = (data.subscriptions as []).filter(
          (p) => p["type"] === "subscription",
        );
        setSubscriptionPlans(filteredProducts);
      } catch (err) {
        toast.error("Network error!\n\nFailed to load subscription data.");
      }
    }

    loadSubscription();
  }, []);

  if (subscription.length !== 0) {
    {
      /* SUBSCRIBES SERVICES */
    }
    return (
      <SubscriptionSection
        subscriptions={subscription}
        subscriptionPlans={subscriptionPlans}
      />
    );
  }

  return (
    <div className="w-full space-y-6 mx-auto">
      <div className="flex w-full justify-between gap-3 max-md:flex-col md:items-center">
        <legend className="text-xl font-semibold text-primary">
          Subscription Plans
        </legend>
      </div>
      {/* min-w-0 is critical when carousel sits in a flex/grid layout */}
      <div className="w-full min-w-0 max-w-full contain-[layout_paint]">
        {/* SUBSCRIPTION PLANS DISPLAY WHEN NOT SUBSCRIBED */}
        <Carousel
          setApi={setApi as any}
          opts={{
            align: "center",
            loop: true,
            breakpoints: {
              "320px": {
                align: "start",
              },
            },
          }}
          className="w-full max-w-full lg:px-6"
        >
          <CarouselContent className="py-6">
            {subscriptionPlans.map((plan, index) => {
              const isActive = current === index;

              return (
                <CarouselItem
                  key={plan.sub_level ?? index}
                  className="carousel-item"
                >
                  <div className="relative">
                    {/* Click-to-focus overlay for inactive slides */}
                    {!isActive && (
                      <button
                        type="button"
                        aria-label={`Focus ${plan.name ?? "plan"} plan`}
                        className="absolute inset-0 z-20 cursor-pointer"
                        onClick={() => handleFocusSlide(index)}
                      />
                    )}

                    <div
                      className={[
                        "w-full text-center transition-all duration-300 ease-out",
                        isActive
                          ? "z-10 scale-105 shadow-xl"
                          : "scale-95 opacity-70",
                      ].join(" ")}
                    >
                      <SubscriptionCard plan={plan} />
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious className="left-0 size-12" />
          <CarouselNext className="right-0 size-12" />
        </Carousel>
      </div>
    </div>
  );
}

export default SubscriptionPage;
