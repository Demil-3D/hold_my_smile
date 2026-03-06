import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Retention Premium",
    price: "£24.99",
    annualSavings: "£300.00",
    description: "Extra convenience & peace of mind",
    highlight: false,
    features: [
      { label: "Annual Retainer Supply", included: true },
      { label: "Replacement Retainers", included: true },
      { label: "Remote Monitoring", included: false },
      { label: "Clinical Feedback", included: false },
      { label: "Relapse Correction", included: false },
    ],
  },
  {
    name: "Monitoring Premium",
    price: "£49.99",
    annualSavings: "£800.00",
    description: "Full oversight & confidence",
    highlight: true,
    features: [
      { label: "Annual Retainer Supply", included: true },
      { label: "Replacement Retainers", included: true },
      { label: "Remote Monitoring", included: true },
      { label: "Clinical Feedback", included: true },
      { label: "Relapse Correction", included: true },
    ],
  },
  {
    name: "Monitoring Standard",
    price: "£39.99",
    annualSavings: "£420.00",
    description: "Ongoing reassurance & yearly retainers",
    highlight: false,
    features: [
      { label: "Annual Retainer Supply", included: true },
      { label: "Replacement Retainers", included: false },
      { label: "Remote Monitoring", included: true },
      { label: "Clinical Feedback", included: true },
      { label: "Relapse Correction", included: false },
    ],
  },
  {
    name: "Retention Standard",
    price: "£19.99",
    annualSavings: "£60.00",
    description: "Simple, reliable protection",
    highlight: false,
    features: [
      { label: "Annual Retainer Supply", included: true },
      { label: "Replacement Retainers", included: false },
      { label: "Remote Monitoring", included: false },
      { label: "Clinical Feedback", included: false },
      { label: "Relapse Correction", included: false },
    ],
  },
  {
    name: "Monitoring Lite",
    price: "£19.99",
    annualSavings: "£60.00",
    description: "Alerting you to any early movement",
    highlight: false,
    features: [
      { label: "Annual Retainer Supply", included: false },
      { label: "Replacement Retainers", included: false },
      { label: "Remote Monitoring", included: true },
      { label: "Clinical Feedback", included: true },
      { label: "Relapse Correction", included: false },
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="w-full py-24 bg-slate-50 flex justify-center relative">
      <div className="absolute -top-24 -left-24 size-75 md:size-87.5 bg-blue-200/40 blur-3xl rounded-full" />
      <div className="absolute -bottom-24 -right-24 size-75 md:size-87.5 bg-purple-200/40 blur-3xl rounded-full" />

      <div className="max-w-7xl w-full px-6">
        <div className="text-center mb-16 pt-12">
          <h2 className="text-4xl font-semibold text-slate-900">
            Protect Your{" "}
            <span className="relative">
              <span>Smile</span>
              <div className="size-16 rounded-full border-[2.5px] md:border-[5px] border-transparent border-b-accent absolute -bottom-1 md:-bottom-1.75 right-0 left-0 mx-auto"></div>
            </span>{" "}
            Long Term
          </h2>
          <p className="text-slate-600 mt-4">
            Choose the level of protection and monitoring that suits you.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`w-full md:w-[45%] lg:w-[31%] relative border ${
                plan.highlight
                  ? "border-purple-500 shadow-xl md:scale-[1.03]"
                  : "border-slate-200"
              } rounded-none transition-all hover:shadow-xl`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-purple-500 text-white px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-xl font-semibold">
                  {plan.name}
                </CardTitle>
                <p className="text-sm text-slate-500">{plan.description}</p>

                <div className="text-3xl font-bold text-slate-900 mt-4">
                  {plan.price}
                  <span className="text-base font-normal text-slate-500">
                    /month
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="px-1">
                  <Button
                    variant={"default"}
                    size={"lg"}
                    className="w-full rounded-none"
                  >
                    Subscribe
                  </Button>
                </div>

                <ul className="space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li
                      key={feature.label}
                      className="flex items-center justify-between"
                    >
                      <span>{feature.label}</span>
                      {feature.included ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <X className="w-4 h-4 text-slate-400" />
                      )}
                    </li>
                  ))}
                </ul>

                <div className="w-full bg-slate-200/60 py-4 px-6 flex">
                  <div className="flex-1">Annual Savings</div>
                  <div className="flex-1 text-end text-lg font-bold">
                    {plan.annualSavings}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
