import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DownloadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { SettlementLogProps } from "../utils/schema/clinician/settlement-log";
import { Badge } from "@/components/ui/badge";
import { GBP } from "@/utils/config";
import { toast } from "sonner";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function SettlementLogsPage() {
  const [logs, setLogs] = useState<SettlementLogProps[]>([]);

  useEffect(() => {
    setLogs([
      {
        payment_id: "PAY-20260201-001",
        amount_paid: 150.0,
        currency: "GBP",
        payment_method: "Card",
        status: "Completed",
        payment_date: "2026-02-01",
      },
      {
        payment_id: "PAY-20260202-002",
        amount_paid: 75.5,
        currency: "GBP",
        payment_method: "Bank Transfer",
        status: "Completed",
        payment_date: "2026-02-02",
      },
      {
        payment_id: "PAY-20260203-003",
        amount_paid: 220.0,
        currency: "GBP",
        payment_method: "Card",
        status: "Pending",
        payment_date: "2026-02-03",
      },
      {
        payment_id: "PAY-20260204-004",
        amount_paid: 49.99,
        currency: "GBP",
        payment_method: "Wallet",
        status: "Failed",
        payment_date: "2026-02-04",
      },
      {
        payment_id: "PAY-20260206-006",
        amount_paid: 120.0,
        currency: "GBP",
        payment_method: "Bank Transfer",
        status: "Refunded",
        payment_date: "2026-02-06",
      },
    ]);
  }, []);

  function renderStatusBadge(status: SettlementLogProps["status"]) {
    const statusClasses: Record<SettlementLogProps["status"], string> = {
      Completed: "bg-slate-100/50 text-slate-500",
      Pending: "bg-yellow-100/50 text-yellow-500",
      Failed: "bg-red-100/50 text-red-500",
      Refunded: "bg-gray-100/50 text-gray-500",
    };

    return (
      <Badge
        variant="secondary"
        className={`rounded-none text-xs ${statusClasses[status]}`}
      >
        {status}
      </Badge>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex max-md:flex-col justify-between md:items-center gap-3">
          <legend className="text-xl font-semibold text-primary">
            Settlement Logs
          </legend>
        </div>

        <div className="w-full grid md:grid-cols-2 py-4">
          <div className="w-full p-4 lg:p-5 border border-slate-200 bg-slate-100 inset-shadow-sm">
            <legend className="font-bold text-sm text-accent">
              Next Settlement:
            </legend>

            <div className="w-full flex gap-4">
              <div className="flex-1 text-start">
                <p className="text-xl font-semibold">{GBP.format(0)}</p>
              </div>
              <div className="w-fit text-xs text-end">
                <span className="text-secondary-foreground">Due Date:</span>
                <p className="font-medium">16/02/2006</p>
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="w-full max-w-full h-fit">
          <table className="w-full border-separate border-spacing-0 text-nowrap">
            <thead>
              <tr className="text-left text-xs text-muted-foreground">
                <th className="px-2 py-3 font-medium border-y text-center">
                  #
                </th>
                <th className="px-3 py-3 font-medium border-y">Product ID</th>
                <th className="px-3 py-3 font-medium border-y text-center md:text-start">
                  Amount Paid
                </th>
                <th className="px-3 py-3 font-medium border-y text-center">
                  Status
                </th>
                <th className="px-3 py-3 font-medium border-y text-center md:text-start">
                  Date
                </th>
                <th className="px-3 py-3 font-medium border-y"></th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l, idx) => (
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
                      "px-3 py-3 pr-8",
                      idx !== 0 && "border-t",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {l.payment_id}
                    </div>
                  </td>
                  <td
                    className={cn(
                      "align-middle",
                      "px-6 md:px-3 py-3 text-center md:text-start",
                      idx !== 0 && "border-t",
                    )}
                  >
                    <p className="max-w-xl text-sm font-medium">
                      {GBP.format(l.amount_paid)}
                    </p>
                  </td>
                  <td
                    className={cn(
                      "align-middle",
                      "px-6 md:px-3 py-3 text-center",
                      idx !== 0 && "border-t",
                    )}
                  >
                    {renderStatusBadge(l.status)}
                  </td>
                  <td
                    className={cn(
                      "align-middle",
                      "px-6 md:px-3 py-3 text-center md:text-start",
                      idx !== 0 && "border-t",
                    )}
                  >
                    {l.payment_date}
                  </td>
                  <td
                    className={cn(
                      "align-middle",
                      "px-6 md:px-3 py-3 text-center",
                      idx !== 0 && "border-t",
                    )}
                  >
                    <Button
                      onClick={() => {
                        toast(`View Receipt ${l.payment_id}`);
                      }}
                      className="rounded-none"
                      variant={"default"}
                      size="sm"
                    >
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      Receipt
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
}

export default SettlementLogsPage;
