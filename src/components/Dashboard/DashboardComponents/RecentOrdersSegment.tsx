import EmptyContainer from "../EmptyContainer";
import { MoveRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { Order } from "@/pages/Dashboard/utils/schema/patient/orders";
import OrderTableComponent from "../OrderComponents/OrderTableComponent";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function RecentOrdersSegment({ orders }: { orders: Order[] }) {
  const navigate = useNavigate();

  return (
    <div className="w-full md:col-span-2 md:row-span-2 min-h-48 space-y-4">
      <legend className="font-semibold text-primary flex justify-between items-center">
        <span>Recent Orders</span>
        <Button
          variant={"link"}
          size={"sm"}
          onClick={() => navigate("/portal/orders")}
          className="px-1 text-accent"
        >
          <div className="w-fit flex gap-2 items-center text-xs">
            See All
            <MoveRightIcon className="size-3" />
          </div>
        </Button>
      </legend>

      <div className="">
        {orders.length === 0 ? (
          <EmptyContainer />
        ) : (
          <ScrollArea>
            <ScrollBar orientation="horizontal" />
            <OrderTableComponent
              orders={orders.slice(0, 3)}
              isHeadingHidden={true}
            />
          </ScrollArea>
        )}
      </div>
    </div>
  );
}

export default RecentOrdersSegment;
