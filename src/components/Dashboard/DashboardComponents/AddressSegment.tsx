import { MapPinOffIcon, PencilLineIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import type { AddressProps } from "@/pages/Dashboard/utils/schema/patient/adddress";
import { http } from "@/utils/http";
import { toast } from "sonner";
import { AddressFormDialog } from "../AddressComponents/AddressFormDialog";

export default function AddressSegment() {
  const [address, setAddress] = useState<AddressProps | undefined>(undefined);

  useEffect(() => {
    async function loadAddresses() {
      try {
        const res = await http.get("patient/address");
        const data = await res.json();
        if (res.ok) {
          setAddress(data);
        } else {
          toast.error("Failed to fetch address");
        }
      } catch {
        toast.error("Connection Error!");
      }
    }

    // CALL
    loadAddresses();
  }, []);

  return (
    <div className="w-full border inset-shadow-xs min-h-20 space-y-2 p-4">
      <legend className="font-semibold text-primary flex justify-between items-center">
        Delivery Address:
        <Badge variant={"default"} className="rounded-none">
          default
        </Badge>
      </legend>

      {/* SUBSCRIPTION DETAILS */}
      {address && (
        <AddressFormDialog address={address}>
          <Button
            variant={"secondary"}
            size={"lg"}
            className="rounded-none w-full py-6 bg-transparent text-start px-0 mt-2"
          >
            <div className="w-full flex gap-2 items-center whitespace-pre-wrap">
              <div className="flex-1">
                {address.street_address}, {address.city}, {address.postal_code},{" "}
                {address.country}.
              </div>
              <PencilLineIcon className="size-3" />
            </div>
          </Button>
        </AddressFormDialog>
      )}

      {!address && (
        <div className="border-2 border-dashed border-slate-200">
          <div className="w-full flex flex-col gap-4 text-center items-center p-6">
            <MapPinOffIcon className="size-8 text-muted-foreground" />
            <legend className="font-medium text-primary/80">
              Add A Delivery Address
            </legend>
            <AddressFormDialog>
              <Button
                variant={"default"}
                size={"lg"}
                className="rounded-none px-6"
              >
                Create Address
              </Button>
            </AddressFormDialog>
          </div>
        </div>
      )}
    </div>
  );
}
