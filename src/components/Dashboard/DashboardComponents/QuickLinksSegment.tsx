import {
  ChevronRightIcon,
  CirclePoundSterlingIcon,
  HandshakeIcon,
  ShieldIcon,
  TruckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export default function QuickLinksSegment() {
  const navigate = useNavigate();
  const LINKS = [
    {
      href: "/terms-of-service",
      label: "Terms and Conditions",
      icon: <HandshakeIcon className="size-4" />,
    },
    {
      href: "/privacy-policy",
      label: "Privacy Policy",
      icon: <ShieldIcon className="size-4" />,
    },
    {
      href: "/refund-policy",
      label: "Refund Policy",
      icon: <CirclePoundSterlingIcon className="size-4" />,
    },
    {
      href: "/shipping-policy",
      label: "Shipping & Delivery Policy",
      icon: <TruckIcon className="size-4" />,
    },
  ];
  return (
    <div className="w-full border inset-shadow-xs min-h-32 space-y-4 p-4">
      <legend className="font-semibold text-primary">Quick Links:</legend>

      {/* SUBSCRIPTION DETAILS */}
      <ul className="w-full p-0 m-0">
        {LINKS.map((_, index) => (
          <li key={index}>
            <div>
              <Button
                variant={"secondary"}
                size={"lg"}
                className="rounded-none w-full bg-transparent text-start text-black/90 py-0 px-2 mt-2"
                onClick={() => navigate(_.href)}
              >
                <div className="w-full flex gap-4 items-center whitespace-pre-wrap">
                  {_.icon}
                  <div className="flex-1">{_.label}</div>
                  <ChevronRightIcon className="size-3 text-accent" />
                </div>
              </Button>
            </div>
            {index < LINKS.length - 1 && (
              <div className="mt-1 px-2">
                <Separator />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
