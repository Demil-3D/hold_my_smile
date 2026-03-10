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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

        <div className="w-full md:px-4 py-4 text-nowrap lg:bg-white/60 lg:shadow-lg">
          <Table className="max-lg:hidden">
            <TableHeader className="">
              <TableRow>
                <TableHead className="px-3 py-3 font-medium text-xs text-muted-foreground">
                  Order #
                </TableHead>
                <TableHead className="px-3 py-3 font-medium text-xs text-muted-foreground">
                  Item
                </TableHead>
                <TableHead className="px-3 py-3 font-medium text-xs text-muted-foreground">
                  Description
                </TableHead>
                <TableHead className="px-3 py-3 font-medium text-xs text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="px-3 py-3 font-medium text-xs text-muted-foreground">
                  Date
                </TableHead>
                <TableHead className="px-3 py-3 font-medium text-xs text-muted-foreground">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="px-12 py-6">
                    <EmptyContainer />
                  </TableCell>
                </TableRow>
              )}

              {filteredOrders.map((p) => {
                return (
                  <TableRow key={p.order_id}>
                    <TableCell className="px-3 py-4">
                      <span className="text-sm line-clamp-1 text-black/60">
                        #{p.order_id}
                      </span>
                    </TableCell>
                    <TableCell className="px-3 py-4">
                      <span className="font-medium">{p.product_name}</span>
                    </TableCell>
                    <TableCell className="px-3 py-4">
                      <p className="text-sm text-muted-foreground">
                        {p.order_type}
                      </p>
                    </TableCell>
                    <TableCell className="px-3 py-4">
                      {p.status ? renderStatusBadge(p.status) : null}
                    </TableCell>
                    <TableCell className="px-3 py-4">
                      <div className="text-sm text-black/60">
                        {p.order_date}
                      </div>
                    </TableCell>
                    <TableCell className="px-3 py-4">
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
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

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
