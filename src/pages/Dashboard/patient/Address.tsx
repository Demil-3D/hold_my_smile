import { AddressFormDialog } from "@/components/Dashboard/AddressComponents/AddressFormDialog";
import { Button } from "@/components/ui/button";
import { Edit3, MapPinOffIcon } from "lucide-react";
import type { AddressProps } from "../utils/schema/patient/address";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { http } from "@/utils/http";
import GradientBg from "@/components/GradientBg";

function AddressPage() {
  const [address, setAddress] = useState<AddressProps | undefined>(undefined);

  useEffect(() => {
    async function loadAddresses() {
      try {
        const res = await http.get("patient/address");
        const data = await res.json();
        if (res.ok) {
          setAddress(data);
        } else {
          if (!data) {
            toast.error("Failed to fetch address");
          }
        }
      } catch {
        toast.error("Connection Error!");
      }
    }

    // CALL
    loadAddresses();
  }, []);

  return (
    <div className="w-full space-y-10">
      <legend className="text-xl font-semibold text-primary">Address</legend>

      {address && (
        <div className="w-full max-w-2xl p-4 inset-shadow-xs">
          <GradientBg paddingSm={4} paddingMd={6}>
            <div className="w-full grid grid-cols-1 gap-2">
              <legend className="font-semibold text-primary text-lg">
                {address.street_address},
              </legend>
              <p className="text-black/80">
                {address.city}, {address.postal_code}, {address.country}.
              </p>

              <AddressFormDialog address={address}>
                <Button
                  variant={"default"}
                  size={"lg"}
                  className="rounded-none mt-2 w-fit px-8 shadow-lg"
                >
                  <Edit3 className="size-4" />
                  Edit
                </Button>
              </AddressFormDialog>
            </div>
          </GradientBg>
        </div>
      )}

      {!address && (
        <div className="w-full flex flex-col gap-4 text-center items-center px-6 py-12">
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
      )}
    </div>
  );
}

export default AddressPage;
