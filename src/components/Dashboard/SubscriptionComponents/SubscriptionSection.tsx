import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type {
  SubscriptionPlanProperties,
  SubscriptionProps,
} from "@/pages/Dashboard/utils/schema/patient/subscription";
import { useState, type JSX } from "react";
import { SubscriptionPerks } from "./SubscriptionCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CrownIcon, SlidersHorizontalIcon, XIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { http } from "@/utils/http";
import { toast } from "sonner";
import SubscriptionPlanCarousel from "./SubscriptionPlanCarousel";
import { GBP } from "@/utils/config";

/* 
This file contains the section for displaying the patient's subscribed plan and the add-ons
*/
function SubscriptionSection({
  subscriptions,
  subscriptionPlans,
}: {
  subscriptions: SubscriptionProps[];
  subscriptionPlans: SubscriptionPlanProperties[];
}) {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full lg:px-6 space-y-8">
        {/* USER SUBSCRIPTION PLAN DISPLAY */}
        <div className="w-full bg-slate-100 border border-slate-200 inset-shadow-sm p-4 md:p-6 text-primary space-y-4">
          <div className="flex justify-between">
            <legend className="font-bold">Your Plan</legend>

            <ManagePlansDialog
              plans={subscriptions}
              trigger={
                <Button variant={"default"} className="rounded-none">
                  <SlidersHorizontalIcon />
                  <span>Manage</span>
                </Button>
              }
            />
          </div>

          <SubscriptionPlanCarousel subscriptions={subscriptions} />
        </div>

        {/* OTHER PLANS */}
        <div className="w-full max-w-3xl mx-auto space-y-6">
          <legend className="text-2xl font-bold text-primary">
            Other <span className="text-accent">Services</span>
          </legend>
          <Accordion
            type="single"
            collapsible
            defaultValue=""
            className="px-2 space-y-4"
          >
            {subscriptionPlans.map((plan) => (
              <AccordionItem key={plan.id} value={plan.sub_level}>
                <AccordionTrigger className="border-2 border-primary rounded-none px-4 py-3 items-center">
                  <div className="flex-1 w-full space-y-1">
                    <legend className="text-xl">{plan.name}</legend>
                    <p className="text-sm text-muted-foreground font-normal">
                      {plan.desc}
                    </p>
                  </div>
                  <span className="text-lg font-bold text-end">
                    {GBP.format(plan.price)} <sup>/ Month</sup>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-lg whitespace-pre-wrap">
                  <SubscriptionPerks plan={plan} />
                  <div className="w-full px-4 py-2">
                    <Button
                      variant={"default"}
                      size={"lg"}
                      onClick={() => {
                        navigate("/portal/shop/checkout", {
                          state: {
                            product: {
                              ...plan,
                              subscriptionScope: plan.sub_level,
                            },
                          },
                        });
                      }}
                      className="rounded-none w-fit px-12"
                    >
                      Subscribe
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
}

// PLAN LIST DIALOG
function ManagePlansDialog({
  plans,
  trigger,
}: {
  plans: SubscriptionProps[];
  trigger: JSX.Element;
}) {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionProps | null>(
    null,
  );

  async function onConfirm() {
    if (!selectedPlan) return;
    try {
      await http.post(`patients/cancel-subscription`, {
        subscription_id: selectedPlan.subscription_id,
      });
      window.location.reload();
      //   navigate(0);
    } catch (err) {
      toast.error("Connection Error: Failed to cancel subscription!");
    }
  }

  return (
    <Dialog onOpenChange={() => setSelectedPlan(null)}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogOverlay className="z-99999999" />
      <DialogContent
        className="sm:max-w-115 p-0 overflow-hidden rounded-none z-99999999"
        showCloseButton={false}
      >
        {/* Top gradient header */}
        <div className="relative px-6 pt-6 pb-5 bg-linear-to-b from-slate-50 to-white inset-shadow-sm border border-slate-200">
          <DialogHeader className="relative">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 place-items-center bg-white/70 border border-slate-200 inset-shadow-xs">
                  <CrownIcon className="h-5 w-5 text-primary" />
                </div>

                <div className="text-start">
                  <DialogTitle className="text-lg">
                    Manage Your Subscriptions
                  </DialogTitle>
                  <DialogDescription className="mt-1">---</DialogDescription>
                </div>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="px-6 pb-6 space-y-6">
          {/* Order summary / confirmation text */}
          {selectedPlan === null ? (
            <ul className=" px-2">
              {plans.map((plan) => (
                <li
                  key={plan.subscription_id}
                  className="w-full flex items-center gap-2 py-4 px-2 border-b"
                >
                  <legend className="flex-1 w-full font-semibold capitalize">
                    {plan.plan_key.split("_").join(" ").toLowerCase()}
                  </legend>
                  <Button
                    variant={"secondary"}
                    onClick={() => setSelectedPlan(plan)}
                    className="rounded-none bg-red-100 text-red-600"
                  >
                    Cancel <XIcon />
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="w-full p-4 border border-slate-200 inset-shadow-xs space-y-2">
              <legend className="text-lg font-semibold">
                Are you sure you want to cancel{" "}
                <span className="capitalize">
                  "{selectedPlan.plan_key.split("_").join(" ").toLowerCase()}"
                </span>
                ?
              </legend>
              <p className="text-muted-foreground text-sm">
                <span className="font-medium">Please note:</span> You will
                continue to be billed until the end of the first year from your
                original subscription date.
              </p>

              <div className="w-full text-center mt-8">
                <Button
                  variant={"secondary"}
                  onClick={() => onConfirm()}
                  className="rounded-none bg-red-100 text-red-600"
                >
                  Yes <XIcon />
                </Button>
              </div>
            </div>
          )}

          {/* Actions */}
          {/* <DialogFooter className="flex-col sm:flex-col gap-2 sm:gap-2">
            <Button
              variant={"secondary"}
              size={"lg"}
              className="w-full p-6 bg-accent flex items-center justify-center rounded-none text-primary"
              type="submit"
            >
              Confirm purchase
            </Button>

            <DialogClose asChild>
              <Button
                variant={"secondary"}
                size={"lg"}
                type="button"
                className="w-full p-6 rounded-none"
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SubscriptionSection;
