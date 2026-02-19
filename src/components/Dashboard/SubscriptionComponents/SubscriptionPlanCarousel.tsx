import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { SubscriptionProps } from "@/pages/Dashboard/utils/schema/patient/subscription";
import { useCallback, useEffect, useState } from "react";

function SubscriptionPlanCarousel({
  subscriptions,
  isScaleReduced,
}: {
  subscriptions: SubscriptionProps[];
  isScaleReduced?: boolean;
}) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const reducedScale: boolean = isScaleReduced ?? false;

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

  return (
    <>
      <Carousel
        setApi={setApi as any}
        opts={{
          align: "start",
          loop: false,
          watchDrag: false,
        }}
        className={`w-full max-w-full ${reducedScale ? "lg:px-3" : "lg:px-6"}`}
      >
        <CarouselContent className={`${reducedScale ? "py-3" : "py-6"}`}>
          {subscriptions.map((subscription) => {
            return (
              <CarouselItem
                key={subscription.subscription_id}
                className="basis-full whitespace-pre-wrap w-full"
              >
                <div className="w-full flex gap-4 items-center">
                  <div className="flex-1 w-full space-y-1">
                    <legend
                      className={`font-semibold ${reducedScale ? "text-lg" : "text-xl"} capitalize`}
                    >
                      {subscription.plan_key.split("_").join(" ").toLowerCase()}
                    </legend>
                    <div className="w-full flex text-sm text-muted-foreground">
                      Next Retainer: {subscription.next_retainer_date}
                    </div>
                  </div>
                  <Badge
                    variant={"default"}
                    className="bg-accent text-primary rounded-none"
                  >
                    Valid: {subscription.next_billing_date}
                  </Badge>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* CAROUSEL CTRLS */}
        {subscriptions.length > 1 && (
          <div className="w-full flex mt-4 gap-2">
            <CarouselPrevious className="static size-8 bg-primary/20 text-primary/90" />
            <CarouselNext className="static size-8 bg-primary/20 text-primary/90" />
            <div className="px-2 flex gap-1">
              {Array.from({ length: subscriptions.length }, (_, i) => i).map(
                (idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "transition-all duration-300",
                      current === idx
                        ? "bg-primary w-6 h-1"
                        : "bg-primary/50 size-1",
                    )}
                  ></div>
                ),
              )}
            </div>
          </div>
        )}
      </Carousel>
    </>
  );
}

export default SubscriptionPlanCarousel;
