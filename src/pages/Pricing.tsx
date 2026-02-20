import bannerImage from "@/assets/images/main-banner2.jpg";
import PricingListCarousel from "@/components/Dashboard/SubscriptionComponents/PricingListCarousel";
import type { SubscriptionPlanProperties } from "./Dashboard/utils/schema/patient/subscription";
import { useEffect, useState } from "react";
import { http } from "@/utils/http";
import { toast } from "sonner";

function PricingPage() {
  const [subscriptionPlans, setSubscriptionPlans] = useState<
    SubscriptionPlanProperties[]
  >([]);

  useEffect(() => {
    async function loadSubscription() {
      try {
        const res = await http.get("patient/subscriptions");
        const data = await res.json();
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

  return (
    <div className="w-full relative">
      <div
        className="w-full min-h-[50vh] md:min-h-[40vh] lg:min-h-[50vh]"
        style={{
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundImage: `url(${bannerImage})`,
        }}
      >
        <div className="w-full h-fit min-h-[50vh] md:min-h-[40vh] lg:min-h-[50vh] bg-primary/50 backdrop-blur-md py-24 px-12 grid place-items-center">
          <h1 className="text-center text-white font-bold text-6xl mt-12">
            Pricing
          </h1>
        </div>
      </div>

      <PricingListCarousel subscriptionPlans={subscriptionPlans} />
    </div>
  );
}

export default PricingPage;
