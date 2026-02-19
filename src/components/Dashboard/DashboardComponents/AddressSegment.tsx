import { PencilLineIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function AddressSegment() {
  const navigate = useNavigate();
  return (
    <div className="w-full border inset-shadow-xs min-h-20 space-y-4 p-4">
      <legend className="font-semibold text-primary flex justify-between items-center">
        Delivery Address:
        <Badge variant={"default"} className="rounded-none">
          default
        </Badge>
      </legend>

      {/* SUBSCRIPTION DETAILS */}
      <Button
        variant={"secondary"}
        size={"lg"}
        className="rounded-none w-full py-6 bg-transparent text-start px-0 mt-2"
        onClick={() => navigate("/portal/addresses")}
      >
        <div className="w-full flex gap-2 items-center whitespace-pre-wrap">
          <div className="flex-1">
            47 Hawthorne Crescent, Bristol, BS8 2LT, United Kingdom.
          </div>
          <PencilLineIcon className="size-3" />
        </div>
      </Button>
    </div>
  );
}
