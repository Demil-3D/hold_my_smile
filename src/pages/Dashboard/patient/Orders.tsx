import OrderTableComponent from "@/components/Dashboard/OrderComponents/OrderTableComponent";
import type { Order } from "../utils/schema/patient/orders";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { http } from "@/utils/http";

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
    </>
  );
}

export default OrdersPage;
