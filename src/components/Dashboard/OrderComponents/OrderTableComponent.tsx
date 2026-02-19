import EmptyContainer from "@/components/Dashboard/EmptyContainer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type {
  Order,
  VALID_ORDER_STATUS,
} from "@/pages/Dashboard/utils/schema/patient/orders";
import { MapPinnedIcon, SearchIcon } from "lucide-react";
import type React from "react";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function OrderTableComponent({
  orders,
  isHeadingHidden,
}: {
  orders: Order[];
  isHeadingHidden?: boolean;
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const filteredOrders = useMemo(() => {
    const query = searchParams.get("q");
    let filtered: Order[] = [];
    if (query !== null) {
      const q = query.trim().toLowerCase();
      filtered = orders.filter((p) => {
        if (!q) return true;
        return [
          p.order_id,
          p.product_name,
          p.order_type,
          p.order_date,
          p.status,
        ]
          .join(" | ")
          .toLowerCase()
          .includes(q);
      });
    } else {
      filtered = orders;
    }

    return filtered;
  }, [orders, searchParams]);

  const searchOrders = async (e: React.ChangeEvent) => {
    e.preventDefault();
    setSearchParams({ q: (e.target as HTMLInputElement).value ?? "" });
  };

  const handleTrackOrder = (p: Order) => {
    navigate(`/track-item?tracking_number=${p.tracking_number}`);
  };

  function renderStatusBadge(status: VALID_ORDER_STATUS) {
    const statusClasses: Record<VALID_ORDER_STATUS, string> = {
      COMPLETED: "bg-green-50/50 text-green-500",
      ACTIVE: "bg-orange-50/50 text-orange-500",
      CANCELLED: "bg-red-50/50 text-red-500",
    };

    return (
      <Badge
        variant="secondary"
        className={`rounded-none text-xs ${statusClasses[status]} capitalize`}
      >
        {status.toLocaleLowerCase()}
      </Badge>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col gap-6">
        {!isHeadingHidden && (
          <div className="w-full flex max-md:flex-col justify-between md:items-center gap-3">
            <legend className="text-xl font-semibold text-primary">
              Orders
            </legend>

            <div className="w-full max-w-xs flex items-center gap-1 py-2 pl-4 border-slate-200 bg-slate-100 inset-shadow-xs">
              <label htmlFor="search-product-field">
                <SearchIcon className="size-5" />
              </label>
              <Input
                type="search"
                name="q"
                id="search-product-field"
                placeholder="Type here..."
                onChange={searchOrders}
                className="bg-transparent border-none rounded-none shadow-none"
              />
            </div>
          </div>
        )}

        <div className="w-full md:px-4 py-4 text-nowrap">
          <table className="w-full border-separate border-spacing-0 max-lg:hidden">
            <thead>
              <tr className="text-left text-xs text-muted-foreground">
                <th className="px-3 py-3 font-medium">Order #</th>
                <th className="px-3 py-3 font-medium">Item</th>
                <th className="px-3 py-3 font-medium">Description</th>
                <th className="px-3 py-3 font-medium text-center">Status</th>
                <th className="px-3 py-3 font-medium">Date</th>
                <th className="px-3 py-3 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 && (
                <tr>
                  <td className="px-12 py-6" colSpan={6}>
                    <EmptyContainer />
                  </td>
                </tr>
              )}
              {filteredOrders.map((p, idx) => (
                <tr
                  key={p.order_id}
                  className={cn(
                    "align-top",
                    idx !== 0 && "border-t border-border",
                  )}
                >
                  <td className="px-3 py-4">
                    <span className="text-sm line-clamp-1 text-black/60">
                      #{p.order_id}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <span className="font-medium">{p.product_name}</span>
                  </td>
                  <td className="px-3 py-4">
                    <p className="max-w-xl text-sm text-muted-foreground">
                      {p.order_type}
                    </p>
                  </td>
                  <td className="px-3 py-4 text-center">
                    {p.status ? renderStatusBadge(p.status) : null}
                  </td>
                  <td className="px-3 py-4">
                    <div className="text-sm text-black/60">{p.order_date}</div>
                  </td>
                  <td className="px-3 py-4 text-center">
                    <Button
                      onClick={() => handleTrackOrder(p)}
                      className="rounded-none px-4"
                      variant={"default"}
                      size="icon-sm"
                      aria-label="Track Order"
                      title="Track Order"
                    >
                      <MapPinnedIcon className={`h-4 w-4`} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="w-full lg:hidden">
            <div className="w-full grid gap-4">
              {filteredOrders.length === 0 && (
                <div className="px-3 py-4">
                  <EmptyContainer />
                </div>
              )}
              {filteredOrders.map((p) => (
                <Card key={p.order_id} className="rounded-none">
                  <CardHeader className="space-y-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CardTitle className="text-base">
                          {p.product_name}
                        </CardTitle>
                      </div>
                      {p.status ? renderStatusBadge(p.status) : null}
                    </div>
                    <CardDescription className="px-1">
                      {p.order_type}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <div className="text-sm font-medium">{p.order_date}</div>
                    <Button
                      onClick={() => handleTrackOrder(p)}
                      className="rounded-none"
                    >
                      <MapPinnedIcon className="mr-2 h-4 w-4" />
                      Track
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderTableComponent;
