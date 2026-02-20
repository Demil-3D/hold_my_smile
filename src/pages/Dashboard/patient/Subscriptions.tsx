import { useEffect, useState } from "react";
import type {
  SubscriptionPlanProperties,
  SubscriptionProps,
} from "../utils/schema/patient/subscription";
import { http } from "@/utils/http";
import { toast } from "sonner";
import SubscriptionSection from "@/components/Dashboard/SubscriptionComponents/SubscriptionSection";
import PricingListCarousel from "@/components/Dashboard/SubscriptionComponents/PricingListCarousel";

function SubscriptionPage() {
  const [subscriptionPlans, setSubscriptionPlans] = useState<
    SubscriptionPlanProperties[]
  >([]);
  const [subscription, setSubscription] = useState<SubscriptionProps[]>([]);

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
      <PricingListCarousel subscriptionPlans={subscriptionPlans} />
    </div>
  );
}

export default SubscriptionPage;
