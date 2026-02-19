import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { SubscriptionPlanProperties } from "@/pages/Dashboard/utils/schema/patient/subscription";
import { SUBSCRIPTION_PLAN_PERKS } from "@/pages/Dashboard/utils/subscription-plans";
import { GBP } from "@/utils/config";
import { CheckCircle2Icon, XCircleIcon } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

function PlanSpecRow({
  label,
  value,
}: {
  label: string;
  value: boolean | string | number;
}) {
  // Boolean spec: check/x icon
  if (isBoolean(value)) {
    return (
      <li className="flex w-full items-center gap-4">
        <div className="w-fit">
          {value ? (
            <CheckCircle2Icon className="size-4 text-primary" />
          ) : (
            <XCircleIcon className="size-4 text-red-700" />
          )}
        </div>
        <div className="w-fit">{label}</div>
      </li>
    );
  }

  // Text/number spec: badge
  return (
    <li className="flex w-full py-2">
      <Badge
        variant="secondary"
        className="rounded-none whitespace-pre-wrap text-start"
      >
        <span className="mr-2">{label}</span>
        <span className="text-accent">{value}</span>
      </Badge>
    </li>
  );
}

export function SubscriptionPerks({
  plan,
}: {
  plan: SubscriptionPlanProperties;
}) {
  const perks = SUBSCRIPTION_PLAN_PERKS.filter(
    (planPerk) => planPerk.level_name === plan.sub_level,
  );

  if (perks.length === 0) return null;

  const specs = useMemo(
    () => Object.entries(perks[0].plan_specs),
    [perks[0].plan_specs],
  );

  return (
    <ul className="space-y-1 px-6 py-4">
      {specs.map(([label, value]) => (
        <PlanSpecRow
          key={label}
          label={label}
          value={value as boolean | string | number}
        />
      ))}
    </ul>
  );
}

/**
 * Components
 */
function SubscriptionCard({ plan }: { plan: SubscriptionPlanProperties }) {
  const navigate = useNavigate();

  const perks = SUBSCRIPTION_PLAN_PERKS.filter(
    (planPerk) => planPerk.level_name === plan.sub_level,
  );

  if (perks.length === 0) return null;

  const handleSubscribe = (product: SubscriptionPlanProperties) => {
    navigate("/portal/shop/checkout", {
      state: { product: { ...product, subscriptionScope: product.sub_level } },
    });
  };

  return (
    <div className="w-full select-none border border-slate-200 bg-slate-50 inset-shadow-xs">
      {/* PLAN HEADER */}
      <div className="space-y-1 px-4 py-4 text-start">
        <legend className="text-accent font-medium">{plan.name}</legend>
        <p className="px-1 text-black/60 text-sm">{plan.desc}</p>

        <h3 className="my-2 text-3xl font-bold text-primary">
          {GBP.format(plan.price)} <sup className="font-semibold">/ Month</sup>
        </h3>

        <Button
          variant="default"
          size="lg"
          className="mt-2 w-full cursor-pointer rounded-none bg-primary"
          onClick={() => handleSubscribe(plan)}
        >
          Subscribe
        </Button>
      </div>

      <Separator />

      {/* PLAN SPECIFICATIONS */}
      <SubscriptionPerks plan={plan} />
    </div>
  );
}

export default SubscriptionCard;
