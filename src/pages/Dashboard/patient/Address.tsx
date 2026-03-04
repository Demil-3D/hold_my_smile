import { AddressFormDialog } from "@/components/Dashboard/AddressComponents/AddressFormDialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit3, MapPinOffIcon } from "lucide-react";
import type { AddressProps } from "../utils/schema/patient/adddress";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { http } from "@/utils/http";

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
    <div className="w-full space-y-10">
      <legend className="text-xl font-semibold text-primary">Address</legend>

      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground text-xs">
                Street
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                City
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                Postal Code
              </TableHead>
              <TableHead className="text-muted-foreground text-xs">
                Country
              </TableHead>
              <TableHead className="text-muted-foreground text-xs text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!address && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="border-2 border-dashed border-slate-200"
                >
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
                </TableCell>
              </TableRow>
            )}

            {address && (
              <TableRow>
                <TableCell className="text-foreground text-sm px-4">
                  {address.street_address}
                </TableCell>
                <TableCell className="text-foreground text-sm px-4">
                  {address.city}
                </TableCell>
                <TableCell className="text-foreground text-sm px-4">
                  {address.postal_code}
                </TableCell>
                <TableCell className="text-foreground text-sm px-4">
                  {address.country}
                </TableCell>
                <TableCell className="text-foreground text-sm text-center max-w-17.5">
                  <AddressFormDialog address={address}>
                    <Button
                      variant={"link"}
                      size={"default"}
                      className="rounded-none"
                    >
                      <Edit3 className="size-4" />
                      Edit
                    </Button>
                  </AddressFormDialog>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AddressPage;
