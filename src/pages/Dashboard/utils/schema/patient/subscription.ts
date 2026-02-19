export type SubscriptionPlanProperties = {
  id: string;
  name: string;
  type: string;
  price: number;
  desc: string;
  sub_level: string;
  annual_savings: number;
};

export type SubscriptionProps = {
  subscription_id: string;
  plan_key: string;
  next_billing_date: string;
  next_retainer_date: string;
};

export type SubscriptionPlanPerkProperties = {
  level_name: string;
  plan_specs: {
    [perk: string]: boolean | string;
  };
};
