import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerOverlay } from "@/components/ui/drawer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { PatientProps } from "@/pages/Dashboard/utils/schema/clinician/patients";
import type { Order } from "@/pages/Dashboard/utils/schema/patient/orders";
import { http } from "@/utils/http";
import { HardDriveUploadIcon, LinkIcon, PackageIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import OrderTableComponent from "../OrderComponents/OrderTableComponent";

function PatientListTableComponent({ patients }: { patients: PatientProps[] }) {
  const navigate = useNavigate();
  const [_, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [showOrdersDrawer, setShowOrdersDrawer] = useState(false);

  const showOrders = async (patientId: string) => {
    // TODO: Add fetch orders logic here.
    try {
      const res = await http.get(`clinician/patients/${patientId}/orders`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        console.error(res.status);
        toast.error(res.statusText);
      }
    } catch {
      toast.error("Failed to load patient orders");
      setOrders([]);
    }

    setShowOrdersDrawer(true);
  };

  return (
    <>
      <ScrollArea className="w-full max-w-full h-fit">
        <table className="w-full border-separate border-spacing-0 text-nowrap">
          <thead>
            <tr className="text-left text-xs text-muted-foreground">
              <th className="px-2 py-3 font-medium border-y text-center">#</th>
              <th className="px-4 py-3 font-medium border-y">Name</th>
              <th className="px-4 py-3 font-medium border-y">Email</th>
              <th className="px-4 py-3 font-medium border-y">Phone</th>
              <th className="px-4 py-3 font-medium border-y">Date of Birth</th>
              <th className="px-4 py-3 font-medium border-y">Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p, idx) => (
              <tr key={idx}>
                <td
                  className={cn(
                    "align-middle",
                    "px-2 py-3 text-sm text-muted-foreground text-center",
                    idx !== 0 && "border-t",
                  )}
                >
                  {idx + 1}
                </td>
                <td
                  className={cn(
                    "align-middle",
                    "px-4 py-3 pr-8",
                    idx !== 0 && "border-t",
                  )}
                >
                  <div className="flex items-center gap-2">
                    {p.first_name} {p.last_name}
                  </div>
                </td>
                <td
                  className={cn(
                    "align-middle",
                    "px-6 md:px-4 py-3",
                    idx !== 0 && "border-t",
                  )}
                >
                  <Link
                    to={"mailto:" + p.email_address}
                    className="flex gap-1 items-center"
                  >
                    <p className="max-w-xl text-sm">{p.email_address}</p>
                    <LinkIcon className="size-3 text-orange-600" />
                  </Link>
                </td>
                <td
                  className={cn(
                    "align-middle",
                    "px-6 md:px-4 py-3",
                    idx !== 0 && "border-t",
                  )}
                >
                  <Link
                    to={"tel:" + p.phone_number}
                    className="flex gap-1 items-center font-normal"
                  >
                    <p className="text-sm">{p.phone_number}</p>
                  </Link>
                </td>
                <td
                  className={cn(
                    "align-middle",
                    "px-6 md:px-4 py-3",
                    idx !== 0 && "border-t",
                  )}
                >
                  {p.date_of_birth}
                </td>
                <td
                  className={cn(
                    "align-middle flex gap-2",
                    "px-6 md:px-4 py-3",
                    idx !== 0 && "border-t",
                  )}
                >
                  <Button
                    onClick={() => showOrders(p.user_id)}
                    className="rounded-none"
                    variant={"default"}
                    size="sm"
                  >
                    <PackageIcon className="mr-1 h-4 w-4" />
                    View Orders
                  </Button>
                  {import.meta.env.VITE_STL_UPLOAD_ENABLED === "true" && (
                    <Button
                      onClick={() => navigate("/portal/upload-stl")}
                      className="rounded-none"
                      variant={"link"}
                      size="sm"
                    >
                      <HardDriveUploadIcon className="mr-1 h-4 w-4" />
                      Upload STL
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <Drawer
        open={showOrdersDrawer}
        onOpenChange={(isOpen) => setShowOrdersDrawer(isOpen)}
        onClose={() => {
          setSearchParams({});
        }}
      >
        <DrawerOverlay className="z-99999999" />
        <DrawerContent className="z-99999999">
          <div className="p-4 md:p-6 h-[70vh] overflow-y-auto">
            <OrderTableComponent orders={orders} />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default PatientListTableComponent;
