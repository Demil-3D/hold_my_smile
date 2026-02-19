import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { SubscriptionProps } from "@/pages/Dashboard/utils/schema/patient/subscription";
import SubscriptionPlanCarousel from "../SubscriptionComponents/SubscriptionPlanCarousel";

export default function SubscriptionSegment({
  subscriptions,
}: {
  subscriptions: SubscriptionProps[];
}) {
  const navigate = useNavigate();
  return (
    <div className="w-full border inset-shadow-xs min-h-40 space-y-4 p-4">
      <legend className="font-semibold text-primary">
        Manage Subscription
      </legend>

      {/* SUBSCRIPTION DETAILS */}
      {subscriptions.length === 0 ? (
        <div className="w-full text-center space-y-3 px-2">
          <p className="text-center">Subscribe to a new Service!</p>

          <Button
            variant={"default"}
            size={"default"}
            className="rounded-none"
            onClick={() => navigate("/portal/subscriptions")}
          >
            <div className="w-fit flex gap-2 items-center">
              View Plans
              <MoveRight className="size-3" />
            </div>
          </Button>
        </div>
      ) : (
        <SubscriptionPlanCarousel
          subscriptions={subscriptions}
          isScaleReduced={true}
        />
      )}
    </div>
  );
}
