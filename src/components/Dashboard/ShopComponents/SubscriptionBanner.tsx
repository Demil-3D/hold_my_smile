import GradientBg from "@/components/GradientBg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SubscriptionBanner() {
  const navigate = useNavigate();
  return (
    <section className="w-full py-6 px-2 md:px-12 lg:px-24">
      <GradientBg blobSize={20}>
        <div className="flex max-md:flex-col gap-x-4 gap-y-8 items-start md:items-center md:justify-between">
          <div className="flex-1 space-y-3 max-w-lg">
            <legend className="text-primary font-bold text-[33px]">
              Want automatic{" "}
              <span className="text-accent">yearly retainers</span> instead?
            </legend>
            <p className="text-black/80">
              Join the HoldMySmile Subscription and get a new set delivered
              every year without placing manual orders.
            </p>
          </div>
          <Button
            variant={"secondary"}
            size={"lg"}
            className="rounded-none bg-accent px-6"
            onClick={() => navigate("/portal/subscriptions")}
          >
            View Plans
            <ArrowRight className="size-3" />
          </Button>
        </div>
      </GradientBg>
    </section>
  );
}
