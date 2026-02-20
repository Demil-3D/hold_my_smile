import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import SubscriptionCard from "./SubscriptionCard";
import { useCallback, useEffect, useState } from "react";
import type { SubscriptionPlanProperties } from "@/pages/Dashboard/utils/schema/patient/subscription";

export default function PricingListCarousel({
  subscriptionPlans,
}: {
  subscriptionPlans: SubscriptionPlanProperties[];
}) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

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

  return (
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
  );
}
