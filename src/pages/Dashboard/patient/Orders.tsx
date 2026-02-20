import OrderTableComponent from "@/components/Dashboard/OrderComponents/OrderTableComponent";
import type { Order } from "../utils/schema/patient/orders";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { http } from "@/utils/http";
import { useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await http.get("patient/orders");
        if (!res.ok) throw new Error("Failed to load orders!");
        const data: Order[] = await res.json();
        setOrders(data);
      } catch (err) {
        toast.error((err as Error).message);
      }
    }
    fetchOrders();
  }, []);

  return (
    <>
      <OrderTableComponent orders={orders} />
      <OrderConfirmationDialog />
    </>
  );
}

function OrderConfirmationDialog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const ref = searchParams.get("ref")?.trim() || "";

  const [open, setOpen] = useState(false);

  // Open dialog when ?ref= exists
  useEffect(() => {
    if (ref) setOpen(true);
  }, [ref]);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    // When closing, optionally remove ?ref= from the URL
    if (!nextOpen && ref) {
      setSearchParams({}, { replace: true });
    }
  };

  const copyTracking = async () => {
    try {
      await navigator.clipboard.writeText(ref);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Cannot copy to clipboard!");
    }
  };

  // If there is no ref at all, don't render the dialog.
  if (!ref) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            Order created ✅
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Your order has been created successfully. Use the tracking number
            below to follow your delivery.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 border border-slate-200 bg-slate-100 p-4 select-all space-y-1">
          <p className="text-xs font-medium text-slate-600 select-none">
            Tracking number
          </p>
          <p className="mt-1 break-all font-mono text-lg">{ref}</p>
        </div>

        <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            onClick={copyTracking}
            className="rounded-none"
          >
            Copy tracking number
          </Button>
          {/* <Button onClick={() => handleOpenChange(false)}>Done</Button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default OrdersPage;
