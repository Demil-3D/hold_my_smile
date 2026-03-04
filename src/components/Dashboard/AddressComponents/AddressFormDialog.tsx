import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { http } from "@/utils/http";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import type { AddressProps } from "@/pages/Dashboard/utils/schema/patient/adddress";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
  address?: AddressProps;
};

export function AddressFormDialog({ children, address }: Props) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (!formData.get("country")) {
      formData.append("country", "United Kingdom");
    }
    const postCode = formData.get("postal_code");
    formData.set(
      "postal_code",
      (postCode ?? "").toString().toLocaleUpperCase(),
    );
    const data = Object.fromEntries(formData);
    try {
      let res;
      if (address) {
        res = await http.put("patient/address", data);
      } else {
        res = await http.post("patient/address", data);
      }
      if (res.ok) {
        toast.success("Address has been saved!");
        setIsOpen(false);
        navigate(0);
      } else {
        toast.error("Address could not be saved.");
        console.error(res);
      }
    } catch {
      toast.error("Connection Error: Address could not be saved!");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay className="z-99999999" />
      <DialogContent
        className="sm:max-w-115 p-0 overflow-hidden rounded-none z-99999999"
        showCloseButton={false}
      >
        {/* Top gradient header */}
        <DialogHeader className="relative p-4">
          <DialogTitle className="text-lg w-full">
            {address === undefined ? "Create Address" : "Change Address"}
          </DialogTitle>
          <DialogDescription className="w-full">
            Please fill all fields below
          </DialogDescription>
        </DialogHeader>

        <form method="post" onSubmit={handleSubmit}>
          <div className="px-6 pb-6 grid grid-cols-2 gap-x-2 gap-y-4">
            <Field className="col-span-2">
              <FieldLabel htmlFor="street_address">Street Address</FieldLabel>
              <Input
                type="text"
                name="street_address"
                id="street_address"
                placeholder=""
                defaultValue={address?.street_address ?? ""}
                required
                className="w-full py-6 px-6 rounded-none border border-slate-200 bg-slate-100 inset-shadow-xs"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="city">Town/City</FieldLabel>
              <Input
                type="text"
                name="city"
                id="city"
                placeholder=""
                defaultValue={address?.city ?? ""}
                required
                className="w-full py-6 px-6 rounded-none border border-slate-200 bg-slate-100 inset-shadow-xs"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="postal_code">Postal Code</FieldLabel>
              <Input
                type="text"
                name="postal_code"
                id="postal_code"
                placeholder=""
                defaultValue={address?.postal_code ?? ""}
                required
                className="w-full py-6 px-6 rounded-none border border-slate-200 bg-slate-100 inset-shadow-xs uppercase"
              />
            </Field>
            <Field className="col-span-2">
              <FieldLabel htmlFor="country">Country</FieldLabel>
              <Input
                type="text"
                name="country"
                id="country"
                placeholder=""
                disabled
                required
                defaultValue={address?.country ?? "United Kingdom"}
                className="w-full py-6 px-6 rounded-none border border-slate-200 bg-slate-100 inset-shadow-xs"
              />
            </Field>
          </div>

          {/* Actions */}
          <DialogFooter className="p-4 text-center">
            <Button
              variant={"secondary"}
              size={"lg"}
              className="w-full px-12 py-6 bg-accent flex items-center justify-center rounded-none text-primary"
            >
              Submit
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
